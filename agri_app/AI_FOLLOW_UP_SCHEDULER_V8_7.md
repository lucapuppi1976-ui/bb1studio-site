# Agri App — AI Follow-Up Scheduler & Observation Cadence V8.7

## Obiettivo

V8.7 introduce una funzionalità premium sostanziosa: calendario follow-up e cadence osservazioni per caso fotografico.

Componenti:

- FollowUpSchedulerInput;
- FollowUpSchedulerReport;
- observationCadence;
- followUpWindows;
- reviewerQueue;
- manualTaskDrafts;
- escalationSchedule;
- calendarLegend.

## Endpoint operativo protetto

    /api/ops/ai-follow-up-scheduler-dry-run

## Capacità premium

- followUpSchedulerReady=true
- observationCadenceReady=true
- calendarWindowReady=true
- reviewerQueueReady=true
- manualTaskDraftReady=true
- escalationScheduleReady=true
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

    npm run ops:ai-follow-up-scheduler-check

Con live protetto:

    npm run ops:ai-follow-up-scheduler-check -- --base https://bb1studio.com/agri_app --include-live

Usare `CRON_SECRET_VALUE` in ambiente shell. Non incollare il secret in chat.
