"use client";

import { useState } from "react";
import type { CmsArticle, CmsProduct } from "../../content/cms-schema";
import type { Locale } from "../../content/locale";
import { CheckField, Field, ImageField, LocalizedField, SelectField } from "./admin-fields";
import styles from "./admin.module.css";

type EntryPatch<T> = Partial<T> | ((entry: T) => Partial<T>);
type EntryProps<T> = {
  entries: T[];
  locale: Locale;
  onAdd: (entry: T) => void;
  onChange: (slug: string, patch: EntryPatch<T>) => void;
  onRemove: (slug: string) => void;
  onBusy: (value: number) => void;
};

function EntryPicker({ entries, selected, onPick, onAdd, locale }: {
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

const paletteLabels = ["الخلفية", "الإطار", "النص", "خلفية الزر", "نص الزر"];
const newPalette: CmsProduct["palette"] = ["#e6edde", "#9dae9b", "#203b31", "#244b3d", "#ffffff"];
function newProduct(slug: string): CmsProduct {
  return {
    slug, published: false, featured: false, category: "vegetables", title: {}, description: {}, featuredDescription: {}, image: "", featuredImage: "",
    palette: [...newPalette], aliases: [], sizes: [], cuts: [{ id: "standard", label: { en: "Standard" }, image: "", illustrative: false }],
    botanicalName: "", origin: {}, packaging: {}, availability: {}, attributes: [], seoTitle: {}, seoDescription: {},
  };
}

function productListText(value: string) {
  return value.split(/[,،\n]/).map((item) => item.trim()).filter(Boolean);
}

function Options({ product, locale, change, onBusy }: {
  product: CmsProduct; locale: Locale;
  change: (patch: EntryPatch<CmsProduct>) => void; onBusy: (value: number) => void;
}) {
  const [sizes, setSizes] = useState(product.sizes.join(", "));
  const [aliases, setAliases] = useState(product.aliases.join(", "));
  const sizeInputValid = productListText(sizes).every((item) => /^\d+(?:\.\d+)?$/.test(item) && Number(item) > 0 && Number(item) <= 10000);
  return (
    <fieldset className={styles.group}>
      <legend>التقطيع والحجم والبحث</legend>
      <div className={styles.grid}>
        <Field label="الأحجام بالملليمتر" dir="ltr" value={sizes} hint="مثال 15, 25, 35"
          onChange={(value) => {
            setSizes(value);
            change({ sizes: [...new Set(productListText(value).map(Number))] });
          }} />
        <Field label="أسماء بديلة للبحث" value={aliases} hint="افصل بين الكلمات بفواصل. يُمكن استخدام أكثر من لغة."
          onChange={(value) => { setAliases(value); change({ aliases: [...new Set(productListText(value))] }); }} />
      </div>
      {!sizeInputValid && <p className={styles.error}>اكتب أحجامًا رقمية موجبة مفصولة بفواصل.</p>}
      {product.cuts.map((cut, index) => (
        <div className={styles.subCard} key={cut.id}>
          <LocalizedField label={`اسم التقطيع ${index + 1}`} locale={locale} value={cut.label}
            onChange={(label) => change({ cuts: product.cuts.map((item, i) => i === index ? { ...item, label } : item) })} />
          <ImageField label={`صورة التقطيع ${index + 1}`} value={cut.image} preset="product" optional onBusy={onBusy}
            onChange={(image) => change((current) => ({
              cuts: current.cuts.map((item) => item.id === cut.id ? { ...item, image } : item),
            }))} />
          <CheckField label="صورة توضيحية" value={cut.illustrative}
            onChange={(illustrative) => change({ cuts: product.cuts.map((item, i) => i === index ? { ...item, illustrative } : item) })} />
          <button type="button" className={styles.textButton} disabled={product.cuts.length === 1}
            onClick={() => change({ cuts: product.cuts.filter((_, i) => i !== index) })}>حذف التقطيع</button>
        </div>
      ))}
      <button className={styles.outline} type="button" onClick={() => change({
        cuts: [...product.cuts, { id: "cut-" + crypto.randomUUID().slice(0, 8), label: {}, image: "", illustrative: false }],
      })}>إضافة نوع تقطيع</button>
    </fieldset>
  );
}

function Attributes({ product, locale, change }: {
  product: CmsProduct; locale: Locale; change: (patch: Partial<CmsProduct>) => void;
}) {
  const { attributes } = product;
  function editAttribute(index: number, patch: Partial<CmsProduct["attributes"][number]>) {
    change({ attributes: attributes.map((item, i) => i === index ? { ...item, ...patch } : item) });
  }
  return <fieldset className={styles.group}>
    <legend>فلاتر إضافية</legend>
    <small>مثال طريقة التجميد أو نوع العبوة. استخدم نفس المعرّف عبر المنتجات عشان تظهر تحت نفس الفلتر.</small>
    {attributes.map((attribute, index) => (
      <div className={styles.subCard} key={index}>
        <div className={styles.grid}>
          <Field label="معرّف الفلتر" dir="ltr" value={attribute.id} hint="مثال freezing-method"
            onChange={(id) => editAttribute(index, { id: id.toLowerCase() })} />
          <LocalizedField label="اسم الفلتر" locale={locale} value={attribute.label}
            onChange={(label) => editAttribute(index, { label })} />
        </div>
        {attribute.values.map((item, position) => (
          <div className={styles.grid} key={position}>
            <Field label={`معرّف الاختيار ${position + 1}`} dir="ltr" value={item.id} hint="مثال iqf"
              onChange={(id) => editAttribute(index, { values: attribute.values.map((value, i) => i === position ? { ...value, id: id.toLowerCase() } : value) })} />
            <LocalizedField label={`اسم الاختيار ${position + 1}`} locale={locale} value={item.label}
              onChange={(label) => editAttribute(index, { values: attribute.values.map((value, i) => i === position ? { ...value, label } : value) })} />
            {attribute.values.length > 1 && <button type="button" className={styles.textButton}
              onClick={() => editAttribute(index, { values: attribute.values.filter((_, i) => i !== position) })}>حذف الاختيار</button>}
          </div>
        ))}
        <div className={styles.fieldActions}>
          <button type="button" className={styles.outline}
            onClick={() => editAttribute(index, { values: [...attribute.values, { id: "", label: {} }] })}>إضافة اختيار</button>
          <button type="button" className={styles.textButton}
            onClick={() => change({ attributes: attributes.filter((_, i) => i !== index) })}>حذف الفلتر</button>
        </div>
      </div>
    ))}
    <button type="button" className={styles.outline}
      onClick={() => change({ attributes: [...attributes, { id: "", label: {}, values: [{ id: "", label: {} }] }] })}>إضافة فلتر</button>
  </fieldset>;
}

export function ProductsEditor({ entries, locale, onAdd, onChange, onRemove, onBusy }: EntryProps<CmsProduct>) {
  const [selected, select] = useState(entries[0]?.slug ?? "");
  const product = entries.find((entry) => entry.slug === selected) ?? entries[0];
  const change = (patch: EntryPatch<CmsProduct>) => product && onChange(product.slug, patch);
  return (
    <div className={styles.workspace}>
      <EntryPicker entries={entries} selected={product?.slug ?? ""} onPick={select} locale={locale}
        onAdd={(slug) => { onAdd(newProduct(slug)); select(slug); }} />
      {product ? <article className={styles.editor} key={product.slug}>
        <div className={styles.recordHeader}>
          <div><h3 dir="auto">{product.title[locale] || product.title.en || "منتج جديد"}</h3><code dir="ltr">/products/{product.slug}</code></div>
          <div className={styles.fieldActions}>
            <CheckField label="منشور" value={product.published} onChange={(published) => change({ published })} />
            <CheckField label="يظهر في الرئيسية" value={product.featured} onChange={(featured) => change({ featured })} />
          </div>
        </div>
        <div className={styles.grid}>
          <LocalizedField locale={locale} label="اسم المنتج" value={product.title} onChange={(title) => change({ title })} />
          <SelectField label="التصنيف" value={product.category} onChange={(value) => change({ category: value as CmsProduct["category"] })}>
            <option value="fruits">فواكه</option><option value="vegetables">خضروات</option>
          </SelectField>
          <LocalizedField locale={locale} label="بلد المنشأ" value={product.origin} onChange={(origin) => change({ origin })} />
          <Field label="الاسم العلمي" dir="ltr" value={product.botanicalName} onChange={(botanicalName) => change({ botanicalName })} />
          <LocalizedField locale={locale} label="التعبئة" value={product.packaging} onChange={(packaging) => change({ packaging })} />
          <LocalizedField locale={locale} label="التوفر" value={product.availability} onChange={(availability) => change({ availability })} />
        </div>
        <LocalizedField locale={locale} label="وصف المنتج" value={product.description} onChange={(description) => change({ description })} multiline />
        {product.featured && <LocalizedField locale={locale} label="وصف المنتج في الرئيسية" value={product.featuredDescription}
          onChange={(featuredDescription) => change({ featuredDescription })} multiline />}
        <div className={styles.grid}>
          <ImageField label="صورة بطاقة الكتالوج" preset="product" value={product.image} onChange={(image) => change({ image })} onBusy={onBusy} />
          <ImageField label="صورة عرض الرئيسية" preset="product" value={product.featuredImage} optional onChange={(featuredImage) => change({ featuredImage })} onBusy={onBusy} />
        </div>
        <fieldset className={styles.group}>
          <legend>ألوان البطاقة</legend>
          <div className={styles.swatches}>
            {paletteLabels.map((label, index) => <label className={styles.swatch} key={label}>
              <input type="color" value={product.palette[index] || newPalette[index]} onChange={(event) => {
                const palette = [...product.palette] as CmsProduct["palette"];
                palette[index] = event.target.value;
                change({ palette });
              }} />{label}
            </label>)}
          </div>
          <div className={styles.sample} style={{ background: product.palette[0], borderColor: product.palette[1], color: product.palette[2] }}>
            <strong dir="auto">{product.title[locale] || product.title.en || "اسم المنتج"}</strong>
            <span style={{ background: product.palette[3], color: product.palette[4] }}>تصفّح المنتج</span>
          </div>
        </fieldset>
        <Options product={product} locale={locale} change={change} onBusy={onBusy} />
        <Attributes product={product} locale={locale} change={change} />
        <SeoFields entry={product} locale={locale} change={change} />
        {!product.published && <button type="button" className={styles.danger} onClick={() => {
          if (window.confirm("حذف هذا المنتج من القائمة عند النشر؟")) onRemove(product.slug);
        }}>حذف المسودة</button>}
      </article> : <p className={styles.empty}>أضف منتجًا عشان تبدأ.</p>}
    </div>
  );
}

function newArticle(slug: string): CmsArticle {
  return { slug, title: {}, summary: {}, category: "company", published: false, image: "", imageAlt: {}, body: {}, seoTitle: {}, seoDescription: {} };
}

function SeoFields({ entry, locale, change }: {
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
