import { prisma } from "@/lib/prisma";

export async function getPlants() {
  return prisma.plant.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      interventions: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
      tasks: {
        include: { recurrenceTemplate: true },
        orderBy: { dueDate: "asc" },
        take: 5,
      },
      recurringTemplates: {
        include: {
          assignedTo: true,
          tasks: {
            orderBy: { dueDate: "desc" },
            take: 3,
          },
        },
        orderBy: { nextDueDate: "asc" },
        take: 5,
      },
    },
  });
}

export async function getPlantById(id: string) {
  return prisma.plant.findUnique({
    where: { id },
    include: {
      interventions: { orderBy: { createdAt: "desc" } },
      tasks: {
        include: { recurrenceTemplate: true },
        orderBy: { dueDate: "asc" },
      },
      recurringTemplates: {
        include: {
          assignedTo: true,
          tasks: {
            orderBy: { dueDate: "desc" },
            take: 5,
          },
        },
        orderBy: { nextDueDate: "asc" },
      },
    },
  });
}

export async function getPlantByCode(code: string) {
  return prisma.plant.findUnique({
    where: { code },
  });
}
