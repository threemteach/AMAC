import { getJournalMetadata, JournalPage } from "../../../components/journal/journal-page";

export function generateMetadata() { return getJournalMetadata("ar"); }

export default function Page() {
  return <JournalPage locale="ar" />;
}
