# V17.1 — AI Manual Dispatch Write Path Gate & Task/Intervention Creation Approval Lock

## Scopo

Questa versione aggiunge un modulo locale dry-run per manual dispatch write path gate e task/intervention creation approval lock.

V17.1 non attiva write path reale, non scrive draft dispatch, non scrive ticket dispatch, non crea task, non crea interventi, non persiste work order, non invia notifiche, non chiama provider esterni, non abilita provider AI reali, non abilita persistenza review, non scrive casi AI, non modifica Prisma schema, non esegue migration, non abilita automazioni, non prescrive prodotti e non suggerisce dosaggi.

## Componenti

- dispatch write path gate;
- task write approval lock;
- intervention write approval lock;
- work order boundary;
- operator write attestation;
- rollback write plan;
- write no-go board;
- write gate checks;
- write board pack;
- write findings;
- staged roadmap.

## Endpoint ops

`/api/ops/ai-manual-dispatch-write-path-gate-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiManualDispatchWritePathGate.ts`
- `src/app/api/ops/ai-manual-dispatch-write-path-gate-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/ManualDispatchWritePathGatePanel.tsx`
- `src/app/admin/operations/OperationsAiManualDispatchWritePathGate.tsx`
- `scripts/ops-ai-manual-dispatch-write-path-gate-check.mjs`

## Guardrail

- providerAiReady=false
- providerCalled=false
- providerCallAllowed=false
- providerCallPerformed=false
- persistenceReady=false
- persistencePerformed=false
- taskCreated=false
- interventionCreated=false
- automaticExecutionAllowed=false
- automaticExecutionPerformed=false
- productPrescriptionAllowed=false
- productPrescriptionPerformed=false
- dosageAdviceAllowed=false
- dosageAdvicePerformed=false
- manualDispatchActivationAllowed=false
- manualDispatchActivationPerformed=false
- manualDispatchWritePathAllowed=false
- manualDispatchWritePathPerformed=false
- dispatchDraftWriteAllowed=false
- dispatchDraftWritePerformed=false
- dispatchTicketWriteAllowed=false
- dispatchTicketWritePerformed=false
- workOrderDispatchAllowed=false
- workOrderDispatchPerformed=false
- taskWriteApprovalAllowed=false
- taskWriteApprovalPerformed=false
- interventionWriteApprovalAllowed=false
- interventionWriteApprovalPerformed=false
- workOrderPersistenceAllowed=false
- workOrderPersistencePerformed=false
- operatorWriteAttestationAllowed=false
- operatorWriteAttestationPerformed=false
- dispatchNotificationAllowed=false
- dispatchNotificationPerformed=false
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

- V17.1: manual dispatch write path gate in zero-write dry-run.
- V17.2: provider canary call execution only after explicit provider approval.
- V17.3: incident handling write path only after explicit incident governance approval.
- V17.4: public export package write only after explicit legal and privacy approval.
- V17.5: task and intervention creation only after explicit operational write approval.

## Stato operativo

Manual dispatch write path gate pronto solo come dry-run design. Write path reale, ticket write, task, interventi, work order persistence, provider reale e produzione AI ancora no-go.
