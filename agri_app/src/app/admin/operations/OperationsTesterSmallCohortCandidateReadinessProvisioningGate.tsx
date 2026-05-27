import { buildTesterSmallCohortCandidateReadinessProvisioningReport } from "@/lib/ops/testerSmallCohortCandidateReadinessProvisioningGate";

export default function OperationsTesterSmallCohortCandidateReadinessProvisioningGate() {
  const report = buildTesterSmallCohortCandidateReadinessProvisioningReport();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
        Operations · V21.6
      </p>
      <h2 className="mt-2 text-xl font-bold text-slate-950">
        Small-Cohort Candidate Readiness & Provisioning Gate
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
        Readiness candidati e provisioning plan senza account write, password write, inviti o signup pubblico.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Decision</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.decision}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Safety</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.safetyScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Account write</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.accountWriteAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Invite email</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.inviteEmailSendAllowed ? "YES" : "NO"}
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
