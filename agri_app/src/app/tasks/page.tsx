import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { getTasks } from "@/lib/data/tasks";
import { markTaskDone } from "@/lib/actions/tasks";
import { requireUser } from "@/lib/authz";
import { getTranslations } from "@/lib/i18n/server";
import { toDateLocale } from "@/lib/i18n/config";
import { formatTaskPriority, formatTaskStatus } from "@/lib/i18n/labels";
import { getTasksWorkflowText } from "@/lib/i18n/tasks-workflow";

type PageProps = {
  searchParams?: Promise<{
    q?: string | string[] | undefined;
    scope?: string | string[] | undefined;
  }>;
};

type TaskScope = "all" | "open" | "today" | "overdue" | "completed";

const SCOPES: TaskScope[] = ["all", "open", "today", "overdue", "completed"];

function one(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

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

function isCompleted(status: string | null | undefined) {
  return status === "DONE";
}

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function buildHref(scope: TaskScope, query: string) {
  const params = new URLSearchParams();

  if (scope !== "all") {
    params.set("scope", scope);
  }

  if (query.trim()) {
    params.set("q", query.trim());
  }

  const suffix = params.toString();
  return suffix ? `/tasks?${suffix}` : "/tasks";
}

export default async function TasksPage({ searchParams }: PageProps) {
  await requireUser();
  const { locale, t } = await getTranslations();
  const wf = getTasksWorkflowText(locale);
  const dateLocale = toDateLocale(locale);
  const params = searchParams ? await searchParams : undefined;
  const rawScope = one(params?.scope) as TaskScope | undefined;
  const scope = rawScope && SCOPES.includes(rawScope) ? rawScope : "all";
  const query = one(params?.q)?.trim() ?? "";

  const tasks = await getTasks();
  const todayStart = startOfToday();
  const tomorrowStart = startOfTomorrow(todayStart);

  const totalCount = tasks.length;
  const openCount = tasks.filter((task) => !isCompleted(task.status)).length;
  const todayCount = tasks.filter((task) => {
    const due = new Date(task.dueDate);
    return !isCompleted(task.status) && due >= todayStart && due < tomorrowStart;
  }).length;
  const overdueCount = tasks.filter((task) => !isCompleted(task.status) && new Date(task.dueDate) < todayStart).length;
  const completedCount = tasks.filter((task) => isCompleted(task.status)).length;

  const normalizedQuery = normalize(query);
  const filteredTasks = tasks.filter((task) => {
    const due = new Date(task.dueDate);
    const matchesScope =
      scope === "all" ||
      (scope === "open" && !isCompleted(task.status)) ||
      (scope === "today" && !isCompleted(task.status) && due >= todayStart && due < tomorrowStart) ||
      (scope === "overdue" && !isCompleted(task.status) && due < todayStart) ||
      (scope === "completed" && isCompleted(task.status));

    if (!matchesScope) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const haystack = [
      task.title,
      task.description,
      task.notes,
      task.plant.name,
      task.plant.species,
      task.plant.code,
      task.assignedTo?.name,
      task.assignedTo?.email,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });

  const stats = [
    { label: wf.stats.total, value: totalCount, href: buildHref("all", query), active: scope === "all" },
    { label: wf.stats.open, value: openCount, href: buildHref("open", query), active: scope === "open" },
    { label: wf.stats.today, value: todayCount, href: buildHref("today", query), active: scope === "today" },
    { label: wf.stats.overdue, value: overdueCount, href: buildHref("overdue", query), active: scope === "overdue" },
    { label: wf.stats.completed, value: completedCount, href: buildHref("completed", query), active: scope === "completed" },
  ];

  const scopeLabels: Record<TaskScope, string> = {
    all: wf.filters.all,
    open: wf.filters.open,
    today: wf.filters.today,
    overdue: wf.filters.overdue,
    completed: wf.filters.completed,
  };

  return (
    <AppShell title={t.tasksPage.title} eyebrow={t.tasksPage.eyebrow}>
      <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={item.active ? "rounded-[1.35rem] border border-emerald-900 bg-emerald-950 p-4 text-white shadow-sm" : "agri-card p-4 transition hover:bg-white"}
          >
            <p className={item.active ? "text-sm font-medium text-emerald-50/80" : "text-sm font-medium text-stone-500"}>{item.label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight">{item.value}</p>
          </Link>
        ))}
      </div>

      <form method="get" className="mb-5 rounded-[1.35rem] border border-white/70 bg-white/85 p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
        <input type="hidden" name="scope" value={scope === "all" ? "" : scope} />
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-stone-700">{wf.filters.searchLabel}</span>
          <input
            name="q"
            defaultValue={query}
            placeholder={wf.filters.searchPlaceholder}
            className="agri-input"
          />
        </label>
        <div className="mt-4 flex flex-wrap gap-2">
          {SCOPES.map((item) => (
            <Link
              key={item}
              href={buildHref(item, query)}
              className={item === scope ? "rounded-full bg-emerald-950 px-4 py-2 text-sm font-semibold text-white" : "rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-emerald-900/20 hover:text-emerald-950"}
            >
              {scopeLabels[item]}
            </Link>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:flex sm:items-center">
          <button type="submit" className="agri-button-primary">{wf.filters.apply}</button>
          <Link href="/tasks" className="agri-button-secondary">{wf.filters.clear}</Link>
        </div>
      </form>

      {filteredTasks.length === 0 ? (
        <div className="agri-card text-stone-600">
          <p className="font-semibold text-stone-950">{wf.filters.noResults}</p>
          <p className="mt-1 text-sm">{wf.filters.noResultsHint}</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredTasks.map((task) => {
            const due = new Date(task.dueDate);
            const taskIsCompleted = isCompleted(task.status);
            const taskIsOverdue = !taskIsCompleted && due < todayStart;
            const taskIsToday = !taskIsCompleted && due >= todayStart && due < tomorrowStart;

            return (
              <article key={task.id} className={taskIsOverdue ? "rounded-[1.35rem] border border-amber-200 bg-amber-50/95 p-4 text-stone-950 shadow-sm ring-1 ring-amber-100 sm:p-5" : "agri-card"}>
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-emerald-950 px-3 py-1 text-xs font-semibold text-white">{formatTaskPriority(task.priority, locale)}</span>
                      <span className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-semibold text-stone-700">{formatTaskStatus(task.status, locale)}</span>
                      {taskIsToday ? <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900">{wf.card.dueToday}</span> : null}
                      {taskIsOverdue ? <span className="rounded-full bg-amber-200 px-3 py-1 text-xs font-semibold text-amber-950">{wf.card.overdue}</span> : null}
                    </div>

                    <h2 className="mt-3 text-xl font-semibold leading-tight text-stone-950">{task.title}</h2>
                    <p className="mt-1 text-sm text-stone-600">{wf.card.plant}: {task.plant.name || task.plant.species} · {task.plant.code}</p>

                    <div className="mt-4 grid gap-1 text-sm text-stone-600 sm:grid-cols-2 lg:grid-cols-3">
                      <p><span className="font-semibold text-stone-800">{wf.card.due}:</span> {due.toLocaleDateString(dateLocale)}</p>
                      <p><span className="font-semibold text-stone-800">{wf.card.responsible}:</span> {task.assignedTo?.name || task.assignedTo?.email || t.common.notAssigned}</p>
                      <p><span className="font-semibold text-stone-800">{wf.card.proposals}:</span> {task.proposals.length}</p>
                    </div>
                  </div>

                  <div className="grid gap-2 sm:flex lg:shrink-0 lg:flex-col xl:flex-row">
                    <Link href={`/tasks/${task.id}`} className="agri-button-secondary">{wf.card.open}</Link>
                    {!taskIsCompleted ? (
                      <form action={markTaskDone.bind(null, task.id)}>
                        <button type="submit" className="agri-button-primary">{wf.card.complete}</button>
                      </form>
                    ) : (
                      <span className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-900">{wf.card.completed}</span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </AppShell>
  );
}
