# V14.2 — AI Agronomic Strategy Portfolio Comparator & Trade-Off Board

## Scopo

Questa versione aggiunge un modulo locale dry-run per confronto di portafogli strategici agronomici non esecutivi:

- source nodes;
- strategy portfolio options;
- tradeoff board;
- option ranking matrix;
- uncertainty budget;
- non-execution boundary;
- portfolio gate matrix;
- board portfolio pack;
- audit replay;
- portfolio signoff;
- portfolio risk register;
- redacted export bundle;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

## Endpoint ops

`/api/ops/ai-agronomic-strategy-portfolio-comparator-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiAgronomicStrategyPortfolioComparator.ts`
- `src/app/api/ops/ai-agronomic-strategy-portfolio-comparator-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/AgronomicStrategyPortfolioComparatorPanel.tsx`
- `src/app/admin/operations/OperationsAiAgronomicStrategyPortfolioComparator.tsx`
- `scripts/ops-ai-agronomic-strategy-portfolio-comparator-check.mjs`

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

Agronomic Strategy Portfolio Comparator è pronto per review premium, trade-off board, portfolio comparison e signoff umano. Resta completamente locale, dry-run, redatto e manuale.
