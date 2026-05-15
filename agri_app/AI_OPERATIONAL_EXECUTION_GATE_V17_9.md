# V17.9 — AI Operational Execution Gate & Explicit Human Approval Lock

## Scopo

Questa versione aggiunge un modulo locale dry-run per operational execution gate e explicit human approval lock.

V17.9 non esegue azioni operative reali, non esegue preflight operativi, non invia comandi, non invia notifiche, non configura emergency stop runtime, non chiama provider esterni, non abilita provider AI reali, non abilita persistenza review, non scrive casi AI, non modifica Prisma schema, non esegue migration, non crea task, non crea interventi, non abilita automazioni, non prescrive prodotti e non suggerisce dosaggi.

## Componenti

- operational execution gate;
- explicit human approval lock;
- execution preflight boundary;
- execution command boundary;
- execution notification boundary;
- emergency stop board;
- rollback execution plan;
- execution no-go board;
- execution gate checks;
- execution board pack;
- execution findings;
- staged roadmap.

## Endpoint ops

`/api/ops/ai-operational-execution-gate-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiOperationalExecutionGate.ts`
- `src/app/api/ops/ai-operational-execution-gate-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/OperationalExecutionGatePanel.tsx`
- `src/app/admin/operations/OperationsAiOperationalExecutionGate.tsx`
- `scripts/ops-ai-operational-execution-gate-check.mjs`

## Guardrail

- providerAiReady=false
- providerCalled=false
- providerCallAllowed=false
- providerCallPerformed=false
- persistenceReady=false
- persistencePerformed=false
- operationalExecutionAllowed=false
- operationalExecutionPerformed=false
- executionPreflightAllowed=false
- executionPreflightPerformed=false
- executionCommandAllowed=false
- executionCommandPerformed=false
- executionNotificationAllowed=false
- executionNotificationPerformed=false
- emergencyStopConfigured=false
- emergencyStopPerformed=false
- humanExecutionApprovalAllowed=false
- humanExecutionApprovalPerformed=false
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

- V17.9: operational execution gate in zero-execution dry-run.
- V18.0: provider runtime activation only after explicit provider approval and rollback proof.
- V18.1: incident record persistence only after explicit governance final approval.
- V18.2: public export artifact write only after explicit legal and privacy final approval.
- V18.3: operational execution only after explicit human approval and emergency stop proof.

## Stato operativo

Operational execution gate pronto solo come dry-run design. Esecuzione reale, command dispatch, notification, emergency stop runtime, provider reale e produzione AI ancora no-go.
