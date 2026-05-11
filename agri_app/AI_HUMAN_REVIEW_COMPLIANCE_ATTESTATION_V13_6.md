# V13.6 — AI Human Review Compliance Attestation & Accountability Ledger

## Scopo

Questa versione introduce un modulo locale dry-run per compliance attestation della revisione umana:

- source nodes;
- compliance attestation board;
- accountability ledger;
- governance evidence pack;
- compliance gate matrix;
- governance exception register;
- decision freeze assurance;
- audit replay;
- compliance signoff;
- compliance risk register;
- redacted export bundle;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

## Endpoint ops

`/api/ops/ai-human-review-compliance-attestation-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiHumanReviewComplianceAttestation.ts`
- `src/app/api/ops/ai-human-review-compliance-attestation-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/HumanReviewComplianceAttestationPanel.tsx`
- `src/app/admin/operations/OperationsAiHumanReviewComplianceAttestation.tsx`
- `scripts/ops-ai-human-review-compliance-attestation-check.mjs`

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

Human Review Compliance Attestation è pronto per review premium, accountability ledger, governance evidence pack e signoff umano. Resta completamente locale, dry-run, redatto e manuale.
