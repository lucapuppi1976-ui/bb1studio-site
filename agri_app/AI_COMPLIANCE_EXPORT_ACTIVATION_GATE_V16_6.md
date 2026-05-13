# V16.6 — AI Compliance Export Activation Gate & Privacy Redaction Approval Lock

## Scopo

Questa versione aggiunge un modulo locale dry-run per compliance export activation gate e privacy redaction approval lock.

V16.6 non attiva export reale, non scrive file export, non pubblica contenuti, non approva legalmente contenuti, non chiama provider esterni, non abilita provider AI reali, non abilita persistenza review, non scrive casi AI, non modifica Prisma schema, non esegue migration, non crea task, non crea interventi, non abilita automazioni, non prescrive prodotti e non suggerisce dosaggi.

## Componenti

- export activation gate;
- privacy redaction approval;
- legal review locks;
- reviewer attestation board;
- export scope plan;
- audit evidence locks;
- publication no-go board;
- export gate checks;
- export board pack;
- export findings;
- staged roadmap.

## Endpoint ops

`/api/ops/ai-compliance-export-activation-gate-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiComplianceExportActivationGate.ts`
- `src/app/api/ops/ai-compliance-export-activation-gate-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/ComplianceExportActivationGatePanel.tsx`
- `src/app/admin/operations/OperationsAiComplianceExportActivationGate.tsx`
- `scripts/ops-ai-compliance-export-activation-gate-check.mjs`

## Guardrail

- providerAiReady=false
- providerCalled=false
- complianceExportAllowed=false
- complianceExportPerformed=false
- complianceExportActivationAllowed=false
- complianceExportActivationPerformed=false
- privacyRedactionApprovalAllowed=false
- privacyRedactionApprovalPerformed=false
- legalReviewApprovalAllowed=false
- legalReviewApprovalPerformed=false
- exportPublicationAllowed=false
- exportPublicationPerformed=false
- exportFileWriteAllowed=false
- exportFileWritePerformed=false
- publicShareAllowed=false
- publicSharePerformed=false
- persistenceReady=false
- persistencePerformed=false
- casePersistenceActivationAllowed=false
- storageActivationAllowed=false
- reviewPersistenceAllowed=false
- manualConversionAllowed=false
- taskCreated=false
- interventionCreated=false
- automaticExecutionAllowed=false
- automaticExecutionPerformed=false
- productPrescriptionAllowed=false
- productPrescriptionPerformed=false
- dosageAdviceAllowed=false
- dosageAdvicePerformed=false
- manualDispatchOnly=true
- humanReviewRequired=true
- localAnalysisOnly=true
- redactedOutputOnly=true
- zeroActivationMode=true

## Roadmap consigliata

- V16.6: compliance export activation gate in zero-activation dry-run.
- V16.7: manual dispatch activation only after explicit operational approval.
- V16.8: provider runtime canary execution only after explicit approval.
- V16.9: runtime incident handling only after explicit activation approval.
- V17.0: public compliance export only after explicit legal and privacy approval.

## Stato operativo

Compliance export activation gate pronto solo come dry-run design. Export reale, pubblicazione, file write, provider reale e produzione AI ancora no-go.
