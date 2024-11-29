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
      code: 'en',
      name: 'English',
      flag: '🇬🇧',
      flagImage: '/assets/flags/gb.png',
    },
    {
      code: 'el',
      name: 'Greek',
      flag: '🇬🇷',
      flagImage: '/assets/flags/gr.png',
    },
    {
      code: 'me',
      name: 'Montenegrin',
      flag: '🇲🇪',
      flagImage: '/assets/flags/me.png',
    },
    {
      code: 'bg',
      name: 'Bulgarian',
      flag: '🇧🇬',
      flagImage: '/assets/flags/bg.png',
    },
  ];

  private content: { [key: string]: LearningContent } = {
    en: {
      words: {
        // Essential Nouns
        water: 'water',
        food: 'food',
        restaurant: 'restaurant',
        bathroom: 'bathroom',
        hospital: 'hospital',
        hotel: 'hotel',
        airport: 'airport',
        train: 'train',
        bus: 'bus',
        taxi: 'taxi',
        // Common Adjectives
        good: 'good',
        bad: 'bad',
        big: 'big',
        small: 'small',
        hot: 'hot',
        cold: 'cold',
        // Essential Verbs
        'to eat': 'to eat',
        'to drink': 'to drink',
        'to sleep': 'to sleep',
        'to go': 'to go',
        'to help': 'to help',
        thanks: 'thanks',
      },
      numbers: {
        '0': 'zero',
        '1': 'one',
        '2': 'two',
        '3': 'three',
        '4': 'four',
        '5': 'five',
        '6': 'six',
        '7': 'seven',
        '8': 'eight',
        '9': 'nine',
        '10': 'ten',
        '20': 'twenty',
        '30': 'thirty',
        '40': 'forty',
        '50': 'fifty',
        '100': 'hundred',
        '1000': 'thousand',
      },
      sentences: {
        // Greetings
        Hello: 'Hello',
        'Good morning': 'Good morning',
        'Good afternoon': 'Good afternoon',
        'Good night': 'Good night',
        Goodbye: 'Goodbye',
        // Essential Phrases
        'How are you?': 'How are you?',
        'I am fine': 'I am fine',
        'Thank you': 'Thank you',
        "You're welcome": "You're welcome",
        Please: 'Please',
        'Excuse me': 'Excuse me',
        "I'm sorry": "I'm sorry",
        // Emergency Phrases
        'I need help': 'I need help',
        'I am lost': 'I am lost',
        "I don't understand": "I don't understand",
        'Do you speak English?': 'Do you speak English?',
        'Where is the bathroom?': 'Where is the bathroom?',
        // Practical Phrases
        'How much does it cost?': 'How much does it cost?',
        'Can you help me?': 'Can you help me?',
        'I would like...': 'I would like...',
        'The check, please': 'The check, please',
      },
    },
    sr: {
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
        "I don't understand": 'Не разумем (Ne razumem)',
        'Do you speak English?':
          'Да ли говорите енглески? (Da li govorите енглески?)',
        'Where is the bathroom?': 'Где је купатило? (Gde je kupatilo?)',
        // Practical Phrases
        'How much does it cost?': 'Колико кошта? (Koliko košta?)',
        'Can you help me?': 'Можете ли ми помоћи? (Možete li mi pomoći?)',
        'I would like...': 'Желео бих... (Želeo bih...)',
        'The check, please': 'Рачун, молим (Račun, molim)',
      },
    },
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
        "I don't understand": 'Не разу��ијем (Ne razumijem)',
        'Do you speak English?':
          'Да ли говорите енглески? (Da li govorите енглески?)',
        'Where is the bathroom?': 'Ђе је купатило? (Đe је купатило?)',
        // Practical Phrases
        'How much does it cost?': 'Колико кошта? (Koliko košta?)',
        'Can you help me?': 'Можете ли ми помоћи? (Možete ли ми помоћи?)',
        'I would like...': 'Желио бих... (Žелио бих...)',
        'The check, please': 'Рачун, молим (Рачун, молим)',
      },
    },
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
        'Do you speak English?': 'Говорите ли английски? (Govorite li angliyski?)',
        'Where is the bathroom?': 'Къде е банята? (Kade e banyata?)',
        // Practical Phrases
        'How much does it cost?': 'Колко струва? (Kolko struva?)',
        'Can you help me?': 'Можете ли да ми помогнете? (Mozhete li da mi pomognete?)',
        'I would like...': 'Бих искал... (Bih iskal...)',
        'The check, please': 'Сметката, моля (Smetkata, molya)',
      },
    },
  };

  getLanguages(): Language[] {
    return [...this.languages].sort((a, b) => a.name.localeCompare(b.name));
  }

  getContent(languageCode: string): LearningContent | undefined {
    return this.content[languageCode];
  }
}
