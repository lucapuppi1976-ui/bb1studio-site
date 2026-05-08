"use client";

import { useMemo } from "react";
import { buildAiPhenologyYieldRiskReport } from "@/lib/ai/aiPhenologyYieldRisk";

export default function PhenologyYieldRiskPanel() {
  const report = useMemo(() => buildAiPhenologyYieldRiskReport(), []);
  const blockingGaps = report.evidenceGaps.filter((gap) => gap.severity === "blocking");
  const criticalWindows = report.phenologyWindows.filter((window) => window.riskTier === "critical");
  const urgentScenarios = report.yieldScenarios.filter((scenario) => scenario.priority === "urgent");

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            V10.8 · AI Phenology Yield Risk
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Phenology, Pollination & Yield Risk Simulator
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Simulatore locale dry-run per finestre di fioritura, rischio impollinazione,
            allegagione, stress overlap e yield-risk proxy. Il modulo non produce forecast
            produttivi, prescrizioni, dosaggi, task o interventi.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-semibold">Strategy status: {report.strategyStatus}</p>
          <p className="mt-1">Score: {report.strategyScore}/100 · risk: {report.farmPhenologyRiskTier}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Windows</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.phenologyWindows.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Critical</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{criticalWindows.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Signals</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.riskSignals.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Urgent</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{urgentScenarios.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Blocking gaps</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{blockingGaps.length}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Phenology windows
          </h3>

          <div className="mt-4 space-y-3">
            {report.phenologyWindows.map((window) => (
              <div key={window.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{window.id}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {window.cropFamily} · {window.simulatedZoneBand} · {window.windowStatus} · {window.riskTier}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
                    flowering {window.floweringWindowScore}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-600">{window.reviewerConcern}</p>
                {window.blockers.length > 0 && (
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-amber-700">
                    {window.blockers.map((blocker) => (
                      <li key={blocker}>{blocker}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Yield-risk scenarios
          </h3>

          <div className="mt-4 space-y-3">
            {report.yieldScenarios.map((scenario) => (
              <div key={scenario.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-950">{scenario.title}</p>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                    {scenario.priority}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{scenario.simulatedChange}</p>
                <p className="mt-2 text-xs font-semibold text-emerald-700">
                  stability proxy {scenario.expectedStabilityProxy} · yield-risk proxy {scenario.expectedYieldRiskProxy}
                </p>
                <p className="mt-2 text-xs text-slate-500">{scenario.manualReviewDecision}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-700">
            Governance stops
          </h3>

          <div className="mt-4 space-y-3">
            {report.governanceStops.map((stop) => (
              <div key={stop.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{stop.stop}</p>
                <p className="mt-1 text-xs text-slate-500">Reviewer: {stop.reviewer}</p>
                <p className="mt-2 text-xs text-slate-600">{stop.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
          Manual review board
        </h3>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {report.manualReviewBoard.map((item) => (
            <div key={item.id} className="rounded-xl bg-white p-4">
              <p className="text-sm font-semibold text-slate-950">{item.decisionTopic}</p>
              <p className="mt-1 text-xs text-slate-500">Reviewer: {item.reviewer}</p>
              <p className="mt-2 text-xs font-medium text-emerald-700">{item.safeOutcome}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
