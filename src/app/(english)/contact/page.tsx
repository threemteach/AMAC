import { ContactPage, getContactMetadata } from "../../../components/contact/contact-page";
import { readEnquiryKind } from "../../../content/enquiry-routes";

export function generateMetadata() { return getContactMetadata("en"); }

export default async function Page({ searchParams }: PageProps<"/contact">) {
  return <ContactPage locale="en" kind={readEnquiryKind((await searchParams).type)} />;
}
