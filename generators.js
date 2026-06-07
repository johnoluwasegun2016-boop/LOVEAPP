/**
 * generators.js (Expanded)
 * Multi-Language AI Text Generator simulation engine
 * Supports: 9 Styles, 8 Languages, 9 Recipient Types, 7 Moods, Speeches, Proposals,
 * Love Stories, Flirty text bank, and Naija Corner.
 */

// Safe localStorage wrapper for Android WebView compatibility
(function() {
  let memoryStore = {};
  window.safeStorage = {
    getItem(key) {
      try {
        const val = localStorage.getItem(key);
        return val !== null ? val : memoryStore[key] || null;
      } catch (e) {
        console.warn("localStorage.getItem failed, using memory store:", e);
        return memoryStore[key] || null;
      }
    },
    setItem(key, value) {
      try {
        localStorage.setItem(key, value);
      } catch (e) {
        console.warn("localStorage.setItem failed, using memory store:", e);
      }
      memoryStore[key] = String(value);
    },
    removeItem(key) {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        console.warn("localStorage.removeItem failed, using memory store:", e);
      }
      delete memoryStore[key];
    }
  };
})();

// Safe JSON parsing wrapper to prevent initialization crashes with corrupted data
window.safeJsonParse = function(str, fallback) {
  try {
    if (!str) return fallback;
    return JSON.parse(str) || fallback;
  } catch (e) {
    console.warn("safeJsonParse failed, returning fallback:", e);
    return fallback;
  }
};

