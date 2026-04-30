import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { getTodayAgendaForUser } from "@/lib/data/tasks";
import { getUnreadNotificationsCount } from "@/lib/data/notifications";
import { markTaskDone } from "@/lib/actions/tasks";
import { requireUser } from "@/lib/authz";
import { routes } from "@/lib/app-routes";
import { getTranslations } from "@/lib/i18n/server";
import { toDateLocale } from "@/lib/i18n/config";
import { formatTaskStatus } from "@/lib/i18n/labels";
import { getTasksWorkflowText } from "@/lib/i18n/tasks-workflow";

function startOfToday() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  return start;
}

export default async function TodayPage() {
  const session = await requireUser();
  const { locale, t } = await getTranslations();
  const wf = getTasksWorkflowText(locale);
  const dateLocale = toDateLocale(locale);

  const [tasks, unreadCount] = await Promise.all([
    getTodayAgendaForUser(session.user.id, session.user.role),
    getUnreadNotificationsCount(session.user.id),
  ]);

  const todayStart = startOfToday();
  const overdue = tasks.filter((task) => new Date(task.dueDate) < todayStart);
  const today = tasks.filter((task) => new Date(task.dueDate) >= todayStart);

  const renderTask = (task: (typeof tasks)[number], tone: "amber" | "white") => (
    <article key={task.id} className={tone === "amber" ? "rounded-[1.35rem] border border-amber-200 bg-amber-50/95 p-4 text-stone-950 shadow-sm ring-1 ring-amber-100 sm:p-5" : "agri-card"}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-900">
              {formatTaskStatus(task.status, locale)}
            </span>
            {tone === "amber" ? <span className="rounded-full bg-amber-200 px-3 py-1 text-xs font-semibold text-amber-950">{wf.card.overdue}</span> : <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900">{wf.card.dueToday}</span>}
          </div>
          <h3 className="mt-3 text-lg font-semibold leading-tight text-stone-950">{task.title}</h3>
          <p className="mt-1 text-sm text-stone-600">{task.plant.name || task.plant.species}</p>
          <div className="mt-3 grid gap-1 text-sm text-stone-600 sm:grid-cols-2">
            <p><span className="font-semibold text-stone-800">{wf.card.due}:</span> {new Date(task.dueDate).toLocaleDateString(dateLocale)}</p>
            <p><span className="font-semibold text-stone-800">{wf.card.responsible}:</span> {task.assignedTo?.name || task.assignedTo?.email || t.common.notAssigned}</p>
          </div>
        </div>

        <div className="grid gap-2 sm:min-w-36">
          <Link href={`/tasks/${task.id}`} className="agri-button-secondary">{wf.today.open}</Link>
          <form action={markTaskDone.bind(null, task.id)}>
            <button type="submit" className="agri-button-primary">{wf.today.complete}</button>
          </form>
        </div>
      </div>
    </article>
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
