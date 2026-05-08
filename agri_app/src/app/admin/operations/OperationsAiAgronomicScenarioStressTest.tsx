import { buildAiAgronomicScenarioStressTestReport } from "@/lib/ai/aiAgronomicScenarioStressTest";

export default function OperationsAiAgronomicScenarioStressTest() {
  const report = buildAiAgronomicScenarioStressTestReport({
    activeCaseCount: 9,
    pendingDecisionCount: 5,
    highConcernFieldCount: 4,
    openEvidenceGapCount: 6,
    controlTowerScore: 72,
    explainabilityLedgerScore: 74,
    compliancePassportScore: 70,
    decisionAssuranceScore: 68,
    climateWaterScore: 73,
    biosecurityScore: 76,
    soilNutrientScore: 72,
    phenologyScore: 69,
    harvestQualityScore: 71,
    reviewerConfidenceScore: 73,
    reviewerRole: "operations scenario stress test reviewer",
  });

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Operations · V11.4
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            AI Agronomic Scenario Stress Test
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Pannello operativo per controllare scenario nodes, failure modes, resilience gates,
            war room drills, rollback playbook, evidence chain e hard-stop safety.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white">
          <p className="font-semibold">Endpoint protetto</p>
          <p className="mt-1 text-xs text-slate-300">
            /api/ops/ai-agronomic-scenario-stress-test-dry-run
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.stressTestStatus}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.stressTestScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Severity</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.overallSeverity}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Failure modes</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.failureModes.length}</p>
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
            Resilience gates
          </h3>
          <div className="mt-3 space-y-3">
            {report.resilienceGates.map((gate) => (
              <div key={gate.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{gate.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {gate.lane} · {gate.severity} · {gate.passed ? "passed" : "review"}
                </p>
                <p className="mt-2 text-xs font-medium text-emerald-700">
                  {gate.hardStop}
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
