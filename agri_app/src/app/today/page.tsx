import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { getTodayTasks } from "@/lib/data/tasks";
import { requireUser } from "@/lib/authz";

export default async function TodayPage() {
  await requireUser();
  const tasks = await getTodayTasks();

  return (
    <AppShell title="Oggi" eyebrow="Agenda giornaliera">
      {tasks.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/60">Nessun task per oggi.</div>
      ) : (
        <div className="grid gap-4">
          {tasks.map((task) => (
            <Link key={task.id} href={`/tasks/${task.id}`} className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/40">{task.status}</p>
                  <h2 className="mt-1 text-xl font-semibold">{task.title}</h2>
                  <p className="mt-1 text-sm text-white/60">{task.plant.name || task.plant.species}</p>
                </div>
                <div className="text-sm text-white/50">
                  <p>{task.assignedTo?.name || task.assignedTo?.email || "Non assegnato"}</p>
                  <p>{new Date(task.dueDate).toLocaleDateString("it-IT")}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </AppShell>
  );
}
