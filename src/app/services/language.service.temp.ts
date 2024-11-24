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
    he: {
      words: {
        // Essential Nouns
        water: 'מים',
        food: 'אוכל',
        restaurant: 'מסעדה',
        bathroom: 'שירותים',
        hospital: 'בית חולים',
        hotel: 'מלון',
        airport: 'שדה תעופה',
        train: 'רכבת',
        bus: 'אוטובוס',
        taxi: 'מונית',
        // Common Adjectives
        good: 'טוב',
        bad: 'רע',
        big: 'גדול',
        small: 'קטן',
        hot: 'חם',
        cold: 'קר',
        // Essential Verbs
        'to eat': 'לאכול',
        'to drink': 'לשתות',
        'to sleep': 'לישון',
        'to go': 'ללכת',
        'to help': 'לעזור',
        thanks: 'תודה',
      },
      numbers: {
        '0': 'אפס',
        '1': 'אחת',
        '2': 'שתיים',
        '3': 'שלוש',
        '4': 'ארבע',
        '5': 'חמש',
        '6': 'שש',
        '7': 'שבע',
        '8': 'שמונה',
        '9': 'תשע',
        '10': 'עשר',
        '20': 'עשרים',
        '30': 'שלושים',
        '40': 'ארבעים',
        '50': 'חמישים',
        '100': 'מאה',
        '1000': 'אלף',
      },
      sentences: {
        // Greetings
        Hello: 'שלום',
        'Good morning': 'בוקר טוב',
        'Good afternoon': 'צהריים טובים',
        'Good night': 'לילה טוב',
        Goodbye: 'להתראות',
        // Essential Phrases
        'How are you?': 'מה שלומך?',
        'I am fine': 'אני בסדר',
        'Thank you': 'תודה רבה',
        "You're welcome": 'בבקשה',
        Please: 'בבקשה',
        'Excuse me': 'סליחה',
        "I'm sorry": 'אני מצטער',
        // Emergency Phrases
        'I need help': 'אני צריך עזרה',
        'I am lost': 'אני תועה',
        "I don't understand": 'אני לא מבין',
        'Do you speak English?': 'אתה מדבר אנגלית?',
        'Where is the bathroom?': 'איפה השירותים?',
        // Practical Phrases
        'How much does it cost?': 'כמה זה עולה?',
        'Can you help me?': 'אתה יכול לעזור לי?',
        'I would like...': 'אני רוצה...',
        'The check, please': 'את החשבון, בבקשה',
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
