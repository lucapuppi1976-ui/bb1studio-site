# V15.3 — AI Persistent Human Review Workflow & Manual Conversion Gate Design

## Scopo

Questa versione aggiunge un modulo locale dry-run per progettare il workflow umano persistente e il gate di conversione manuale AI-to-work.

V15.3 non abilita persistenza review, non scrive casi AI, non modifica Prisma schema, non esegue migration, non crea task, non crea interventi, non chiama provider, non abilita automazioni, non prescrive prodotti e non suggerisce dosaggi.

## Componenti

- review state machine;
- reviewer ownership plan;
- reason requirement plan;
- review audit trail design;
- manual conversion gate plan;
- correction path plan;
- review go/no-go board;
- review workflow gates;
- review board pack;
- review risk register;
- staged roadmap.

## Endpoint ops

`/api/ops/ai-persistent-human-review-workflow-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiPersistentHumanReviewWorkflow.ts`
- `src/app/api/ops/ai-persistent-human-review-workflow-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/PersistentHumanReviewWorkflowPanel.tsx`
- `src/app/admin/operations/OperationsAiPersistentHumanReviewWorkflow.tsx`
- `scripts/ops-ai-persistent-human-review-workflow-check.mjs`

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

## Stati review progettati

- DRAFT
- PROVIDER_STAGING_HOLD
- REVIEW_REQUIRED
- REVIEW_IN_PROGRESS
- APPROVED_FOR_MANUAL_CONVERSION
- REJECTED
- ARCHIVED

## Roadmap consigliata

- V15.3: persistent human review workflow and manual conversion gate design.
- V15.4: provider staging shadow run with no production activation.
- V15.5: migration rehearsal and storage gate validation in staging only.
- V15.6: manual conversion rehearsal with no automatic execution.
- V16.0: controlled production beta only after provider, storage, review and conversion gates pass.

## Stato operativo

Workflow umano persistente pronto solo come blueprint dry-run. Persistenza review e conversione reale ancora no-go.
