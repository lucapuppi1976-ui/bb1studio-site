# V19.6 — Tester Account Provisioning Write-Intent Lock & Non-AI Ops Boundary

V19.6 separa il provisioning tester dal perimetro AI e aggiunge un gate ops no-write per futura creazione account tester.

## Stato operativo

- testerAccountProvisioningWriteIntentReady=true
- nonAiOpsBoundaryReady=true
- writeIntentLockReady=true
- requestPreviewReady=true
- adminApprovalReady=true
- rollbackChecklistReady=true
- publicSignupAllowed=false
- accountWriteAllowed=false
- testerAccountCreateAllowed=false
- testerInviteSendAllowed=false
- testerRoleWriteAllowed=false
- testerLanguageWriteAllowed=false
- writeIntentExecutionAllowed=false
- nonAiOpsWriteAllowed=false
- schemaWriteAllowed=false
- migrationExecutionAllowed=false
- providerAiReady=false
- providerCalled=false
- persistencePerformed=false
- taskCreated=false
- interventionCreated=false
- operationalExecutionAllowed=false
- publicExportArtifactWriteAllowed=false
- incidentRecordPersistenceAllowed=false
- humanReviewRequired=true
- localAnalysisOnly=true
- redactedOutputOnly=true

## Endpoint ops

/api/ops/tester-account-provisioning-write-intent-dry-run

## Check

npm run ops:tester-account-provisioning-write-intent-check

## Decisione

V19.6 prepara write intent e boundary non-AI, ma non crea account reali, non invia inviti, non modifica schema e non esegue migration.
