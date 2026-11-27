import type { Metadata } from "next";
import Link from "next/link";
import { catalogCopy } from "../../content/catalog-copy";
import { productsPath, productIds, productPath, type ProductId } from "../../content/catalog-routes";
import { getHomeContent } from "../../content/home-localized";
import { homePaths, type Locale } from "../../content/locale";
import { getProductDetails } from "../../content/product-details";
import { ContactBanner } from "../home/contact-banner";
import { HomeMotion } from "../home/home-motion";
import { SiteFooter } from "../site/site-footer";
import { SiteHeader } from "../site/site-header";
import { ProductDetails } from "./product-details";
import { ProductSwitcher } from "./product-switcher";
import styles from "./product-details.module.css";

export function getProductMetadata(locale: Locale, id: ProductId): Metadata {
  const product = getProductDetails(locale, id);
  const languages = Object.fromEntries((Object.keys(homePaths) as Locale[]).map((lang) => [lang, productPath(lang, id)]));
  return {
    title: product.title + " | AMAC Group",
    description: product.copy.description,
    alternates: { canonical: productPath(locale, id), languages: { ...languages, "x-default": productPath("en", id) } },
  };
}

export function ProductPage({ locale, id }: { locale: Locale; id: ProductId }) {
  const product = getProductDetails(locale, id);
  const [homeLabel, productsLabel] = getHomeContent(locale).header.navigation;
  const choices = productIds.map((productId, index) => ({ id: productId, title: catalogCopy[locale].productTitles[index] }));

  return (
    <>
      <SiteHeader locale={locale} view={id} />
      <main>
        <div className={styles.container}>
          <div className={styles.productNavigation}>
            <nav className={styles.breadcrumb} aria-label={productsLabel}>
              <ol>
                <li><Link href={homePaths[locale]}>{homeLabel}</Link></li>
                <li><Link href={productsPath(locale)}>{productsLabel}</Link></li>
                <li aria-current="page">{product.title}</li>
              </ol>
            </nav>
            <ProductSwitcher key={id} locale={locale} current={id} choices={choices} />
          </div>
          <ProductDetails key={id} product={product} />
        </div>
        <ContactBanner locale={locale} />
      </main>
      <SiteFooter locale={locale} />
      <HomeMotion key={id} />
    </>
  );
}
