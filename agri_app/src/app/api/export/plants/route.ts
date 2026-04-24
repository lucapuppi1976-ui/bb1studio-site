import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toCsv } from "@/lib/csv";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "SUPER_ADMIN") {
    return new NextResponse("Forbidden", { status: 403 });
  }


  const data = await prisma.plant.findMany({ orderBy: { createdAt: "desc" } });
  const rows = data.map((item) => ({
    id: item.id,
    code: item.code,
    name: item.name,
    type: item.type,
    environment: item.environment,
    species: item.species,
    variety: item.variety,
    status: item.status,
    zoneName: item.zoneName,
    createdAt: item.createdAt.toISOString(),
  }));


  return new NextResponse(toCsv(rows), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=plants.csv",
    },
  });
}
