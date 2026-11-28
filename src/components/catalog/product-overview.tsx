import Image from "next/image";
import type { ProductDetail } from "../../content/catalog/product-details";
import { ProductGallery } from "./product-gallery";
import styles from "./product-details.module.css";

export function ProductOverview({
  product, cutIndex, hasChangedCut, size, saved, formatSize, chooseCut, setSize, openEnquiry, toggleSavedSelection,
}: {
  product: ProductDetail;
  cutIndex: number;
  hasChangedCut: boolean;
  size: number | undefined;
  saved: boolean;
  formatSize: (value: number) => string;
  chooseCut: (index: number) => void;
  setSize: (size: number) => void;
  openEnquiry: () => void;
  toggleSavedSelection: () => void;
}) {
  const { title, botanicalName, copy, cuts, sizes } = product;
  const cut = cuts[cutIndex];
  return (
    <section className={styles.overview} aria-labelledby="product-title" data-gallery={cuts.length > 1 ? "multiple" : "single"}>
      <ProductGallery title={title} copy={copy} cuts={cuts} cutIndex={cutIndex} hasChangedCut={hasChangedCut} chooseCut={chooseCut} />

      <div className={styles.productInfo} data-reveal>
        <p className={styles.eyebrow}>{copy.category}</p>
        <h1 id="product-title" className={styles.title}>{title}</h1>
        {botanicalName && <p className={styles.botanicalName}><i lang="la" dir="ltr">{botanicalName}</i></p>}
        <p className={styles.description}>{copy.description}</p>

        {cuts.length > 1 ? (
          <fieldset className={styles.options}>
            <legend><span aria-hidden="true">01 — </span>{copy.cutLabel}</legend>
            <div className={styles.optionList}>
              {cuts.map((option, index) => (
                <label className={styles.option} key={option.id}>
                  <input type="radio" name="product-cut" value={option.id} checked={cutIndex === index} onChange={() => chooseCut(index)} />
                  <span className={styles.optionPhoto}>
                    <Image src={option.image} alt="" fill sizes="36px" style={{ objectPosition: option.position }} />
                  </span>
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ) : (
          <dl className={styles.format}>
            <dt>{copy.specs[2]}</dt>
            <dd>{cut.label}</dd>
          </dl>
        )}

        {sizes.length > 0 && (
          <fieldset className={styles.options}>
            <legend><span aria-hidden="true">02 — </span>{copy.sizeLabel}</legend>
            <div className={styles.optionList}>
              {sizes.map((option) => (
                <label className={styles.option} key={option}>
                  <input type="radio" name="product-size" value={option} checked={size === option} onChange={() => setSize(option)} />
                  <span>{formatSize(option)}</span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        <div className={styles.actions}>
          <button type="button" className={styles.enquire} onClick={openEnquiry}>{copy.enquire}</button>
          <button type="button" className={styles.save} aria-pressed={saved} onClick={toggleSavedSelection}>
            {saved ? copy.saved : copy.save}
          </button>
        </div>
      </div>
    </section>
  );
}
