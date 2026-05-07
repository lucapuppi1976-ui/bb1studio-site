export default function OperationsAiCaseOutcomeLearning() {
  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-case-outcome-learning-admin="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Case Outcome Learning Loop & Memory Update Draft
        </p>
        <h2 className="text-xl font-semibold">Case Outcome Learning premium</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          V9.7 aggiunge learning loop locale da outcome osservato: timeline, matrice
          raccomandazione/esito, lesson cards, memory update draft, drift signals e briefing.
          Dry-run only, nessuna memoria persistente DB.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Endpoint ops</p>
          <p className="mt-1 font-semibold">/api/ops/ai-case-outcome-learning-dry-run</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Learning</p>
          <p className="mt-1 font-semibold">caseOutcomeLearningReady=true</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Memory draft</p>
          <p className="mt-1 font-semibold">memoryUpdateDraftsReady=true</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Persistenza</p>
          <p className="mt-1 font-semibold">memoryPersistenceReady=false</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Check operativo</h3>
        <pre className="mt-3 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
          <code>npm run ops:ai-case-outcome-learning-check</code>
        </pre>
      </div>
    </section>
  );
}
