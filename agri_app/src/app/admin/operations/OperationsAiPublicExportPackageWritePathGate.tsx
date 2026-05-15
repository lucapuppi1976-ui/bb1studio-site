import { buildAiPublicExportPackageWritePathGateReport } from "@/lib/ai/aiPublicExportPackageWritePathGate";

export default function OperationsAiPublicExportPackageWritePathGate() {
  const report = buildAiPublicExportPackageWritePathGateReport({
    packageGateItemCount: 8,
    legalPrivacyApprovalItemCount: 8,
    artifactBoundaryItemCount: 8,
    publicationBoundaryItemCount: 7,
    retentionItemCount: 7,
    accessControlItemCount: 7,
    openPackageWriteGapCount: 9,
    onlineReadinessScore: 84,
    publicationGateScore: 70,
    incidentWriteGateScore: 70,
    legalApprovalScore: 64,
    privacyApprovalScore: 66,
    artifactBoundaryScore: 68,
    retentionScore: 66,
    packageWriteLeadRole: "operations public export package write reviewer",
  });

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Operations · V17.4
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            AI Public Export Package Write Path Gate
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Pannello operativo per package write gate, legal/privacy approval lock,
            artifact boundary, publication package boundary, retention board e rollback package plan.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white">
          <p className="font-semibold">Endpoint protetto</p>
          <p className="mt-1 text-xs text-slate-300">
            /api/ops/ai-public-export-package-write-path-gate-dry-run
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.packageWriteStatus}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.packageWriteScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Package write</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.publicExportPackageWriteAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Artifact write</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.publicExportArtifactWriteAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Findings</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.packageWriteFindings.length}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Package write board pack
          </h3>
          <div className="mt-3 space-y-3">
            {report.packageWriteBoardPack.map((item) => (
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
            <li>Package write gate ready: {report.readiness.publicExportPackageWritePathGateReady ? "yes" : "no"}</li>
            <li>Public export package write allowed: {report.readiness.publicExportPackageWriteAllowed ? "yes" : "no"}</li>
            <li>Artifact write allowed: {report.readiness.publicExportArtifactWriteAllowed ? "yes" : "no"}</li>
            <li>Publication package write allowed: {report.readiness.publicationPackageWriteAllowed ? "yes" : "no"}</li>
            <li>Retention write allowed: {report.readiness.exportRetentionWriteAllowed ? "yes" : "no"}</li>
            <li>Access control write allowed: {report.readiness.exportAccessControlWriteAllowed ? "yes" : "no"}</li>
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
