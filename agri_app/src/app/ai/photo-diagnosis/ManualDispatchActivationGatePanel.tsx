"use client";

import { useMemo } from "react";
import { buildAiManualDispatchActivationGateReport } from "@/lib/ai/aiManualDispatchActivationGate";

export default function ManualDispatchActivationGatePanel() {
  const report = useMemo(() => buildAiManualDispatchActivationGateReport(), []);
  const failedGates = report.dispatchGateChecks.filter((gate) => !gate.passed);
  const blockingFindings = report.dispatchFindings.filter((item) => item.blocksDispatchActivation);
  const noGoItems = report.dispatchNoGoBoard.filter((item) => item.goNoGoState === "no-go");

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            V16.7 · AI Manual Dispatch Activation Gate
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Manual Dispatch Activation Gate & Operational Approval Lock
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Gate locale dry-run per operator approval board, agronomic safety checklist,
            work conversion boundary, reviewer signoff e dispatch no-go. Nessun dispatch reale viene creato.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-semibold">Dispatch gate: {report.dispatchGateStatus}</p>
          <p className="mt-1">Score: {report.dispatchGateScore}/100 · severity: {report.overallSeverity}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Gate</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">
            {report.readiness.manualDispatchActivationGateReady ? "READY" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Dispatch</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">
            {report.readiness.manualDispatchActivationAllowed ? "YES" : "LOCKED"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Failed gates</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{failedGates.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Blocking findings</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{blockingFindings.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">No-go</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{noGoItems.length}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Dispatch activation gate
          </h3>

          <div className="mt-4 space-y-3">
            {report.dispatchActivationGate.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.lane} · {item.severity}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
                    {item.gateScore}/100
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-600">{item.gatePurpose}</p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{item.blockedOutcome}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-700">
            Work conversion boundary
          </h3>

          <div className="mt-4 space-y-3">
            {report.workConversionBoundary.map((item) => (
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
            Dispatch gate checks
          </h3>

          <div className="mt-4 space-y-3">
            {report.dispatchGateChecks.map((gate) => (
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
            Dispatch no-go board
          </h3>

          <div className="mt-4 space-y-3">
            {report.dispatchNoGoBoard.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.lane} · {item.goNoGoState} · {item.severity}
                </p>
                <p className="mt-2 text-xs text-slate-600">{item.safeOutcome}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
          Dispatch findings
        </h3>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {report.dispatchFindings.map((finding) => (
            <div key={finding.id} className="rounded-xl bg-white p-4">
              <p className="text-sm font-semibold text-slate-950">{finding.label}</p>
              <p className="mt-1 text-xs text-slate-500">
                {finding.lane} · {finding.severity} · {finding.blocksDispatchActivation ? "blocks activation" : "review"}
              </p>
              <p className="mt-2 text-xs text-slate-600">{finding.manualResolution}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
