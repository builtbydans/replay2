export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface CreateDecisionDto {
  recommendationId: string;
  decision: "ACCEPTED" | "REJECTED" | "MODIFIED" | "ESCALATED";
  rationale: string;
}

export interface CreateRecommendationDto {
  encounterId: string;
  type: string;
  summary: string;
}

