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
    pt: {
      words: {
        // Essential Nouns
        water: 'água',
        food: 'comida',
        restaurant: 'restaurante',
        bathroom: 'banheiro',
        hospital: 'hospital',
        hotel: 'hotel',
        airport: 'aeroporto',
        train: 'trem',
        bus: 'ônibus',
        taxi: 'táxi',
        // Common Adjectives
        good: 'bom',
        bad: 'mau',
        big: 'grande',
        small: 'pequeno',
        hot: 'quente',
        cold: 'frio',
        // Essential Verbs
        'to eat': 'comer',
        'to drink': 'beber',
        'to sleep': 'dormir',
        'to go': 'ir',
        'to help': 'ajudar',
        thanks: 'obrigado',
      },
      numbers: {
        '0': 'zero',
        '1': 'um',
        '2': 'dois',
        '3': 'três',
        '4': 'quatro',
        '5': 'cinco',
        '6': 'seis',
        '7': 'sete',
        '8': 'oito',
        '9': 'nove',
        '10': 'dez',
        '20': 'vinte',
        '30': 'trinta',
        '40': 'quarenta',
        '50': 'cinquenta',
        '100': 'cem',
        '1000': 'mil',
      },
      sentences: {
        // Greetings
        Hello: 'Olá',
        'Good morning': 'Bom dia',
        'Good afternoon': 'Boa tarde',
        'Good night': 'Boa noite',
        Goodbye: 'Adeus',
        // Essential Phrases
        'How are you?': 'Como está?',
        'I am fine': 'Estou bem',
        'Thank you': 'Obrigado',
        "You're welcome": 'De nada',
        Please: 'Por favor',
        'Excuse me': 'Com licença',
        "I'm sorry": 'Desculpe',
        // Emergency Phrases
        'I need help': 'Preciso de ajuda',
        'I am lost': 'Estou perdido',
        "I don't understand": 'Não entendo',
        'Do you speak English?': 'Você fala inglês?',
        'Where is the bathroom?': 'Onde é o banheiro?',
        // Practical Phrases
        'How much does it cost?': 'Quanto custa?',
        'Can you help me?': 'Pode me ajudar?',
        'I would like...': 'Eu gostaria...',
        'The check, please': 'A conta, por favor',
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
