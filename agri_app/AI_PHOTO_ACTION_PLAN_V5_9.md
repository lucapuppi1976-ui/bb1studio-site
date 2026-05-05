# Agri App — AI Photo Action Plan V5.9

## Obiettivo

V5.9 aggiunge un motore locale per trasformare la bozza diagnosi in un piano d’azione operativo.

## Funzionalità

- Motore locale `diagnosisActionPlan.ts`.
- Piano con:
  - priorità operativa;
  - attività proposte;
  - interventi consigliati;
  - monitoraggio;
  - escalation;
  - materiali e verifiche;
  - note di revisione umana.
- UI integrata in `/ai/photo-diagnosis`.
- Copia del piano negli appunti.

## Guardrail

- motore locale;
- nessuna chiamata AI live;
- nessun endpoint AI live;
- nessuna chiave provider AI;
- nessuna persistenza DB;
- nessuna modifica Prisma schema;
- nessuna creazione automatica di attività o interventi.

## Check automatico

    npm run ops:ai-action-plan-check

## Nota

Questa release prepara il workflow operativo futuro. Le azioni restano proposte assistive e devono essere confermate da un operatore.
