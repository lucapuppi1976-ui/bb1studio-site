"use client";

import { useMemo } from "react";
import { buildTesterSecondTesterAccessLoginSetupReport } from "@/lib/ops/testerSecondTesterAccessLoginSetupGate";

export default function TesterSecondTesterAccessLoginSetupGatePanel() {
  const report = useMemo(() => buildTesterSecondTesterAccessLoginSetupReport(), []);
  const blockingFindings = report.findings.filter((item) => item.blocksLoginSetup);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
        V20.8 · Second Tester Access & Login Setup
      </p>
      <h2 className="mt-2 text-2xl font-bold text-slate-950">
        Second Tester Access Verification & Login Setup Gate
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
        Gate read-only per verificare accesso, ruolo e metodo login del secondo tester.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Decision</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.decision}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Login method</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.loginMethodScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Safety</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.safetyScore}</p>
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
