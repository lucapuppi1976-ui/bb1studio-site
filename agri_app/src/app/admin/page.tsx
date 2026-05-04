import Link from "next/link";

const adminLinks = [
  {
    title: "Operations Center",
    href: "/admin/operations",
    description: "Runbook visuale, controlli live, release gate secret-safe e comandi operativi.",
    primary: true,
  },
  {
    title: "System Cockpit",
    href: "/admin/system",
    description: "Preflight, stato ambiente, email, cron e qualità ricorrenze.",
    primary: false,
  },
  {
    title: "Utenti e ruoli",
    href: "/admin/users",
    description: "Gestione accessi, ruoli e permessi.",
    primary: false,
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    description: "Riepilogo operativo applicativo.",
    primary: false,
  },
  {
    title: "Centro notifiche",
    href: "/notifications",
    description: "Avvisi in-app e notifiche operative.",
    primary: false,
  },
  {
    title: "Programmazioni ricorrenti",
    href: "/recurring-tasks",
    description: "Template, generazioni e storico ricorrenze.",
    primary: false,
  },
];

export default function AdminHubPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8">
      <header className="flex flex-col gap-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Admin Hub
        </p>
        <h1 className="text-3xl font-bold tracking-tight">Centro amministrazione Agri App</h1>
        <p className="max-w-3xl text-muted-foreground">
          Accesso rapido alle aree amministrative e operative principali. Per i controlli
          di rilascio usa l’Operations Center.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {adminLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-2xl border p-5 shadow-sm transition hover:bg-muted"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
              {item.primary ? (
                <span className="rounded-full border px-2 py-1 text-xs font-semibold uppercase">
                  Ops
                </span>
              ) : null}
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
