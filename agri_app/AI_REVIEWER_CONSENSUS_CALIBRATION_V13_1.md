# V13.1 — AI Reviewer Consensus Calibration & Dispute Resolution Engine

## Scopo

Questa versione introduce un modulo locale dry-run per consenso tra reviewer e gestione dispute:

- source nodes;
- evidence weighting;
- dissent register;
- calibration board;
- dispute resolution gates;
- decision holds;
- consensus board;
- reviewer audit trail;
- consensus signoff;
- consensus risk register;
- redacted export bundle;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

## Endpoint ops

`/api/ops/ai-reviewer-consensus-calibration-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiReviewerConsensusCalibration.ts`
- `src/app/api/ops/ai-reviewer-consensus-calibration-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/ReviewerConsensusCalibrationPanel.tsx`
- `src/app/admin/operations/OperationsAiReviewerConsensusCalibration.tsx`
- `scripts/ops-ai-reviewer-consensus-calibration-check.mjs`

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

Reviewer Consensus Calibration è pronto per review premium, gestione dispute e signoff umano. Resta completamente locale, dry-run, redatto e manuale.
