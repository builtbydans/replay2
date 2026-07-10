import { notImplemented } from "../../errors/AppError";

export async function getAuditEventsFromSupabase(encounterId: string) {
  throw notImplemented(
    `Supabase audit query is not implemented. Requested encounter: ${encounterId}`,
  );
}

export async function insertAuditEventPlaceholder() {
  throw notImplemented("Audit insert query is not implemented.");
}

