import { notImplemented } from "../../errors/AppError";

export async function getReceiptByIdFromSupabase(receiptId: string) {
  throw notImplemented(
    `Supabase receipt query is not implemented. Requested receipt: ${receiptId}`,
  );
}

