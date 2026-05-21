"use client";

import { useMemo } from "react";
import { buildTesterUatFixSprintRetestGateReport } from "@/lib/ops/testerUatFixSprintRetestGate";

export default function TesterUatFixSprintRetestGatePanel() {
  const report = useMemo(() => buildTesterUatFixSprintRetestGateReport(), []);
  const blockingFindings = report.findings.filter((item) => item.blocksRetestProgression);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
        V20.6 · UAT Fix Sprint & Retest
      </p>
      <h2 className="mt-2 text-2xl font-bold text-slate-950">
        UAT Fix Sprint Board & Retest Gate
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
        Board manuale per fix sprint, owner, retest ed esito. Nessuna persistenza.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Decision</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.decision}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Fix sprint</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.fixSprintScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Retest</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.retestScore}</p>
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
