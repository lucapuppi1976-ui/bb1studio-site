import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { getTodayAgendaForUser } from "@/lib/data/tasks";
import { getUnreadNotificationsCount } from "@/lib/data/notifications";
import { requireUser } from "@/lib/authz";
import { routes } from "@/lib/app-routes";
import { getTranslations } from "@/lib/i18n/server";
import { toDateLocale } from "@/lib/i18n/config";
import { formatTaskStatus } from "@/lib/i18n/labels";

function startOfToday() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  return start;
}

export default async function TodayPage() {
  const session = await requireUser();
  const { locale, t } = await getTranslations();
  const dateLocale = toDateLocale(locale);

  const [tasks, unreadCount] = await Promise.all([
    getTodayAgendaForUser(session.user.id, session.user.role),
    getUnreadNotificationsCount(session.user.id),
  ]);

  const todayStart = startOfToday();
  const overdue = tasks.filter((task) => new Date(task.dueDate) < todayStart);
  const today = tasks.filter((task) => new Date(task.dueDate) >= todayStart);

  const renderTask = (task: (typeof tasks)[number], tone: "amber" | "white") => (
    <Link key={task.id} href={`/tasks/${task.id}`} className={tone === "amber" ? "rounded-[1.75rem] border border-amber-200 bg-amber-50/95 p-5 text-stone-950 shadow-sm transition hover:bg-amber-50" : "agri-card transition hover:bg-white"}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800/70">{formatTaskStatus(task.status, locale)}</p>
          <h3 className="mt-1 text-lg font-semibold text-stone-950">{task.title}</h3>
          <p className="mt-1 text-sm text-stone-600">{task.plant.name || task.plant.species}</p>
        </div>
        <div className="text-sm text-stone-500">
          <p>{new Date(task.dueDate).toLocaleDateString(dateLocale)}</p>
          <p>{task.assignedTo?.name || task.assignedTo?.email || t.common.notAssigned}</p>
        </div>
      </div>
    </Link>
  );

  return (
    <AppShell title={t.todayPage.title} eyebrow={t.todayPage.eyebrow} actions={<Link href={routes.notifications} className="agri-button-secondary">{t.todayPage.notices} ({unreadCount})</Link>}>
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="agri-card"><p className="text-sm font-medium text-stone-500">{t.todayPage.tasksToManage}</p><p className="mt-2 text-4xl font-semibold tracking-tight text-emerald-950">{tasks.length}</p></div>
        <div className="agri-card"><p className="text-sm font-medium text-stone-500">{t.todayPage.overdue}</p><p className="mt-2 text-4xl font-semibold tracking-tight text-emerald-950">{overdue.length}</p></div>
        <div className="agri-card"><p className="text-sm font-medium text-stone-500">{t.todayPage.unreadNotices}</p><p className="mt-2 text-4xl font-semibold tracking-tight text-emerald-950">{unreadCount}</p></div>
      </div>

      {overdue.length > 0 ? (
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-white">{t.todayPage.overdueTitle}</h2>
          <div className="grid gap-4">{overdue.map((task) => renderTask(task, "amber"))}</div>
        </section>
      ) : null}

      <section>
        <h2 className="mb-4 text-xl font-semibold text-white">{t.todayPage.todayTitle}</h2>
        {today.length === 0 ? <div className="agri-card text-stone-600">{t.todayPage.emptyToday}</div> : <div className="grid gap-4">{today.map((task) => renderTask(task, "white"))}</div>}
      </section>
    </AppShell>
  );
}
