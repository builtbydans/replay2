import { AppError } from "../../errors/AppError";
import { findReplayFixtureById, getReplayFixtures } from "./replay.repository";

export async function getReplayShellList() {
  return getReplayFixtures();
}

export async function getReplayShellById(replayId: string) {
  const replay = await findReplayFixtureById(replayId);

  if (!replay) {
    throw new AppError("Synthetic replay not found", 404, "REPLAY_NOT_FOUND");
  }

  return replay;
}

