"use client";

import { useMemo, useState } from "react";

import {
  createTemporalTrendFixture,
  createTemporalTrendReport,
  defaultTemporalTrendInput,
  formatTemporalTrendReport,
  type TemporalTrendInput,
} from "../../../lib/ai/aiTemporalTrend";

export default function TemporalTrendPanel() {
  const [input, setInput] = useState<TemporalTrendInput>(defaultTemporalTrendInput);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const report = useMemo(() => createTemporalTrendReport(input), [input]);

  function applyReadyFixture() {
    setInput(createTemporalTrendFixture());
  }

  function resetTrend() {
    setInput(defaultTemporalTrendInput);
  }

  function updateText<K extends keyof TemporalTrendInput>(key: K, value: TemporalTrendInput[K]) {
    setInput((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function copyTrend() {
    try {
      await navigator.clipboard.writeText(formatTemporalTrendReport(report));
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  async function exportJson() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(report, null, 2));
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  const toggles = [
    {
      label: "Timeline",
      key: "includeTimeline" as const,
    },
    {
      label: "Change vector",
      key: "includeChangeVector" as const,
    },
    {
      label: "Severity trend",
      key: "includeSeverityTrend" as const,
    },
    {
      label: "Temporal forecast",
      key: "includeForecast" as const,
    },
    {
      label: "Follow-up schedule",
      key: "includeFollowUpSchedule" as const,
    },
    {
      label: "Escalation rules",
      key: "includeEscalationRules" as const,
    },
    {
      label: "Human review required",
      key: "humanReviewRequired" as const,
    },
  ];

  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-temporal-trend="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Temporal Field Trend Intelligence
        </p>
        <h2 className="text-xl font-semibold">Trend temporale del caso fotografico</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Confronto premium tra osservazioni fotografiche in momenti diversi: baseline,
          follow-up, change vector, severity trend, forecast locale e piano di follow-up.
          Dry-run locale, nessun provider AI live, nessuna persistenza e nessuna automazione.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Caso temporale</h3>
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
              Simula trend temporale
            </button>
            <button
              type="button"
              className="rounded-lg border px-3 py-2 text-sm font-medium"
              onClick={resetTrend}
            >
              Reset trend
            </button>
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Temporal trend status</h3>
          <div className="mt-3 grid gap-2 text-sm">
            <p>
              <span className="text-muted-foreground">trendReady:</span>{" "}
              <strong>{String(report.trendReady)}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">observationCount:</span>{" "}
              <strong>{report.inputSummary.observationCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">totalPhotoCount:</span>{" "}
              <strong>{report.inputSummary.totalPhotoCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">totalEvidenceCount:</span>{" "}
              <strong>{report.inputSummary.totalEvidenceCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">trendDirection:</span>{" "}
              <strong>{report.temporalForecast.trendDirection}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">riskTier:</span>{" "}
              <strong>{report.temporalForecast.riskTier}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">confidenceScore:</span>{" "}
              <strong>{report.temporalForecast.confidenceScore}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">providerAiReady:</span>{" "}
              <strong>false</strong>
            </p>
            <p>
              <span className="text-muted-foreground">trendFingerprint:</span>{" "}
              <strong className="break-all">{report.trendFingerprint}</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Timeline osservazioni</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.timeline.length ? (
            report.timeline.map((item) => (
              <li key={item.observationId}>
                {item.observationId} — day={item.dayOffset} — severity={item.dominantSeverity} —
                evidence={item.evidenceCount} — signs={item.repeatedSigns.join(", ")}
              </li>
            ))
          ) : (
            <li>Nessuna osservazione: usa “Simula trend temporale” per generare una baseline dry-run.</li>
          )}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Change vector</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.changeVectors.length ? (
            report.changeVectors.map((item) => (
              <li key={item.changeFingerprint}>
                {item.fromObservationId} → {item.toObservationId} — severityDelta=
                {item.severityDelta} — evidenceDelta={item.evidenceDelta} — trend=
                {item.trendDirection}
              </li>
            ))
          ) : (
            <li>Change vector non disponibile.</li>
          )}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Severity trend</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.severityTrend.map((item) => (
            <li key={item.observationId}>
              {item.observedAtLabel} — score={item.severityScore} — riskBand={item.riskBand}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Follow-up schedule</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.followUpSchedule.map((item) => (
            <li key={item.id}>
              {item.label} — timing={item.timing} — {item.reason}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Escalation rules</h3>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {report.escalationRules.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={copyTrend}
        >
          Copia trend intelligence
        </button>
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={exportJson}
        >
          Esporta trend JSON
        </button>
      </div>

      {copyState === "copied" ? (
        <p className="mt-2 text-sm text-muted-foreground">Report temporale copiato.</p>
      ) : null}
      {copyState === "error" ? (
        <p className="mt-2 text-sm text-muted-foreground">
          Copia non riuscita. Puoi selezionare manualmente il contenuto.
        </p>
      ) : null}

      <pre className="mt-5 max-h-96 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
        <code>{formatTemporalTrendReport(report)}</code>
      </pre>
    </section>
  );
}
