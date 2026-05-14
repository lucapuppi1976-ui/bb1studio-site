# V16.7 — AI Manual Dispatch Activation Gate & Operational Approval Lock

## Scopo

Questa versione aggiunge un modulo locale dry-run per manual dispatch activation gate e operational approval lock.

V16.7 non attiva dispatch reale, non scrive ticket dispatch, non crea work order dispatch, non invia notifiche, non crea task, non crea interventi, non esegue lavori, non chiama provider esterni, non abilita provider AI reali, non abilita persistenza review, non scrive casi AI, non modifica Prisma schema, non esegue migration, non abilita automazioni, non prescrive prodotti e non suggerisce dosaggi.

## Componenti

- dispatch activation gate;
- operator approval board;
- agronomic safety checklist;
- work conversion boundary;
- reviewer signoff board;
- rollback dispatch plan;
- dispatch no-go board;
- dispatch gate checks;
- dispatch board pack;
- dispatch findings;
- staged roadmap.

## Endpoint ops

`/api/ops/ai-manual-dispatch-activation-gate-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiManualDispatchActivationGate.ts`
- `src/app/api/ops/ai-manual-dispatch-activation-gate-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/ManualDispatchActivationGatePanel.tsx`
- `src/app/admin/operations/OperationsAiManualDispatchActivationGate.tsx`
- `scripts/ops-ai-manual-dispatch-activation-gate-check.mjs`

## Guardrail

- providerAiReady=false
- providerCalled=false
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
- operationalApprovalAllowed=false
- operationalApprovalPerformed=false
- dispatchTicketWriteAllowed=false
- dispatchTicketWritePerformed=false
- workOrderDispatchAllowed=false
- workOrderDispatchPerformed=false
- dispatchNotificationAllowed=false
- dispatchNotificationPerformed=false
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

- V16.7: manual dispatch activation gate in zero-activation dry-run.
- V16.8: provider runtime canary execution only after explicit approval.
- V16.9: runtime incident handling only after explicit activation approval.
- V17.0: public compliance export only after explicit legal and privacy approval.
- V17.1: manual dispatch write path only after explicit operational approval.

## Stato operativo

Manual dispatch activation gate pronto solo come dry-run design. Dispatch reale, ticket write, task, interventi, provider reale e produzione AI ancora no-go.
