import { AboutPage, getAboutMetadata } from "../../../components/about/about-page";

export const metadata = getAboutMetadata("en");

export default function Page() {
  return <AboutPage locale="en" />;
}
