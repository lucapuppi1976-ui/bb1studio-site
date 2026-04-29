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


  const data = await prisma.task.findMany({
    include: { plant: true, assignedTo: true },
    orderBy: { dueDate: "asc" },
  });
  const rows = data.map((item) => ({
    id: item.id,
    plantCode: item.plant.code,
    title: item.title,
    status: item.status,
    priority: item.priority,
    dueDate: item.dueDate.toISOString(),
    assignedTo: item.assignedTo?.email || "",
    createdAt: item.createdAt.toISOString(),
  }));


  return new NextResponse(toCsv(rows), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=tasks.csv",
    },
  });
}
