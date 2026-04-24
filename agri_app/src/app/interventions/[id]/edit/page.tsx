import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { InterventionForm } from "@/components/interventions/intervention-form";
import { getInterventionById } from "@/lib/data/interventions";
import { updateIntervention } from "@/lib/actions/interventions";
import { requireUser } from "@/lib/authz";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditInterventionPage({ params }: Props) {
  await requireUser();
  const { id } = await params;
  const intervention = await getInterventionById(id);

  if (!intervention) notFound();

  return (
    <AppShell title="Modifica intervento" eyebrow={intervention.plant.code}>
      <InterventionForm
        plant={intervention.plant}
        intervention={intervention}
        action={updateIntervention.bind(null, intervention.id)}
        submitLabel="Salva modifiche"
      />
    </AppShell>
  );
}
