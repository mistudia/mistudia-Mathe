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
const SPR = ["de", "en", "es", "zh", "fr", "ru", "ar", "ja", "pt"];
const ZUSATZ = { de: "Kostenlos üben mit miStudia, in 9 Sprachen.", en: "Free practice with miStudia, in 9 languages.", es: "Practica gratis con miStudia, en 9 idiomas.",
  zh: "用 miStudia 免费练习，支持 9 种语言。", fr: "S’entraîner gratuitement avec miStudia, en 9 langues.", ru: "Бесплатные упражнения с miStudia на 9 языках.",
  ar: "تدرّب مجانًا مع miStudia بتسع لغات.", ja: "miStudia で無料練習（9か国語）。", pt: "Pratique grátis com o miStudia, em 9 idiomas." };
function seoTexte(A){ const o = {}; SPR.forEach(l => { o[l] = [(A.name[l] || A.name.de) + " – miStudia Mathe", (A.desc[l] || A.desc.de) + " – " + (A.grade[l] || A.grade.de) + ". " + ZUSATZ[l]]; }); return o; }
function alternativ(pfad){ return SPR.map(l => '<link rel="alternate" hreflang="' + l + '" href="' + URL0 + pfad + "?lang=" + l + '">\n').join("") + '<link rel="alternate" hreflang="x-default" href="' + URL0 + pfad + '">\n'; }
function smUrl(pfad, bilder){
  const alts = SPR.map(l => '<xhtml:link rel="alternate" hreflang="' + l + '" href="' + URL0 + pfad + "?lang=" + l + '"/>').join("") + '<xhtml:link rel="alternate" hreflang="x-default" href="' + URL0 + pfad + '"/>';
  let x = "  <url><loc>" + URL0 + pfad + "</loc><lastmod>" + heute + "</lastmod>" + alts + "</url>\n";
  SPR.forEach(l => { x += "  <url><loc>" + URL0 + pfad + "?lang=" + l + "</loc><lastmod>" + heute + "</lastmod>" + alts + (l === "de" ? (bilder || []).map(b => "<image:image><image:loc>" + URL0 + "/img/beispiele/" + b + "</image:loc></image:image>").join("") : "") + "</url>\n"; });
  return x;
}
let sm = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
sm += smUrl("/", []);
APPS.forEach(function(A){
  const k = A.slug, f = path.join(W, k, "index.html"); if(!fs.existsSync(f)) return;
  const B = BB[k] || {}, bilder = (B.graph ? [B.graph] : []).concat((B.bsp || []).map(x => x.f));
  sm += smUrl("/" + k + "/", bilder);
  // Kopfzeilen der Kachel
  let h = fs.readFileSync(f, "utf8");
  h = h.replace(/\n?<!-- SEO -->[\s\S]*?<!-- \/SEO -->/, "");
  const name = A.name.de, desc = A.desc.de + " – " + A.grade.de + ". Kostenlos üben mit miStudia, in 9 Sprachen.";
  const bild = bilder[0] ? URL0 + "/img/beispiele/" + bilder[0] : URL0 + "/icons/icon-512.png";
  const kopf = "\n<!-- SEO -->\n" +
    '<meta name="description" content="' + esc(desc) + '">\n' +
    alternativ("/" + k + "/") +
    '<meta property="og:type" content="website">\n<meta property="og:site_name" content="miStudia Mathe">\n<meta property="og:locale" content="de_DE">\n' +
    '<meta property="og:title" content="' + esc(name + " – miStudia Mathe") + '">\n' +
    '<meta property="og:description" content="' + esc(desc) + '">\n' +
    '<meta property="og:url" content="' + URL0 + "/" + k + '/">\n' +
    '<meta property="og:image" content="' + bild + '">\n<meta name="twitter:card" content="summary_large_image">\n' +
    "<script>var MS_SEO = " + JSON.stringify(seoTexte(A)) + ";</script>\n" +
    '<script src="/sprache-url.js"></script>\n' +
    "<!-- /SEO -->";
  h = h.replace(/(<title>[^<]*<\/title>)/, "$1" + kopf);
  fs.writeFileSync(f, h);
});
// Startseite: SEO-Block mit Sprachfassungen (Titel/Untertitel aus UI in index.html)
{
  const u0 = idx.indexOf("var UI = {"), u1 = idx.indexOf("\n};", u0);
  const UI = eval("(" + idx.slice(u0 + "var UI = ".length, u1 + 2) + ")");
  const o = {}; SPR.forEach(l => { o[l] = ["miStudia " + UI[l].title, UI[l].sub + " " + ZUSATZ[l]]; });
  let h = fs.readFileSync(path.join(W, "index.html"), "utf8");
  h = h.replace(/\n?<!-- SEO -->[\s\S]*?<!-- \/SEO -->/, "").replace(/\n<link rel="canonical" href="https:\/\/math\.mistudia\.com\/">/, "");
  h = h.replace(/(<title>[^<]*<\/title>)/, "$1\n<!-- SEO -->\n" + alternativ("/") + "<script>var MS_SEO = " + JSON.stringify(o) + ";</script>\n<script src=\"/sprache-url.js\"></script>\n<!-- /SEO -->");
  fs.writeFileSync(path.join(W, "index.html"), h);
}
sm += "</urlset>\n";
fs.writeFileSync(path.join(W, "sitemap.xml"), sm);
fs.writeFileSync(path.join(W, "robots.txt"), "User-agent: *\nAllow: /\n\nSitemap: " + URL0 + "/sitemap.xml\n");
console.log("ok", APPS.length);
