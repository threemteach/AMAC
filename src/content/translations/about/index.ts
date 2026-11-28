import type { Locale } from "../../locale";
import * as en from "./en";
import * as ar from "./ar";
import * as fr from "./fr";
import * as de from "./de";
import * as it from "./it";
import * as ru from "./ru";
import * as es from "./es";

type Card = [title: string, description: string];

export type AboutCopy = {
  title: string;
  intro: string;
  companyHeading: string;
  company: [string, string];
  valuesHeading: string;
  values: [Card, Card, Card, Card];
  processHeading: [string, string];
  steps: [Card, Card, Card, Card, Card];
  contactHeading: [string, string];
  contactDescription: string;
  partner: string;
};

export const aboutCopy = {
  en: en.copy,
  ar: ar.copy,
  fr: fr.copy,
  de: de.copy,
  it: it.copy,
  ru: ru.copy,
  es: es.copy,
} satisfies Record<Locale, AboutCopy>;
