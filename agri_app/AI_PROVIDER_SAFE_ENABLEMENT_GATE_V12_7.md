# V12.7 — AI Provider Safe Enablement Gate & Dual-Control Activation Simulator

## Scopo

Questa versione introduce un gate locale dry-run per provider safe enablement:

- source nodes;
- enablement gates;
- dual-control approval board;
- change ticket draft;
- readiness ledger;
- boundary exception register;
- go-live blockers;
- rollback rehearsal;
- safe enablement risk register;
- redacted export bundle;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

## Endpoint ops

`/api/ops/ai-provider-safe-enablement-gate-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiProviderSafeEnablementGate.ts`
- `src/app/api/ops/ai-provider-safe-enablement-gate-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/ProviderSafeEnablementGatePanel.tsx`
- `src/app/admin/operations/OperationsAiProviderSafeEnablementGate.tsx`
- `scripts/ops-ai-provider-safe-enablement-gate-check.mjs`

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

Il provider safe enablement gate è pronto per review premium e dual-control governance. Resta completamente locale, dry-run, redatto e manuale.
