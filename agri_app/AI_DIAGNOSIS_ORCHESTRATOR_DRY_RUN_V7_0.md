# Agri App — AI Diagnosis Orchestrator Dry Run V7.0

## Obiettivo

V7.0 introduce un orchestratore completo dry-run per la futura diagnosi fotografica AI.

Il sistema collega:

- evidence bundle;
- provider request preview;
- syntheticProviderResponse;
- responseValidation;
- operationalDecision;
- revisione umana obbligatoria;
- safety report finale.

## Endpoint operativo protetto

    /api/ops/ai-diagnosis-orchestrator-dry-run

## Output chiave

- syntheticProviderResponse
- responseValidation
- operationalDecision
- allowedToExecute=false
- providerCalled=false
- persistencePerformed=false
- automaticTaskCreationPerformed=false
- automaticInterventionCreationPerformed=false
- humanReviewRequired=true

## Guardrail

- nessuna chiamata AI live;
- nessuna chiave AI;
- nessun endpoint `/api/ai`;
- nessun endpoint `/api/diagnosis`;
- nessuna persistenza DB;
- nessuna modifica Prisma schema;
- nessuna creazione automatica di attività o interventi;
- providerCallsEnabled=false;
- externalProviderCalled=false;
- clientProviderCallsAllowed=false;
- humanReviewRequired=true.

## Check automatico

    npm run ops:ai-orchestrator-dry-run-check

Con verifica live protetta:

    npm run ops:ai-orchestrator-dry-run-check -- --base https://bb1studio.com/agri_app --include-live

Usare `CRON_SECRET_VALUE` in ambiente shell. Non incollare il valore del secret in chat.
