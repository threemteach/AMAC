import { getCms } from "../server/cms/store";
import { contentText, lines } from "./localized-text";
import type { Locale } from "./locale";
import { aboutCopy, type AboutCopy } from "./translations/about";

export type { AboutCopy } from "./translations/about";

export function getAboutCopy(locale: Locale) {
  const base = aboutCopy[locale];
  const cms = getCms();
  const copy = cms?.copy;
  return {
    ...base,
    title: contentText(copy?.aboutTitle, locale, base.title),
    intro: contentText(copy?.aboutIntro, locale, base.intro),
    companyHeading: contentText(copy?.companyHeading, locale, base.companyHeading),
    company: copy?.companyBody?.[locale]?.split(/\r?\n\s*\r?\n/).map((paragraph) => paragraph.trim()).filter(Boolean) ?? base.company,
    valuesHeading: contentText(copy?.valuesHeading, locale, base.valuesHeading),
    values: (cms?.blocks.aboutValues[locale] ?? base.values) as AboutCopy["values"],
    steps: cms?.blocks.aboutSteps[locale] ?? base.steps,
    processHeading: copy?.aboutProcessHeading?.[locale] ? lines(copy.aboutProcessHeading[locale]) : base.processHeading,
    contactHeading: copy?.aboutContactHeading?.[locale] ? lines(copy.aboutContactHeading[locale]) : base.contactHeading,
    contactDescription: contentText(copy?.aboutContactDescription, locale, base.contactDescription),
    partner: contentText(copy?.aboutPartner, locale, base.partner),
  };
}
