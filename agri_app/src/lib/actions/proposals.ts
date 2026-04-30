"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { DEFAULT_LOCALE, normalizeLocale } from "@/lib/i18n/config";
import { getApprovalsWorkflowText } from "@/lib/i18n/approvals-workflow";

function parseDate(value: FormDataEntryValue | null) {
  if (!value || typeof value !== "string" || !value.trim()) return new Date();
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

function localizedProposalCopy(localeValue?: string | null) {
  return getApprovalsWorkflowText(normalizeLocale(localeValue || DEFAULT_LOCALE));
}

export async function createTaskProposal(taskId: string, formData: FormData) {
  const copy = localizedProposalCopy();
  const task = await prisma.task.findUnique({ where: { id: taskId } });
  if (!task) throw new Error(copy.notifications.taskMissing);

  const proposedByUserId = String(formData.get("proposedByUserId") || "").trim();
  if (!proposedByUserId) throw new Error(copy.notifications.proposerMissing);

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
  revalidatePath("/reports");
  revalidatePath(`/tasks/${taskId}`);
  redirect(`/tasks/${taskId}`);
}

export async function approveProposal(proposalId: string, reviewerId: string) {
  const proposal = await prisma.taskProposal.findUnique({
    where: { id: proposalId },
    include: {
      plant: true,
      proposedBy: {
        include: {
          notificationPreference: true,
        },
      },
    },
  });

  if (!proposal) throw new Error(localizedProposalCopy().notifications.proposalMissing);

  const notificationCopy = localizedProposalCopy(proposal.proposedBy.notificationPreference?.locale);

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
      title: notificationCopy.notifications.approvedTitle,
      message: notificationCopy.notifications.approvedMessage(proposal.title),
      href: `/tasks/${createdTask.id}`,
    },
  });

  revalidatePath("/approvals");
  revalidatePath("/reports");
  revalidatePath("/tasks");
  revalidatePath(`/tasks/${proposal.taskId}`);
}

export async function rejectProposal(proposalId: string, reviewerId: string) {
  const proposal = await prisma.taskProposal.findUnique({
    where: { id: proposalId },
    include: {
      proposedBy: {
        include: {
          notificationPreference: true,
        },
      },
    },
  });

  if (!proposal) throw new Error(localizedProposalCopy().notifications.proposalMissing);

  const notificationCopy = localizedProposalCopy(proposal.proposedBy.notificationPreference?.locale);

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
      title: notificationCopy.notifications.rejectedTitle,
      message: notificationCopy.notifications.rejectedMessage(proposal.title),
      href: `/tasks/${proposal.taskId}`,
    },
  });

  revalidatePath("/approvals");
  revalidatePath("/reports");
  revalidatePath(`/tasks/${proposal.taskId}`);
}
