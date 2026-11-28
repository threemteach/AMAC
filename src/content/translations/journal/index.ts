import type { Locale } from "../../locale";
import * as en from "./en";
import * as ar from "./ar";
import * as fr from "./fr";
import * as de from "./de";
import * as it from "./it";
import * as ru from "./ru";
import * as es from "./es";

type ArticleCopy = { title: string; sections: [string, string][] };

export type JournalCopy = {
  title: string; intro: string; heading: string;
  all: string; company: string; season: string; sort: string; featured: string;
  tag: string; summary: string; read: string; more: string; back: string;
  articles: [ArticleCopy, ArticleCopy, ArticleCopy];
};

export const journalCopy = {
  en: en.copy,
  ar: ar.copy,
  fr: fr.copy,
  de: de.copy,
  it: it.copy,
  ru: ru.copy,
  es: es.copy,
} satisfies Record<Locale, JournalCopy>;
