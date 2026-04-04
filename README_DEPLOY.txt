BB1 Studio root site starter

Recommended structure:
- bb1studio.com -> static site on Render
- www.bb1studio.com -> auto redirect handled by Render
- bys.bb1studio.com -> BYS web app already live on Render

Important note:
Render Hobby workspaces support a maximum of 2 custom domains total.
Because adding bb1studio.com also auto-adds www.bb1studio.com, keeping both the root site and bys.bb1studio.com usually requires a Professional workspace.

Manual Render setup:
1. Create a new GitHub repo, e.g. bb1studio-site
2. Upload these files to repo root
3. In Render: New -> Static Site
4. Connect the repo
5. Build Command: leave empty if Render allows it, or use `echo "static"`
6. Publish Directory: `.`
7. Deploy
8. Attach bb1studio.com as the custom domain when your plan/domain limits allow it

DNS for root domain later:
- A record for bb1studio.com -> 216.24.57.1
- CNAME for www.bb1studio.com -> the Render static site onrender hostname
- Remove interfering AAAA records if any
