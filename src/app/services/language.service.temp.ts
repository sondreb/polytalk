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
    bs: {
      words: {
        // Essential Nouns
        water: 'voda',
        food: 'hrana',
        restaurant: 'restoran',
        bathroom: 'kupatilo',
        hospital: 'bolnica',
        hotel: 'hotel',
        airport: 'aerodrom',
        train: 'voz',
        bus: 'autobus',
        taxi: 'taksi',
        // Common Adjectives
        good: 'dobro',
        bad: 'loše',
        big: 'veliko',
        small: 'malo',
        hot: 'vruće',
        cold: 'hladno',
        // Essential Verbs
        'to eat': 'jesti',
        'to drink': 'piti',
        'to sleep': 'spavati',
        'to go': 'ići',
        'to help': 'pomoći',
        thanks: 'hvala',
      },
      numbers: {
        '0': 'nula',
        '1': 'jedan',
        '2': 'dva',
        '3': 'tri',
        '4': 'četiri',
        '5': 'pet',
        '6': 'šest',
        '7': 'sedam',
        '8': 'osam',
        '9': 'devet',
        '10': 'deset',
        '20': 'dvadeset',
        '30': 'trideset',
        '40': 'četrdeset',
        '50': 'pedeset',
        '100': 'sto',
        '1000': 'hiljada',
      },
      sentences: {
        // Greetings
        Hello: 'Zdravo',
        'Good morning': 'Dobro jutro',
        'Good afternoon': 'Dobar dan',
        'Good night': 'Laku noć',
        Goodbye: 'Doviđenja',
        // Essential Phrases
        'How are you?': 'Kako ste?',
        'I am fine': 'Dobro sam',
        'Thank you': 'Hvala',
        "You're welcome": 'Nema na čemu',
        Please: 'Molim',
        'Excuse me': 'Izvinite',
        "I'm sorry": 'Žao mi je',
        // Emergency Phrases
        'I need help': 'Treba mi pomoć',
        'I am lost': 'Izgubio sam se',
        "I don't understand": 'Ne razumijem',
        'Do you speak English?': 'Da li govorite engleski?',
        'Where is the bathroom?': 'Gdje je kupatilo?',
        // Practical Phrases
        'How much does it cost?': 'Koliko košta?',
        'Can you help me?': 'Možete li mi pomoći?',
        'I would like...': 'Želio bih...',
        'The check, please': 'Račun, molim',
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
