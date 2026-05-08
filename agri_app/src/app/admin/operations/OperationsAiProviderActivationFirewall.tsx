import { buildAiProviderActivationFirewallReport } from "@/lib/ai/aiProviderActivationFirewall";

export default function OperationsAiProviderActivationFirewall() {
  const report = buildAiProviderActivationFirewallReport({
    activeCaseCount: 9,
    pendingProviderReviewCount: 5,
    unresolvedSafetyItemCount: 6,
    unresolvedEvidenceGapCount: 6,
    controlTowerScore: 74,
    explainabilityLedgerScore: 75,
    compliancePassportScore: 72,
    decisionAssuranceScore: 70,
    scenarioStressScore: 68,
    improvementScorecardScore: 71,
    redactionReviewScore: 76,
    payloadMinimizationScore: 73,
    runtimeGuardScore: 78,
    reviewerConfidenceScore: 74,
    reviewerRole: "operations provider activation reviewer",
  });

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Operations · V12.0
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            AI Provider Activation Firewall
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Pannello operativo per controllare activation gates, payload minimization,
            runtime firewall, rollout stages, rollback plan e approval board senza attivare provider.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white">
          <p className="font-semibold">Endpoint protetto</p>
          <p className="mt-1 text-xs text-slate-300">
            /api/ops/ai-provider-activation-firewall-dry-run
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.firewallStatus}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.firewallScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Severity</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.overallSeverity}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Gaps</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.firewallGaps.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Provider</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">
            {report.readiness.providerCalled ? "ON" : "OFF"}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Manual approval questions
          </h3>
          <div className="mt-3 space-y-3">
            {report.manualApprovalQuestions.map((question) => (
              <div key={question.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{question.question}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {question.priority} · {question.reviewer}
                </p>
                <p className="mt-2 text-xs font-medium text-emerald-700">
                  {question.safeOutcome}
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
            <li>Persistence: {report.readiness.persistenceReady ? "ready" : "locked"}</li>
            <li>Memory persistence: {report.readiness.memoryPersistenceAllowed ? "allowed" : "locked"}</li>
            <li>Task creation: {report.readiness.automaticTaskCreationAllowed ? "allowed" : "locked"}</li>
            <li>Intervention creation: {report.readiness.automaticInterventionCreationAllowed ? "allowed" : "locked"}</li>
            <li>Automatic execution: {report.readiness.automaticExecutionAllowed ? "allowed" : "locked"}</li>
            <li>Product prescription: {report.readiness.productPrescriptionAllowed ? "allowed" : "locked"}</li>
            <li>Dosage advice: {report.readiness.dosageAdviceAllowed ? "allowed" : "locked"}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
