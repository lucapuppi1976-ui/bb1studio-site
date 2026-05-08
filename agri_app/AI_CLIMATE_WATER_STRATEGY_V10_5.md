# V10.5 — AI Climate Resilience & Water Strategy Simulator

## Scopo

Questa versione introduce un simulatore locale dry-run per resilienza climatica e strategia idrica:

- climate risk zones;
- heat-stress review;
- water-stress strategy lanes;
- irrigation readiness review;
- soil-moisture evidence backlog;
- water strategy scenario sandbox;
- governance stops;
- manual review board;
- export redatto;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, prescrizioni e dosaggi.

## Endpoint ops

`/api/ops/ai-climate-water-strategy-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiClimateWaterStrategy.ts`
- `src/app/api/ops/ai-climate-water-strategy-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/ClimateWaterStrategyPanel.tsx`
- `src/app/admin/operations/OperationsAiClimateWaterStrategy.tsx`
- `scripts/ops-ai-climate-water-strategy-check.mjs`

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

Il simulatore climate-water è pronto per revisione premium e pianificazione manuale. Resta completamente locale, dry-run, redatto e manuale.
