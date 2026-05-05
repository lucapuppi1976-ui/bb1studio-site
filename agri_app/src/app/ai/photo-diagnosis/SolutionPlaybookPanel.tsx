"use client";

import { useMemo, useState } from "react";

import {
  createSolutionPlaybook,
  formatSolutionPlaybook,
} from "../../../lib/ai/photoSolutionPlaybook";
import { createDifferentialDiagnosisMatrix } from "../../../lib/ai/photoDifferentialDiagnosis";
import {
  createPhotoSymptomAnnotationFixture,
  type SymptomSeverity,
} from "../../../lib/ai/photoSymptomAnnotation";

export default function SolutionPlaybookPanel() {
  const [crop, setCrop] = useState("vite");
  const [visibleSignsText, setVisibleSignsText] = useState("macchie brune, alone giallo, ingiallimento");
  const [severity, setSeverity] = useState<SymptomSeverity>("medium");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const playbook = useMemo(() => {
    const fixture = createPhotoSymptomAnnotationFixture();
    const visibleSigns = visibleSignsText
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const matrix = createDifferentialDiagnosisMatrix({
      ...fixture,
      crop,
      regions: fixture.regions.map((region, index) => ({
        ...region,
        severity: index === 0 ? severity : region.severity,
        visibleSigns: visibleSigns.length ? visibleSigns : region.visibleSigns,
      })),
    });

    return createSolutionPlaybook(matrix);
  }, [crop, severity, visibleSignsText]);

  async function copyReport() {
    try {
      await navigator.clipboard.writeText(formatSolutionPlaybook(playbook));
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  async function copyJson() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(playbook, null, 2));
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-solution-playbook="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Solution Playbook
        </p>
        <h2 className="text-xl font-semibold">Soluzioni candidate con vincoli di sicurezza</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Genera un playbook locale e non prescrittivo partendo dalla diagnosi differenziale.
          Il sistema propone raccolta evidenze, monitoraggio, azioni conservative e revisione
          professionale senza prodotti, dosi, task automatici o persistenza.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Input playbook</h3>
          <div className="mt-3 grid gap-3">
            <input
              className="rounded-lg border p-2 text-sm"
              value={crop}
              onChange={(event) => setCrop(event.target.value)}
              placeholder="Coltura"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={visibleSignsText}
              onChange={(event) => setVisibleSignsText(event.target.value)}
              placeholder="Segni visibili separati da virgola"
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

          <div className="mt-4 rounded-xl border p-4">
            <p className="text-sm text-muted-foreground">Playbook fingerprint</p>
            <p className="break-all font-semibold">{playbook.playbookFingerprint}</p>
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Top options</h3>
          <div className="mt-3 grid gap-3">
            {playbook.topOptions.map((option) => (
              <div key={option.id} className="rounded-xl border p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold">{option.objective}</p>
                  <span className="rounded-full border px-2 py-1 text-xs">
                    {option.category} · {option.priority}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{option.rationale}</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-muted-foreground">
                  {option.steps.slice(0, 4).map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Evidence required before execution</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {playbook.evidenceRequiredBeforeExecution.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Blocchi operativi</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>productPrescriptionPerformed=false</li>
            <li>dosageAdvicePerformed=false</li>
            <li>automaticTaskCreationPerformed=false</li>
            <li>automaticInterventionCreationPerformed=false</li>
            <li>allowedToExecute=false</li>
            <li>humanReviewRequired=true</li>
          </ul>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={copyReport}
        >
          Copia playbook soluzioni
        </button>
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={copyJson}
        >
          Esporta playbook JSON
        </button>
      </div>

      {copyState === "copied" ? (
        <p className="mt-2 text-sm text-muted-foreground">Playbook copiato.</p>
      ) : null}
      {copyState === "error" ? (
        <p className="mt-2 text-sm text-muted-foreground">
          Copia non riuscita. Puoi selezionare manualmente il contenuto.
        </p>
      ) : null}

      <pre className="mt-5 max-h-96 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
        <code>{formatSolutionPlaybook(playbook)}</code>
      </pre>
    </section>
  );
}
