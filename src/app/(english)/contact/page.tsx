import { ContactPage, getContactMetadata } from "../../../components/contact/contact-page";

export const metadata = getContactMetadata("en");

export default function Page() {
  return <ContactPage locale="en" />;
}
