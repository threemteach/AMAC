"use client";

import type { CmsContent } from "../../../server/cms/schema";
import { Field, ImageField, SelectField } from "../admin-fields";
import type { MediaPreset } from "../../../content/cms-options";
import styles from "../admin.module.css";

const mediaFields: Record<keyof CmsContent["media"], [string, MediaPreset]> = {
  hero: ["صورة الهيرو", "hero"],
  story: ["صورة قصتنا", "section"],
  fruits: ["صورة تشكيلة الفواكه", "section"],
  vegetables: ["صورة تشكيلة الخضروات", "section"],
  factory: ["صورة غلاف المصنع", "section"],
};

export function MediaEditor({ content, edit, onBusy, uploads }: {
  content: CmsContent;
  edit: (update: (current: CmsContent) => CmsContent) => void;
  onBusy: (change: number) => void;
  uploads: number;
}) {
  function editCertificate(index: number, change: Partial<CmsContent["certificates"][number]>) {
    edit((current) => ({
      ...current, certificates: current.certificates.map((item, i) => i === index ? { ...item, ...change } : item),
    }));
  }

  return (
    <div className={styles.sections}>
      <section className={styles.panel}>
        <h2>صور الصفحات</h2>
        <div className={styles.grid}>
          {(Object.keys(mediaFields) as (keyof typeof mediaFields)[]).map((key) => (
            <ImageField key={key} label={mediaFields[key][0]} preset={mediaFields[key][1]} value={content.media[key]} onBusy={onBusy}
              onChange={(value) => edit((current) => ({ ...current, media: { ...current.media, [key]: value } }))} />
          ))}
        </div>
      </section>
      <section className={styles.panel}>
        <h2>صور الشهادات والمعايير</h2>
        <div className={styles.grid}>
          {content.certificates.map((item, index) => (
            <div className={styles.subCard} key={index}>
              <Field label={`اسم الشهادة ${index + 1}`} value={item.name} onChange={(name) => editCertificate(index, { name })} />
              <SelectField label="شكل العرض" value={item.shape} onChange={(value) => editCertificate(index, { shape: value === "seal" ? "seal" : "wordmark" })}>
                <option value="seal">ختم</option><option value="wordmark">شعار أفقي</option>
              </SelectField>
              <ImageField label={`صورة الشهادة ${index + 1}`} preset="certificate" value={item.image} onBusy={onBusy}
                onChange={(image) => editCertificate(index, { image })} />
              <div className={styles.fieldActions}>
                <button type="button" disabled={uploads > 0 || index === 0} className={styles.textButton} onClick={() => edit((current) => {
                  const certificates = [...current.certificates];
                  [certificates[index - 1], certificates[index]] = [certificates[index], certificates[index - 1]];
                  return { ...current, certificates };
                })}>تقديم في العرض</button>
                <button type="button" className={styles.danger} disabled={uploads > 0}
                  onClick={() => edit((current) => ({ ...current, certificates: current.certificates.filter((_, i) => i !== index) }))}>إزالة من العرض</button>
              </div>
            </div>
          ))}
        </div>
        <button className={styles.outline} type="button" onClick={() => edit((current) => ({
          ...current, certificates: [...current.certificates, { name: "", image: "", shape: "seal" }],
        }))}>إضافة شهادة</button>
      </section>
    </div>
  );
}
