# V11.1 — AI Agronomic Explainability Ledger & Traceability Kernel

## Scopo

Questa versione introduce un ledger locale dry-run per explainability e traceability agronomica:

- source nodes;
- evidence contribution map;
- reasoning trace;
- uncertainty register;
- counterfactual review;
- reviewer question builder;
- audit ledger;
- redacted export bundle;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, forecast produttivi, prescrizioni prodotto e dosaggi.

## Endpoint ops

`/api/ops/ai-agronomic-explainability-ledger-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiAgronomicExplainabilityLedger.ts`
- `src/app/api/ops/ai-agronomic-explainability-ledger-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/AgronomicExplainabilityLedgerPanel.tsx`
- `src/app/admin/operations/OperationsAiAgronomicExplainabilityLedger.tsx`
- `scripts/ops-ai-agronomic-explainability-ledger-check.mjs`

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

Il ledger è pronto per revisione premium, audit umano e governance agronomica. Resta completamente locale, dry-run, redatto e manuale.
