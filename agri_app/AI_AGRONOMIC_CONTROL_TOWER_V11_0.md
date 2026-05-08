# V11.0 — AI Agronomic Control Tower & Governance Kernel

## Scopo

Questa versione introduce una control tower agronomica locale dry-run che coordina i principali moduli premium AI:

- knowledge vault governance;
- field autopilot control room;
- crop protocol builder;
- agronomic board pack;
- farm digital twin;
- climate water strategy;
- pest and disease sentinel;
- soil nutrient strategy;
- phenology yield proxy review;
- harvest quality readiness;
- command cards;
- governance gates;
- escalation paths;
- readiness gaps;
- export redatto;
- hard-stop su provider, persistenza, memoria, task, interventi, esecuzione, forecast produttivi, prescrizioni prodotto e dosaggi.

## Endpoint ops

`/api/ops/ai-agronomic-control-tower-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiAgronomicControlTower.ts`
- `src/app/api/ops/ai-agronomic-control-tower-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/AgronomicControlTowerPanel.tsx`
- `src/app/admin/operations/OperationsAiAgronomicControlTower.tsx`
- `scripts/ops-ai-agronomic-control-tower-check.mjs`

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

La control tower è pronta per revisione premium e governance agronomica. Resta completamente locale, dry-run, redatta e manuale.
