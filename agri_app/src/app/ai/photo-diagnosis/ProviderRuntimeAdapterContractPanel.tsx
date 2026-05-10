"use client";

import { useMemo } from "react";
import { buildAiProviderRuntimeAdapterReport } from "@/lib/ai/aiProviderRuntimeAdapterContract";

export default function ProviderRuntimeAdapterContractPanel() {
  const report = useMemo(() => buildAiProviderRuntimeAdapterReport(), []);
  const failedGates = report.runtimeAdapterGates.filter((gate) => !gate.passed);
  const blockingRisks = report.adapterRiskRegister.filter((item) => item.blocksAdapterReview);
  const urgentHandoffs = report.humanLoopHandoff.filter((item) => item.priority === "urgent");

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            V12.8 · AI Provider Runtime Adapter
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Provider Runtime Adapter Contract & Zero-Call Execution Harness
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Contratto locale dry-run per adapter runtime, zero-call proof, runtime freeze,
            adapter stages, human-loop handoff e rollback rehearsal. Nessun provider viene
            chiamato e nessun adapter reale viene abilitato.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-semibold">Adapter status: {report.adapterStatus}</p>
          <p className="mt-1">Score: {report.adapterScore}/100 · severity: {report.overallSeverity}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Gates</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.runtimeAdapterGates.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Failed</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{failedGates.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Contract</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.adapterContract.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Blocking risks</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{blockingRisks.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Urgent handoff</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{urgentHandoffs.length}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Runtime adapter gates
          </h3>

          <div className="mt-4 space-y-3">
            {report.runtimeAdapterGates.map((gate) => (
              <div key={gate.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{gate.label}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {gate.lane} · {gate.severity} · {gate.passed ? "passed" : "review"}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
                    {gate.score}/100
                  </span>
                </div>
                <p className="mt-2 text-xs font-medium text-emerald-700">{gate.hardStop}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-700">
            Zero-call proof
          </h3>

          <div className="mt-4 space-y-3">
            {report.zeroCallProof.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.lane} · {item.severity} · {item.reviewer}
                </p>
                <p className="mt-2 text-xs text-slate-600">{item.proofStatement}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Adapter contract
          </h3>

          <div className="mt-4 space-y-3">
            {report.adapterContract.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.lane} · {item.ready ? "ready" : "review"} · {item.readinessScore}/100
                </p>
                <p className="mt-2 text-xs text-slate-600">{item.reviewerCheck}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-700">
            Human-loop handoff
          </h3>

          <div className="mt-4 space-y-3">
            {report.humanLoopHandoff.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.handoffQuestion}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.priority} · {item.reviewer}
                </p>
                <p className="mt-2 text-xs text-slate-600">{item.safeOutcome}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
          Adapter risk register
        </h3>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {report.adapterRiskRegister.map((risk) => (
            <div key={risk.id} className="rounded-xl bg-white p-4">
              <p className="text-sm font-semibold text-slate-950">{risk.label}</p>
              <p className="mt-1 text-xs text-slate-500">
                {risk.lane} · {risk.severity} · {risk.blocksAdapterReview ? "blocks" : "review"}
              </p>
              <p className="mt-2 text-xs text-slate-600">{risk.manualResolution}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
