import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { getTasks } from "@/lib/data/tasks";
import { requireUser } from "@/lib/authz";
import { getTranslations } from "@/lib/i18n/server";
import { toDateLocale } from "@/lib/i18n/config";
import { formatTaskPriority, formatTaskStatus } from "@/lib/i18n/labels";

export default async function TasksPage() {
  await requireUser();
  const { locale, t } = await getTranslations();
  const dateLocale = toDateLocale(locale);
  const tasks = await getTasks();

  return (
    <AppShell title={t.tasksPage.title} eyebrow={t.tasksPage.eyebrow}>
      {tasks.length === 0 ? (
        <div className="agri-card text-stone-600">{t.tasksPage.empty}</div>
      ) : (
        <div className="grid gap-4">
          {tasks.map((task) => (
            <Link key={task.id} href={`/tasks/${task.id}`} className="agri-card transition hover:bg-white">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800/70">{formatTaskPriority(task.priority, locale)}</p>
                  <h2 className="mt-1 text-xl font-semibold text-stone-950">{task.title}</h2>
                  <p className="mt-1 text-sm text-stone-600">{task.plant.name || task.plant.species} · {task.plant.code}</p>
                </div>
                <div className="text-sm text-stone-500">
                  <p>{new Date(task.dueDate).toLocaleDateString(dateLocale)}</p>
                  <p>{formatTaskStatus(task.status, locale)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </AppShell>
  );
}
