import { Injectable } from '@angular/core';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface LearningContent {
  words: { [key: string]: string };
  numbers: { [key: string]: string };
  sentences: { [key: string]: string };
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languages: Language[] = [
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  ];

  private content: { [key: string]: LearningContent } = {
    es: {
      words: {
        // Essential Nouns
        'water': 'agua',
        'food': 'comida',
        'restaurant': 'restaurante',
        'bathroom': 'baño',
        'hospital': 'hospital',
        'hotel': 'hotel',
        'airport': 'aeropuerto',
        'train': 'tren',
        'bus': 'autobús',
        'taxi': 'taxi',
        // Common Adjectives
        'good': 'bueno',
        'bad': 'malo',
        'big': 'grande',
        'small': 'pequeño',
        'hot': 'caliente',
        'cold': 'frío',
        // Essential Verbs
        'to eat': 'comer',
        'to drink': 'beber',
        'to sleep': 'dormir',
        'to go': 'ir',
        'to help': 'ayudar',
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
        'Hello': '¡Hola!',
        'Good morning': '¡Buenos días!',
        'Good afternoon': '¡Buenas tardes!',
        'Good night': '¡Buenas noches!',
        'Goodbye': '¡Adiós!',
        // Essential Phrases
        'How are you?': '¿Cómo estás?',
        'I am fine': 'Estoy bien',
        'Thank you': 'Gracias',
        'You\'re welcome': 'De nada',
        'Please': 'Por favor',
        'Excuse me': 'Perdón',
        'I\'m sorry': 'Lo siento',
        // Emergency Phrases
        'I need help': 'Necesito ayuda',
        'I am lost': 'Estoy perdido',
        'I don\'t understand': 'No entiendo',
        'Do you speak English?': '¿Habla inglés?',
        'Where is the bathroom?': '¿Dónde está el baño?',
        // Practical Phrases
        'How much does it cost?': '¿Cuánto cuesta?',
        'Can you help me?': '¿Puede ayudarme?',
        'I would like...': 'Quisiera...',
        'The check, please': 'La cuenta, por favor',
      }
    },
    fr: {
      words: {
        // Essential Nouns
        'water': 'eau',
        'food': 'nourriture',
        'restaurant': 'restaurant',
        'bathroom': 'toilettes',
        'hospital': 'hôpital',
        'hotel': 'hôtel',
        'airport': 'aéroport',
        'train': 'train',
        'bus': 'bus',
        'taxi': 'taxi',
        // Common Adjectives
        'good': 'bon',
        'bad': 'mauvais',
        'big': 'grand',
        'small': 'petit',
        'hot': 'chaud',
        'cold': 'froid',
        // Essential Verbs
        'to eat': 'manger',
        'to drink': 'boire',
        'to sleep': 'dormir',
        'to go': 'aller',
        'to help': 'aider',
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
        'Hello': 'Bonjour',
        'Good morning': 'Bonjour',
        'Good afternoon': 'Bon après-midi',
        'Good night': 'Bonne nuit',
        'Goodbye': 'Au revoir',
        // Essential Phrases
        'How are you?': 'Comment allez-vous?',
        'I am fine': 'Je vais bien',
        'Thank you': 'Merci',
        'You\'re welcome': 'De rien',
        'Please': 'S\'il vous plaît',
        'Excuse me': 'Excusez-moi',
        'I\'m sorry': 'Je suis désolé',
        // Emergency Phrases
        'I need help': 'J\'ai besoin d\'aide',
        'I am lost': 'Je suis perdu',
        'I don\'t understand': 'Je ne comprends pas',
        'Do you speak English?': 'Parlez-vous anglais?',
        'Where is the bathroom?': 'Où sont les toilettes?',
        // Practical Phrases
        'How much does it cost?': 'Combien ça coûte?',
        'Can you help me?': 'Pouvez-vous m\'aider?',
        'I would like...': 'Je voudrais...',
        'The check, please': 'L\'addition, s\'il vous plaît',
      }
    },
    // ... Similar structure for other languages ...
  };

  getLanguages(): Language[] {
    return this.languages;
  }

  getContent(languageCode: string): LearningContent | undefined {
    return this.content[languageCode];
  }
}
