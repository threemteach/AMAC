import type { Locale } from "../../locale";
import * as en from "./en";
import * as ar from "./ar";
import * as fr from "./fr";
import * as de from "./de";
import * as it from "./it";
import * as ru from "./ru";
import * as es from "./es";

export type StrawberryCopy = {
  category: string;
  description: string;
  cutLabel: string;
  sizeLabel: string;
  cuts: [string, string, string];
  unit: string;
  gallery: string;
  referencePhoto: string;
  enquire: string;
  save: string;
  saved: string;
  detailsLabel: string;
  detailsHeading: string;
  specs: [string, string, string, string, string];
  range: string;
  origin: string;
  packaging: string;
  availability: string;
  requirementsHeading: [string, string];
  requirements: string;
};

export type EnquiryCopy = { close: string; message: string; copy: string; copied: string; manual: string };
export type ProductFormats = [string, string, string];

export const strawberryCopy = {
  en: en.strawberry,
  ar: ar.strawberry,
  fr: fr.strawberry,
  de: de.strawberry,
  it: it.strawberry,
  ru: ru.strawberry,
  es: es.strawberry,
} satisfies Record<Locale, StrawberryCopy>;

export const enquiryText = {
  en: en.enquiry,
  ar: ar.enquiry,
  fr: fr.enquiry,
  de: de.enquiry,
  it: it.enquiry,
  ru: ru.enquiry,
  es: es.enquiry,
} satisfies Record<Locale, EnquiryCopy>;

export const formats = {
  en: en.formats,
  ar: ar.formats,
  fr: fr.formats,
  de: de.formats,
  it: it.formats,
  ru: ru.formats,
  es: es.formats,
} satisfies Record<Locale, ProductFormats>;

export const selectLabels = {
  en: en.selectLabel,
  ar: ar.selectLabel,
  fr: fr.selectLabel,
  de: de.selectLabel,
  it: it.selectLabel,
  ru: ru.selectLabel,
  es: es.selectLabel,
} satisfies Record<Locale, string>;
