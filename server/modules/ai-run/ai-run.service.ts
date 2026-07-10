import { notImplemented } from "../../errors/AppError";

export async function getAiRunShellById(aiRunId: string) {
  throw notImplemented(
    `AI run retrieval is not implemented. Requested AI run: ${aiRunId}`,
  );
}

