"use client";

import { useState } from "react";

import type { CmsArticle } from "../../../server/cms/schema";
import { CheckField, Field, ImageField, LocalizedField, SelectField } from "../admin-fields";
import { EntryPicker, SeoFields, type EntryProps } from "./entry-fields";
import styles from "../admin.module.css";

function newArticle(slug: string): CmsArticle {
  return { slug, title: {}, summary: {}, category: "company", published: false, image: "", imageAlt: {}, body: {}, seoTitle: {}, seoDescription: {} };
}

export function ArticlesEditor({ entries, locale, onAdd, onChange, onRemove, onBusy }: EntryProps<CmsArticle>) {
  const [selected, select] = useState(entries[0]?.slug ?? "");
  const article = entries.find((entry) => entry.slug === selected) ?? entries[0];
  const change = (patch: Partial<CmsArticle>) => article && onChange(article.slug, patch);
  const body = article?.body[locale] ?? [];
  const editBody = (next: [string, string][]) => article && change({ body: { ...article.body, [locale]: next } });
  return (
    <div className={styles.workspace}>
      <EntryPicker entries={entries} selected={article?.slug ?? ""} onPick={select} locale={locale}
        onAdd={(slug) => { onAdd(newArticle(slug)); select(slug); }} />
      {article ? <article className={styles.editor} key={article.slug}>
        <div className={styles.recordHeader}>
          <div><h3 dir="auto">{article.title[locale] || article.title.en || "مقال جديد"}</h3><code dir="ltr">/journal/{article.slug}</code></div>
          <CheckField label="منشور" value={article.published} onChange={(published) => change({ published })} />
        </div>
        <div className={styles.grid}>
          <LocalizedField label="عنوان المقال" locale={locale} value={article.title} onChange={(title) => change({ title })} />
          <SelectField label="تصنيف المقال" value={article.category} onChange={(value) => change({ category: value as CmsArticle["category"] })}>
            <option value="company">الشركة</option><option value="season">الموسم</option><option value="product">المنتجات</option>
          </SelectField>
        </div>
        <LocalizedField label="ملخص بطاقة المقال" locale={locale} value={article.summary} onChange={(summary) => change({ summary })} multiline />
        <ImageField label="صورة غلاف المقال" value={article.image} onChange={(image) => change({ image })} onBusy={onBusy} preset="article" />
        <LocalizedField label="وصف الصورة" locale={locale} value={article.imageAlt} onChange={(imageAlt) => change({ imageAlt })} />
        <fieldset className={styles.group}>
          <legend>محتوى المقال</legend>
          <small>أضف عنوان ونص لكل قسم. كل ترجمة جاهزة لها رابطها الخاص.</small>
          {body.map(([heading, paragraph], index) => (
            <div className={styles.subCard} key={index}>
              <Field label={`عنوان الفقرة ${index + 1}`} value={heading}
                onChange={(value) => editBody(body.map((item, i) => i === index ? [value, paragraph] : item))} />
              <Field label={`نص الفقرة ${index + 1}`} value={paragraph} multiline
                onChange={(value) => editBody(body.map((item, i) => i === index ? [heading, value] : item))} />
              <button type="button" className={styles.textButton} onClick={() => editBody(body.filter((_, i) => i !== index))}>حذف الفقرة</button>
            </div>
          ))}
          <button className={styles.outline} type="button" onClick={() => editBody([...body, ["", ""]])}>إضافة فقرة</button>
        </fieldset>
        <SeoFields entry={article} locale={locale} change={change} />
        {!article.published && <button type="button" className={styles.danger} onClick={() => {
          if (window.confirm("حذف هذا المقال من القائمة عند النشر؟")) onRemove(article.slug);
        }}>حذف المسودة</button>}
      </article> : <p className={styles.empty}>أضف مقالًا عشان تبدأ.</p>}
    </div>
  );
}
