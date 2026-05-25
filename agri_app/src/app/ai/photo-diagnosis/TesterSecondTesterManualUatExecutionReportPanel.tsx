"use client";

import { useMemo } from "react";
import { buildTesterSecondTesterManualUatExecutionReport } from "@/lib/ops/testerSecondTesterManualUatExecutionReport";

export default function TesterSecondTesterManualUatExecutionReportPanel() {
  const report = useMemo(() => buildTesterSecondTesterManualUatExecutionReport(), []);
  const blockingFindings = report.findings.filter((item) => item.blocksExecutionReport);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
        V21.3 · Second Tester UAT Execution
      </p>
      <h2 className="mt-2 text-2xl font-bold text-slate-950">
        Second Tester Manual UAT Execution Report & Issue Triage Board
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
        Report read-only per esito scenari, pass/fail/blocked, evidenze manuali, triage issue e prossima decisione.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Decision</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.decision}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Pass rate</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.scenarioPassRate}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Evidence</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.evidenceScore}</p>
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
