# V12.5 — AI Provider Observability & Incident Response Drill Center

## Scopo

Questa versione introduce un centro locale dry-run per provider observability e incident response drill:

- provider observability source nodes;
- runtime signals simulati;
- incident drills;
- review gates;
- quality drift watch;
- latency budget review;
- approval board;
- rollback plan;
- risk register;
- redacted export bundle;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

## Endpoint ops

`/api/ops/ai-provider-observability-drill-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiProviderObservabilityDrill.ts`
- `src/app/api/ops/ai-provider-observability-drill-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/ProviderObservabilityDrillPanel.tsx`
- `src/app/admin/operations/OperationsAiProviderObservabilityDrill.tsx`
- `scripts/ops-ai-provider-observability-drill-check.mjs`

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

Il provider observability drill center è pronto per review premium e incident response governance. Resta completamente locale, dry-run, redatto e manuale.