// Core LoveTemplates for AI message generation
const LoveTemplates = {
  en: {
    styles: {
      romantic: [
        "My dear [NAME], your love is the greatest gift in my life. Every day with you feels like a beautiful dream come true. [DETAIL]",
        "To [NAME], you are my soulmate and my best friend. I love you more with every passing second. [DETAIL]",
        "My heart beats for you, [NAME]. You bring so much light and joy into my world. [DETAIL]"
      ],
      sweet: [
        "Sending a little sweet note to the most special person in my life. I hope your day is as bright as your smile, [NAME]. [DETAIL]",
        "Thinking of you, [NAME]. You make my heart melt with your kindness. [DETAIL]"
      ],
      cute: [
        "You're my absolute favorite person, [NAME]! I'm so lucky to have you. [DETAIL]",
        "Hey [NAME], just wanted to tell you that you're super cute and I love you! [DETAIL]"
      ],
      flirty: [
        "Can't stop thinking about you, [NAME]. Let's make some sweet trouble soon! 😉 [DETAIL]",
        "Hey [NAME], you look amazing in my thoughts today. [DETAIL]"
      ],
      passionate: [
        "I need you, [NAME]. Your touch, your warmth, and your love are all that I crave. You are my fire. [DETAIL]",
        "My passion for you burns brighter than ever, [NAME]. You are my everything. [DETAIL]"
      ],
      deep_emotional: [
        "[NAME], you are my anchor. In a world of chaos, your love is my peace and my home. [DETAIL]",
        "My connection with you, [NAME], goes deeper than words can explain. You hold my heart. [DETAIL]"
      ],
      apology: [
        "I'm so sorry, [NAME]. I never meant to cause you pain. Please let me make it up to you. [DETAIL]",
        "I regret my actions, [NAME]. Your happiness is my priority, and I want to fix this. [DETAIL]"
      ],
      missing_you: [
        "Every second away from you feels like an eternity, [NAME]. I miss your presence and your hugs. [DETAIL]",
        "The distance only makes my heart grow fonder, [NAME]. I can't wait to hold you. [DETAIL]"
      ],
      appreciation: [
        "Thank you for being my rock, [NAME]. I appreciate everything you do and who you are. [DETAIL]",
        "I am so grateful for your support and your love, [NAME]. You are my blessing. [DETAIL]"
      ]
    },
    recipients: {
      crush: "my sweet crush",
      new_relationship: "my new love",
      boyfriend: "my boyfriend",
      girlfriend: "my girlfriend",
      fiance: "my fiancé",
      husband: "my husband",
      wife: "my wife",
      long_distance: "my long-distance love",
      reconciliation: "my sweetheart"
    },
    moods: {
      happy: "My heart is overflowing with happiness today because of you.",
      missing: "I'm sitting here thinking about you and missing you so much.",
      romantic: "In the mood for romance, thinking of your beautiful eyes.",
      grateful: "Just wanted to say how incredibly grateful I am for you.",
      lonely: "The house feels quiet without you, sending all my love.",
      celebrating: "Let's celebrate our love today! You are my victory.",
      guilty: "I feel bad about our disagreement and want to make it right."
    }
  },
  fr: {
    styles: {
      romantic: [
        "Mon amour [NAME], ton amour est le plus beau cadeau de ma vie. Chaque jour avec toi est un rêve. [DETAIL]",
        "Pour [NAME], tu es l'âme sœur et mon meilleur ami. Je t'aime plus chaque jour. [DETAIL]"
      ],
      sweet: [
        "Un petit message doux pour la personne la plus spéciale de ma vie, [NAME]. [DETAIL]"
      ],
      cute: [
        "Tu es ma personne préférée, [NAME]! J'ai tellement de chance de t'avoir. [DETAIL]"
      ],
      flirty: [
        "Je ne peux pas m'empêcher de penser à toi, [NAME]. À bientôt ! 😉 [DETAIL]"
      ],
      passionate: [
        "J'ai besoin de toi, [NAME]. Ton toucher, ta chaleur et ton amour sont tout ce que je désire. [DETAIL]"
      ],
      deep_emotional: [
        "[NAME], tu es mon ancre. Dans ce monde chaotique, ton amour est ma paix. [DETAIL]"
      ],
      apology: [
        "Je suis tellement désolé, [NAME]. Je n'ai jamais voulu te faire du mal. Pardonne-moi. [DETAIL]"
      ],
      missing_you: [
        "Chaque seconde loin de toi semble une éternité, [NAME]. Tu me manques. [DETAIL]"
      ],
      appreciation: [
        "Merci d'être mon rocher, [NAME]. J'apprécie tout ce que tu fais. [DETAIL]"
      ]
    },
    recipients: {
      crush: "mon coup de cœur",
      new_relationship: "mon nouvel amour",
      boyfriend: "mon petit ami",
      girlfriend: "ma petite amie",
      fiance: "mon fiancé",
      husband: "mon mari",
      wife: "ma femme",
      long_distance: "mon amour à distance",
      reconciliation: "mon cœur"
    },
    moods: {
      happy: "Mon cœur déborde de bonheur aujourd'hui grâce à toi.",
      missing: "Je pense à toi et tu me manques énormément.",
      romantic: "D'humeur romantique, je pense à tes yeux magnifiques.",
      grateful: "Je voulais juste te dire à quel point je te suis reconnaissant.",
      lonely: "La maison est vide sans toi, je t'envoie tout mon amour.",
      celebrating: "Célébrons notre amour aujourd'hui !",
      guilty: "Je me sens mal pour notre dispute et je veux arranger les choses."
    }
  },
  es: {
    styles: {
      romantic: [
        "Mi amor [NAME], eres la luz de mi vida. Cada momento contigo es un tesoro. [DETAIL]",
        "Para [NAME], eres mi alma gemela y mi mejor amigo. Te amo más cada segundo. [DETAIL]"
      ],
      sweet: [
        "Un pequeño mensaje dulce para la persona más especial de mi vida, [NAME]. [DETAIL]"
      ],
      cute: [
        "¡Eres mi persona favorita, [NAME]! Qué suerte tengo de tenerte. [DETAIL]"
      ],
      flirty: [
        "No puedo dejar de pensar en ti, [NAME]. ¡Hagamos planes pronto! 😉 [DETAIL]"
      ],
      passionate: [
        "Te necesito, [NAME]. Tu tacto, tu calidez y tu amor son todo lo que deseo. [DETAIL]"
      ],
      deep_emotional: [
        "[NAME], eres mi ancla. En este mundo caótico, tu amor es mi paz. [DETAIL]"
      ],
      apology: [
        "Lo siento mucho, [NAME]. Nunca quise hacerte daño. Por favor, perdóname. [DETAIL]"
      ],
      missing_you: [
        "Cada segundo lejos de ti se siente como una eternidad, [NAME]. Te extraño. [DETAIL]"
      ],
      appreciation: [
        "Gracias por ser mi roca, [NAME]. Aprecio todo lo que haces. [DETAIL]"
      ]
    },
    recipients: {
      crush: "mi amor platónico",
      new_relationship: "mi nuevo amor",
      boyfriend: "mi novio",
      girlfriend: "mi novia",
      fiance: "mi prometido",
      husband: "mi esposo",
      wife: "mi esposa",
      long_distance: "mi amor a distancia",
      reconciliation: "mi cielo"
    },
    moods: {
      happy: "Mi corazón rebosa de felicidad hoy gracias a ti.",
      missing: "Estoy sentado pensando en ti y extrañándote mucho.",
      romantic: "De humor romántico, pensando en tus ojos hermosos.",
      grateful: "Solo quería decirte lo increíblemente agradecido que estoy por ti.",
      lonely: "La casa se siente vacía sin ti, te envío todo mi amor.",
      celebrating: "¡Celebremos nuestro amor hoy!",
      guilty: "Me siento mal por nuestro desacuerdo y quiero solucionarlo."
    }
  },
  pt: {
    styles: {
      romantic: [
        "Meu amor [NAME], você é a luz da minha vida. Cada dia com você é um sonho. [DETAIL]",
        "Para [NAME], você é minha alma gêmea e melhor amigo. Te amo mais a cada segundo. [DETAIL]"
      ],
      sweet: [
        "Uma mensagem simples e doce para lembrar o quanto você é especial, [NAME]. [DETAIL]"
      ],
      cute: [
        "Você é a minha pessoa favorita, [NAME]! Tenho muita sorte de te ter. [DETAIL]"
      ],
      flirty: [
        "Não consigo parar de pensar em você, [NAME]. Vamos nos ver logo! 😉 [DETAIL]"
      ],
      passionate: [
        "Preciso de você, [NAME]. Seu toque, seu calor e seu amor são tudo o que desejo. [DETAIL]"
      ],
      deep_emotional: [
        "[NAME], você é a minha âncora. Neste mundo caótico, seu amor é minha paz. [DETAIL]"
      ],
      apology: [
        "Me desculpe, [NAME]. Eu nunca quis te magoar. Por favor, me perdoe. [DETAIL]"
      ],
      missing_you: [
        "Cada segundo longe de você parece uma eternidade, [NAME]. Sinto sua falta. [DETAIL]"
      ],
      appreciation: [
        "Obrigado por ser meu porto seguro, [NAME]. Agradeço tudo o que você faz. [DETAIL]"
      ]
    },
    recipients: {
      crush: "meu crush",
      new_relationship: "meu novo amor",
      boyfriend: "meu namorado",
      girlfriend: "minha namorada",
      fiance: "meu noivo",
      husband: "meu marido",
      wife: "minha esposa",
      long_distance: "meu amor à distância",
      reconciliation: "meu bem"
    },
    moods: {
      happy: "Meu coração transborda de felicidade hoje por sua causa.",
      missing: "Estou aqui pensando em você e com muita saudade.",
      romantic: "Em um clima romântico, pensando nos seus olhos lindos.",
      grateful: "Só queria dizer o quanto sou incrivelmente grato por você.",
      lonely: "A casa parece vazia sem você, enviando todo o meu amor.",
      celebrating: "Vamos celebrar o nosso amor hoje!",
      guilty: "Me sinto mal com o nosso desentendimento e quero resolver isso."
    }
  },
  yo: {
    styles: {
      romantic: [
        "Ololufe mi [NAME], ife re ni ebun to tobi julo ninu aye mi. Gbogbo ojo pelu re dabi ala to rewa. [DETAIL]"
      ],
      sweet: [
        "Mo n fi ife ranse si eni pataki julo ninu aye mi, [NAME]. [DETAIL]"
      ],
      cute: [
        "Iwo ni eni pataki julo fun mi, [NAME]! [DETAIL]"
      ],
      flirty: [
        "Emi ko le dawoduro ronu nipa re, [NAME]. O ya ka pade laipe! 😉 [DETAIL]"
      ],
      passionate: [
        "Okan mi n lu nitori re, [NAME]. Iwo ni ohun gbogbo fun mi. [DETAIL]"
      ],
      deep_emotional: [
        "[NAME], ife re lo n fun mi ni alaafia ati itunu ninu aye yi. [DETAIL]"
      ],
      apology: [
        "Mo toro aforiji, [NAME]. Emi ko fe ki okan re baje. [DETAIL]"
      ],
      missing_you: [
        "Mo n se apon re pupo, [NAME]. Emi ko le duro lati ri o. [DETAIL]"
      ],
      appreciation: [
        "O seun pupo fun atileyin re, [NAME]. O se pataki fun mi. [DETAIL]"
      ]
    },
    recipients: {
      crush: "afefe mi",
      new_relationship: "ife tuntun mi",
      boyfriend: "ore mi",
      girlfriend: "arewa mi",
      fiance: "afesona mi",
      husband: "oko mi",
      wife: "aya mi",
      long_distance: "ololufe mi ti o jina",
      reconciliation: "sweetheart mi"
    },
    moods: {
      happy: "Okan mi kun fun ayo nitori re.",
      missing: "Mo n ronu re pupo yau.",
      romantic: "Ife re n kun okan mi nisisiyi.",
      grateful: "Mo n dupe lowo Olorun fun ebun re.",
      lonely: "Aaye yi dakẹ lai si o.",
      celebrating: "Je ki a se ajoyo ife wa loni!",
      guilty: "Okan mi ko bale nitori aawọ wa."
    }
  },
  ha: {
    styles: {
      romantic: [
        "Zaburar zuciyata [NAME], ke ce hasken rayuwata. Kowace rana tare da ke albarka ce. [DETAIL]"
      ],
      sweet: [
        "Sakon godiya gare ki, [NAME]. Ina son ki sosai. [DETAIL]"
      ],
      cute: [
        "Farin cikina, [NAME]! Ke ce kadai a zuciyata. [DETAIL]"
      ],
      flirty: [
        "Ina son ganinki yau, [NAME]. 😉 [DETAIL]"
      ],
      passionate: [
        "Zuciyata tana bugawa saboda ke kadai, [NAME]. [DETAIL]"
      ],
      deep_emotional: [
        "[NAME], soyayyarki ce hasken rayuwata da ke taimaka mini a kowane lokaci. [DETAIL]"
      ],
      apology: [
        "Ina neman yafiyarki, [NAME]. Kada ki yi fushi da ni. [DETAIL]"
      ],
      missing_you: [
        "Ina kewarki sosai yau, [NAME]. [DETAIL]"
      ],
      appreciation: [
        "Na gode da kowane irin kulawa da kike ba ni, [NAME]. [DETAIL]"
      ]
    },
    recipients: {
      crush: "masoyiyata ta sirri",
      new_relationship: "sabuwar soyayyata",
      boyfriend: "masoyina",
      girlfriend: "masoyiyata",
      fiance: "wanda zan aura",
      husband: "mijuna",
      wife: "matata",
      long_distance: "soyayyata ta nesa",
      reconciliation: "zaɓin zuciyata"
    },
    moods: {
      happy: "Zuciyata tana cike da farin ciki yau saboda ke.",
      missing: "Ina nan zaune ina tunaninki da kewarki sosai.",
      romantic: "Ina cikin yanayi na soyayya, ina tunanin kyawawan idanunki.",
      grateful: "Ina matukar godiya da samunki a rayuwata.",
      lonely: "Gidan ya yi shuru babu ke, ina tura miki dukkan soyayyata.",
      celebrating: "Bari mu yi bikin soyayyarmu yau!",
      guilty: "Ina jin ba dadi game da rashin fahimtar juna da muka samu."
    }
  },
  ig: {
    styles: {
      romantic: [
        "Obim [NAME], ị bụ ìhè nke ndụ m. Gị na m ịnọ na-atọ m ụtọ mgbe niile. [DETAIL]"
      ],
      sweet: [
        "Obim, ana m eche banyere gị ugbu a, [NAME]. [DETAIL]"
      ],
      cute: [
        "Ị bụ enyi m hụrụ n'anya, [NAME]! [DETAIL]"
      ],
      flirty: [
        "Obim, achọrọ m ịhụ gị taa, [NAME]. 😉 [DETAIL]"
      ],
      passionate: [
        "Obi m na-akụ maka gị naanị, [NAME]. Ị bụ ihe niile m nwere. [DETAIL]"
      ],
      deep_emotional: [
        "[NAME], ịhụnanya gị na-enye m ume na ndụ. Mụ na gị ga-adị ruo mgbe ebighị ebi. [DETAIL]"
      ],
      apology: [
        "Gbaghara m, [NAME]. Obi m adịghị mma maka ihe m mere gị. [DETAIL]"
      ],
      missing_you: [
        "Ana m atụ uche gị nke ukwuu taa, [NAME]. [DETAIL]"
      ],
      appreciation: [
        "Dịrị mma, [NAME] maka ịhụnanya na nkwado gị. Ị bụ ihe pụrụ iche. [DETAIL]"
      ]
    },
    recipients: {
      crush: "onye m na-akụnye n'obi",
      new_relationship: "ịhụnanya ọhụrụ m",
      boyfriend: "enyi m nwoke",
      girlfriend: "enyi m nwaanyị",
      fiance: "onye m ga-alụ",
      husband: "di m",
      wife: "nwunye m",
      long_distance: "ịhụnanya m nke dị anya",
      reconciliation: "onye nkem"
    },
    moods: {
      happy: "Obi m jupụtara na nụrịrị taa n'ihi gị.",
      missing: "Anọ m ebe a na-eche banyere gị ma na-atụ uche gị nke ukwuu.",
      romantic: "M nọ n'ụdị ịhụnanya, na-eche banyere anya gị mara mma.",
      grateful: "Chọrọ m ikwu na m nwere ekele dị ukwuu maka gị.",
      lonely: "Ụlọ ahụ dị nwayọọ na-enweghị gị, na-ezitere gị ịhụnanya m niile.",
      celebrating: "Ka anyị mee emume ịhụnanya anyị taa!",
      guilty: "Obi m adịghị mma maka nghọtahie anyị nwere."
    }
  },
  ar: {
    styles: {
      romantic: [
        "حبيبي [NAME]، أنت نور حياتي. كل لحظة أقضيها معك هي كنز حقيقي. [DETAIL]",
        "إلى [NAME]، أنت توأم روحي وأفضل صديق لي. أحبك أكثر مع كل ثانية تمر. [DETAIL]"
      ],
      sweet: [
        "رسالة صغيرة لأذكرك بمدى أهميتك بالنسبة لي، [NAME]. [DETAIL]"
      ],
      cute: [
        "أنت إشعاري المفضل، [NAME]! أنا محظوظ جداً بوجودك. [DETAIL]"
      ],
      flirty: [
        "لا يمكنني التوقف عن التفكير بك، [NAME]. دعنا نلتقي قريباً! 😉 [DETAIL]"
      ],
      passionate: [
        "أحتاج إليك، [NAME]. لمستك ودفئك وحبك هو كل ما أتمناه. [DETAIL]"
      ],
      deep_emotional: [
        "[NAME]، أنت مرساة روحي. في عالم من الفوضى، حبك هو سلامي وموطني. [DETAIL]"
      ],
      apology: [
        "أنا آسف جداً، [NAME]. لم أكن أقصد أبداً إيذاءك. يرجى مسامحتي. [DETAIL]"
      ],
      missing_you: [
        "كل ثانية بعيداً عنك تبدو كأنها دهر، [NAME]. أشتاق إليك كثيراً. [DETAIL]"
      ],
      appreciation: [
        "شكراً لكونك سندي، [NAME]. أقدر كل ما تفعله وكل ما أنت عليه. [DETAIL]"
      ]
    },
    recipients: {
      crush: "حبي السري",
      new_relationship: "حبي الجديد",
      boyfriend: "حبيبي",
      girlfriend: "حبيبتي",
      fiance: "خطيبي",
      husband: "زوجي",
      wife: "زوجتي",
      long_distance: "حبي البعيد",
      reconciliation: "حبيبي الغالي"
    },
    moods: {
      happy: "قلبي يفيض بالسعادة اليوم بسببك.",
      missing: "أنا جالس هنا أفكر بك وأشتاق إليك كثيراً.",
      romantic: "في مزاج رومانسي، أفكر في عينيك الجميلتين.",
      grateful: "أردت فقط أن أقول كم أنا ممتن لك بشكل لا يصدق.",
      lonely: "يبدو البيت هادئاً بدونك، أرسل لك كل حبي.",
      celebrating: "دعنا نحتفل بحبنا اليوم!",
      guilty: "أشعر بالسوء حيال خلافنا وأريد إصلاح الأمر."
    }
  },
  pcm: { // Nigerian Pidgin English
    styles: {
      romantic: [
        "No be lie, my heart flat for you. You be my destination and my anchor. If I no see you one day, my body no go reset. [NAME] [DETAIL]",
        "They say love na journey, but with you, I dey run double speed. You make everyday sweet like dodo. [NAME] [DETAIL]"
      ],
      sweet: [
        "I just say make I tell you say you be my favorite person for this whole wide world. Make your day sweet like sugar. [NAME] [DETAIL]"
      ],
      cute: [
        "You be the butter for my bread, the sugar for my tea! I love you die. [NAME] [DETAIL]"
      ],
      flirty: [
        "Inside this hot weather, na only you dey bring cool breeze to my head. When I go see you make we flex? [NAME] [DETAIL]"
      ],
      passionate: [
        "Your love dey catch me like electric shock. I want you today, tomorrow, and forever. [NAME] [DETAIL]"
      ],
      deep_emotional: [
        "For this world where everywhere dey bubble, you be my only peace. Thank you as you dey love me. [NAME] [DETAIL]"
      ],
      apology: [
        "Abeg no vex. My head no correct yesterday. You know say your love na my life, forgive your baby. [NAME] [DETAIL]"
      ],
      missing_you: [
        "Distance dey try check us, but my love for you pass flyover. I miss you too much, my body dey shake. [NAME] [DETAIL]"
      ],
      appreciation: [
        "You be my correct partner, my bestie. I value everything you dey do for me. You too set. [NAME] [DETAIL]"
      ]
    },
    recipients: {
      crush: "my secret crush",
      new_relationship: "my new love",
      boyfriend: "my fine boy",
      girlfriend: "my fine girl",
      fiance: "my husband-to-be",
      husband: "my husband",
      wife: "my wife",
      long_distance: "my LDR honey",
      reconciliation: "my sweetheart"
    },
    moods: {
      happy: "My heart dey bubble with joy today, all because of you.",
      missing: "I dey crave you like cold water for dry season.",
      romantic: "Thinking about you, wishing I dey hold your hand now.",
      grateful: "I dey thank God for giving me special person like you.",
      lonely: "Everywhere quiet, na only your voice I want hear.",
      celebrating: "Make we pop champagne! Today na our day!",
      guilty: "My mind no rest, I just want make we settle this matter."
    }
  }
};

