# V15.8 — AI Storage Rehearsal Board & Live Migration Execution Lock

## Scopo

Questa versione aggiunge un modulo locale dry-run per board di rehearsal storage e lock live migration.

V15.8 non chiama provider esterni, non abilita provider AI reali, non abilita persistenza review, non scrive casi AI, non modifica Prisma schema, non esegue migration, non crea task, non crea interventi, non abilita automazioni, non prescrive prodotti e non suggerisce dosaggi.

## Componenti

- storage blueprint;
- staging rehearsal plan;
- restore validation plan;
- retention control plan;
- audit replay plan;
- live migration lock;
- storage safety board;
- go/no-go board;
- storage gates;
- storage board pack;
- storage board findings;
- staged roadmap.

## Endpoint ops

`/api/ops/ai-storage-rehearsal-board-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiStorageRehearsalBoard.ts`
- `src/app/api/ops/ai-storage-rehearsal-board-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/StorageRehearsalBoardPanel.tsx`
- `src/app/admin/operations/OperationsAiStorageRehearsalBoard.tsx`
- `scripts/ops-ai-storage-rehearsal-board-check.mjs`

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

- V15.8: storage rehearsal board with live migration execution lock.
- V15.9: controlled beta readiness board with all operational gates still manual.
- V16.0: controlled production beta only after provider, storage, review and conversion gates pass.
- V16.1: post-beta observability and rollback hardening.
- V16.2: operational audit package and compliance export hardening.

## Stato operativo

Storage rehearsal board pronta solo come dry-run design. Live migration, schema write e storage AI ancora no-go.
