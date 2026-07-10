import { notImplemented } from "../../errors/AppError";

export async function getObservationsFromSupabase(encounterId: string) {
  throw notImplemented(
    `Supabase observation query is not implemented. Requested encounter: ${encounterId}`,
  );
}

