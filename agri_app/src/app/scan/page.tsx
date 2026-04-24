import { AppShell } from "@/components/app-shell";
import { QRScanner } from "@/components/scan/qr-scanner";
import { requireUser } from "@/lib/authz";

export default async function ScanPage() {
  await requireUser();

  return (
    <AppShell title="Scanner QR" eyebrow="Camera">
      <QRScanner />
    </AppShell>
  );
}
