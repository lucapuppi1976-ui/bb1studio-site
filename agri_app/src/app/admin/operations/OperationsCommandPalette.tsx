"use client";

import { useMemo, useState } from "react";

type CommandItem = {
  id: string;
  title: string;
  description: string;
  command: string;
  protected?: boolean;
};

const commandGroups: Array<{
  title: string;
  description: string;
  commands: CommandItem[];
}> = [
  {
    title: "Controlli standard",
    description: "Controlli non mutanti eseguibili senza credenziali sensibili.",
    commands: [
      {
        id: "quick-standard",
        title: "Quick check live",
        description: "Checklist operativa standard sul branch live.",
        command: "npm run ops:quick-check -- --expect-branch checkpoint/live-stable",
      },
      {
        id: "coverage",
        title: "Copertura checklist",
        description: "Verifica che il quick check includa tutti i controlli principali.",
        command: "npm run ops:quick-coverage-check",
      },
      {
        id: "runbook",
        title: "Runbook check",
        description: "Verifica file, alias e contenuti del runbook operativo.",
        command: "npm run ops:runbook-check",
      },
    ],
  },
  {
    title: "Controlli protetti",
    description: "Usano variabili ambiente temporanee. Non inserire valori sensibili nella UI.",
    commands: [
      {
        id: "quick-protected",
        title: "Quick check protetto",
        description: "Validazione protetta con valore incollato solo nel terminale.",
        protected: true,
        command:
          "read -s -r -p \"Incolla CRON_SECRET live e premi Invio: \" CRON_SECRET_VALUE\n" +
          "echo\n" +
          "export CRON_SECRET_VALUE\n" +
          "npm run ops:quick-check -- --include-protected --expect-branch checkpoint/live-stable\n" +
          "unset CRON_SECRET_VALUE",
      },
      {
        id: "live-gate",
        title: "Release gate live",
        description: "Release gate secret-safe prima del merge o per controllo post deploy.",
        protected: true,
        command:
          "read -s -r -p \"Incolla CRON_SECRET live e premi Invio: \" CRON_SECRET_VALUE\n" +
          "echo\n" +
          "export CRON_SECRET_VALUE\n" +
          "npm run ops:release-gate:live\n" +
          "unset CRON_SECRET_VALUE",
      },
    ],
  },
  {
    title: "Build sicura",
    description: "Build locale senza puntare al database live e senza mutazioni schema.",
    commands: [
      {
        id: "safe-build",
        title: "Build sicura",
        description: "Sequenza standard prima di una verifica locale.",
        command: "unset DATABASE_URL LIVE_DATABASE_URL\nnpx prisma generate\nnpm run build",
      },
      {
        id: "db-safety",
        title: "DB safety DEV",
        description: "Verifica che l’ambiente locale punti al DB DEV.",
        command: "npm run ops:db-safety",
      },
    ],
  },
  {
    title: "Route admin",
    description: "Monitoraggio route admin introdotte nelle release V5.",
    commands: [
      {
        id: "admin-routes",
        title: "Route admin live",
        description: "Verifica /admin, /admin/operations e /admin/system.",
        command: "npm run ops:admin-live-routes-check",
      },
      {
        id: "admin-monitoring",
        title: "Coverage route admin",
        description: "Verifica che gli script monitorino le route admin.",
        command: "npm run ops:admin-route-monitoring-check",
      },
    ],
  },
  {
    title: "Rollback e tag",
    description: "Template operativi da adattare al nome versione.",
    commands: [
      {
        id: "rollback-template",
        title: "Rollback branch",
        description: "Crea un checkpoint di rollback prima del merge live.",
        command:
          "ROLLBACK_BRANCH=\"checkpoint/live-rollback-pre-NOME-VERSIONE-$(date +%Y%m%d-%H%M%S)\"\n" +
          "git branch \"$ROLLBACK_BRANCH\" HEAD\n" +
          "git push origin \"$ROLLBACK_BRANCH\"",
      },
      {
        id: "tag-template",
        title: "Tag checkpoint",
        description: "Crea tag finale dopo verifiche live.",
        command:
          "TAG_NAME=\"checkpoint/live-NOME-VERSIONE-$(date +%Y%m%d-%H%M%S)\"\n" +
          "git tag -a \"$TAG_NAME\" -m \"Live checkpoint NOME VERSIONE\"\n" +
          "git push origin \"$TAG_NAME\"",
      },
    ],
  },
];

function flatCommands() {
  return commandGroups.flatMap((group) => group.commands);
}

export default function OperationsCommandPalette() {
  const [query, setQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const commands = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return commandGroups;
    }

    return commandGroups
      .map((group) => ({
        ...group,
        commands: group.commands.filter((item) =>
          [group.title, item.title, item.description, item.command]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery),
        ),
      }))
      .filter((group) => group.commands.length > 0);
  }, [query]);

  async function copyCommand(item: CommandItem) {
    await navigator.clipboard.writeText(item.command);
    setCopiedId(item.id);

    window.setTimeout(() => {
      setCopiedId((current) => (current === item.id ? null : current));
    }, 2500);
  }

  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-operations-command-palette="true">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Command palette
          </p>
          <h2 className="text-xl font-semibold">Comandi operativi copiabili</h2>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            Cerca, copia e incolla nel terminale. La palette non contiene valori sensibili e non
            salva dati nel browser.
          </p>
        </div>
        <div className="rounded-full border px-3 py-1 text-sm font-medium">
          {flatCommands().length} comandi
        </div>
      </div>

      <label className="mt-5 block">
        <span className="text-sm font-medium">Cerca comando</span>
        <input
          className="mt-2 w-full rounded-xl border bg-background px-4 py-2 text-sm outline-none"
          placeholder="quick, route, build, rollback…"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>

      <div className="mt-5 grid gap-5">
        {commands.map((group) => (
          <article key={group.title} className="rounded-xl border p-4">
            <div>
              <h3 className="font-semibold">{group.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{group.description}</p>
            </div>

            <div className="mt-4 grid gap-3">
              {group.commands.map((item) => (
                <div key={item.id} className="rounded-xl border p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-semibold">{item.title}</h4>
                        {item.protected ? (
                          <span className="rounded-full border px-2 py-1 text-xs font-semibold uppercase">
                            protetto
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <button
                      className="rounded-xl border px-3 py-2 text-sm font-medium hover:bg-muted"
                      type="button"
                      onClick={() => copyCommand(item)}
                    >
                      {copiedId === item.id ? "Copiato" : "Copia"}
                    </button>
                  </div>

                  <pre className="mt-3 overflow-x-auto rounded-lg border bg-black p-3 text-xs text-white">
                    <code>{item.command}</code>
                  </pre>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
