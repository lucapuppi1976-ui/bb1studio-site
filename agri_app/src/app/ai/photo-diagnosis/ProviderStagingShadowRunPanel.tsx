"use client";

import { useMemo } from "react";
import { buildAiProviderStagingShadowRunReport } from "@/lib/ai/aiProviderStagingShadowRun";

export default function ProviderStagingShadowRunPanel() {
  const report = useMemo(() => buildAiProviderStagingShadowRunReport(), []);
  const failedGates = report.shadowRunGates.filter((gate) => !gate.passed);
  const blockingRisks = report.shadowRunRiskRegister.filter((item) => item.blocksShadowActivation);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            V15.4 · AI Provider Staging Shadow Run
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Provider Staging Shadow Run & Non-Production Evaluation Drill
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Shadow run provider locale dry-run: scenario simulati, envelope simulation,
            contract validation, budget simulation, fallback drill e non-production boundary.
            Nessuna chiamata esterna e nessuna attivazione operativa.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-semibold">Shadow status: {report.shadowRunStatus}</p>
          <p className="mt-1">Score: {report.shadowRunScore}/100 · severity: {report.overallSeverity}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Shadow</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">
            {report.readiness.providerShadowRunPlanReady ? "READY" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">External call</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">
            {report.readiness.shadowRunExternalCallAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Failed gates</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{failedGates.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Blocking risks</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{blockingRisks.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Scenarios</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.shadowScenarios.length}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Shadow scenarios
          </h3>

          <div className="mt-4 space-y-3">
            {report.shadowScenarios.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.lane} · {item.severity}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
                    {item.scenarioScore}/100
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-600">{item.simulatedResult}</p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{item.blockedOutcome}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-700">
            Non-production boundary
          </h3>

          <div className="mt-4 space-y-3">
            {report.nonProductionBoundary.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.lane} · {item.severity} · {item.boundaryScore}/100
                </p>
                <p className="mt-2 text-xs text-slate-600">{item.boundaryRule}</p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{item.blockedOutcome}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Shadow run gates
          </h3>

          <div className="mt-4 space-y-3">
            {report.shadowRunGates.map((gate) => (
              <div key={gate.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{gate.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {gate.lane} · {gate.severity} · {gate.passed ? "passed" : "review"}
                </p>
                <p className="mt-2 text-sm text-slate-600">Score {gate.score}/100</p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{gate.hardStop}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-700">
            Fallback drill
          </h3>

          <div className="mt-4 space-y-3">
            {report.fallbackDrillPlan.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.lane} · {item.severity} · {item.fallbackScore}/100
                </p>
                <p className="mt-2 text-xs text-slate-600">{item.safeFallback}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
          Shadow run risk register
        </h3>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {report.shadowRunRiskRegister.map((risk) => (
            <div key={risk.id} className="rounded-xl bg-white p-4">
              <p className="text-sm font-semibold text-slate-950">{risk.label}</p>
              <p className="mt-1 text-xs text-slate-500">
                {risk.lane} · {risk.severity} · {risk.blocksShadowActivation ? "blocks activation" : "review"}
              </p>
              <p className="mt-2 text-xs text-slate-600">{risk.manualResolution}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
