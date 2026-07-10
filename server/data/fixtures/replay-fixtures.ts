import type {
  DashboardShellDto,
  PatientShellDto,
  RecommendationShellDto,
  ReplayShellDto,
} from "../../types/clinical.types";

export const patientShellFixtures: PatientShellDto[] = [
  {
    id: "pat-001",
    fullName: "Amara Finch",
    status: "WAITING",
    priority: "IMMEDIATE",
    waitingMinutes: 54,
    assignedClinician: null,
    presentingComplaint: "Chest tightness with nausea",
  },
  {
    id: "pat-002",
    fullName: "Leo Marr",
    status: "UNDER_ASSESSMENT",
    priority: "URGENT",
    waitingMinutes: 78,
    assignedClinician: "Jonah Brooks",
    presentingComplaint: "Shortness of breath after viral illness",
  },
  {
    id: "pat-005",
    fullName: "Mina Hart",
    status: "AWAITING_DIAGNOSIS",
    priority: "STANDARD",
    waitingMinutes: 212,
    assignedClinician: "Jonah Brooks",
    presentingComplaint: "Dizziness and blurred vision",
  },
];

export const dashboardShellFixture: DashboardShellDto = {
  source: "synthetic-fixture",
  patientsWaiting: 1,
  urgentCases: 2,
  averageWaitingMinutes: 140,
  queue: patientShellFixtures,
};

export const recommendationShellFixtures: RecommendationShellDto[] = [
  {
    id: "rec-001",
    encounterId: "enc-001",
    type: "INVESTIGATION",
    summary: "Consider serial ECG and troponin assessment.",
    status: "PRESENTED",
  },
  {
    id: "rec-002",
    encounterId: "enc-002",
    type: "ESCALATION",
    summary: "Escalate respiratory review if oxygen requirement persists.",
    status: "ESCALATED",
  },
];

export const replayShellFixtures: ReplayShellDto[] = [
  {
    id: "replay-001",
    encounterId: "enc-002",
    title: "Respiratory escalation decision",
    status: "SHELL_ONLY",
  },
];

