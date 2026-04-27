import { prisma } from "@/lib/prisma";
import { getOperators } from "@/lib/data/tasks";

export async function getRecurringTemplates() {
  return prisma.taskRecurrenceTemplate.findMany({
    include: {
      plant: true,
      assignedTo: true,
      createdBy: true,
      tasks: {
        orderBy: { dueDate: "desc" },
        take: 3,
      },
    },
    orderBy: [{ active: "desc" }, { nextDueDate: "asc" }],
  });
}

export async function getRecurringTemplatesForPlant(plantId: string) {
  return prisma.taskRecurrenceTemplate.findMany({
    where: { plantId },
    include: {
      assignedTo: true,
    },
    orderBy: [{ active: "desc" }, { nextDueDate: "asc" }],
  });
}

export async function getPlantForRecurringTemplate(plantId: string) {
  return prisma.plant.findUnique({
    where: { id: plantId },
  });
}

export { getOperators };
