# Checkpoint 14 — notifiche operative vere

Questo checkpoint aggiunge:

- preferenze notifiche per utente
- centro notifiche migliorato
- routine giornaliera più completa
- dedup delle notifiche create dal cron
- filtro task di oggi per ruolo/utente

## File inclusi
- `prisma/schema.prisma`
- `src/lib/app-routes.ts`
- `src/components/main-nav.tsx`
- `src/lib/data/notifications.ts`
- `src/lib/actions/notifications.ts`
- `src/lib/actions/notification-preferences.ts`
- `src/lib/notifications/daily.ts`
- `src/app/api/cron/daily-notifications/route.ts`
- `src/app/notifications/page.tsx`
- `src/app/settings/notifications/page.tsx`
- `src/lib/data/tasks.ts`
- `src/app/today/page.tsx`

## Passi da fare
Dalla cartella `agri_app`:

```bash
npx prisma generate
npx prisma db push
```

Non servono nuove dipendenze.

## Test consigliato
### 1. Preferenze
Apri:
`/agri_app/settings/notifications`

Salva le preferenze di un utente.

### 2. Cron
Chiama:

```bash
curl -X POST "https://bb1studio.com/agri_app/api/cron/daily-notifications?secret=IL_TUO_CRON_SECRET"
```

### 3. Notifiche
Apri:
- `/agri_app/notifications`
- `/agri_app/today`

## Nota
Per ora `emailEnabled` viene salvato come preferenza ma l’invio email vero resta il passo successivo.
