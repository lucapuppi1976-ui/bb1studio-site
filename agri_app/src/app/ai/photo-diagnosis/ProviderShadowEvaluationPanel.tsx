"use client";

import { useMemo } from "react";
import { buildAiProviderShadowEvaluationReport } from "@/lib/ai/aiProviderShadowEvaluation";

export default function ProviderShadowEvaluationPanel() {
  const report = useMemo(() => buildAiProviderShadowEvaluationReport(), []);
  const failedGates = report.reviewGates.filter((gate) => !gate.passed);
  const blockingDrills = report.rejectionDrills.filter((item) => item.blocksBenchmark);
  const urgentQuestions = report.manualApprovalBoard.filter((question) => question.priority === "urgent");

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            V12.3 · AI Provider Shadow Evaluation
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Provider Shadow Evaluation & Synthetic Benchmark Harness
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Harness locale dry-run per benchmark sintetico, shadow metrics,
            rejection drills, review gates e approval board. Nessun provider viene
            chiamato e nessun risultato viene usato operativamente.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-semibold">Shadow status: {report.shadowStatus}</p>
          <p className="mt-1">Score: {report.shadowScore}/100 · severity: {report.overallSeverity}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Cases</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.syntheticBenchmarkCases.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Failed gates</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{failedGates.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Metrics</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.shadowMetrics.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Blocking drills</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{blockingDrills.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Urgent Q</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{urgentQuestions.length}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Synthetic benchmark cases
          </h3>

          <div className="mt-4 space-y-3">
            {report.syntheticBenchmarkCases.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.lane} · {item.fixtureReady ? "ready" : "review"}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
                    {item.benchmarkScore}/100
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-600">{item.expectedSafeOutcome}</p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{item.blockedOutcome}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-700">
            Rejection drills
          </h3>

          <div className="mt-4 space-y-3">
            {report.rejectionDrills.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.severity} · {item.blocksBenchmark ? "blocks" : "review note"}
                </p>
                <p className="mt-2 text-xs text-slate-600">{item.expectedFirewallOutcome}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Review gates
          </h3>

          <div className="mt-4 space-y-3">
            {report.reviewGates.map((gate) => (
              <div key={gate.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{gate.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {gate.lane} · {gate.severity} · {gate.passed ? "passed" : "review"}
                </p>
                <p className="mt-2 text-sm text-slate-600">{gate.reason}</p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{gate.hardStop}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-700">
            Shadow metrics
          </h3>

          <div className="mt-4 space-y-3">
            {report.shadowMetrics.map((metric) => (
              <div key={metric.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{metric.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {metric.lane} · {metric.severity} · {metric.currentScore}/{metric.targetScore}
                </p>
                <p className="mt-2 text-xs text-slate-600">{metric.reviewerQuestion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
          Shadow gaps
        </h3>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {report.shadowGaps.map((gap) => (
            <div key={gap.id} className="rounded-xl bg-white p-4">
              <p className="text-sm font-semibold text-slate-950">{gap.label}</p>
              <p className="mt-1 text-xs text-slate-500">
                {gap.lane} · {gap.severity}
              </p>
              <p className="mt-2 text-xs text-slate-600">{gap.manualResolution}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
