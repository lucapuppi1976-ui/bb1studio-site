# Agri App — Quick check full coverage V4.16

## Obiettivo

V4.16 estende ops:quick-check per coprire anche i controlli operativi introdotti dopo V4.13.

## Modifiche

- ops-quick-check.mjs include anche ops-banner-check.
- ops-quick-check.mjs include anche ops-runbook-check.
- aggiunto ops-quick-coverage-check.mjs.
- aggiunto alias npm ops:quick-coverage-check.
- aggiornato OPERATIONS_RUNBOOK_V4_14.md.
- aggiornato ops-runbook-check.mjs.

## Alias npm

    npm run ops:quick-coverage-check

## Quick check standard

    npm run ops:quick-check -- --expect-branch checkpoint/live-stable

## Quick check protetto

    read -s -r -p "Incolla CRON_SECRET live e premi Invio: " CRON_SECRET_VALUE
    echo
    export CRON_SECRET_VALUE

    npm run ops:quick-check -- --include-protected --expect-branch checkpoint/live-stable

    unset CRON_SECRET_VALUE

## Vincoli mantenuti

- Nessun prisma db push.
- Nessuna modifica al DB schema.
- Nessuna modifica al Prisma schema.
- Email live ancora disattivate.
- ENABLE_EMAIL_NOTIFICATIONS=false.
