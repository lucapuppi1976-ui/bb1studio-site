export type IncidentPersistenceMode = "dry-run" | "governance-evidence-review";
export type IncidentPersistenceSeverity = "info" | "watch" | "elevated" | "critical";
export type IncidentPersistencePriority = "low" | "medium" | "high" | "urgent";
export type IncidentPersistenceStatus =
  | "blocked"
  | "evidence-review-ready"
  | "manual-governance-ready"
  | "zero-write-persistence-plan-ready";

export type IncidentPersistenceLane =
  | "incident_persistence_governance"
  | "final_approval_evidence"
  | "persistence_boundary"
  | "evidence_vault"
  | "retention_review"
  | "rollback_plan"
  | "no_go_board"
  | "human_signoff";

export interface IncidentPersistenceInput {
  approvalEvidenceScore?: number;
  persistenceBoundaryScore?: number;
  evidenceVaultScore?: number;
  retentionReviewScore?: number;
  rollbackReadinessScore?: number;
  openGovernanceItemCount?: number;
  unresolvedPersistenceFindingCount?: number;
  unresolvedApprovalFindingCount?: number;
  reviewerRole?: string;
}

export interface IncidentPersistenceBoardItem {
  id: string;
  label: string;
  lane: IncidentPersistenceLane;
  score: number;
  severity: IncidentPersistenceSeverity;
  priority: IncidentPersistencePriority;
  question: string;
  requiredEvidence: string[];
  safeOutcome: string;
}

export interface IncidentPersistenceFindingItem {
  id: string;
  label: string;
  lane: IncidentPersistenceLane;
  severity: IncidentPersistenceSeverity;
  reason: string;
  manualResolution: string;
  blocksPersistenceActivation: boolean;
}

export const INCIDENT_PERSISTENCE_GOVERNANCE_GUARDRAIL = {
  onlineControlledGo: true,
  controlledDryRunProductionReady: true,
  incidentPersistenceGovernanceReady: true,
  finalApprovalEvidenceReady: true,
  persistenceBoundaryReady: true,
  evidenceVaultReady: true,
  rollbackReadinessReady: true,
  providerAiReady: false,
  persistenceReady: false,
  memoryPersistenceReady: false,
  automaticTaskCreationReady: false,
  automaticInterventionCreationReady: false,
  automaticExecutionReady: false,
  providerCalled: false,
  persistencePerformed: false,
  memoryPersistencePerformed: false,
  taskCreated: false,
  interventionCreated: false,
  automaticExecutionPerformed: false,
  publicSharePerformed: false,
  productPrescriptionPerformed: false,
  dosageAdvicePerformed: false,
  automaticTaskCreationAllowed: false,
  automaticInterventionCreationAllowed: false,
  automaticExecutionAllowed: false,
  dbPersistenceAllowed: false,
  memoryPersistenceAllowed: false,
  publicShareAllowed: false,
  productPrescriptionAllowed: false,
  dosageAdviceAllowed: false,
  incidentRecordPersistenceAllowed: false,
  incidentRecordPersistencePerformed: false,
  incidentRecordWriteAllowed: false,
  incidentRecordWritePerformed: false,
  incidentTimelineWriteAllowed: false,
  incidentTimelineWritePerformed: false,
  incidentAuditWriteAllowed: false,
  incidentAuditWritePerformed: false,
  incidentRetentionWriteAllowed: false,
  incidentRetentionWritePerformed: false,
  incidentClosureWriteAllowed: false,
  incidentClosureWritePerformed: false,
  incidentGovernanceFinalApprovalAllowed: false,
  incidentGovernanceFinalApprovalPerformed: false,
  reviewPersistenceAllowed: false,
  reviewPersistencePerformed: false,
  providerCallExecutionAllowed: false,
  providerCallExecutionPerformed: false,
  providerRequestDispatchAllowed: false,
  providerRequestDispatchPerformed: false,
  providerResponseIntakeAllowed: false,
  providerResponseIntakePerformed: false,
  providerResultPersistenceAllowed: false,
  providerResultPersistencePerformed: false,
  publicExportArtifactWriteAllowed: false,
  publicExportArtifactWritePerformed: false,
  operationalExecutionAllowed: false,
  operationalExecutionPerformed: false,
  executionCommandAllowed: false,
  executionCommandPerformed: false,
  schemaWriteAllowed: false,
  schemaWritePerformed: false,
  migrationExecutionAllowed: false,
  migrationExecutionPerformed: false,
  storageActivationAllowed: false,
  storageActivationPerformed: false,
  manualDispatchOnly: true,
  humanReviewRequired: true,
  localAnalysisOnly: true,
  redactedOutputOnly: true,
  localMemoryOnly: true,
  localLearningOnly: true,
  localPromotionOnly: true,
  localQualityOnly: true,
} as const;

