import { NextRequest, NextResponse } from "next/server";
import {
  buildAiStorageRehearsalBoardReport,
  type StorageRehearsalBoardInput,
} from "@/lib/ai/aiStorageRehearsalBoard";

export const dynamic = "force-dynamic";

function readBearerToken(request: NextRequest): string {
  const authorization = request.headers.get("authorization") ?? "";

  if (!authorization.startsWith("Bearer ")) {
    return "";
  }

  return authorization.slice("Bearer ".length).trim();
}

function isAllowed(request: NextRequest): boolean {
  const expectedToken = process.env.CRON_SECRET;
  const receivedToken = readBearerToken(request);

  return Boolean(expectedToken && receivedToken === expectedToken);
}

export async function GET(request: NextRequest) {
  if (!isAllowed(request)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Accesso non consentito.",
        endpoint: "/api/ops/ai-storage-rehearsal-board-dry-run",
      },
      { status: 403 },
    );
  }

  const report = buildAiStorageRehearsalBoardReport();

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-storage-rehearsal-board-dry-run",
    mode: report.mode,
    generatedAt: report.generatedAt,
    report,
  });
}

export async function POST(request: NextRequest) {
  if (!isAllowed(request)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Accesso non consentito.",
        endpoint: "/api/ops/ai-storage-rehearsal-board-dry-run",
      },
      { status: 403 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as StorageRehearsalBoardInput;
  const report = buildAiStorageRehearsalBoardReport(body);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-storage-rehearsal-board-dry-run",
    mode: report.mode,
    generatedAt: report.generatedAt,
    report,
  });
}
