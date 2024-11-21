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
    ru: {
      words: {
        // Essential Nouns
        water: 'вода (voda)',
        food: 'еда (yeda)',
        restaurant: 'ресторан (restoran)',
        bathroom: 'туалет (tualet)',
      },
      numbers: {
        '0': 'ноль (nol)',
        '1': 'один (odin)',
        '2': 'два (dva)',
        '3': 'три (tri)',
      },
      sentences: {
        // Greetings
        Hello: 'Здравствуйте (Zdravstvuyte)',
        'Good morning': 'Доброе утро (Dobroye utro)',
        'Good afternoon': 'Добрый день (Dobryy den)',
        'Good night': 'Спокойной ночи (Spokoynoy nochi)',
      },
    },

    pl: {
      words: {
        // Essential Nouns
        water: 'woda',
        food: 'jedzenie',
        restaurant: 'restauracja',
        bathroom: 'łazienka',
        hospital: 'szpital',
        hotel: 'hotel',
        airport: 'lotnisko',
        train: 'pociąg',
        bus: 'autobus',
        taxi: 'taksówka',
        // Common Adjectives
        good: 'dobry',
        bad: 'zły',
        big: 'duży',
        small: 'mały',
        hot: 'gorący',
        cold: 'zimny',
        // Essential Verbs
        'to eat': 'jeść',
        'to drink': 'pić',
        'to sleep': 'spać',
        'to go': 'iść',
        'to help': 'pomóc',
        thanks: 'dziękuję',
      },
      numbers: {
        '0': 'zero',
        '1': 'jeden',
        '2': 'dwa',
        '3': 'trzy',
        '4': 'cztery',
        '5': 'pięć',
        '6': 'sześć',
        '7': 'siedem',
        '8': 'osiem',
        '9': 'dziewięć',
        '10': 'dziesięć',
        '20': 'dwadzieścia',
        '30': 'trzydzieści',
        '40': 'czterdzieści',
        '50': 'pięćdziesiąt',
        '100': 'sto',
        '1000': 'tysiąc',
      },
      sentences: {
        // Greetings
        Hello: 'Cześć',
        'Good morning': 'Dzień dobry',
        'Good afternoon': 'Dzień dobry',
        'Good night': 'Dobranoc',
        Goodbye: 'Do widzenia',
        // Essential Phrases
        'How are you?': 'Jak się masz?',
        'I am fine': 'Mam się dobrze',
        'Thank you': 'Dziękuję',
        "You're welcome": 'Proszę bardzo',
        Please: 'Proszę',
        'Excuse me': 'Przepraszam',
        "I'm sorry": 'Przykro mi',
        // Emergency Phrases
        'I need help': 'Potrzebuję pomocy',
        'I am lost': 'Zgubiłem się',
        "I don't understand": 'Nie rozumiem',
        'Do you speak English?': 'Czy mówisz po angielsku?',
        'Where is the bathroom?': 'Gdzie jest łazienka?',
        // Practical Phrases
        'How much does it cost?': 'Ile to kosztuje?',
        'Can you help me?': 'Czy możesz mi pomóc?',
        'I would like...': 'Chciałbym...',
        'The check, please': 'Rachunek poproszę',
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
