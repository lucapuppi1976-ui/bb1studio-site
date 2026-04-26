import { prisma } from "@/lib/prisma";
import { TaskStatus } from "@prisma/client";

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

export async function getTodayTasks() {
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
    },
    include: {
      plant: true,
      assignedTo: true,
    },
    orderBy: [{ status: "asc" }, { dueDate: "asc" }],
  });
}

export async function getTodayAgendaForUser(userId: string, role?: string | null) {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  const where: any = {
    status: {
      in: [TaskStatus.SCHEDULED, TaskStatus.NOTIFIED],
    },
    OR: [
      {
        dueDate: {
          gte: start,
          lt: end,
        },
      },
      {
        dueDate: {
          lt: start,
        },
      },
    ],
  };

  if (role !== "SUPER_ADMIN") {
    where.assignedToUserId = userId;
  }

  return prisma.task.findMany({
    where,
    include: {
      plant: true,
      assignedTo: true,
    },
    orderBy: [{ dueDate: "asc" }, { createdAt: "desc" }],
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
