import { notFound } from "next/navigation";

import { PatientRecord } from "@/components/patients/patient-record";
import { getPatientRecordShell } from "@/services/patient.service";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PatientPage({ params }: Props) {
  const { id } = await params;
  const response = await getPatientRecordShell(id);

  if (!response.record) {
    notFound();
  }

  return <PatientRecord record={response.record} />;
}

