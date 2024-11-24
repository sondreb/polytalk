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
      code: 'es',
      name: 'Spanish',
      flag: '🇪🇸',
      flagImage: '/assets/flags/es.png',
    },
    {
      code: 'fr',
      name: 'French',
      flag: '🇫🇷',
      flagImage: '/assets/flags/fr.png',
    },
    {
      code: 'de',
      name: 'German',
      flag: '🇩🇪',
      flagImage: '/assets/flags/de.png',
    },
    {
      code: 'he',
      name: 'Hebrew',
      flag: '🇮🇱',
      flagImage: '/assets/flags/il.png',
    },
    {
      code: 'fa',
      name: 'Persian',
      flag: '🇮🇷',
      flagImage: '/assets/flags/ir.png',
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
    es: {
      words: {
        // Essential Nouns
        water: 'agua',
        food: 'comida',
        restaurant: 'restaurante',
        bathroom: 'baño',
        hospital: 'hospital',
        hotel: 'hotel',
        airport: 'aeropuerto',
        train: 'tren',
        bus: 'autobús',
        taxi: 'taxi',
        // Common Adjectives
        good: 'bueno',
        bad: 'malo',
        big: 'grande',
        small: 'pequeño',
        hot: 'caliente',
        cold: 'frío',
        // Essential Verbs
        'to eat': 'comer',
        'to drink': 'beber',
        'to sleep': 'dormir',
        'to go': 'ir',
        'to help': 'ayudar',
        thanks: 'gracias',
      },
      numbers: {
        '0': 'cero',
        '1': 'uno',
        '2': 'dos',
        '3': 'tres',
        '4': 'cuatro',
        '5': 'cinco',
        '6': 'seis',
        '7': 'siete',
        '8': 'ocho',
        '9': 'nueve',
        '10': 'diez',
        '20': 'veinte',
        '30': 'treinta',
        '40': 'cuarenta',
        '50': 'cincuenta',
        '100': 'cien',
        '1000': 'mil',
      },
      sentences: {
        // Greetings
        Hello: '¡Hola!',
        'Good morning': '¡Buenos días!',
        'Good afternoon': '¡Buenas tardes!',
        'Good night': '¡Buenas noches!',
        Goodbye: '¡Adiós!',
        // Essential Phrases
        'How are you?': '¿Cómo estás?',
        'I am fine': 'Estoy bien',
        'Thank you': 'Gracias',
        "You're welcome": 'De nada',
        Please: 'Por favor',
        'Excuse me': 'Perdón',
        "I'm sorry": 'Lo siento',
        // Emergency Phrases
        'I need help': 'Necesito ayuda',
        'I am lost': 'Estoy perdido',
        "I don't understand": 'No entiendo',
        'Do you speak English?': '¿Habla inglés?',
        'Where is the bathroom?': '¿Dónde está el baño?',
        // Practical Phrases
        'How much does it cost?': '¿Cuánto cuesta?',
        'Can you help me?': '¿Puede ayudarme?',
        'I would like...': 'Quisiera...',
        'The check, please': 'La cuenta, por favor',
      },
    },
    fr: {
      words: {
        // Essential Nouns
        water: 'eau',
        food: 'nourriture',
        restaurant: 'restaurant',
        bathroom: 'toilettes',
        hospital: 'hôpital',
        hotel: 'hôtel',
        airport: 'aéroport',
        train: 'train',
        bus: 'bus',
        taxi: 'taxi',
        // Common Adjectives
        good: 'bon',
        bad: 'mauvais',
        big: 'grand',
        small: 'petit',
        hot: 'chaud',
        cold: 'froid',
        // Essential Verbs
        'to eat': 'manger',
        'to drink': 'boire',
        'to sleep': 'dormir',
        'to go': 'aller',
        'to help': 'aider',
        thanks: 'merci',
      },
      numbers: {
        '0': 'zéro',
        '1': 'un',
        '2': 'deux',
        '3': 'trois',
        '4': 'quatre',
        '5': 'cinq',
        '6': 'six',
        '7': 'sept',
        '8': 'huit',
        '9': 'neuf',
        '10': 'dix',
        '20': 'vingt',
        '30': 'trente',
        '40': 'quarante',
        '50': 'cinquante',
        '100': 'cent',
        '1000': 'mille',
      },
      sentences: {
        // Greetings
        Hello: 'Bonjour',
        'Good morning': 'Bonjour',
        'Good afternoon': 'Bon après-midi',
        'Good night': 'Bonne nuit',
        Goodbye: 'Au revoir',
        // Essential Phrases
        'How are you?': 'Comment allez-vous?',
        'I am fine': 'Je vais bien',
        'Thank you': 'Merci',
        "You're welcome": 'De rien',
        Please: "S'il vous plaît",
        'Excuse me': 'Excusez-moi',
        "I'm sorry": 'Je suis désolé',
        // Emergency Phrases
        'I need help': "J'ai besoin d'aide",
        'I am lost': 'Je suis perdu',
        "I don't understand": 'Je ne comprends pas',
        'Do you speak English?': 'Parlez-vous anglais?',
        'Where is the bathroom?': 'Où sont les toilettes?',
        // Practical Phrases
        'How much does it cost?': 'Combien ça coûte?',
        'Can you help me?': "Pouvez-vous m'aider?",
        'I would like...': 'Je voudrais...',
        'The check, please': "L'addition, s'il vous plaît",
      },
    },
    de: {
      words: {
        // Essential Nouns
        water: 'Wasser',
        food: 'Essen',
        restaurant: 'Restaurant',
        bathroom: 'Toilette',
        hospital: 'Krankenhaus',
        hotel: 'Hotel',
        airport: 'Flughafen',
        train: 'Zug',
        bus: 'Bus',
        taxi: 'Taxi',
        // Common Adjectives
        good: 'gut',
        bad: 'schlecht',
        big: 'groß',
        small: 'klein',
        hot: 'heiß',
        cold: 'kalt',
        // Essential Verbs
        'to eat': 'essen',
        'to drink': 'trinken',
        'to sleep': 'schlafen',
        'to go': 'gehen',
        'to help': 'helfen',
        thanks: 'danke',
      },
      numbers: {
        '0': 'null',
        '1': 'eins',
        '2': 'zwei',
        '3': 'drei',
        '4': 'vier',
        '5': 'fünf',
        '6': 'sechs',
        '7': 'sieben',
        '8': 'acht',
        '9': 'neun',
        '10': 'zehn',
        '20': 'zwanzig',
        '30': 'dreißig',
        '40': 'vierzig',
        '50': 'fünfzig',
        '100': 'hundert',
        '1000': 'tausend',
      },
      sentences: {
        // Greetings
        Hello: 'Hallo',
        'Good morning': 'Guten Morgen',
        'Good afternoon': 'Guten Tag',
        'Good night': 'Gute Nacht',
        Goodbye: 'Auf Wiedersehen',
        // Essential Phrases
        'How are you?': 'Wie geht es Ihnen?',
        'I am fine': 'Mir geht es gut',
        'Thank you': 'Danke',
        "You're welcome": 'Bitte',
        Please: 'Bitte',
        'Excuse me': 'Entschuldigung',
        "I'm sorry": 'Es tut mir leid',
        // Emergency Phrases
        'I need help': 'Ich brauche Hilfe',
        'I am lost': 'Ich habe mich verirrt',
        "I don't understand": 'Ich verstehe nicht',
        'Do you speak English?': 'Sprechen Sie Englisch?',
        'Where is the bathroom?': 'Wo ist die Toilette?',
        // Practical Phrases
        'How much does it cost?': 'Wie viel kostet das?',
        'Can you help me?': 'Können Sie mir helfen?',
        'I would like...': 'Ich möchte...',
        'The check, please': 'Die Rechnung, bitte',
      },
    },
    fa: {
      words: {
        // Essential Nouns
        water: 'آب',
        food: 'غذا',
        restaurant: 'رستوران',
        bathroom: 'دستشویی',
        hospital: 'بیمارستان',
        hotel: 'هتل',
        airport: 'فرودگاه',
        train: 'قطار',
        bus: 'اتوبوس',
        taxi: 'تاکسی',
        // Common Adjectives
        good: 'خوب',
        bad: 'بد',
        big: 'بزرگ',
        small: 'کوچک',
        hot: 'داغ',
        cold: 'سرد',
        // Essential Verbs
        'to eat': 'خوردن',
        'to drink': 'نوشیدن',
        'to sleep': 'خوابیدن',
        'to go': 'رفتن',
        'to help': 'کمک کردن',
        thanks: 'ممنون',
      },
      numbers: {
        '0': 'صفر',
        '1': 'یک',
        '2': 'دو',
        '3': 'سه',
        '4': 'چهار',
        '5': 'پنج',
        '6': 'شش',
        '7': 'هفت',
        '8': 'هشت',
        '9': 'نه',
        '10': 'ده',
        '20': 'بیست',
        '30': 'سی',
        '40': 'چهل',
        '50': 'پنجاه',
        '100': 'صد',
        '1000': 'هزار',
      },
      sentences: {
        // Greetings
        Hello: 'سلام',
        'Good morning': 'صبح بخیر',
        'Good afternoon': 'ظهر بخیر',
        'Good night': 'شب بخیر',
        Goodbye: 'خداحافظ',
        // Essential Phrases
        'How are you?': 'حال شما چطور است؟',
        'I am fine': 'من خوب هستم',
        'Thank you': 'متشکرم',
        "You're welcome": 'خواهش می‌کنم',
        Please: 'لطفاً',
        'Excuse me': 'ببخشید',
        "I'm sorry": 'متأسفم',
        // Emergency Phrases
        'I need help': 'من به کمک نیاز دارم',
        'I am lost': 'من گم شده‌ام',
        "I don't understand": 'من نمی‌فهمم',
        'Do you speak English?': 'انگلیسی صحبت می‌کنید؟',
        'Where is the bathroom?': 'دستشویی کجاست؟',
        // Practical Phrases
        'How much does it cost?': 'چقدر می‌شود؟',
        'Can you help me?': 'می‌توانید به من کمک کنید؟',
        'I would like...': 'من می‌خواهم...',
        'The check, please': 'صورتحساب، لطفاً',
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
