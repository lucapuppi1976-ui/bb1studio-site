import { redirect } from "next/navigation";
import { getPlantByCode } from "@/lib/data/plants";

type Props = {
  params: Promise<{ code: string }>;
};

export default async function PlantCodeResolverPage({ params }: Props) {
  const { code } = await params;
  const plant = await getPlantByCode(decodeURIComponent(code));

  if (!plant) {
    redirect("/plants");
  }

  redirect(`/plants/${plant.id}`);
}
