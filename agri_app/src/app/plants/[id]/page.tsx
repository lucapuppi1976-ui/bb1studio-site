import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { getPlantById } from "@/lib/data/plants";
import { requireUser, isSuperAdmin } from "@/lib/authz";
import { buildPlantPublicUrlByCode } from "@/lib/qr/build-plant-url";
import { routes } from "@/lib/app-routes";
import { getTranslations } from "@/lib/i18n/server";
import { toDateLocale } from "@/lib/i18n/config";
import { formatEnvironment, formatInterventionType, formatPlantStatus, formatPlantType, formatRecurrenceType, formatTaskStatus } from "@/lib/i18n/labels";
import { getOperationalText } from "@/lib/i18n/operational";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PlantDetailPage({ params }: Props) {
  const session = await requireUser();
  const { locale, t } = await getTranslations();
  const op = getOperationalText(locale);
  const dateLocale = toDateLocale(locale);
  const { id } = await params;
  const plant = await getPlantById(id);

  if (!plant) notFound();

  const publicUrl = buildPlantPublicUrlByCode(plant.code);

  return (
    <AppShell
      title={plant.name || plant.species}
      eyebrow={plant.code}
      actions={
        <>
          <Link href={`/plants/${plant.id}/interventions/new`} className="agri-button-primary">{op.actions.newIntervention}</Link>
          <Link href={`/plants/${plant.id}/interventions/new-offline`} className="agri-button-secondary">{op.actions.offlineIntervention}</Link>
          <Link href={`/plants/${plant.id}/tasks/new`} className="agri-button-secondary">{op.actions.newTask}</Link>
          {isSuperAdmin(session.user.role) ? (
            <Link href={`/plants/${plant.id}/recurring-tasks/new`} className="agri-button-secondary">{op.actions.recurringSchedule}</Link>
          ) : null}
          <Link href={`/plants/${plant.id}/qr`} className="agri-button-secondary">{op.actions.qr}</Link>
          {isSuperAdmin(session.user.role) ? (
            <Link href={`/plants/${plant.id}/edit`} className="agri-button-secondary">{op.actions.edit}</Link>
          ) : null}
        </>
      }
    >
      <div className="grid gap-6 md:grid-cols-2">
        <section className="agri-card">
          <h2 className="text-lg font-semibold text-stone-950">{op.sections.identity}</h2>
          <div className="mt-4 grid gap-2 text-sm text-stone-700">
            <p><span className="font-semibold">{op.fields.species}:</span> {plant.species}</p>
            <p><span className="font-semibold">{op.fields.variety}:</span> {plant.variety || op.messages.none}</p>
            <p><span className="font-semibold">{op.fields.type}:</span> {formatPlantType(plant.type, locale)}</p>
            <p><span className="font-semibold">{op.fields.environment}:</span> {formatEnvironment(plant.environment, locale)}</p>
            <p><span className="font-semibold">{op.fields.status}:</span> {formatPlantStatus(plant.status, locale)}</p>
            <p><span className="font-semibold">{op.fields.zone}:</span> {plant.zoneName || op.messages.none}</p>
            <p><span className="font-semibold">{op.fields.height}:</span> {plant.heightCm ?? op.messages.none}</p>
            <p><span className="font-semibold">{op.fields.diameter}:</span> {plant.diameterMm ?? op.messages.none}</p>
            <p><span className="font-semibold">{op.messages.publicQrUrl}:</span> <span className="break-all">{publicUrl}</span></p>
          </div>
        </section>

        <section className="agri-card">
          <h2 className="text-lg font-semibold text-stone-950">{op.sections.notes}</h2>
          <p className="mt-4 text-sm text-stone-700">{plant.notes || op.messages.noNotes}</p>
        </section>

        <section className="agri-card md:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-stone-950">{op.sections.interventions}</h2>
            <Link href={routes.interventions} className="text-sm font-medium text-emerald-900">{op.actions.viewAll}</Link>
          </div>
          {plant.interventions.length === 0 ? (
            <p className="text-sm text-stone-600">{op.messages.noInterventions}</p>
          ) : (
            <div className="grid gap-3">
              {plant.interventions.map((item) => (
                <Link key={item.id} href={`/interventions/${item.id}`} className="rounded-2xl border border-stone-200 bg-white p-4 transition hover:bg-emerald-50/40">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800/70">{formatInterventionType(item.type, locale)}</p>
                  <p className="mt-1 font-semibold text-stone-950">{item.title}</p>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="agri-card md:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-stone-950">{op.sections.tasks}</h2>
            <Link href={routes.tasks} className="text-sm font-medium text-emerald-900">{op.actions.viewAll}</Link>
          </div>
          {plant.tasks.length === 0 ? (
            <p className="text-sm text-stone-600">{op.messages.noTasksForPlant}</p>
          ) : (
            <div className="grid gap-3">
              {plant.tasks.map((task) => (
                <Link key={task.id} href={`/tasks/${task.id}`} className="rounded-2xl border border-stone-200 bg-white p-4 transition hover:bg-emerald-50/40">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800/70">{formatTaskStatus(task.status, locale)}</p>
                  <p className="mt-1 font-semibold text-stone-950">{task.title}</p>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="agri-card md:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-stone-950">{op.sections.schedules}</h2>
            {isSuperAdmin(session.user.role) ? (
              <Link href={`/plants/${plant.id}/recurring-tasks/new`} className="text-sm font-medium text-emerald-900">{op.actions.newSchedule}</Link>
            ) : null}
          </div>
          {plant.recurringTemplates.length === 0 ? (
            <p className="text-sm text-stone-600">{op.messages.noSchedulesForPlant}</p>
          ) : (
            <div className="grid gap-3">
              {plant.recurringTemplates.map((template) => (
                <Link key={template.id} href={routes.recurringTasks} className="rounded-2xl border border-stone-200 bg-white p-4 transition hover:bg-emerald-50/40">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800/70">
                        {template.active ? t.recurring.active : t.recurring.paused} · {formatRecurrenceType(template.recurrenceType, locale, template.intervalDays)}
                      </p>
                      <p className="mt-1 font-semibold text-stone-950">{template.title}</p>
                      <p className="mt-1 text-sm text-stone-600">{new Date(template.nextDueDate).toLocaleDateString(dateLocale)}</p>
                    </div>
                    <div className="text-sm text-stone-500">
                      {template.assignedTo?.name || template.assignedTo?.email || op.messages.notAssigned}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}
