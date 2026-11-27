import type { Locale } from "../../content/locale";
import { creditLabels, siteCredit } from "../../content/site";

export function SiteCredit({ className, locale }: { className: string; locale: Locale }) {
  return (
    <p className={className}>
      {creditLabels[locale]}{" "}
      <a dir="ltr" href={siteCredit.href} target="_blank" rel="noopener noreferrer">{siteCredit.name}</a>
    </p>
  );
}
