import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { getRecurringTemplates } from "@/lib/data/recurring-tasks";
import { generateRecurringTasksNow, toggleRecurringTaskTemplate } from "@/lib/actions/recurring-tasks";
import { requireSuperAdmin } from "@/lib/authz";
import { routes } from "@/lib/app-routes";
import { getTranslations } from "@/lib/i18n/server";
import { formatRecurrenceType } from "@/lib/i18n/labels";
import { getRecurringWorkflowText, normalizeRecurringScope, RECURRING_SCOPES } from "@/lib/i18n/recurring-workflow";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function formatDate(date: Date, locale: string) {
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(date);
}

function isDue(template: { active: boolean; nextDueDate: Date }, now: Date) {
  return template.active && new Date(template.nextDueDate) <= now;
}

function buildHref(scope: string, q: string) {
  const params = new URLSearchParams();
  if (scope !== "all") params.set("scope", scope);
  if (q) params.set("q", q);
  const suffix = params.toString();
  return suffix ? `${routes.recurringTasks}?${suffix}` : routes.recurringTasks;
}

export default async function RecurringTasksPage({ searchParams }: PageProps) {
  await requireSuperAdmin();
  const params = (await searchParams) ?? {};
  const { t, locale } = await getTranslations();
  const dateLocale = {
    it: "it-IT",
    es: "es-ES",
    en: "en-US",
    sk: "sk-SK",
    fr: "fr-FR",
    de: "de-DE",
    ru: "ru-RU",
    hu: "hu-HU",
  }[locale];
  const rw = getRecurringWorkflowText(locale);
  const templates = await getRecurringTemplates();
  const now = new Date();
  const scope = normalizeRecurringScope(params.scope);
  const q = (first(params.q) || "").trim().toLowerCase();
  const generated = Number.parseInt(first(params.generated) || "0", 10) || 0;
  const skipped = Number.parseInt(first(params.skipped) || "0", 10) || 0;
  const manual = first(params.manual);

  const activeCount = templates.filter((template) => template.active).length;
  const pausedCount = templates.length - activeCount;
  const dueCount = templates.filter((template) => isDue(template, now)).length;
  const unassignedCount = templates.filter((template) => !template.assignedTo).length;

  const filtered = templates.filter((template) => {
    const haystack = [
      template.title,
      template.description,
      template.notes,
      template.plant.name,
      template.plant.species,
      template.plant.code,
      template.assignedTo?.name,
      template.assignedTo?.email,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    if (q && !haystack.includes(q)) return false;
    if (scope === "active" && !template.active) return false;
    if (scope === "paused" && template.active) return false;
    if (scope === "due" && !isDue(template, now)) return false;
    if (scope === "unassigned" && template.assignedTo) return false;
    return true;
  });

  const stats = [
    [rw.stats.total, templates.length, buildHref("all", q)],
    [rw.stats.active, activeCount, buildHref("active", q)],
    [rw.stats.paused, pausedCount, buildHref("paused", q)],
    [rw.stats.due, dueCount, buildHref("due", q)],
    [rw.stats.unassigned, unassignedCount, buildHref("unassigned", q)],
  ] as const;

  return (
    <AppShell
      title={t.recurring.title}
      eyebrow={t.recurring.eyebrow}
      actions={<Link href={routes.plants} className="agri-button-secondary">{rw.actions.createFromPlant}</Link>}
    >
      {generated || skipped ? (
        <div className="mb-6 rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-900 shadow-sm">
          {rw.messages.generated(generated, skipped)}
        </div>
      ) : null}

      {manual === "confirm-required" ? (
        <div className="mb-6 rounded-[1.5rem] border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-950 shadow-sm">
          {rw.manual.confirmRequired}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-5">
        {stats.map(([label, value, href]) => (
          <Link key={label} href={href} className="agri-card transition hover:bg-white">
            <p className="text-sm font-medium text-stone-500">{label}</p>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-emerald-950">{value}</p>
          </Link>
        ))}
      </div>

      <section className="mt-6 agri-card">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <form method="get" className="grid gap-3 sm:grid-cols-[1fr_auto]">
            {scope !== "all" ? <input type="hidden" name="scope" value={scope} /> : null}
            <input name="q" defaultValue={q} className="agri-input" placeholder={rw.fields.searchPlaceholder} />
            <button className="agri-button-primary" type="submit">{rw.actions.search}</button>
          </form>

          <div className="flex flex-wrap gap-2">
            {RECURRING_SCOPES.map((item) => (
              <Link
                key={item}
                href={buildHref(item, q)}
                className={item === scope ? "agri-button-primary" : "agri-button-secondary"}
              >
                {rw.filters[item]}
              </Link>
            ))}
            {(q || scope !== "all") ? <Link href={routes.recurringTasks} className="agri-button-secondary">{rw.actions.clear}</Link> : null}
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-[1.75rem] border border-amber-200 bg-amber-50/90 p-5 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-lg font-semibold text-amber-950">{rw.manual.title}</h2>
            <p className="mt-2 text-sm leading-6 text-amber-900/80">{rw.manual.description}</p>
          </div>
          <form action={generateRecurringTasksNow} className="grid gap-3 sm:min-w-72">
            <label className="flex items-start gap-3 text-sm text-amber-950">
              <input type="checkbox" name="confirmGenerate" value="yes" required className="mt-1 h-4 w-4 rounded border-amber-300" />
              <span>{rw.manual.confirm}</span>
            </label>
            <button className="agri-button-primary" type="submit">{rw.actions.generateNow}</button>
          </form>
        </div>
      </section>

      <section className="mt-6">
        {templates.length === 0 ? (
          <div className="agri-card text-stone-600">{rw.messages.empty}</div>
        ) : filtered.length === 0 ? (
          <div className="agri-card text-stone-600">{rw.messages.noFilteredResults}</div>
        ) : (
          <div className="grid gap-4">
            {filtered.map((template) => {
              const due = isDue(template, now);
              const plantLabel = template.plant.name || template.plant.species;
              const responsible = template.assignedTo?.name || template.assignedTo?.email || rw.messages.noResponsible;
              const lastTask = template.tasks[0];

              return (
                <article key={template.id} className="agri-card">
                  <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-start">
                    <div>
                      <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.16em]">
                        <span className={template.active ? "rounded-full bg-emerald-100 px-3 py-1 text-emerald-900" : "rounded-full bg-stone-100 px-3 py-1 text-stone-700"}>
                          {template.active ? rw.filters.active : rw.filters.paused}
                        </span>
                        <span className={due ? "rounded-full bg-amber-100 px-3 py-1 text-amber-900" : "rounded-full bg-white px-3 py-1 text-stone-600 ring-1 ring-stone-200"}>
                          {due ? rw.messages.dueNow : rw.messages.notDueYet}
                        </span>
                      </div>

                      <h2 className="mt-3 text-xl font-semibold text-stone-950">{template.title}</h2>
                      <p className="mt-1 text-sm text-stone-600">{plantLabel} · {template.plant.code}</p>

                      <div className="mt-4 grid gap-2 text-sm text-stone-700 md:grid-cols-2">
                        <p><span className="font-semibold text-stone-900">{rw.fields.frequency}:</span> {formatRecurrenceType(template.recurrenceType, locale, template.intervalDays)}</p>
                        <p><span className="font-semibold text-stone-900">{rw.fields.nextDate}:</span> {formatDate(template.nextDueDate, dateLocale)}</p>
                        <p><span className="font-semibold text-stone-900">{rw.fields.responsible}:</span> {responsible}</p>
                        <p><span className="font-semibold text-stone-900">{rw.fields.lastGenerated}:</span> {lastTask ? formatDate(lastTask.dueDate, dateLocale) : rw.messages.none}</p>
                      </div>

                      {template.tasks.length > 0 ? (
                        <div className="mt-4 rounded-2xl border border-stone-200 bg-stone-50 p-4">
                          <p className="text-sm font-semibold text-stone-900">{rw.fields.recentGenerated}</p>
                          <div className="mt-2 grid gap-1 text-sm text-stone-600">
                            {template.tasks.map((task) => (
                              <p key={task.id}>{formatDate(task.dueDate, dateLocale)} · {task.title}</p>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>

                    <div className="grid gap-2 sm:flex lg:grid lg:min-w-44">
                      <Link href={`/plants/${template.plantId}`} className="agri-button-secondary">{rw.actions.viewPlant}</Link>
                      <form action={toggleRecurringTaskTemplate.bind(null, template.id)}>
                        <button className="w-full agri-button-primary" type="submit">
                          {template.active ? rw.actions.pause : rw.actions.resume}
                        </button>
                      </form>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </AppShell>
  );
}
