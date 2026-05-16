# V18.5 — UAT Tester Access Provisioning & Role-Based Onboarding

V18.5 aggiunge governance dry-run per tester UAT, ruoli, lingua preferita, onboarding e inviti controllati.

## Stato operativo

- uatTesterAccessProvisioningReady=true
- roleBasedOnboardingReady=true
- inviteOnlyAccessReady=true
- testerRosterDraftReady=true
- languagePreferenceReady=true
- revocationPlanReady=true
- publicSignupAllowed=false
- accountWriteAllowed=false
- testerInviteSendAllowed=false
- testerInvitePersistenceAllowed=false
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

/api/ops/ai-uat-tester-access-provisioning-dry-run

## Check

npm run ops:ai-uat-tester-access-provisioning-check

## Decisione

V18.5 prepara il provisioning tester UAT e l’onboarding a ruoli. Non abilita registrazione pubblica, scrittura account, invio inviti o revoca reale.
