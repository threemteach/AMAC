import styles from "./home-hero.module.css";

type RibbonItem = { label: string; icon?: string };

export function HeroRibbons({ items }: { items: RibbonItem[] }) {
  const [produce, products, partnerships] = items;
  const dark = [products, partnerships, produce];
  const light = [produce, products, partnerships];
  // Repeat beyond both edges so the track stays filled through each loop.
  const rows = [dark, light].map((row) =>
    Array.from({ length: 7 }, () => row).flat(),
  );

  return (
    <div className={styles.ribbons} aria-hidden="true">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.ribbon}>
          <div className={styles.ribbonTrack}>
            {row.map(({ label, icon }, index) => (
              <span className={styles.ribbonItem} key={`${label}-${index}`}>
                {icon && <span>{icon}</span>}
                {label}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
