# rxf-sys.de

Gesch&auml;ftliche Hauptseite der Dom&auml;ne **rxf-sys.de** &mdash; Webauftritt des
Kleingewerbes **rxf-sys IT-Service (Robin Frank)**: IT-Dienstleistungen f&uuml;r
Privatkunden in Dormagen &amp; Umgebung, vor Ort oder per Fernwartung.

## Seite

One-Pager mit den Sektionen:

- **Hero** &mdash; Leistungsversprechen, Telefon/E-Mail, Eckdaten, Foto
- **Schnellstart** &mdash; Anliegen antippen, Wunsch vor Ort/Fernwartung w&auml;hlen,
  die Auswahl landet vorausgef&uuml;llt im Anfrage-Formular
- **Leistungen** &mdash; PC- &amp; Laptop-Hilfe, WLAN &amp; Heimnetz,
  Smart Home &amp; Ger&auml;te, Fernwartung (gestapelte Karten mit Fotos)
- **Laufband** &mdash; Ger&auml;te und Systeme, bei denen geholfen wird
- **Typische Eins&auml;tze** &mdash; Beispielrechnungen mit Dauer und Preis
- **Ablauf** &mdash; drei Schritte von der Anfrage bis zur Rechnung
- **Preise** &mdash; 39&nbsp;&euro;/Std., erste Stunde voll, danach 15-Minuten-Schritte;
  Rechenbeispiel zum Einstellen; Kleinunternehmerregelung (&sect;&nbsp;19 UStG)
- **Einsatzgebiet** &mdash; schematische Karte und Zonen (inklusive, nach Absprache, Fernwartung)
- **&Uuml;ber mich** &mdash; Qualifikation &amp; Arbeitsweise, Link zum Portfolio
- **Selbsthilfe** &mdash; vier Handgriffe vor dem Anruf
- **FAQ** &mdash; native `<details>`-Accordions
- **Kontakt** &mdash; Telefon, E-Mail, Formular, das eine vorbef&uuml;llte E-Mail &ouml;ffnet
  (kein Server, keine Speicherung)

Technische Highlights:

- **Light-first Theme** &mdash; helles Design als Standard (Zielgruppe Privatkunden),
  Dark Mode via `prefers-color-scheme` + manueller Toggle (persistiert in
  `localStorage`); Inline-Theme-Init im `<head>` verhindert Theme-Flash
- **DE/EN-Sprachumschalter** &mdash; deutsche Texte stehen im Markup, Englisch im
  `EN`-W&ouml;rterbuch in `index.js`, per Script erzeugte Texte im `STR`-Objekt;
  die Wahl wird in `localStorage` gemerkt
- **Bewegung** &mdash; GSAP + ScrollTrigger und Lenis (Smooth Scroll), lokal unter
  `assets/vendor/`. Inhalte bleiben ohne JS bzw. bei `prefers-reduced-motion`
  statisch und vollst&auml;ndig sichtbar
- **Mobil-Men&uuml;** &mdash; unter 900&nbsp;px klappt die Navigation als Panel auf,
  mit Kontakt-Knopf, Escape und Klick-nach-au&szlig;en; mobile Aktionsleiste
- **SEO** &mdash; LocalBusiness-Schema (JSON-LD), sprechende Meta-Tags

## Stack

Statisches HTML/CSS/JS, keine Build-Tools. Bibliotheken liegen lokal in
`assets/vendor/` (GSAP 3.12.5, ScrollTrigger, Lenis 1.1.13, siehe
`assets/vendor/README.md`), Icons als eingebettetes SVG-Sprite (Font Awesome Free).
Schriften via Google Fonts: Archivo (&Uuml;berschriften, breite Schnitte),
Atkinson Hyperlegible Next (Text) und Atkinson Hyperlegible Mono (Zahlen).

Designsystem &bdquo;Signal&ldquo;: Signalgelb `#FFC21A`, Anthrazit `#1C2125`,
Signalwei&szlig; `#F4F5F2`. Das Portfolio wird im n&auml;chsten Schritt angeglichen.

Logo: Kachel &bdquo;rxf&ldquo; mit gelbem Block-Cursor und Schriftzug &bdquo;rxf-sys&ldquo;
in Archivo (als Pfade, keine Schriftabh&auml;ngigkeit). Dateien zur Weiterverwendung
liegen in `assets/brand/`, das Favicon zeigt die Kurzform &bdquo;r&ldquo; mit Cursor.

```
.
├─ index.html              # One-Pager
├─ index.css               # Tokens (light-first + Dark), Komponenten, Legal-Styles
├─ index.js                # Theme, DE/EN, Navigation, Formular, Rechenbeispiel, Bewegung
├─ impressum.html          # § 5 DDG, § 19 UStG, VSBG
├─ datenschutz.html        # Art. 13 DSGVO
├─ assets/
│  ├─ favicon.svg
│  ├─ brand/               # Logo als SVG: Bildmarke, Logo hell, Logo dunkel
│  ├─ img/                 # Fotos (WebP)
│  └─ vendor/              # GSAP, ScrollTrigger, Lenis (lokal, mit Lizenzhinweisen)
├─ _headers                # Security-Header (Cloudflare Pages-Format, inaktiv)
└─ infrastructure/
   ├─ Caddyfile            # Static-Webserver auf :80 (Ziel des Cloudflare-Tunnels)
   ├─ deploy.sh            # Pull-Deploy, installiert als /opt/landing/deploy.sh
   ├─ webhook.json         # GitHub-Webhook für Auto-Deploy (Push auf main)
   └─ webhook.service      # systemd-Unit für adnanh/webhook
```

## Deployment

1. Repo nach `/var/www/www.rxf-sys.de` clonen.
2. Caddy mit `infrastructure/Caddyfile` als Static-Webserver auf Port 80.
3. Der Cloudflare-Tunnel ist der einzige Zugriffsweg: er l&ouml;st
   `www.rxf-sys.de` auf und zeigt auf die interne LXC-IP `:80`. Keine
   &ouml;ffentlichen Ports, kein direkter DNS-A-Record auf den Host.
4. `infrastructure/deploy.sh` ausf&uuml;hrbar nach `/opt/landing/deploy.sh`
   kopieren. Der GitHub-Webhook triggert es bei jedem Push auf `main` und
   bringt das Arbeitsverzeichnis per `git reset --hard origin/main` auf Stand.
