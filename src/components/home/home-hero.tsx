import Image from "next/image";
import { homeContent } from "../../content/home";
import { HeroRibbons } from "./hero-ribbons";
import styles from "./home-hero.module.css";

const { hero } = homeContent;

export function HomeHero() {
  return (
    <section className={styles.hero} aria-labelledby="home-heading">
      <div className={styles.backdrop}>
        <Image src={hero.image} alt="" fill preload sizes="100vw" />
      </div>
      <div className={styles.content}>
        <p className={styles.eyebrow}>{hero.eyebrow}</p>
        <h1 id="home-heading" className={styles.heading}>
          {hero.heading.map((line) => <span key={line}>{line}{" "}</span>)}
        </h1>
        <p className={styles.description}>
          {hero.description.map((line) => <span key={line}>{line}{" "}</span>)}
        </p>
        <div className={styles.actions}>
          <span className={styles.primary} aria-disabled="true">
            {hero.primaryAction} <span aria-hidden="true">↗</span>
          </span>
          <span className={styles.secondary} aria-disabled="true">
            {hero.secondaryAction} <span aria-hidden="true">↗</span>
          </span>
        </div>
      </div>
      <HeroRibbons items={hero.ribbonItems} />
    </section>
  );
}
