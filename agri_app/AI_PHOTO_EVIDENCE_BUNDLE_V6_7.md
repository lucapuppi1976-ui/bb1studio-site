# Agri App — AI Photo Evidence Bundle V6.7

## Obiettivo

V6.7 introduce il bundle evidenze fotografiche per diagnosi assistita.

Il bundle raccoglie:

- foto disponibili;
- ruolo della foto;
- quality gate per ogni foto;
- contesto pianta;
- posizione o area;
- sintomi;
- note operatore;
- evidenze mancanti;
- providerReadyPayload per futura integrazione AI.

## Endpoint operativo protetto

    /api/ops/ai-photo-evidence-bundle

## Output chiave

- acceptedForAiPipeline
- readiness
- bundleScore
- missingEvidence
- evidenceItems
- providerReadyPayload
- humanReviewRequired=true

## Guardrail

- nessuna chiamata AI live;
- nessuna chiave AI;
- nessun endpoint `/api/ai`;
- nessun endpoint `/api/diagnosis`;
- nessuna persistenza DB;
- nessuna modifica Prisma schema;
- nessuna creazione automatica di attività o interventi;
- revisione umana obbligatoria.

## Check automatico

    npm run ops:ai-evidence-bundle-check

Con verifica live protetta:

    npm run ops:ai-evidence-bundle-check -- --base https://bb1studio.com/agri_app --include-live

Usare `CRON_SECRET_VALUE` in ambiente shell. Non incollare il valore del secret in chat.
