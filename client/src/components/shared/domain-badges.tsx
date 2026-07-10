import { Badge } from "@/components/ui/badge";
import {
  PATIENT_PRIORITY_LABELS,
  PATIENT_STATUS_LABELS,
  PRIORITY_BADGE_CLASSES,
  RECOMMENDATION_STATUS_LABELS,
  RECOMMENDATION_TYPE_LABELS,
  STATUS_BADGE_CLASSES,
} from "@/constants/status";
import { cn } from "@/lib/utils";
import type {
  PatientPriority,
  PatientStatus,
  RecommendationStatus,
  RecommendationType,
} from "@/types/clinical.types";

export function PatientStatusBadge({ status }: { status: PatientStatus }) {
  return (
    <Badge variant="outline" className={cn("whitespace-nowrap", STATUS_BADGE_CLASSES[status])}>
      {PATIENT_STATUS_LABELS[status]}
    </Badge>
  );
}

export function PriorityBadge({ priority }: { priority: PatientPriority }) {
  return (
    <Badge
      variant="outline"
      className={cn("whitespace-nowrap", PRIORITY_BADGE_CLASSES[priority])}
    >
      {PATIENT_PRIORITY_LABELS[priority]}
    </Badge>
  );
}

export function RecommendationTypeBadge({
  type,
}: {
  type: RecommendationType;
}) {
  return (
    <Badge variant="secondary" className="whitespace-nowrap">
      {RECOMMENDATION_TYPE_LABELS[type]}
    </Badge>
  );
}

export function RecommendationStatusBadge({
  status,
}: {
  status: RecommendationStatus;
}) {
  const statusClass =
    status === "ACCEPTED"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-200"
      : status === "ESCALATED"
        ? "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-200"
        : status === "REJECTED"
          ? "border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          : "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800 dark:bg-sky-950 dark:text-sky-200";

  return (
    <Badge variant="outline" className={cn("whitespace-nowrap", statusClass)}>
      {RECOMMENDATION_STATUS_LABELS[status]}
    </Badge>
  );
}
