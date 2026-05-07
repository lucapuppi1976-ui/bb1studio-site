# Agri App — AI Intervention Impact & ROI Simulator V9.3

## Obiettivo

V9.3 introduce una funzionalità premium sostanziosa: simulazione di impatto operativo/economico e ROI proxy.

Componenti:

- InterventionImpactInput;
- InterventionImpactReport;
- scenarioMatrix;
- riskReductionForecast;
- manualCostEnvelope;
- resourceBudgetImpact;
- opportunityCostBoard;
- roiPriorityQueue;
- executiveImpactBriefing;
- complianceEconomicsGuard;
- impactSummary.

## Endpoint operativo protetto

    /api/ops/ai-intervention-impact-dry-run

## Capacità premium

- interventionImpactReady=true
- scenarioMatrixReady=true
- riskReductionForecastReady=true
- manualCostEnvelopeReady=true
- resourceBudgetImpactReady=true
- opportunityCostBoardReady=true
- roiPriorityQueueReady=true
- executiveImpactBriefingReady=true
- complianceEconomicsGuardReady=true
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

## Nota

ROI proxy non è dato finanziario reale. Serve a ordinare priorità operative e impatto relativo, non a produrre consulenza finanziaria o prescrizioni agronomiche.

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

    npm run ops:ai-intervention-impact-check

Con live protetto:

    npm run ops:ai-intervention-impact-check -- --base https://bb1studio.com/agri_app --include-live

Usare `CRON_SECRET_VALUE` in ambiente shell. Non incollare il secret in chat.
