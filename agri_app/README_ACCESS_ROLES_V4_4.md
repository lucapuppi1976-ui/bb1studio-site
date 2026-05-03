# Agri App — Accessi, ruoli e sicurezza operativa V4.4

## Obiettivo

Rendere più chiari ruoli, permessi e pagine di accesso non consentito senza modificare database o schema Prisma.

## Cambiamenti

- `/admin/users` mostra conteggi, ruoli, utente corrente e matrice permessi.
- `/forbidden` mostra indicazioni operative più chiare e link utili.
- Nuovo file i18n `src/lib/i18n/access-roles.ts` con testi multilingua.

## Regole operative

- `SUPER_ADMIN`: accesso alle aree amministrative, report, approvazioni, programmazioni e modifiche sensibili.
- `OPERATOR`: accesso alle aree operative come piante, interventi, attività, oggi, avvisi e scanner.
- Le API cron restano protette da `CRON_SECRET`.
- Le API operative restano protette da sessione e ruolo.

## Sicurezza

- Nessuna modifica a Prisma schema.
- Nessun `db push` richiesto.
- Email live ancora disattivate con `ENABLE_EMAIL_NOTIFICATIONS=false`.
- Cron reale in-app invariato.
