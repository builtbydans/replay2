import { recommendations } from "@/data/fixtures/clinical-fixtures";
import type {
  CreateDecisionRequestDto,
  RecommendationListResponseDto,
} from "@/types/dto.types";

export async function getRecommendationShell(): Promise<RecommendationListResponseDto> {
  // LEARNING:
  // Recommendation variants need exhaustive handling and runtime validation later.
  return {
    source: "synthetic-fixture",
    recommendations,
  };
}

export async function createClinicianDecisionShell(
  _request: CreateDecisionRequestDto,
): Promise<never> {
  void _request;

  throw new Error(
    "Recommendation decision workflow is deliberately not implemented.",
  );
}
