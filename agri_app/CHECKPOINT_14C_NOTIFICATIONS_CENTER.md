# Checkpoint 14C — centro notifiche vero

## File inclusi
- `src/lib/app-routes.ts`
- `src/lib/data/notifications.ts`
- `src/lib/actions/notifications.ts`
- `src/lib/notifications/daily.ts`
- `src/app/api/cron/daily-notifications/route.ts`
- `src/app/notifications/page.tsx`
- `src/lib/data/tasks.ts`
- `src/app/today/page.tsx`

## Obiettivo
- centro notifiche reale per l'utente loggato
- segna singola notifica letta
- segna tutte lette
- agenda di oggi con task scaduti + task del giorno
- cron giornaliero che genera notifiche task/proposte per utenti con preferenze attive

## Dopo aver sostituito i file
Nel Codespace:

```bash
cd /workspaces/bb1studio-site/agri_app
npm run build
```

Se il build è verde:

```bash
git add src/lib/app-routes.ts src/lib/data/notifications.ts src/lib/actions/notifications.ts src/lib/notifications/daily.ts src/app/api/cron/daily-notifications/route.ts src/app/notifications/page.tsx src/lib/data/tasks.ts src/app/today/page.tsx
git commit -m "Add notification center and daily operational notifications"
git push
```

## Test in preview
- `/agri_app/notifications`
- `/agri_app/today`

## Test cron
Usa il tuo `CRON_SECRET`:

```bash
curl -X POST "https://bb1studio.com/agri_app/api/cron/daily-notifications?secret=IL_TUO_CRON_SECRET"
```
