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
    cy: {
      words: {
        // Essential Nouns
        water: 'dŵr',
        food: 'bwyd',
        restaurant: 'bwyty',
        bathroom: 'ystafell ymolchi',
        hospital: 'ysbyty',
        hotel: 'gwesty',
        airport: 'maes awyr',
        train: 'trên',
        bus: 'bws',
        taxi: 'tacsi',
        // Common Adjectives
        good: 'da',
        bad: 'drwg',
        big: 'mawr',
        small: 'bach',
        hot: 'poeth',
        cold: 'oer',
        // Essential Verbs
        'to eat': 'bwyta',
        'to drink': 'yfed',
        'to sleep': 'cysgu',
        'to go': 'mynd',
        'to help': 'helpu',
        thanks: 'diolch',
      },
      numbers: {
        '0': 'sero',
        '1': 'un',
        '2': 'dau',
        '3': 'tri',
        '4': 'pedwar',
        '5': 'pump',
        '6': 'chwech',
        '7': 'saith',
        '8': 'wyth',
        '9': 'naw',
        '10': 'deg',
        '20': 'ugain',
        '30': 'deg ar hugain',
        '40': 'deugain',
        '50': 'hanner cant',
        '100': 'cant',
        '1000': 'mil',
      },
      sentences: {
        // Greetings
        Hello: 'Helo',
        'Good morning': 'Bore da',
        'Good afternoon': 'Prynhawn da',
        'Good night': 'Nos da',
        Goodbye: 'Hwyl fawr',
        // Essential Phrases
        'How are you?': 'Sut wyt ti?',
        'I am fine': "Dw i'n iawn",
        'Thank you': 'Diolch',
        "You're welcome": 'Croeso',
        Please: 'Os gwelwch yn dda',
        'Excuse me': 'Esgusodwch fi',
        "I'm sorry": "Mae'n ddrwg gen i",
        // Emergency Phrases
        'I need help': 'Dw i angen help',
        'I am lost': 'Dw i ar goll',
        "I don't understand": 'Dw i ddim yn deall',
        'Do you speak English?': "Ydych chi'n siarad Saesneg?",
        'Where is the bathroom?': "Ble mae'r ystafell ymolchi?",
        // Practical Phrases
        'How much does it cost?': 'Faint ydy o?',
        'Can you help me?': 'Allwch chi fy helpu i?',
        'I would like...': 'Hoffwn i...',
        'The check, please': 'Y bil, os gwelwch yn dda',
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
