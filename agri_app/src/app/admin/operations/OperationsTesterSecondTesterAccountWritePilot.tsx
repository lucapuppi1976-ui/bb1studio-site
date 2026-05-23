import { buildTesterSecondTesterAccountWritePilotReport } from "@/lib/ops/testerSecondTesterAccountWritePilot";

export default function OperationsTesterSecondTesterAccountWritePilot() {
  const report = buildTesterSecondTesterAccountWritePilotReport();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
        Operations · V20.9
      </p>
      <h2 className="mt-2 text-xl font-bold text-slate-950">
        Protected Second Tester Account Write Pilot
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
        Creazione protetta di un solo secondo tester, separata da password setup e inviti.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Decision</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.decision}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.pilotStatus}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Invite email</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.inviteEmailSendAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Public signup</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.publicSignupAllowed ? "YES" : "NO"}
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
