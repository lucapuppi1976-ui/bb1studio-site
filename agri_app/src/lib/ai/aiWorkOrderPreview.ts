import {
  createAiDecisionDossier,
  createAiDecisionDossierFromInput,
  createIncompleteAiDecisionDossier,
  formatAiDecisionDossier,
  type AiDecisionDossier,
} from "./aiDecisionDossier";
import type { PhotoSymptomAnnotationInput } from "./photoSymptomAnnotation";

export type WorkOrderPriority = "low" | "medium" | "high" | "critical";

export type WorkOrderTaskDraft = {
  id: string;
  title: string;
  priority: WorkOrderPriority;
  ownerRole: "operator" | "agronomist" | "admin";
  dueWindow: {
    earliest: string;
    latest: string;
  };
  objective: string;
  checklist: string[];
  acceptanceCriteria: string[];
  blockedUntil: string[];
};

export type WorkOrderInterventionDraft = {
  id: string;
  title: string;
  interventionType:
    | "observation"
    | "sampling"
    | "photo-follow-up"
    | "human-review"
    | "containment"
    | "documentation";
  priority: WorkOrderPriority;
  objective: string;
  allowedActions: string[];
  prohibitedActions: string[];
  requiredEvidence: string[];
};

export type WorkOrderExecutionConstraints = {
  allowedToCreateTask: false;
  allowedToCreateIntervention: false;
  allowedToExecute: false;
  allowedToPrescribeProduct: false;
  allowedToSuggestDosage: false;
  requiresHumanReview: true;
  requiresSafetyConfirmation: true;
  requiresEvidenceConfirmation: true;
};

export type AiWorkOrderPreview = {
  ok: true;
  mode: "work-order-preview-dry-run";
  previewVersion: "agri-ai-work-order-preview-v1";
  previewId: string;
  previewFingerprint: string;
  sourceDossierFingerprint: string;
  sourceCaseReportFingerprint: string;
  title: string;
  summary: string;
  priority: WorkOrderPriority;
  tasks: WorkOrderTaskDraft[];
  interventions: WorkOrderInterventionDraft[];
  executionConstraints: WorkOrderExecutionConstraints;
  approvalRequirements: string[];
  operatorNotes: string[];
  exportPackage: {
    textWorkOrderReady: true;
    jsonWorkOrderReady: true;
    reviewerPacketReady: true;
    taskCreationReady: false;
    interventionCreationReady: false;
  };
  safety: {
    providerCalled: false;
    persistencePerformed: false;
    taskCreated: false;
    interventionCreated: false;
    productPrescriptionPerformed: false;
    dosageAdvicePerformed: false;
    allowedToCreateTask: false;
    allowedToCreateIntervention: false;
    allowedToExecute: false;
    humanReviewRequired: true;
    redactedOutputOnly: true;
  };
  source: {
    dossier: AiDecisionDossier;
  };
};

function fingerprint(value: string) {
  let hash = 0x811c9dc5;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return `work-order-preview-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function priorityFromDossier(dossier: AiDecisionDossier): WorkOrderPriority {
  if (dossier.risk === "critical") {
    return "critical";
  }

  if (dossier.risk === "high") {
    return "high";
  }

  if (dossier.risk === "medium") {
    return "medium";
  }

  return "low";
}

function taskDrafts(dossier: AiDecisionDossier): WorkOrderTaskDraft[] {
  const priority = priorityFromDossier(dossier);
  const topCandidate = dossier.topCandidateLabel || "ipotesi non confermata";

  return [
    {
      id: "task-evidence-refresh",
      title: "Aggiornare evidenze fotografiche",
      priority,
      ownerRole: "operator",
      dueWindow: {
        earliest: "oggi",
        latest: priority === "critical" || priority === "high" ? "entro 24 ore" : "entro 72 ore",
      },
      objective: "Confermare visivamente il quadro sintomatico prima di ogni decisione.",
      checklist: [
        "Scattare foto ravvicinate del sintomo.",
        "Scattare foto di contesto della pianta o parcella.",
        "Annotare data, area e coltura.",
        "Segnalare eventuale peggioramento.",
      ],
      acceptanceCriteria: [
        "Foto leggibili.",
        "Sintomi localizzabili.",
        "Contesto coltura indicato.",
      ],
      blockedUntil: [
        "Revisione umana completata.",
        "Assenza di richieste di prodotto o dosaggio.",
      ],
    },
    {
      id: "task-differential-review",
      title: "Validare diagnosi differenziale",
      priority,
      ownerRole: "agronomist",
      dueWindow: {
        earliest: "dopo raccolta evidenze",
        latest: priority === "critical" ? "immediato" : "prima di pianificare interventi",
      },
      objective: `Valutare l'ipotesi principale: ${topCandidate}.`,
      checklist: [
        "Confermare ipotesi principale.",
        "Confrontare ipotesi alternative.",
        "Indicare gap o dubbi.",
        "Stabilire se servono campioni o sopralluogo.",
      ],
      acceptanceCriteria: [
        "Decisione umana documentata.",
        "Rischio operativo confermato o corretto.",
        "Nessuna automazione non autorizzata.",
      ],
      blockedUntil: [
        "Reviewer qualificato assegnato.",
        "Dossier decisionale letto.",
      ],
    },
    {
      id: "task-safety-signoff",
      title: "Firmare safety sign-off",
      priority: "high",
      ownerRole: "admin",
      dueWindow: {
        earliest: "prima di esportare il pacchetto operativo",
        latest: "prima di qualunque conversione manuale",
      },
      objective: "Confermare che il work order è solo preview e non esegue azioni.",
      checklist: [
        "allowedToCreateTask=false.",
        "allowedToCreateIntervention=false.",
        "allowedToExecute=false.",
        "humanReviewRequired=true.",
      ],
      acceptanceCriteria: [
        "Sign-off registrato manualmente.",
        "Nessuna creazione automatica.",
        "Nessuna persistenza automatica.",
      ],
      blockedUntil: [
        "Controllo safety completato.",
        "Output esportato senza secret.",
      ],
    },
  ];
}

