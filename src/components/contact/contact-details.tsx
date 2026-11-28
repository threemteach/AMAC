import Image from "next/image";
import Link from "next/link";
import type { ContactCopy } from "../../content/contact";
import { enquiryPath } from "../../content/enquiry-routes";
import type { Locale } from "../../content/locale";
import styles from "./contact.module.css";

export function ContactDetails({ copy, city, locale, generalLabel, exportLabel }: {
  copy: Pick<ContactCopy, "location" | "address" | "email" | "phone" | "phoneNote" | "eyebrow" | "heading">;
  city: string;
  locale: Locale;
  generalLabel: string;
  exportLabel: string;
}) {
  const channels = [
    { icon: "location", title: copy.location, lines: [city, copy.address] },
    { icon: "email", title: copy.email, lines: [] },
    { icon: "phone", title: copy.phone, lines: [copy.phoneNote] },
  ];

  return (
    <section className={styles.details} aria-labelledby="conversation-title" data-reveal>
      <p className={styles.eyebrow}>{copy.eyebrow}</p>
      <h2 id="conversation-title">{copy.heading.map((line) => <span key={line}>{line}{" "}</span>)}</h2>
      <ul className={styles.channels}>
        {channels.map(({ icon, title, lines }) => (
          <li key={icon}>
            <span className={styles.icon}>
              <Image src={"/images/contact/" + icon + ".svg"} width={30} height={30} alt="" unoptimized />
            </span>
            <div>
              <h3>{title}</h3>
              {lines.map((line) => <p key={line}>{line}</p>)}
              {icon === "email" && (
                <>
                  <p><Link href={enquiryPath(locale, "general")}>{generalLabel}</Link></p>
                  <p><Link href={enquiryPath(locale, "export")}>{exportLabel}</Link></p>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
