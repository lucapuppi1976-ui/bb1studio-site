# Agri App — Dashboard e Rapporti V2.6

## Obiettivo

Rendere il riepilogo e la pagina rapporti più utili per il lavoro quotidiano, senza modificare database o logica core.

## Cosa cambia

- Dashboard trasformata in centro operativo.
- Conteggi rapidi per attività aperte, oggi, in ritardo e avvisi.
- Sezione “Da fare ora” con attività urgenti.
- Sezione “Piante da seguire” con piante che hanno attività aperte.
- Sezione “Ultimi interventi”.
- Accessi rapidi a oggi, attività, piante, programmazioni e rapporti.
- Rapporti più leggibili con dati generali, stato attività ed esportazioni CSV.
- Testi V2.6 in 8 lingue tramite `src/lib/i18n/dashboard-reports.ts`.

## Non cambia

- Nessuna modifica Prisma.
- Nessun `db push` necessario.
- Nessuna modifica a Render o variabili ambiente.
- `ENABLE_EMAIL_NOTIFICATIONS` resta `false`.

## Verifica

```bash
cd agri_app
npx prisma generate
npm run build
npm run dev
```

Pagine da controllare:

- `/agri_app/dashboard`
- `/agri_app/reports`
- `/agri_app/tasks?scope=open`
- `/agri_app/tasks?scope=today`
- `/agri_app/tasks?scope=overdue`
- `/agri_app/interventions`
- `/agri_app/plants`
