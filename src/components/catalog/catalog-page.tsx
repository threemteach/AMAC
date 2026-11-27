import { getCatalog } from "../../content/catalog";
import { readCategory } from "../../content/catalog-routes";
import type { Locale } from "../../content/locale";
import { ContactBanner } from "../home/contact-banner";
import { HomeMotion } from "../home/home-motion";
import { SiteFooter } from "../site/site-footer";
import { SiteHeader } from "../site/site-header";
import { CatalogBrowser } from "./catalog-browser";

export function CatalogPage({ locale, category }: { locale: Locale; category: string | string[] | undefined }) {
  return (
    <>
      <SiteHeader locale={locale} view="products" />
      <main>
        <CatalogBrowser locale={locale} catalog={getCatalog(locale)} initialCategory={readCategory(category)} />
        <ContactBanner locale={locale} kind="product" />
      </main>
      <SiteFooter locale={locale} />
      <HomeMotion />
    </>
  );
}
