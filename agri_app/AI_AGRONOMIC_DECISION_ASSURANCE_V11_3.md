# V11.3 — AI Agronomic Decision Assurance & Human Sign-off Kernel

## Scopo

Questa versione introduce un kernel locale dry-run per decision assurance e human sign-off:

- assurance source nodes;
- assurance gates;
- human sign-off board;
- reviewer dissent register;
- decision packet;
- evidence chain;
- assurance gaps;
- redacted export bundle;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

## Endpoint ops

`/api/ops/ai-agronomic-decision-assurance-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiAgronomicDecisionAssurance.ts`
- `src/app/api/ops/ai-agronomic-decision-assurance-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/AgronomicDecisionAssurancePanel.tsx`
- `src/app/admin/operations/OperationsAiAgronomicDecisionAssurance.tsx`
- `scripts/ops-ai-agronomic-decision-assurance-check.mjs`

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

Il decision assurance kernel è pronto per revisione premium, sign-off umano e governance agronomica. Resta completamente locale, dry-run, redatto e manuale.
