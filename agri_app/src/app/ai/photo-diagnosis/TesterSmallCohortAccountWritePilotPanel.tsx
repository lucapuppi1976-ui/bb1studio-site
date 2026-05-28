"use client";

import { useMemo } from "react";
import { buildTesterSmallCohortAccountWritePilotReport } from "@/lib/ops/testerSmallCohortAccountWritePilot";

export default function TesterSmallCohortAccountWritePilotPanel() {
  const report = useMemo(() => buildTesterSmallCohortAccountWritePilotReport(), []);
  const blockingFindings = report.findings.filter((item) => item.blocksWritePilot);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
        V21.7 · Protected Small-Cohort Account Write
      </p>
      <h2 className="mt-2 text-2xl font-bold text-slate-950">
        Protected Small-Cohort Account Write Pilot
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
        Pilot protetto per creare una piccola coorte di account OPERATOR. Dry-run di default, nessuna password e nessun invito email.
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
          <p className="text-xs uppercase tracking-wide text-slate-500">Password write</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.passwordWriteAllowed ? "YES" : "NO"}
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