function interventionDrafts(dossier: AiDecisionDossier): WorkOrderInterventionDraft[] {
  const priority = priorityFromDossier(dossier);

  return [
    {
      id: "intervention-observation",
      title: "Osservazione guidata",
      interventionType: "observation",
      priority,
      objective: "Osservare evoluzione e distribuzione del sintomo senza applicazioni automatiche.",
      allowedActions: [
        "Registrare osservazioni.",
        "Confrontare aree sintomatiche e sane.",
        "Richiedere revisione agronomica.",
      ],
      prohibitedActions: [
        "Applicare prodotti.",
        "Indicare dosaggi.",
        "Creare interventi automatici.",
      ],
      requiredEvidence: [
        "Foto sintomo.",
        "Foto contesto.",
        "Note operatore.",
      ],
    },
    {
      id: "intervention-sampling",
      title: "Campionamento o controllo aggiuntivo",
      interventionType: "sampling",
      priority,
      objective: "Raccogliere dati per ridurre incertezza diagnostica.",
      allowedActions: [
        "Proporre campione manuale.",
        "Richiedere sopralluogo.",
        "Documentare condizioni ambientali.",
      ],
      prohibitedActions: [
        "Automatizzare campione.",
        "Saltare revisione umana.",
        "Trasformare ipotesi in diagnosi definitiva senza evidenze.",
      ],
      requiredEvidence: [
        "Motivo campionamento.",
        "Area interessata.",
        "Reviewer responsabile.",
      ],
    },
    {
      id: "intervention-review",
      title: "Revisione umana obbligatoria",
      interventionType: "human-review",
      priority: "high",
      objective: "Assicurare che la decisione resti umana prima di azioni operative.",
      allowedActions: [
        "Approvare con cautela.",
        "Richiedere correzioni.",
        "Rifiutare il work order.",
      ],
      prohibitedActions: [
        "Esecuzione automatica.",
        "Creazione automatica task.",
        "Creazione automatica intervento.",
      ],
      requiredEvidence: [
        "Dossier decisionale.",
        "Work order preview.",
        "Safety sign-off.",
      ],
    },
  ];
}

function executionConstraints(): WorkOrderExecutionConstraints {
  return {
    allowedToCreateTask: false,
    allowedToCreateIntervention: false,
    allowedToExecute: false,
    allowedToPrescribeProduct: false,
    allowedToSuggestDosage: false,
    requiresHumanReview: true,
    requiresSafetyConfirmation: true,
    requiresEvidenceConfirmation: true,
  };
}

