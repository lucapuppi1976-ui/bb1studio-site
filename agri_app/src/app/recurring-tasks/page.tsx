import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { getRecurringTemplates } from "@/lib/data/recurring-tasks";
import { generateRecurringTasksNow, toggleRecurringTaskTemplate } from "@/lib/actions/recurring-tasks";
import { requireSuperAdmin } from "@/lib/authz";
import { routes } from "@/lib/app-routes";

type PageProps = {
  searchParams?: Promise<{
    generated?: string | string[] | undefined;
    skipped?: string | string[] | undefined;
  }>;
};

function one(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function formatDate(value: Date) {
  return new Date(value).toLocaleDateString("it-IT");
}

export default async function RecurringTasksPage({ searchParams }: PageProps) {
  await requireSuperAdmin();
  const templates = await getRecurringTemplates();
  const params = searchParams ? await searchParams : undefined;
  const generated = one(params?.generated);
  const skipped = one(params?.skipped);

  const activeCount = templates.filter((t) => t.active).length;
  const pausedCount = templates.length - activeCount;

  return (
    <AppShell
      title="Task ricorrenti"
      eyebrow="Template operativi"
      actions={
        <>
          <Link
            href={routes.plants}
            className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-white/70"
          >
            Vai alle piante
          </Link>
          <form action={generateRecurringTasksNow}>
            <button className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-neutral-950">
              Genera ora
            </button>
          </form>
        </>
      }
    >
      {generated || skipped ? (
        <div className="mb-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-200">
          Generazione completata. Creati: {generated || 0}. Saltati: {skipped || 0}.
        </div>
      ) : null}

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-white/50">Template totali</p>
          <p className="mt-2 text-4xl font-bold text-white">{templates.length}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-white/50">Attivi</p>
          <p className="mt-2 text-4xl font-bold text-white">{activeCount}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-white/50">In pausa</p>
          <p className="mt-2 text-4xl font-bold text-white">{pausedCount}</p>
        </div>
      </div>

      {templates.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/60">
          Nessun template ricorrente creato. Apri una pianta e usa “Task ricorrente”.
        </div>
      ) : (
        <div className="grid gap-4">
          {templates.map((template) => (
            <article key={template.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/40">
                    {template.active ? "ATTIVO" : "IN PAUSA"} • {template.recurrenceType}
                    {template.recurrenceType === "EVERY_X_DAYS" ? ` (${template.intervalDays} giorni)` : ""}
                  </p>
                  <h2 className="mt-1 text-xl font-semibold text-white">{template.title}</h2>
                  <p className="mt-1 text-sm text-white/60">
                    {template.plant.name || template.plant.species}
                  </p>
                  <p className="mt-2 text-sm text-white/70">
                    Prossima data: {formatDate(template.nextDueDate)}
                  </p>
                  <p className="mt-1 text-sm text-white/50">
                    Assegnato a: {template.assignedTo?.name || template.assignedTo?.email || "Non assegnato"}
                  </p>
                  {template.tasks.length > 0 ? (
                    <p className="mt-1 text-sm text-white/50">
                      Ultimo task generato: {formatDate(template.tasks[0].dueDate)}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/plants/${template.plantId}`}
                    className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-white/70"
                  >
                    Pianta
                  </Link>
                  <form action={toggleRecurringTaskTemplate.bind(null, template.id)}>
                    <button className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-neutral-950">
                      {template.active ? "Metti in pausa" : "Riattiva"}
                    </button>
                  </form>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </AppShell>
  );
}
