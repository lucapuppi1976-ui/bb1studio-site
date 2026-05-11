# V13.5 — AI Human Review Quality Assurance & Peer Calibration Audit

## Scopo

Questa versione introduce un modulo locale dry-run per QA della revisione umana:

- source nodes;
- peer calibration board;
- rubric quality matrix;
- reviewer drift watch;
- QA gate matrix;
- QA exception register;
- decision freeze certificate;
- audit replay;
- QA signoff;
- QA risk register;
- redacted export bundle;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

## Endpoint ops

`/api/ops/ai-human-review-quality-assurance-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiHumanReviewQualityAssurance.ts`
- `src/app/api/ops/ai-human-review-quality-assurance-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/HumanReviewQualityAssurancePanel.tsx`
- `src/app/admin/operations/OperationsAiHumanReviewQualityAssurance.tsx`
- `scripts/ops-ai-human-review-quality-assurance-check.mjs`

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

Human Review Quality Assurance è pronto per review premium, peer calibration, QA audit e signoff umano. Resta completamente locale, dry-run, redatto e manuale.
