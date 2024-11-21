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
  };

  getLanguages(): Language[] {
    return this.languages;
  }

  getContent(languageCode: string): LearningContent | undefined {
    return this.content[languageCode];
  }
}
