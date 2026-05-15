import { buildAiManualDispatchWritePathGateReport } from "@/lib/ai/aiManualDispatchWritePathGate";

export default function OperationsAiManualDispatchWritePathGate() {
  const report = buildAiManualDispatchWritePathGateReport({
    writeGateItemCount: 8,
    taskApprovalItemCount: 8,
    interventionApprovalItemCount: 8,
    workBoundaryItemCount: 7,
    operatorAttestationItemCount: 7,
    rollbackWriteItemCount: 7,
    openWritePathGapCount: 9,
    onlineReadinessScore: 84,
    manualDispatchGateScore: 70,
    publicationGateScore: 70,
    incidentHandlingScore: 70,
    taskApprovalScore: 66,
    interventionApprovalScore: 66,
    workBoundaryScore: 68,
    writeLeadRole: "operations manual dispatch write path reviewer",
  });

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Operations · V17.1
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            AI Manual Dispatch Write Path Gate
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Pannello operativo per dispatch write path gate, task write approval,
            intervention write approval, work order boundary, operator attestation e rollback write plan.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white">
          <p className="font-semibold">Endpoint protetto</p>
          <p className="mt-1 text-xs text-slate-300">
            /api/ops/ai-manual-dispatch-write-path-gate-dry-run
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.writePathStatus}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.writePathScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Write path</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.manualDispatchWritePathAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Task write</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.taskWriteApprovalAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Findings</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.writeFindings.length}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Write board pack
          </h3>
          <div className="mt-3 space-y-3">
            {report.writeBoardPack.map((item) => (
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
            <li>Write path gate ready: {report.readiness.manualDispatchWritePathGateReady ? "yes" : "no"}</li>
            <li>Manual dispatch write path allowed: {report.readiness.manualDispatchWritePathAllowed ? "yes" : "no"}</li>
            <li>Dispatch draft write allowed: {report.readiness.dispatchDraftWriteAllowed ? "yes" : "no"}</li>
            <li>Dispatch ticket write allowed: {report.readiness.dispatchTicketWriteAllowed ? "yes" : "no"}</li>
            <li>Task write approval allowed: {report.readiness.taskWriteApprovalAllowed ? "yes" : "no"}</li>
            <li>Intervention write approval allowed: {report.readiness.interventionWriteApprovalAllowed ? "yes" : "no"}</li>
            <li>Work order persistence allowed: {report.readiness.workOrderPersistenceAllowed ? "yes" : "no"}</li>
            <li>Task created: {report.readiness.taskCreated ? "yes" : "no"}</li>
            <li>Intervention created: {report.readiness.interventionCreated ? "yes" : "no"}</li>
            <li>Automatic execution: {report.readiness.automaticExecutionAllowed ? "allowed" : "locked"}</li>
            <li>Product prescription: {report.readiness.productPrescriptionAllowed ? "allowed" : "locked"}</li>
            <li>Dosage advice: {report.readiness.dosageAdviceAllowed ? "allowed" : "locked"}</li>
            <li>Provider called: {report.readiness.providerCalled ? "yes" : "no"}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
