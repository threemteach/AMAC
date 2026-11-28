"use client";

import { useRef, useState } from "react";
import type { CatalogData } from "../../content/catalog/catalog";
import type { CategoryFilter } from "../../content/catalog/catalog-routes";
import type { Locale } from "../../content/locale";
import { CatalogCategories } from "./catalog-categories";
import { CatalogCollection } from "./catalog-collection";
import { CatalogHero } from "./catalog-hero";
import { searchCatalog } from "./catalog-search";

export function CatalogBrowser({
  locale,
  catalog,
  initialCategory,
}: {
  locale: Locale;
  catalog: CatalogData;
  initialCategory: CategoryFilter;
}) {
  const { copy, categories, products } = catalog;
  const [hasFiltered, setHasFiltered] = useState(false);
  const [category, setCategory] = useState<CategoryFilter>(initialCategory);
  const [query, setQuery] = useState("");
  const [attributeFilters, setAttributeFilters] = useState<Record<string, string>>({});
  const collection = useRef<HTMLElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const visibleProducts = searchCatalog(products, category, query).filter((product) =>
    Object.entries(attributeFilters).every(([id, value]) =>
      !value || product.attributes.some((option) => option.id === id && option.values.some((entry) => entry.id === value)),
    ),
  );

  function selectCategory(next: CategoryFilter) {
    setHasFiltered(true);
    setCategory(next);
    setQuery("");
    setAttributeFilters({});
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

  return (
    <>
      <CatalogHero
        copy={copy}
        query={query}
        suggestions={visibleProducts.slice(0, 4)}
        searchInput={searchInput}
        onQueryChange={(value) => { setHasFiltered(true); setQuery(value); }}
        onSuggestion={(title) => { setQuery(title); jumpToCollection(); }}
        onSearch={jumpToCollection}
      />
      <CatalogCategories
        cards={categories}
        label={copy.collection}
        category={category}
        locale={locale}
        onSelect={(next) => { selectCategory(next); jumpToCollection(); }}
      />
      <CatalogCollection
        locale={locale}
        catalog={catalog}
        visibleProducts={visibleProducts}
        collection={collection}
        category={category}
        attributeFilters={attributeFilters}
        hasFiltered={hasFiltered}
        selectCategory={selectCategory}
        selectAttribute={(id, value) => { setHasFiltered(true); setAttributeFilters({ ...attributeFilters, [id]: value }); }}
      />
    </>
  );
}
