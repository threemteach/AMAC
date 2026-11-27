import { ContactPage, getContactMetadata } from "../../../components/contact/contact-page";
import { readEnquiryKind } from "../../../content/enquiry-routes";

export function generateMetadata() { return getContactMetadata("ar"); }

export default async function Page({ searchParams }: PageProps<"/ar/contact">) {
  return <ContactPage locale="ar" kind={readEnquiryKind((await searchParams).type)} />;
}
