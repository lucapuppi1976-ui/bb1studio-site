import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { PlantForm } from "@/components/plants/plant-form";
import { getPlantById } from "@/lib/data/plants";
import { updatePlant } from "@/lib/actions/plants";
import { requireSuperAdmin } from "@/lib/authz";
import { getTranslations } from "@/lib/i18n/server";
import { getOperationalText } from "@/lib/i18n/operational";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditPlantPage({ params }: Props) {
  await requireSuperAdmin();
  const { locale } = await getTranslations();
  const op = getOperationalText(locale);
  const { id } = await params;
  const plant = await getPlantById(id);

  if (!plant) notFound();

  return (
    <AppShell title={op.pages.editPlant} eyebrow={plant.code}>
      <PlantForm plant={plant} action={updatePlant.bind(null, plant.id)} submitLabel={op.actions.saveChanges} locale={locale} />
    </AppShell>
  );
}
