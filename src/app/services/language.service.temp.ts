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
    de: {
      words: {
        // Essential Nouns
        water: 'Wasser',
        food: 'Essen',
        restaurant: 'Restaurant',
        bathroom: 'Toilette',
        hospital: 'Krankenhaus',
        hotel: 'Hotel',
        airport: 'Flughafen',
        train: 'Zug',
        bus: 'Bus',
        taxi: 'Taxi',
        // Common Adjectives
        good: 'gut',
        bad: 'schlecht',
        big: 'groß',
        small: 'klein',
        hot: 'heiß',
        cold: 'kalt',
        // Essential Verbs
        'to eat': 'essen',
        'to drink': 'trinken',
        'to sleep': 'schlafen',
        'to go': 'gehen',
        'to help': 'helfen',
        thanks: 'danke',
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
        Hello: 'Hallo',
        'Good morning': 'Guten Morgen',
        'Good afternoon': 'Guten Tag',
        'Good night': 'Gute Nacht',
        Goodbye: 'Auf Wiedersehen',
        // Essential Phrases
        'How are you?': 'Wie geht es Ihnen?',
        'I am fine': 'Mir geht es gut',
        'Thank you': 'Danke',
        "You're welcome": 'Bitte',
        Please: 'Bitte',
        'Excuse me': 'Entschuldigung',
        "I'm sorry": 'Es tut mir leid',
        // Emergency Phrases
        'I need help': 'Ich brauche Hilfe',
        'I am lost': 'Ich habe mich verirrt',
        "I don't understand": 'Ich verstehe nicht',
        'Do you speak English?': 'Sprechen Sie Englisch?',
        'Where is the bathroom?': 'Wo ist die Toilette?',
        // Practical Phrases
        'How much does it cost?': 'Wie viel kostet das?',
        'Can you help me?': 'Können Sie mir helfen?',
        'I would like...': 'Ich möchte...',
        'The check, please': 'Die Rechnung, bitte',
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
