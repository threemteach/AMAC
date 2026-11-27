import { getJournalMetadata, JournalPage } from "../../../components/journal/journal-page";

export const metadata = getJournalMetadata("ar");

export default function Page() {
  return <JournalPage locale="ar" />;
}
