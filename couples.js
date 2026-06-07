/**
 * couples.js (Expanded)
 * Fun Couples Section: Questions, Quizzes, Challenges, 2-Player Game, Secret PIN Notes, and Daily Challenges
 */

const CoupleQuestions = {
  fun: [
    "If we were characters in a movie, who would we be and why?",
    "What is the funniest memory we share?",
    "If we won the lottery tomorrow, what is the first thing we would buy?",
    "What would be our theme song as a couple?",
    "If we could swap lives for a day, what's the first thing you'd do?"
  ],
  deep: [
    "What is one thing you learned about love from your parents, and one thing you want to do differently?",
    "When did you first realize you were in love with me?",
    "What is your biggest fear about our relationship, and how can we address it?",
    "What does a 'perfect life' look like to you in ten years?",
    "What is a way I've grown since we met that you've noticed and appreciated?"
  ],
  future: [
    "Where is one place in the world you want us to live or travel to together?",
    "What are three things on your bucket list that we can accomplish together?",
    "How do you think our relationship will change when we are old and wrinkly?",
    "What are your thoughts on how we should handle major life changes together?",
    "What is a dream you have for us that you haven't told me yet?"
  ],
  spicy: [
    "What is your favorite memory of us being intimate?",
    "What is a secret fantasy you have that you'd like to try with me?",
    "What is something I do that instantly turns you on?",
    "How would you describe our physical chemistry in three words?",
    "Where is the most adventurous place you'd like to steal a kiss?"
  ]
};

const ConversationStarters = [
  "What's a hobby you've always wanted to try but haven't yet?",
  "What is the best piece of advice you have ever received?",
  "If you could have dinner with anyone from history, who would it be?",
  "What is your favorite childhood memory that still makes you smile?",
  "If you had to describe your perfect day off, what would we do?",
  "What is a book, movie, or song that completely changed your perspective?",
  "What are you most proud of achieving in the past year?",
  "If you could speak any language fluently instantly, what would it be?"
];

const PartnerTriviaQuestions = [
  {
    id: 1,
    question: "What is my absolute favorite comfort food?",
    options: ["Pizza / Pasta", "Burgers / Fries", "Sushi / Asian", "Ice Cream / Sweets"]
  },
  {
    id: 2,
    question: "What would be my dream vacation destination?",
    options: ["Tropical Beach Resort", "Historical European City", "Mountain Cabin / Hiking", "Futuristic Tech City (e.g. Tokyo)"]
  },
  {
    id: 3,
    question: "What is my favorite way to spend a rainy Saturday?",
    options: ["Binge-watching movies/shows", "Reading a cozy book", "Playing video games / board games", "Cooking or baking something new"]
  },
  {
    id: 4,
    question: "What is my love language?",
    options: ["Words of Affirmation", "Quality Time", "Acts of Service", "Physical Touch / Gifts"]
  },
  {
    id: 5,
    question: "If I could have a superpower, which one would I choose?",
    options: ["Flight", "Teleportation", "Mind Reading", "Time Travel"]
  }
];

const CoupleVibeQuiz = {
  questions: [
    {
      q: "Choose a perfect date night:",
      options: [
        { text: "Cozy movie night at home under a blanket fort", type: "cozy" },
        { text: "Candlelit dinner at a high-end rooftop restaurant", type: "romantic" },
        { text: "Road trip to a nearby city with no planned itinerary", type: "adventurous" },
        { text: "Going to a concert or arcade game tournament", type: "playful" }
      ]
    },
    {
      q: "How do you show appreciation?",
      options: [
        { text: "Writing a long, heartfelt paragraph", type: "romantic" },
        { text: "Taking care of chores or making breakfast", type: "cozy" },
        { text: "Surprising them with a concert ticket", type: "adventurous" },
        { text: "Tickling, playful teasing, and inside jokes", type: "playful" }
      ]
    },
    {
      q: "Pick a travel style:",
      options: [
        { text: "Glamping in a forest cabin with hot chocolate", type: "cozy" },
        { text: "Paris or Venice hotel overlooking beautiful streets", type: "romantic" },
        { text: "Backpacking across Southeast Asia or South America", type: "adventurous" },
        { text: "Theme parks, waterslides, and coastal beaches", type: "playful" }
      ]
    }
  ],
  results: {
    cozy: {
      title: "Cozy Homebodies ☕",
      desc: "Your relationship vibe is warm, secure, and relaxed. You find joy in quiet moments together, lazy Sunday mornings, and sharing a safe space away from the noise of the world."
    },
    romantic: {
      title: "Classic Romantics 🌹",
      desc: "Your love belongs in the movies! You believe in grand gestures, deep emotional conversations, candlelit dinners, and keeping the traditional flame of romance burning bright."
    },
    adventurous: {
      title: "Partners in Adventure 🎒",
      desc: "You are thrill-seekers and explorers! Your bond is built on trying new things, taking risks, traveling together, and viewing life as an ongoing expedition."
    },
    playful: {
      title: "Playful Best Friends 🎮",
      desc: "Laughter is the anchor of your love! You joke constantly, play games, tease each other, and value a relationship where you can both act like big kids."
    }
  }
};

