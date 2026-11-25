# Fonts

Self-hosted so the page makes no request to Google Fonts (nothing to declare in the
privacy policy). The `@font-face` rules are at the top of `index.css`.

| Files | Family | Version | License |
|---|---|---|---|
| `archivo-latin*.woff2` | Archivo (variable: `wght` 700–900, `wdth` 100–125) | Google Fonts v25 | SIL OFL 1.1, © 2020 The Archivo Project Authors |
| `atkinson-hyperlegible-next-latin*.woff2` | Atkinson Hyperlegible Next (variable: `wght` 200–800) | Google Fonts v7 | SIL OFL 1.1, © 2020–2024 The Atkinson Hyperlegible Next Project Authors |
| `atkinson-hyperlegible-mono-latin*.woff2` | Atkinson Hyperlegible Mono (variable: `wght` 200–800) | Google Fonts v8 | SIL OFL 1.1, © 2020–2024 The Atkinson Hyperlegible Mono Project Authors |

Each family ships the `latin` and `latin-ext` subsets exactly as Google Fonts serves them
(same `unicode-range`), so `latin-ext` is only downloaded when such characters occur.

## Updating

1. Fetch the stylesheet with a current browser user agent and download the `latin` and
   `latin-ext` files it lists:
   `https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=Atkinson+Hyperlegible+Mono:wght@200..800&family=Atkinson+Hyperlegible+Next:wght@200..800`
2. Archivo is limited to the axis ranges the design uses, which halves the file size
   (90 KB to 44 KB). Needs `pip install fonttools brotli`:
   `fonttools varLib.instancer archivo-latin.woff2 wdth=100:125 wght=700:900 -o archivo-latin.woff2`
   (same for `latin-ext`). If the design ever needs Archivo below weight 700 or narrower
   than 100 %, widen these ranges and the `@font-face` descriptors in `index.css`.
3. Fonts carry no `?v=` parameter and are cached for a week. Give a changed file a new
   name and update `index.css` and the preloads in `index.html`.
