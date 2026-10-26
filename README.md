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
Until then, the form only shows a thank-you message and doesn't save emails.
