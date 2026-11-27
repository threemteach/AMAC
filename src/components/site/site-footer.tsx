import Image from "next/image";
import Link from "next/link";
import { productsPath } from "../../content/catalog-routes";
import { enquiryPath } from "../../content/enquiry-routes";
import { contentText, enquiryRecipient, getCms, lines } from "../../content/cms-store";
import { journalPath } from "../../content/journal-routes";
import { aboutPath, contactPath, localeLabels, type Locale } from "../../content/locale";
import { getFooterContent } from "../../content/site";
import { SiteCredit } from "./site-credit";
import styles from "./site-footer.module.css";

export function SiteFooter({ locale }: { locale: Locale }) {
  const footerContent = getFooterContent(locale);
  const cms = getCms();
  const contacts = cms?.contacts;
  const generalEmail = enquiryRecipient("general");
  const exportEmail = enquiryRecipient("export");
  const summary = lines(contentText(cms?.copy.footerSummary, locale, footerContent.brandSummary.join("\n")));
  const [productsLabel, storyLabel, journalLabel, contactLabel] = footerContent.explore;
  const [generalLabel, exportLabel] = footerContent.contacts;
  return (
    <footer id="site-footer" className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.columns} data-reveal>
          <div className={styles.brand}>
            <Image
              className={styles.logo}
              src="/images/amac-logo.svg"
              alt={localeLabels[locale].brand}
              width={177}
              height={78}
              unoptimized
            />
            <p className={styles.summary}>
              {summary.map((line, index) => <span key={index}>{line}</span>)}
            </p>
            <p className={styles.location}>{contentText(cms?.copy.footerLocation, locale, footerContent.location)}</p>
          </div>

          <div className={styles.column}>
            <h2>{footerContent.exploreHeading}</h2>
            <ul className={styles.list}>
              <li><Link href={productsPath(locale)}>{productsLabel}</Link></li>
              <li><Link href={aboutPath(locale)}>{storyLabel}</Link></li>
              <li><Link href={journalPath(locale)}>{journalLabel}</Link></li>
              <li><Link href={contactPath(locale)}>{contactLabel}</Link></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h2>{footerContent.contactHeading}</h2>
            <ul className={styles.contacts}>
              <li><Link href={enquiryPath(locale, "general")}>{generalLabel}</Link>
                {generalEmail && <a className={styles.address} href={"mailto:" + generalEmail}>{generalEmail}</a>}
              </li>
              <li><Link href={enquiryPath(locale, "export")}>{exportLabel}</Link>
                {exportEmail && <a className={styles.address} href={"mailto:" + exportEmail}>{exportEmail}</a>}
              </li>
              {contacts?.business && <li><a className={styles.address} href={"mailto:" + contacts.business}>{contacts.business}</a></li>}
            </ul>
          </div>

          <div className={styles.column}>
            <h2>{footerContent.socialHeading}</h2>
            <ul className={styles.socials}>
              {footerContent.socials.map(({ name, mark }) => {
                const social = contacts?.social[name as keyof typeof contacts.social];
                const badge = <><span className={styles.srOnly}>{name}</span><span aria-hidden="true" className={styles.mark}>{mark}</span></>;
                const href = social?.url || (social?.email && "mailto:" + social.email);
                const attributes = { className: styles.social, "data-network": name.toLowerCase() };
                return <li key={name}>{href ? <a href={href} {...attributes}>{badge}</a> : <span {...attributes}>{badge}</span>}</li>;
              })}
            </ul>
            {contacts && <ul className={styles.list}>
              {Object.entries(contacts.social).flatMap(([name, social]) => social.email && social.url ? [
                <li key={name}><a className={styles.address} href={"mailto:" + social.email}>{social.email}</a></li>,
              ] : [])}
            </ul>}
          </div>
        </div>

        <div className={styles.bottom}>
          <p>{footerContent.copyright}</p>
          <SiteCredit locale={locale} className={styles.credit} />
          <p>{contentText(cms?.copy.footerTagline, locale, footerContent.tagline)}</p>
        </div>
      </div>
    </footer>
  );
}
