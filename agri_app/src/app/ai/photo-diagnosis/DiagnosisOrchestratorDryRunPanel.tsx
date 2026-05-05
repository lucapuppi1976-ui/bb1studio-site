"use client";

import { useMemo, useState } from "react";

import {
  createDiagnosisOrchestratorDryRun,
  formatDiagnosisOrchestratorDryRun,
} from "../../../lib/ai/photoDiagnosisOrchestratorDryRun";
import { createValidEvidenceBundleFixture } from "../../../lib/ai/photoEvidenceBundle";

export default function DiagnosisOrchestratorDryRunPanel() {
  const [plantContext, setPlantContext] = useState("vite in filare");
  const [locationHint, setLocationHint] = useState("serra nord");
  const [symptomsText, setSymptomsText] = useState("macchie fogliari, ingiallimento");
  const [operatorNotes, setOperatorNotes] = useState(
    "Test orchestrazione dry-run con bundle completo, request preview e validazione risposta sintetica.",
  );
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const dryRun = useMemo(() => {
    const fixture = createValidEvidenceBundleFixture();

    return createDiagnosisOrchestratorDryRun({
      ...fixture,
      plantContext,
      locationHint,
      symptoms: symptomsText
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      operatorNotes,
      locale: "it-IT",
    });
  }, [locationHint, operatorNotes, plantContext, symptomsText]);

  async function copyReport() {
    try {
      await navigator.clipboard.writeText(formatDiagnosisOrchestratorDryRun(dryRun));
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  async function copyJson() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(dryRun, null, 2));
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-diagnosis-orchestrator-dry-run="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Diagnosis Orchestrator Dry Run
        </p>
        <h2 className="text-xl font-semibold">Orchestrazione completa diagnosi AI</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Esegue in locale l’intera pipeline: evidence bundle, provider request preview, risposta
          sintetica, validazione, decisione operativa bloccata e revisione umana obbligatoria.
          Nessun provider AI viene chiamato.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Input dry-run</h3>
          <div className="mt-3 grid gap-3">
            <input
              className="rounded-lg border p-2 text-sm"
              value={plantContext}
              onChange={(event) => setPlantContext(event.target.value)}
              placeholder="Contesto pianta"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={locationHint}
              onChange={(event) => setLocationHint(event.target.value)}
              placeholder="Area, serra, filare"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={symptomsText}
              onChange={(event) => setSymptomsText(event.target.value)}
              placeholder="Sintomi separati da virgola"
            />
            <textarea
              className="min-h-24 rounded-lg border p-2 text-sm"
              value={operatorNotes}
              onChange={(event) => setOperatorNotes(event.target.value)}
              placeholder="Note operatore"
            />
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Orchestrator ID</p>
              <p className="break-all font-semibold">{dryRun.orchestratorId}</p>
            </div>
            <span className="rounded-full border px-3 py-1 text-sm">
              {dryRun.completed ? "Dry-run completato" : "Dry-run incompleto"}
            </span>
          </div>

          <div className="mt-4 grid gap-2">
            {dryRun.steps.map((step) => (
              <div key={step.id} className="rounded-lg border p-3 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium">{step.label}</p>
                  <span className="rounded-full border px-2 py-1 text-xs">{step.status}</span>
                </div>
                <p className="mt-1 text-muted-foreground">{step.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-lg border p-3">
            <p className="font-semibold">Decisione operativa</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              <li>allowedToExecute=false</li>
              <li>providerCalled=false</li>
              <li>persistencePerformed=false</li>
              <li>automaticTaskCreationPerformed=false</li>
              <li>automaticInterventionCreationPerformed=false</li>
              <li>humanReviewRequired=true</li>
            </ul>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-lg border px-3 py-2 text-sm font-medium"
              onClick={copyReport}
            >
              Copia report orchestratore
            </button>
            <button
              type="button"
              className="rounded-lg border px-3 py-2 text-sm font-medium"
              onClick={copyJson}
            >
              Copia JSON dry-run
            </button>
          </div>

          {copyState === "copied" ? (
            <p className="mt-2 text-sm text-muted-foreground">Output copiato.</p>
          ) : null}
          {copyState === "error" ? (
            <p className="mt-2 text-sm text-muted-foreground">
              Copia non riuscita. Puoi selezionare manualmente il contenuto.
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Risposta sintetica validata</h3>
        <p className="mt-2 text-sm text-muted-foreground">{dryRun.syntheticProviderResponse.summary}</p>
        <pre className="mt-3 max-h-96 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
          <code>{JSON.stringify(dryRun.syntheticProviderResponse, null, 2)}</code>
        </pre>
      </div>
    </section>
  );
}
