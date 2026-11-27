"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { copyFields, type CopyField, type MediaPreset } from "../../content/cms-options";
import type { CmsContent } from "../../content/cms-schema";
import { languageNames, type Locale } from "../../content/locale";
import { ArticlesEditor, ProductsEditor } from "./admin-entries";
import { Field, ImageField, LocalizedField, SelectField } from "./admin-fields";
import styles from "./admin.module.css";

const tabs = {
  overview: "نظرة عامة",
  products: "المنتجات والفلاتر",
  articles: "المقالات",
  content: "نصوص الموقع",
  media: "الصور والشهادات",
  contacts: "التواصل والفوتر",
  seo: "SEO الشركة",
};
type Tab = keyof typeof tabs;

const mediaFields: Record<keyof CmsContent["media"], [string, MediaPreset]> = {
  hero: ["صورة الهيرو", "hero"],
  story: ["صورة قصتنا", "section"],
  fruits: ["صورة تشكيلة الفواكه", "section"],
  vegetables: ["صورة تشكيلة الخضروات", "section"],
  factory: ["صورة غلاف المصنع", "section"],
};

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

export function AdminDashboard({ initial }: { initial: CmsContent }) {
  const [tab, setTab] = useState<Tab>("overview");
  const [locale, setLocale] = useState<Locale>("en");
  const [group, setGroup] = useState("الرئيسية");
  const [content, setContent] = useState(initial);
  const [saved, setSaved] = useState(initial);
  const [uploads, setUploads] = useState(0);
  const [publishing, setPublishing] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const signingOut = useRef(false);
  const dirty = saved !== content;
  const onBusy = (change: number) => setUploads((value) => value + change);
  const edit = (update: (current: CmsContent) => CmsContent) => {
    setContent(update);
    setStatus("");
    setError("");
  };

  useEffect(() => {
    if (!dirty) return;
    function confirmLeave(event: BeforeUnloadEvent) {
      if (!signingOut.current) event.preventDefault();
    }
    window.addEventListener("beforeunload", confirmLeave);
    return () => window.removeEventListener("beforeunload", confirmLeave);
  }, [dirty]);

  async function publish() {
    if (uploads || publishing || !dirty) return;
    const snapshot = content;
    setPublishing(true);
    setError("");
    setStatus("");
    try {
      const response = await fetch("/admin/api", {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(snapshot),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      const next = { ...snapshot, revision: result.revision as number };
      setContent((current) => current === snapshot ? next : { ...current, revision: next.revision });
      setSaved(next);
      setStatus("اتنشر المحتوى بنجاح.");
    } catch (error) {
      setError(error instanceof Error ? error.message : "حصل خطأ أثناء النشر.");
    } finally {
      setPublishing(false);
    }
  }

  async function signOut() {
    if (dirty && !window.confirm("في تعديلات غير منشورة. تخرج من اللوحة؟")) return;
    try {
      const response = await fetch("/admin/api", { method: "DELETE" });
      if (!response.ok) throw new Error();
      signingOut.current = true;
      window.location.replace("/admin");
    } catch {
      setError("تعذّر تسجيل الخروج.");
    }
  }

  function editCertificate(index: number, change: Partial<CmsContent["certificates"][number]>) {
    edit((current) => ({
      ...current, certificates: current.certificates.map((item, i) => i === index ? { ...item, ...change } : item),
    }));
  }

  const products = content.products.filter((entry) => entry.published).length;
  const articles = content.articles.filter((entry) => entry.published).length;
  return (
    <div className={styles.shell} lang="ar" dir="rtl">
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <Image src="/images/amac-logo.svg" alt="AMAC Group" width={116} height={51} unoptimized />
          <span>إدارة المحتوى</span>
        </div>
        <nav aria-label="أقسام لوحة الإدارة" className={styles.nav}>
          {(Object.keys(tabs) as Tab[]).map((id) => (
            <button type="button" key={id} aria-current={id === tab ? "page" : undefined} onClick={() => setTab(id)}>{tabs[id]}</button>
          ))}
        </nav>
        <div className={styles.sidebarEnd}>
          <a href="/" target="_blank" rel="noreferrer">افتح الموقع ↖</a>
          <button type="button" onClick={signOut}>تسجيل الخروج</button>
        </div>
      </aside>
      <main className={styles.main}>
        <header className={styles.toolbar}>
          <h1>{tabs[tab]}</h1>
          <div className={styles.tools}>
            <SelectField label="لغة المحتوى" value={locale} onChange={(value) => setLocale(value as Locale)}>
              {(Object.keys(languageNames) as Locale[]).map((lang) => <option key={lang} value={lang}>{languageNames[lang]}</option>)}
            </SelectField>
            <button type="button" className={styles.primary} disabled={!dirty || publishing || uploads > 0} onClick={publish}>
              {publishing ? "جاري النشر…" : "نشر التعديلات"}
            </button>
          </div>
        </header>
        <div className={styles.status} aria-live="polite">
          {error ? <p className={styles.error} role="alert">{error}</p> : <p>{status || (uploads ? "جاري تجهيز الصور…" : dirty ? "في تعديلات غير منشورة." : "كل التعديلات منشورة.")}</p>}
        </div>
        {tab === "overview" && <>
          <section className={styles.welcome}>
            <div><p>AMAC GROUP</p><h2>محتوى موقعك في مكان واحد.</h2>
              <p>راجع التعديلات وانشرها لما تكون جاهزة للظهور على الموقع.</p></div>
          </section>
          <div className={styles.stats}>
            <button type="button" onClick={() => setTab("products")}><strong>{products}</strong><span>منتجات منشورة</span></button>
            <button type="button" onClick={() => setTab("articles")}><strong>{articles}</strong><span>مقالات منشورة</span></button>
            <button type="button" onClick={() => setTab("media")}><strong>{content.certificates.length}</strong><span>صور شهادات</span></button>
          </div>
        </>}
        {tab === "products" && <ProductsEditor entries={content.products} locale={locale} onBusy={onBusy}
          onAdd={(entry) => edit((current) => ({ ...current, products: [...current.products, entry] }))}
          onChange={(slug, patch) => edit((current) => ({
            ...current, products: current.products.map((entry) => entry.slug === slug
              ? { ...entry, ...(typeof patch === "function" ? patch(entry) : patch) } : entry),
          }))}
          onRemove={(slug) => edit((current) => ({ ...current, products: current.products.filter((entry) => entry.slug !== slug) }))} />}
        {tab === "articles" && <ArticlesEditor entries={content.articles} locale={locale} onBusy={onBusy}
          onAdd={(entry) => edit((current) => ({ ...current, articles: [...current.articles, entry] }))}
          onChange={(slug, patch) => edit((current) => ({
            ...current, articles: current.articles.map((entry) => entry.slug === slug
              ? { ...entry, ...(typeof patch === "function" ? patch(entry) : patch) } : entry),
          }))}
          onRemove={(slug) => edit((current) => ({ ...current, articles: current.articles.filter((entry) => entry.slug !== slug) }))} />}
        {tab === "content" && <section className={styles.panel}>
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
        </section>}
        {tab === "media" && <div className={styles.sections}>
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
        </div>}
        {tab === "contacts" && <div className={styles.sections}>
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
        </div>}
        {tab === "seo" && <section className={styles.panel}>
          <h2>بيانات الشركة في محركات البحث</h2>
          <LocalizedField label="عنوان الرئيسية" locale={locale} value={content.seo.title} hint="يفضّل حوالي 50–60 حرفًا."
            onChange={(title) => edit((current) => ({ ...current, seo: { ...current.seo, title } }))} />
          <LocalizedField label="وصف الشركة" locale={locale} value={content.seo.description} multiline hint="يفضّل حوالي 140–160 حرفًا."
            onChange={(description) => edit((current) => ({ ...current, seo: { ...current.seo, description } }))} />
          <LocalizedField label="كلمات البحث عن الشركة" locale={locale} value={content.seo.keywords} multiline hint="افصل بين الكلمات أو العبارات بفاصلة."
            onChange={(keywords) => edit((current) => ({ ...current, seo: { ...current.seo, keywords } }))} />
        </section>}
      </main>
    </div>
  );
}
