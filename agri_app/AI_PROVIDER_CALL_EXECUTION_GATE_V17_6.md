# V17.6 — AI Provider Call Execution Gate & Explicit Provider Approval Runtime Lock

## Scopo

Questa versione aggiunge un modulo locale dry-run per provider call execution gate e explicit provider approval runtime lock.

V17.6 non esegue chiamate provider reali, non invia request provider, non abilita response intake operativo, non abilita response review, non persiste risultati provider, non abilita provider AI reali, non abilita persistenza review, non scrive casi AI, non modifica Prisma schema, non esegue migration, non crea task, non crea interventi, non abilita automazioni, non prescrive prodotti e non suggerisce dosaggi.

## Componenti

- provider call execution gate;
- explicit provider approval runtime lock;
- request dispatch boundary;
- response intake boundary;
- budget runtime boundary;
- reviewer approval evidence;
- rollback provider call plan;
- provider call no-go board;
- provider call gate checks;
- provider call board pack;
- provider call findings;
- staged roadmap.

## Endpoint ops

`/api/ops/ai-provider-call-execution-gate-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiProviderCallExecutionGate.ts`
- `src/app/api/ops/ai-provider-call-execution-gate-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/ProviderCallExecutionGatePanel.tsx`
- `src/app/admin/operations/OperationsAiProviderCallExecutionGate.tsx`
- `scripts/ops-ai-provider-call-execution-gate-check.mjs`

## Guardrail

- providerAiReady=false
- providerCalled=false
- providerCallAllowed=false
- providerCallPerformed=false
- providerCallExecutionAllowed=false
- providerCallExecutionPerformed=false
- explicitProviderApprovalAllowed=false
- explicitProviderApprovalPerformed=false
- providerRequestDispatchAllowed=false
- providerRequestDispatchPerformed=false
- providerResponseIntakeAllowed=false
- providerResponseIntakePerformed=false
- providerResponseReviewAllowed=false
- providerResponseReviewPerformed=false
- providerResultPersistenceAllowed=false
- providerResultPersistencePerformed=false
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

- V17.6: provider call execution gate in zero-call dry-run.
- V17.7: incident record write only after explicit incident governance approval.
- V17.8: public export artifact write only after explicit legal and privacy approval.
- V17.9: operational execution only after explicit human approval.
- V18.0: provider runtime activation only after explicit provider approval and rollback proof.

## Stato operativo

Provider call execution gate pronto solo come dry-run design. Provider call reale, request dispatch, response intake, result persistence, provider reale e produzione AI ancora no-go.
