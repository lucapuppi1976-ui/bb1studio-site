# Agri App — Alias operativi npm V4.9

## Obiettivo

V4.9 aggiunge alias npm per eseguire rapidamente i controlli operativi Agri App già validati.

## Alias aggiunti

- npm run ops:db-safety
- npm run ops:security
- npm run ops:recurring-quality
- npm run ops:release-status
- npm run ops:release-status:live
- npm run ops:release-gate

## Comandi principali

DB safety DEV:

    npm run ops:db-safety

Security strict:

    npm run ops:security

Qualità ricorrenze DEV:

    npm run ops:recurring-quality

Release status locale:

    npm run ops:release-status

Release status con health/ready live pubblici:

    npm run ops:release-status:live

Release gate locale:

    npm run ops:release-gate

## Live check protetto

Per il release gate live protetto continuare a passare il CRON_SECRET solo come valore puro:

    npm run ops:release-gate -- --include-live --base https://bb1studio.com/agri_app --secret "$CRON_SECRET_VALUE"

## Vincoli mantenuti

- Nessun prisma db push.
- Nessuna modifica al DB schema.
- Nessuna modifica al Prisma schema.
- Email live ancora disattivate.
- ENABLE_EMAIL_NOTIFICATIONS=false.
