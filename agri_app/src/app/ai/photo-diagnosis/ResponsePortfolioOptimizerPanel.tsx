"use client";

import { useMemo, useState } from "react";

import {
  createResponsePortfolioFixture,
  createResponsePortfolioReport,
  defaultResponsePortfolioInput,
  formatResponsePortfolioReport,
  type ResponsePortfolioInput,
} from "../../../lib/ai/aiResponsePortfolioOptimizer";

type BooleanKey =
  | "includePortfolioOptimizer"
  | "includePriorityAllocationMatrix"
  | "includeResourceAllocationPlan"
  | "includeTradeoffMatrix"
  | "includeDecisionBoard"
  | "includeExecutivePortfolioBriefing"
  | "includeCompliancePortfolioGuard"
  | "includePortfolioExportPacket"
  | "humanReviewRequired";

export default function ResponsePortfolioOptimizerPanel() {
  const [input, setInput] = useState<ResponsePortfolioInput>(defaultResponsePortfolioInput);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const report = useMemo(() => createResponsePortfolioReport(input), [input]);

  function applyReadyFixture() {
    setInput(createResponsePortfolioFixture());
  }

  function resetPortfolio() {
    setInput(defaultResponsePortfolioInput);
  }

  function updateField<K extends keyof ResponsePortfolioInput>(key: K, value: ResponsePortfolioInput[K]) {
    setInput((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function copyPortfolio() {
    try {
      await navigator.clipboard.writeText(formatResponsePortfolioReport(report));
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
    { label: "Portfolio optimizer", key: "includePortfolioOptimizer" },
    { label: "Priority allocation matrix", key: "includePriorityAllocationMatrix" },
    { label: "Resource allocation plan", key: "includeResourceAllocationPlan" },
    { label: "Tradeoff matrix", key: "includeTradeoffMatrix" },
    { label: "Decision board", key: "includeDecisionBoard" },
    { label: "Executive portfolio briefing", key: "includeExecutivePortfolioBriefing" },
    { label: "Compliance portfolio guard", key: "includeCompliancePortfolioGuard" },
    { label: "Portfolio export packet", key: "includePortfolioExportPacket" },
    { label: "Human review required", key: "humanReviewRequired" },
  ];

  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-response-portfolio-optimizer="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Strategic Response Portfolio Optimizer
        </p>
        <h2 className="text-xl font-semibold">Ottimizzatore portafoglio decisionale AI</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Confronta scenari observe, review, scouting, protocol validation, manual-ready e blocked.
          Produce priorità, allocazione risorse, trade-off rischio/effort/impatto, decision board,
          briefing e export redatto. Non autorizza DB, automazioni, prodotti o dosaggi.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Input portfolio</h3>
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
              value={input.portfolioWindowLabel}
              onChange={(event) => updateField("portfolioWindowLabel", event.target.value)}
              placeholder="Finestra portfolio"
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
              Simula response portfolio
            </button>
            <button
              type="button"
              className="rounded-lg border px-3 py-2 text-sm font-medium"
              onClick={resetPortfolio}
            >
              Reset portfolio
            </button>
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Portfolio status</h3>
          <div className="mt-3 grid gap-2 text-sm">
            <p>
              <span className="text-muted-foreground">portfolioReady:</span>{" "}
              <strong>{String(report.portfolioReady)}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">portfolioStatus:</span>{" "}
              <strong>{report.portfolioSummary.portfolioStatus}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">caseCount:</span>{" "}
              <strong>{report.inputSummary.caseCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">blockedCaseCount:</span>{" "}
              <strong>{report.inputSummary.blockedCaseCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">doNowCaseCount:</span>{" "}
              <strong>{report.inputSummary.doNowCaseCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">deferCaseCount:</span>{" "}
              <strong>{report.inputSummary.deferCaseCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">portfolioValueProxy:</span>{" "}
              <strong>{report.portfolioSummary.portfolioValueProxy}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">portfolioCostProxy:</span>{" "}
              <strong>{report.portfolioSummary.portfolioCostProxy}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">portfolioEfficiencyProxy:</span>{" "}
              <strong>{report.portfolioSummary.portfolioEfficiencyProxy}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">portfolioFingerprint:</span>{" "}
              <strong className="break-all">{report.portfolioFingerprint}</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Portfolio scenarios</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.portfolioScenarios.length ? (
            report.portfolioScenarios.map((item) => (
              <li key={item.scenarioId}>
                {item.caseId} — decision={item.recommendedDecision} —
                priority={item.priorityScore} — riskAdjusted={item.riskAdjustedScore}
              </li>
            ))
          ) : (
            <li>Nessuno scenario: usa “Simula response portfolio”.</li>
          )}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Priority allocation matrix</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.priorityAllocationMatrix.map((item) => (
            <li key={item.allocationId}>
              {item.caseId} — decision={item.decision} —
              band={item.allocationBand} — score={item.allocationScore}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Resource allocation plan</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.resourceAllocationPlan.map((item) => (
            <li key={item.planId}>
              {item.label} — proposed={item.proposedUnits} —
              projected={item.totalProjectedUnits}/{item.capacityUnits} —
              status={item.allocationStatus}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Tradeoff matrix</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.tradeoffMatrix.map((item) => (
            <li key={item.tradeoffId}>
              {item.caseId} — {item.tradeoffLabel} — {item.tradeoffSummary}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Decision board</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.decisionBoard.map((item) => (
            <li key={item.boardId}>
              {item.decision} — cases={item.caseIds.join(", ") || "none"} —
              next={item.nextHumanAction}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Executive portfolio briefing</h3>
        <p className="mt-2 text-sm text-muted-foreground">{report.executivePortfolioBriefing.headline}</p>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Compliance portfolio guard</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.compliancePortfolioGuard.map((item) => (
            <li key={item.guardId}>
              {item.label} — passed={String(item.passed)}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Portfolio export packet</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {report.portfolioExportPacket.exportId} — redactedOnly={String(report.portfolioExportPacket.redactedOnly)} —
          publicShareAllowed={String(report.portfolioExportPacket.publicShareAllowed)}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={copyPortfolio}
        >
          Copia response portfolio
        </button>
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={exportJson}
        >
          Esporta portfolio JSON
        </button>
      </div>

      {copyState === "copied" ? (
        <p className="mt-2 text-sm text-muted-foreground">Response portfolio copiato.</p>
      ) : null}
      {copyState === "error" ? (
        <p className="mt-2 text-sm text-muted-foreground">
          Copia non riuscita. Puoi selezionare manualmente il contenuto.
        </p>
      ) : null}

      <pre className="mt-5 max-h-96 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
        <code>{formatResponsePortfolioReport(report)}</code>
      </pre>
    </section>
  );
}
