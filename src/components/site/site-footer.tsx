import Image from "next/image";
import { footerContent } from "../../content/site";
import { SiteCredit } from "./site-credit";
import styles from "./site-footer.module.css";

export function SiteFooter() {
  return (
    <footer id="site-footer" className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.columns} data-reveal>
          <div className={styles.brand}>
            <Image
              className={styles.logo}
              src="/images/amac-logo.svg"
              alt="AMAC Group"
              width={177}
              height={78}
              unoptimized
            />
            <p className={styles.summary}>
              {footerContent.brandSummary.map((line) => <span key={line}>{line}</span>)}
            </p>
            <p className={styles.location}>{footerContent.location}</p>
          </div>

          <div className={styles.column}>
            <h2>{footerContent.exploreHeading}</h2>
            <ul className={styles.list}>
              {footerContent.explore.map((label) => <li key={label}>{label}</li>)}
            </ul>
          </div>

          <div className={styles.column}>
            <h2>{footerContent.contactHeading}</h2>
            <ul className={styles.contacts}>
              {footerContent.contacts.map((label) => <li key={label}>{label}</li>)}
            </ul>
          </div>

          <div className={styles.column}>
            <h2>{footerContent.socialHeading}</h2>
            <ul className={styles.socials}>
              {footerContent.socials.map(({ name, mark }) => (
                <li className={styles.social} key={name} data-network={name.toLowerCase()}>
                  <span className={styles.srOnly}>{name}</span>
                  <span aria-hidden="true" className={styles.mark}>{mark}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>{footerContent.copyright}</p>
          <SiteCredit className={styles.credit} />
          <p>{footerContent.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
