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
| `negativ/` | neu, nur hier – Negative Zahlen: Thermometer (−30 … 40 °C) und Zahlenstrahl ziehbar, Betrag, Gegenzahl, Vergleichen, Alltagsbeispiele; Rechnen mit Pfeilen am Zahlenstrahl (+, −), Vorzeichenregeln (·, :), alle vier Rechenarten mit denselben Zahlen (Regel, Zahlenstrahl, Schritte, Probe); Üben (Ablesen, Vergleichen, Temperatur, Plus/Minus, Mal/Geteilt, Betrag/Gegenzahl) mit Lösungsweg (app.js, texte.js mit 9 Sprachen) |
| `dreisatz/` | neu, nur hier – Dreisatz & Zuordnungen: 8 Alltagsbeispiele (proportional/antiproportional) oder eigene Werte, Dreisatz in 3 Schritten mit farbigen Rechenzeichen; Zuordnung y = k·x bzw. y = k : x mit Tabelle, Graph, Quotienten-/Produktgleichheit; eigene Tabelle prüfen; Üben (Textaufgaben, erkennen, Lücke) (app.js, texte.js mit 9 Sprachen; Geld in Yen/Rubel ×100) |
| `trigonometrie/` | neu, nur hier – Trigonometrie: Einheitskreis (Punkt ziehen; cos blau, sin rot, tan grün auf der Tangente; Kurven 0–360° laufen mit; exakte Werte, Bogenmaß, Vorzeichen je Quadrant, Herkunft der Namen), rechtwinkliges Dreieck (Gegenkathete/Ankathete/Hypotenuse bezogen auf α oder β, sin/cos/tan mit Zahlen), Rechner aus zwei Größen mit Rechenweg, Üben (Seiten benennen, Seite, Winkel, Werte am Kreis) (app.js, texte.js mit 9 Sprachen) |
| `dreieck/` | neu, nur hier – Dreiecke konstruieren wie auf Papier: Lineal, Zirkel (Bögen schlagen), Winkel abtragen, Kreis, Rechteck, Vieleck, Messen, Bemaßung (Länge/Winkel), Text, Kopieren (kongruente Dreiecke, drehen/spiegeln), Radieren; einblendbares transparentes Geodreieck als Bild dreieck/geodreieck.png (Vorlage des Nutzers, Logo entfernt; 6,475 px/mm; verschieben, drehen, an der Kante zeichnen); Fanghilfen beim Zeichnen (waagrecht, senkrecht, parallel, rechtwinklig, gleich lang, tangential, konzentrisch – nur beim Zeichnen, keine bleibenden Bedingungen); Werkzeuge in 4 Gruppen (Zeichnen, Konstruieren, Messen & Text, Bearbeiten); Konstruieren wie GeoGebra: Mittelpunkt, Senkrechte, Parallele, Mittelsenkrechte, Winkelhalbierende, Kreis durch 3 Punkte (Hilfslinien gestrichelt); Bearbeiten wie Onshape: Auswählen per Fenster (rechts = ganz drin, links = berührt), verschieben, löschen (Entf), Punkte ziehen, Trimmen; Rückgängig/Wiederholen am Blatt (Strg+Z/Y); Umfang und Fläche; Am Karo einrasten; Als Bild speichern (PNG); Blatt wird im Browser gespeichert (localStorage msDreieckBlatt); Fang an Punkten/Schnittpunkten; Aufgaben SSS, SWS, WSW, SsW mit Prüfung (dreieck.js, texte.js mit 9 Sprachen) |

Die Unterordner sind **Kopien**. Änderungen an einer App bitte hier übernehmen
(oder die App hier weiterentwickeln). Unterschiede zu den Einzel-Repos:
- `<head>`: gemeinsames Manifest, Symbol, `home-button.css`; vor `</body>`: `home-button.js` (runder Knopf oben links zurück zum Menü)
- eigene Manifeste/Service Worker der Einzel-Apps entfernt (Binome)
- Einmaleins: Google Fonts → `/fonts/` (selbst ausgeliefert, OFL)
- Waage: Handy-Regeln ans Ende des CSS verschoben + große Gleichung auf dem Handy nicht mehr über dem Eingabefeld

Sprache: nur im Startmenü wählbar (9 Sprachen, localStorage `msMathLang`). Jede App hat eine `msm-i18n.js` mit den zusätzlichen Sprachen und meldet über `window.MS_LANG` an `home-button.js`, wie sie umgeschaltet wird; ihre eigene Sprachauswahl wird ausgeblendet. Die Mathe-Waage war vorher nur Deutsch.

Gemeinsame Bilder (Elefant, Logos) liegen einmal unter `img/` statt in jedem Ordner.

Weitere Dateien: `manifest.webmanifest`, `sw.js` (Start ohne Netz), `icons/`, `privacy.html`, `.nojekyll` (für `.well-known/` bei GitHub Pages).
