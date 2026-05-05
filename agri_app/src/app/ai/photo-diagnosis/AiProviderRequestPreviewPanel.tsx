"use client";

import { useMemo, useState } from "react";

import {
  createAiProviderRequestPreview,
  formatAiProviderRequestPreview,
} from "../../../lib/ai/photoDiagnosisProviderRequest";
import { createValidEvidenceBundleFixture } from "../../../lib/ai/photoEvidenceBundle";

export default function AiProviderRequestPreviewPanel() {
  const [plantContext, setPlantContext] = useState("vite in filare");
  const [locationHint, setLocationHint] = useState("serra nord");
  const [suspectedCrop, setSuspectedCrop] = useState("vite");
  const [symptomsText, setSymptomsText] = useState("macchie fogliari, ingiallimento");
  const [operatorNotes, setOperatorNotes] = useState(
    "Sintomi osservati su foglie giovani. Disponibili foto di dettaglio, pianta intera e pagina inferiore.",
  );
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const preview = useMemo(() => {
    const fixture = createValidEvidenceBundleFixture();

    return createAiProviderRequestPreview({
      ...fixture,
      plantContext,
      locationHint,
      suspectedCrop,
      symptoms: symptomsText
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      operatorNotes,
      locale: "it-IT",
      requestedOutputs: [
        "diagnosis",
        "severity",
        "evidence",
        "action-plan",
        "monitoring",
        "human-review",
      ],
    });
  }, [locationHint, operatorNotes, plantContext, suspectedCrop, symptomsText]);

  async function copyPreview() {
    try {
      await navigator.clipboard.writeText(formatAiProviderRequestPreview(preview));
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  async function copyJson() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(preview.providerPayload, null, 2));
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-provider-request-preview="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Provider Request Preview
        </p>
        <h2 className="text-xl font-semibold">Anteprima richiesta provider AI</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Costruisce il prompt, il payload e lo schema JSON atteso per la futura chiamata AI. La
          chiamata provider resta disabilitata: providerCallsEnabled=false, externalProviderCalled=false
          e humanReviewRequired=true.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Contesto richiesta</h3>
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
              value={suspectedCrop}
              onChange={(event) => setSuspectedCrop(event.target.value)}
              placeholder="Coltura sospetta"
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
              <p className="text-sm text-muted-foreground">Request ID</p>
              <p className="break-all font-semibold">{preview.requestId}</p>
            </div>
            <span className="rounded-full border px-3 py-1 text-sm">
              {preview.requestReady ? "Request ready" : "Da completare"}
            </span>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border p-3">
              <p className="text-sm text-muted-foreground">Bundle score</p>
              <p className="font-semibold">{preview.evidenceBundle.bundleScore}/100</p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="text-sm text-muted-foreground">Readiness</p>
              <p className="font-semibold">{preview.evidenceBundle.readiness}</p>
            </div>
          </div>

          <div className="mt-4 rounded-lg border p-3">
            <p className="font-semibold">Vincoli provider</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              <li>providerCallsEnabled=false</li>
              <li>externalProviderCalled=false</li>
              <li>clientProviderCallsAllowed=false</li>
              <li>persistenceAllowed=false</li>
              <li>automaticTaskCreationAllowed=false</li>
              <li>automaticInterventionCreationAllowed=false</li>
              <li>humanReviewRequired=true</li>
            </ul>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-lg border px-3 py-2 text-sm font-medium"
              onClick={copyPreview}
            >
              Copia preview
            </button>
            <button
              type="button"
              className="rounded-lg border px-3 py-2 text-sm font-medium"
              onClick={copyJson}
            >
              Copia provider payload JSON
            </button>
          </div>

          {copyState === "copied" ? (
            <p className="mt-2 text-sm text-muted-foreground">Preview copiata.</p>
          ) : null}
          {copyState === "error" ? (
            <p className="mt-2 text-sm text-muted-foreground">
              Copia non riuscita. Puoi selezionare manualmente il contenuto.
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Schema JSON atteso</h3>
        <pre className="mt-3 max-h-96 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
          <code>{JSON.stringify(preview.providerPayload.expectedJsonSchema, null, 2)}</code>
        </pre>
      </div>
    </section>
  );
}
