import Image from "next/image";
import { getHomeContent } from "../../content/home-localized";
import type { Locale } from "../../content/locale";
import { bricolage, myriadPro } from "../shared/site-fonts";
import styles from "./shipping-routes.module.css";

export function ShippingRoutes({ locale }: { locale: Locale }) {
  const { shippingRoutes } = getHomeContent(locale);
  return (
    <section
      id="shipping-routes"
      className={`${styles.section} ${bricolage.variable} ${myriadPro.variable}`}
      aria-labelledby="shipping-heading"
    >
      <p className={styles.eyebrow}>{shippingRoutes.eyebrow}</p>
      <h2 data-reveal id="shipping-heading" className={styles.heading}>
        {shippingRoutes.heading.map((line) => <span key={line}>{line}{" "}</span>)}
      </h2>
      <p className={styles.intro}>{shippingRoutes.description}</p>

      <ol className={styles.routes}>
        {shippingRoutes.methods.map((route, index) => (
          <li data-reveal
            className={styles.route}
            key={route.mode}
            data-route={route.mode}
          >
            <span className={styles.number} aria-hidden="true">{index + 1}</span>
            <div className={styles.disc}>
              <Image className={styles.icon} {...route.icon} alt="" unoptimized />
              <h3 className={styles.title}>{route.title}</h3>
            </div>
            <p className={styles.routeDescription}>{route.description}</p>
          </li>
        ))}
      </ol>

      <p className={styles.note}>{shippingRoutes.note}</p>
      <span className={styles.action} aria-disabled="true">{shippingRoutes.actionLabel}</span>
    </section>
  );
}
