import type { PatientPriority, PatientStatus } from "@/types/clinical.types";

export interface DashboardStatusMetric {
  status: PatientStatus;
  label: string;
  count: number;
}

export interface DashboardPriorityMetric {
  priority: PatientPriority;
  label: string;
  count: number;
}

export interface DashboardActivityItem {
  id: string;
  timestamp: string;
  title: string;
  detail: string;
  actor: string;
}

export interface DashboardQueueItem {
  patientId: string;
  encounterId: string;
  patientName: string;
  status: PatientStatus;
  priority: PatientPriority;
  waitingMinutes: number;
  assignedClinician: string;
  presentingComplaint: string;
}

export interface DashboardThroughputPoint {
  label: string;
  arrivals: number;
  discharged: number;
}

export interface DashboardShellDto {
  source: "synthetic-fixture";
  generatedAt: string;
  patientsWaiting: number;
  patientsUnderAssessment: number;
  patientsAwaitingInvestigation: number;
  patientsAwaitingDiagnosis: number;
  patientsAwaitingDischarge: number;
  urgentCases: number;
  averageWaitingMinutes: number;
  statusMetrics: DashboardStatusMetric[];
  priorityMetrics: DashboardPriorityMetric[];
  recentActivity: DashboardActivityItem[];
  currentQueue: DashboardQueueItem[];
  throughput: DashboardThroughputPoint[];
}

