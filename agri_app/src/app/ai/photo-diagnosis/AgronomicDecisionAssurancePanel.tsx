"use client";

import { useMemo } from "react";
import { buildAiAgronomicDecisionAssuranceReport } from "@/lib/ai/aiAgronomicDecisionAssurance";

export default function AgronomicDecisionAssurancePanel() {
  const report = useMemo(() => buildAiAgronomicDecisionAssuranceReport(), []);
  const failedGates = report.assuranceGates.filter((gate) => !gate.passed);
  const blockingDissent = report.dissentRegister.filter((item) => item.blocksAssurance);
  const urgentSignoffs = report.humanSignoffBoard.filter((item) => item.priority === "urgent");

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            V11.3 · AI Decision Assurance
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Agronomic Decision Assurance & Human Sign-off Kernel
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Kernel locale dry-run per assurance gate, human sign-off, dissent register,
            evidence chain e safe decision packet. Non approva decisioni operative e non crea
            task, interventi, prescrizioni, dosaggi o forecast.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-semibold">Assurance status: {report.assuranceStatus}</p>
          <p className="mt-1">Score: {report.assuranceScore}/100 · severity: {report.overallSeverity}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Sources</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.sourceNodes.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Failed gates</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{failedGates.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Signoffs</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.humanSignoffBoard.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Urgent</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{urgentSignoffs.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Dissent</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{blockingDissent.length}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Assurance gates
          </h3>

          <div className="mt-4 space-y-3">
            {report.assuranceGates.map((gate) => (
              <div key={gate.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{gate.label}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {gate.lane} · {gate.severity} · {gate.passed ? "passed" : "review"}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
                    {gate.score}/100
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-600">{gate.reason}</p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{gate.hardStop}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Decision packet
          </h3>

          <div className="mt-4 space-y-3">
            {report.decisionPacket.map((card) => (
              <div key={card.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{card.title}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {card.status} · {card.priority}
                </p>
                <p className="mt-2 text-sm text-slate-600">{card.assuranceStatement}</p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{card.requiredHumanAction}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-700">
            Human sign-off board
          </h3>

          <div className="mt-4 space-y-3">
            {report.humanSignoffBoard.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.topic}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.priority} · {item.reviewer}
                </p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{item.allowedOutcome}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
          Assurance gaps
        </h3>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {report.assuranceGaps.map((gap) => (
            <div key={gap.id} className="rounded-xl bg-white p-4">
              <p className="text-sm font-semibold text-slate-950">{gap.label}</p>
              <p className="mt-1 text-xs text-slate-500">
                {gap.lane} · {gap.severity}
              </p>
              <p className="mt-2 text-xs text-slate-600">{gap.manualResolution}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
