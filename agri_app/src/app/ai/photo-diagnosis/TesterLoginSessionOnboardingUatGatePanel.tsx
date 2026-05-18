"use client";

import { useMemo } from "react";
import { buildTesterLoginSessionOnboardingUatReport } from "@/lib/ops/testerLoginSessionOnboardingUatGate";

export default function TesterLoginSessionOnboardingUatGatePanel() {
  const report = useMemo(() => buildTesterLoginSessionOnboardingUatReport(), []);
  const blockingFindings = report.findings.filter((item) => item.blocksManualUat);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
        V20.2 · Tester Login Session & Onboarding UAT
      </p>
      <h2 className="mt-2 text-2xl font-bold text-slate-950">
        Tester Login Session Verification & Manual Onboarding UAT Gate
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
        Gate read-only per confermare login manuale, onboarding, route protetta, fallback lingua e logout.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Decision</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.decision}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.uatScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Read-only</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.readOnlyVerificationOnly ? "YES" : "NO"}
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

      <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-950">Next step</p>
        <p className="mt-2 text-sm text-slate-700">{report.nextStep}</p>
      </div>
    </section>
  );
}
