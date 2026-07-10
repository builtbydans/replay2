import { notImplemented } from "../../errors/AppError";

export async function getAuditShellForEncounter(encounterId: string) {
  throw notImplemented(
    `Audit retrieval is not implemented. Requested encounter: ${encounterId}`,
  );
}

export async function createAuditEventPlaceholder() {
  throw notImplemented("Audit event creation is not implemented.");
}

