# miStudia Mathe

Startmenü (`index.html`) + 7 Mathe-Apps als Unterordner, eine Domain → eine Android-App.

| Ordner | Quelle (eigenes Repo) |
|---|---|
| `einmaleins/` | Times-table-diploma |
| `schriftlich/` | Written-Calculation |
| `groessen/` | Size-converter |
| `brueche/` | Bruchrechnen |
| `prozent/` | Prozentumwandler |
| `waage/` | Mathe-Waage |
| `binome/` | BINOME |
| `linear/`, `quadratisch/`, `polynom/`, `rational/` | neu, nur hier – gemeinsamer Kern in `funktionen/` (kern.js: Brüche, Parser, Nullstellen exakt/Näherung, Kurvendiskussion, Graph mit Zoom; texte.js: 9 Sprachen; seite.js; kern.css; rational.js für Z/N; ueben.js: Übungsmodus mit Zufallsaufgaben, Reiter „Untersuchen | Üben“; lexikon.js: Formelsatz (Brüche waagerecht, Wurzelstrich), Popups, Begriffs-Lexikon mit Wortherkunft in 9 Sprachen – auch von sinus/ genutzt; alltag.js: Alltagsbeispiele für Funktionen, Sinus und Mathe-Waage) |
| `sinus/` | neu, nur hier (aus der Folie „Parameter bei Sinusfunktionen“) |
| `dreieck/` | neu, nur hier – Dreiecke konstruieren wie auf Papier: Lineal, Zirkel (Bögen schlagen), Geodreieck, Messen, Radieren; Fang an Punkten/Schnittpunkten; Aufgaben SSS, SWS, WSW, SsW mit Prüfung (dreieck.js, texte.js mit 9 Sprachen) |

Die Unterordner sind **Kopien**. Änderungen an einer App bitte hier übernehmen
(oder die App hier weiterentwickeln). Unterschiede zu den Einzel-Repos:
- `<head>`: gemeinsames Manifest, Symbol, `home-button.css`; vor `</body>`: `home-button.js` (runder Knopf oben links zurück zum Menü)
- eigene Manifeste/Service Worker der Einzel-Apps entfernt (Binome)
- Einmaleins: Google Fonts → `/fonts/` (selbst ausgeliefert, OFL)
- Waage: Handy-Regeln ans Ende des CSS verschoben + große Gleichung auf dem Handy nicht mehr über dem Eingabefeld

Sprache: nur im Startmenü wählbar (9 Sprachen, localStorage `msMathLang`). Jede App hat eine `msm-i18n.js` mit den zusätzlichen Sprachen und meldet über `window.MS_LANG` an `home-button.js`, wie sie umgeschaltet wird; ihre eigene Sprachauswahl wird ausgeblendet. Die Mathe-Waage war vorher nur Deutsch.

Gemeinsame Bilder (Elefant, Logos) liegen einmal unter `img/` statt in jedem Ordner.

Weitere Dateien: `manifest.webmanifest`, `sw.js` (Start ohne Netz), `icons/`, `privacy.html`, `.nojekyll` (für `.well-known/` bei GitHub Pages).
