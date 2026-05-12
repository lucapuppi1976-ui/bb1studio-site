# V15.4 — AI Provider Staging Shadow Run & Non-Production Evaluation Drill

## Scopo

Questa versione aggiunge un modulo locale dry-run per shadow run provider non produttivo.

V15.4 non chiama provider esterni, non abilita provider AI reali, non abilita persistenza review, non scrive casi AI, non modifica Prisma schema, non esegue migration, non crea task, non crea interventi, non abilita automazioni, non prescrive prodotti e non suggerisce dosaggi.

## Componenti

- shadow scenarios;
- envelope simulation plan;
- contract validation matrix;
- budget simulation plan;
- fallback drill plan;
- shadow evaluation matrix;
- non-production boundary;
- shadow run gates;
- shadow run board pack;
- shadow run risk register;
- staged roadmap.

## Endpoint ops

`/api/ops/ai-provider-staging-shadow-run-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiProviderStagingShadowRun.ts`
- `src/app/api/ops/ai-provider-staging-shadow-run-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/ProviderStagingShadowRunPanel.tsx`
- `src/app/admin/operations/OperationsAiProviderStagingShadowRun.tsx`
- `scripts/ops-ai-provider-staging-shadow-run-check.mjs`

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

- V15.4: provider staging shadow run and non-production evaluation drill.
- V15.5: migration rehearsal and storage gate validation in staging only.
- V15.6: manual conversion rehearsal with no automatic execution.
- V15.7: provider staging activation gate with no production runtime.
- V16.0: controlled production beta only after provider, storage, review and conversion gates pass.

## Stato operativo

Shadow run provider pronto solo come dry-run non produttivo. Provider reale e produzione AI ancora no-go.
