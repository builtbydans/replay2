import { notFound } from "next/navigation";

import { EncounterRecord } from "@/components/encounters/encounter-record";
import { PageHeader, PageShell } from "@/components/shared/page-shell";
import { SyntheticDataNotice } from "@/components/shared/synthetic-data-notice";
import { getEncounterShell } from "@/services/encounter.service";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EncounterPage({ params }: Props) {
  const { id } = await params;
  const response = await getEncounterShell(id);

  if (!response.encounter) {
    notFound();
  }

  return (
    <PageShell>
      <PageHeader
        eyebrow="Encounter record"
        title={response.encounter.reasonForAttendance}
        description="A standalone view of the encounter sections used inside patient records and future replay reconstruction."
      />
      <SyntheticDataNotice compact />
      <EncounterRecord encounter={response.encounter} />
    </PageShell>
  );
}

