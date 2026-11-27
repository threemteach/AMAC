import { ContactPage, getContactMetadata } from "../../../components/contact/contact-page";

export const metadata = getContactMetadata("ar");

export default function Page() {
  return <ContactPage locale="ar" />;
}
