import { Injectable } from '@angular/core';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface LearningContent {
  words: { [key: string]: string };
  numbers: { [key: string]: string };
  sentences: { [key: string]: string };
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languages: Language[] = [
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  ];

  private content: { [key: string]: LearningContent } = {
    es: {
      words: {
        // Essential Nouns
        'water': 'agua',
        'food': 'comida',
        'restaurant': 'restaurante',
        'bathroom': 'baño',
        'hospital': 'hospital',
        'hotel': 'hotel',
        'airport': 'aeropuerto',
        'train': 'tren',
        'bus': 'autobús',
        'taxi': 'taxi',
        // Common Adjectives
        'good': 'bueno',
        'bad': 'malo',
        'big': 'grande',
        'small': 'pequeño',
        'hot': 'caliente',
        'cold': 'frío',
        // Essential Verbs
        'to eat': 'comer',
        'to drink': 'beber',
        'to sleep': 'dormir',
        'to go': 'ir',
        'to help': 'ayudar',
      },
      numbers: {
        '0': 'cero',
        '1': 'uno',
        '2': 'dos',
        '3': 'tres',
        '4': 'cuatro',
        '5': 'cinco',
        '6': 'seis',
        '7': 'siete',
        '8': 'ocho',
        '9': 'nueve',
        '10': 'diez',
        '20': 'veinte',
        '30': 'treinta',
        '40': 'cuarenta',
        '50': 'cincuenta',
        '100': 'cien',
        '1000': 'mil',
      },
      sentences: {
        // Greetings
        'Hello': '¡Hola!',
        'Good morning': '¡Buenos días!',
        'Good afternoon': '¡Buenas tardes!',
        'Good night': '¡Buenas noches!',
        'Goodbye': '¡Adiós!',
        // Essential Phrases
        'How are you?': '¿Cómo estás?',
        'I am fine': 'Estoy bien',
        'Thank you': 'Gracias',
        'You\'re welcome': 'De nada',
        'Please': 'Por favor',
        'Excuse me': 'Perdón',
        'I\'m sorry': 'Lo siento',
        // Emergency Phrases
        'I need help': 'Necesito ayuda',
        'I am lost': 'Estoy perdido',
        'I don\'t understand': 'No entiendo',
        'Do you speak English?': '¿Habla inglés?',
        'Where is the bathroom?': '¿Dónde está el baño?',
        // Practical Phrases
        'How much does it cost?': '¿Cuánto cuesta?',
        'Can you help me?': '¿Puede ayudarme?',
        'I would like...': 'Quisiera...',
        'The check, please': 'La cuenta, por favor',
      }
    },
    fr: {
      words: {
        // Essential Nouns
        'water': 'eau',
        'food': 'nourriture',
        'restaurant': 'restaurant',
        'bathroom': 'toilettes',
        'hospital': 'hôpital',
        'hotel': 'hôtel',
        'airport': 'aéroport',
        'train': 'train',
        'bus': 'bus',
        'taxi': 'taxi',
        // Common Adjectives
        'good': 'bon',
        'bad': 'mauvais',
        'big': 'grand',
        'small': 'petit',
        'hot': 'chaud',
        'cold': 'froid',
        // Essential Verbs
        'to eat': 'manger',
        'to drink': 'boire',
        'to sleep': 'dormir',
        'to go': 'aller',
        'to help': 'aider',
      },
      numbers: {
        '0': 'zéro',
        '1': 'un',
        '2': 'deux',
        '3': 'trois',
        '4': 'quatre',
        '5': 'cinq',
        '6': 'six',
        '7': 'sept',
        '8': 'huit',
        '9': 'neuf',
        '10': 'dix',
        '20': 'vingt',
        '30': 'trente',
        '40': 'quarante',
        '50': 'cinquante',
        '100': 'cent',
        '1000': 'mille',
      },
      sentences: {
        // Greetings
        'Hello': 'Bonjour',
        'Good morning': 'Bonjour',
        'Good afternoon': 'Bon après-midi',
        'Good night': 'Bonne nuit',
        'Goodbye': 'Au revoir',
        // Essential Phrases
        'How are you?': 'Comment allez-vous?',
        'I am fine': 'Je vais bien',
        'Thank you': 'Merci',
        'You\'re welcome': 'De rien',
        'Please': 'S\'il vous plaît',
        'Excuse me': 'Excusez-moi',
        'I\'m sorry': 'Je suis désolé',
        // Emergency Phrases
        'I need help': 'J\'ai besoin d\'aide',
        'I am lost': 'Je suis perdu',
        'I don\'t understand': 'Je ne comprends pas',
        'Do you speak English?': 'Parlez-vous anglais?',
        'Where is the bathroom?': 'Où sont les toilettes?',
        // Practical Phrases
        'How much does it cost?': 'Combien ça coûte?',
        'Can you help me?': 'Pouvez-vous m\'aider?',
        'I would like...': 'Je voudrais...',
        'The check, please': 'L\'addition, s\'il vous plaît',
      }
    },
    de: {
      words: {
        // Essential Nouns
        'water': 'Wasser',
        'food': 'Essen',
        'restaurant': 'Restaurant',
        'bathroom': 'Toilette',
        'hospital': 'Krankenhaus',
        'hotel': 'Hotel',
        'airport': 'Flughafen',
        'train': 'Zug',
        'bus': 'Bus',
        'taxi': 'Taxi',
        // Common Adjectives
        'good': 'gut',
        'bad': 'schlecht',
        'big': 'groß',
        'small': 'klein',
        'hot': 'heiß',
        'cold': 'kalt',
        // Essential Verbs
        'to eat': 'essen',
        'to drink': 'trinken',
        'to sleep': 'schlafen',
        'to go': 'gehen',
        'to help': 'helfen',
      },
      numbers: {
        '0': 'null',
        '1': 'eins',
        '2': 'zwei',
        '3': 'drei',
        '4': 'vier',
        '5': 'fünf',
        '6': 'sechs',
        '7': 'sieben',
        '8': 'acht',
        '9': 'neun',
        '10': 'zehn',
        '20': 'zwanzig',
        '30': 'dreißig',
        '40': 'vierzig',
        '50': 'fünfzig',
        '100': 'hundert',
        '1000': 'tausend',
      },
      sentences: {
        // Greetings
        'Hello': 'Hallo',
        'Good morning': 'Guten Morgen',
        'Good afternoon': 'Guten Tag',
        'Good night': 'Gute Nacht',
        'Goodbye': 'Auf Wiedersehen',
        // Essential Phrases
        'How are you?': 'Wie geht es Ihnen?',
        'I am fine': 'Mir geht es gut',
        'Thank you': 'Danke',
        'You\'re welcome': 'Bitte',
        'Please': 'Bitte',
        'Excuse me': 'Entschuldigung',
        'I\'m sorry': 'Es tut mir leid',
        // Emergency Phrases
        'I need help': 'Ich brauche Hilfe',
        'I am lost': 'Ich habe mich verirrt',
        'I don\'t understand': 'Ich verstehe nicht',
        'Do you speak English?': 'Sprechen Sie Englisch?',
        'Where is the bathroom?': 'Wo ist die Toilette?',
        // Practical Phrases
        'How much does it cost?': 'Wie viel kostet das?',
        'Can you help me?': 'Können Sie mir helfen?',
        'I would like...': 'Ich möchte...',
        'The check, please': 'Die Rechnung, bitte',
      }
    },

    it: {
      words: {
        // Essential Nouns
        'water': 'acqua',
        'food': 'cibo',
        'restaurant': 'ristorante',
        'bathroom': 'bagno',
        'hospital': 'ospedale',
        'hotel': 'albergo',
        'airport': 'aeroporto',
        'train': 'treno',
        'bus': 'autobus',
        'taxi': 'taxi',
        // Common Adjectives
        'good': 'buono',
        'bad': 'cattivo',
        'big': 'grande',
        'small': 'piccolo',
        'hot': 'caldo',
        'cold': 'freddo',
        // Essential Verbs
        'to eat': 'mangiare',
        'to drink': 'bere',
        'to sleep': 'dormire',
        'to go': 'andare',
        'to help': 'aiutare',
      },
      numbers: {
        '0': 'zero',
        '1': 'uno',
        '2': 'due',
        '3': 'tre',
        '4': 'quattro',
        '5': 'cinque',
        '6': 'sei',
        '7': 'sette',
        '8': 'otto',
        '9': 'nove',
        '10': 'dieci',
        '20': 'venti',
        '30': 'trenta',
        '40': 'quaranta',
        '50': 'cinquanta',
        '100': 'cento',
        '1000': 'mille',
      },
      sentences: {
        // Greetings
        'Hello': 'Ciao',
        'Good morning': 'Buongiorno',
        'Good afternoon': 'Buon pomeriggio',
        'Good night': 'Buonanotte',
        'Goodbye': 'Arrivederci',
        // Essential Phrases
        'How are you?': 'Come stai?',
        'I am fine': 'Sto bene',
        'Thank you': 'Grazie',
        'You\'re welcome': 'Prego',
        'Please': 'Per favore',
        'Excuse me': 'Scusi',
        'I\'m sorry': 'Mi dispiace',
        // Emergency Phrases
        'I need help': 'Ho bisogno di aiuto',
        'I am lost': 'Mi sono perso',
        'I don\'t understand': 'Non capisco',
        'Do you speak English?': 'Parla inglese?',
        'Where is the bathroom?': 'Dov\'è il bagno?',
        // Practical Phrases
        'How much does it cost?': 'Quanto costa?',
        'Can you help me?': 'Può aiutarmi?',
        'I would like...': 'Vorrei...',
        'The check, please': 'Il conto, per favore',
      }
    },

    ja: {
      words: {
        // Essential Nouns
        'water': '水 (mizu)',
        'food': '食べ物 (tabemono)',
        'restaurant': 'レストラン (resutoran)',
        'bathroom': 'トイレ (toire)',
        'hospital': '病院 (byōin)',
        'hotel': 'ホテル (hoteru)',
        'airport': '空港 (kūkō)',
        'train': '電車 (densha)',
        'bus': 'バス (basu)',
        'taxi': 'タクシー (takushī)',
        // Common Adjectives
        'good': '良い (yoi)',
        'bad': '悪い (warui)',
        'big': '大きい (ōkii)',
        'small': '小さい (chiisai)',
        'hot': '熱い (atsui)',
        'cold': '寒い (samui)',
        // Essential Verbs
        'to eat': '食べる (taberu)',
        'to drink': '飲む (nomu)',
        'to sleep': '寝る (neru)',
        'to go': '行く (iku)',
        'to help': '助ける (tasukeru)',
      },
      numbers: {
        '0': '零 (rei)',
        '1': '一 (ichi)',
        '2': '二 (ni)',
        '3': '三 (san)',
        '4': '四 (yon/shi)',
        '5': '五 (go)',
        '6': '六 (roku)',
        '7': '七 (nana/shichi)',
        '8': '八 (hachi)',
        '9': '九 (kyū/ku)',
        '10': '十 (jū)',
        '20': '二十 (nijū)',
        '30': '三十 (sanjū)',
        '40': '四十 (yonjū)',
        '50': '五十 (gojū)',
        '100': '百 (hyaku)',
        '1000': '千 (sen)',
      },
      sentences: {
        // Greetings
        'Hello': 'こんにちは (Konnichiwa)',
        'Good morning': 'おはようございます (Ohayō gozaimasu)',
        'Good afternoon': 'こんにちは (Konnichiwa)',
        'Good night': 'おやすみなさい (Oyasuminasai)',
        'Goodbye': 'さようなら (Sayōnara)',
        // Essential Phrases
        'How are you?': 'お元気ですか？ (O-genki desu ka?)',
        'I am fine': '元気です (Genki desu)',
        'Thank you': 'ありがとうございます (Arigatō gozaimasu)',
        'You\'re welcome': 'どういたしまして (Dō itashimashite)',
        'Please': 'お願いします (Onegaishimasu)',
        'Excuse me': 'すみません (Sumimasen)',
        'I\'m sorry': 'ごめんなさい (Gomen nasai)',
        // Emergency Phrases
        'I need help': '助けてください (Tasukete kudasai)',
        'I am lost': '道に迷いました (Michi ni mayoimashita)',
        'I don\'t understand': '分かりません (Wakarimasen)',
        'Do you speak English?': '英語を話しますか？ (Eigo o hanashimasu ka?)',
        'Where is the bathroom?': 'トイレはどこですか？ (Toire wa doko desu ka?)',
        // Practical Phrases
        'How much does it cost?': 'いくらですか？ (Ikura desu ka?)',
        'Can you help me?': '手伝っていただけますか？ (Tetsudatte itadakemasu ka?)',
        'I would like...': '...をお願いします (...o onegaishimasu)',
        'The check, please': 'お会計をお願いします (O-kaikei o onegaishimasu)',
      }
    },

    zh: {
      words: {
        // Essential Nouns
        'water': '水 (shuǐ)',
        'food': '食物 (shíwù)',
        'restaurant': '餐厅 (cāntīng)',
        'bathroom': '洗手间 (xǐshǒujiān)',
        'hospital': '医院 (yīyuàn)',
        'hotel': '酒店 (jiǔdiàn)',
        'airport': '机场 (jīchǎng)',
        'train': '火车 (huǒchē)',
        'bus': '公共汽车 (gōnggòng qìchē)',
        'taxi': '出租车 (chūzūchē)',
        // Common Adjectives
        'good': '好 (hǎo)',
        'bad': '坏 (huài)',
        'big': '大 (dà)',
        'small': '小 (xiǎo)',
        'hot': '热 (rè)',
        'cold': '冷 (lěng)',
        // Essential Verbs
        'to eat': '吃 (chī)',
        'to drink': '喝 (hē)',
        'to sleep': '睡觉 (shuìjiào)',
        'to go': '去 (qù)',
        'to help': '帮助 (bāngzhù)',
      },
      numbers: {
        '0': '零 (líng)',
        '1': '一 (yī)',
        '2': '二 (èr)',
        '3': '三 (sān)',
        '4': '四 (sì)',
        '5': '五 (wǔ)',
        '6': '六 (liù)',
        '7': '七 (qī)',
        '8': '八 (bā)',
        '9': '九 (jiǔ)',
        '10': '十 (shí)',
        '20': '二十 (èrshí)',
        '30': '三十 (sānshí)',
        '40': '四十 (sìshí)',
        '50': '五十 (wǔshí)',
        '100': '百 (bǎi)',
        '1000': '千 (qiān)',
      },
      sentences: {
        // Greetings
        'Hello': '你好 (Nǐ hǎo)',
        'Good morning': '早上好 (Zǎoshang hǎo)',
        'Good afternoon': '下午好 (Xiàwǔ hǎo)',
        'Good night': '晚安 (Wǎn\'ān)',
        'Goodbye': '再见 (Zàijiàn)',
        // Essential Phrases
        'How are you?': '你好吗？(Nǐ hǎo ma?)',
        'I am fine': '我很好 (Wǒ hěn hǎo)',
        'Thank you': '谢谢 (Xièxie)',
        'You\'re welcome': '不客气 (Bú kèqi)',
        'Please': '请 (Qǐng)',
        'Excuse me': '对不起 (Duìbùqǐ)',
        'I\'m sorry': '抱歉 (Bàoqiàn)',
        // Emergency Phrases
        'I need help': '我需要帮助 (Wǒ xūyào bāngzhù)',
        'I am lost': '我迷路了 (Wǒ mílù le)',
        'I don\'t understand': '我不明白 (Wǒ bù míngbai)',
        'Do you speak English?': '你会说英语吗？(Nǐ huì shuō yīngyǔ ma?)',
        'Where is the bathroom?': '洗手间在哪里？(Xǐshǒujiān zài nǎli?)',
        // Practical Phrases
        'How much does it cost?': '多少钱？(Duōshao qián?)',
        'Can you help me?': '你能帮我吗？(Nǐ néng bāng wǒ ma?)',
        'I would like...': '我想要... (Wǒ xiǎng yào...)',
        'The check, please': '请结账 (Qǐng jiézhàng)',
      }
    },

    ko: {
      words: {
        // Essential Nouns
        'water': '물 (mul)',
        'food': '음식 (eumsik)',
        'restaurant': '식당 (sikdang)',
        'bathroom': '화장실 (hwajangsil)',
        'hospital': '병원 (byeongwon)',
        'hotel': '호텔 (hotel)',
        'airport': '공항 (gonghang)',
        'train': '기차 (gicha)',
        'bus': '버스 (beoseu)',
        'taxi': '택시 (taeksi)',
        // Common Adjectives
        'good': '좋은 (jo-eun)',
        'bad': '나쁜 (nappeun)',
        'big': '큰 (keun)',
        'small': '작은 (jag-eun)',
        'hot': '뜨거운 (tteugeoun)',
        'cold': '추운 (chu-un)',
        // Essential Verbs
        'to eat': '먹다 (meokda)',
        'to drink': '마시다 (masida)',
        'to sleep': '자다 (jada)',
        'to go': '가다 (gada)',
        'to help': '돕다 (dopda)',
      },
      numbers: {
        '0': '영 (yeong)',
        '1': '일 (il)',
        '2': '이 (i)',
        '3': '삼 (sam)',
        '4': '사 (sa)',
        '5': '오 (o)',
        '6': '육 (yuk)',
        '7': '칠 (chil)',
        '8': '팔 (pal)',
        '9': '구 (gu)',
        '10': '십 (sip)',
        '20': '이십 (isip)',
        '30': '삼십 (samsip)',
        '40': '사십 (sasip)',
        '50': '오십 (osip)',
        '100': '백 (baek)',
        '1000': '천 (cheon)',
      },
      sentences: {
        // Greetings
        'Hello': '안녕하세요 (Annyeonghaseyo)',
        'Good morning': '안녕하세요 (Annyeonghaseyo)',
        'Good afternoon': '안녕하세요 (Annyeonghaseyo)',
        'Good night': '안녕히 주무세요 (Annyeonghi jumuseyo)',
        'Goodbye': '안녕히 가세요 (Annyeonghi gaseyo)',
        // Essential Phrases
        'How are you?': '어떻게 지내세요? (Eotteoke jinaeseyo?)',
        'I am fine': '잘 지내요 (Jal jinaeyo)',
        'Thank you': '감사합니다 (Gamsahamnida)',
        'You\'re welcome': '천만에요 (Cheonmaneyo)',
        'Please': '주세요 (Juseyo)',
        'Excuse me': '실례합니다 (Sillyehamnida)',
        'I\'m sorry': '죄송합니다 (Joesonghamnida)',
        // Emergency Phrases
        'I need help': '도움이 필요해요 (Doum-i pilyohaeyo)',
        'I am lost': '길을 잃었어요 (Gil-eul ilheosseoyo)',
        'I don\'t understand': '이해가 안 돼요 (Ihaega an dwaeyo)',
        'Do you speak English?': '영어 하실 줄 아세요? (Yeong-eo hasil jul aseyo?)',
        'Where is the bathroom?': '화장실이 어디예요? (Hwajangsil-i eodiyeyo?)',
        // Practical Phrases
        'How much does it cost?': '얼마예요? (Eolmayeyo?)',
        'Can you help me?': '도와주실 수 있나요? (Dowajusil su innayo?)',
        'I would like...': '...주세�� (...juseyo)',
        'The check, please': '계산서 주세요 (Gyesanseo juseyo)',
      }
    },

    ru: {
      words: {
        // Essential Nouns
        'water': 'вода (voda)',
        'food': 'еда (yeda)',
        'restaurant': 'ресторан (restoran)',
        'bathroom': 'туалет (tualet)',
        'hospital': 'больница (bolnitsa)',
        'hotel': 'отель (otel)',
        'airport': 'аэропорт (aeroport)',
        'train': 'поезд (poyezd)',
        'bus': 'автобус (avtobus)',
        'taxi': 'такси (taksi)',
        // Common Adjectives
        'good': 'хороший (khoroshiy)',
        'bad': 'плохой (plokhoy)',
        'big': 'большой (bolshoy)',
        'small': 'маленький (malenkiy)',
        'hot': 'горячий (goryachiy)',
        'cold': 'холодный (kholodnyy)',
        // Essential Verbs
        'to eat': 'есть (yest)',
        'to drink': 'пить (pit)',
        'to sleep': 'спать (spat)',
        'to go': 'идти (idti)',
        'to help': 'помогать (pomogat)',
      },
      numbers: {
        '0': 'ноль (nol)',
        '1': 'один (odin)',
        '2': 'два (dva)',
        '3': 'три (tri)',
        '4': 'четыре (chetyre)',
        '5': 'пять (pyat)',
        '6': 'шесть (shest)',
        '7': 'семь (sem)',
        '8': 'восемь (vosem)',
        '9': 'девять (devyat)',
        '10': 'десять (desyat)',
        '20': 'двадцать (dvadtsat)',
        '30': 'тридцать (tridtsat)',
        '40': 'сорок (sorok)',
        '50': 'пятьдесят (pyatdesyat)',
        '100': 'сто (sto)',
        '1000': 'тысяча (tysyacha)',
      },
      sentences: {
        // Greetings
        'Hello': 'Здравствуйте (Zdravstvuyte)',
        'Good morning': 'Доброе утро (Dobroye utro)',
        'Good afternoon': 'Добрый день (Dobryy den)',
        'Good night': 'Спокойной ночи (Spokoynoy nochi)',
        'Goodbye': 'До свидания (Do svidaniya)',
        // Essential Phrases
        'How are you?': 'Как дела? (Kak dela?)',
        'I am fine': 'У меня всё хорошо (U menya vsyo khorosho)',
        'Thank you': 'Спасибо (Spasibo)',
        'You\'re welcome': 'Пожалуйста (Pozhaluysta)',
        'Please': 'Пожалуйста (Pozhaluysta)',
        'Excuse me': 'Извините (Izvinite)',
        'I\'m sorry': 'Простите (Prostite)',
        // Emergency Phrases
        'I need help': 'Мне нужна помощь (Mne nuzhna pomoshch)',
        'I am lost': 'Я заблудился (Ya zabludilsya)',
        'I don\'t understand': 'Я не понимаю (Ya ne ponimayu)',
        'Do you speak English?': 'Вы говорите по-английски? (Vy govorite po-angliyski?)',
        'Where is the bathroom?': 'Где туалет? (Gde tualet?)',
        // Practical Phrases
        'How much does it cost?': 'Сколько это стоит? (Skolko eto stoit?)',
        'Can you help me?': 'Вы можете мне помочь? (Vy mozhete mne pomoch?)',
        'I would like...': 'Я бы хотел... (Ya by khotel...)',
        'The check, please': 'Счёт, пожалуйста (Schyot, pozhaluysta)',
      }
    }
  };

  getLanguages(): Language[] {
    return this.languages;
  }

  getContent(languageCode: string): LearningContent | undefined {
    return this.content[languageCode];
  }
}
