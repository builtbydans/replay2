import type { CreateRecommendationDto } from "../../types/api.types";
import { notImplemented } from "../../errors/AppError";
import { getRecommendationFixtures } from "./recommendation.repository";

export async function getRecommendationShellList() {
  // LEARNING:
  // Recommendation variants, state transitions, validation and authorisation are future work.
  return getRecommendationFixtures();
}

export async function createRecommendationShell(
  _request: CreateRecommendationDto,
) {
  throw notImplemented(
    "AI recommendation generation and persistence are deliberately not implemented.",
  );
}

