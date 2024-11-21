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
    it: {
      words: {
        // Essential Nouns
        water: 'acqua',
        food: 'cibo',
        restaurant: 'ristorante',
        bathroom: 'bagno',
        hospital: 'ospedale',
        hotel: 'albergo',
        airport: 'aeroporto',
        train: 'treno',
        bus: 'autobus',
        taxi: 'taxi',
        // Common Adjectives
        good: 'buono',
        bad: 'cattivo',
        big: 'grande',
        small: 'piccolo',
        hot: 'caldo',
        cold: 'freddo',
        // Essential Verbs
        'to eat': 'mangiare',
        'to drink': 'bere',
        'to sleep': 'dormire',
        'to go': 'andare',
        'to help': 'aiutare',
        thanks: 'grazie',
      },
      numbers: {
        '0': 'zero',
        '1': 'uno',
        '2': 'due',
        '3': 'tre',
        '4': 'quattro',
        '5': 'cinque',
        '6': 'sei',
        '7': 'sette',
        '8': 'otto',
        '9': 'nove',
        '10': 'dieci',
        '20': 'venti',
        '30': 'trenta',
        '40': 'quaranta',
        '50': 'cinquanta',
        '100': 'cento',
        '1000': 'mille',
      },
      sentences: {
        // Greetings
        Hello: 'Ciao',
        'Good morning': 'Buongiorno',
        'Good afternoon': 'Buon pomeriggio',
        'Good night': 'Buonanotte',
        Goodbye: 'Arrivederci',
        // Essential Phrases
        'How are you?': 'Come stai?',
        'I am fine': 'Sto bene',
        'Thank you': 'Grazie',
        "You're welcome": 'Prego',
        Please: 'Per favore',
        'Excuse me': 'Scusi',
        "I'm sorry": 'Mi dispiace',
        // Emergency Phrases
        'I need help': 'Ho bisogno di aiuto',
        'I am lost': 'Mi sono perso',
        "I don't understand": 'Non capisco',
        'Do you speak English?': 'Parla inglese?',
        'Where is the bathroom?': "Dov'è il bagno?",
        // Practical Phrases
        'How much does it cost?': 'Quanto costa?',
        'Can you help me?': 'Può aiutarmi?',
        'I would like...': 'Vorrei...',
        'The check, please': 'Il conto, per favore',
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
