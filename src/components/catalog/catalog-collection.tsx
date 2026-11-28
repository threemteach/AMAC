import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, RefObject } from "react";
import type { CatalogData } from "../../content/catalog/catalog";
import { productPath, type CategoryFilter } from "../../content/catalog/catalog-routes";
import type { Locale } from "../../content/locale";
import styles from "./catalog.module.css";

const paletteProperties = ["--product-surface", "--product-border", "--product-ink", "--product-accent", "--product-accent-text"];
const optionLabels: Record<Locale, [string, string, string]> = {
  en: ["Cut", "Size", "All"], ar: ["التقطيع", "الحجم", "الكل"],
  fr: ["Découpe", "Calibre", "Tous"], de: ["Schnitt", "Größe", "Alle"],
  it: ["Taglio", "Dimensione", "Tutti"], ru: ["Нарезка", "Размер", "Все"],
  es: ["Corte", "Tamaño", "Todos"],
};

export function CatalogCollection({
  locale, catalog, visibleProducts, collection, filters, hasFiltered,
  selectCategory, selectCut, selectSize, selectAttribute, resetFilters,
}: {
  locale: Locale;
  catalog: CatalogData;
  visibleProducts: CatalogData["products"];
  collection: RefObject<HTMLElement | null>;
  filters: { category: CategoryFilter; cut: string; size: string; attributeFilters: Record<string, string> };
  hasFiltered: boolean;
  selectCategory: (category: CategoryFilter) => void;
  selectCut: (cut: string) => void;
  selectSize: (size: string) => void;
  selectAttribute: (id: string, value: string) => void;
  resetFilters: () => void;
}) {
  const { copy, categories, products } = catalog;
  const { category, cut, size, attributeFilters } = filters;
  const arrow = locale === "ar" ? "↖" : "↗";
  const cuts = [...new Set(products.flatMap((product) => product.cuts.map((option) => option.label)))];
  const sizes = [...new Set(products.flatMap((product) => product.sizes))].sort((a, b) => a - b);
  const attributes = new Map<string, { label: string; values: Map<string, string> }>();
  for (const { attributes: options } of products) {
    for (const option of options) {
      const filter = attributes.get(option.id) ?? { label: option.label, values: new Map<string, string>() };
      for (const { id, label } of option.values) if (!filter.values.has(id)) filter.values.set(id, label);
      attributes.set(option.id, filter);
    }
  }
  const [cutLabel, sizeLabel, allLabel] = optionLabels[locale];
  const formatSizes = new Intl.NumberFormat(locale, { style: "unit", unit: "millimeter" });

  return (
    <section id="collection" className={styles.collection} ref={collection} tabIndex={-1} aria-labelledby="collection-heading">
      <p className={styles.eyebrow}>{copy.collection}</p>
      <h2 data-reveal id="collection-heading" className={styles.collectionHeading}>{copy.heading}</h2>
      <div className={styles.filters} role="group" aria-label={copy.collection}>
        <button type="button" aria-pressed={category === "all"} onClick={() => selectCategory("all")}>{copy.all}</button>
        {categories.map((card) => (
          <button key={card.id} type="button" aria-pressed={category === card.id} onClick={() => selectCategory(card.id)}>{card.title}</button>
        ))}
        {cuts.length > 0 && (
          <label className={styles.attributeFilter}>{cutLabel}
            <select value={cut} onChange={(event) => selectCut(event.target.value)}>
              <option value="">{allLabel}</option>
              {cuts.map((value) => <option key={value}>{value}</option>)}
            </select>
          </label>
        )}
        {sizes.length > 0 && (
          <label className={styles.attributeFilter}>{sizeLabel}
            <select value={size} onChange={(event) => selectSize(event.target.value)}>
              <option value="">{allLabel}</option>
              {sizes.map((value) => <option key={value} value={value}>{formatSizes.format(value)}</option>)}
            </select>
          </label>
        )}
        {[...attributes].map(([id, filter]) => (
          <label className={styles.attributeFilter} key={id}>{filter.label}
            <select value={attributeFilters[id] ?? ""} onChange={(event) => selectAttribute(id, event.target.value)}>
              <option value="">{allLabel}</option>
              {[...filter.values].map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>
        ))}
      </div>
      <div aria-live="polite" role="status" className={styles.feedback}>
        {visibleProducts.length === 0 && (
          <>
            <p>{copy.noResults}</p>
            <button type="button" onClick={resetFilters}>{copy.reset}</button>
          </>
        )}
      </div>
      <ul className={styles.products} data-filtered={hasFiltered}>
        {visibleProducts.map((product) => {
          const categoryName = categories.find((card) => card.id === product.category)?.title;
          const colors = Object.fromEntries(product.palette?.flatMap((color, index) => color ? [[paletteProperties[index], color]] : []) ?? []);
          return (
            <li key={product.id} className={styles.product} data-product={product.id} data-reveal={hasFiltered ? undefined : ""} style={colors as CSSProperties}>
              <div className={styles.productImage}>
                <Image src={product.image} alt="" fill sizes="(max-width: 600px) 46vw, (max-width: 980px) 30vw, 280px" />
              </div>
              <div className={styles.productCopy}>
                <h3>{product.title}</h3>
                <p>{categoryName}</p>
              </div>
              <Link href={productPath(locale, product.id)} className={styles.productAction} aria-label={copy.explore + ": " + product.title}>
                {copy.explore} <span aria-hidden="true">{arrow}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
