"use client";

import { useMemo, useState } from "react";

import {
  createAiFieldIntelligenceReport,
  createFieldIntelligenceFixture,
  defaultFieldIntelligenceInput,
  formatAiFieldIntelligenceReport,
  type FieldIntelligenceCaseInput,
} from "../../../lib/ai/aiFieldIntelligence";

export default function FieldIntelligencePanel() {
  const [input, setInput] = useState<FieldIntelligenceCaseInput>(defaultFieldIntelligenceInput);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const report = useMemo(() => createAiFieldIntelligenceReport(input), [input]);

  function applyReadyFixture() {
    setInput(createFieldIntelligenceFixture());
  }

  function resetInput() {
    setInput(defaultFieldIntelligenceInput);
  }

  function updateText<K extends keyof FieldIntelligenceCaseInput>(
    key: K,
    value: FieldIntelligenceCaseInput[K],
  ) {
    setInput((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function copyReport() {
    try {
      await navigator.clipboard.writeText(formatAiFieldIntelligenceReport(report));
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  async function copyJson() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(report, null, 2));
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  const toggles = [
    {
      label: "Evidence matrix",
      key: "includeEvidenceMatrix" as const,
    },
    {
      label: "Severity map",
      key: "includeSeverityMap" as const,
    },
    {
      label: "Risk forecast",
      key: "includeRiskForecast" as const,
    },
    {
      label: "Differential focus",
      key: "includeDifferentialFocus" as const,
    },
    {
      label: "Next photo protocol",
      key: "includeNextPhotoProtocol" as const,
    },
    {
      label: "Human review checklist",
      key: "includeHumanReviewChecklist" as const,
    },
    {
      label: "Human review required",
      key: "humanReviewRequired" as const,
    },
  ];

  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-field-intelligence="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Multi-Photo Field Intelligence
        </p>
        <h2 className="text-xl font-semibold">Intelligence multi-foto del caso</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Correlazione premium tra foto, regioni sintomatiche, tessuti, severita, segnali ripetuti
          e protocollo foto successive. Analisi locale dry-run: nessuna chiamata provider AI live,
          nessuna persistenza e nessuna automazione.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Caso campo</h3>
          <div className="mt-3 grid gap-3">
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.caseId}
              onChange={(event) => updateText("caseId", event.target.value)}
              placeholder="Case ID"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.operatorName}
              onChange={(event) => updateText("operatorName", event.target.value)}
              placeholder="Operatore"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.crop}
              onChange={(event) => updateText("crop", event.target.value)}
              placeholder="Coltura"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.locationHint}
              onChange={(event) => updateText("locationHint", event.target.value)}
              placeholder="Settore / posizione"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.observedAtLabel}
              onChange={(event) => updateText("observedAtLabel", event.target.value)}
              placeholder="Data/ora osservazione"
            />
            <textarea
              className="min-h-24 rounded-lg border p-2 text-sm"
              value={input.agronomicContext}
              onChange={(event) => updateText("agronomicContext", event.target.value)}
              placeholder="Contesto agronomico"
            />
          </div>

          <div className="mt-4 grid gap-2">
            {toggles.map((item) => (
              <label key={item.key} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={Boolean(input[item.key])}
                  onChange={(event) => updateText(item.key, event.target.checked as never)}
                />
                {item.label}
              </label>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-lg border px-3 py-2 text-sm font-medium"
              onClick={applyReadyFixture}
            >
              Simula caso multi-foto
            </button>
            <button
              type="button"
              className="rounded-lg border px-3 py-2 text-sm font-medium"
              onClick={resetInput}
            >
              Reset caso
            </button>
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Field intelligence status</h3>
          <div className="mt-3 grid gap-2 text-sm">
            <p>
              <span className="text-muted-foreground">reportReady:</span>{" "}
              <strong>{String(report.reportReady)}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">photoCount:</span>{" "}
              <strong>{report.inputSummary.photoCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">evidenceCount:</span>{" "}
              <strong>{report.inputSummary.evidenceCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">dominantSeverity:</span>{" "}
              <strong>{report.crossPhotoPatterns.dominantSeverity}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">riskTier:</span>{" "}
              <strong>{report.riskForecast.riskTier}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">confidenceScore:</span>{" "}
              <strong>{report.riskForecast.confidenceScore}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">providerAiReady:</span>{" "}
              <strong>false</strong>
            </p>
            <p>
              <span className="text-muted-foreground">reportFingerprint:</span>{" "}
              <strong className="break-all">{report.reportFingerprint}</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Evidence matrix</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.evidenceMatrix.length ? (
            report.evidenceMatrix.map((item) => (
              <li key={item.id}>
                {item.photoId}/{item.regionId} — {item.label} — tissue={item.tissue} — severity=
                {item.severity} — score={item.severityScore}
              </li>
            ))
          ) : (
            <li>Nessuna evidenza: usa “Simula caso multi-foto” oppure aggiungi foto reali nelle versioni successive.</li>
          )}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Severity map</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.severityMap.length ? (
            report.severityMap.map((item) => (
              <li key={item.tissue}>
                {item.tissue} — regions={item.affectedRegions} — max={item.maxSeverityScore} — avg=
                {item.averageSeverityScore}
              </li>
            ))
          ) : (
            <li>Severity map non disponibile.</li>
          )}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Differential focus</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.differentialFocus.map((item) => (
            <li key={item.id}>
              {item.priority.toUpperCase()} — {item.label} — {item.safetyNote}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Next photo protocol</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.nextPhotoProtocol.map((item) => (
            <li key={item.id}>
              {item.label} — {item.reason} — angle={item.requestedAngle} — distance=
              {item.requestedDistance}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Human review checklist</h3>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {report.humanReviewChecklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={copyReport}
        >
          Copia field intelligence
        </button>
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={copyJson}
        >
          Esporta JSON
        </button>
      </div>

      {copyState === "copied" ? (
        <p className="mt-2 text-sm text-muted-foreground">Report copiato.</p>
      ) : null}
      {copyState === "error" ? (
        <p className="mt-2 text-sm text-muted-foreground">
          Copia non riuscita. Puoi selezionare manualmente il contenuto.
        </p>
      ) : null}

      <pre className="mt-5 max-h-96 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
        <code>{formatAiFieldIntelligenceReport(report)}</code>
      </pre>
    </section>
  );
}
