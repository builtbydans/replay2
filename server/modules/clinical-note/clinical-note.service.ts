import { notImplemented } from "../../errors/AppError";

export async function listClinicalNotesForEncounter(encounterId: string) {
  throw notImplemented(
    `Clinical note retrieval is not implemented. Requested encounter: ${encounterId}`,
  );
}

