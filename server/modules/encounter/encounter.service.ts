import { notImplemented } from "../../errors/AppError";

export async function getEncounterShellById(encounterId: string) {
  throw notImplemented(
    `Encounter persistence is not implemented. Requested encounter: ${encounterId}`,
  );
}

