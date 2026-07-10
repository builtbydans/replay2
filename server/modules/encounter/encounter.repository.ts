import { notImplemented } from "../../errors/AppError";

export async function getEncounterByIdFromSupabase(encounterId: string) {
  throw notImplemented(
    `Supabase encounter query is not implemented. Requested encounter: ${encounterId}`,
  );
}