// Core LetterTemplates for deep letter generation
const LetterTemplates = {
  en: {
    romantic_letter: [
      "Dearest [NAME],\n\nI am writing this letter to put into words what my voice sometimes struggles to say. You are the most beautiful thing that has ever happened to me. Every day with you is filled with light, laughter, and a deep sense of peace. I love the way you smile, the way you listen, and how you make everyone around you feel valued.\n\nI want to build a future with you, share all my dreams with you, and support you in everything you do. You are my partner, my best friend, and my love.\n\nYours forever,\nYour Love"
    ],
    short_note: [
      "My Love [NAME],\n\nJust a quick note to say I'm thinking of you. You make my days brighter and my heart lighter. I can't wait to see you later today.\n\nAlways,\nYour Partner"
    ],
    anniversary_letter: [
      "Happy Anniversary, [NAME]!\n\nLooking back at our journey together, I am filled with gratitude. We have shared so many beautiful moments, navigated challenges hand-in-hand, and built a foundation of trust and love. Thank you for your patience, your kindness, and your love.\n\nHere is to many more years of laughter and adventures together.\n\nWith all my love,\nYours Always"
    ],
    apology_letter: [
      "Dearest [NAME],\n\nI am writing this to sincerely apologize. I regret my words and actions, and it breaks my heart to know that I hurt you. You mean the world to me, and our relationship is my highest priority.\n\nI hope you can forgive me. I am committed to learning from this and making things right between us.\n\nWith love,\nYours"
    ],
    long_emotional: [
      "My Sweetheart [NAME],\n\nThere are moments when I look at you and wonder how I got so incredibly lucky. Your love has healed parts of me I didn't know were broken, and your belief in me has given me strength. You are my safe harbor in a chaotic world.\n\nThank you for loving me for who I am. I promise to protect our love, to stand by you, and to love you unconditionally, now and forever.\n\nYours eternally,\nYour One and Only"
    ]
  },
  fr: {
    romantic_letter: [
      "Mon plus cher [NAME],\n\nJe t'écris cette lettre pour exprimer ce que mes mots ont du mal à dire. Tu es la plus belle chose qui me soit arrivée. Chaque jour avec toi est rempli de rires et de paix.\n\nJe veux construire un avenir avec toi.\n\nAvec tout mon amour,\nTon Amour"
    ],
    short_note: [
      "Mon amour [NAME],\n\nJuste un petit mot pour te dire que je pense à toi. Tu rends mes journées plus lumineuses.\n\nAvec tendresse,\nTon Partenaire"
    ],
    anniversary_letter: [
      "Joyeux anniversaire, [NAME] !\n\nEn regardant notre parcours ensemble, je suis rempli de gratitude. Merci pour ta patience et ton amour.\n\nAvec tout mon amour,\nPour Toujours"
    ],
    apology_letter: [
      "Mon cher [NAME],\n\nJe t'écris pour te présenter mes plus sincères excuses. Je regrette mes paroles et mes actes.\n\nAvec tout mon regret,\nTon Partenaire"
    ],
    long_emotional: [
      "Mon cœur [NAME],\n\nIl y a des moments où je te regarde et je me demande comment j'ai eu autant de chance. Ton amour m'a guéri.\n\nAvec tout mon amour,\nÀ toi pour toujours"
    ]
  },
  es: {
    romantic_letter: [
      "Mi querido [NAME],\n\nTe escribo esta carta para expresar lo que a veces me cuesta decir. Eres lo más hermoso que me ha pasado. Cada día contigo está lleno de risas y paz.\n\nQuiero construir un futuro contigo.\n\nCon todo mi amor,\nTu Amor"
    ],
    short_note: [
      "Mi amor [NAME],\n\nSolo una nota rápida para decirte que pienso en ti. Haces mis días más brillantes.\n\nSiempre tuyo,\nTu Pareja"
    ],
    anniversary_letter: [
      "¡Feliz aniversario, [NAME]!\n\nAl mirar nuestro camino juntos, me siento lleno de gratitud. Gracias por tu paciencia y amor.\n\nCon todo mi amor,\nSiempre Tuyo"
    ],
    apology_letter: [
      "Mi querido [NAME],\n\nTe escribo para pedirte disculpas sinceramente. Lamento mis palabras y acciones.\n\nCon amor,\nTu Pareja"
    ],
    long_emotional: [
      "Mi dulce [NAME],\n\nHay momentos en los que te miro y me pregunto cómo tuve tanta suerte. Tu amor me ha sanado.\n\nTuya por siempre,\nTu Único Amor"
    ]
  },
  pt: {
    romantic_letter: [
      "Meu querido [NAME],\n\nEscrevo esta carta para expressar o que às vezes me custa dizer. Você é a coisa mais linda que já me aconteceu. Cada dia com você é cheio de risos e paz.\n\nQuero construir um futuro com você.\n\nCom todo o meu amor,\nSeu Amor"
    ],
    short_note: [
      "Meu amor [NAME],\n\nApenas um bilhete rápido para dizer que estou pensando em você. Você torna meus dias mais brilhantes.\n\nSempre seu,\nSeu Parceiro"
    ],
    anniversary_letter: [
      "Feliz aniversário, [NAME]!\n\nOlhando para trás em nossa jornada, sinto-me cheio de gratidão. Obrigado por sua paciência e amor.\n\nCom todo o meu amor,\nSeu Eternamente"
    ],
    apology_letter: [
      "Meu querido [NAME],\n\nEscrevo para me desculpar sinceramente. Lamento minhas palavras e ações.\n\nCom amor,\nSeu Parceiro"
    ],
    long_emotional: [
      "Meu doce [NAME],\n\nHá momentos em que olho para você e me pergunto como tive tanta sorte. Seu amor me curou.\n\nSeu para sempre,\nSeu Único Amor"
    ]
  },
  yo: {
    romantic_letter: [
      "Ololufe mi [NAME],\n\nMo n kowe yi si o lati so nkan ti enu mi ko le so tan. Iwo ni ohun to rewa julo to ti ṣẹlẹ si mi. Gbogbo ojo pelu re kun fun ayo ati alaafia.\n\nMo fe ki a kọ ọla wa papo.\n\nNipa gbogbo ife mi,\nIfe Re"
    ],
    short_note: [
      "Ife mi [NAME],\n\nMo fe ki o mo wipe mo n ronu nipa re. O n fun mi ni ayo.\n\nTiti lae,\nOre Re"
    ],
    anniversary_letter: [
      "Ku ajoyo ife wa, [NAME]!\n\nMo n dupe lowo Olorun fun irin-ajo wa papo. O seun fun suuru ati ife re.\n\nIfe mi titi lae,\nOko/Aya Re"
    ],
    apology_letter: [
      "Ololufe [NAME],\n\nMo toro aforiji lowo re. Okan mi baje fun ohun ti mo se lojo yẹn.\n\nJowo dariji mi,\nEni Re"
    ],
    long_emotional: [
      "Obinrin/Okunrin rere mi [NAME],\n\nIfe re n fun mi ni agbara lojoojumo. O seun fun ife re ti ko l'egbe.\n\nIfe mi pataki,\nAlabarin Re"
    ]
  },
  ha: {
    romantic_letter: [
      "Zaburar zuciyata [NAME],\n\nIna rubuta miki wannan wasiƙar ne don in bayyana miki abin da ke cikin zuciyata. Ke ce mafi kyawun abin da ya faru a rayuwata.\n\nIna son mu gina rayuwa tare.\n\nDa dukkan soyayyata,\nMasoyinki"
    ],
    short_note: [
      "Masoyiyata [NAME],\n\nWannan dan gajeren sako ne don in gaya miki ina tunaninki. Kina kawo mini farin ciki.\n\nKullum naki,\nAbokin Zamanki"
    ],
    anniversary_letter: [
      "Barkanmu da zagayowar ranar aurenmu, [NAME]!\n\nNa gode da soyayya da hakurin da kike nuna mini.\n\nDa soyayya,\nNaki Har Abada"
    ],
    apology_letter: [
      "Masoyiyata [NAME],\n\nIna rokon yafiyarki don abin da na yi miki. Kada ki yi fushi da ni.\n\nDa soyayyata,\nAbokin Rayuwarki"
    ],
    long_emotional: [
      "Zuciyata [NAME],\n\nSoyayyarki tana ba ni kwarin gwiwa a kowane lokaci. Ke ce farin cikina.\n\nMasoyinki,\nMasoyin Gaskiya"
    ]
  },
  ig: {
    romantic_letter: [
      "Obim [NAME],\n\nAna m ede akwụkwọ ozi a ka m gwa gị ihe na-atọ m ụtọ n'ime gị. Ị bụ ihe kacha mma merenụ na ndụ m.\n\nAchọrọ m ka mụ na gị nọrọ taa na echi.\n\nỊhụnanya m niile,\nỊhụnanya Gị"
    ],
    short_note: [
      "Ịhụnanya m [NAME],\n\nObere akwụkwọ ozi iji gwa gị na m na-eche banyere gị. Ị na-eme m obi ụtọ.\n\nMgbe niile,\nOnye Gị"
    ],
    anniversary_letter: [
      "Ezi ncheta ncheta anyị, [NAME]!\n\nObi dị m ụtọ maka ndụ mụ na gị kọrọ. Daalụ maka ndidi na ịhụnanya gị.\n\nỊhụnanya m titi lae,\nOnye Nkem"
    ],
    apology_letter: [
      "Obim [NAME],\n\nBiko gbaghara m maka ihe m mere gị. Obi m adịghị mma maka ya.\n\nỊhụnanya m,\nOnye Gị"
    ],
    long_emotional: [
      "Obim [NAME],\n\nỊhụnanya gị na-eme m obi ụtọ na ndụ. Daalụ maka ịhụnanya gị.\n\nỊhụnanya m,\nObi Gị"
    ]
  },
  ar: {
    romantic_letter: [
      "حبيبي [NAME]،\n\nأكتب لك هذه الرسالة لأعبر لك عما يعجز لساني عن قوله. أنت أجمل ما حدث لي في حياتي. كل يوم معك هو نعمة حقيقية.\n\nأريد أن أبني مستقبلي معك.\n\nمع كل حبي،\nحبيبك المخلص"
    ],
    short_note: [
      "حبيبي [NAME]،\n\nرسالة سريعة لأقول لك إنني أفكر فيك. أنت تجعل أيامي أكثر إشراقاً.\n\nدائماً لك،\nشريك حياتك"
    ],
    anniversary_letter: [
      "ذكرى سعيدة يا [NAME]!\n\nأشعر بالامتنان الشديد لرحلتنا معاً. شكراً لصبرك وحبك الكبير.\n\nمع كل حبي،\nشريكك للأبد"
    ],
    apology_letter: [
      "عزيزي [NAME]،\n\nأكتب لك لأعتذر بصدق. أندم على كلماتي وأفعالي التي تسببت في حزنك.\n\nمع حبي،\nالمخلص لك"
    ],
    long_emotional: [
      "حبيبي [NAME]،\n\nحبك يمنحني القوة كل يوم. شكراً لأنك تحبني كما أنا.\n\nلك للأبد،\nحبيبك الوحيد"
    ]
  }
};

