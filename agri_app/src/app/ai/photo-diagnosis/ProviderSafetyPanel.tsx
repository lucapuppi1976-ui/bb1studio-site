"use client";

import { useMemo, useState } from "react";

import {
  createProviderSafetyContract,
  formatProviderSafetyContract,
  providerSafetyCapabilities,
} from "./photoDiagnosisProviderSafety";

export default function ProviderSafetyPanel() {
  const [copyStatus, setCopyStatus] = useState("");
  const contract = useMemo(() => createProviderSafetyContract(), []);
  const contractText = useMemo(() => formatProviderSafetyContract(contract), [contract]);

  async function copyContract() {
    try {
      await navigator.clipboard.writeText(contractText);
      setCopyStatus("Provider request contract copiato negli appunti.");
    } catch {
      setCopyStatus("Copia non riuscita. Copia manualmente il testo.");
    }
  }

  return (
    <article className="rounded-2xl border p-5 shadow-sm" data-ai-provider-safety-harness="true">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            AI Provider Safety Harness
          </p>
          <h2 className="text-xl font-semibold">Contratto sicurezza per provider AI</h2>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            Questo livello prepara l’integrazione futura con un provider AI reale. In questa release
            non viene eseguita nessuna chiamata esterna, nessuna immagine viene inviata fuori dal client
            e nessun dato viene salvato automaticamente.
          </p>
        </div>
        <button
          className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-muted"
          type="button"
          onClick={copyContract}
        >
          Copia provider contract
        </button>
      </div>

      {copyStatus ? (
        <p className="mt-4 rounded-xl border p-3 text-sm text-muted-foreground">{copyStatus}</p>
      ) : null}

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Stato provider</p>
          <p className="mt-1 text-lg font-semibold">Non attivo</p>
          <p className="mt-2 text-sm text-muted-foreground">Nessuna chiamata provider abilitata.</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Client policy</p>
          <p className="mt-1 text-lg font-semibold">No direct call</p>
          <p className="mt-2 text-sm text-muted-foreground">Il client non potrà chiamare provider AI.</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Review policy</p>
          <p className="mt-1 text-lg font-semibold">Human review required</p>
          <p className="mt-2 text-sm text-muted-foreground">La revisione umana resta obbligatoria.</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1.1fr]">
        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Capacità controllate</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            {providerSafetyCapabilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h3 className="mt-5 font-semibold">Output vietati</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            {contract.prohibitedOutput.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Backend requirements</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            {contract.backendRequirements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h3 className="mt-5 font-semibold">Rollout controllato</h3>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
            {contract.rolloutStages.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
      </div>

      <pre className="mt-4 max-h-96 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
        <code>{contractText}</code>
      </pre>
    </article>
  );
}
