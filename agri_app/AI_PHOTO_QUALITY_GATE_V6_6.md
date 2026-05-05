# Agri App — AI Photo Quality Gate V6.6

## Obiettivo

V6.6 introduce un quality gate fotografico prima della pipeline AI.

Il controllo valuta:

- formato immagine;
- dimensione file;
- risoluzione;
- numero foto disponibili;
- presenza foto ravvicinata;
- presenza foto pianta intera;
- presenza foto pagina inferiore foglia;
- contesto pianta;
- sintomi descritti;
- posizione o area.

## Endpoint operativo protetto

    /api/ops/ai-photo-quality-gate

## Output chiave

- acceptedForAiPipeline
- grade
- score
- blockers
- warnings
- recommendations
- requiredNextPhotos
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

    npm run ops:ai-photo-quality-gate-check

Con verifica live protetta:

    npm run ops:ai-photo-quality-gate-check -- --base https://bb1studio.com/agri_app --include-live

Usare `CRON_SECRET_VALUE` in ambiente shell. Non incollare il valore del secret in chat.
