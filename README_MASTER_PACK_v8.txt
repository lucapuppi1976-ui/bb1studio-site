BB1 Studio master pack v8

This is a root-ready cumulative pack for the bb1studio-site repository.

What changed in v8
- Adds a shared site-config.js file to centralize future commercial changes.
- Keeps the site multilingual: English (/), Italian (/it/), Spanish (/es/).
- Includes product pages, pricing, access, FAQ, privacy and terms in all 3 languages.
- Keeps /bys, /it/bys and /es/bys as clean shortcuts to https://bys.bb1studio.com.
- Uses the confirmed company data for Guanabomalu SL.

What you should edit later without changing every page
- site-config.js
  - links.monthlyCheckout
  - links.annualCheckout
  - links.contactMail
  - links.supportMail
  - pricing.monthlyPrice
  - pricing.annualPrice

Upload instructions
1. Extract this zip.
2. Upload all files and folders into the root of the bb1studio-site GitHub repo.
3. Overwrite existing files.
4. Commit and deploy.

Important note
- privacy.html / terms.html and their localized versions are still structured placeholders, not final legal text.
