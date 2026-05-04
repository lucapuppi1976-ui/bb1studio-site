# Agri App — Admin live route monitoring V5.3

## Obiettivo

V5.3 estende i controlli operativi live alle route admin introdotte in V5.0-V5.2.

## Modifiche

- ops-live-check.mjs include:
  - /admin
  - /admin/operations
  - /admin/system
- aggiunto ops-admin-live-routes-check.mjs;
- aggiunto ops-admin-route-monitoring-check.mjs;
- aggiunti alias npm:
  - npm run ops:admin-live-routes-check
  - npm run ops:admin-route-monitoring-check
- aggiornati ops:quick-check, ops:quick-coverage-check e runbook.

## Stato atteso route admin live

Le route admin possono rispondere con 200 oppure redirect 302/307/308 per sessione/autenticazione.

## Vincoli mantenuti

- Nessun prisma db push.
- Nessuna modifica al DB schema.
- Nessuna modifica al Prisma schema.
- Email live ancora disattivate.
- ENABLE_EMAIL_NOTIFICATIONS=false.
