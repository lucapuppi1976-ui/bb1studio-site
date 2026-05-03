"use server";

import { prisma } from "@/lib/prisma";
import { TaskPriority, TaskRecurrenceType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireSuperAdmin } from "@/lib/authz";
import { routes } from "@/lib/app-routes";
import { generateRecurringTasks } from "@/lib/recurring-tasks/generate";
import { getTranslations } from "@/lib/i18n/server";

function parsePriority(value: FormDataEntryValue | null): TaskPriority {
  return value === "MANDATORY" ? TaskPriority.MANDATORY : TaskPriority.RECOMMENDED;
}

function parseRecurrenceType(value: FormDataEntryValue | null): TaskRecurrenceType {
  const raw = typeof value === "string" ? value : "WEEKLY";
  if (raw === "DAILY") return TaskRecurrenceType.DAILY;
  if (raw === "EVERY_X_DAYS") return TaskRecurrenceType.EVERY_X_DAYS;
  return TaskRecurrenceType.WEEKLY;
}

function parseIntervalDays(value: FormDataEntryValue | null) {
  const raw = typeof value === "string" ? Number.parseInt(value, 10) : NaN;
  if (Number.isNaN(raw) || raw < 1) return null;
  return raw;
}

function parseNextDueDate(value: FormDataEntryValue | null, message: string) {
  if (typeof value !== "string" || !value.trim()) throw new Error(message);
  return new Date(`${value}T07:00:00.000Z`);
}

export async function createRecurringTaskTemplate(formData: FormData) {
  const [session, { t }] = await Promise.all([requireSuperAdmin(), getTranslations()]);
  const plantId = String(formData.get("plantId") || "").trim();
  const title = String(formData.get("title") || "").trim();
  const recurrenceType = parseRecurrenceType(formData.get("recurrenceType"));
  const intervalDays = parseIntervalDays(formData.get("intervalDays"));
  const nextDueDate = parseNextDueDate(formData.get("nextDueDate"), t.backend.chooseStartDate);

  if (!plantId) throw new Error(t.backend.choosePlant);
  if (!title) throw new Error(t.backend.enterTitle);

  await prisma.taskRecurrenceTemplate.create({
    data: {
      plantId,
      title,
      description: String(formData.get("description") || "").trim() || null,
      priority: parsePriority(formData.get("priority")),
      notes: String(formData.get("notes") || "").trim() || null,
      recurrenceType,
      intervalDays: recurrenceType === "EVERY_X_DAYS" ? intervalDays ?? 1 : null,
      nextDueDate,
      assignedToUserId: String(formData.get("assignedToUserId") || "").trim() || null,
      createdByUserId: session.user.id,
    },
  });

  revalidatePath(routes.recurringTasks);
  revalidatePath(`/plants/${plantId}`);
  redirect(routes.recurringTasks);
}

export async function toggleRecurringTaskTemplate(templateId: string) {
  await requireSuperAdmin();
  const template = await prisma.taskRecurrenceTemplate.findUnique({ where: { id: templateId }, select: { id: true, active: true } });
  if (!template) return;
  await prisma.taskRecurrenceTemplate.update({ where: { id: templateId }, data: { active: !template.active } });
  revalidatePath(routes.recurringTasks);
}

export async function generateRecurringTasksNow(formData: FormData) {
  await requireSuperAdmin();

  if (String(formData.get("confirmGenerate") || "") !== "yes") {
    redirect(`${routes.recurringTasks}?manual=confirm-required`);
  }

  const result = await generateRecurringTasks(new Date());
  revalidatePath(routes.recurringTasks);
  revalidatePath(routes.tasks);
  revalidatePath(routes.today);
  redirect(`${routes.recurringTasks}?generated=${result.created}&skipped=${result.skipped}`);
}
