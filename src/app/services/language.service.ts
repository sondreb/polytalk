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
  ];

  private content: { [key: string]: LearningContent } = {
    es: {
      words: {
        'hello': 'hola',
        'goodbye': 'adiós',
        'please': 'por favor',
      },
      numbers: {
        '1': 'uno',
        '2': 'dos',
        '3': 'tres',
      },
      sentences: {
        'How are you?': '¿Cómo estás?',
        'Thank you': 'Gracias',
        'You\'re welcome': 'De nada',
      }
    }
    // Add more languages...
  };

  getLanguages(): Language[] {
    return this.languages;
  }

  getContent(languageCode: string): LearningContent | undefined {
    return this.content[languageCode];
  }
}
