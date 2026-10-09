# www.rxf-sys.de

Geschäftliche Hauptseite — statisches HTML/CSS/JS, kein Build-Schritt.
Webauftritt des Kleingewerbes „rxf-sys IT-Service" (Robin Frank):
IT-Dienstleistungen für Privatkunden in Dormagen & Umgebung
(PC-/Laptop-Hilfe, WLAN & Heimnetz, Smart Home, Fernwartung).
Telefon: 0179 1496509 (`tel:+491791496509`).
Preismodell: 39 €/Std., erste Stunde voll, danach 15-Minuten-Schritte zu 9,75 €;
Kleinunternehmerregelung § 19 UStG (keine USt.).
Theme ist light-first (Zielgruppe Privatkunden), Dark Mode via Toggle.

## Designsystem „Signal"

Seit Oktober 2026 nutzt die Hauptseite das Designsystem **Signal**. Das Portfolio
(`portfolio.rxf-sys.de`) hat noch die alte Palette „Uxintace sunset" und wird im
nächsten Schritt angeglichen; bis dahin unterscheiden sich die `:root`-Tokens.

- **Farben** (Tokens im `:root` von `index.css`, Dark-Werte unter
  `:root[data-theme="dark"]` und `prefers-color-scheme`): Signalgelb `#FFC21A`
  (Akzent, nur als Fläche: Knöpfe, Band, Textmarker, nie als Schriftfarbe auf Hell),
  Anthrazit `#1C2125` (Text, dunkle Flächen), Signalweiß `#F4F5F2` (Grund),
  Dark-Grund `#121517`. Genau eine Akzentfarbe, keine Farbverläufe
- **Schriften**: Archivo mit Breitenachse (`--head`, Überschriften, `font-stretch`
  100–125 %) · Atkinson Hyperlegible Next (`--sans`, Fließtext, sehr gut lesbar) ·
  Atkinson Hyperlegible Mono (`--mono`, Preise, Zahlen, Labels)
- **Form**: Karten `--r` 22 px, Innenelemente `--r-sm` 14 px, Knöpfe als Kapsel;
  Tiefe über weiche, getönte Schatten, keine Rahmen auf Karten
- **Texte**: keine Gedankenstriche (— / –) in sichtbaren Texten, keine
  Kicker-Zeilen über Überschriften, ein Label pro Aktion („Anfrage senden")
- **Layout**: breite Hero-Überschrift über Text + Foto; jede Sektion hat ihre eigene
  Layout-Form (Band, Karten-Stapel, horizontaler Track, Zeitleiste, Kassenbon, Karte)

### Gemeinsame Kopfleiste

Beide Seiten nutzen **dieselben Klassen und dieselbe Reihenfolge**:
`.topbar` (randlos, `padding: 14px clamp(16px, 3vw, 48px)`, sticky) mit
`.brand` → `.topbar-nav` → `.lang-toggle` → `.topbar-cta` → `.theme-toggle`
→ `.nav-toggle`. Änderungen daran gehören immer in beide Repos.

- `.brand` enthält das Logo: `.brand-mark` (Kachel „rxf“) und `.brand-word`
  („rxf-sys“), beide per `<use>` aus den Sprite-Symbolen `#logo-mark`/`#logo-word`.
  Der gelbe Block-Cursor `.lg-cursor` liegt bewusst **außerhalb** des Symbols im
  jeweiligen `<svg>`, damit er per CSS blinken kann (dreimal beim Laden, dauerhaft
  bei Hover/Fokus, nicht bei `prefers-reduced-motion`)
- Die runden Aktionsknöpfe tragen zusätzlich `.round`; unter der Leiste sitzt
  `#progress` (Scroll-Fortschritt), der gleitende Marker `.nav-ind` entsteht per JS
- Unter **900 px** klappt `.topbar-nav` zu einem Panel unter der Leiste auf:
  `.nav-num` und `.nav-cta` werden sichtbar, `.topbar-cta` verschwindet
- Der Schleier ist `.topbar::after`, absolut bei `top: 100%`, geschlossen mit
  `height: 0`, damit er nichts zum Scrollbereich beiträgt
- `.topbar-cta` („Anfrage senden") und der Absende-Knopf im Formular (`.btn-static`)
  bleiben bewusst **statisch**: kein Magnet-Effekt, kein Eindrücken
- IDs, die das JS erwartet: `#topbar`, `#topbarNav`, `#navToggle`,
  `#themeBtn`, `#langBtn`, `#progress`

### Bewegung

- GSAP 3.12.5 + ScrollTrigger und Lenis 1.1.13 liegen **lokal** in `assets/vendor/`
  (keine CDN-Anfrage, nichts zusätzlich in der Datenschutzerklärung). Update-Weg und
  Lizenzen: `assets/vendor/README.md`
- Ohne GSAP oder bei `prefers-reduced-motion` bleibt alles statisch und sichtbar
  (`html.motion` wird nur gesetzt, wenn Bewegung aktiv ist)
- **Ruhezustand immer sichtbar**: `reveal()` in `index.js` setzt ein Element erst in
  den Startzustand, wenn es kurz vor dem Bild ist (noch außerhalb), und spielt dann ab
- Scroll-gekoppelte Effekte an echte Positionen binden (Zeitleisten-Kreise leuchten,
  wenn der Balken sie erreicht); SVG-Wellen über den Radius animieren, nicht über `scale`
- Hover-Effekte nur bei `(hover: hover) and (pointer: fine)`, UI-Feedback < 300 ms

## Struktur

```
├── index.html          # Hauptseite
├── index.css           # Stylesheet
├── index.js            # JavaScript
├── datenschutz.html
├── impressum.html
├── assets/
│   ├── favicon.svg     # Favicon „r“ + Cursor (dazu /favicon.ico mit 16/32/48 px)
│   ├── brand/          # Logo-Dateien: Bildmarke, Logo hell, Logo dunkel (SVG, Pfade)
│   ├── img/            # Fotos (WebP, ~1200 px breit)
│   └── vendor/         # GSAP, ScrollTrigger, Lenis (lokal) + Lizenzhinweise
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
  (Mapping über `data-i18n`/`data-i18n-html`, Attribute über `data-i18n-aria`,
  `data-i18n-alt`, `data-i18n-ph`); per Script erzeugte Texte (Rechenbeispiel,
  Formular, E-Mail-Text) stehen im `STR`-Objekt — **neue Texte immer in beiden
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
- Icons sind ein eingebettetes SVG-Sprite am Anfang von `index.html` (Font Awesome
  Free 6.5, `<svg class="ic"><use href="#i-…"/></svg>`); keine Icon-Webfont mehr

## CI

`.github/workflows/ci.yml`: HTML-Validierung (blocking, Konfiguration in
`.htmlvalidate.json`) + Lychee Link-Check (blocking) bei jedem Push/PR auf `main`.
Lokal prüfen mit `npx html-validate "*.html"`.
