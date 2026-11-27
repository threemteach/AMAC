import Image from "next/image";
import Link from "next/link";
import { homeContent } from "../../content/home";
import { MobileMenu } from "./mobile-menu";
import styles from "./site-header.module.css";

const { announcement, navigation, quoteLabel } = homeContent.header;
const [homeLabel, ...upcomingLinks] = navigation;

export function SiteHeader() {
  const links = (
    <nav className={styles.navigation} aria-label="Main navigation">
      <ul>
        <li><Link href="/" aria-current="page">{homeLabel}</Link></li>
        {upcomingLinks.map((label) => (
          <li key={label}><span aria-disabled="true">{label}</span></li>
        ))}
      </ul>
    </nav>
  );

  const quote = (
    <span className={styles.quote} aria-disabled="true">
      {quoteLabel} <span aria-hidden="true">↗</span>
    </span>
  );

  return (
    <header className={styles.header}>
      <p className={styles.announcement}>{announcement}</p>
      <div className={styles.navigationBar}>
        <MobileMenu>{links}{quote}</MobileMenu>
        {links}
        <Link href="/" className={styles.logo} aria-label="AMAC Group home">
          <Image src="/images/amac-logo.svg" width={177} height={78} alt="AMAC Group" unoptimized />
        </Link>
        {quote}
      </div>
    </header>
  );
}