const ProposalsSpeeches = {
  proposals: {
    marriage: [
      "My dearest [NAME],\n\nFrom the moment I met you, my life became a beautiful song. You have shown me what unconditional love means, and I cannot picture a single day of my future without you by my side. I want to build a home with you, share all my dreams with you, and love you through every high and low.\n\nWill you do me the absolute honor of marrying me?",
      "Dearest [NAME],\n\nWe have walked through beautiful times and built an unbreakable bond. You are my best friend, my partner, and my soulmate. Today, I want to make a promise to you for the rest of our days. I want to love you, cherish you, and stand by you forever.\n\nWill you marry me?"
    ],
    engagement_speech: [
      "To my beautiful partner [NAME], standing here today in front of everyone, my heart is full. You have brought so much light into my life. This ring is a symbol of my eternal commitment to you. I promise to support you, to laugh with you, and to build a life filled with joy and adventure together. Here is to our future!",
      "Dearest [NAME], when we first met, I never knew that my heart was finding its permanent home. Today, as we take this step toward our forever, I want to say thank you. Thank you for choosing me, for loving me, and for being my absolute rock. I love you."
    ],
    proposal_letter: [
      "Dearest [NAME],\n\nWriting this letter allows me to express what my voice might shake to say. You are the grace in my days and the peace in my nights. I have watched you grow, and I have grown alongside you. Loving you is the most natural, beautiful thing I have ever done.\n\nI want to spend my lifetime making you happy. I want to wake up next to you, cook dinners together, travel the world, and grow old in your embrace. I am ready to promise you my forever.\n\nWith all my heart,\nWill you marry me?"
    ]
  },
  speeches: {
    wedding: [
      "Today, standing before our family and friends, I take you, [NAME], to be my spouse. I promise to laugh with you in times of joy, to comfort you in times of sorrow, and to always hold your hand through life's unpredictable currents. You are my greatest blessing, and I choose you today and every day.",
      "To my new spouse [NAME], you look absolutely breathtaking today. Thank you for making me the happiest person alive. I promise to love you, to respect you, and to always listen. Our adventure has only just begun."
    ],
    anniversary: [
      "Happy Anniversary, [NAME]! Looking around today, I am reminded of how far we have come. Years have passed, but the way you look at me still makes my heart skip a beat. Thank you for your endless patience, your support, and your beautiful love. Cheers to us!",
      "To my partner [NAME], celebrating another year of marriage. Through ups and downs, our love has been our anchor. I am so proud of the life we have built and the family we cherish. I love you more than ever."
    ],
    birthday: [
      "To my partner on their birthday: [NAME], you bring so much warmth and laughter into our home. Today is about celebrating the beautiful person you are, not just to me, but to everyone around you. May this year bring you all the happiness and peace you deserve. I love you!",
      "Happy Birthday to my best friend and love, [NAME]! My life is infinitely richer because you are in it. May your day be as bright and beautiful as your heart. I love you to the moon and back."
    ]
  }
};

