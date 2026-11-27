export const additionalLocales = ["fr", "de", "it", "ru", "es"] as const;
export type AdditionalLocale = (typeof additionalLocales)[number];
export type Locale = "en" | "ar" | AdditionalLocale;

export const homePaths = { en: "/", ar: "/ar", fr: "/fr", de: "/de", it: "/it", ru: "/ru", es: "/es" } satisfies Record<Locale, string>;
export const languageNames = {
  en: "English", ar: "العربية", fr: "Français", de: "Deutsch", it: "Italiano", ru: "Русский", es: "Español",
} satisfies Record<Locale, string>;

export const localeLabels = {
  en: {
    brand: "AMAC Group", navigation: "Main navigation", menu: "Menu",
    sidebar: "Navigation menu", close: "Close menu", standards: "Industry standards shown for reference", language: "Choose a language",
  },
  ar: {
    brand: "مجموعة أماك", navigation: "القائمة الرئيسية", menu: "القائمة",
    sidebar: "قائمة التنقل", close: "إغلاق القائمة", standards: "معايير صناعية للاطلاع", language: "اختر اللغة",
  },
  fr: {
    brand: "AMAC Group", navigation: "Navigation principale", menu: "Menu",
    sidebar: "Menu de navigation", close: "Fermer le menu", standards: "Normes du secteur présentées à titre indicatif", language: "Choisir la langue",
  },
  de: {
    brand: "AMAC Group", navigation: "Hauptnavigation", menu: "Menü",
    sidebar: "Navigationsmenü", close: "Menü schließen", standards: "Branchenstandards zur Orientierung", language: "Sprache auswählen",
  },
  it: {
    brand: "AMAC Group", navigation: "Navigazione principale", menu: "Menu",
    sidebar: "Menu di navigazione", close: "Chiudi menu", standards: "Standard di settore riportati a titolo informativo", language: "Scegli la lingua",
  },
  es: {
    brand: "AMAC Group", navigation: "Navegación principal", menu: "Menú",
    sidebar: "Menú de navegación", close: "Cerrar menú", standards: "Normas del sector a título informativo", language: "Elegir idioma",
  },
  ru: {
    brand: "AMAC Group", navigation: "Основная навигация", menu: "Меню",
    sidebar: "Меню навигации", close: "Закрыть меню", standards: "Отраслевые стандарты для справки", language: "Выбрать язык",
  },
};
