import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { getTaskById } from "@/lib/data/tasks";
import { markTaskDone } from "@/lib/actions/tasks";
import { requireUser, isSuperAdmin } from "@/lib/authz";
import { getTranslations } from "@/lib/i18n/server";
import { toDateLocale } from "@/lib/i18n/config";
import { formatInterventionType, formatTaskPriority, formatTaskStatus } from "@/lib/i18n/labels";
import { getOperationalText, lookupText } from "@/lib/i18n/operational";
import { getTasksWorkflowText } from "@/lib/i18n/tasks-workflow";
import { getRecurringHistoryText } from "@/lib/i18n/recurring-history";

type Props = {
  params: Promise<{ id: string }>;
};

function isCompleted(status: string | null | undefined) {
  return status === "DONE";
}

export default async function TaskDetailPage({ params }: Props) {
  const session = await requireUser();
  const { locale, t } = await getTranslations();
  const op = getOperationalText(locale);
  const wf = getTasksWorkflowText(locale);
  const rh = getRecurringHistoryText(locale);
  const dateLocale = toDateLocale(locale);
  const { id } = await params;
  const task = await getTaskById(id);

  if (!task) notFound();

  const completed = isCompleted(task.status);

  return (
    <AppShell
      title={task.title}
      eyebrow={formatTaskStatus(task.status, locale)}
      actions={
        <>
          {!completed ? (
            <form action={markTaskDone.bind(null, task.id)}>
              <button className="agri-button-primary">{op.actions.markCompleted}</button>
            </form>
          ) : null}
          <Link href={`/tasks/${task.id}/propose`} className="agri-button-secondary">{op.actions.proposeFollowUp}</Link>
          {isSuperAdmin(session.user.role) ? (
            <Link href={`/tasks/${task.id}/edit`} className="agri-button-secondary">{op.actions.edit}</Link>
          ) : null}
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="agri-card lg:col-span-2">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-stone-950">{wf.detail.nextStepTitle}</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-600">
                {completed ? wf.detail.nextStepCompleted : wf.detail.nextStepOpen}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-emerald-950 px-3 py-1 text-xs font-semibold text-white">{formatTaskPriority(task.priority, locale)}</span>
              <span className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-semibold text-stone-700">{formatTaskStatus(task.status, locale)}</span>
              {task.recurrenceTemplateId ? <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-900">{rh.badges.generated}</span> : null}
            </div>
          </div>
        </section>

        <section className="agri-card">
          <h2 className="text-lg font-semibold text-stone-950">{op.pages.taskDetails}</h2>
          <div className="mt-4 grid gap-3 text-sm text-stone-700">
            <p><span className="font-semibold">{op.fields.status}:</span> {formatTaskStatus(task.status, locale)}</p>
            <p><span className="font-semibold">{op.fields.priority}:</span> {formatTaskPriority(task.priority, locale)}</p>
            <p><span className="font-semibold">{wf.detail.dueDate}:</span> {new Date(task.dueDate).toLocaleDateString(dateLocale)}</p>
            <p><span className="font-semibold">{wf.detail.assignedTo}:</span> {task.assignedTo?.name || task.assignedTo?.email || op.messages.notAssigned}</p>
            <p><span className="font-semibold">{t.common.plant}:</span> {task.plant.name || task.plant.species}</p>
            <p><span className="font-semibold">{wf.detail.createdBy}:</span> {task.createdBy?.name || task.createdBy?.email || op.messages.none}</p>
            <p><span className="font-semibold">{wf.detail.completedAt}:</span> {task.completedAt ? new Date(task.completedAt).toLocaleString(dateLocale) : op.messages.none}</p>
          </div>
        </section>



        {task.recurrenceTemplateId ? (
          <section className="agri-card lg:col-span-2">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-stone-950">{rh.task.originTitle}</h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-600">{rh.task.originDescription}</p>
                <div className="mt-4 grid gap-2 text-sm text-stone-700 sm:grid-cols-2">
                  <p><span className="font-semibold text-stone-900">{rh.task.schedule}:</span> {task.recurrenceTemplate?.title || rh.badges.generated}</p>
                  <p><span className="font-semibold text-stone-900">{rh.task.sourceDate}:</span> {task.recurrenceSourceDate ? new Date(task.recurrenceSourceDate).toLocaleDateString(dateLocale) : op.messages.none}</p>
                </div>
              </div>
              <Link href="/recurring-tasks" className="agri-button-secondary">{rh.task.openSchedules}</Link>
            </div>
          </section>
        ) : null}

        <section className="agri-card">
          <h2 className="text-lg font-semibold text-stone-950">{wf.detail.descriptionTitle}</h2>
          <p className="mt-4 text-sm leading-6 text-stone-700">{task.description || op.messages.none}</p>
          <h3 className="mt-6 text-lg font-semibold text-stone-950">{wf.detail.notesTitle}</h3>
          <p className="mt-4 text-sm leading-6 text-stone-700">{task.notes || op.messages.none}</p>
        </section>

        <section className="agri-card lg:col-span-2">
          <h2 className="text-lg font-semibold text-stone-950">{op.sections.linkedProposals}</h2>
          {task.proposals.length === 0 ? (
            <p className="mt-4 text-sm text-stone-600">{op.messages.noProposals}</p>
          ) : (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {task.proposals.map((proposal) => (
                <article key={proposal.id} className="rounded-2xl border border-stone-200 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800/70">{lookupText(op.proposalStatuses, proposal.status)}</p>
                  <p className="mt-1 font-semibold text-stone-950">{proposal.title}</p>
                  <p className="mt-1 text-sm text-stone-600">
                    {formatInterventionType(proposal.type, locale)} • {new Date(proposal.scheduledFor).toLocaleDateString(dateLocale)}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}
