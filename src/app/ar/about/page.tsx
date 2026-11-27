import { AboutPage, getAboutMetadata } from "../../../components/about/about-page";

export function generateMetadata() { return getAboutMetadata("ar"); }

export default function Page() {
  return <AboutPage locale="ar" />;
}
