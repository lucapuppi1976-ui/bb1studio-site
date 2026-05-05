# Agri App — AI Photo Diagnosis Intake V5.7

## Obiettivo

V5.7 introduce il primo flusso concreto per diagnosi fotografica AI, ancora senza attivare provider esterni.

## Funzionalità

- Pagina `/ai/photo-diagnosis`.
- Upload locale controllato.
- Preview immagine.
- Validazione formato JPG/PNG/WEBP.
- Limite dimensione immagine.
- Raccolta contesto:
  - pianta o coltura;
  - area/posizione;
  - sintomi visibili;
  - gravità percepita;
  - note operatore.
- Generazione locale di un brief diagnosi AI copiabile.

## Guardrail

- nessuna chiamata AI live.
- Nessun endpoint AI live.
- Nessuna chiave provider AI.
- Nessuna persistenza DB.
- Nessuna modifica Prisma schema.
- Nessun valore sensibile nella UI.

## Check automatico

    npm run ops:ai-photo-intake-check

## Prossimo passo

La release successiva potrà introdurre una modalità di analisi AI controllata, ancora dietro flag e con provider configurato solo da ambiente sicuro.
