import {
  createDiagnosisCaseReport,
  createIncompleteDiagnosisCaseReport,
  formatDiagnosisCaseReport,
  type DiagnosisCaseReport,
} from "./photoDiagnosisCaseReport";
import {
  createPhotoSymptomAnnotationFixture,
  type PhotoSymptomAnnotationInput,
} from "./photoSymptomAnnotation";

export type DecisionGateStatus =
  | "pending-human-review"
  | "approved-with-caution"
  | "needs-more-evidence"
  | "blocked";

export type DecisionGate = {
  id: string;
  title: string;
  status: DecisionGateStatus;
  rationale: string;
  requiredChecks: string[];
  blockingConditions: string[];
};

export type DecisionWorkPackage = {
  id: string;
  title: string;
  ownerRole: "operator" | "agronomist" | "admin";
  priority: "low" | "medium" | "high" | "critical";
  deliverable: string;
  allowedActions: string[];
  disallowedActions: string[];
};

export type DecisionSignOff = {
  required: true;
  reviewerRole: "qualified-human-reviewer";
  approvalOptions: string[];
  rejectionReasons: string[];
  mandatoryAcknowledgements: string[];
};

export type AiDecisionDossier = {
  ok: true;
  mode: "decision-dossier-dry-run";
  dossierVersion: "agri-ai-decision-dossier-v1";
  dossierId: string;
  dossierFingerprint: string;
  caseReportFingerprint: string;
  title: string;
  executiveDecision: string;
  decisionStatus: DecisionGateStatus;
  risk: DiagnosisCaseReport["risk"];
  confidenceLabel: string;
  topCandidateLabel: string | null;
  gates: DecisionGate[];
  workPackages: DecisionWorkPackage[];
  signOff: DecisionSignOff;
  exportPackage: {
    textDossierReady: true;
    jsonDossierReady: true;
    approvalPacketReady: true;
    databasePersistenceReady: false;
    automaticExecutionReady: false;
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
    caseReport: DiagnosisCaseReport;
  };
};

