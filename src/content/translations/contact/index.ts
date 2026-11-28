import type { Locale } from "../../locale";
import * as en from "./en";
import * as ar from "./ar";
import * as fr from "./fr";
import * as de from "./de";
import * as it from "./it";
import * as ru from "./ru";
import * as es from "./es";

type FormText = [string, string, string, string, string, string, string];

export type ContactCopy = {
  title: string;
  intro: string;
  eyebrow: string;
  heading: [string, string];
  location: string;
  address: string;
  email: string;
  phone: string;
  phoneNote: string;
  locationDescription: string;
  formTitle: string;
  preview: string;
  labels: FormText;
  placeholders: FormText;
};

export type CountryPickerCopy = [noResults: string, invalid: string];

export const contactCopy = {
  en: en.copy,
  ar: ar.copy,
  fr: fr.copy,
  de: de.copy,
  it: it.copy,
  ru: ru.copy,
  es: es.copy,
} satisfies Record<Locale, ContactCopy>;

export const generalEnquiryPlaceholder = {
  en: en.generalEnquiryPlaceholder,
  ar: ar.generalEnquiryPlaceholder,
  fr: fr.generalEnquiryPlaceholder,
  de: de.generalEnquiryPlaceholder,
  it: it.generalEnquiryPlaceholder,
  ru: ru.generalEnquiryPlaceholder,
  es: es.generalEnquiryPlaceholder,
} satisfies Record<Locale, string>;

export const pickerCopy = {
  en: en.countryPicker,
  ar: ar.countryPicker,
  fr: fr.countryPicker,
  de: de.countryPicker,
  it: it.countryPicker,
  ru: ru.countryPicker,
  es: es.countryPicker,
} satisfies Record<Locale, CountryPickerCopy>;
