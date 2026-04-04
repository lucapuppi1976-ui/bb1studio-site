BB1 STUDIO — CHECKPOINT 1

Cosa include:
- scorciatoia /bys verso https://bys.bb1studio.com/
- preparazione Google Analytics 4 con placeholder da compilare in un solo file
- CTA del sito madre aggiornate per usare /bys

File nuovi:
- bys/index.html
- site-config.js
- ga4.js

File aggiornati:
- index.html
- privacy.html
- terms.html

Passi:
1. carica questi file nella root del repo bb1studio-site, mantenendo bys/index.html dentro la cartella bys/
2. in site-config.js sostituisci G-XXXXXXXXXX con il tuo Measurement ID GA4
3. commit e push
4. lascia fare auto-deploy a Render

Nota:
- questa soluzione usa una pagina-ponte /bys. Se più avanti vuoi un redirect HTTP 301 puro, puoi aggiungere una regola di redirect nel dashboard Render Static Site.
