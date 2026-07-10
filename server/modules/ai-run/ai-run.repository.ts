import { notImplemented } from "../../errors/AppError";

export async function getAiRunByIdFromSupabase(aiRunId: string) {
  throw notImplemented(
    `Supabase AI run query is not implemented. Requested AI run: ${aiRunId}`,
  );
}

