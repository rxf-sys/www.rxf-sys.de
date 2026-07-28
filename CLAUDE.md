# www.rxf-sys.de

Geschäftliche Hauptseite — statisches HTML/CSS/JS, kein Build-Schritt.
Webauftritt des Kleingewerbes „rxf-sys IT-Service" (Robin Frank):
IT-Dienstleistungen für Privatkunden in Dormagen & Umgebung
(PC-/Laptop-Hilfe, WLAN & Heimnetz, Smart Home, Fernwartung).
Preismodell: 39 €/Std., Kleinunternehmerregelung § 19 UStG (keine USt.).
Theme ist light-first (Zielgruppe Privatkunden), Dark Mode via Toggle.

## Gemeinsames Designsystem mit portfolio.rxf-sys.de

Beide Seiten teilen einen **identischen `:root`-Tokenblock** in `index.css`
(Palette „Uxintace sunset": Navy `#181A2F`, Terracotta `#D16A3E` als
Light-Akzent, Peach `#FDA481` als Dark-Akzent, Grund `#EFEBE5`/`#14162B`).

- **Schriften**: Bricolage Grotesque (`--head`, Überschriften) ·
  Manrope (`--sans`, Fließtext) · JetBrains Mono (`--mono`, Preise,
  Kennzahlen, Sektionsnummern, Labels)
- **Form**: Karten `--r` 24 px, Innenelemente `--r-sm` 16 px, Buttons und
  Navigation als Kapsel; **Tiefe über weiche Schatten, keine Rahmen auf Karten**
- **Keine Farbverläufe** — Akzente werden flächig gesetzt
- **Layout bleibt seitenspezifisch**: hier zentrierter Hero mit klassischen
  Sektionen, im Portfolio das Bento-Grid
- Wird ein Token geändert, gehört dieselbe Änderung ins Schwester-Repo

### Gemeinsame Kopfleiste

Beide Seiten nutzen **dieselben Klassen und dieselbe Reihenfolge**:
`.topbar` (randlos, `padding: 14px clamp(16px, 3vw, 48px)`, sticky) mit
`.brand` → `.topbar-nav` → `.lang-toggle` → `.topbar-cta` → `.theme-toggle`
→ `.nav-toggle`. Änderungen daran gehören immer in beide Repos.

- Unter **900 px** klappt `.topbar-nav` zu einem Panel unter der Leiste auf:
  `.nav-num` (Sektionsnummer, mono) und `.nav-cta` (Kontakt-Knopf) werden
  sichtbar, `.topbar-cta` verschwindet
- Der Schleier ist `.topbar::after`, absolut bei `top: 100%` — geschlossen mit
  `height: 0`, damit er nichts zum Scrollbereich beiträgt
- IDs, die das JS erwartet: `#topbar`, `#topbarNav`, `#navToggle`,
  `#themeBtn`, `#langBtn`

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
- **i18n**: DE-Texte stehen im Markup, EN im `EN`-Objekt in `index.js`
  (Mapping über `data-i18n`/`data-i18n-html`) — **neue Texte immer in beiden
  Sprachen pflegen**. Nur `index.html` ist übersetzt; Impressum und
  Datenschutz bleiben als Rechtstexte deutsch (wie im Portfolio).
  Einträge im `EN`-Objekt dürfen HTML-Entities enthalten, sie werden über
  `innerHTML` gesetzt
- **Cache-Busting**: `index.css`/`index.js` werden mit `?v=…` referenziert —
  **bei Änderungen an CSS/JS den `?v=`-Parameter in allen drei HTML-Dateien
  bumpen** (z. B. auf das aktuelle Datum)
- **Security-Header** werden **ausschließlich im `infrastructure/Caddyfile`** gesetzt
- **`_headers`** wird von Caddy **nicht gelesen** (Cloudflare Pages Format, inaktiv)
- **Interne Pfade** (`/infrastructure/`, `/.git/`, `/_headers`) werden von Caddy mit 404 blockiert
- **`X-Frame-Options: DENY`** — die Site soll nirgendwo eingebettet werden
- Google Fonts werden über CSP explizit erlaubt (`fonts.googleapis.com`, `fonts.gstatic.com`)

## CI

`.github/workflows/ci.yml`: HTML-Validierung (blocking, Konfiguration in
`.htmlvalidate.json`) + Lychee Link-Check (blocking) bei jedem Push/PR auf `main`.
Lokal prüfen mit `npx html-validate "*.html"`.
