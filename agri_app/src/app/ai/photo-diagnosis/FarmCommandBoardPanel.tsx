"use client";

import { useMemo, useState } from "react";

import {
  createFarmCommandBoardFixture,
  createFarmCommandBoardReport,
  defaultFarmCommandBoardInput,
  formatFarmCommandBoardReport,
  type FarmCommandBoardInput,
} from "../../../lib/ai/aiFarmCommandBoard";

type BooleanKey =
  | "includeCasePriorityQueue"
  | "includeCrossFieldOverview"
  | "includeOperationalWindows"
  | "includeResourceLoadPlan"
  | "includeEscalationBoard"
  | "includeExecutiveSummary"
  | "includeComplianceSnapshot"
  | "humanReviewRequired";

export default function FarmCommandBoardPanel() {
  const [input, setInput] = useState<FarmCommandBoardInput>(defaultFarmCommandBoardInput);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const report = useMemo(() => createFarmCommandBoardReport(input), [input]);

  function applyReadyFixture() {
    setInput(createFarmCommandBoardFixture());
  }

  function resetBoard() {
    setInput(defaultFarmCommandBoardInput);
  }

  function updateField<K extends keyof FarmCommandBoardInput>(key: K, value: FarmCommandBoardInput[K]) {
    setInput((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function copyBoard() {
    try {
      await navigator.clipboard.writeText(formatFarmCommandBoardReport(report));
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
    { label: "Case priority queue", key: "includeCasePriorityQueue" },
    { label: "Cross-field overview", key: "includeCrossFieldOverview" },
    { label: "Operational windows", key: "includeOperationalWindows" },
    { label: "Resource load plan", key: "includeResourceLoadPlan" },
    { label: "Escalation board", key: "includeEscalationBoard" },
    { label: "Executive summary", key: "includeExecutiveSummary" },
    { label: "Compliance snapshot", key: "includeComplianceSnapshot" },
    { label: "Human review required", key: "humanReviewRequired" },
  ];

  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-farm-command-board="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Farm Command Board & Cross-Case Priority Orchestrator
        </p>
        <h2 className="text-xl font-semibold">Board aziendale multi-caso e priorità cross-field</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Aggrega più casi fotografici in una regia operativa: queue priorità, overview appezzamenti,
          finestre operative, carico risorse, escalation e compliance snapshot. È una simulazione locale,
          senza provider AI live, senza DB e senza automazioni.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Input command board</h3>
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
              value={input.commandWindowLabel}
              onChange={(event) => updateField("commandWindowLabel", event.target.value)}
              placeholder="Finestra comando"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.operatorName}
              onChange={(event) => updateField("operatorName", event.target.value)}
              placeholder="Responsabile / operatore"
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
              Simula Farm Command Board
            </button>
            <button
              type="button"
              className="rounded-lg border px-3 py-2 text-sm font-medium"
              onClick={resetBoard}
            >
              Reset board
            </button>
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Command status</h3>
          <div className="mt-3 grid gap-2 text-sm">
            <p>
              <span className="text-muted-foreground">boardReady:</span>{" "}
              <strong>{String(report.boardReady)}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">commandStatus:</span>{" "}
              <strong>{report.executiveSummary.commandStatus}</strong>
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
              <span className="text-muted-foreground">blockedCaseCount:</span>{" "}
              <strong>{report.inputSummary.blockedCaseCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">manualReadyCaseCount:</span>{" "}
              <strong>{report.inputSummary.manualReadyCaseCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">topPriorityCaseId:</span>{" "}
              <strong>{report.executiveSummary.topPriorityCaseId || "none"}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">nextHumanAction:</span>{" "}
              <strong>{report.executiveSummary.nextHumanAction}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">boardFingerprint:</span>{" "}
              <strong className="break-all">{report.boardFingerprint}</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Case priority queue</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.casePriorityQueue.length ? (
            report.casePriorityQueue.map((item) => (
              <li key={item.queueId}>
                {item.caseId} — {item.fieldName} — priority={item.priority} —
                status={item.status} — commandScore={item.commandScore}
              </li>
            ))
          ) : (
            <li>Nessuna queue: usa “Simula Farm Command Board”.</li>
          )}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Cross-field overview</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.crossFieldOverview.map((item) => (
            <li key={item.fieldId}>
              {item.fieldName} — cases={item.caseCount} — blocked={item.blockedCaseCount} —
              status={item.fieldCommandStatus}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Operational windows</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.operationalWindows.map((item) => (
            <li key={item.windowId}>
              {item.label} — owner={item.owner} — readiness={item.readiness}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Resource load plan</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.resourceLoadPlan.map((item) => (
            <li key={item.loadId}>
              {item.label} — assigned={item.assignedCaseIds.join(", ") || "none"} —
              load={item.estimatedLoadUnits}/{item.capacityUnits} — status={item.loadStatus}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Escalation board</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.escalationBoard.map((item) => (
            <li key={item.escalationId}>
              {item.caseId} — level={item.escalationLevel} — decision={item.requiredHumanDecision}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Compliance snapshot</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.complianceSnapshot.map((item) => (
            <li key={item.snapshotId}>
              {item.title} — passed={String(item.passed)}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={copyBoard}
        >
          Copia Farm Command Board
        </button>
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={exportJson}
        >
          Esporta board JSON
        </button>
      </div>

      {copyState === "copied" ? (
        <p className="mt-2 text-sm text-muted-foreground">Farm Command Board copiata.</p>
      ) : null}
      {copyState === "error" ? (
        <p className="mt-2 text-sm text-muted-foreground">
          Copia non riuscita. Puoi selezionare manualmente il contenuto.
        </p>
      ) : null}

      <pre className="mt-5 max-h-96 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
        <code>{formatFarmCommandBoardReport(report)}</code>
      </pre>
    </section>
  );
}
