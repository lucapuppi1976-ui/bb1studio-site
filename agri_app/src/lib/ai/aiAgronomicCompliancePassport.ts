export type CompliancePassportMode = "dry-run" | "compliance-review";

export type ComplianceSeverity = "info" | "watch" | "elevated" | "critical";

export type CompliancePriority = "low" | "medium" | "high" | "urgent";

export type ComplianceReadinessBand = "blocked" | "simulation-ready" | "review-ready" | "passport-ready";

export type ComplianceLane =
  | "traceability"
  | "audit-readiness"
  | "evidence-pack"
  | "field-records"
  | "operator-review"
  | "quality-governance"
  | "certification-pack"
  | "export-review";

export interface AgronomicCompliancePassportGuardrail {
  providerAiReady: false;
  persistenceReady: false;
  memoryPersistenceReady: false;
  automaticTaskCreationReady: false;
  automaticInterventionCreationReady: false;
  automaticExecutionReady: false;
  providerCalled: false;
  persistencePerformed: false;
  memoryPersistencePerformed: false;
  taskCreated: false;
  interventionCreated: false;
  automaticExecutionPerformed: false;
  publicSharePerformed: false;
  productPrescriptionPerformed: false;
  dosageAdvicePerformed: false;
  automaticTaskCreationAllowed: false;
  automaticInterventionCreationAllowed: false;
  automaticExecutionAllowed: false;
  dbPersistenceAllowed: false;
  memoryPersistenceAllowed: false;
  publicShareAllowed: false;
  productPrescriptionAllowed: false;
  dosageAdviceAllowed: false;
  manualDispatchOnly: true;
  humanReviewRequired: true;
  localAnalysisOnly: true;
  redactedOutputOnly: true;
  localMemoryOnly: true;
  localLearningOnly: true;
  localPromotionOnly: true;
  localQualityOnly: true;
  memoryPromotionAllowed: false;
  memoryQualityWriteAllowed: false;
  memoryPromotionPerformed: false;
  memoryQualityWritePerformed: false;
  compliancePassportReady: true;
  certificationReadinessReady: true;
  auditPackSandboxReady: true;
  traceabilityReviewReady: true;
}

export interface AgronomicCompliancePassportInput {
  activeCaseCount?: number;
  openEvidenceGapCount?: number;
  unresolvedReviewItemCount?: number;
  controlTowerScore?: number;
  explainabilityLedgerScore?: number;
  traceabilityCoverageScore?: number;
  auditTrailCoverageScore?: number;
  fieldRecordReadinessScore?: number;
  operatorReviewScore?: number;
  exportReadinessScore?: number;
  qualityGovernanceScore?: number;
  certificationPackScore?: number;
  reviewerConfidenceScore?: number;
  reviewerRole?: string;
}

