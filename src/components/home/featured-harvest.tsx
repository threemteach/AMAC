import Image from "next/image";
import Link from "next/link";
import { getCatalog } from "../../content/catalog/catalog";
import { productsPath, productIds, productPath } from "../../content/catalog/catalog-routes";
import { getHomeContent } from "../../content/home-localized";
import { contentText } from "../../content/localized-text";
import { getCms } from "../../server/cms/store";
import type { Locale } from "../../content/locale";
import { bricolage, myriadPro } from "../shared/site-fonts";
import styles from "./featured-harvest.module.css";

export function FeaturedHarvest({ locale }: { locale: Locale }) {
  const { featuredHarvest } = getHomeContent(locale);
  const { products, categories } = getCatalog(locale);
  const cms = getCms();
  const featured = products.filter((product) => product.featured).map((product) => {
    const base = featuredHarvest.products[productIds.findIndex((id) => id === product.id)];
    const entry = cms?.products.find(({ slug }) => slug === product.id);
    return {
      ...base, id: product.id, name: entry ? product.title : base?.name ?? product.title,
      category: entry ? categories.find(({ id }) => id === product.category)?.title : base?.category,
      description: contentText(entry?.featuredDescription, locale, contentText(entry?.description, locale, base?.description)),
      image: product.featuredImage || base?.image || product.image,
    };
  });
  if (featured.length === 0) return null;
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
        {featured.map((product, index) => (
          <li data-reveal key={product.id} className={styles.product}>
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
              <Link className={styles.productAction} href={productPath(locale, product.id)}>
                {featuredHarvest.productAction} <span aria-hidden="true">{locale === "ar" ? "↖" : "↗"}</span>
              </Link>
            </div>
          </li>
        ))}
      </ol>
      <div className={styles.catalog}>
        <Link className={styles.catalogAction} href={productsPath(locale)}>{featuredHarvest.catalogAction}</Link>
      </div>
    </section>
  );
}
