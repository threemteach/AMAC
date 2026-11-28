"use client";

import type { CmsContent } from "../../../server/cms/schema";
import { LocalizedField } from "../admin-fields";
import type { Locale } from "../../../content/locale";
import styles from "../admin.module.css";


export function SeoEditor({ content, edit, locale }: {
  content: CmsContent;
  edit: (update: (current: CmsContent) => CmsContent) => void;
  locale: Locale;
}) {
  return (
    <section className={styles.panel}>
      <h2>بيانات الشركة في محركات البحث</h2>
      <LocalizedField label="عنوان الرئيسية" locale={locale} value={content.seo.title} hint="يفضّل حوالي 50–60 حرفًا."
        onChange={(title) => edit((current) => ({ ...current, seo: { ...current.seo, title } }))} />
      <LocalizedField label="وصف الشركة" locale={locale} value={content.seo.description} multiline hint="يفضّل حوالي 140–160 حرفًا."
        onChange={(description) => edit((current) => ({ ...current, seo: { ...current.seo, description } }))} />
      <LocalizedField label="كلمات البحث عن الشركة" locale={locale} value={content.seo.keywords} multiline hint="افصل بين الكلمات أو العبارات بفاصلة."
        onChange={(keywords) => edit((current) => ({ ...current, seo: { ...current.seo, keywords } }))} />
    </section>
  );
}
