export default function OperationsAiEvidenceBundle() {
  const items = [
    "Foto dettaglio sintomo",
    "Foto pianta intera",
    "Foto pagina inferiore foglia",
    "Contesto campo o serra",
    "Sintomi dichiarati",
    "Quality gate per foto",
    "Payload futuro provider-ready",
  ];

  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-photo-evidence-bundle-admin="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Photo Evidence Bundle
        </p>
        <h2 className="text-xl font-semibold">Bundle evidenze fotografiche</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          V6.7 struttura le foto e il contesto in un pacchetto evidenze controllato. Il bundle prepara
          la futura richiesta AI senza chiamare provider, senza persistere dati e senza creare attività
          automatiche.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Endpoint ops</p>
          <p className="mt-1 font-semibold">/api/ops/ai-photo-evidence-bundle</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Provider reale</p>
          <p className="mt-1 font-semibold">externalProviderCalled=false</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Human review</p>
          <p className="mt-1 font-semibold">humanReviewRequired=true</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Componenti bundle</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Check operativo</h3>
        <pre className="mt-3 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
          <code>npm run ops:ai-evidence-bundle-check</code>
        </pre>
      </div>
    </section>
  );
}
