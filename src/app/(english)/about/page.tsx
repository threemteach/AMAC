import { AboutPage, getAboutMetadata } from "../../../components/about/about-page";

export function generateMetadata() { return getAboutMetadata("en"); }

export default function Page() {
  return <AboutPage locale="en" />;
}
