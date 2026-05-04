# Agri App — Cleanup etichette operative V4.12

## Obiettivo

V4.12 rimuove label storiche fuorvianti dai log degli script operativi correnti.

## Modifiche

- release-gate.mjs non stampa più "Agri App release gate V4.7".
- release-status.mjs non stampa più "Agri App release status V4.8".
- release-gate.mjs non stampa più la lunghezza del secret.
- aggiunto ops-labels-check.mjs.
- aggiunto alias npm ops:labels-check.

## Alias npm

    npm run ops:labels-check

## Vincoli mantenuti

- Nessun prisma db push.
- Nessuna modifica al DB schema.
- Nessuna modifica al Prisma schema.
- Email live ancora disattivate.
- ENABLE_EMAIL_NOTIFICATIONS=false.
