# V13.3 — AI Reviewer Rationale Ledger & Evidence-to-Decision Traceability Matrix

## Scopo

Questa versione introduce un modulo locale dry-run per rationale ledger e tracciabilità evidence-to-decision:

- source nodes;
- evidence-to-decision trace;
- reviewer rationale ledger;
- decision hold reasons;
- traceability gates;
- dissent links;
- audit replay;
- escalation board;
- rationale signoff;
- rationale risk register;
- redacted export bundle;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

## Endpoint ops

`/api/ops/ai-reviewer-rationale-ledger-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiReviewerRationaleLedger.ts`
- `src/app/api/ops/ai-reviewer-rationale-ledger-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/ReviewerRationaleLedgerPanel.tsx`
- `src/app/admin/operations/OperationsAiReviewerRationaleLedger.tsx`
- `scripts/ops-ai-reviewer-rationale-ledger-check.mjs`

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

Reviewer Rationale Ledger è pronto per review premium, evidence-to-decision traceability e signoff umano. Resta completamente locale, dry-run, redatto e manuale.
