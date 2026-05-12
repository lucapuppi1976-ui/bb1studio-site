# V15.2 — AI Case Persistence Migration Plan & Storage Safety Blueprint

## Scopo

Questa versione aggiunge un modulo locale dry-run per progettare la futura persistenza dei casi AI.

V15.2 non modifica Prisma schema, non esegue migration, non abilita persistenza AI, non scrive casi, non scrive memoria, non crea task, non crea interventi e non abilita automazioni.

## Componenti

- entity blueprint;
- migration plan;
- backup and restore plan;
- photo retention plan;
- audit chain plan;
- review record plan;
- storage gates;
- storage board pack;
- storage risk register;
- staged roadmap.

## Endpoint ops

`/api/ops/ai-case-persistence-migration-plan-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiCasePersistenceMigrationPlan.ts`
- `src/app/api/ops/ai-case-persistence-migration-plan-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/CasePersistenceMigrationPlanPanel.tsx`
- `src/app/admin/operations/OperationsAiCasePersistenceMigrationPlan.tsx`
- `scripts/ops-ai-case-persistence-migration-plan-check.mjs`

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

## Roadmap consigliata

- V15.2: AI case persistence migration plan and storage safety blueprint.
- V15.3: persistent human review workflow and manual conversion gate design.
- V15.4: provider staging shadow run with no production activation.
- V15.5: migration rehearsal and storage gate validation in staging only.
- V16.0: controlled production beta only after staging, migration and review gates pass.

## Stato operativo

Blueprint persistenza pronto solo in dry-run. Persistenza AI reale ancora no-go.
