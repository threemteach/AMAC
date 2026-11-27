import { siteCredit } from "../../content/site";

export function SiteCredit({ className }: { className: string }) {
  return (
    <p className={className}>
      {siteCredit.label}{" "}
      <a href={siteCredit.href} target="_blank" rel="noopener noreferrer">{siteCredit.name}</a>
    </p>
  );
}
