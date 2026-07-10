import { notImplemented } from "../../errors/AppError";

export async function getInvestigationsFromSupabase(encounterId: string) {
  throw notImplemented(
    `Supabase investigation query is not implemented. Requested encounter: ${encounterId}`,
  );
}

