"use client";

import { useMemo } from "react";
import { buildAiOnlineLiveUatTestMatrixReport } from "@/lib/ai/aiOnlineLiveUatTestMatrix";

export default function OnlineLiveUatTestMatrixPanel() {
  const report = useMemo(() => buildAiOnlineLiveUatTestMatrixReport(), []);
  const blockingFindings = report.findings.filter((item) => item.blocksLiveUat);
  const readyTests = report.testMatrix.filter((item) => item.status === "ready");

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            V18.2 · Online Live UAT
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Online Live UAT Test Matrix & Evidence Capture Board
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Matrice per testing live controllato, raccolta evidenze, route coverage,
            endpoint protetti, bug triage, criteri pass/fail e rollback decision.
            Nessuna attivazione AI live o scrittura reale.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-semibold">Live UAT: {report.liveUatStatus}</p>
          <p className="mt-1">Score: {report.liveUatScore}/100</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Live UAT</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">
            {report.readiness.liveUatReady ? "READY" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">AI live</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">
            {report.readiness.providerAiReady ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Ready tests</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{readyTests.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Evidence</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.evidenceCaptureBoard.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Blocking</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{blockingFindings.length}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Test matrix
          </h3>
          <div className="mt-4 space-y-3">
            {report.testMatrix.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="mt-1 text-xs text-slate-500">{item.lane} · {item.priority} · {item.score}/100</p>
                <p className="mt-2 text-xs text-slate-600">{item.safeOutcome}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Evidence capture
          </h3>
          <div className="mt-4 space-y-3">
            {report.evidenceCaptureBoard.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="mt-1 text-xs text-slate-500">{item.evidenceType} · {item.severity}</p>
                <p className="mt-2 text-xs text-slate-600">{item.safeOutcome}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
