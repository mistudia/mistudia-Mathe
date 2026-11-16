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
const LANGS = ["de", "en", "es", "zh", "fr", "ru", "ar", "ja", "pt"];
(async () => {
  const b = await chromium.launch(); const out = {};
  for (const l of LANGS) {
    out[l] = {};
    const ctx = await b.newContext({ viewport: { width: 1200, height: 900 } });
    await ctx.addInitScript(l2 => { try { localStorage.setItem("msMathLang", l2); } catch(e){} }, l);
    const p = await ctx.newPage();
    for (const s of SLUGS) {
      try {
        await p.goto(BASIS + "/" + s + "/?lang=" + l, { waitUntil: "load" }); await p.waitForTimeout(350);
        const knopf = await p.$(".msa-knopf, .alltag-knopf"); if (knopf) { await knopf.click(); await p.waitForTimeout(250); }
        const T = await p.evaluate(() => {
          const sel = '[role=tab], .tabs button, .modus button, .wahl button, .sa-wahl button, h2, h3, summary, select option, label, .msa-bsp h3, .al-karte h3, .al-karte b';
          const L = [];
          document.querySelectorAll(sel).forEach(e => { if (e.closest("footer, .footer, .langs, #ms-home, .msa-kopf")) return; let t = (e.textContent || "").replace(/\s+/g, " ").trim(); if (t.length >= 2 && t.length <= 70 && !/^[\d\s.,−+\-=:()|/·]+$/.test(t)) L.push(t); });
          return [...new Set(L)];
        });
        out[l][s] = T;
      } catch (e) { out[l][s] = []; }
    }
    await ctx.close();
    console.log(l, Object.values(out[l]).reduce((a, x) => a + x.length, 0));
  }
  fs.writeFileSync(path.join(ROOT, "suchindex.js"), "// Automatisch erzeugt von werkzeuge/suchindex.js – Suchbegriffe pro Kachel und Sprache (Reiter, Aufgaben, Erklärungen, Alltagsbeispiele).\nvar MS_SUCHE = " + JSON.stringify(out) + ";\n");
  await b.close();
})();
