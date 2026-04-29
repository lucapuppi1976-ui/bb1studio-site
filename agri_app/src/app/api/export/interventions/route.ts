import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toCsv } from "@/lib/csv";
import { getTranslations } from "@/lib/i18n/server";

export async function GET() {
  const [{ t }, session] = await Promise.all([
    getTranslations(),
    getServerSession(authOptions),
  ]);

  if (!session?.user || session.user.role !== "SUPER_ADMIN") {
    return new NextResponse(t.backend.noPermission, { status: 403 });
  }


  const data = await prisma.intervention.findMany({
    include: { plant: true },
    orderBy: { createdAt: "desc" },
  });
  const rows = data.map((item) => ({
    id: item.id,
    plantCode: item.plant.code,
    type: item.type,
    title: item.title,
    operatorName: item.operatorName,
    scheduledDate: item.scheduledDate?.toISOString() || "",
    completedAt: item.completedAt?.toISOString() || "",
    createdAt: item.createdAt.toISOString(),
  }));


  return new NextResponse(toCsv(rows), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=interventions.csv",
    },
  });
}
