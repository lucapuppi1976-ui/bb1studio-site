"use client";

import { useMemo } from "react";
import { buildTesterAccountWritePilotReport } from "@/lib/ops/testerAccountWritePilot";

export default function TesterAccountWritePilotPanel() {
  const report = useMemo(() => buildTesterAccountWritePilotReport(), []);
  const blockingFindings = report.findings.filter((item) => item.blocksWritePilot);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
        V19.8 · Tester Account Write Pilot
      </p>
      <h2 className="mt-2 text-2xl font-bold text-slate-950">
        Protected Tester Account Write Pilot & Single-Tester Creation Endpoint
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
        Endpoint protetto per un singolo tester pilota. Dry-run di default; la scrittura reale richiede
        CRON_SECRET, server env dedicati e conferma esplicita.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Pilot</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.pilotStatus}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Decision</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.decision}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Auto write</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.automaticAccountWriteAllowed ? "YES" : "NO"}
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
