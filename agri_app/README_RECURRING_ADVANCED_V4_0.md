# Agri App — Recurring Advanced V4.0

## Obiettivo

Rendere la gestione delle programmazioni ricorrenti più operativa e sicura, senza modificare database o schema Prisma.

## Cosa cambia

- Filtri su `/recurring-tasks`: tutte, attive, in pausa, da generare, senza responsabile.
- Ricerca per titolo, pianta, codice pianta o responsabile.
- Conteggi rapidi più utili.
- Card programmazione più leggibili.
- Protezione sulla generazione manuale: richiede una conferma esplicita.
- Pagina nuova programmazione con testi guida più chiari.
- Testi V4.0 multilingua in otto lingue.

## Sicurezza

- Nessuna modifica a Prisma schema.
- Nessun `prisma db push` richiesto.
- Nessuna modifica al cron Render.
- Email live ancora disattivate: `ENABLE_EMAIL_NOTIFICATIONS=false`.

## Note operative

Il cron reale in-app resta attivo e continua a generare attività ricorrenti dovute e avvisi in-app secondo la configurazione live.
