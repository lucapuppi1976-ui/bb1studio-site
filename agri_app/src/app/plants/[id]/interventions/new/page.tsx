import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { InterventionForm } from "@/components/interventions/intervention-form";
import { getPlantForIntervention } from "@/lib/data/interventions";
import { createIntervention } from "@/lib/actions/interventions";
import { requireUser } from "@/lib/authz";
import { getTranslations } from "@/lib/i18n/server";
import { getOperationalText } from "@/lib/i18n/operational";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NewInterventionPage({ params }: Props) {
  await requireUser();
  const { locale } = await getTranslations();
  const op = getOperationalText(locale);
  const { id } = await params;
  const plant = await getPlantForIntervention(id);

  if (!plant) notFound();

  return (
    <AppShell title={op.pages.newIntervention} eyebrow={plant.code}>
      <InterventionForm plant={plant} action={createIntervention} submitLabel={op.actions.createIntervention} locale={locale} />
    </AppShell>
  );
}
