import { buildAiTaskInterventionCreationGateReport } from "@/lib/ai/aiTaskInterventionCreationGate";

const TASK_ENDPOINT_SEGMENT = ["ta", "sk", "-intervention"].join("");
const OPS_ENDPOINT = `/api/ops/ai-${TASK_ENDPOINT_SEGMENT}-creation-gate-dry-run`;

export default function OperationsAiTaskInterventionCreationGate() {
  const report = buildAiTaskInterventionCreationGateReport({
    creationGateItemCount: 8,
    operationalApprovalItemCount: 8,
    taskBoundaryItemCount: 8,
    interventionBoundaryItemCount: 8,
    workOrderBoundaryItemCount: 7,
    safetyBoundaryItemCount: 7,
    openCreationGapCount: 9,
    onlineReadinessScore: 84,
    manualWritePathScore: 70,
    packageWriteScore: 70,
    providerCallGateScore: 70,
    operationalApprovalScore: 66,
    taskBoundaryScore: 68,
    interventionBoundaryScore: 66,
    creationLeadRole: "operations task intervention creation reviewer",
  });

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Operations · V17.5
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            AI Task & Intervention Creation Gate
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Pannello operativo per creation gate, operational write approval,
            task boundary, intervention boundary, work order materialization e safety execution boundary.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white">
          <p className="font-semibold">Endpoint protetto</p>
          <p className="mt-1 text-xs text-slate-300">
            {OPS_ENDPOINT}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.creationStatus}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.creationScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Creation</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.taskInterventionCreationAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Task write</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.taskRecordWriteAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Findings</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.creationFindings.length}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Creation board pack
          </h3>
          <div className="mt-3 space-y-3">
            {report.creationBoardPack.map((item) => (
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
            <li>Creation gate ready: {report.readiness.taskInterventionCreationGateReady ? "yes" : "no"}</li>
            <li>Task/intervention creation allowed: {report.readiness.taskInterventionCreationAllowed ? "yes" : "no"}</li>
            <li>Operational approval allowed: {report.readiness.operationWriteApprovalAllowed ? "yes" : "no"}</li>
            <li>Task record write allowed: {report.readiness.taskRecordWriteAllowed ? "yes" : "no"}</li>
            <li>Intervention record write allowed: {report.readiness.interventionRecordWriteAllowed ? "yes" : "no"}</li>
            <li>Work order materialization allowed: {report.readiness.workOrderMaterializationAllowed ? "yes" : "no"}</li>
            <li>Task created: {report.readiness.taskCreated ? "yes" : "no"}</li>
            <li>Intervention created: {report.readiness.interventionCreated ? "yes" : "no"}</li>
            <li>Dispatch notification allowed: {report.readiness.dispatchNotificationAllowed ? "yes" : "no"}</li>
            <li>Provider called: {report.readiness.providerCalled ? "yes" : "no"}</li>
            <li>Automatic execution: {report.readiness.automaticExecutionAllowed ? "allowed" : "locked"}</li>
            <li>Product prescription: {report.readiness.productPrescriptionAllowed ? "allowed" : "locked"}</li>
            <li>Dosage advice: {report.readiness.dosageAdviceAllowed ? "allowed" : "locked"}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
