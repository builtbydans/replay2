import type {
  Encounter,
  Clinician,
  Patient,
  PatientPriority,
  PatientRecord,
  PatientStatus,
  Recommendation,
  ReplayCase,
} from "@/types/clinical.types";
import type { DashboardShellDto } from "@/types/dashboard.types";

export interface PatientQueueRequestDto {
  search?: string;
  statuses?: PatientStatus[];
  priorities?: PatientPriority[];
}

export interface PatientQueueResponseDto {
  source: "synthetic-fixture";
  patients: Patient[];
  clinicians: Clinician[];
}

export interface PatientRecordResponseDto {
  source: "synthetic-fixture";
  record: PatientRecord | null;
}

export interface EncounterResponseDto {
  source: "synthetic-fixture";
  encounter: Encounter | null;
}

export interface RecommendationListResponseDto {
  source: "synthetic-fixture";
  recommendations: Recommendation[];
}

export interface ReplayListResponseDto {
  source: "synthetic-fixture";
  replays: ReplayCase[];
}

export interface ReplayDetailResponseDto {
  source: "synthetic-fixture";
  replay: ReplayCase | null;
}

export type DashboardResponseDto = DashboardShellDto;

export interface CreateDecisionRequestDto {
  recommendationId: string;
  decision: "ACCEPTED" | "REJECTED" | "MODIFIED" | "ESCALATED";
  rationale: string;
}
