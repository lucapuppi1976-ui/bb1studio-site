# Agri App — AI Farm Risk Radar & Predictive Priority Center V9.2

## Obiettivo

V9.2 introduce una funzionalità premium sostanziosa: radar rischio aziendale multi-caso.

Componenti:

- FarmRiskRadarInput;
- FarmRiskRadarReport;
- fieldRiskQuadrants;
- predictivePriorityCenter;
- forecastWindows;
- resourceStressForecast;
- criticalWatchlist;
- executiveRiskBriefing;
- complianceRadar;
- radarSummary.

## Endpoint operativo protetto

    /api/ops/ai-farm-risk-radar-dry-run

## Capacità premium

- farmRiskRadarReady=true
- predictivePriorityReady=true
- fieldRiskQuadrantsReady=true
- forecastWindowsReady=true
- resourceStressForecastReady=true
- criticalWatchlistReady=true
- executiveBriefingReady=true
- complianceRadarReady=true
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

    npm run ops:ai-farm-risk-radar-check

Con live protetto:

    npm run ops:ai-farm-risk-radar-check -- --base https://bb1studio.com/agri_app --include-live

Usare `CRON_SECRET_VALUE` in ambiente shell. Non incollare il secret in chat.
