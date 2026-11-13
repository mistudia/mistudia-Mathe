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
| `sinus/` | neu, nur hier (aus der Folie „Parameter bei Sinusfunktionen“) |

Die Unterordner sind **Kopien**. Änderungen an einer App bitte hier übernehmen
(oder die App hier weiterentwickeln). Unterschiede zu den Einzel-Repos:
- `<head>`: gemeinsames Manifest, Symbol, `home-button.css`; vor `</body>`: `home-button.js` (runder Knopf oben links zurück zum Menü)
- eigene Manifeste/Service Worker der Einzel-Apps entfernt (Binome)
- Einmaleins: Google Fonts → `/fonts/` (selbst ausgeliefert, OFL)
- Waage: Handy-Regeln ans Ende des CSS verschoben + große Gleichung auf dem Handy nicht mehr über dem Eingabefeld

Sprache: nur im Startmenü wählbar (9 Sprachen, localStorage `msMathLang`). Jede App hat eine `msm-i18n.js` mit den zusätzlichen Sprachen und meldet über `window.MS_LANG` an `home-button.js`, wie sie umgeschaltet wird; ihre eigene Sprachauswahl wird ausgeblendet. Die Mathe-Waage war vorher nur Deutsch.

Gemeinsame Bilder (Elefant, Logos) liegen einmal unter `img/` statt in jedem Ordner.

Weitere Dateien: `manifest.webmanifest`, `sw.js` (Start ohne Netz), `icons/`, `privacy.html`, `.nojekyll` (für `.well-known/` bei GitHub Pages).
