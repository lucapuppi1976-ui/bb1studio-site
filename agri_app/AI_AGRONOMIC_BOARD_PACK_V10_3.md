# V10.3 — AI Agronomic Board Pack & Executive Decision Center

## Scopo

Questa versione introduce un Executive Decision Center locale dry-run per creare un board pack agronomico redatto:

- signal sources da risk radar, readiness, execution gate, memory quality, knowledge vault, autopilot e crop protocols;
- executive decision cards;
- risk register;
- ROI proxy non finanziario;
- governance checklist;
- board sections;
- export redatto;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, prescrizioni e dosaggi.

## Endpoint ops

`/api/ops/ai-agronomic-board-pack-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiAgronomicBoardPack.ts`
- `src/app/api/ops/ai-agronomic-board-pack-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/AgronomicBoardPackPanel.tsx`
- `src/app/admin/operations/OperationsAiAgronomicBoardPack.tsx`
- `scripts/ops-ai-agronomic-board-pack-check.mjs`

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

Il board pack è pronto per revisione executive, ma resta completamente locale, dry-run, redatto e manuale.
