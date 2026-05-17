"use client";

import { useMemo } from "react";
import { buildTesterAccountAccessVerificationReport } from "@/lib/ops/testerAccountAccessVerification";

export default function TesterAccountAccessVerificationPanel() {
  const report = useMemo(() => buildTesterAccountAccessVerificationReport(), []);
  const blockingFindings = report.findings.filter((item) => item.blocksAccessVerification);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
        V19.9 · Tester Access Verification
      </p>
      <h2 className="mt-2 text-2xl font-bold text-slate-950">
        Tester Account Access Verification & Login/Onboarding Gate
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
        Verifica read-only per account tester, ruolo, metodo auth e onboarding. Nessuna scrittura account.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Decision</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.decision}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.accessScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Account write</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.accountWriteAllowed ? "YES" : "NO"}
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
