"use client";

import type { CmsContent } from "../../../server/cms/schema";
import { Field, LocalizedField } from "../admin-fields";
import { copyFields, type CopyField } from "../../../content/cms-options";
import type { Locale } from "../../../content/locale";
import styles from "../admin.module.css";

const fieldGroups: { label: string; keys: CopyField[] }[] = [
  { label: "الرئيسية", keys: [
    "announcement", "heroEyebrow", "heroHeading", "heroDescription", "fieldsHeading", "fieldsDescription",
    "collectionsHeading", "harvestHeading", "qualityHeading", "qualityDescription", "qualityNote",
    "storyHeading", "storyDescription", "journeyHeading", "journeyDescription", "factoryHeading", "factoryDescription",
    "shippingHeading", "shippingDescription", "contactBannerHeading", "contactBannerDescription",
  ] },
  { label: "من نحن", keys: [
    "aboutTitle", "aboutIntro", "companyHeading", "companyBody", "valuesHeading", "aboutProcessHeading",
    "aboutContactHeading", "aboutContactDescription", "aboutPartner",
  ] },
  { label: "التواصل والفوتر", keys: ["contactTitle", "contactIntro", "contactAddress", "contactPhone", "footerSummary", "footerLocation", "footerTagline"] },
  { label: "الكتالوج والجورنال", keys: ["catalogTitle", "catalogIntro", "journalTitle", "journalIntro"] },
];
const blockGroups = {
  aboutValues: { label: "بطاقات قيم الشركة", group: "من نحن" },
  aboutSteps: { label: "خطوات التصدير", group: "من نحن" },
  journeySteps: { label: "مراحل رحلة المحصول", group: "الرئيسية" },
  shippingMethods: { label: "وسائل الشحن", group: "الرئيسية" },
};

export function ContentEditor({ content, edit, locale, group, setGroup }: {
  content: CmsContent;
  edit: (update: (current: CmsContent) => CmsContent) => void;
  locale: Locale;
  group: string;
  setGroup: (value: string) => void;
}) {
  return (
    <section className={styles.panel}>
      <div className={styles.fieldActions}>
        {fieldGroups.map(({ label }) => <button type="button" key={label} className={styles.outline} aria-pressed={group === label}
          onClick={() => setGroup(label)}>{label}</button>)}
      </div>
      <p className={styles.note}>افصل سطور العناوين بسطر جديد، وفقرات نبذة الشركة بسطر فاضي.</p>
      <div className={styles.grid}>
        {fieldGroups.find(({ label }) => label === group)?.keys.map((key) => (
          <LocalizedField label={copyFields[key]} locale={locale} multiline key={key} value={content.copy[key]}
            onChange={(value) => edit((current) => ({ ...current, copy: { ...current.copy, [key]: value } }))} />
        ))}
      </div>
      {(Object.keys(blockGroups) as (keyof typeof blockGroups)[]).filter((key) => blockGroups[key].group === group).map((key) => (
        <details className={styles.blocks} key={key}>
          <summary>{blockGroups[key].label}</summary>
          {(content.blocks[key][locale] ?? []).map(([title, description], index) => (
            <div className={styles.subCard} key={index}>
              <Field label={`العنوان ${index + 1}`} value={title}
                onChange={(value) => edit((current) => ({
                  ...current, blocks: { ...current.blocks, [key]: {
                    ...current.blocks[key], [locale]: current.blocks[key][locale]?.map((pair, i) => i === index ? [value, pair[1]] : pair),
                  } },
                }))} />
              <Field label={`الوصف ${index + 1}`} value={description} multiline
                onChange={(value) => edit((current) => ({
                  ...current, blocks: { ...current.blocks, [key]: {
                    ...current.blocks[key], [locale]: current.blocks[key][locale]?.map((pair, i) => i === index ? [pair[0], value] : pair),
                  } },
                }))} />
            </div>
          ))}
        </details>
      ))}
    </section>
  );
}
