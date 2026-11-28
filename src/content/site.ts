import type { Locale } from "./locale";
import { footers } from "./translations/site";

export const siteCredit = {
  name: "3mtechs",
  href: "https://www.3mtechs.com/",
};

const socials = [
  { name: "Facebook", mark: "f" },
  { name: "Instagram", mark: "" },
  { name: "LinkedIn", mark: "in" },
];

export function getFooterContent(locale: Locale) {
  return { ...footers[locale], socials };
}
