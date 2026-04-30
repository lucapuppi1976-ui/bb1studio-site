# Agri App — V2.9 Centro avvisi

Questa patch migliora il centro avvisi e le impostazioni notifiche senza modificare DB o Prisma.

## Include

- Filtri su `/notifications`: tutti, da leggere, attività, approvazioni, sistema.
- Ricerca per titolo, messaggio e tipo avviso.
- Conteggi più utili: totali, da leggere, oggi, attività, approvazioni.
- Card avvisi più compatte e leggibili su mobile.
- Impostazioni notifiche più chiare sullo stato dei canali.
- Stato email esplicito: preparate ma inattive finché `ENABLE_EMAIL_NOTIFICATIONS=false`.
- Testi multilingua per IT, ES, EN, SK, FR, DE, RU, HU.

## Non include

- Nessuna modifica Prisma.
- Nessun `db push`.
- Nessuna attivazione email.
- Nessuna modifica alle variabili Render.

## Test consigliati

```bash
npm run build
```

Pagine:

- `/agri_app/notifications`
- `/agri_app/notifications?scope=unread`
- `/agri_app/notifications?scope=task`
- `/agri_app/notifications?scope=approval`
- `/agri_app/notifications?q=test`
- `/agri_app/settings/notifications`

API lingua:

```bash
curl -sS -H "Accept-Language: fr" \
  -X POST "http://localhost:3000/agri_app/api/cron/daily-notifications?secret=wrong" \
  | python -m json.tool
```