export function createAiWorkOrderPreview(
  dossier: AiDecisionDossier = createAiDecisionDossier(),
): AiWorkOrderPreview {
  const priority = priorityFromDossier(dossier);
  const previewId = `work-order-preview-${dossier.dossierId}`.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  const previewFingerprint = fingerprint(
    [
      previewId,
      dossier.dossierFingerprint,
      dossier.caseReportFingerprint,
      dossier.decisionStatus,
      priority,
    ].join("|"),
  );

  return {
    ok: true,
    mode: "work-order-preview-dry-run",
    previewVersion: "agri-ai-work-order-preview-v1",
    previewId,
    previewFingerprint,
    sourceDossierFingerprint: dossier.dossierFingerprint,
    sourceCaseReportFingerprint: dossier.caseReportFingerprint,
    title: "AI Work Order Preview",
    summary: "Pacchetto operativo locale per revisione umana: attività, interventi suggeriti e blocchi di esecuzione.",
    priority,
    tasks: taskDrafts(dossier),
    interventions: interventionDrafts(dossier),
    executionConstraints: executionConstraints(),
    approvalRequirements: [
      "Reviewer umano qualificato.",
      "Evidenze fotografiche confermate.",
      "Nessuna richiesta di prodotto o dosaggio.",
      "Safety sign-off completato.",
      "Conversione manuale solo dopo approvazione.",
    ],
    operatorNotes: [
      "Questo work order è una preview.",
      "Non crea attività.",
      "Non crea interventi.",
      "Non prescrive prodotti.",
      "Non suggerisce dosaggi.",
      "Non esegue azioni automatiche.",
    ],
    exportPackage: {
      textWorkOrderReady: true,
      jsonWorkOrderReady: true,
      reviewerPacketReady: true,
      taskCreationReady: false,
      interventionCreationReady: false,
    },
    safety: {
      providerCalled: false,
      persistencePerformed: false,
      taskCreated: false,
      interventionCreated: false,
      productPrescriptionPerformed: false,
      dosageAdvicePerformed: false,
      allowedToCreateTask: false,
      allowedToCreateIntervention: false,
      allowedToExecute: false,
      humanReviewRequired: true,
      redactedOutputOnly: true,
    },
    source: {
      dossier,
    },
  };
}

export function createIncompleteAiWorkOrderPreview() {
  return createAiWorkOrderPreview(createIncompleteAiDecisionDossier());
}

export function createAiWorkOrderPreviewFromInput(input: PhotoSymptomAnnotationInput) {
  return createAiWorkOrderPreview(createAiDecisionDossierFromInput(input));
}

export function formatAiWorkOrderPreview(preview: AiWorkOrderPreview) {
  return [
    "AI Work Order Preview",
    "",
    `Preview ID: ${preview.previewId}`,
    `Preview fingerprint: ${preview.previewFingerprint}`,
    `Source dossier fingerprint: ${preview.sourceDossierFingerprint}`,
    `Source case report fingerprint: ${preview.sourceCaseReportFingerprint}`,
    `Version: ${preview.previewVersion}`,
    `Mode: ${preview.mode}`,
    `Priority: ${preview.priority}`,
    "",
    "Summary:",
    preview.summary,
    "",
    "Task drafts:",
    ...preview.tasks.flatMap((task) => [
      `## ${task.title}`,
      `id=${task.id}`,
      `priority=${task.priority}`,
      `ownerRole=${task.ownerRole}`,
      `dueEarliest=${task.dueWindow.earliest}`,
      `dueLatest=${task.dueWindow.latest}`,
      `objective=${task.objective}`,
      "Checklist:",
      ...task.checklist.map((item) => `- ${item}`),
      "Acceptance criteria:",
      ...task.acceptanceCriteria.map((item) => `- ${item}`),
      "Blocked until:",
      ...task.blockedUntil.map((item) => `- ${item}`),
      "",
    ]),
    "Intervention drafts:",
    ...preview.interventions.flatMap((intervention) => [
      `## ${intervention.title}`,
      `id=${intervention.id}`,
      `type=${intervention.interventionType}`,
      `priority=${intervention.priority}`,
      `objective=${intervention.objective}`,
      "Allowed actions:",
      ...intervention.allowedActions.map((item) => `- ${item}`),
      "Prohibited actions:",
      ...intervention.prohibitedActions.map((item) => `- ${item}`),
      "Required evidence:",
      ...intervention.requiredEvidence.map((item) => `- ${item}`),
      "",
    ]),
    "Execution constraints:",
    "- allowedToCreateTask=false",
    "- allowedToCreateIntervention=false",
    "- allowedToExecute=false",
    "- allowedToPrescribeProduct=false",
    "- allowedToSuggestDosage=false",
    "- requiresHumanReview=true",
    "- requiresSafetyConfirmation=true",
    "- requiresEvidenceConfirmation=true",
    "",
    "Approval requirements:",
    ...preview.approvalRequirements.map((item) => `- ${item}`),
    "",
    "Export package:",
    "- textWorkOrderReady=true",
    "- jsonWorkOrderReady=true",
    "- reviewerPacketReady=true",
    "- taskCreationReady=false",
    "- interventionCreationReady=false",
    "",
    "Safety:",
    "- providerCalled=false",
    "- persistencePerformed=false",
    "- taskCreated=false",
    "- interventionCreated=false",
    "- productPrescriptionPerformed=false",
    "- dosageAdvicePerformed=false",
    "- allowedToCreateTask=false",
    "- allowedToCreateIntervention=false",
    "- allowedToExecute=false",
    "- humanReviewRequired=true",
    "- redactedOutputOnly=true",
    "",
    "Source decision dossier:",
    formatAiDecisionDossier(preview.source.dossier),
  ].join("\n");
}