const DefaultChallenges = [
  { id: "ch1", title: "30-Second Hug", desc: "Hug your partner for at least 30 seconds straight without saying a word. Feel their heartbeat.", category: "affection" },
  { id: "ch2", title: "Love Note Hunt", desc: "Write a small note of appreciation and hide it somewhere they will find it (pocket, wallet, mirror).", category: "surprise" },
  { id: "ch3", title: "Screen-Free Evening", desc: "Spend a minimum of 2 hours after sunset without looking at your phones. Talk, play cards, or just sit.", category: "quality_time" },
  { id: "ch4", title: "Recreate the First Date", desc: "Order the same food or wear the same color clothes you wore when you first went out.", category: "memories" },
  { id: "ch5", title: "Complement Fest", desc: "Share 3 specific, non-physical things you love about each other's personality.", category: "words" }
];

const DailyChallengeBank = [
  { title: "Send a random compliment", desc: "Text your partner something you sincerely admire about them right now." },
  { title: "Share your favorite memory", desc: "Write down the memory that makes you laugh or feel closest to them and text it." },
  { title: "Tell them 3 things you appreciate", desc: "List three small acts they did recently that you are grateful for." },
  { title: "Plan a small surprise", desc: "Order their favorite snack, write a mini note, or prepare their tea unexpectedly." },
  { title: "Eye Contact Check", desc: "Look into each other's eyes for 60 seconds without talking or looking away." },
  { title: "Praise publicly", desc: "Share a post, or tell someone else how great your partner is in their hearing." }
];

class CouplesManager {
  constructor() {
    this.challenges = window.safeJsonParse(window.safeStorage.getItem('love_challenges'), DefaultChallenges.map(c => ({...c, completed: false})));
    
    // Secret Notes states
    this.secretNotesPin = window.safeStorage.getItem('love_secret_notes_pin') || ""; // If empty, PIN not set
    this.secretNotes = window.safeJsonParse(window.safeStorage.getItem('love_secret_notes'), [
      { id: "s1", title: "My Secret Promise", text: "I promise to always make time for us, no matter how busy work gets. You are my priority." }
    ]);
    this.isPinVerified = false;

    this.triviaState = {
      active: false,
      currentStep: 1,
      player1Answers: {},
      player2Guesses: {},
      currentQuestionIndex: 0
    };
  }

  // --- Challenges ---
  toggleChallenge(id) {
    const challenge = this.challenges.find(c => c.id === id);
    if (challenge) {
      challenge.completed = !challenge.completed;
      this.saveChallenges();
    }
    return challenge;
  }

  saveChallenges() {
    window.safeStorage.setItem('love_challenges', JSON.stringify(this.challenges));
  }

  getChallengeProgress() {
    const completed = this.challenges.filter(c => c.completed).length;
    return {
      completed,
      total: this.challenges.length,
      percentage: Math.round((completed / this.challenges.length) * 100) || 0
    };
  }

  resetChallenges() {
    this.challenges = DefaultChallenges.map(c => ({...c, completed: false}));
    this.saveChallenges();
    return this.challenges;
  }

  /**
   * Returns a locked Daily Challenge seeded based on the current date
   */
  getDailyChallenge() {
    const today = new Date();
    const dateSeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const index = dateSeed % DailyChallengeBank.length;
    return DailyChallengeBank[index];
  }

  // --- Secret Notes Lockbox ---
  setPin(pin) {
    if (pin && pin.length === 4) {
      this.secretNotesPin = pin;
      window.safeStorage.setItem('love_secret_notes_pin', pin);
      this.isPinVerified = true;
      return true;
    }
    return false;
  }

  verifyPin(pin) {
    if (this.secretNotesPin === pin) {
      this.isPinVerified = true;
      return true;
    }
    return false;
  }

  lockNotes() {
    this.isPinVerified = false;
  }

  addSecretNote(title, text) {
    const newNote = {
      id: "sec_" + Date.now(),
      title,
      text
    };
    this.secretNotes.push(newNote);
    this.saveSecretNotes();
    return newNote;
  }

  deleteSecretNote(id) {
    this.secretNotes = this.secretNotes.filter(n => n.id !== id);
    this.saveSecretNotes();
  }

  saveSecretNotes() {
    window.safeStorage.setItem('love_secret_notes', JSON.stringify(this.secretNotes));
  }
}

// Export to window
window.CoupleQuestions = CoupleQuestions;
window.ConversationStarters = ConversationStarters;
window.PartnerTriviaQuestions = PartnerTriviaQuestions;
window.CoupleVibeQuiz = CoupleVibeQuiz;
window.CouplesManager = CouplesManager;
