# Agri App — AI Case Export Bundle V8.0

## Obiettivo

V8.0 introduce un bundle esportabile unico per il caso AI.

Componenti:

- AiCaseExportBundle;
- CaseExportBundleInput;
- CaseExportArtifact;
- CaseExportRedactionRule;
- bundleFingerprint;
- sourceAuditFingerprint;
- sourceGateFingerprint;
- sourcePreviewFingerprint;
- sourceDossierFingerprint;
- artifactCount;
- readyArtifactCount;
- redactedArtifactCount.

## Endpoint operativo protetto

    /api/ops/ai-case-export-bundle-dry-run

## Export package

- textBundleReady=true
- jsonBundleReady=true
- reviewerPacketReady=true
- safetySummaryReady=true
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

    npm run ops:ai-case-export-bundle-check

Con live protetto:

    npm run ops:ai-case-export-bundle-check -- --base https://bb1studio.com/agri_app --include-live

Usare `CRON_SECRET_VALUE` in ambiente shell. Non incollare il secret in chat.
