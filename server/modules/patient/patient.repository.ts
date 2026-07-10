import { patientShellFixtures } from "../../data/fixtures/replay-fixtures";

export async function getPatientFixtures() {
  return patientShellFixtures;
}

export async function findPatientFixtureById(patientId: string) {
  return patientShellFixtures.find((patient) => patient.id === patientId) ?? null;
}

