# Agri App — AI Temporal Field Trend Intelligence V8.4

## Obiettivo

V8.4 introduce una funzionalità premium sostanziosa: trend temporale del caso fotografico.

Componenti:

- TemporalTrendInput;
- TemporalTrendReport;
- timeline;
- changeVectors;
- severityTrend;
- temporalForecast;
- followUpSchedule;
- escalationRules.

## Endpoint operativo protetto

    /api/ops/ai-temporal-trend-dry-run

## Capacità premium

- temporalComparisonReady=true
- progressionTrackingReady=true
- trendForecastReady=true
- followUpScheduleReady=true
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

    npm run ops:ai-temporal-trend-check

Con live protetto:

    npm run ops:ai-temporal-trend-check -- --base https://bb1studio.com/agri_app --include-live

Usare `CRON_SECRET_VALUE` in ambiente shell. Non incollare il secret in chat.
