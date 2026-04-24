import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { getTaskById } from "@/lib/data/tasks";
import { markTaskDone } from "@/lib/actions/tasks";
import { requireUser, isSuperAdmin } from "@/lib/authz";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TaskDetailPage({ params }: Props) {
  const session = await requireUser();
  const { id } = await params;
  const task = await getTaskById(id);

  if (!task) notFound();

  return (
    <AppShell
      title={task.title}
      eyebrow={task.status}
      actions={
        <>
          <form action={markTaskDone.bind(null, task.id)}>
            <button className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-neutral-950">
              Segna completato
            </button>
          </form>
          <Link href={`/tasks/${task.id}/propose`} className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-white/70">
            Proponi follow-up
          </Link>
          {isSuperAdmin(session.user.role) ? (
            <Link href={`/tasks/${task.id}/edit`} className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-white/70">
              Modifica
            </Link>
          ) : null}
        </>
      }
    >
      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-semibold">Dettagli task</h2>
          <div className="mt-4 grid gap-2 text-sm text-white/70">
            <p>Pianta: {task.plant.name || task.plant.species}</p>
            <p>Priorità: {task.priority}</p>
            <p>Scadenza: {new Date(task.dueDate).toLocaleDateString("it-IT")}</p>
            <p>Assegnato a: {task.assignedTo?.name || task.assignedTo?.email || "—"}</p>
            <p>Creato da: {task.createdBy?.name || task.createdBy?.email || "—"}</p>
            <p>Completato: {task.completedAt ? new Date(task.completedAt).toLocaleString("it-IT") : "—"}</p>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-semibold">Descrizione</h2>
          <p className="mt-4 text-sm text-white/70">{task.description || "—"}</p>
          <h3 className="mt-6 text-lg font-semibold">Note</h3>
          <p className="mt-4 text-sm text-white/70">{task.notes || "—"}</p>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-2">
          <h2 className="text-lg font-semibold">Proposte collegate</h2>
          {task.proposals.length === 0 ? (
            <p className="mt-4 text-sm text-white/50">Nessuna proposta.</p>
          ) : (
            <div className="mt-4 grid gap-3">
              {task.proposals.map((proposal) => (
                <article key={proposal.id} className="rounded-xl border border-white/10 p-4">
                  <p className="text-xs uppercase tracking-wide text-white/40">{proposal.status}</p>
                  <p className="mt-1 font-semibold">{proposal.title}</p>
                  <p className="mt-1 text-sm text-white/60">
                    {proposal.type} • {new Date(proposal.scheduledFor).toLocaleDateString("it-IT")}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}
