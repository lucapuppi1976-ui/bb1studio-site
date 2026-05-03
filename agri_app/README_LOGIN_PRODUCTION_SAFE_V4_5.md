# Agri App — Login production-safe V4.5

## Esito

- Credenziali demo rimosse dalla pagina pubblica di login.
- Placeholder email reso neutro.
- Testi login resi production-safe e multilingua.
- Security check esteso per segnalare credenziali demo residue in file versionabili.
- DB schema invariato.
- Prisma schema invariato.
- Email live disattivate.
- `ENABLE_EMAIL_NOTIFICATIONS=false` resta la configurazione live attesa.

## Note operative

La pagina `/login` non deve mostrare email o password demo in produzione.

Eventuali credenziali DEV devono restare in documentazione privata o in flussi locali non pubblici, mai in pagine pubbliche e mai in file `.env` tracciati da Git.

## Controllo consigliato

```bash
grep -RIn \
  --include="*.tsx" \
  --include="*.ts" \
  --include="*.md" \
  -e "Admin123" \
  -e "Operator123" \
  -e "admin@bb1studio.local" \
  -e "operator@bb1studio.local" \
  agri_app/src agri_app/*.md
```

Le eventuali occorrenze residue in documentazione storica vanno valutate e, se ancora utili, mantenute solo come note DEV non pubbliche.
