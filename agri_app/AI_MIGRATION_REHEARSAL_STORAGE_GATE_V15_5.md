# V15.5 — AI Migration Rehearsal & Storage Gate Validation in Staging

## Scopo

Questa versione aggiunge un modulo locale dry-run per progettare rehearsal di migrazione e validazione storage gate in staging.

V15.5 non modifica Prisma schema, non crea migration, non esegue migration, non abilita persistenza AI, non scrive casi, non scrive review record, non chiama provider, non crea task, non crea interventi, non abilita automazioni, non prescrive prodotti e non suggerisce dosaggi.

## Componenti

- rehearsal plan;
- schema diff review;
- backup and restore drill;
- storage gate validation;
- retention validation;
- audit event rehearsal;
- rollback board;
- rehearsal gates;
- rehearsal board pack;
- rehearsal risk register;
- staged roadmap.

## Endpoint ops

`/api/ops/ai-migration-rehearsal-storage-gate-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiMigrationRehearsalStorageGate.ts`
- `src/app/api/ops/ai-migration-rehearsal-storage-gate-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/MigrationRehearsalStorageGatePanel.tsx`
- `src/app/admin/operations/OperationsAiMigrationRehearsalStorageGate.tsx`
- `scripts/ops-ai-migration-rehearsal-storage-gate-check.mjs`

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
- casePersistenceActivationAllowed=false
- casePersistencePerformed=false
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
- shadowRunExternalCallAllowed=false
- shadowRunExternalCallPerformed=false

## Roadmap consigliata

- V15.5: migration rehearsal and storage gate validation in staging design only.
- V15.6: manual conversion rehearsal with no automatic execution.
- V15.7: provider staging activation gate with no production runtime.
- V15.8: storage rehearsal board with no live migration execution.
- V16.0: controlled production beta only after provider, storage, review and conversion gates pass.

## Stato operativo

Rehearsal migration/storage pronto solo come dry-run. Migration reale e storage AI ancora no-go.
