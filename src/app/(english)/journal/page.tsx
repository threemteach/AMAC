import { getJournalMetadata, JournalPage } from "../../../components/journal/journal-page";

export const metadata = getJournalMetadata("en");

export default function Page() {
  return <JournalPage locale="en" />;
}
