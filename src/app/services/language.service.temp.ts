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
    af: {
      words: {
        // Essential Nouns
        water: 'water',
        food: 'kos',
        restaurant: 'restaurant',
        bathroom: 'badkamer',
        hospital: 'hospitaal',
        hotel: 'hotel',
        airport: 'lughawe',
        train: 'trein',
        bus: 'bus',
        taxi: 'taxi',
        // Common Adjectives
        good: 'goed',
        bad: 'sleg',
        big: 'groot',
        small: 'klein',
        hot: 'warm',
        cold: 'koud',
        // Essential Verbs
        'to eat': 'eet',
        'to drink': 'drink',
        'to sleep': 'slaap',
        'to go': 'gaan',
        'to help': 'help',
        thanks: 'dankie',
      },
      numbers: {
        '0': 'nul',
        '1': 'een',
        '2': 'twee',
        '3': 'drie',
        '4': 'vier',
        '5': 'vyf',
        '6': 'ses',
        '7': 'sewe',
        '8': 'agt',
        '9': 'nege',
        '10': 'tien',
        '20': 'twintig',
        '30': 'dertig',
        '40': 'veertig',
        '50': 'vyftig',
        '100': 'honderd',
        '1000': 'duisend',
      },
      sentences: {
        // Greetings
        Hello: 'Hallo',
        'Good morning': 'Goeie môre',
        'Good afternoon': 'Goeie middag',
        'Good night': 'Goeie nag',
        Goodbye: 'Totsiens',
        // Essential Phrases
        'How are you?': 'Hoe gaan dit?',
        'I am fine': 'Dit gaan goed',
        'Thank you': 'Dankie',
        "You're welcome": 'Plesier',
        Please: 'Asseblief',
        'Excuse me': 'Verskoon my',
        "I'm sorry": 'Ek is jammer',
        // Emergency Phrases
        'I need help': 'Ek het hulp nodig',
        'I am lost': 'Ek is verdwaal',
        "I don't understand": 'Ek verstaan nie',
        'Do you speak English?': 'Praat jy Engels?',
        'Where is the bathroom?': 'Waar is die badkamer?',
        // Practical Phrases
        'How much does it cost?': 'Hoeveel kos dit?',
        'Can you help me?': 'Kan jy my help?',
        'I would like...': 'Ek wil graag...',
        'The check, please': 'Die rekening, asseblief',
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
