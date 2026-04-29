import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { TaskForm } from "@/components/tasks/task-form";
import { getOperators, getTaskById } from "@/lib/data/tasks";
import { updateTask } from "@/lib/actions/tasks";
import { requireSuperAdmin } from "@/lib/authz";
import { getTranslations } from "@/lib/i18n/server";
import { getOperationalText } from "@/lib/i18n/operational";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditTaskPage({ params }: Props) {
  await requireSuperAdmin();
  const { locale } = await getTranslations();
  const op = getOperationalText(locale);
  const { id } = await params;
  const [task, users] = await Promise.all([getTaskById(id), getOperators()]);

  if (!task) notFound();

  return (
    <AppShell title={op.pages.editTask} eyebrow={task.plant.code}>
      <TaskForm
        task={task}
        plantId={task.plantId}
        users={users}
        action={updateTask.bind(null, task.id)}
        submitLabel={op.actions.saveChanges}
        locale={locale}
      />
    </AppShell>
  );
}
