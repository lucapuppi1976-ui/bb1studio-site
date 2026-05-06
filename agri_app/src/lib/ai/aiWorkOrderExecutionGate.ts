import {
  createAiWorkOrderPreview,
  createAiWorkOrderPreviewFromInput,
  formatAiWorkOrderPreview,
  type AiWorkOrderPreview,
} from "./aiWorkOrderPreview";
import type { PhotoSymptomAnnotationInput } from "./photoSymptomAnnotation";

export type ExecutionReviewDecision =
  | "pending"
  | "approve-with-caution"
  | "requires-corrections"
  | "reject";

export type ExecutionGateStatus =
  | "blocked"
  | "ready-for-manual-conversion"
  | "rejected";

export type ExecutionGateInput = {
  reviewDecision: ExecutionReviewDecision;
  evidenceConfirmed: boolean;
  reviewerAssigned: boolean;
  safetySignoff: boolean;
  operatorAcknowledged: boolean;
  noProductRequest: boolean;
  noDosageRequest: boolean;
  manualConversionRequested: boolean;
};

export type ExecutionGateChecklistItem = {
  id: string;
  label: string;
  passed: boolean;
  required: boolean;
  blockerWhenMissing: string;
};

export type AiWorkOrderExecutionGate = {
  ok: true;
  mode: "work-order-execution-gate-dry-run";
  gateVersion: "agri-ai-work-order-execution-gate-v1";
  gateId: string;
  gateFingerprint: string;
  sourcePreviewFingerprint: string;
  sourceDossierFingerprint: string;
  status: ExecutionGateStatus;
  manualConversionAllowed: boolean;
  automaticExecutionAllowed: false;
  automaticTaskCreationAllowed: false;
  automaticInterventionCreationAllowed: false;
  noAutomaticDbWrites: true;
  noProviderCall: true;
  reviewDecision: ExecutionReviewDecision;
  checklist: ExecutionGateChecklistItem[];
  blockers: string[];
  approvals: string[];
  conversionPackage: {
    manualTaskDraftReady: boolean;
    manualInterventionDraftReady: boolean;
    reviewerPacketReady: boolean;
    jsonExportReady: boolean;
    automaticTaskCreationReady: false;
    automaticInterventionCreationReady: false;
    automaticExecutionReady: false;
  };
  executionInstructions: {
    allowed: string[];
    prohibited: string[];
    requiredBeforeManualConversion: string[];
  };
  safety: {
    providerCalled: false;
    persistencePerformed: false;
    taskCreated: false;
    interventionCreated: false;
    automaticExecutionPerformed: false;
    productPrescriptionPerformed: false;
    dosageAdvicePerformed: false;
    automaticTaskCreationAllowed: false;
    automaticInterventionCreationAllowed: false;
    automaticExecutionAllowed: false;
    manualConversionAllowed: boolean;
    humanReviewRequired: true;
    redactedOutputOnly: true;
  };
  source: {
    workOrderPreview: AiWorkOrderPreview;
  };
};

export const defaultExecutionGateInput: ExecutionGateInput = {
  reviewDecision: "pending",
  evidenceConfirmed: false,
  reviewerAssigned: false,
  safetySignoff: false,
  operatorAcknowledged: false,
  noProductRequest: true,
  noDosageRequest: true,
  manualConversionRequested: false,
};

export const approvedExecutionGateInput: ExecutionGateInput = {
  reviewDecision: "approve-with-caution",
  evidenceConfirmed: true,
  reviewerAssigned: true,
  safetySignoff: true,
  operatorAcknowledged: true,
  noProductRequest: true,
  noDosageRequest: true,
  manualConversionRequested: true,
};

