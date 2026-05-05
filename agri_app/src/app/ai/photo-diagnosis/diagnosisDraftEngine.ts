export type DiagnosisDraftInput = {
  plantName: string;
  location: string;
  symptoms: string[];
  severity: string;
  notes: string;
  fileName: string;
  fileType: string;
  fileSizeLabel: string;
};

export type DiagnosisDraft = {
  title: string;
  summary: string;
  riskLevel: string;
  confidence: string;
  likelyProblems: string[];
  immediateActions: string[];
  additionalChecks: string[];
  followUp: string[];
  limitations: string[];
};

const symptomProblemMap: Record<string, string[]> = {
  "Macchie fogliari": [
    "possibile patologia fungina o batterica sulle foglie",
    "possibile stress da umidità o bagnatura prolungata",
  ],
  Ingiallimento: [
    "possibile carenza nutrizionale",
    "possibile stress idrico o radicale",
  ],
  Appassimento: [
    "possibile stress idrico",
    "possibile problema radicale o vascolare",
  ],
  Secchezza: [
    "possibile stress da caldo, vento o irrigazione insufficiente",
    "possibile danno localizzato ai tessuti",
  ],
  "Muffa o patina": [
    "possibile presenza fungina superficiale",
    "possibile eccesso di umidità o scarsa ventilazione",
  ],
  "Fori o rosure": [
    "possibile attività di insetti masticatori",
    "possibile danno meccanico o da fauna",
  ],
  Deformazioni: [
    "possibile virosi, fitotossicità o danno da parassiti",
    "possibile stress durante la crescita",
  ],
  "Crescita rallentata": [
    "possibile carenza nutrizionale o competizione radicale",
    "possibile condizioni ambientali non ottimali",
  ],
  "Radici compromesse": [
    "possibile marciume radicale",
    "possibile ristagno idrico o substrato non idoneo",
  ],
  "Altro sintomo visibile": [
    "problema da classificare con ulteriori dati visivi e contestuali",
  ],
};

function unique(items: string[]) {
  return Array.from(new Set(items));
}

function riskFromSeverity(severity: string, symptomCount: number) {
  if (severity === "Critica") {
    return "Critico";
  }

  if (severity === "Alta" || symptomCount >= 4) {
    return "Alto";
  }

  if (severity === "Media" || symptomCount >= 2) {
    return "Medio";
  }

  return "Basso";
}

function confidenceFromContext(input: DiagnosisDraftInput) {
  let score = 0;

  if (input.fileName) {
    score += 1;
  }

  if (input.plantName.trim()) {
    score += 1;
  }

  if (input.symptoms.length) {
    score += 1;
  }

  if (input.notes.trim().length >= 20) {
    score += 1;
  }

  if (score >= 4) {
    return "Media — contesto iniziale sufficiente, serve analisi visiva reale per aumentare affidabilità.";
  }

  if (score >= 2) {
    return "Bassa-media — informazioni utili ma incomplete.";
  }

  return "Bassa — dati insufficienti, servono foto e contesto migliori.";
}

export function createLocalDiagnosisDraft(input: DiagnosisDraftInput): DiagnosisDraft {
  const likelyProblems = unique(
    input.symptoms.flatMap((symptom) => symptomProblemMap[symptom] ?? []),
  );

  const fallbackProblems = [
    "problema non classificato: servono immagine, sintomi e contesto agronomico aggiuntivo",
  ];

  const riskLevel = riskFromSeverity(input.severity, input.symptoms.length);

  return {
    title: `Bozza diagnosi locale${input.plantName ? ` — ${input.plantName}` : ""}`,
    summary:
      "Questa bozza è generata localmente sulla base dei sintomi e del contesto inseriti. Non sostituisce una diagnosi AI reale né una valutazione agronomica.",
    riskLevel,
    confidence: confidenceFromContext(input),
    likelyProblems: likelyProblems.length ? likelyProblems : fallbackProblems,
    immediateActions: [
      "Isolare o marcare la pianta/area osservata per monitoraggio.",
      "Scattare almeno una foto ravvicinata del sintomo e una foto d’insieme.",
      "Verificare irrigazione, drenaggio, esposizione, ventilazione e trattamenti recenti.",
      riskLevel === "Critico" || riskLevel === "Alto"
        ? "Programmare controllo operativo entro 24 ore."
        : "Programmare controllo operativo nei prossimi giorni.",
    ],
    additionalChecks: [
      "Controllare pagina superiore e inferiore delle foglie.",
      "Verificare presenza di insetti, uova, muffe, patine o lesioni.",
      "Controllare umidità del substrato e stato delle radici se accessibili.",
      "Annotare meteo recente, irrigazioni, concimazioni e trattamenti effettuati.",
    ],
    followUp: [
      "Ripetere foto nella stessa posizione per confronto temporale.",
      "Aggiornare gravità se i sintomi aumentano o si diffondono.",
      "Trasformare la bozza in attività solo dopo revisione umana.",
    ],
    limitations: [
      "Analisi AI live non attiva in questa release.",
      "La bozza non usa riconoscimento visivo reale.",
      "Le ipotesi sono assistive e devono essere verificate.",
      "Non applicare trattamenti rischiosi senza conferma tecnica.",
    ],
  };
}

export function formatDiagnosisDraft(input: DiagnosisDraftInput, draft: DiagnosisDraft) {
  return [
    draft.title,
    "",
    "Dati ingresso",
    `- File: ${input.fileName || "non selezionato"}`,
    `- Tipo: ${input.fileType || "non disponibile"}`,
    `- Dimensione: ${input.fileSizeLabel || "non disponibile"}`,
    `- Pianta/coltura: ${input.plantName || "non indicata"}`,
    `- Area/posizione: ${input.location || "non indicata"}`,
    `- Sintomi: ${input.symptoms.length ? input.symptoms.join(", ") : "non indicati"}`,
    `- Gravità percepita: ${input.severity}`,
    `- Note: ${input.notes || "nessuna nota"}`,
    "",
    "Sintesi",
    draft.summary,
    "",
    `Rischio operativo: ${draft.riskLevel}`,
    `Confidenza: ${draft.confidence}`,
    "",
    "Ipotesi problema",
    ...draft.likelyProblems.map((item) => `- ${item}`),
    "",
    "Azioni immediate",
    ...draft.immediateActions.map((item) => `- ${item}`),
    "",
    "Controlli aggiuntivi",
    ...draft.additionalChecks.map((item) => `- ${item}`),
    "",
    "Follow-up",
    ...draft.followUp.map((item) => `- ${item}`),
    "",
    "Limiti",
    ...draft.limitations.map((item) => `- ${item}`),
  ].join("\n");
}
