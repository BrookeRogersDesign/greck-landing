# GRECK — coming soon page

Coming-soon landing page for GRECK, hand-painted, hand-sewn bags by MacKenzie Greckel (Houston, Texas).
Built by Brooke Rogers Design.

Plain HTML, CSS and JavaScript — no build step. Type is Roboto Mono (Google Fonts).

## Run locally

```bash
python3 -m http.server 5180
```

Then open http://localhost:5180.

## Moving to Shopify

This page becomes the store's password page. The signup form already uses Shopify's
newsletter field names; swap the `<form>` for `{% form 'customer' %} … {% endform %}`.
Until then, signups go to Kenzie's Klaviyo list. Fill in `KLAVIYO.siteId` and `KLAVIYO.listId`
at the top of the signup section in `main.js`. While they're blank, the form only shows a
thank-you message and saves nothing.

## Custom domain

greckdot.com points here through GoDaddy DNS: four A records for `@`
(185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153) and a `www`
CNAME to `brookerogersdesign.github.io`. The `CNAME` file in this repo tells GitHub Pages
the domain. greckbag.com, greckel.com and gotgrecked.com forward to greckdot.com in GoDaddy.
