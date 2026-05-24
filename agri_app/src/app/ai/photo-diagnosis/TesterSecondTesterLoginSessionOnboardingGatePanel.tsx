"use client";

import { useMemo } from "react";
import { buildTesterSecondTesterLoginSessionOnboardingReport } from "@/lib/ops/testerSecondTesterLoginSessionOnboardingGate";

export default function TesterSecondTesterLoginSessionOnboardingGatePanel() {
  const report = useMemo(() => buildTesterSecondTesterLoginSessionOnboardingReport(), []);
  const blockingFindings = report.findings.filter((item) => item.blocksUatProgression);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
        V21.1 · Second Tester Login Session & Onboarding
      </p>
      <h2 className="mt-2 text-2xl font-bold text-slate-950">
        Second Tester Login Session Verification & Manual Onboarding Gate
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
        Gate read-only per confermare login, sessione, onboarding manuale e sicurezza prima dello scenario pack.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Decision</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.decision}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Login/session</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.loginSessionScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Onboarding</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.onboardingScore}</p>
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
