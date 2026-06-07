/**
 * app.js (Expanded Feature Release)
 * Core application controller, routing, canvas particles, and UI event binding.
 * Fully unlocked, completely free, and packed with 13 emotional value features.
 */

const AdviceArticles = [
  { category: "ldr", title: "Navigating Time Zones & Distance ✈️", content: "Set a regular schedule for video calls, but also leave room for spontaneous check-ins. Play online games, watch movies together in sync, and send physical surprise gifts to bridge the distance." },
  { category: "comm", title: "The Power of 'I' Statements 🗣️", content: "Instead of saying 'You always forget to call me', try: 'I feel lonely when we don't catch up in the evenings'. This prevents defensiveness and focuses the conversation on feelings and solutions." },
  { category: "conflict", title: "Soft Startups for Hard Discussions 🤝", content: "Begin conversations gently. Express appreciation before raising issues. Take a 20-minute break if heart rates rise, agreeing to return to the topic when calm." },
  { category: "trust", title: "Consistency Builds Certainty 🔒", content: "Trust is built in small moments. Be reliable in your commitments, be honest even in minor things, and maintain transparency in your daily schedules to create safety." },
  { category: "ldr", title: "Keeping the Passion Alive in LDR 🔥", content: "Send audio messages throughout the day instead of just texts. Hearing your partner's voice tone creates strong sensory connection. Schedule formal date-nights where you both dress up." },
  { category: "comm", title: "Active Listening Exercises 👂", content: "When your partner shares something, repeat back what you heard in your own words before responding: 'It sounds like you felt overwhelmed by the work meeting today, is that right?' This builds validation." }
];

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Managers
  window.monetization = new LoveMonetizationManager();
  window.couples = new CouplesManager();
  window.voice = new LoveVoiceManager();
  window.calendar = new RelationshipCalendarManager();
  window.scheduler = new LoveTextScheduler();

  // Elements
  const sections = document.querySelectorAll('.page-section');
  const navItems = document.querySelectorAll('.nav-item');
  const themeToggle = document.getElementById('theme-toggle');
  
  // State
  let currentActiveTab = 'generator';
  let activeGenSubTab = 'ai-text';
  let activeVaultSubTab = 'dates';
  let activeCoupleSubTab = 'challenges';
  let activeGameSubSubTab = 'questions';
  let activeAdviceCategory = 'all';
  
  let generatedResultText = "";
  let isSpeaking = false;
  let isPaused = false;
  
  // PIN lockbox temporary input state
  let enteredPinBuffer = "";

  // --- 1. CORE ROUTING ---
  function switchTab(tabId) {
    currentActiveTab = tabId;
    navItems.forEach(item => {
      if (item.getAttribute('data-target-tab') === tabId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    sections.forEach(sec => {
      if (sec.id === `section-${tabId}`) {
        sec.classList.add('active');
      } else {
        sec.classList.remove('active');
      }
    });

    // Run tab specific updates
    if (tabId === 'vault') {
      renderCalendarStats();
      renderTimeline();
    } else if (tabId === 'playzone') {
      renderChallenges();
      renderDailyChallengeCard();
      renderSecretNotesUI();
      if (!window.questionsDrawn) {
        drawQuestionCard();
        window.questionsDrawn = true;
      }
    } else if (tabId === 'love-calc') {
      // Love Calculator tab selected
    } else if (tabId === 'advice') {
      renderAdviceArticles();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const target = item.getAttribute('data-target-tab');
      switchTab(target);
    });
  });

  // --- 2. FLOAT HEARTS PARTICLES CANVAS ---
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class HeartParticle {
    constructor() {
      this.reset();
      this.y = Math.random() * canvas.height;
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + 20;
      this.size = Math.random() * 8 + 4;
      this.speed = Math.random() * 0.8 + 0.3;
      this.opacity = Math.random() * 0.4 + 0.15;
      this.swaySpeed = Math.random() * 0.02 + 0.005;
      this.swayAmount = Math.random() * 15 + 5;
      this.swayOffset = Math.random() * Math.PI * 2;
    }

    update() {
      this.y -= this.speed;
      this.swayOffset += this.swaySpeed;
      this.currentX = this.x + Math.sin(this.swayOffset) * this.swayAmount;
      
      if (this.y < -20 || this.currentX < -20 || this.currentX > canvas.width + 20) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.beginPath();
      const topCurveHeight = this.size * 0.3;
      ctx.moveTo(this.currentX, this.y + topCurveHeight);
      
      ctx.bezierCurveTo(
        this.currentX - this.size / 2, this.y - this.size / 2,
        this.currentX - this.size, this.y + topCurveHeight,
        this.currentX, this.y + this.size
      );
      ctx.bezierCurveTo(
        this.currentX + this.size, this.y + topCurveHeight,
        this.currentX + this.size / 2, this.y - this.size / 2,
        this.currentX, this.y + topCurveHeight
      );
      
      const theme = document.documentElement.getAttribute('data-theme');
      ctx.fillStyle = theme === 'light' ? '#e64c50' : '#ff5e62';
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < 25; i++) {
    particles.push(new HeartParticle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // --- 3. THEME TOGGLING ---
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    window.safeStorage.setItem('love_theme', theme);
    
    if (theme === 'light') {
      themeToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon-light" style="width:18px; height:18px;"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    } else {
      themeToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon-dark" style="width:18px; height:18px;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    }
  }

  const savedTheme = window.safeStorage.getItem('love_theme') || 'dark';
  setTheme(savedTheme);
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
  });

  const infoBtn = document.getElementById('info-btn');
  if (infoBtn) {
    infoBtn.addEventListener('click', () => {
      document.getElementById('modal-info').classList.add('active');
    });
  }

  // --- 4. TOAST NOTIFICATION UTILITY ---
  function showToast(title, desc, icon = "🔔", duration = 4000) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-desc">${desc}</div>
      </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('removing');
      toast.addEventListener('animationend', () => toast.remove());
    }, duration);
  }

  window.closeAllModals = function() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.classList.remove('active');
    });
  };

  // --- 5. CUSTOM PILL SELECTORS BINDING ---
  function bindPillSelector(pillsContainerId, hiddenInputId, onSelectedCallback) {
    const container = document.getElementById(pillsContainerId);
    const hiddenInput = document.getElementById(hiddenInputId);
    if (!container || !hiddenInput) return;

    const buttons = container.querySelectorAll('button');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        hiddenInput.value = btn.getAttribute('data-val');
        if (onSelectedCallback) {
          onSelectedCallback(btn.getAttribute('data-val'));
        }
      });
    });
  }

  bindPillSelector('gen-style-pills', 'gen-style');
  bindPillSelector('gen-recipient-pills', 'gen-recipient');
  
  bindPillSelector('gen-lang-pills', 'gen-lang', (val) => {
    populateVoiceOptions(val);
  });
  
  bindPillSelector('letter-type-pills', 'letter-type');
  
  bindPillSelector('letter-lang-pills', 'letter-lang', (val) => {
    populateVoiceOptions(val);
  });
  
  bindPillSelector('flirty-style-pills', 'flirty-style-val');

  // --- 6. TEXT GENERATORS FLOW ---
  const btnGenText = document.getElementById('btn-generate-text');
  const btnGenLetter = document.getElementById('btn-generate-letter');
  const btnGenFlirty = document.getElementById('btn-generate-flirty');
  const btnGenProposal = document.getElementById('btn-generate-proposal');
  const btnGenStory = document.getElementById('btn-generate-story');
  
  const loadingBox = document.getElementById('generator-loading');
  const resultBox = document.getElementById('generator-result');
  const resultTextBody = document.getElementById('result-text-body');
  
  // Generator subtabs routing
  const genSubTabBtns = document.querySelectorAll('[data-gen-tab]');
  genSubTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      genSubTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeGenSubTab = btn.getAttribute('data-gen-tab');
      
      // Toggle visibility
      document.getElementById('gen-tab-ai-text').style.display = activeGenSubTab === 'ai-text' ? 'block' : 'none';
      document.getElementById('gen-tab-flirty').style.display = activeGenSubTab === 'flirty' ? 'block' : 'none';
      document.getElementById('gen-tab-love-letters').style.display = activeGenSubTab === 'love-letters' ? 'block' : 'none';
      document.getElementById('gen-tab-proposals').style.display = activeGenSubTab === 'proposals' ? 'block' : 'none';
      document.getElementById('gen-tab-love-stories').style.display = activeGenSubTab === 'love-stories' ? 'block' : 'none';
    });
  });

  // Mood selector clicks
  const moodBtns = document.querySelectorAll('.mood-btn');
  let selectedMood = 'romantic';
  moodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      moodBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedMood = btn.getAttribute('data-mood');
    });
  });

  // Setup generic compiler loading animation
  function runGeneratorAnimation(compileCallback) {
    resultBox.style.display = "none";
    loadingBox.style.display = "flex";
    
    // Disable all buttons during generation
    const actionBtns = [btnGenText, btnGenLetter, btnGenFlirty, btnGenProposal, btnGenStory];
    actionBtns.forEach(b => { if (b) b.disabled = true; });

    const loadingStatuses = [
      "Analyzing relationship dynamic...",
      "Calibrating emotional resonance...",
      "Polishing romantic delivery..."
    ];
    let step = 0;
    
    const interval = setInterval(() => {
      if (step < loadingStatuses.length) {
        document.getElementById('loading-status').innerText = loadingStatuses[step];
        step++;
      } else {
        clearInterval(interval);
        
        generatedResultText = compileCallback();
        
        loadingBox.style.display = "none";
        resultBox.style.display = "block";
        
        actionBtns.forEach(b => { if (b) b.disabled = false; });
        
        animateTypingText(generatedResultText);
        stopSpeakingVoice();
      }
    }, 700);
  }

  function animateTypingText(text) {
    resultTextBody.innerHTML = "";
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        resultTextBody.innerHTML += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
      }
    }, 10);
  }

  // Bind Generative Actions
  btnGenText.addEventListener('click', () => {
    runGeneratorAnimation(() => {
      const style = document.getElementById('gen-style').value;
      const recipient = document.getElementById('gen-recipient').value;
      const name = document.getElementById('gen-partner-name').value;
      const details = document.getElementById('gen-details').value;
      const lang = document.getElementById('gen-lang').value;
      
      populateVoiceOptions(lang);
      return window.generateLoveText(lang, style, recipient, selectedMood, name, details);
    });
  });

  btnGenLetter.addEventListener('click', () => {
    runGeneratorAnimation(() => {
      const type = document.getElementById('letter-type').value;
      const name = document.getElementById('letter-partner-name').value;
      const lang = document.getElementById('letter-lang').value;
      
      populateVoiceOptions(lang);
      return window.generateLoveLetter(lang, type, name);
    });
  });

  btnGenFlirty.addEventListener('click', () => {
    runGeneratorAnimation(() => {
      const style = document.getElementById('flirty-style-val').value;
      const name = document.getElementById('flirty-partner-name').value || "Cutie";
      
      const templates = window.FlirtyTexts[style] || window.FlirtyTexts.flirty;
      const randomQ = templates[Math.floor(Math.random() * templates.length)];
      
      populateVoiceOptions('en');
      return randomQ.replace("[NAME]", name);
    });
  });

  btnGenProposal.addEventListener('click', () => {
    runGeneratorAnimation(() => {
      const cat = document.getElementById('proposal-speech-category').value;
      const name = document.getElementById('proposal-partner-name').value || "My Love";
      
      let templates = [];
      if (ProposalsSpeeches.proposals[cat]) {
        templates = ProposalsSpeeches.proposals[cat];
      } else {
        templates = ProposalsSpeeches.speeches[cat] || ProposalsSpeeches.proposals.marriage;
      }
      
      const randomQ = templates[Math.floor(Math.random() * templates.length)];
      populateVoiceOptions('en');
      return randomQ.replace(/\[NAME\]/g, name);
    });
  });



  btnGenStory.addEventListener('click', () => {
    runGeneratorAnimation(() => {
      const myName = document.getElementById('story-my-name').value || "Me";
      const partner = document.getElementById('story-partner-name').value || "My Love";
      const howMet = document.getElementById('story-how-met').value || "our eyes met in a crowded room";
      const memory = document.getElementById('story-memory').value || "our first sunset walk together";
      
      populateVoiceOptions('en');
      return window.generateLoveStorybook(myName, partner, howMet, memory);
    });
  });

  // --- 7. VOICE (TEXT-TO-SPEECH) ENGINE ---
  const voiceSelect = document.getElementById('voice-select');
  const voiceSpeed = document.getElementById('voice-speed');
  const btnVoicePlay = document.getElementById('btn-voice-play');
  const waveformCanvas = document.getElementById('waveform-canvas');
  
  window.voice.startWaveformVisualizer(waveformCanvas, true);

  // Initialize voice list
  populateVoiceOptions('en');

  // Re-populate when voices change (async loading support) safely
  if (window.voice && window.voice.synth) {
    try {
      window.voice.synth.onvoiceschanged = () => {
        let activeLang = 'en';
        if (activeGenSubTab === 'ai-text') {
          const langEl = document.getElementById('gen-lang');
          if (langEl) activeLang = langEl.value;
        } else if (activeGenSubTab === 'love-letters') {
          const langEl = document.getElementById('letter-lang');
          if (langEl) activeLang = langEl.value;
        }
        populateVoiceOptions(activeLang);
      };
    } catch (e) {
      console.warn("speechSynthesis.onvoiceschanged registration failed:", e);
    }
  }

  function populateVoiceOptions(lang) {
    voiceSelect.innerHTML = "";
    const voices = window.voice.getVoicesForLanguage(lang);
    if (!voices.length) {
      voiceSelect.innerHTML = `<option value="">Default Speaker</option>`;
      return;
    }
    voices.forEach(v => {
      const option = document.createElement('option');
      option.value = v.name;
      option.innerText = `${v.name} (${v.lang})`;
      voiceSelect.appendChild(option);
    });
  }

  btnVoicePlay.addEventListener('click', () => {
    if (isSpeaking) {
      if (isPaused) {
        window.voice.resume();
        isPaused = false;
        btnVoicePlay.querySelector('.play-icon').style.display = 'none';
        btnVoicePlay.querySelector('.pause-icon').style.display = 'block';
      } else {
        window.voice.pause();
        isPaused = true;
        btnVoicePlay.querySelector('.play-icon').style.display = 'block';
        btnVoicePlay.querySelector('.pause-icon').style.display = 'none';
      }
    } else {
      const selectedVoice = voiceSelect.value;
      const speedVal = voiceSpeed.value;
      
      // Resolve language
      let activeLang = 'en';
      if (activeGenSubTab === 'ai-text') activeLang = document.getElementById('gen-lang').value;
      else if (activeGenSubTab === 'love-letters') activeLang = document.getElementById('letter-lang').value;

      window.voice.speak(
        generatedResultText || resultTextBody.innerText,
        activeLang,
        selectedVoice,
        1.0, 
        speedVal, 
        () => {
          isSpeaking = true;
          isPaused = false;
          btnVoicePlay.querySelector('.play-icon').style.display = 'none';
          btnVoicePlay.querySelector('.pause-icon').style.display = 'block';
        },
        () => {
          stopSpeakingVoice();
        },
        (err) => {
          console.warn("TTS Error:", err);
          stopSpeakingVoice();
        }
      );
    }
  });

  function stopSpeakingVoice() {
    window.voice.stop();
    isSpeaking = false;
    isPaused = false;
    btnVoicePlay.querySelector('.play-icon').style.display = 'block';
    btnVoicePlay.querySelector('.pause-icon').style.display = 'none';
  }

  // --- 8. COPY, SHARE & SURPRISE SCHEDULER BINDINGS ---
  const btnCopy = document.getElementById('btn-copy-result');
  const btnShare = document.getElementById('btn-share-result');
  const btnSchedule = document.getElementById('btn-schedule-result');

  btnCopy.addEventListener('click', () => {
    const textToCopy = generatedResultText || resultTextBody.innerText;
    if (!textToCopy) return;
    copyToClipboard(textToCopy);
  });

  btnSchedule.addEventListener('click', () => {
    const text = generatedResultText || resultTextBody.innerText;
    if (!text) return;
    document.getElementById('scheduler-message-preview').innerText = text.slice(0, 100) + "...";
    
    const futureDate = new Date(Date.now() + 60000);
    document.getElementById('schedule-date').value = futureDate.toISOString().slice(0, 10);
    
    const hours = String(futureDate.getHours()).padStart(2, '0');
    const minutes = String(futureDate.getMinutes()).padStart(2, '0');
    document.getElementById('schedule-time').value = `${hours}:${minutes}`;

    document.getElementById('modal-scheduler').classList.add('active');
  });

  document.getElementById('btn-confirm-schedule').addEventListener('click', () => {
    const date = document.getElementById('schedule-date').value;
    const time = document.getElementById('schedule-time').value;
    const recipient = document.getElementById('schedule-recipient').value;
    const text = generatedResultText || resultTextBody.innerText;

    if (!date || !time) {
      showToast("Missing Fields", "Please select a date and time.", "⚠️");
      return;
    }

    const scheduledTime = new Date(`${date}T${time}`).getTime();
    if (scheduledTime <= Date.now()) {
      showToast("Invalid Time", "Please choose a future date/time.", "⚠️");
      return;
    }

    window.scheduler.scheduleMessage(text, scheduledTime, recipient);
    window.closeAllModals();
    showToast("Surprise Scheduled! 🎁", `Will notify you to send this at ${time}.`, "📅");
  });

  window.scheduler.startChecking((msg) => {
    showToast(`Surprise Send Reminder! 🎁`, `Time to message ${msg.recipient}: "${msg.text.slice(0, 40)}..."`, "🔔", 8000);
  });

  btnShare.addEventListener('click', () => {
    document.getElementById('modal-share').classList.add('active');
  });

  document.getElementById('btn-share-whatsapp').addEventListener('click', () => {
    const text = encodeURIComponent(generatedResultText);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    window.closeAllModals();
  });

  document.getElementById('btn-share-sms').addEventListener('click', () => {
    const text = encodeURIComponent(generatedResultText);
    window.open(`sms:?&body=${text}`, '_blank');
    window.closeAllModals();
  });

  document.getElementById('btn-share-copy').addEventListener('click', () => {
    copyToClipboard(generatedResultText, "Simulated love letter web link copied.");
    window.closeAllModals();
  });

  document.getElementById('btn-share-download-voice').addEventListener('click', () => {
    showToast("Voice Note Exported!", "Simulated MP3 file download initiated.", "🎙️");
    window.closeAllModals();
  });


  // --- 9. VAULT TAB SUB-ROUTING & FLOWS ---
  const vaultTabBtns = document.querySelectorAll('[data-vault-tab]');
  vaultTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      vaultTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeVaultSubTab = btn.getAttribute('data-vault-tab');
      
      document.getElementById('vault-tab-dates').style.display = activeVaultSubTab === 'dates' ? 'block' : 'none';
      document.getElementById('vault-tab-memories').style.display = activeVaultSubTab === 'memories' ? 'block' : 'none';
      document.getElementById('vault-tab-photos').style.display = activeVaultSubTab === 'photos' ? 'block' : 'none';
    });
  });

  // Dates config
  const firstMeetingInput = document.getElementById('input-date-first-meeting');
  const anniversaryInput = document.getElementById('input-date-anniversary');
  const weddingInput = document.getElementById('input-date-wedding');
  
  const lblFirstMeeting = document.getElementById('lbl-first-meeting');
  const lblAnniversary = document.getElementById('lbl-anniversary');
  const lblWedding = document.getElementById('lbl-wedding');
  
  firstMeetingInput.value = window.calendar.dates.firstMeeting;
  anniversaryInput.value = window.calendar.dates.anniversary;
  weddingInput.value = window.calendar.dates.weddingDay;

  function renderCalendarStats() {
    const mgr = window.calendar;
    
    lblFirstMeeting.innerText = new Date(mgr.dates.firstMeeting).toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'});
    lblAnniversary.innerText = new Date(mgr.dates.anniversary).toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'});
    lblWedding.innerText = new Date(mgr.dates.weddingDay).toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'});

    const len = mgr.getRelationshipLength();
    document.getElementById('stat-days-together').innerText = len.totalDays;
    
    const countdown = mgr.getCountdownDays(mgr.dates.anniversary);
    document.getElementById('stat-next-anniversary').innerText = countdown;

    // Render list
    const customDatesBox = document.getElementById('custom-dates-list');
    customDatesBox.innerHTML = "";
    
    const upcoming = mgr.getUpcomingEvents();
    upcoming.forEach(ev => {
      const el = document.createElement('div');
      el.style.cssText = "display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.02); padding:10px 12px; border-radius:10px; border:1px solid rgba(255,255,255,0.04);";
      
      const formattedDate = new Date(ev.date).toLocaleDateString('en-US', {month:'short', day:'numeric'});
      
      el.innerHTML = `
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:16px;">${ev.icon}</span>
          <div>
            <div style="font-size:12px; font-weight:700;">${ev.name}</div>
            <div style="font-size:10px; color:var(--text-muted);">${formattedDate}</div>
          </div>
        </div>
        <div style="text-align:right;">
          <div style="font-family:var(--font-display); font-size:14px; font-weight:800; color:var(--primary);">${ev.daysLeft} days</div>
          <div style="font-size:8px; color:var(--text-dim); text-transform:uppercase;">Remaining</div>
        </div>
      `;
      
      customDatesBox.appendChild(el);
    });
  }

  firstMeetingInput.addEventListener('change', (e) => {
    window.calendar.updateCoreDate('firstMeeting', e.target.value);
    renderCalendarStats();
    showToast("Date Saved", "First meeting date updated.", "💑");
  });

  anniversaryInput.addEventListener('change', (e) => {
    window.calendar.updateCoreDate('anniversary', e.target.value);
    renderCalendarStats();
    showToast("Date Saved", "Anniversary date updated.", "🌹");
  });

  weddingInput.addEventListener('change', (e) => {
    window.calendar.updateCoreDate('weddingDay', e.target.value);
    renderCalendarStats();
    showToast("Date Saved", "Wedding Day countdown updated.", "💍");
  });

  const btnAddCustomDate = document.getElementById('btn-add-custom-date');
  const modalAddCustomDate = document.getElementById('modal-add-custom-date');
  btnAddCustomDate.addEventListener('click', () => {
    document.getElementById('milestone-title').value = "";
    document.getElementById('milestone-date').value = new Date().toISOString().slice(0, 10);
    modalAddCustomDate.classList.add('active');
  });

  document.getElementById('btn-save-milestone').addEventListener('click', () => {
    const title = document.getElementById('milestone-title').value;
    const date = document.getElementById('milestone-date').value;
    const type = document.getElementById('milestone-type').value;

    if (!title || !date) {
      showToast("Missing Fields", "Please complete all inputs.", "⚠️");
      return;
    }

    window.calendar.addCustomEvent(title, date, type);
    window.closeAllModals();
    renderCalendarStats();
    showToast("Milestone Added", `Saved "${title}" in relationship calendar.`, "🎉");
  });

  // Memory timeline additions
  const timelineContainer = document.getElementById('timeline-container');
  const btnAddMemory = document.getElementById('btn-add-memory');
  const modalAddMemory = document.getElementById('modal-add-memory');

  function renderTimeline() {
    timelineContainer.innerHTML = "";
    const memories = window.calendar.memories;

    if (!memories.length) {
      timelineContainer.innerHTML = `<div style="text-align:center; padding:30px; font-size:13px; color:var(--text-muted);">No memories logged yet. Add your first memory above!</div>`;
      return;
    }

    memories.forEach(m => {
      const el = document.createElement('div');
      el.className = 'timeline-item';
      
      const moodEmojis = { happy: "😊", romantic: "🥰", celebrating: "🎉", missing: "🥺" };
      const moodEmoji = moodEmojis[m.mood] || "❤️";
      const formattedDate = new Date(m.date).toLocaleDateString('en-US', {month:'long', day:'numeric', year:'numeric'});

      el.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="timeline-date">${formattedDate}</div>
        <div class="timeline-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
            <h4 class="timeline-title">${moodEmoji} ${m.title}</h4>
            <div style="display:flex; gap:10px; align-items:center;">
              <button class="btn-compile-mem-text" data-mem-id="${m.id}" style="background:none; border:none; color:var(--primary); cursor:pointer; font-size:14px;" title="Generate message from this memory">💬 Message</button>
              <button class="btn-delete-memory" data-mem-id="${m.id}" style="background:none; border:none; color:var(--text-dim); cursor:pointer; font-size:11px;">Delete</button>
            </div>
          </div>
          <p class="timeline-desc">${m.desc}</p>
        </div>
      `;

      el.querySelector('.btn-delete-memory').onclick = () => {
        window.calendar.deleteMemory(m.id);
        renderTimeline();
        showToast("Memory Deleted", "Removed milestone memory.", "🗑️");
      };

      // Direct bridge memory -> Message Generator
      el.querySelector('.btn-compile-mem-text').onclick = () => {
        const compiledText = window.compileMemoryMessage(m.title, m.desc);
        
        // Open Generator tab immediately
        switchTab('generator');
        
        // Show result box
        resultBox.style.display = "block";
        generatedResultText = compiledText;
        animateTypingText(compiledText);
        
        showToast("Compiled!", "Message generated from your memory.", "❤️");
      };

      timelineContainer.appendChild(el);
    });
  }

  btnAddMemory.addEventListener('click', () => {
    document.getElementById('memory-title').value = "";
    document.getElementById('memory-date').value = new Date().toISOString().slice(0, 10);
    document.getElementById('memory-desc').value = "";
    modalAddMemory.classList.add('active');
  });

  document.getElementById('btn-save-memory').addEventListener('click', () => {
    const title = document.getElementById('memory-title').value;
    const date = document.getElementById('memory-date').value;
    const mood = document.getElementById('memory-mood').value;
    const desc = document.getElementById('memory-desc').value;

    if (!title || !date || !desc) {
      showToast("Missing Fields", "Please complete all inputs.", "⚠️");
      return;
    }

    window.calendar.addMemory(title, date, desc, mood);
    window.closeAllModals();
    renderTimeline();
    showToast("Memory Logged!", `Added "${title}" to your memory box.`, "📸");
  });

  // Photo-to-Love-Message Upload Simulator
  const photoUploadZone = document.getElementById('photo-upload-zone');
  const photoFileInput = document.getElementById('photo-file-input');
  const photoPreviewBox = document.getElementById('photo-preview-box');
  const photoPreviewImg = document.getElementById('photo-preview-img');
  const btnRemovePhoto = document.getElementById('btn-remove-photo');
  const btnGenPhotoCaption = document.getElementById('btn-generate-photo-caption');

  photoUploadZone.onclick = () => photoFileInput.click();

  photoFileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        photoPreviewImg.src = event.target.result;
        photoUploadZone.style.display = 'none';
        photoPreviewBox.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  };

  btnRemovePhoto.onclick = () => {
    photoFileInput.value = "";
    photoPreviewImg.src = "";
    photoPreviewBox.style.display = 'none';
    photoUploadZone.style.display = 'block';
  };

  btnGenPhotoCaption.onclick = () => {
    const vibe = document.getElementById('photo-caption-vibe').value;
    
    // Check if photo is uploaded
    if (!photoPreviewImg.src || photoPreviewImg.src.endsWith('index.html') || photoPreviewImg.src.endsWith('app.html') || photoPreviewImg.src === window.location.href) {
      showToast("Upload Required", "Please select a photo first.", "⚠️");
      return;
    }

    // Generate romantic message inspired by photo
    const captions = {
      romantic: [
        "Every picture tells a story, but ours is my absolute favorite. Looking at this photo reminds me of how complete I feel when you are near. ❤️",
        "Captured a perfect moment, but nothing is as perfect as having you in my life. You are my sunshine."
      ],
      flirty: [
        "How did I get so lucky to match with someone this attractive? Warning: staring at this photo causes high heartbeat speeds! 😉",
        "Stunning view, but I'm only looking at you."
      ],
      cute: [
        "Two peas in a pod. Smiling like idiots because we have each other! 🥰",
        "You're my favorite person to make silly faces and share adventures with."
      ],
      deep_emotional: [
        "Looking at this photo, I don't just see a picture; I see our shared struggles, our growth, and our future. Thank you for holding my hand through it all. 🥺",
        "We've built a sanctuary together, and this photo captures a piece of that absolute peace."
      ]
    };

    const choices = captions[vibe] || captions.romantic;
    const randomCaption = choices[Math.floor(Math.random() * choices.length)];

    // Open Generator tab
    switchTab('generator');
    resultBox.style.display = "block";
    generatedResultText = randomCaption;
    animateTypingText(randomCaption);
    populateVoiceOptions('en');
    showToast("Caption Compiled!", "Generated caption from your couples photo.", "📸");
  };


  // --- 10. PLAYZONE TAB SUB-ROUTING ---
  const playzoneSubTabBtns = document.querySelectorAll('[data-couple-tab]');
  playzoneSubTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playzoneSubTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCoupleSubTab = btn.getAttribute('data-couple-tab');
      
      document.getElementById('couple-tab-challenges').style.display = activeCoupleSubTab === 'challenges' ? 'block' : 'none';
      document.getElementById('couple-tab-games').style.display = activeCoupleSubTab === 'games' ? 'block' : 'none';
      document.getElementById('couple-tab-secretnotes').style.display = activeCoupleSubTab === 'secretnotes' ? 'block' : 'none';
    });
  });

  // Play sub-sub-tabs
  const gameSubTabBtns = document.querySelectorAll('[data-game-subtab]');
  gameSubTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      gameSubTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeGameSubSubTab = btn.getAttribute('data-game-subtab');
      
      document.getElementById('game-subtab-questions').style.display = activeGameSubSubTab === 'questions' ? 'block' : 'none';
      document.getElementById('game-subtab-trivia').style.display = activeGameSubSubTab === 'trivia' ? 'block' : 'none';
      document.getElementById('game-subtab-quizzes').style.display = activeGameSubSubTab === 'quizzes' ? 'block' : 'none';
    });
  });

  // Daily Challenge Card
  function renderDailyChallengeCard() {
    const daily = window.couples.getDailyChallenge();
    document.getElementById('daily-challenge-title').innerText = daily.title;
    document.getElementById('daily-challenge-desc').innerText = daily.desc;
  }

  document.getElementById('btn-complete-daily-challenge').onclick = () => {
    window.scheduler.playNotificationChime();
    showToast("Challenge Completed! 🏆", "Splendid work! You've completed today's romantic goal.", "🎉");
  };

  // Challenges list (Weekly checklist)
  const challengesList = document.getElementById('challenges-list-container');
  const challengePercent = document.getElementById('challenge-percentage');
  const challengeFraction = document.getElementById('challenge-fraction');

  function renderChallenges() {
    challengesList.innerHTML = "";
    const mgr = window.couples;
    
    mgr.challenges.forEach(ch => {
      const item = document.createElement('div');
      item.className = `challenge-item ${ch.completed ? 'completed' : ''}`;
      
      item.innerHTML = `
        <div class="challenge-checkbox ${ch.completed ? 'checked' : ''}" data-ch-id="${ch.id}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style="width:14px; height:14px;"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <div class="challenge-details">
          <div class="challenge-title">${ch.title}</div>
          <div class="challenge-desc">${ch.desc}</div>
        </div>
      `;
      
      item.querySelector('.challenge-checkbox').onclick = () => {
        mgr.toggleChallenge(ch.id);
        renderChallenges();
      };
      
      challengesList.appendChild(item);
    });

    const progress = mgr.getChallengeProgress();
    challengePercent.innerText = `${progress.percentage}%`;
    challengeFraction.innerText = `${progress.completed}/${progress.total} Completed`;
  }

  document.getElementById('btn-reset-challenges').onclick = () => {
    window.couples.resetChallenges();
    renderChallenges();
    showToast("Challenges Reset!", "Time to start fresh together.", "⚡");
  };

  // Secret Notes PIN Lockbox digits bindings
  const pinBtns = document.querySelectorAll('[data-pin-num]');
  const pinDots = [
    document.getElementById('pdot-1'),
    document.getElementById('pdot-2'),
    document.getElementById('pdot-3'),
    document.getElementById('pdot-4')
  ];

  function updatePinDots() {
    pinDots.forEach((dot, index) => {
      if (index < enteredPinBuffer.length) {
        dot.classList.add('filled');
      } else {
        dot.classList.remove('filled');
      }
    });
  }

  pinBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const num = btn.getAttribute('data-pin-num');
      if (enteredPinBuffer.length < 4) {
        enteredPinBuffer += num;
        updatePinDots();
      }
    });
  });

  document.getElementById('btn-pin-clear').onclick = () => {
    enteredPinBuffer = "";
    updatePinDots();
  };

  document.getElementById('btn-pin-submit').onclick = () => {
    if (enteredPinBuffer.length !== 4) {
      showToast("Invalid PIN", "Please enter a 4-digit passcode.", "⚠️");
      return;
    }

    const mgr = window.couples;
    if (!mgr.secretNotesPin) {
      // First time: Set PIN
      mgr.setPin(enteredPinBuffer);
      showToast("Passcode Configured! 🔒", "Your Secret Lockbox is now locked with this PIN.", "🔑");
      enteredPinBuffer = "";
      updatePinDots();
      renderSecretNotesUI();
    } else {
      // Verify
      const ok = mgr.verifyPin(enteredPinBuffer);
      if (ok) {
        showToast("Unlocked", "Welcome to your secret vault.", "🔓");
        enteredPinBuffer = "";
        updatePinDots();
        renderSecretNotesUI();
      } else {
        // Shake dots animation mockup
        showToast("Incorrect Passcode", "Access Denied. Try again.", "❌");
        enteredPinBuffer = "";
        updatePinDots();
      }
    }
  };

  function renderSecretNotesUI() {
    const mgr = window.couples;
    const authScreen = document.getElementById('lockbox-auth-screen');
    const notesScreen = document.getElementById('lockbox-notes-screen');
    const authTitle = document.getElementById('lockbox-auth-title');
    const authDesc = document.getElementById('lockbox-auth-desc');

    if (!mgr.secretNotesPin) {
      authScreen.style.display = 'block';
      notesScreen.style.display = 'none';
      authTitle.innerText = "Create Passcode";
      authDesc.innerText = "Create a 4-digit PIN to lock your private secret notes.";
    } else if (!mgr.isPinVerified) {
      authScreen.style.display = 'block';
      notesScreen.style.display = 'none';
      authTitle.innerText = "Enter Passcode";
      authDesc.innerText = "Enter your 4-digit PIN to unlock your secret love lockbox.";
    } else {
      authScreen.style.display = 'none';
      notesScreen.style.display = 'block';
      
      // Render Notes List
      const listBox = document.getElementById('secret-notes-list-box');
      listBox.innerHTML = "";

      if (!mgr.secretNotes.length) {
        listBox.innerHTML = `<p style="text-align:center; padding:30px; font-size:12px; color:var(--text-dim);">Your lockbox is empty. Add a secret note above!</p>`;
        return;
      }

      mgr.secretNotes.forEach(note => {
        const noteEl = document.createElement('div');
        noteEl.className = 'secret-note-item';
        noteEl.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <h4 style="font-weight:700; font-size:14px; color:var(--primary);">${note.title}</h4>
            <button class="btn-delete-secret-note" data-note-id="${note.id}" style="background:none; border:none; color:var(--text-dim); cursor:pointer; font-size:11px;">Delete</button>
          </div>
          <p style="font-size:12px; color:var(--text-muted); line-height:1.4;">${note.text}</p>
        `;

        noteEl.querySelector('.btn-delete-secret-note').onclick = () => {
          mgr.deleteSecretNote(note.id);
          renderSecretNotesUI();
          showToast("Note Deleted", "Removed from private vault.", "🗑️");
        };

        listBox.appendChild(noteEl);
      });
    }
  }

  document.getElementById('btn-lock-lockbox').onclick = () => {
    window.couples.lockNotes();
    renderSecretNotesUI();
    showToast("Locked", "Private vault secured.", "🔒");
  };

  const modalAddSecretNote = document.getElementById('modal-add-secret-note');
  document.getElementById('btn-add-secret-note').onclick = () => {
    document.getElementById('secret-note-title').value = "";
    document.getElementById('secret-note-text').value = "";
    modalAddSecretNote.classList.add('active');
  };

  document.getElementById('btn-save-secret-note').onclick = () => {
    const title = document.getElementById('secret-note-title').value;
    const text = document.getElementById('secret-note-text').value;

    if (!title || !text) {
      showToast("Missing Fields", "Please complete all inputs.", "⚠️");
      return;
    }

    window.couples.addSecretNote(title, text);
    window.closeAllModals();
    renderSecretNotesUI();
    showToast("Note Saved!", "Stored securely in private lockbox.", "🔒");
  };


  // --- 11. LOVE CALCULATOR TAB CONTROLLER ---
  const btnCalculateLove = document.getElementById('btn-calculate-love');
  const calcFormCard = document.getElementById('calc-form-card');
  const calcLoading = document.getElementById('calc-loading');
  const calcResults = document.getElementById('calc-results');
  
  const calcName1 = document.getElementById('calc-name1');
  const calcName2 = document.getElementById('calc-name2');
  const calcRelation = document.getElementById('calc-relation');
  
  const calcLoadingStatus = document.getElementById('calc-loading-status');
  const calcLoadingSubstatus = document.getElementById('calc-loading-substatus');
  const calcProgressFill = document.getElementById('calc-progress-fill');
  
  const calcScoreRing = document.getElementById('calc-score-ring');
  const calcScoreValue = document.getElementById('calc-score-value');
  const calcVerdict = document.getElementById('calc-verdict');
  const calcReport = document.getElementById('calc-report');
  const calcAdvice = document.getElementById('calc-advice');
  
  const btnCalcWrite = document.getElementById('btn-calc-write');
  const btnCalcShare = document.getElementById('btn-calc-share');
  const btnCalcRetry = document.getElementById('btn-calc-retry');

  // Multi-step loading messages
  const scanningSteps = [
    { status: "Scanning Names...", sub: "Analyzing character vibration nodes..." },
    { status: "Measuring Attraction...", sub: "Evaluating alignment of stars..." },
    { status: "Quantifying Affection...", sub: "Checking laughter quotient..." },
    { status: "Checking Compatibility...", sub: "Running relationship stage matching..." },
    { status: "Finalizing Chemistry...", sub: "Synthesizing cosmic data..." }
  ];

  // Verdicts and Reports database
  const loveCalculatorDatabase = {
    crush: {
      high: {
        verdicts: ["Destined Duo 🌟", "Secret Soulmates 💞", "Instant Spark 🔥"],
        reports: [
          "[NAME1] and [NAME2] share a magnetic tension that is impossible to ignore. There is an unspoken understanding here that is ripe for a magical beginning.",
          "The chemistry between [NAME1] and [NAME2] is electric! The vibes suggest that if either makes a move, it's going to be a stellar love story."
        ],
        advice: "Don't keep it a secret forever. A gentle hint or a shared coffee could unlock something beautiful today."
      },
      medium: {
        verdicts: ["Curious Connection 👀", "Sweet Potential 🌱", "Playful Chemistry 💫"],
        reports: [
          "[NAME1] and [NAME2] have a cozy warmth. The interest is definitely there, but it needs a little bit of confidence and clear conversation to grow.",
          "There's a subtle charm between [NAME1] and [NAME2]. You two have fun, light-hearted energy, but someone needs to take the initiative!"
        ],
        advice: "Keep the interaction light, playful, and regular. Try finding common hobbies to bridge the gap."
      },
      low: {
        verdicts: ["Friendly Vibes ☕", "Uncharted Territory 🗺️"],
        reports: [
          "[NAME1] and [NAME2] have a solid base of friendly interaction. The romantic chemistry is still in its infancy, waiting for a catalyst.",
          "The current connection points toward friendship. But remember, the best romances often start as comfortable friendships."
        ],
        advice: "Build a strong foundation of trust and friendship first. True chemistry is grown, not just found."
      }
    },
    dating: {
      high: {
        verdicts: ["Power Couple 🏆", "Perfect Harmony 🎵", "Infinite Romance ♾️"],
        reports: [
          "[NAME1] and [NAME2] share a rare, deeply rooted connection. Your mutual understanding, emotional depth, and humor match perfectly.",
          "This relationship is built on a solid gold foundation. [NAME1] and [NAME2] are in sync, radiating warmth, trust, and intense passion."
        ],
        advice: "Celebrate your bond! Plan a special date night or a small surprise to keep the flames dancing."
      },
      medium: {
        verdicts: ["Comfortable Hearts ❤️", "Growing Together 📈", "Cozy Companions 🏡"],
        reports: [
          "The love between [NAME1] and [NAME2] is steady and warm. While life gets busy, your core connection remains sweet and supportive.",
          "[NAME1] and [NAME2] have great compatibility, balanced with individual strengths. You complement each other's lives beautifully."
        ],
        advice: "Keep communication channels wide open. Small, daily expressions of appreciation go a very long way."
      },
      low: {
        verdicts: ["Working Progress 🛠️", "Testing the Waters 🌊"],
        reports: [
          "[NAME1] and [NAME2] are navigating the early stages of alignment. While there is love, there are areas where patience is required to blend your lives.",
          "A relationship that has potential but needs focus. Understanding each other's love languages will help bridge minor gaps."
        ],
        advice: "Practice active listening. Dedicating quality time without distractions will help rebuild the spark."
      }
    },
    married: {
      high: {
        verdicts: ["Eternal Flame 🔥", "Golden Match 💍", "Soul Ties Together 🤝"],
        reports: [
          "The marriage between [NAME1] and [NAME2] is a beacon of love and unity. Your partnership is deeply inspiring, filled with trust and shared dreams.",
          "A stunning lifelong match. [NAME1] and [NAME2] are not just partners, but best friends who continue to choose each other day after day."
        ],
        advice: "Continue to nurture your friendship. You've built something beautiful; take a moment to reflect on your journey together."
      },
      medium: {
        verdicts: ["Solid Foundation 🧱", "Warm Hearth 🪵", "Strong Partnership 🤝"],
        reports: [
          "[NAME1] and [NAME2] have built a comfortable, secure life together. You handle life's challenges well, supporting each other through thick and thin.",
          "A stable marriage with a healthy blend of independence and togetherness. Your shared history is a source of strength."
        ],
        advice: "Keep the playfulness alive! Do something silly, try a new hobby together, or leave a sweet handwritten note."
      },
      low: {
        verdicts: ["Patience & Care ⏳", "Reconnecting 🔌"],
        reports: [
          "A season of patience for [NAME1] and [NAME2]. Marriage has cycles, and this is a time for rediscovering your shared values.",
          "The connection is there, but daily routines might be clouding the romance. A little effort can easily bring back the warmth."
        ],
        advice: "Start with small steps. Say 'thank you' more often and make time for one-on-one check-ins."
      }
    },
    ldr: {
      high: {
        verdicts: ["Unstoppable Connection 🚀", "Hearts Without Borders 🌍", "Destined Across Distance ✈️"],
        reports: [
          "Distance is nothing for the powerful bond between [NAME1] and [NAME2]. Your emotional intimacy, trust, and communication transcend miles.",
          "The chemistry between [NAME1] and [NAME2] is incredibly strong. Even miles apart, you are closer than couples who see each other every day."
        ],
        advice: "Keep finding creative ways to share moments, like watching movies together online or scheduling countdowns to your next visit."
      },
      medium: {
        verdicts: ["Steady Hearts 💓", "Resilient Love 🛡️", "Virtual Sweethearts 📱"],
        reports: [
          "[NAME1] and [NAME2] are doing a wonderful job managing the distance. Your trust is high, but the longing for physical presence is real.",
          "A resilient connection that is weathering the challenges of distance. Your communication keeps the love alive and vibrant."
        ],
        advice: "Try sending a physical letter or a surprise care package. Physical touchpoints bring comfort across miles."
      },
      low: {
        verdicts: ["Testing the Distance 🗺️", "Fading Signal 📡"],
        reports: [
          "The distance is presenting challenges for [NAME1] and [NAME2]. It requires deliberate effort to stay connected in each other's daily lives.",
          "The connection is feeling a bit strained. Re-establishing regular, meaningful check-ins is vital to stay aligned."
        ],
        advice: "Create a clear schedule for virtual dates and discuss plans for the future. Having a shared end goal makes the distance easier."
      }
    },
    complicated: {
      high: {
        verdicts: ["Passionate Paradox ⚡", "Magnetic Chaos 🌀", "Irresistible Attraction 🧲"],
        reports: [
          "The connection between [NAME1] and [NAME2] is undeniable and filled with passion. It might be complicated, but the feelings are intensely real.",
          "A high-chemistry match that keeps you both on your toes. There is a deep, magnetic pull that always draws you back together."
        ],
        advice: "Focus on clarity. Love is there, but defining your expectations will save you both emotional energy."
      },
      medium: {
        verdicts: ["Emotional Rollercoaster 🎢", "Unsolved Puzzle 🧩"],
        reports: [
          "A mix of sweet moments and uncertain steps. [NAME1] and [NAME2] care for each other, but timing or external factors are adding complexity.",
          "The potential is high, but there's a lack of alignment. You both need to decide if you are ready to invest fully."
        ],
        advice: "Take a step back to breathe and have an honest conversation about what you both truly want."
      },
      low: {
        verdicts: ["Misty Horizons 🌫️", "Fragile Vibe 🥀"],
        reports: [
          "[NAME1] and [NAME2] are in a delicate phase. There's a lot of background noise making it hard to feel the core connection.",
          "It's a challenging mix of emotions. If the complications outweigh the joy, it might be time to re-evaluate the direction."
        ],
        advice: "Prioritize your peace of mind. Healthy love should bring more joy than confusion."
      }
    }
  };

  btnCalculateLove.onclick = () => {
    const name1 = calcName1.value.trim();
    const name2 = calcName2.value.trim();
    const relation = calcRelation.value;
    
    if (!name1 || !name2) {
      showToast("Names Required", "Please enter both names to calculate chemistry.", "⚠️");
      return;
    }
    
    // Switch to loading state
    calcFormCard.style.display = 'none';
    calcLoading.style.display = 'flex';
    calcResults.style.display = 'none';
    
    let progress = 0;
    let stepIndex = 0;
    
    // Reset progress bar
    calcProgressFill.style.width = '0%';
    
    const interval = setInterval(() => {
      progress += 4;
      calcProgressFill.style.width = `${progress}%`;
      
      if (progress >= 20 && progress < 40 && stepIndex === 0) {
        stepIndex = 1;
      } else if (progress >= 40 && progress < 60 && stepIndex === 1) {
        stepIndex = 2;
      } else if (progress >= 60 && progress < 80 && stepIndex === 2) {
        stepIndex = 3;
      } else if (progress >= 80 && progress < 100 && stepIndex === 3) {
        stepIndex = 4;
      }
      
      calcLoadingStatus.textContent = scanningSteps[stepIndex].status;
      calcLoadingSubstatus.textContent = scanningSteps[stepIndex].sub;
      
      if (progress >= 100) {
        clearInterval(interval);
        showResults(name1, name2, relation);
      }
    }, 100);
  };
  
  function showResults(name1, name2, relation) {
    calcLoading.style.display = 'none';
    calcResults.style.display = 'block';
    
    // Calculate deterministic score
    const combined = [name1.toLowerCase(), name2.toLowerCase()].sort().join("");
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
      hash = combined.charCodeAt(i) + ((hash << 5) - hash);
    }
    const score = 60 + Math.abs(hash % 40);
    
    // Animate score value text count-up
    let currentVal = 0;
    const valueInterval = setInterval(() => {
      if (currentVal >= score) {
        calcScoreValue.textContent = `${score}%`;
        clearInterval(valueInterval);
      } else {
        currentVal++;
        calcScoreValue.textContent = `${currentVal}%`;
      }
    }, 15);
    
    // Animate SVG stroke-dashoffset (circumference = 408.4)
    const offset = 408.4 * (1 - score / 100);
    calcScoreRing.style.strokeDashoffset = offset;
    
    // Fetch database reports
    let bracket = "medium";
    if (score >= 85) bracket = "high";
    else if (score < 72) bracket = "low";
    
    const db = loveCalculatorDatabase[relation] || loveCalculatorDatabase.dating;
    const data = db[bracket];
    
    const verdict = data.verdicts[Math.abs(hash) % data.verdicts.length];
    const reportTemplate = data.reports[Math.abs(hash >> 1) % data.reports.length];
    
    const p1Name = name1.charAt(0).toUpperCase() + name1.slice(1);
    const p2Name = name2.charAt(0).toUpperCase() + name2.slice(1);
    
    const finalReport = reportTemplate
      .replace(/\[NAME1\]/g, p1Name)
      .replace(/\[NAME2\]/g, p2Name);
      
    calcVerdict.textContent = verdict;
    calcReport.textContent = finalReport;
    calcAdvice.textContent = data.advice;
    
    // Write message action
    btnCalcWrite.onclick = () => {
      ['gen-partner-name', 'flirty-partner-name', 'letter-partner-name', 'proposal-partner-name', 'story-partner-name'].forEach(id => {
        const input = document.getElementById(id);
        if (input) {
          input.value = p2Name;
        }
      });
      switchTab('generator');
    };
    
    // Share action
    btnCalcShare.onclick = () => {
      const shareText = `💖 Love Chemistry Result 💖\n\n${p1Name} & ${p2Name}\nStage: ${relation.toUpperCase()}\nChemistry Score: ${score}%\nVerdict: ${verdict}\n\nGenerated via Perfect Love Text app.`;
      
      if (navigator.share) {
        navigator.share({
          title: 'Love Chemistry Result',
          text: shareText
        }).catch(err => {
          copyToClipboard(shareText);
        });
      } else {
        copyToClipboard(shareText);
      }
    };
  }
  
  function copyToClipboard(text, customSuccessMessage) {
    const successTitle = customSuccessMessage ? "Link Copied!" : "Copied!";
    const successDesc = customSuccessMessage || "Love text copied to your clipboard.";
    
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          showToast(successTitle, successDesc, "❤️");
        }).catch(err => {
          fallbackCopyToClipboard(text, successTitle, successDesc);
        });
      } else {
        fallbackCopyToClipboard(text, successTitle, successDesc);
      }
    } catch (e) {
      fallbackCopyToClipboard(text, successTitle, successDesc);
    }
  }

  function fallbackCopyToClipboard(text, successTitle, successDesc) {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      document.body.appendChild(textarea);
      textarea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textarea);
      if (successful) {
        showToast(successTitle, successDesc, "❤️");
      } else {
        showToast("Copy Failed", "Please copy manually.", "❌");
      }
    } catch (err) {
      console.warn("Fallback copy failed:", err);
      showToast("Copy Failed", "Please copy manually.", "❌");
    }
  }
  
  btnCalcRetry.onclick = () => {
    calcFormCard.style.display = 'block';
    calcResults.style.display = 'none';
    calcName1.value = "";
    calcName2.value = "";
    calcRelation.selectedIndex = 0;
  };



  // --- 12. RELATIONSHIP ADVICE CORNER TAB ---
  const adviceCatBtns = document.querySelectorAll('[data-advice-cat]');
  
  function renderAdviceArticles() {
    const box = document.getElementById('advice-articles-list-box');
    box.innerHTML = "";

    const filtered = activeAdviceCategory === 'all'
      ? AdviceArticles
      : AdviceArticles.filter(art => art.category === activeAdviceCategory);

    filtered.forEach(art => {
      const card = document.createElement('div');
      card.className = 'advice-card';
      
      const tagLabels = { ldr: "Long Distance ✈️", comm: "Communication 🗣️", conflict: "Conflict 🤝", trust: "Trust 🔒" };
      const tagLabel = tagLabels[art.category] || "Advice";

      card.innerHTML = `
        <span class="advice-tag ${art.category}">${tagLabel}</span>
        <h4 class="advice-title">${art.title}</h4>
        <p class="advice-content">${art.content}</p>
      `;
      box.appendChild(card);
    });
  }

  adviceCatBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      adviceCatBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeAdviceCategory = btn.getAttribute('data-advice-cat');
      renderAdviceArticles();
    });
  });


  // --- COUPLES GAMES FLOWS ---
  const flashcard = document.getElementById('game-flashcard');
  const cardCatLabel = document.getElementById('game-card-category');
  const cardFrontText = document.getElementById('game-card-text');
  const cardBackText = document.getElementById('game-card-back-text');
  const cardCatSelect = document.getElementById('card-category-select');

  let activeCategoryQuestions = [];
  let questionIndex = 0;

  function drawQuestionCard() {
    const cat = cardCatSelect.value;
    activeCategoryQuestions = window.CoupleQuestions[cat] || window.CoupleQuestions.fun;
    const q = activeCategoryQuestions[questionIndex % activeCategoryQuestions.length];
    questionIndex++;

    flashcard.classList.remove('flipped');
    cardCatLabel.innerText = cardCatSelect.options[cardCatSelect.selectedIndex].text;
    cardFrontText.innerText = q;
  }

  flashcard.addEventListener('click', () => {
    flashcard.classList.toggle('flipped');
  });

  document.getElementById('btn-next-question').addEventListener('click', () => {
    drawQuestionCard();
  });

  cardCatSelect.addEventListener('change', () => {
    questionIndex = 0;
    drawQuestionCard();
  });

  // 2-Player pass-and-play trivia
  const btnStartTrivia = document.getElementById('btn-start-trivia');
  const triviaActive = document.getElementById('trivia-active');
  const triviaSetup = document.getElementById('trivia-setup');
  const triviaResults = document.getElementById('trivia-results');
  const triviaPlayerIndicator = document.getElementById('trivia-player-indicator');
  const triviaQuestionNumber = document.getElementById('trivia-question-number');
  const triviaQuestionText = document.getElementById('trivia-question-text');
  const triviaOptionsContainer = document.getElementById('trivia-options-container');
  
  let player1NameVal = "Alex";
  let player2NameVal = "Sam";

  btnStartTrivia.addEventListener('click', () => {
    player1NameVal = document.getElementById('player1-name').value || "Alex";
    player2NameVal = document.getElementById('player2-name').value || "Sam";
    
    window.couples.triviaState = {
      active: true,
      currentStep: 2, // 2: P1 Answering
      player1Answers: {},
      player2Guesses: {},
      currentQuestionIndex: 0
    };

    renderTriviaStep();
  });

  function renderTriviaStep() {
    const state = window.couples.triviaState;
    const currentQuestion = window.PartnerTriviaQuestions[state.currentQuestionIndex];

    if (state.currentStep === 2) {
      triviaSetup.classList.remove('active');
      triviaActive.classList.add('active');
      triviaResults.classList.remove('active');
      
      triviaPlayerIndicator.innerText = `${player1NameVal} Answering`;
      triviaPlayerIndicator.style.background = 'rgba(255, 94, 98, 0.12)';
      triviaPlayerIndicator.style.color = 'var(--primary)';
      triviaQuestionNumber.innerText = `Question ${state.currentQuestionIndex + 1} of 5`;
      triviaQuestionText.innerText = currentQuestion.question.replace("my", "your");

      renderTriviaOptions(currentQuestion.options, (selectedVal) => {
        state.player1Answers[currentQuestion.id] = selectedVal;
        
        if (state.currentQuestionIndex < 4) {
          state.currentQuestionIndex++;
          renderTriviaStep();
        } else {
          state.currentStep = 3;
          renderPassDeviceScreen();
        }
      });

    } else if (state.currentStep === 4) {
      triviaActive.classList.add('active');
      triviaResults.classList.remove('active');
      
      triviaPlayerIndicator.innerText = `${player2NameVal} Guessing`;
      triviaPlayerIndicator.style.background = 'rgba(255, 153, 102, 0.12)';
      triviaPlayerIndicator.style.color = 'var(--secondary)';
      triviaQuestionNumber.innerText = `Question ${state.currentQuestionIndex + 1} of 5`;
      triviaQuestionText.innerText = `What did ${player1NameVal} select: "${currentQuestion.question}"`;

      renderTriviaOptions(currentQuestion.options, (selectedVal) => {
        state.player2Guesses[currentQuestion.id] = selectedVal;

        if (state.currentQuestionIndex < 4) {
          state.currentQuestionIndex++;
          renderTriviaStep();
        } else {
          calculateTriviaScore();
        }
      });
    }
  }

  function renderTriviaOptions(options, onSelect) {
    triviaOptionsContainer.innerHTML = "";
    options.forEach(opt => {
      const optBtn = document.createElement('div');
      optBtn.className = 'quiz-option';
      optBtn.innerText = opt;
      optBtn.onclick = () => onSelect(opt);
      triviaOptionsContainer.appendChild(optBtn);
    });
  }

  function renderPassDeviceScreen() {
    triviaActive.classList.remove('active');
    
    const tempDiv = document.createElement('div');
    tempDiv.className = 'card game-setup active';
    tempDiv.style.textAlign = 'center';
    tempDiv.innerHTML = `
      <span style="font-size:48px;">🔄</span>
      <h3 style="font-family: var(--font-display); font-weight:700; margin-top:15px; margin-bottom:10px;">Pass the Device</h3>
      <p style="font-size:13px; color:var(--text-muted); margin-bottom:20px;">Now hand the phone to <strong>${player2NameVal}</strong> to guess your choices!</p>
      <button id="btn-begin-guessing" class="btn btn-primary">I am Ready</button>
    `;
    document.getElementById('game-subtab-trivia').appendChild(tempDiv);
    
    document.getElementById('btn-begin-guessing').onclick = () => {
      tempDiv.remove();
      const state = window.couples.triviaState;
      state.currentStep = 4; // P2 guessing
      state.currentQuestionIndex = 0;
      triviaActive.classList.add('active');
      renderTriviaStep();
    };
  }

  function calculateTriviaScore() {
    const state = window.couples.triviaState;
    let score = 0;
    
    window.PartnerTriviaQuestions.forEach(q => {
      if (state.player1Answers[q.id] === state.player2Guesses[q.id]) {
        score++;
      }
    });

    const percent = Math.round((score / 5) * 100);
    
    triviaActive.classList.remove('active');
    triviaResults.classList.add('active');
    
    document.getElementById('trivia-result-subtitle').innerText = `How well ${player2NameVal} knows ${player1NameVal}`;
    document.getElementById('trivia-score-percentage').innerText = `${percent}%`;
    document.getElementById('trivia-score-fraction').innerText = `${score} out of 5 Guessed Correctly`;
    
    let comment = "Keep talking! There's still so much to discover about each other.";
    if (percent === 100) comment = "Perfect Sync! You are absolute soulmates.";
    else if (percent >= 80) comment = "Amazing! You know each other incredibly well.";
    else if (percent >= 60) comment = "Pretty good! You make a great team.";
    
    document.getElementById('trivia-score-comment').innerText = comment;
  }

  document.getElementById('btn-restart-trivia').onclick = () => {
    triviaResults.classList.remove('active');
    triviaSetup.classList.add('active');
  };

  // Couple Vibe Quiz
  const quizIntro = document.getElementById('quiz-intro');
  const quizActive = document.getElementById('quiz-active');
  const quizResultsBox = document.getElementById('quiz-results');
  let currentQuizStep = 0;
  let quizScores = { cozy: 0, romantic: 0, adventurous: 0, playful: 0 };

  document.getElementById('btn-start-vibe-quiz').onclick = () => {
    quizIntro.style.display = 'none';
    quizActive.style.display = 'block';
    currentQuizStep = 0;
    quizScores = { cozy: 0, romantic: 0, adventurous: 0, playful: 0 };
    renderQuizQuestion();
  };

  function renderQuizQuestion() {
    const quiz = window.CoupleVibeQuiz;
    const qData = quiz.questions[currentQuizStep];
    
    document.getElementById('quiz-step-count').innerText = `Question ${currentQuizStep + 1} of 3`;
    document.getElementById('quiz-question-title').innerText = qData.q;
    
    const optionsBox = document.getElementById('quiz-options-box');
    optionsBox.innerHTML = "";
    
    qData.options.forEach(opt => {
      const optBtn = document.createElement('div');
      optBtn.className = 'quiz-option';
      optBtn.innerText = opt.text;
      optBtn.onclick = () => {
        quizScores[opt.type]++;
        if (currentQuizStep < 2) {
          currentQuizStep++;
          renderQuizQuestion();
        } else {
          evaluateQuizResult();
        }
      };
      optionsBox.appendChild(optBtn);
    });
  }

  function evaluateQuizResult() {
    quizActive.style.display = 'none';
    quizResultsBox.style.display = 'block';

    let maxType = 'romantic';
    let maxScore = -1;
    for (const [type, score] of Object.entries(quizScores)) {
      if (score > maxScore) {
        maxScore = score;
        maxType = type;
      }
    }

    const result = window.CoupleVibeQuiz.results[maxType];
    document.getElementById('quiz-result-title').innerText = result.title;
    document.getElementById('quiz-result-desc').innerText = result.desc;
  }

  document.getElementById('btn-restart-vibe-quiz').onclick = () => {
    quizResultsBox.style.display = 'none';
    quizIntro.style.display = 'block';
  };
});
