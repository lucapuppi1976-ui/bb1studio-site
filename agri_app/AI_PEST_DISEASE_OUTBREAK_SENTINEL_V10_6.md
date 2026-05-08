# V10.6 — AI Pest & Disease Outbreak Sentinel & Biosecurity Simulator

## Scopo

Questa versione introduce un simulatore locale dry-run per early warning fitopatologico e biosecurity:

- outbreak risk zones;
- pest pressure signal;
- disease pressure signal;
- vector watch;
- abiotic lookalike guard;
- biosecurity review;
- surveillance lanes;
- outbreak scenario sandbox;
- evidence gaps;
- biosecurity stops;
- manual review board;
- export redatto;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, alert pubblici, prescrizioni e dosaggi.

## Endpoint ops

`/api/ops/ai-pest-disease-outbreak-sentinel-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiPestDiseaseOutbreakSentinel.ts`
- `src/app/api/ops/ai-pest-disease-outbreak-sentinel-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/PestDiseaseOutbreakSentinelPanel.tsx`
- `src/app/admin/operations/OperationsAiPestDiseaseOutbreakSentinel.tsx`
- `scripts/ops-ai-pest-disease-outbreak-sentinel-check.mjs`

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

Il sentinel fitopatologico è pronto per revisione premium e biosecurity governance. Resta completamente locale, dry-run, redatto e manuale.
