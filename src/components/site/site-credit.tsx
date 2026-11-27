import type { Locale } from "../../content/locale";
import { siteCredit } from "../../content/site";

export function SiteCredit({ className, locale }: { className: string; locale: Locale }) {
  return (
    <p className={className}>
      {locale === "ar" ? "تصميم وتنفيذ" : siteCredit.label}{" "}
      <a dir="ltr" href={siteCredit.href} target="_blank" rel="noopener noreferrer">{siteCredit.name}</a>
    </p>
  );
}
