import Link from "next/link";
import { PlantStatus, TaskStatus } from "@prisma/client";
import { AppShell } from "@/components/app-shell";
import { requireSuperAdmin } from "@/lib/authz";
import { withBasePath } from "@/lib/app-config";
import { prisma } from "@/lib/prisma";
import { routes } from "@/lib/app-routes";
import { getTranslations } from "@/lib/i18n/server";
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

export default async function ReportsPage() {
  await requireSuperAdmin();
  const { locale, t } = await getTranslations();
  const copy = getDashboardReportsText(locale);
  const todayStart = startOfToday();
  const tomorrowStart = startOfTomorrow(todayStart);
  const thirtyDaysAgo = minusDays(30);
  const openStatus = [TaskStatus.SCHEDULED, TaskStatus.NOTIFIED];

  const [
    plants,
    activePlants,
    interventions,
    recentInterventions,
    tasks,
    openTasks,
    dueToday,
    overdue,
    completedTasks,
    notifications,
    pendingProposals,
  ] = await Promise.all([
    prisma.plant.count(),
    prisma.plant.count({ where: { status: PlantStatus.ACTIVE } }),
    prisma.intervention.count(),
    prisma.intervention.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.task.count(),
    prisma.task.count({ where: { status: { in: openStatus } } }),
    prisma.task.count({ where: { status: { in: openStatus }, dueDate: { gte: todayStart, lt: tomorrowStart } } }),
    prisma.task.count({ where: { status: { in: openStatus }, dueDate: { lt: todayStart } } }),
    prisma.task.count({ where: { status: TaskStatus.DONE } }),
    prisma.appNotification.count(),
    prisma.taskProposal.count({ where: { status: "PENDING" } }),
  ]);

  const operationCards = [
    [copy.reports.stats.totalPlants, plants, routes.plants],
    [copy.reports.stats.activePlants, activePlants, routes.plants],
    [copy.reports.stats.totalInterventions, interventions, routes.interventions],
    [copy.reports.stats.last30Interventions, recentInterventions, routes.interventions],
    [copy.reports.stats.pendingProposals, pendingProposals, routes.approvals],
    [copy.reports.stats.notifications, notifications, routes.notifications],
  ] as const;

  const taskCards = [
    [copy.reports.stats.totalTasks, tasks, routes.tasks],
    [copy.reports.stats.openTasks, openTasks, `${routes.tasks}?scope=open`],
    [copy.reports.stats.dueToday, dueToday, `${routes.tasks}?scope=today`],
    [copy.reports.stats.overdue, overdue, `${routes.tasks}?scope=overdue`],
    [copy.reports.stats.completedTasks, completedTasks, `${routes.tasks}?scope=completed`],
  ] as const;

  const exports = [
    {
      title: copy.reports.exports.plantsTitle,
      description: copy.reports.exports.plantsDescription,
      href: withBasePath("/api/export/plants"),
    },
    {
      title: copy.reports.exports.interventionsTitle,
      description: copy.reports.exports.interventionsDescription,
      href: withBasePath("/api/export/interventions"),
    },
    {
      title: copy.reports.exports.tasksTitle,
      description: copy.reports.exports.tasksDescription,
      href: withBasePath("/api/export/tasks"),
    },
  ];

  return (
    <AppShell title={t.reportsPage.title} eyebrow={copy.reports.eyebrow}>
      <section className="agri-card mb-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-stone-950">{copy.reports.sections.operations}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-600">{copy.reports.description}</p>
          </div>
          <Link href={routes.dashboard} className="agri-button-secondary lg:shrink-0">{t.dashboard.title}</Link>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="mb-4 text-xl font-semibold text-white">{copy.reports.sections.operations}</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
          {operationCards.map(([label, value, href]) => (
            <Link key={label} href={href} className="agri-card p-4 transition hover:-translate-y-0.5 hover:bg-white">
              <p className="text-sm font-medium text-stone-500">{label}</p>
              <p className="mt-2 text-3xl font-semibold text-emerald-950">{value}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="mb-4 text-xl font-semibold text-white">{copy.reports.sections.tasks}</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {taskCards.map(([label, value, href]) => (
            <Link key={label} href={href} className={label === copy.reports.stats.overdue && value > 0 ? "rounded-[1.35rem] border border-amber-200 bg-amber-50/95 p-4 text-stone-950 shadow-sm ring-1 ring-amber-100 transition hover:bg-amber-50" : "agri-card p-4 transition hover:-translate-y-0.5 hover:bg-white"}>
              <p className="text-sm font-medium text-stone-500">{label}</p>
              <p className="mt-2 text-3xl font-semibold text-emerald-950">{value}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="agri-card">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-stone-950">{copy.reports.sections.exports}</h2>
            <p className="mt-1 text-sm text-stone-600">{copy.reports.sections.exportsHint}</p>
          </div>
          <p className="text-sm text-stone-500">{copy.reports.hints.csvNote}</p>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {exports.map((item) => (
            <a key={item.href} href={item.href} className="rounded-[1.35rem] border border-stone-200 bg-white p-5 shadow-sm transition hover:border-emerald-900/20 hover:bg-stone-50">
              <h3 className="text-lg font-semibold text-stone-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">{item.description}</p>
              <span className="mt-4 inline-flex rounded-full bg-emerald-950 px-4 py-2 text-sm font-semibold text-white">{copy.reports.exports.download}</span>
            </a>
          ))}
        </div>

        <p className="mt-5 rounded-2xl border border-stone-200 bg-stone-50 p-4 text-sm text-stone-600">
          {copy.reports.hints.noSchemaChange}
        </p>
      </section>
    </AppShell>
  );
}
