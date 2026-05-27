"use client";

import { useMemo } from "react";
import { buildTesterSmallCohortCandidateReadinessProvisioningReport } from "@/lib/ops/testerSmallCohortCandidateReadinessProvisioningGate";

export default function TesterSmallCohortCandidateReadinessProvisioningGatePanel() {
  const report = useMemo(() => buildTesterSmallCohortCandidateReadinessProvisioningReport(), []);
  const blockingFindings = report.findings.filter((item) => item.blocksProvisioning);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
        V21.6 · Candidate Readiness & Provisioning Gate
      </p>
      <h2 className="mt-2 text-2xl font-bold text-slate-950">
        Small-Cohort Candidate Readiness & Provisioning Gate
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
        Gate read-only per candidati piccola coorte: email, profili, consenso, duplicati, readiness e decisione per futuro write pilot.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Decision</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.decision}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Candidates</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.candidateScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Provisioning</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.provisioningScore}</p>
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
