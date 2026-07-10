import {
  clinicians,
  patientRecords,
  patients,
} from "@/data/fixtures/clinical-fixtures";
import type {
  PatientQueueRequestDto,
  PatientQueueResponseDto,
  PatientRecordResponseDto,
} from "@/types/dto.types";

export async function getPatientQueueShell(
  _request?: PatientQueueRequestDto,
): Promise<PatientQueueResponseDto> {
  void _request;

  // LEARNING:
  // Search, filtering, grouping and sorting controls are visual for now.
  // Decide which values are derived at render time and which should come from the API.
  return {
    source: "synthetic-fixture",
    patients,
    clinicians,
  };
}

export async function getPatientRecordShell(
  patientId: string,
): Promise<PatientRecordResponseDto> {
  return {
    source: "synthetic-fixture",
    record:
      patientRecords.find((record) => record.patient.id === patientId) ?? null,
  };
}
