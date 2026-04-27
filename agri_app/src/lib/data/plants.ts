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
        orderBy: { dueDate: "asc" },
        take: 5,
      },
      recurringTemplates: {
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
      tasks: { orderBy: { dueDate: "asc" } },
      recurringTemplates: {
        include: { assignedTo: true },
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
