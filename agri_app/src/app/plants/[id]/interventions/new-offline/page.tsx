import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { OfflineInterventionForm } from "@/components/interventions/offline-intervention-form";
import { getPlantForIntervention } from "@/lib/data/interventions";
import { requireUser } from "@/lib/authz";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NewOfflineInterventionPage({ params }: Props) {
  await requireUser();
  const { id } = await params;
  const plant = await getPlantForIntervention(id);

  if (!plant) notFound();

  return (
    <AppShell title="Nuovo intervento offline" eyebrow={plant.code}>
      <OfflineInterventionForm plant={plant} />
    </AppShell>
  );
}
