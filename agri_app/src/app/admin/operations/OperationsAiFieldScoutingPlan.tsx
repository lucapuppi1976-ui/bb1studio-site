export default function OperationsAiFieldScoutingPlan() {
  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-field-scouting-plan-admin="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Field Scouting Plan & Sampling Grid
        </p>
        <h2 className="text-xl font-semibold">Scouting plan premium</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          V8.5 trasforma il caso fotografico in un piano dry-run di scouting campo:
          zone prioritarie, sampling grid, percorso operativo, protocollo foto e
          checklist revisore. Nessuna automazione live.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Endpoint ops</p>
          <p className="mt-1 font-semibold">/api/ops/ai-field-scouting-plan-dry-run</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Sampling grid</p>
          <p className="mt-1 font-semibold">samplingGridReady=true</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Provider AI</p>
          <p className="mt-1 font-semibold">providerAiReady=false</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Human review</p>
          <p className="mt-1 font-semibold">humanReviewRequired=true</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Check operativo</h3>
        <pre className="mt-3 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
          <code>npm run ops:ai-field-scouting-plan-check</code>
        </pre>
      </div>
    </section>
  );
}
