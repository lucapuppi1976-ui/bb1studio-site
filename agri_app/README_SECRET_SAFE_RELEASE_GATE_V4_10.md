# Agri App — Secret-safe release gate V4.10

## Obiettivo

V4.10 aggiunge un wrapper operativo per eseguire il release gate live senza passare CRON_SECRET come argomento a npm run.

## File aggiunti/modificati

- agri_app/scripts/release-gate-live-safe.mjs
- agri_app/package.json
- agri_app/README_SECRET_SAFE_RELEASE_GATE_V4_10.md

## Alias aggiunto

- npm run ops:release-gate:live

## Uso sicuro

    read -s -r -p "Incolla CRON_SECRET live e premi Invio: " CRON_SECRET_VALUE
    echo
    export CRON_SECRET_VALUE
    npm run ops:release-gate:live
    unset CRON_SECRET_VALUE

## Perché è sicuro

L alias npm non contiene --secret.
Il wrapper legge il secret da CRON_SECRET_VALUE oppure CRON_SECRET.
L output viene redatto se il secret dovesse comparire.

## Vincoli mantenuti

- Nessun prisma db push.
- Nessuna modifica al DB schema.
- Nessuna modifica al Prisma schema.
- Email live ancora disattivate.
- ENABLE_EMAIL_NOTIFICATIONS=false.
