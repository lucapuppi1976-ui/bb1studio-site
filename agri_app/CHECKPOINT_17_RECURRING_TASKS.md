# Checkpoint 17 — task ricorrenti

## File inclusi
- `prisma/schema.prisma`
- `src/lib/app-routes.ts`
- `src/components/main-nav.tsx`
- `src/lib/data/plants.ts`
- `src/app/plants/[id]/page.tsx`
- `src/lib/data/recurring-tasks.ts`
- `src/lib/actions/recurring-tasks.ts`
- `src/lib/recurring-tasks/generate.ts`
- `src/app/api/cron/recurring-tasks/route.ts`
- `src/app/api/cron/daily-notifications/route.ts`
- `src/app/recurring-tasks/page.tsx`
- `src/app/plants/[id]/recurring-tasks/new/page.tsx`

## Obiettivo
- creare template di task ricorrenti
- generare automaticamente i task dovuti
- supportare DAILY / WEEKLY / EVERY_X_DAYS
- far convivere generazione ricorrente e notifiche giornaliere

## Dopo aver sostituito i file
Nel Codespace DEV:

```bash
cd /workspaces/bb1studio-site/agri_app
npx prisma generate
npx prisma db push
npm run build
```

Se il build è verde:

```bash
git add prisma/schema.prisma src/lib/app-routes.ts src/components/main-nav.tsx src/lib/data/plants.ts src/app/plants/[id]/page.tsx src/lib/data/recurring-tasks.ts src/lib/actions/recurring-tasks.ts src/lib/recurring-tasks/generate.ts src/app/api/cron/recurring-tasks/route.ts src/app/api/cron/daily-notifications/route.ts src/app/recurring-tasks/page.tsx src/app/plants/[id]/recurring-tasks/new/page.tsx
git commit -m "Add recurring task templates and generator"
git push
```

## Test DEV
1. crea una pianta
2. apri la pianta
3. clicca `Task ricorrente`
4. crea un template con prima data = oggi
5. vai su `/agri_app/recurring-tasks`
6. clicca `Genera ora`
7. controlla `/agri_app/tasks`, `/agri_app/today`, `/agri_app/notifications`

## Test cron
Con il dev server acceso:

```bash
cd /workspaces/bb1studio-site/agri_app
CRON=$(grep '^CRON_SECRET=' .env | cut -d= -f2- | tr -d '"')
curl -X POST "http://127.0.0.1:3000/agri_app/api/cron/recurring-tasks?secret=$CRON"
curl -X POST "http://127.0.0.1:3000/agri_app/api/cron/daily-notifications?secret=$CRON"
```
