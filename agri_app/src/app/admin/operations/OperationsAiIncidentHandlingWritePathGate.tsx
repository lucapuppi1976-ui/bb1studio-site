import { buildAiIncidentHandlingWritePathGateReport } from "@/lib/ai/aiIncidentHandlingWritePathGate";

export default function OperationsAiIncidentHandlingWritePathGate() {
  const report = buildAiIncidentHandlingWritePathGateReport({
    writeGateItemCount: 8,
    governanceApprovalItemCount: 8,
    recordBoundaryItemCount: 8,
    escalationBoundaryItemCount: 7,
    closureBoundaryItemCount: 7,
    notificationBoundaryItemCount: 7,
    openIncidentWriteGapCount: 9,
    onlineReadinessScore: 84,
    incidentHandlingGateScore: 70,
    providerCallGateScore: 70,
    manualWritePathScore: 70,
    governanceApprovalScore: 66,
    recordBoundaryScore: 68,
    closureReadinessScore: 66,
    incidentWriteLeadRole: "operations incident handling write path reviewer",
  });

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Operations · V17.3
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            AI Incident Handling Write Path Gate
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Pannello operativo per incident write path gate, governance approval lock,
            record boundary, escalation boundary, closure boundary e rollback incident write plan.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white">
          <p className="font-semibold">Endpoint protetto</p>
          <p className="mt-1 text-xs text-slate-300">
            /api/ops/ai-incident-handling-write-path-gate-dry-run
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.incidentWritePathStatus}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.incidentWritePathScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Write path</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.incidentHandlingWritePathAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Record write</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.incidentRecordWriteAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Findings</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.incidentWriteFindings.length}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Incident write board pack
          </h3>
          <div className="mt-3 space-y-3">
            {report.incidentWriteBoardPack.map((item) => (
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
            <li>Incident write gate ready: {report.readiness.incidentHandlingWritePathGateReady ? "yes" : "no"}</li>
            <li>Incident write path allowed: {report.readiness.incidentHandlingWritePathAllowed ? "yes" : "no"}</li>
            <li>Governance approval allowed: {report.readiness.incidentGovernanceApprovalAllowed ? "yes" : "no"}</li>
            <li>Incident record write allowed: {report.readiness.incidentRecordWriteAllowed ? "yes" : "no"}</li>
            <li>Incident escalation write allowed: {report.readiness.incidentEscalationWriteAllowed ? "yes" : "no"}</li>
            <li>Incident closure write allowed: {report.readiness.incidentClosureWriteAllowed ? "yes" : "no"}</li>
            <li>Incident notification allowed: {report.readiness.incidentNotificationAllowed ? "yes" : "no"}</li>
            <li>Provider called: {report.readiness.providerCalled ? "yes" : "no"}</li>
            <li>Provider call allowed: {report.readiness.providerCallAllowed ? "yes" : "no"}</li>
            <li>Storage activation: {report.readiness.storageActivationAllowed ? "yes" : "no"}</li>
            <li>Task created: {report.readiness.taskCreated ? "yes" : "no"}</li>
            <li>Intervention created: {report.readiness.interventionCreated ? "yes" : "no"}</li>
            <li>Automatic execution: {report.readiness.automaticExecutionAllowed ? "allowed" : "locked"}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
