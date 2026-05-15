import { buildAiIncidentRecordWriteGateReport } from "@/lib/ai/aiIncidentRecordWriteGate";

export default function OperationsAiIncidentRecordWriteGate() {
  const report = buildAiIncidentRecordWriteGateReport({
    recordGateItemCount: 8,
    governanceApprovalItemCount: 8,
    timelineBoundaryItemCount: 8,
    auditBoundaryItemCount: 8,
    retentionBoundaryItemCount: 7,
    closureEligibilityItemCount: 7,
    openRecordWriteGapCount: 9,
    onlineReadinessScore: 84,
    incidentWriteGateScore: 70,
    providerCallGateScore: 70,
    creationGateScore: 70,
    governanceApprovalScore: 66,
    auditBoundaryScore: 68,
    closureEligibilityScore: 66,
    recordWriteLeadRole: "operations incident record write reviewer",
  });

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Operations · V17.7
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            AI Incident Record Write Gate
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Pannello operativo per incident record write gate, governance final approval,
            timeline boundary, audit boundary, retention boundary, closure eligibility e rollback record plan.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white">
          <p className="font-semibold">Endpoint protetto</p>
          <p className="mt-1 text-xs text-slate-300">
            /api/ops/ai-incident-record-write-gate-dry-run
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.recordWriteStatus}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.recordWriteScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Record write</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.incidentRecordWriteAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Timeline write</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.incidentTimelineWriteAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Findings</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.incidentRecordFindings.length}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Incident record board pack
          </h3>
          <div className="mt-3 space-y-3">
            {report.incidentRecordBoardPack.map((item) => (
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
            <li>Record write gate ready: {report.readiness.incidentRecordWriteGateReady ? "yes" : "no"}</li>
            <li>Record write allowed: {report.readiness.incidentRecordWriteAllowed ? "yes" : "no"}</li>
            <li>Timeline write allowed: {report.readiness.incidentTimelineWriteAllowed ? "yes" : "no"}</li>
            <li>Audit write allowed: {report.readiness.incidentAuditWriteAllowed ? "yes" : "no"}</li>
            <li>Retention write allowed: {report.readiness.incidentRetentionWriteAllowed ? "yes" : "no"}</li>
            <li>Closure eligibility write allowed: {report.readiness.incidentClosureEligibilityWriteAllowed ? "yes" : "no"}</li>
            <li>Governance final approval allowed: {report.readiness.incidentGovernanceFinalApprovalAllowed ? "yes" : "no"}</li>
            <li>Provider called: {report.readiness.providerCalled ? "yes" : "no"}</li>
            <li>Storage activation: {report.readiness.storageActivationAllowed ? "yes" : "no"}</li>
            <li>Task created: {report.readiness.taskCreated ? "yes" : "no"}</li>
            <li>Intervention created: {report.readiness.interventionCreated ? "yes" : "no"}</li>
            <li>Automatic execution: {report.readiness.automaticExecutionAllowed ? "allowed" : "locked"}</li>
            <li>Public share: {report.readiness.publicShareAllowed ? "allowed" : "locked"}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
