import Link from "next/link";

import PhotoDiagnosisIntake from "./PhotoDiagnosisIntake";

export default function AiPhotoDiagnosisPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8">
      <header className="flex flex-col gap-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Premium
        </p>
        <h1 className="text-3xl font-bold tracking-tight">Diagnosi fotografica AI</h1>
        <p className="max-w-3xl text-muted-foreground">
          Primo intake controllato per riconoscimento foto, identificazione problemi e proposta
          soluzioni. In questa release l’analisi AI non è ancora attiva.
        </p>
        <div className="flex flex-wrap gap-2">
          <Link className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-muted" href="/admin/operations">
            Operations Center
          </Link>
          <Link className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-muted" href="/admin">
            Admin Hub
          </Link>
        </div>
      </header>

      <PhotoDiagnosisIntake />
    </main>
  );
}
