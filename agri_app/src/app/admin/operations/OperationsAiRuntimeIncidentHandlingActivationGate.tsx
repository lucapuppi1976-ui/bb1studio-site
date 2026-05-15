import { buildAiRuntimeIncidentHandlingActivationGateReport } from "@/lib/ai/aiRuntimeIncidentHandlingActivationGate";

export default function OperationsAiRuntimeIncidentHandlingActivationGate() {
  const report = buildAiRuntimeIncidentHandlingActivationGateReport({
    handlingGateItemCount: 8,
    incidentWriteApprovalItemCount: 8,
    operatorNotificationItemCount: 7,
    escalationBoardItemCount: 7,
    providerBoundaryItemCount: 7,
    closureChecklistItemCount: 7,
    openHandlingGapCount: 9,
    onlineReadinessScore: 84,
    incidentResponseScore: 70,
    providerCanaryScore: 70,
    manualDispatchScore: 70,
    writeApprovalScore: 66,
    escalationScore: 64,
    closureScore: 66,
    handlingLeadRole: "operations runtime incident handling reviewer",
  });

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Operations · V16.9
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            AI Runtime Incident Handling Activation Gate
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Pannello operativo per incident handling gate, write approval lock, operator notification boundary,
            escalation board, provider incident boundary, rollback plan e closure checklist.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white">
          <p className="font-semibold">Endpoint protetto</p>
          <p className="mt-1 text-xs text-slate-300">
            /api/ops/ai-runtime-incident-handling-activation-gate-dry-run
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.handlingGateStatus}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.handlingGateScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Handling</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.incidentHandlingAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Write</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.incidentWriteAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Findings</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.handlingFindings.length}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Handling board pack
          </h3>
          <div className="mt-3 space-y-3">
            {report.handlingBoardPack.map((item) => (
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
            <li>Handling gate ready: {report.readiness.runtimeIncidentHandlingGateReady ? "yes" : "no"}</li>
            <li>Incident handling allowed: {report.readiness.incidentHandlingAllowed ? "yes" : "no"}</li>
            <li>Incident handling performed: {report.readiness.incidentHandlingPerformed ? "yes" : "no"}</li>
            <li>Incident write allowed: {report.readiness.incidentWriteAllowed ? "yes" : "no"}</li>
            <li>Incident escalation allowed: {report.readiness.incidentEscalationAllowed ? "yes" : "no"}</li>
            <li>Incident closure allowed: {report.readiness.incidentClosureAllowed ? "yes" : "no"}</li>
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
