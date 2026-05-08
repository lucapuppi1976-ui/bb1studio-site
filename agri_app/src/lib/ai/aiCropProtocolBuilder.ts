export type CropProtocolMode = "dry-run" | "expert-review";

export type CropProtocolEvidenceLevel = "missing" | "weak" | "moderate" | "strong";

export type CropProtocolRiskTier = "low" | "watch" | "elevated" | "critical";

export type CropProtocolApprovalStage =
  | "draft"
  | "technical-review"
  | "agronomist-approval"
  | "governance-signoff"
  | "locked-dry-run";

export type CropProtocolApplicabilityBand =
  | "not-applicable"
  | "watchlist"
  | "applicable-with-gaps"
  | "review-ready"
  | "expert-ready";

export interface CropProtocolReadiness {
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
  cropProtocolBuilderReady: true;
  cropSpecificProtocolReady: true;
  phenologyAwareReviewReady: true;
  protocolConflictReviewReady: true;
}

export interface CropProtocolBuilderInput {
  cropFamily?: string;
  growthStage?: string;
  symptomCluster?: string;
  climateContext?: string;
  regionProfile?: string;
  evidenceLevel?: CropProtocolEvidenceLevel;
  reviewerRole?: string;
}

export interface CropProtocolEvidenceGate {
  id: string;
  label: string;
  requiredLevel: CropProtocolEvidenceLevel;
  currentLevel: CropProtocolEvidenceLevel;
  blocking: boolean;
  rationale: string;
  manualCollectionAction: string;
}

export interface CropProtocolStep {
  id: string;
  phase: "triage" | "evidence" | "differential-review" | "field-validation" | "governance";
  title: string;
  instruction: string;
  humanCheckpoint: string;
  prohibitedOutputs: string[];
}

export interface CropProtocolVariant {
  id: string;
  cropFamilies: string[];
  title: string;
  version: string;
  approvalStage: CropProtocolApprovalStage;
  phenologyWindows: string[];
  symptomFamilies: string[];
  climateSignals: string[];
  applicabilityRules: string[];
  evidenceGates: CropProtocolEvidenceGate[];
  protocolSteps: CropProtocolStep[];
  rollbackTriggers: string[];
}

export interface CropProtocolScore {
  protocolId: string;
  title: string;
  band: CropProtocolApplicabilityBand;
  score: number;
  riskTier: CropProtocolRiskTier;
  approvalStage: CropProtocolApprovalStage;
  blockers: string[];
  matchedSignals: string[];
  reviewerFocus: string[];
}

export interface CropProtocolConflict {
  id: string;
  severity: "low" | "medium" | "high" | "blocking";
  protocolIds: string[];
  finding: string;
  conservativeResolution: string;
  requiresHumanDecision: true;
}

export interface CropProtocolReviewItem {
  id: string;
  protocolId: string;
  decisionTopic: string;
  reviewer: string;
  requiredEvidence: string[];
  safeOutcome: string;
  manualOnly: true;
}

export interface CropProtocolExportBundle {
  exportId: string;
  includesFieldIdentifiers: false;
  includesPrivateNotes: false;
  includesProviderPayloads: false;
  includesOperationalSecrets: false;
  sections: string[];
}

export interface CropSpecificExpertProtocolReport {
  generatedAt: string;
  mode: CropProtocolMode;
  context: Required<CropProtocolBuilderInput>;
  readiness: CropProtocolReadiness;
  protocolScore: number;
  protocolStatus: "blocked" | "simulation-ready" | "review-ready";
  protocolVariants: CropProtocolVariant[];
  applicabilityIndex: CropProtocolScore[];
  conflicts: CropProtocolConflict[];
  reviewBoard: CropProtocolReviewItem[];
  evidenceBacklog: CropProtocolEvidenceGate[];
  redactedExportBundle: CropProtocolExportBundle;
  safetySummary: string[];
}

export const CROP_PROTOCOL_READINESS: CropProtocolReadiness = {
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
  cropProtocolBuilderReady: true,
  cropSpecificProtocolReady: true,
  phenologyAwareReviewReady: true,
  protocolConflictReviewReady: true,
};

