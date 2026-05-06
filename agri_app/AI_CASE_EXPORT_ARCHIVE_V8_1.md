# Agri App — AI Case Export Archive Pack V8.1

## Obiettivo

V8.1 introduce un archive pack scaricabile manualmente per il caso AI.

Componenti:

- AiCaseExportArchive;
- CaseExportArchiveInput;
- CaseExportArchiveFile;
- CaseExportArchiveManifest;
- archiveFingerprint;
- archiveReady.

## Endpoint operativo protetto

    /api/ops/ai-case-export-archive-dry-run

## Archive package

- archiveManifestReady=true
- textArchiveReady=true
- jsonArchiveReady=true
- redactionManifestReady=true
- fingerprintManifestReady=true
- downloadableArchiveReady=true
- publicShareReady=false
- dbPersistenceReady=false
- automaticTaskCreationReady=false
- automaticInterventionCreationReady=false
- automaticExecutionReady=false

## Safety invarianti

- providerCalled=false
- persistencePerformed=false
- taskCreated=false
- interventionCreated=false
- automaticExecutionPerformed=false
- publicSharePerformed=false
- productPrescriptionPerformed=false
- dosageAdvicePerformed=false
- manualDownloadOnly=true
- manualExportOnly=true
- humanReviewRequired=true

## Guardrail

- nessuna chiamata AI live;
- nessuna chiave AI;
- nessun endpoint `/api/ai`;
- nessun endpoint `/api/diagnosis`;
- nessuna persistenza DB;
- nessuna modifica Prisma schema;
- nessuna creazione automatica;
- nessuna esecuzione automatica;
- nessuna condivisione pubblica automatica;
- nessuna prescrizione prodotto;
- nessun dosaggio.

## Check automatico

    npm run ops:ai-case-export-archive-check

Con live protetto:

    npm run ops:ai-case-export-archive-check -- --base https://bb1studio.com/agri_app --include-live

Usare `CRON_SECRET_VALUE` in ambiente shell. Non incollare il secret in chat.
