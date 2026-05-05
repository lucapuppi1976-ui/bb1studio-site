import Link from "next/link";
import OperationsDynamicPanel from "./OperationsDynamicPanel";
import OperationsUxPolish from "./OperationsUxPolish";
import OperationsCommandPalette from "./OperationsCommandPalette";
import OperationsAiReadiness from "./OperationsAiReadiness";
import OperationsAiProviderStatus from "./OperationsAiProviderStatus";
import OperationsAiProviderDryRun from "./OperationsAiProviderDryRun";
import OperationsAiProviderResponse from "./OperationsAiProviderResponse";
import OperationsAiPipelineDryRun from "./OperationsAiPipelineDryRun";
import OperationsAiPhotoQualityGate from "./OperationsAiPhotoQualityGate";
import OperationsAiEvidenceBundle from "./OperationsAiEvidenceBundle";
import OperationsAiProviderRequestPreview from "./OperationsAiProviderRequestPreview";
import OperationsAiOrchestratorDryRun from "./OperationsAiOrchestratorDryRun";

const sections = [
  {
    title: "Controlli rapidi",
    description: "Checklist non mutante per validare stato DEV, live pubblico, runbook, redazione log e copertura ops.",
    commands: [
      "npm run ops:quick-check -- --expect-branch checkpoint/live-stable",
      "npm run ops:quick-coverage-check",
      "npm run ops:runbook-check",
    ],
  },
  {
    title: "Controlli protetti",
    description: "Usare solo CRON_SECRET_VALUE o CRON_SECRET da ambiente. Non passare secret tramite argomenti npm.",
    commands: [
      "read -s -r -p \"Incolla CRON_SECRET live e premi Invio: \" CRON_SECRET_VALUE",
      "export CRON_SECRET_VALUE",
      "npm run ops:quick-check -- --include-protected --expect-branch checkpoint/live-stable",
      "npm run ops:release-gate:live",
      "unset CRON_SECRET_VALUE",
    ],
  },
  {
    title: "Build sicura",
    description: "Build locale senza puntare al database live e senza mutazioni schema.",
    commands: [
      "unset DATABASE_URL LIVE_DATABASE_URL",
      "npx prisma generate",
      "npm run build",
    ],
  },
  {
    title: "Rollback e checkpoint",
    description: "Prima di ogni merge live creare un rollback branch; dopo verifica live creare un tag checkpoint.",
    commands: [
      "ROLLBACK_BRANCH=\"checkpoint/live-rollback-pre-NOME-VERSIONE-$(date +%Y%m%d-%H%M%S)\"",
      "git branch \"$ROLLBACK_BRANCH\" HEAD",
      "git push origin \"$ROLLBACK_BRANCH\"",
      "TAG_NAME=\"checkpoint/live-NOME-VERSIONE-$(date +%Y%m%d-%H%M%S)\"",
      "git tag -a \"$TAG_NAME\" -m \"Live checkpoint NOME VERSIONE\"",
      "git push origin \"$TAG_NAME\"",
    ],
  },
];

const statusCards = [
  {
    label: "Live pubblico",
    value: "https://bb1studio.com/agri_app",
    tone: "ok",
  },
  {
    label: "Branch live",
    value: "checkpoint/live-stable",
    tone: "ok",
  },
  {
    label: "Email live",
    value: "disattivate",
    tone: "safe",
  },
  {
    label: "ENABLE_EMAIL_NOTIFICATIONS",
    value: "false",
    tone: "safe",
  },
  {
    label: "Cron reale in-app",
    value: "attivo su Render",
    tone: "ok",
  },
  {
    label: "DB/Prisma schema",
    value: "invariati",
    tone: "safe",
  },
];

const rules = [
  "NON fare prisma db push salvo istruzione esplicita.",
  "NON usare il DB live nei test locali.",
  "Il CRON_SECRET del Web Service Render e del Render Cron Job devono essere identici.",
  "Dopo modifica del CRON_SECRET sul Web Service usare Save and deploy oppure Save, rebuild, and deploy.",
  "Non passare il CRON_SECRET come argomento da riga di comando.",
  "Il 403 in ops:log-redaction-check è previsto: usa un fake secret per verificare la redazione.",
];

function Badge({ tone }: { tone: string }) {
  const label = tone === "safe" ? "SAFE" : "OK";

  return (
    <span className="rounded-full border px-2 py-1 text-xs font-semibold uppercase tracking-wide">
      {label}
    </span>
  );
}

function CommandBlock({ commands }: { commands: string[] }) {
  return (
    <pre className="overflow-x-auto rounded-xl border bg-black p-4 text-sm text-white">
      <code>{commands.join("\n")}</code>
    </pre>
  );
}

export default function AdminOperationsPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8">
      <header className="flex flex-col gap-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Admin Operations Center
        </p>
        <h1 className="text-3xl font-bold tracking-tight">Centro operativo Agri App</h1>
        <p className="max-w-3xl text-muted-foreground">
          Runbook operativo visuale per controlli live, release gate, gestione CRON_SECRET,
          build sicura, rollback e checkpoint. Questa pagina non mostra secret e non esegue
          mutazioni sui dati.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statusCards.map((card) => (
          <article key={card.label} className="rounded-2xl border p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-muted-foreground">{card.label}</p>
                <p className="mt-2 break-words text-lg font-semibold">{card.value}</p>
              </div>
              <Badge tone={card.tone} />
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border p-5 shadow-sm">
        <h2 className="text-xl font-semibold">Regole operative fondamentali</h2>
        <ul className="mt-4 grid gap-3">
          {rules.map((rule) => (
            <li key={rule} className="rounded-xl border p-3 text-sm">
              {rule}
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-5">
        {sections.map((section) => (
          <article key={section.title} className="rounded-2xl border p-5 shadow-sm">
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{section.description}</p>
            <div className="mt-4">
              <CommandBlock commands={section.commands} />
            </div>
          </article>
        ))}
      </section>

      <OperationsDynamicPanel />

      <OperationsUxPolish />

      <OperationsCommandPalette />

      <OperationsAiReadiness />
      <OperationsAiProviderStatus />
      <OperationsAiProviderDryRun />
      <OperationsAiProviderResponse />
      <OperationsAiPipelineDryRun />
      <OperationsAiPhotoQualityGate />
      <OperationsAiEvidenceBundle />
      <OperationsAiProviderRequestPreview />
      <OperationsAiOrchestratorDryRun />

      <section className="rounded-2xl border p-5 shadow-sm">
        <h2 className="text-xl font-semibold">Link operativi</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Link className="rounded-xl border p-4 hover:bg-muted" href="/admin">
            Admin Hub
          </Link>
          <Link className="rounded-xl border p-4 hover:bg-muted" href="/admin/system">
            Admin System Cockpit
          </Link>
          <Link className="rounded-xl border p-4 hover:bg-muted" href="/settings/notifications">
            Impostazioni notifiche
          </Link>
          <Link className="rounded-xl border p-4 hover:bg-muted" href="/notifications">
            Centro notifiche
          </Link>
          <Link className="rounded-xl border p-4 hover:bg-muted" href="/recurring-tasks">
            Programmazioni ricorrenti
          </Link>
        </div>
      </section>
    </main>
  );
}
