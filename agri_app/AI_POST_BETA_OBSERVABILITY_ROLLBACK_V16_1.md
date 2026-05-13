# V16.1 — AI Post-Beta Observability & Rollback Hardening Drill

## Scopo

Questa versione aggiunge un modulo locale dry-run per hardening post-beta di osservabilità e rollback.

V16.1 non attiva runtime reale, non chiama provider esterni, non abilita provider AI reali, non abilita persistenza review, non scrive casi AI, non modifica Prisma schema, non esegue migration, non crea task, non crea interventi, non abilita automazioni, non prescrive prodotti e non suggerisce dosaggi.

## Componenti

- incident signal plan;
- rollback tower hardening;
- kill-switch drill plan;
- reviewer audit plan;
- anomaly board;
- fallback route plan;
- runtime lock hardening;
- go/no-go board;
- hardening gates;
- hardening board pack;
- hardening findings;
- staged roadmap.

## Endpoint ops

`/api/ops/ai-post-beta-observability-rollback-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiPostBetaObservabilityRollback.ts`
- `src/app/api/ops/ai-post-beta-observability-rollback-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/PostBetaObservabilityRollbackPanel.tsx`
- `src/app/admin/operations/OperationsAiPostBetaObservabilityRollback.tsx`
- `scripts/ops-ai-post-beta-observability-rollback-check.mjs`

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
- onlineControlledReady=true
- operationalAiReady=false
- controlledBetaAllowed=false
- controlledBetaPerformed=false
- productionBetaAllowed=false
- productionBetaPerformed=false
- zeroActivationMode=true
- providerActivationAllowed=false
- providerActivationPerformed=false
- providerStagingActivationAllowed=false
- providerStagingActivationPerformed=false
- productionRuntimeAllowed=false
- productionRuntimePerformed=false
- providerRegistryWriteAllowed=false
- providerRegistryWritePerformed=false
- casePersistenceActivationAllowed=false
- casePersistencePerformed=false
- storageActivationAllowed=false
- storageActivationPerformed=false
- liveMigrationExecutionAllowed=false
- liveMigrationExecutionPerformed=false
- migrationExecutionAllowed=false
- migrationExecutionPerformed=false
- schemaWriteAllowed=false
- schemaWritePerformed=false
- automationActivationAllowed=false
- reviewPersistenceAllowed=false
- reviewPersistencePerformed=false
- manualConversionAllowed=false
- manualConversionPerformed=false
- providerCallAllowed=false
- providerCallPerformed=false

## Roadmap consigliata

- V16.1: post-beta observability and rollback hardening in zero-activation dry-run.
- V16.2: operational audit package and compliance export hardening.
- V16.3: human-supervised agronomic operations cockpit.
- V16.4: staged provider runtime beta only after explicit activation approval.
- V16.5: runtime incident response board after explicit activation approval.

## Stato operativo

Hardening post-beta pronto solo come dry-run design. Runtime reale, provider reale e produzione AI ancora no-go.
