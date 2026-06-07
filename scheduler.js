/**
 * scheduler.js
 * Surprise Text Scheduler and In-App Push Notification simulator (utilizing Web Audio chimes)
 */

class LoveTextScheduler {
  constructor() {
    this.scheduledMessages = window.safeJsonParse(window.safeStorage.getItem('love_scheduled_messages'), []);
    this.timerId = null;
    this.notificationCallback = null;
  }

  scheduleMessage(text, timestamp, recipientName) {
    const newItem = {
      id: "sch_" + Date.now(),
      text,
      timestamp: parseInt(timestamp), // epoch ms
      recipient: recipientName || "My Love",
      sent: false
    };
    this.scheduledMessages.push(newItem);
    this.saveMessages();
    return newItem;
  }

  deleteMessage(id) {
    this.scheduledMessages = this.scheduledMessages.filter(item => item.id !== id);
    this.saveMessages();
  }

  saveMessages() {
    window.safeStorage.setItem('love_scheduled_messages', JSON.stringify(this.scheduledMessages));
  }

  startChecking(onNotificationTriggered) {
    this.notificationCallback = onNotificationTriggered;
    if (this.timerId) clearInterval(this.timerId);
    
    // Check every 3 seconds for scheduled items
    this.timerId = setInterval(() => {
      this.checkScheduledMessages();
    }, 3000);
  }

  stopChecking() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  checkScheduledMessages() {
    const now = Date.now();
    let updated = false;

    this.scheduledMessages.forEach(msg => {
      if (!msg.sent && msg.timestamp <= now) {
        msg.sent = true;
        updated = true;
        
        // Trigger sound chime & notification
        this.playNotificationChime();
        if (this.notificationCallback) {
          this.notificationCallback(msg);
        }
      }
    });

    if (updated) {
      // Keep only unsent or recently sent messages for record
      this.saveMessages();
    }
  }

  /**
   * Generates a romantic bell/chime using Web Audio API synthesizer
   */
  playNotificationChime() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      
      const ctx = new AudioContext();
      
      // Chime note sequence (E5, G#5, B5)
      const playNote = (freq, startTime, duration) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.15, startTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
        
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc.start(startTime);
        osc.stop(startTime + duration);
      };
      
      const now = ctx.currentTime;
      playNote(659.25, now, 0.8);        // E5
      playNote(830.61, now + 0.15, 0.8);  // G#5
      playNote(987.77, now + 0.3, 1.2);   // B5
    } catch (e) {
      console.warn("Audio Context chime failed:", e);
    }
  }
}

window.LoveTextScheduler = LoveTextScheduler;
