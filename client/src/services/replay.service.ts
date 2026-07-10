import { replayCases } from "@/data/fixtures/clinical-fixtures";
import type {
  ReplayDetailResponseDto,
  ReplayListResponseDto,
} from "@/types/dto.types";

export async function getReplayListShell(): Promise<ReplayListResponseDto> {
  return {
    source: "synthetic-fixture",
    replays: replayCases,
  };
}

export async function getReplayShell(
  replayId: string,
): Promise<ReplayDetailResponseDto> {
  return {
    source: "synthetic-fixture",
    replay: replayCases.find((replay) => replay.id === replayId) ?? null,
  };
}

