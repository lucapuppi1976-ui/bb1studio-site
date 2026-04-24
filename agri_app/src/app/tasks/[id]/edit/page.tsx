import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { TaskForm } from "@/components/tasks/task-form";
import { getOperators, getTaskById } from "@/lib/data/tasks";
import { updateTask } from "@/lib/actions/tasks";
import { requireSuperAdmin } from "@/lib/authz";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditTaskPage({ params }: Props) {
  await requireSuperAdmin();
  const { id } = await params;
  const [task, users] = await Promise.all([getTaskById(id), getOperators()]);

  if (!task) notFound();

  return (
    <AppShell title="Modifica task" eyebrow={task.plant.code}>
      <TaskForm
        task={task}
        plantId={task.plantId}
        users={users}
        action={updateTask.bind(null, task.id)}
        submitLabel="Salva modifiche"
      />
    </AppShell>
  );
}
