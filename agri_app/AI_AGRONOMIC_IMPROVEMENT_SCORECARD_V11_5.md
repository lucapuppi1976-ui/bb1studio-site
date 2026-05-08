# V11.5 — AI Agronomic Continuous Improvement & Resilience Scorecard Kernel

## Scopo

Questa versione introduce un kernel locale dry-run per continuous improvement agronomico:

- source nodes;
- resilience scorecard;
- improvement backlog;
- maturity model;
- review cadence;
- roadmap scenarios;
- improvement gaps;
- redacted export bundle;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

## Endpoint ops

`/api/ops/ai-agronomic-improvement-scorecard-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiAgronomicImprovementScorecard.ts`
- `src/app/api/ops/ai-agronomic-improvement-scorecard-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/AgronomicImprovementScorecardPanel.tsx`
- `src/app/admin/operations/OperationsAiAgronomicImprovementScorecard.tsx`
- `scripts/ops-ai-agronomic-improvement-scorecard-check.mjs`

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

Il continuous improvement kernel è pronto per review premium, maturity planning e governance agronomica. Resta completamente locale, dry-run, redatto e manuale.
