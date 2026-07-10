import { notImplemented } from "../../errors/AppError";

export async function listDiagnosesForEncounter(encounterId: string) {
  throw notImplemented(
    `Diagnosis retrieval is not implemented. Requested encounter: ${encounterId}`,
  );
}

