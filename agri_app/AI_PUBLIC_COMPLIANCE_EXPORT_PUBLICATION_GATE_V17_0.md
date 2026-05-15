# V17.0 — AI Public Compliance Export Publication Gate & Legal Privacy Final Approval Lock

## Scopo

Questa versione aggiunge un modulo locale dry-run per public compliance export publication gate e legal/privacy final approval lock.

V17.0 non pubblica export reali, non scrive package export, non condivide pubblicamente contenuti, non approva legalmente o privacy contenuti, non chiama provider esterni, non abilita provider AI reali, non abilita persistenza review, non scrive casi AI, non modifica Prisma schema, non esegue migration, non crea task, non crea interventi, non abilita automazioni, non prescrive prodotti e non suggerisce dosaggi.

## Componenti

- publication gate;
- legal final approval board;
- privacy final approval board;
- publication scope plan;
- redaction attestation board;
- export file boundary;
- takedown rollback plan;
- publication no-go board;
- publication gate checks;
- publication board pack;
- publication findings;
- staged roadmap.

## Endpoint ops

`/api/ops/ai-public-compliance-export-publication-gate-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiPublicComplianceExportPublicationGate.ts`
- `src/app/api/ops/ai-public-compliance-export-publication-gate-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/PublicComplianceExportPublicationGatePanel.tsx`
- `src/app/admin/operations/OperationsAiPublicComplianceExportPublicationGate.tsx`
- `scripts/ops-ai-public-compliance-export-publication-gate-check.mjs`

## Guardrail

- providerAiReady=false
- providerCalled=false
- providerCallAllowed=false
- providerCallPerformed=false
- publicComplianceExportPublicationAllowed=false
- publicComplianceExportPublicationPerformed=false
- legalFinalApprovalAllowed=false
- legalFinalApprovalPerformed=false
- privacyFinalApprovalAllowed=false
- privacyFinalApprovalPerformed=false
- publicationPackageWriteAllowed=false
- publicationPackageWritePerformed=false
- publicationTakedownAllowed=false
- publicationTakedownPerformed=false
- publicShareAllowed=false
- publicSharePerformed=false
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
- manualDispatchActivationAllowed=false
- manualDispatchActivationPerformed=false
- incidentHandlingAllowed=false
- incidentHandlingPerformed=false
- manualDispatchOnly=true
- humanReviewRequired=true
- localAnalysisOnly=true
- redactedOutputOnly=true
- zeroActivationMode=true

## Roadmap consigliata

- V17.0: public compliance export publication gate in zero-export dry-run.
- V17.1: manual dispatch write path only after explicit operational approval.
- V17.2: provider canary call execution only after explicit provider approval.
- V17.3: incident handling write path only after explicit incident governance approval.
- V17.4: public export package write only after explicit legal and privacy approval.

## Stato operativo

Public compliance export publication gate pronto solo come dry-run design. Pubblicazione reale, package write, public share, provider reale e produzione AI ancora no-go.
