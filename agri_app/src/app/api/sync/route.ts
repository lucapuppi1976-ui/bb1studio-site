import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getTranslations } from "@/lib/i18n/server";

type SyncItem = {
  id: string;
  kind: "CREATE_INTERVENTION";
  payload: {
    plantId: string;
    type: string;
    title: string;
    description?: string | null;
    scheduledDate?: string | null;
    completedAt?: string | null;
    operatorName?: string | null;
    beforeImageUrl?: string | null;
    afterImageUrl?: string | null;
    waterLiters?: number | null;
    productName?: string | null;
    dosage?: string | null;
    heightCm?: number | null;
    notes?: string | null;
  };
};

function parseDate(value?: string | null) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export async function POST(request: Request) {
  const [{ t }, session] = await Promise.all([
    getTranslations(),
    getServerSession(authOptions),
  ]);

  if (!session?.user) {
    return new NextResponse(t.backend.loginRequired, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body || !Array.isArray(body.items)) {
    return NextResponse.json({ error: t.backend.invalidPayload }, { status: 400 });
  }

  const results: Array<Record<string, unknown>> = [];

  for (const item of body.items as SyncItem[]) {
    try {
      if (item.kind !== "CREATE_INTERVENTION") {
        results.push({ queueId: item.id, ok: false, error: t.backend.unsupportedOperation });
        continue;
      }

      const existing = await prisma.intervention.findUnique({ where: { clientRequestId: item.id } });
      if (existing) {
        results.push({ queueId: item.id, ok: true, deduplicated: true, interventionId: existing.id });
        continue;
      }

      const created = await prisma.intervention.create({
        data: {
          clientRequestId: item.id,
          plantId: item.payload.plantId,
          type: item.payload.type as any,
          title: item.payload.title,
          description: item.payload.description || null,
          scheduledDate: parseDate(item.payload.scheduledDate),
          completedAt: parseDate(item.payload.completedAt),
          operatorName: item.payload.operatorName || null,
          beforeImageUrl: item.payload.beforeImageUrl || null,
          afterImageUrl: item.payload.afterImageUrl || null,
          waterLiters: item.payload.waterLiters ?? null,
          productName: item.payload.productName || null,
          dosage: item.payload.dosage || null,
          heightCm: item.payload.heightCm ?? null,
          notes: item.payload.notes || null,
        },
      });

      results.push({ queueId: item.id, ok: true, interventionId: created.id });
    } catch {
      results.push({ queueId: item.id, ok: false, error: t.backend.unknownError });
    }
  }

  return NextResponse.json({ results });
}
