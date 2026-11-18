// ============================================================
// werkzeuge/suchindex.js – baut /suchindex.js für die Suche im Hauptmenü.
// Lädt jede Kachel (aus APPS in /index.html) in allen 9 Sprachen und sammelt
// Reiter, Überschriften, Auswahlknöpfe, Beispiele und Alltagsbeispiele.
// Aufruf (Server auf 8771): node werkzeuge/suchindex.js
// ============================================================
const { chromium } = require("playwright");
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, ".."), BASIS = "http://localhost:8771";
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const SLUGS = [...html.matchAll(/slug: "([a-z0-9-]+)"/g)].map(m => m[1]);
const ALLE = ["de", "en", "es", "zh", "fr", "ru", "ar", "ja", "pt"];
// Aufruf ohne Argument: alle Sprachen nacheinander. Mit Sprache (z. B. "de") nur diese → werkzeuge/.such-<l>.json;
// mit "zusammen" werden die Teildateien zu /suchindex.js vereinigt (so lassen sich die Sprachen parallel erzeugen).
const ARG = process.argv[2];
const LANGS = ARG && ALLE.indexOf(ARG) >= 0 ? [ARG] : ALLE;
if (ARG === "zusammen") {
  const out = {}; ALLE.forEach(l => { out[l] = JSON.parse(fs.readFileSync(path.join(__dirname, ".such-" + l + ".json"), "utf8")); });
  fs.writeFileSync(path.join(ROOT, "suchindex.js"), "// Automatisch erzeugt von werkzeuge/suchindex.js – Suchbegriffe pro Kachel und Sprache (Reiter, Überschriften, Wörter aus den Texten; Berühmte Aufgaben mit Sprungziel).\nvar MS_SUCHE = " + JSON.stringify(out) + ";\n");
  ALLE.forEach(l => fs.unlinkSync(path.join(__dirname, ".such-" + l + ".json")));
  console.log("suchindex.js geschrieben"); process.exit(0);
}
(async () => {
  const b = await chromium.launch(); const out = {};
  for (const l of LANGS) {
    out[l] = {};
    const ctx = await b.newContext({ viewport: { width: 1200, height: 900 } });
    await ctx.addInitScript(l2 => { try { localStorage.setItem("msMathLang", l2); } catch(e){} }, l);
    await ctx.route("**/*", r => /^https?:\/\/localhost/.test(r.request().url()) ? r.continue() : r.fulfill({ body: "" }));
    const p = await ctx.newPage();
    p.on("dialog", d => d.dismiss().catch(() => {}));
    p.setDefaultTimeout(8000);
    // Sammelt Überschriften/Knöpfe (wie bisher) und zusätzlich einzelne Wörter aus Fließtexten (p, li, td, .merke …),
    // damit z. B. „Glöckchen“, „Schulden“ oder „da Vinci“ gefunden werden. Für zh/ja: Textstücke zwischen Satzzeichen.
    const sammle = async () => p.evaluate((l) => {
      const sel = '[role=tab], .tabs button, .modus button, .wahl button, .sa-wahl button, h2, h3, summary, select option, label, .msa-bsp h3, .al-karte h3, .al-karte b';
      const L = [], W = [];
      const raus = e => e.closest("footer, .footer, .langs, #ms-home, .msa-kopf, .ms-zl, .msbb, script, style");
      document.querySelectorAll(sel).forEach(e => { if (raus(e)) return; let t = (e.textContent || "").replace(/\s+/g, " ").trim(); if (t.length >= 2 && t.length <= 70 && !/^[\d\s.,−+\-=:()|/·]+$/.test(t)) L.push(t); });
      document.querySelectorAll("p, li, td, th, dd, .merke, figcaption, .zeile").forEach(e => {
        if (raus(e) || e.closest("svg, ol.weg, ol.lauf")) return;
        const t = (e.textContent || "").replace(/\s+/g, " ");
        if (l === "zh" || l === "ja") (t.match(/[\u3040-\u30ff\u3400-\u9fff\uff10-\uff5a]{2,14}/g) || []).forEach(x => W.push(x));
        else (t.match(/[A-Za-zÀ-ÿĀ-žА-яЁёऀ-ॿ\u0600-\u06ff']{4,}/g) || []).forEach(x => W.push(x.replace(/^'+|'+$/g, "")));
      });
      return { L: [...new Set(L)], W: [...new Set(W.map(w => w.toLowerCase() === w ? w : w))] };
    }, l);
    const tabsDurch = async () => {
      let L = [], W = [];
      const add = r => { L = L.concat(r.L); W = W.concat(r.W); };
      add(await sammle());
      const n = await p.$$eval('[role=tab]', e => e.length).catch(() => 0);
      for (let i = 0; i < Math.min(n, 9); i++) {
        try { await p.evaluate(i2 => { const t = document.querySelectorAll('[role=tab]')[i2]; if (t) t.click(); }, i); await p.waitForTimeout(220); add(await sammle()); } catch (e) {}
      }
      L = [...new Set(L)]; const lset = new Set(L.map(x => x.toLowerCase()));
      W = [...new Set(W)].filter(w => !lset.has(w.toLowerCase()));
      // Wörter, die schon in einer Überschrift stecken, braucht es nicht doppelt
      const lj = L.join(" ").toLowerCase(); W = W.filter(w => lj.indexOf(w.toLowerCase()) < 0);
      return L.concat(W);
    };
    for (const s of SLUGS) {
      try {
        if (process.env.SUCH_LOG) console.log(l, s);
        await p.goto(BASIS + "/" + s + "/?lang=" + l, { waitUntil: "load" }); await p.waitForTimeout(350);
        const knopf = await p.$(".msa-knopf, .alltag-knopf"); if (knopf) { try { await knopf.click({ timeout: 2000 }); } catch (e) { await p.evaluate(k => k.click(), knopf).catch(() => {}); } await p.waitForTimeout(250); }
        let T = await tabsDurch();
        // Berühmte Aufgaben: jede Person als eigene Unterseite, Treffer springen direkt dorthin ("\u0001#schluessel")
        if (s === "beruehmt") {
          const keys = await p.$$eval("#karten a.bk", e => e.map(a => a.getAttribute("href").slice(1))).catch(() => []);
          const seen = new Set(T);
          for (const k of keys) {
            await p.evaluate(k2 => { location.hash = k2; }, k); await p.waitForTimeout(350);
            const r = await sammle(); const kopf = await p.$eval("#s_detail h2", e => e.textContent.trim()).catch(() => "");
            [kopf].concat(r.L, r.W).forEach(x => { if (x && !seen.has(x + "\u0001#" + k)) { seen.add(x + "\u0001#" + k); T.push(x + "\u0001#" + k); } });
          }
        }
        out[l][s] = T;
      } catch (e) { out[l][s] = []; console.log(l, s, "Fehler", String(e).slice(0, 80)); }
    }
    await ctx.close();
    console.log(l, Object.values(out[l]).reduce((a, x) => a + x.length, 0));
    if (LANGS.length === 1) { fs.writeFileSync(path.join(__dirname, ".such-" + l + ".json"), JSON.stringify(out[l])); await b.close(); process.exit(0); }
  }
  fs.writeFileSync(path.join(ROOT, "suchindex.js"), "// Automatisch erzeugt von werkzeuge/suchindex.js – Suchbegriffe pro Kachel und Sprache (Reiter, Aufgaben, Erklärungen, Alltagsbeispiele).\nvar MS_SUCHE = " + JSON.stringify(out) + ";\n");
  await b.close();
})();
