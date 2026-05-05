import {
  createDifferentialDiagnosisMatrix,
  createIncompleteDifferentialDiagnosisMatrix,
  formatDifferentialDiagnosisMatrix,
  type DifferentialDiagnosisMatrix,
} from "./photoDifferentialDiagnosis";
import {
  createPhotoSymptomAnnotationFixture,
  type PhotoSymptomAnnotationInput,
} from "./photoSymptomAnnotation";
import {
  createSolutionPlaybook,
  formatSolutionPlaybook,
  type SolutionPlaybook,
} from "./photoSolutionPlaybook";

export type CaseReportRisk = "low" | "medium" | "high" | "critical";

export type CaseReportSectionKind =
  | "executive-summary"
  | "photo-intake"
  | "evidence-digest"
  | "differential-summary"
  | "solution-playbook-summary"
  | "operator-next-steps"
  | "safety-guardrails"
  | "human-review";

export type CaseReportSection = {
  kind: CaseReportSectionKind;
  title: string;
  summary: string;
  bullets: string[];
  status: "ready" | "needs-review" | "blocked";
};

export type CaseReportAuditEntry = {
  id: string;
  label: string;
  value: string;
};

export type DiagnosisCaseReport = {
  ok: true;
  mode: "case-report-dry-run";
  reportVersion: "agri-ai-case-report-v1";
  reportId: string;
  reportFingerprint: string;
  generatedAtLabel: string;
  title: string;
  crop: string;
  photoId: string;
  risk: CaseReportRisk;
  confidenceLabel: string;
  topCandidateLabel: string | null;
  executiveSummary: string;
  sections: CaseReportSection[];
  auditTrail: CaseReportAuditEntry[];
  exports: {
    textReportReady: true;
    jsonReportReady: true;
    pdfExportReady: false;
    databasePersistenceReady: false;
  };
  safety: {
    providerCalled: false;
    persistencePerformed: false;
    productPrescriptionPerformed: false;
    dosageAdvicePerformed: false;
    automaticTaskCreationPerformed: false;
    automaticInterventionCreationPerformed: false;
    endpointAiCalled: false;
    allowedToExecute: false;
    humanReviewRequired: true;
    redactedOutputOnly: true;
  };
  source: {
    differentialMatrix: DifferentialDiagnosisMatrix;
    solutionPlaybook: SolutionPlaybook;
  };
};

