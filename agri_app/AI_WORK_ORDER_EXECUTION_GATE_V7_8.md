# Agri App — AI Work Order Execution Gate V7.8

## Obiettivo

V7.8 introduce il gate finale per stabilire se un work order AI può essere convertito manualmente dopo review umana.

Il gate non esegue azioni. Produce solo un pacchetto di stato e blocchi.

Componenti:

- AiWorkOrderExecutionGate;
- ExecutionGateInput;
- ExecutionGateChecklistItem;
- ExecutionReviewDecision;
- manualConversionAllowed;
- blocker list;
- checklist di revisione;
- conversion package;
- safety state.

## Endpoint operativo protetto

    /api/ops/ai-work-order-execution-gate-dry-run

## Safety invarianti

- automaticTaskCreationAllowed=false
- automaticInterventionCreationAllowed=false
- automaticExecutionAllowed=false
- noAutomaticDbWrites=true
- noProviderCall=true
- taskCreated=false
- interventionCreated=false
- automaticExecutionPerformed=false
- productPrescriptionPerformed=false
- dosageAdvicePerformed=false
- humanReviewRequired=true

## Regola manualConversionAllowed

`manualConversionAllowed=true` solo se:

- decisione revisore = approve-with-caution;
- evidenze confermate;
- reviewer assegnato;
- safety sign-off completato;
- operatore informato;
- nessuna richiesta prodotto;
- nessuna richiesta dosaggio;
- conversione manuale richiesta esplicitamente.

## Guardrail

- nessuna chiamata AI live;
- nessuna chiave AI;
- nessun endpoint `/api/ai`;
- nessun endpoint `/api/diagnosis`;
- nessuna persistenza DB;
- nessuna modifica Prisma schema;
- nessuna creazione automatica;
- nessuna esecuzione automatica;
- nessuna prescrizione prodotto;
- nessun dosaggio.

## Check automatico

    npm run ops:ai-work-order-execution-gate-check

Con live protetto:

    npm run ops:ai-work-order-execution-gate-check -- --base https://bb1studio.com/agri_app --include-live

Usare `CRON_SECRET_VALUE` in ambiente shell. Non incollare il secret in chat.