const FlirtyTexts = {
  flirty: [
    "Are you a magician? Because whenever I look at you, everyone else disappears. 😉 [NAME]",
    "My phone screen is bright, but not as bright as your smile. What are you doing tonight? [NAME]",
    "I was trying to fall asleep, but my brain was busy thinking about how cute you are. [NAME]"
  ],
  teasing: [
    "I bet you can't go 24 hours without thinking of me. Double or nothing? 😜 [NAME]",
    "Stop being so distracting! My boss is going to fire me if I keep staring at your texts. [NAME]",
    "You look great today. I haven't seen you, but I just know it's true. [NAME]"
  ],
  first_date: [
    "I had the absolute best time with you tonight. Can we fast forward to our second date? [NAME]",
    "You are even more beautiful in person than in your photos. Thank you for a lovely evening! [NAME]",
    "Still smiling thinking about our dinner. You owe me a rematch on that game! [NAME]"
  ],
  crush: [
    "Just a friendly reminder that someone is smiling at their phone because of you. (It's me) [NAME]",
    "I find myself listening to love songs and thinking of you. Should I be worried? [NAME]",
    "I really enjoy talking to you. Just wanted to put that out there. 😊 [NAME]"
  ]
};


/**
 * Custom memory message compiler
 */
function compileMemoryMessage(memoryTitle, memoryDesc, relation) {
  const openings = [
    `Thinking about our memory: "${memoryTitle}".`,
    `Do you remember "${memoryTitle}"?`,
    `Looking at our vault and found this: "${memoryTitle}".`
  ];
  const closings = [
    `Every time I think about that day, I can't help but smile. You mean the world to me.`,
    `It reminds me of how incredibly blessed I am to have you in my life.`,
    `Let's make many more memories like this. I love you!`
  ];
  
  const open = openings[Math.floor(Math.random() * openings.length)];
  const close = closings[Math.floor(Math.random() * closings.length)];
  
  return `${open} ${memoryDesc} ${close}`;
}

