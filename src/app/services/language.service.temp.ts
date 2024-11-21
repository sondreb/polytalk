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
    hi: {
      words: {
        // Essential Nouns
        water: 'पानी (paani)',
        food: 'खाना (khaana)',
        restaurant: 'रेस्तरां (restoraan)',
        bathroom: 'शौचालय (shauchalay)',
        hospital: 'अस्पताल (aspatal)',
        hotel: 'होटल (hotel)',
        airport: 'हवाई अड्डा (havai adda)',
        train: 'रेलगाड़ी (relgaadi)',
        bus: 'बस (bas)',
        taxi: 'टैक्सी (taxi)',
        // Common Adjectives
        good: 'अच्छा (accha)',
        bad: 'बुरा (bura)',
        big: 'बड़ा (bada)',
        small: 'छोटा (chota)',
        hot: 'गरम (garam)',
        cold: 'ठंडा (thanda)',
        // Essential Verbs
        'to eat': 'खाना (khaana)',
        'to drink': 'पीना (peena)',
        'to sleep': 'सोना (sona)',
        'to go': 'जाना (jaana)',
        'to help': 'मदद करना (madad karna)',
        thanks: 'धन्यवाद (dhanyavaad)',
      },
      numbers: {
        '0': 'शून्य (shunya)',
        '1': 'एक (ek)',
        '2': 'दो (do)',
        '3': 'तीन (teen)',
        '4': 'चार (chaar)',
        '5': 'पाँच (paanch)',
        '6': 'छह (chah)',
        '7': 'सात (saat)',
        '8': 'आठ (aath)',
        '9': 'नौ (nau)',
        '10': 'दस (das)',
        '20': 'बीस (bees)',
        '30': 'तीस (tees)',
        '40': 'चालीस (chalees)',
        '50': 'पचास (pachaas)',
        '100': 'सौ (sau)',
        '1000': 'हज़ार (hazaar)',
      },
      sentences: {
        // Greetings
        Hello: 'नमस्ते (namaste)',
        'Good morning': 'सुप्रभात (suprabhat)',
        'Good afternoon': 'नमस्कार (namaskar)',
        'Good night': 'शुभ रात्रि (shubh ratri)',
        Goodbye: 'अलविदा (alvida)',
        // Essential Phrases
        'How are you?': 'आप कैसे हैं? (aap kaise hain?)',
        'I am fine': 'मैं ठीक हूं (main theek hoon)',
        'Thank you': 'धन्यवाद (dhanyavaad)',
        "You're welcome": 'स्वागत है (swaagat hai)',
        Please: 'कृपया (kripya)',
        'Excuse me': 'क्षमा कीजिए (kshama keejiye)',
        "I'm sorry": 'मुझे खेद है (mujhe khed hai)',
        // Emergency Phrases
        'I need help': 'मुझे मदद चाहिए (mujhe madad chahiye)',
        'I am lost': 'मैं खो गया हूं (main kho gaya hoon)',
        "I don't understand": 'मैं नहीं समझता (main nahi samajhta)',
        'Do you speak English?':
          'क्या आप अंग्रेज़ी बोलते हैं? (kya aap angrezi bolte hain?)',
        'Where is the bathroom?': 'बाथरूम कहाँ है? (bathroom kahan hai?)',
        // Practical Phrases
        'How much does it cost?': 'यह कितने का है? (yeh kitne ka hai?)',
        'Can you help me?':
          'क्या आप मेरी मदद कर सकते हैं? (kya aap meri madad kar sakte hain?)',
        'I would like...': 'मैं चाहूंगा... (main chahunga...)',
        'The check, please': 'बिल लाइए (bill laiye)',
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
