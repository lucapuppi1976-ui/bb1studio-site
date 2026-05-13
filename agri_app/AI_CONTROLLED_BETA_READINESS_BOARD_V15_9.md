# V15.9 — AI Controlled Beta Readiness Board & Manual-Only Operational Gate

## Scopo

Questa versione aggiunge un modulo locale dry-run per la board finale di readiness beta controllata.

V15.9 non attiva beta reale, non chiama provider esterni, non abilita provider AI reali, non abilita persistenza review, non scrive casi AI, non modifica Prisma schema, non esegue migration, non crea task, non crea interventi, non abilita automazioni, non prescrive prodotti e non suggerisce dosaggi.

## Componenti

- provider gate plan;
- storage gate plan;
- review gate plan;
- conversion gate plan;
- observability plan;
- rollback plan;
- manual-only boundary;
- go/no-go board;
- beta board gates;
- beta board pack;
- beta board findings;
- staged roadmap.

## Endpoint ops

`/api/ops/ai-controlled-beta-readiness-board-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiControlledBetaReadinessBoard.ts`
- `src/app/api/ops/ai-controlled-beta-readiness-board-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/ControlledBetaReadinessBoardPanel.tsx`
- `src/app/admin/operations/OperationsAiControlledBetaReadinessBoard.tsx`
- `scripts/ops-ai-controlled-beta-readiness-board-check.mjs`

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

- V15.9: controlled beta readiness board with all operational gates still manual.
- V16.0: controlled production beta only after provider, storage, review and conversion gates pass.
- V16.1: post-beta observability and rollback hardening.
- V16.2: operational audit package and compliance export hardening.
- V16.3: human-supervised agronomic operations cockpit.

## Stato operativo

Board beta controllata pronta solo come dry-run design. Beta reale e produzione AI ancora no-go.
