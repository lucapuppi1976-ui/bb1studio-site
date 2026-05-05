# Agri App — AI Case Report Builder V7.5

## Obiettivo

V7.5 introduce un report operativo locale, esportabile e sicuro per la diagnosi fotografica.

Il report consolida:

- DiagnosisCaseReport;
- CaseReportSection;
- CaseReportAuditEntry;
- reportFingerprint;
- executiveSummary;
- intake fotografico;
- evidence digest;
- diagnosi differenziale;
- solution playbook;
- auditTrail;
- safety summary;
- operator next steps;
- human review.

## Endpoint operativo protetto

    /api/ops/ai-case-report-dry-run

## Export

- textReportReady=true
- jsonReportReady=true
- pdfExportReady=false
- databasePersistenceReady=false

## Safety

- providerCalled=false
- persistencePerformed=false
- productPrescriptionPerformed=false
- dosageAdvicePerformed=false
- automaticTaskCreationPerformed=false
- automaticInterventionCreationPerformed=false
- endpointAiCalled=false
- allowedToExecute=false
- humanReviewRequired=true
- redactedOutputOnly=true

## Guardrail

- nessuna chiamata AI live;
- nessuna chiave AI;
- nessun endpoint `/api/ai`;
- nessun endpoint `/api/diagnosis`;
- nessuna persistenza DB;
- nessuna modifica Prisma schema;
- nessuna creazione automatica di attività o interventi;
- nessuna prescrizione prodotto;
- nessun dosaggio;
- revisione umana obbligatoria.

## Check automatico

    npm run ops:ai-case-report-check

Con verifica live protetta:

    npm run ops:ai-case-report-check -- --base https://bb1studio.com/agri_app --include-live

Usare `CRON_SECRET_VALUE` in ambiente shell. Non incollare il valore del secret in chat.
