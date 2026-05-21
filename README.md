# rxf-sys.de

Welcome-Page f&uuml;r die Hauptdom&auml;ne **rxf-sys.de** &mdash; eine statische
Hub-Seite, die Besucher zu den Subdom&auml;nen f&uuml;hrt:

- [`portfolio.rxf-sys.de`](https://portfolio.rxf-sys.de/) &mdash; pers&ouml;nliches Portfolio
- [`admin.rxf-sys.de`](https://admin.rxf-sys.de/) &mdash; Live-Admin-Dashboard (Cloudflare-Access)
- `lab.rxf-sys.de` &mdash; HomeLab-Spielwiese (in Planung)

## Seite

Single-Page mit den Sektionen Hero, Hub-Cards (Portfolio &middot; Admin
&middot; Lab), Stats, Stack und Kontakt. Highlights:

- **Boot-Sequenz** im Terminal-Stil beim ersten Laden (1&times; pro Session, &uuml;berspringbar)
- **Kinetische Hero-Typo** &mdash; zeichenweiser Reveal &uuml;ber die Web Animations API
- **Constellation-Backdrop** &mdash; animiertes SVG-Netzwerk mit Packet-Flow
- **3D-Hub-Cards** mit Maus-Tilt, Hover-Sheen, Conic-Border-Sweep und Sparklines
- **Stats** mit Count-Up (IntersectionObserver) und zweireihiges Stack-Marquee
- **Cursor-Spotlight**, Scroll-Progress-Bar, Live-Ticker und Europe/Berlin-Uhr
- **Theme** &mdash; Light/Dark automatisch via `prefers-color-scheme` plus
  manueller Toggle (persistiert in `localStorage`)
- Respektiert `prefers-reduced-motion`: alle Animationen werden dann deaktiviert

## Stack

Statisches HTML/CSS/JS, keine Build-Tools. `index.js` ist eine reine
Vanilla-Motion-Schicht (Web Animations API, IntersectionObserver, SVG) &mdash;
keine externen JS-Libraries. Inter + JetBrains Mono via Google Fonts, Font
Awesome via cdnjs. Brand-DNA (Indigo `#424769` &rarr; Pfirsich `#ffb17a`) ist
1:1 mit den Schwester-Repos abgestimmt.

```
.
├─ index.html              # Welcome-Hub (Hero, Hub-Cards, Stats, Stack, Kontakt)
├─ index.css               # Brand-Tokens + Light/Dark (auto + manueller Toggle)
├─ index.js                # Motion & Interaktion (Boot, Hero-Reveal, Tilt, Theme)
├─ impressum.html          # § 5 DDG
├─ datenschutz.html        # Art. 13 DSGVO
├─ assets/
│  └─ favicon.svg
├─ _headers                # Security-Header (Cloudflare Pages-Format, optional)
└─ infrastructure/
   ├─ Caddyfile            # Static-Webserver auf :80 (Ziel des Cloudflare-Tunnels)
   ├─ webhook.json         # GitHub-Webhook für Auto-Deploy
   └─ webhook.service      # systemd-Unit für adnanh/webhook
```

## Deployment

1. Repo nach `/var/www/rxf-sys.de` clonen.
2. Caddy mit `infrastructure/Caddyfile` als Static-Webserver auf Port 80.
3. Der Cloudflare-Tunnel ist der einzige Zugriffsweg: er l&ouml;st
   `www.rxf-sys.de` auf und zeigt auf die interne LXC-IP `:80`. Keine
   &ouml;ffentlichen Ports, kein direkter DNS-A-Record auf den Host.
4. GitHub-Webhook triggert `/opt/rxf-sys.de/deploy.sh` (`git pull`).
