export default function OperationsAiManualConversionAudit() {
  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-manual-conversion-audit-admin="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Manual Conversion Audit
        </p>
        <h2 className="text-xl font-semibold">Audit trail manuale</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          V7.9 aggiunge un audit trail esportabile per dimostrare che la conversione di un work
          order resta manuale, tracciata e non automatizzata.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Endpoint ops</p>
          <p className="mt-1 font-semibold">/api/ops/ai-manual-conversion-audit-dry-run</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Audit mode</p>
          <p className="mt-1 font-semibold">dry-run only</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">DB persistence</p>
          <p className="mt-1 font-semibold">dbPersistenceAllowed=false</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Automation</p>
          <p className="mt-1 font-semibold">automaticExecutionAllowed=false</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Check operativo</h3>
        <pre className="mt-3 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
          <code>npm run ops:ai-manual-conversion-audit-check</code>
        </pre>
      </div>
    </section>
  );
}
