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
    tr: {
      words: {
        // Essential Nouns
        water: 'su',
        food: 'yemek',
        restaurant: 'lokanta',
        bathroom: 'tuvalet',
        hospital: 'hastane',
        hotel: 'otel',
        airport: 'havalimanı',
        train: 'tren',
        bus: 'otobüs',
        taxi: 'taksi',
        // Common Adjectives
        good: 'iyi',
        bad: 'kötü',
        big: 'büyük',
        small: 'küçük',
        hot: 'sıcak',
        cold: 'soğuk',
        // Essential Verbs
        'to eat': 'yemek',
        'to drink': 'içmek',
        'to sleep': 'uyumak',
        'to go': 'gitmek',
        'to help': 'yardım etmek',
        thanks: 'teşekkürler',
      },
      numbers: {
        '0': 'sıfır',
        '1': 'bir',
        '2': 'iki',
        '3': 'üç',
        '4': 'dört',
        '5': 'beş',
        '6': 'altı',
        '7': 'yedi',
        '8': 'sekiz',
        '9': 'dokuz',
        '10': 'on',
        '20': 'yirmi',
        '30': 'otuz',
        '40': 'kırk',
        '50': 'elli',
        '100': 'yüz',
        '1000': 'bin',
      },
      sentences: {
        // Greetings
        Hello: 'Merhaba',
        'Good morning': 'Günaydın',
        'Good afternoon': 'İyi günler',
        'Good night': 'İyi geceler',
        Goodbye: 'Hoşça kal',
        // Essential Phrases
        'How are you?': 'Nasılsın?',
        'I am fine': 'İyiyim',
        'Thank you': 'Teşekkür ederim',
        "You're welcome": 'Rica ederim',
        Please: 'Lütfen',
        'Excuse me': 'Özür dilerim',
        "I'm sorry": 'Üzgünüm',
        // Emergency Phrases
        'I need help': 'Yardıma ihtiyacım var',
        'I am lost': 'Kayboldum',
        "I don't understand": 'Anlamıyorum',
        'Do you speak English?': 'İngilizce biliyor musunuz?',
        'Where is the bathroom?': 'Tuvalet nerede?',
        // Practical Phrases
        'How much does it cost?': 'Ne kadar?',
        'Can you help me?': 'Bana yardım edebilir misiniz?',
        'I would like...': 'İstiyorum...',
        'The check, please': 'Hesap, lütfen',
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
