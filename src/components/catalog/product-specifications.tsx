import type { ProductDetail } from "../../content/catalog/product-details";
import styles from "./product-details.module.css";

export function ProductSpecifications({ product, format }: { product: ProductDetail; format: string }) {
  const { copy } = product;
  const values = [copy.range, copy.origin, format, copy.packaging, copy.availability];

  return (
    <section className={styles.specifications} aria-labelledby="specifications-heading">
      <div className={styles.specificationCopy}>
        <p className={styles.eyebrow}>{copy.detailsLabel}</p>
        <h2 id="specifications-heading" data-reveal>{copy.detailsHeading}</h2>
        <table data-reveal className={styles.specTable} aria-labelledby="specifications-heading">
          <tbody>
            {copy.specs.map((label, index) => (
              <tr key={label}>
                <th scope="row">{label}</th>
                <td>{values[index]}</td>
              </tr>
            ))}
            {product.attributes.map(({ id, label, values }) => (
              <tr key={id}><th scope="row">{label}</th><td>{values.map((value) => value.label).join(" · ")}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <aside data-reveal className={styles.requirements}>
        <h2>{copy.requirementsHeading.map((line) => <span key={line}>{line}</span>)}</h2>
        <p>{copy.requirements}</p>
      </aside>
    </section>
  );
}
