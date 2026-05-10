# V12.8 — AI Provider Runtime Adapter Contract & Zero-Call Execution Harness

## Scopo

Questa versione introduce un modulo locale dry-run per provider runtime adapter contract:

- source nodes;
- adapter contract;
- zero-call proof;
- runtime adapter gates;
- adapter stages;
- human-loop handoff;
- rollback rehearsal;
- adapter risk register;
- redacted export bundle;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

## Endpoint ops

`/api/ops/ai-provider-runtime-adapter-contract-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiProviderRuntimeAdapterContract.ts`
- `src/app/api/ops/ai-provider-runtime-adapter-contract-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/ProviderRuntimeAdapterContractPanel.tsx`
- `src/app/admin/operations/OperationsAiProviderRuntimeAdapterContract.tsx`
- `scripts/ops-ai-provider-runtime-adapter-contract-check.mjs`

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

Il provider runtime adapter contract è pronto per review premium e zero-call harness governance. Resta completamente locale, dry-run, redatto e manuale.
