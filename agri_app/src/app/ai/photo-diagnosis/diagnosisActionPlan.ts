import type { DiagnosisDraft, DiagnosisDraftInput } from "./diagnosisDraftEngine";

export type ActionPlanStep = {
  title: string;
  priority: "Alta" | "Media" | "Bassa";
  timing: string;
  detail: string;
};

export type DiagnosisActionPlan = {
  title: string;
  priority: string;
  operatorSummary: string;
  proposedTasks: ActionPlanStep[];
  suggestedInterventions: ActionPlanStep[];
  monitoringPlan: ActionPlanStep[];
  escalationRules: string[];
  materialsAndChecks: string[];
  humanReviewNotes: string[];
};

function planPriorityFromRisk(riskLevel: string) {
  if (riskLevel === "Critico") {
    return "Priorità critica — revisione entro 24 ore";
  }

  if (riskLevel === "Alto") {
    return "Priorità alta — controllo entro 24/48 ore";
  }

  if (riskLevel === "Medio") {
    return "Priorità media — controllo programmato";
  }

  return "Priorità bassa — monitoraggio ordinario";
}

function primaryTiming(riskLevel: string) {
  if (riskLevel === "Critico" || riskLevel === "Alto") {
    return "entro 24 ore";
  }

  if (riskLevel === "Medio") {
    return "entro 2-3 giorni";
  }

  return "entro 7 giorni";
}

function recommendedRecheck(riskLevel: string) {
  if (riskLevel === "Critico") {
    return "nuovo controllo dopo 24 ore";
  }

  if (riskLevel === "Alto") {
    return "nuovo controllo dopo 48 ore";
  }

  if (riskLevel === "Medio") {
    return "nuovo controllo entro 5 giorni";
  }

  return "nuovo controllo entro 7-10 giorni";
}

function symptomDrivenIntervention(symptom: string): ActionPlanStep {
  if (symptom === "Macchie fogliari" || symptom === "Muffa o patina") {
    return {
      title: "Verifica patologie fogliari",
      priority: "Alta",
      timing: "prima possibile",
      detail:
        "Controllare pagina superiore/inferiore delle foglie, umidità, ventilazione e diffusione delle macchie.",
    };
  }

  if (symptom === "Fori o rosure") {
    return {
      title: "Ispezione insetti e danni meccanici",
      priority: "Media",
      timing: "entro 48 ore",
      detail:
        "Cercare insetti, uova, larve, escrementi o segni di rosura su foglie e fusti.",
    };
  }

  if (symptom === "Ingiallimento" || symptom === "Crescita rallentata") {
    return {
      title: "Verifica nutrizione e irrigazione",
      priority: "Media",
      timing: "entro 2-3 giorni",
      detail:
        "Controllare concimazioni, pH/substrato se noto, irrigazione e distribuzione del sintomo.",
    };
  }

  if (symptom === "Appassimento" || symptom === "Radici compromesse") {
    return {
      title: "Controllo apparato radicale e drenaggio",
      priority: "Alta",
      timing: "entro 24 ore",
      detail:
        "Verificare ristagno, odori anomali, radici scure, substrato troppo bagnato o troppo secco.",
    };
  }

  return {
    title: `Approfondimento sintomo: ${symptom}`,
    priority: "Bassa",
    timing: "quando possibile",
    detail:
      "Documentare il sintomo con foto ravvicinata, foto d’insieme e note di evoluzione.",
  };
}