const evidenceRank: Record<CropProtocolEvidenceLevel, number> = {
  missing: 0,
  weak: 1,
  moderate: 2,
  strong: 3,
};

const approvalWeight: Record<CropProtocolApprovalStage, number> = {
  draft: 5,
  "technical-review": 14,
  "agronomist-approval": 18,
  "governance-signoff": 22,
  "locked-dry-run": 22,
};

const protocolVariants: CropProtocolVariant[] = [
  {
    id: "CPB-PROT-001",
    cropFamilies: ["tomato", "pepper"],
    title: "Solanaceae canopy stress expert protocol",
    version: "10.2.0-dry-run",
    approvalStage: "technical-review",
    phenologyWindows: ["vegetative growth", "flowering", "fruit set", "harvest"],
    symptomFamilies: ["canopy stress", "leaf discoloration", "wilting", "growth anomaly"],
    climateSignals: ["heat stress", "protected crop humidity", "irrigation variability"],
    applicabilityRules: [
      "Use visual symptom clustering before causal interpretation.",
      "Keep abiotic and biotic hypotheses open until field validation.",
      "Block direct treatment recommendations in dry-run mode.",
    ],
    evidenceGates: [
      {
        id: "CPB-EG-001",
        label: "Canopy distribution evidence",
        requiredLevel: "moderate",
        currentLevel: "moderate",
        blocking: true,
        rationale: "Canopy stress cannot be ranked without spatial distribution.",
        manualCollectionAction: "Collect row, sector and plant-level symptom distribution notes.",
      },
      {
        id: "CPB-EG-002",
        label: "Irrigation and heat context",
        requiredLevel: "moderate",
        currentLevel: "weak",
        blocking: true,
        rationale: "Solanaceae stress often overlaps with water and heat signals.",
        manualCollectionAction: "Ask reviewer to confirm irrigation sector and heat exposure context.",
      },
    ],
    protocolSteps: [
      {
        id: "CPB-ST-001",
        phase: "triage",
        title: "Cluster canopy symptoms",
        instruction: "Group visible symptoms by plant zone, field sector and growth stage.",
        humanCheckpoint: "Reviewer confirms symptom cluster quality.",
        prohibitedOutputs: ["Product choice", "Dosage advice", "Automatic task creation"],
      },
      {
        id: "CPB-ST-002",
        phase: "field-validation",
        title: "Validate abiotic overlap",
        instruction: "Request manual checks for irrigation uniformity, heat exposure and soil variability.",
        humanCheckpoint: "Reviewer decides whether evidence remains insufficient.",
        prohibitedOutputs: ["Automatic intervention", "Diagnosis finalization"],
      },
    ],
    rollbackTriggers: [
      "Growth stage cannot be confirmed.",
      "Evidence downgraded below moderate.",
      "Reviewer detects unsupported causal certainty.",
    ],
  },
  {
    id: "CPB-PROT-002",
    cropFamilies: ["vineyard"],
    title: "Vineyard humidity-linked disease pressure protocol",
    version: "10.2.0-dry-run",
    approvalStage: "agronomist-approval",
    phenologyWindows: ["shoot growth", "flowering", "fruit set", "veraison"],
    symptomFamilies: ["lesion pattern", "leaf discoloration", "humidity-linked risk", "canopy density"],
    climateSignals: ["humidity", "dense canopy", "recent rainfall", "low airflow"],
    applicabilityRules: [
      "Escalate only when symptom evidence and humidity context agree.",
      "Require human agronomist review before operational interpretation.",
      "Never infer product or dosage recommendations.",
    ],
    evidenceGates: [
      {
        id: "CPB-EG-003",
        label: "Humidity risk context",
        requiredLevel: "moderate",
        currentLevel: "moderate",
        blocking: true,
        rationale: "Disease pressure review requires environmental corroboration.",
        manualCollectionAction: "Confirm humidity, rainfall and canopy density notes.",
      },
      {
        id: "CPB-EG-004",
        label: "Lesion localization",
        requiredLevel: "moderate",
        currentLevel: "weak",
        blocking: true,
        rationale: "Visual lesion location is required before escalating disease pressure.",
        manualCollectionAction: "Collect close and wide photo evidence from affected and unaffected vines.",
      },
    ],
    protocolSteps: [
      {
        id: "CPB-ST-003",
        phase: "evidence",
        title: "Confirm disease-pressure prerequisites",
        instruction: "Check whether visual evidence and humidity context support only a review hypothesis.",
        humanCheckpoint: "Agronomist confirms whether escalation remains advisory.",
        prohibitedOutputs: ["Treatment plan", "Product recommendation", "Dosage"],
      },
      {
        id: "CPB-ST-004",
        phase: "governance",
        title: "Route to manual protocol review",
        instruction: "Prepare a redacted review packet with uncertainty, blockers and evidence gaps.",
        humanCheckpoint: "Operations reviewer approves only the review packet.",
        prohibitedOutputs: ["Public sharing", "Automatic execution"],
      },
    ],
    rollbackTriggers: [
      "Humidity context is missing.",
      "Lesion evidence is ambiguous.",
      "Abiotic stress becomes a stronger competing hypothesis.",
    ],
  },
  {
    id: "CPB-PROT-003",
    cropFamilies: ["citrus"],
    title: "Citrus abiotic versus pest-like symptom guard",
    version: "10.2.0-dry-run",
    approvalStage: "technical-review",
    phenologyWindows: ["flush", "flowering", "fruit development", "post-harvest"],
    symptomFamilies: ["chlorosis", "leaf curl", "spotting", "canopy decline"],
    climateSignals: ["salinity risk", "water stress", "wind exposure", "seasonal flush"],
    applicabilityRules: [
      "Separate pest-like symptoms from abiotic patterns before escalation.",
      "Require field distribution evidence before any confidence upgrade.",
      "Keep all outputs non-prescriptive and manual-review only.",
    ],
    evidenceGates: [
      {
        id: "CPB-EG-005",
        label: "Canopy and leaf position evidence",
        requiredLevel: "moderate",
        currentLevel: "moderate",
        blocking: true,
        rationale: "Citrus symptom interpretation depends on leaf age and canopy position.",
        manualCollectionAction: "Collect leaf-age, canopy-side and tree-zone observations.",
      },
      {
        id: "CPB-EG-006",
        label: "Abiotic field pattern",
        requiredLevel: "moderate",
        currentLevel: "weak",
        blocking: true,
        rationale: "Field pattern helps distinguish abiotic stress from pest-like signals.",
        manualCollectionAction: "Document whether symptoms follow irrigation, wind or soil gradients.",
      },
    ],
    protocolSteps: [
      {
        id: "CPB-ST-005",
        phase: "differential-review",
        title: "Separate abiotic and pest-like signals",
        instruction: "Maintain multiple hypotheses until field pattern evidence is adequate.",
        humanCheckpoint: "Reviewer confirms no direct pest or product recommendation is produced.",
        prohibitedOutputs: ["Pesticide suggestion", "Dosage advice", "Automatic work order"],
      },
    ],
    rollbackTriggers: [
      "Leaf age is unknown.",
      "Pattern is not field-validated.",
      "Reviewer rejects evidence adequacy.",
    ],
  },
  {
    id: "CPB-PROT-004",
    cropFamilies: ["olive"],
    title: "Olive canopy decline and water stress protocol",
    version: "10.2.0-dry-run",
    approvalStage: "governance-signoff",
    phenologyWindows: ["vegetative growth", "flowering", "fruit development", "post-harvest"],
    symptomFamilies: ["canopy decline", "wilting", "leaf discoloration", "branch dieback"],
    climateSignals: ["drought", "heat stress", "soil variability", "irrigation deficit"],
    applicabilityRules: [
      "Prioritize water stress and field pattern evidence before disease escalation.",
      "Do not recommend treatments or operations automatically.",
      "Use governance signoff for any farm-level interpretation.",
    ],
    evidenceGates: [
      {
        id: "CPB-EG-007",
        label: "Water stress context",
        requiredLevel: "moderate",
        currentLevel: "strong",
        blocking: true,
        rationale: "Olive canopy decline often requires water context before escalation.",
        manualCollectionAction: "Confirm recent irrigation, rainfall and soil moisture observations.",
      },
      {
        id: "CPB-EG-008",
        label: "Branch-level visual evidence",
        requiredLevel: "weak",
        currentLevel: "moderate",
        blocking: false,
        rationale: "Branch-level detail improves reviewer interpretation.",
        manualCollectionAction: "Add close images of affected and unaffected branches.",
      },
    ],
    protocolSteps: [
      {
        id: "CPB-ST-006",
        phase: "field-validation",
        title: "Validate water stress and canopy decline pattern",
        instruction: "Compare tree-to-tree and sector-level decline before protocol escalation.",
        humanCheckpoint: "Reviewer confirms manual-only decision path.",
        prohibitedOutputs: ["Intervention creation", "Automatic execution", "Product prescription"],
      },
    ],
    rollbackTriggers: [
      "Water context cannot be verified.",
      "Sector-level evidence contradicts canopy decline pattern.",
    ],
  },
  {
    id: "CPB-PROT-005",
    cropFamilies: ["cereal"],
    title: "Cereal patch-risk scouting protocol",
    version: "10.2.0-dry-run",
    approvalStage: "locked-dry-run",
    phenologyWindows: ["tillering", "stem elongation", "heading", "grain fill"],
    symptomFamilies: ["patch risk", "yellowing", "growth anomaly", "lodging risk"],
    climateSignals: ["waterlogging", "heat stress", "wind", "field variability"],
    applicabilityRules: [
      "Use patch geometry and crop stage before escalation.",
      "Convert only to manual scouting topics.",
      "No treatment advice is allowed.",
    ],
    evidenceGates: [
      {
        id: "CPB-EG-009",
        label: "Patch geometry",
        requiredLevel: "moderate",
        currentLevel: "moderate",
        blocking: true,
        rationale: "Patch shape informs whether the protocol should stay in scouting mode.",
        manualCollectionAction: "Collect edge, center and unaffected-area observations.",
      },
      {
        id: "CPB-EG-010",
        label: "Crop stage confirmation",
        requiredLevel: "moderate",
        currentLevel: "moderate",
        blocking: true,
        rationale: "Cereal protocol interpretation changes by phenological stage.",
        manualCollectionAction: "Confirm crop stage before reviewing risk.",
      },
    ],
    protocolSteps: [
      {
        id: "CPB-ST-007",
        phase: "triage",
        title: "Rank patch-risk for scouting only",
        instruction: "Prepare manual scouting topics based on patch geometry and growth stage.",
        humanCheckpoint: "Reviewer approves scouting note only.",
        prohibitedOutputs: ["Task auto-creation", "Treatment recommendation", "Dosage"],
      },
    ],
    rollbackTriggers: [
      "Crop stage not confirmed.",
      "Patch geometry not documented.",
    ],
  },
];

