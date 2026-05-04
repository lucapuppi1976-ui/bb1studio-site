# Agri App — Admin Operations Center dinamico V5.1

## Obiettivo

V5.1 rende dinamica la pagina `/admin/operations`.

## Funzionalità

- Controllo live `/api/health`.
- Controllo live `/api/ready`.
- Preflight admin da `/api/ops/preflight` tramite sessione admin.
- Nessun input CRON_SECRET nella UI.
- Nessun secret salvato in browser.
- Fallback chiaro se il preflight richiede una sessione super admin.

## File aggiunti/modificati

- agri_app/src/app/admin/operations/OperationsDynamicPanel.tsx
- agri_app/src/app/admin/operations/page.tsx
- agri_app/scripts/ops-admin-dynamic-check.mjs
- agri_app/README_ADMIN_OPERATIONS_DYNAMIC_V5_1.md
- agri_app/package.json
- agri_app/OPERATIONS_RUNBOOK_V4_14.md
- agri_app/scripts/ops-runbook-check.mjs
- agri_app/scripts/ops-quick-check.mjs
- agri_app/scripts/ops-quick-coverage-check.mjs

## Alias npm

    npm run ops:admin-dynamic-check

## Vincoli mantenuti

- Nessun prisma db push.
- Nessuna modifica al DB schema.
- Nessuna modifica al Prisma schema.
- Email live ancora disattivate.
- ENABLE_EMAIL_NOTIFICATIONS=false.
