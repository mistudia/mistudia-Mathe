// Erzeugt beruehmt/karten-data.js für das Vierfarben-Malspiel.
// Länder: Natural Earth 1:50m über world-atlas (gemeinfrei/ISC), Nachbarn = gemeinsame Grenzbögen (topojson.neighbors).
// Bundesländer: Natural Earth 1:10m admin-1 (gemeinfrei), Topologie mit topojson-server.
import fs from "fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const topo = require("topojson-client"), server = require("topojson-server"), simp = require("topojson-simplify");
const d3 = require("d3-geo"), iso = require("i18n-iso-countries"), CL = require("countries-list");
const L = ["de", "en", "es", "zh", "fr", "ru", "ar", "ja", "pt"];
L.forEach(l => iso.registerLocale(require("i18n-iso-countries/langs/" + l + ".json")));

const EXTRA = { // world-atlas ohne ISO-Nummer
  "Kosovo": { c: "EU", n: ["Kosovo", "Kosovo", "Kosovo", "科索沃", "Kosovo", "Косово", "كوسوفو", "コソボ", "Kosovo"] },
  "N. Cyprus": { c: "EU", n: ["Nordzypern", "Northern Cyprus", "Chipre del Norte", "北塞浦路斯", "Chypre du Nord", "Северный Кипр", "قبرص الشمالية", "北キプロス", "Chipre do Norte"] },
  "Somaliland": { c: "AF", n: ["Somaliland", "Somaliland", "Somalilandia", "索马里兰", "Somaliland", "Сомалиленд", "أرض الصومال", "ソマリランド", "Somalilândia"] }
};
function laenderTopo(){
  const w = JSON.parse(fs.readFileSync("node_modules/world-atlas/countries-50m.json", "utf8"));
  return w;
}
function infoLand(g){
  const nm = g.properties.name, a2 = g.id ? iso.numericToAlpha2(g.id) : null;
  if(a2){ const n = L.map(l => iso.getName(a2, l, { select: "alias" }) || iso.getName(a2, l) || nm); const c = CL.countries[a2] ? CL.countries[a2].continent : null; return { a2, n, c }; }
  const e = EXTRA[nm]; if(e) return { a2: null, n: e.n, c: e.c };
  return { a2: null, n: L.map(() => nm), c: null };
}
// d3 erwartet Außenringe im Uhrzeigersinn: Polygone, die „fast die ganze Kugel“ bedecken, umdrehen
function rewind(f){
  const g = f.geometry, fix = rings => d3.geoArea({ type: "Polygon", coordinates: rings }) > 2 * Math.PI ? rings.map(r => r.slice().reverse()) : rings;
  if(g.type === "Polygon") g.coordinates = fix(g.coordinates);
  else if(g.type === "MultiPolygon") g.coordinates = g.coordinates.map(fix);
  return f;
}
function karte(topology, objName, auswahl, proj, W, H, info, dig){
  const geoms = topology.objects[objName].geometries;
  const idx = geoms.map((g, i) => i).filter(i => auswahl(geoms[i], i));
  const nbAll = topo.neighbors(geoms);
  const pos = {}; idx.forEach((i, k) => pos[i] = k);
  const path = d3.geoPath(proj).digits(dig == null ? 1 : dig);
  const R = [], NB = [];
  idx.forEach((i, k) => {
    const f = rewind(topo.feature(topology, geoms[i]));
    const d = path(f) || "";
    const ar = path.area(f), c = path.centroid(f);
    const r = { d, n: info(geoms[i]).n };
    // Mittelpunkt des größten Teilstücks (für das Nachbarschaftsnetz)
    let gr = f.geometry, best = null, ba = -1;
    const teile = gr && gr.type === "MultiPolygon" ? gr.coordinates.map(c => ({ type: "Polygon", coordinates: c })) : gr ? [gr] : [];
    teile.forEach(pg => { const a = path.area(pg); if(a > ba){ ba = a; best = pg; } });
    const cc = best ? path.centroid(best) : c;
    if(isFinite(cc[0])) r.c = [Math.round(cc[0]), Math.round(cc[1])];
    if(ar < 40 && isFinite(c[0])) r.m = [Math.round(c[0] * 10) / 10, Math.round(c[1] * 10) / 10];
    R.push(r);
    NB.push(nbAll[i].filter(j => pos[j] != null).map(j => pos[j]));
  });
  // leere Pfade (komplett außerhalb) entfernen
  const keep = R.map((r, k) => !!r.d), neu = {}; let z = 0; keep.forEach((v, k) => { if(v) neu[k] = z++; });
  return { w: W, h: H, r: R.filter((r, k) => keep[k]), nb: NB.filter((x, k) => keep[k]).map(l => l.filter(j => keep[j]).map(j => neu[j])) };
}
function vereinfachen(t, q){ const p = simp.presimplify(t); return simp.simplify(p, simp.quantile(p, q)); }

