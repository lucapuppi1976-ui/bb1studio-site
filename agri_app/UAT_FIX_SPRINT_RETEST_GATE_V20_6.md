# V20.6 — UAT Fix Sprint Board & Retest Gate

V20.6 formalizza fix sprint board e retest gate in modalità manuale/read-only.

## Endpoint

/api/ops/tester-uat-fix-sprint-retest-gate-dry-run

## Checklist

- issue triage captured
- fix owners assigned
- retest plan ready
- fixes applied oppure no-fix-required documentato
- retest evidence captured
- retest summary captured
- safety confirmations complete

## Stato

- testerUatFixSprintRetestGateReady=true
- uatFixSprintBoardReady=true
- retestGateReady=true
- issueTriageReady=true
- manualEvidenceOnly=true
- readOnlyVerificationOnly=true
- issuePersistenceAllowed=false
- evidencePersistenceAllowed=false
- fixPersistenceAllowed=false
- accountWriteAllowed=false
- passwordWriteAllowed=false
- inviteEmailSendAllowed=false
- publicSignupAllowed=false
- schemaWriteAllowed=false
- migrationExecutionAllowed=false
- providerAiReady=false
- providerCalled=false
- operationalExecutionAllowed=false
- publicExportArtifactWriteAllowed=false
- humanReviewRequired=true
- redactedOutputOnly=true

## Decisioni possibili

- FIXES_CLEARED_READY_FOR_EXPANSION
- CONTINUE_RETEST
- FIX_SPRINT_REQUIRED
- FIX_BEFORE_CONTINUE
- NO_GO

## Check

npm run ops:tester-uat-fix-sprint-retest-gate-check

## Decisione

V20.6 non salva fix, issue o evidenze. Produce solo decisione manuale e read-only.
