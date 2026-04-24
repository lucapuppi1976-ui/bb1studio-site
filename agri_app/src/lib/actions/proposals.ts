"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function parseDate(value: FormDataEntryValue | null) {
  if (!value || typeof value !== "string" || !value.trim()) return new Date();
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

export async function createTaskProposal(taskId: string, formData: FormData) {
  const task = await prisma.task.findUnique({ where: { id: taskId } });
  if (!task) throw new Error("Task non trovato.");

  const proposedByUserId = String(formData.get("proposedByUserId") || "").trim();
  if (!proposedByUserId) throw new Error("Utente proponente mancante.");

  await prisma.taskProposal.create({
    data: {
      taskId,
      plantId: task.plantId,
      proposedByUserId,
      title: String(formData.get("title") || "").trim(),
      type: String(formData.get("type") || "OTHER") as any,
      scheduledFor: parseDate(formData.get("scheduledFor")),
      notes: String(formData.get("notes") || "").trim() || null,
    },
  });

  revalidatePath("/approvals");
  revalidatePath(`/tasks/${taskId}`);
  redirect(`/tasks/${taskId}`);
}

export async function approveProposal(proposalId: string, reviewerId: string) {
  const proposal = await prisma.taskProposal.findUnique({
    where: { id: proposalId },
    include: { plant: true, proposedBy: true },
  });

  if (!proposal) throw new Error("Proposta non trovata.");

  const createdTask = await prisma.task.create({
    data: {
      plantId: proposal.plantId,
      title: proposal.title,
      description: proposal.notes,
      dueDate: proposal.scheduledFor,
      priority: "RECOMMENDED",
      status: "SCHEDULED",
      createdByUserId: reviewerId,
      assignedToUserId: proposal.proposedByUserId,
    },
  });

  await prisma.taskProposal.update({
    where: { id: proposalId },
    data: {
      status: "APPROVED",
      reviewedByUserId: reviewerId,
    },
  });

  await prisma.appNotification.create({
    data: {
      userId: proposal.proposedByUserId,
      type: "APPROVAL",
      title: "Proposta approvata",
      message: `La proposta "${proposal.title}" è stata approvata.`,
      href: `/tasks/${createdTask.id}`,
    },
  });

  revalidatePath("/approvals");
  revalidatePath("/tasks");
  revalidatePath(`/tasks/${proposal.taskId}`);
}

export async function rejectProposal(proposalId: string, reviewerId: string) {
  const proposal = await prisma.taskProposal.findUnique({
    where: { id: proposalId },
  });

  if (!proposal) throw new Error("Proposta non trovata.");

  await prisma.taskProposal.update({
    where: { id: proposalId },
    data: {
      status: "REJECTED",
      reviewedByUserId: reviewerId,
    },
  });

  await prisma.appNotification.create({
    data: {
      userId: proposal.proposedByUserId,
      type: "APPROVAL",
      title: "Proposta rifiutata",
      message: `La proposta "${proposal.title}" è stata rifiutata.`,
      href: `/tasks/${proposal.taskId}`,
    },
  });

  revalidatePath("/approvals");
  revalidatePath(`/tasks/${proposal.taskId}`);
}
