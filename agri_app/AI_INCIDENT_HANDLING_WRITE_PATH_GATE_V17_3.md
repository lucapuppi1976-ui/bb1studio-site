# V17.3 — AI Incident Handling Write Path Gate & Incident Governance Approval Lock

## Scopo

Questa versione aggiunge un modulo locale dry-run per incident handling write path gate e incident governance approval lock.

V17.3 non attiva write path incidente reale, non scrive incidenti, non scrive timeline, non scrive audit, non esegue escalation, non chiude incidenti, non invia notifiche, non chiama provider esterni, non abilita provider AI reali, non abilita persistenza review, non scrive casi AI, non modifica Prisma schema, non esegue migration, non crea task, non crea interventi, non abilita automazioni, non prescrive prodotti e non suggerisce dosaggi.

## Componenti

- incident write path gate;
- incident governance approval lock;
- incident record boundary;
- incident escalation boundary;
- incident closure boundary;
- incident notification boundary;
- rollback incident write plan;
- incident write no-go board;
- incident write gate checks;
- incident write board pack;
- incident write findings;
- staged roadmap.

## Endpoint ops

`/api/ops/ai-incident-handling-write-path-gate-dry-run`

L’endpoint richiede `CRON_SECRET` tramite header bearer.

## File principali

- `src/lib/ai/aiIncidentHandlingWritePathGate.ts`
- `src/app/api/ops/ai-incident-handling-write-path-gate-dry-run/route.ts`
- `src/app/ai/photo-diagnosis/IncidentHandlingWritePathGatePanel.tsx`
- `src/app/admin/operations/OperationsAiIncidentHandlingWritePathGate.tsx`
- `scripts/ops-ai-incident-handling-write-path-gate-check.mjs`

## Guardrail

- providerAiReady=false
- providerCalled=false
- providerCallAllowed=false
- providerCallPerformed=false
- persistenceReady=false
- persistencePerformed=false
- incidentHandlingAllowed=false
- incidentHandlingPerformed=false
- incidentWriteAllowed=false
- incidentWritePerformed=false
- incidentHandlingWritePathAllowed=false
- incidentHandlingWritePathPerformed=false
- incidentGovernanceApprovalAllowed=false
- incidentGovernanceApprovalPerformed=false
- incidentRecordWriteAllowed=false
- incidentRecordWritePerformed=false
- incidentEscalationWriteAllowed=false
- incidentEscalationWritePerformed=false
- incidentClosureWriteAllowed=false
- incidentClosureWritePerformed=false
- incidentTimelineWriteAllowed=false
- incidentTimelineWritePerformed=false
- incidentWriteAuditAllowed=false
- incidentWriteAuditPerformed=false
- incidentNotificationAllowed=false
- incidentNotificationPerformed=false
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

- V17.3: incident handling write path gate in zero-write dry-run.
- V17.4: public export package write only after explicit legal and privacy approval.
- V17.5: task and intervention creation only after explicit operational write approval.
- V17.6: provider call execution only after explicit provider approval.
- V17.7: incident record write only after explicit incident governance approval.

## Stato operativo

Incident handling write path gate pronto solo come dry-run design. Incident write reale, escalation write, closure write, notifiche, provider reale e produzione AI ancora no-go.
