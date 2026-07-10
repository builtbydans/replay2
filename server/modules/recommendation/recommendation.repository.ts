import { recommendationShellFixtures } from "../../data/fixtures/replay-fixtures";
import { notImplemented } from "../../errors/AppError";

export async function getRecommendationFixtures() {
  return recommendationShellFixtures;
}

export async function insertRecommendationPlaceholder() {
  throw notImplemented("Recommendation insert query is not implemented.");
}

