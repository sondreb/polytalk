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
    nl: {
      words: {
        // Essential Nouns
        water: 'Water',
        food: 'Eten',
        restaurant: 'Restaurant',
        bathroom: 'Toilet',
        hospital: 'Ziekenhuis',
        hotel: 'Hotel',
        airport: 'Vliegveld',
        train: 'Trein',
        bus: 'Bus',
        taxi: 'Taxi',
        // Common Adjectives
        good: 'goed',
        bad: 'slecht',
        big: 'groot',
        small: 'klein',
        hot: 'heet',
        cold: 'koud',
        // Essential Verbs
        'to eat': 'eten',
        'to drink': 'drinken',
        'to sleep': 'slapen',
        'to go': 'gaan',
        'to help': 'helpen',
        thanks: 'dank je',
      },
      numbers: {
        '0': 'nul',
        '1': 'één',
        '2': 'twee',
        '3': 'drie',
        '4': 'vier',
        '5': 'vijf',
        '6': 'zes',
        '7': 'zeven',
        '8': 'acht',
        '9': 'negen',
        '10': 'tien',
        '20': 'twintig',
        '30': 'dertig',
        '40': 'veertig',
        '50': 'vijftig',
        '100': 'honderd',
        '1000': 'duizend',
      },
      sentences: {
        // Greetings
        Hello: 'Hallo',
        'Good morning': 'Goedemorgen',
        'Good afternoon': 'Goedemiddag',
        'Good night': 'Goedenacht',
        Goodbye: 'Vaarwel',
        // Essential Phrases
        'How are you?': 'Hoe gaat het met je?',
        'I am fine': 'Het gaat goed met mij',
        'Thank you': 'Dank je',
        "You're welcome": 'Graag gedaan',
        Please: 'Alsjeblieft',
        'Excuse me': 'Excuseer mij',
        "I'm sorry": 'Het spijt me',
        // Emergency Phrases
        'I need help': 'Ik heb hulp nodig',
        'I am lost': 'Ik ben verdwaald',
        "I don't understand": 'Ik begrijp het niet',
        'Do you speak English?': 'Spreek je Engels?',
        'Where is the bathroom?': 'Waar is de wc?',
        // Practical Phrases
        'How much does it cost?': 'Hoeveel kost het?',
        'Can you help me?': 'Kun je mij helpen?',
        'I would like...': 'Ik wil graag...',
        'The check, please': 'De rekening, alsjeblieft',
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
