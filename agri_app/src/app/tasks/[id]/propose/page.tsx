import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { ProposalForm } from "@/components/tasks/proposal-form";
import { getTaskById } from "@/lib/data/tasks";
import { createTaskProposal } from "@/lib/actions/proposals";
import { requireUser } from "@/lib/authz";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProposeTaskPage({ params }: Props) {
  const session = await requireUser();
  const { id } = await params;
  const task = await getTaskById(id);

  if (!task) notFound();

  return (
    <AppShell title="Proponi follow-up" eyebrow={task.title}>
      <ProposalForm
        taskId={task.id}
        proposedByUserId={session.user.id}
        action={createTaskProposal.bind(null, task.id)}
      />
    </AppShell>
  );
}
