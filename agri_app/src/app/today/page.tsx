import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { getTodayAgendaForUser } from "@/lib/data/tasks";
import { getUnreadNotificationsCount } from "@/lib/data/notifications";
import { requireUser } from "@/lib/authz";
import { routes } from "@/lib/app-routes";

function startOfToday() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  return start;
}

export default async function TodayPage() {
  const session = await requireUser();

  const [tasks, unreadCount] = await Promise.all([
    getTodayAgendaForUser(session.user.id, session.user.role),
    getUnreadNotificationsCount(session.user.id),
  ]);

  const todayStart = startOfToday();
  const overdue = tasks.filter((task) => new Date(task.dueDate) < todayStart);
  const today = tasks.filter((task) => new Date(task.dueDate) >= todayStart);

  return (
    <AppShell
      title="Oggi"
      eyebrow="Agenda operativa"
      actions={
        <Link
          href={routes.notifications}
          className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-white/70"
        >
          Notifiche ({unreadCount})
        </Link>
      }
    >
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-white/50">Task da gestire</p>
          <p className="mt-2 text-4xl font-bold text-white">{tasks.length}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-white/50">Scaduti</p>
          <p className="mt-2 text-4xl font-bold text-white">{overdue.length}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-white/50">Notifiche non lette</p>
          <p className="mt-2 text-4xl font-bold text-white">{unreadCount}</p>
        </div>
      </div>

      {overdue.length > 0 ? (
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-white">Task scaduti</h2>
          <div className="grid gap-4">
            {overdue.map((task) => (
              <Link
                key={task.id}
                href={`/tasks/${task.id}`}
                className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 transition hover:bg-amber-500/10"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-white/40">
                      {task.status}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-white">{task.title}</h3>
                    <p className="mt-1 text-sm text-white/60">
                      {task.plant.name || task.plant.species}
                    </p>
                  </div>
                  <div className="text-sm text-white/50">
                    <p>{new Date(task.dueDate).toLocaleDateString("it-IT")}</p>
                    <p>{task.assignedTo?.name || task.assignedTo?.email || "Non assegnato"}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section>
        <h2 className="mb-4 text-xl font-semibold text-white">Task di oggi</h2>

        {today.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/60">
            Nessun task per oggi.
          </div>
        ) : (
          <div className="grid gap-4">
            {today.map((task) => (
              <Link
                key={task.id}
                href={`/tasks/${task.id}`}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-white/40">
                      {task.status}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-white">{task.title}</h3>
                    <p className="mt-1 text-sm text-white/60">
                      {task.plant.name || task.plant.species}
                    </p>
                  </div>
                  <div className="text-sm text-white/50">
                    <p>{new Date(task.dueDate).toLocaleDateString("it-IT")}</p>
                    <p>{task.assignedTo?.name || task.assignedTo?.email || "Non assegnato"}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </AppShell>
  );
}
