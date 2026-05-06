# Agri App — AI Field Risk Heatmap & Zone Prioritization V8.6

## Obiettivo

V8.6 introduce una funzionalità premium sostanziosa: mappa di rischio campo per zone con priorità operative.

Componenti:

- FieldRiskHeatmapInput;
- FieldRiskHeatmapReport;
- heatmapCells;
- spreadModel;
- workQueue;
- samplingFocus;
- reviewerQueue;
- mapLegend.

## Endpoint operativo protetto

    /api/ops/ai-field-risk-heatmap-dry-run

## Capacità premium

- riskHeatmapReady=true
- zonePrioritizationReady=true
- spreadModelReady=true
- workQueueReady=true
- samplingFocusReady=true
- reviewerQueueReady=true
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
- humanReviewRequired=true
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

    npm run ops:ai-field-risk-heatmap-check

Con live protetto:

    npm run ops:ai-field-risk-heatmap-check -- --base https://bb1studio.com/agri_app --include-live

Usare `CRON_SECRET_VALUE` in ambiente shell. Non incollare il secret in chat.
