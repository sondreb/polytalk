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
    fa: {
      words: {
        // Essential Nouns
        water: 'آب',
        food: 'غذا',
        restaurant: 'رستوران',
        bathroom: 'دستشویی',
        hospital: 'بیمارستان',
        hotel: 'هتل',
        airport: 'فرودگاه',
        train: 'قطار',
        bus: 'اتوبوس',
        taxi: 'تاکسی',
        // Common Adjectives
        good: 'خوب',
        bad: 'بد',
        big: 'بزرگ',
        small: 'کوچک',
        hot: 'داغ',
        cold: 'سرد',
        // Essential Verbs
        'to eat': 'خوردن',
        'to drink': 'نوشیدن',
        'to sleep': 'خوابیدن',
        'to go': 'رفتن',
        'to help': 'کمک کردن',
        thanks: 'ممنون',
      },
      numbers: {
        '0': 'صفر',
        '1': 'یک',
        '2': 'دو',
        '3': 'سه',
        '4': 'چهار',
        '5': 'پنج',
        '6': 'شش',
        '7': 'هفت',
        '8': 'هشت',
        '9': 'نه',
        '10': 'ده',
        '20': 'بیست',
        '30': 'سی',
        '40': 'چهل',
        '50': 'پنجاه',
        '100': 'صد',
        '1000': 'هزار',
      },
      sentences: {
        // Greetings
        Hello: 'سلام',
        'Good morning': 'صبح بخیر',
        'Good afternoon': 'ظهر بخیر',
        'Good night': 'شب بخیر',
        Goodbye: 'خداحافظ',
        // Essential Phrases
        'How are you?': 'حال شما چطور است؟',
        'I am fine': 'من خوب هستم',
        'Thank you': 'متشکرم',
        "You're welcome": 'خواهش می‌کنم',
        Please: 'لطفاً',
        'Excuse me': 'ببخشید',
        "I'm sorry": 'متأسفم',
        // Emergency Phrases
        'I need help': 'من به کمک نیاز دارم',
        'I am lost': 'من گم شده‌ام',
        "I don't understand": 'من نمی‌فهمم',
        'Do you speak English?': 'انگلیسی صحبت می‌کنید؟',
        'Where is the bathroom?': 'دستشویی کجاست؟',
        // Practical Phrases
        'How much does it cost?': 'چقدر می‌شود؟',
        'Can you help me?': 'می‌توانید به من کمک کنید؟',
        'I would like...': 'من می‌خواهم...',
        'The check, please': 'صورتحساب، لطفاً',
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
