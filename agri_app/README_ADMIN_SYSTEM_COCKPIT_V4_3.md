# Agri App — Admin System Cockpit V4.3

## Obiettivo

Rendere `/admin/system` un cockpit operativo per super admin.

## Cosa include

- stato database
- classificazione database live/dev/unknown
- stato variabili server
- stato email live
- stato CRON_SECRET
- numeri operativi principali
- qualità programmazioni ricorrenti
- link rapidi a health, ready, email status, preflight, avvisi, programmazioni e rapporti

## Sicurezza

La pagina è accessibile solo a `SUPER_ADMIN`.

`/api/ops/preflight` ora accetta solo:

- sessione `SUPER_ADMIN`
- oppure `secret=CRON_SECRET`

Non vengono mostrati segreti.

## Vincoli

- DB schema invariato
- Prisma schema invariato
- Email live ancora disattivate
- `ENABLE_EMAIL_NOTIFICATIONS=false`
