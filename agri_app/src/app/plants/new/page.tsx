import { AppShell } from "@/components/app-shell";
import { PlantForm } from "@/components/plants/plant-form";
import { createPlant } from "@/lib/actions/plants";
import { requireSuperAdmin } from "@/lib/authz";
import { getTranslations } from "@/lib/i18n/server";
import { getOperationalText } from "@/lib/i18n/operational";

export default async function NewPlantPage() {
  await requireSuperAdmin();
  const { locale } = await getTranslations();
  const op = getOperationalText(locale);

  return (
    <AppShell title={op.pages.newPlant} eyebrow={op.sections.identity}>
      <PlantForm action={createPlant} submitLabel={op.actions.createPlant} locale={locale} />
    </AppShell>
  );
}
