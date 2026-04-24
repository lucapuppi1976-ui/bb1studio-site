import QRCode from "qrcode";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { getPlantById } from "@/lib/data/plants";
import { buildPlantPublicUrlByCode } from "@/lib/qr/build-plant-url";
import { requireUser } from "@/lib/authz";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PlantQrPage({ params }: Props) {
  await requireUser();
  const { id } = await params;
  const plant = await getPlantById(id);

  if (!plant) notFound();

  const publicUrl = buildPlantPublicUrlByCode(plant.code);
  const qrDataUrl = await QRCode.toDataURL(publicUrl, {
    margin: 1,
    width: 320,
  });

  return (
    <AppShell title="QR pianta" eyebrow={plant.code}>
      <div className="grid gap-6 md:grid-cols-[360px_1fr]">
        <div className="rounded-2xl border border-white/10 bg-white p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qrDataUrl} alt={`QR ${plant.code}`} className="w-full" />
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
          <p className="text-sm text-white/50">URL pubblico</p>
          <p className="mt-2 break-all">{publicUrl}</p>
        </div>
      </div>
    </AppShell>
  );
}
