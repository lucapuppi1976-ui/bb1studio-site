# V14.4 — AI Agronomic Governance Freeze & Strategy Signoff Registry

## Scopo

Questa versione aggiunge un modulo locale dry-run per governance freeze della strategia agronomica simulata:

- source nodes;
- governance freeze board;
- signoff registry;
- actionability trap board;
- scenario closure map;
- decision boundary ledger;
- non-execution certificate;
- governance gate matrix;
- governance board pack;
- audit replay;
- governance signoff;
- governance risk register;
- redacted export bundle;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

## Endpoint ops

`/api/ops/ai-agronomic-governance-freeze-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiAgronomicGovernanceFreeze.ts`
- `src/app/api/ops/ai-agronomic-governance-freeze-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/AgronomicGovernanceFreezePanel.tsx`
- `src/app/admin/operations/OperationsAiAgronomicGovernanceFreeze.tsx`
- `scripts/ops-ai-agronomic-governance-freeze-check.mjs`

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

Agronomic Governance Freeze è pronto per review premium, signoff registry, actionability trap review e governance closure. Resta completamente locale, dry-run, redatto e manuale.
