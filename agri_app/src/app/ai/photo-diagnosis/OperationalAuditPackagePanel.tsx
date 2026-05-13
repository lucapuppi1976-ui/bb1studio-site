"use client";

import { useMemo } from "react";
import { buildAiOperationalAuditPackageReport } from "@/lib/ai/aiOperationalAuditPackage";

export default function OperationalAuditPackagePanel() {
  const report = useMemo(() => buildAiOperationalAuditPackageReport(), []);
  const failedGates = report.auditPackageGates.filter((gate) => !gate.passed);
  const blockingFindings = report.auditFindings.filter((item) => item.blocksAuditExportActivation);
  const noGoItems = report.exportNoGoBoard.filter((item) => item.goNoGoState === "no-go");

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            V16.2 · AI Operational Audit Package
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Operational Audit Package & Compliance Export Hardening
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Modulo locale dry-run per audit trail package, compliance export packet,
            redaction board, reviewer evidence pack e runtime lock evidence. Export ancora no-go.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-semibold">Audit package: {report.auditPackageStatus}</p>
          <p className="mt-1">Score: {report.auditPackageScore}/100 · severity: {report.overallSeverity}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Audit</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">
            {report.readiness.operationalAuditPackageReady ? "READY" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Export</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">
            {report.readiness.complianceExportAllowed ? "YES" : "LOCKED"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Failed gates</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{failedGates.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Blocking findings</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{blockingFindings.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">No-go</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{noGoItems.length}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Audit trail package
          </h3>

          <div className="mt-4 space-y-3">
            {report.auditTrailPackage.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.lane} · {item.severity}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
                    {item.auditScore}/100
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-600">{item.auditPurpose}</p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{item.blockedOutcome}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-700">
            Runtime lock evidence
          </h3>

          <div className="mt-4 space-y-3">
            {report.runtimeLockEvidence.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.lane} · {item.severity} · {item.lockScore}/100
                </p>
                <p className="mt-2 text-xs text-slate-600">{item.lockRule}</p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{item.blockedOutcome}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Audit package gates
          </h3>

          <div className="mt-4 space-y-3">
            {report.auditPackageGates.map((gate) => (
              <div key={gate.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{gate.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {gate.lane} · {gate.severity} · {gate.passed ? "passed" : "review"}
                </p>
                <p className="mt-2 text-sm text-slate-600">Score {gate.score}/100</p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{gate.hardStop}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-700">
            Export no-go board
          </h3>

          <div className="mt-4 space-y-3">
            {report.exportNoGoBoard.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.lane} · {item.goNoGoState} · {item.severity}
                </p>
                <p className="mt-2 text-xs text-slate-600">{item.safeOutcome}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
          Audit findings
        </h3>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {report.auditFindings.map((finding) => (
            <div key={finding.id} className="rounded-xl bg-white p-4">
              <p className="text-sm font-semibold text-slate-950">{finding.label}</p>
              <p className="mt-1 text-xs text-slate-500">
                {finding.lane} · {finding.severity} · {finding.blocksAuditExportActivation ? "blocks activation" : "review"}
              </p>
              <p className="mt-2 text-xs text-slate-600">{finding.manualResolution}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
