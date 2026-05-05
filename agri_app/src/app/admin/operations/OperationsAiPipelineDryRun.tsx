export default function OperationsAiPipelineDryRun() {
  const steps = [
    "Input diagnosi foto",
    "Provider request dry-run",
    "Response contract validation",
    "Bozza diagnosi",
    "Piano d’azione",
    "Pacchetto revisione umana",
  ];

  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-diagnosis-pipeline-dry-run="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Diagnosis Pipeline Dry-Run
        </p>
        <h2 className="text-xl font-semibold">Pipeline AI end-to-end simulata</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          V6.5 collega intake, provider request, response contract, bozza diagnosi, piano d’azione e
          revisione umana in un’unica pipeline dry-run protetta. Nessuna chiamata provider, nessun
          salvataggio e nessuna automazione operativa vengono eseguiti.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Endpoint</p>
          <p className="mt-1 font-semibold">/api/ops/ai-diagnosis-pipeline-dry-run</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Provider reale</p>
          <p className="mt-1 font-semibold">externalProviderCalled=false</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Human review</p>
          <p className="mt-1 font-semibold">humanReviewRequired=true</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Persistenza</p>
          <p className="mt-1 font-semibold">persistenceAllowed=false</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Task automatici</p>
          <p className="mt-1 font-semibold">automaticTaskCreationAllowed=false</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Interventi automatici</p>
          <p className="mt-1 font-semibold">automaticInterventionCreationAllowed=false</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Step pipeline</h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
          {steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Check operativo</h3>
        <pre className="mt-3 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
          <code>npm run ops:ai-pipeline-dry-run-check</code>
        </pre>
      </div>
    </section>
  );
}
