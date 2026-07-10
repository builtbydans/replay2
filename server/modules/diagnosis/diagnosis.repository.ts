import { notImplemented } from "../../errors/AppError";

export async function getDiagnosesFromSupabase(encounterId: string) {
  throw notImplemented(
    `Supabase diagnosis query is not implemented. Requested encounter: ${encounterId}`,
  );
}

