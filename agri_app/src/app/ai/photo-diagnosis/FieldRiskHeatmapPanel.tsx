"use client";

import { useMemo, useState } from "react";

import {
  createFieldRiskHeatmapFixture,
  createFieldRiskHeatmapReport,
  defaultFieldRiskHeatmapInput,
  formatFieldRiskHeatmapReport,
  type FieldRiskHeatmapInput,
} from "../../../lib/ai/aiFieldRiskHeatmap";

type BooleanKey =
  | "includeRiskHeatmap"
  | "includeSpreadModel"
  | "includeWorkQueue"
  | "includeSamplingFocus"
  | "includeReviewerQueue"
  | "includeMapLegend"
  | "humanReviewRequired";

export default function FieldRiskHeatmapPanel() {
  const [input, setInput] = useState<FieldRiskHeatmapInput>(defaultFieldRiskHeatmapInput);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const report = useMemo(() => createFieldRiskHeatmapReport(input), [input]);

  function applyReadyFixture() {
    setInput(createFieldRiskHeatmapFixture());
  }

  function resetHeatmap() {
    setInput(defaultFieldRiskHeatmapInput);
  }

  function updateField<K extends keyof FieldRiskHeatmapInput>(key: K, value: FieldRiskHeatmapInput[K]) {
    setInput((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function copyHeatmap() {
    try {
      await navigator.clipboard.writeText(formatFieldRiskHeatmapReport(report));
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

  const toggles: Array<{ label: string; key: BooleanKey }> = [
    {
      label: "Risk heatmap",
      key: "includeRiskHeatmap",
    },
    {
      label: "Spread model",
      key: "includeSpreadModel",
    },
    {
      label: "Work queue",
      key: "includeWorkQueue",
    },
    {
      label: "Sampling focus",
      key: "includeSamplingFocus",
    },
    {
      label: "Reviewer queue",
      key: "includeReviewerQueue",
    },
    {
      label: "Map legend",
      key: "includeMapLegend",
    },
    {
      label: "Human review required",
      key: "humanReviewRequired",
    },
  ];

  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-field-risk-heatmap="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Field Risk Heatmap & Zone Prioritization
        </p>
        <h2 className="text-xl font-semibold">Mappa rischio campo e priorità zone</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Genera una heatmap locale del rischio per zona: score, tier, visual token,
          spread model, work queue manuale, sampling focus e reviewer queue. Nessun
          provider AI live, nessuna persistenza, nessun task/intervento automatico.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Input heatmap</h3>
          <div className="mt-3 grid gap-3">
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.caseId}
              onChange={(event) => updateField("caseId", event.target.value)}
              placeholder="Case ID"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.operatorName}
              onChange={(event) => updateField("operatorName", event.target.value)}
              placeholder="Operatore"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.crop}
              onChange={(event) => updateField("crop", event.target.value)}
              placeholder="Coltura"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.fieldName}
              onChange={(event) => updateField("fieldName", event.target.value)}
              placeholder="Appezzamento"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.locationHint}
              onChange={(event) => updateField("locationHint", event.target.value)}
              placeholder="Settore / fila"
            />
            <select
              className="rounded-lg border p-2 text-sm"
              value={input.globalTrendDirection}
              onChange={(event) =>
                updateField("globalTrendDirection", event.target.value as FieldRiskHeatmapInput["globalTrendDirection"])
              }
            >
              <option value="insufficient-data">insufficient-data</option>
              <option value="improving">improving</option>
              <option value="stable">stable</option>
              <option value="worsening">worsening</option>
            </select>
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.scoutingPlanFingerprint}
              onChange={(event) => updateField("scoutingPlanFingerprint", event.target.value)}
              placeholder="Scouting plan fingerprint"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.temporalTrendFingerprint}
              onChange={(event) => updateField("temporalTrendFingerprint", event.target.value)}
              placeholder="Temporal trend fingerprint"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.fieldIntelligenceFingerprint}
              onChange={(event) => updateField("fieldIntelligenceFingerprint", event.target.value)}
              placeholder="Field intelligence fingerprint"
            />
          </div>

          <div className="mt-4 grid gap-2">
            {toggles.map((item) => (
              <label key={item.key} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={Boolean(input[item.key])}
                  onChange={(event) => updateField(item.key, event.target.checked)}
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
              Simula risk heatmap
            </button>
            <button
              type="button"
              className="rounded-lg border px-3 py-2 text-sm font-medium"
              onClick={resetHeatmap}
            >
              Reset heatmap
            </button>
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Heatmap status</h3>
          <div className="mt-3 grid gap-2 text-sm">
            <p>
              <span className="text-muted-foreground">heatmapReady:</span>{" "}
              <strong>{String(report.heatmapReady)}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">dominantRiskTier:</span>{" "}
              <strong>{report.heatmapSummary.dominantRiskTier}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">highestRiskZoneId:</span>{" "}
              <strong>{report.heatmapSummary.highestRiskZoneId || "missing"}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">highestRiskScore:</span>{" "}
              <strong>{report.heatmapSummary.highestRiskScore}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">highPriorityZoneCount:</span>{" "}
              <strong>{report.heatmapSummary.highPriorityZoneCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">urgentReviewZoneCount:</span>{" "}
              <strong>{report.heatmapSummary.urgentReviewZoneCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">providerAiReady:</span>{" "}
              <strong>false</strong>
            </p>
            <p>
              <span className="text-muted-foreground">heatmapFingerprint:</span>{" "}
              <strong className="break-all">{report.heatmapFingerprint}</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Heatmap cells</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.heatmapCells.length ? (
            report.heatmapCells.map((cell) => (
              <li key={cell.cellId}>
                {cell.label} — score={cell.riskScore} — tier={cell.riskTier} —
                token={cell.visualToken} — reasons={cell.reasonCodes.join(", ")}
              </li>
            ))
          ) : (
            <li>Nessuna cella: usa “Simula risk heatmap” per generare una mappa dry-run.</li>
          )}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Spread model</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.spreadModel.map((model) => (
            <li key={model.modelId}>
              {model.fromZoneId} → {model.toZoneId} — score={model.spreadRiskScore} —
              tier={model.spreadRiskTier}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Work queue manuale</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.workQueue.map((item) => (
            <li key={item.itemId}>
              {item.label} — priority={item.priority} — {item.manualAction}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Sampling focus</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.samplingFocus.map((item) => (
            <li key={item.focusId}>
              {item.label} — samples={item.recommendedSamples.join(", ")} — nextPhotos=
              {item.nextPhotos.join(", ")}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Reviewer queue</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.reviewerQueue.map((item) => (
            <li key={item.itemId}>
              {item.label} — priority={item.priority}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Map legend</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.mapLegend.map((item) => (
            <li key={item.tier}>
              {item.tier} — token={item.visualToken} — {item.meaning} — {item.requiredReview}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={copyHeatmap}
        >
          Copia risk heatmap
        </button>
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={exportJson}
        >
          Esporta heatmap JSON
        </button>
      </div>

      {copyState === "copied" ? (
        <p className="mt-2 text-sm text-muted-foreground">Risk heatmap copiata.</p>
      ) : null}
      {copyState === "error" ? (
        <p className="mt-2 text-sm text-muted-foreground">
          Copia non riuscita. Puoi selezionare manualmente il contenuto.
        </p>
      ) : null}

      <pre className="mt-5 max-h-96 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
        <code>{formatFieldRiskHeatmapReport(report)}</code>
      </pre>
    </section>
  );
}