export interface IncidentPersistenceReport {
  generatedAt: string;
  mode: IncidentPersistenceMode;
  context: Required<IncidentPersistenceInput>;
  readiness: typeof INCIDENT_PERSISTENCE_GOVERNANCE_GUARDRAIL;
  persistenceGovernanceScore: number;
  persistenceGovernanceStatus: IncidentPersistenceStatus;
  overallSeverity: IncidentPersistenceSeverity;
  approvalEvidenceBoard: IncidentPersistenceBoardItem[];
  persistenceBoundaryBoard: IncidentPersistenceBoardItem[];
  evidenceVaultBoard: IncidentPersistenceBoardItem[];
  rollbackReadinessBoard: IncidentPersistenceBoardItem[];
  noGoBoard: IncidentPersistenceBoardItem[];
  findings: IncidentPersistenceFindingItem[];
  stagedRoadmap: Record<"v181" | "v182" | "v183" | "v184" | "v185", string>;
  redactedExportBundle: {
    exportId: string;
    includesFieldIdentifiers: false;
    includesPrivateNotes: false;
    includesProviderPayloads: false;
    includesOperationalInternalData: false;
    includesProductionForecasts: false;
    includesProductRecommendations: false;
    includesDosageGuidance: false;
    sections: string[];
  };
  safetySummary: string[];
}

