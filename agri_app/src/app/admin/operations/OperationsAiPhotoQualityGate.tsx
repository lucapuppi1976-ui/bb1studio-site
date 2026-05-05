export default function OperationsAiPhotoQualityGate() {
  const signals = [
    "Formato immagine supportato",
    "Peso file entro limite",
    "Risoluzione sufficiente",
    "Foto ravvicinata del sintomo",
    "Foto della pianta intera",
    "Foto pagina inferiore foglia",
    "Contesto pianta e sintomi",
  ];

  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-photo-quality-gate-admin="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Photo Quality Gate
        </p>
        <h2 className="text-xl font-semibold">Filtro qualità foto pre-diagnosi</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          V6.6 introduce il controllo qualità del materiale fotografico prima della pipeline AI. Il
          gate riduce diagnosi deboli causate da foto piccole, fuori contesto o senza sintomi
          descritti.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Endpoint ops</p>
          <p className="mt-1 font-semibold">/api/ops/ai-photo-quality-gate</p>
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
        <h3 className="font-semibold">Segnali valutati</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          {signals.map((signal) => (
            <li key={signal}>{signal}</li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Check operativo</h3>
        <pre className="mt-3 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
          <code>npm run ops:ai-photo-quality-gate-check</code>
        </pre>
      </div>
    </section>
  );
}
