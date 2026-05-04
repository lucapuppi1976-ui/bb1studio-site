import Link from "next/link";

const flowSteps = [
  {
    title: "1. Controllo rapido",
    text: "Esegui la checklist standard per verificare ambiente DEV, stato live pubblico, runbook e copertura ops.",
  },
  {
    title: "2. Controllo protetto",
    text: "Quando serve validare endpoint protetti, usa CRON_SECRET_VALUE da ambiente e poi rimuovilo dalla shell.",
  },
  {
    title: "3. Release gate",
    text: "Prima del merge live usa il release gate secret-safe e conserva rollback branch e tag checkpoint.",
  },
];

const monitoredRoutes = [
  {
    route: "/admin",
    purpose: "Admin Hub",
    expected: "200 oppure redirect 302/307/308",
  },
  {
    route: "/admin/operations",
    purpose: "Operations Center",
    expected: "200 oppure redirect 302/307/308",
  },
  {
    route: "/admin/system",
    purpose: "System Cockpit",
    expected: "200 oppure redirect 302/307/308",
  },
];

const commandCards = [
  {
    title: "Quick check standard",
    command: "npm run ops:quick-check -- --expect-branch checkpoint/live-stable",
  },
  {
    title: "Route admin live",
    command: "npm run ops:admin-live-routes-check",
  },
  {
    title: "Copertura checklist",
    command: "npm run ops:quick-coverage-check",
  },
  {
    title: "Release gate protetto",
    command: "npm run ops:release-gate:live",
  },
];

export default function OperationsUxPolish() {
  return (
    <section className="grid gap-5" data-operations-ux-polish="true">
      <article className="rounded-2xl border p-5 shadow-sm">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Operations UX polish
          </p>
          <h2 className="text-xl font-semibold">Percorso operativo consigliato</h2>
          <p className="max-w-3xl text-sm text-muted-foreground">
            Sequenza compatta per validare lo stato operativo senza mutazioni DB e senza inserire
            valori sensibili nella UI.
          </p>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {flowSteps.map((step) => (
            <div key={step.title} className="rounded-xl border p-4">
              <h3 className="font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </div>
      </article>

      <article className="rounded-2xl border p-5 shadow-sm">
        <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Route admin monitorate</h2>
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
              Le route admin possono rispondere con HTTP 307 quando la sessione richiede redirect
              di autenticazione. Questo è uno stato atteso.
            </p>
          </div>
          <Link
            className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-muted"
            href="/admin"
          >
            Apri Admin Hub
          </Link>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {monitoredRoutes.map((item) => (
            <div key={item.route} className="rounded-xl border p-4">
              <p className="font-mono text-sm font-semibold">{item.route}</p>
              <p className="mt-2 text-sm">{item.purpose}</p>
              <p className="mt-2 text-xs text-muted-foreground">{item.expected}</p>
            </div>
          ))}
        </div>
      </article>

      <article className="rounded-2xl border p-5 shadow-sm">
        <h2 className="text-xl font-semibold">Comandi essenziali</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Copia dal runbook quando devi eseguire i comandi. Questa pagina mostra solo riferimenti
          non sensibili.
        </p>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {commandCards.map((item) => (
            <div key={item.title} className="rounded-xl border p-4">
              <p className="font-semibold">{item.title}</p>
              <pre className="mt-3 overflow-x-auto rounded-lg border bg-black p-3 text-xs text-white">
                <code>{item.command}</code>
              </pre>
            </div>
          ))}
        </div>
      </article>

      <article className="rounded-2xl border p-5 shadow-sm">
        <h2 className="text-xl font-semibold">Note sicurezza</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <p className="rounded-xl border p-4 text-sm text-muted-foreground">
            Non passare valori sensibili come argomenti da riga di comando. Usa variabili ambiente
            temporanee e rimuovile dopo il controllo.
          </p>
          <p className="rounded-xl border p-4 text-sm text-muted-foreground">
            Mantieni email live disattivate finché non viene pianificato un test controllato.
            ENABLE_EMAIL_NOTIFICATIONS deve restare false.
          </p>
        </div>
      </article>
    </section>
  );
}
