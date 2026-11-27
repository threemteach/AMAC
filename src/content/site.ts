import type { AdditionalLocale, Locale } from "./locale";

export const siteCredit = {
  name: "3mtechs",
  href: "https://www.3mtechs.com/",
};

export const footerContent = {
  brandSummary: ["Egyptian produce.", "A world of possibilities."],
  location: "Alexandria, Egypt",
  exploreHeading: "Explore",
  explore: ["Our products", "Our story", "Journal", "Get in touch"],
  contactHeading: "Let’s connect",
  contacts: ["General enquiries", "Export enquiries"],
  socialHeading: "Follow AMAC",
  socials: [
    { name: "Facebook", mark: "f" },
    { name: "Instagram", mark: "" },
    { name: "LinkedIn", mark: "in" },
  ],
  copyright: "© 2026 AMAC Group.",
  tagline: "Alexandria, Egypt · Frozen fruit & vegetables",
};

const arabicFooter: typeof footerContent = {
  ...footerContent,
  brandSummary: ["محاصيل مصرية.", "وفرص في كل العالم."],
  location: "الإسكندرية، مصر",
  exploreHeading: "تصفّح",
  explore: ["منتجاتنا", "قصتنا", "المجلة", "تواصل معنا"],
  contactHeading: "تواصل معنا",
  contacts: ["استفسارات عامة", "استفسارات التصدير"],
  socialHeading: "تابع مجموعة أماك",
  copyright: "© 2026 مجموعة أماك.",
  tagline: "الإسكندرية، مصر · فواكه وخضروات مجمّدة",
};

type FooterCopy = Omit<typeof footerContent, "socials">;

const translatedFooters: Record<AdditionalLocale, FooterCopy> = {
  fr: {
    brandSummary: ["Des récoltes égyptiennes.", "Un monde de possibilités."],
    location: "Alexandrie, Égypte",
    exploreHeading: "Découvrir", explore: ["Nos produits", "Notre histoire", "Actualités", "Nous contacter"],
    contactHeading: "Échangeons", contacts: ["Demandes générales", "Demandes d’exportation"],
    socialHeading: "Suivre AMAC", copyright: "© 2026 AMAC Group.",
    tagline: "Alexandrie, Égypte · Fruits et légumes surgelés",
  },
  de: {
    brandSummary: ["Ägyptische Erzeugnisse.", "Eine Welt voller Möglichkeiten."],
    location: "Alexandria, Ägypten",
    exploreHeading: "Entdecken", explore: ["Produkte", "Unsere Geschichte", "Magazin", "Kontakt"],
    contactHeading: "Kontakt aufnehmen", contacts: ["Allgemeine Anfragen", "Exportanfragen"],
    socialHeading: "AMAC folgen", copyright: "© 2026 AMAC Group.",
    tagline: "Alexandria, Ägypten · Tiefgekühltes Obst und Gemüse",
  },
  it: {
    brandSummary: ["Raccolti egiziani.", "Un mondo di possibilità."],
    location: "Alessandria d’Egitto, Egitto",
    exploreHeading: "Esplora", explore: ["Prodotti", "La nostra storia", "Notizie", "Contattaci"],
    contactHeading: "Parliamone", contacts: ["Richieste generali", "Richieste per l’esportazione"],
    socialHeading: "Segui AMAC", copyright: "© 2026 AMAC Group.",
    tagline: "Alessandria d’Egitto · Frutta e verdura surgelate",
  },
  es: {
    brandSummary: ["Cosechas egipcias.", "Un mundo de posibilidades."],
    location: "Alejandría, Egipto",
    exploreHeading: "Explorar", explore: ["Productos", "Nuestra historia", "Noticias", "Contacto"],
    contactHeading: "Hablemos", contacts: ["Consultas generales", "Consultas de exportación"],
    socialHeading: "Sigue a AMAC", copyright: "© 2026 AMAC Group.",
    tagline: "Alejandría, Egipto · Frutas y verduras congeladas",
  },
  ru: {
    brandSummary: ["Египетский урожай.", "Мир возможностей."],
    location: "Александрия, Египет",
    exploreHeading: "Разделы", explore: ["Продукция", "Наша история", "Журнал", "Контакты"],
    contactHeading: "Свяжитесь с нами", contacts: ["Общие вопросы", "Вопросы по экспорту"],
    socialHeading: "Следите за AMAC", copyright: "© 2026 AMAC Group.",
    tagline: "Александрия, Египет · Замороженные фрукты и овощи",
  },
};

export const creditLabels: Record<Locale, string> = {
  en: "Designed and developed by", ar: "تصميم وتنفيذ",
  fr: "Conception et développement par", de: "Design und Entwicklung von",
  it: "Design e sviluppo a cura di", ru: "Дизайн и разработка", es: "Diseño y desarrollo por",
};

export function getFooterContent(locale: Locale): typeof footerContent {
  if (locale === "en") return footerContent;
  if (locale === "ar") return arabicFooter;
  return { ...translatedFooters[locale], socials: footerContent.socials };
}
