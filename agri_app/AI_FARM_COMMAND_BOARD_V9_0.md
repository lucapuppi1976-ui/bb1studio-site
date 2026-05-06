# Agri App — AI Farm Command Board & Cross-Case Priority Orchestrator V9.0

## Obiettivo

V9.0 introduce una funzionalità premium sostanziosa: Farm Command Board multi-caso.

Componenti:

- FarmCommandBoardInput;
- FarmCommandBoardReport;
- casePriorityQueue;
- crossFieldOverview;
- operationalWindows;
- resourceLoadPlan;
- escalationBoard;
- complianceSnapshot;
- executiveSummary.

## Endpoint operativo protetto

    /api/ops/ai-farm-command-board-dry-run

## Capacità premium

- farmCommandBoardReady=true
- crossCasePrioritizationReady=true
- crossFieldOverviewReady=true
- operationalWindowsReady=true
- resourceLoadPlanReady=true
- escalationBoardReady=true
- complianceSnapshotReady=true
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
- manualDispatchOnly=true
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

    npm run ops:ai-farm-command-board-check

Con live protetto:

    npm run ops:ai-farm-command-board-check -- --base https://bb1studio.com/agri_app --include-live

Usare `CRON_SECRET_VALUE` in ambiente shell. Non incollare il secret in chat.
