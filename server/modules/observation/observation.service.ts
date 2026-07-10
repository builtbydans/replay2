import { notImplemented } from "../../errors/AppError";

export async function listObservationsForEncounter(encounterId: string) {
  throw notImplemented(
    `Observation retrieval is not implemented. Requested encounter: ${encounterId}`,
  );
}

