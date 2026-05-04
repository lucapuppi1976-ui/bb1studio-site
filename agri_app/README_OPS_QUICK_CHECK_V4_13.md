# Agri App — Ops quick checklist V4.13

## Obiettivo

V4.13 aggiunge una checklist operativa rapida, non mutante e secret-safe.

## File aggiunti o modificati

- agri_app/scripts/ops-quick-check.mjs
- agri_app/package.json
- agri_app/README_OPS_QUICK_CHECK_V4_13.md

## Alias npm

    npm run ops:quick-check

## Controlli inclusi

- DB safety DEV
- Security strict
- Recurring quality DEV
- Ops labels check
- Release status live
- Ops log redaction check

## Controllo protetto opzionale

Il controllo protetto usa CRON_SECRET_VALUE oppure CRON_SECRET da ambiente.

    read -s -r -p "Incolla CRON_SECRET live e premi Invio: " CRON_SECRET_VALUE
    echo
    export CRON_SECRET_VALUE
    npm run ops:quick-check -- --include-protected
    unset CRON_SECRET_VALUE

## Vincoli mantenuti

- Nessun prisma db push.
- Nessuna modifica al DB schema.
- Nessuna modifica al Prisma schema.
- Email live ancora disattivate.
- ENABLE_EMAIL_NOTIFICATIONS=false.
