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
    uk: {
      words: {
        // Essential Nouns
        water: 'вода',
        food: 'їжа',
        restaurant: 'ресторан',
        bathroom: 'ванна кімната',
        hospital: 'лікарня',
        hotel: 'готель',
        airport: 'аеропорт',
        train: 'потяг',
        bus: 'автобус',
        taxi: 'таксі',
        // Common Adjectives
        good: 'добрий',
        bad: 'поганий',
        big: 'великий',
        small: 'маленький',
        hot: 'гарячий',
        cold: 'холодний',
        // Essential Verbs
        'to eat': 'їсти',
        'to drink': 'пити',
        'to sleep': 'спати',
        'to go': 'йти',
        'to help': 'допомогти',
        thanks: 'дякую',
      },
      numbers: {
        '0': 'нуль',
        '1': 'один',
        '2': 'два',
        '3': 'три',
        '4': 'чотири',
        '5': 'п\'ять',
        '6': 'шість',
        '7': 'сім',
        '8': 'вісім',
        '9': 'дев\'ять',
        '10': 'десять',
        '20': 'двадцять',
        '30': 'тридцять',
        '40': 'сорок',
        '50': 'п\'ятдесят',
        '100': 'сто',
        '1000': 'тисяча',
      },
      sentences: {
        // Greetings
        Hello: 'Привіт',
        'Good morning': 'Добрий ранок',
        'Good afternoon': 'Добрий день',
        'Good night': 'Добраніч',
        Goodbye: 'До побачення',
        // Essential Phrases
        'How are you?': 'Як справи?',
        'I am fine': 'У мене все добре',
        'Thank you': 'Дякую',
        "You're welcome": 'Будь ласка',
        Please: 'Будь ласка',
        'Excuse me': 'Перепрошую',
        "I'm sorry": 'Вибачте',
        // Emergency Phrases
        'I need help': 'Мені потрібна допомога',
        'I am lost': 'Я заблукав',
        "I don't understand": 'Я не розумію',
        'Do you speak English?': 'Ви розмовляєте англійською?',
        'Where is the bathroom?': 'Де знаходиться ванна кімната?',
        // Practical Phrases
        'How much does it cost?': 'Скільки це коштує?',
        'Can you help me?': 'Можете мені допомогти?',
        'I would like...': 'Я б хотів...',
        'The check, please': 'Рахунок, будь ласка',
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
