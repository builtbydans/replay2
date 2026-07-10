export type PatientStatus =
  | "WAITING"
  | "UNDER_ASSESSMENT"
  | "AWAITING_INVESTIGATION"
  | "AWAITING_RESULTS"
  | "AWAITING_DIAGNOSIS"
  | "AWAITING_DISCHARGE"
  | "DISCHARGED";

export type PatientPriority = "ROUTINE" | "STANDARD" | "URGENT" | "IMMEDIATE";

export type RecommendationType =
  | "INVESTIGATION"
  | "DIAGNOSIS"
  | "ESCALATION"
  | "DISCHARGE";

export interface PatientShellDto {
  id: string;
  fullName: string;
  status: PatientStatus;
  priority: PatientPriority;
  waitingMinutes: number;
  assignedClinician: string | null;
  presentingComplaint: string;
}

export interface DashboardShellDto {
  source: "synthetic-fixture";
  patientsWaiting: number;
  urgentCases: number;
  averageWaitingMinutes: number;
  queue: PatientShellDto[];
}

export interface RecommendationShellDto {
  id: string;
  encounterId: string;
  type: RecommendationType;
  summary: string;
  status: "DRAFT" | "PRESENTED" | "ACCEPTED" | "REJECTED" | "MODIFIED" | "ESCALATED";
}

export interface ReplayShellDto {
  id: string;
  encounterId: string;
  title: string;
  status: "SHELL_ONLY";
}

