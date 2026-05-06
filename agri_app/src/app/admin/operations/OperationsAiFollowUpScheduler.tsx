export default function OperationsAiFollowUpScheduler() {
  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-follow-up-scheduler-admin="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Follow-Up Scheduler & Observation Cadence
        </p>
        <h2 className="text-xl font-semibold">Follow-up scheduler premium</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          V8.7 aggiunge un calendario dry-run per follow-up campo: cadence,
          finestre operative, reviewer queue, escalation schedule e bozze manuali.
          Nessuna automazione live.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Endpoint ops</p>
          <p className="mt-1 font-semibold">/api/ops/ai-follow-up-scheduler-dry-run</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Scheduler</p>
          <p className="mt-1 font-semibold">followUpSchedulerReady=true</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Provider AI</p>
          <p className="mt-1 font-semibold">providerAiReady=false</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Task</p>
          <p className="mt-1 font-semibold">automaticTaskCreationReady=false</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Check operativo</h3>
        <pre className="mt-3 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
          <code>npm run ops:ai-follow-up-scheduler-check</code>
        </pre>
      </div>
    </section>
  );
}
