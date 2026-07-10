import { notImplemented } from "../../errors/AppError";

export async function getReceiptShellById(receiptId: string) {
  throw notImplemented(
    `Verification receipt retrieval is not implemented. Requested receipt: ${receiptId}`,
  );
}

