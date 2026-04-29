import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { getRecurringTemplates } from "@/lib/data/recurring-tasks";
import { generateRecurringTasksNow, toggleRecurringTaskTemplate } from "@/lib/actions/recurring-tasks";
import { requireSuperAdmin } from "@/lib/authz";
import { routes } from "@/lib/app-routes";
import { getTranslations } from "@/lib/i18n/server";
import { toDateLocale } from "@/lib/i18n/config";
import { formatRecurrenceType } from "@/lib/i18n/labels";

type PageProps = { searchParams?: Promise<{ generated?: string | string[]; skipped?: string | string[] }> };

function one(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function formatDate(value: Date, locale: string) {
  return new Date(value).toLocaleDateString(locale);
}

export default async function RecurringTasksPage({ searchParams }: PageProps) {
  await requireSuperAdmin();
  const { locale, t } = await getTranslations();
  const dateLocale = toDateLocale(locale);
  const templates = await getRecurringTemplates();
  const params = searchParams ? await searchParams : undefined;
  const generated = one(params?.generated);
  const skipped = one(params?.skipped);
  const activeCount = templates.filter((template) => template.active).length;
  const pausedCount = templates.length - activeCount;

  return (
    <AppShell
      title={t.recurring.title}
      eyebrow={t.recurring.eyebrow}
      actions={
        <>
          <Link href={routes.plants} className="agri-button-secondary">{t.recurring.goToPlants}</Link>
          <form action={generateRecurringTasksNow}>
            <button className="agri-button-primary">{t.recurring.generateNow}</button>
          </form>
        </>
      }
    >
      {generated || skipped ? (
        <div className="mb-6 rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-900 shadow-sm">
          {t.recurring.generationDone} {t.recurring.created}: {generated || 0}. {t.recurring.skipped}: {skipped || 0}.
        </div>
      ) : null}

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="agri-card"><p className="text-sm font-medium text-stone-500">{t.recurring.total}</p><p className="mt-2 text-4xl font-semibold tracking-tight text-emerald-950">{templates.length}</p></div>
        <div className="agri-card"><p className="text-sm font-medium text-stone-500">{t.recurring.active}</p><p className="mt-2 text-4xl font-semibold tracking-tight text-emerald-950">{activeCount}</p></div>
        <div className="agri-card"><p className="text-sm font-medium text-stone-500">{t.recurring.paused}</p><p className="mt-2 text-4xl font-semibold tracking-tight text-emerald-950">{pausedCount}</p></div>
      </div>

      {templates.length === 0 ? (
        <div className="agri-card text-stone-600">{t.recurring.empty}</div>
      ) : (
        <div className="grid gap-4">
          {templates.map((template) => (
            <article key={template.id} className="agri-card">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800/70">
                    {template.active ? t.recurring.active : t.recurring.paused} · {formatRecurrenceType(template.recurrenceType, locale, template.intervalDays)}
                  </p>
                  <h2 className="mt-1 text-xl font-semibold text-stone-950">{template.title}</h2>
                  <p className="mt-1 text-sm text-stone-600">{template.plant.name || template.plant.species}</p>
                  <p className="mt-3 text-sm text-stone-700"><span className="font-semibold">{t.recurring.nextDate}:</span> {formatDate(template.nextDueDate, dateLocale)}</p>
                  <p className="mt-1 text-sm text-stone-600"><span className="font-semibold">{t.common.responsible}:</span> {template.assignedTo?.name || template.assignedTo?.email || t.common.notAssigned}</p>
                  {template.tasks.length > 0 ? <p className="mt-1 text-sm text-stone-600"><span className="font-semibold">{t.recurring.lastGenerated}:</span> {formatDate(template.tasks[0].dueDate, dateLocale)}</p> : null}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link href={`/plants/${template.plantId}`} className="agri-button-secondary">{t.recurring.viewPlant}</Link>
                  <form action={toggleRecurringTaskTemplate.bind(null, template.id)}>
                    <button className="agri-button-primary">{template.active ? t.recurring.pause : t.recurring.resume}</button>
                  </form>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </AppShell>
  );
}
