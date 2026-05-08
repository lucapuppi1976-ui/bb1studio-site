import { buildAiClimateWaterStrategyReport } from "@/lib/ai/aiClimateWaterStrategy";

export default function OperationsAiClimateWaterStrategy() {
  const report = buildAiClimateWaterStrategyReport({
    cropPortfolio: ["tomato", "vineyard", "citrus", "olive"],
    fieldCount: 8,
    highRiskFieldCount: 3,
    activeCaseCount: 7,
    evidenceGapCount: 5,
    heatStressRiskScore: 76,
    waterStressRiskScore: 81,
    irrigationReadinessScore: 66,
    soilMoistureEvidenceScore: 58,
    scoutingCoverageScore: 72,
    protocolCoverageScore: 79,
    twinReadinessScore: 74,
    boardPackScore: 76,
    reviewerRole: "operations climate resilience reviewer",
  });

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Operations · V10.5
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            AI Climate Resilience & Water Strategy Simulator
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Pannello operativo per controllare climate risk zones, readiness irrigua,
            scenari idrici, evidence gaps, governance stops e blocchi safety.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white">
          <p className="font-semibold">Endpoint protetto</p>
          <p className="mt-1 text-xs text-slate-300">
            /api/ops/ai-climate-water-strategy-dry-run
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.strategyStatus}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.strategyScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Risk</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.farmClimateRiskTier}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Scenarios</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.waterScenarios.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Execution</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">
            {report.readiness.automaticExecutionAllowed ? "ON" : "OFF"}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Strategy readiness lanes
          </h3>
          <div className="mt-3 space-y-3">
            {report.strategyLanes.map((lane) => (
              <div key={lane.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{lane.lane}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {lane.readinessBand} · priority {lane.priority} · score {lane.readinessScore}/100
                </p>
                <p className="mt-2 text-xs font-medium text-emerald-700">
                  {lane.hardStops.join(" · ")}
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
            <li>Persistence: {report.readiness.persistenceReady ? "ready" : "locked"}</li>
            <li>Memory persistence: {report.readiness.memoryPersistenceAllowed ? "allowed" : "locked"}</li>
            <li>Task creation: {report.readiness.automaticTaskCreationAllowed ? "allowed" : "locked"}</li>
            <li>Intervention creation: {report.readiness.automaticInterventionCreationAllowed ? "allowed" : "locked"}</li>
            <li>Automatic execution: {report.readiness.automaticExecutionAllowed ? "allowed" : "locked"}</li>
            <li>Product prescription: {report.readiness.productPrescriptionAllowed ? "allowed" : "locked"}</li>
            <li>Dosage advice: {report.readiness.dosageAdviceAllowed ? "allowed" : "locked"}</li>
            <li>Public share: {report.readiness.publicShareAllowed ? "allowed" : "locked"}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
