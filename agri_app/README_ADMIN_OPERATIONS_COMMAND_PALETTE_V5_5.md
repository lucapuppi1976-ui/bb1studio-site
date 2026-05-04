# Agri App — Admin Operations Command Palette V5.5

## Obiettivo

V5.5 aggiunge una command palette copiabile nella pagina `/admin/operations`.

## Funzionalità

- Ricerca comandi operativi.
- Copia negli appunti via browser.
- Gruppi per controlli standard, controlli protetti, build sicura, route admin, rollback e tag.
- Nessun valore sensibile nella UI.
- Nessun salvataggio in localStorage o sessionStorage.

## File aggiunti/modificati

- agri_app/src/app/admin/operations/OperationsCommandPalette.tsx
- agri_app/src/app/admin/operations/page.tsx
- agri_app/scripts/ops-admin-command-palette-check.mjs
- agri_app/README_ADMIN_OPERATIONS_COMMAND_PALETTE_V5_5.md
- agri_app/package.json
- agri_app/OPERATIONS_RUNBOOK_V4_14.md
- agri_app/scripts/ops-runbook-check.mjs
- agri_app/scripts/ops-quick-check.mjs
- agri_app/scripts/ops-quick-coverage-check.mjs

## Alias npm

    npm run ops:admin-command-palette-check

## Vincoli mantenuti

- Nessun prisma db push.
- Nessuna modifica al DB schema.
- Nessuna modifica al Prisma schema.
- Email live ancora disattivate.
- ENABLE_EMAIL_NOTIFICATIONS=false.
