# Agri App — Storico attività generate V4.1

## Obiettivo

Rendere più chiaro quali attività sono state generate da una programmazione ricorrente e da quale programmazione arrivano.

## Modifiche

- Badge “Da programmazione” nelle attività generate.
- Filtro attività generate da programmazioni in `/tasks`.
- Sezione “Origine programmazione” nel dettaglio attività.
- Informazioni sulle ultime attività generate nelle schede pianta e programmazioni.
- Link diretti dalle programmazioni alle attività generate.
- Testi localizzati in 8 lingue.

## Sicurezza

- Nessuna modifica a Prisma schema.
- Nessun `db push` richiesto.
- Nessuna modifica a Render.
- Email live ancora disattivate con `ENABLE_EMAIL_NOTIFICATIONS=false`.
