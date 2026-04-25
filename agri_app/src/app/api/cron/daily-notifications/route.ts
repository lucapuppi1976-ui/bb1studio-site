import { NextResponse } from "next/server";
import { runDailyNotificationsJob } from "@/lib/notifications/daily";

export async function POST(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");

  if (!secret || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await runDailyNotificationsJob();
  return NextResponse.json(result);
}
