import {
  approvedExecutionGateInput,
  createAiWorkOrderExecutionGate,
  createAiWorkOrderExecutionGateFromInput,
  createApprovedAiWorkOrderExecutionGate,
  formatAiWorkOrderExecutionGate,
  type AiWorkOrderExecutionGate,
  type ExecutionGateInput,
} from "./aiWorkOrderExecutionGate";
import type { PhotoSymptomAnnotationInput } from "./photoSymptomAnnotation";

export type ManualConversionAuditDecision =
  | "pending"
  | "ready-for-manual-conversion"
  | "blocked"
  | "rejected";

export type ManualConversionAuditInput = {
  reviewerName: string;
  reviewerRole: "operator" | "agronomist" | "admin";
  convertedBy: string;
  conversionIntent: "manual-task" | "manual-intervention" | "manual-task-and-intervention";
  evidenceReferences: string[];
  selectedTaskIds: string[];
  selectedInterventionIds: string[];
  reviewerNotes: string[];
  conversionNotes: string[];
  finalDecision: ManualConversionAuditDecision;
  signedAtLabel: string;
};

export type ManualConversionAuditEvent = {
  id: string;
  eventType:
    | "gate-read"
    | "review-confirmed"
    | "evidence-linked"
    | "manual-conversion-requested"
    | "automation-blocked"
    | "export-created";
  actor: string;
  timestampLabel: string;
  summary: string;
  safetyRelevant: boolean;
};

export type ManualConversionAuditExport = {
  textAuditReady: true;
  jsonAuditReady: true;
  reviewerPacketReady: true;
  manualTaskConversionReady: boolean;
  manualInterventionConversionReady: boolean;
  automaticTaskCreationReady: false;
  automaticInterventionCreationReady: false;
  automaticExecutionReady: false;
  dbPersistenceReady: false;
};

export type AiManualConversionAudit = {
  ok: true;
  mode: "manual-conversion-audit-dry-run";
  auditVersion: "agri-ai-manual-conversion-audit-v1";
  auditId: string;
  auditFingerprint: string;
  sourceGateFingerprint: string;
  sourcePreviewFingerprint: string;
  sourceDossierFingerprint: string;
  decision: ManualConversionAuditDecision;
  conversionAllowed: boolean;
  manualTaskConversionAllowed: boolean;
  manualInterventionConversionAllowed: boolean;
  automaticTaskCreationAllowed: false;
  automaticInterventionCreationAllowed: false;
  automaticExecutionAllowed: false;
  dbPersistenceAllowed: false;
  providerCallAllowed: false;
  input: ManualConversionAuditInput;
  events: ManualConversionAuditEvent[];
  unresolvedBlockers: string[];
  resolvedApprovals: string[];
  exportPackage: ManualConversionAuditExport;
  conversionInstructions: {
    allowed: string[];
    prohibited: string[];
    requiredHumanRecords: string[];
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
    dbPersistenceAllowed: false;
    manualConversionOnly: true;
    humanReviewRequired: true;
    redactedOutputOnly: true;
  };
  source: {
    executionGate: AiWorkOrderExecutionGate;
  };
};

export const defaultManualConversionAuditInput: ManualConversionAuditInput = {
  reviewerName: "",
  reviewerRole: "agronomist",
  convertedBy: "",
  conversionIntent: "manual-task-and-intervention",
  evidenceReferences: [],
  selectedTaskIds: [],
  selectedInterventionIds: [],
  reviewerNotes: [],
  conversionNotes: [],
  finalDecision: "pending",
  signedAtLabel: "",
};

export const readyManualConversionAuditInput: ManualConversionAuditInput = {
  reviewerName: "Reviewer umano",
  reviewerRole: "agronomist",
  convertedBy: "Operatore autorizzato",
  conversionIntent: "manual-task-and-intervention",
  evidenceReferences: [
    "foto sintomo ravvicinata",
    "foto contesto coltura",
    "decision dossier approvato",
    "execution gate approvato",
  ],
  selectedTaskIds: ["task-evidence-refresh", "task-differential-review", "task-safety-signoff"],
  selectedInterventionIds: ["intervention-observation", "intervention-review"],
  reviewerNotes: [
    "Evidenze confermate manualmente.",
    "La conversione resta manuale.",
    "Nessuna automazione autorizzata.",
  ],
  conversionNotes: [
    "Convertire solo dopo verifica finale in UI.",
    "Non generare prescrizioni.",
    "Non inserire dosaggi.",
  ],
  finalDecision: "ready-for-manual-conversion",
  signedAtLabel: "manual-review-completed",
};

