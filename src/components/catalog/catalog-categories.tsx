import Image from "next/image";
import type { CatalogData } from "../../content/catalog/catalog";
import type { CategoryFilter } from "../../content/catalog/catalog-routes";
import type { Locale } from "../../content/locale";
import styles from "./catalog.module.css";

export function CatalogCategories({ cards, label, category, locale, onSelect }: {
  cards: CatalogData["categories"];
  label: string;
  category: CategoryFilter;
  locale: Locale;
  onSelect: (category: CategoryFilter) => void;
}) {
  const arrow = locale === "ar" ? "↖" : "↗";
  return (
    <section className={styles.categories} aria-label={label}>
      {cards.map((card) => (
        <button
          key={card.id}
          type="button"
          data-reveal
          className={styles.categoryCard}
          aria-pressed={category === card.id}
          onClick={() => onSelect(card.id)}
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
  );
}
