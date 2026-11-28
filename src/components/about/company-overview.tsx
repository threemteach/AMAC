import Image from "next/image";
import type { getAboutCopy } from "../../content/about";
import styles from "./about.module.css";

export function CompanyOverview({ copy }: { copy: Pick<ReturnType<typeof getAboutCopy>, "companyHeading" | "company"> }) {
  return (
    <section id="who-we-are" className={styles.company} aria-labelledby="company-title">
      <Image className={styles.watermark} src="/images/fields-watermark.svg" width={520} height={546} alt="" unoptimized />
      <div className={styles.companyInner} data-reveal>
        <h2 id="company-title">{copy.companyHeading}</h2>
        {copy.company.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </section>
  );
}
