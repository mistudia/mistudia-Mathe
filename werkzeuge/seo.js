// ============================================================
// werkzeuge/seo.js – schreibt sitemap.xml (mit Bildern), robots.txt und in jede Kachel
// <meta description>, canonical und Open-Graph-Angaben (aus APPS in /index.html, Deutsch).
// Aufruf im Ordner der App: node werkzeuge/seo.js  (nach werkzeuge/bilder-export.js)
// ============================================================
const fs = require("fs"), path = require("path");
const W = path.join(__dirname, ".."), URL0 = "https://math.mistudia.com";
const idx = fs.readFileSync(path.join(W, "index.html"), "utf8");
const a = idx.indexOf("var APPS = ["), e = idx.indexOf("\n];", a);
const APPS = eval(idx.slice(a + "var APPS = ".length, e + 2));
const BB = (function(){ const s = fs.readFileSync(path.join(W, "beispiel-bilder.js"), "utf8"); return JSON.parse(s.slice(s.indexOf("{"), s.lastIndexOf("}") + 1)); })();
function esc(s){ return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
const heute = new Date().toISOString().slice(0, 10);
let sm = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';
sm += "  <url><loc>" + URL0 + "/</loc><lastmod>" + heute + "</lastmod></url>\n";
APPS.forEach(function(A){
  const k = A.slug, f = path.join(W, k, "index.html"); if(!fs.existsSync(f)) return;
  const B = BB[k] || {}, bilder = (B.graph ? [B.graph] : []).concat((B.bsp || []).map(x => x.f));
  sm += "  <url><loc>" + URL0 + "/" + k + "/</loc><lastmod>" + heute + "</lastmod>" + bilder.map(b => "<image:image><image:loc>" + URL0 + "/img/beispiele/" + b + "</image:loc></image:image>").join("") + "</url>\n";
  // Kopfzeilen der Kachel
  let h = fs.readFileSync(f, "utf8");
  h = h.replace(/\n?<!-- SEO -->[\s\S]*?<!-- \/SEO -->/, "");
  const name = A.name.de, desc = A.desc.de + " – " + A.grade.de + ". Kostenlos üben mit miStudia, in 9 Sprachen.";
  const bild = bilder[0] ? URL0 + "/img/beispiele/" + bilder[0] : URL0 + "/icons/icon-512.png";
  const kopf = "\n<!-- SEO -->\n" +
    '<meta name="description" content="' + esc(desc) + '">\n' +
    '<link rel="canonical" href="' + URL0 + "/" + k + '/">\n' +
    '<meta property="og:type" content="website">\n<meta property="og:site_name" content="miStudia Mathe">\n<meta property="og:locale" content="de_DE">\n' +
    '<meta property="og:title" content="' + esc(name + " – miStudia Mathe") + '">\n' +
    '<meta property="og:description" content="' + esc(desc) + '">\n' +
    '<meta property="og:url" content="' + URL0 + "/" + k + '/">\n' +
    '<meta property="og:image" content="' + bild + '">\n<meta name="twitter:card" content="summary_large_image">\n' +
    "<!-- /SEO -->";
  h = h.replace(/(<title>[^<]*<\/title>)/, "$1" + kopf);
  fs.writeFileSync(f, h);
});
sm += "</urlset>\n";
fs.writeFileSync(path.join(W, "sitemap.xml"), sm);
fs.writeFileSync(path.join(W, "robots.txt"), "User-agent: *\nAllow: /\n\nSitemap: " + URL0 + "/sitemap.xml\n");
console.log("ok", APPS.length);
