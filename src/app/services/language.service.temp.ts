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
    ro: {
      words: {
        // Essential Nouns
        water: 'apă',
        food: 'mâncare',
        restaurant: 'restaurant',
        bathroom: 'baie',
        hospital: 'spital',
        hotel: 'hotel',
        airport: 'aeroport',
        train: 'tren',
        bus: 'autobuz',
        taxi: 'taxi',
        // Common Adjectives
        good: 'bun',
        bad: 'rău',
        big: 'mare',
        small: 'mic',
        hot: 'cald',
        cold: 'rece',
        // Essential Verbs
        'to eat': 'a mânca',
        'to drink': 'a bea',
        'to sleep': 'a dormi',
        'to go': 'a merge',
        'to help': 'a ajuta',
        thanks: 'mulțumesc',
      },
      numbers: {
        '0': 'zero',
        '1': 'unu',
        '2': 'doi',
        '3': 'trei',
        '4': 'patru',
        '5': 'cinci',
        '6': 'șase',
        '7': 'șapte',
        '8': 'opt',
        '9': 'nouă',
        '10': 'zece',
        '20': 'douăzeci',
        '30': 'treizeci',
        '40': 'patruzeci',
        '50': 'cincizeci',
        '100': 'sută',
        '1000': 'mie',
      },
      sentences: {
        // Greetings
        Hello: 'Bună',
        'Good morning': 'Bună dimineața',
        'Good afternoon': 'Bună ziua',
        'Good night': 'Noapte bună',
        Goodbye: 'La revedere',
        // Essential Phrases
        'How are you?': 'Ce mai faci?',
        'I am fine': 'Sunt bine',
        'Thank you': 'Mulțumesc',
        "You're welcome": 'Cu plăcere',
        Please: 'Te rog',
        'Excuse me': 'Scuză-mă',
        "I'm sorry": 'Îmi pare rău',
        // Emergency Phrases
        'I need help': 'Am nevoie de ajutor',
        'I am lost': 'M-am pierdut',
        "I don't understand": 'Nu înțeleg',
        'Do you speak English?': 'Vorbiți engleză?',
        'Where is the bathroom?': 'Unde este baia?',
        // Practical Phrases
        'How much does it cost?': 'Cât costă?',
        'Can you help me?': 'Mă puteți ajuta?',
        'I would like...': 'Aș dori...',
        'The check, please': 'Nota de plată, vă rog',
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
