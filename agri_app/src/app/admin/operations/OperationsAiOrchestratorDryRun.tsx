export default function OperationsAiOrchestratorDryRun() {
  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-orchestrator-dry-run-admin="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Diagnosis Orchestrator Dry Run
        </p>
        <h2 className="text-xl font-semibold">Orchestratore diagnosi AI dry-run</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          V7.0 collega bundle evidenze, request preview, risposta sintetica, validazione, blocco
          operativo e revisione umana. È un dry-run completo: nessuna chiamata AI live e nessun dato
          persistito.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Endpoint ops</p>
          <p className="mt-1 font-semibold">/api/ops/ai-diagnosis-orchestrator-dry-run</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Provider</p>
          <p className="mt-1 font-semibold">providerCalled=false</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Persistenza</p>
          <p className="mt-1 font-semibold">persistencePerformed=false</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Esecuzione</p>
          <p className="mt-1 font-semibold">allowedToExecute=false</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Check operativo</h3>
        <pre className="mt-3 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
          <code>npm run ops:ai-orchestrator-dry-run-check</code>
        </pre>
      </div>
    </section>
  );
}
