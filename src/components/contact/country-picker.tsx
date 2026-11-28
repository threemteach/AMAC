"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { Locale } from "../../content/locale";
import { pickerCopy } from "../../content/translations/contact";
import { findExactCountry, getCountries, searchCountries, type Country } from "./countries";
import styles from "./contact.module.css";

export function CountryPicker({ locale, label, placeholder }: { locale: Locale; label: string; placeholder: string }) {
  const countries = useMemo(() => getCountries(locale), [locale]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Country>();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const input = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const listId = inputId + "-options";
  const results = useMemo(() => searchCountries(countries, query), [countries, query]);
  const active = open ? results[activeIndex] : undefined;

  useEffect(() => {
    if (active) document.getElementById(listId + "-" + active.code)?.scrollIntoView({ block: "nearest" });
  }, [active, listId]);

  function choose(country: Country) {
    setSelected(country);
    setQuery(country.label);
    setOpen(false);
    setActiveIndex(-1);
    input.current?.setCustomValidity("");
  }

  return (
    <div className={styles.countryPicker}>
      <label htmlFor={inputId}><span>{label}</span></label>
      <div className={styles.countryControl}>
        <input
          id={inputId}
          ref={input}
          type="search"
          role="combobox"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          maxLength={100}
          placeholder={placeholder}
          value={query}
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          aria-activedescendant={active ? listId + "-" + active.code : undefined}
          onFocus={() => setOpen(true)}
          onClick={() => setOpen(true)}
          onBlur={() => {
            setOpen(false);
            setActiveIndex(-1);
            if (selected && query !== selected.label) setQuery(selected.label);
          }}
          onChange={(event) => {
            const value = event.target.value;
            const exact = findExactCountry(countries, value);
            setQuery(value);
            setSelected(exact);
            setActiveIndex(-1);
            setOpen(true);
            event.currentTarget.setCustomValidity(value.trim() && !exact ? pickerCopy[locale][1] : "");
          }}
          onKeyDown={(event) => {
            if (event.nativeEvent.isComposing) return;
            if (event.key === "Escape" && open) {
              event.preventDefault();
              setOpen(false);
              setActiveIndex(-1);
              return;
            }
            if (event.key === "Enter" && open && results.length > 0 && (active || query.trim())) {
              event.preventDefault();
              choose(active ?? selected ?? results[0]);
              return;
            }
            if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
            if (!results.length) return;
            event.preventDefault();
            setOpen(true);
            setActiveIndex((index) => event.key === "ArrowDown"
              ? (index + 1) % results.length
              : index <= 0 ? results.length - 1 : index - 1);
          }}
        />
        <span className={styles.countryChevron} aria-hidden="true" />
      </div>
      <input type="hidden" name="country" value={selected?.label ?? ""} />
      {open && (
        <div className={styles.countryPopup}>
          <ul id={listId} className={styles.countryOptions} role="listbox" aria-label={label}>
            {results.map((country, index) => (
              <li
                id={listId + "-" + country.code}
                key={country.code}
                role="option"
                aria-selected={active ? activeIndex === index : selected?.code === country.code}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => choose(country)}
              >
                <span>{country.label}</span>
                <span className={styles.countryCode} dir="ltr">{country.code}</span>
              </li>
            ))}
          </ul>
          {results.length === 0 && <p role="status">{pickerCopy[locale][0]}</p>}
        </div>
      )}
    </div>
  );
}
