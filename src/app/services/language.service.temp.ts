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
    am: {
      words: {
        // Essential Nouns
        water: 'ውሃ (wuha)',
        food: 'ምግብ (migib)',
        restaurant: 'ምግብ ቤት (migib bet)',
        bathroom: 'መጸዳጃ ቤት (metesdaja bet)',
        hospital: 'ሆስፒታል (hospital)',
        hotel: 'ሆቴል (hotel)',
        airport: 'አየር ማረፊያ (ayer marefia)',
        train: 'ባቡር (babur)',
        bus: 'አውቶቡስ (awtobus)',
        taxi: 'ታክሲ (taksi)',
        // Common Adjectives
        good: 'ጥሩ (tiru)',
        bad: 'መጥፎ (metfo)',
        big: 'ትልቅ (tilik)',
        small: 'ትንሽ (tinish)',
        hot: 'ሞቃት (mokat)',
        cold: 'ቀዝቃዛ (kezkaza)',
        // Essential Verbs
        'to eat': 'መብላት (meblat)',
        'to drink': 'መጠጣት (metetat)',
        'to sleep': 'መተኛት (metegnat)',
        'to go': 'መሄድ (mehed)',
        'to help': 'መርዳት (merdat)',
        thanks: 'አመሰግናለሁ (ameseginalehu)',
      },
      numbers: {
        '0': 'ዜሮ (zero)',
        '1': 'አንድ (and)',
        '2': 'ሁለት (hulet)',
        '3': 'ሶስት (sost)',
        '4': 'አራት (arat)',
        '5': 'አምስት (amist)',
        '6': 'ስድስት (sidist)',
        '7': 'ሰባት (sebat)',
        '8': 'ስምንት (simint)',
        '9': 'ዘጠኝ (zetegn)',
        '10': 'አስር (asir)',
        '20': 'ሃያ (haya)',
        '30': 'ሰላሳ (selasa)',
        '40': 'አርባ (arba)',
        '50': 'ሃምሳ (hamsa)',
        '100': 'መቶ (meto)',
        '1000': 'ሺህ (shi)',
      },
      sentences: {
        // Greetings
        Hello: 'ሰላም (selam)',
        'Good morning': 'እንደምን አደርክ/ሽ (indemen aderik/sh)',
        'Good afternoon': 'እንደምን ዋልክ/ሽ (indemen walk/sh)',
        'Good night': 'ደህና እደር/ሪ (dehna ider/ri)',
        Goodbye: 'ደህና ሁን/ኚ (dehna hun/gni)',
        // Essential Phrases
        'How are you?': 'እንደምን ነህ/ሽ? (indemen neh/nesh?)',
        'I am fine': 'ደህና ነኝ (dehna negn)',
        'Thank you': 'አመሰግናለሁ (ameseginalehu)',
        "You're welcome": 'እንኳን ደህና መጣህ/ሽ (inkuan dehna metah/sh)',
        Please: 'እባክህ/ሽ (ibakhi/sh)',
        'Excuse me': 'ይቅርታ (yikirta)',
        "I'm sorry": 'አዝናለሁ (azinalehu)',
        // Emergency Phrases
        'I need help': 'እርዳታ ይፈልጋል (irdata yifeligal)',
        'I am lost': 'ጠፍቻለሁ (tefchalehu)',
        "I don't understand": 'አልገባኝም (algebannim)',
        'Do you speak English?': 'እንግሊዘኛ ትችላለህ/ሽ? (inglizegna tichilaleh/sh?)',
        'Where is the bathroom?': 'መጸዳጃ ቤት የት ነው? (metesdaja bet yet new?)',
        // Practical Phrases
        'How much does it cost?': 'ስንት ያወጣል? (sint yawetal?)',
        'Can you help me?': 'ልትረዳኝ ትችላለህ/ሽ? (litredagn tichilaleh/sh?)',
        'I would like...': 'እፈልጋለሁ... (ifeligalehu...)',
        'The check, please': 'ሂሳቡን እባክዎ (hisabun ibakwo)',
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
