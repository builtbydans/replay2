import { notFound } from "next/navigation";

import { ClinicalConsultShell } from "@/components/clinical-chat/clinical-consult-shell";
import { getPatientRecordShell } from "@/services/patient.service";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ClinicalConsultPage({ params }: Props) {
  const { id } = await params;
  const response = await getPatientRecordShell(id);

  if (!response.record) {
    notFound();
  }

  return <ClinicalConsultShell record={response.record} />;
}

