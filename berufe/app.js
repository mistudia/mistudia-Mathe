// ============================================================
// berufe/app.js – Kachel „Mathe im Beruf“
// Bereiche (Chips): Versicherung, Bank, IT, Unternehmensberatung, Industrie, Forschung, Behörden.
// Je Bereich: was Mathematiker dort tun, passende Kacheln (Links), eine vereinfachte Beispielaufgabe
// (Zufall mit Startwert → gleiche Aufgabe nach Sprachwechsel; 2 Versuche, dann Lösungsweg, ein „=“ pro Zeile).
// Texte: texte.js (BF, 9 Sprachen; Kachelnamen lk aus /index.html). Gewählter Bereich in localStorage "msBF".
// ============================================================
(function(){
  "use strict";
  var lang = "de";
  function $(id){ return document.getElementById(id); }
  function t(k, v){ var s = (BF[lang] && BF[lang][k]) || BF.de[k] || k; if(Array.isArray(s)) return s; if(v) for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  function tA(k){ var v = (BF[lang] && BF[lang][k]) || BF.de[k]; return Array.isArray(v) ? v : []; }
  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function komma(){ return ["de", "es", "fr", "ru", "pt"].indexOf(lang) >= 0; }
  function z(x, d){ d = d == null ? 2 : d; var r = Math.round(x * Math.pow(10, d)) / Math.pow(10, d), s = r.toFixed(d); return (komma() ? s.replace(".", ",") : s).replace("-", "−"); }
  function zk(x){ var s = String(Math.round(x * 1e6) / 1e6); return (komma() ? s.replace(".", ",") : s).replace("-", "−"); }
  function gz(n){ var s = String(Math.round(Math.abs(n))), sep = ["en", "zh", "ja", "ar"].indexOf(lang) >= 0 ? "," : " "; return (n < 0 ? "−" : "") + (s.length >= 5 ? s.replace(/\B(?=(\d{3})+(?!\d))/g, sep) : s); }
  function br(a, b){ return '<span class="msf-br"><span>' + a + "</span><span>" + b + "</span></span>"; }
  function hoch(n){ return String(n).replace(/\d/g, function(c){ return "⁰¹²³⁴⁵⁶⁷⁸⁹"[+c]; }); }
  function seeded(a){ return function(){ a |= 0; a = a + 0x6D2B79F5 | 0; var x = Math.imul(a ^ a >>> 15, 1 | a); x = x + Math.imul(x ^ x >>> 7, 61 | x) ^ x; return ((x ^ x >>> 14) >>> 0) / 4294967296; }; }
  function lies(s){ s = String(s).trim().replace(/\s+/g, "").replace(/ /g, "").replace(/[−–]/g, "-").replace(/[€%]/g, "");
    if(/^-?\d{1,3}(,\d{3})+(\.\d+)?$/.test(s)) s = s.replace(/,/g, ""); if(/^-?\d{1,3}(\.\d{3})+(,\d+)?$/.test(s)) s = s.replace(/\./g, "");
    s = s.replace(",", "."); return /^-?\d*\.?\d+$/.test(s) ? +s : NaN; }
  function kette(L){
    return '<div class="kette" dir="ltr">' + L.map(function(zl, i){
      if(typeof zl === "string") zl = { h: zl };
      return '<div class="kz"><span class="kg">' + (i === 0 ? "" : (zl.r || "=")) + '</span><span class="ke">' + zl.h + '</span><span class="kn">' + (zl.n || "") + "</span></div>";
    }).join("") + "</div>";
  }
  var EIN = {}; try { EIN = JSON.parse(localStorage.getItem("msBF") || "{}") || {}; } catch(e){}
  function merken(){ try { localStorage.setItem("msBF", JSON.stringify(EIN)); } catch(e){} }
  function lkName(slug){ var L = (BF[lang] && BF[lang].lk) || BF.de.lk; return L[slug] || BF.de.lk[slug] || slug; }

  // ---------- Aufgaben ----------
  function w(r, L){ return L[Math.floor(r() * L.length)]; }
  var GEN = {
    vers: function(r){ var p = w(r, [1, 2, 3, 4, 5]), s = w(r, [200, 300, 400, 500, 600, 700, 800, 900]), v = w(r, [2, 3, 4, 5, 6]), e = p * s / 100, b = e + v;
      return { q: ["q_vers", { p: p, s: s, v: v }], w: b, tol: 0.001, l: zk(b) + " €",
        weg: [{ lbl: t("l_erwart") }, kette(["E", br(p, 100) + " · " + s + " €", zk(e) + " €"]), kette(["B", "E + V", zk(e) + " € + " + v + " €", zk(b) + " €"])] }; },
    bank: function(r){ var k = w(r, [1000, 2000, 2500, 3000, 4000, 5000]), p = w(r, [2, 3, 4, 5]), q = 1 + p / 100, e = Math.round(k * q * q * 100) / 100;
      return { q: ["q_bank", { k: gz(k), p: p }], w: e, tol: 0.011, l: z(e, 2) + " €",
        weg: [kette(["q", "1 + " + br(p, 100), zk(q)]), kette(["K₂", "K · q²", gz(k) + " € · " + zk(q) + "²", gz(k) + " € · " + zk(q * q), z(e, 2) + " €"])] }; },
    it: function(r){ var n = 1 + Math.floor(r() * 255), b = n.toString(2), T = [];
      for(var i = 0; i < b.length; i++) if(b[i] === "1") T.push(String(Math.pow(2, b.length - 1 - i)));
      var P = []; for(var j = 0; j < b.length; j++) if(b[j] === "1") P.push("2" + hoch(b.length - 1 - j));
      return { q: ["q_it", { b: b + "₂" }], w: n, tol: 0, l: String(n),
        weg: [{ lbl: t("l_stellen") }, kette([b + "₂", P.join(" + "), T.join(" + "), String(n)])] }; },
    berat: function(r){ var x = w(r, [150, 200, 250, 300, 400, 450, 500, 600, 750, 800]), d = w(r, [2, 3, 4, 5, 6]), v = w(r, [1, 2, 3]), p = v + d, f = x * d;
      return { q: ["q_berat", { f: gz(f), v: v, p: p }], w: x, tol: 0, l: gz(x),
        weg: [{ lbl: t("l_gewinn") }, kette(["p − v", p + " € − " + v + " €", d + " €"]), kette(["x", br("F", "p − v"), br(gz(f) + " €", d + " €"), gz(x)])] }; },
    ind: function(r){ var L = []; for(var i = 0; i < 5; i++) L.push(396 + Math.floor(r() * 9)); var s = L.reduce(function(a, b){ return a + b; }, 0), m = s / 50;
      var Lt = L.map(function(x){ return zk(x / 10); });
      return { q: ["q_ind", { l: Lt.join(lang === "zh" || lang === "ja" ? "、" : lang === "ar" ? "، " : "; ") }], w: m, tol: 0.0011, l: z(m, 2) + " mm",
        weg: [{ lbl: t("l_summe") }, kette(["x̄", br(Lt.join(" + "), 5), br(zk(s / 10), 5), z(m, 2) + " mm"])] }; },
    forsch: function(r){ var n = w(r, [100, 200, 500, 1000]), h = w(r, [1, 2]), k = 3 * h, e = n * Math.pow(2, k);
      return { q: ["q_forsch", { n: gz(n), h: t("h" + h) }], w: e, tol: 0, l: gz(e),
        weg: [{ lbl: t("l_verd", { h: t("h" + h) }) + ": k = " + (h * 60) + " : 20 = " + k }, kette(["N", "N₀ · 2" + hoch("k"), gz(n) + " · 2" + hoch(k), gz(n) + " · " + Math.pow(2, k), gz(e)])] }; },
    amt: function(r){ var a = w(r, [20, 25, 30, 40, 48, 50, 60, 75, 80]) * 1000, pz = (10 + Math.floor(r() * 90)) * (r() < 0.3 ? -1 : 1), b = a + a * pz / 1000, p = pz / 10;
      return { q: ["q_amt", { a: gz(a), b: gz(b) }], w: p, tol: 0.051, l: zk(p) + " %",
        weg: [kette(["p", br("b − a", "a") + " · 100 %", br(gz(b) + " − " + gz(a), gz(a)) + " · 100 %", br(gz(b - a), gz(a)) + " · 100 %", zk(p) + " %"])] }; }
  };
  var F = [
    { k: "vers", sym: "☂", col: "#0f766e", links: ["wahrscheinlichkeit", "prozent", "normalverteilung"], leg: "p bfS bfV bfE bfB" },
    { k: "bank", sym: "€", col: "#1d4ed8", links: ["zinsen", "exponential", "prozent"], leg: "K p q Kn" },
    { k: "it", sym: "01", col: "#475569", links: ["teilbarkeit", "matrizen", "vektoren", "logarithmus"], leg: "" },
    { k: "berat", sym: "↗", col: "#b45309", links: ["linear", "differential", "dreisatz"], leg: "Ffix pPreis bfv xUnb" },
    { k: "ind", sym: "⚙︎", col: "#7c3aed", links: ["normalverteilung", "trigonometrie", "koerper", "integral"], leg: "bfM" },
    { k: "forsch", sym: "∿", col: "#be185d", links: ["exponential", "differential", "binomial"], leg: "N0 bfN bfk" },
    { k: "amt", sym: "Σ", col: "#15803d", links: ["prozent", "normalverteilung", "zinsen"], leg: "p bfab" }
  ];
  function finde(k){ for(var i = 0; i < F.length; i++) if(F[i].k === k) return F[i]; return F[0]; }
  var akt = finde((location.hash || "").slice(1) || EIN.f || "vers");
  var auf = null, punkte = 0, anzahl = 0;
  function erzeuge(k, sd){ var a = GEN[k](seeded(sd)); a.k = k; a.sd = sd; return a; }
  function neueAufgabe(){ auf = erzeuge(akt.k, Math.floor(Math.random() * 1e9)); auf.fertig = false; auf.v = 0; $("antw").value = ""; zeigeAufgabe(); }
  function zeigeAufgabe(){
    $("frage").textContent = t(auf.q[0], auf.q[1]);
    var m = $("meldung");
    if(auf.fertig){ m.className = "meldung " + (auf.ok ? "gut" : "schlecht"); m.textContent = auf.ok ? t("richtig") : t("falsch", { l: auf.l });
      $("lWeg").innerHTML = '<p class="zeile"><b>' + esc(t("weg")) + "</b></p>" + auf.weg.map(function(x){ return typeof x === "string" ? x : '<p class="zeile wl" dir="auto">' + esc(x.lbl) + "</p>"; }).join(""); $("antw").readOnly = true; }
    else { if(!auf.v){ m.className = "meldung"; m.textContent = ""; } $("lWeg").innerHTML = ""; $("antw").readOnly = false; }
    $("punkte").textContent = anzahl ? t("punkte", { r: punkte, n: anzahl }) : "";
  }
  function pruefen(){
    if(!auf || auf.fertig) return;
    var e = lies($("antw").value); if(!isFinite(e)) return;
    var ok = Math.abs(e - auf.w) <= auf.tol + 1e-9;
    if(!ok && !auf.v && typeof msNochmal === "function"){ auf.v = 1; msNochmal($("meldung")); return; }
    auf.fertig = true; auf.ok = ok; anzahl++; if(ok){ punkte++; if(typeof msRichtig === "function") try { msRichtig(); } catch(x){} }
    zeigeAufgabe();
  }
  $("pruefen").addEventListener("click", pruefen);
  $("antw").addEventListener("keydown", function(e){ if(e.key === "Enter"){ e.preventDefault(); if(auf && auf.fertig) neueAufgabe(); else pruefen(); } });
  $("neuAuf").addEventListener("click", neueAufgabe);

  // ---------- Anzeige ----------
  function chips(){
    $("chips").innerHTML = F.map(function(f){ return '<button type="button" class="fchip" data-f="' + f.k + '" aria-pressed="' + (f === akt ? "true" : "false") + '" style="--fc:' + f.col + '"><span class="fsym">' + esc(f.sym) + "</span> " + esc(t("f_" + f.k)) + "</button>"; }).join("");
    $("chips").querySelectorAll("[data-f]").forEach(function(b){ b.addEventListener("click", function(){ akt = finde(b.dataset.f); EIN.f = akt.k; merken(); history.replaceState(null, "", "#" + akt.k); chips(); bereich(); neueAufgabe(); }); });
  }
  function bereich(){
    var f = akt;
    $("bSym").textContent = f.sym; $("bSym").style.background = f.col;
    $("bName").textContent = t("f_" + f.k); $("wasH").textContent = t("was"); $("wasT").textContent = t("t_" + f.k);
    $("matheH").textContent = t("mathe");
    $("links").innerHTML = f.links.map(function(s){ return '<a class="knopf hell" href="/' + s + '">' + esc(lkName(s)) + (lang === "ar" ? " ←" : " →") + "</a>"; }).join(" ");
    $("aufH").textContent = t("beispiel");
    $("leg").innerHTML = f.leg && window.MS_ZEICHEN ? '<p class="ms-zeichen">' + MS_ZEICHEN.html(f.leg.split(" ")) + "</p>" : "";
    if(f.leg && !window.MS_ZEICHEN) setTimeout(function(){ if(akt === f) bereich(); }, 200);
  }
  function alles(){
    document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = "miStudia – " + t("titel"); $("titel").textContent = t("titel"); $("intro").textContent = t("intro");
    $("woH").textContent = t("wo_h"); $("woT").textContent = t("wo_t");
    $("mehrH").textContent = t("mehr_h"); $("mehrL").innerHTML = tA("mehr_l").map(function(x){ return "<li>" + esc(x) + "</li>"; }).join("");
    $("wegH").textContent = t("weg_h"); $("wegT").textContent = t("weg_t");
    $("pruefen").textContent = t("pruefen"); $("neuAuf").textContent = t("neu");
    chips(); bereich();
    if(auf){ var alt = auf; auf = erzeuge(alt.k, alt.sd); auf.fertig = alt.fertig; auf.ok = alt.ok; auf.v = alt.v; zeigeAufgabe(); } else neueAufgabe();
  }
  window.MS_LANG = { apply: function(l){ if(BF[l]){ lang = l; alles(); } } };
  alles();
  window.MS_BF_TEST = { erzeuge: erzeuge, lies: lies };
})();