function fingerprint(value: string) {
  let hash = 0x811c9dc5;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return `execution-gate-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function createChecklist(input: ExecutionGateInput): ExecutionGateChecklistItem[] {
  return [
    {
      id: "review-decision",
      label: "Revisione umana approvata con cautela",
      passed: input.reviewDecision === "approve-with-caution",
      required: true,
      blockerWhenMissing: "Decisione revisore non approvata.",
    },
    {
      id: "evidence-confirmed",
      label: "Evidenze fotografiche confermate",
      passed: input.evidenceConfirmed,
      required: true,
      blockerWhenMissing: "Evidenze fotografiche non confermate.",
    },
    {
      id: "reviewer-assigned",
      label: "Reviewer responsabile assegnato",
      passed: input.reviewerAssigned,
      required: true,
      blockerWhenMissing: "Reviewer responsabile non assegnato.",
    },
    {
      id: "safety-signoff",
      label: "Safety sign-off completato",
      passed: input.safetySignoff,
      required: true,
      blockerWhenMissing: "Safety sign-off mancante.",
    },
    {
      id: "operator-acknowledged",
      label: "Operatore informato sui limiti",
      passed: input.operatorAcknowledged,
      required: true,
      blockerWhenMissing: "Operatore non ha confermato i limiti della preview.",
    },
    {
      id: "no-product-request",
      label: "Nessuna richiesta di prodotto",
      passed: input.noProductRequest,
      required: true,
      blockerWhenMissing: "Richiesta prodotto presente: conversione bloccata.",
    },
    {
      id: "no-dosage-request",
      label: "Nessuna richiesta di dosaggio",
      passed: input.noDosageRequest,
      required: true,
      blockerWhenMissing: "Richiesta dosaggio presente: conversione bloccata.",
    },
    {
      id: "manual-conversion-requested",
      label: "Conversione manuale richiesta esplicitamente",
      passed: input.manualConversionRequested,
      required: true,
      blockerWhenMissing: "Conversione manuale non richiesta.",
    },
  ];
}

function statusFromInput(input: ExecutionGateInput, blockers: string[]): ExecutionGateStatus {
  if (input.reviewDecision === "reject") {
    return "rejected";
  }

  if (blockers.length === 0) {
    return "ready-for-manual-conversion";
  }

  return "blocked";
}

export function createAiWorkOrderExecutionGate(
  workOrderPreview: AiWorkOrderPreview = createAiWorkOrderPreview(),
  input: ExecutionGateInput = defaultExecutionGateInput,
): AiWorkOrderExecutionGate {
  const checklist = createChecklist(input);
  const blockers = checklist
    .filter((item) => item.required && !item.passed)
    .map((item) => item.blockerWhenMissing);

  if (input.reviewDecision === "reject") {
    blockers.push("Revisore ha rifiutato il pacchetto.");
  }

  const status = statusFromInput(input, blockers);
  const manualConversionAllowed = status === "ready-for-manual-conversion";
  const gateId = `execution-gate-${workOrderPreview.previewId}`.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  const gateFingerprint = fingerprint(
    [
      gateId,
      workOrderPreview.previewFingerprint,
      workOrderPreview.sourceDossierFingerprint,
      input.reviewDecision,
      String(manualConversionAllowed),
      checklist.map((item) => `${item.id}:${item.passed}`).join("|"),
    ].join("|"),
  );

  return {
    ok: true,
    mode: "work-order-execution-gate-dry-run",
    gateVersion: "agri-ai-work-order-execution-gate-v1",
    gateId,
    gateFingerprint,
    sourcePreviewFingerprint: workOrderPreview.previewFingerprint,
    sourceDossierFingerprint: workOrderPreview.sourceDossierFingerprint,
    status,
    manualConversionAllowed,
    automaticExecutionAllowed: false,
    automaticTaskCreationAllowed: false,
    automaticInterventionCreationAllowed: false,
    noAutomaticDbWrites: true,
    noProviderCall: true,
    reviewDecision: input.reviewDecision,
    checklist,
    blockers,
    approvals: manualConversionAllowed
      ? [
          "Conversione manuale consentita.",
          "Task e interventi restano draft.",
          "Esecuzione automatica disabilitata.",
          "Creazione automatica disabilitata.",
        ]
      : [
          "Conversione manuale bloccata.",
          "Rivedere i blocker prima di procedere.",
        ],
    conversionPackage: {
      manualTaskDraftReady: manualConversionAllowed,
      manualInterventionDraftReady: manualConversionAllowed,
      reviewerPacketReady: true,
      jsonExportReady: true,
      automaticTaskCreationReady: false,
      automaticInterventionCreationReady: false,
      automaticExecutionReady: false,
    },
    executionInstructions: {
      allowed: [
        "Esportare il gate come testo.",
        "Esportare il gate come JSON.",
        "Usare il pacchetto per revisione umana.",
        "Convertire manualmente solo dopo approvazione.",
      ],
      prohibited: [
        "Creare task automaticamente.",
        "Creare interventi automaticamente.",
        "Eseguire azioni automaticamente.",
        "Prescrivere prodotti.",
        "Suggerire dosaggi.",
        "Saltare la revisione umana.",
      ],
      requiredBeforeManualConversion: checklist.map((item) => item.label),
    },
    safety: {
      providerCalled: false,
      persistencePerformed: false,
      taskCreated: false,
      interventionCreated: false,
      automaticExecutionPerformed: false,
      productPrescriptionPerformed: false,
      dosageAdvicePerformed: false,
      automaticTaskCreationAllowed: false,
      automaticInterventionCreationAllowed: false,
      automaticExecutionAllowed: false,
      manualConversionAllowed,
      humanReviewRequired: true,
      redactedOutputOnly: true,
    },
    source: {
      workOrderPreview,
    },
  };
}

export function createApprovedAiWorkOrderExecutionGate() {
  return createAiWorkOrderExecutionGate(createAiWorkOrderPreview(), approvedExecutionGateInput);
}

export function createBlockedAiWorkOrderExecutionGate() {
  return createAiWorkOrderExecutionGate(createAiWorkOrderPreview(), defaultExecutionGateInput);
}

export function createAiWorkOrderExecutionGateFromInput(
  input: PhotoSymptomAnnotationInput,
  gateInput: ExecutionGateInput = defaultExecutionGateInput,
) {
  return createAiWorkOrderExecutionGate(createAiWorkOrderPreviewFromInput(input), gateInput);
}

export function formatAiWorkOrderExecutionGate(gate: AiWorkOrderExecutionGate) {
  return [
    "AI Work Order Execution Gate",
    "",
    `Gate ID: ${gate.gateId}`,
    `Gate fingerprint: ${gate.gateFingerprint}`,
    `Source preview fingerprint: ${gate.sourcePreviewFingerprint}`,
    `Source dossier fingerprint: ${gate.sourceDossierFingerprint}`,
    `Version: ${gate.gateVersion}`,
    `Mode: ${gate.mode}`,
    `Status: ${gate.status}`,
    `Review decision: ${gate.reviewDecision}`,
    `manualConversionAllowed=${gate.manualConversionAllowed}`,
    "",
    "Checklist:",
    ...gate.checklist.map((item) => `- ${item.passed ? "PASS" : "BLOCKED"} ${item.label}`),
    "",
    "Blockers:",
    ...(gate.blockers.length ? gate.blockers.map((item) => `- ${item}`) : ["- Nessun blocker"]),
    "",
    "Approvals:",
    ...gate.approvals.map((item) => `- ${item}`),
    "",
    "Conversion package:",
    `- manualTaskDraftReady=${gate.conversionPackage.manualTaskDraftReady}`,
    `- manualInterventionDraftReady=${gate.conversionPackage.manualInterventionDraftReady}`,
    `- reviewerPacketReady=${gate.conversionPackage.reviewerPacketReady}`,
    `- jsonExportReady=${gate.conversionPackage.jsonExportReady}`,
    "- automaticTaskCreationReady=false",
    "- automaticInterventionCreationReady=false",
    "- automaticExecutionReady=false",
    "",
    "Allowed instructions:",
    ...gate.executionInstructions.allowed.map((item) => `- ${item}`),
    "",
    "Prohibited instructions:",
    ...gate.executionInstructions.prohibited.map((item) => `- ${item}`),
    "",
    "Safety:",
    "- providerCalled=false",
    "- persistencePerformed=false",
    "- taskCreated=false",
    "- interventionCreated=false",
    "- automaticExecutionPerformed=false",
    "- productPrescriptionPerformed=false",
    "- dosageAdvicePerformed=false",
    "- automaticTaskCreationAllowed=false",
    "- automaticInterventionCreationAllowed=false",
    "- automaticExecutionAllowed=false",
    `- manualConversionAllowed=${gate.safety.manualConversionAllowed}`,
    "- humanReviewRequired=true",
    "- redactedOutputOnly=true",
    "",
    "Source work order preview:",
    formatAiWorkOrderPreview(gate.source.workOrderPreview),
  ].join("\n");
}
