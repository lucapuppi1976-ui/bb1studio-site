import {
  createAiManualConversionAudit,
  createAiManualConversionAuditFromInput,
  createReadyAiManualConversionAudit,
  formatAiManualConversionAudit,
  readyManualConversionAuditInput,
  type AiManualConversionAudit,
  type ManualConversionAuditInput,
} from "./aiManualConversionAudit";
import {
  approvedExecutionGateInput,
  type ExecutionGateInput,
} from "./aiWorkOrderExecutionGate";
import type { PhotoSymptomAnnotationInput } from "./photoSymptomAnnotation";

export type CaseExportShareMode =
  | "private-internal"
  | "review-only"
  | "external-redacted";

export type CaseExportBundleInput = {
  exporterName: string;
  exportReason: "human-review" | "manual-conversion" | "audit-archive" | "training-case";
  exportLabel: string;
  shareMode: CaseExportShareMode;
  includeJson: boolean;
  includeText: boolean;
  includeReviewerPacket: boolean;
  includeSafetySummary: boolean;
  includeSourceFingerprints: boolean;
  reviewerVisibleOnly: boolean;
};

export type CaseExportArtifact = {
  id: string;
  label: string;
  artifactType:
    | "case-manifest"
    | "manual-conversion-audit"
    | "execution-gate"
    | "work-order-preview"
    | "decision-dossier"
    | "review-packet"
    | "safety-summary"
    | "text-export"
    | "json-export";
  ready: boolean;
  fingerprint: string;
  redacted: boolean;
  humanReadable: boolean;
};

export type CaseExportRedactionRule = {
  id: string;
  label: string;
  applied: boolean;
  reason: string;
};

export type AiCaseExportBundle = {
  ok: true;
  mode: "case-export-bundle-dry-run";
  bundleVersion: "agri-ai-case-export-bundle-v1";
  bundleId: string;
  bundleFingerprint: string;
  bundleReady: boolean;
  shareMode: CaseExportShareMode;
  sourceAuditFingerprint: string;
  sourceGateFingerprint: string;
  sourcePreviewFingerprint: string;
  sourceDossierFingerprint: string;
  exportInput: CaseExportBundleInput;
  artifacts: CaseExportArtifact[];
  redactionRules: CaseExportRedactionRule[];
  bundleManifest: {
    artifactCount: number;
    readyArtifactCount: number;
    redactedArtifactCount: number;
    containsJsonExport: boolean;
    containsTextExport: boolean;
    containsReviewerPacket: boolean;
    containsSafetySummary: boolean;
    containsSourceFingerprints: boolean;
  };
  exportPackage: {
    textBundleReady: boolean;
    jsonBundleReady: boolean;
    reviewerPacketReady: boolean;
    safetySummaryReady: boolean;
    externalRedactedBundleReady: boolean;
    publicShareReady: false;
    dbPersistenceReady: false;
    automaticTaskCreationReady: false;
    automaticInterventionCreationReady: false;
    automaticExecutionReady: false;
  };
  exportInstructions: {
    allowed: string[];
    prohibited: string[];
    requiredHumanChecks: string[];
  };
  safety: {
    providerCalled: false;
    persistencePerformed: false;
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
    publicShareAllowed: false;
    manualExportOnly: true;
    humanReviewRequired: true;
    redactedOutputOnly: true;
  };
  source: {
    manualConversionAudit: AiManualConversionAudit;
  };
};

export const defaultCaseExportBundleInput: CaseExportBundleInput = {
  exporterName: "",
  exportReason: "human-review",
  exportLabel: "",
  shareMode: "private-internal",
  includeJson: true,
  includeText: true,
  includeReviewerPacket: true,
  includeSafetySummary: true,
  includeSourceFingerprints: true,
  reviewerVisibleOnly: true,
};

export const readyCaseExportBundleInput: CaseExportBundleInput = {
  exporterName: "Exporter umano",
  exportReason: "manual-conversion",
  exportLabel: "case-export-ready",
  shareMode: "review-only",
  includeJson: true,
  includeText: true,
  includeReviewerPacket: true,
  includeSafetySummary: true,
  includeSourceFingerprints: true,
  reviewerVisibleOnly: true,
};

