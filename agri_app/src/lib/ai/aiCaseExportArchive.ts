import {
  createAiCaseExportBundle,
  createAiCaseExportBundleFromInput,
  createBlockedAiCaseExportBundle,
  createReadyAiCaseExportBundle,
  formatAiCaseExportBundle,
  readyCaseExportBundleInput,
  type AiCaseExportBundle,
  type CaseExportBundleInput,
} from "./aiCaseExportBundle";
import {
  readyManualConversionAuditInput,
  type ManualConversionAuditInput,
} from "./aiManualConversionAudit";
import {
  approvedExecutionGateInput,
  type ExecutionGateInput,
} from "./aiWorkOrderExecutionGate";
import type { PhotoSymptomAnnotationInput } from "./photoSymptomAnnotation";

export type CaseExportArchiveMode =
  | "review-archive"
  | "manual-conversion-archive"
  | "external-redacted-archive";

export type CaseExportArchiveInput = {
  archiveName: string;
  preparedBy: string;
  archiveMode: CaseExportArchiveMode;
  includeTextBundle: boolean;
  includeJsonBundle: boolean;
  includeSafetySummary: boolean;
  includeRedactionManifest: boolean;
  includeFingerprints: boolean;
  includeHumanReviewNotes: boolean;
  reviewerOnlyAccess: boolean;
  downloadPrepared: boolean;
};

export type CaseExportArchiveFile = {
  id: string;
  fileName: string;
  fileType:
    | "manifest-json"
    | "bundle-json"
    | "bundle-text"
    | "safety-summary-text"
    | "redaction-manifest-json"
    | "fingerprints-json"
    | "review-notes-text";
  ready: boolean;
  mimeType: "application/json" | "text/plain";
  sizeEstimateBytes: number;
  fingerprint: string;
  redacted: boolean;
  downloadable: boolean;
};

export type CaseExportArchiveManifest = {
  archiveName: string;
  archiveMode: CaseExportArchiveMode;
  preparedBy: string;
  fileCount: number;
  readyFileCount: number;
  downloadableFileCount: number;
  redactedFileCount: number;
  reviewerOnlyAccess: boolean;
  downloadPrepared: boolean;
  sourceBundleFingerprint: string;
  sourceAuditFingerprint: string;
  sourceGateFingerprint: string;
  sourcePreviewFingerprint: string;
  sourceDossierFingerprint: string;
};

export type AiCaseExportArchive = {
  ok: true;
  mode: "case-export-archive-dry-run";
  archiveVersion: "agri-ai-case-export-archive-v1";
  archiveId: string;
  archiveFingerprint: string;
  archiveReady: boolean;
  archiveInput: CaseExportArchiveInput;
  manifest: CaseExportArchiveManifest;
  files: CaseExportArchiveFile[];
  textArchive: string;
  jsonArchive: string;
  downloadInstructions: {
    allowed: string[];
    prohibited: string[];
    manualSteps: string[];
  };
  archivePackage: {
    archiveManifestReady: boolean;
    textArchiveReady: boolean;
    jsonArchiveReady: boolean;
    redactionManifestReady: boolean;
    fingerprintManifestReady: boolean;
    downloadableArchiveReady: boolean;
    publicShareReady: false;
    dbPersistenceReady: false;
    automaticTaskCreationReady: false;
    automaticInterventionCreationReady: false;
    automaticExecutionReady: false;
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
    manualDownloadOnly: true;
    manualExportOnly: true;
    humanReviewRequired: true;
    redactedOutputOnly: true;
  };
  source: {
    caseExportBundle: AiCaseExportBundle;
  };
};

export const defaultCaseExportArchiveInput: CaseExportArchiveInput = {
  archiveName: "",
  preparedBy: "",
  archiveMode: "review-archive",
  includeTextBundle: true,
  includeJsonBundle: true,
  includeSafetySummary: true,
  includeRedactionManifest: true,
  includeFingerprints: true,
  includeHumanReviewNotes: true,
  reviewerOnlyAccess: true,
  downloadPrepared: false,
};

