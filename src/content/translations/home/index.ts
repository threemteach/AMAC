import type { Locale } from "../../locale";
import * as en from "./en";
import * as ar from "./ar";
import * as fr from "./fr";
import * as de from "./de";
import * as it from "./it";
import * as ru from "./ru";
import * as es from "./es";

export type LoadingCopy = {
  title: string;
  loading: string;
  slow: string;
  offline: string;
  failed: string;
  continue: string;
  retry: string;
};

export type HomeMetadataCopy = [title: string, description: string];

export const loadingCopy = {
  en: en.loading,
  ar: ar.loading,
  fr: fr.loading,
  de: de.loading,
  it: it.loading,
  ru: ru.loading,
  es: es.loading,
} satisfies Record<Locale, LoadingCopy>;

export const homeDescriptions = {
  en: en.metadata,
  ar: ar.metadata,
  fr: fr.metadata,
  de: de.metadata,
  it: it.metadata,
  ru: ru.metadata,
  es: es.metadata,
} satisfies Record<Locale, HomeMetadataCopy>;

export { ar } from "./ar";
export { homeContent as en } from "./en";

export const internationalHomeCopies = { fr: fr.fr, de: de.de, it: it.it, ru: ru.ru, es: es.es };
