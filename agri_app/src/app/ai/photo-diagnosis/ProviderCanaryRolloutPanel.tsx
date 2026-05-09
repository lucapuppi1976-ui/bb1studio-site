"use client";

import { useMemo } from "react";
import { buildAiProviderCanaryRolloutReport } from "@/lib/ai/aiProviderCanaryRollout";

export default function ProviderCanaryRolloutPanel() {
  const report = useMemo(() => buildAiProviderCanaryRolloutReport(), []);
  const failedCriteria = report.acceptanceCriteria.filter((item) => !item.passed);
  const blockingRisks = report.canaryRiskRegister.filter((item) => item.blocksPilotReview);
  const urgentQuestions = report.pilotApprovalBoard.filter((question) => question.priority === "urgent");

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            V12.4 · AI Provider Canary Rollout
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Provider Pilot Readiness Board & Canary Rollout Simulator
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Simulatore locale dry-run per pilot readiness, canary stages, acceptance criteria,
            kill-switch rehearsal e rollback governance. Nessun provider viene chiamato e
            nessun rollout reale viene abilitato.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-semibold">Canary status: {report.canaryStatus}</p>
          <p className="mt-1">Score: {report.canaryScore}/100 · severity: {report.overallSeverity}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Stages</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.canaryStages.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Failed criteria</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{failedCriteria.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Kill drills</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.killSwitchDrills.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Blocking risks</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{blockingRisks.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Urgent Q</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{urgentQuestions.length}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Canary stages
          </h3>

          <div className="mt-4 space-y-3">
            {report.canaryStages.map((stage) => (
              <div key={stage.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{stage.label}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      stage {stage.stageOrder} · {stage.lane} · {stage.readinessBand}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
                    dry-run
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-600">{stage.simulatedCohort}</p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{stage.allowedOutcome}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-700">
            Kill-switch drills
          </h3>

          <div className="mt-4 space-y-3">
            {report.killSwitchDrills.map((drill) => (
              <div key={drill.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{drill.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {drill.severity} · {drill.drillReady ? "ready" : "review"}
                </p>
                <p className="mt-2 text-xs text-slate-600">{drill.expectedManualAction}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Acceptance criteria
          </h3>

          <div className="mt-4 space-y-3">
            {report.acceptanceCriteria.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.lane} · {item.severity} · {item.passed ? "passed" : "review"}
                </p>
                <p className="mt-2 text-sm text-slate-600">Score {item.score}/100</p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{item.hardStop}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-700">
            Pilot approval board
          </h3>

          <div className="mt-4 space-y-3">
            {report.pilotApprovalBoard.map((question) => (
              <div key={question.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{question.question}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {question.priority} · {question.reviewer}
                </p>
                <p className="mt-2 text-xs text-slate-600">{question.safeOutcome}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
          Canary risk register
        </h3>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {report.canaryRiskRegister.map((risk) => (
            <div key={risk.id} className="rounded-xl bg-white p-4">
              <p className="text-sm font-semibold text-slate-950">{risk.label}</p>
              <p className="mt-1 text-xs text-slate-500">
                {risk.lane} · {risk.severity} · {risk.blocksPilotReview ? "blocks" : "review"}
              </p>
              <p className="mt-2 text-xs text-slate-600">{risk.manualResolution}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
