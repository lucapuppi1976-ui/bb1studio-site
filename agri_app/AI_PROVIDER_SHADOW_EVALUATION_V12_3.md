# V12.3 — AI Provider Shadow Evaluation & Synthetic Benchmark Harness

## Scopo

Questa versione introduce un harness locale dry-run per shadow evaluation provider:

- provider shadow source nodes;
- synthetic benchmark cases;
- shadow metrics;
- rejection drills;
- review gates;
- manual approval board;
- rollback plan;
- shadow gaps;
- redacted export bundle;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

## Endpoint ops

`/api/ops/ai-provider-shadow-evaluation-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiProviderShadowEvaluation.ts`
- `src/app/api/ops/ai-provider-shadow-evaluation-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/ProviderShadowEvaluationPanel.tsx`
- `src/app/admin/operations/OperationsAiProviderShadowEvaluation.tsx`
- `scripts/ops-ai-provider-shadow-evaluation-check.mjs`

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

Il provider shadow evaluation harness è pronto per review premium e synthetic benchmark governance. Resta completamente locale, dry-run, redatto e manuale.