export interface ComplianceSourceNode {
  id: string;
  lane: ComplianceLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  coverageScore: number;
  severity: ComplianceSeverity;
  priority: CompliancePriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface ComplianceRequirementItem {
  id: string;
  lane: ComplianceLane;
  label: string;
  readinessScore: number;
  passed: boolean;
  severity: ComplianceSeverity;
  requiredEvidence: string[];
  manualResolution: string;
}

export interface AuditTrailEntry {
  id: string;
  event: string;
  lane: ComplianceLane;
  severity: ComplianceSeverity;
  sourceNodeIds: string[];
  explanation: string;
  reviewer: string;
  noWriteGuarantee: true;
}

export interface CertificationReadinessItem {
  id: string;
  label: string;
  readinessBand: ComplianceReadinessBand;
  score: number;
  blockers: string[];
  reviewerQuestion: string;
  allowedOutcome: string;
  disallowedOutcome: string;
}

export interface TraceabilityGap {
  id: string;
  label: string;
  severity: ComplianceSeverity;
  sourceLane: ComplianceLane;
  reason: string;
  manualResolution: string;
}

export interface ComplianceReviewerChecklistItem {
  id: string;
  priority: CompliancePriority;
  question: string;
  reviewer: string;
  evidenceNeeded: string[];
  safeOutcome: string;
  manualOnly: true;
}

export interface ComplianceExportSection {
  id: string;
  label: string;
  included: true;
  redacted: true;
  reviewerCheck: string;
  blockedContent: string[];
}

export interface AgronomicCompliancePassportReport {
  generatedAt: string;
  mode: CompliancePassportMode;
  context: Required<AgronomicCompliancePassportInput>;
  readiness: AgronomicCompliancePassportGuardrail;
  passportScore: number;
  passportStatus: ComplianceReadinessBand;
  overallSeverity: ComplianceSeverity;
  sourceNodes: ComplianceSourceNode[];
  requirementMatrix: ComplianceRequirementItem[];
  auditTrail: AuditTrailEntry[];
  certificationReadiness: CertificationReadinessItem[];
  traceabilityGaps: TraceabilityGap[];
  reviewerChecklist: ComplianceReviewerChecklistItem[];
  exportSections: ComplianceExportSection[];
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

export const AGRONOMIC_COMPLIANCE_PASSPORT_READINESS: AgronomicCompliancePassportGuardrail = {
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
  manualDispatchOnly: true,
  humanReviewRequired: true,
  localAnalysisOnly: true,
  redactedOutputOnly: true,
  localMemoryOnly: true,
  localLearningOnly: true,
  localPromotionOnly: true,
  localQualityOnly: true,
  memoryPromotionAllowed: false,
  memoryQualityWriteAllowed: false,
  memoryPromotionPerformed: false,
  memoryQualityWritePerformed: false,
  compliancePassportReady: true,
  certificationReadinessReady: true,
  auditPackSandboxReady: true,
  traceabilityReviewReady: true,
};

const severityWeight: Record<ComplianceSeverity, number> = {
  info: 4,
  watch: 11,
  elevated: 21,
  critical: 34,
};

const priorityWeight: Record<CompliancePriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: AgronomicCompliancePassportInput): Required<AgronomicCompliancePassportInput> {
  return {
    activeCaseCount: input.activeCaseCount ?? 9,
    openEvidenceGapCount: input.openEvidenceGapCount ?? 6,
    unresolvedReviewItemCount: input.unresolvedReviewItemCount ?? 5,
    controlTowerScore: input.controlTowerScore ?? 72,
    explainabilityLedgerScore: input.explainabilityLedgerScore ?? 74,
    traceabilityCoverageScore: input.traceabilityCoverageScore ?? 70,
    auditTrailCoverageScore: input.auditTrailCoverageScore ?? 68,
    fieldRecordReadinessScore: input.fieldRecordReadinessScore ?? 73,
    operatorReviewScore: input.operatorReviewScore ?? 71,
    exportReadinessScore: input.exportReadinessScore ?? 76,
    qualityGovernanceScore: input.qualityGovernanceScore ?? 75,
    certificationPackScore: input.certificationPackScore ?? 69,
    reviewerConfidenceScore: input.reviewerConfidenceScore ?? 73,
    reviewerRole: input.reviewerRole ?? "compliance passport reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): ComplianceSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: ComplianceSeverity): CompliancePriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): ComplianceReadinessBand {
  if (blockerCount > 2 || score < 54) return "blocked";
  if (score >= 84 && blockerCount === 0) return "passport-ready";
  if (score >= 72) return "review-ready";
  return "simulation-ready";
}

function buildSourceNode(
  id: string,
  lane: ComplianceLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  coverageBase: number,
  pressure: number,
  reviewerFocus: string,
): ComplianceSourceNode {
  const readinessScore = clampScore(readinessBase - pressure);
  const coverageScore = clampScore(coverageBase - pressure / 2);
  const concernScore = clampScore(100 - readinessScore + pressure);
  const severity = severityFromConcern(concernScore);

  return {
    id,
    lane,
    title,
    sourceVersion,
    readinessScore,
    coverageScore,
    severity,
    priority: priorityFromSeverity(severity),
    reviewerFocus,
    blockers:
      readinessScore < 62 || coverageScore < 62 || severity === "critical"
        ? ["Compliance readiness below review threshold.", "Human reviewer must verify evidence and traceability."]
        : [],
  };
}

function buildSourceNodes(context: Required<AgronomicCompliancePassportInput>): ComplianceSourceNode[] {
  const evidencePressure = context.openEvidenceGapCount * 3;
  const reviewPressure = context.unresolvedReviewItemCount * 3;

  return [
    buildSourceNode(
      "ACP_NODE_001",
      "traceability",
      "Control tower traceability",
      "V11.0",
      context.controlTowerScore,
      context.traceabilityCoverageScore,
      evidencePressure / 2,
      "Verify that control tower module nodes and command cards are traceable.",
    ),
    buildSourceNode(
      "ACP_NODE_002",
      "evidence-pack",
      "Explainability ledger evidence contribution",
      "V11.1",
      context.explainabilityLedgerScore,
      context.traceabilityCoverageScore,
      evidencePressure,
      "Check that evidence contribution map and reviewer questions are complete.",
    ),
    buildSourceNode(
      "ACP_NODE_003",
      "audit-readiness",
      "Audit trail coverage",
      "V11.2",
      context.auditTrailCoverageScore,
      context.auditTrailCoverageScore,
      reviewPressure,
      "Confirm that every review event can be represented without writing data.",
    ),
    buildSourceNode(
      "ACP_NODE_004",
      "field-records",
      "Field record readiness",
      "V11.2",
      context.fieldRecordReadinessScore,
      context.fieldRecordReadinessScore,
      context.openEvidenceGapCount,
      "Review field record completeness before certification packet review.",
    ),
    buildSourceNode(
      "ACP_NODE_005",
      "operator-review",
      "Operator review packet",
      "V11.2",
      context.operatorReviewScore,
      context.reviewerConfidenceScore,
      reviewPressure / 2,
      "Confirm manual operator review topics without assigning work.",
    ),
    buildSourceNode(
      "ACP_NODE_006",
      "quality-governance",
      "Quality governance review",
      "V11.2",
      context.qualityGovernanceScore,
      context.qualityGovernanceScore,
      context.unresolvedReviewItemCount,
      "Review quality gates, uncertainty and hard-stop visibility.",
    ),
    buildSourceNode(
      "ACP_NODE_007",
      "certification-pack",
      "Certification readiness packet",
      "V11.2",
      context.certificationPackScore,
      context.exportReadinessScore,
      evidencePressure / 2,
      "Prepare certification readiness questions only; no formal claim is created.",
    ),
    buildSourceNode(
      "ACP_NODE_008",
      "export-review",
      "Redacted export readiness",
      "V11.2",
      context.exportReadinessScore,
      context.exportReadinessScore,
      reviewPressure / 3,
      "Confirm export can be reviewed without field identifiers or private notes.",
    ),
  ];
}

function buildRequirementMatrix(
  context: Required<AgronomicCompliancePassportInput>,
  sourceNodes: ComplianceSourceNode[],
): ComplianceRequirementItem[] {
  const rows = [
    {
      lane: "traceability" as ComplianceLane,
      label: "Every decision card has source trace",
      score: context.traceabilityCoverageScore,
      evidence: ["Control tower command cards", "Explainability trace", "Reviewer owner"],
    },
    {
      lane: "evidence-pack" as ComplianceLane,
      label: "Evidence gaps are visible",
      score: 100 - context.openEvidenceGapCount * 8,
      evidence: ["Evidence gap register", "Contribution map", "Manual resolution note"],
    },
    {
      lane: "audit-readiness" as ComplianceLane,
      label: "Audit trail can be reconstructed",
      score: context.auditTrailCoverageScore,
      evidence: ["Audit entries", "No write guarantee", "Reviewer checklist"],
    },
    {
      lane: "field-records" as ComplianceLane,
      label: "Field records are reviewable",
      score: context.fieldRecordReadinessScore,
      evidence: ["Field record readiness", "Module source trace", "Manual reviewer note"],
    },
    {
      lane: "certification-pack" as ComplianceLane,
      label: "Certification packet is review-ready",
      score: context.certificationPackScore,
      evidence: ["Requirement matrix", "Traceability gaps", "Redacted export sections"],
    },
  ];

  return rows.map((row, index) => {
    const score = clampScore(row.score);
    const severity = severityFromConcern(100 - score);
    const sourceNode = sourceNodes.find((node) => node.lane === row.lane);

    return {
      id: `ACP_REQ_${String(index + 1).padStart(3, "0")}`,
      lane: row.lane,
      label: row.label,
      readinessScore: score,
      passed: score >= 70 && (sourceNode?.blockers.length ?? 0) === 0,
      severity,
      requiredEvidence: row.evidence,
      manualResolution:
        score >= 70
          ? "Reviewer confirms readiness manually."
          : "Resolve evidence and reviewer gaps before passport-ready state.",
    };
  });
}

function buildAuditTrail(sourceNodes: ComplianceSourceNode[]): AuditTrailEntry[] {
  return sourceNodes.map((node, index) => ({
    id: `ACP_AUDIT_${String(index + 1).padStart(3, "0")}`,
    event: `Review source ${node.title}`,
    lane: node.lane,
    severity: node.severity,
    sourceNodeIds: [node.id],
    explanation: node.reviewerFocus,
    reviewer:
      node.lane === "audit-readiness"
        ? "audit reviewer"
        : node.lane === "certification-pack"
          ? "certification reviewer"
          : "senior agronomist",
    noWriteGuarantee: true,
  }));
}

function buildCertificationReadiness(
  requirementMatrix: ComplianceRequirementItem[],
): CertificationReadinessItem[] {
  return requirementMatrix.map((item, index) => ({
    id: `ACP_CERT_${String(index + 1).padStart(3, "0")}`,
    label: item.label,
    readinessBand: bandFromScore(item.readinessScore, item.passed ? 0 : 1),
    score: item.readinessScore,
    blockers: item.passed ? [] : [`${item.label} requires manual review.`],
    reviewerQuestion: `Can ${item.label.toLowerCase()} be accepted for a redacted passport?`,
    allowedOutcome: "Manual readiness statement only.",
    disallowedOutcome: "No certification claim, no automated approval and no data write.",
  }));
}

function buildTraceabilityGaps(
  context: Required<AgronomicCompliancePassportInput>,
  sourceNodes: ComplianceSourceNode[],
  requirementMatrix: ComplianceRequirementItem[],
): TraceabilityGap[] {
  const gaps: TraceabilityGap[] = [];

  if (context.openEvidenceGapCount > 0) {
    gaps.push({
      id: "ACP_GAP_001",
      label: "Open evidence gaps",
      severity: context.openEvidenceGapCount >= 6 ? "critical" : "elevated",
      sourceLane: "evidence-pack",
      reason: `${context.openEvidenceGapCount} evidence gaps remain open.`,
      manualResolution: "Close, downgrade or explicitly accept gaps through human review.",
    });
  }

  if (context.unresolvedReviewItemCount > 0) {
    gaps.push({
      id: "ACP_GAP_002",
      label: "Unresolved reviewer items",
      severity: context.unresolvedReviewItemCount >= 5 ? "critical" : "elevated",
      sourceLane: "operator-review",
      reason: `${context.unresolvedReviewItemCount} reviewer items remain unresolved.`,
      manualResolution: "Assign a human reviewer and record an acceptance note outside this dry-run packet.",
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      gaps.push({
        id: `ACP_SOURCE_GAP_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} gap`,
        severity: node.severity,
        sourceLane: node.lane,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
      });
    });

  requirementMatrix
    .filter((item) => !item.passed)
    .forEach((item, index) => {
      gaps.push({
        id: `ACP_REQ_GAP_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        severity: item.severity,
        sourceLane: item.lane,
        reason: `Readiness score is ${item.readinessScore}/100.`,
        manualResolution: item.manualResolution,
      });
    });

  return gaps;
}

function buildReviewerChecklist(
  context: Required<AgronomicCompliancePassportInput>,
  traceabilityGaps: TraceabilityGap[],
): ComplianceReviewerChecklistItem[] {
  return [
    {
      id: "ACP_CHECK_001",
      priority: context.openEvidenceGapCount >= 6 ? "urgent" : "high",
      question: "Which evidence gaps prevent a compliant passport review?",
      reviewer: "evidence quality reviewer",
      evidenceNeeded: ["Evidence gap register", "Requirement matrix", "Traceability gaps"],
      safeOutcome: "Manual evidence review agenda only.",
      manualOnly: true,
    },
    {
      id: "ACP_CHECK_002",
      priority: context.unresolvedReviewItemCount >= 5 ? "urgent" : "high",
      question: "Which reviewer items must be resolved before export?",
      reviewer: context.reviewerRole,
      evidenceNeeded: ["Reviewer checklist", "Audit trail", "Operator review packet"],
      safeOutcome: "Manual reviewer action list only.",
      manualOnly: true,
    },
    {
      id: "ACP_CHECK_003",
      priority: context.certificationPackScore < 70 ? "high" : "medium",
      question: "Can the certification packet be marked review-ready?",
      reviewer: "certification reviewer",
      evidenceNeeded: ["Certification readiness", "Redacted export sections", "Governance locks"],
      safeOutcome: "Readiness statement only; no certification claim.",
      manualOnly: true,
    },
    {
      id: "ACP_CHECK_004",
      priority: traceabilityGaps.some((gap) => gap.severity === "critical") ? "urgent" : "medium",
      question: "Which traceability gaps block passport-ready status?",
      reviewer: "audit reviewer",
      evidenceNeeded: traceabilityGaps.map((gap) => gap.label).slice(0, 6),
      safeOutcome: "Manual gap resolution plan only.",
      manualOnly: true,
    },
  ];
}

function buildExportSections(): ComplianceExportSection[] {
  return [
    {
      id: "ACP_EXPORT_001",
      label: "Source nodes",
      included: true,
      redacted: true,
      reviewerCheck: "Confirm source names and versions are reviewable.",
      blockedContent: ["Field identifiers", "Private notes"],
    },
    {
      id: "ACP_EXPORT_002",
      label: "Requirement matrix",
      included: true,
      redacted: true,
      reviewerCheck: "Confirm requirements are generic readiness checks.",
      blockedContent: ["Formal certification claims", "Automated approval"],
    },
    {
      id: "ACP_EXPORT_003",
      label: "Audit trail",
      included: true,
      redacted: true,
      reviewerCheck: "Confirm no write guarantee is visible.",
      blockedContent: ["Operational records", "Stored audit state"],
    },
    {
      id: "ACP_EXPORT_004",
      label: "Reviewer checklist",
      included: true,
      redacted: true,
      reviewerCheck: "Confirm all outcomes remain manual.",
      blockedContent: ["Task creation", "Work assignment", "Public sharing"],
    },
  ];
}

export function buildAiAgronomicCompliancePassportReport(
  input: AgronomicCompliancePassportInput = {},
): AgronomicCompliancePassportReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const requirementMatrix = buildRequirementMatrix(context, sourceNodes);
  const auditTrail = buildAuditTrail(sourceNodes);
  const certificationReadiness = buildCertificationReadiness(requirementMatrix);
  const traceabilityGaps = buildTraceabilityGaps(context, sourceNodes, requirementMatrix);
  const reviewerChecklist = buildReviewerChecklist(context, traceabilityGaps);
  const exportSections = buildExportSections();

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.coverageScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const requirementAverage =
    requirementMatrix.reduce((sum, item) => sum + item.readinessScore, 0) / Math.max(1, requirementMatrix.length);

  const blockerPenalty = traceabilityGaps.filter((gap) => gap.severity === "critical").length * 10;
  const checklistPressure =
    reviewerChecklist.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, reviewerChecklist.length * 3);

  const passportScore = clampScore(
    sourceAverage / 2 +
      requirementAverage / 2 +
      context.exportReadinessScore / 10 +
      checklistPressure -
      blockerPenalty -
      context.openEvidenceGapCount * 2 -
      context.unresolvedReviewItemCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.openEvidenceGapCount * 7 +
        context.unresolvedReviewItemCount * 6 +
        sourceNodes.filter((node) => node.blockers.length > 0).length * 8 +
        requirementMatrix.filter((item) => !item.passed).length * 6,
    ),
  );

  const passportStatus = bandFromScore(
    passportScore,
    traceabilityGaps.filter((gap) => gap.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: AGRONOMIC_COMPLIANCE_PASSPORT_READINESS,
    passportScore,
    passportStatus,
    overallSeverity,
    sourceNodes,
    requirementMatrix,
    auditTrail,
    certificationReadiness,
    traceabilityGaps,
    reviewerChecklist,
    exportSections,
    redactedExportBundle: {
      exportId: "agronomic_compliance_passport_v11_2_redacted_dry_run",
      includesFieldIdentifiers: false,
      includesPrivateNotes: false,
      includesProviderPayloads: false,
      includesOperationalInternalData: false,
      includesProductionForecasts: false,
      includesProductRecommendations: false,
      includesDosageGuidance: false,
      sections: [
        "context",
        "source nodes",
        "requirement matrix",
        "audit trail",
        "certification readiness",
        "traceability gaps",
        "reviewer checklist",
        "export sections",
        "safety summary",
      ],
    },
    safetySummary: [
      "Compliance passport is local dry-run only.",
      "No provider call, persistence, memory write, task creation, intervention creation or execution is performed.",
      "No product recommendation, dosage advice, public sharing, formal certification claim or production forecast is produced.",
      "Audit entries and readiness items are review aids only.",
      "Every compliance interpretation remains behind human review and governance locks.",
    ],
  };
}

export const aiAgronomicCompliancePassportVersion = "V11.2";
