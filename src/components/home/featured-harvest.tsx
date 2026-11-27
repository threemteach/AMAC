import Image from "next/image";
import { getHomeContent } from "../../content/home-localized";
import type { Locale } from "../../content/locale";
import { bricolage, myriadPro } from "./home-fonts";
import styles from "./featured-harvest.module.css";

export function FeaturedHarvest({ locale }: { locale: Locale }) {
  const { featuredHarvest } = getHomeContent(locale);
  return (
    <section
      id="featured-harvest"
      className={`${styles.section} ${bricolage.variable} ${myriadPro.variable}`}
      aria-labelledby="harvest-heading"
    >
      <h2 data-reveal id="harvest-heading" className={styles.heading}>
        {featuredHarvest.heading.map((line) => <span key={line}>{line}{" "}</span>)}
      </h2>
      <ol className={styles.products}>
        {featuredHarvest.products.map((product, index) => (
          <li data-reveal key={product.name} className={styles.product}>
            <div className={styles.productImage}>
              <div className={styles.imageFrame}>
                <Image
                  src={product.image}
                  alt=""
                  fill
                  sizes="(max-width: 820px) 140px, (max-width: 1110px) 22vw, 260px"
                  className={styles.photo}
                  style={{ objectPosition: product.imagePosition, scale: product.imageScale }}
                />
              </div>
              <span className={styles.number} aria-hidden="true">{index + 1}</span>
            </div>
            <div className={styles.details}>
              <p className={styles.category}>{product.category}</p>
              <h3 className={styles.name}>{product.name}</h3>
              <p className={styles.description}>{product.description}</p>
              <span className={styles.productAction} aria-disabled="true">
                {featuredHarvest.productAction} <span aria-hidden="true">{locale === "ar" ? "↖" : "↗"}</span>
              </span>
            </div>
          </li>
        ))}
      </ol>
      <div className={styles.catalog}>
        <span className={styles.catalogAction} aria-disabled="true">{featuredHarvest.catalogAction}</span>
      </div>
    </section>
  );
}
