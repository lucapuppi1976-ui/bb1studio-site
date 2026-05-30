import { buildTesterSmallCohortLoginSessionOnboardingReport } from "@/lib/ops/testerSmallCohortLoginSessionOnboardingGate";

export default function OperationsTesterSmallCohortLoginSessionOnboardingGate() {
  const report = buildTesterSmallCohortLoginSessionOnboardingReport();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
        Operations · V21.9
      </p>
      <h2 className="mt-2 text-xl font-bold text-slate-950">
        Small-Cohort Login Session & Manual Onboarding Gate
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
        Verifica login/sessione coorte, onboarding manuale e safety locks prima dello scenario pack.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Decision</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.decision}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Access</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.candidateAccessScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Password write</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.passwordWriteAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Account write</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.accountWriteAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">AI provider</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.providerCalled ? "YES" : "NO"}
          </p>
        </div>
      </div>
    </section>
  );
}
