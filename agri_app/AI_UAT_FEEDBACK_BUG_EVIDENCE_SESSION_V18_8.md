# V18.8 — UAT Feedback, Bug Triage & Evidence Session Board

V18.8 aggiunge un board dry-run per raccolta feedback UAT, bug triage, evidence capture, pass/fail review, reviewer decision e rollback gate.

## Stato operativo

- uatFeedbackBugEvidenceSessionReady=true
- sessionFeedbackBoardReady=true
- bugTriageBoardReady=true
- evidenceCaptureBoardReady=true
- passFailReviewBoardReady=true
- reviewerDecisionBoardReady=true
- rollbackGateReady=true
- feedbackWriteAllowed=false
- feedbackPersistenceAllowed=false
- bugWriteAllowed=false
- bugPersistenceAllowed=false
- evidenceWriteAllowed=false
- evidencePersistenceAllowed=false
- sessionWriteAllowed=false
- sessionPersistenceAllowed=false
- publicSignupAllowed=false
- accountWriteAllowed=false
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

/api/ops/ai-uat-feedback-bug-evidence-session-dry-run

## Check

npm run ops:ai-uat-feedback-bug-evidence-session-check

## Decisione

V18.8 rende tracciabile la sessione UAT, ma non abilita scrittura reale di feedback, bug, evidenze o sessioni.
