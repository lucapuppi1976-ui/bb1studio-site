import { buildAiProviderCanaryCallExecutionGateReport } from "@/lib/ai/aiProviderCanaryCallExecutionGate";

export default function OperationsAiProviderCanaryCallExecutionGate() {
  const report = buildAiProviderCanaryCallExecutionGateReport({
    callGateItemCount: 8,
    providerApprovalItemCount: 8,
    requestBoundaryItemCount: 8,
    budgetEnvelopeItemCount: 7,
    reviewerApprovalItemCount: 7,
    resultBoundaryItemCount: 7,
    openCallGapCount: 9,
    onlineReadinessScore: 84,
    canaryExecutionScore: 70,
    manualWritePathScore: 70,
    incidentHandlingScore: 70,
    providerContractScore: 66,
    budgetEnvelopeScore: 64,
    reviewerApprovalScore: 68,
    providerLeadRole: "operations provider canary call execution reviewer",
  });

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Operations · V17.2
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            AI Provider Canary Call Execution Gate
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Pannello operativo per provider call gate, explicit provider approval,
            request boundary, budget envelope, reviewer approval, result boundary e rollback call plan.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white">
          <p className="font-semibold">Endpoint protetto</p>
          <p className="mt-1 text-xs text-slate-300">
            /api/ops/ai-provider-canary-call-execution-gate-dry-run
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.providerCallStatus}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.providerCallScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Call execution</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.providerCanaryCallExecutionAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Request send</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.providerRequestSendAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Findings</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.providerCallFindings.length}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Provider call board pack
          </h3>
          <div className="mt-3 space-y-3">
            {report.providerCallBoardPack.map((item) => (
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
            <li>Provider call gate ready: {report.readiness.providerCanaryCallExecutionGateReady ? "yes" : "no"}</li>
            <li>Provider call execution allowed: {report.readiness.providerCanaryCallExecutionAllowed ? "yes" : "no"}</li>
            <li>Explicit provider approval allowed: {report.readiness.explicitProviderApprovalAllowed ? "yes" : "no"}</li>
            <li>Provider request send allowed: {report.readiness.providerRequestSendAllowed ? "yes" : "no"}</li>
            <li>Provider result review allowed: {report.readiness.providerResultReviewAllowed ? "yes" : "no"}</li>
            <li>Provider called: {report.readiness.providerCalled ? "yes" : "no"}</li>
            <li>Provider call allowed: {report.readiness.providerCallAllowed ? "yes" : "no"}</li>
            <li>Result persistence: {report.readiness.canaryResultPersistenceAllowed ? "yes" : "no"}</li>
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
