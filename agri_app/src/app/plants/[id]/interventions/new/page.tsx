import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { InterventionForm } from "@/components/interventions/intervention-form";
import { getPlantForIntervention } from "@/lib/data/interventions";
import { createIntervention } from "@/lib/actions/interventions";
import { requireUser } from "@/lib/authz";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NewInterventionPage({ params }: Props) {
  await requireUser();
  const { id } = await params;
  const plant = await getPlantForIntervention(id);

  if (!plant) notFound();

  return (
    <AppShell title="Nuovo intervento" eyebrow={plant.code}>
      <InterventionForm plant={plant} action={createIntervention} submitLabel="Crea intervento" />
    </AppShell>
  );
}
