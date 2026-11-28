"use client";

import { useState } from "react";
import type { Locale } from "../../../content/locale";

import type { CmsArticle, CmsProduct } from "../../../server/cms/schema";
import { Field, LocalizedField } from "../admin-fields";
import styles from "../admin.module.css";

export type EntryPatch<T> = Partial<T> | ((entry: T) => Partial<T>);
export type EntryProps<T> = {
  entries: T[];
  locale: Locale;
  onAdd: (entry: T) => void;
  onChange: (slug: string, patch: EntryPatch<T>) => void;
  onRemove: (slug: string) => void;
  onBusy: (value: number) => void;
};

export function EntryPicker({ entries, selected, onPick, onAdd, locale }: {
  entries: (CmsProduct | CmsArticle)[]; selected: string; onPick: (slug: string) => void;
  onAdd: (slug: string) => void; locale: Locale;
}) {
  const [slug, setSlug] = useState("");
  const [search, setSearch] = useState("");
  const valid = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && slug.length <= 75 && !entries.some((entry) => entry.slug === slug);
  const query = search.trim().toLocaleLowerCase(locale);
  const matches = entries.filter((entry) => [entry.slug, ...Object.values(entry.title)].some(
    (value) => value.toLocaleLowerCase(locale).includes(query),
  ));
  return (
    <aside className={styles.records} aria-label="السجلات">
      <form className={styles.createRow} onSubmit={(event) => {
        event.preventDefault();
        if (!valid) return;
        onAdd(slug);
        setSlug("");
      }}>
        <Field label="رابط السجل الجديد" dir="ltr" value={slug}
          onChange={(value) => setSlug(value.toLowerCase())} hint="حروف إنجليزية وأرقام وشرطة، مثال frozen-peas" />
        <button className={styles.outline} type="submit" disabled={!valid}>إضافة</button>
      </form>
      {entries.length > 4 && <Field label="ابحث في السجلات" value={search} onChange={setSearch} />}
      <ul className={styles.recordList}>
        {matches.map((entry) => (
          <li key={entry.slug}>
            <button type="button" aria-pressed={selected === entry.slug} onClick={() => onPick(entry.slug)}>
              <strong dir="auto">{entry.title[locale] || entry.title.en || entry.slug}</strong>
              <small><span dir="ltr">{entry.slug}</span> · {entry.published ? "منشور" : "مسودة"}</small>
            </button>
          </li>
        ))}
      </ul>
      {!matches.length && query && <small>مفيش نتائج مطابقة.</small>}
    </aside>
  );
}

export function SeoFields({ entry, locale, change }: {
  entry: Pick<CmsArticle, "seoTitle" | "seoDescription">; locale: Locale;
  change: (patch: Partial<Pick<CmsArticle, "seoTitle" | "seoDescription">>) => void;
}) {
  return <fieldset className={styles.group}>
    <legend>SEO</legend>
    <LocalizedField label="عنوان محركات البحث" locale={locale} value={entry.seoTitle}
      onChange={(seoTitle) => change({ seoTitle })} hint="يفضّل حوالي 50–60 حرفًا." />
    <LocalizedField label="وصف محركات البحث" locale={locale} value={entry.seoDescription}
      onChange={(seoDescription) => change({ seoDescription })} multiline hint="يفضّل حوالي 140–160 حرفًا." />
  </fieldset>;
}
