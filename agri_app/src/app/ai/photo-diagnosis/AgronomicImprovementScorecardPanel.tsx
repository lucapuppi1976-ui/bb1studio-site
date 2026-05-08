"use client";

import { useMemo } from "react";
import { buildAiAgronomicImprovementScorecardReport } from "@/lib/ai/aiAgronomicImprovementScorecard";

export default function AgronomicImprovementScorecardPanel() {
  const report = useMemo(() => buildAiAgronomicImprovementScorecardReport(), []);
  const blockedBacklog = report.improvementBacklog.filter((item) => item.status === "blocked");
  const criticalGaps = report.improvementGaps.filter((gap) => gap.severity === "critical");
  const urgentCadence = report.reviewCadence.filter((item) => item.priority === "urgent");

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            V11.5 · AI Improvement Scorecard
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Agronomic Continuous Improvement & Resilience Scorecard Kernel
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Scorecard locale dry-run per miglioramento continuo, maturity model,
            review cadence, backlog, roadmap e resilienza agronomica. Tutto resta
            redatto e manuale: nessun task, intervento, forecast, prescrizione o dosaggio.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-semibold">Improvement status: {report.improvementStatus}</p>
          <p className="mt-1">Score: {report.improvementScore}/100 · severity: {report.overallSeverity}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Sources</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.sourceNodes.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Backlog</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.improvementBacklog.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Blocked</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{blockedBacklog.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Critical gaps</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{criticalGaps.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Urgent cadence</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{urgentCadence.length}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Resilience scorecard
          </h3>

          <div className="mt-4 space-y-3">
            {report.resilienceScorecard.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.lane} · {item.severity}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
                    {item.currentScore}/100
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-600">{item.reviewerQuestion}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Improvement backlog
          </h3>

          <div className="mt-4 space-y-3">
            {report.improvementBacklog.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.title}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.status} · {item.priority} · {item.lane}
                </p>
                <p className="mt-2 text-sm text-slate-600">{item.improvementHypothesis}</p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{item.manualReviewAction}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-700">
            Review cadence
          </h3>

          <div className="mt-4 space-y-3">
            {report.reviewCadence.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.title}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.cadence} · {item.priority} · {item.reviewer}
                </p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{item.safeOutcome}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
          Roadmap scenarios
        </h3>

        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {report.roadmapScenarios.map((item) => (
            <div key={item.id} className="rounded-xl bg-white p-4">
              <p className="text-sm font-semibold text-slate-950">{item.title}</p>
              <p className="mt-1 text-xs text-slate-500">
                {item.horizon} · {item.priority}
              </p>
              <p className="mt-2 text-xs text-slate-600">{item.manualDecisionPoint}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
