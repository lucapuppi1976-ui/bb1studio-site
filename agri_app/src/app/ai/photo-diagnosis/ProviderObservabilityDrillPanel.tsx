"use client";

import { useMemo } from "react";
import { buildAiProviderObservabilityDrillReport } from "@/lib/ai/aiProviderObservabilityDrill";

export default function ProviderObservabilityDrillPanel() {
  const report = useMemo(() => buildAiProviderObservabilityDrillReport(), []);
  const failedGates = report.reviewGates.filter((gate) => !gate.passed);
  const blockingRisks = report.riskRegister.filter((item) => item.blocksIncidentReview);
  const urgentQuestions = report.approvalBoard.filter((question) => question.priority === "urgent");

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            V12.5 · AI Provider Observability
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Provider Observability & Incident Response Drill Center
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Centro locale dry-run per runtime signals simulati, incident drills,
            quality drift watch, latency budget review, kill-switch rehearsal e rollback plan.
            Nessun provider viene chiamato e nessun monitoraggio reale viene abilitato.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-semibold">Observability status: {report.observabilityStatus}</p>
          <p className="mt-1">Score: {report.observabilityScore}/100 · severity: {report.overallSeverity}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Signals</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.runtimeSignals.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Failed gates</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{failedGates.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Drills</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.incidentDrills.length}</p>
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
            Runtime signals
          </h3>

          <div className="mt-4 space-y-3">
            {report.runtimeSignals.map((signal) => (
              <div key={signal.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{signal.label}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {signal.lane} · {signal.severity}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
                    {signal.signalScore}/100
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-600">{signal.reviewerCheck}</p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{signal.blockedPattern}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-700">
            Incident drills
          </h3>

          <div className="mt-4 space-y-3">
            {report.incidentDrills.map((drill) => (
              <div key={drill.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{drill.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {drill.severity} · {drill.priority} · {drill.drillReady ? "ready" : "review"}
                </p>
                <p className="mt-2 text-xs text-slate-600">{drill.expectedManualAction}</p>
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
            Quality drift watch
          </h3>

          <div className="mt-4 space-y-3">
            {report.qualityDriftWatch.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.lane} · {item.severity} · drift {item.driftScore}/100
                </p>
                <p className="mt-2 text-xs text-slate-600">{item.reviewerQuestion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
          Observability risk register
        </h3>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {report.riskRegister.map((risk) => (
            <div key={risk.id} className="rounded-xl bg-white p-4">
              <p className="text-sm font-semibold text-slate-950">{risk.label}</p>
              <p className="mt-1 text-xs text-slate-500">
                {risk.lane} · {risk.severity} · {risk.blocksIncidentReview ? "blocks" : "review"}
              </p>
              <p className="mt-2 text-xs text-slate-600">{risk.manualResolution}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
