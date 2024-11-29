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
    fi: {
      words: {
        // Essential Nouns
        water: 'vesi',
        food: 'ruoka',
        restaurant: 'ravintola',
        bathroom: 'kylpyhuone',
        hospital: 'sairaala',
        hotel: 'hotelli',
        airport: 'lentokenttä',
        train: 'juna',
        bus: 'bussi',
        taxi: 'taksi',
        // Common Adjectives
        good: 'hyvä',
        bad: 'huono',
        big: 'iso',
        small: 'pieni',
        hot: 'kuuma',
        cold: 'kylmä',
        // Essential Verbs
        'to eat': 'syödä',
        'to drink': 'juoda',
        'to sleep': 'nukkua',
        'to go': 'mennä',
        'to help': 'auttaa',
        thanks: 'kiitos',
      },
      numbers: {
        '0': 'nolla',
        '1': 'yksi',
        '2': 'kaksi',
        '3': 'kolme',
        '4': 'neljä',
        '5': 'viisi',
        '6': 'kuusi',
        '7': 'seitsemän',
        '8': 'kahdeksan',
        '9': 'yhdeksän',
        '10': 'kymmenen',
        '20': 'kaksikymmentä',
        '30': 'kolmekymmentä',
        '40': 'neljäkymmentä',
        '50': 'viisikymmentä',
        '100': 'sata',
        '1000': 'tuhat',
      },
      sentences: {
        // Greetings
        Hello: 'Hei',
        'Good morning': 'Hyvää huomenta',
        'Good afternoon': 'Hyvää päivää',
        'Good night': 'Hyvää yötä',
        Goodbye: 'Näkemiin',
        // Essential Phrases
        'How are you?': 'Mitä kuuluu?',
        'I am fine': 'Minulla on kaikki hyvin',
        'Thank you': 'Kiitos',
        "You're welcome": 'Ole hyvä',
        Please: 'Ole hyvä',
        'Excuse me': 'Anteeksi',
        "I'm sorry": 'Olen pahoillani',
        // Emergency Phrases
        'I need help': 'Tarvitsen apua',
        'I am lost': 'Olen eksyksissä',
        "I don't understand": 'En ymmärrä',
        'Do you speak English?': 'Puhutko englantia?',
        'Where is the bathroom?': 'Missä on vessa?',
        // Practical Phrases
        'How much does it cost?': 'Paljonko tämä maksaa?',
        'Can you help me?': 'Voitko auttaa minua?',
        'I would like...': 'Haluaisin...',
        'The check, please': 'Lasku, kiitos',
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
