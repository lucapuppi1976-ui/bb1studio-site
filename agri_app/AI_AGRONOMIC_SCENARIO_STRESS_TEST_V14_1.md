# V14.1 — AI Agronomic Scenario Stress Test & Failure Mode Sandbox

## Scopo

Questa versione aggiunge un modulo locale dry-run per stress test degli scenari agronomici non esecutivi:

- source nodes;
- scenario stress cases;
- failure mode sandbox;
- fragility map;
- contingency holds;
- non-execution envelope;
- stress gate matrix;
- resilience strategy pack;
- audit replay;
- stress signoff;
- stress risk register;
- redacted export bundle;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

## Endpoint ops

`/api/ops/ai-agronomic-scenario-stress-test-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiAgronomicScenarioStressTest.ts`
- `src/app/api/ops/ai-agronomic-scenario-stress-test-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/AgronomicScenarioStressTestPanel.tsx`
- `src/app/admin/operations/OperationsAiAgronomicScenarioStressTest.tsx`
- `scripts/ops-ai-agronomic-scenario-stress-test-check.mjs`

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

Agronomic Scenario Stress Test è pronto per review premium, failure mode sandbox, fragility review e signoff umano. Resta completamente locale, dry-run, redatto e manuale.
