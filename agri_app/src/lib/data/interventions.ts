import { prisma } from "@/lib/prisma";

export async function getInterventions() {
  return prisma.intervention.findMany({
    orderBy: { createdAt: "desc" },
    include: { plant: true },
  });
}

export async function getInterventionById(id: string) {
  return prisma.intervention.findUnique({
    where: { id },
    include: { plant: true },
  });
}

export async function getPlantForIntervention(plantId: string) {
  return prisma.plant.findUnique({
    where: { id: plantId },
  });
}
