import Image from "next/image";
import type { AboutCopy } from "../../content/about";
import styles from "./about.module.css";

const icons = ["trust", "quality", "sustainability", "global"] as const;

export function CoreValues({ values }: { values: AboutCopy["values"] }) {
  return (
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
  );
}
