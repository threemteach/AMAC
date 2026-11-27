import Image from "next/image";
import Link from "next/link";
import { productsPath, type SiteView } from "../../content/catalog-routes";
import type { EnquiryKind } from "../../content/enquiry-routes";
import { journalPath } from "../../content/journal-routes";
import { getHomeContent } from "../../content/home-localized";
import { aboutPath, contactPath, homePaths, localeLabels, type Locale } from "../../content/locale";
import { LanguagePicker } from "./language-picker";
import { MobileMenu } from "./mobile-menu";
import styles from "./site-header.module.css";

export function SiteHeader({ locale, view = "home", slug, enquiryKind, availableLocales }: {
  locale: Locale; view?: SiteView; slug?: string; enquiryKind?: EnquiryKind; availableLocales?: Locale[];
}) {
  const { announcement, navigation, quoteLabel } = getHomeContent(locale).header;
  const [homeLabel, productsLabel, aboutLabel, journalLabel, contactLabel] = navigation;
  const labels = localeLabels[locale];
  const links = (
    <nav className={styles.navigation} aria-label={labels.navigation}>
      <ul>
        <li><Link href={homePaths[locale]} aria-current={view === "home" ? "page" : undefined}>{homeLabel}</Link></li>
        <li><Link href={productsPath(locale)} aria-current={view === "products" ? "page" : view === "product" ? "location" : undefined}>{productsLabel}</Link></li>
        <li><Link href={aboutPath(locale)} aria-current={view === "about" ? "page" : undefined}>{aboutLabel}</Link></li>
        <li><Link href={journalPath(locale)} aria-current={view === "journal" ? "page" : view === "article" ? "location" : undefined}>{journalLabel}</Link></li>
        <li><Link href={contactPath(locale)} aria-current={view === "contact" ? "page" : undefined}>{contactLabel}</Link></li>
      </ul>
    </nav>
  );

  const quote = (
    <Link className={styles.quote} href={contactPath(locale) + "#enquiry"}>
      {quoteLabel} <span aria-hidden="true">{locale === "ar" ? "↖" : "↗"}</span>
    </Link>
  );

  return (
    <header className={styles.header} data-view={view === "home" ? "home" : "products"}>
      <p className={styles.announcement}>{announcement}</p>
      <div className={styles.navigationBar}>
        <MobileMenu locale={locale}>{links}{quote}</MobileMenu>
        {links}
        <Link href={homePaths[locale]} className={styles.logo} aria-label={labels.brand}>
          <Image src="/images/amac-logo.svg" width={177} height={78} alt={labels.brand} unoptimized />
        </Link>
        <div className={styles.actions}>
          {quote}
          <LanguagePicker locale={locale} view={view} slug={slug} enquiryKind={enquiryKind} availableLocales={availableLocales} />
        </div>
      </div>
    </header>
  );
}
