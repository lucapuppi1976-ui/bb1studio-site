# Agri App — AI Human Review Workflow V6.0

## Obiettivo

V6.0 aggiunge il workflow di revisione umana alla diagnosi fotografica.

## Funzionalità

- Workflow locale di revisione.
- Decisione revisore:
  - approva con cautela;
  - richiede correzioni;
  - rifiuta bozza.
- Note revisore.
- Checklist revisione.
- Pacchetto revisione copiabile.
- Export JSON locale del pacchetto.

## Guardrail

- nessuna chiamata AI live;
- nessun endpoint AI live;
- nessuna chiave provider AI;
- nessuna persistenza DB;
- nessuna modifica Prisma schema;
- nessuna creazione automatica di attività o interventi.

## Check automatico

    npm run ops:ai-review-workflow-check

## Nota

Il pacchetto revisione prepara il passaggio verso workflow reali, ma ogni decisione rimane sotto controllo umano.
