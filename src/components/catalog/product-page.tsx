import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { productPath, type ProductId } from "../../content/catalog/catalog-routes";
import { homePaths, type Locale } from "../../content/locale";
import { getProductDetails } from "../../content/catalog/product-details";
import { ContactBanner } from "../shared/contact-banner";
import { SiteMotion } from "../shared/site-motion";
import { SiteFooter } from "../site/site-footer";
import { SiteHeader } from "../site/site-header";
import { ProductDetails } from "./product-details";
import { ProductNavigation } from "./product-navigation";
import styles from "./product-details.module.css";

export function getProductMetadata(locale: Locale, id: ProductId): Metadata {
  const product = getProductDetails(locale, id);
  if (!product) notFound();
  const languages = Object.fromEntries((Object.keys(homePaths) as Locale[]).map((lang) => [lang, productPath(lang, id)]));
  return {
    title: product.seoTitle || product.title + " | AMAC Group",
    description: product.seoDescription || product.copy.description,
    alternates: { canonical: productPath(locale, id), languages: { ...languages, "x-default": productPath("en", id) } },
  };
}

export function ProductPage({ locale, id }: { locale: Locale; id: ProductId }) {
  const product = getProductDetails(locale, id);
  if (!product) notFound();

  return (
    <>
      <SiteHeader locale={locale} view="product" slug={id} />
      <main>
        <div className={styles.container}>
          <ProductNavigation locale={locale} id={id} title={product.title} />
          <ProductDetails key={id} product={product} />
        </div>
        <ContactBanner locale={locale} kind="product" />
      </main>
      <SiteFooter locale={locale} />
      <SiteMotion key={id} />
    </>
  );
}
