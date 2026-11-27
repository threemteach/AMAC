import Image from "next/image";
import Link from "next/link";
import { getHomeContent } from "../../content/home-localized";
import { homePaths, localeLabels, type Locale } from "../../content/locale";
import { MobileMenu } from "./mobile-menu";
import styles from "./site-header.module.css";

export function SiteHeader({ locale }: { locale: Locale }) {
  const { announcement, navigation, quoteLabel } = getHomeContent(locale).header;
  const [homeLabel, ...upcomingLinks] = navigation;
  const labels = localeLabels[locale];
  const alternate = locale === "ar" ? "en" : "ar";
  const links = (
    <nav className={styles.navigation} aria-label={labels.navigation}>
      <ul>
        <li><Link href={homePaths[locale]} aria-current="page">{homeLabel}</Link></li>
        {upcomingLinks.map((label) => (
          <li key={label}><span aria-disabled="true">{label}</span></li>
        ))}
      </ul>
    </nav>
  );

  const quote = (
    <span className={styles.quote} aria-disabled="true">
      {quoteLabel} <span aria-hidden="true">{locale === "ar" ? "↖" : "↗"}</span>
    </span>
  );

  return (
    <header className={styles.header}>
      <p className={styles.announcement}>{announcement}</p>
      <div className={styles.navigationBar}>
        <MobileMenu locale={locale}>{links}{quote}</MobileMenu>
        {links}
        <Link href={homePaths[locale]} className={styles.logo} aria-label={labels.brand}>
          <Image src="/images/amac-logo.svg" width={177} height={78} alt={labels.brand} unoptimized />
        </Link>
        <div className={styles.actions}>
          {quote}
          <a className={styles.language} href={homePaths[alternate]} hrefLang={alternate} lang={alternate}>
            {alternate === "ar" ? "العربية" : "English"}
          </a>
        </div>
      </div>
    </header>
  );
}
