import { PageHeader, PageShell } from "@/components/shared/page-shell";
import { SyntheticDataNotice } from "@/components/shared/synthetic-data-notice";
import { RecommendationCard } from "@/components/recommendations/recommendation-card";
import type { Recommendation } from "@/types/clinical.types";

export function RecommendationBoard({
  recommendations,
}: {
  recommendations: Recommendation[];
}) {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Recommendation governance"
        title="Clinician-controlled recommendations"
        description="Synthetic recommendation envelopes showing evidence, uncertainty, proposed action and decision state. Buttons are intentionally non-mutating."
      />
      <SyntheticDataNotice />
      <section className="grid gap-4">
        {recommendations.map((recommendation) => (
          <RecommendationCard
            key={recommendation.id}
            recommendation={recommendation}
          />
        ))}
      </section>
    </PageShell>
  );
}
