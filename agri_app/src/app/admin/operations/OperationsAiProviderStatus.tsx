export default function OperationsAiProviderStatus() {
  const items = [
    {
      title: "Endpoint operativo protetto",
      value: "/api/ops/ai-provider-status",
      description: "Disponibile solo con segreto operativo e output redatto.",
    },
    {
      title: "Provider reale",
      value: "disabled",
      description: "Nessuna chiamata esterna viene eseguita in questa release.",
    },
    {
      title: "Revisione umana",
      value: "obbligatoria",
      description: "Ogni diagnosi resta assistiva e richiede conferma umana.",
    },
  ];

  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-provider-ops-status="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Provider Ops Status
        </p>
        <h2 className="text-xl font-semibold">Stato operativo provider AI</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          V6.2 aggiunge un controllo server-side protetto per verificare readiness e guardrail AI
          senza attivare provider reali, senza salvare dati e senza creare attività automatiche.
        </p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <div key={item.title} className="rounded-xl border p-4">
            <p className="text-sm text-muted-foreground">{item.title}</p>
            <p className="mt-1 text-lg font-semibold">{item.value}</p>
            <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Comando verifica</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Usare il check operativo dedicato. Il valore del CRON_SECRET non va mai incollato in chat
          e non deve comparire nei log.
        </p>
        <pre className="mt-3 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
          <code>npm run ops:ai-provider-status-check -- --base https://bb1studio.com/agri_app --include-live</code>
        </pre>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Guardrail attivi</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>providerCallsEnabled=false</li>
          <li>clientProviderCallsAllowed=false</li>
          <li>persistenceAllowed=false</li>
          <li>automaticTaskCreationAllowed=false</li>
          <li>humanReviewRequired=true</li>
        </ul>
      </div>
    </section>
  );
}
