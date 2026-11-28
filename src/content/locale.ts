export { languageNames, localeLabels } from "./translations/site";

export const additionalLocales = ["fr", "de", "it", "ru", "es"] as const;
export type AdditionalLocale = (typeof additionalLocales)[number];
export type Locale = "en" | "ar" | AdditionalLocale;

export const homePaths = { en: "/", ar: "/ar", fr: "/fr", de: "/de", it: "/it", ru: "/ru", es: "/es" } satisfies Record<Locale, string>;

export function aboutPath(locale: Locale) {
  return locale === "en" ? "/about" : homePaths[locale] + "/about";
}

export function contactPath(locale: Locale) {
  return locale === "en" ? "/contact" : homePaths[locale] + "/contact";
}
