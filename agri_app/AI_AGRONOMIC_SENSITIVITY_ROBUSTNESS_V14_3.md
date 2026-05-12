# V14.3 — AI Agronomic Sensitivity Map & Robustness Boundary Board

## Scopo

Questa versione aggiunge un modulo locale dry-run per analisi di sensibilità e robustezza degli scenari agronomici non esecutivi:

- source nodes;
- sensitivity drivers;
- perturbation matrix;
- robustness boundaries;
- fragile assumption register;
- uncertainty levers;
- non-execution boundary;
- robustness gate matrix;
- robustness board pack;
- audit replay;
- robustness signoff;
- robustness risk register;
- redacted export bundle;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

## Endpoint ops

`/api/ops/ai-agronomic-sensitivity-robustness-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiAgronomicSensitivityRobustness.ts`
- `src/app/api/ops/ai-agronomic-sensitivity-robustness-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/AgronomicSensitivityRobustnessPanel.tsx`
- `src/app/admin/operations/OperationsAiAgronomicSensitivityRobustness.tsx`
- `scripts/ops-ai-agronomic-sensitivity-robustness-check.mjs`

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

Agronomic Sensitivity Robustness Board è pronto per review premium, perturbation analysis, robustness boundary e signoff umano. Resta completamente locale, dry-run, redatto e manuale.