/**
 * Generates custom Love Storybook
 */
function generateLoveStorybook(p1, p2, howMet, memory) {
  return `CHAPTER 1: THE SPARK ✨\n\nOnce upon a time in a world of millions of souls, ${p1} met ${p2}. It all started when ${howMet}. That initial meeting was the spark that set a beautiful journey into motion.\n\n\nCHAPTER 2: GROWING CLOSER 💞\n\nAs days turned into weeks, their connection deepened. They shared laughter, late-night texts, and quiet glances. They realized they were no longer just passing strangers, but characters in a beautiful story together.\n\n\nCHAPTER 3: THE UNFORGETTABLE MOMENT 📸\n\nAmong all their adventures, one moment stands out: ${memory}. This memory became a milestone, a proof of their love that they carry in their hearts forever.\n\n\nEPILOGUE: OUR FOREVER 💍\n\nToday, ${p1} and ${p2} continue to write their story, hand-in-hand, knowing that the best chapters are yet to come. The End.`;
}

/**
 * Core Love Text synthesis engine
 */
function generateLoveText(lang, style, recipient, mood, name, details) {
  const templates = LoveTemplates[lang] || LoveTemplates.en;
  const styleTemplates = templates.styles[style] || templates.styles.romantic;
  const rawTemplate = styleTemplates[Math.floor(Math.random() * styleTemplates.length)];
  
  const recipientLabel = templates.recipients[recipient] || "";
  const moodIntro = templates.moods[mood] || "";
  const partnerName = name || recipientLabel || "My Love";
  
  let result = rawTemplate.replace(/\[NAME\]/g, partnerName);
  
  if (details) {
    result = result.replace(/\[DETAIL\]/g, `(${details})`);
  } else {
    result = result.replace(/\[DETAIL\]/g, "");
  }
  
  result = result.replace(/\s+/g, " ").trim();
  
  if (moodIntro) {
    result = `${moodIntro}\n\n${result}`;
  }
  
  return result;
}

/**
 * Core Love Letter synthesis engine
 */
function generateLoveLetter(lang, type, name) {
  const templates = LetterTemplates[lang] || LetterTemplates.en;
  const letterTemplates = templates[type] || templates.romantic_letter;
  const rawLetter = letterTemplates[Math.floor(Math.random() * letterTemplates.length)];
  
  const partnerName = name || "My Love";
  return rawLetter.replace(/\[NAME\]/g, partnerName);
}

// Bind additions to window
window.LoveTemplates = LoveTemplates;
window.LetterTemplates = LetterTemplates;
window.ProposalsSpeeches = ProposalsSpeeches;
window.FlirtyTexts = FlirtyTexts;

window.compileMemoryMessage = compileMemoryMessage;
window.generateLoveStorybook = generateLoveStorybook;
window.generateLoveText = generateLoveText;
window.generateLoveLetter = generateLoveLetter;
