"use client";

import { useMemo, useState } from "react";

import type { DiagnosisActionPlan } from "./diagnosisActionPlan";
import type { DiagnosisDraft, DiagnosisDraftInput } from "./diagnosisDraftEngine";
import {
  createReviewPacket,
  formatReviewPacket,
  type ReviewDecision,
} from "./diagnosisReviewPacket";

type DiagnosisReviewWorkflowProps = {
  enabled: boolean;
  input: DiagnosisDraftInput;
  draft: DiagnosisDraft;
  actionPlan: DiagnosisActionPlan;
};

const reviewOptions: Array<{
  value: ReviewDecision;
  label: string;
  description: string;
}> = [
  {
    value: "APPROVE_WITH_CAUTION",
    label: "Approva con cautela",
    description: "La bozza è coerente e può diventare attività/intervento solo dopo conferma manuale.",
  },
  {
    value: "NEEDS_REVISION",
    label: "Richiede correzioni",
    description: "Servono dati migliori, nuova foto o modifica sintomi/gravità.",
  },
  {
    value: "REJECT_DRAFT",
    label: "Rifiuta bozza",
    description: "La bozza non è utilizzabile e va rigenerata con evidenze migliori.",
  },
];

export default function DiagnosisReviewWorkflow({
  enabled,
  input,
  draft,
  actionPlan,
}: DiagnosisReviewWorkflowProps) {
  const [decision, setDecision] = useState<ReviewDecision>("NEEDS_REVISION");
  const [reviewNotes, setReviewNotes] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const [exportStatus, setExportStatus] = useState("");

  const reviewPacket = useMemo(
    () =>
      createReviewPacket({
        input,
        draft,
        actionPlan,
        decision,
        reviewNotes,
      }),
    [actionPlan, decision, draft, input, reviewNotes],
  );

  const packetText = useMemo(() => formatReviewPacket(reviewPacket), [reviewPacket]);

  async function copyPacket() {
    if (!enabled) {
      setCopyStatus("Genera prima il piano d’azione.");
      return;
    }

    try {
      await navigator.clipboard.writeText(packetText);
      setCopyStatus("Pacchetto revisione copiato negli appunti.");
    } catch {
      setCopyStatus("Copia non riuscita. Copia manualmente il testo.");
    }
  }

  function exportJsonPacket() {
    if (!enabled) {
      setExportStatus("Genera prima il piano d’azione.");
      return;
    }

    const payload = {
      ...reviewPacket,
      exportedAt: new Date().toISOString(),
      exportMode: "local-json",
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = objectUrl;
    link.download = `agri-ai-review-packet-${Date.now()}.json`;
    link.click();

    URL.revokeObjectURL(objectUrl);
    setExportStatus("Pacchetto JSON esportato localmente.");
  }

  return (
    <article className="rounded-2xl border p-5 shadow-sm" data-ai-human-review-workflow="true">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            AI Human Review Workflow
          </p>
          <h2 className="text-xl font-semibold">Revisione umana e pacchetto diagnosi</h2>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            Chiude il ciclo locale: il revisore valuta bozza diagnosi e piano d’azione prima di
            qualunque trasformazione operativa. Nessun dato viene salvato nel database.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-muted"
            disabled={!enabled}
            type="button"
            onClick={copyPacket}
          >
            Copia pacchetto
          </button>
          <button
            className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-muted"
            disabled={!enabled}
            type="button"
            onClick={exportJsonPacket}
          >
            Esporta pacchetto JSON
          </button>
        </div>
      </div>

      {!enabled ? (
        <p className="mt-4 rounded-xl border p-4 text-sm text-muted-foreground">
          Genera prima il piano d’azione per abilitare la revisione umana.
        </p>
      ) : null}

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Decisione revisore</h3>
          <div className="mt-3 grid gap-2">
            {reviewOptions.map((option) => (
              <label key={option.value} className="rounded-xl border p-3 text-sm">
                <span className="flex items-center gap-2 font-medium">
                  <input
                    checked={decision === option.value}
                    disabled={!enabled}
                    name="reviewDecision"
                    type="radio"
                    value={option.value}
                    onChange={() => setDecision(option.value)}
                  />
                  {option.label}
                </span>
                <span className="mt-1 block text-muted-foreground">{option.description}</span>
              </label>
            ))}
          </div>

          <label className="mt-4 block">
            <span className="text-sm font-medium">Note revisore</span>
            <textarea
              className="mt-2 min-h-28 w-full rounded-xl border bg-background px-4 py-2 text-sm"
              disabled={!enabled}
              placeholder="Cosa confermare, correggere o rifiutare prima di procedere?"
              value={reviewNotes}
              onChange={(event) => setReviewNotes(event.target.value)}
            />
          </label>
        </div>

        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Checklist revisione</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            {reviewPacket.reviewChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h3 className="mt-5 font-semibold">Prossimi passi</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            {reviewPacket.nextSteps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {copyStatus ? (
        <p className="mt-4 rounded-xl border p-3 text-sm text-muted-foreground">{copyStatus}</p>
      ) : null}

      {exportStatus ? (
        <p className="mt-4 rounded-xl border p-3 text-sm text-muted-foreground">{exportStatus}</p>
      ) : null}

      <pre className="mt-4 max-h-96 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
        <code>{enabled ? packetText : "Pacchetto revisione non ancora disponibile."}</code>
      </pre>
    </article>
  );
}
