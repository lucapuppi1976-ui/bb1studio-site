# V10.8 — AI Phenology, Pollination & Yield Risk Simulator

## Scopo

Questa versione introduce un simulatore locale dry-run per fenologia, impollinazione e yield-risk proxy:

- phenology windows;
- flowering window review;
- pollination risk review;
- fruit-set evidence review;
- heat/humidity/water stress overlap;
- yield-risk proxy non previsionale;
- review lanes;
- evidence gaps;
- governance stops;
- manual review board;
- export redatto;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, forecast produttivi, prescrizioni prodotto e dosaggi.

## Endpoint ops

`/api/ops/ai-phenology-yield-risk-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiPhenologyYieldRisk.ts`
- `src/app/api/ops/ai-phenology-yield-risk-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/PhenologyYieldRiskPanel.tsx`
- `src/app/admin/operations/OperationsAiPhenologyYieldRisk.tsx`
- `scripts/ops-ai-phenology-yield-risk-check.mjs`

## Guardrail

- providerAiReady=false
- persistenceReady=false
- memoryPersistenceReady=false
- automaticTaskCreationReady=false
- automaticInterventionCreationReady=false
- automaticExecutionReady=false
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
- redactedOutputOnly=true
- localMemoryOnly=true
- localLearningOnly=true
- localPromotionOnly=true
- localQualityOnly=true
- memoryPromotionAllowed=false
- memoryQualityWriteAllowed=false
- memoryPromotionPerformed=false
- memoryQualityWritePerformed=false

## Stato operativo

Il simulatore phenology-yield è pronto per revisione premium e agronomic governance. Resta completamente locale, dry-run, redatto e manuale.
