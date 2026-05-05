export default function OperationsAiProviderResponse() {
  const contractRows = [
    ["Endpoint", "/api/ops/ai-provider-response-validate"],
    ["Schema", "agri-ai-diagnosis-response.v1"],
    ["Validazione", "server-side"],
    ["Provider reale", "non chiamato"],
    ["Persistenza DB", "non consentita"],
    ["Human review", "obbligatoria"],
  ];

  const requiredFields = [
    "visualSummary",
    "severity",
    "confidence",
    "hypotheses[]",
    "immediateActions[]",
    "additionalChecks[]",
    "escalationCriteria[]",
    "humanReviewRequired=true",
  ];

  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-provider-response-contract="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Provider Response Contract
        </p>
        <h2 className="text-xl font-semibold">Validatore risposta provider</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          V6.4 definisce il formato obbligatorio della futura risposta AI. Ogni output dovrà essere
          validato prima di diventare pacchetto di revisione, piano d’azione o proposta operativa.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {contractRows.map(([label, value]) => (
          <div key={label} className="rounded-xl border p-4">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-1 font-semibold">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Campi obbligatori</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          {requiredFields.map((field) => (
            <li key={field}>{field}</li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Regole di sicurezza</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>automaticTaskCreationAllowed=false.</li>
          <li>persistenceAllowed=false.</li>
          <li>humanReviewRequired=true.</li>
          <li>externalProviderCalled=false fino ad abilitazione esplicita.</li>
          <li>Nessuna diagnosi definitiva senza revisione umana.</li>
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Check operativo</h3>
        <pre className="mt-3 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
          <code>npm run ops:ai-provider-response-check</code>
        </pre>
      </div>
    </section>
  );
}
