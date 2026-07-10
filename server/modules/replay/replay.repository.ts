import { replayShellFixtures } from "../../data/fixtures/replay-fixtures";
import { notImplemented } from "../../errors/AppError";

export async function getReplayFixtures() {
  return replayShellFixtures;
}

export async function findReplayFixtureById(replayId: string) {
  return replayShellFixtures.find((replay) => replay.id === replayId) ?? null;
}

export async function buildReplayFromPersistence() {
  throw notImplemented("Decision replay reconstruction is not implemented.");
}

