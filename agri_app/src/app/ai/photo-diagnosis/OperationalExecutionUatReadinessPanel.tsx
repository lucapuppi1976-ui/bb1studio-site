"use client";

import { useMemo } from "react";
import { buildAiOperationalExecutionUatReadinessReport } from "@/lib/ai/aiOperationalExecutionUatReadiness";

export default function OperationalExecutionUatReadinessPanel() {
  const report = useMemo(() => buildAiOperationalExecutionUatReadinessReport(), []);
  const blockingFindings = report.findings.filter((item) => item.blocksExecutionUat);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            V18.3 · Operational Execution UAT Readiness
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Operational Execution UAT Readiness & Emergency Stop Proof Board
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Board dry-run per approval umano, emergency stop proof, command boundary,
            scenari execution simulati e rollback decision. Nessuna execution reale.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-semibold">Execution UAT: {report.executionUatStatus}</p>
          <p className="mt-1">Score: {report.executionUatScore}/100</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Readiness</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">
            {report.readiness.executionUatReadinessReady ? "READY" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Execution</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">
            {report.readiness.operationalExecutionAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Command</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">
            {report.readiness.executionCommandAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">No-go</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.noGoBoard.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Blocking</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{blockingFindings.length}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Human approval proof
          </h3>
          <div className="mt-4 space-y-3">
            {report.humanApprovalProofBoard.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="mt-1 text-xs text-slate-500">{item.lane} · {item.priority} · {item.score}/100</p>
                <p className="mt-2 text-xs text-slate-600">{item.safeOutcome}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Emergency stop proof
          </h3>
          <div className="mt-4 space-y-3">
            {report.emergencyStopProofBoard.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="mt-1 text-xs text-slate-500">{item.lane} · {item.priority} · {item.score}/100</p>
                <p className="mt-2 text-xs text-slate-600">{item.safeOutcome}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
