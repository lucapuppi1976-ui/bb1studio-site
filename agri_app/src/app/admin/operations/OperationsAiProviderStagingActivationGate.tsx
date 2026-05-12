import { buildAiProviderStagingActivationGateReport } from "@/lib/ai/aiProviderStagingActivationGate";

export default function OperationsAiProviderStagingActivationGate() {
  const report = buildAiProviderStagingActivationGateReport({
    runtimeBoundaryItemCount: 7,
    stagingSwitchItemCount: 7,
    registryPlanItemCount: 6,
    budgetGateItemCount: 7,
    canaryBoundaryItemCount: 6,
    failureStopItemCount: 7,
    openActivationGapCount: 8,
    onlineReadinessScore: 82,
    providerGatewayScore: 72,
    providerShadowScore: 72,
    manualConversionScore: 68,
    storageRehearsalScore: 68,
    budgetControlScore: 64,
    failureStopScore: 66,
    activationLeadRole: "operations provider staging activation reviewer",
  });

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Operations · V15.7
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            AI Provider Staging Activation Gate
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Pannello operativo per runtime boundary, staging switch plan, provider registry plan,
            budget gate, canary boundary, failure stop e production runtime lock.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white">
          <p className="font-semibold">Endpoint protetto</p>
          <p className="mt-1 text-xs text-slate-300">
            /api/ops/ai-provider-staging-activation-gate-dry-run
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.activationGateStatus}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.activationGateScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Staging</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.providerStagingActivationAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Production</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.productionRuntimeAllowed ? "YES" : "LOCKED"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Risks</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.activationRiskRegister.length}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Activation board pack
          </h3>
          <div className="mt-3 space-y-3">
            {report.activationBoardPack.map((item) => (
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
            <li>Provider AI: {report.readiness.providerAiReady ? "ready" : "locked"}</li>
            <li>Provider called: {report.readiness.providerCalled ? "yes" : "no"}</li>
            <li>Provider activation allowed: {report.readiness.providerActivationAllowed ? "yes" : "no"}</li>
            <li>Staging activation allowed: {report.readiness.providerStagingActivationAllowed ? "yes" : "no"}</li>
            <li>Production runtime allowed: {report.readiness.productionRuntimeAllowed ? "yes" : "no"}</li>
            <li>Provider registry write: {report.readiness.providerRegistryWriteAllowed ? "yes" : "no"}</li>
            <li>Case persistence allowed: {report.readiness.casePersistenceActivationAllowed ? "yes" : "no"}</li>
            <li>Review persistence allowed: {report.readiness.reviewPersistenceAllowed ? "yes" : "no"}</li>
            <li>Manual conversion allowed: {report.readiness.manualConversionAllowed ? "yes" : "no"}</li>
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
