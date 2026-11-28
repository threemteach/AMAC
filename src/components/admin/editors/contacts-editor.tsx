"use client";

import type { CmsContent } from "../../../server/cms/schema";
import { Field } from "../admin-fields";
import styles from "../admin.module.css";


export function ContactsEditor({ content, edit }: {
  content: CmsContent;
  edit: (update: (current: CmsContent) => CmsContent) => void;
}) {
  return (
    <div className={styles.sections}>
      <section className={styles.panel}>
        <h2>إيميلات الشركة</h2>
        <div className={styles.grid}>
          {([["general", "الاستفسارات العامة"], ["export", "التصدير والمنتجات"], ["business", "بريد الأعمال في الفوتر"]] as const).map(([key, label]) => (
            <Field key={key} label={label} type="email" dir="ltr" value={content.contacts[key]}
              onChange={(value) => edit((current) => ({ ...current, contacts: { ...current.contacts, [key]: value } }))} />
          ))}
        </div>
      </section>
      <section className={styles.panel}>
        <h2>السوشيال ميديا</h2>
        {Object.entries(content.contacts.social).map(([name, social]) => <fieldset className={styles.group} key={name}>
          <legend>{name}</legend>
          <div className={styles.grid}>
            {(["url", "email"] as const).map((key) => (
              <Field key={key} label={key === "url" ? "الرابط" : "الإيميل"} type={key} dir="ltr" value={social[key]}
                onChange={(value) => edit((current) => ({
                  ...current,
                  contacts: { ...current.contacts, social: { ...current.contacts.social, [name]: { ...social, [key]: value } } },
                }))} />
            ))}
          </div>
        </fieldset>)}
      </section>
    </div>
  );
}
