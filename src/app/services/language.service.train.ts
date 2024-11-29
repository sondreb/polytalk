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
      code: 'en',
      name: 'English',
      flag: '🇬🇧',
      flagImage: '/assets/flags/gb.png',
    },
    {
      code: 'el',
      name: 'Greek',
      flag: '🇬🇷',
      flagImage: '/assets/flags/gr.png',
    },
    {
      code: 'me',
      name: 'Montenegrin',
      flag: '🇲🇪',
      flagImage: '/assets/flags/me.png',
    },
    {
      code: 'bg',
      name: 'Bulgarian',
      flag: '🇧🇬',
      flagImage: '/assets/flags/bg.png',
    },
    {
      code: 'cs',
      name: 'Czech',
      flag: '🇨🇿',
      flagImage: '/assets/flags/cz.png',
    },
    {
      code: 'fi',
      name: 'Finnish',
      flag: '🇫🇮',
      flagImage: '/assets/flags/fi.png',
    },
  ];

  private content: { [key: string]: LearningContent } = {
    en: {
      words: {
        // Essential Nouns
        water: 'water',
        food: 'food',
        restaurant: 'restaurant',
        bathroom: 'bathroom',
        hospital: 'hospital',
        hotel: 'hotel',
        airport: 'airport',
        train: 'train',
        bus: 'bus',
        taxi: 'taxi',
        // Common Adjectives
        good: 'good',
        bad: 'bad',
        big: 'big',
        small: 'small',
        hot: 'hot',
        cold: 'cold',
        // Essential Verbs
        'to eat': 'to eat',
        'to drink': 'to drink',
        'to sleep': 'to sleep',
        'to go': 'to go',
        'to help': 'to help',
        thanks: 'thanks',
      },
      numbers: {
        '0': 'zero',
        '1': 'one',
        '2': 'two',
        '3': 'three',
        '4': 'four',
        '5': 'five',
        '6': 'six',
        '7': 'seven',
        '8': 'eight',
        '9': 'nine',
        '10': 'ten',
        '20': 'twenty',
        '30': 'thirty',
        '40': 'forty',
        '50': 'fifty',
        '100': 'hundred',
        '1000': 'thousand',
      },
      sentences: {
        // Greetings
        Hello: 'Hello',
        'Good morning': 'Good morning',
        'Good afternoon': 'Good afternoon',
        'Good night': 'Good night',
        Goodbye: 'Goodbye',
        // Essential Phrases
        'How are you?': 'How are you?',
        'I am fine': 'I am fine',
        'Thank you': 'Thank you',
        "You're welcome": "You're welcome",
        Please: 'Please',
        'Excuse me': 'Excuse me',
        "I'm sorry": "I'm sorry",
        // Emergency Phrases
        'I need help': 'I need help',
        'I am lost': 'I am lost',
        "I don't understand": "I don't understand",
        'Do you speak English?': 'Do you speak English?',
        'Where is the bathroom?': 'Where is the bathroom?',
        // Practical Phrases
        'How much does it cost?': 'How much does it cost?',
        'Can you help me?': 'Can you help me?',
        'I would like...': 'I would like...',
        'The check, please': 'The check, please',
      },
    },
  };

  getLanguages(): Language[] {
    return [...this.languages].sort((a, b) => a.name.localeCompare(b.name));
  }

  getContent(languageCode: string): LearningContent | undefined {
    return this.content[languageCode];
  }
}
