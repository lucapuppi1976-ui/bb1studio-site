# Checkpoint 13 — hardening produzione

## File inclusi
- `src/lib/env.server.ts`
- `src/lib/auth/guards.ts`
- `src/app/admin/layout.tsx`
- `src/app/login/page.tsx`
- `src/app/forbidden/page.tsx`
- `scripts/create-user.mjs`
- `scripts/delete-demo-users.mjs`

## Obiettivo
- togliere hint demo dal login in produzione
- blindare tutte le pagine `/admin/*`
- creare utenti reali
- eliminare utenti demo

## Variabile ambiente da aggiungere
Nel tuo `.env` e nelle env di Render aggiungi:

```env
SHOW_DEV_SEED_HINTS=false
```

Se vuoi vedere gli hint demo in locale:
```env
SHOW_DEV_SEED_HINTS=true
```

## Creare utenti reali
Dalla root di `agri_app`:

```bash
node scripts/create-user.mjs luca@bb1studio.com PASSWORD_FORTE SUPER_ADMIN "Luca"
node scripts/create-user.mjs operatore1@bb1studio.com PASSWORD_FORTE OPERATOR "Operatore 1"
```

## Eliminare utenti demo
Dalla root di `agri_app`:

```bash
node scripts/delete-demo-users.mjs
```

## Deploy
1. Copia/sostituisci i file nel repo
2. Commit:
   `Checkpoint 13 - production hardening`
3. Push su GitHub
4. In Render:
   - Manual Deploy
   - Clear build cache & deploy

## Test da fare
- `/login` non deve mostrare credenziali demo in produzione
- `/admin/users` deve essere accessibile solo al super admin
- account operatore deve essere rifiutato su `/admin/*`
- login super admin ok
- login operator ok
