export default function OperationsAiInterventionReadiness() {
  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-intervention-readiness-admin="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Intervention Readiness Matrix & Manual Approval Board
        </p>
        <h2 className="text-xl font-semibold">Intervention readiness premium</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          V8.8 aggiunge una matrice dry-run per readiness intervento: approval board,
          decision gates, blocker summary, checklist materiale e pacchetto di conversione
          solo manuale. Nessuna automazione live.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Endpoint ops</p>
          <p className="mt-1 font-semibold">/api/ops/ai-intervention-readiness-dry-run</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Readiness</p>
          <p className="mt-1 font-semibold">interventionReadinessReady=true</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Conversione</p>
          <p className="mt-1 font-semibold">manualConversionOnly=true</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Task/Interventi</p>
          <p className="mt-1 font-semibold">automaticTaskCreationReady=false</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Check operativo</h3>
        <pre className="mt-3 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
          <code>npm run ops:ai-intervention-readiness-check</code>
        </pre>
      </div>
    </section>
  );
}
