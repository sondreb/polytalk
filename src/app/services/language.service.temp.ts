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
    bg: {
      words: {
        // Essential Nouns
        water: 'вода (voda)',
        food: 'храна (hrana)',
        restaurant: 'ресторант (restorant)',
        bathroom: 'баня (banya)',
        hospital: 'болница (bolnitsa)',
        hotel: 'хотел (hotel)',
        airport: 'летище (letishte)',
        train: 'влак (vlak)',
        bus: 'автобус (avtobus)',
        taxi: 'такси (taksi)',
        // Common Adjectives
        good: 'добре (dobre)',
        bad: 'лошо (losho)',
        big: 'голям (golyam)',
        small: 'малък (malak)',
        hot: 'горещо (goreshto)',
        cold: 'студено (studeno)',
        // Essential Verbs
        'to eat': 'ям (yam)',
        'to drink': 'пия (piya)',
        'to sleep': 'спя (spya)',
        'to go': 'отивам (otivam)',
        'to help': 'помагам (pomagam)',
        thanks: 'благодаря (blagodarya)',
      },
      numbers: {
        '0': 'нула (nula)',
        '1': 'едно (edno)',
        '2': 'две (dve)',
        '3': 'три (tri)',
        '4': 'четири (chetiri)',
        '5': 'пет (pet)',
        '6': 'шест (shest)',
        '7': 'седем (sedem)',
        '8': 'осем (osem)',
        '9': 'девет (devet)',
        '10': 'десет (deset)',
        '20': 'двадесет (dvadeset)',
        '30': 'тридесет (trideset)',
        '40': 'четиридесет (chetirideset)',
        '50': 'петдесет (petdeset)',
        '100': 'сто (sto)',
        '1000': 'хиляда (hilyada)',
      },
      sentences: {
        // Greetings
        Hello: 'Здравей (Zdravey)',
        'Good morning': 'Добро утро (Dobro utro)',
        'Good afternoon': 'Добър ден (Dobar den)',
        'Good night': 'Лека нощ (Leka nosht)',
        Goodbye: 'Довиждане (Dovizhdane)',
        // Essential Phrases
        'How are you?': 'Как си? (Kak si?)',
        'I am fine': 'Добре съм (Dobre sam)',
        'Thank you': 'Благодаря (Blagodarya)',
        "You're welcome": 'Моля (Molya)',
        Please: 'Моля (Molya)',
        'Excuse me': 'Извинете (Izvinete)',
        "I'm sorry": 'Съжалявам (Sazhalyavam)',
        // Emergency Phrases
        'I need help': 'Нуждая се от помощ (Nuzhdaya se ot pomosht)',
        'I am lost': 'Загубих се (Zagubih se)',
        "I don't understand": 'Не разбирам (Ne razbiram)',
        'Do you speak English?':
          'Говорите ли английски? (Govorite li angliyski?)',
        'Where is the bathroom?': 'Къде е банята? (Kade e banyata?)',
        // Practical Phrases
        'How much does it cost?': 'Колко струва? (Kolko struva?)',
        'Can you help me?':
          'Можете ли да ми помогнете? (Mozhete li da mi pomognete?)',
        'I would like...': 'Бих искал... (Bih iskal...)',
        'The check, please': 'Сметката, моля (Smetkata, molya)',
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
