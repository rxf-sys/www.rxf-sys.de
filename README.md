# rxf-sys.de

Gesch&auml;ftliche Hauptseite der Dom&auml;ne **rxf-sys.de** &mdash; Webauftritt des
Kleingewerbes **rxf-sys IT-Service (Robin Frank)**: IT-Dienstleistungen f&uuml;r
Privatkunden in Dormagen &amp; Umgebung, vor Ort oder per Fernwartung.

## Seite

One-Pager mit den Sektionen:

- **Hero** &mdash; Leistungsversprechen, Kontakt-CTAs (E-Mail/Telefon), Eckdaten
- **Leistungen** &mdash; PC- &amp; Laptop-Hilfe, WLAN &amp; Heimnetzwerk,
  Smart Home &amp; Ger&auml;te, Fernwartung
- **Ablauf** &mdash; drei Schritte von der Anfrage bis zur Abrechnung
- **Preise** &mdash; 39&nbsp;&euro;/Std., Kleinunternehmerregelung (&sect;&nbsp;19 UStG),
  Pauschalen auf Anfrage
- **&Uuml;ber mich** &mdash; Qualifikation &amp; Arbeitsweise, Link zum Portfolio
- **FAQ** &mdash; native `<details>`-Accordions, kein JS n&ouml;tig
- **Kontakt** &mdash; E-Mail, Telefon, Einsatzgebiet, Antwortzeit

Technische Highlights:

- **Light-first Theme** &mdash; helles Design als Standard (Zielgruppe Privatkunden),
  Dark Mode via `prefers-color-scheme` + manueller Toggle (persistiert in
  `localStorage`); Inline-Theme-Init im `<head>` verhindert Theme-Flash
- **DE/EN-Sprachumschalter** &mdash; deutsche Texte stehen im Markup, Englisch im
  `EN`-W&ouml;rterbuch in `index.js`; die Wahl wird in `localStorage` gemerkt
- **Mobil-Men&uuml;** &mdash; unter 900&nbsp;px klappt die Navigation als Panel auf,
  mit Sektionsnummern, Kontakt-Knopf, Escape und Klick-nach-au&szlig;en
- **Reveal-on-Scroll** via IntersectionObserver, respektiert `prefers-reduced-motion`
- **SEO** &mdash; LocalBusiness-Schema (JSON-LD), sprechende Meta-Tags

## Stack

Statisches HTML/CSS/JS, keine Build-Tools, keine externen JS-Libraries.
Bricolage Grotesque (Display) + Manrope (Flie&szlig;text) + JetBrains Mono
(Zahlen &amp; Labels) via Google Fonts, Font Awesome via cdnjs.

Der `:root`-Tokenblock in `index.css` ist mit `portfolio.rxf-sys.de`
identisch &mdash; gemeinsame Palette „Uxintace sunset" (Navy `#181A2F`,
Terracotta `#D16A3E` im Light-, Peach `#FDA481` im Dark-Theme). &Auml;nderungen
an Farben, Schriften oder Radien geh&ouml;ren in beide Repos.

```
.
├─ index.html              # One-Pager (Hero, Leistungen, Ablauf, Preise, Über mich, FAQ, Kontakt)
├─ index.css               # Brand-Tokens, light-first + Dark-Override, Legal-Styles
├─ index.js                # Theme-Toggle, Smooth Scroll, Reveal-on-Scroll
├─ impressum.html          # § 5 DDG, § 19 UStG, VSBG
├─ datenschutz.html        # Art. 13 DSGVO
├─ assets/
│  └─ favicon.svg
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
