import Image from "next/image";
import { getHomeContent } from "../../content/home-localized";
import type { Locale } from "../../content/locale";
import { bricolage, myriadPro } from "./home-fonts";
import styles from "./ingredient-collections.module.css";

export function IngredientCollections({ locale }: { locale: Locale }) {
  const { ingredientCollections } = getHomeContent(locale);
  return (
    <section
      id="ingredient-collections"
      className={`${styles.section} ${bricolage.variable} ${myriadPro.variable}`}
      aria-labelledby="ingredient-heading"
    >
      <div className={styles.container}>
        <p className={styles.eyebrow}>{ingredientCollections.eyebrow}</p>
        <h2 data-reveal id="ingredient-heading" className={styles.heading}>{ingredientCollections.heading}</h2>
        <ul className={styles.cards}>
          {ingredientCollections.cards.map((card) => (
            <li data-reveal className={styles.card} key={card.title}>
              <Image
                className={styles.photo}
                src={card.image}
                style={{ objectPosition: card.imagePosition }}
                alt=""
                fill
                sizes="(max-width: 680px) calc(100vw - 32px), (max-width: 1350px) 46vw, 620px"
              />
              <div className={styles.cardContent}>
                <p className={styles.cardLabel}>{card.label}</p>
                <div>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardAction}>{card.actionLabel}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
