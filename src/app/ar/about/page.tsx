import { AboutPage, getAboutMetadata } from "../../../components/about/about-page";

export const metadata = getAboutMetadata("ar");

export default function Page() {
  return <AboutPage locale="ar" />;
}
