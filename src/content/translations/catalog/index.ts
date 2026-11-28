import type { Locale } from "../../locale";
import * as en from "./en";
import * as ar from "./ar";
import * as fr from "./fr";
import * as de from "./de";
import * as it from "./it";
import * as ru from "./ru";
import * as es from "./es";

export type CatalogCopy = {
  title: string;
  intro: string;
  search: string;
  collection: string;
  heading: string;
  all: string;
  noResults: string;
  explore: string;
  productTitles: [string, string, string, string];
};

export const catalogCopy = {
  en: en.copy,
  ar: ar.copy,
  fr: fr.copy,
  de: de.copy,
  it: it.copy,
  ru: ru.copy,
  es: es.copy,
} satisfies Record<Locale, CatalogCopy>;

export const allLabels = {
  en: en.allLabel,
  ar: ar.allLabel,
  fr: fr.allLabel,
  de: de.allLabel,
  it: it.allLabel,
  ru: ru.allLabel,
  es: es.allLabel,
} satisfies Record<Locale, string>;
