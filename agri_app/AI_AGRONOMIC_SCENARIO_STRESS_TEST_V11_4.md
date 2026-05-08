# V11.4 — AI Agronomic Scenario Stress Test & Resilience War Room

## Scopo

Questa versione introduce un simulatore locale dry-run per stress test agronomico multi-scenario:

- scenario nodes;
- failure modes;
- war room drills;
- resilience gates;
- rollback playbook;
- stress evidence chain;
- stress test gaps;
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

Lo scenario stress test è pronto per review premium, resilience war room e governance agronomica. Resta completamente locale, dry-run, redatto e manuale.