function fingerprint(value: string) {
  let hash = 0x811c9dc5;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return `case-export-bundle-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function hasMinimumExportInput(input: CaseExportBundleInput) {
  return Boolean(
    input.exporterName.trim() &&
      input.exportLabel.trim() &&
      input.reviewerVisibleOnly &&
      (input.includeJson || input.includeText || input.includeReviewerPacket),
  );
}

function artifactFingerprint(seed: string) {
  return fingerprint(`artifact:${seed}`);
}

function createArtifacts(
  audit: AiManualConversionAudit,
  input: CaseExportBundleInput,
): CaseExportArtifact[] {
  return [
    {
      id: "artifact-case-manifest",
      label: "Case manifest",
      artifactType: "case-manifest",
      ready: true,
      fingerprint: artifactFingerprint(`manifest:${audit.auditFingerprint}`),
      redacted: true,
      humanReadable: true,
    },
    {
      id: "artifact-manual-conversion-audit",
      label: "Manual conversion audit",
      artifactType: "manual-conversion-audit",
      ready: true,
      fingerprint: audit.auditFingerprint,
      redacted: true,
      humanReadable: true,
    },
    {
      id: "artifact-execution-gate",
      label: "Work order execution gate",
      artifactType: "execution-gate",
      ready: true,
      fingerprint: audit.sourceGateFingerprint,
      redacted: true,
      humanReadable: true,
    },
    {
      id: "artifact-work-order-preview",
      label: "Work order preview",
      artifactType: "work-order-preview",
      ready: true,
      fingerprint: audit.sourcePreviewFingerprint,
      redacted: true,
      humanReadable: true,
    },
    {
      id: "artifact-decision-dossier",
      label: "Decision dossier",
      artifactType: "decision-dossier",
      ready: true,
      fingerprint: audit.sourceDossierFingerprint,
      redacted: true,
      humanReadable: true,
    },
    {
      id: "artifact-reviewer-packet",
      label: "Reviewer packet",
      artifactType: "review-packet",
      ready: input.includeReviewerPacket,
      fingerprint: artifactFingerprint(`reviewer:${audit.auditFingerprint}:${input.includeReviewerPacket}`),
      redacted: true,
      humanReadable: true,
    },
    {
      id: "artifact-safety-summary",
      label: "Safety summary",
      artifactType: "safety-summary",
      ready: input.includeSafetySummary,
      fingerprint: artifactFingerprint(`safety:${audit.auditFingerprint}:${input.includeSafetySummary}`),
      redacted: true,
      humanReadable: true,
    },
    {
      id: "artifact-text-export",
      label: "Text bundle export",
      artifactType: "text-export",
      ready: input.includeText,
      fingerprint: artifactFingerprint(`text:${audit.auditFingerprint}:${input.includeText}`),
      redacted: true,
      humanReadable: true,
    },
    {
      id: "artifact-json-export",
      label: "JSON bundle export",
      artifactType: "json-export",
      ready: input.includeJson,
      fingerprint: artifactFingerprint(`json:${audit.auditFingerprint}:${input.includeJson}`),
      redacted: true,
      humanReadable: false,
    },
  ];
}

function createRedactionRules(input: CaseExportBundleInput): CaseExportRedactionRule[] {
  return [
    {
      id: "redact-provider-secrets",
      label: "Provider secrets excluded",
      applied: true,
      reason: "Nessuna chiave provider deve entrare nel bundle.",
    },
    {
      id: "redact-cron-secret",
      label: "CRON secret excluded",
      applied: true,
      reason: "Secret operativo non esportabile.",
    },
    {
      id: "redact-personal-data",
      label: "Reviewer-only visibility",
      applied: input.reviewerVisibleOnly,
      reason: "Il bundle resta visibile solo ai revisori autorizzati.",
    },
    {
      id: "redact-external-share",
      label: "External share redaction",
      applied: input.shareMode === "external-redacted",
      reason: "Export esterno solo in forma redatta.",
    },
    {
      id: "block-public-share",
      label: "Public share blocked",
      applied: true,
      reason: "Condivisione pubblica non autorizzata in questa release.",
    },
  ];
}

function manifestFromArtifacts(input: CaseExportBundleInput, artifacts: CaseExportArtifact[]) {
  return {
    artifactCount: artifacts.length,
    readyArtifactCount: artifacts.filter((artifact) => artifact.ready).length,
    redactedArtifactCount: artifacts.filter((artifact) => artifact.redacted).length,
    containsJsonExport: input.includeJson,
    containsTextExport: input.includeText,
    containsReviewerPacket: input.includeReviewerPacket,
    containsSafetySummary: input.includeSafetySummary,
    containsSourceFingerprints: input.includeSourceFingerprints,
  };
}

export function createAiCaseExportBundle(
  manualConversionAudit: AiManualConversionAudit = createReadyAiManualConversionAudit(),
  input: CaseExportBundleInput = defaultCaseExportBundleInput,
): AiCaseExportBundle {
  const artifacts = createArtifacts(manualConversionAudit, input);
  const redactionRules = createRedactionRules(input);
  const bundleReady =
    hasMinimumExportInput(input) &&
    manualConversionAudit.ok &&
    manualConversionAudit.safety.providerCalled === false &&
    manualConversionAudit.safety.persistencePerformed === false &&
    manualConversionAudit.safety.taskCreated === false &&
    manualConversionAudit.safety.interventionCreated === false &&
    manualConversionAudit.safety.automaticExecutionPerformed === false;

  const bundleId = `case-export-${manualConversionAudit.auditId}`.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  const bundleFingerprint = fingerprint(
    [
      bundleId,
      manualConversionAudit.auditFingerprint,
      manualConversionAudit.sourceGateFingerprint,
      manualConversionAudit.sourcePreviewFingerprint,
      manualConversionAudit.sourceDossierFingerprint,
      input.exporterName,
      input.exportReason,
      input.exportLabel,
      input.shareMode,
      String(bundleReady),
      artifacts.map((artifact) => `${artifact.id}:${artifact.ready}:${artifact.fingerprint}`).join("|"),
      redactionRules.map((rule) => `${rule.id}:${rule.applied}`).join("|"),
    ].join("|"),
  );

  return {
    ok: true,
    mode: "case-export-bundle-dry-run",
    bundleVersion: "agri-ai-case-export-bundle-v1",
    bundleId,
    bundleFingerprint,
    bundleReady,
    shareMode: input.shareMode,
    sourceAuditFingerprint: manualConversionAudit.auditFingerprint,
    sourceGateFingerprint: manualConversionAudit.sourceGateFingerprint,
    sourcePreviewFingerprint: manualConversionAudit.sourcePreviewFingerprint,
    sourceDossierFingerprint: manualConversionAudit.sourceDossierFingerprint,
    exportInput: {
      ...input,
      exporterName: input.exporterName.trim(),
      exportLabel: input.exportLabel.trim(),
    },
    artifacts,
    redactionRules,
    bundleManifest: manifestFromArtifacts(input, artifacts),
    exportPackage: {
      textBundleReady: bundleReady && input.includeText,
      jsonBundleReady: bundleReady && input.includeJson,
      reviewerPacketReady: bundleReady && input.includeReviewerPacket,
      safetySummaryReady: bundleReady && input.includeSafetySummary,
      externalRedactedBundleReady: bundleReady && input.shareMode === "external-redacted",
      publicShareReady: false,
      dbPersistenceReady: false,
      automaticTaskCreationReady: false,
      automaticInterventionCreationReady: false,
      automaticExecutionReady: false,
    },
    exportInstructions: {
      allowed: [
        "Esportare bundle testuale.",
        "Esportare bundle JSON.",
        "Allegare bundle a revisione umana.",
        "Usare fingerprint per tracciabilità manuale.",
      ],
      prohibited: [
        "Salvare automaticamente il bundle su DB.",
        "Condividere pubblicamente il bundle.",
        "Creare task automaticamente.",
        "Creare interventi automaticamente.",
        "Eseguire azioni automaticamente.",
        "Prescrivere prodotti.",
        "Suggerire dosaggi.",
        "Includere chiavi provider o secret operativi.",
      ],
      requiredHumanChecks: [
        "Verifica reviewer.",
        "Verifica export reason.",
        "Verifica share mode.",
        "Verifica redazioni applicate.",
        "Verifica fingerprint sorgenti.",
        "Verifica assenza automazioni.",
      ],
    },
    safety: {
      providerCalled: false,
      persistencePerformed: false,
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
      publicShareAllowed: false,
      manualExportOnly: true,
      humanReviewRequired: true,
      redactedOutputOnly: true,
    },
    source: {
      manualConversionAudit,
    },
  };
}

export function createReadyAiCaseExportBundle() {
  return createAiCaseExportBundle(
    createReadyAiManualConversionAudit(),
    readyCaseExportBundleInput,
  );
}

export function createBlockedAiCaseExportBundle() {
  return createAiCaseExportBundle(
    createAiManualConversionAudit(),
    defaultCaseExportBundleInput,
  );
}

export function createAiCaseExportBundleFromInput(
  input: PhotoSymptomAnnotationInput,
  gateInput: ExecutionGateInput = approvedExecutionGateInput,
  auditInput: ManualConversionAuditInput = readyManualConversionAuditInput,
  bundleInput: CaseExportBundleInput = readyCaseExportBundleInput,
) {
  return createAiCaseExportBundle(
    createAiManualConversionAuditFromInput(input, gateInput, auditInput),
    bundleInput,
  );
}

export function formatAiCaseExportBundle(bundle: AiCaseExportBundle) {
  return [
    "AI Case Export Bundle",
    "",
    `Bundle ID: ${bundle.bundleId}`,
    `Bundle fingerprint: ${bundle.bundleFingerprint}`,
    `Source audit fingerprint: ${bundle.sourceAuditFingerprint}`,
    `Source gate fingerprint: ${bundle.sourceGateFingerprint}`,
    `Source preview fingerprint: ${bundle.sourcePreviewFingerprint}`,
    `Source dossier fingerprint: ${bundle.sourceDossierFingerprint}`,
    `Version: ${bundle.bundleVersion}`,
    `Mode: ${bundle.mode}`,
    `bundleReady=${bundle.bundleReady}`,
    `shareMode=${bundle.shareMode}`,
    "",
    "Export input:",
    `- exporterName=${bundle.exportInput.exporterName || "missing"}`,
    `- exportReason=${bundle.exportInput.exportReason}`,
    `- exportLabel=${bundle.exportInput.exportLabel || "missing"}`,
    `- reviewerVisibleOnly=${bundle.exportInput.reviewerVisibleOnly}`,
    "",
    "Bundle manifest:",
    `- artifactCount=${bundle.bundleManifest.artifactCount}`,
    `- readyArtifactCount=${bundle.bundleManifest.readyArtifactCount}`,
    `- redactedArtifactCount=${bundle.bundleManifest.redactedArtifactCount}`,
    `- containsJsonExport=${bundle.bundleManifest.containsJsonExport}`,
    `- containsTextExport=${bundle.bundleManifest.containsTextExport}`,
    `- containsReviewerPacket=${bundle.bundleManifest.containsReviewerPacket}`,
    `- containsSafetySummary=${bundle.bundleManifest.containsSafetySummary}`,
    `- containsSourceFingerprints=${bundle.bundleManifest.containsSourceFingerprints}`,
    "",
    "Artifacts:",
    ...bundle.artifacts.map(
      (artifact) =>
        `- ${artifact.ready ? "READY" : "SKIP"} ${artifact.label} | ${artifact.fingerprint} | redacted=${artifact.redacted}`,
    ),
    "",
    "Redaction rules:",
    ...bundle.redactionRules.map((rule) => `- ${rule.applied ? "APPLIED" : "SKIP"} ${rule.label}: ${rule.reason}`),
    "",
    "Export package:",
    `- textBundleReady=${bundle.exportPackage.textBundleReady}`,
    `- jsonBundleReady=${bundle.exportPackage.jsonBundleReady}`,
    `- reviewerPacketReady=${bundle.exportPackage.reviewerPacketReady}`,
    `- safetySummaryReady=${bundle.exportPackage.safetySummaryReady}`,
    `- externalRedactedBundleReady=${bundle.exportPackage.externalRedactedBundleReady}`,
    "- publicShareReady=false",
    "- dbPersistenceReady=false",
    "- automaticTaskCreationReady=false",
    "- automaticInterventionCreationReady=false",
    "- automaticExecutionReady=false",
    "",
    "Allowed instructions:",
    ...bundle.exportInstructions.allowed.map((item) => `- ${item}`),
    "",
    "Prohibited instructions:",
    ...bundle.exportInstructions.prohibited.map((item) => `- ${item}`),
    "",
    "Required human checks:",
    ...bundle.exportInstructions.requiredHumanChecks.map((item) => `- ${item}`),
    "",
    "Safety:",
    "- providerCalled=false",
    "- persistencePerformed=false",
    "- taskCreated=false",
    "- interventionCreated=false",
    "- automaticExecutionPerformed=false",
    "- publicSharePerformed=false",
    "- productPrescriptionPerformed=false",
    "- dosageAdvicePerformed=false",
    "- automaticTaskCreationAllowed=false",
    "- automaticInterventionCreationAllowed=false",
    "- automaticExecutionAllowed=false",
    "- dbPersistenceAllowed=false",
    "- publicShareAllowed=false",
    "- manualExportOnly=true",
    "- humanReviewRequired=true",
    "- redactedOutputOnly=true",
    "",
    "Source manual conversion audit:",
    formatAiManualConversionAudit(bundle.source.manualConversionAudit),
  ].join("\n");
}
