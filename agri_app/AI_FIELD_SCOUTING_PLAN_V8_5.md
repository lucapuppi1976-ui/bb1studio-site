# Agri App — AI Field Scouting Plan & Sampling Grid V8.5

## Obiettivo

V8.5 introduce una funzionalità premium sostanziosa: trasformare il caso fotografico in un piano di scouting campo.

Componenti:

- FieldScoutingInput;
- FieldScoutingPlan;
- priorityZones;
- samplingGrid;
- scoutingRoute;
- photoProtocol;
- escalationRules;
- humanReviewChecklist.

## Endpoint operativo protetto

    /api/ops/ai-field-scouting-plan-dry-run

## Capacità premium

- scoutingPlanReady=true
- samplingGridReady=true
- routeOptimizationReady=true
- photoProtocolReady=true
- escalationWorkflowReady=true
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

    npm run ops:ai-field-scouting-plan-check

Con live protetto:

    npm run ops:ai-field-scouting-plan-check -- --base https://bb1studio.com/agri_app --include-live

Usare `CRON_SECRET_VALUE` in ambiente shell. Non incollare il secret in chat.
