import { NextResponse } from "next/server";
import { generateRecurringTasks } from "@/lib/recurring-tasks/generate";
import { getTranslations } from "@/lib/i18n/server";

export async function POST(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");
  const { t } = await getTranslations();

  if (!secret || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: t.backend.cronUnauthorized }, { status: 401 });
  }

  const result = await generateRecurringTasks(new Date());
  return NextResponse.json({ ok: true, ...result });
}
