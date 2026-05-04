# Agri App — Admin Operations Center V5.0

## Obiettivo

V5.0 introduce una pagina admin sostanziosa per centralizzare i riferimenti operativi Agri App.

## Nuova pagina

    /admin/operations

## Contenuti

- stato live atteso;
- comandi quick check;
- quick check protetto;
- release gate live secret-safe;
- build sicura;
- rollback branch;
- tag checkpoint;
- regole CRON_SECRET Render;
- email live disattivate;
- vincoli DB e Prisma.

## File aggiunti/modificati

- agri_app/src/app/admin/operations/page.tsx
- agri_app/scripts/ops-admin-page-check.mjs
- agri_app/README_ADMIN_OPERATIONS_CENTER_V5_0.md
- agri_app/package.json
- agri_app/OPERATIONS_RUNBOOK_V4_14.md
- agri_app/scripts/ops-runbook-check.mjs

## Alias npm

    npm run ops:admin-page-check

## Vincoli mantenuti

- Nessun prisma db push.
- Nessuna modifica al DB schema.
- Nessuna modifica al Prisma schema.
- Email live ancora disattivate.
- ENABLE_EMAIL_NOTIFICATIONS=false.
