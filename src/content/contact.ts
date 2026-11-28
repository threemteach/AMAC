import { getCms } from "../server/cms/store";
import { contentText } from "./localized-text";
import type { Locale } from "./locale";
import { contactCopy, type ContactCopy } from "./translations/contact";

export type { ContactCopy } from "./translations/contact";

export function getContactCopy(locale: Locale): ContactCopy {
  const base = contactCopy[locale];
  const copy = getCms()?.copy;
  return {
    ...base,
    title: contentText(copy?.contactTitle, locale, base.title),
    intro: contentText(copy?.contactIntro, locale, base.intro),
    address: contentText(copy?.contactAddress, locale, base.address),
    phoneNote: contentText(copy?.contactPhone, locale, base.phoneNote),
  };
}
