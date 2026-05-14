import { buildAiManualDispatchActivationGateReport } from "@/lib/ai/aiManualDispatchActivationGate";

export default function OperationsAiManualDispatchActivationGate() {
  const report = buildAiManualDispatchActivationGateReport({
    dispatchGateItemCount: 8,
    operatorApprovalItemCount: 8,
    agronomicSafetyItemCount: 7,
    conversionBoundaryItemCount: 7,
    reviewerSignoffItemCount: 7,
    rollbackDispatchItemCount: 7,
    openDispatchGapCount: 9,
    onlineReadinessScore: 84,
    operationsCockpitScore: 70,
    complianceExportScore: 70,
    incidentBoardScore: 70,
    operatorApprovalScore: 66,
    safetyChecklistScore: 66,
    conversionBoundaryScore: 68,
    dispatchLeadRole: "operations manual dispatch activation reviewer",
  });

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Operations · V16.7
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            AI Manual Dispatch Activation Gate
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Pannello operativo per dispatch activation gate, operator approval board,
            agronomic safety checklist, work conversion boundary, reviewer signoff e dispatch no-go.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white">
          <p className="font-semibold">Endpoint protetto</p>
          <p className="mt-1 text-xs text-slate-300">
            /api/ops/ai-manual-dispatch-activation-gate-dry-run
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.dispatchGateStatus}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.dispatchGateScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Dispatch</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.manualDispatchActivationAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Ticket write</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.dispatchTicketWriteAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Findings</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.dispatchFindings.length}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Dispatch board pack
          </h3>
          <div className="mt-3 space-y-3">
            {report.dispatchBoardPack.map((item) => (
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
            <li>Dispatch gate ready: {report.readiness.manualDispatchActivationGateReady ? "yes" : "no"}</li>
            <li>Manual dispatch allowed: {report.readiness.manualDispatchActivationAllowed ? "yes" : "no"}</li>
            <li>Manual dispatch performed: {report.readiness.manualDispatchActivationPerformed ? "yes" : "no"}</li>
            <li>Operational approval allowed: {report.readiness.operationalApprovalAllowed ? "yes" : "no"}</li>
            <li>Dispatch ticket write allowed: {report.readiness.dispatchTicketWriteAllowed ? "yes" : "no"}</li>
            <li>Work order dispatch allowed: {report.readiness.workOrderDispatchAllowed ? "yes" : "no"}</li>
            <li>Dispatch notification allowed: {report.readiness.dispatchNotificationAllowed ? "yes" : "no"}</li>
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
