import { PatientQueueShell } from "@/components/patients/patient-queue-shell";
import { getPatientQueueShell } from "@/services/patient.service";

export default async function PatientsPage() {
  const response = await getPatientQueueShell();

  return (
    <PatientQueueShell
      patients={response.patients}
      clinicians={response.clinicians}
    />
  );
}
