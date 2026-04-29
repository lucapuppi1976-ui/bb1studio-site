import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { ProposalForm } from "@/components/tasks/proposal-form";
import { getTaskById } from "@/lib/data/tasks";
import { createTaskProposal } from "@/lib/actions/proposals";
import { requireUser } from "@/lib/authz";
import { getTranslations } from "@/lib/i18n/server";
import { getOperationalText } from "@/lib/i18n/operational";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProposeTaskPage({ params }: Props) {
  const session = await requireUser();
  const { locale } = await getTranslations();
  const op = getOperationalText(locale);
  const { id } = await params;
  const task = await getTaskById(id);

  if (!task) notFound();

  return (
    <AppShell title={op.pages.proposeFollowUp} eyebrow={task.title}>
      <ProposalForm
        taskId={task.id}
        proposedByUserId={session.user.id}
        action={createTaskProposal.bind(null, task.id)}
        locale={locale}
      />
    </AppShell>
  );
}
