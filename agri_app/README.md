# Agri App — pacchetto completo per `bb1studio.com/agri_app`

Questo è il pacchetto unico completo dell'app agricola, già preparato per essere pubblicata come:

`bb1studio.com/agri_app`

## Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- NextAuth (credentials)
- Cloudinary per immagini
- PWA base
- QR code
- Offline queue per interventi

## Credenziali seed sviluppo
- `admin@bb1studio.local` / `Admin123!`
- `operator@bb1studio.local` / `Operator123!`

## 1. Configurazione locale
Copia `.env.example` in `.env` e compila i valori.

Variabili importanti:
- `DATABASE_URL`
- `NEXTAUTH_URL` → in locale: `http://localhost:3000/agri_app/api/auth`
- `NEXTAUTH_SECRET`
- `NEXT_PUBLIC_APP_ORIGIN`
- `NEXT_PUBLIC_APP_BASE_PATH=/agri_app`
- `NEXT_PUBLIC_APP_ASSET_PREFIX=/agri_app-static`
- `CLOUDINARY_*`
- `CRON_SECRET`

## 2. Installazione
```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

## 3. Rotte principali
- `/agri_app/`
- `/agri_app/login`
- `/agri_app/dashboard`
- `/agri_app/plants`
- `/agri_app/interventions`
- `/agri_app/tasks`
- `/agri_app/today`
- `/agri_app/approvals`
- `/agri_app/notifications`
- `/agri_app/reports`
- `/agri_app/scan`
- `/agri_app/offline-sync`

## 4. Dominio pubblico corretto
L'app è configurata per vivere sotto path:

`bb1studio.com/agri_app`

Questa app **non** va esposta direttamente come custom path su Render, perché Render gestisce i custom domain a livello host.
Il modello giusto è:
- servizio app su Render (es. `agri-app.onrender.com`)
- portale principale su `bb1studio.com`
- rewrite/proxy dal portale principale verso il servizio app

Trovi un esempio in:

`docs/PORTAL_NEXT_CONFIG_EXAMPLE.ts`

## 5. Note importanti
- I QR generano URL pubblici usando `NEXT_PUBLIC_APP_ORIGIN + NEXT_PUBLIC_APP_BASE_PATH`
- Il service worker è già impostato per `/agri_app`
- L'offline queue oggi copre la creazione interventi
- Le immagini vengono caricate su Cloudinary tramite `/api/upload`
- Gli export CSV stanno sotto `/api/export/*`
- Il cron giornaliero sta sotto `/api/cron/daily-notifications`

## 6. Deploy su Render
Per il servizio app:
- Build Command:
```bash
npm install && npm run build
```

- Start Command:
```bash
npm run start
```

Poi configura tutte le environment variables nel dashboard Render.

Per l'app deployata dietro `bb1studio.com/agri_app`, imposta:
- `NEXT_PUBLIC_APP_ORIGIN=https://bb1studio.com`
- `NEXT_PUBLIC_APP_BASE_PATH=/agri_app`
- `NEXT_PUBLIC_APP_ASSET_PREFIX=/agri_app-static`
- `NEXTAUTH_URL=https://bb1studio.com/agri_app/api/auth`

## 7. Primo test da fare
Dopo l'avvio:
1. login admin
2. controlla `/dashboard`
3. crea una pianta
4. crea un intervento
5. crea un task
6. prova QR
7. prova `/offline-sync`
8. prova export CSV da `/reports`
