# Agri App — AI Diagnosis Pipeline Dry-Run V6.5

## Obiettivo

V6.5 collega in una pipeline dry-run end-to-end gli elementi AI già preparati:

- intake diagnosi fotografica;
- provider request dry-run;
- provider response contract;
- validazione risposta;
- bozza diagnosi;
- piano d’azione;
- pacchetto revisione umana.

## Endpoint operativo protetto

    /api/ops/ai-diagnosis-pipeline-dry-run

## Stato atteso

- externalProviderCalled=false
- providerCallsEnabled=false
- persistenceAllowed=false
- automaticTaskCreationAllowed=false
- automaticInterventionCreationAllowed=false
- humanReviewRequired=true

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

    npm run ops:ai-pipeline-dry-run-check

Con verifica live protetta:

    npm run ops:ai-pipeline-dry-run-check -- --base https://bb1studio.com/agri_app --include-live

Usare `CRON_SECRET_VALUE` in ambiente shell. Non incollare il valore del secret in chat.