export function createLocalActionPlan(
  input: DiagnosisDraftInput,
  draft: DiagnosisDraft,
): DiagnosisActionPlan {
  const timing = primaryTiming(draft.riskLevel);
  const recheck = recommendedRecheck(draft.riskLevel);

  const symptomInterventions = input.symptoms.map(symptomDrivenIntervention);

  const proposedTasks: ActionPlanStep[] = [
    {
      title: "Registrare osservazione fotografica",
      priority: draft.riskLevel === "Critico" || draft.riskLevel === "Alto" ? "Alta" : "Media",
      timing: "subito",
      detail:
        "Conservare foto, sintomi, gravità percepita e note operatore come base della diagnosi assistita.",
    },
    {
      title: "Confronto visivo ravvicinato e d’insieme",
      priority: "Media",
      timing,
      detail:
        "Scattare una foto ravvicinata del sintomo e una foto della pianta o area completa.",
    },
    {
      title: "Revisione umana della bozza",
      priority: "Alta",
      timing,
      detail:
        "Un operatore deve confermare o correggere le ipotesi prima di trasformarle in interventi reali.",
    },
  ];

  const suggestedInterventions: ActionPlanStep[] = [
    ...symptomInterventions,
    {
      title: "Controllo condizioni ambientali",
      priority: "Media",
      timing: "durante il primo sopralluogo",
      detail:
        "Verificare irrigazione, drenaggio, esposizione, ventilazione, meteo recente e trattamenti effettuati.",
    },
  ];

  return {
    title: `Piano d’azione locale${input.plantName ? ` — ${input.plantName}` : ""}`,
    priority: planPriorityFromRisk(draft.riskLevel),
    operatorSummary:
      "Piano operativo generato localmente a partire dalla bozza diagnosi. Non è una prescrizione automatica e richiede revisione umana.",
    proposedTasks,
    suggestedInterventions,
    monitoringPlan: [
      {
        title: "Foto di follow-up",
        priority: "Media",
        timing: recheck,
        detail:
          "Ripetere foto dalla stessa angolazione per valutare peggioramento, stabilità o miglioramento.",
      },
      {
        title: "Aggiornare gravità",
        priority: "Media",
        timing: recheck,
        detail:
          "Aggiornare il livello di gravità se i sintomi si estendono, cambiano colore o coinvolgono nuove piante.",
      },
      {
        title: "Verificare esito azioni",
        priority: "Bassa",
        timing: "al controllo successivo",
        detail:
          "Annotare se le azioni correttive hanno ridotto, stabilizzato o aggravato il problema.",
      },
    ],
    escalationRules: [
      "Escalare se il problema si diffonde ad altre piante.",
      "Escalare se compaiono sintomi su fusto, radici o frutti.",
      "Escalare se la gravità passa ad alta o critica.",
      "Escalare se non c’è miglioramento dopo il follow-up previsto.",
    ],
    materialsAndChecks: [
      "Foto ravvicinata del sintomo.",
      "Foto d’insieme della pianta o area.",
      "Note su irrigazione e drenaggio.",
      "Storico trattamenti recenti.",
      "Condizioni meteo recenti.",
      "Eventuali campioni o osservazioni su insetti, muffe o radici.",
    ],
    humanReviewNotes: [
      "Non creare attività critica senza conferma umana.",
      "Non applicare trattamenti fitosanitari senza verifica tecnica.",
      "Distinguere sempre ipotesi, raccomandazioni e azioni confermate.",
      "Il futuro provider AI dovrà restituire confidenza, limiti e dati mancanti.",
    ],
  };
}

export function formatActionPlan(plan: DiagnosisActionPlan) {
  return [
    plan.title,
    "",
    `Priorità: ${plan.priority}`,
    "",
    "Sintesi operatore",
    plan.operatorSummary,
    "",
    "Attività proposte",
    ...plan.proposedTasks.map(
      (item) => `- [${item.priority}] ${item.title} (${item.timing}) — ${item.detail}`,
    ),
    "",
    "Interventi consigliati",
    ...plan.suggestedInterventions.map(
      (item) => `- [${item.priority}] ${item.title} (${item.timing}) — ${item.detail}`,
    ),
    "",
    "Monitoraggio",
    ...plan.monitoringPlan.map(
      (item) => `- [${item.priority}] ${item.title} (${item.timing}) — ${item.detail}`,
    ),
    "",
    "Regole escalation",
    ...plan.escalationRules.map((item) => `- ${item}`),
    "",
    "Materiali e verifiche",
    ...plan.materialsAndChecks.map((item) => `- ${item}`),
    "",
    "Note revisione umana",
    ...plan.humanReviewNotes.map((item) => `- ${item}`),
  ].join("\n");
}
