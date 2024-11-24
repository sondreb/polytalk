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
    da: {
      words: {
        // Essential Nouns
        water: 'vand',
        food: 'mad',
        restaurant: 'restaurant',
        bathroom: 'badeværelse',
        hospital: 'hospital',
        hotel: 'hotel',
        airport: 'lufthavn',
        train: 'tog',
        bus: 'bus',
        taxi: 'taxa',
        // Common Adjectives
        good: 'god',
        bad: 'dårlig',
        big: 'stor',
        small: 'lille',
        hot: 'varm',
        cold: 'kold',
        // Essential Verbs
        'to eat': 'spise',
        'to drink': 'drikke',
        'to sleep': 'sove',
        'to go': 'gå',
        'to help': 'hjælpe',
        thanks: 'tak',
      },
      numbers: {
        '0': 'nul',
        '1': 'en',
        '2': 'to',
        '3': 'tre',
        '4': 'fire',
        '5': 'fem',
        '6': 'seks',
        '7': 'syv',
        '8': 'otte',
        '9': 'ni',
        '10': 'ti',
        '20': 'tyve',
        '30': 'tredive',
        '40': 'fyrre',
        '50': 'halvtreds',
        '100': 'hundrede',
        '1000': 'tusind',
      },
      sentences: {
        // Greetings
        Hello: 'Hej',
        'Good morning': 'God morgen',
        'Good afternoon': 'God eftermiddag',
        'Good night': 'God nat',
        Goodbye: 'Farvel',
        // Essential Phrases
        'How are you?': 'Hvordan har du det?',
        'I am fine': 'Jeg har det godt',
        'Thank you': 'Tak',
        "You're welcome": 'Selv tak',
        Please: 'Vær så venlig',
        'Excuse me': 'Undskyld',
        "I'm sorry": 'Jeg beklager',
        // Emergency Phrases
        'I need help': 'Jeg har brug for hjælp',
        'I am lost': 'Jeg er faret vild',
        "I don't understand": 'Jeg forstår ikke',
        'Do you speak English?': 'Taler du engelsk?',
        'Where is the bathroom?': 'Hvor er toilettet?',
        // Practical Phrases
        'How much does it cost?': 'Hvor meget koster det?',
        'Can you help me?': 'Kan du hjælpe mig?',
        'I would like...': 'Jeg vil gerne have...',
        'The check, please': 'Regningen, tak',
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
