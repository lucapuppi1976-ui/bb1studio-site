# Agri App — AI Case Outcome Learning Loop & Memory Update Draft V9.7

## Obiettivo

V9.7 introduce una funzionalità premium sostanziosa: learning loop locale da outcome osservato e bozza aggiornamento memoria.

Componenti:

- CaseOutcomeLearningInput;
- CaseOutcomeLearningReport;
- outcomeTimeline;
- recommendationOutcomeMatrix;
- lessonCards;
- memoryUpdateDrafts;
- driftSignals;
- reviewerLearningBriefing;
- learningExportPacket;
- learningSummary.

## Endpoint operativo protetto

    /api/ops/ai-case-outcome-learning-dry-run

## Capacità premium

- caseOutcomeLearningReady=true
- outcomeTimelineReady=true
- recommendationOutcomeMatrixReady=true
- lessonCardsReady=true
- memoryUpdateDraftsReady=true
- driftSignalsReady=true
- reviewerLearningBriefingReady=true
- learningExportPacketReady=true
- providerAiReady=false
- persistenceReady=false
- memoryPersistenceReady=false
- automaticTaskCreationReady=false
- automaticInterventionCreationReady=false
- automaticExecutionReady=false

## Safety invarianti

- providerCalled=false
- persistencePerformed=false
- memoryPersistencePerformed=false
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
- memoryPersistenceAllowed=false
- publicShareAllowed=false
- productPrescriptionAllowed=false
- dosageAdviceAllowed=false
- manualDispatchOnly=true
- humanReviewRequired=true
- localAnalysisOnly=true
- localLearningOnly=true
- localMemoryOnly=true

## Nota

Il learning loop V9.7 è locale e dry-run. Non crea memoria persistente DB, non aggiorna automaticamente la memoria e non allena un provider AI. Ogni update draft richiede revisione umana.

## Guardrail

- nessuna chiamata provider AI live;
- nessuna chiave AI;
- nessun endpoint `/api/ai`;
- nessun endpoint `/api/diagnosis`;
- nessuna memoria persistente DB;
- nessuna persistenza DB;
- nessun aggiornamento memoria automatico;
- nessuna modifica Prisma schema;
- nessuna creazione automatica;
- nessuna esecuzione automatica;
- nessuna condivisione pubblica automatica;
- nessuna prescrizione prodotto;
- nessun dosaggio.

## Check automatico

    npm run ops:ai-case-outcome-learning-check

Con live protetto:

    npm run ops:ai-case-outcome-learning-check -- --base https://bb1studio.com/agri_app --include-live

Usare `CRON_SECRET_VALUE` in ambiente shell. Non incollare il secret in chat.
