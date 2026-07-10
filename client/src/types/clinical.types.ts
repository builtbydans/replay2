export type PatientStatus =
  | "WAITING"
  | "UNDER_ASSESSMENT"
  | "AWAITING_INVESTIGATION"
  | "AWAITING_RESULTS"
  | "AWAITING_DIAGNOSIS"
  | "AWAITING_DISCHARGE"
  | "DISCHARGED";

export type PatientPriority = "ROUTINE" | "STANDARD" | "URGENT" | "IMMEDIATE";

export type EncounterStatus =
  | "OPEN"
  | "ASSESSING"
  | "INVESTIGATING"
  | "DIAGNOSING"
  | "DISCHARGE_READY"
  | "CLOSED";

export type InvestigationStatus =
  | "REQUESTED"
  | "IN_PROGRESS"
  | "RESULTED"
  | "CANCELLED";

export type RecommendationStatus =
  | "DRAFT"
  | "PRESENTED"
  | "ACCEPTED"
  | "REJECTED"
  | "MODIFIED"
  | "ESCALATED";

export type RecommendationType =
  | "INVESTIGATION"
  | "DIAGNOSIS"
  | "ESCALATION"
  | "DISCHARGE";

export type ClinicianDecisionType =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "MODIFIED"
  | "ESCALATED";

export type AuditEventType =
  | "PATIENT_REGISTERED"
  | "OBSERVATION_RECORDED"
  | "INVESTIGATION_REQUESTED"
  | "AI_RUN_CREATED"
  | "RECOMMENDATION_PRESENTED"
  | "CLINICIAN_DECISION_RECORDED"
  | "REPLAY_REVIEWED"
  | "RECEIPT_ATTACHED";

export interface Clinician {
  id: string;
  name: string;
  role: string;
}

export interface Patient {
  id: string;
  nhsNumber: string;
  fullName: string;
  age: number;
  sex: "Female" | "Male" | "Other";
  status: PatientStatus;
  priority: PatientPriority;
  arrivalTime: string;
  waitingMinutes: number;
  assignedClinicianId: string | null;
  presentingComplaint: string;
  location: string;
  currentEncounterId: string;
  demoOnly: true;
}

export interface Observation {
  id: string;
  encounterId: string;
  recordedAt: string;
  label: string;
  value: string;
  interpretation: "normal" | "borderline" | "abnormal" | "critical";
}

export interface Investigation {
  id: string;
  encounterId: string;
  name: string;
  status: InvestigationStatus;
  requestedAt: string;
  resultedAt: string | null;
  summary: string;
}

export interface Diagnosis {
  id: string;
  encounterId: string;
  label: string;
  certainty: "possible" | "working" | "confirmed" | "excluded";
  recordedAt: string;
}

export interface ClinicalNote {
  id: string;
  encounterId: string;
  author: string;
  authoredAt: string;
  noteType: "triage" | "assessment" | "handover" | "discharge";
  body: string;
}

export interface AiRun {
  id: string;
  encounterId: string;
  modelLabel: string;
  status: "NOT_STARTED" | "COMPLETED" | "FAILED";
  requestedBy: string;
  createdAt: string;
  completedAt: string | null;
  inputSummary: string;
  limitations: string[];
}

interface RecommendationBase {
  id: string;
  encounterId: string;
  aiRunId: string;
  status: RecommendationStatus;
  summary: string;
  supportingEvidence: string[];
  confidence: number;
  risksOrUncertainty: string[];
  proposedAction: string;
  createdAt: string;
}

export interface InvestigationRecommendation extends RecommendationBase {
  type: "INVESTIGATION";
  investigationFocus: string;
}

export interface DiagnosisRecommendation extends RecommendationBase {
  type: "DIAGNOSIS";
  suspectedDiagnosis: string;
}

export interface EscalationRecommendation extends RecommendationBase {
  type: "ESCALATION";
  escalationTarget: string;
}

export interface DischargeRecommendation extends RecommendationBase {
  type: "DISCHARGE";
  dischargeCriteria: string[];
}

export type Recommendation =
  | InvestigationRecommendation
  | DiagnosisRecommendation
  | EscalationRecommendation
  | DischargeRecommendation;

export interface ClinicianDecision {
  id: string;
  recommendationId: string;
  clinicianId: string;
  decision: ClinicianDecisionType;
  rationale: string;
  decidedAt: string | null;
}

export interface VerificationReceipt {
  id: string;
  aiRunId: string;
  receiptHash: string;
  status: "PLACEHOLDER" | "PENDING_VERIFICATION" | "VERIFIED" | "FAILED";
  issuedAt: string | null;
  notes: string;
}

export interface AuditEvent {
  id: string;
  encounterId: string;
  type: AuditEventType;
  title: string;
  description: string;
  actor: string;
  occurredAt: string;
}

export interface Encounter {
  id: string;
  patientId: string;
  status: EncounterStatus;
  arrivedAt: string;
  closedAt: string | null;
  reasonForAttendance: string;
  acuity: PatientPriority;
  observations: Observation[];
  investigations: Investigation[];
  diagnoses: Diagnosis[];
  notes: ClinicalNote[];
  recommendations: Recommendation[];
  aiRuns: AiRun[];
  decisions: ClinicianDecision[];
  auditEvents: AuditEvent[];
}

export interface PatientRecord {
  patient: Patient;
  currentEncounter: Encounter;
  previousEncounters: Encounter[];
  assignedClinician: Clinician | null;
}

export interface ReplayCase {
  id: string;
  patientId: string;
  encounterId: string;
  title: string;
  patientContext: string;
  evidenceTimeline: AuditEvent[];
  aiRun: AiRun;
  recommendation: Recommendation;
  decision: ClinicianDecision;
  decisionRationale: string;
  laterReviewOutcome: string;
  verificationReceipt: VerificationReceipt;
  auditTimeline: AuditEvent[];
}

