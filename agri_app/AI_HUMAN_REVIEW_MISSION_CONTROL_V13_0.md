# V13.0 — AI Human Reviewer Mission Control & Evidence Arbitration Board

## Scopo

Questa versione apre la fase V13 con un modulo locale dry-run per mission control della revisione umana:

- source nodes;
- review queue;
- evidence arbitration;
- reviewer disagreements;
- confidence calibration;
- decision locks;
- escalation board;
- audit packet;
- human signoff;
- mission risk register;
- redacted export bundle;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

## Endpoint ops

`/api/ops/ai-human-review-mission-control-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiHumanReviewMissionControl.ts`
- `src/app/api/ops/ai-human-review-mission-control-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/HumanReviewMissionControlPanel.tsx`
- `src/app/admin/operations/OperationsAiHumanReviewMissionControl.tsx`
- `scripts/ops-ai-human-review-mission-control-check.mjs`

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

Human Reviewer Mission Control è pronto per review premium, arbitraggio evidenze e signoff umano. Resta completamente locale, dry-run, redatto e manuale.
