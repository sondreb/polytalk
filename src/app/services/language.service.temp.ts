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
    no: {
      words: {
        // Essential Nouns
        water: 'vann',
        food: 'mat',
        restaurant: 'restaurant',
        bathroom: 'toalett',
        hospital: 'sykehus',
        hotel: 'hotell',
        airport: 'flyplass',
        train: 'tog',
        bus: 'buss',
        taxi: 'taxi',
        // Common Adjectives
        good: 'bra',
        bad: 'dårlig',
        big: 'stor',
        small: 'liten',
        hot: 'varm',
        cold: 'kald',
        // Essential Verbs
        'to eat': 'spise',
        'to drink': 'drikke',
        'to sleep': 'sove',
        'to go': 'gå',
        'to help': 'hjelpe',
        thanks: 'takk',
      },
      numbers: {
        '0': 'null',
        '1': 'en',
        '2': 'to',
        '3': 'tre',
        '4': 'fire',
        '5': 'fem',
        '6': 'seks',
        '7': 'sju',
        '8': 'åtte',
        '9': 'ni',
        '10': 'ti',
        '20': 'tjue',
        '30': 'tretti',
        '40': 'førti',
        '50': 'femti',
        '100': 'hundre',
        '1000': 'tusen',
      },
      sentences: {
        // Greetings
        Hello: 'Hallo',
        'Good morning': 'God morgen',
        'Good afternoon': 'God ettermiddag',
        'Good night': 'God natt',
        Goodbye: 'Ha det',
        // Essential Phrases
        'How are you?': 'Hvordan har du det?',
        'I am fine': 'Jeg har det bra',
        'Thank you': 'Takk',
        "You're welcome": 'Vær så god',
        Please: 'Vær så snill',
        'Excuse me': 'Unnskyld',
        "I'm sorry": 'Jeg beklager',
        // Emergency Phrases
        'I need help': 'Jeg trenger hjelp',
        'I am lost': 'Jeg har gått meg vill',
        "I don't understand": 'Jeg forstår ikke',
        'Do you speak English?': 'Snakker du engelsk?',
        'Where is the bathroom?': 'Hvor er toalettet?',
        // Practical Phrases
        'How much does it cost?': 'Hvor mye koster det?',
        'Can you help me?': 'Kan du hjelpe meg?',
        'I would like...': 'Jeg vil gjerne ha...',
        'The check, please': 'Regningen, takk',
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
