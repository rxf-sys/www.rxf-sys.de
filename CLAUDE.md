# www.rxf-sys.de

Hauptwebsite — statisches HTML/CSS/JS, kein Build-Schritt.

## Struktur

```
├── index.html          # Hauptseite
├── index.css           # Stylesheet
├── index.js            # JavaScript
├── datenschutz.html
├── impressum.html
├── assets/             # Bilder, Icons
├── _headers            # INAKTIV — nur historische Referenz (Cloudflare Pages Format)
└── infrastructure/
    ├── Caddyfile       # Webserver-Konfiguration (Security-Header, file_server)
    ├── deploy.sh       # Deploy-Script (Ziel: /opt/landing/deploy.sh auf LXC)
    ├── webhook.json    # adnanh/webhook Konfiguration
    └── webhook.service # systemd-Unit für den Webhook-Daemon
```

## Deployment

`git push origin main` → GitHub-Webhook → adnanh/webhook auf LXC → `deploy.sh`
→ `git fetch && git reset --hard origin/main` → Caddy liefert automatisch neu aus.

### Einmaliges Setup auf dem LXC

1. `deploy.sh` liegt bereits unter `/opt/landing/deploy.sh`
2. In `webhook.json` den Platzhalter für das Webhook-Secret prüfen/ersetzen
3. GitHub → Settings → Webhooks → URL: `https://www.rxf-sys.de/hooks/deploy-landing`

## Wichtige Konventionen

- **Kein Build-Schritt, kein npm** — Änderungen direkt in HTML/CSS/JS-Dateien
- **Security-Header** werden **ausschließlich im `infrastructure/Caddyfile`** gesetzt
- **`_headers`** wird von Caddy **nicht gelesen** (Cloudflare Pages Format, inaktiv)
- **Interne Pfade** (`/infrastructure/`, `/.git/`, `/_headers`) werden von Caddy mit 404 blockiert
- **`X-Frame-Options: DENY`** — die Site soll nirgendwo eingebettet werden
- Google Fonts werden über CSP explizit erlaubt (`fonts.googleapis.com`, `fonts.gstatic.com`)

## CI

`.github/workflows/ci.yml`: HTML-Validierung (informational) + Lychee Link-Check (blocking)
bei jedem Push/PR auf `main`.

Hinweis: HTML-Validate läuft mit `continue-on-error: true` bis bestehende Violations
bereinigt sind — danach auf `false` setzen.
