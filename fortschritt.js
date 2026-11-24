// ============================================================
// /fortschritt.js – Übungs-Statistik der Mathe-App (MS_FS)
// ------------------------------------------------------------
// Zählt richtige und falsche Antworten je Kachel und Tag, Serien ohne Fehler
// und Bestzeiten (Einmaleins-Diplome). Gespeichert in localStorage "msFS".
// Mit VocabBoss gekoppelt (Code oder Anmeldung, siehe konto.js) wird der Stand
// über math_progress_sync / math_progress_sync_code (vocabboss/math_progress.sql)
// mit allen Geräten zusammengeführt.
//
// Datenmodell (lokal und auf dem Server gleich):
//   ep:  { id, t }                Zurücksetz-Epoche (neuere gewinnt, ältere Zähler verfallen)
//   dev: { <Gerät>: { t, gb, k: { <kachel>: { r, f, b, l } }, d: { <JJJJ-MM-TT>: { r, f } } } }
//        je Gerät nur wachsende Zähler → Zusammenführen = Maximum je Gerät, Summe über Geräte
//   zt:  { <diplom-modus>: Sekunden }   Bestzeiten (Minimum)
// Lokal zusätzlich: me (dieses Gerät), s (laufende Serie je Kachel), sg (laufende Serie gesamt), sync.
//
// Erkennen von Ergebnissen: konto.js ruft MS_FS.melde(ok, element) bei Rückmeldungen
// (Klassen gut/falsch …), msRichtig()/msNochmal() melden direkt. Pro Bedienung
// (Klick/Taste) zählt höchstens ein Ergebnis; gleiche Rückmeldung zur gleichen Aufgabe
// (z. B. nach Reiterwechsel neu gezeichnet) zählt nicht noch einmal.
// ============================================================
(function(){
  if(window.MS_FS) return;
  var KEY = "msFS", TAGE_MAX = 120, GERAETE_MAX = 12;
  function heute(d){ d = d || new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function zufall(){ var a = "abcdefghijkmnpqrstuvwxyz23456789", s = ""; for(var i = 0; i < 10; i++) s += a[Math.floor(Math.random() * a.length)]; return s; }
  function lies(){ var o = null; try { o = JSON.parse(localStorage.getItem(KEY) || "null"); } catch(e){} if(!o || typeof o !== "object") o = {};
    if(!o.me) o.me = zufall(); if(!o.ep) o.ep = { id: "0", t: 0 }; if(!o.dev) o.dev = {}; if(!o.zt) o.zt = {}; if(!o.s) o.s = {}; if(!o.sg) o.sg = 0; return o; }
  var D = lies();
  function schreibe(){ try { localStorage.setItem(KEY, JSON.stringify(D)); } catch(e){} }
  function ich(){ var g = D.dev[D.me]; if(!g){ g = D.dev[D.me] = { t: 0, gb: 0, k: {}, d: {} }; } return g; }

  // ---------- Kachel bestimmen ----------
  function slug(){
    var p = location.pathname.split("/").filter(Boolean)[0] || "";
    if(p === "einmaleins" && /[?&]gross=1/.test(location.search)) return "grosses-einmaleins";
    if(p === "index.html" || p === "fortschritt" || p === "privacy.html") return "";
    return p;
  }

  // ---------- Zählen ----------
  var seq = 0, gezaehlt = -1, sigs = [], aktion = 0;
  // „Prüf-Aktion“: Klick auf einen Knopf (keine Reiter, Links, Aufklapper) oder Enter.
  // Nur kurz danach zählen Rückmeldungen, die konto.js an den Klassen erkennt
  // (Tippen allein – etwa ein Fehlerhinweis im Rechner – zählt nicht).
  document.addEventListener("pointerdown", function(e){
    seq++;
    var z = e.target && e.target.closest && e.target.closest("button, input[type=button], input[type=submit], [role=button], .mcB, .chip, svg");
    if(z && !z.closest('[role=tab], .tabs, summary, a[href], select, .langs')) aktion = Date.now();
  }, true);
  document.addEventListener("keydown", function(e){ if(e.key === "Shift" || e.key === "Tab") return; seq++; if(e.key === "Enter") aktion = Date.now(); }, true);
  function signatur(el){
    if(!el || !el.closest) return "";
    var box = el.closest(".karte, section, form, .card, article") || el.parentNode || el;
    return (el.className || "") + "|" + String(box.textContent || "").replace(/\s+/g, " ").slice(0, 400);
  }
  function zaehle(ok, s){
    s = s || slug(); if(!s) return;
    var g = ich(), k = g.k[s] || (g.k[s] = { r: 0, f: 0, b: 0, l: "" }), tag = heute(), d = g.d[tag] || (g.d[tag] = { r: 0, f: 0 });
    if(ok){ k.r++; d.r++; D.s[s] = (D.s[s] || 0) + 1; D.sg++; if(D.s[s] > k.b) k.b = D.s[s]; if(D.sg > (g.gb || 0)) g.gb = D.sg; }
    else { k.f++; d.f++; D.s[s] = 0; D.sg = 0; }
    k.l = tag; g.t = Date.now();
    var alt = Object.keys(g.d).sort(); while(alt.length > TAGE_MAX) delete g.d[alt.shift()];
    schreibe(); plane();
    try { document.dispatchEvent(new CustomEvent("ms-fortschritt", { detail: { ok: ok, slug: s } })); } catch(e){}
  }
  // ok: true/false; el: Rückmelde-Element (für die Doppelt-Prüfung), optional
  function melde(ok, el){
    if(gezaehlt === seq) return;          // diese Bedienung hat schon gezählt
    if(el){
      if(Date.now() - aktion > 4000) return;
      var txt = String(el.textContent || "").trim();
      if(el.tagName !== "INPUT" && (!txt || txt.length > 300)) return;   // leere Platzhalter, ganze neu gezeichnete Karten
      var sg = signatur(el), jetzt = Date.now();
      sigs = sigs.filter(function(x){ return jetzt - x[1] < 10 * 60 * 1000; });
      if(sigs.some(function(x){ return x[0] === sg; })) return;
      sigs.push([sg, jetzt]); if(sigs.length > 40) sigs.shift();
    }
    gezaehlt = seq;
    zaehle(!!ok);
  }

  // ---------- Bestzeiten ----------
  function bestZeit(key, sek){
    if(!(sek > 0)) return false;
    var alt = D.zt[key], neu = !alt || sek < alt;
    if(neu){ D.zt[key] = Math.round(sek); ich().t = Date.now(); schreibe(); plane(); }
    return neu;
  }

  // ---------- Auswertung ----------
  function summe(){
    var K = {}, T = {}, gb = 0;
    Object.keys(D.dev).forEach(function(id){
      var g = D.dev[id]; gb = Math.max(gb, g.gb || 0);
      Object.keys(g.k || {}).forEach(function(s){ var a = g.k[s], z = K[s] || (K[s] = { r: 0, f: 0, b: 0, l: "" }); z.r += a.r || 0; z.f += a.f || 0; z.b = Math.max(z.b, a.b || 0); if((a.l || "") > z.l) z.l = a.l; });
      Object.keys(g.d || {}).forEach(function(t){ var a = g.d[t], z = T[t] || (T[t] = { r: 0, f: 0 }); z.r += a.r || 0; z.f += a.f || 0; });
    });
    var r = 0, f = 0; Object.keys(K).forEach(function(s){ r += K[s].r; f += K[s].f; });
    // Tage in Folge (heute oder gestern als letzter Tag) und längste Folge
    var tage = Object.keys(T).filter(function(t){ return T[t].r > 0; }).sort(), folge = 0, lang = 0, lauf = 0, vor = null;
    tage.forEach(function(t){ var d = new Date(t + "T12:00:00"); lauf = vor && Math.round((d - vor) / 864e5) === 1 ? lauf + 1 : 1; vor = d; if(lauf > lang) lang = lauf; });
    if(tage.length){ var letzt = tage[tage.length - 1], g1 = new Date(); g1.setDate(g1.getDate() - 1); if(letzt === heute() || letzt === heute(g1)) folge = lauf; }
    return { kacheln: K, tage: T, r: r, f: f, gb: gb, folge: folge, langeFolge: lang, zt: D.zt };
  }
  function kachel(s){ var K = summe().kacheln[s]; return K || null; }
  var T = {
    de: { tip: "{r} richtig von {n} Antworten ({q} %) · beste Serie {b}", knopf: "Mein Fortschritt", heute: "heute {n} ✓", folge: "{n} Tage in Folge", folge1: "1 Tag" },
    en: { tip: "{r} correct out of {n} answers ({q} %) · best streak {b}", knopf: "My progress", heute: "today {n} ✓", folge: "{n} days in a row", folge1: "1 day" },
    es: { tip: "{r} correctas de {n} respuestas ({q} %) · mejor racha {b}", knopf: "Mi progreso", heute: "hoy {n} ✓", folge: "{n} días seguidos", folge1: "1 día" },
    zh: { tip: "{n} 次回答中答对 {r} 次（{q} %）· 最长连对 {b}", knopf: "我的进度", heute: "今天 {n} ✓", folge: "连续 {n} 天", folge1: "1 天" },
    fr: { tip: "{r} justes sur {n} réponses ({q} %) · meilleure série {b}", knopf: "Mes progrès", heute: "aujourd’hui {n} ✓", folge: "{n} jours d’affilée", folge1: "1 jour" },
    ru: { tip: "{r} верно из {n} ответов ({q} %) · лучшая серия {b}", knopf: "Мой прогресс", heute: "сегодня {n} ✓", folge: "{n} дн. подряд", folge1: "1 день" },
    ar: { tip: "{r} صحيحة من {n} إجابة ({q} %) · أفضل سلسلة {b}", knopf: "تقدّمي", heute: "اليوم {n} ✓", folge: "{n} أيام متتالية", folge1: "يوم واحد" },
    ja: { tip: "{n} 回中 {r} 回正解（{q} %）・最高連続正解 {b}", knopf: "わたしの記録", heute: "今日 {n} ✓", folge: "{n} 日連続", folge1: "1 日" },
    pt: { tip: "{r} certas de {n} respostas ({q} %) · melhor sequência {b}", knopf: "Meu progresso", heute: "hoje {n} ✓", folge: "{n} dias seguidos", folge1: "1 dia" }
  };
  function sprache(){ var l = window.MS_MATH_LANG; if(!l) try { l = localStorage.getItem("msMathLang"); } catch(e){} return T[l] ? l : "de"; }
  function tx(k, v){ var s = T[sprache()][k] || T.de[k]; if(v) for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  // Abzeichen für die Startseite: „42 ✓ · 85 %“
  function abzeichen(s){
    var k = kachel(s); if(!k || !(k.r + k.f)) return "";
    var n = k.r + k.f, q = Math.round(100 * k.r / n);
    return '<span class="fsAbz" title="' + esc(tx("tip", { r: k.r, n: n, q: q, b: k.b })) + '"><span class="fsR">' + k.r + ' ✓</span> · <span class="fsQ" style="color:' + (q >= 80 ? "#15803d" : q >= 50 ? "#b45309" : "#b91c1c") + '">' + q + " %</span></span>";
  }
  // Knopf „Mein Fortschritt“ mit Kurzinfo
  function knopf(){
    var S = summe(), h = S.tage[heute()], teile = [];
    if(S.folge) teile.push(S.folge === 1 ? tx("folge1") : tx("folge", { n: S.folge }));
    if(h && h.r) teile.push(tx("heute", { n: h.r }));
    return '<a class="fsKnopf" href="/fortschritt/' + (window.MS_URL_LANG ? "?lang=" + window.MS_URL_LANG : "") + '"><span class="fsKnopfI" aria-hidden="true">▲</span><b>' + esc(tx("knopf")) + "</b>" + (teile.length ? '<span class="fsKnopfS">' + esc(teile.join(" · ")) + "</span>" : "") + "</a>";
  }
  var css = document.createElement("style");
  css.textContent = ".fsAbz{display:inline-block;margin-top:6px;margin-inline-start:6px;font:700 12.5px system-ui,sans-serif;color:#334155;background:#f1f5f9;border:1px solid #b0b0b8;border-radius:999px;padding:1px 8px;white-space:nowrap}" +
    ".fsAbz .fsR{color:#15803d}" +
    ".fsKnopf{display:flex;align-items:center;flex-wrap:wrap;gap:4px 10px;max-width:560px;margin:0 auto 14px;padding:10px 14px;border-radius:14px;border:2px solid #1565c0;background:#ffffff;color:#1a2233;text-decoration:none;box-shadow:0 3px 10px rgba(21,101,192,.12)}" +
    ".fsKnopf:hover{background:#f3f9ff}.fsKnopf b{color:#1565c0;font-size:16px}.fsKnopfS{color:#4f5b6e;font-size:14px}" +
    ".fsKnopfI{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:9px;background:#16a34a;color:#ffffff;font-size:14px}";
  document.head.appendChild(css);

  // ---------- Zusammenführen (gleiche Regeln wie _math_fs_merge in SQL) ----------
  function epNeuer(a, b){ a = a || { id: "0", t: 0 }; b = b || { id: "0", t: 0 }; return (a.t || 0) > (b.t || 0) || ((a.t || 0) === (b.t || 0) && String(a.id) > String(b.id)); }
  function mischen(a, b){
    a = a || {}; b = b || {};
    var ea = a.ep || { id: "0", t: 0 }, eb = b.ep || { id: "0", t: 0 }, gleich = ea.id === eb.id && ea.t === eb.t;
    if(!gleich){ if(epNeuer(ea, eb)) b = { ep: ea }; else a = { ep: eb }; }
    var out = { ep: epNeuer(ea, eb) ? ea : eb, dev: {}, zt: {} };
    [a, b].forEach(function(x){
      Object.keys(x.dev || {}).forEach(function(id){
        var g = x.dev[id], o = out.dev[id] || (out.dev[id] = { t: 0, gb: 0, k: {}, d: {} });
        o.t = Math.max(o.t, g.t || 0); o.gb = Math.max(o.gb, g.gb || 0);
        Object.keys(g.k || {}).forEach(function(s){ var q = g.k[s], z = o.k[s] || (o.k[s] = { r: 0, f: 0, b: 0, l: "" }); z.r = Math.max(z.r, q.r || 0); z.f = Math.max(z.f, q.f || 0); z.b = Math.max(z.b, q.b || 0); if((q.l || "") > z.l) z.l = q.l; });
        Object.keys(g.d || {}).forEach(function(t){ var q = g.d[t], z = o.d[t] || (o.d[t] = { r: 0, f: 0 }); z.r = Math.max(z.r, q.r || 0); z.f = Math.max(z.f, q.f || 0); });
      });
      Object.keys(x.zt || {}).forEach(function(k){ var v = +x.zt[k]; if(v > 0 && (!out.zt[k] || v < out.zt[k])) out.zt[k] = v; });
    });
    Object.keys(out.dev).forEach(function(id){ var g = out.dev[id], L = Object.keys(g.d).sort(); while(L.length > TAGE_MAX) delete g.d[L.shift()]; });
    var ids = Object.keys(out.dev).sort(function(x, y){ return out.dev[y].t - out.dev[x].t; });
    ids.slice(GERAETE_MAX).forEach(function(id){ if(id !== D.me) delete out.dev[id]; });
    return out;
  }
  function uebernehmen(m){
    var altEp = D.ep;
    D.ep = m.ep; D.dev = m.dev || {}; D.zt = m.zt || {};
    if(!(altEp && altEp.id === D.ep.id && altEp.t === D.ep.t)){ D.s = {}; D.sg = 0; }
    schreibe();
  }

  // ---------- Mit VocabBoss-Konto abgleichen ----------
  var timer = null, laeuft = false, nochmal = false;
  function gekoppelt(){ return !!(window.MS_KONTO && MS_KONTO.verbindung && MS_KONTO.verbindung()); }
  function plane(ms){ if(!gekoppelt()) return; clearTimeout(timer); timer = setTimeout(abgleich, ms == null ? 8000 : ms); }
  function abgleich(fertig){
    var v = window.MS_KONTO && MS_KONTO.verbindung && MS_KONTO.verbindung();
    if(!v){ if(fertig) fertig("aus"); return; }
    if(laeuft){ nochmal = true; if(fertig) fertig("laeuft"); return; }
    laeuft = true; clearTimeout(timer);
    var daten = { ep: D.ep, dev: D.dev, zt: D.zt };
    MS_KONTO.client().then(function(c){ return v.code ? c.rpc("math_progress_sync_code", { p_code: v.code, p_data: daten }) : c.rpc("math_progress_sync", { p_data: daten }); })
      .then(function(r){
        laeuft = false;
        if(r && r.error){ if(fertig) fertig(/function|does not exist|schema cache/i.test(r.error.message || "") ? "sql" : "fehler"); return; }
        if(r && r.data){ uebernehmen(mischen(D, r.data)); D.sync = Date.now(); schreibe(); try { document.dispatchEvent(new CustomEvent("ms-fortschritt", { detail: { sync: true } })); } catch(e){} }
        if(fertig) fertig("ok");
        if(nochmal){ nochmal = false; plane(2000); }
      })
      .catch(function(){ laeuft = false; if(fertig) fertig("netz"); });
  }
  // beim Verlassen der Seite noch schnell abgleichen
  document.addEventListener("visibilitychange", function(){ if(document.visibilityState === "hidden" && timer){ clearTimeout(timer); timer = null; abgleich(); } });

  function zuruecksetzen(){
    D.ep = { id: zufall(), t: Date.now() }; D.dev = {}; D.zt = {}; D.s = {}; D.sg = 0; schreibe();
    abgleich();
  }

  window.MS_FS = {
    melde: melde, richtig: function(){ melde(true); }, falsch: function(){ melde(false); },
    bestZeit: bestZeit, summe: summe, kachel: kachel, abzeichen: abzeichen, knopf: knopf,
    abgleich: abgleich, zuruecksetzen: zuruecksetzen, gekoppelt: gekoppelt, daten: function(){ return D; },
    _mischen: mischen, _heute: heute
  };
  // Startseite/Übersicht: einmal nach dem Laden abgleichen
  if(!slug()) setTimeout(function(){ if(gekoppelt()) abgleich(); }, 600);
})();
