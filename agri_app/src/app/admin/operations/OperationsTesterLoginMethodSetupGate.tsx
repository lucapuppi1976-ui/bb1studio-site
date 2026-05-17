import { buildTesterLoginMethodSetupReport } from "@/lib/ops/testerLoginMethodSetupGate";

export default function OperationsTesterLoginMethodSetupGate() {
  const report = buildTesterLoginMethodSetupReport();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
        Operations · V20.0
      </p>
      <h2 className="mt-2 text-xl font-bold text-slate-950">
        Tester Login Method Setup Gate
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
        Discovery protetta e read-only per scegliere password setup, magic link o OAuth.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Decision</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.decision}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.setupScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Password</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.authDiscovery.credentialsProviderDetected ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Magic link</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.authDiscovery.magicLinkDetected ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">OAuth</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.authDiscovery.oauthProviderDetected ? "YES" : "NO"}
          </p>
        </div>
      </div>
    </section>
  );
}
