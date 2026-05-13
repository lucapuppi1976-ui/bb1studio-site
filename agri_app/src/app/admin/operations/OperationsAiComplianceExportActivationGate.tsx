import { buildAiComplianceExportActivationGateReport } from "@/lib/ai/aiComplianceExportActivationGate";

export default function OperationsAiComplianceExportActivationGate() {
  const report = buildAiComplianceExportActivationGateReport({
    exportGateItemCount: 8,
    privacyRedactionItemCount: 8,
    legalReviewItemCount: 7,
    reviewerAttestationItemCount: 7,
    exportScopeItemCount: 7,
    auditEvidenceLockItemCount: 7,
    openExportGapCount: 9,
    onlineReadinessScore: 84,
    auditPackageScore: 70,
    incidentBoardScore: 70,
    privacyRedactionScore: 66,
    legalReviewScore: 64,
    reviewerAttestationScore: 68,
    exportScopeScore: 66,
    exportLeadRole: "operations compliance export activation reviewer",
  });

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Operations · V16.6
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            AI Compliance Export Activation Gate
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Pannello operativo per export activation gate, privacy redaction approval,
            legal review lock, reviewer attestation, export scope e publication no-go.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white">
          <p className="font-semibold">Endpoint protetto</p>
          <p className="mt-1 text-xs text-slate-300">
            /api/ops/ai-compliance-export-activation-gate-dry-run
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.exportGateStatus}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.exportGateScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Export</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.complianceExportActivationAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Publication</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.exportPublicationAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Findings</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.exportFindings.length}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Export board pack
          </h3>
          <div className="mt-3 space-y-3">
            {report.exportBoardPack.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.lane} · {item.packReady ? "ready" : "review"} · {item.readinessScore}/100
                </p>
                <p className="mt-2 text-xs font-medium text-emerald-700">
                  {item.reviewerCheck}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Operational locks
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>Export gate ready: {report.readiness.complianceExportActivationGateReady ? "yes" : "no"}</li>
            <li>Compliance export allowed: {report.readiness.complianceExportAllowed ? "yes" : "no"}</li>
            <li>Compliance export performed: {report.readiness.complianceExportPerformed ? "yes" : "no"}</li>
            <li>Export activation allowed: {report.readiness.complianceExportActivationAllowed ? "yes" : "no"}</li>
            <li>Export file write allowed: {report.readiness.exportFileWriteAllowed ? "yes" : "no"}</li>
            <li>Public share allowed: {report.readiness.publicShareAllowed ? "yes" : "no"}</li>
            <li>Legal approval allowed: {report.readiness.legalReviewApprovalAllowed ? "yes" : "no"}</li>
            <li>Privacy approval allowed: {report.readiness.privacyRedactionApprovalAllowed ? "yes" : "no"}</li>
            <li>Provider called: {report.readiness.providerCalled ? "yes" : "no"}</li>
            <li>Storage activation: {report.readiness.storageActivationAllowed ? "yes" : "no"}</li>
            <li>Task created: {report.readiness.taskCreated ? "yes" : "no"}</li>
            <li>Intervention created: {report.readiness.interventionCreated ? "yes" : "no"}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
