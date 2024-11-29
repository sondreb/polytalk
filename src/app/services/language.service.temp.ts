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
    sk: {
      words: {
        water: 'voda',
        food: 'jedlo',
        restaurant: 'reštaurácia',
        bathroom: 'kúpeľňa',
        hospital: 'nemocnica',
        hotel: 'hotel',
        airport: 'letisko',
        train: 'vlak',
        bus: 'autobus',
        taxi: 'taxi',
        good: 'dobrý',
        bad: 'zlý',
        big: 'veľký',
        small: 'malý',
        hot: 'horúci',
        cold: 'studený',
        'to eat': 'jesť',
        'to drink': 'piť',
        'to sleep': 'spať',
        'to go': 'ísť',
        'to help': 'pomôcť',
        thanks: 'ďakujem',
      },
      numbers: {
        '0': 'nula',
        '1': 'jeden',
        '2': 'dva',
        '3': 'tri',
        '4': 'štyri',
        '5': 'päť',
        '6': 'šesť',
        '7': 'sedem',
        '8': 'osem',
        '9': 'deväť',
        '10': 'desať',
        '20': 'dvadsať',
        '30': 'tridsať',
        '40': 'štyridsať',
        '50': 'päťdesiat',
        '100': 'sto',
        '1000': 'tisíc',
      },
      sentences: {
        Hello: 'Ahoj',
        'Good morning': 'Dobré ráno',
        'Good afternoon': 'Dobrý deň',
        'Good night': 'Dobrú noc',
        Goodbye: 'Dovidenia',
        'How are you?': 'Ako sa máš?',
        'I am fine': 'Mám sa dobre',
        'Thank you': 'Ďakujem',
        "You're welcome": 'Prosím',
        Please: 'Prosím',
        'Excuse me': 'Prepáčte',
        "I'm sorry": 'Prepáč',
        'I need help': 'Potrebujem pomoc',
        'I am lost': 'Stratil som sa',
        "I don't understand": 'Nerozumiem',
        'Do you speak English?': 'Hovoríte po anglicky?',
        'Where is the bathroom?': 'Kde je kúpeľňa?',
        'How much does it cost?': 'Koľko to stojí?',
        'Can you help me?': 'Môžete mi pomôcť?',
        'I would like...': 'Chcel by som...',
        'The check, please': 'Účet, prosím',
      },
    },
    sl: {
      words: {
        water: 'voda',
        food: 'hrana',
        restaurant: 'restavracija',
        bathroom: 'kopalnica',
        hospital: 'bolnišnica',
        hotel: 'hotel',
        airport: 'letališče',
        train: 'vlak',
        bus: 'avtobus',
        taxi: 'taksi',
        good: 'dober',
        bad: 'slab',
        big: 'velik',
        small: 'majhen',
        hot: 'vroč',
        cold: 'hladen',
        'to eat': 'jesti',
        'to drink': 'piti',
        'to sleep': 'spati',
        'to go': 'iti',
        'to help': 'pomagati',
        thanks: 'hvala',
      },
      numbers: {
        '0': 'nič',
        '1': 'ena',
        '2': 'dva',
        '3': 'tri',
        '4': 'štiri',
        '5': 'pet',
        '6': 'šest',
        '7': 'sedem',
        '8': 'osem',
        '9': 'devet',
        '10': 'deset',
        '20': 'dvajset',
        '30': 'trideset',
        '40': 'štirideset',
        '50': 'petdeset',
        '100': 'sto',
        '1000': 'tisoč',
      },
      sentences: {
        Hello: 'Zdravo',
        'Good morning': 'Dobro jutro',
        'Good afternoon': 'Dober dan',
        'Good night': 'Lahko noč',
        Goodbye: 'Nasvidenje',
        'How are you?': 'Kako si?',
        'I am fine': 'V redu sem',
        'Thank you': 'Hvala',
        "You're welcome": 'Prosim',
        Please: 'Prosim',
        'Excuse me': 'Oprostite',
        "I'm sorry": 'Oprosti',
        'I need help': 'Potrebujem pomoč',
        'I am lost': 'Izgubljen sem',
        "I don't understand": 'Ne razumem',
        'Do you speak English?': 'Ali govorite angleško?',
        'Where is the bathroom?': 'Kje je kopalnica?',
        'How much does it cost?': 'Koliko stane?',
        'Can you help me?': 'Mi lahko pomagate?',
        'I would like...': 'Rad bi...',
        'The check, please': 'Račun, prosim',
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
