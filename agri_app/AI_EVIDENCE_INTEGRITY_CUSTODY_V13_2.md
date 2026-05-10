# V13.2 — AI Evidence Integrity Chain-of-Custody & Audit Replay Board

## Scopo

Questa versione introduce un modulo locale dry-run per integrità evidenze e chain-of-custody:

- source nodes;
- custody timeline;
- integrity gate matrix;
- tamper review board;
- redaction ledger;
- audit replay trail;
- evidence locks;
- escalation board;
- custody signoff;
- integrity risk register;
- redacted export bundle;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, claim formali, forecast produttivi, prescrizioni prodotto e dosaggi.

## Endpoint ops

`/api/ops/ai-evidence-integrity-custody-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiEvidenceIntegrityCustody.ts`
- `src/app/api/ops/ai-evidence-integrity-custody-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/EvidenceIntegrityCustodyPanel.tsx`
- `src/app/admin/operations/OperationsAiEvidenceIntegrityCustody.tsx`
- `scripts/ops-ai-evidence-integrity-custody-check.mjs`

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

Evidence Integrity Custody Board è pronto per review premium, chain-of-custody e replay audit. Resta completamente locale, dry-run, redatto e manuale.
