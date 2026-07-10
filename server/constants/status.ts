import type { PatientPriority, PatientStatus } from "../types/clinical.types";

export const PATIENT_STATUSES: PatientStatus[] = [
  "WAITING",
  "UNDER_ASSESSMENT",
  "AWAITING_INVESTIGATION",
  "AWAITING_RESULTS",
  "AWAITING_DIAGNOSIS",
  "AWAITING_DISCHARGE",
  "DISCHARGED",
];

export const PATIENT_PRIORITIES: PatientPriority[] = [
  "ROUTINE",
  "STANDARD",
  "URGENT",
  "IMMEDIATE",
];

