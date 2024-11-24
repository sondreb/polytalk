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
    is: {
      words: {
        // Essential Nouns
        water: 'vatn',
        food: 'matur',
        restaurant: 'veitingastaður',
        bathroom: 'baðherbergi',
        hospital: 'sjúkrahús',
        hotel: 'hótel',
        airport: 'flugvöllur',
        train: 'lest',
        bus: 'strætó',
        taxi: 'leigubíll',
        // Common Adjectives
        good: 'góður',
        bad: 'slæmur',
        big: 'stór',
        small: 'lítill',
        hot: 'heitur',
        cold: 'kaldur',
        // Essential Verbs
        'to eat': 'að borða',
        'to drink': 'að drekka',
        'to sleep': 'að sofa',
        'to go': 'að fara',
        'to help': 'að hjálpa',
        thanks: 'takk',
      },
      numbers: {
        '0': 'núll',
        '1': 'einn',
        '2': 'tveir',
        '3': 'þrír',
        '4': 'fjórir',
        '5': 'fimm',
        '6': 'sex',
        '7': 'sjö',
        '8': 'átta',
        '9': 'níu',
        '10': 'tíu',
        '20': 'tuttugu',
        '30': 'þrjátíu',
        '40': 'fjörutíu',
        '50': 'fimmtíu',
        '100': 'hundrað',
        '1000': 'þúsund',
      },
      sentences: {
        // Greetings
        Hello: 'Halló',
        'Good morning': 'Góðan daginn',
        'Good afternoon': 'Góðan daginn',
        'Good night': 'Góða nótt',
        Goodbye: 'Vertu sæll',
        // Essential Phrases
        'How are you?': 'Hvernig hefurðu það?',
        'I am fine': 'Mér líður vel',
        'Thank you': 'Takk fyrir',
        "You're welcome": 'Verði þér að góðu',
        Please: 'Gjörðu svo vel',
        'Excuse me': 'Afsakið',
        "I'm sorry": 'Fyrirgefðu',
        // Emergency Phrases
        'I need help': 'Ég þarf hjálp',
        'I am lost': 'Ég er villtur',
        "I don't understand": 'Ég skil ekki',
        'Do you speak English?': 'Talarðu ensku?',
        'Where is the bathroom?': 'Hvar er klósettið?',
        // Practical Phrases
        'How much does it cost?': 'Hvað kostar þetta?',
        'Can you help me?': 'Geturðu hjálpað mér?',
        'I would like...': 'Ég vildi gjarnan...',
        'The check, please': 'Reikninginn, takk',
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
