# V12.4 — AI Provider Pilot Readiness Board & Canary Rollout Simulator

## Scopo

Questa versione introduce un simulatore locale dry-run per pilot readiness e canary rollout governance:

- provider canary source nodes;
- canary stages;
- acceptance criteria;
- kill-switch drills;
- pilot approval board;
- rollback governance;
- canary risk register;
- redacted export bundle;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

## Endpoint ops

`/api/ops/ai-provider-canary-rollout-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiProviderCanaryRollout.ts`
- `src/app/api/ops/ai-provider-canary-rollout-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/ProviderCanaryRolloutPanel.tsx`
- `src/app/admin/operations/OperationsAiProviderCanaryRollout.tsx`
- `scripts/ops-ai-provider-canary-rollout-check.mjs`

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

Il provider canary rollout simulator è pronto per review premium e pilot readiness governance. Resta completamente locale, dry-run, redatto e manuale.
