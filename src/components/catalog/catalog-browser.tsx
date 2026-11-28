"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useRef, useState, type CSSProperties } from "react";
import type { getCatalog } from "../../content/catalog/catalog";
import { productPath, type Category } from "../../content/catalog/catalog-routes";
import type { Locale } from "../../content/locale";
import { searchCatalog } from "./catalog-search";
import styles from "./catalog.module.css";

type Filter = Category | "all";
const paletteProperties = ["--product-surface", "--product-border", "--product-ink", "--product-accent", "--product-accent-text"];
const optionLabels: Record<Locale, [string, string, string]> = {
  en: ["Cut", "Size", "All"], ar: ["التقطيع", "الحجم", "الكل"],
  fr: ["Découpe", "Calibre", "Tous"], de: ["Schnitt", "Größe", "Alle"],
  it: ["Taglio", "Dimensione", "Tutti"], ru: ["Нарезка", "Размер", "Все"],
  es: ["Corte", "Tamaño", "Todos"],
};

export function CatalogBrowser({
  locale,
  catalog,
  initialCategory,
}: {
  locale: Locale;
  catalog: ReturnType<typeof getCatalog>;
  initialCategory: Filter;
}) {
  const { copy, categories, products } = catalog;
  const [hasFiltered, setHasFiltered] = useState(false);
  const [category, setCategory] = useState<Filter>(initialCategory);
  const [query, setQuery] = useState("");
  const [cut, setCut] = useState("");
  const [size, setSize] = useState("");
  const [attributeFilters, setAttributeFilters] = useState<Record<string, string>>({});
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const suggestionsId = useId();
  const collection = useRef<HTMLElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
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
  const visibleProducts = searchCatalog(products, category, query).filter((product) =>
    (!cut || product.cuts.some((option) => option.label === cut)) && (!size || product.sizes.includes(Number(size))) &&
    Object.entries(attributeFilters).every(([id, value]) =>
      !value || product.attributes.some((option) => option.id === id && option.values.some((entry) => entry.id === value)),
    ),
  );
  const suggestions = visibleProducts.slice(0, 4);
  const showSuggestions = suggestionsOpen && /[\p{L}\p{N}]/u.test(query) && suggestions.length > 0;
  const activeSuggestion = showSuggestions ? suggestions[activeIndex] : undefined;

  function selectCategory(next: Filter) {
    setHasFiltered(true);
    setCategory(next);
    const url = new URL(window.location.href);
    if (next === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", next);
    window.history.replaceState(null, "", url);
  }

  function jumpToCollection() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    collection.current?.focus({ preventScroll: true });
    collection.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  }

  function chooseSuggestion(title: string) {
    setQuery(title);
    setSuggestionsOpen(false);
    setActiveIndex(-1);
    jumpToCollection();
  }

  return (
    <>
      <section className={styles.hero} aria-labelledby="catalog-heading">
        <p className={styles.eyebrow}>AMAC GROUP</p>
        <h1 data-reveal id="catalog-heading" className={styles.heading}>{copy.title}</h1>
        <p className={styles.intro} data-reveal>{copy.intro}</p>
        <form
          role="search"
          className={styles.search}
          onSubmit={(event) => {
            event.preventDefault();
            if (activeSuggestion) chooseSuggestion(activeSuggestion.title);
            else jumpToCollection();
          }}
          onBlur={() => {
            setSuggestionsOpen(false);
            setActiveIndex(-1);
          }}
        >
          <button type="submit" aria-label={copy.search}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.8" />
              <path d="m15 15 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
          <input
            ref={searchInput}
            type="search"
            role="combobox"
            autoComplete="off"
            aria-autocomplete="list"
            aria-expanded={showSuggestions}
            aria-controls={showSuggestions ? suggestionsId : undefined}
            aria-activedescendant={activeSuggestion ? suggestionsId + "-" + activeSuggestion.id : undefined}
            aria-label={copy.search}
            placeholder={copy.search}
            value={query}
            onFocus={() => setSuggestionsOpen(true)}
            onChange={(event) => {
              setHasFiltered(true);
              setQuery(event.target.value);
              setActiveIndex(-1);
              setSuggestionsOpen(true);
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape" && showSuggestions) {
                event.preventDefault();
                setSuggestionsOpen(false);
                setActiveIndex(-1);
                return;
              }
              if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
              if (suggestions.length === 0 || query.trim() === "") return;
              event.preventDefault();
              setSuggestionsOpen(true);
              setActiveIndex((current) => {
                if (event.key === "ArrowDown") return (current + 1) % suggestions.length;
                return current <= 0 ? suggestions.length - 1 : current - 1;
              });
            }}
          />
          {showSuggestions && (
            <ul id={suggestionsId} className={styles.suggestions} role="listbox" aria-label={copy.search}>
              {suggestions.map((product, index) => (
                <li
                  key={product.id}
                  id={suggestionsId + "-" + product.id}
                  role="option"
                  aria-selected={index === activeIndex}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => chooseSuggestion(product.title)}
                >
                  {product.title}
                </li>
              ))}
            </ul>
          )}
        </form>
      </section>

      <section className={styles.categories} aria-label={copy.collection}>
        {categories.map((card) => (
          <button
            key={card.id}
            type="button"
            data-reveal
            className={styles.categoryCard}
            aria-pressed={category === card.id}
            onClick={() => {
              selectCategory(card.id);
              jumpToCollection();
            }}
          >
            <Image
              src={card.image}
              alt=""
              fill
              sizes="(max-width: 600px) 94vw, (max-width: 1440px) 45vw, 620px"
              style={{ objectPosition: card.imagePosition }}
            />
            <span className={styles.categoryLabel}>{card.label}</span>
            <span className={styles.categoryText}>
              <strong>{card.title}</strong>
              <span>{card.actionLabel} <span aria-hidden="true">{arrow}</span></span>
            </span>
          </button>
        ))}
      </section>

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
              <select value={cut} onChange={(event) => { setHasFiltered(true); setCut(event.target.value); }}>
                <option value="">{allLabel}</option>
                {cuts.map((value) => <option key={value}>{value}</option>)}
              </select>
            </label>
          )}
          {sizes.length > 0 && (
            <label className={styles.attributeFilter}>{sizeLabel}
              <select value={size} onChange={(event) => { setHasFiltered(true); setSize(event.target.value); }}>
                <option value="">{allLabel}</option>
                {sizes.map((value) => <option key={value} value={value}>{formatSizes.format(value)}</option>)}
              </select>
            </label>
          )}
          {[...attributes].map(([id, filter]) => (
            <label className={styles.attributeFilter} key={id}>{filter.label}
              <select value={attributeFilters[id] ?? ""} onChange={(event) => {
                setHasFiltered(true);
                setAttributeFilters({ ...attributeFilters, [id]: event.target.value });
              }}>
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
              <button type="button" onClick={() => {
                setQuery("");
                setCut("");
                setSize("");
                setAttributeFilters({});
                selectCategory("all");
                searchInput.current?.focus();
              }}>{copy.reset}</button>
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
    </>
  );
}
