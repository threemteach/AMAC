import Image from "next/image";
import { homeContent } from "../../content/home";
import { bricolage, myriadPro } from "./home-fonts";
import styles from "./factory-process.module.css";

const { factoryProcess } = homeContent;
const emptyFrames = [2, 3, 4];

export function FactoryProcess() {
  return (
    <section
      id="factory-process"
      className={`${styles.section} ${bricolage.variable} ${myriadPro.variable}`}
      aria-labelledby="factory-heading"
    >
      <p className={styles.eyebrow}>{factoryProcess.eyebrow}</p>
      <h2 data-reveal id="factory-heading" className={styles.heading}>
        {factoryProcess.heading.map((line) => <span key={line}>{line}{" "}</span>)}
      </h2>
      <p className={styles.description}>{factoryProcess.description}</p>

      <div className={styles.frames} data-reveal aria-hidden="true">
        <div className={`${styles.frame} ${styles.preview}`}>
          <Image
            className={styles.cover}
            src={factoryProcess.cover}
            alt=""
            fill
            sizes="(max-width: 740px) 100vw, (max-width: 1440px) 54vw, 760px"
          />
          <span className={styles.pause} />
        </div>
        {emptyFrames.map((frame) => (
          <div key={frame} className={styles.frame}>
            <span className={styles.play} />
          </div>
        ))}
      </div>
    </section>
  );
}
