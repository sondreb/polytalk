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
  };

  getLanguages(): Language[] {
    return this.languages;
  }

  getContent(languageCode: string): LearningContent | undefined {
    return this.content[languageCode];
  }
}
