# V16.3 — AI Human-Supervised Agronomic Operations Cockpit & Manual Dispatch Readiness

## Scopo

Questa versione aggiunge un modulo locale dry-run per cockpit operativo umano-supervisionato e manual dispatch readiness.

V16.3 non attiva dispatch reale, non chiama provider esterni, non abilita provider AI reali, non abilita persistenza review, non scrive casi AI, non modifica Prisma schema, non esegue migration, non crea task, non crea interventi, non abilita automazioni, non prescrive prodotti e non suggerisce dosaggi.

## Componenti

- operator board;
- manual dispatch readiness;
- reviewer queue;
- escalation path plan;
- safety boundary;
- operational evidence pack;
- execution no-go board;
- cockpit gates;
- cockpit board pack;
- cockpit findings;
- staged roadmap.

## Endpoint ops

`/api/ops/ai-human-supervised-operations-cockpit-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiHumanSupervisedOperationsCockpit.ts`
- `src/app/api/ops/ai-human-supervised-operations-cockpit-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/HumanSupervisedOperationsCockpitPanel.tsx`
- `src/app/admin/operations/OperationsAiHumanSupervisedOperationsCockpit.tsx`
- `scripts/ops-ai-human-supervised-operations-cockpit-check.mjs`

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
- complianceExportAllowed=false
- complianceExportPerformed=false

## Roadmap consigliata

- V16.3: human-supervised agronomic operations cockpit in zero-activation dry-run.
- V16.4: staged provider runtime beta only after explicit activation approval.
- V16.5: runtime incident response board after explicit activation approval.
- V16.6: compliance export activation only after explicit approval.
- V16.7: manual dispatch activation only after explicit operational approval.

## Stato operativo

Cockpit umano-supervisionato pronto solo come dry-run design. Dispatch reale, runtime reale, provider reale e produzione AI ancora no-go.
