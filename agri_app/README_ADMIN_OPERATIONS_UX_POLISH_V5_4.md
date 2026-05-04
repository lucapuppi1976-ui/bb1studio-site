# Agri App — Admin Operations Center UX polish V5.4

## Obiettivo

V5.4 migliora l’esperienza operativa della pagina `/admin/operations`.

## Modifiche

- Nuovo componente `OperationsUxPolish.tsx`.
- Percorso operativo consigliato.
- Route admin monitorate con spiegazione degli HTTP 307.
- Comandi essenziali non sensibili.
- Note sicurezza operative.
- Nuovo check `ops-admin-ux-check.mjs`.
- Nuovo alias `npm run ops:admin-ux-check`.
- Integrazione in quick check, quick coverage e runbook.

## Vincoli mantenuti

- Nessun prisma db push.
- Nessuna modifica al DB schema.
- Nessuna modifica al Prisma schema.
- Email live ancora disattivate.
- ENABLE_EMAIL_NOTIFICATIONS=false.
