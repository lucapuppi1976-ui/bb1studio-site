"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function parseDate(value: FormDataEntryValue | null) {
  if (!value || typeof value !== "string" || !value.trim()) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export async function createTask(formData: FormData) {
  const plantId = String(formData.get("plantId") || "");
  const assignedToUserId = String(formData.get("assignedToUserId") || "").trim() || null;
  const createdByUserId = String(formData.get("createdByUserId") || "").trim() || null;

  const created = await prisma.task.create({
    data: {
      plantId,
      title: String(formData.get("title") || "").trim(),
      description: String(formData.get("description") || "").trim() || null,
      dueDate: parseDate(formData.get("dueDate")) || new Date(),
      priority: String(formData.get("priority") || "RECOMMENDED") as any,
      notes: String(formData.get("notes") || "").trim() || null,
      assignedToUserId,
      createdByUserId,
    },
  });

  revalidatePath("/tasks");
  revalidatePath("/today");
  revalidatePath(`/plants/${plantId}`);
  redirect(`/tasks/${created.id}`);
}

export async function updateTask(taskId: string, formData: FormData) {
  const current = await prisma.task.findUnique({ where: { id: taskId } });
  if (!current) throw new Error("Task non trovato.");

  await prisma.task.update({
    where: { id: taskId },
    data: {
      title: String(formData.get("title") || "").trim(),
      description: String(formData.get("description") || "").trim() || null,
      dueDate: parseDate(formData.get("dueDate")) || current.dueDate,
      priority: String(formData.get("priority") || "RECOMMENDED") as any,
      status: String(formData.get("status") || "SCHEDULED") as any,
      notes: String(formData.get("notes") || "").trim() || null,
      assignedToUserId: String(formData.get("assignedToUserId") || "").trim() || null,
    },
  });

  revalidatePath("/tasks");
  revalidatePath("/today");
  revalidatePath(`/tasks/${taskId}`);
  revalidatePath(`/plants/${current.plantId}`);
  redirect(`/tasks/${taskId}`);
}

export async function markTaskDone(taskId: string) {
  const current = await prisma.task.findUnique({ where: { id: taskId } });
  if (!current) throw new Error("Task non trovato.");

  await prisma.task.update({
    where: { id: taskId },
    data: {
      status: "DONE",
      completedAt: new Date(),
    },
  });

  revalidatePath("/tasks");
  revalidatePath("/today");
  revalidatePath(`/tasks/${taskId}`);
  revalidatePath(`/plants/${current.plantId}`);
}

export async function markTaskNotified(taskId: string) {
  await prisma.task.update({
    where: { id: taskId },
    data: { status: "NOTIFIED" },
  });

  revalidatePath("/tasks");
  revalidatePath("/today");
}
