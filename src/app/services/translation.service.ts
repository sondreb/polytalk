import { Injectable, signal, computed, effect } from '@angular/core';

export interface UiLanguage {
  code: string;
  name: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
}

export type TranslationKeys = Record<string, string>;

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private readonly STORAGE_KEY = 'polytalk-ui-language';

  readonly supportedLanguages: UiLanguage[] = [
    { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', dir: 'ltr' },
    { code: 'fr', name: 'French', nativeName: 'Français', dir: 'ltr' },
    { code: 'de', name: 'German', nativeName: 'Deutsch', dir: 'ltr' },
    { code: 'zh', name: 'Chinese', nativeName: '中文', dir: 'ltr' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語', dir: 'ltr' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português', dir: 'ltr' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
    { code: 'no', name: 'Norwegian', nativeName: 'Norsk', dir: 'ltr' },
    { code: 'ko', name: 'Korean', nativeName: '한국어', dir: 'ltr' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', dir: 'ltr' },
  ];

  private translations = signal<Record<string, TranslationKeys>>({});
  readonly currentLanguage = signal<string>(this.detectLanguage());

  readonly currentDir = computed(() => {
    const lang = this.supportedLanguages.find(
      (l) => l.code === this.currentLanguage()
    );
    return lang?.dir ?? 'ltr';
  });

  // Signal that increments on language change to trigger pipe re-evaluation
  readonly languageChange = signal(0);

  constructor() {
    this.loadAllTranslations();

    effect(() => {
      const lang = this.currentLanguage();
      document.documentElement.lang = lang;
      document.documentElement.dir = this.currentDir();
    });
  }

  private detectLanguage(): string {
    // Check saved preference first
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved && this.supportedLanguages.some((l) => l.code === saved)) {
      return saved;
    }

    // Try browser language
    const browserLang = navigator.language?.split('-')[0];
    if (
      browserLang &&
      this.supportedLanguages.some((l) => l.code === browserLang)
    ) {
      return browserLang;
    }

    return 'en';
  }

  setLanguage(code: string): void {
    if (this.supportedLanguages.some((l) => l.code === code)) {
      localStorage.setItem(this.STORAGE_KEY, code);
      this.currentLanguage.set(code);
      this.languageChange.update((v) => v + 1);
    }
  }

  translate(key: string): string {
    const lang = this.currentLanguage();
    const allTranslations = this.translations();
    const langTranslations = allTranslations[lang];

    if (langTranslations && langTranslations[key]) {
      return langTranslations[key];
    }

    // Fallback to English
    const enTranslations = allTranslations['en'];
    if (enTranslations && enTranslations[key]) {
      return enTranslations[key];
    }

    // Return key as last resort
    return key;
  }

  private loadAllTranslations(): void {
    this.translations.set({
      en: EN_TRANSLATIONS,
      es: ES_TRANSLATIONS,
      fr: FR_TRANSLATIONS,
      de: DE_TRANSLATIONS,
      zh: ZH_TRANSLATIONS,
      ja: JA_TRANSLATIONS,
      pt: PT_TRANSLATIONS,
      ar: AR_TRANSLATIONS,
      no: NO_TRANSLATIONS,
      ko: KO_TRANSLATIONS,
      hi: HI_TRANSLATIONS,
    });
  }
}

// =============================================================================
// English (base)
// =============================================================================
const EN_TRANSLATIONS: TranslationKeys = {
  // Navbar
  'nav.languages': 'Languages',
  'nav.blog': 'Blog',
  'nav.settings': 'Settings',
  'nav.install': 'Install',
  'nav.app': 'App',

  // Home
  'home.title': 'Learn Any Language with PolyTalk',
  'home.subtitle':
    'Master basic words, numbers, and essential phrases in any language, and learn more about language learning tips and tricks on our blog.',
  'home.startLearning': 'Start Learning',
  'home.readBlog': 'Read Blog',
  'home.words': 'Words',
  'home.wordsDesc': 'Learn essential vocabulary with native pronunciation',
  'home.numbers': 'Numbers',
  'home.numbersDesc': 'Master counting and basic numerals',
  'home.sentences': 'Sentences',
  'home.sentencesDesc': 'Practice common phrases and expressions',
  'home.getWindows': 'Get PolyTalk for Windows',
  'home.installWindows': 'Install the native app for a better learning experience',
  'home.getAndroid': 'Get PolyTalk for Android',
  'home.installAndroid': 'Download the app for your Android device',
  'home.disclaimer':
    'Please note that this application may contain errors in translations, pronunciations, or cultural context. Some content is generated using AI technology, which can occasionally produce inaccurate results. This tool is meant for basic learning purposes only and should not be considered a substitute for professional language instruction.',

  // Footer
  'footer.privacy': 'Privacy',
  'footer.terms': 'Terms',
  'footer.about': 'About',

  // Settings
  'settings.title': 'Settings',
  'settings.wordDelay': 'Word Delay (ms):',
  'settings.playbackSpeed': 'Playback Speed:',
  'settings.theme': 'Theme:',
  'settings.themeAuto': 'Auto',
  'settings.themeLight': 'Light',
  'settings.themeDark': 'Dark',
  'settings.clearCache': 'Clear Audio Cache',
  'settings.clearing': 'Clearing...',
  'settings.resetSettings': 'Reset Settings',
  'settings.cacheCleared': 'Cache cleared successfully!',
  'settings.cacheFailed': 'Failed to clear cache',
  'settings.uiLanguage': 'Interface Language:',

  // Learning
  'learning.enableOffline': 'Enable offline',
  'learning.downloading': 'Downloading...',
  'learning.keepScreenOff': 'Keep screen off',
  'learning.keepScreenOn': 'Keep screen on',
  'learning.screenOnMessage':
    'Screen will not turn off, so you can enjoy the learning experience without interruptions.',
  'learning.repeatWord': 'Repeat Word:',
  'learning.repeatPlaylist': 'Repeat Playlist:',
  'learning.bilingual': 'Bilingual',
  'learning.prev': 'Prev',
  'learning.next': 'Next',
  'learning.stop': 'Stop',
  'learning.start': 'Start',
  'learning.pause': 'Pause',
  'learning.resume': 'Resume',
  'learning.words': 'Words',
  'learning.numbers': 'Numbers',
  'learning.sentences': 'Sentences',

  // Language Selection
  'langSelect.favorites': 'Favorites',
  'langSelect.allLanguages': 'All Languages',

  // Update banner
  'update.available': 'A new version is available!',
  'update.now': 'Update Now',

  // About page
  'about.title': 'About PolyTalk',
  'about.intro':
    'PolyTalk is a fun and intuitive language learning app that helps you learn the basics of any language. What makes PolyTalk unique is its flexibility - you can learn from any language to any language!',
  'about.missionTitle': 'Our Mission',
  'about.missionText':
    'We believe that language learning should be accessible to everyone, regardless of their native language. Our mission is to break down language barriers and make basic communication possible between people of all backgrounds.',
  'about.featuresTitle': 'Features',
  'about.feature1': 'Learn from any language to any language',
  'about.feature2': 'Basic vocabulary and common phrases',
  'about.feature3': 'Simple and intuitive interface',
  'about.feature4': 'Free to use',
  'about.reviewTitle': 'Review Our App',
  'about.reviewText':
    "If you enjoy using PolyTalk, we'd love to hear from you! Your reviews help us improve and reach more language learners.",
  'about.reviewMicrosoft': 'Review on Microsoft Store',
  'about.reviewMicrosoftDesc': 'Share your experience with Windows users',
  'about.reviewGoogle': 'Review on Google Play',
  'about.reviewGoogleDesc': 'Help Android users discover PolyTalk',
  'about.contactTitle': 'Contact',
  'about.contactGithub': 'For support or inquiries, please visit our',
  'about.githubRepo': 'GitHub repository',
  'about.followX': 'Follow us on X:',

  // Blog
  'blog.loading': 'Loading posts...',
  'blog.noPosts': 'No blog posts found.',
  'blog.readMore': 'Read more...',
  'blog.loadingPost': 'Loading post...',
  'blog.backToBlog': 'Back to Blog',
  'blog.loadError': 'Failed to load blog posts. Please try again later.',
  'blog.postLoadError': 'Failed to load blog post. Please try again later.',
};

// =============================================================================
// Spanish
// =============================================================================
const ES_TRANSLATIONS: TranslationKeys = {
  'nav.languages': 'Idiomas',
  'nav.blog': 'Blog',
  'nav.settings': 'Ajustes',
  'nav.install': 'Instalar',
  'nav.app': 'App',
  'home.title': 'Aprende Cualquier Idioma con PolyTalk',
  'home.subtitle':
    'Domina palabras básicas, números y frases esenciales en cualquier idioma, y aprende más sobre consejos y trucos de aprendizaje de idiomas en nuestro blog.',
  'home.startLearning': 'Empezar a Aprender',
  'home.readBlog': 'Leer Blog',
  'home.words': 'Palabras',
  'home.wordsDesc': 'Aprende vocabulario esencial con pronunciación nativa',
  'home.numbers': 'Números',
  'home.numbersDesc': 'Domina el conteo y los números básicos',
  'home.sentences': 'Oraciones',
  'home.sentencesDesc': 'Practica frases y expresiones comunes',
  'home.getWindows': 'Obtener PolyTalk para Windows',
  'home.installWindows': 'Instala la app nativa para una mejor experiencia de aprendizaje',
  'home.getAndroid': 'Obtener PolyTalk para Android',
  'home.installAndroid': 'Descarga la app para tu dispositivo Android',
  'home.disclaimer':
    'Ten en cuenta que esta aplicación puede contener errores en traducciones, pronunciaciones o contexto cultural. Parte del contenido se genera utilizando tecnología de IA, que ocasionalmente puede producir resultados inexactos. Esta herramienta está destinada únicamente a fines de aprendizaje básico y no debe considerarse un sustituto de la instrucción profesional de idiomas.',
  'footer.privacy': 'Privacidad',
  'footer.terms': 'Términos',
  'footer.about': 'Acerca de',
  'settings.title': 'Ajustes',
  'settings.wordDelay': 'Retraso de Palabra (ms):',
  'settings.playbackSpeed': 'Velocidad de Reproducción:',
  'settings.theme': 'Tema:',
  'settings.themeAuto': 'Automático',
  'settings.themeLight': 'Claro',
  'settings.themeDark': 'Oscuro',
  'settings.clearCache': 'Borrar Caché de Audio',
  'settings.clearing': 'Borrando...',
  'settings.resetSettings': 'Restablecer Ajustes',
  'settings.cacheCleared': '¡Caché borrada con éxito!',
  'settings.cacheFailed': 'Error al borrar la caché',
  'settings.uiLanguage': 'Idioma de Interfaz:',
  'learning.enableOffline': 'Habilitar sin conexión',
  'learning.downloading': 'Descargando...',
  'learning.keepScreenOff': 'Apagar pantalla',
  'learning.keepScreenOn': 'Mantener pantalla encendida',
  'learning.screenOnMessage':
    'La pantalla no se apagará, para que puedas disfrutar de la experiencia de aprendizaje sin interrupciones.',
  'learning.repeatWord': 'Repetir Palabra:',
  'learning.repeatPlaylist': 'Repetir Lista:',
  'learning.bilingual': 'Bilingüe',
  'learning.prev': 'Ant.',
  'learning.next': 'Sig.',
  'learning.stop': 'Parar',
  'learning.start': 'Iniciar',
  'learning.pause': 'Pausa',
  'learning.resume': 'Reanudar',
  'learning.words': 'Palabras',
  'learning.numbers': 'Números',
  'learning.sentences': 'Oraciones',
  'langSelect.favorites': 'Favoritos',
  'langSelect.allLanguages': 'Todos los Idiomas',
  'update.available': '¡Una nueva versión está disponible!',
  'update.now': 'Actualizar Ahora',
  'about.title': 'Acerca de PolyTalk',
  'about.intro':
    'PolyTalk es una aplicación divertida e intuitiva de aprendizaje de idiomas que te ayuda a aprender lo básico de cualquier idioma. Lo que hace único a PolyTalk es su flexibilidad: ¡puedes aprender de cualquier idioma a cualquier idioma!',
  'about.missionTitle': 'Nuestra Misión',
  'about.missionText':
    'Creemos que el aprendizaje de idiomas debe ser accesible para todos, sin importar su idioma nativo. Nuestra misión es derribar las barreras lingüísticas y hacer posible la comunicación básica entre personas de todos los orígenes.',
  'about.featuresTitle': 'Características',
  'about.feature1': 'Aprende de cualquier idioma a cualquier idioma',
  'about.feature2': 'Vocabulario básico y frases comunes',
  'about.feature3': 'Interfaz simple e intuitiva',
  'about.feature4': 'Gratis',
  'about.reviewTitle': 'Reseña Nuestra App',
  'about.reviewText':
    'Si disfrutas usando PolyTalk, ¡nos encantaría saber de ti! Tus reseñas nos ayudan a mejorar y llegar a más estudiantes de idiomas.',
  'about.reviewMicrosoft': 'Reseña en Microsoft Store',
  'about.reviewMicrosoftDesc': 'Comparte tu experiencia con usuarios de Windows',
  'about.reviewGoogle': 'Reseña en Google Play',
  'about.reviewGoogleDesc': 'Ayuda a los usuarios de Android a descubrir PolyTalk',
  'about.contactTitle': 'Contacto',
  'about.contactGithub': 'Para soporte o consultas, visita nuestro',
  'about.githubRepo': 'repositorio de GitHub',
  'about.followX': 'Síguenos en X:',
  'blog.loading': 'Cargando publicaciones...',
  'blog.noPosts': 'No se encontraron publicaciones.',
  'blog.readMore': 'Leer más...',
  'blog.loadingPost': 'Cargando publicación...',
  'blog.backToBlog': 'Volver al Blog',
  'blog.loadError': 'Error al cargar las publicaciones. Inténtalo de nuevo más tarde.',
  'blog.postLoadError': 'Error al cargar la publicación. Inténtalo de nuevo más tarde.',
};

// =============================================================================
// French
// =============================================================================
const FR_TRANSLATIONS: TranslationKeys = {
  'nav.languages': 'Langues',
  'nav.blog': 'Blog',
  'nav.settings': 'Paramètres',
  'nav.install': 'Installer',
  'nav.app': 'App',
  'home.title': 'Apprenez N\'importe Quelle Langue avec PolyTalk',
  'home.subtitle':
    'Maîtrisez les mots de base, les chiffres et les phrases essentielles dans n\'importe quelle langue, et découvrez nos conseils et astuces d\'apprentissage sur notre blog.',
  'home.startLearning': 'Commencer à Apprendre',
  'home.readBlog': 'Lire le Blog',
  'home.words': 'Mots',
  'home.wordsDesc': 'Apprenez le vocabulaire essentiel avec la prononciation native',
  'home.numbers': 'Chiffres',
  'home.numbersDesc': 'Maîtrisez le comptage et les chiffres de base',
  'home.sentences': 'Phrases',
  'home.sentencesDesc': 'Pratiquez les expressions et phrases courantes',
  'home.getWindows': 'Obtenir PolyTalk pour Windows',
  'home.installWindows': 'Installez l\'application native pour une meilleure expérience d\'apprentissage',
  'home.getAndroid': 'Obtenir PolyTalk pour Android',
  'home.installAndroid': 'Téléchargez l\'application pour votre appareil Android',
  'home.disclaimer':
    'Veuillez noter que cette application peut contenir des erreurs de traduction, de prononciation ou de contexte culturel. Certains contenus sont générés par intelligence artificielle, ce qui peut parfois produire des résultats inexacts. Cet outil est destiné uniquement à l\'apprentissage de base et ne doit pas être considéré comme un substitut à l\'enseignement professionnel des langues.',
  'footer.privacy': 'Confidentialité',
  'footer.terms': 'Conditions',
  'footer.about': 'À propos',
  'settings.title': 'Paramètres',
  'settings.wordDelay': 'Délai de Mot (ms) :',
  'settings.playbackSpeed': 'Vitesse de Lecture :',
  'settings.theme': 'Thème :',
  'settings.themeAuto': 'Auto',
  'settings.themeLight': 'Clair',
  'settings.themeDark': 'Sombre',
  'settings.clearCache': 'Vider le Cache Audio',
  'settings.clearing': 'Vidage...',
  'settings.resetSettings': 'Réinitialiser les Paramètres',
  'settings.cacheCleared': 'Cache vidé avec succès !',
  'settings.cacheFailed': 'Échec du vidage du cache',
  'settings.uiLanguage': 'Langue de l\'Interface :',
  'learning.enableOffline': 'Activer hors ligne',
  'learning.downloading': 'Téléchargement...',
  'learning.keepScreenOff': 'Éteindre l\'écran',
  'learning.keepScreenOn': 'Garder l\'écran allumé',
  'learning.screenOnMessage':
    'L\'écran ne s\'éteindra pas, pour que vous puissiez profiter de l\'apprentissage sans interruptions.',
  'learning.repeatWord': 'Répéter le Mot :',
  'learning.repeatPlaylist': 'Répéter la Playlist :',
  'learning.bilingual': 'Bilingue',
  'learning.prev': 'Préc.',
  'learning.next': 'Suiv.',
  'learning.stop': 'Arrêt',
  'learning.start': 'Démarrer',
  'learning.pause': 'Pause',
  'learning.resume': 'Reprendre',
  'learning.words': 'Mots',
  'learning.numbers': 'Chiffres',
  'learning.sentences': 'Phrases',
  'langSelect.favorites': 'Favoris',
  'langSelect.allLanguages': 'Toutes les Langues',
  'update.available': 'Une nouvelle version est disponible !',
  'update.now': 'Mettre à Jour',
  'about.title': 'À propos de PolyTalk',
  'about.intro':
    'PolyTalk est une application amusante et intuitive d\'apprentissage des langues qui vous aide à apprendre les bases de n\'importe quelle langue. Ce qui rend PolyTalk unique, c\'est sa flexibilité - vous pouvez apprendre de n\'importe quelle langue vers n\'importe quelle autre !',
  'about.missionTitle': 'Notre Mission',
  'about.missionText':
    'Nous croyons que l\'apprentissage des langues doit être accessible à tous, quelle que soit leur langue maternelle. Notre mission est de briser les barrières linguistiques et de rendre la communication de base possible entre les personnes de tous horizons.',
  'about.featuresTitle': 'Fonctionnalités',
  'about.feature1': 'Apprendre de n\'importe quelle langue vers n\'importe quelle autre',
  'about.feature2': 'Vocabulaire de base et phrases courantes',
  'about.feature3': 'Interface simple et intuitive',
  'about.feature4': 'Gratuit',
  'about.reviewTitle': 'Évaluez Notre App',
  'about.reviewText':
    'Si vous aimez utiliser PolyTalk, nous aimerions avoir de vos nouvelles ! Vos avis nous aident à nous améliorer et à atteindre plus d\'apprenants.',
  'about.reviewMicrosoft': 'Évaluer sur le Microsoft Store',
  'about.reviewMicrosoftDesc': 'Partagez votre expérience avec les utilisateurs Windows',
  'about.reviewGoogle': 'Évaluer sur Google Play',
  'about.reviewGoogleDesc': 'Aidez les utilisateurs Android à découvrir PolyTalk',
  'about.contactTitle': 'Contact',
  'about.contactGithub': 'Pour le support ou les questions, visitez notre',
  'about.githubRepo': 'dépôt GitHub',
  'about.followX': 'Suivez-nous sur X :',
  'blog.loading': 'Chargement des articles...',
  'blog.noPosts': 'Aucun article trouvé.',
  'blog.readMore': 'Lire la suite...',
  'blog.loadingPost': 'Chargement de l\'article...',
  'blog.backToBlog': 'Retour au Blog',
  'blog.loadError': 'Échec du chargement des articles. Veuillez réessayer plus tard.',
  'blog.postLoadError': 'Échec du chargement de l\'article. Veuillez réessayer plus tard.',
};

// =============================================================================
// German
// =============================================================================
const DE_TRANSLATIONS: TranslationKeys = {
  'nav.languages': 'Sprachen',
  'nav.blog': 'Blog',
  'nav.settings': 'Einstellungen',
  'nav.install': 'Installieren',
  'nav.app': 'App',
  'home.title': 'Lerne Jede Sprache mit PolyTalk',
  'home.subtitle':
    'Meistere grundlegende Wörter, Zahlen und wichtige Sätze in jeder Sprache und erfahre mehr über Tipps und Tricks zum Sprachenlernen in unserem Blog.',
  'home.startLearning': 'Lernen Starten',
  'home.readBlog': 'Blog Lesen',
  'home.words': 'Wörter',
  'home.wordsDesc': 'Lerne wichtigen Wortschatz mit muttersprachlicher Aussprache',
  'home.numbers': 'Zahlen',
  'home.numbersDesc': 'Meistere das Zählen und grundlegende Zahlen',
  'home.sentences': 'Sätze',
  'home.sentencesDesc': 'Übe häufige Phrasen und Ausdrücke',
  'home.getWindows': 'PolyTalk für Windows herunterladen',
  'home.installWindows': 'Installiere die native App für ein besseres Lernerlebnis',
  'home.getAndroid': 'PolyTalk für Android herunterladen',
  'home.installAndroid': 'Lade die App für dein Android-Gerät herunter',
  'home.disclaimer':
    'Bitte beachte, dass diese Anwendung Fehler in Übersetzungen, Aussprache oder kulturellem Kontext enthalten kann. Einige Inhalte werden mit KI-Technologie generiert, die gelegentlich ungenaue Ergebnisse liefern kann. Dieses Tool ist nur für grundlegende Lernzwecke gedacht und sollte nicht als Ersatz für professionellen Sprachunterricht betrachtet werden.',
  'footer.privacy': 'Datenschutz',
  'footer.terms': 'Nutzungsbedingungen',
  'footer.about': 'Über uns',
  'settings.title': 'Einstellungen',
  'settings.wordDelay': 'Wortverzögerung (ms):',
  'settings.playbackSpeed': 'Wiedergabegeschwindigkeit:',
  'settings.theme': 'Design:',
  'settings.themeAuto': 'Automatisch',
  'settings.themeLight': 'Hell',
  'settings.themeDark': 'Dunkel',
  'settings.clearCache': 'Audio-Cache Leeren',
  'settings.clearing': 'Wird geleert...',
  'settings.resetSettings': 'Einstellungen Zurücksetzen',
  'settings.cacheCleared': 'Cache erfolgreich geleert!',
  'settings.cacheFailed': 'Fehler beim Leeren des Caches',
  'settings.uiLanguage': 'Sprache der Benutzeroberfläche:',
  'learning.enableOffline': 'Offline aktivieren',
  'learning.downloading': 'Wird heruntergeladen...',
  'learning.keepScreenOff': 'Bildschirm ausschalten',
  'learning.keepScreenOn': 'Bildschirm anlassen',
  'learning.screenOnMessage':
    'Der Bildschirm schaltet sich nicht aus, damit du das Lernerlebnis ohne Unterbrechungen genießen kannst.',
  'learning.repeatWord': 'Wort Wiederholen:',
  'learning.repeatPlaylist': 'Playlist Wiederholen:',
  'learning.bilingual': 'Zweisprachig',
  'learning.prev': 'Zurück',
  'learning.next': 'Weiter',
  'learning.stop': 'Stopp',
  'learning.start': 'Start',
  'learning.pause': 'Pause',
  'learning.resume': 'Fortsetzen',
  'learning.words': 'Wörter',
  'learning.numbers': 'Zahlen',
  'learning.sentences': 'Sätze',
  'langSelect.favorites': 'Favoriten',
  'langSelect.allLanguages': 'Alle Sprachen',
  'update.available': 'Eine neue Version ist verfügbar!',
  'update.now': 'Jetzt Aktualisieren',
  'about.title': 'Über PolyTalk',
  'about.intro':
    'PolyTalk ist eine unterhaltsame und intuitive Sprachlern-App, die dir hilft, die Grundlagen jeder Sprache zu lernen. Was PolyTalk einzigartig macht, ist seine Flexibilität – du kannst von jeder Sprache in jede andere lernen!',
  'about.missionTitle': 'Unsere Mission',
  'about.missionText':
    'Wir glauben, dass Sprachenlernen für jeden zugänglich sein sollte, unabhängig von der Muttersprache. Unsere Mission ist es, Sprachbarrieren abzubauen und grundlegende Kommunikation zwischen Menschen aller Hintergründe zu ermöglichen.',
  'about.featuresTitle': 'Funktionen',
  'about.feature1': 'Von jeder Sprache in jede andere lernen',
  'about.feature2': 'Grundwortschatz und häufige Phrasen',
  'about.feature3': 'Einfache und intuitive Benutzeroberfläche',
  'about.feature4': 'Kostenlos',
  'about.reviewTitle': 'Bewerte Unsere App',
  'about.reviewText':
    'Wenn du PolyTalk gerne nutzt, würden wir gerne von dir hören! Deine Bewertungen helfen uns, uns zu verbessern und mehr Sprachlerner zu erreichen.',
  'about.reviewMicrosoft': 'Im Microsoft Store bewerten',
  'about.reviewMicrosoftDesc': 'Teile deine Erfahrung mit Windows-Nutzern',
  'about.reviewGoogle': 'Bei Google Play bewerten',
  'about.reviewGoogleDesc': 'Hilf Android-Nutzern, PolyTalk zu entdecken',
  'about.contactTitle': 'Kontakt',
  'about.contactGithub': 'Für Support oder Anfragen, besuche unser',
  'about.githubRepo': 'GitHub-Repository',
  'about.followX': 'Folge uns auf X:',
  'blog.loading': 'Beiträge werden geladen...',
  'blog.noPosts': 'Keine Blogbeiträge gefunden.',
  'blog.readMore': 'Weiterlesen...',
  'blog.loadingPost': 'Beitrag wird geladen...',
  'blog.backToBlog': 'Zurück zum Blog',
  'blog.loadError': 'Fehler beim Laden der Beiträge. Bitte versuche es später erneut.',
  'blog.postLoadError': 'Fehler beim Laden des Beitrags. Bitte versuche es später erneut.',
};

// =============================================================================
// Chinese Simplified
// =============================================================================
const ZH_TRANSLATIONS: TranslationKeys = {
  'nav.languages': '语言',
  'nav.blog': '博客',
  'nav.settings': '设置',
  'nav.install': '安装',
  'nav.app': '应用',
  'home.title': '用 PolyTalk 学习任何语言',
  'home.subtitle':
    '掌握任何语言的基本单词、数字和必要短语，并在我们的博客上了解更多语言学习的技巧。',
  'home.startLearning': '开始学习',
  'home.readBlog': '阅读博客',
  'home.words': '单词',
  'home.wordsDesc': '通过母语发音学习基本词汇',
  'home.numbers': '数字',
  'home.numbersDesc': '掌握计数和基本数字',
  'home.sentences': '句子',
  'home.sentencesDesc': '练习常用短语和表达',
  'home.getWindows': '获取 Windows 版 PolyTalk',
  'home.installWindows': '安装本地应用以获得更好的学习体验',
  'home.getAndroid': '获取 Android 版 PolyTalk',
  'home.installAndroid': '为您的 Android 设备下载应用',
  'home.disclaimer':
    '请注意，本应用可能包含翻译、发音或文化背景方面的错误。部分内容使用人工智能技术生成，偶尔可能产生不准确的结果。此工具仅用于基础学习目的，不应被视为专业语言教学的替代品。',
  'footer.privacy': '隐私政策',
  'footer.terms': '使用条款',
  'footer.about': '关于',
  'settings.title': '设置',
  'settings.wordDelay': '单词延迟 (毫秒)：',
  'settings.playbackSpeed': '播放速度：',
  'settings.theme': '主题：',
  'settings.themeAuto': '自动',
  'settings.themeLight': '浅色',
  'settings.themeDark': '深色',
  'settings.clearCache': '清除音频缓存',
  'settings.clearing': '清除中...',
  'settings.resetSettings': '重置设置',
  'settings.cacheCleared': '缓存已成功清除！',
  'settings.cacheFailed': '清除缓存失败',
  'settings.uiLanguage': '界面语言：',
  'learning.enableOffline': '启用离线模式',
  'learning.downloading': '下载中...',
  'learning.keepScreenOff': '关闭屏幕常亮',
  'learning.keepScreenOn': '保持屏幕常亮',
  'learning.screenOnMessage': '屏幕不会关闭，让您享受不间断的学习体验。',
  'learning.repeatWord': '重复单词：',
  'learning.repeatPlaylist': '重复播放列表：',
  'learning.bilingual': '双语',
  'learning.prev': '上一个',
  'learning.next': '下一个',
  'learning.stop': '停止',
  'learning.start': '开始',
  'learning.pause': '暂停',
  'learning.resume': '继续',
  'learning.words': '单词',
  'learning.numbers': '数字',
  'learning.sentences': '句子',
  'langSelect.favorites': '收藏',
  'langSelect.allLanguages': '所有语言',
  'update.available': '新版本可用！',
  'update.now': '立即更新',
  'about.title': '关于 PolyTalk',
  'about.intro':
    'PolyTalk 是一款有趣且直观的语言学习应用，帮助您学习任何语言的基础知识。PolyTalk 的独特之处在于它的灵活性——您可以从任何语言学习到任何语言！',
  'about.missionTitle': '我们的使命',
  'about.missionText':
    '我们相信语言学习应该对每个人都是可及的，无论其母语是什么。我们的使命是打破语言障碍，使来自不同背景的人之间的基本沟通成为可能。',
  'about.featuresTitle': '功能特点',
  'about.feature1': '从任何语言学习到任何语言',
  'about.feature2': '基本词汇和常用短语',
  'about.feature3': '简洁直观的界面',
  'about.feature4': '免费使用',
  'about.reviewTitle': '评价我们的应用',
  'about.reviewText':
    '如果您喜欢使用 PolyTalk，我们很乐意听到您的意见！您的评价帮助我们改进并惠及更多语言学习者。',
  'about.reviewMicrosoft': '在 Microsoft Store 评价',
  'about.reviewMicrosoftDesc': '与 Windows 用户分享您的体验',
  'about.reviewGoogle': '在 Google Play 评价',
  'about.reviewGoogleDesc': '帮助 Android 用户发现 PolyTalk',
  'about.contactTitle': '联系我们',
  'about.contactGithub': '如需支持或咨询，请访问我们的',
  'about.githubRepo': 'GitHub 仓库',
  'about.followX': '在 X 上关注我们：',
  'blog.loading': '正在加载文章...',
  'blog.noPosts': '未找到博客文章。',
  'blog.readMore': '阅读更多...',
  'blog.loadingPost': '正在加载文章...',
  'blog.backToBlog': '返回博客',
  'blog.loadError': '加载文章失败，请稍后重试。',
  'blog.postLoadError': '加载文章失败，请稍后重试。',
};

// =============================================================================
// Japanese
// =============================================================================
const JA_TRANSLATIONS: TranslationKeys = {
  'nav.languages': '言語',
  'nav.blog': 'ブログ',
  'nav.settings': '設定',
  'nav.install': 'インストール',
  'nav.app': 'アプリ',
  'home.title': 'PolyTalkでどんな言語も学ぼう',
  'home.subtitle':
    'どんな言語でも基本的な単語、数字、重要なフレーズをマスターし、ブログで言語学習のヒントやコツを学びましょう。',
  'home.startLearning': '学習を始める',
  'home.readBlog': 'ブログを読む',
  'home.words': '単語',
  'home.wordsDesc': 'ネイティブの発音で基本語彙を学ぶ',
  'home.numbers': '数字',
  'home.numbersDesc': '数え方と基本的な数字をマスター',
  'home.sentences': '文章',
  'home.sentencesDesc': 'よく使うフレーズや表現を練習',
  'home.getWindows': 'Windows版PolyTalkを入手',
  'home.installWindows': 'より良い学習体験のためにネイティブアプリをインストール',
  'home.getAndroid': 'Android版PolyTalkを入手',
  'home.installAndroid': 'Androidデバイス用のアプリをダウンロード',
  'home.disclaimer':
    'このアプリケーションには、翻訳、発音、文化的な文脈に誤りが含まれる場合がありますのでご了承ください。一部のコンテンツはAI技術を使用して生成されており、不正確な結果が出る場合があります。このツールは基礎的な学習目的のみに使用されるものであり、専門的な語学教育の代替として考えるべきではありません。',
  'footer.privacy': 'プライバシー',
  'footer.terms': '利用規約',
  'footer.about': '概要',
  'settings.title': '設定',
  'settings.wordDelay': '単語遅延 (ミリ秒)：',
  'settings.playbackSpeed': '再生速度：',
  'settings.theme': 'テーマ：',
  'settings.themeAuto': '自動',
  'settings.themeLight': 'ライト',
  'settings.themeDark': 'ダーク',
  'settings.clearCache': 'オーディオキャッシュをクリア',
  'settings.clearing': 'クリア中...',
  'settings.resetSettings': '設定をリセット',
  'settings.cacheCleared': 'キャッシュが正常にクリアされました！',
  'settings.cacheFailed': 'キャッシュのクリアに失敗しました',
  'settings.uiLanguage': 'インターフェース言語：',
  'learning.enableOffline': 'オフラインを有効にする',
  'learning.downloading': 'ダウンロード中...',
  'learning.keepScreenOff': '画面をオフにする',
  'learning.keepScreenOn': '画面をオンに保つ',
  'learning.screenOnMessage': '画面がオフにならないので、中断なく学習体験を楽しめます。',
  'learning.repeatWord': '単語を繰り返す：',
  'learning.repeatPlaylist': 'プレイリストを繰り返す：',
  'learning.bilingual': 'バイリンガル',
  'learning.prev': '前へ',
  'learning.next': '次へ',
  'learning.stop': '停止',
  'learning.start': '開始',
  'learning.pause': '一時停止',
  'learning.resume': '再開',
  'learning.words': '単語',
  'learning.numbers': '数字',
  'learning.sentences': '文章',
  'langSelect.favorites': 'お気に入り',
  'langSelect.allLanguages': 'すべての言語',
  'update.available': '新しいバージョンが利用可能です！',
  'update.now': '今すぐ更新',
  'about.title': 'PolyTalkについて',
  'about.intro':
    'PolyTalkは、どんな言語の基本も学べる楽しく直感的な言語学習アプリです。PolyTalkのユニークな点は、その柔軟性です - どの言語からでも、どの言語へでも学習できます！',
  'about.missionTitle': '私たちのミッション',
  'about.missionText':
    '母国語に関係なく、言語学習は誰にとってもアクセスしやすいものであるべきだと私たちは信じています。私たちのミッションは、言語の壁を取り払い、あらゆる背景を持つ人々の間の基本的なコミュニケーションを可能にすることです。',
  'about.featuresTitle': '機能',
  'about.feature1': 'どの言語からでもどの言語へでも学習可能',
  'about.feature2': '基本語彙と一般的なフレーズ',
  'about.feature3': 'シンプルで直感的なインターフェース',
  'about.feature4': '無料で使用可能',
  'about.reviewTitle': 'アプリをレビュー',
  'about.reviewText':
    'PolyTalkをご利用いただきありがとうございます！あなたのレビューは、私たちの改善とより多くの言語学習者への到達に役立ちます。',
  'about.reviewMicrosoft': 'Microsoft Storeでレビュー',
  'about.reviewMicrosoftDesc': 'Windowsユーザーとあなたの経験を共有',
  'about.reviewGoogle': 'Google Playでレビュー',
  'about.reviewGoogleDesc': 'AndroidユーザーがPolyTalkを発見するのを手助け',
  'about.contactTitle': 'お問い合わせ',
  'about.contactGithub': 'サポートやお問い合わせは、こちらをご覧ください',
  'about.githubRepo': 'GitHubリポジトリ',
  'about.followX': 'Xでフォロー：',
  'blog.loading': '記事を読み込み中...',
  'blog.noPosts': 'ブログ記事が見つかりません。',
  'blog.readMore': '続きを読む...',
  'blog.loadingPost': '記事を読み込み中...',
  'blog.backToBlog': 'ブログに戻る',
  'blog.loadError': '記事の読み込みに失敗しました。後でもう一度お試しください。',
  'blog.postLoadError': '記事の読み込みに失敗しました。後でもう一度お試しください。',
};

// =============================================================================
// Portuguese
// =============================================================================
const PT_TRANSLATIONS: TranslationKeys = {
  'nav.languages': 'Idiomas',
  'nav.blog': 'Blog',
  'nav.settings': 'Configurações',
  'nav.install': 'Instalar',
  'nav.app': 'App',
  'home.title': 'Aprenda Qualquer Idioma com o PolyTalk',
  'home.subtitle':
    'Domine palavras básicas, números e frases essenciais em qualquer idioma, e aprenda mais sobre dicas e truques de aprendizado de idiomas no nosso blog.',
  'home.startLearning': 'Começar a Aprender',
  'home.readBlog': 'Ler Blog',
  'home.words': 'Palavras',
  'home.wordsDesc': 'Aprenda vocabulário essencial com pronúncia nativa',
  'home.numbers': 'Números',
  'home.numbersDesc': 'Domine a contagem e os numerais básicos',
  'home.sentences': 'Frases',
  'home.sentencesDesc': 'Pratique frases e expressões comuns',
  'home.getWindows': 'Obter PolyTalk para Windows',
  'home.installWindows': 'Instale o aplicativo nativo para uma melhor experiência de aprendizado',
  'home.getAndroid': 'Obter PolyTalk para Android',
  'home.installAndroid': 'Baixe o aplicativo para o seu dispositivo Android',
  'home.disclaimer':
    'Por favor, observe que este aplicativo pode conter erros em traduções, pronúncias ou contexto cultural. Parte do conteúdo é gerado usando tecnologia de IA, que ocasionalmente pode produzir resultados imprecisos. Esta ferramenta é destinada apenas para fins de aprendizado básico e não deve ser considerada um substituto para instrução profissional de idiomas.',
  'footer.privacy': 'Privacidade',
  'footer.terms': 'Termos',
  'footer.about': 'Sobre',
  'settings.title': 'Configurações',
  'settings.wordDelay': 'Atraso da Palavra (ms):',
  'settings.playbackSpeed': 'Velocidade de Reprodução:',
  'settings.theme': 'Tema:',
  'settings.themeAuto': 'Automático',
  'settings.themeLight': 'Claro',
  'settings.themeDark': 'Escuro',
  'settings.clearCache': 'Limpar Cache de Áudio',
  'settings.clearing': 'Limpando...',
  'settings.resetSettings': 'Redefinir Configurações',
  'settings.cacheCleared': 'Cache limpo com sucesso!',
  'settings.cacheFailed': 'Falha ao limpar o cache',
  'settings.uiLanguage': 'Idioma da Interface:',
  'learning.enableOffline': 'Ativar offline',
  'learning.downloading': 'Baixando...',
  'learning.keepScreenOff': 'Desligar tela',
  'learning.keepScreenOn': 'Manter tela ligada',
  'learning.screenOnMessage':
    'A tela não desligará, para que você possa aproveitar a experiência de aprendizado sem interrupções.',
  'learning.repeatWord': 'Repetir Palavra:',
  'learning.repeatPlaylist': 'Repetir Playlist:',
  'learning.bilingual': 'Bilíngue',
  'learning.prev': 'Ant.',
  'learning.next': 'Próx.',
  'learning.stop': 'Parar',
  'learning.start': 'Iniciar',
  'learning.pause': 'Pausar',
  'learning.resume': 'Retomar',
  'learning.words': 'Palavras',
  'learning.numbers': 'Números',
  'learning.sentences': 'Frases',
  'langSelect.favorites': 'Favoritos',
  'langSelect.allLanguages': 'Todos os Idiomas',
  'update.available': 'Uma nova versão está disponível!',
  'update.now': 'Atualizar Agora',
  'about.title': 'Sobre o PolyTalk',
  'about.intro':
    'PolyTalk é um aplicativo divertido e intuitivo de aprendizado de idiomas que ajuda você a aprender o básico de qualquer idioma. O que torna o PolyTalk único é sua flexibilidade - você pode aprender de qualquer idioma para qualquer idioma!',
  'about.missionTitle': 'Nossa Missão',
  'about.missionText':
    'Acreditamos que o aprendizado de idiomas deve ser acessível a todos, independentemente do idioma nativo. Nossa missão é derrubar barreiras linguísticas e tornar a comunicação básica possível entre pessoas de todas as origens.',
  'about.featuresTitle': 'Recursos',
  'about.feature1': 'Aprenda de qualquer idioma para qualquer idioma',
  'about.feature2': 'Vocabulário básico e frases comuns',
  'about.feature3': 'Interface simples e intuitiva',
  'about.feature4': 'Grátis',
  'about.reviewTitle': 'Avalie Nosso App',
  'about.reviewText':
    'Se você gosta de usar o PolyTalk, adoraríamos ouvir de você! Suas avaliações nos ajudam a melhorar e alcançar mais estudantes de idiomas.',
  'about.reviewMicrosoft': 'Avaliar na Microsoft Store',
  'about.reviewMicrosoftDesc': 'Compartilhe sua experiência com usuários Windows',
  'about.reviewGoogle': 'Avaliar no Google Play',
  'about.reviewGoogleDesc': 'Ajude usuários Android a descobrir o PolyTalk',
  'about.contactTitle': 'Contato',
  'about.contactGithub': 'Para suporte ou dúvidas, visite nosso',
  'about.githubRepo': 'repositório GitHub',
  'about.followX': 'Siga-nos no X:',
  'blog.loading': 'Carregando publicações...',
  'blog.noPosts': 'Nenhuma publicação encontrada.',
  'blog.readMore': 'Leia mais...',
  'blog.loadingPost': 'Carregando publicação...',
  'blog.backToBlog': 'Voltar ao Blog',
  'blog.loadError': 'Falha ao carregar publicações. Tente novamente mais tarde.',
  'blog.postLoadError': 'Falha ao carregar a publicação. Tente novamente mais tarde.',
};

// =============================================================================
// Arabic
// =============================================================================
const AR_TRANSLATIONS: TranslationKeys = {
  'nav.languages': 'اللغات',
  'nav.blog': 'المدونة',
  'nav.settings': 'الإعدادات',
  'nav.install': 'تثبيت',
  'nav.app': 'التطبيق',
  'home.title': 'تعلم أي لغة مع PolyTalk',
  'home.subtitle':
    'أتقن الكلمات الأساسية والأرقام والعبارات الضرورية في أي لغة، واكتشف المزيد من النصائح والحيل لتعلم اللغات على مدونتنا.',
  'home.startLearning': 'ابدأ التعلم',
  'home.readBlog': 'اقرأ المدونة',
  'home.words': 'كلمات',
  'home.wordsDesc': 'تعلم المفردات الأساسية مع النطق الأصلي',
  'home.numbers': 'أرقام',
  'home.numbersDesc': 'أتقن العد والأرقام الأساسية',
  'home.sentences': 'جمل',
  'home.sentencesDesc': 'تدرب على العبارات والتعبيرات الشائعة',
  'home.getWindows': 'احصل على PolyTalk لنظام Windows',
  'home.installWindows': 'قم بتثبيت التطبيق الأصلي للحصول على تجربة تعلم أفضل',
  'home.getAndroid': 'احصل على PolyTalk لنظام Android',
  'home.installAndroid': 'قم بتنزيل التطبيق لجهاز Android الخاص بك',
  'home.disclaimer':
    'يرجى ملاحظة أن هذا التطبيق قد يحتوي على أخطاء في الترجمات أو النطق أو السياق الثقافي. يتم إنشاء بعض المحتوى باستخدام تقنية الذكاء الاصطناعي، والتي قد تنتج أحيانًا نتائج غير دقيقة. هذه الأداة مخصصة لأغراض التعلم الأساسي فقط ولا ينبغي اعتبارها بديلاً عن التعليم اللغوي المهني.',
  'footer.privacy': 'الخصوصية',
  'footer.terms': 'الشروط',
  'footer.about': 'حول',
  'settings.title': 'الإعدادات',
  'settings.wordDelay': 'تأخير الكلمة (مللي ثانية):',
  'settings.playbackSpeed': 'سرعة التشغيل:',
  'settings.theme': 'المظهر:',
  'settings.themeAuto': 'تلقائي',
  'settings.themeLight': 'فاتح',
  'settings.themeDark': 'داكن',
  'settings.clearCache': 'مسح ذاكرة التخزين المؤقت للصوت',
  'settings.clearing': 'جارٍ المسح...',
  'settings.resetSettings': 'إعادة تعيين الإعدادات',
  'settings.cacheCleared': 'تم مسح ذاكرة التخزين المؤقت بنجاح!',
  'settings.cacheFailed': 'فشل في مسح ذاكرة التخزين المؤقت',
  'settings.uiLanguage': 'لغة الواجهة:',
  'learning.enableOffline': 'تفعيل وضع عدم الاتصال',
  'learning.downloading': 'جارٍ التنزيل...',
  'learning.keepScreenOff': 'إيقاف الشاشة',
  'learning.keepScreenOn': 'إبقاء الشاشة مفتوحة',
  'learning.screenOnMessage':
    'لن تنطفئ الشاشة، حتى تتمكن من الاستمتاع بتجربة التعلم دون انقطاع.',
  'learning.repeatWord': 'تكرار الكلمة:',
  'learning.repeatPlaylist': 'تكرار قائمة التشغيل:',
  'learning.bilingual': 'ثنائي اللغة',
  'learning.prev': 'السابق',
  'learning.next': 'التالي',
  'learning.stop': 'إيقاف',
  'learning.start': 'بدء',
  'learning.pause': 'إيقاف مؤقت',
  'learning.resume': 'استئناف',
  'learning.words': 'كلمات',
  'learning.numbers': 'أرقام',
  'learning.sentences': 'جمل',
  'langSelect.favorites': 'المفضلة',
  'langSelect.allLanguages': 'جميع اللغات',
  'update.available': 'يتوفر إصدار جديد!',
  'update.now': 'تحديث الآن',
  'about.title': 'حول PolyTalk',
  'about.intro':
    'PolyTalk هو تطبيق ممتع وبديهي لتعلم اللغات يساعدك على تعلم أساسيات أي لغة. ما يجعل PolyTalk فريدًا هو مرونته - يمكنك التعلم من أي لغة إلى أي لغة!',
  'about.missionTitle': 'مهمتنا',
  'about.missionText':
    'نؤمن بأن تعلم اللغات يجب أن يكون متاحًا للجميع، بغض النظر عن لغتهم الأم. مهمتنا هي كسر حواجز اللغة وجعل التواصل الأساسي ممكنًا بين الناس من جميع الخلفيات.',
  'about.featuresTitle': 'الميزات',
  'about.feature1': 'تعلم من أي لغة إلى أي لغة',
  'about.feature2': 'مفردات أساسية وعبارات شائعة',
  'about.feature3': 'واجهة بسيطة وبديهية',
  'about.feature4': 'مجاني الاستخدام',
  'about.reviewTitle': 'قيّم تطبيقنا',
  'about.reviewText':
    'إذا كنت تستمتع باستخدام PolyTalk، يسعدنا سماع رأيك! تقييماتك تساعدنا على التحسن والوصول إلى المزيد من متعلمي اللغات.',
  'about.reviewMicrosoft': 'تقييم على Microsoft Store',
  'about.reviewMicrosoftDesc': 'شارك تجربتك مع مستخدمي Windows',
  'about.reviewGoogle': 'تقييم على Google Play',
  'about.reviewGoogleDesc': 'ساعد مستخدمي Android في اكتشاف PolyTalk',
  'about.contactTitle': 'اتصل بنا',
  'about.contactGithub': 'للدعم أو الاستفسارات، يرجى زيارة',
  'about.githubRepo': 'مستودع GitHub',
  'about.followX': 'تابعنا على X:',
  'blog.loading': 'جارٍ تحميل المقالات...',
  'blog.noPosts': 'لم يتم العثور على مقالات.',
  'blog.readMore': 'اقرأ المزيد...',
  'blog.loadingPost': 'جارٍ تحميل المقال...',
  'blog.backToBlog': 'العودة إلى المدونة',
  'blog.loadError': 'فشل في تحميل المقالات. يرجى المحاولة مرة أخرى لاحقًا.',
  'blog.postLoadError': 'فشل في تحميل المقال. يرجى المحاولة مرة أخرى لاحقًا.',
};

// =============================================================================
// Norwegian
// =============================================================================
const NO_TRANSLATIONS: TranslationKeys = {
  'nav.languages': 'Språk',
  'nav.blog': 'Blogg',
  'nav.settings': 'Innstillinger',
  'nav.install': 'Installer',
  'nav.app': 'App',
  'home.title': 'Lær Ethvert Språk med PolyTalk',
  'home.subtitle':
    'Mestre grunnleggende ord, tall og viktige fraser på ethvert språk, og lær mer om tips og triks for språklæring på bloggen vår.',
  'home.startLearning': 'Begynn å Lære',
  'home.readBlog': 'Les Bloggen',
  'home.words': 'Ord',
  'home.wordsDesc': 'Lær viktig vokabular med morsmålsuttale',
  'home.numbers': 'Tall',
  'home.numbersDesc': 'Mestre telling og grunnleggende tall',
  'home.sentences': 'Setninger',
  'home.sentencesDesc': 'Øv på vanlige fraser og uttrykk',
  'home.getWindows': 'Last ned PolyTalk for Windows',
  'home.installWindows': 'Installer den native appen for en bedre læringsopplevelse',
  'home.getAndroid': 'Last ned PolyTalk for Android',
  'home.installAndroid': 'Last ned appen for din Android-enhet',
  'home.disclaimer':
    'Vær oppmerksom på at denne applikasjonen kan inneholde feil i oversettelser, uttale eller kulturell kontekst. Noe innhold er generert med AI-teknologi, som av og til kan gi unøyaktige resultater. Dette verktøyet er kun ment for grunnleggende læringsformål og bør ikke betraktes som en erstatning for profesjonell språkundervisning.',
  'footer.privacy': 'Personvern',
  'footer.terms': 'Vilkår',
  'footer.about': 'Om',
  'settings.title': 'Innstillinger',
  'settings.wordDelay': 'Ordforsinkelse (ms):',
  'settings.playbackSpeed': 'Avspillingshastighet:',
  'settings.theme': 'Tema:',
  'settings.themeAuto': 'Automatisk',
  'settings.themeLight': 'Lyst',
  'settings.themeDark': 'Mørkt',
  'settings.clearCache': 'Tøm Lydbuffer',
  'settings.clearing': 'Tømmer...',
  'settings.resetSettings': 'Tilbakestill Innstillinger',
  'settings.cacheCleared': 'Bufferen ble tømt!',
  'settings.cacheFailed': 'Kunne ikke tømme bufferen',
  'settings.uiLanguage': 'Grensesnittspråk:',
  'learning.enableOffline': 'Aktiver frakoblet modus',
  'learning.downloading': 'Laster ned...',
  'learning.keepScreenOff': 'Slå av skjermen',
  'learning.keepScreenOn': 'Hold skjermen på',
  'learning.screenOnMessage':
    'Skjermen slås ikke av, slik at du kan nyte læringsopplevelsen uten avbrudd.',
  'learning.repeatWord': 'Gjenta Ord:',
  'learning.repeatPlaylist': 'Gjenta Spilleliste:',
  'learning.bilingual': 'Tospråklig',
  'learning.prev': 'Forrige',
  'learning.next': 'Neste',
  'learning.stop': 'Stopp',
  'learning.start': 'Start',
  'learning.pause': 'Pause',
  'learning.resume': 'Fortsett',
  'learning.words': 'Ord',
  'learning.numbers': 'Tall',
  'learning.sentences': 'Setninger',
  'langSelect.favorites': 'Favoritter',
  'langSelect.allLanguages': 'Alle Språk',
  'update.available': 'En ny versjon er tilgjengelig!',
  'update.now': 'Oppdater Nå',
  'about.title': 'Om PolyTalk',
  'about.intro':
    'PolyTalk er en morsom og intuitiv språklæringsapp som hjelper deg med å lære det grunnleggende i ethvert språk. Det som gjør PolyTalk unik er fleksibiliteten - du kan lære fra ethvert språk til ethvert annet språk!',
  'about.missionTitle': 'Vårt Oppdrag',
  'about.missionText':
    'Vi tror at språklæring bør være tilgjengelig for alle, uavhengig av morsmål. Vårt oppdrag er å bryte ned språkbarrierer og gjøre grunnleggende kommunikasjon mulig mellom mennesker fra alle bakgrunner.',
  'about.featuresTitle': 'Funksjoner',
  'about.feature1': 'Lær fra ethvert språk til ethvert annet språk',
  'about.feature2': 'Grunnleggende ordforråd og vanlige fraser',
  'about.feature3': 'Enkel og intuitiv grensesnitt',
  'about.feature4': 'Gratis å bruke',
  'about.reviewTitle': 'Anmeld Appen Vår',
  'about.reviewText':
    'Hvis du liker å bruke PolyTalk, vil vi gjerne høre fra deg! Dine anmeldelser hjelper oss med å bli bedre og nå flere språkelever.',
  'about.reviewMicrosoft': 'Anmeld på Microsoft Store',
  'about.reviewMicrosoftDesc': 'Del din opplevelse med Windows-brukere',
  'about.reviewGoogle': 'Anmeld på Google Play',
  'about.reviewGoogleDesc': 'Hjelp Android-brukere med å oppdage PolyTalk',
  'about.contactTitle': 'Kontakt',
  'about.contactGithub': 'For støtte eller henvendelser, besøk vårt',
  'about.githubRepo': 'GitHub-repositorium',
  'about.followX': 'Følg oss på X:',
  'blog.loading': 'Laster innlegg...',
  'blog.noPosts': 'Ingen blogginnlegg funnet.',
  'blog.readMore': 'Les mer...',
  'blog.loadingPost': 'Laster innlegg...',
  'blog.backToBlog': 'Tilbake til Bloggen',
  'blog.loadError': 'Kunne ikke laste innlegg. Prøv igjen senere.',
  'blog.postLoadError': 'Kunne ikke laste innlegget. Prøv igjen senere.',
};

// =============================================================================
// Korean
// =============================================================================
const KO_TRANSLATIONS: TranslationKeys = {
  'nav.languages': '언어',
  'nav.blog': '블로그',
  'nav.settings': '설정',
  'nav.install': '설치',
  'nav.app': '앱',
  'home.title': 'PolyTalk으로 모든 언어를 배우세요',
  'home.subtitle':
    '모든 언어의 기본 단어, 숫자, 필수 구문을 마스터하고 블로그에서 언어 학습 팁과 요령을 배우세요.',
  'home.startLearning': '학습 시작',
  'home.readBlog': '블로그 읽기',
  'home.words': '단어',
  'home.wordsDesc': '원어민 발음으로 필수 어휘 학습',
  'home.numbers': '숫자',
  'home.numbersDesc': '기본 숫자와 세기 마스터',
  'home.sentences': '문장',
  'home.sentencesDesc': '일반적인 구문과 표현 연습',
  'home.getWindows': 'Windows용 PolyTalk 받기',
  'home.installWindows': '더 나은 학습 경험을 위해 네이티브 앱을 설치하세요',
  'home.getAndroid': 'Android용 PolyTalk 받기',
  'home.installAndroid': 'Android 기기에 앱을 다운로드하세요',
  'home.disclaimer':
    '이 애플리케이션에는 번역, 발음 또는 문화적 맥락에 오류가 포함될 수 있습니다. 일부 콘텐츠는 AI 기술을 사용하여 생성되며, 때때로 부정확한 결과를 생성할 수 있습니다. 이 도구는 기본 학습 목적으로만 사용되며 전문적인 언어 교육을 대체할 수 없습니다.',
  'footer.privacy': '개인정보',
  'footer.terms': '이용약관',
  'footer.about': '소개',
  'settings.title': '설정',
  'settings.wordDelay': '단어 지연 (ms):',
  'settings.playbackSpeed': '재생 속도:',
  'settings.theme': '테마:',
  'settings.themeAuto': '자동',
  'settings.themeLight': '라이트',
  'settings.themeDark': '다크',
  'settings.clearCache': '오디오 캐시 지우기',
  'settings.clearing': '삭제 중...',
  'settings.resetSettings': '설정 초기화',
  'settings.cacheCleared': '캐시가 성공적으로 지워졌습니다!',
  'settings.cacheFailed': '캐시 지우기 실패',
  'settings.uiLanguage': '인터페이스 언어:',
  'learning.enableOffline': '오프라인 활성화',
  'learning.downloading': '다운로드 중...',
  'learning.keepScreenOff': '화면 끄기',
  'learning.keepScreenOn': '화면 켜진 상태 유지',
  'learning.screenOnMessage': '화면이 꺼지지 않아 중단 없이 학습 경험을 즐길 수 있습니다.',
  'learning.repeatWord': '단어 반복:',
  'learning.repeatPlaylist': '재생목록 반복:',
  'learning.bilingual': '이중 언어',
  'learning.prev': '이전',
  'learning.next': '다음',
  'learning.stop': '정지',
  'learning.start': '시작',
  'learning.pause': '일시정지',
  'learning.resume': '재개',
  'learning.words': '단어',
  'learning.numbers': '숫자',
  'learning.sentences': '문장',
  'langSelect.favorites': '즐겨찾기',
  'langSelect.allLanguages': '모든 언어',
  'update.available': '새 버전이 있습니다!',
  'update.now': '지금 업데이트',
  'about.title': 'PolyTalk 소개',
  'about.intro':
    'PolyTalk은 모든 언어의 기초를 배울 수 있도록 도와주는 재미있고 직관적인 언어 학습 앱입니다. PolyTalk의 독특한 점은 유연성입니다 - 어떤 언어에서든 어떤 언어로든 배울 수 있습니다!',
  'about.missionTitle': '우리의 미션',
  'about.missionText':
    '우리는 모국어에 관계없이 모든 사람이 언어 학습에 접근할 수 있어야 한다고 믿습니다. 우리의 미션은 언어 장벽을 허물고 모든 배경의 사람들 간의 기본적인 소통을 가능하게 하는 것입니다.',
  'about.featuresTitle': '기능',
  'about.feature1': '어떤 언어에서든 어떤 언어로든 학습',
  'about.feature2': '기본 어휘와 일상 구문',
  'about.feature3': '간단하고 직관적인 인터페이스',
  'about.feature4': '무료 사용',
  'about.reviewTitle': '앱 리뷰',
  'about.reviewText':
    'PolyTalk을 즐겨 사용하신다면 의견을 들려주세요! 여러분의 리뷰가 더 나은 서비스와 더 많은 언어 학습자에게 도달하는 데 도움이 됩니다.',
  'about.reviewMicrosoft': 'Microsoft Store에서 리뷰',
  'about.reviewMicrosoftDesc': 'Windows 사용자와 경험을 공유하세요',
  'about.reviewGoogle': 'Google Play에서 리뷰',
  'about.reviewGoogleDesc': 'Android 사용자가 PolyTalk을 발견하도록 도와주세요',
  'about.contactTitle': '문의',
  'about.contactGithub': '지원 또는 문의사항은',
  'about.githubRepo': 'GitHub 저장소',
  'about.followX': 'X에서 팔로우:',
  'blog.loading': '게시물 로딩 중...',
  'blog.noPosts': '블로그 게시물을 찾을 수 없습니다.',
  'blog.readMore': '더 읽기...',
  'blog.loadingPost': '게시물 로딩 중...',
  'blog.backToBlog': '블로그로 돌아가기',
  'blog.loadError': '게시물을 불러오는데 실패했습니다. 나중에 다시 시도해주세요.',
  'blog.postLoadError': '게시물을 불러오는데 실패했습니다. 나중에 다시 시도해주세요.',
};

// =============================================================================
// Hindi
// =============================================================================
const HI_TRANSLATIONS: TranslationKeys = {
  'nav.languages': 'भाषाएँ',
  'nav.blog': 'ब्लॉग',
  'nav.settings': 'सेटिंग्स',
  'nav.install': 'इंस्टॉल',
  'nav.app': 'ऐप',
  'home.title': 'PolyTalk के साथ कोई भी भाषा सीखें',
  'home.subtitle':
    'किसी भी भाषा में बुनियादी शब्द, संख्याएँ और आवश्यक वाक्यांश सीखें, और हमारे ब्लॉग पर भाषा सीखने की टिप्स और ट्रिक्स जानें।',
  'home.startLearning': 'सीखना शुरू करें',
  'home.readBlog': 'ब्लॉग पढ़ें',
  'home.words': 'शब्द',
  'home.wordsDesc': 'मूल उच्चारण के साथ आवश्यक शब्दावली सीखें',
  'home.numbers': 'संख्याएँ',
  'home.numbersDesc': 'गिनती और बुनियादी अंक सीखें',
  'home.sentences': 'वाक्य',
  'home.sentencesDesc': 'सामान्य वाक्यांशों और अभिव्यक्तियों का अभ्यास करें',
  'home.getWindows': 'Windows के लिए PolyTalk प्राप्त करें',
  'home.installWindows': 'बेहतर सीखने के अनुभव के लिए नेटिव ऐप इंस्टॉल करें',
  'home.getAndroid': 'Android के लिए PolyTalk प्राप्त करें',
  'home.installAndroid': 'अपने Android डिवाइस के लिए ऐप डाउनलोड करें',
  'home.disclaimer':
    'कृपया ध्यान दें कि इस एप्लिकेशन में अनुवाद, उच्चारण या सांस्कृतिक संदर्भ में त्रुटियाँ हो सकती हैं। कुछ सामग्री AI तकनीक का उपयोग करके बनाई गई है, जो कभी-कभी गलत परिणाम दे सकती है। यह उपकरण केवल बुनियादी सीखने के उद्देश्यों के लिए है और इसे पेशेवर भाषा शिक्षा का विकल्प नहीं माना जाना चाहिए।',
  'footer.privacy': 'गोपनीयता',
  'footer.terms': 'शर्तें',
  'footer.about': 'हमारे बारे में',
  'settings.title': 'सेटिंग्स',
  'settings.wordDelay': 'शब्द विलंब (मिली सेकंड):',
  'settings.playbackSpeed': 'प्लेबैक गति:',
  'settings.theme': 'थीम:',
  'settings.themeAuto': 'ऑटो',
  'settings.themeLight': 'लाइट',
  'settings.themeDark': 'डार्क',
  'settings.clearCache': 'ऑडियो कैश साफ़ करें',
  'settings.clearing': 'साफ़ हो रहा है...',
  'settings.resetSettings': 'सेटिंग्स रीसेट करें',
  'settings.cacheCleared': 'कैश सफलतापूर्वक साफ़ हो गया!',
  'settings.cacheFailed': 'कैश साफ़ करने में विफल',
  'settings.uiLanguage': 'इंटरफ़ेस भाषा:',
  'learning.enableOffline': 'ऑफ़लाइन सक्षम करें',
  'learning.downloading': 'डाउनलोड हो रहा है...',
  'learning.keepScreenOff': 'स्क्रीन बंद करें',
  'learning.keepScreenOn': 'स्क्रीन चालू रखें',
  'learning.screenOnMessage':
    'स्क्रीन बंद नहीं होगी, ताकि आप बिना किसी रुकावट के सीखने का आनंद ले सकें।',
  'learning.repeatWord': 'शब्द दोहराएँ:',
  'learning.repeatPlaylist': 'प्लेलिस्ट दोहराएँ:',
  'learning.bilingual': 'द्विभाषी',
  'learning.prev': 'पिछला',
  'learning.next': 'अगला',
  'learning.stop': 'रोकें',
  'learning.start': 'शुरू',
  'learning.pause': 'विराम',
  'learning.resume': 'जारी रखें',
  'learning.words': 'शब्द',
  'learning.numbers': 'संख्याएँ',
  'learning.sentences': 'वाक्य',
  'langSelect.favorites': 'पसंदीदा',
  'langSelect.allLanguages': 'सभी भाषाएँ',
  'update.available': 'एक नया संस्करण उपलब्ध है!',
  'update.now': 'अभी अपडेट करें',
  'about.title': 'PolyTalk के बारे में',
  'about.intro':
    'PolyTalk एक मज़ेदार और सहज भाषा सीखने का ऐप है जो आपको किसी भी भाषा की मूल बातें सीखने में मदद करता है। PolyTalk को विशेष बनाने वाली बात है इसकी लचीलापन - आप किसी भी भाषा से किसी भी भाषा में सीख सकते हैं!',
  'about.missionTitle': 'हमारा मिशन',
  'about.missionText':
    'हम मानते हैं कि भाषा सीखना सभी के लिए सुलभ होना चाहिए, चाहे उनकी मातृभाषा कोई भी हो। हमारा मिशन भाषा की बाधाओं को तोड़ना और सभी पृष्ठभूमि के लोगों के बीच बुनियादी संवाद को संभव बनाना है।',
  'about.featuresTitle': 'विशेषताएँ',
  'about.feature1': 'किसी भी भाषा से किसी भी भाषा में सीखें',
  'about.feature2': 'बुनियादी शब्दावली और सामान्य वाक्यांश',
  'about.feature3': 'सरल और सहज इंटरफ़ेस',
  'about.feature4': 'मुफ़्त में उपयोग करें',
  'about.reviewTitle': 'हमारे ऐप की समीक्षा करें',
  'about.reviewText':
    'अगर आप PolyTalk का उपयोग करके आनंद लेते हैं, तो हम आपसे सुनना चाहेंगे! आपकी समीक्षाएँ हमें सुधारने और अधिक भाषा सीखने वालों तक पहुँचने में मदद करती हैं।',
  'about.reviewMicrosoft': 'Microsoft Store पर समीक्षा करें',
  'about.reviewMicrosoftDesc': 'Windows उपयोगकर्ताओं के साथ अपना अनुभव साझा करें',
  'about.reviewGoogle': 'Google Play पर समीक्षा करें',
  'about.reviewGoogleDesc': 'Android उपयोगकर्ताओं को PolyTalk खोजने में मदद करें',
  'about.contactTitle': 'संपर्क',
  'about.contactGithub': 'सहायता या पूछताछ के लिए, कृपया हमारे',
  'about.githubRepo': 'GitHub रिपॉजिटरी',
  'about.followX': 'X पर फ़ॉलो करें:',
  'blog.loading': 'पोस्ट लोड हो रही हैं...',
  'blog.noPosts': 'कोई ब्लॉग पोस्ट नहीं मिली।',
  'blog.readMore': 'और पढ़ें...',
  'blog.loadingPost': 'पोस्ट लोड हो रही है...',
  'blog.backToBlog': 'ब्लॉग पर वापस जाएँ',
  'blog.loadError': 'पोस्ट लोड करने में विफल। कृपया बाद में पुनः प्रयास करें।',
  'blog.postLoadError': 'पोस्ट लोड करने में विफल। कृपया बाद में पुनः प्रयास करें।',
};
