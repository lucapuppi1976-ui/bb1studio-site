"use client";

import { useMemo } from "react";
import { buildTesterDualTesterUatComparativeExpansionReport } from "@/lib/ops/testerDualTesterUatComparativeExpansionGate";

export default function TesterDualTesterUatComparativeExpansionGatePanel() {
  const report = useMemo(() => buildTesterDualTesterUatComparativeExpansionReport(), []);
  const blockingFindings = report.findings.filter((item) => item.blocksExpansion);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
        V21.4 · Dual Tester UAT Comparative
      </p>
      <h2 className="mt-2 text-2xl font-bold text-slate-950">
        Dual Tester UAT Comparative Report & Controlled Expansion Decision Gate
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
        Report comparativo read-only tra primo e secondo tester, con decisione controllata per l’espansione del pool UAT.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Decision</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.decision}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Comparative</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.comparativeExecutionScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Expansion</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.expansionReadinessScore}</p>
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
