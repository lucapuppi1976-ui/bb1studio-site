"use client";

import { useMemo } from "react";
import { buildAiAgronomicExplainabilityLedgerReport } from "@/lib/ai/aiAgronomicExplainabilityLedger";

export default function AgronomicExplainabilityLedgerPanel() {
  const report = useMemo(() => buildAiAgronomicExplainabilityLedgerReport(), []);
  const blockedNodes = report.sourceNodes.filter((node) => node.blockers.length > 0);
  const urgentQuestions = report.reviewerQuestions.filter((question) => question.priority === "urgent");
  const criticalUncertainty = report.uncertaintyRegister.filter((item) => item.severity === "critical");

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            V11.1 · AI Explainability Ledger
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Agronomic Explainability Ledger & Traceability Kernel
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Ledger locale dry-run per spiegare come evidence, moduli, incertezza, counterfactual
            review e governance gate contribuiscono alla control tower. Il ledger produce solo
            spiegazioni redatte per revisione umana.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-semibold">Ledger status: {report.ledgerStatus}</p>
          <p className="mt-1">Score: {report.ledgerScore}/100 · severity: {report.overallSeverity}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Sources</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.sourceNodes.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Blocked</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{blockedNodes.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Uncertainty</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.uncertaintyRegister.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Critical</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{criticalUncertainty.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Urgent Q</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{urgentQuestions.length}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Source nodes
          </h3>

          <div className="mt-4 space-y-3">
            {report.sourceNodes.map((node) => (
              <div key={node.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{node.title}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {node.sourceVersion} · {node.lane} · {node.severity}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
                    {node.confidenceScore}/100
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-600">{node.reviewerFocus}</p>
                {node.blockers.length > 0 && (
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-amber-700">
                    {node.blockers.map((blocker) => (
                      <li key={blocker}>{blocker}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Reasoning trace
          </h3>

          <div className="mt-4 space-y-3">
            {report.reasoningTrace.map((step) => (
              <div key={step.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">
                  {step.sequence}. {step.title}
                </p>
                <p className="mt-2 text-sm text-slate-600">{step.explanation}</p>
                <p className="mt-2 text-xs font-semibold text-emerald-700">
                  {step.reviewerCheck}
                </p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-700">
            Reviewer questions
          </h3>

          <div className="mt-4 space-y-3">
            {report.reviewerQuestions.map((question) => (
              <div key={question.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{question.question}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {question.priority} · {question.reviewer}
                </p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{question.safeOutcome}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
          Audit ledger
        </h3>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {report.auditLedger.map((item) => (
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
