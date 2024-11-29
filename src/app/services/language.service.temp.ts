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
    et: {
      words: {
        // Essential Nouns
        water: 'vesi',
        food: 'toit',
        restaurant: 'restoran',
        bathroom: 'vannituba',
        hospital: 'haigla',
        hotel: 'hotell',
        airport: 'lennujaam',
        train: 'rong',
        bus: 'buss',
        taxi: 'takso',
        // Common Adjectives
        good: 'hea',
        bad: 'halb',
        big: 'suur',
        small: 'väike',
        hot: 'kuum',
        cold: 'külm',
        // Essential Verbs
        'to eat': 'sööma',
        'to drink': 'jooma',
        'to sleep': 'magama',
        'to go': 'minema',
        'to help': 'aitama',
        thanks: 'aitäh',
      },
      numbers: {
        '0': 'null',
        '1': 'üks',
        '2': 'kaks',
        '3': 'kolm',
        '4': 'neli',
        '5': 'viis',
        '6': 'kuus',
        '7': 'seitse',
        '8': 'kaheksa',
        '9': 'üheksa',
        '10': 'kümme',
        '20': 'kakskümmend',
        '30': 'kolmkümmend',
        '40': 'nelikümmend',
        '50': 'viiskümmend',
        '100': 'sada',
        '1000': 'tuhat',
      },
      sentences: {
        // Greetings
        Hello: 'Tere',
        'Good morning': 'Tere hommikust',
        'Good afternoon': 'Tere päevast',
        'Good night': 'Head ööd',
        Goodbye: 'Nägemist',
        // Essential Phrases
        'How are you?': 'Kuidas sul läheb?',
        'I am fine': 'Mul läheb hästi',
        'Thank you': 'Aitäh',
        "You're welcome": 'Palun',
        Please: 'Palun',
        'Excuse me': 'Vabandust',
        "I'm sorry": 'Vabandust',
        // Emergency Phrases
        'I need help': 'Ma vajan abi',
        'I am lost': 'Ma olen eksinud',
        "I don't understand": 'Ma ei saa aru',
        'Do you speak English?': 'Kas te räägite inglise keelt?',
        'Where is the bathroom?': 'Kus on vannituba?',
        // Practical Phrases
        'How much does it cost?': 'Kui palju see maksab?',
        'Can you help me?': 'Kas sa saad mind aidata?',
        'I would like...': 'Ma sooviksin...',
        'The check, please': 'Arve, palun',
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
