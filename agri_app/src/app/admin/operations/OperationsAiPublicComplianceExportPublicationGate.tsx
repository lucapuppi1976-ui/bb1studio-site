import { buildAiPublicComplianceExportPublicationGateReport } from "@/lib/ai/aiPublicComplianceExportPublicationGate";

export default function OperationsAiPublicComplianceExportPublicationGate() {
  const report = buildAiPublicComplianceExportPublicationGateReport({
    publicationGateItemCount: 8,
    legalApprovalItemCount: 8,
    privacyApprovalItemCount: 8,
    publicationScopeItemCount: 7,
    redactionAttestationItemCount: 7,
    exportBoundaryItemCount: 7,
    openPublicationGapCount: 9,
    onlineReadinessScore: 84,
    complianceGateScore: 70,
    incidentHandlingScore: 70,
    auditPackageScore: 70,
    legalApprovalScore: 64,
    privacyApprovalScore: 66,
    publicationScopeScore: 66,
    publicationLeadRole: "operations public compliance export publication reviewer",
  });

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Operations · V17.0
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            AI Public Compliance Export Publication Gate
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Pannello operativo per publication gate, legal final approval, privacy final approval,
            publication scope, redaction attestation, file boundary e takedown rollback plan.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white">
          <p className="font-semibold">Endpoint protetto</p>
          <p className="mt-1 text-xs text-slate-300">
            /api/ops/ai-public-compliance-export-publication-gate-dry-run
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.publicationGateStatus}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.publicationGateScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Publication</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.publicComplianceExportPublicationAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Package write</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.publicationPackageWriteAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Findings</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.publicationFindings.length}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Publication board pack
          </h3>
          <div className="mt-3 space-y-3">
            {report.publicationBoardPack.map((item) => (
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
            <li>Publication gate ready: {report.readiness.publicComplianceExportPublicationGateReady ? "yes" : "no"}</li>
            <li>Public publication allowed: {report.readiness.publicComplianceExportPublicationAllowed ? "yes" : "no"}</li>
            <li>Public publication performed: {report.readiness.publicComplianceExportPublicationPerformed ? "yes" : "no"}</li>
            <li>Legal final approval allowed: {report.readiness.legalFinalApprovalAllowed ? "yes" : "no"}</li>
            <li>Privacy final approval allowed: {report.readiness.privacyFinalApprovalAllowed ? "yes" : "no"}</li>
            <li>Publication package write allowed: {report.readiness.publicationPackageWriteAllowed ? "yes" : "no"}</li>
            <li>Public share allowed: {report.readiness.publicShareAllowed ? "yes" : "no"}</li>
            <li>Provider called: {report.readiness.providerCalled ? "yes" : "no"}</li>
            <li>Storage activation: {report.readiness.storageActivationAllowed ? "yes" : "no"}</li>
            <li>Task created: {report.readiness.taskCreated ? "yes" : "no"}</li>
            <li>Intervention created: {report.readiness.interventionCreated ? "yes" : "no"}</li>
            <li>Automatic execution: {report.readiness.automaticExecutionAllowed ? "allowed" : "locked"}</li>
            <li>Product prescription: {report.readiness.productPrescriptionAllowed ? "allowed" : "locked"}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
