import { buildAiOperationalExecutionGateReport } from "@/lib/ai/aiOperationalExecutionGate";

export default function OperationsAiOperationalExecutionGate() {
  const report = buildAiOperationalExecutionGateReport({
    executionGateItemCount: 8,
    humanApprovalItemCount: 8,
    preflightBoundaryItemCount: 8,
    commandBoundaryItemCount: 8,
    notificationBoundaryItemCount: 7,
    emergencyStopItemCount: 7,
    openExecutionGapCount: 9,
    onlineReadinessScore: 84,
    creationGateScore: 70,
    providerCallGateScore: 70,
    artifactGateScore: 70,
    humanApprovalScore: 66,
    commandBoundaryScore: 68,
    emergencyStopScore: 66,
    executionLeadRole: "operations operational execution reviewer",
  });

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Operations · V17.9
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            AI Operational Execution Gate
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Pannello operativo per execution gate, explicit human approval, preflight boundary,
            command boundary, notification boundary, emergency stop board e rollback execution plan.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white">
          <p className="font-semibold">Endpoint protetto</p>
          <p className="mt-1 text-xs text-slate-300">
            /api/ops/ai-operational-execution-gate-dry-run
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.executionStatus}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.executionScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Execution</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.operationalExecutionAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Command</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.executionCommandAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Findings</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.executionFindings.length}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Execution board pack
          </h3>
          <div className="mt-3 space-y-3">
            {report.executionBoardPack.map((item) => (
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
            <li>Execution gate ready: {report.readiness.operationalExecutionGateReady ? "yes" : "no"}</li>
            <li>Operational execution allowed: {report.readiness.operationalExecutionAllowed ? "yes" : "no"}</li>
            <li>Human approval allowed: {report.readiness.humanExecutionApprovalAllowed ? "yes" : "no"}</li>
            <li>Execution preflight allowed: {report.readiness.executionPreflightAllowed ? "yes" : "no"}</li>
            <li>Execution command allowed: {report.readiness.executionCommandAllowed ? "yes" : "no"}</li>
            <li>Execution notification allowed: {report.readiness.executionNotificationAllowed ? "yes" : "no"}</li>
            <li>Emergency stop configured: {report.readiness.emergencyStopConfigured ? "yes" : "no"}</li>
            <li>Provider called: {report.readiness.providerCalled ? "yes" : "no"}</li>
            <li>Task created: {report.readiness.taskCreated ? "yes" : "no"}</li>
            <li>Intervention created: {report.readiness.interventionCreated ? "yes" : "no"}</li>
            <li>Automatic execution: {report.readiness.automaticExecutionAllowed ? "allowed" : "locked"}</li>
            <li>Product prescription: {report.readiness.productPrescriptionAllowed ? "allowed" : "locked"}</li>
            <li>Dosage advice: {report.readiness.dosageAdviceAllowed ? "allowed" : "locked"}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
