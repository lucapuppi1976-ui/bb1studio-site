"use client";

import { useMemo } from "react";
import { buildTesterExtendedSingleTesterUatCoverageReport } from "@/lib/ops/testerExtendedSingleTesterUatCoverage";

export default function TesterExtendedSingleTesterUatCoveragePanel() {
  const report = useMemo(() => buildTesterExtendedSingleTesterUatCoverageReport(), []);
  const blockingFindings = report.findings.filter((item) => item.blocksProgression);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
        V20.5 · Extended Single Tester UAT
      </p>
      <h2 className="mt-2 text-2xl font-bold text-slate-950">
        Extended Single Tester UAT Scenario Coverage
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
        Copertura estesa con lo stesso tester pilota prima dell’espansione pool. Nessuna persistenza.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Decision</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.decision}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Coverage</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.scenarioCoverageScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Total</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.totalScore}</p>
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

      <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-950">Extended scenario pack</p>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          {report.scenarioPack.map((scenario) => (
            <li key={scenario.id}>
              <span className="font-semibold">{scenario.id}</span> — {scenario.title}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
