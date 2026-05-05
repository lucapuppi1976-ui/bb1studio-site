export default function OperationsAiPhotoAnnotation() {
  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-photo-annotation-admin="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Photo Symptom Annotation
        </p>
        <h2 className="text-xl font-semibold">Mappa sintomi fotografica AI-ready</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          V7.2 aggiunge annotazioni sintomi strutturate: regioni normalizzate, tessuto colpito,
          severità, distribuzione, segni visibili e prompt hints. È un dry-run locale senza provider
          AI, senza salvataggio DB e senza task automatici.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Endpoint ops</p>
          <p className="mt-1 font-semibold">/api/ops/ai-photo-annotation-dry-run</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Output</p>
          <p className="mt-1 font-semibold">annotationFingerprint</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Evidence</p>
          <p className="mt-1 font-semibold">aiEvidenceMap</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Safety</p>
          <p className="mt-1 font-semibold">allowedToExecute=false</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Check operativo</h3>
        <pre className="mt-3 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
          <code>npm run ops:ai-photo-annotation-check</code>
        </pre>
      </div>
    </section>
  );
}
