# V15.6 — AI Manual Conversion Rehearsal & No-Execution Work Preview

## Scopo

Questa versione aggiunge un modulo locale dry-run per progettare la conversione manuale AI-to-work senza creare task o interventi.

V15.6 non chiama provider esterni, non abilita provider AI reali, non abilita persistenza review, non scrive casi AI, non modifica Prisma schema, non esegue migration, non crea task, non crea interventi, non abilita automazioni, non prescrive prodotti e non suggerisce dosaggi.

## Componenti

- conversion preview plan;
- reviewer checklist;
- conversion blockers;
- work package drafts;
- correction path plan;
- non-execution certificate;
- go/no-go board;
- conversion gates;
- conversion board pack;
- conversion risk register;
- staged roadmap.

## Endpoint ops

`/api/ops/ai-manual-conversion-rehearsal-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiManualConversionRehearsal.ts`
- `src/app/api/ops/ai-manual-conversion-rehearsal-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/ManualConversionRehearsalPanel.tsx`
- `src/app/admin/operations/OperationsAiManualConversionRehearsal.tsx`
- `scripts/ops-ai-manual-conversion-rehearsal-check.mjs`

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

- V15.6: manual conversion rehearsal and no-execution work preview.
- V15.7: provider staging activation gate with no production runtime.
- V15.8: storage rehearsal board with no live migration execution.
- V15.9: controlled beta readiness board with all operational gates still manual.
- V16.0: controlled production beta only after provider, storage, review and conversion gates pass.

## Stato operativo

Conversione manuale pronta solo come dry-run preview. Creazione task/interventi reale ancora no-go.
