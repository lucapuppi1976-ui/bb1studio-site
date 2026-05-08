# V10.4 — AI Farm Digital Twin Readiness Simulator

## Scopo

Questa versione introduce un simulatore locale dry-run di digital twin aziendale:

- field digital twin nodes;
- case pressure nodes;
- operational readiness lanes;
- scenario sandbox;
- readiness gaps;
- governance stops;
- manual review board;
- export redatto;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, prescrizioni e dosaggi.

## Endpoint ops

`/api/ops/ai-farm-digital-twin-readiness-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiFarmDigitalTwinReadiness.ts`
- `src/app/api/ops/ai-farm-digital-twin-readiness-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/FarmDigitalTwinReadinessPanel.tsx`
- `src/app/admin/operations/OperationsAiFarmDigitalTwinReadiness.tsx`
- `scripts/ops-ai-farm-digital-twin-readiness-check.mjs`

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

Il digital twin è pronto per simulazione premium e revisione executive. Resta completamente locale, dry-run, redatto e manuale.
