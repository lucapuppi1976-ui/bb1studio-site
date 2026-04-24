"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function parseDate(value: FormDataEntryValue | null) {
  if (!value || typeof value !== "string" || !value.trim()) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function parseFloatOrNull(value: FormDataEntryValue | null) {
  if (!value || typeof value !== "string" || !value.trim()) return null;
  const parsed = Number.parseFloat(value);
  return Number.isNaN(parsed) ? null : parsed;
}

export async function createPlant(formData: FormData) {
  const plant = await prisma.plant.create({
    data: {
      code: String(formData.get("code") || "").trim(),
      name: String(formData.get("name") || "").trim() || null,
      type: String(formData.get("type") || "PLANT") as any,
      environment: String(formData.get("environment") || "INDOOR") as any,
      species: String(formData.get("species") || "").trim(),
      variety: String(formData.get("variety") || "").trim() || null,
      sowingDate: parseDate(formData.get("sowingDate")),
      germinationDate: parseDate(formData.get("germinationDate")),
      transplantDate: parseDate(formData.get("transplantDate")),
      potSizeLiters: parseFloatOrNull(formData.get("potSizeLiters")),
      substrate: String(formData.get("substrate") || "").trim() || null,
      heightCm: parseFloatOrNull(formData.get("heightCm")),
      diameterMm: parseFloatOrNull(formData.get("diameterMm")),
      zoneName: String(formData.get("zoneName") || "").trim() || null,
      latitude: parseFloatOrNull(formData.get("latitude")),
      longitude: parseFloatOrNull(formData.get("longitude")),
      notes: String(formData.get("notes") || "").trim() || null,
      status: String(formData.get("status") || "ACTIVE") as any,
    },
  });

  revalidatePath("/plants");
  redirect(`/plants/${plant.id}`);
}

export async function updatePlant(plantId: string, formData: FormData) {
  await prisma.plant.update({
    where: { id: plantId },
    data: {
      code: String(formData.get("code") || "").trim(),
      name: String(formData.get("name") || "").trim() || null,
      type: String(formData.get("type") || "PLANT") as any,
      environment: String(formData.get("environment") || "INDOOR") as any,
      species: String(formData.get("species") || "").trim(),
      variety: String(formData.get("variety") || "").trim() || null,
      sowingDate: parseDate(formData.get("sowingDate")),
      germinationDate: parseDate(formData.get("germinationDate")),
      transplantDate: parseDate(formData.get("transplantDate")),
      potSizeLiters: parseFloatOrNull(formData.get("potSizeLiters")),
      substrate: String(formData.get("substrate") || "").trim() || null,
      heightCm: parseFloatOrNull(formData.get("heightCm")),
      diameterMm: parseFloatOrNull(formData.get("diameterMm")),
      zoneName: String(formData.get("zoneName") || "").trim() || null,
      latitude: parseFloatOrNull(formData.get("latitude")),
      longitude: parseFloatOrNull(formData.get("longitude")),
      notes: String(formData.get("notes") || "").trim() || null,
      status: String(formData.get("status") || "ACTIVE") as any,
    },
  });

  revalidatePath("/plants");
  revalidatePath(`/plants/${plantId}`);
  redirect(`/plants/${plantId}`);
}
