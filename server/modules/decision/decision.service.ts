import { notImplemented } from "../../errors/AppError";
import type { CreateDecisionDto } from "../../types/api.types";

export async function createDecisionShell(_request: CreateDecisionDto) {
  // LEARNING:
  // A real decision may require related writes, audit records, idempotency and permissions.
  throw notImplemented(
    "Clinician decision workflow is deliberately not implemented.",
  );
}

