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

export async function createIntervention(formData: FormData) {
  const plantId = String(formData.get("plantId") || "");

  const created = await prisma.intervention.create({
    data: {
      plantId,
      type: String(formData.get("type") || "OTHER") as any,
      title: String(formData.get("title") || "").trim(),
      description: String(formData.get("description") || "").trim() || null,
      scheduledDate: parseDate(formData.get("scheduledDate")),
      completedAt: parseDate(formData.get("completedAt")),
      operatorName: String(formData.get("operatorName") || "").trim() || null,
      beforeImageUrl: String(formData.get("beforeImageUrl") || "").trim() || null,
      afterImageUrl: String(formData.get("afterImageUrl") || "").trim() || null,
      waterLiters: parseFloatOrNull(formData.get("waterLiters")),
      productName: String(formData.get("productName") || "").trim() || null,
      dosage: String(formData.get("dosage") || "").trim() || null,
      heightCm: parseFloatOrNull(formData.get("heightCm")),
      notes: String(formData.get("notes") || "").trim() || null,
    },
  });

  revalidatePath("/plants");
  revalidatePath(`/plants/${plantId}`);
  revalidatePath("/interventions");
  redirect(`/interventions/${created.id}`);
}

export async function updateIntervention(interventionId: string, formData: FormData) {
  const current = await prisma.intervention.findUnique({ where: { id: interventionId } });
  if (!current) throw new Error("Intervento non trovato.");

  await prisma.intervention.update({
    where: { id: interventionId },
    data: {
      type: String(formData.get("type") || "OTHER") as any,
      title: String(formData.get("title") || "").trim(),
      description: String(formData.get("description") || "").trim() || null,
      scheduledDate: parseDate(formData.get("scheduledDate")),
      completedAt: parseDate(formData.get("completedAt")),
      operatorName: String(formData.get("operatorName") || "").trim() || null,
      beforeImageUrl: String(formData.get("beforeImageUrl") || "").trim() || null,
      afterImageUrl: String(formData.get("afterImageUrl") || "").trim() || null,
      waterLiters: parseFloatOrNull(formData.get("waterLiters")),
      productName: String(formData.get("productName") || "").trim() || null,
      dosage: String(formData.get("dosage") || "").trim() || null,
      heightCm: parseFloatOrNull(formData.get("heightCm")),
      notes: String(formData.get("notes") || "").trim() || null,
    },
  });

  revalidatePath("/interventions");
  revalidatePath(`/interventions/${interventionId}`);
  revalidatePath(`/plants/${current.plantId}`);
  redirect(`/interventions/${interventionId}`);
}
