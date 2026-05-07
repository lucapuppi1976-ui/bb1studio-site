"use client";

import { useMemo, useState } from "react";

import {
  createInterventionImpactFixture,
  createInterventionImpactReport,
  defaultInterventionImpactInput,
  formatInterventionImpactReport,
  type InterventionImpactInput,
} from "../../../lib/ai/aiInterventionImpactRoi";

type BooleanKey =
  | "includeScenarioMatrix"
  | "includeRiskReductionForecast"
  | "includeManualCostEnvelope"
  | "includeResourceBudgetImpact"
  | "includeOpportunityCostBoard"
  | "includeRoiPriorityQueue"
  | "includeExecutiveImpactBriefing"
  | "includeComplianceEconomicsGuard"
  | "humanReviewRequired";

export default function InterventionImpactRoiPanel() {
  const [input, setInput] = useState<InterventionImpactInput>(defaultInterventionImpactInput);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const report = useMemo(() => createInterventionImpactReport(input), [input]);

  function applyReadyFixture() {
    setInput(createInterventionImpactFixture());
  }

  function resetImpact() {
    setInput(defaultInterventionImpactInput);
  }

  function updateField<K extends keyof InterventionImpactInput>(key: K, value: InterventionImpactInput[K]) {
    setInput((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function copyImpact() {
    try {
      await navigator.clipboard.writeText(formatInterventionImpactReport(report));
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
    { label: "Scenario matrix", key: "includeScenarioMatrix" },
    { label: "Risk reduction forecast", key: "includeRiskReductionForecast" },
    { label: "Manual cost envelope", key: "includeManualCostEnvelope" },
    { label: "Resource budget impact", key: "includeResourceBudgetImpact" },
    { label: "Opportunity cost board", key: "includeOpportunityCostBoard" },
    { label: "ROI priority queue", key: "includeRoiPriorityQueue" },
    { label: "Executive impact briefing", key: "includeExecutiveImpactBriefing" },
    { label: "Compliance economics guard", key: "includeComplianceEconomicsGuard" },
    { label: "Human review required", key: "humanReviewRequired" },
  ];

  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-intervention-impact-roi="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Intervention Impact & ROI Simulator
        </p>
        <h2 className="text-xl font-semibold">Simulatore impatto interventi e ROI proxy</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Simula impatto operativo/economico in forma proxy: scenari, risk reduction,
          cost envelope, stress risorse, opportunity cost, ROI queue e briefing direzionale.
          Non è un dato finanziario reale e non autorizza prodotti, dosaggi, DB o automazioni.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Input impact simulator</h3>
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
              value={input.impactWindowLabel}
              onChange={(event) => updateField("impactWindowLabel", event.target.value)}
              placeholder="Finestra impatto"
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
              Simula impact ROI
            </button>
            <button
              type="button"
              className="rounded-lg border px-3 py-2 text-sm font-medium"
              onClick={resetImpact}
            >
              Reset impact
            </button>
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Impact status</h3>
          <div className="mt-3 grid gap-2 text-sm">
            <p>
              <span className="text-muted-foreground">impactReady:</span>{" "}
              <strong>{String(report.impactReady)}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">impactStatus:</span>{" "}
              <strong>{report.impactSummary.impactStatus}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">caseCount:</span>{" "}
              <strong>{report.inputSummary.caseCount}</strong>
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
              <span className="text-muted-foreground">manualReadyCaseCount:</span>{" "}
              <strong>{report.inputSummary.manualReadyCaseCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">topRoiCaseId:</span>{" "}
              <strong>{report.impactSummary.topRoiCaseId || "none"}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">projectedRiskReductionProxy:</span>{" "}
              <strong>{report.impactSummary.projectedRiskReductionProxy}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">projectedCostIndexUnits:</span>{" "}
              <strong>{report.impactSummary.projectedCostIndexUnits}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">impactFingerprint:</span>{" "}
              <strong className="break-all">{report.impactFingerprint}</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Scenario matrix</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.scenarioMatrix.length ? (
            report.scenarioMatrix.map((item) => (
              <li key={item.scenarioId}>
                {item.caseId} — scenario={item.scenarioKind} — impact={item.impactScore} —
                riskReduction={item.riskReductionProxy} — costIndex={item.costIndexUnits}
              </li>
            ))
          ) : (
            <li>Nessuno scenario: usa “Simula impact ROI”.</li>
          )}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Risk reduction forecast</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.riskReductionForecast.slice(0, 10).map((item) => (
            <li key={item.forecastId}>
              {item.caseId} — horizon={item.horizon} — delta={item.expectedDeltaProxy} —
              confidence={item.forecastConfidence}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Manual cost envelope</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.manualCostEnvelope.map((item) => (
            <li key={item.envelopeId}>
              {item.caseId} — effort={item.estimatedManualEffortUnits} —
              load={item.estimatedResourceLoadUnits} — costIndex={item.estimatedCostIndexUnits} —
              status={item.envelopeStatus}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Resource budget impact</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.resourceBudgetImpact.map((item) => (
            <li key={item.budgetId}>
              {item.label} — additional={item.projectedAdditionalUnits} —
              projectedCostIndex={item.projectedCostIndexUnits} — status={item.budgetStatus}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Opportunity cost board</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.opportunityCostBoard.map((item) => (
            <li key={item.opportunityId}>
              {item.caseId} — delayedReview={item.delayedReviewCostProxy} —
              missedEvidence={item.missedEvidenceCostProxy} — decision={item.recommendedDecision}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">ROI priority queue</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.roiPriorityQueue.map((item) => (
            <li key={item.roiId}>
              {item.caseId} — roiProxy={item.roiProxyScore} —
              impact={item.impactScore} — riskReduction={item.riskReductionProxy}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Executive impact briefing</h3>
        <p className="mt-2 text-sm text-muted-foreground">{report.executiveImpactBriefing.headline}</p>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Compliance economics guard</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.complianceEconomicsGuard.map((item) => (
            <li key={item.guardId}>
              {item.label} — passed={String(item.passed)}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={copyImpact}
        >
          Copia impact ROI
        </button>
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={exportJson}
        >
          Esporta impact JSON
        </button>
      </div>

      {copyState === "copied" ? (
        <p className="mt-2 text-sm text-muted-foreground">Impact ROI copiato.</p>
      ) : null}
      {copyState === "error" ? (
        <p className="mt-2 text-sm text-muted-foreground">
          Copia non riuscita. Puoi selezionare manualmente il contenuto.
        </p>
      ) : null}

      <pre className="mt-5 max-h-96 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
        <code>{formatInterventionImpactReport(report)}</code>
      </pre>
    </section>
  );
}
