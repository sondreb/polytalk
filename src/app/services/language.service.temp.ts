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
    sv: {
      words: {
        // Essential Nouns
        water: 'vatten',
        food: 'mat',
        restaurant: 'restaurang',
        bathroom: 'toalett',
        hospital: 'sjukhus',
        hotel: 'hotell',
        airport: 'flygplats',
        train: 'tåg',
        bus: 'buss',
        taxi: 'taxi',
        // Common Adjectives
        good: 'bra',
        bad: 'dålig',
        big: 'stor',
        small: 'liten',
        hot: 'varm',
        cold: 'kall',
        // Essential Verbs
        'to eat': 'äta',
        'to drink': 'dricka',
        'to sleep': 'sova',
        'to go': 'gå',
        'to help': 'hjälpa',
        thanks: 'tack',
      },
      numbers: {
        '0': 'noll',
        '1': 'ett',
        '2': 'två',
        '3': 'tre',
        '4': 'fyra',
        '5': 'fem',
        '6': 'sex',
        '7': 'sju',
        '8': 'åtta',
        '9': 'nio',
        '10': 'tio',
        '20': 'tjugo',
        '30': 'trettio',
        '40': 'fyrtio',
        '50': 'femtio',
        '100': 'hundra',
        '1000': 'tusen',
      },
      sentences: {
        // Greetings
        Hello: 'Hej',
        'Good morning': 'God morgon',
        'Good afternoon': 'God eftermiddag',
        'Good night': 'God natt',
        Goodbye: 'Hejdå',
        // Essential Phrases
        'How are you?': 'Hur mår du?',
        'I am fine': 'Jag mår bra',
        'Thank you': 'Tack',
        "You're welcome": 'Varsågod',
        Please: 'Snälla',
        'Excuse me': 'Ursäkta',
        "I'm sorry": 'Förlåt',
        // Emergency Phrases
        'I need help': 'Jag behöver hjälp',
        'I am lost': 'Jag har gått vilse',
        "I don't understand": 'Jag förstår inte',
        'Do you speak English?': 'Pratar du engelska?',
        'Where is the bathroom?': 'Var finns toaletten?',
        // Practical Phrases
        'How much does it cost?': 'Hur mycket kostar det?',
        'Can you help me?': 'Kan du hjälpa mig?',
        'I would like...': 'Jag skulle vilja ha...',
        'The check, please': 'Notan, tack',
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
