# V15.7 — AI Provider Staging Activation Gate & Production Runtime Lock

## Scopo

Questa versione aggiunge un modulo locale dry-run per progettare il gate di attivazione staging provider.

V15.7 non chiama provider esterni, non abilita provider AI reali, non abilita runtime di produzione, non abilita persistenza review, non scrive casi AI, non modifica Prisma schema, non esegue migration, non crea task, non crea interventi, non abilita automazioni, non prescrive prodotti e non suggerisce dosaggi.

## Componenti

- runtime boundary plan;
- staging switch plan;
- provider registry plan;
- budget gate plan;
- canary boundary plan;
- failure stop plan;
- production runtime lock;
- go/no-go board;
- activation gates;
- activation board pack;
- activation risk register;
- staged roadmap.

## Endpoint ops

`/api/ops/ai-provider-staging-activation-gate-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiProviderStagingActivationGate.ts`
- `src/app/api/ops/ai-provider-staging-activation-gate-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/ProviderStagingActivationGatePanel.tsx`
- `src/app/admin/operations/OperationsAiProviderStagingActivationGate.tsx`
- `scripts/ops-ai-provider-staging-activation-gate-check.mjs`

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

- V15.7: provider staging activation gate and production runtime lock.
- V15.8: storage rehearsal board with no live migration execution.
- V15.9: controlled beta readiness board with all operational gates still manual.
- V16.0: controlled production beta only after provider, storage, review and conversion gates pass.
- V16.1: post-beta observability and rollback hardening.

## Stato operativo

Gate di attivazione staging pronto solo come dry-run design. Provider reale, staging runtime e produzione AI ancora no-go.
