# V10.1 — AI Field Autopilot Simulation Control Room

## Scopo

Questa versione introduce una control room simulativa locale per coordinare moduli AI agronomici premium:

- scouting mission planner;
- farm risk radar;
- intervention readiness;
- execution gate;
- memory quality guard;
- knowledge vault governance;
- command board simulation.

Il sistema produce solo simulazioni redatte e topic di revisione umana. Non crea task, non crea interventi, non esegue azioni e non chiama provider AI.

## Endpoint ops

`/api/ops/ai-field-autopilot-control-room-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiFieldAutopilotControlRoom.ts`
- `src/app/api/ops/ai-field-autopilot-control-room-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/FieldAutopilotControlRoomPanel.tsx`
- `src/app/admin/operations/OperationsAiFieldAutopilotControlRoom.tsx`
- `scripts/ops-ai-field-autopilot-control-room-check.mjs`

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

La control room è pronta per simulazione premium e revisione operativa. Resta bloccata in dry-run fino ad abilitazione esplicita di provider, persistenza o automazioni reali.
