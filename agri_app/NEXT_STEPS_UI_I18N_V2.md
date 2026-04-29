# Passi consigliati UI + Multilingua V2

## Prima di applicare

Se GitHub Desktop segnala un merge in corso o conflitti:

```bash
cd /workspaces/bb1studio-site
git merge --abort 2>/dev/null || true
git rebase --abort 2>/dev/null || true
git restore agri_app/package.json agri_app/package-lock.json 2>/dev/null || true
git status --short
```

Poi partire da un branch pulito:

```bash
git fetch origin
git switch checkpoint/live-stable
git pull --ff-only origin checkpoint/live-stable
git switch -c feature/ui-i18n-v2
```

## Applicazione overlay

Dalla root del repo:

```bash
unzip -o agri_app_UI_I18N_V2_overlay.zip -d .
find agri_app -name ".env" -o -name ".env.local"
```

Il comando `find` non deve stampare nulla.

## Verifica DEV

```bash
cd agri_app
npm install
npx prisma generate
npx prisma db push
npm run build
npm run dev
```

## Route da verificare

- `/agri_app/login`
- `/agri_app/dashboard`
- `/agri_app/plants`
- `/agri_app/interventions`
- `/agri_app/tasks`
- `/agri_app/today`
- `/agri_app/notifications`
- `/agri_app/settings/notifications`
- `/agri_app/recurring-tasks`
- `/agri_app/reports`
- `/agri_app/admin/users`
- `/agri_app/admin/system`

## Commit

```bash
cd /workspaces/bb1studio-site
git status --short
git add agri_app
git commit -m "UI sobria e multilingua V2"
git push origin feature/ui-i18n-v2
```
