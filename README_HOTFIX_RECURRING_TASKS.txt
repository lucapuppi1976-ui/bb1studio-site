HOTFIX RECURRING TASKS

Questo pacchetto contiene i file completi del checkpoint 17 necessari per far comparire e funzionare la route:

/agri_app/recurring-tasks

Cosa fare:
1. Nel branch feature/notifications-v2 sostituisci i file dentro bb1studio-site/agri_app con quelli di questo pacchetto.
2. Poi lancia:
   cd /workspaces/bb1studio-site/agri_app
   npx prisma generate
   npx prisma db push
   npm run build
3. Se il build è verde:
   git add prisma/schema.prisma src/lib/app-routes.ts src/components/main-nav.tsx src/lib/data/plants.ts src/app/plants/[id]/page.tsx src/app/plants/[id]/recurring-tasks/new/page.tsx src/app/recurring-tasks/page.tsx src/app/api/cron/recurring-tasks/route.ts src/app/api/cron/daily-notifications/route.ts src/lib/data/recurring-tasks.ts src/lib/actions/recurring-tasks.ts src/lib/recurring-tasks/generate.ts
   git commit -m "Fix recurring task routes and pages"
   git push

Nota:
Un 404 su /agri_app/recurring-tasks, anche col SUPER_ADMIN, indica che la route non esiste nel branch che stai eseguendo.
Non è un problema di permessi.
