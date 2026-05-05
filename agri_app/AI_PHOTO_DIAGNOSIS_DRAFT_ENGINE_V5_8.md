# Agri App — AI Photo Diagnosis Draft Engine V5.8

## Obiettivo

V5.8 aggiunge un motore locale per generare una bozza strutturata di diagnosi fotografica.

## Funzionalità

- Motore locale `diagnosisDraftEngine.ts`.
- Bozza con:
  - rischio operativo;
  - confidenza;
  - ipotesi problema;
  - azioni immediate;
  - controlli aggiuntivi;
  - follow-up;
  - limiti.
- UI integrata in `/ai/photo-diagnosis`.
- Copia della bozza negli appunti.

## Guardrail

- motore locale;
- nessuna chiamata AI live;
- nessun endpoint AI live;
- nessuna chiave provider AI;
- nessuna persistenza DB;
- nessuna modifica Prisma schema.

## Check automatico

    npm run ops:ai-diagnosis-draft-check

## Nota

Questa release non usa riconoscimento visivo reale. Serve a validare UX, workflow, struttura output e guardrail prima del provider AI.
