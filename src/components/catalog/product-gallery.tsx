import Image from "next/image";
import type { ProductDetail } from "../../content/catalog/product-details";
import styles from "./product-details.module.css";

export function ProductGallery({ title, copy, cuts, cutIndex, hasChangedCut, chooseCut }: {
  title: string;
  copy: Pick<ProductDetail["copy"], "gallery" | "referencePhoto">;
  cuts: ProductDetail["cuts"];
  cutIndex: number;
  hasChangedCut: boolean;
  chooseCut: (index: number) => void;
}) {
  const cut = cuts[cutIndex];
  return (
    <figure data-reveal className={styles.gallery} aria-label={copy.gallery}>
      <div className={styles.mainPhoto}>
        <Image
          key={cut.id}
          className={hasChangedCut ? styles.cutPhoto : undefined}
          onLoad={(event) => { event.currentTarget.dataset.ready = "true"; }}
          src={cut.image}
          alt={title + " · " + cut.label}
          fill
          loading="eager"
          sizes={cuts.length > 1 ? "(max-width: 760px) 92vw, (max-width: 1440px) 38vw, 540px" : "(max-width: 760px) 92vw, 46vw"}
          style={{ objectPosition: cut.position }}
        />
        {cut.illustrative && <span className={styles.photoNote}>{copy.referencePhoto}</span>}
      </div>
      {cuts.length > 1 && (
        <ul className={styles.thumbnails}>
          {cuts.map((option, index) => (
            <li key={option.id}>
              <button
                type="button"
                aria-label={option.label}
                aria-pressed={cutIndex === index}
                onClick={() => chooseCut(index)}
              >
                <Image src={option.image} alt="" fill sizes="100px" style={{ objectPosition: option.position }} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </figure>
  );
}
