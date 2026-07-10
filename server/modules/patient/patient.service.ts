import { AppError } from "../../errors/AppError";
import {
  findPatientFixtureById,
  getPatientFixtures,
} from "./patient.repository";

export async function getPatientShellList() {
  // LEARNING:
  // Queue filtering, grouping, sorting and lookup performance are left for implementation.
  return getPatientFixtures();
}

export async function getPatientShellById(patientId: string) {
  const patient = await findPatientFixtureById(patientId);

  if (!patient) {
    throw new AppError("Synthetic patient not found", 404, "PATIENT_NOT_FOUND");
  }

  return patient;
}

