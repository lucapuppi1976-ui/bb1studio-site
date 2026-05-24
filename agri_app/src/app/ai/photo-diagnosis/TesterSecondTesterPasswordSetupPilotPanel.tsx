"use client";

import { useMemo } from "react";
import { buildTesterSecondTesterPasswordSetupPilotReport } from "@/lib/ops/testerSecondTesterPasswordSetupPilot";

export default function TesterSecondTesterPasswordSetupPilotPanel() {
  const report = useMemo(() => buildTesterSecondTesterPasswordSetupPilotReport(), []);
  const blockingFindings = report.findings.filter((item) => item.blocksPasswordSetup);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
        V21.0 · Protected Second Tester Password Setup
      </p>
      <h2 className="mt-2 text-2xl font-bold text-slate-950">
        Protected Second Tester Password Setup Pilot
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
        Pilot protetto per impostare solo passwordHash sul secondo tester già creato. Dry-run di default.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Decision</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.decision}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Pilot score</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.pilotScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Account create</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.accountCreateAllowed ? "YES" : "NO"}
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
