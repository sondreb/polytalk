import { Injectable } from '@angular/core';

export interface Language {
  code: string;
  name: string;
  flag: string;
  flagImage: string; // Add this new property
}

export interface LearningContent {
  words: { [key: string]: string };
  numbers: { [key: string]: string };
  sentences: { [key: string]: string };
}

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private languages: Language[] = [
    {
      code: 'ru',
      name: 'Russian',
      flag: '🇷🇺',
      flagImage: '/assets/flags/ru.png',
    },
  ];

  private content: { [key: string]: LearningContent } = {
    ru: {
      words: {
        // Essential Nouns
        water: 'вода (voda)',
        food: 'еда (yeda)',
        restaurant: 'ресторан (restoran)',
        bathroom: 'туалет (tualet)',
      },
      numbers: {
        '0': 'ноль (nol)',
        '1': 'один (odin)',
        '2': 'два (dva)',
        '3': 'три (tri)',
      },
      sentences: {
        // Greetings
        Hello: 'Здравствуйте (Zdravstvuyte)',
        'Good morning': 'Доброе утро (Dobroye utro)',
        'Good afternoon': 'Добрый день (Dobryy den)',
        'Good night': 'Спокойной ночи (Spokoynoy nochi)',
      },
    },

    ar: {
      words: {
        // Essential Nouns
        water: "ماء (maa')",
        food: "طعام (ta'am)",
        restaurant: "مطعم (mat'am)",
        bathroom: 'حمام (hammam)',
        hospital: 'مستشفى (mustashfa)',
        hotel: 'فندق (funduq)',
        airport: 'مطار (matar)',
        train: 'قطار (qitar)',
        bus: 'حافلة (hafila)',
        taxi: 'تاكسي (taksi)',
        // Common Adjectives
        good: 'جيد (jayyid)',
        bad: "سيء (sayyi')",
        big: 'كبير (kabir)',
        small: 'صغير (saghir)',
        hot: 'حار (har)',
        cold: 'بارد (barid)',
        // Essential Verbs
        'to eat': "يأكل (ya'kul)",
        'to drink': 'يشرب (yashrab)',
        'to sleep': 'ينام (yanam)',
        'to go': 'يذهب (yathhab)',
        'to help': "يساعد (yusa'id)",
        thanks: 'شكراً (shukran)',
      },
      numbers: {
        '0': 'صفر (sifr)',
        '1': 'واحد (wahid)',
        '2': 'اثنان (ithnan)',
        '3': 'ثلاثة (thalatha)',
        '4': "أربعة (arba'a)",
        '5': 'خمسة (khamsa)',
        '6': 'ستة (sitta)',
        '7': "سبعة (sab'a)",
        '8': 'ثمانية (thamaniya)',
        '9': "تسعة (tis'a)",
        '10': 'عشرة (ashara)',
        '20': 'عشرون (ishrun)',
        '30': 'ثلاثون (thalathun)',
        '40': "أربعون (arba'un)",
        '50': 'خمسون (khamsun)',
        '100': "مئة (mi'a)",
        '1000': 'ألف (alf)',
      },
      sentences: {
        // Greetings
        Hello: 'مرحباً (marhaban)',
        'Good morning': 'صباح الخير (sabah al-khayr)',
        'Good afternoon': "مساء الخير (masa' al-khayr)",
        'Good night': 'تصبح على خير (tusbih ala khayr)',
        Goodbye: "مع السلامة (ma'a as-salama)",
        // Essential Phrases
        'How are you?': 'كيف حالك؟ (kayf halak?)',
        'I am fine': 'أنا بخير (ana bikhayr)',
        'Thank you': 'شكراً (shukran)',
        "You're welcome": 'عفواً (afwan)',
        Please: 'من فضلك (min fadlak)',
        'Excuse me': "عذراً ('uthran)",
        "I'm sorry": 'آسف (asif)',
        // Emergency Phrases
        'I need help': "أحتاج مساعدة (ahtaju musa'ada)",
        'I am lost': "أنا ضائع (ana da'i')",
        "I don't understand": 'لا أفهم (la afham)',
        'Do you speak English?':
          'هل تتكلم الإنجليزية؟ (hal tatakallam al-injliziyya?)',
        'Where is the bathroom?': 'أين الحمام؟ (ayna al-hammam?)',
        // Practical Phrases
        'How much does it cost?': 'كم التكلفة؟ (kam at-taklufa?)',
        'Can you help me?': "هل يمكنك مساعدتي؟ (hal yumkinuka musa'adati?)",
        'I would like...': 'أريد... (urid...)',
        'The check, please': 'الحساب من فضلك (al-hisab min fadlak)',
      },
    },
  };

  getLanguages(): Language[] {
    return this.languages;
  }

  getContent(languageCode: string): LearningContent | undefined {
    return this.content[languageCode];
  }
}
