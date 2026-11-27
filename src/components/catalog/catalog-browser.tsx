"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import type { getCatalog } from "../../content/catalog";
import type { Category } from "../../content/catalog-routes";
import type { Locale } from "../../content/locale";
import { searchCatalog } from "./catalog-search";
import styles from "./catalog.module.css";

type Filter = Category | "all";

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
  const [category, setCategory] = useState<Filter>(initialCategory);
  const [query, setQuery] = useState("");
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const suggestionsId = useId();
  const collection = useRef<HTMLElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const arrow = locale === "ar" ? "↖" : "↗";
  const visibleProducts = searchCatalog(products, category, query);
  const suggestions = visibleProducts.slice(0, 4);
  const showSuggestions = suggestionsOpen && /[\p{L}\p{N}]/u.test(query) && suggestions.length > 0;
  const activeSuggestion = showSuggestions ? suggestions[activeIndex] : undefined;

  function selectCategory(next: Filter) {
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
        <h1 id="catalog-heading" className={styles.heading}>{copy.title}</h1>
        <p className={styles.intro}>{copy.intro}</p>
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
        <h2 id="collection-heading" className={styles.collectionHeading}>{copy.heading}</h2>
        <div className={styles.filters} role="group" aria-label={copy.collection}>
          <button type="button" aria-pressed={category === "all"} onClick={() => selectCategory("all")}>{copy.all}</button>
          {categories.map((card) => (
            <button key={card.id} type="button" aria-pressed={category === card.id} onClick={() => selectCategory(card.id)}>{card.title}</button>
          ))}
        </div>
        <div aria-live="polite" role="status" className={styles.feedback}>
          {visibleProducts.length === 0 && (
            <>
              <p>{copy.noResults}</p>
              <button type="button" onClick={() => {
                setQuery("");
                selectCategory("all");
                searchInput.current?.focus();
              }}>{copy.reset}</button>
            </>
          )}
        </div>
        <ul className={styles.products}>
          {visibleProducts.map((product) => {
            const categoryName = categories.find((card) => card.id === product.category)?.title;
            return (
              <li key={product.id} className={styles.product} data-product={product.id}>
                <div className={styles.productImage}>
                  <Image src={product.image} alt="" fill sizes="(max-width: 600px) 46vw, (max-width: 980px) 30vw, 280px" />
                </div>
                <div className={styles.productCopy}>
                  <h3>{product.title}</h3>
                  <p>{categoryName}</p>
                </div>
                <button type="button" disabled className={styles.productAction}>
                  {copy.explore} <span aria-hidden="true">{arrow}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