export const readyCaseExportArchiveInput: CaseExportArchiveInput = {
  archiveName: "agri-ai-case-export-ready",
  preparedBy: "Operatore archivio",
  archiveMode: "manual-conversion-archive",
  includeTextBundle: true,
  includeJsonBundle: true,
  includeSafetySummary: true,
  includeRedactionManifest: true,
  includeFingerprints: true,
  includeHumanReviewNotes: true,
  reviewerOnlyAccess: true,
  downloadPrepared: true,
};

function fingerprint(value: string) {
  let hash = 0x811c9dc5;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return `case-export-archive-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function safeSlug(value: string) {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/gi, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "agri-ai-case-export";
}

function estimateSize(value: string) {
  return Math.max(64, value.length * 2);
}

function hasMinimumArchiveInput(input: CaseExportArchiveInput) {
  return Boolean(
    input.archiveName.trim() &&
      input.preparedBy.trim() &&
      input.reviewerOnlyAccess &&
      input.downloadPrepared &&
      (input.includeTextBundle || input.includeJsonBundle),
  );
}

function fileFingerprint(seed: string) {
  return fingerprint(`file:${seed}`);
}

function createArchiveFiles(
  bundle: AiCaseExportBundle,
  input: CaseExportArchiveInput,
): CaseExportArchiveFile[] {
  const archiveSlug = safeSlug(input.archiveName || bundle.bundleId);
  const bundleText = formatAiCaseExportBundle(bundle);
  const bundleJson = JSON.stringify(bundle, null, 2);

  return [
    {
      id: "archive-manifest-json",
      fileName: `${archiveSlug}-manifest.json`,
      fileType: "manifest-json",
      ready: true,
      mimeType: "application/json",
      sizeEstimateBytes: estimateSize(bundle.bundleFingerprint),
      fingerprint: fileFingerprint(`manifest:${bundle.bundleFingerprint}`),
      redacted: true,
      downloadable: true,
    },
    {
      id: "case-export-bundle-json",
      fileName: `${archiveSlug}-bundle.json`,
      fileType: "bundle-json",
      ready: input.includeJsonBundle,
      mimeType: "application/json",
      sizeEstimateBytes: estimateSize(bundleJson),
      fingerprint: fileFingerprint(`bundle-json:${bundle.bundleFingerprint}:${input.includeJsonBundle}`),
      redacted: true,
      downloadable: input.includeJsonBundle,
    },
    {
      id: "case-export-bundle-text",
      fileName: `${archiveSlug}-bundle.txt`,
      fileType: "bundle-text",
      ready: input.includeTextBundle,
      mimeType: "text/plain",
      sizeEstimateBytes: estimateSize(bundleText),
      fingerprint: fileFingerprint(`bundle-text:${bundle.bundleFingerprint}:${input.includeTextBundle}`),
      redacted: true,
      downloadable: input.includeTextBundle,
    },
    {
      id: "safety-summary-text",
      fileName: `${archiveSlug}-safety-summary.txt`,
      fileType: "safety-summary-text",
      ready: input.includeSafetySummary,
      mimeType: "text/plain",
      sizeEstimateBytes: estimateSize("safety-summary"),
      fingerprint: fileFingerprint(`safety:${bundle.bundleFingerprint}:${input.includeSafetySummary}`),
      redacted: true,
      downloadable: input.includeSafetySummary,
    },
    {
      id: "redaction-manifest-json",
      fileName: `${archiveSlug}-redaction-manifest.json`,
      fileType: "redaction-manifest-json",
      ready: input.includeRedactionManifest,
      mimeType: "application/json",
      sizeEstimateBytes: estimateSize(JSON.stringify(bundle.redactionRules)),
      fingerprint: fileFingerprint(`redaction:${bundle.bundleFingerprint}:${input.includeRedactionManifest}`),
      redacted: true,
      downloadable: input.includeRedactionManifest,
    },
    {
      id: "fingerprints-json",
      fileName: `${archiveSlug}-fingerprints.json`,
      fileType: "fingerprints-json",
      ready: input.includeFingerprints,
      mimeType: "application/json",
      sizeEstimateBytes: estimateSize(bundle.bundleFingerprint),
      fingerprint: fileFingerprint(`fingerprints:${bundle.bundleFingerprint}:${input.includeFingerprints}`),
      redacted: true,
      downloadable: input.includeFingerprints,
    },
    {
      id: "human-review-notes-text",
      fileName: `${archiveSlug}-human-review-notes.txt`,
      fileType: "review-notes-text",
      ready: input.includeHumanReviewNotes,
      mimeType: "text/plain",
      sizeEstimateBytes: estimateSize("human-review-notes"),
      fingerprint: fileFingerprint(`review-notes:${bundle.bundleFingerprint}:${input.includeHumanReviewNotes}`),
      redacted: true,
      downloadable: input.includeHumanReviewNotes,
    },
  ];
}

function createManifest(
  bundle: AiCaseExportBundle,
  input: CaseExportArchiveInput,
  files: CaseExportArchiveFile[],
): CaseExportArchiveManifest {
  return {
    archiveName: input.archiveName.trim(),
    archiveMode: input.archiveMode,
    preparedBy: input.preparedBy.trim(),
    fileCount: files.length,
    readyFileCount: files.filter((file) => file.ready).length,
    downloadableFileCount: files.filter((file) => file.downloadable).length,
    redactedFileCount: files.filter((file) => file.redacted).length,
    reviewerOnlyAccess: input.reviewerOnlyAccess,
    downloadPrepared: input.downloadPrepared,
    sourceBundleFingerprint: bundle.bundleFingerprint,
    sourceAuditFingerprint: bundle.sourceAuditFingerprint,
    sourceGateFingerprint: bundle.sourceGateFingerprint,
    sourcePreviewFingerprint: bundle.sourcePreviewFingerprint,
    sourceDossierFingerprint: bundle.sourceDossierFingerprint,
  };
}

function createTextArchive(bundle: AiCaseExportBundle, input: CaseExportArchiveInput, files: CaseExportArchiveFile[]) {
  return [
    "AI Case Export Archive Pack",
    "",
    `Archive name: ${input.archiveName || "missing"}`,
    `Prepared by: ${input.preparedBy || "missing"}`,
    `Archive mode: ${input.archiveMode}`,
    `Reviewer only access: ${input.reviewerOnlyAccess}`,
    `Download prepared: ${input.downloadPrepared}`,
    "",
    "Files:",
    ...files.map(
      (file) =>
        `- ${file.ready ? "READY" : "SKIP"} ${file.fileName} | ${file.fileType} | ${file.fingerprint} | downloadable=${file.downloadable}`,
    ),
    "",
    "Source fingerprints:",
    `- bundle=${bundle.bundleFingerprint}`,
    `- audit=${bundle.sourceAuditFingerprint}`,
    `- gate=${bundle.sourceGateFingerprint}`,
    `- preview=${bundle.sourcePreviewFingerprint}`,
    `- dossier=${bundle.sourceDossierFingerprint}`,
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
    "- manualDownloadOnly=true",
    "- manualExportOnly=true",
    "- humanReviewRequired=true",
    "- redactedOutputOnly=true",
    "",
    "Source bundle:",
    formatAiCaseExportBundle(bundle),
  ].join("\n");
}

export function createAiCaseExportArchive(
  caseExportBundle: AiCaseExportBundle = createReadyAiCaseExportBundle(),
  input: CaseExportArchiveInput = defaultCaseExportArchiveInput,
): AiCaseExportArchive {
  const cleanInput = {
    ...input,
    archiveName: input.archiveName.trim(),
    preparedBy: input.preparedBy.trim(),
  };

  const files = createArchiveFiles(caseExportBundle, cleanInput);
  const archiveReady =
    caseExportBundle.bundleReady &&
    hasMinimumArchiveInput(cleanInput) &&
    caseExportBundle.safety.providerCalled === false &&
    caseExportBundle.safety.persistencePerformed === false &&
    caseExportBundle.safety.taskCreated === false &&
    caseExportBundle.safety.interventionCreated === false &&
    caseExportBundle.safety.automaticExecutionPerformed === false &&
    caseExportBundle.safety.publicSharePerformed === false;

  const archiveId = `archive-${safeSlug(cleanInput.archiveName || caseExportBundle.bundleId)}`;
  const archiveFingerprint = fingerprint(
    [
      archiveId,
      caseExportBundle.bundleFingerprint,
      caseExportBundle.sourceAuditFingerprint,
      caseExportBundle.sourceGateFingerprint,
      caseExportBundle.sourcePreviewFingerprint,
      caseExportBundle.sourceDossierFingerprint,
      cleanInput.archiveName,
      cleanInput.preparedBy,
      cleanInput.archiveMode,
      String(archiveReady),
      files.map((file) => `${file.id}:${file.ready}:${file.fingerprint}`).join("|"),
    ].join("|"),
  );

  const textArchive = createTextArchive(caseExportBundle, cleanInput, files);
  const jsonArchive = JSON.stringify(
    {
      archiveId,
      archiveFingerprint,
      archiveReady,
      manifest: createManifest(caseExportBundle, cleanInput, files),
      files,
      sourceBundleFingerprint: caseExportBundle.bundleFingerprint,
      sourceAuditFingerprint: caseExportBundle.sourceAuditFingerprint,
      sourceGateFingerprint: caseExportBundle.sourceGateFingerprint,
      sourcePreviewFingerprint: caseExportBundle.sourcePreviewFingerprint,
      sourceDossierFingerprint: caseExportBundle.sourceDossierFingerprint,
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
        manualDownloadOnly: true,
        manualExportOnly: true,
        humanReviewRequired: true,
        redactedOutputOnly: true,
      },
    },
    null,
    2,
  );

  return {
    ok: true,
    mode: "case-export-archive-dry-run",
    archiveVersion: "agri-ai-case-export-archive-v1",
    archiveId,
    archiveFingerprint,
    archiveReady,
    archiveInput: cleanInput,
    manifest: createManifest(caseExportBundle, cleanInput, files),
    files,
    textArchive,
    jsonArchive,
    downloadInstructions: {
      allowed: [
        "Scaricare archivio testuale.",
        "Scaricare archivio JSON.",
        "Allegare archivio a revisione umana.",
        "Conservare fingerprint sorgenti.",
      ],
      prohibited: [
        "Salvare automaticamente su DB.",
        "Condividere pubblicamente.",
        "Creare task automaticamente.",
        "Creare interventi automaticamente.",
        "Eseguire azioni automaticamente.",
        "Prescrivere prodotti.",
        "Suggerire dosaggi.",
        "Includere chiavi provider o secret operativi.",
      ],
      manualSteps: [
        "Verificare reviewerOnlyAccess=true.",
        "Verificare redaction manifest.",
        "Verificare fingerprint bundle.",
        "Scaricare manualmente file richiesti.",
        "Archiviare fuori app solo secondo policy interna.",
      ],
    },
    archivePackage: {
      archiveManifestReady: true,
      textArchiveReady: archiveReady && cleanInput.includeTextBundle,
      jsonArchiveReady: archiveReady && cleanInput.includeJsonBundle,
      redactionManifestReady: archiveReady && cleanInput.includeRedactionManifest,
      fingerprintManifestReady: archiveReady && cleanInput.includeFingerprints,
      downloadableArchiveReady: archiveReady && cleanInput.downloadPrepared,
      publicShareReady: false,
      dbPersistenceReady: false,
      automaticTaskCreationReady: false,
      automaticInterventionCreationReady: false,
      automaticExecutionReady: false,
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
      manualDownloadOnly: true,
      manualExportOnly: true,
      humanReviewRequired: true,
      redactedOutputOnly: true,
    },
    source: {
      caseExportBundle,
    },
  };
}

export function createReadyAiCaseExportArchive() {
  return createAiCaseExportArchive(
    createReadyAiCaseExportBundle(),
    readyCaseExportArchiveInput,
  );
}

export function createBlockedAiCaseExportArchive() {
  return createAiCaseExportArchive(
    createBlockedAiCaseExportBundle(),
    defaultCaseExportArchiveInput,
  );
}

export function createAiCaseExportArchiveFromInput(
  input: PhotoSymptomAnnotationInput,
  gateInput: ExecutionGateInput = approvedExecutionGateInput,
  auditInput: ManualConversionAuditInput = readyManualConversionAuditInput,
  bundleInput: CaseExportBundleInput = readyCaseExportBundleInput,
  archiveInput: CaseExportArchiveInput = readyCaseExportArchiveInput,
) {
  return createAiCaseExportArchive(
    createAiCaseExportBundleFromInput(input, gateInput, auditInput, bundleInput),
    archiveInput,
  );
}

export function formatAiCaseExportArchive(archive: AiCaseExportArchive) {
  return [
    "AI Case Export Archive Pack",
    "",
    `Archive ID: ${archive.archiveId}`,
    `Archive fingerprint: ${archive.archiveFingerprint}`,
    `Version: ${archive.archiveVersion}`,
    `Mode: ${archive.mode}`,
    `archiveReady=${archive.archiveReady}`,
    "",
    "Manifest:",
    `- archiveName=${archive.manifest.archiveName || "missing"}`,
    `- archiveMode=${archive.manifest.archiveMode}`,
    `- preparedBy=${archive.manifest.preparedBy || "missing"}`,
    `- fileCount=${archive.manifest.fileCount}`,
    `- readyFileCount=${archive.manifest.readyFileCount}`,
    `- downloadableFileCount=${archive.manifest.downloadableFileCount}`,
    `- redactedFileCount=${archive.manifest.redactedFileCount}`,
    `- reviewerOnlyAccess=${archive.manifest.reviewerOnlyAccess}`,
    `- downloadPrepared=${archive.manifest.downloadPrepared}`,
    "",
    "Files:",
    ...archive.files.map(
      (file) =>
        `- ${file.ready ? "READY" : "SKIP"} ${file.fileName} | ${file.fileType} | ${file.fingerprint} | downloadable=${file.downloadable}`,
    ),
    "",
    "Archive package:",
    `- archiveManifestReady=${archive.archivePackage.archiveManifestReady}`,
    `- textArchiveReady=${archive.archivePackage.textArchiveReady}`,
    `- jsonArchiveReady=${archive.archivePackage.jsonArchiveReady}`,
    `- redactionManifestReady=${archive.archivePackage.redactionManifestReady}`,
    `- fingerprintManifestReady=${archive.archivePackage.fingerprintManifestReady}`,
    `- downloadableArchiveReady=${archive.archivePackage.downloadableArchiveReady}`,
    "- publicShareReady=false",
    "- dbPersistenceReady=false",
    "- automaticTaskCreationReady=false",
    "- automaticInterventionCreationReady=false",
    "- automaticExecutionReady=false",
    "",
    "Allowed instructions:",
    ...archive.downloadInstructions.allowed.map((item) => `- ${item}`),
    "",
    "Prohibited instructions:",
    ...archive.downloadInstructions.prohibited.map((item) => `- ${item}`),
    "",
    "Manual steps:",
    ...archive.downloadInstructions.manualSteps.map((item) => `- ${item}`),
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
    "- manualDownloadOnly=true",
    "- manualExportOnly=true",
    "- humanReviewRequired=true",
    "- redactedOutputOnly=true",
  ].join("\n");
}
