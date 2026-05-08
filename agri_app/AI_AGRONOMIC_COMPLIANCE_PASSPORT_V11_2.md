# V11.2 — AI Agronomic Compliance Passport & Certification Readiness Kernel

## Scopo

Questa versione introduce un passport locale dry-run per compliance agronomica e certification readiness:

- source nodes;
- requirement matrix;
- audit trail;
- certification readiness packet;
- traceability gaps;
- reviewer checklist;
- redacted export sections;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

## Endpoint ops

`/api/ops/ai-agronomic-compliance-passport-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiAgronomicCompliancePassport.ts`
- `src/app/api/ops/ai-agronomic-compliance-passport-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/AgronomicCompliancePassportPanel.tsx`
- `src/app/admin/operations/OperationsAiAgronomicCompliancePassport.tsx`
- `scripts/ops-ai-agronomic-compliance-passport-check.mjs`

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

Il compliance passport è pronto per revisione premium, audit umano e governance agronomica. Resta completamente locale, dry-run, redatto e manuale.
