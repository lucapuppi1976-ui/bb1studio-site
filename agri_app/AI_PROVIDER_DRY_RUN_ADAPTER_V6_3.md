# Agri App — AI Provider Dry-Run Adapter V6.3

## Obiettivo

V6.3 introduce un adapter server-side dry-run per preparare l’integrazione futura con un provider AI reale.

## Endpoint operativo protetto

    /api/ops/ai-provider-dry-run

Accesso solo tramite segreto operativo.

## Stato atteso

- externalProviderCalled=false
- providerCallsEnabled=false
- persistenceAllowed=false
- automaticTaskCreationAllowed=false
- humanReviewRequired=true

## Funzionalità

- normalizzazione input diagnosi fotografica;
- costruzione provider request simulata;
- risultato provider simulato;
- output strutturato;
- guardrail server-side.

## Guardrail

- nessuna chiamata AI live;
- nessuna chiave AI;
- nessun endpoint `/api/ai`;
- nessun endpoint `/api/diagnosis`;
- nessuna persistenza DB;
- nessuna modifica Prisma schema;
- nessuna creazione automatica di attività o interventi;
- revisione umana obbligatoria.

## Check automatico

    npm run ops:ai-provider-dry-run-check

Con verifica live protetta:

    npm run ops:ai-provider-dry-run-check -- --base https://bb1studio.com/agri_app --include-live

Usare `CRON_SECRET_VALUE` in ambiente shell. Non incollare il valore del secret in chat.
