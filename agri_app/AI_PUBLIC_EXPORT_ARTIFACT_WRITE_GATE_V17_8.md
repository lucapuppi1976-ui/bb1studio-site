# V17.8 — AI Public Export Artifact Write Gate & Legal Privacy Final Artifact Approval Lock

## Scopo

Questa versione aggiunge un modulo locale dry-run per public export artifact write gate e legal/privacy final artifact approval lock.

V17.8 non scrive artifact export, non scrive manifest, non scrive checksum, non scrive archive, non scrive access-control, non pubblica contenuti, non condivide pubblicamente, non chiama provider esterni, non abilita provider AI reali, non abilita persistenza review, non scrive casi AI, non modifica Prisma schema, non esegue migration, non crea task, non crea interventi, non abilita automazioni, non prescrive prodotti e non suggerisce dosaggi.

## Componenti

- artifact write gate;
- legal privacy final artifact approval lock;
- manifest write boundary;
- checksum write boundary;
- archive write boundary;
- access-control boundary;
- rollback artifact plan;
- artifact write no-go board;
- artifact write gate checks;
- artifact write board pack;
- artifact write findings;
- staged roadmap.

## Endpoint ops

`/api/ops/ai-public-export-artifact-write-gate-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiPublicExportArtifactWriteGate.ts`
- `src/app/api/ops/ai-public-export-artifact-write-gate-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/PublicExportArtifactWriteGatePanel.tsx`
- `src/app/admin/operations/OperationsAiPublicExportArtifactWriteGate.tsx`
- `scripts/ops-ai-public-export-artifact-write-gate-check.mjs`

## Guardrail

- providerAiReady=false
- providerCalled=false
- providerCallAllowed=false
- providerCallPerformed=false
- persistenceReady=false
- persistencePerformed=false
- publicExportArtifactWriteAllowed=false
- publicExportArtifactWritePerformed=false
- publicExportManifestWriteAllowed=false
- publicExportManifestWritePerformed=false
- publicExportChecksumWriteAllowed=false
- publicExportChecksumWritePerformed=false
- publicExportArchiveWriteAllowed=false
- publicExportArchiveWritePerformed=false
- publicExportAccessControlWriteAllowed=false
- publicExportAccessControlWritePerformed=false
- publicExportArtifactFinalApprovalAllowed=false
- publicExportArtifactFinalApprovalPerformed=false
- legalFinalApprovalAllowed=false
- legalFinalApprovalPerformed=false
- privacyFinalApprovalAllowed=false
- privacyFinalApprovalPerformed=false
- publicShareAllowed=false
- publicSharePerformed=false
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
- publicComplianceExportPublicationAllowed=false
- publicComplianceExportPublicationPerformed=false
- manualDispatchOnly=true
- humanReviewRequired=true
- localAnalysisOnly=true
- redactedOutputOnly=true
- zeroActivationMode=true

## Roadmap consigliata

- V17.8: public export artifact write gate in zero-write dry-run.
- V17.9: operational execution only after explicit human approval.
- V18.0: provider runtime activation only after explicit provider approval and rollback proof.
- V18.1: incident record persistence only after explicit governance final approval.
- V18.2: public export artifact write only after explicit legal and privacy final approval.

## Stato operativo

Public export artifact write gate pronto solo come dry-run design. Artifact write reale, manifest write, checksum write, archive write, provider reale e produzione AI ancora no-go.
