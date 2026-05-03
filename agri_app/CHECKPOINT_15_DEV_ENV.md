# Checkpoint 15 — ambiente DEV separato

## Obiettivo
Separare definitivamente:
- **LIVE**: `checkpoint/live-stable` + DB live
- **DEV**: Codespaces + DB dev dedicato

## File inclusi
- `.env.codespaces.example`
- `.env.render.live.example`
- `scripts/check-dev-env.mjs`
- `scripts/dev-db-smoke.mjs`

## Procedura rapida

### 1. Crea un nuovo database DEV su Render
Nome consigliato:
- `agri-app-dev-db`

Regione consigliata:
- `Frankfurt`

### 2. Nel Codespace, crea `.env.local`
Dalla cartella `agri_app`:

```bash
cp .env.codespaces.example .env.local
```

Poi compila i placeholder.

### 3. Verifica variabili e connessione
```bash
node --env-file=.env.local scripts/check-dev-env.mjs
node --env-file=.env.local scripts/dev-db-smoke.mjs
```

### 4. Allinea schema sul DB dev
```bash
npx prisma generate
DATABASE_URL=$(grep '^DATABASE_URL=' .env.local | cut -d= -f2- | tr -d '"') npx prisma db push
```

### 5. Crea utenti DEV opzionali
Usa email e password temporanee scelte al momento, senza committarle nel repository:

```bash
node --env-file=.env.local scripts/create-user.mjs dev-admin@example.invalid '<password-forte>' SUPER_ADMIN 'Dev Admin'
node --env-file=.env.local scripts/create-user.mjs dev-operator@example.invalid '<password-forte>' OPERATOR 'Dev Operator'
```

## Regola operativa
- **Codespaces / test** -> usa sempre `.env.local` o `.env` con DB dev
- **Render live** -> usa sempre le env del servizio live con DB live
- mai usare la `EXTERNAL DATABASE URL` live per i test del branch

## Branch
- live: `checkpoint/live-stable`
- lavoro: `feature/*`
