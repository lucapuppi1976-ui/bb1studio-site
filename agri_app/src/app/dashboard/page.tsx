import Link from "next/link";
import { PlantStatus, TaskStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/authz";
import { AppShell } from "@/components/app-shell";
import { routes } from "@/lib/app-routes";
import { getTranslations } from "@/lib/i18n/server";
import { toDateLocale } from "@/lib/i18n/config";
import { formatInterventionType, formatTaskPriority, formatTaskStatus } from "@/lib/i18n/labels";
import { getDashboardReportsText } from "@/lib/i18n/dashboard-reports";

function startOfToday() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  return start;
}

function startOfTomorrow(today: Date) {
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
}

function minusDays(days: number) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}

export default async function DashboardPage() {
  const session = await requireUser();
  const { locale, t } = await getTranslations();
  const copy = getDashboardReportsText(locale);
  const dateLocale = toDateLocale(locale);
  const todayStart = startOfToday();
  const tomorrowStart = startOfTomorrow(todayStart);
  const thirtyDaysAgo = minusDays(30);

  const openStatus = [TaskStatus.SCHEDULED, TaskStatus.NOTIFIED];

  const [
    plants,
    activePlants,
    interventions,
    recentInterventionsCount,
    tasks,
    openTasks,
    todayTasks,
    overdueTasks,
    completedTasks,
    notifications,
    urgentTasks,
    plantsToWatch,
    recentInterventions,
  ] = await Promise.all([
    prisma.plant.count(),
    prisma.plant.count({ where: { status: PlantStatus.ACTIVE } }),
    prisma.intervention.count(),
    prisma.intervention.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.task.count(),
    prisma.task.count({ where: { status: { in: openStatus } } }),
    prisma.task.count({
      where: {
        status: { in: openStatus },
        dueDate: { gte: todayStart, lt: tomorrowStart },
      },
    }),
    prisma.task.count({
      where: {
        status: { in: openStatus },
        dueDate: { lt: todayStart },
      },
    }),
    prisma.task.count({ where: { status: TaskStatus.DONE } }),
    prisma.appNotification.count({ where: { userId: session.user.id, readAt: null } }),
    prisma.task.findMany({
      where: { status: { in: openStatus } },
      include: { plant: true, assignedTo: true },
      orderBy: [{ dueDate: "asc" }, { createdAt: "desc" }],
      take: 5,
    }),
    prisma.plant.findMany({
      where: {
        status: PlantStatus.ACTIVE,
        tasks: { some: { status: { in: openStatus } } },
      },
      select: {
        id: true,
        code: true,
        name: true,
        species: true,
        tasks: {
          where: { status: { in: openStatus } },
          orderBy: { dueDate: "asc" },
          take: 3,
          select: { id: true, title: true, dueDate: true, status: true },
        },
      },
      orderBy: { updatedAt: "desc" },
      take: 4,
    }),
    prisma.intervention.findMany({
      include: { plant: true },
      orderBy: { createdAt: "desc" },
      take: 4,
    }),
  ]);

  const mainCards = [
    { label: copy.dashboard.stats.openTasks, value: openTasks, href: `${routes.tasks}?scope=open`, tone: "default" },
    { label: copy.dashboard.stats.dueToday, value: todayTasks, href: `${routes.tasks}?scope=today`, tone: "default" },
    { label: copy.dashboard.stats.overdue, value: overdueTasks, href: `${routes.tasks}?scope=overdue`, tone: overdueTasks > 0 ? "warning" : "default" },
    { label: copy.dashboard.stats.unreadNotices, value: notifications, href: routes.notifications, tone: "default" },
  ];

  const secondaryCards = [
    { label: t.dashboard.plants, value: plants, href: routes.plants },
    { label: copy.dashboard.stats.activePlants, value: activePlants, href: routes.plants },
    { label: t.dashboard.interventions, value: interventions, href: routes.interventions },
    { label: copy.dashboard.stats.completedTasks, value: completedTasks, href: `${routes.tasks}?scope=completed` },
  ];

  const quickActions = [
    { label: copy.dashboard.quick.today, href: routes.today },
    { label: copy.dashboard.quick.allTasks, href: routes.tasks },
    { label: copy.dashboard.quick.plants, href: routes.plants },
    { label: copy.dashboard.quick.schedules, href: routes.recurringTasks },
    { label: copy.dashboard.quick.reports, href: routes.reports },
  ];

  return (
    <AppShell
      title={t.dashboard.title}
      eyebrow={copy.dashboard.eyebrow}
      actions={
        <>
          <Link href={routes.today} className="agri-button-secondary">{copy.dashboard.actionToday}</Link>
          <Link href={routes.tasks} className="agri-button-primary">{copy.dashboard.actionTasks}</Link>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {mainCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className={card.tone === "warning" ? "rounded-[1.35rem] border border-amber-200 bg-amber-50/95 p-5 text-stone-950 shadow-sm ring-1 ring-amber-100 transition hover:bg-amber-50" : "agri-card transition hover:-translate-y-0.5 hover:bg-white"}
          >
            <p className="text-sm font-medium text-stone-500">{card.label}</p>
            <p className="mt-3 text-4xl font-semibold tracking-tight text-emerald-950">{card.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {secondaryCards.map((card) => (
          <Link key={card.label} href={card.href} className="rounded-[1.25rem] border border-white/70 bg-white/75 p-4 shadow-sm ring-1 ring-black/5 transition hover:bg-white">
            <p className="text-sm font-medium text-stone-500">{card.label}</p>
            <p className="mt-2 text-2xl font-semibold text-emerald-950">{card.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[1.35fr_0.9fr]">
        <section className="agri-card">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-stone-950">{copy.dashboard.sections.doNow}</h2>
              <p className="mt-1 text-sm text-stone-600">{copy.dashboard.sections.doNowHint}</p>
            </div>
            <Link href={`${routes.tasks}?scope=open`} className="text-sm font-semibold text-emerald-900 hover:text-emerald-700">{copy.dashboard.actionTasks}</Link>
          </div>

          {urgentTasks.length === 0 ? (
            <p className="mt-5 rounded-2xl border border-stone-200 bg-stone-50 p-4 text-sm text-stone-600">{copy.dashboard.empty.noUrgentTasks}</p>
          ) : (
            <div className="mt-5 grid gap-3">
              {urgentTasks.map((task) => (
                <article key={task.id} className="rounded-2xl border border-stone-200 bg-white p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-emerald-950 px-3 py-1 text-xs font-semibold text-white">{formatTaskPriority(task.priority, locale)}</span>
                        <span className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-semibold text-stone-700">{formatTaskStatus(task.status, locale)}</span>
                      </div>
                      <h3 className="mt-2 text-base font-semibold text-stone-950">{task.title}</h3>
                      <p className="mt-1 text-sm text-stone-600">{copy.dashboard.labels.plant}: {task.plant.name || task.plant.species} · {task.plant.code}</p>
                      <div className="mt-2 grid gap-1 text-sm text-stone-600 sm:grid-cols-2">
                        <p><span className="font-semibold text-stone-800">{copy.dashboard.labels.due}:</span> {new Date(task.dueDate).toLocaleDateString(dateLocale)}</p>
                        <p><span className="font-semibold text-stone-800">{copy.dashboard.labels.responsible}:</span> {task.assignedTo?.name || task.assignedTo?.email || copy.dashboard.labels.noResponsible}</p>
                      </div>
                    </div>
                    <Link href={`/tasks/${task.id}`} className="agri-button-secondary sm:shrink-0">{copy.dashboard.labels.open}</Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <aside className="agri-card">
          <h2 className="text-xl font-semibold text-stone-950">{copy.dashboard.sections.quickActions}</h2>
          <div className="mt-4 grid gap-2">
            {quickActions.map((action) => (
              <Link key={action.href} href={action.href} className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm font-semibold text-stone-800 transition hover:border-emerald-900/20 hover:text-emerald-950">
                {action.label}
              </Link>
            ))}
          </div>
        </aside>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        <section className="agri-card">
          <h2 className="text-xl font-semibold text-stone-950">{copy.dashboard.sections.plantsToWatch}</h2>
          <p className="mt-1 text-sm text-stone-600">{copy.dashboard.sections.plantsToWatchHint}</p>

          {plantsToWatch.length === 0 ? (
            <p className="mt-5 rounded-2xl border border-stone-200 bg-stone-50 p-4 text-sm text-stone-600">{copy.dashboard.empty.noPlantsToWatch}</p>
          ) : (
            <div className="mt-5 grid gap-3">
              {plantsToWatch.map((plant) => (
                <Link key={plant.id} href={`/plants/${plant.id}`} className="rounded-2xl border border-stone-200 bg-white p-4 transition hover:bg-stone-50">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-stone-950">{plant.name || plant.species}</h3>
                      <p className="mt-1 text-sm text-stone-600">{plant.code} · {plant.species}</p>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900">{plant.tasks.length} {copy.dashboard.labels.tasksOpen}</span>
                  </div>
                  <p className="mt-3 text-sm text-stone-600">
                    {plant.tasks[0] ? `${copy.dashboard.labels.due}: ${new Date(plant.tasks[0].dueDate).toLocaleDateString(dateLocale)}` : copy.dashboard.empty.noUrgentTasks}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="agri-card">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-stone-950">{copy.dashboard.sections.recentInterventions}</h2>
              <p className="mt-1 text-sm text-stone-600">{copy.dashboard.sections.recentInterventionsHint}</p>
            </div>
            <span className="text-sm font-semibold text-stone-500">30d: {recentInterventionsCount}</span>
          </div>

          {recentInterventions.length === 0 ? (
            <p className="mt-5 rounded-2xl border border-stone-200 bg-stone-50 p-4 text-sm text-stone-600">{copy.dashboard.empty.noRecentInterventions}</p>
          ) : (
            <div className="mt-5 grid gap-3">
              {recentInterventions.map((intervention) => (
                <Link key={intervention.id} href={`/interventions/${intervention.id}`} className="rounded-2xl border border-stone-200 bg-white p-4 transition hover:bg-stone-50">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-800/70">{formatInterventionType(intervention.type, locale)}</p>
                  <h3 className="mt-1 font-semibold text-stone-950">{intervention.title}</h3>
                  <p className="mt-1 text-sm text-stone-600">{intervention.plant.name || intervention.plant.species} · {intervention.plant.code}</p>
                  <p className="mt-2 text-sm text-stone-500">{new Date(intervention.createdAt).toLocaleDateString(dateLocale)}</p>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}
