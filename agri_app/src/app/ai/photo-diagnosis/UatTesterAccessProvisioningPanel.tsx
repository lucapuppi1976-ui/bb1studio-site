"use client";

import { useMemo } from "react";
import { buildAiUatTesterAccessProvisioningReport } from "@/lib/ai/aiUatTesterAccessProvisioning";

export default function UatTesterAccessProvisioningPanel() {
  const report = useMemo(() => buildAiUatTesterAccessProvisioningReport(), []);
  const blockingFindings = report.findings.filter((item) => item.blocksTesterOnboarding);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            V18.5 · UAT Tester Access
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            UAT Tester Access Provisioning & Role-Based Onboarding
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Piano controllato per tester UAT, ruoli, lingua preferita, onboarding e revoca.
            Nessuna registrazione pubblica, invio inviti o scrittura account reale.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-semibold">Access status: {report.accessProvisioningStatus}</p>
          <p className="mt-1">Score: {report.accessProvisioningScore}/100</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Invite-only</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">
            {report.readiness.inviteOnlyAccessReady ? "READY" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Public signup</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">
            {report.readiness.publicSignupAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Tester drafts</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.testerRosterDraft.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Role matrix</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.roleMatrix.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Blocking</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{blockingFindings.length}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Tester roster draft
          </h3>
          <div className="mt-4 space-y-3">
            {report.testerRosterDraft.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.displayLabel}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.role} · {item.preferredLanguage} · {item.accessState}
                </p>
                <p className="mt-2 text-xs text-slate-600">{item.notes.join(" ")}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Onboarding checklist
          </h3>
          <div className="mt-4 space-y-3">
            {report.onboardingChecklist.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.lane} · {item.priority} · {item.score}/100
                </p>
                <p className="mt-2 text-xs text-slate-600">{item.safeOutcome}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
