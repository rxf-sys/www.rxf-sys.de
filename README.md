# rxf-sys.de

Welcome-Page f&uuml;r die Hauptdom&auml;ne **rxf-sys.de** &mdash; eine schlanke
Hub-Seite, die Besucher zu den beiden Subdom&auml;nen weiterleitet:

- [`portfolio.rxf-sys.de`](https://portfolio.rxf-sys.de/) &mdash; pers&ouml;nliches Portfolio
- [`admin.rxf-sys.de`](https://admin.rxf-sys.de/) &mdash; Live-Admin-Dashboard (Cloudflare-Access)

## Stack

Statisches HTML/CSS/JS, keine Build-Tools. Inter + JetBrains Mono via Google
Fonts, Font Awesome via cdnjs. Brand-DNA (Indigo `#424769` &rarr; Pfirsich
`#ffb17a`) ist 1:1 mit den Schwester-Repos abgestimmt.

```
.
&#9500;&#9472; index.html              # Welcome-Hub
&#9500;&#9472; index.css               # Shared brand tokens (light/dark via prefers-color-scheme)
&#9500;&#9472; index.js                # Year + smooth scroll
&#9500;&#9472; impressum.html          # &sect; 5 DDG
&#9500;&#9472; datenschutz.html        # Art. 13 DSGVO
&#9500;&#9472; assets/
&#9474;  &#9492;&#9472; favicon.svg
&#9500;&#9472; _headers                # Security-Header (Cloudflare Pages-Format, optional)
&#9492;&#9472; infrastructure/
   &#9500;&#9472; Caddyfile            # Reverse-Proxy hinter Cloudflare-Tunnel
   &#9500;&#9472; webhook.json         # GitHub-Webhook f&uuml;r Auto-Deploy
   &#9492;&#9472; webhook.service      # systemd-Unit f&uuml;r adnanh/webhook
```

## Deployment

Identisch zum Portfolio:

1. Repo nach `/var/www/rxf-sys.de` clonen.
2. Caddy mit `infrastructure/Caddyfile` als Reverse-Proxy auf Port 80.
3. Cloudflare-Tunnel routet `rxf-sys.de` (Apex) auf den LXC.
4. GitHub-Webhook triggert `/opt/rxf-sys.de/deploy.sh` (`git pull`).
