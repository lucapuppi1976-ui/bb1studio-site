import { buildAiProviderRuntimeCanaryExecutionReport } from "@/lib/ai/aiProviderRuntimeCanaryExecution";

export default function OperationsAiProviderRuntimeCanaryExecution() {
  const report = buildAiProviderRuntimeCanaryExecutionReport({
    canaryGateItemCount: 8,
    zeroCallLockItemCount: 8,
    caseCriteriaItemCount: 7,
    budgetEnvelopeItemCount: 7,
    reviewerApprovalItemCount: 7,
    resultBoundaryItemCount: 7,
    openCanaryGapCount: 9,
    onlineReadinessScore: 84,
    stagedProviderScore: 70,
    manualDispatchScore: 70,
    incidentBoardScore: 70,
    providerContractScore: 66,
    budgetEnvelopeScore: 64,
    reviewerApprovalScore: 68,
    canaryLeadRole: "operations provider runtime canary reviewer",
  });

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Operations · V16.8
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            AI Provider Runtime Canary Execution
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Pannello operativo per canary execution gate, provider zero-call lock,
            case criteria, budget envelope, reviewer approval e provider result boundary.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white">
          <p className="font-semibold">Endpoint protetto</p>
          <p className="mt-1 text-xs text-slate-300">
            /api/ops/ai-provider-runtime-canary-execution-dry-run
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.canaryGateStatus}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.canaryGateScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Canary call</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.providerCanaryCallAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Provider called</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.providerCalled ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Findings</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.canaryFindings.length}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Canary board pack
          </h3>
          <div className="mt-3 space-y-3">
            {report.canaryBoardPack.map((item) => (
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
            <li>Canary gate ready: {report.readiness.providerRuntimeCanaryExecutionGateReady ? "yes" : "no"}</li>
            <li>Provider runtime canary allowed: {report.readiness.providerRuntimeCanaryAllowed ? "yes" : "no"}</li>
            <li>Provider canary call allowed: {report.readiness.providerCanaryCallAllowed ? "yes" : "no"}</li>
            <li>Canary execution allowed: {report.readiness.canaryExecutionAllowed ? "yes" : "no"}</li>
            <li>Provider called: {report.readiness.providerCalled ? "yes" : "no"}</li>
            <li>Provider call allowed: {report.readiness.providerCallAllowed ? "yes" : "no"}</li>
            <li>Canary result persistence: {report.readiness.canaryResultPersistenceAllowed ? "yes" : "no"}</li>
            <li>Storage activation: {report.readiness.storageActivationAllowed ? "yes" : "no"}</li>
            <li>Review persistence: {report.readiness.reviewPersistenceAllowed ? "yes" : "no"}</li>
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
