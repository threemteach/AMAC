import type { ContactCopy } from "../../content/contact";
import styles from "./contact.module.css";

export function ContactLocation({ copy, city }: { copy: Pick<ContactCopy, "location" | "locationDescription">; city: string }) {
  return (
    <section className={styles.location} aria-labelledby="location-title">
      <div data-reveal>
        <p>{copy.location}</p>
        <h2 id="location-title">{city}</h2>
        <p>{copy.locationDescription}</p>
      </div>
    </section>
  );
}
