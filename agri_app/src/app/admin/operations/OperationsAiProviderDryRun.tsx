export default function OperationsAiProviderDryRun() {
  const rows = [
    ["Endpoint", "/api/ops/ai-provider-dry-run"],
    ["Modalità", "dry-run"],
    ["Provider reale", "non chiamato"],
    ["Persistenza DB", "non consentita"],
    ["Creazione automatica", "non consentita"],
    ["Revisione umana", "obbligatoria"],
  ];

  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-provider-dry-run-adapter="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Provider Dry-Run Adapter
        </p>
        <h2 className="text-xl font-semibold">Adapter server-side simulato</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          V6.3 introduce il primo adapter operativo server-side per preparare il provider AI reale.
          L’endpoint è protetto, lavora in dry-run, non chiama servizi esterni, non salva dati e non
          crea attività o interventi automatici.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {rows.map(([label, value]) => (
          <div key={label} className="rounded-xl border p-4">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-1 font-semibold">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Contratto dry-run</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>Input JSON con contesto pianta, sintomi, gravità e note operatore.</li>
          <li>Output strutturato simulato con richiesta provider e risultato dry-run.</li>
          <li>externalProviderCalled=false.</li>
          <li>providerCallsEnabled=false.</li>
          <li>humanReviewRequired=true.</li>
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Check operativo</h3>
        <pre className="mt-3 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
          <code>npm run ops:ai-provider-dry-run-check</code>
        </pre>
      </div>
    </section>
  );
}
