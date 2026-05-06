"use client";

import { useMemo, useState } from "react";

import {
  createAiDecisionDossier,
} from "../../../lib/ai/aiDecisionDossier";
import {
  createAiWorkOrderPreview,
  formatAiWorkOrderPreview,
} from "../../../lib/ai/aiWorkOrderPreview";
import { createDiagnosisCaseReport } from "../../../lib/ai/photoDiagnosisCaseReport";
import {
  createPhotoSymptomAnnotationFixture,
  type SymptomSeverity,
} from "../../../lib/ai/photoSymptomAnnotation";

export default function WorkOrderPreviewPanel() {
  const [crop, setCrop] = useState("olivo");
  const [context, setContext] = useState("ingiallimento diffuso e macchie fogliari");
  const [severity, setSeverity] = useState<SymptomSeverity>("medium");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const preview = useMemo(() => {
    const fixture = createPhotoSymptomAnnotationFixture();
    const caseReport = createDiagnosisCaseReport({
      ...fixture,
      crop,
      plantContext: context,
      regions: fixture.regions.map((region, index) => ({
        ...region,
        severity: index === 0 ? severity : region.severity,
      })),
    });
    const dossier = createAiDecisionDossier(caseReport);

    return createAiWorkOrderPreview(dossier);
  }, [crop, context, severity]);

  async function copyText() {
    try {
      await navigator.clipboard.writeText(formatAiWorkOrderPreview(preview));
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  async function copyJson() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(preview, null, 2));
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-work-order-preview="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Work Order Preview
        </p>
        <h2 className="text-xl font-semibold">Execution-safe work package</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Trasforma il decision dossier in attività proposte, interventi suggeriti e vincoli di
          esecuzione. La preview non crea task, non crea interventi e non abilita l’esecuzione.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Input preview</h3>
          <div className="mt-3 grid gap-3">
            <input
              className="rounded-lg border p-2 text-sm"
              value={crop}
              onChange={(event) => setCrop(event.target.value)}
              placeholder="Coltura"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={context}
              onChange={(event) => setContext(event.target.value)}
              placeholder="Contesto osservato"
            />
            <select
              className="rounded-lg border p-2 text-sm"
              value={severity}
              onChange={(event) => setSeverity(event.target.value as SymptomSeverity)}
            >
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
              <option value="critical">critical</option>
            </select>
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Preview summary</h3>
          <p className="mt-3 text-sm text-muted-foreground">{preview.summary}</p>
          <div className="mt-4 grid gap-2 text-sm">
            <p>
              <span className="text-muted-foreground">Priority:</span>{" "}
              <strong>{preview.priority}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">Fingerprint:</span>{" "}
              <strong className="break-all">{preview.previewFingerprint}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">Tasks:</span>{" "}
              <strong>{preview.tasks.length}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">Interventions:</span>{" "}
              <strong>{preview.interventions.length}</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-3">
        {preview.tasks.map((task) => (
          <div key={task.id} className="rounded-xl border p-4">
            <h3 className="font-semibold">{task.title}</h3>
            <p className="mt-2 text-xs text-muted-foreground">
              ownerRole={task.ownerRole} · priority={task.priority}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">{task.objective}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Checklist
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-muted-foreground">
              {task.checklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-3">
        {preview.interventions.map((intervention) => (
          <div key={intervention.id} className="rounded-xl border p-4">
            <h3 className="font-semibold">{intervention.title}</h3>
            <p className="mt-2 text-xs text-muted-foreground">
              type={intervention.interventionType} · priority={intervention.priority}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">{intervention.objective}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Prohibited actions
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-muted-foreground">
              {intervention.prohibitedActions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Execution constraints</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>allowedToCreateTask=false</li>
          <li>allowedToCreateIntervention=false</li>
          <li>allowedToExecute=false</li>
          <li>allowedToPrescribeProduct=false</li>
          <li>allowedToSuggestDosage=false</li>
          <li>requiresHumanReview=true</li>
          <li>requiresSafetyConfirmation=true</li>
          <li>requiresEvidenceConfirmation=true</li>
        </ul>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={copyText}
        >
          Copia work order
        </button>
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={copyJson}
        >
          Esporta preview JSON
        </button>
      </div>

      {copyState === "copied" ? (
        <p className="mt-2 text-sm text-muted-foreground">Work order copiato.</p>
      ) : null}
      {copyState === "error" ? (
        <p className="mt-2 text-sm text-muted-foreground">
          Copia non riuscita. Puoi selezionare manualmente il contenuto.
        </p>
      ) : null}

      <pre className="mt-5 max-h-96 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
        <code>{formatAiWorkOrderPreview(preview)}</code>
      </pre>
    </section>
  );
}
