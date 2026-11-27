import type { Locale } from './locale';

export const siteCredit = {
  label: "Designed and developed by",
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

export function getFooterContent(locale: Locale) {
  return locale === "ar" ? arabicFooter : footerContent;
}