function normalizeInput(input: IncidentPersistenceInput): Required<IncidentPersistenceInput> {
  return {
    approvalEvidenceScore: input.approvalEvidenceScore ?? 82,
    persistenceBoundaryScore: input.persistenceBoundaryScore ?? 92,
    evidenceVaultScore: input.evidenceVaultScore ?? 86,
    retentionReviewScore: input.retentionReviewScore ?? 80,
    rollbackReadinessScore: input.rollbackReadinessScore ?? 84,
    openGovernanceItemCount: input.openGovernanceItemCount ?? 4,
    unresolvedPersistenceFindingCount: input.unresolvedPersistenceFindingCount ?? 0,
    unresolvedApprovalFindingCount: input.unresolvedApprovalFindingCount ?? 0,
    reviewerRole: input.reviewerRole ?? "incident persistence governance reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): IncidentPersistenceSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromScore(score: number): IncidentPersistencePriority {
  if (score < 65) return "urgent";
  if (score < 75) return "high";
  if (score < 85) return "medium";
  return "low";
}

function boardItem(
  id: string,
  label: string,
  lane: IncidentPersistenceLane,
  score: number,
  question: string,
  requiredEvidence: string[],
  safeOutcome: string,
): IncidentPersistenceBoardItem {
  const normalized = clampScore(score);

  return {
    id,
    label,
    lane,
    score: normalized,
    severity: severityFromConcern(100 - normalized),
    priority: priorityFromScore(normalized),
    question,
    requiredEvidence,
    safeOutcome,
  };
}

export function buildAiIncidentRecordPersistenceGovernanceReport(
  input: IncidentPersistenceInput = {},
): IncidentPersistenceReport {
  const context = normalizeInput(input);

  const approvalEvidenceBoard = [
    boardItem(
      "IRPG_APPROVAL_001",
      "Governance final approval evidence",
      "final_approval_evidence",
      context.approvalEvidenceScore,
      "Can approval evidence be reviewed without persisting records?",
      ["human reviewer", "approval hold", "zero-write state"],
      "Approval evidence remains local and dry-run.",
    ),
    boardItem(
      "IRPG_APPROVAL_002",
      "Human review attestation",
      "final_approval_evidence",
      context.approvalEvidenceScore,
      "Can human review remain mandatory before any later persistence?",
      ["humanReviewRequired=true", "manualDispatchOnly=true"],
      "Human review remains mandatory.",
    ),
  ];

  const persistenceBoundaryBoard = [
    boardItem(
      "IRPG_BOUNDARY_001",
      "Incident record persistence boundary",
      "persistence_boundary",
      100,
      "Can record persistence remain blocked?",
      ["incidentRecordPersistenceAllowed=false", "persistencePerformed=false"],
      "No incident record is persisted.",
    ),
    boardItem(
      "IRPG_BOUNDARY_002",
      "Timeline and audit write boundary",
      "persistence_boundary",
      context.persistenceBoundaryScore,
      "Can timeline and audit writes remain blocked?",
      ["incidentTimelineWriteAllowed=false", "incidentAuditWriteAllowed=false"],
      "No timeline or audit write is performed.",
    ),
  ];

  const evidenceVaultBoard = [
    boardItem(
      "IRPG_VAULT_001",
      "Evidence vault draft",
      "evidence_vault",
      context.evidenceVaultScore,
      "Can evidence vault stay draft-only?",
      ["no storage activation", "redacted output", "no private notes"],
      "Evidence vault remains a local draft.",
    ),
    boardItem(
      "IRPG_VAULT_002",
      "Retention review draft",
      "retention_review",
      context.retentionReviewScore,
      "Can retention be reviewed without retention writes?",
      ["incidentRetentionWriteAllowed=false", "redacted output"],
      "Retention review remains dry-run.",
    ),
  ];

  const rollbackReadinessBoard = [
    boardItem(
      "IRPG_ROLLBACK_001",
      "Persistence rollback plan",
      "rollback_plan",
      context.rollbackReadinessScore,
      "Can future persistence release return to zero-write state?",
      ["rollback note", "previous checkpoint", "no schema write"],
      "Return to online controlled dry-run.",
    ),
  ];

  const noGoBoard = [
    boardItem(
      "IRPG_NOGO_001",
      "Actual incident persistence",
      "no_go_board",
      0,
      "Can actual persistence run in V18.1?",
      ["separate release required", "explicit approval required"],
      "No-go: actual persistence remains blocked.",
    ),
    boardItem(
      "IRPG_NOGO_002",
      "Provider or execution derived persistence",
      "no_go_board",
      0,
      "Can provider output or execution trigger persistence?",
      ["providerCalled=false", "operationalExecutionAllowed=false"],
      "No-go: provider and execution paths remain blocked.",
    ),
  ];

  const findings: IncidentPersistenceFindingItem[] = [];

  if (context.unresolvedPersistenceFindingCount > 0) {
    findings.push({
      id: "IRPG_FINDING_001",
      label: "Unresolved persistence findings",
      lane: "persistence_boundary",
      severity: "critical",
      reason: String(context.unresolvedPersistenceFindingCount) + " persistence findings remain unresolved.",
      manualResolution: "Resolve persistence boundary before any later activation.",
      blocksPersistenceActivation: true,
    });
  }

  if (context.unresolvedApprovalFindingCount > 0) {
    findings.push({
      id: "IRPG_FINDING_002",
      label: "Unresolved approval findings",
      lane: "final_approval_evidence",
      severity: "critical",
      reason: String(context.unresolvedApprovalFindingCount) + " approval findings remain unresolved.",
      manualResolution: "Resolve governance approval evidence before any later activation.",
      blocksPersistenceActivation: true,
    });
  }

  const persistenceGovernanceScore = clampScore(
    (context.approvalEvidenceScore +
      context.persistenceBoundaryScore +
      context.evidenceVaultScore +
      context.retentionReviewScore +
      context.rollbackReadinessScore) /
      5 -
      context.openGovernanceItemCount -
      findings.length * 12,
  );

  const persistenceGovernanceStatus: IncidentPersistenceStatus =
    findings.length > 0
      ? "blocked"
      : persistenceGovernanceScore >= 88
        ? "zero-write-persistence-plan-ready"
        : persistenceGovernanceScore >= 80
          ? "manual-governance-ready"
          : "evidence-review-ready";

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: INCIDENT_PERSISTENCE_GOVERNANCE_GUARDRAIL,
    persistenceGovernanceScore,
    persistenceGovernanceStatus,
    overallSeverity: severityFromConcern(
      context.openGovernanceItemCount * 8 +
        context.unresolvedPersistenceFindingCount * 35 +
        context.unresolvedApprovalFindingCount * 35,
    ),
    approvalEvidenceBoard,
    persistenceBoundaryBoard,
    evidenceVaultBoard,
    rollbackReadinessBoard,
    noGoBoard,
    findings,
    stagedRoadmap: {
      v181: "Incident record persistence governance monitor in zero-write dry-run.",
      v182: "Public export artifact write only after explicit legal and privacy final approval.",
      v183: "Operational execution only after explicit human approval and emergency stop proof.",
      v184: "Provider runtime activation only after explicit provider approval and rollback proof.",
      v185: "Data persistence activation only after schema and rollback governance proof.",
    },
    redactedExportBundle: {
      exportId: "incident_record_persistence_governance_v18_1_redacted_dry_run",
      includesFieldIdentifiers: false,
      includesPrivateNotes: false,
      includesProviderPayloads: false,
      includesOperationalInternalData: false,
      includesProductionForecasts: false,
      includesProductRecommendations: false,
      includesDosageGuidance: false,
      sections: [
        "context",
        "approval evidence board",
        "persistence boundary board",
        "evidence vault board",
        "rollback readiness board",
        "no-go board",
        "findings",
        "staged roadmap",
        "safety summary",
      ],
    },
    safetySummary: [
      "Incident record persistence governance is dry-run only.",
      "No incident record, timeline, audit, retention, review, provider result or operational record is persisted.",
      "No provider call, task creation, intervention creation, public export write or execution is performed.",
      "Human review remains mandatory.",
      "V18.1 monitors persistence governance without expanding activation scope.",
    ],
  };
}

export const aiIncidentRecordPersistenceGovernanceVersion = "V18.1";
