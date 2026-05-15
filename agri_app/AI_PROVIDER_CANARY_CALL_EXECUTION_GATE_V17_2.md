# V17.2 — AI Provider Canary Call Execution Gate & Explicit Provider Approval Lock

## Scopo

Questa versione aggiunge un modulo locale dry-run per provider canary call execution gate e explicit provider approval lock.

V17.2 non esegue chiamate provider reali, non invia request provider, non abilita provider AI reali, non persiste risultati provider, non abilita persistenza review, non scrive casi AI, non modifica Prisma schema, non esegue migration, non crea task, non crea interventi, non abilita automazioni, non prescrive prodotti e non suggerisce dosaggi.

## Componenti

- provider call gate;
- explicit provider approval lock;
- provider request boundary;
- canary call budget envelope;
- reviewer provider approval;
- provider result boundary;
- rollback provider call plan;
- provider call no-go board;
- provider call gate checks;
- provider call board pack;
- provider call findings;
- staged roadmap.

## Endpoint ops

`/api/ops/ai-provider-canary-call-execution-gate-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiProviderCanaryCallExecutionGate.ts`
- `src/app/api/ops/ai-provider-canary-call-execution-gate-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/ProviderCanaryCallExecutionGatePanel.tsx`
- `src/app/admin/operations/OperationsAiProviderCanaryCallExecutionGate.tsx`
- `scripts/ops-ai-provider-canary-call-execution-gate-check.mjs`

## Guardrail

- providerAiReady=false
- providerCalled=false
- providerCallAllowed=false
- providerCallPerformed=false
- providerCanaryCallAllowed=false
- providerCanaryCallPerformed=false
- providerCanaryCallExecutionAllowed=false
- providerCanaryCallExecutionPerformed=false
- explicitProviderApprovalAllowed=false
- explicitProviderApprovalPerformed=false
- providerRequestSendAllowed=false
- providerRequestSendPerformed=false
- providerResultReviewAllowed=false
- providerResultReviewPerformed=false
- canaryResultPersistenceAllowed=false
- canaryResultPersistencePerformed=false
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

- V17.2: provider canary call execution gate in zero-call dry-run.
- V17.3: incident handling write path only after explicit incident governance approval.
- V17.4: public export package write only after explicit legal and privacy approval.
- V17.5: task and intervention creation only after explicit operational write approval.
- V17.6: provider call execution only after explicit provider approval.

## Stato operativo

Provider canary call execution gate pronto solo come dry-run design. Provider call reale, request send, result review, result persistence, provider reale e produzione AI ancora no-go.
