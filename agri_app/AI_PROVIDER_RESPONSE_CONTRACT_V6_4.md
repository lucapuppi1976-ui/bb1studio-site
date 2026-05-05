# Agri App — AI Provider Response Contract V6.4

## Obiettivo

V6.4 definisce il contratto obbligatorio della futura risposta provider AI per diagnosi fotografica.

## Endpoint operativo protetto

    /api/ops/ai-provider-response-validate

## Schema

    agri-ai-diagnosis-response.v1

## Campi chiave

- visualSummary
- severity
- confidence
- hypotheses[]
- immediateActions[]
- additionalChecks[]
- escalationCriteria[]
- humanReviewRequired=true
- automaticTaskCreationAllowed=false
- persistenceAllowed=false

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

    npm run ops:ai-provider-response-check

Con verifica live protetta:

    npm run ops:ai-provider-response-check -- --base https://bb1studio.com/agri_app --include-live

Usare `CRON_SECRET_VALUE` in ambiente shell. Non incollare il valore del secret in chat.
