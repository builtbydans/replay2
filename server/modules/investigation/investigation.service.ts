import { notImplemented } from "../../errors/AppError";

export async function listInvestigationsForEncounter(encounterId: string) {
  throw notImplemented(
    `Investigation retrieval is not implemented. Requested encounter: ${encounterId}`,
  );
}

