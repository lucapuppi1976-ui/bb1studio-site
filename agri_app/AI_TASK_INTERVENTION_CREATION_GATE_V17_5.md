# V17.5 — AI Task & Intervention Creation Gate & Operational Write Approval Lock

## Scopo

Questa versione aggiunge un modulo locale dry-run per task/intervention creation gate e operational write approval lock.

V17.5 non crea task, non crea interventi, non scrive record task, non scrive record intervento, non materializza work order, non invia notifiche, non chiama provider esterni, non abilita provider AI reali, non abilita persistenza review, non scrive casi AI, non modifica Prisma schema, non esegue migration, non abilita automazioni, non prescrive prodotti e non suggerisce dosaggi.

## Componenti

- task/intervention creation gate;
- operational write approval lock;
- task creation boundary;
- intervention creation boundary;
- work order materialization boundary;
- safety execution boundary;
- rollback creation plan;
- creation no-go board;
- creation gate checks;
- creation board pack;
- creation findings;
- staged roadmap.

## Endpoint ops

`/api/ops/ai-task-intervention-creation-gate-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiTaskInterventionCreationGate.ts`
- `src/app/api/ops/ai-task-intervention-creation-gate-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/TaskInterventionCreationGatePanel.tsx`
- `src/app/admin/operations/OperationsAiTaskInterventionCreationGate.tsx`
- `scripts/ops-ai-task-intervention-creation-gate-check.mjs`

## Guardrail

- providerAiReady=false
- providerCalled=false
- providerCallAllowed=false
- providerCallPerformed=false
- persistenceReady=false
- persistencePerformed=false
- taskInterventionCreationAllowed=false
- taskInterventionCreationPerformed=false
- taskCreationApprovalAllowed=false
- taskCreationApprovalPerformed=false
- interventionCreationApprovalAllowed=false
- interventionCreationApprovalPerformed=false
- taskRecordWriteAllowed=false
- taskRecordWritePerformed=false
- interventionRecordWriteAllowed=false
- interventionRecordWritePerformed=false
- workOrderMaterializationAllowed=false
- workOrderMaterializationPerformed=false
- operationWriteApprovalAllowed=false
- operationWriteApprovalPerformed=false
- dispatchNotificationAllowed=false
- dispatchNotificationPerformed=false
- taskCreated=false
- interventionCreated=false
- automaticTaskCreationAllowed=false
- automaticInterventionCreationAllowed=false
- automaticExecutionAllowed=false
- automaticExecutionPerformed=false
- productPrescriptionAllowed=false
- productPrescriptionPerformed=false
- dosageAdviceAllowed=false
- dosageAdvicePerformed=false
- manualConversionAllowed=false
- manualConversionPerformed=false
- storageActivationAllowed=false
- reviewPersistenceAllowed=false
- complianceExportAllowed=false
- complianceExportPerformed=false
- publicShareAllowed=false
- publicSharePerformed=false
- manualDispatchOnly=true
- humanReviewRequired=true
- localAnalysisOnly=true
- redactedOutputOnly=true
- zeroActivationMode=true

## Roadmap consigliata

- V17.5: task and intervention creation gate in zero-write dry-run.
- V17.6: provider call execution only after explicit provider approval.
- V17.7: incident record write only after explicit incident governance approval.
- V17.8: public export artifact write only after explicit legal and privacy approval.
- V17.9: operational execution only after explicit human approval.

## Stato operativo

Task/intervention creation gate pronto solo come dry-run design. Creazione reale task/interventi, work order materialization, provider reale e produzione AI ancora no-go.