function fingerprint(value: string) {
  let hash = 0x811c9dc5;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return `manual-conversion-audit-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function normalizeList(values: string[]) {
  return values.map((value) => value.trim()).filter(Boolean);
}

function hasMinimumAuditInput(input: ManualConversionAuditInput) {
  return Boolean(
    input.reviewerName.trim() &&
      input.convertedBy.trim() &&
      input.signedAtLabel.trim() &&
      normalizeList(input.evidenceReferences).length >= 2 &&
      normalizeList(input.reviewerNotes).length >= 1 &&
      normalizeList(input.conversionNotes).length >= 1,
  );
}

function determineDecision(
  gate: AiWorkOrderExecutionGate,
  input: ManualConversionAuditInput,
): ManualConversionAuditDecision {
  if (input.finalDecision === "rejected" || gate.status === "rejected") {
    return "rejected";
  }

  if (!gate.manualConversionAllowed) {
    return "blocked";
  }

  if (
    input.finalDecision === "ready-for-manual-conversion" &&
    hasMinimumAuditInput(input)
  ) {
    return "ready-for-manual-conversion";
  }

  return "pending";
}

function createAuditEvents(
  gate: AiWorkOrderExecutionGate,
  input: ManualConversionAuditInput,
  conversionAllowed: boolean,
): ManualConversionAuditEvent[] {
  const actor = input.reviewerName.trim() || "reviewer-pending";
  const convertedBy = input.convertedBy.trim() || "converter-pending";
  const signedAt = input.signedAtLabel.trim() || "timestamp-pending";

  return [
    {
      id: "event-gate-read",
      eventType: "gate-read",
      actor,
      timestampLabel: signedAt,
      summary: `Execution gate letto: ${gate.status}.`,
      safetyRelevant: true,
    },
    {
      id: "event-review-confirmed",
      eventType: "review-confirmed",
      actor,
      timestampLabel: signedAt,
      summary: conversionAllowed
        ? "Review umana completa e conversione manuale consentita."
        : "Review umana non sufficiente per conversione manuale.",
      safetyRelevant: true,
    },
    {
      id: "event-evidence-linked",
      eventType: "evidence-linked",
      actor,
      timestampLabel: signedAt,
      summary: `Evidenze collegate: ${normalizeList(input.evidenceReferences).length}.`,
      safetyRelevant: true,
    },
    {
      id: "event-manual-conversion-requested",
      eventType: "manual-conversion-requested",
      actor: convertedBy,
      timestampLabel: signedAt,
      summary: `Intento conversione: ${input.conversionIntent}.`,
      safetyRelevant: true,
    },
    {
      id: "event-automation-blocked",
      eventType: "automation-blocked",
      actor: "system-guardrail",
      timestampLabel: signedAt,
      summary: "Creazione automatica, persistenza DB ed esecuzione automatica restano bloccate.",
      safetyRelevant: true,
    },
    {
      id: "event-export-created",
      eventType: "export-created",
      actor,
      timestampLabel: signedAt,
      summary: "Audit trail esportabile creato in modalità dry-run.",
      safetyRelevant: false,
    },
  ];
}

function unresolvedBlockers(
  gate: AiWorkOrderExecutionGate,
  input: ManualConversionAuditInput,
  conversionAllowed: boolean,
) {
  const blockers = [...gate.blockers];

  if (!input.reviewerName.trim()) {
    blockers.push("Reviewer name mancante.");
  }

  if (!input.convertedBy.trim()) {
    blockers.push("Operatore conversione mancante.");
  }

  if (!input.signedAtLabel.trim()) {
    blockers.push("Firma temporale manuale mancante.");
  }

  if (normalizeList(input.evidenceReferences).length < 2) {
    blockers.push("Evidenze insufficienti per audit.");
  }

  if (normalizeList(input.reviewerNotes).length < 1) {
    blockers.push("Note revisore mancanti.");
  }

  if (normalizeList(input.conversionNotes).length < 1) {
    blockers.push("Note conversione mancanti.");
  }

  if (input.finalDecision !== "ready-for-manual-conversion") {
    blockers.push("Decisione finale audit non pronta per conversione manuale.");
  }

  if (!conversionAllowed) {
    blockers.push("Conversione manuale non consentita dall'audit.");
  }

  return Array.from(new Set(blockers));
}

function resolvedApprovals(
  input: ManualConversionAuditInput,
  conversionAllowed: boolean,
) {
  const approvals = [
    "Provider AI non chiamato.",
    "Persistenza DB non eseguita.",
    "Creazione automatica task non consentita.",
    "Creazione automatica interventi non consentita.",
    "Esecuzione automatica non consentita.",
    "Prescrizione prodotto non consentita.",
    "Dosaggio non consentito.",
  ];

  if (conversionAllowed) {
    approvals.push("Conversione manuale autorizzata solo come procedura umana.");
  }

  if (input.reviewerName.trim()) {
    approvals.push("Reviewer identificato.");
  }

  if (input.convertedBy.trim()) {
    approvals.push("Operatore conversione identificato.");
  }

  return approvals;
}

export function createAiManualConversionAudit(
  executionGate: AiWorkOrderExecutionGate = createApprovedAiWorkOrderExecutionGate(),
  input: ManualConversionAuditInput = defaultManualConversionAuditInput,
): AiManualConversionAudit {
  const decision = determineDecision(executionGate, input);
  const conversionAllowed =
    decision === "ready-for-manual-conversion" &&
    executionGate.manualConversionAllowed === true;

  const manualTaskConversionAllowed =
    conversionAllowed &&
    (input.conversionIntent === "manual-task" ||
      input.conversionIntent === "manual-task-and-intervention");

  const manualInterventionConversionAllowed =
    conversionAllowed &&
    (input.conversionIntent === "manual-intervention" ||
      input.conversionIntent === "manual-task-and-intervention");

  const auditId = `manual-conversion-audit-${executionGate.gateId}`.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  const auditFingerprint = fingerprint(
    [
      auditId,
      executionGate.gateFingerprint,
      executionGate.sourcePreviewFingerprint,
      executionGate.sourceDossierFingerprint,
      input.reviewerName,
      input.convertedBy,
      input.finalDecision,
      String(conversionAllowed),
      input.evidenceReferences.join("|"),
      input.selectedTaskIds.join("|"),
      input.selectedInterventionIds.join("|"),
    ].join("|"),
  );

  const exportPackage: ManualConversionAuditExport = {
    textAuditReady: true,
    jsonAuditReady: true,
    reviewerPacketReady: true,
    manualTaskConversionReady: manualTaskConversionAllowed,
    manualInterventionConversionReady: manualInterventionConversionAllowed,
    automaticTaskCreationReady: false,
    automaticInterventionCreationReady: false,
    automaticExecutionReady: false,
    dbPersistenceReady: false,
  };

  const blockers = unresolvedBlockers(executionGate, input, conversionAllowed);

  return {
    ok: true,
    mode: "manual-conversion-audit-dry-run",
    auditVersion: "agri-ai-manual-conversion-audit-v1",
    auditId,
    auditFingerprint,
    sourceGateFingerprint: executionGate.gateFingerprint,
    sourcePreviewFingerprint: executionGate.sourcePreviewFingerprint,
    sourceDossierFingerprint: executionGate.sourceDossierFingerprint,
    decision,
    conversionAllowed,
    manualTaskConversionAllowed,
    manualInterventionConversionAllowed,
    automaticTaskCreationAllowed: false,
    automaticInterventionCreationAllowed: false,
    automaticExecutionAllowed: false,
    dbPersistenceAllowed: false,
    providerCallAllowed: false,
    input: {
      ...input,
      evidenceReferences: normalizeList(input.evidenceReferences),
      selectedTaskIds: normalizeList(input.selectedTaskIds),
      selectedInterventionIds: normalizeList(input.selectedInterventionIds),
      reviewerNotes: normalizeList(input.reviewerNotes),
      conversionNotes: normalizeList(input.conversionNotes),
    },
    events: createAuditEvents(executionGate, input, conversionAllowed),
    unresolvedBlockers: blockers,
    resolvedApprovals: resolvedApprovals(input, conversionAllowed),
    exportPackage,
    conversionInstructions: {
      allowed: [
        "Esportare audit testuale.",
        "Esportare audit JSON.",
        "Allegare audit a revisione umana.",
        "Convertire manualmente solo se conversionAllowed=true.",
      ],
      prohibited: [
        "Creare task automaticamente.",
        "Creare interventi automaticamente.",
        "Scrivere su DB automaticamente.",
        "Eseguire azioni automaticamente.",
        "Prescrivere prodotti.",
        "Suggerire dosaggi.",
        "Saltare revisione umana.",
      ],
      requiredHumanRecords: [
        "Nome reviewer.",
        "Ruolo reviewer.",
        "Operatore conversione.",
        "Evidenze fotografiche.",
        "Decisione gate.",
        "Safety sign-off.",
        "Note reviewer.",
        "Note conversione.",
      ],
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
      dbPersistenceAllowed: false,
      manualConversionOnly: true,
      humanReviewRequired: true,
      redactedOutputOnly: true,
    },
    source: {
      executionGate,
    },
  };
}

export function createReadyAiManualConversionAudit() {
  return createAiManualConversionAudit(
    createApprovedAiWorkOrderExecutionGate(),
    readyManualConversionAuditInput,
  );
}

export function createBlockedAiManualConversionAudit() {
  return createAiManualConversionAudit(
    createAiWorkOrderExecutionGate(undefined, {
      ...approvedExecutionGateInput,
      safetySignoff: false,
      manualConversionRequested: false,
    }),
    defaultManualConversionAuditInput,
  );
}

export function createAiManualConversionAuditFromInput(
  input: PhotoSymptomAnnotationInput,
  gateInput: ExecutionGateInput = approvedExecutionGateInput,
  auditInput: ManualConversionAuditInput = readyManualConversionAuditInput,
) {
  return createAiManualConversionAudit(
    createAiWorkOrderExecutionGateFromInput(input, gateInput),
    auditInput,
  );
}

export function formatAiManualConversionAudit(audit: AiManualConversionAudit) {
  return [
    "AI Manual Conversion Audit",
    "",
    `Audit ID: ${audit.auditId}`,
    `Audit fingerprint: ${audit.auditFingerprint}`,
    `Source gate fingerprint: ${audit.sourceGateFingerprint}`,
    `Source preview fingerprint: ${audit.sourcePreviewFingerprint}`,
    `Source dossier fingerprint: ${audit.sourceDossierFingerprint}`,
    `Version: ${audit.auditVersion}`,
    `Mode: ${audit.mode}`,
    `Decision: ${audit.decision}`,
    `conversionAllowed=${audit.conversionAllowed}`,
    `manualTaskConversionAllowed=${audit.manualTaskConversionAllowed}`,
    `manualInterventionConversionAllowed=${audit.manualInterventionConversionAllowed}`,
    "",
    "Input:",
    `- reviewerName=${audit.input.reviewerName || "missing"}`,
    `- reviewerRole=${audit.input.reviewerRole}`,
    `- convertedBy=${audit.input.convertedBy || "missing"}`,
    `- conversionIntent=${audit.input.conversionIntent}`,
    `- signedAtLabel=${audit.input.signedAtLabel || "missing"}`,
    "",
    "Events:",
    ...audit.events.map((event) => `- ${event.id}: ${event.summary}`),
    "",
    "Unresolved blockers:",
    ...(audit.unresolvedBlockers.length
      ? audit.unresolvedBlockers.map((blocker) => `- ${blocker}`)
      : ["- Nessun blocker"]),
    "",
    "Resolved approvals:",
    ...audit.resolvedApprovals.map((approval) => `- ${approval}`),
    "",
    "Export package:",
    "- textAuditReady=true",
    "- jsonAuditReady=true",
    "- reviewerPacketReady=true",
    `- manualTaskConversionReady=${audit.exportPackage.manualTaskConversionReady}`,
    `- manualInterventionConversionReady=${audit.exportPackage.manualInterventionConversionReady}`,
    "- automaticTaskCreationReady=false",
    "- automaticInterventionCreationReady=false",
    "- automaticExecutionReady=false",
    "- dbPersistenceReady=false",
    "",
    "Allowed instructions:",
    ...audit.conversionInstructions.allowed.map((item) => `- ${item}`),
    "",
    "Prohibited instructions:",
    ...audit.conversionInstructions.prohibited.map((item) => `- ${item}`),
    "",
    "Required human records:",
    ...audit.conversionInstructions.requiredHumanRecords.map((item) => `- ${item}`),
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
    "- dbPersistenceAllowed=false",
    "- manualConversionOnly=true",
    "- humanReviewRequired=true",
    "- redactedOutputOnly=true",
    "",
    "Source execution gate:",
    formatAiWorkOrderExecutionGate(audit.source.executionGate),
  ].join("\n");
}
