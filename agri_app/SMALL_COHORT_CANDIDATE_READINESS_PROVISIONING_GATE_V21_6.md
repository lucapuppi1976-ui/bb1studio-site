# V21.6 — Small-Cohort Candidate Readiness & Provisioning Gate

V21.6 valida readiness candidati e provisioning plan per una piccola coorte controllata.

## Endpoint

/api/ops/tester-small-cohort-candidate-readiness-provisioning-gate-dry-run

## Stato

- testerSmallCohortCandidateReadinessProvisioningGateReady=true
- smallCohortCandidateReadinessReady=true
- provisioningDecisionReady=true
- duplicateCandidateCheckReady=true
- existingUserReviewReady=true
- accountWritePilotPlanningReady=true
- passwordSetupPlanningReady=true
- manualEvidenceOnly=true
- readOnlyVerificationOnly=true
- accountWriteAllowed=false
- passwordWriteAllowed=false
- inviteEmailSendAllowed=false
- publicSignupAllowed=false
- schemaWriteAllowed=false
- migrationExecutionAllowed=false
- providerAiReady=false
- providerCalled=false
- operationalExecutionAllowed=false
- evidencePersistenceAllowed=false
- issuePersistenceAllowed=false
- humanReviewRequired=true
- redactedOutputOnly=true

## Decisioni possibili

- PROTECTED_SMALL_COHORT_ACCOUNT_WRITE_PILOT_READY
- CANDIDATE_ACCESS_REVIEW_REQUIRED
- CANDIDATE_READINESS_INCOMPLETE
- FIX_BEFORE_PROVISIONING
- NO_GO

## Check

npm run ops:tester-small-cohort-candidate-readiness-provisioning-gate-check

## Decisione

V21.6 non crea account, non scrive password, non invia email, non chiama provider AI, non esegue operation e non persiste evidenze/issue. Se il gate risulta pronto, V21.7 può essere un write pilot protetto separato.
