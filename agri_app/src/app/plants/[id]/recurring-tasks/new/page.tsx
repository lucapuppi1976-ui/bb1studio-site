import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { createRecurringTaskTemplate } from "@/lib/actions/recurring-tasks";
import { getOperators, getPlantForRecurringTemplate } from "@/lib/data/recurring-tasks";
import { requireSuperAdmin } from "@/lib/authz";
import { getTranslations } from "@/lib/i18n/server";
import { formatRecurrenceType, formatTaskPriority } from "@/lib/i18n/labels";
import { getOperationalText, PRIORITY_OPTIONS, RECURRENCE_OPTIONS } from "@/lib/i18n/operational";
import { getRecurringWorkflowText } from "@/lib/i18n/recurring-workflow";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NewRecurringTaskTemplatePage({ params }: Props) {
  await requireSuperAdmin();
  const { locale } = await getTranslations();
  const op = getOperationalText(locale);
  const rw = getRecurringWorkflowText(locale);
  const { id } = await params;

  const [plant, operators] = await Promise.all([
    getPlantForRecurringTemplate(id),
    getOperators(),
  ]);

  if (!plant) notFound();

  return (
    <AppShell title={op.pages.newSchedule} eyebrow={plant.name || plant.species}>
      <div className="mb-6 rounded-[1.75rem] border border-emerald-200 bg-emerald-50/90 p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-emerald-950">{rw.newSchedule.introTitle}</h2>
        <p className="mt-2 text-sm leading-6 text-emerald-900/80">{rw.newSchedule.introBody}</p>
      </div>

      <form action={createRecurringTaskTemplate} className="grid gap-6">
        <input type="hidden" name="plantId" value={plant.id} />

        <section className="agri-card">
          <h2 className="text-xl font-semibold text-stone-950">{op.sections.baseData}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-stone-700">{op.fields.title}</span>
              <input name="title" required className="agri-input" />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-stone-700">{op.fields.priority}</span>
              <select name="priority" defaultValue="RECOMMENDED" className="agri-input">
                {PRIORITY_OPTIONS.map((priority) => <option key={priority} value={priority}>{formatTaskPriority(priority, locale)}</option>)}
              </select>
            </label>

            <label className="grid gap-2 md:col-span-2">
              <span className="text-sm font-medium text-stone-700">{op.fields.description}</span>
              <textarea name="description" rows={4} className="agri-input" />
            </label>

            <label className="grid gap-2 md:col-span-2">
              <span className="text-sm font-medium text-stone-700">{op.fields.notes}</span>
              <textarea name="notes" rows={3} className="agri-input" />
            </label>
          </div>
        </section>

        <section className="agri-card">
          <h2 className="text-xl font-semibold text-stone-950">{op.sections.recurrence}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-stone-700">{op.fields.recurrenceType}</span>
              <select name="recurrenceType" defaultValue="WEEKLY" className="agri-input">
                {RECURRENCE_OPTIONS.map((type) => <option key={type} value={type}>{formatRecurrenceType(type, locale, 1)}</option>)}
              </select>
              <span className="text-xs leading-5 text-stone-500">{rw.newSchedule.frequencyHelp}</span>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-stone-700">{op.fields.everyXDays}</span>
              <input type="number" min={1} name="intervalDays" placeholder={op.messages.everyXDaysHelp} className="agri-input" />
              <span className="text-xs leading-5 text-stone-500">{rw.newSchedule.everyXDaysHelp}</span>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-stone-700">{op.fields.firstDate}</span>
              <input type="date" name="nextDueDate" required className="agri-input" />
              <span className="text-xs leading-5 text-stone-500">{rw.newSchedule.firstDateHelp}</span>
            </label>
          </div>
        </section>

        <section className="agri-card">
          <h2 className="text-xl font-semibold text-stone-950">{op.sections.assignment}</h2>
          <p className="mt-2 text-sm leading-6 text-stone-600">{rw.newSchedule.assignmentHelp}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-stone-700">{op.fields.operator}</span>
              <select name="assignedToUserId" defaultValue="" className="agri-input">
                <option value="">{op.messages.notAssigned}</option>
                {operators.map((operator) => (
                  <option key={operator.id} value={operator.id}>{operator.name || operator.email}</option>
                ))}
              </select>
            </label>
          </div>
        </section>

        <div className="grid gap-3 sm:flex">
          <button type="submit" className="agri-button-primary">{op.actions.createSchedule}</button>
        </div>
      </form>
    </AppShell>
  );
}
