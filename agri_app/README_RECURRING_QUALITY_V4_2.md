# Agri App — Qualità attività generate V4.2

## Obiettivo

Aggiungere un controllo operativo per verificare la qualità delle programmazioni ricorrenti e delle attività generate dal cron, senza modificare dati e senza cambiare schema.

## Cosa controlla

Lo script `scripts/recurring-quality-check.mjs` verifica:

- database target e classificazione DEV/LIVE
- numero di programmazioni totali, attive, in pausa, dovute e senza responsabile
- numero di attività generate da programmazioni
- attività generate senza `recurrenceSourceDate`
- attività con `recurrenceSourceDate` ma senza `recurrenceTemplateId`
- doppioni per coppia `recurrenceTemplateId` + `recurrenceSourceDate`
- ultime attività generate

## Comandi consigliati

Da `agri_app`:

```bash
node scripts/recurring-quality-check.mjs --expect=dev
node scripts/recurring-quality-check.mjs --fail-on-live
node scripts/recurring-quality-check.mjs --expect=dev --strict
node scripts/recurring-quality-check.mjs --expect=dev --json
```

## Interpretazione

Sono anomalie critiche:

- attività generate senza `recurrenceSourceDate`
- attività con `recurrenceSourceDate` ma senza `recurrenceTemplateId`
- doppioni per `recurrenceTemplateId` + `recurrenceSourceDate`

Sono warning operativi:

- programmazioni attive già dovute
- programmazioni attive senza responsabile

Con `--strict`, anche i warning fanno fallire il controllo.

## Stato V4.2

- DB schema: invariato
- Prisma schema: invariato
- Cron reale in-app: invariato
- Email live: disattivate
- `ENABLE_EMAIL_NOTIFICATIONS=false`

## Baseline DEV rilevata durante audit

- programmazioni totali: 2
- programmazioni attive: 2
- programmazioni dovute: 0
- programmazioni senza responsabile: 0
- attività generate: 2
- attività generate senza `recurrenceSourceDate`: 0
- attività con `recurrenceSourceDate` senza template: 0
- doppioni: 0
