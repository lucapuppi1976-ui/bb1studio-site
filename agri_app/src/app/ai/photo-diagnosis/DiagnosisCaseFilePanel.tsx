"use client";

import { useMemo, useState } from "react";

import {
  createDiagnosisCaseFile,
  formatDiagnosisCaseFile,
} from "../../../lib/ai/photoDiagnosisCaseFile";
import { createValidEvidenceBundleFixture } from "../../../lib/ai/photoEvidenceBundle";

export default function DiagnosisCaseFilePanel() {
  const [plantContext, setPlantContext] = useState("vite in filare");
  const [locationHint, setLocationHint] = useState("serra nord");
  const [symptomsText, setSymptomsText] = useState("macchie fogliari, ingiallimento");
  const [operatorNotes, setOperatorNotes] = useState(
    "Case file dry-run con tracciabilità completa, audit trail e blocco operativo.",
  );
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const caseFile = useMemo(() => {
    const fixture = createValidEvidenceBundleFixture();

    return createDiagnosisCaseFile({
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
      await navigator.clipboard.writeText(formatDiagnosisCaseFile(caseFile));
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  async function copyJson() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(caseFile, null, 2));
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-diagnosis-case-file="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Diagnosis Case File
        </p>
        <h2 className="text-xl font-semibold">Case file diagnostico e audit trail</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Crea un fascicolo esportabile del percorso diagnostico: evidenze, dry-run, ipotesi,
          piano operativo, audit trail, fingerprint e revisione umana obbligatoria. Nessuna
          persistenza DB e nessuna esecuzione automatica.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Input case file</h3>
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
              <p className="text-sm text-muted-foreground">Case file ID</p>
              <p className="break-all font-semibold">{caseFile.caseFileId}</p>
            </div>
            <span className="rounded-full border px-3 py-1 text-sm">{caseFile.status}</span>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border p-3">
              <p className="text-sm text-muted-foreground">Fingerprint</p>
              <p className="break-all font-semibold">{caseFile.caseFileFingerprint}</p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="text-sm text-muted-foreground">Risk</p>
              <p className="font-semibold">{caseFile.summary.riskLevel}</p>
            </div>
          </div>

          <div className="mt-4 rounded-lg border p-3">
            <p className="font-semibold">Safety</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              <li>providerCalled=false</li>
              <li>persistencePerformed=false</li>
              <li>automaticTaskCreationPerformed=false</li>
              <li>automaticInterventionCreationPerformed=false</li>
              <li>allowedToExecute=false</li>
              <li>humanReviewRequired=true</li>
            </ul>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-lg border px-3 py-2 text-sm font-medium"
              onClick={copyReport}
            >
              Copia case file
            </button>
            <button
              type="button"
              className="rounded-lg border px-3 py-2 text-sm font-medium"
              onClick={copyJson}
            >
              Esporta case file JSON
            </button>
          </div>

          {copyState === "copied" ? (
            <p className="mt-2 text-sm text-muted-foreground">Case file copiato.</p>
          ) : null}
          {copyState === "error" ? (
            <p className="mt-2 text-sm text-muted-foreground">
              Copia non riuscita. Puoi selezionare manualmente il contenuto.
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Audit trail</h3>
        <div className="mt-3 grid gap-2">
          {caseFile.auditTrail.map((entry) => (
            <div key={entry.step} className="rounded-lg border p-3 text-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium">{entry.step}</p>
                <span className="rounded-full border px-2 py-1 text-xs">{entry.status}</span>
              </div>
              <p className="mt-1 text-muted-foreground">{entry.note}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Report case file</h3>
        <pre className="mt-3 max-h-96 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
          <code>{formatDiagnosisCaseFile(caseFile)}</code>
        </pre>
      </div>
    </section>
  );
}
