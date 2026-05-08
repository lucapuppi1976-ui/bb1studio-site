"use client";

import { useMemo } from "react";
import { buildAiAgronomicCompliancePassportReport } from "@/lib/ai/aiAgronomicCompliancePassport";

export default function AgronomicCompliancePassportPanel() {
  const report = useMemo(() => buildAiAgronomicCompliancePassportReport(), []);
  const blockedSources = report.sourceNodes.filter((node) => node.blockers.length > 0);
  const criticalGaps = report.traceabilityGaps.filter((gap) => gap.severity === "critical");
  const urgentChecklist = report.reviewerChecklist.filter((item) => item.priority === "urgent");

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            V11.2 · AI Compliance Passport
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Agronomic Compliance Passport & Certification Readiness Kernel
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Passport locale dry-run per audit readiness, tracciabilità, requirement matrix,
            certification review packet e export redatto. Non genera claim formali, task,
            interventi, prescrizioni, dosaggi o forecast produttivi.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-semibold">Passport status: {report.passportStatus}</p>
          <p className="mt-1">Score: {report.passportScore}/100 · severity: {report.overallSeverity}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Sources</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.sourceNodes.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Blocked</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{blockedSources.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Requirements</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.requirementMatrix.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Critical gaps</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{criticalGaps.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Urgent Q</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{urgentChecklist.length}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Requirement matrix
          </h3>

          <div className="mt-4 space-y-3">
            {report.requirementMatrix.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.lane} · {item.severity} · {item.passed ? "passed" : "review"}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
                    {item.readinessScore}/100
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-600">{item.manualResolution}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Certification readiness
          </h3>

          <div className="mt-4 space-y-3">
            {report.certificationReadiness.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.readinessBand} · score {item.score}/100
                </p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{item.allowedOutcome}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-700">
            Reviewer checklist
          </h3>

          <div className="mt-4 space-y-3">
            {report.reviewerChecklist.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.question}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.priority} · {item.reviewer}
                </p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{item.safeOutcome}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
          Audit trail
        </h3>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {report.auditTrail.map((item) => (
            <div key={item.id} className="rounded-xl bg-white p-4">
              <p className="text-sm font-semibold text-slate-950">{item.event}</p>
              <p className="mt-1 text-xs text-slate-500">
                {item.lane} · {item.severity} · {item.reviewer}
              </p>
              <p className="mt-2 text-xs text-slate-600">{item.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
