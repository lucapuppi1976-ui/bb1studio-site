# Agri App — AI Solution Playbook V7.4

## Obiettivo

V7.4 introduce un playbook locale di soluzioni sicure e non prescrittive.

Il sistema produce:

- SolutionPlaybook;
- SolutionPlaybookOption;
- playbookFingerprint;
- opzioni diagnostiche, monitoraggio, misure conservative e revisione professionale;
- evidenceRequiredBeforeExecution;
- operatorDecisionChecklist;
- blocchi espliciti su prodotti, dosi, automazioni e persistenza.

## Endpoint operativo protetto

    /api/ops/ai-solution-playbook-dry-run

## Output chiave

- playbookId
- playbookFingerprint
- topOptions
- evidenceRequiredBeforeExecution
- operatorDecisionChecklist
- productPrescriptionAllowed=false
- dosageAdviceAllowed=false
- allowedToExecute=false
- providerCalled=false
- persistencePerformed=false
- productPrescriptionPerformed=false
- dosageAdvicePerformed=false
- automaticTaskCreationPerformed=false
- automaticInterventionCreationPerformed=false
- humanReviewRequired=true

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
- allowedToExecute=false;
- revisione umana obbligatoria.

## Check automatico

    npm run ops:ai-solution-playbook-check

Con verifica live protetta:

    npm run ops:ai-solution-playbook-check -- --base https://bb1studio.com/agri_app --include-live

Usare `CRON_SECRET_VALUE` in ambiente shell. Non incollare il valore del secret in chat.
