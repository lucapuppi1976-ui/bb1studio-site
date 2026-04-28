import { NextResponse } from "next/server";
import { generateRecurringTasks } from "@/lib/recurring-tasks/generate";

export async function POST(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");

  if (!secret || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await generateRecurringTasks(new Date());

  return NextResponse.json({
    ok: true,
    ...result,
  });
}
