import { NextResponse } from "next/server";
import { generateRecurringTasks } from "@/lib/recurring-tasks/generate";
import { createDailyOperationalNotifications } from "@/lib/notifications/daily";
import { previewDailyOperationalNotifications } from "@/lib/notifications/daily-preview";
import { getEmailRuntimeStatus } from "@/lib/notifications/email-control";
import { getTranslations } from "@/lib/i18n/server";

function asBool(value: string | null) {
  return value === "1" || value === "true" || value === "yes";
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");
  const dryRun = asBool(url.searchParams.get("dryRun"));
  const { t } = await getTranslations();

  if (!secret || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: t.backend.cronUnauthorized }, { status: 401 });
  }

  if (dryRun) {
    const notifications = await previewDailyOperationalNotifications(new Date());

    return NextResponse.json({
      ok: true,
      dryRun: true,
      recurring: {
        dryRun: true,
        checked: 0,
        created: 0,
        skipped: 0,
        note: "Recurring task generation is intentionally skipped during dry-run.",
      },
      notifications,
      email: getEmailRuntimeStatus(),
    });
  }

  const recurring = await generateRecurringTasks(new Date());
  const notifications = await createDailyOperationalNotifications();

  return NextResponse.json({ ok: true, recurring, notifications, email: getEmailRuntimeStatus() });
}
