import Image from "next/image";
import { getHomeContent } from "../../content/home-localized";
import type { Locale } from "../../content/locale";
import { HomeLoader } from "./home-loader";
import { HeroRibbons } from "./hero-ribbons";
import styles from "./home-hero.module.css";

export function HomeHero({ locale }: { locale: Locale }) {
  const { hero } = getHomeContent(locale);
  return (
    <section className={styles.hero} aria-labelledby="home-heading">
      <div className={styles.backdrop}>
        <Image id="home-farm-image" src={hero.image} alt="" fill preload sizes="100vw" />
      </div>
      <div className={styles.content} data-reveal>
        <p className={styles.eyebrow}>{hero.eyebrow}</p>
        <h1 id="home-heading" className={styles.heading}>
          {hero.heading.map((line) => <span key={line}>{line}{" "}</span>)}
        </h1>
        <p className={styles.description}>
          {hero.description.map((line) => <span key={line}>{line}{" "}</span>)}
        </p>
        <div className={styles.actions}>
          <span className={styles.primary} aria-disabled="true">
            {hero.primaryAction} <span aria-hidden="true">{locale === "ar" ? "↖" : "↗"}</span>
          </span>
          <span className={styles.secondary} aria-disabled="true">
            {hero.secondaryAction} <span aria-hidden="true">{locale === "ar" ? "↖" : "↗"}</span>
          </span>
        </div>
      </div>
      <HomeLoader locale={locale} />
      <HeroRibbons items={hero.ribbonItems} />
    </section>
  );
}
