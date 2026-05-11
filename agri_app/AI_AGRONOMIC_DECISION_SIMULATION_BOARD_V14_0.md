# V14.0 — AI Agronomic Decision Simulation Board & Non-Execution Strategy Pack

## Scopo

Questa versione apre la fase V14 con un modulo locale dry-run per simulazione decisionale agronomica post-review:

- source nodes;
- decision simulation board;
- option scenario matrix;
- agronomic uncertainty map;
- non-execution certificate;
- strategy gate matrix;
- board strategy pack;
- audit replay;
- strategy signoff;
- strategy risk register;
- redacted export bundle;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

## Endpoint ops

`/api/ops/ai-agronomic-decision-simulation-board-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiAgronomicDecisionSimulationBoard.ts`
- `src/app/api/ops/ai-agronomic-decision-simulation-board-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/AgronomicDecisionSimulationBoardPanel.tsx`
- `src/app/admin/operations/OperationsAiAgronomicDecisionSimulationBoard.tsx`
- `scripts/ops-ai-agronomic-decision-simulation-board-check.mjs`

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

Agronomic Decision Simulation Board è pronto per review premium, simulazione strategica e signoff umano. Resta completamente locale, dry-run, redatto e manuale.
