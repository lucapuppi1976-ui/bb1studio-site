# Agri App — AI Differential Diagnosis Matrix V7.3

## Obiettivo

V7.3 introduce una matrice locale di diagnosi differenziale spiegabile.

Il sistema produce:

- DifferentialDiagnosisMatrix;
- matrixFingerprint;
- candidati diagnostici ordinati;
- evidenceFor;
- evidenceAgainst;
- evidenceMissing;
- confidenceBand;
- riskBand;
- evidence gaps;
- next best evidence;
- report testuale e JSON.

## Endpoint operativo protetto

    /api/ops/ai-differential-diagnosis-dry-run

## Output chiave

- matrixId
- matrixFingerprint
- topCandidate
- candidates
- evidenceFor
- evidenceAgainst
- evidenceMissing
- confidenceBand
- riskBand
- allowedToExecute=false
- providerCalled=false
- persistencePerformed=false
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
- allowedToExecute=false;
- revisione umana obbligatoria.

## Check automatico

    npm run ops:ai-differential-diagnosis-check

Con verifica live protetta:

    npm run ops:ai-differential-diagnosis-check -- --base https://bb1studio.com/agri_app --include-live

Usare `CRON_SECRET_VALUE` in ambiente shell. Non incollare il valore del secret in chat.