function fingerprint(value: string) {
  let hash = 0x811c9dc5;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return `case-report-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function reportRisk(matrix: DifferentialDiagnosisMatrix): CaseReportRisk {
  const risk = matrix.topCandidate?.riskBand;

  if (risk === "critical") {
    return "critical";
  }

  if (risk === "high") {
    return "high";
  }

  if (risk === "medium") {
    return "medium";
  }

  return "low";
}

function confidenceLabel(matrix: DifferentialDiagnosisMatrix) {
  const score = matrix.topCandidate?.score ?? 0;
  const gapCount = matrix.evidenceGaps.length;

  if (score >= 80 && gapCount <= 2) {
    return "alta ma non definitiva";
  }

  if (score >= 55 && gapCount <= 5) {
    return "media";
  }

  return "bassa o incompleta";
}

function photoIntakeSection(input: PhotoSymptomAnnotationInput): CaseReportSection {
  return {
    kind: "photo-intake",
    title: "Foto e contesto",
    summary: `Foto ${input.photoId} per ${input.crop || "coltura non specificata"}.`,
    bullets: [
      `File: ${input.fileName}`,
      `Ruolo foto: ${input.photoRole}`,
      `Contesto: ${input.plantContext || "non indicato"}`,
      `Localizzazione: ${input.locationHint || "non indicata"}`,
      `Regioni annotate: ${input.regions.length}`,
    ],
    status: input.regions.length > 0 ? "ready" : "needs-review",
  };
}

function evidenceDigestSection(matrix: DifferentialDiagnosisMatrix): CaseReportSection {
  return {
    kind: "evidence-digest",
    title: "Sintesi evidenze",
    summary: "Riepilogo dei segnali usati per spiegare ipotesi e incertezze.",
    bullets: [
      `Candidati diagnostici: ${matrix.candidates.length}`,
      `Top candidate: ${matrix.topCandidate?.label || "nessuno"}`,
      `Evidenze mancanti: ${matrix.evidenceGaps.length}`,
      ...matrix.evidenceGaps.slice(0, 6).map((gap) => `Gap: ${gap}`),
    ],
    status: matrix.evidenceGaps.length <= 3 ? "ready" : "needs-review",
  };
}

function differentialSection(matrix: DifferentialDiagnosisMatrix): CaseReportSection {
  return {
    kind: "differential-summary",
    title: "Diagnosi differenziale",
    summary: "Ipotesi ordinate per score, rischio e spiegabilità.",
    bullets: matrix.candidates.slice(0, 5).map((candidate) => {
      return `${candidate.label}: score=${candidate.score}, rischio=${candidate.riskBand}, categoria=${candidate.category}`;
    }),
    status: matrix.topCandidate ? "ready" : "needs-review",
  };
}

function solutionSection(playbook: SolutionPlaybook): CaseReportSection {
  return {
    kind: "solution-playbook-summary",
    title: "Playbook soluzioni",
    summary: "Opzioni non prescrittive generate dal playbook locale.",
    bullets: [
      `Playbook: ${playbook.playbookId}`,
      `Fingerprint: ${playbook.playbookFingerprint}`,
      `Top options: ${playbook.topOptions.length}`,
      ...playbook.topOptions.slice(0, 5).map((option) => {
        return `${option.category} · ${option.priority}: ${option.objective}`;
      }),
    ],
    status: playbook.topOptions.length ? "needs-review" : "blocked",
  };
}

function operatorNextStepsSection(playbook: SolutionPlaybook): CaseReportSection {
  return {
    kind: "operator-next-steps",
    title: "Prossimi passi operatore",
    summary: "Checklist prima di qualunque decisione operativa.",
    bullets: [
      ...playbook.evidenceRequiredBeforeExecution.slice(0, 8),
      ...playbook.operatorDecisionChecklist.slice(0, 6),
    ],
    status: "needs-review",
  };
}

function safetySection(): CaseReportSection {
  return {
    kind: "safety-guardrails",
    title: "Guardrail sicurezza",
    summary: "Il report è solo informativo e non esegue azioni.",
    bullets: [
      "providerCalled=false",
      "persistencePerformed=false",
      "productPrescriptionPerformed=false",
      "dosageAdvicePerformed=false",
      "automaticTaskCreationPerformed=false",
      "automaticInterventionCreationPerformed=false",
      "allowedToExecute=false",
      "humanReviewRequired=true",
    ],
    status: "ready",
  };
}

function humanReviewSection(): CaseReportSection {
  return {
    kind: "human-review",
    title: "Revisione umana obbligatoria",
    summary: "Il report deve essere validato da un operatore qualificato.",
    bullets: [
      "Confermare qualità foto.",
      "Confermare evidenze visive.",
      "Correggere ipotesi se necessario.",
      "Bloccare richieste di prodotti o dosaggi.",
      "Procedere solo con decisione umana tracciabile.",
    ],
    status: "needs-review",
  };
}

function auditTrail(
  input: PhotoSymptomAnnotationInput,
  matrix: DifferentialDiagnosisMatrix,
  playbook: SolutionPlaybook,
): CaseReportAuditEntry[] {
  return [
    { id: "mode", label: "Mode", value: "case-report-dry-run" },
    { id: "photo-id", label: "Photo ID", value: input.photoId },
    { id: "crop", label: "Crop", value: input.crop || "unknown" },
    { id: "matrix-id", label: "Matrix ID", value: matrix.matrixId },
    { id: "matrix-fingerprint", label: "Matrix fingerprint", value: matrix.matrixFingerprint },
    { id: "playbook-id", label: "Playbook ID", value: playbook.playbookId },
    { id: "playbook-fingerprint", label: "Playbook fingerprint", value: playbook.playbookFingerprint },
    { id: "provider-called", label: "Provider called", value: "false" },
    { id: "persistence", label: "Persistence performed", value: "false" },
    { id: "human-review", label: "Human review required", value: "true" },
  ];
}

function executiveSummary(
  input: PhotoSymptomAnnotationInput,
  matrix: DifferentialDiagnosisMatrix,
  playbook: SolutionPlaybook,
) {
  const candidate = matrix.topCandidate?.label || "nessuna ipotesi principale";
  const risk = reportRisk(matrix);
  const options = playbook.topOptions.length;

  return [
    `Foto ${input.photoId}: report locale per ${input.crop || "coltura non specificata"}.`,
    `Ipotesi principale: ${candidate}.`,
    `Rischio operativo stimato: ${risk}.`,
    `Opzioni playbook disponibili: ${options}.`,
    "Il report non è diagnosi definitiva e non prescrive prodotti o dosi.",
    "La revisione umana resta obbligatoria.",
  ].join(" ");
}

export function createDiagnosisCaseReport(
  input: PhotoSymptomAnnotationInput = createPhotoSymptomAnnotationFixture(),
  matrix: DifferentialDiagnosisMatrix = createDifferentialDiagnosisMatrix(input),
  playbook: SolutionPlaybook = createSolutionPlaybook(matrix),
): DiagnosisCaseReport {
  const summary = executiveSummary(input, matrix, playbook);
  const reportId = `case-report-${input.photoId}-${matrix.matrixId}`.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  const reportFingerprint = fingerprint(
    [
      reportId,
      matrix.matrixFingerprint,
      playbook.playbookFingerprint,
      summary,
    ].join("|"),
  );

  return {
    ok: true,
    mode: "case-report-dry-run",
    reportVersion: "agri-ai-case-report-v1",
    reportId,
    reportFingerprint,
    generatedAtLabel: "local-dry-run",
    title: "AI Diagnosis Case Report",
    crop: input.crop || "unknown",
    photoId: input.photoId,
    risk: reportRisk(matrix),
    confidenceLabel: confidenceLabel(matrix),
    topCandidateLabel: matrix.topCandidate?.label || null,
    executiveSummary: summary,
    sections: [
      {
        kind: "executive-summary",
        title: "Executive summary",
        summary,
        bullets: [
          `Risk: ${reportRisk(matrix)}`,
          `Confidence: ${confidenceLabel(matrix)}`,
          `Top candidate: ${matrix.topCandidate?.label || "none"}`,
          `Human review required: true`,
        ],
        status: "needs-review",
      },
      photoIntakeSection(input),
      evidenceDigestSection(matrix),
      differentialSection(matrix),
      solutionSection(playbook),
      operatorNextStepsSection(playbook),
      safetySection(),
      humanReviewSection(),
    ],
    auditTrail: auditTrail(input, matrix, playbook),
    exports: {
      textReportReady: true,
      jsonReportReady: true,
      pdfExportReady: false,
      databasePersistenceReady: false,
    },
    safety: {
      providerCalled: false,
      persistencePerformed: false,
      productPrescriptionPerformed: false,
      dosageAdvicePerformed: false,
      automaticTaskCreationPerformed: false,
      automaticInterventionCreationPerformed: false,
      endpointAiCalled: false,
      allowedToExecute: false,
      humanReviewRequired: true,
      redactedOutputOnly: true,
    },
    source: {
      differentialMatrix: matrix,
      solutionPlaybook: playbook,
    },
  };
}

export function createIncompleteDiagnosisCaseReport() {
  const matrix = createIncompleteDifferentialDiagnosisMatrix();

  return createDiagnosisCaseReport(createPhotoSymptomAnnotationFixture(), matrix, createSolutionPlaybook(matrix));
}

export function formatDiagnosisCaseReport(report: DiagnosisCaseReport) {
  return [
    "AI Diagnosis Case Report",
    "",
    `Report ID: ${report.reportId}`,
    `Fingerprint: ${report.reportFingerprint}`,
    `Version: ${report.reportVersion}`,
    `Mode: ${report.mode}`,
    `Photo ID: ${report.photoId}`,
    `Crop: ${report.crop}`,
    `Risk: ${report.risk}`,
    `Confidence: ${report.confidenceLabel}`,
    `Top candidate: ${report.topCandidateLabel || "none"}`,
    "",
    "Executive summary:",
    report.executiveSummary,
    "",
    "Sections:",
    ...report.sections.map((section) => {
      return [
        `## ${section.title}`,
        `kind=${section.kind}`,
        `status=${section.status}`,
        section.summary,
        ...section.bullets.map((bullet) => `- ${bullet}`),
      ].join("\n");
    }),
    "",
    "Audit trail:",
    ...report.auditTrail.map((entry) => `- ${entry.label}: ${entry.value}`),
    "",
    "Exports:",
    "- textReportReady=true",
    "- jsonReportReady=true",
    "- pdfExportReady=false",
    "- databasePersistenceReady=false",
    "",
    "Safety:",
    "- providerCalled=false",
    "- persistencePerformed=false",
    "- productPrescriptionPerformed=false",
    "- dosageAdvicePerformed=false",
    "- automaticTaskCreationPerformed=false",
    "- automaticInterventionCreationPerformed=false",
    "- endpointAiCalled=false",
    "- allowedToExecute=false",
    "- humanReviewRequired=true",
    "- redactedOutputOnly=true",
    "",
    "Differential matrix:",
    formatDifferentialDiagnosisMatrix(report.source.differentialMatrix),
    "",
    "Solution playbook:",
    formatSolutionPlaybook(report.source.solutionPlaybook),
  ].join("\n");
}
