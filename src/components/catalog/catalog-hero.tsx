import { useId, useState, type RefObject } from "react";
import type { CatalogData } from "../../content/catalog/catalog";
import styles from "./catalog.module.css";

export function CatalogHero({ copy, query, suggestions, searchInput, onQueryChange, onSuggestion, onSearch }: {
  copy: CatalogData["copy"];
  query: string;
  suggestions: CatalogData["products"];
  searchInput: RefObject<HTMLInputElement | null>;
  onQueryChange: (query: string) => void;
  onSuggestion: (title: string) => void;
  onSearch: () => void;
}) {
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const suggestionsId = useId();
  const showSuggestions = suggestionsOpen && /[\p{L}\p{N}]/u.test(query) && suggestions.length > 0;
  const activeSuggestion = showSuggestions ? suggestions[activeIndex] : undefined;

  function chooseSuggestion(title: string) {
    setSuggestionsOpen(false);
    setActiveIndex(-1);
    onSuggestion(title);
  }

  return (
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
          else onSearch();
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
            onQueryChange(event.target.value);
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
  );
}
