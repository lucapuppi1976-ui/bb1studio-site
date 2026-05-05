# Agri App — AI Diagnosis Case File V7.1

## Obiettivo

V7.1 introduce il case file diagnostico AI dry-run.

Il sistema produce:

- caseFileFingerprint;
- auditTrail;
- reportText;
- export JSON;
- stato del fascicolo;
- safety summary;
- revisione umana obbligatoria.

## Endpoint operativo protetto

    /api/ops/ai-diagnosis-case-file-dry-run

## Output chiave

- caseFileId
- caseFileFingerprint
- auditTrail
- reportText
- jsonReady
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
- allowedToExecute=false;
- revisione umana obbligatoria.

## Check automatico

    npm run ops:ai-case-file-check

Con verifica live protetta:

    npm run ops:ai-case-file-check -- --base https://bb1studio.com/agri_app --include-live

Usare `CRON_SECRET_VALUE` in ambiente shell. Non incollare il valore del secret in chat.