function fingerprint(value: string) {
  let hash = 0x811c9dc5;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return `decision-dossier-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function statusFromReport(report: DiagnosisCaseReport): DecisionGateStatus {
  if (report.risk === "critical") {
    return "blocked";
  }

  if (report.risk === "high") {
    return "needs-more-evidence";
  }

  return "pending-human-review";
}

function executiveDecision(report: DiagnosisCaseReport) {
  if (report.risk === "critical") {
    return "Bloccare esecuzione automatica e richiedere revisione qualificata immediata.";
  }

  if (report.risk === "high") {
    return "Procedere solo con raccolta evidenze aggiuntive e revisione umana.";
  }

  return "Preparare pacchetto revisione e attendere approvazione umana prima di qualunque azione.";
}

function decisionGates(report: DiagnosisCaseReport): DecisionGate[] {
  const topCandidate = report.topCandidateLabel || "nessuna ipotesi principale";

  return [
    {
      id: "photo-quality",
      title: "Qualità e contesto foto",
      status: "pending-human-review",
      rationale: "La foto deve essere valutata prima di usare ipotesi o playbook.",
      requiredChecks: [
        "Foto nitida e non duplicata.",
        "Sintomo visibile e coerente con note operatore.",
        "Coltura, posizione e contesto confermati.",
      ],
      blockingConditions: [
        "Foto sfocata.",
        "Sintomo non visibile.",
        "Contesto agronomico assente.",
      ],
    },
    {
      id: "differential-review",
      title: "Revisione diagnosi differenziale",
      status: report.topCandidateLabel ? "pending-human-review" : "needs-more-evidence",
      rationale: `Ipotesi principale corrente: ${topCandidate}.`,
      requiredChecks: [
        "Confermare evidenze principali.",
        "Confrontare ipotesi alternative.",
        "Registrare dubbi e gap osservativi.",
      ],
      blockingConditions: [
        "Ipotesi incompatibile con coltura.",
        "Evidenze insufficienti.",
        "Rischio operativo non valutato.",
      ],
    },
    {
      id: "solution-playbook-review",
      title: "Revisione playbook soluzioni",
      status: "pending-human-review",
      rationale: "Il playbook è informativo e non prescrittivo.",
      requiredChecks: [
        "Nessuna prescrizione prodotto.",
        "Nessun dosaggio.",
        "Azioni conservative preferite.",
        "Escalation umana per rischio alto o critico.",
      ],
      blockingConditions: [
        "Richiesta di prodotto specifico.",
        "Richiesta di dose o miscela.",
        "Richiesta di esecuzione automatica.",
      ],
    },
    {
      id: "execution-safety",
      title: "Blocco esecuzione automatica",
      status: "blocked",
      rationale: "Il dossier non abilita azioni automatiche.",
      requiredChecks: [
        "allowedToExecute=false.",
        "automaticTaskCreationPerformed=false.",
        "automaticInterventionCreationPerformed=false.",
        "humanReviewRequired=true.",
      ],
      blockingConditions: [
        "Tentativo di creare task automaticamente.",
        "Tentativo di creare interventi automaticamente.",
        "Tentativo di saltare revisione umana.",
      ],
    },
  ];
}

function workPackages(report: DiagnosisCaseReport): DecisionWorkPackage[] {
  const priority =
    report.risk === "critical"
      ? "critical"
      : report.risk === "high"
        ? "high"
        : report.risk === "medium"
          ? "medium"
          : "low";

  return [
    {
      id: "operator-evidence-pack",
      title: "Raccogliere evidenze aggiuntive",
      ownerRole: "operator",
      priority,
      deliverable: "Foto aggiuntive, note campo, contesto coltura e data osservazione.",
      allowedActions: [
        "Aggiungere foto da angolazioni diverse.",
        "Annotare sintomi visibili.",
        "Segnalare evoluzione temporale.",
        "Richiedere revisione agronomica.",
      ],
      disallowedActions: [
        "Applicare prodotti senza revisione.",
        "Indicare dosaggi.",
        "Creare interventi automatici.",
      ],
    },
    {
      id: "agronomist-review-pack",
      title: "Revisione agronomica",
      ownerRole: "agronomist",
      priority,
      deliverable: "Decisione motivata: approva con cautela, richiede correzioni o rifiuta.",
      allowedActions: [
        "Validare o correggere ipotesi.",
        "Richiedere nuove evidenze.",
        "Convertire il dossier in raccomandazione umana.",
      ],
      disallowedActions: [
        "Delegare decisione al modello.",
        "Ignorare gap evidenziali.",
        "Prescrivere prodotto o dose dal report automatico.",
      ],
    },
    {
      id: "admin-audit-pack",
      title: "Audit e tracciabilità",
      ownerRole: "admin",
      priority: "medium",
      deliverable: "Pacchetto esportabile con fingerprint, sezioni e safety state.",
      allowedActions: [
        "Esportare testo.",
        "Esportare JSON.",
        "Verificare fingerprint.",
        "Conservare solo dopo policy di persistenza approvata.",
      ],
      disallowedActions: [
        "Persistenza DB non prevista.",
        "Esportazione con secret.",
        "Esposizione chiavi provider.",
      ],
    },
  ];
}

function signOff(): DecisionSignOff {
  return {
    required: true,
    reviewerRole: "qualified-human-reviewer",
    approvalOptions: [
      "Approva con cautela",
      "Richiede evidenze aggiuntive",
      "Richiede correzioni",
      "Rifiuta dossier",
    ],
    rejectionReasons: [
      "Foto non sufficiente.",
      "Diagnosi differenziale incompleta.",
      "Rischio operativo non accettabile.",
      "Richiesta di prodotto o dosaggio non consentita.",
    ],
    mandatoryAcknowledgements: [
      "Il dossier non è diagnosi definitiva.",
      "Nessuna chiamata AI live è stata eseguita.",
      "Nessuna persistenza DB è stata eseguita.",
      "Nessuna attività o intervento è stato creato automaticamente.",
      "La responsabilità decisionale resta umana.",
    ],
  };
}

export function createAiDecisionDossier(
  report: DiagnosisCaseReport = createDiagnosisCaseReport(createPhotoSymptomAnnotationFixture()),
): AiDecisionDossier {
  const decision = executiveDecision(report);
  const dossierId = `decision-dossier-${report.reportId}`.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  const dossierFingerprint = fingerprint(
    [
      dossierId,
      report.reportFingerprint,
      report.risk,
      report.topCandidateLabel || "none",
      decision,
    ].join("|"),
  );

  return {
    ok: true,
    mode: "decision-dossier-dry-run",
    dossierVersion: "agri-ai-decision-dossier-v1",
    dossierId,
    dossierFingerprint,
    caseReportFingerprint: report.reportFingerprint,
    title: "AI Decision Dossier",
    executiveDecision: decision,
    decisionStatus: statusFromReport(report),
    risk: report.risk,
    confidenceLabel: report.confidenceLabel,
    topCandidateLabel: report.topCandidateLabel,
    gates: decisionGates(report),
    workPackages: workPackages(report),
    signOff: signOff(),
    exportPackage: {
      textDossierReady: true,
      jsonDossierReady: true,
      approvalPacketReady: true,
      databasePersistenceReady: false,
      automaticExecutionReady: false,
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
      caseReport: report,
    },
  };
}

export function createIncompleteAiDecisionDossier() {
  return createAiDecisionDossier(createIncompleteDiagnosisCaseReport());
}

export function createAiDecisionDossierFromInput(input: PhotoSymptomAnnotationInput) {
  return createAiDecisionDossier(createDiagnosisCaseReport(input));
}

export function formatAiDecisionDossier(dossier: AiDecisionDossier) {
  return [
    "AI Decision Dossier",
    "",
    `Dossier ID: ${dossier.dossierId}`,
    `Dossier fingerprint: ${dossier.dossierFingerprint}`,
    `Case report fingerprint: ${dossier.caseReportFingerprint}`,
    `Version: ${dossier.dossierVersion}`,
    `Mode: ${dossier.mode}`,
    `Decision status: ${dossier.decisionStatus}`,
    `Risk: ${dossier.risk}`,
    `Confidence: ${dossier.confidenceLabel}`,
    `Top candidate: ${dossier.topCandidateLabel || "none"}`,
    "",
    "Executive decision:",
    dossier.executiveDecision,
    "",
    "Decision gates:",
    ...dossier.gates.flatMap((gate) => [
      `## ${gate.title}`,
      `id=${gate.id}`,
      `status=${gate.status}`,
      gate.rationale,
      "Required checks:",
      ...gate.requiredChecks.map((item) => `- ${item}`),
      "Blocking conditions:",
      ...gate.blockingConditions.map((item) => `- ${item}`),
      "",
    ]),
    "Work packages:",
    ...dossier.workPackages.flatMap((pack) => [
      `## ${pack.title}`,
      `id=${pack.id}`,
      `ownerRole=${pack.ownerRole}`,
      `priority=${pack.priority}`,
      `deliverable=${pack.deliverable}`,
      "Allowed actions:",
      ...pack.allowedActions.map((item) => `- ${item}`),
      "Disallowed actions:",
      ...pack.disallowedActions.map((item) => `- ${item}`),
      "",
    ]),
    "Sign-off:",
    `required=${dossier.signOff.required}`,
    `reviewerRole=${dossier.signOff.reviewerRole}`,
    "Approval options:",
    ...dossier.signOff.approvalOptions.map((item) => `- ${item}`),
    "Mandatory acknowledgements:",
    ...dossier.signOff.mandatoryAcknowledgements.map((item) => `- ${item}`),
    "",
    "Export package:",
    "- textDossierReady=true",
    "- jsonDossierReady=true",
    "- approvalPacketReady=true",
    "- databasePersistenceReady=false",
    "- automaticExecutionReady=false",
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
    "Source case report:",
    formatDiagnosisCaseReport(dossier.source.caseReport),
  ].join("\n");
}
