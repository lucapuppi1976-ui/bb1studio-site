# Agri App — AI Work Order Preview V7.7

## Obiettivo

V7.7 introduce una preview operativa controllata che trasforma il decision dossier in un pacchetto revisionabile.

Il work order preview include:

- AiWorkOrderPreview;
- WorkOrderTaskDraft;
- WorkOrderInterventionDraft;
- WorkOrderExecutionConstraints;
- previewFingerprint;
- sourceDossierFingerprint;
- sourceCaseReportFingerprint;
- task draft;
- intervention draft;
- vincoli di esecuzione;
- pacchetto reviewer;
- export testuale e JSON.

## Endpoint operativo protetto

    /api/ops/ai-work-order-preview-dry-run

## Export package

- textWorkOrderReady=true
- jsonWorkOrderReady=true
- reviewerPacketReady=true
- taskCreationReady=false
- interventionCreationReady=false

## Safety

- providerCalled=false
- persistencePerformed=false
- taskCreated=false
- interventionCreated=false
- productPrescriptionPerformed=false
- dosageAdvicePerformed=false
- allowedToCreateTask=false
- allowedToCreateIntervention=false
- allowedToExecute=false
- humanReviewRequired=true
- redactedOutputOnly=true

## Guardrail

- nessuna chiamata AI live;
- nessuna chiave AI;
- nessun endpoint `/api/ai`;
- nessun endpoint `/api/diagnosis`;
- nessuna persistenza DB;
- nessuna modifica Prisma schema;
- nessuna creazione automatica di attività o interventi;
- nessuna prescrizione prodotto;
- nessun dosaggio;
- conversione manuale solo dopo revisione umana.

## Check automatico

    npm run ops:ai-work-order-preview-check

Con verifica live protetta:

    npm run ops:ai-work-order-preview-check -- --base https://bb1studio.com/agri_app --include-live

Usare `CRON_SECRET_VALUE` in ambiente shell. Non incollare il valore del secret in chat.
