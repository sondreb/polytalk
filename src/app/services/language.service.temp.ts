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
    zh: {
      words: {
        // Essential Nouns
        water: '水 (shuǐ)',
        food: '食物 (shíwù)',
        restaurant: '餐厅 (cāntīng)',
        bathroom: '洗手间 (xǐshǒujiān)',
        hospital: '医院 (yīyuàn)',
        hotel: '酒店 (jiǔdiàn)',
        airport: '机场 (jīchǎng)',
        train: '火车 (huǒchē)',
        bus: '公共汽车 (gōnggòng qìchē)',
        taxi: '出租车 (chūzūchē)',
        // Common Adjectives
        good: '好 (hǎo)',
        bad: '坏 (huài)',
        big: '大 (dà)',
        small: '小 (xiǎo)',
        hot: '热 (rè)',
        cold: '冷 (lěng)',
        // Essential Verbs
        'to eat': '吃 (chī)',
        'to drink': '喝 (hē)',
        'to sleep': '睡觉 (shuìjiào)',
        'to go': '去 (qù)',
        'to help': '帮助 (bāngzhù)',
        thanks: '谢谢 (xièxie)',
      },
      numbers: {
        '0': '零 (líng)',
        '1': '一 (yī)',
        '2': '二 (èr)',
        '3': '三 (sān)',
        '4': '四 (sì)',
        '5': '五 (wǔ)',
        '6': '六 (liù)',
        '7': '七 (qī)',
        '8': '八 (bā)',
        '9': '九 (jiǔ)',
        '10': '十 (shí)',
        '20': '二十 (èrshí)',
        '30': '三十 (sānshí)',
        '40': '四十 (sìshí)',
        '50': '五十 (wǔshí)',
        '100': '百 (bǎi)',
        '1000': '千 (qiān)',
      },
      sentences: {
        // Greetings
        Hello: '你好 (Nǐ hǎo)',
        'Good morning': '早上好 (Zǎoshang hǎo)',
        'Good afternoon': '下午好 (Xiàwǔ hǎo)',
        'Good night': "晚安 (Wǎn'ān)",
        Goodbye: '再见 (Zàijiàn)',
        // Essential Phrases
        'How are you?': '你好吗？(Nǐ hǎo ma?)',
        'I am fine': '我很好 (Wǒ hěn hǎo)',
        'Thank you': '谢谢 (Xièxie)',
        "You're welcome": '不客气 (Bú kèqi)',
        Please: '请 (Qǐng)',
        'Excuse me': '对不起 (Duìbùqǐ)',
        "I'm sorry": '抱歉 (Bàoqiàn)',
        // Emergency Phrases
        'I need help': '我需要帮助 (Wǒ xūyào bāngzhù)',
        'I am lost': '我迷路了 (Wǒ mílù le)',
        "I don't understand": '我不明白 (Wǒ bù míngbai)',
        'Do you speak English?': '你会说英语吗？(Nǐ huì shuō yīngyǔ ma?)',
        'Where is the bathroom?': '洗手间在哪里？(Xǐshǒujiān zài nǎli?)',
        // Practical Phrases
        'How much does it cost?': '多少钱？(Duōshao qián?)',
        'Can you help me?': '你能帮我吗？(Nǐ néng bāng wǒ ma?)',
        'I would like...': '我想要... (Wǒ xiǎng yào...)',
        'The check, please': '请结账 (Qǐng jiézhàng)',
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
