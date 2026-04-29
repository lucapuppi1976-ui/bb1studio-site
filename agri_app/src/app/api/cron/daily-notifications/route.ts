import { NextResponse } from "next/server";
import { generateRecurringTasks } from "@/lib/recurring-tasks/generate";
import { createDailyOperationalNotifications } from "@/lib/notifications/daily";
import { getTranslations } from "@/lib/i18n/server";

export async function POST(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");
  const { t } = await getTranslations();

  if (!secret || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: t.backend.cronUnauthorized }, { status: 401 });
  }

  const recurring = await generateRecurringTasks(new Date());
  const notifications = await createDailyOperationalNotifications();

  return NextResponse.json({ ok: true, recurring, notifications });
}
