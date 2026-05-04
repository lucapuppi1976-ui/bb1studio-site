# Agri App — Cleanup banner strumenti ops V4.15

## Obiettivo

V4.15 rimuove dai log operativi i banner residui con numeri di versione storici degli strumenti ops.

## Modifiche

- ops-log-redaction-check.mjs usa un banner operativo neutro.
- ops-labels-check.mjs usa un banner operativo neutro.
- ops-quick-check.mjs usa un banner operativo neutro.
- ops-runbook-check.mjs usa un banner operativo neutro.
- aggiunto ops-banner-check.mjs.
- aggiunto alias npm ops:banner-check.
- aggiornato OPERATIONS_RUNBOOK_V4_14.md.
- aggiornato ops-runbook-check.mjs.

## Alias npm

    npm run ops:banner-check

## Vincoli mantenuti

- Nessun prisma db push.
- Nessuna modifica al DB schema.
- Nessuna modifica al Prisma schema.
- Email live ancora disattivate.
- ENABLE_EMAIL_NOTIFICATIONS=false.
