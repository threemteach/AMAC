import type { Locale } from "../../locale";
import * as en from "./en";
import * as ar from "./ar";
import * as fr from "./fr";
import * as de from "./de";
import * as it from "./it";
import * as ru from "./ru";
import * as es from "./es";

export type FooterCopy = {
  brandSummary: string[];
  location: string;
  exploreHeading: string;
  explore: string[];
  contactHeading: string;
  contacts: string[];
  socialHeading: string;
  copyright: string;
  tagline: string;
};

export type LocaleLabels = {
  brand: string;
  navigation: string;
  menu: string;
  sidebar: string;
  close: string;
  standards: string;
  language: string;
};

export const footers = {
  en: en.footer,
  ar: ar.footer,
  fr: fr.footer,
  de: de.footer,
  it: it.footer,
  ru: ru.footer,
  es: es.footer,
} satisfies Record<Locale, FooterCopy>;

export const creditLabels = {
  en: en.creditLabel,
  ar: ar.creditLabel,
  fr: fr.creditLabel,
  de: de.creditLabel,
  it: it.creditLabel,
  ru: ru.creditLabel,
  es: es.creditLabel,
} satisfies Record<Locale, string>;

export const languageNames = {
  en: en.languageName,
  ar: ar.languageName,
  fr: fr.languageName,
  de: de.languageName,
  it: it.languageName,
  ru: ru.languageName,
  es: es.languageName,
} satisfies Record<Locale, string>;

export const localeLabels = {
  en: en.labels,
  ar: ar.labels,
  fr: fr.labels,
  de: de.labels,
  it: it.labels,
  ru: ru.labels,
  es: es.labels,
} satisfies Record<Locale, LocaleLabels>;
