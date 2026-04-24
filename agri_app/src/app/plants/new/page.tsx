import { AppShell } from "@/components/app-shell";
import { PlantForm } from "@/components/plants/plant-form";
import { createPlant } from "@/lib/actions/plants";
import { requireSuperAdmin } from "@/lib/authz";

export default async function NewPlantPage() {
  await requireSuperAdmin();

  return (
    <AppShell title="Nuova pianta" eyebrow="Super admin">
      <PlantForm action={createPlant} submitLabel="Crea pianta" />
    </AppShell>
  );
}
