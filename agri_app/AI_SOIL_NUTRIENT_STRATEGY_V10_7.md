# V10.7 — AI Soil Health & Nutrient Balance Strategy Simulator

## Scopo

Questa versione introduce un simulatore locale dry-run per soil health e nutrient balance:

- soil zones;
- nutrient balance signals;
- organic matter proxy;
- salinity risk;
- compaction risk;
- water-soil interaction;
- sampling plan preview;
- soil-health scenario sandbox;
- evidence gaps;
- governance stops;
- manual review board;
- export redatto;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, prescrizioni prodotto, raccomandazioni fertilizzanti e dosaggi.

## Endpoint ops

`/api/ops/ai-soil-nutrient-strategy-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiSoilNutrientStrategy.ts`
- `src/app/api/ops/ai-soil-nutrient-strategy-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/SoilNutrientStrategyPanel.tsx`
- `src/app/admin/operations/OperationsAiSoilNutrientStrategy.tsx`
- `scripts/ops-ai-soil-nutrient-strategy-check.mjs`

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

Il simulatore soil-nutrient è pronto per revisione premium e agronomic governance. Resta completamente locale, dry-run, redatto e manuale.
