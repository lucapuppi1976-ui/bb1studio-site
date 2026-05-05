# Agri App — AI Provider Safety Harness V6.1

## Obiettivo

V6.1 introduce il provider contract per la futura integrazione AI reale, mantenendo il sistema in modalità locale e sicura.

## Funzionalità

- Provider safety contract locale.
- Pannello `/ai/photo-diagnosis` con:
  - stato provider non attivo;
  - policy client;
  - human review obbligatoria;
  - output atteso;
  - output vietato;
  - requisiti backend;
  - rollout controllato.

## Guardrail

- nessuna chiamata AI live;
- nessun endpoint AI live;
- nessuna chiave provider AI;
- nessuna persistenza DB;
- nessuna modifica Prisma schema;
- nessuna creazione automatica di attività o interventi;
- human review obbligatoria.

## Check automatico

    npm run ops:ai-provider-safety-check

## Nota

Questa release prepara la futura attivazione provider lato server, ma non collega nessun provider reale.
