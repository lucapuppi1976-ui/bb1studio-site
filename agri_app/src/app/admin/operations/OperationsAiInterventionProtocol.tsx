export default function OperationsAiInterventionProtocol() {
  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-intervention-protocol-admin="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Intervention Protocol Simulator & Compliance Guard
        </p>
        <h2 className="text-xl font-semibold">Intervention protocol simulator premium</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          V8.9 aggiunge un simulatore dry-run per protocollo operativo manuale:
          step revisore/operatore/admin, compliance guard, pre-flight, briefing e audit trail.
          Nessuna automazione live.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Endpoint ops</p>
          <p className="mt-1 font-semibold">/api/ops/ai-intervention-protocol-dry-run</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Protocollo</p>
          <p className="mt-1 font-semibold">interventionProtocolReady=true</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Dispatch</p>
          <p className="mt-1 font-semibold">manualDispatchOnly=true</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Esecuzione</p>
          <p className="mt-1 font-semibold">automaticExecutionReady=false</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Check operativo</h3>
        <pre className="mt-3 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
          <code>npm run ops:ai-intervention-protocol-check</code>
        </pre>
      </div>
    </section>
  );
}
