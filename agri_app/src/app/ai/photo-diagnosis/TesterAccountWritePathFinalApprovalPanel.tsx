"use client";

import { useMemo } from "react";
import { buildAiTesterAccountWritePathFinalApprovalReport } from "@/lib/ai/aiTesterAccountWritePathFinalApproval";

export default function TesterAccountWritePathFinalApprovalPanel() {
  const report = useMemo(() => buildAiTesterAccountWritePathFinalApprovalReport(), []);
  const blockingFindings = report.findings.filter((item) => item.blocksAccountWritePath);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            V19.3 · Tester Account Write Path
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Tester Account Write Path Final Approval Gate & Rollback-Reversible Creation Plan
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Gate dry-run per approvazione finale, boundary scrittura account,
            piano rollback, checklist manuale e no-go board. Nessun account reale viene creato.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-semibold">Write path: {report.finalWritePathStatus}</p>
          <p className="mt-1">Score: {report.finalWritePathScore}/100</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Approved testers</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">
            {report.context.approvedTesterCount}/{report.context.targetTesterCount}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Account write</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">
            {report.readiness.accountWriteAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Rollback exec</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">
            {report.readiness.rollbackExecutionAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Findings</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.findings.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Blocking</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{blockingFindings.length}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Final approval
          </h3>
          <div className="mt-4 space-y-3">
            {report.finalApprovalBoard.map((item) => (
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
            Account write no-go
          </h3>
          <div className="mt-4 space-y-3">
            {report.noGoBoard.map((item) => (
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
