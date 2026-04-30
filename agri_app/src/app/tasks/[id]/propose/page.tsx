import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { ProposalForm } from "@/components/tasks/proposal-form";
import { getTaskById } from "@/lib/data/tasks";
import { createTaskProposal } from "@/lib/actions/proposals";
import { requireUser } from "@/lib/authz";
import { getTranslations } from "@/lib/i18n/server";
import { getApprovalsWorkflowText } from "@/lib/i18n/approvals-workflow";
import { formatTaskStatus } from "@/lib/i18n/labels";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProposeTaskPage({ params }: Props) {
  const session = await requireUser();
  const { locale } = await getTranslations();
  const copy = getApprovalsWorkflowText(locale);
  const { id } = await params;
  const task = await getTaskById(id);

  if (!task) notFound();

  return (
    <AppShell title={copy.propose.title} eyebrow={task.title}>
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="agri-card">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800/70">{copy.propose.eyebrow}</p>
          <h2 className="mt-2 text-xl font-semibold text-stone-950">{copy.propose.helpTitle}</h2>
          <p className="mt-3 text-sm leading-6 text-stone-600">{copy.propose.description}</p>
          <p className="mt-3 text-sm leading-6 text-stone-600">{copy.propose.helpText}</p>
          <div className="mt-5 rounded-2xl border border-stone-200 bg-stone-50 p-4 text-sm text-stone-700">
            <p className="font-semibold text-stone-900">{task.title}</p>
            <p className="mt-1">{task.plant.name || task.plant.species} · {formatTaskStatus(task.status, locale)}</p>
          </div>
        </section>

        <section className="agri-card">
          <ProposalForm
            taskId={task.id}
            proposedByUserId={session.user.id}
            action={createTaskProposal.bind(null, task.id)}
            locale={locale}
          />
        </section>
      </div>
    </AppShell>
  );
}
