"use client";

import { useMemo } from "react";
import { buildAiAgronomicControlTowerReport } from "@/lib/ai/aiAgronomicControlTower";

export default function AgronomicControlTowerPanel() {
  const report = useMemo(() => buildAiAgronomicControlTowerReport(), []);
  const blockedNodes = report.moduleNodes.filter((node) => node.blocked);
  const urgentCards = report.commandCards.filter((card) => card.priority === "urgent");
  const failedGates = report.governanceGates.filter((gate) => !gate.passed);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            V11.0 · AI Agronomic Control Tower
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Agronomic Control Tower & Governance Kernel
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Control tower locale dry-run che coordina knowledge vault, autopilot, crop protocols,
            board pack, digital twin, climate-water, biosecurity, soil health, phenology e harvest quality.
            Tutto resta redatto, manuale e bloccato dietro governance umana.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-semibold">Tower status: {report.towerStatus}</p>
          <p className="mt-1">
            Score: {report.towerScore}/100 · severity: {report.overallSeverity}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Modules</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.moduleNodes.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Blocked</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{blockedNodes.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Cards</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.commandCards.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Urgent</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{urgentCards.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Gate gaps</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{failedGates.length}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Module nodes
          </h3>

          <div className="mt-4 space-y-3">
            {report.moduleNodes.map((node) => (
              <div key={node.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{node.title}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {node.sourceVersion} · {node.lane} · {node.severity}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
                    {node.readinessScore}/100
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
            Command cards
          </h3>

          <div className="mt-4 space-y-3">
            {report.commandCards.map((card) => (
              <div key={card.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-950">{card.title}</p>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                    {card.priority}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{card.decisionQuestion}</p>
                <p className="mt-2 text-xs font-semibold text-emerald-700">
                  {card.manualReviewAction}
                </p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-700">
            Governance gates
          </h3>

          <div className="mt-4 space-y-3">
            {report.governanceGates.map((gate) => (
              <div key={gate.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{gate.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {gate.passed ? "passed" : "requires review"} · {gate.reviewer}
                </p>
                <p className="mt-2 text-xs text-slate-600">{gate.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
          Escalation paths
        </h3>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {report.escalationPaths.map((path) => (
            <div key={path.id} className="rounded-xl bg-white p-4">
              <p className="text-sm font-semibold text-slate-950">{path.title}</p>
              <p className="mt-1 text-xs text-slate-500">
                {path.fromLane} · {path.priority} · {path.toReviewer}
              </p>
              <p className="mt-2 text-xs font-medium text-emerald-700">{path.allowedOutcome}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