function normalizeInput(input: CropProtocolBuilderInput): Required<CropProtocolBuilderInput> {
  return {
    cropFamily: input.cropFamily ?? "tomato",
    growthStage: input.growthStage ?? "fruit set",
    symptomCluster: input.symptomCluster ?? "canopy stress leaf discoloration",
    climateContext: input.climateContext ?? "heat stress and irrigation variability",
    regionProfile: input.regionProfile ?? "Mediterranean mixed field context",
    evidenceLevel: input.evidenceLevel ?? "moderate",
    reviewerRole: input.reviewerRole ?? "senior agronomist",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function rankRisk(score: number, blockers: string[]): CropProtocolRiskTier {
  if (blockers.length >= 2) return "critical";
  if (score >= 78) return "elevated";
  if (score >= 55) return "watch";
  return "low";
}

function scoreProtocol(
  protocol: CropProtocolVariant,
  context: Required<CropProtocolBuilderInput>,
): CropProtocolScore {
  const crop = context.cropFamily.toLowerCase();
  const stage = context.growthStage.toLowerCase();
  const symptoms = context.symptomCluster.toLowerCase();
  const climate = context.climateContext.toLowerCase();

  const cropScore = protocol.cropFamilies.includes(crop) ? 28 : 0;
  const stageScore = protocol.phenologyWindows.some((window) => stage.includes(window.toLowerCase())) ? 14 : 5;
  const symptomScore = protocol.symptomFamilies.some((symptom) => symptoms.includes(symptom.toLowerCase())) ? 22 : 0;
  const climateScore = protocol.climateSignals.some((signal) => climate.includes(signal.toLowerCase())) ? 14 : 4;

  const blockers = protocol.evidenceGates
    .filter((gate) => gate.blocking && evidenceRank[gate.currentLevel] < evidenceRank[gate.requiredLevel])
    .map((gate) => `${gate.label}: evidence ${gate.currentLevel}, required ${gate.requiredLevel}`);

  const evidenceScore = protocol.evidenceGates.reduce((sum, gate) => {
    const currentRank = Math.max(evidenceRank[gate.currentLevel], evidenceRank[context.evidenceLevel]);
    const requiredRank = evidenceRank[gate.requiredLevel];

    if (currentRank >= requiredRank) return sum + 5;
    return gate.blocking ? sum - 8 : sum + 1;
  }, 0);

  const score = clampScore(
    cropScore +
      stageScore +
      symptomScore +
      climateScore +
      approvalWeight[protocol.approvalStage] +
      evidenceScore -
      blockers.length * 7,
  );

  let band: CropProtocolApplicabilityBand = "not-applicable";

  if (score >= 86 && blockers.length === 0) {
    band = "expert-ready";
  } else if (score >= 74 && blockers.length === 0) {
    band = "review-ready";
  } else if (score >= 58) {
    band = "applicable-with-gaps";
  } else if (score >= 35) {
    band = "watchlist";
  }

  return {
    protocolId: protocol.id,
    title: protocol.title,
    band,
    score,
    riskTier: rankRisk(score, blockers),
    approvalStage: protocol.approvalStage,
    blockers,
    matchedSignals: [
      ...protocol.symptomFamilies.filter((symptom) => symptoms.includes(symptom.toLowerCase())),
      ...protocol.climateSignals.filter((signal) => climate.includes(signal.toLowerCase())),
    ],
    reviewerFocus: [
      "Confirm crop and growth stage.",
      "Review evidence gates before protocol escalation.",
      "Reject any request for product, dosage or automatic action.",
    ],
  };
}

function buildConflicts(applicabilityIndex: CropProtocolScore[]): CropProtocolConflict[] {
  const candidateIds = new Set(
    applicabilityIndex
      .filter((item) => item.band === "applicable-with-gaps" || item.band === "review-ready" || item.band === "expert-ready")
      .map((item) => item.protocolId),
  );

  const conflicts: CropProtocolConflict[] = [];

  if (candidateIds.has("CPB-PROT-001") && candidateIds.has("CPB-PROT-003")) {
    conflicts.push({
      id: "CPB-CONFLICT-001",
      severity: "high",
      protocolIds: ["CPB-PROT-001", "CPB-PROT-003"],
      finding: "Solanaceae canopy stress and citrus abiotic guard share visual stress logic but require crop-specific evidence.",
      conservativeResolution: "Keep crop-specific protocols isolated and require reviewer confirmation of crop identity.",
      requiresHumanDecision: true,
    });
  }

  if (candidateIds.has("CPB-PROT-002") && candidateIds.has("CPB-PROT-004")) {
    conflicts.push({
      id: "CPB-CONFLICT-002",
      severity: "medium",
      protocolIds: ["CPB-PROT-002", "CPB-PROT-004"],
      finding: "Humidity-linked disease pressure and water-stress decline can both explain canopy degradation.",
      conservativeResolution: "Request additional environmental evidence and keep both hypotheses advisory only.",
      requiresHumanDecision: true,
    });
  }

  conflicts.push({
    id: "CPB-CONFLICT-003",
    severity: "low",
    protocolIds: ["CPB-PROT-001", "CPB-PROT-002", "CPB-PROT-003", "CPB-PROT-004", "CPB-PROT-005"],
    finding: "All protocols could be misread as operational instructions if review state is hidden.",
    conservativeResolution: "Expose dry-run status, blockers, prohibited outputs and human review checkpoints in every panel.",
    requiresHumanDecision: true,
  });

  return conflicts;
}

function buildReviewBoard(
  context: Required<CropProtocolBuilderInput>,
  applicabilityIndex: CropProtocolScore[],
): CropProtocolReviewItem[] {
  return applicabilityIndex
    .filter((item) => item.band !== "not-applicable")
    .slice(0, 4)
    .map((item, index) => ({
      id: `CPB-REVIEW-${String(index + 1).padStart(3, "0")}`,
      protocolId: item.protocolId,
      decisionTopic: `Review ${item.title}`,
      reviewer: context.reviewerRole,
      requiredEvidence:
        item.blockers.length > 0
          ? item.blockers
          : ["Crop identity", "Growth stage", "Symptom distribution", "Evidence gate confirmation"],
      safeOutcome: "Manual review packet only; no task, intervention, product or dosage output.",
      manualOnly: true,
    }));
}

function collectEvidenceBacklog(protocols: CropProtocolVariant[]): CropProtocolEvidenceGate[] {
  return protocols.flatMap((protocol) =>
    protocol.evidenceGates.filter(
      (gate) => evidenceRank[gate.currentLevel] < evidenceRank[gate.requiredLevel],
    ),
  );
}

export function buildAiCropProtocolBuilderReport(
  input: CropProtocolBuilderInput = {},
): CropSpecificExpertProtocolReport {
  const context = normalizeInput(input);
  const applicabilityIndex = protocolVariants.map((protocol) => scoreProtocol(protocol, context));
  const conflicts = buildConflicts(applicabilityIndex);
  const reviewBoard = buildReviewBoard(context, applicabilityIndex);
  const evidenceBacklog = collectEvidenceBacklog(protocolVariants);

  const averageScore =
    applicabilityIndex.reduce((sum, item) => sum + item.score, 0) / Math.max(1, applicabilityIndex.length);

  const protocolScore = clampScore(
    averageScore +
      reviewBoard.length * 3 -
      evidenceBacklog.filter((gate) => gate.blocking).length * 4 -
      conflicts.filter((conflict) => conflict.severity === "high" || conflict.severity === "blocking").length * 6,
  );

  const protocolStatus =
    evidenceBacklog.filter((gate) => gate.blocking).length >= 3
      ? "blocked"
      : protocolScore >= 72
        ? "review-ready"
        : "simulation-ready";

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: CROP_PROTOCOL_READINESS,
    protocolScore,
    protocolStatus,
    protocolVariants,
    applicabilityIndex,
    conflicts,
    reviewBoard,
    evidenceBacklog,
    redactedExportBundle: {
      exportId: "crop-protocol-builder-v10-2-redacted-dry-run",
      includesFieldIdentifiers: false,
      includesPrivateNotes: false,
      includesProviderPayloads: false,
      includesOperationalSecrets: false,
      sections: [
        "context",
        "crop protocol variants",
        "applicability index",
        "evidence backlog",
        "conflict register",
        "manual review board",
        "safety summary",
      ],
    },
    safetySummary: [
      "Protocol builder is local dry-run only.",
      "No provider call, persistence, memory write, task creation, intervention creation or execution is performed.",
      "No product prescription, dosage advice or public sharing is produced.",
      "Every protocol remains behind human review and manual dispatch.",
      "Crop-specific rules are advisory until a qualified reviewer approves them.",
    ],
  };
}

export const aiCropProtocolBuilderVersion = "V10.2";
