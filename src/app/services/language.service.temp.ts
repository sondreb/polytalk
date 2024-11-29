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
    hr: {
      words: {
        // Essential Nouns
        water: 'voda',
        food: 'hrana',
        restaurant: 'restoran',
        bathroom: 'kupaonica',
        hospital: 'bolnica',
        hotel: 'hotel',
        airport: 'zračna luka',
        train: 'vlak',
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
        '1000': 'tisuću',
      },
      sentences: {
        // Greetings
        Hello: 'Bok',
        'Good morning': 'Dobro jutro',
        'Good afternoon': 'Dobar dan',
        'Good night': 'Laku noć',
        Goodbye: 'Doviđenja',
        // Essential Phrases
        'How are you?': 'Kako si?',
        'I am fine': 'Dobro sam',
        'Thank you': 'Hvala',
        "You're welcome": 'Molim',
        Please: 'Molim',
        'Excuse me': 'Oprostite',
        "I'm sorry": 'Žao mi je',
        // Emergency Phrases
        'I need help': 'Trebam pomoć',
        'I am lost': 'Izgubio/la sam se',
        "I don't understand": 'Ne razumijem',
        'Do you speak English?': 'Govorite li engleski?',
        'Where is the bathroom?': 'Gdje je kupaonica?',
        // Practical Phrases
        'How much does it cost?': 'Koliko košta?',
        'Can you help me?': 'Možete li mi pomoći?',
        'I would like...': 'Želio/la bih...',
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
