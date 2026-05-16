# V19.0 — Invite-Only Tester Account Activation Gate & Manual Provisioning Readiness

V19.0 aggiunge un gate dry-run per preparare account tester invite-only, ruoli, lingua preferita, checklist provisioning manuale e revoca accessi.

## Stato operativo

- testerAccountActivationGateReady=true
- inviteOnlyActivationReady=true
- manualProvisioningReadinessReady=true
- activationApprovalEvidenceReady=true
- roleAssignmentReadinessReady=true
- languageAssignmentReadinessReady=true
- revocationReadinessReady=true
- publicSignupAllowed=false
- accountWriteAllowed=false
- testerAccountCreateAllowed=false
- testerInviteSendAllowed=false
- testerRoleWriteAllowed=false
- testerLanguageWriteAllowed=false
- testerAccessRevocationAllowed=false
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

/api/ops/ai-tester-account-activation-gate-dry-run

## Check

npm run ops:ai-tester-account-activation-gate-check

## Decisione

V19.0 prepara il gate account tester, ma non crea account reali, non invia inviti reali e non abilita registrazione pubblica.
