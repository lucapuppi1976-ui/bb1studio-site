# Agri App — Ops log redaction V4.11

## Obiettivo

V4.11 aggiunge una redazione difensiva dei secret nei log operativi.

Il caso principale corretto è l output di ops-live-check quando un endpoint protetto risponde 403 e l URL contiene secret=...

## File aggiunti o modificati

- agri_app/scripts/ops-live-check.mjs
- agri_app/scripts/ops-log-redaction-check.mjs
- agri_app/package.json
- agri_app/README_OPS_LOG_REDACTION_V4_11.md

## Alias npm

    npm run ops:log-redaction-check

## Cosa verifica

Il check usa un fake secret non valido, chiama ops-live-check e verifica che:

- il valore fake non compaia nell output;
- l URL venga mostrato come secret=[REDACTED];
- il controllo email-status sia stato effettivamente eseguito.

## Vincoli mantenuti

- Nessun prisma db push.
- Nessuna modifica al DB schema.
- Nessuna modifica al Prisma schema.
- Email live ancora disattivate.
- ENABLE_EMAIL_NOTIFICATIONS=false.