const w = laenderTopo();
const inf = g => infoLand(g);
const ws = vereinfachen(w, 0.25);
const OUT = {};
const box = (a, b, c, d) => ({ type: "Feature", geometry: { type: "Polygon", coordinates: [[[a, b], [a, d], [c, d], [c, b], [a, b]]] } });
function kont(name, test, rot, bb, W, H, nurBox){
  const proj = d3.geoAzimuthalEqualArea().rotate(rot).fitExtent([[6, 6], [W - 6, H - 6]], box(...bb)).clipExtent([[0, 0], [W, H]]);
  OUT[name] = karte(ws, "countries", g => { const i = inf(g); return test(i, g); }, proj, W, H, inf);
}
// Welt (ohne Antarktis)
{
  const W = 1000, H = 520, proj = d3.geoNaturalEarth1().fitExtent([[4, 4], [W - 4, H - 4]], { type: "Sphere" });
  const fc = topo.feature(ws, ws.objects.countries);
  const ww = vereinfachen(w, 0.12);
  OUT.welt = karte(ww, "countries", g => g.properties.name !== "Antarctica", proj, W, H, inf, 0);
}
kont("europa", i => i.c === "EU" || ["TR", "CY", "GE", "AM", "AZ", "RU", "KZ"].includes(i.a2), [-15, -52], [-25, 34, 45, 71], 900, 760);
kont("afrika", i => i.c === "AF", [-17, -3], [-19, -36, 53, 38], 800, 820);
kont("asien", i => i.c === "AS" || i.a2 === "RU", [-90, -38], [26, -11, 150, 62], 960, 720);
kont("nordamerika", i => i.c === "NA", [100, -45], [-170, 7, -52, 75], 900, 760);
kont("suedamerika", i => i.c === "SA", [60, 20], [-82, -56, -34, 13], 640, 820);
// Deutschland
{
  const j = JSON.parse(fs.readFileSync("ne/geojson/ne_10m_admin_1_states_provinces.geojson", "utf8"));
  const fs16 = j.features.filter(f => f.properties.adm0_a3 === "DEU").map(f => ({ type: "Feature", properties: { n: L.map(l => f.properties["name_" + l] || f.properties.name) }, geometry: f.geometry }));
  fs16.forEach(f => { if(/Bremen/.test(f.properties.n[0])) f.properties.n[0] = "Bremen"; });
  let t = server.topology({ s: { type: "FeatureCollection", features: fs16 } });
  t = vereinfachen(t, 0.2);
  const W = 700, H = 900, proj = d3.geoMercator().fitExtent([[8, 8], [W - 8, H - 8]], { type: "FeatureCollection", features: fs16 });
  OUT.deutschland = karte(t, "s", () => true, proj, W, H, g => ({ n: g.properties.n }));
}
// USA (50 Bundesstaaten, Alaska und Hawaii als Einschub)
{
  const j = JSON.parse(fs.readFileSync("ne/geojson/ne_10m_admin_1_states_provinces.geojson", "utf8"));
  const fs50 = j.features.filter(f => f.properties.adm0_a3 === "USA" && f.properties.postal !== "DC").map(rewind).map(f => ({ type: "Feature", properties: { n: L.map(l => f.properties["name_" + l] || f.properties.name) }, geometry: f.geometry }));
  let t = server.topology({ s: { type: "FeatureCollection", features: fs50 } });
  t = vereinfachen(t, 0.1);
  const W = 960, H = 600, proj = d3.geoAlbersUsa().fitExtent([[8, 8], [W - 8, H - 8]], { type: "FeatureCollection", features: fs50 });
  OUT.usa = karte(t, "s", () => true, proj, W, H, g => ({ n: g.properties.n }));
}
let js = "// beruehmt/karten-data.js – Karten für das Vierfarben-Malspiel (erzeugt mit /home/claude/fgen/gen.mjs, nicht von Hand bearbeiten).\n" +
  "// Länder: Natural Earth 1:50m über world-atlas (gemeinfrei). Bundesländer und US-Bundesstaaten: Natural Earth 1:10m admin-1 (gemeinfrei).\n" +
  "// Je Karte: w, h, r = [{ d: SVG-Pfad, n: Namen [de,en,es,zh,fr,ru,ar,ja,pt], m: Punkt (nur sehr kleine Länder), c: Mitte fürs Nachbarschaftsnetz }], nb = Nachbarn (gemeinsame Grenze).\n" +
  "var F_KARTEN = " + JSON.stringify(OUT) + ";\n";
fs.writeFileSync("/home/claude/mistudia-mathe/beruehmt/karten-data.js", js);
for(const k in OUT){ const o = OUT[k]; console.log(k, o.r.length, "Länder", Math.round(JSON.stringify(o).length / 1024) + " KB", "Kanten", o.nb.reduce((s, l) => s + l.length, 0) / 2); }
