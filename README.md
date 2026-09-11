# Hope Gift Crafts

A single-page marketing website for **Hope Gift Crafts** — authentic handmade crafts
(wrist bands, beads, sandals, lesos and more) delivered worldwide.

Built with **pure HTML, CSS and vanilla JavaScript** (no frameworks, no build step).

## Run locally

Serve the folder with any static server, e.g.:

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080

## Structure

```
index.html      — page markup
css/styles.css  — all styling
js/script.js    — products, cart, filters, sliders, forms, WhatsApp links
assets/img/     — generated imagery
```

## Set your WhatsApp number

Every WhatsApp link (per-product "Order on WhatsApp" buttons + the floating bubble) is
built from one constant near the top of `js/script.js`:

```js
const WHATSAPP_NUMBER = '254712937993'; // international format, digits only
```

Change it once and the whole site follows. The fallback links used when JavaScript is off
live in `index.html` (`#waFloat` and the Contact section) — update those two `wa.me/...`
hrefs to match.

## Features

- Split hero with animated imagery and a customer unboxing slideshow
- Filterable product collection (8 crafts)
- "Order on WhatsApp" button on every product card, plus a floating WhatsApp bubble
- Prices shown in USD
- Shopping basket with quantity controls and localStorage persistence
- Scrolling marquee, "why us" features, how-it-works steps
- Testimonials slider, newsletter and contact forms
- Fully responsive, animated on scroll, reduced-motion friendly
