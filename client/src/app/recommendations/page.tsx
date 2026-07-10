import { RecommendationBoard } from "@/components/recommendations/recommendation-board";
import { getRecommendationShell } from "@/services/recommendation.service";

export default async function RecommendationsPage() {
  const response = await getRecommendationShell();

  return <RecommendationBoard recommendations={response.recommendations} />;
}

