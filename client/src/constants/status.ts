import type {
  InvestigationStatus,
  PatientPriority,
  PatientStatus,
  RecommendationStatus,
  RecommendationType,
} from "@/types/clinical.types";

export const PATIENT_STATUS_LABELS: Record<PatientStatus, string> = {
  WAITING: "Waiting",
  UNDER_ASSESSMENT: "Under assessment",
  AWAITING_INVESTIGATION: "Awaiting investigation",
  AWAITING_RESULTS: "Awaiting results",
  AWAITING_DIAGNOSIS: "Awaiting diagnosis",
  AWAITING_DISCHARGE: "Awaiting discharge",
  DISCHARGED: "Discharged",
};

export const PATIENT_PRIORITY_LABELS: Record<PatientPriority, string> = {
  ROUTINE: "Routine",
  STANDARD: "Standard",
  URGENT: "Urgent",
  IMMEDIATE: "Immediate",
};

export const PATIENT_STATUS_OPTIONS = Object.entries(PATIENT_STATUS_LABELS).map(
  ([value, label]) => ({ value: value as PatientStatus, label }),
);

export const PATIENT_PRIORITY_OPTIONS = Object.entries(
  PATIENT_PRIORITY_LABELS,
).map(([value, label]) => ({ value: value as PatientPriority, label }));

export const STATUS_BADGE_CLASSES: Record<PatientStatus, string> = {
  WAITING:
    "border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200",
  UNDER_ASSESSMENT:
    "border-cyan-300 bg-cyan-50 text-cyan-800 dark:border-cyan-800 dark:bg-cyan-950 dark:text-cyan-200",
  AWAITING_INVESTIGATION:
    "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200",
  AWAITING_RESULTS:
    "border-violet-300 bg-violet-50 text-violet-800 dark:border-violet-800 dark:bg-violet-950 dark:text-violet-200",
  AWAITING_DIAGNOSIS:
    "border-orange-300 bg-orange-50 text-orange-800 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-200",
  AWAITING_DISCHARGE:
    "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
  DISCHARGED:
    "border-zinc-300 bg-zinc-50 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200",
};

export const PRIORITY_BADGE_CLASSES: Record<PatientPriority, string> = {
  ROUTINE:
    "border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200",
  STANDARD:
    "border-blue-300 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200",
  URGENT:
    "border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200",
  IMMEDIATE:
    "border-red-300 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200",
};

export const INVESTIGATION_STATUS_LABELS: Record<InvestigationStatus, string> = {
  REQUESTED: "Requested",
  IN_PROGRESS: "In progress",
  RESULTED: "Resulted",
  CANCELLED: "Cancelled",
};

export const RECOMMENDATION_TYPE_LABELS: Record<RecommendationType, string> = {
  INVESTIGATION: "Investigation",
  DIAGNOSIS: "Diagnosis",
  ESCALATION: "Escalation",
  DISCHARGE: "Discharge",
};

export const RECOMMENDATION_STATUS_LABELS: Record<
  RecommendationStatus,
  string
> = {
  DRAFT: "Draft",
  PRESENTED: "Presented",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
  MODIFIED: "Modified",
  ESCALATED: "Escalated",
};

