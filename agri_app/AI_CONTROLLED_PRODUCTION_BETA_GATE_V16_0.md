# V16.0 — AI Controlled Production Beta Launch Gate & Zero-Activation Cutover Plan

## Scopo

Questa versione aggiunge un modulo locale dry-run per il gate di lancio beta controllata.

V16.0 non attiva beta reale, non chiama provider esterni, non abilita provider AI reali, non abilita persistenza review, non scrive casi AI, non modifica Prisma schema, non esegue migration, non crea task, non crea interventi, non abilita automazioni, non prescrive prodotti e non suggerisce dosaggi.

## Componenti

- launch cutover plan;
- provider runtime locks;
- storage runtime locks;
- review runtime locks;
- conversion runtime locks;
- observability tower;
- rollback tower;
- go/no-go board;
- launch gates;
- launch board pack;
- launch board findings;
- staged roadmap.

## Endpoint ops

`/api/ops/ai-controlled-production-beta-gate-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiControlledProductionBetaGate.ts`
- `src/app/api/ops/ai-controlled-production-beta-gate-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/ControlledProductionBetaGatePanel.tsx`
- `src/app/admin/operations/OperationsAiControlledProductionBetaGate.tsx`
- `scripts/ops-ai-controlled-production-beta-gate-check.mjs`

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

- V16.0: controlled production beta launch gate with zero activation.
- V16.1: post-beta observability and rollback hardening, still manual unless explicitly enabled.
- V16.2: operational audit package and compliance export hardening.
- V16.3: human-supervised agronomic operations cockpit.
- V16.4: staged provider runtime beta only after explicit activation approval.

## Stato operativo

Launch gate beta controllata pronto solo come dry-run design. Beta reale, provider reale e produzione AI ancora no-go.
