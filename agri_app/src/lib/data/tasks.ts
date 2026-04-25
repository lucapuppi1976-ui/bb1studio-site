import { prisma } from "@/lib/prisma";
import { UserRole } from "@prisma/client";

export async function getTasks() {
  return prisma.task.findMany({
    orderBy: [{ dueDate: "asc" }, { createdAt: "desc" }],
    include: {
      plant: true,
      assignedTo: true,
      proposals: {
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

export async function getTaskById(id: string) {
  return prisma.task.findUnique({
    where: { id },
    include: {
      plant: true,
      assignedTo: true,
      createdBy: true,
      proposals: {
        include: {
          proposedBy: true,
          reviewedBy: true,
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

export async function getTodayTasksForUser(userId: string, role: UserRole) {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  return prisma.task.findMany({
    where: {
      dueDate: {
        gte: start,
        lt: end,
      },
      ...(role === UserRole.SUPER_ADMIN ? {} : { assignedToUserId: userId }),
    },
    include: {
      plant: true,
      assignedTo: true,
    },
    orderBy: [{ status: "asc" }, { dueDate: "asc" }],
  });
}

export async function getPlantForTask(plantId: string) {
  return prisma.plant.findUnique({ where: { id: plantId } });
}

export async function getPendingProposals() {
  return prisma.taskProposal.findMany({
    where: { status: "PENDING" },
    include: {
      plant: true,
      task: true,
      proposedBy: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getOperators() {
  return prisma.user.findMany({
    where: { role: "OPERATOR" },
    orderBy: { name: "asc" },
  });
}
