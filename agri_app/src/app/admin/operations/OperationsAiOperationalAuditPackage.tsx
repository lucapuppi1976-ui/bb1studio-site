import { buildAiOperationalAuditPackageReport } from "@/lib/ai/aiOperationalAuditPackage";

export default function OperationsAiOperationalAuditPackage() {
  const report = buildAiOperationalAuditPackageReport({
    auditTrailItemCount: 8,
    complianceExportItemCount: 8,
    redactionBoardItemCount: 7,
    reviewerEvidenceItemCount: 7,
    immutableEvidenceItemCount: 7,
    runtimeLockEvidenceItemCount: 7,
    openAuditGapCount: 8,
    onlineReadinessScore: 84,
    hardeningScore: 70,
    launchGateScore: 70,
    reviewerAuditScore: 68,
    redactionScore: 66,
    complianceScore: 64,
    evidenceIntegrityScore: 66,
    auditLeadRole: "operations audit package reviewer",
  });

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Operations · V16.2
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            AI Operational Audit Package
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Pannello operativo per audit trail package, compliance export packet, redaction board,
            reviewer evidence pack, immutable evidence design e runtime lock evidence.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white">
          <p className="font-semibold">Endpoint protetto</p>
          <p className="mt-1 text-xs text-slate-300">
            /api/ops/ai-operational-audit-package-dry-run
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.auditPackageStatus}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.auditPackageScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Export</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.complianceExportAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Performed</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.complianceExportPerformed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Findings</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.auditFindings.length}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Audit board pack
          </h3>
          <div className="mt-3 space-y-3">
            {report.auditBoardPack.map((item) => (
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
            <li>Compliance export allowed: {report.readiness.complianceExportAllowed ? "yes" : "no"}</li>
            <li>Compliance export performed: {report.readiness.complianceExportPerformed ? "yes" : "no"}</li>
            <li>Provider called: {report.readiness.providerCalled ? "yes" : "no"}</li>
            <li>Production runtime: {report.readiness.productionRuntimeAllowed ? "yes" : "locked"}</li>
            <li>Storage activation: {report.readiness.storageActivationAllowed ? "yes" : "no"}</li>
            <li>Review persistence: {report.readiness.reviewPersistenceAllowed ? "yes" : "no"}</li>
            <li>Manual conversion: {report.readiness.manualConversionAllowed ? "yes" : "no"}</li>
            <li>Task created: {report.readiness.taskCreated ? "yes" : "no"}</li>
            <li>Intervention created: {report.readiness.interventionCreated ? "yes" : "no"}</li>
            <li>Automatic execution: {report.readiness.automaticExecutionAllowed ? "allowed" : "locked"}</li>
            <li>Product prescription: {report.readiness.productPrescriptionAllowed ? "allowed" : "locked"}</li>
            <li>Dosage advice: {report.readiness.dosageAdviceAllowed ? "allowed" : "locked"}</li>
            <li>Public share: {report.readiness.publicShareAllowed ? "allowed" : "locked"}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
