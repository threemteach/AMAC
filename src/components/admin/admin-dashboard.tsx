"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CmsContent } from "../../server/cms/schema";
import { languageNames, type Locale } from "../../content/locale";
import { ArticlesEditor } from "./editors/articles-editor";
import { ContactsEditor } from "./editors/contacts-editor";
import { ContentEditor } from "./editors/content-editor";
import { MediaEditor } from "./editors/media-editor";
import { ProductsEditor } from "./editors/products-editor";
import { SeoEditor } from "./editors/seo-editor";
import { SelectField } from "./admin-fields";
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
        {tab === "content" && <ContentEditor content={content} edit={edit} locale={locale} group={group} setGroup={setGroup} />}
        {tab === "media" && <MediaEditor content={content} edit={edit} onBusy={onBusy} uploads={uploads} />}
        {tab === "contacts" && <ContactsEditor content={content} edit={edit} />}
        {tab === "seo" && <SeoEditor content={content} edit={edit} locale={locale} />}
      </main>
    </div>
  );
}
