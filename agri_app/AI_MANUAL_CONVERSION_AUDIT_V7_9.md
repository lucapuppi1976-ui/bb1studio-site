# Agri App — AI Manual Conversion Audit V7.9

## Obiettivo

V7.9 introduce un audit trail esportabile per la conversione manuale dei work order AI.

Componenti:

- AiManualConversionAudit;
- ManualConversionAuditInput;
- ManualConversionAuditEvent;
- ManualConversionAuditExport;
- auditFingerprint;
- sourceGateFingerprint;
- sourcePreviewFingerprint;
- sourceDossierFingerprint;
- conversionAllowed;
- manualTaskConversionAllowed;
- manualInterventionConversionAllowed.

## Endpoint operativo protetto

    /api/ops/ai-manual-conversion-audit-dry-run

## Export package

- textAuditReady=true
- jsonAuditReady=true
- reviewerPacketReady=true
- automaticTaskCreationReady=false
- automaticInterventionCreationReady=false
- automaticExecutionReady=false
- dbPersistenceReady=false

## Safety invarianti

- providerCalled=false
- persistencePerformed=false
- taskCreated=false
- interventionCreated=false
- automaticExecutionPerformed=false
- productPrescriptionPerformed=false
- dosageAdvicePerformed=false
- manualConversionOnly=true
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
- nessuna prescrizione prodotto;
- nessun dosaggio.

## Check automatico

    npm run ops:ai-manual-conversion-audit-check

Con live protetto:

    npm run ops:ai-manual-conversion-audit-check -- --base https://bb1studio.com/agri_app --include-live

Usare `CRON_SECRET_VALUE` in ambiente shell. Non incollare il secret in chat.
