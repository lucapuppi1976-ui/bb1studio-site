import { prisma } from "@/lib/prisma";

export async function getReportStats() {
  const [plants, interventions, tasks, notifications, proposals] = await Promise.all([
    prisma.plant.count(),
    prisma.intervention.count(),
    prisma.task.count(),
    prisma.appNotification.count(),
    prisma.taskProposal.count({ where: { status: "PENDING" } }),
  ]);

  return { plants, interventions, tasks, notifications, pendingProposals: proposals };
}
