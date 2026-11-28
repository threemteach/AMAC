import Image from "next/image";
import type { AboutCopy } from "../../content/about";
import { bricolage } from "../shared/site-fonts";
import styles from "./about.module.css";

const icons = ["trust", "quality", "sustainability", "global"] as const;

export function CoreValues({ heading, values }: { heading: string; values: AboutCopy["values"] }) {
  return (
    <section className={`${styles.values} ${bricolage.variable}`} aria-labelledby="values-title">
      <h2 id="values-title" data-reveal>{heading}</h2>
      <ol className={styles.valuesList} role="list">
        {values.map(([title, description], index) => (
          <li className={styles.valueCard} key={icons[index]}>
            <div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
            <span className={styles.valueIcon} aria-hidden="true">
              <Image
                src={"/images/about/" + icons[index] + ".svg"}
                width={180}
                height={180}
                alt=""
                unoptimized
              />
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
