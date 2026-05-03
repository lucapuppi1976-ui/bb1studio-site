# Agri App — Login production-safe V4.5

## Esito

- Credenziali demo rimosse dalla pagina login pubblica.
- Placeholder email reso neutro.
- Copy login aggiornato per indicare l'uso di credenziali fornite dall'amministratore.
- Callback URL mantenuto.
- NextAuth invariato.
- DB schema invariato.
- Prisma schema invariato.
- Email live ancora disattivate.

## Nota sicurezza

Il repository non deve contenere credenziali statiche utilizzabili. Gli utenti DEV possono essere creati con script dedicati e password temporanee fornite da variabili o dal terminale, mai committate.

## Controlli consigliati

```bash
node scripts/security-check.mjs
node scripts/security-check.mjs --strict
```

Il controllo strict deve rimanere utile per individuare segreti reali o credenziali demo non consentite nei file versionabili.
