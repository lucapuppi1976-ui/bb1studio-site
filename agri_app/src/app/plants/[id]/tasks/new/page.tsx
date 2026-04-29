import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { TaskForm } from "@/components/tasks/task-form";
import { createTask } from "@/lib/actions/tasks";
import { getPlantForTask, getOperators } from "@/lib/data/tasks";
import { requireUser } from "@/lib/authz";
import { getTranslations } from "@/lib/i18n/server";
import { getOperationalText } from "@/lib/i18n/operational";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NewTaskPage({ params }: Props) {
  const session = await requireUser();
  const { locale } = await getTranslations();
  const op = getOperationalText(locale);
  const { id } = await params;
  const plant = await getPlantForTask(id);
  const users = await getOperators();

  if (!plant) notFound();

  return (
    <AppShell title={op.pages.newTask} eyebrow={plant.code}>
      <TaskForm
        plantId={plant.id}
        users={users}
        createdByUserId={session.user.id}
        action={createTask}
        submitLabel={op.actions.createTask}
        locale={locale}
      />
    </AppShell>
  );
}
