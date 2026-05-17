import { buildAiTesterAccountCreationCompatibilityReport } from "@/lib/ai/aiTesterAccountCreationCompatibility";

export default function OperationsAiTesterAccountCreationCompatibility() {
  const report = buildAiTesterAccountCreationCompatibilityReport();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Operations · V19.4
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            Tester Account Creation Compatibility
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Gate operativo dry-run per schema discovery, auth model compatibility,
            role/language mapping e account write boundary.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white">
          <p className="font-semibold">Endpoint protetto</p>
          <p className="mt-1 text-xs text-slate-300">
            /api/ops/ai-tester-account-creation-compatibility-dry-run
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.compatibilityStatus}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.compatibilityScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Email field</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.context.emailFieldDetected ? "YES" : "NO"}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Role field</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.context.roleFieldDetected ? "YES" : "NO"}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Language field</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.context.languageFieldDetected ? "YES" : "NO"}</p>
        </div>
      </div>
    </section>
  );
}
