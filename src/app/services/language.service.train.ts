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
      code: 'en',
      name: 'English',
      flag: '🇬🇧',
      flagImage: '/assets/flags/gb.png',
    },
    {
      code: 'el',
      name: 'Greek',
      flag: '🇬🇷',
      flagImage: '/assets/flags/gr.png',
    },
    {
      code: 'me',
      name: 'Montenegrin',
      flag: '🇲🇪',
      flagImage: '/assets/flags/me.png',
    },
    {
      code: 'bg',
      name: 'Bulgarian',
      flag: '🇧🇬',
      flagImage: '/assets/flags/bg.png',
    },
    {
      code: 'cs',
      name: 'Czech',
      flag: '🇨🇿',
      flagImage: '/assets/flags/cz.png',
    },
    {
      code: 'fi',
      name: 'Finnish',
      flag: '🇫🇮',
      flagImage: '/assets/flags/fi.png',
    },
    {
      code: 'hu',
      name: 'Hungarian',
      flag: '🇭🇺',
      flagImage: '/assets/flags/hu.png',
    },
    {
      code: 'et',
      name: 'Estonian',
      flag: '🇪🇪',
      flagImage: '/assets/flags/ee.png',
    },
    {
      code: 'hr',
      name: 'Croatian',
      flag: '🇭🇷',
      flagImage: '/assets/flags/hr.png',
    },
  ];

  private content: { [key: string]: LearningContent } = {
    en: {
      words: {
        // Essential Nouns
        water: 'water',
        food: 'food',
        restaurant: 'restaurant',
        bathroom: 'bathroom',
        hospital: 'hospital',
        hotel: 'hotel',
        airport: 'airport',
        train: 'train',
        bus: 'bus',
        taxi: 'taxi',
        // Common Adjectives
        good: 'good',
        bad: 'bad',
        big: 'big',
        small: 'small',
        hot: 'hot',
        cold: 'cold',
        // Essential Verbs
        'to eat': 'to eat',
        'to drink': 'to drink',
        'to sleep': 'to sleep',
        'to go': 'to go',
        'to help': 'to help',
        thanks: 'thanks',
      },
      numbers: {
        '0': 'zero',
        '1': 'one',
        '2': 'two',
        '3': 'three',
        '4': 'four',
        '5': 'five',
        '6': 'six',
        '7': 'seven',
        '8': 'eight',
        '9': 'nine',
        '10': 'ten',
        '20': 'twenty',
        '30': 'thirty',
        '40': 'forty',
        '50': 'fifty',
        '100': 'hundred',
        '1000': 'thousand',
      },
      sentences: {
        // Greetings
        Hello: 'Hello',
        'Good morning': 'Good morning',
        'Good afternoon': 'Good afternoon',
        'Good night': 'Good night',
        Goodbye: 'Goodbye',
        // Essential Phrases
        'How are you?': 'How are you?',
        'I am fine': 'I am fine',
        'Thank you': 'Thank you',
        "You're welcome": "You're welcome",
        Please: 'Please',
        'Excuse me': 'Excuse me',
        "I'm sorry": "I'm sorry",
        // Emergency Phrases
        'I need help': 'I need help',
        'I am lost': 'I am lost',
        "I don't understand": "I don't understand",
        'Do you speak English?': 'Do you speak English?',
        'Where is the bathroom?': 'Where is the bathroom?',
        // Practical Phrases
        'How much does it cost?': 'How much does it cost?',
        'Can you help me?': 'Can you help me?',
        'I would like...': 'I would like...',
        'The check, please': 'The check, please',
      },
    },
    hu: {
      words: {
        // Essential Nouns
        water: 'víz',
        food: 'étel',
        restaurant: 'étterem',
        bathroom: 'mosdó',
        hospital: 'kórház',
        hotel: 'szálloda',
        airport: 'repülőtér',
        train: 'vonat',
        bus: 'busz',
        taxi: 'taxi',
        // Common Adjectives
        good: 'jó',
        bad: 'rossz',
        big: 'nagy',
        small: 'kicsi',
        hot: 'forró',
        cold: 'hideg',
        // Essential Verbs
        'to eat': 'enni',
        'to drink': 'inni',
        'to sleep': 'aludni',
        'to go': 'menni',
        'to help': 'segíteni',
        thanks: 'köszönöm',
      },
      numbers: {
        '0': 'nulla',
        '1': 'egy',
        '2': 'kettő',
        '3': 'három',
        '4': 'négy',
        '5': 'öt',
        '6': 'hat',
        '7': 'hét',
        '8': 'nyolc',
        '9': 'kilenc',
        '10': 'tíz',
        '20': 'húsz',
        '30': 'harminc',
        '40': 'negyven',
        '50': 'ötven',
        '100': 'száz',
        '1000': 'ezer',
      },
      sentences: {
        // Greetings
        Hello: 'Szia',
        'Good morning': 'Jó reggelt',
        'Good afternoon': 'Jó napot',
        'Good night': 'Jó éjszakát',
        Goodbye: 'Viszontlátásra',
        // Essential Phrases
        'How are you?': 'Hogy vagy?',
        'I am fine': 'Jól vagyok',
        'Thank you': 'Köszönöm',
        "You're welcome": 'Szívesen',
        Please: 'Kérem',
        'Excuse me': 'Elnézést',
        "I'm sorry": 'Sajnálom',
        // Emergency Phrases
        'I need help': 'Segítségre van szükségem',
        'I am lost': 'Eltévedtem',
        "I don't understand": 'Nem értem',
        'Do you speak English?': 'Beszélsz angolul?',
        'Where is the bathroom?': 'Hol van a mosdó?',
        // Practical Phrases
        'How much does it cost?': 'Mennyibe kerül?',
        'Can you help me?': 'Tudsz segíteni?',
        'I would like...': 'Szeretnék...',
        'The check, please': 'A számlát kérem',
      },
    },
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
    return [...this.languages].sort((a, b) => a.name.localeCompare(b.name));
  }

  getContent(languageCode: string): LearningContent | undefined {
    return this.content[languageCode];
  }
}
