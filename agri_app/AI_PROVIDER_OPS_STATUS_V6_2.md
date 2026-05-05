# Agri App — AI Provider Ops Status V6.2

## Obiettivo

V6.2 aggiunge un endpoint operativo protetto per verificare lo stato server-side AI senza attivare provider reali.

## Endpoint

    /api/ops/ai-provider-status

Accesso solo tramite segreto operativo.

## Stato atteso

- providerCallsEnabled=false
- liveProviderEndpoint=false
- clientProviderCallsAllowed=false
- persistenceAllowed=false
- automaticTaskCreationAllowed=false
- humanReviewRequired=true

## Guardrail

- nessuna chiamata AI live;
- nessuna chiave AI esposta;
- nessun endpoint `/api/ai`;
- nessun endpoint `/api/diagnosis`;
- nessuna persistenza DB;
- nessuna modifica Prisma schema;
- nessuna creazione automatica di attività o interventi.

## Check automatico

    npm run ops:ai-provider-status-check

Con verifica live protetta:

    npm run ops:ai-provider-status-check -- --base https://bb1studio.com/agri_app --include-live

Usare `CRON_SECRET_VALUE` in ambiente shell. Non incollare il valore del secret in chat.
