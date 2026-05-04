# Agri App — Admin Operations navigation V5.2

## Obiettivo

V5.2 rende l’Admin Operations Center raggiungibile tramite navigazione e accessi rapidi.

## Modifiche

- Nuova pagina hub `/admin`.
- Link da `/admin` verso `/admin/operations`, `/admin/system`, `/admin/users`, dashboard, notifiche e ricorrenze.
- Link “Admin Hub” dentro `/admin/operations`.
- Shortcut visibile in `/admin/system` tramite layout dedicato.
- Nuovo check `ops-admin-navigation-check.mjs`.
- Nuovo alias `npm run ops:admin-navigation-check`.
- Integrazione in quick check, quick coverage e runbook.

## Vincoli mantenuti

- Nessun prisma db push.
- Nessuna modifica al DB schema.
- Nessuna modifica al Prisma schema.
- Email live ancora disattivate.
- ENABLE_EMAIL_NOTIFICATIONS=false.
