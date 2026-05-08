# V10.9 — AI Harvest Readiness & Post-Harvest Quality Simulator

## Scopo

Questa versione introduce un simulatore locale dry-run per readiness raccolta e qualità post-raccolta:

- harvest zones;
- maturity evidence review;
- harvest window review;
- quality pressure signals;
- storage readiness;
- logistics readiness;
- weather exposure;
- post harvest handling;
- review lanes;
- harvest scenarios;
- evidence gaps;
- governance stops;
- manual review board;
- export redatto;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, forecast produttivi, prescrizioni prodotto e dosaggi.

## Endpoint ops

`/api/ops/ai-harvest-quality-readiness-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiHarvestQualityReadiness.ts`
- `src/app/api/ops/ai-harvest-quality-readiness-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/HarvestQualityReadinessPanel.tsx`
- `src/app/admin/operations/OperationsAiHarvestQualityReadiness.tsx`
- `scripts/ops-ai-harvest-quality-readiness-check.mjs`

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

Il simulatore harvest-quality è pronto per revisione premium e governance raccolta. Resta completamente locale, dry-run, redatto e manuale.
