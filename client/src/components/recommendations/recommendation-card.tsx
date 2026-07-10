import {
  AlertTriangleIcon,
  BrainIcon,
  FileTextIcon,
  ShieldAlertIcon,
} from "lucide-react";

import { RecommendationActions } from "@/components/recommendations/recommendation-actions";
import {
  RecommendationStatusBadge,
  RecommendationTypeBadge,
} from "@/components/shared/domain-badges";
import { Badge } from "@/components/ui/badge";
import type { Recommendation } from "@/types/clinical.types";
import { formatDateTime } from "@/utils/time";

function getVariantDetail(recommendation: Recommendation): string {
  switch (recommendation.type) {
    case "INVESTIGATION":
      return recommendation.investigationFocus;
    case "DIAGNOSIS":
      return recommendation.suspectedDiagnosis;
    case "ESCALATION":
      return recommendation.escalationTarget;
    case "DISCHARGE":
      return recommendation.dischargeCriteria.join(", ");
    default: {
      const neverRecommendation: never = recommendation;
      return neverRecommendation;
    }
  }
}

export function RecommendationCard({
  recommendation,
  compact = false,
}: {
  recommendation: Recommendation;
  compact?: boolean;
}) {
  return (
    <article className="replay-panel overflow-hidden">
      <div className="border-b border-[var(--replay-border)] bg-white px-5 py-4 dark:bg-slate-950">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <RecommendationTypeBadge type={recommendation.type} />
              <RecommendationStatusBadge status={recommendation.status} />
              <Badge variant="outline" className="border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
                {formatDateTime(recommendation.createdAt)}
              </Badge>
            </div>
            <h3 className="mt-3 text-lg font-semibold text-slate-950 dark:text-slate-50">
              {recommendation.summary}
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              {getVariantDetail(recommendation)}
            </p>
          </div>

          <div className="flex min-w-28 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-center dark:border-slate-800 dark:bg-slate-900">
            <div>
              <div className="flex items-center justify-center gap-1 text-slate-800 dark:text-slate-100">
                <BrainIcon className="size-4" />
                <span className="font-mono text-xl font-semibold">
                  {Math.round(recommendation.confidence * 100)}%
                </span>
              </div>
              <p className="text-[11px] text-slate-500">confidence</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 p-4 xl:grid-cols-[1fr_1fr_0.9fr]">
        <EvidenceColumn
          icon={<FileTextIcon />}
          title="Supporting evidence"
          items={recommendation.supportingEvidence}
        />
        <EvidenceColumn
          icon={<ShieldAlertIcon />}
          title="Uncertainty and risk"
          items={recommendation.risksOrUncertainty}
        />
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
          <div className="flex items-center gap-2 text-sm font-medium">
            <AlertTriangleIcon className="size-4 text-amber-600" />
            Proposed clinician action
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-200">
            {recommendation.proposedAction}
          </p>
        </div>
      </div>

      {!compact ? (
        <div className="border-t border-[var(--replay-border)] bg-[var(--replay-panel-muted)] px-4 py-3">
          <RecommendationActions recommendation={recommendation} />
        </div>
      ) : null}
    </article>
  );
}

function EvidenceColumn({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium">
        <span className="[&_svg]:size-4 [&_svg]:text-slate-500">{icon}</span>
        {title}
      </div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={item} className="replay-evidence">
            <div className="flex gap-3">
              <span className="font-mono text-xs text-slate-400">
                #{index + 1}
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-200">
                {item}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
