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

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TaskDetailPage({ params }: Props) {
  const session = await requireUser();
  const { locale, t } = await getTranslations();
  const op = getOperationalText(locale);
  const dateLocale = toDateLocale(locale);
  const { id } = await params;
  const task = await getTaskById(id);

  if (!task) notFound();

  return (
    <AppShell
      title={task.title}
      eyebrow={formatTaskStatus(task.status, locale)}
      actions={
        <>
          <form action={markTaskDone.bind(null, task.id)}>
            <button className="agri-button-primary">{op.actions.markCompleted}</button>
          </form>
          <Link href={`/tasks/${task.id}/propose`} className="agri-button-secondary">{op.actions.proposeFollowUp}</Link>
          {isSuperAdmin(session.user.role) ? (
            <Link href={`/tasks/${task.id}/edit`} className="agri-button-secondary">{op.actions.edit}</Link>
          ) : null}
        </>
      }
    >
      <div className="grid gap-6 md:grid-cols-2">
        <section className="agri-card">
          <h2 className="text-lg font-semibold text-stone-950">{op.pages.taskDetails}</h2>
          <div className="mt-4 grid gap-2 text-sm text-stone-700">
            <p><span className="font-semibold">{op.fields.status}:</span> {formatTaskStatus(task.status, locale)}</p>
            <p><span className="font-semibold">{op.fields.priority}:</span> {formatTaskPriority(task.priority, locale)}</p>
            <p><span className="font-semibold">{op.fields.dueDate}:</span> {new Date(task.dueDate).toLocaleDateString(dateLocale)}</p>
            <p><span className="font-semibold">{op.fields.assignTo}:</span> {task.assignedTo?.name || task.assignedTo?.email || op.messages.notAssigned}</p>
            <p><span className="font-semibold">{t.common.plant}:</span> {task.plant.name || task.plant.species}</p>
            <p><span className="font-semibold">{op.fields.completedDate}:</span> {task.completedAt ? new Date(task.completedAt).toLocaleString(dateLocale) : op.messages.none}</p>
          </div>
        </section>

        <section className="agri-card">
          <h2 className="text-lg font-semibold text-stone-950">{op.fields.description}</h2>
          <p className="mt-4 text-sm text-stone-700">{task.description || op.messages.none}</p>
          <h3 className="mt-6 text-lg font-semibold text-stone-950">{op.fields.notes}</h3>
          <p className="mt-4 text-sm text-stone-700">{task.notes || op.messages.none}</p>
        </section>

        <section className="agri-card md:col-span-2">
          <h2 className="text-lg font-semibold text-stone-950">{op.sections.linkedProposals}</h2>
          {task.proposals.length === 0 ? (
            <p className="mt-4 text-sm text-stone-600">{op.messages.noProposals}</p>
          ) : (
            <div className="mt-4 grid gap-3">
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
