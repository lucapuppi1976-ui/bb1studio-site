# Agri App — Release Status operativo V4.8

## Obiettivo

V4.8 aggiunge uno script operativo non mutante per fotografare rapidamente lo stato della release Agri App.

Lo script controlla branch Git, upstream, commit HEAD, tag, working tree, file operativi, package.json, .env locale e health/ready live pubblici.

## File aggiunti

- agri_app/scripts/release-status.mjs
- agri_app/README_RELEASE_STATUS_V4_8.md

## Comandi

Locale:

    node scripts/release-status.mjs --strict

Con branch atteso e live check pubblico:

    node scripts/release-status.mjs --strict --expect-branch checkpoint/live-stable --base https://bb1studio.com/agri_app

## Note operative

Lo script non modifica dati, non invia email e non richiede CRON_SECRET.

Per controlli live protetti usare ancora scripts/release-gate.mjs.

## Vincoli mantenuti

- Nessun prisma db push.
- Nessuna modifica al DB schema.
- Nessuna modifica al Prisma schema.
- Email live ancora disattivate.
- ENABLE_EMAIL_NOTIFICATIONS=false.
