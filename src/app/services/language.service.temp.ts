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
    me: {
      words: {
        // Essential Nouns
        water: 'вода (voda)',
        food: 'храна (hrana)',
        restaurant: 'ресторан (restoran)',
        bathroom: 'купатило (kupatilo)',
        hospital: 'болница (bolnica)',
        hotel: 'хотел (hotel)',
        airport: 'аеродром (aerodrom)',
        train: 'воз (voz)',
        bus: 'аутобус (autobus)',
        taxi: 'такси (taksi)',
        // Common Adjectives
        good: 'добро (dobro)',
        bad: 'лоше (loše)',
        big: 'велико (veliko)',
        small: 'мало (malo)',
        hot: 'вруће (vruće)',
        cold: 'хладно (hladno)',
        // Essential Verbs
        'to eat': 'јести (jesti)',
        'to drink': 'пити (piti)',
        'to sleep': 'спавати (spavati)',
        'to go': 'ићи (ići)',
        'to help': 'помоћи (pomoći)',
        thanks: 'хвала (hvala)',
      },
      numbers: {
        '0': 'нула (nula)',
        '1': 'један (jedan)',
        '2': 'два (dva)',
        '3': 'три (tri)',
        '4': 'четири (četiri)',
        '5': 'пет (pet)',
        '6': 'шест (šest)',
        '7': 'седам (sedam)',
        '8': 'осам (osam)',
        '9': 'девет (devet)',
        '10': 'десет (deset)',
        '20': 'двадесет (dvadeset)',
        '30': 'тридесет (trideset)',
        '40': 'четрдесет (četrdeset)',
        '50': 'педесет (pedeset)',
        '100': 'сто (sto)',
        '1000': 'хиљада (hiljada)',
      },
      sentences: {
        // Greetings
        Hello: 'Здраво (Zdravo)',
        'Good morning': 'Добро јутро (Dobro jutro)',
        'Good afternoon': 'Добар дан (Dobar dan)',
        'Good night': 'Лаку ноћ (Laku noć)',
        Goodbye: 'Довиђења (Doviđenja)',
        // Essential Phrases
        'How are you?': 'Како сте? (Kako ste?)',
        'I am fine': 'Добро сам (Dobro sam)',
        'Thank you': 'Хвала (Hvala)',
        "You're welcome": 'Нема на чему (Nema na čemu)',
        Please: 'Молим (Molim)',
        'Excuse me': 'Извините (Izvinite)',
        "I'm sorry": 'Жао ми је (Žao mi je)',
        // Emergency Phrases
        'I need help': 'Треба ми помоћ (Treba mi pomoć)',
        'I am lost': 'Изгубио сам се (Izgubio sam se)',
        "I don't understand": 'Не разумијем (Ne razumijem)',
        'Do you speak English?':
          'Да ли говорите енглески? (Da li govorite engleski?)',
        'Where is the bathroom?': 'Ђе је купатило? (Đe je kupatilo?)',
        // Practical Phrases
        'How much does it cost?': 'Колико кошта? (Koliko košta?)',
        'Can you help me?': 'Можете ли ми помоћи? (Možete li mi pomoći?)',
        'I would like...': 'Желио бих... (Želio bih...)',
        'The check, please': 'Рачун, молим (Račun, molim)',
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
