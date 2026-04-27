import { prisma } from "@/lib/prisma";
import { TaskStatus, TaskRecurrenceType } from "@prisma/client";

function addInterval(date: Date, type: TaskRecurrenceType, intervalDays?: number | null) {
  const next = new Date(date);

  if (type === TaskRecurrenceType.DAILY) {
    next.setUTCDate(next.getUTCDate() + 1);
    return next;
  }

  if (type === TaskRecurrenceType.WEEKLY) {
    next.setUTCDate(next.getUTCDate() + 7);
    return next;
  }

  next.setUTCDate(next.getUTCDate() + (intervalDays || 1));
  return next;
}

export async function generateRecurringTasks(now = new Date()) {
  const templates = await prisma.taskRecurrenceTemplate.findMany({
    where: {
      active: true,
      nextDueDate: {
        lte: now,
      },
    },
    orderBy: { nextDueDate: "asc" },
  });

  let created = 0;
  let skipped = 0;

  for (const template of templates) {
    let cursor = new Date(template.nextDueDate);
    let loopGuard = 0;

    while (cursor <= now && loopGuard < 31) {
      const existing = await prisma.task.findFirst({
        where: {
          recurrenceTemplateId: template.id,
          recurrenceSourceDate: cursor,
        },
        select: { id: true },
      });

      if (existing) {
        skipped += 1;
      } else {
        await prisma.task.create({
          data: {
            plantId: template.plantId,
            title: template.title,
            description: template.description,
            dueDate: cursor,
            priority: template.priority,
            status: TaskStatus.SCHEDULED,
            notes: template.notes,
            assignedToUserId: template.assignedToUserId,
            createdByUserId: template.createdByUserId,
            recurrenceTemplateId: template.id,
            recurrenceSourceDate: cursor,
          },
        });

        created += 1;
      }

      cursor = addInterval(cursor, template.recurrenceType, template.intervalDays);
      loopGuard += 1;
    }

    await prisma.taskRecurrenceTemplate.update({
      where: { id: template.id },
      data: {
        nextDueDate: cursor,
        lastGeneratedAt: new Date(),
      },
    });
  }

  return {
    checked: templates.length,
    created,
    skipped,
  };
}
