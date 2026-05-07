export default function OperationsAiResponsePortfolioOptimizer() {
  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-response-portfolio-admin="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Strategic Response Portfolio Optimizer
        </p>
        <h2 className="text-xl font-semibold">Response Portfolio Optimizer premium</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          V9.4 aggiunge ottimizzazione portafoglio decisionale: scenari, allocazione priorità,
          risorse, trade-off, decision board, briefing e export redatto. Dry-run only.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Endpoint ops</p>
          <p className="mt-1 font-semibold">/api/ops/ai-response-portfolio-dry-run</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Portfolio</p>
          <p className="mt-1 font-semibold">responsePortfolioReady=true</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Decision board</p>
          <p className="mt-1 font-semibold">decisionBoardReady=true</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Automazioni</p>
          <p className="mt-1 font-semibold">automaticExecutionReady=false</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Check operativo</h3>
        <pre className="mt-3 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
          <code>npm run ops:ai-response-portfolio-check</code>
        </pre>
      </div>
    </section>
  );
}
