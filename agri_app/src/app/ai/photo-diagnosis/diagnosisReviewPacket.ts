import type { DiagnosisActionPlan } from "./diagnosisActionPlan";
import type { DiagnosisDraft, DiagnosisDraftInput } from "./diagnosisDraftEngine";

export type ReviewDecision =
  | "APPROVE_WITH_CAUTION"
  | "NEEDS_REVISION"
  | "REJECT_DRAFT";

export type DiagnosisReviewPacket = {
  title: string;
  workflow: string;
  generatedBy: string;
  reviewDecision: ReviewDecision;
  reviewDecisionLabel: string;
  reviewNotes: string;
  inputSnapshot: DiagnosisDraftInput;
  diagnosisDraft: DiagnosisDraft;
  actionPlan: DiagnosisActionPlan;
  reviewChecklist: string[];
  requiredHumanChecks: string[];
  safetyNotes: string[];
  nextSteps: string[];
};

export function reviewDecisionLabel(decision: ReviewDecision) {
  if (decision === "APPROVE_WITH_CAUTION") {
    return "Approvata con cautela";
  }

  if (decision === "NEEDS_REVISION") {
    return "Richiede correzioni";
  }

  return "Bozza rifiutata";
}

export function createReviewPacket(params: {
  input: DiagnosisDraftInput;
  draft: DiagnosisDraft;
  actionPlan: DiagnosisActionPlan;
  decision: ReviewDecision;
  reviewNotes: string;
}): DiagnosisReviewPacket {
  const { input, draft, actionPlan, decision, reviewNotes } = params;

  return {
    title: `Pacchetto revisione diagnosi${input.plantName ? ` — ${input.plantName}` : ""}`,
    workflow: "AI Human Review Workflow",
    generatedBy: "Agri App local workflow",
    reviewDecision: decision,
    reviewDecisionLabel: reviewDecisionLabel(decision),
    reviewNotes: reviewNotes.trim() || "Nessuna nota revisore inserita.",
    inputSnapshot: input,
    diagnosisDraft: draft,
    actionPlan,
    reviewChecklist: [
      "Foto valida e leggibile.",
      "Sintomi coerenti con quanto visibile.",
      "Gravità operativa verificata.",
      "Ipotesi problema separata da azioni confermate.",
      "Piano d’azione coerente con rischio e contesto.",
      "Nessun trattamento rischioso senza conferma tecnica.",
    ],
    requiredHumanChecks: [
      "Verificare immagine ravvicinata e immagine d’insieme.",
      "Confermare coltura/pianta e area osservata.",
      "Controllare diffusione dei sintomi su altre piante.",
      "Validare irrigazione, drenaggio, meteo e trattamenti recenti.",
      "Decidere se trasformare il piano in attività operative reali.",
    ],
    safetyNotes: [
      "Questa release non usa riconoscimento visivo reale.",
      "Il pacchetto non crea attività, interventi o dati DB.",
      "Ogni diagnosi deve essere confermata da un operatore.",
      "Le azioni sono proposte assistive, non prescrizioni automatiche.",
    ],
    nextSteps:
      decision === "APPROVE_WITH_CAUTION"
        ? [
            "Preparare creazione manuale di attività o intervento.",
            "Allegare foto e note al workflow operativo.",
            "Programmare follow-up secondo il piano.",
          ]
        : decision === "NEEDS_REVISION"
          ? [
              "Correggere sintomi, gravità o note.",
              "Aggiungere foto più dettagliate.",
              "Rigenerare bozza e piano prima dell’approvazione.",
            ]
          : [
              "Archiviare la bozza come non valida.",
              "Raccogliere nuove evidenze fotografiche.",
              "Ripetere il processo con dati migliori.",
            ],
  };
}

export function formatReviewPacket(packet: DiagnosisReviewPacket) {
  return [
    packet.title,
    "",
    `Workflow: ${packet.workflow}`,
    `Generato da: ${packet.generatedBy}`,
    `Decisione revisore: ${packet.reviewDecisionLabel}`,
    `Note revisore: ${packet.reviewNotes}`,
    "",
    "Dati osservazione",
    `- File: ${packet.inputSnapshot.fileName || "non selezionato"}`,
    `- Tipo: ${packet.inputSnapshot.fileType || "non disponibile"}`,
    `- Dimensione: ${packet.inputSnapshot.fileSizeLabel || "non disponibile"}`,
    `- Pianta/coltura: ${packet.inputSnapshot.plantName || "non indicata"}`,
    `- Area/posizione: ${packet.inputSnapshot.location || "non indicata"}`,
    `- Sintomi: ${packet.inputSnapshot.symptoms.length ? packet.inputSnapshot.symptoms.join(", ") : "non indicati"}`,
    `- Gravità percepita: ${packet.inputSnapshot.severity}`,
    `- Note operatore: ${packet.inputSnapshot.notes || "nessuna nota"}`,
    "",
    "Checklist revisione",
    ...packet.reviewChecklist.map((item) => `- ${item}`),
    "",
    "Controlli umani richiesti",
    ...packet.requiredHumanChecks.map((item) => `- ${item}`),
    "",
    "Sintesi diagnosi",
    `- Rischio: ${packet.diagnosisDraft.riskLevel}`,
    `- Confidenza: ${packet.diagnosisDraft.confidence}`,
    ...packet.diagnosisDraft.likelyProblems.map((item) => `- Ipotesi: ${item}`),
    "",
    "Piano d’azione",
    `- Priorità: ${packet.actionPlan.priority}`,
    ...packet.actionPlan.proposedTasks.map((item) => `- Attività: ${item.title} — ${item.timing}`),
    ...packet.actionPlan.suggestedInterventions.map((item) => `- Intervento: ${item.title} — ${item.timing}`),
    "",
    "Note sicurezza",
    ...packet.safetyNotes.map((item) => `- ${item}`),
    "",
    "Prossimi passi",
    ...packet.nextSteps.map((item) => `- ${item}`),
  ].join("\n");
}
