import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");

  if (!secret || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  const tasks = await prisma.task.findMany({
    where: {
      dueDate: {
        gte: start,
        lt: end,
      },
      assignedToUserId: { not: null },
      status: { in: ["SCHEDULED", "NOTIFIED"] },
    },
    include: {
      plant: true,
    },
  });

  let created = 0;

  for (const task of tasks) {
    if (!task.assignedToUserId) continue;

    await prisma.appNotification.create({
      data: {
        userId: task.assignedToUserId,
        type: "TASK",
        title: `Task di oggi: ${task.title}`,
        message: `${task.plant.name || task.plant.species} • scadenza oggi`,
        href: `/tasks/${task.id}`,
      },
    });

    await prisma.task.update({
      where: { id: task.id },
      data: { status: "NOTIFIED" },
    });

    created += 1;
  }

  return NextResponse.json({ ok: true, created });
}
