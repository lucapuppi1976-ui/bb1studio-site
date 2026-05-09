# V12.1 — AI Provider Request Sandbox & Redaction Contract Kernel

## Scopo

Questa versione introduce un sandbox locale dry-run per provider request contract readiness:

- provider request source nodes;
- request blueprint;
- redaction contract;
- output contract;
- review gates;
- manual approval board;
- rollback plan;
- request gaps;
- redacted export bundle;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

## Endpoint ops

`/api/ops/ai-provider-request-sandbox-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiProviderRequestSandbox.ts`
- `src/app/api/ops/ai-provider-request-sandbox-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/ProviderRequestSandboxPanel.tsx`
- `src/app/admin/operations/OperationsAiProviderRequestSandbox.tsx`
- `scripts/ops-ai-provider-request-sandbox-check.mjs`

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

Il provider request sandbox è pronto per review premium e redaction governance. Resta completamente locale, dry-run, redatto e manuale.
