import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerEnvValidation, getPublicEnv } from "@/lib/env";

export async function GET() {
  let db = false;
  try {
    await prisma.$queryRawUnsafe("SELECT 1");
    db = true;
  } catch {
    db = false;
  }

  const env = getServerEnvValidation();

  return NextResponse.json({
    db,
    envValid: env.success,
    publicEnv: getPublicEnv(),
    missingServerEnv: env.success ? [] : env.error.issues.map((issue) => issue.path.join(".")),
  });
}
