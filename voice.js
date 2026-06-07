/**
 * voice.js
 * Web Speech API Integration & Audio Waveform Visualizer simulation
 */

class LoveVoiceManager {
  constructor() {
    try {
      this.synth = window.speechSynthesis;
    } catch (e) {
      console.warn("Speech synthesis not supported or blocked:", e);
      this.synth = null;
    }
    this.utterance = null;
    this.isPlaying = false;
    this.voices = [];
    this.animationFrameId = null;
    
    // Bind event handlers safely
    try {
      if (this.synth) {
        this.synth.onvoiceschanged = () => {
          try {
            this.voices = this.synth.getVoices() || [];
          } catch (err) {
            console.warn("getVoices failed in onvoiceschanged:", err);
            this.voices = [];
          }
        };
        this.voices = this.synth.getVoices() || [];
      }
    } catch (e) {
      console.warn("Speech synthesis configuration failed:", e);
    }
  }

  getVoicesForLanguage(langCode) {
    if (!this.voices.length) return [];
    
    // Map internal language code to BCP-47 language codes
    const bcpMap = {
      en: 'en',
      fr: 'fr',
      es: 'es',
      pt: 'pt',
      yo: 'yo', // Yoruba
      ha: 'ha', // Hausa
      ig: 'ig', // Igbo
      ar: 'ar'  // Arabic
    };
    
    const targetPrefix = bcpMap[langCode] || 'en';
    
    // Return voices matching the prefix, or English fallbacks
    let matches = this.voices.filter(v => v.lang.startsWith(targetPrefix));
    if (!matches.length) {
      matches = this.voices.filter(v => v.lang.startsWith('en'));
    }
    
    // Create copy to avoid modifying references
    const result = [...matches];
    
    if (targetPrefix === 'en') {
      const hasNativeNG = result.some(v => v.lang.startsWith('en-NG'));
      result.push({
        name: "Nigerian English (Simulated)",
        lang: "en-NG",
        default: !hasNativeNG,
        localService: true
      });
    }
    
    return result;
  }

  simulateNigerianAccent(text) {
    let t = text;
    // Replace th- sounds and common speech patterns to simulate Nigerian tone
    t = t.replace(/\bthe\b/gi, "di");
    t = t.replace(/\bthis\b/gi, "dis");
    t = t.replace(/\bthat\b/gi, "dat");
    t = t.replace(/\bthese\b/gi, "deze");
    t = t.replace(/\bthose\b/gi, "doze");
    t = t.replace(/\bwith\b/gi, "wit");
    t = t.replace(/\bthink\b/gi, "tink");
    t = t.replace(/\bthinking\b/gi, "tinkin");
    t = t.replace(/\bthank\b/gi, "tank");
    t = t.replace(/\bthanks\b/gi, "tanks");
    t = t.replace(/\bnothing\b/gi, "notin");
    t = t.replace(/\bsomething\b/gi, "somtin");
    t = t.replace(/\beverything\b/gi, "evrytin");
    t = t.replace(/\banything\b/gi, "anytin");
    t = t.replace(/\bbrother\b/gi, "broda");
    t = t.replace(/\bsister\b/gi, "sista");
    t = t.replace(/\bfather\b/gi, "fada");
    t = t.replace(/\bmother\b/gi, "moda");
    t = t.replace(/\blove\b/gi, "lof");
    return t;
  }

  speak(text, langCode, voiceName, pitch = 1.0, rate = 1.0, onStart, onEnd, onError) {
    if (!this.synth) {
      if (onError) onError("Speech Synthesis not supported in this browser.");
      return;
    }

    this.stop();

    let processedText = text;
    let actualVoiceName = voiceName;
    let finalPitch = pitch;
    let finalRate = rate;

    if (voiceName === "Nigerian English (Simulated)") {
      const nativeNG = this.voices.find(v => v.lang.startsWith('en-NG'));
      if (nativeNG) {
        actualVoiceName = nativeNG.name;
      } else {
        processedText = this.simulateNigerianAccent(text);
        const fallback = this.voices.find(v => v.lang.startsWith('en'));
        if (fallback) actualVoiceName = fallback.name;
        finalPitch = 1.05;
        finalRate = 0.95;
      }
    }

    this.utterance = new SpeechSynthesisUtterance(processedText);
    
    // Set parameters
    this.utterance.pitch = parseFloat(finalPitch);
    this.utterance.rate = parseFloat(finalRate);
    
    // Find selected voice
    if (actualVoiceName) {
      const selectedVoice = this.voices.find(v => v.name === actualVoiceName);
      if (selectedVoice) this.utterance.voice = selectedVoice;
    } else {
      // Find default voice for language
      const targetVoices = this.getVoicesForLanguage(langCode);
      if (targetVoices.length) {
        const realDefault = targetVoices.find(v => v.name !== "Nigerian English (Simulated)");
        if (realDefault) this.utterance.voice = realDefault;
      }
    }

    // Callbacks
    this.utterance.onstart = () => {
      this.isPlaying = true;
      if (onStart) onStart();
    };

    this.utterance.onend = () => {
      this.isPlaying = false;
      if (onEnd) onEnd();
    };

    this.utterance.onerror = (e) => {
      this.isPlaying = false;
      if (onError) onError(e);
    };

    this.synth.speak(this.utterance);
  }

  pause() {
    if (this.synth && this.synth.speaking && !this.synth.paused) {
      this.synth.pause();
      this.isPlaying = false;
      return true;
    }
    return false;
  }

  resume() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
      this.isPlaying = true;
      return true;
    }
    return false;
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isPlaying = false;
    }
  }

  /**
   * Render simulated voice visualizer canvas
   */
  startWaveformVisualizer(canvas, isThemeDark = true) {
    const ctx = canvas.getContext('2d');
    let phase = 0;
    
    const render = () => {
      if (!this.isPlaying) {
        // Render flat line with slight idle vibration
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.strokeStyle = isThemeDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)';
        ctx.lineWidth = 2;
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
        this.animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      phase += 0.15;
      
      const numLines = 6;
      ctx.lineWidth = 1.5;
      
      // Draw 6 different overlay waves
      for (let i = 0; i < numLines; i++) {
        ctx.beginPath();
        
        // Multi-layered styling
        const progress = i / numLines;
        const alpha = 0.15 + (1 - progress) * 0.45;
        
        // Color transition from primary (rose pink) to secondary (purple)
        if (isThemeDark) {
          ctx.strokeStyle = `rgba(255, 51, 102, ${alpha})`;
          if (i % 2 === 0) ctx.strokeStyle = `rgba(157, 78, 221, ${alpha})`;
        } else {
          ctx.strokeStyle = `rgba(230, 28, 84, ${alpha})`;
          if (i % 2 === 0) ctx.strokeStyle = `rgba(130, 47, 175, ${alpha})`;
        }

        // Draw sine wave
        const amplitude = (3 + (numLines - i) * 3) * 1.2;
        const frequency = 0.02 + progress * 0.015;
        
        for (let x = 0; x < canvas.width; x++) {
          const envelope = Math.sin((x / canvas.width) * Math.PI); // Pin ends to zero
          const y = (canvas.height / 2) + Math.sin(x * frequency + phase + i) * amplitude * envelope;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }
      
      this.animationFrameId = requestAnimationFrame(render);
    };
    
    render();
  }

  stopWaveformVisualizer() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }
}

// Export to window
window.LoveVoiceManager = LoveVoiceManager;
