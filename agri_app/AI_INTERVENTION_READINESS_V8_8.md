# Agri App — AI Intervention Readiness Matrix & Manual Approval Board V8.8

## Obiettivo

V8.8 introduce una funzionalità premium sostanziosa: matrice readiness intervento e approval board manuale.

Componenti:

- InterventionReadinessInput;
- InterventionReadinessReport;
- readinessMatrix;
- approvalBoard;
- decisionGates;
- manualConversionPackets;
- materialChecklist;
- blockerSummary.

## Endpoint operativo protetto

    /api/ops/ai-intervention-readiness-dry-run

## Capacità premium

- interventionReadinessReady=true
- approvalBoardReady=true
- decisionGatesReady=true
- manualConversionPacketReady=true
- materialChecklistReady=true
- blockerSummaryReady=true
- providerAiReady=false
- persistenceReady=false
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
- automaticTaskCreationAllowed=false
- automaticInterventionCreationAllowed=false
- automaticExecutionAllowed=false
- dbPersistenceAllowed=false
- publicShareAllowed=false
- productPrescriptionAllowed=false
- dosageAdviceAllowed=false
- humanReviewRequired=true
- manualConversionOnly=true
- localAnalysisOnly=true

## Guardrail

- nessuna chiamata provider AI live;
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

    npm run ops:ai-intervention-readiness-check

Con live protetto:

    npm run ops:ai-intervention-readiness-check -- --base https://bb1studio.com/agri_app --include-live

Usare `CRON_SECRET_VALUE` in ambiente shell. Non incollare il secret in chat.
