// ============================================================
// werkzeuge/bilder-export.js – erzeugt die Bilddateien für Google Bilder
//   • alle Alltags-Zeichnungen (funktionen/alltag-bilder.js + /alltag-bilder.js)
//   • die Grundansicht der Koordinatensysteme
// → /img/beispiele/*.png, danach zu .webp umwandeln (Python/Pillow, Qualität 82):
//   python3 -c "from PIL import Image;import glob,os;[ (Image.open(f).convert('RGB').save(f[:-4]+'.webp','WEBP',quality=82,method=6),os.remove(f)) for f in glob.glob('img/beispiele/*.png')]"
// → /beispiel-bilder.js (Liste der Dateien je Kachel, für /beispiel-galerie.js)
// Aufruf (im Ordner der App, lokaler Server auf Port 8771):
//   python3 -m http.server 8771 &   node werkzeuge/bilder-export.js
// ============================================================
const { chromium } = require("playwright");
const fs = require("fs"), path = require("path");
const BASIS = "http://localhost:8771", ZIEL = path.join(__dirname, "..", "img", "beispiele");
const FA_KACHELN = ["linear", "quadratisch", "polynom", "rational", "sinus", "waage"];
const MSA_KACHELN = ["binome", "flaechen", "groessen", "integral", "logarithmus", "prozent", "schriftlich", "symmetrie", "teilbarkeit", "terme", "trigonometrie", "vektoren"];
// Koordinatensystem-Grundansichten: Kachel → [Selektor, Reiter zum Anklicken]
const GRAPH = { linear: ["#graph"], quadratisch: ["#graph"], polynom: ["#graph"], rational: ["#graph"], sinus: ["#graph"],
  exponential: ["#gSvg"], logarithmus: ["#gSvg", '[data-tab="funktion"]'], integral: ["#gR"], differential: ["#aSvg"],
  trigonometrie: ["#kreis"], vektoren: ["#vSvg"], pythagoras: ["#pySvg"], winkel: ["#messSvg", '[data-tab="mess"]'],
  wahrscheinlichkeit: ["#baum", '[data-tab="baum"]'], binomial: ["#hSvg"], normalverteilung: ["#nSvg"] };
// sprechende Dateinamen für die Grundansichten (wichtig für die Bildersuche)
const NAMEN = { linear: "lineare-funktion-gerade-koordinatensystem", quadratisch: "quadratische-funktion-parabel-koordinatensystem",
  polynom: "polynomfunktion-kurvendiskussion-graph", rational: "gebrochen-rationale-funktion-asymptote-graph", sinus: "sinusfunktion-amplitude-periode-graph",
  exponential: "exponentialfunktion-wachstum-graph", logarithmus: "logarithmusfunktion-graph", integral: "integral-flaeche-unter-kurve-rechtecke",
  differential: "sekante-tangente-ableitung-graph", trigonometrie: "einheitskreis-sinus-kosinus", vektoren: "vektoren-addieren-koordinatensystem",
  pythagoras: "satz-des-pythagoras-quadrate", winkel: "winkelmesser-winkel-messen", wahrscheinlichkeit: "baumdiagramm-muenzwurf" };
function slug(s){
  return s.toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
}
(async () => {
  fs.mkdirSync(ZIEL, { recursive: true });
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 1000, height: 800 }, deviceScaleFactor: 2 });
  await pg.addInitScript(() => { try { localStorage.setItem("msMathLang", "de"); } catch(e){} });
  const liste = {};
  async function zeichnung(svgHtml, datei){
    await pg.evaluate(h => {
      let d = document.getElementById("exportBox");
      if(!d){ d = document.createElement("div"); d.id = "exportBox"; d.style.cssText = "position:fixed;left:0;top:0;width:640px;background:#fff;z-index:2147483647;padding:0"; document.body.appendChild(d); }
      d.innerHTML = h; const s = d.querySelector("svg"); if(s){ s.style.maxWidth = "640px"; s.style.width = "640px"; s.style.border = "0"; s.style.borderRadius = "0"; }
    }, svgHtml);
    const el = await pg.$("#exportBox svg"); await el.screenshot({ path: path.join(ZIEL, datei) });
  }
  for(const k of FA_KACHELN){
    await pg.goto(BASIS + "/" + k + "/"); await pg.waitForTimeout(500);
    const daten = await pg.evaluate(k => FA.D.de[k].map((e, i) => ({ t: e[0], svg: (window.FA_BILD && FA_BILD[k] && FA_BILD[k][i]) ? FA_BILD[k][i]() : null })), k);
    liste[k] = liste[k] || { bsp: [] };
    for(let i = 0; i < daten.length; i++){ if(!daten[i].svg) continue; const f = k + "-" + (i + 1) + "-" + slug(daten[i].t) + ".png"; await zeichnung(daten[i].svg, f); liste[k].bsp.push({ i: i, f: f.replace(/\.png$/, ".webp") }); }
  }
  for(const k of MSA_KACHELN){
    await pg.goto(BASIS + "/" + k + "/"); await pg.waitForTimeout(500);
    await pg.waitForFunction(() => window.MS_ALLTAG_BILD, null, { timeout: 5000 }).catch(() => {});
    const daten = await pg.evaluate(k => { const B = MS_ALLTAG.boxen()[0]; return B.daten.de.map((e, i) => ({ t: e[0], svg: (window.MS_ALLTAG_BILD && MS_ALLTAG_BILD[k] && MS_ALLTAG_BILD[k][i]) ? MS_ALLTAG_BILD[k][i]() : null })); }, k);
    liste[k] = liste[k] || { bsp: [] };
    for(let i = 0; i < daten.length; i++){ if(!daten[i].svg) continue; const f = k + "-" + (i + 1) + "-" + slug(daten[i].t) + ".png"; await zeichnung(daten[i].svg, f); liste[k].bsp.push({ i: i, f: f.replace(/\.png$/, ".webp") }); }
  }
  await pg.setViewportSize({ width: 1400, height: 900 });
  for(const k of Object.keys(GRAPH)){
    await pg.goto(BASIS + "/" + k + "/"); await pg.waitForTimeout(600);
    if(GRAPH[k][1]){ await pg.$eval(GRAPH[k][1], e => e.click()); await pg.waitForTimeout(400); }
    await pg.addStyleTag({ content: ".zoom,.ms-home-btn,.msabl{display:none !important}" });
    await pg.mouse.move(0, 0);
    const el = await pg.$(GRAPH[k][0]); if(!el) continue;
    const f = (NAMEN[k] || k + "-koordinatensystem") + ".png";
    try { await el.scrollIntoViewIfNeeded({ timeout: 3000 }); await pg.waitForTimeout(200); await el.screenshot({ path: path.join(ZIEL, f), timeout: 5000 }); }
    catch(x){ console.log("übersprungen (nicht sichtbar):", k); continue; }
    liste[k] = liste[k] || { bsp: [] }; liste[k].graph = f.replace(/\.png$/, ".webp");
  }
  await b.close();
  fs.writeFileSync(path.join(__dirname, "..", "beispiel-bilder.js"),
    "// beispiel-bilder.js – automatisch erzeugt von werkzeuge/bilder-export.js (nicht von Hand ändern)\n" +
    "// Je Kachel: graph = Grundansicht des Koordinatensystems, bsp = Alltags-Zeichnungen (i = Nummer des Beispiels)\n" +
    "var MS_BB = " + JSON.stringify(liste, null, 0) + ";\n");
  console.log("fertig:", Object.keys(liste).length, "Kacheln");
})();
