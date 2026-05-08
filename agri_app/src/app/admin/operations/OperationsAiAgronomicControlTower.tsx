import { buildAiAgronomicControlTowerReport } from "@/lib/ai/aiAgronomicControlTower";

export default function OperationsAiAgronomicControlTower() {
  const report = buildAiAgronomicControlTowerReport({
    activeCaseCount: 9,
    highConcernFieldCount: 4,
    evidenceGapCount: 6,
    knowledgeVaultScore: 78,
    autopilotScore: 74,
    cropProtocolScore: 79,
    boardPackScore: 77,
    digitalTwinScore: 75,
    climateWaterScore: 73,
    outbreakSentinelScore: 76,
    soilNutrientScore: 72,
    phenologyYieldScore: 69,
    harvestQualityScore: 71,
    reviewerRole: "operations control tower reviewer",
  });

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Operations · V11.0
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            AI Agronomic Control Tower & Governance Kernel
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Pannello operativo per controllare module nodes, command cards, governance gates,
            escalation paths, readiness gaps e hard-stop safety della control tower.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white">
          <p className="font-semibold">Endpoint protetto</p>
          <p className="mt-1 text-xs text-slate-300">
            /api/ops/ai-agronomic-control-tower-dry-run
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.towerStatus}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.towerScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Severity</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.overallSeverity}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Modules</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.moduleNodes.length}</p>
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
            Readiness gaps
          </h3>
          <div className="mt-3 space-y-3">
            {report.readinessGaps.map((gap) => (
              <div key={gap.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{gap.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {gap.sourceLane} · {gap.severity}
                </p>
                <p className="mt-2 text-xs font-medium text-emerald-700">
                  {gap.manualResolution}
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
