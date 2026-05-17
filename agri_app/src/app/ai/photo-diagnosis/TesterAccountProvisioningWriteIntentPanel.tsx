"use client";

import { useMemo } from "react";
import { buildTesterAccountProvisioningWriteIntentReport } from "@/lib/ops/testerAccountProvisioningWriteIntent";

export default function TesterAccountProvisioningWriteIntentPanel() {
  const report = useMemo(() => buildTesterAccountProvisioningWriteIntentReport(), []);
  const blockingFindings = report.findings.filter((item) => item.blocksWriteIntent);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            V19.6 · Tester Provisioning Write Intent
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Tester Account Provisioning Write-Intent Lock & Non-AI Ops Boundary
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Gate ops non-AI per preparare la futura creazione account tester.
            Nessuna scrittura account viene eseguita.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-semibold">Intent: {report.writeIntentStatus}</p>
          <p className="mt-1">Score: {report.writeIntentScore}/100</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Prepared</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">
            {report.context.preparedIntentCount}/{report.context.targetTesterCount}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Account write</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">
            {report.readiness.accountWriteAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">AI provider</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">
            {report.readiness.providerCalled ? "YES" : "NO"}
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
    </section>
  );
}
