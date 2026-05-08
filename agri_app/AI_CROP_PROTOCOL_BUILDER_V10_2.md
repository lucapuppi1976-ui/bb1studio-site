# V10.2 — AI Crop-Specific Expert Protocol Builder

## Scopo

Questa versione introduce un builder locale dry-run per protocolli agronomici expert specifici per coltura:

- protocolli per tomato/pepper, vineyard, citrus, olive e cereal;
- regole di applicabilità per coltura, fenologia, sintomi e contesto climatico;
- evidence gates con blocker;
- protocol conflict register;
- manual review board;
- export redatto;
- hard-stop su provider, persistenza, task, interventi, esecuzione, prescrizioni e dosaggi.

## Endpoint ops

`/api/ops/ai-crop-protocol-builder-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiCropProtocolBuilder.ts`
- `src/app/api/ops/ai-crop-protocol-builder-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/CropProtocolBuilderPanel.tsx`
- `src/app/admin/operations/OperationsAiCropProtocolBuilder.tsx`
- `scripts/ops-ai-crop-protocol-builder-check.mjs`

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

Il builder è pronto per revisione premium e protocol governance. Resta completamente locale, dry-run e manuale.
