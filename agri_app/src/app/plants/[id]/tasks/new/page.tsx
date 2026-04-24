import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { TaskForm } from "@/components/tasks/task-form";
import { createTask } from "@/lib/actions/tasks";
import { getPlantForTask, getOperators } from "@/lib/data/tasks";
import { requireUser } from "@/lib/authz";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NewTaskPage({ params }: Props) {
  const session = await requireUser();
  const { id } = await params;
  const plant = await getPlantForTask(id);
  const users = await getOperators();

  if (!plant) notFound();

  return (
    <AppShell title="Nuovo task" eyebrow={plant.code}>
      <TaskForm
        plantId={plant.id}
        users={users}
        createdByUserId={session.user.id}
        action={createTask}
        submitLabel="Crea task"
      />
    </AppShell>
  );
}
