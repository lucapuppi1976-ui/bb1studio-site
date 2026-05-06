"use client";

import { useMemo, useState } from "react";

import {
  createFollowUpSchedulerFixture,
  createFollowUpSchedulerReport,
  defaultFollowUpSchedulerInput,
  formatFollowUpSchedulerReport,
  type FollowUpSchedulerInput,
} from "../../../lib/ai/aiFollowUpScheduler";

type BooleanKey =
  | "includeObservationCadence"
  | "includeFollowUpWindows"
  | "includeReviewQueue"
  | "includeManualTaskDrafts"
  | "includeEscalationSchedule"
  | "includeCalendarLegend"
  | "humanReviewRequired";

export default function FollowUpSchedulerPanel() {
  const [input, setInput] = useState<FollowUpSchedulerInput>(defaultFollowUpSchedulerInput);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const report = useMemo(() => createFollowUpSchedulerReport(input), [input]);

  function applyReadyFixture() {
    setInput(createFollowUpSchedulerFixture());
  }

  function resetScheduler() {
    setInput(defaultFollowUpSchedulerInput);
  }

  function updateField<K extends keyof FollowUpSchedulerInput>(key: K, value: FollowUpSchedulerInput[K]) {
    setInput((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function copyScheduler() {
    try {
      await navigator.clipboard.writeText(formatFollowUpSchedulerReport(report));
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
      label: "Observation cadence",
      key: "includeObservationCadence",
    },
    {
      label: "Follow-up windows",
      key: "includeFollowUpWindows",
    },
    {
      label: "Review queue",
      key: "includeReviewQueue",
    },
    {
      label: "Manual task drafts",
      key: "includeManualTaskDrafts",
    },
    {
      label: "Escalation schedule",
      key: "includeEscalationSchedule",
    },
    {
      label: "Calendar legend",
      key: "includeCalendarLegend",
    },
    {
      label: "Human review required",
      key: "humanReviewRequired",
    },
  ];

  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-follow-up-scheduler="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Follow-Up Scheduler & Observation Cadence
        </p>
        <h2 className="text-xl font-semibold">Calendario follow-up e cadence osservazioni</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Genera un calendario locale per follow-up campo: cadence osservazioni,
          finestre operative, reviewer queue, escalation schedule e bozze manuali non
          persistite. Nessun provider AI live, nessuna persistenza, nessun task automatico.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Input scheduler</h3>
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
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.heatmapFingerprint}
              onChange={(event) => updateField("heatmapFingerprint", event.target.value)}
              placeholder="Heatmap fingerprint"
            />
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
              Simula follow-up scheduler
            </button>
            <button
              type="button"
              className="rounded-lg border px-3 py-2 text-sm font-medium"
              onClick={resetScheduler}
            >
              Reset scheduler
            </button>
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Scheduler status</h3>
          <div className="mt-3 grid gap-2 text-sm">
            <p>
              <span className="text-muted-foreground">scheduleReady:</span>{" "}
              <strong>{String(report.scheduleReady)}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">nextCriticalWindow:</span>{" "}
              <strong>{report.calendarSummary.nextCriticalWindow || "none"}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">soonWindowCount:</span>{" "}
              <strong>{report.calendarSummary.soonWindowCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">reviewerQueueCount:</span>{" "}
              <strong>{report.calendarSummary.reviewerQueueCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">manualDraftCount:</span>{" "}
              <strong>{report.calendarSummary.manualDraftCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">dominantRiskTier:</span>{" "}
              <strong>{report.calendarSummary.dominantRiskTier}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">providerAiReady:</span>{" "}
              <strong>false</strong>
            </p>
            <p>
              <span className="text-muted-foreground">scheduleFingerprint:</span>{" "}
              <strong className="break-all">{report.scheduleFingerprint}</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Observation cadence</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.observationCadence.length ? (
            report.observationCadence.map((item) => (
              <li key={item.cadenceId}>
                {item.label} — interval={item.recommendedIntervalDays}d —
                tier={item.cadenceTier} — next={item.nextObservationLabel}
              </li>
            ))
          ) : (
            <li>Nessuna cadence: usa “Simula follow-up scheduler”.</li>
          )}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Follow-up windows</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.followUpWindows.map((item) => (
            <li key={item.windowId}>
              {item.sequence}. {item.label} — {item.windowType} — due={item.dueLabel} —
              tier={item.riskTier}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Reviewer queue</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.reviewerQueue.map((item) => (
            <li key={item.reviewId}>
              {item.label} — priority={item.priority} — decision={item.requiredDecision}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Manual task drafts</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.manualTaskDrafts.map((item) => (
            <li key={item.draftId}>
              {item.suggestedTitle} — due={item.suggestedDueLabel} —
              conversionAllowed={String(item.conversionAllowed)}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Escalation schedule</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.escalationSchedule.map((item) => (
            <li key={item.escalationId}>
              {item.label} — trigger={item.trigger} — dueInDays={item.dueInDays}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Calendar legend</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.calendarLegend.map((item) => (
            <li key={item.tier}>
              {item.tier} — {item.intervalMeaning} — {item.reviewRequirement}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={copyScheduler}
        >
          Copia follow-up scheduler
        </button>
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={exportJson}
        >
          Esporta scheduler JSON
        </button>
      </div>

      {copyState === "copied" ? (
        <p className="mt-2 text-sm text-muted-foreground">Follow-up scheduler copiato.</p>
      ) : null}
      {copyState === "error" ? (
        <p className="mt-2 text-sm text-muted-foreground">
          Copia non riuscita. Puoi selezionare manualmente il contenuto.
        </p>
      ) : null}

      <pre className="mt-5 max-h-96 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
        <code>{formatFollowUpSchedulerReport(report)}</code>
      </pre>
    </section>
  );
}
