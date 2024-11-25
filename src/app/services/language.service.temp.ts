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
    el: {
      words: {
        // Essential Nouns
        water: 'νερό',
        food: 'φαγητό',
        restaurant: 'εστιατόριο',
        bathroom: 'τουαλέτα',
        hospital: 'νοσοκομείο',
        hotel: 'ξενοδοχείο',
        airport: 'αεροδρόμιο',
        train: 'τρένο',
        bus: 'λεωφορείο',
        taxi: 'ταξί',
        // Common Adjectives
        good: 'καλό',
        bad: 'κακό',
        big: 'μεγάλο',
        small: 'μικρό',
        hot: 'ζεστό',
        cold: 'κρύο',
        // Essential Verbs
        'to eat': 'τρώω',
        'to drink': 'πίνω',
        'to sleep': 'κοιμάμαι',
        'to go': 'πηγαίνω',
        'to help': 'βοηθώ',
        thanks: 'ευχαριστώ',
      },
      numbers: {
        '0': 'μηδέν',
        '1': 'ένα',
        '2': 'δύο',
        '3': 'τρία',
        '4': 'τέσσερα',
        '5': 'πέντε',
        '6': 'έξι',
        '7': 'επτά',
        '8': 'οκτώ',
        '9': 'εννέα',
        '10': 'δέκα',
        '20': 'είκοσι',
        '30': 'τριάντα',
        '40': 'σαράντα',
        '50': 'πενήντα',
        '100': 'εκατό',
        '1000': 'χίλια',
      },
      sentences: {
        // Greetings
        Hello: 'Γεια σας',
        'Good morning': 'Καλημέρα',
        'Good afternoon': 'Καλό απόγευμα',
        'Good night': 'Καληνύχτα',
        Goodbye: 'Αντίο',
        // Essential Phrases
        'How are you?': 'Τι κάνετε;',
        'I am fine': 'Είμαι καλά',
        'Thank you': 'Ευχαριστώ',
        "You're welcome": 'Παρακαλώ',
        Please: 'Παρακαλώ',
        'Excuse me': 'Συγγνώμη',
        "I'm sorry": 'Λυπάμαι',
        // Emergency Phrases
        'I need help': 'Χρειάζομαι βοήθεια',
        'I am lost': 'Έχω χαθεί',
        "I don't understand": 'Δεν καταλαβαίνω',
        'Do you speak English?': 'Μιλάτε αγγλικά;',
        'Where is the bathroom?': 'Πού είναι η τουαλέτα;',
        // Practical Phrases
        'How much does it cost?': 'Πόσο κοστίζει;',
        'Can you help me?': 'Μπορείτε να με βοηθήσετε;',
        'I would like...': 'Θα ήθελα...',
        'The check, please': 'Τον λογαριασμό, παρακαλώ',
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
