import { notImplemented } from "../../errors/AppError";

export async function getClinicalNotesFromSupabase(encounterId: string) {
  throw notImplemented(
    `Supabase clinical note query is not implemented. Requested encounter: ${encounterId}`,
  );
}

