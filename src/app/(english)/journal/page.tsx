import { getJournalMetadata, JournalPage } from "../../../components/journal/journal-page";

export function generateMetadata() { return getJournalMetadata("en"); }

export default function Page() {
  return <JournalPage locale="en" />;
}
