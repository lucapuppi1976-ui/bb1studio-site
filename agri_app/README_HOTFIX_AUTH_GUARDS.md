# Hotfix auth guards

Questo fix risolve il build error:

`Module not found: Can't resolve '@/auth'`

## File da sostituire
- `agri_app/src/lib/auth/guards.ts`
- `agri_app/src/app/admin/layout.tsx`

## Motivo
Il progetto corrente usa `src/lib/auth.ts` + `getServerSession(authOptions)`.
Il file `guards.ts` introdotto in un checkpoint precedente importava invece `auth` da `@/auth`, che nel repository non esiste.
