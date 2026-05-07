"use client";

import { useMemo, useState } from "react";

import {
  createFarmRiskRadarFixture,
  createFarmRiskRadarReport,
  defaultFarmRiskRadarInput,
  formatFarmRiskRadarReport,
  type FarmRiskRadarInput,
} from "../../../lib/ai/aiFarmRiskRadar";

type BooleanKey =
  | "includeRiskQuadrants"
  | "includePredictivePriority"
  | "includeForecastWindows"
  | "includeResourceStress"
  | "includeCriticalWatchlist"
  | "includeExecutiveBriefing"
  | "includeComplianceRadar"
  | "humanReviewRequired";

export default function FarmRiskRadarPanel() {
  const [input, setInput] = useState<FarmRiskRadarInput>(defaultFarmRiskRadarInput);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const report = useMemo(() => createFarmRiskRadarReport(input), [input]);

  function applyReadyFixture() {
    setInput(createFarmRiskRadarFixture());
  }

  function resetRadar() {
    setInput(defaultFarmRiskRadarInput);
  }

  function updateField<K extends keyof FarmRiskRadarInput>(key: K, value: FarmRiskRadarInput[K]) {
    setInput((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function copyRadar() {
    try {
      await navigator.clipboard.writeText(formatFarmRiskRadarReport(report));
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
    { label: "Field risk quadrants", key: "includeRiskQuadrants" },
    { label: "Predictive priority", key: "includePredictivePriority" },
    { label: "Forecast windows", key: "includeForecastWindows" },
    { label: "Resource stress", key: "includeResourceStress" },
    { label: "Critical watchlist", key: "includeCriticalWatchlist" },
    { label: "Executive briefing", key: "includeExecutiveBriefing" },
    { label: "Compliance radar", key: "includeComplianceRadar" },
    { label: "Human review required", key: "humanReviewRequired" },
  ];

  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-farm-risk-radar="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Farm Risk Radar & Predictive Priority Center
        </p>
        <h2 className="text-xl font-semibold">Risk radar aziendale e forecast priorità</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Legge più casi e costruisce radar aziendale: quadranti rischio per appezzamento,
          priorità predittive, forecast 7/14 giorni, stress risorse, watchlist critica,
          briefing direzionale e compliance radar. Dry-run locale, senza provider, DB o automazioni.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Input radar</h3>
          <div className="mt-3 grid gap-3">
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.farmId}
              onChange={(event) => updateField("farmId", event.target.value)}
              placeholder="Farm ID"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.farmName}
              onChange={(event) => updateField("farmName", event.target.value)}
              placeholder="Nome azienda"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.radarWindowLabel}
              onChange={(event) => updateField("radarWindowLabel", event.target.value)}
              placeholder="Finestra radar"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.operatorName}
              onChange={(event) => updateField("operatorName", event.target.value)}
              placeholder="Responsabile"
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
              Simula Farm Risk Radar
            </button>
            <button
              type="button"
              className="rounded-lg border px-3 py-2 text-sm font-medium"
              onClick={resetRadar}
            >
              Reset radar
            </button>
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Radar status</h3>
          <div className="mt-3 grid gap-2 text-sm">
            <p>
              <span className="text-muted-foreground">radarReady:</span>{" "}
              <strong>{String(report.radarReady)}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">radarStatus:</span>{" "}
              <strong>{report.radarSummary.radarStatus}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">predictedPressure:</span>{" "}
              <strong>{report.radarSummary.predictedPressure}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">caseCount:</span>{" "}
              <strong>{report.inputSummary.caseCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">fieldCount:</span>{" "}
              <strong>{report.inputSummary.fieldCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">criticalCaseCount:</span>{" "}
              <strong>{report.inputSummary.criticalCaseCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">blockedCaseCount:</span>{" "}
              <strong>{report.inputSummary.blockedCaseCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">topPriorityCaseId:</span>{" "}
              <strong>{report.radarSummary.topPriorityCaseId || "none"}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">nextHumanAction:</span>{" "}
              <strong>{report.radarSummary.nextHumanAction}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">radarFingerprint:</span>{" "}
              <strong className="break-all">{report.radarFingerprint}</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Field risk quadrants</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.fieldRiskQuadrants.length ? (
            report.fieldRiskQuadrants.map((item) => (
              <li key={item.quadrantId}>
                {item.fieldName} — quadrant={item.quadrant} — cases={item.caseCount} —
                blocked={item.blockedCaseCount}
              </li>
            ))
          ) : (
            <li>Nessun quadrante: usa “Simula Farm Risk Radar”.</li>
          )}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Predictive priority center</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.predictivePriorityCenter.map((item) => (
            <li key={item.priorityId}>
              {item.caseId} — {item.fieldName} — tier={item.riskTier} —
              velocity={item.riskVelocity} — score={item.predictiveScore}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Forecast windows</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.forecastWindows.map((item) => (
            <li key={item.forecastId}>
              {item.label} — horizon={item.horizon} — pressure={item.expectedRiskPressure} —
              cases={item.caseIds.join(", ") || "none"}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Resource stress forecast</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.resourceStressForecast.map((item) => (
            <li key={item.stressId}>
              {item.label} — load={item.allocatedUnits}/{item.capacityUnits} —
              ratio={item.stressRatio} — status={item.stressStatus}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Critical watchlist</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.criticalWatchlist.map((item) => (
            <li key={item.watchId}>
              {item.caseId} — {item.fieldName} — tier={item.riskTier} —
              velocity={item.riskVelocity} — blocked={String(item.blocked)}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Executive risk briefing</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.executiveRiskBriefing.summaryLines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Compliance radar</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.complianceRadar.map((item) => (
            <li key={item.complianceId}>
              {item.label} — passed={String(item.passed)}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={copyRadar}
        >
          Copia Farm Risk Radar
        </button>
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={exportJson}
        >
          Esporta radar JSON
        </button>
      </div>

      {copyState === "copied" ? (
        <p className="mt-2 text-sm text-muted-foreground">Farm Risk Radar copiato.</p>
      ) : null}
      {copyState === "error" ? (
        <p className="mt-2 text-sm text-muted-foreground">
          Copia non riuscita. Puoi selezionare manualmente il contenuto.
        </p>
      ) : null}

      <pre className="mt-5 max-h-96 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
        <code>{formatFarmRiskRadarReport(report)}</code>
      </pre>
    </section>
  );
}
