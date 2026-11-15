// ============================================================
// exponential/app.js – Exponentialfunktionen
// Parameter: f(x) = a · b^(x − c) + d oder a · e^(k·x) + d mit Reglern;
//   Graph mit Asymptote y = d, Faktor-Treppe „· b“ je Schritt um 1,
//   Eigenschaften (Monotonie, Schnittpunkt mit y-Achse, Nullstelle,
//   Wertebereich) und Wertetabelle.
// Wachstum: Modelle mit Prozent, Verdopplungs- oder Halbwertszeit;
//   Tabelle, Graph und Vergleich mit linearem Wachstum.
// Üben: Funktionswert, Wachstumsfaktor, b aus zwei Punkten, Halbwertszeit,
//   Verdopplung, steigend/fallend.
// Texte: exponential/texte.js (EX), Sprache aus dem Startmenü (MS_LANG).
// ============================================================
(function(){
  "use strict";
  var NS = "http://www.w3.org/2000/svg", lang = "de";
  function $(id){ return document.getElementById(id); }
  function t(k, v){ var s = (EX[lang] && EX[lang][k]) || EX.de[k] || k; if(v) for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  function el(n, a, txt){ var e = document.createElementNS(NS, n); for(var k in a) if(a[k] != null) e.setAttribute(k, a[k]); if(txt != null) e.textContent = txt; return e; }
  function leer(s){ while(s.lastChild) s.removeChild(s.lastChild); }
  function sicht(e, an){ if(an) e.removeAttribute("hidden"); else e.setAttribute("hidden", ""); }
  function bdi(s){ return '<bdi dir="ltr">' + s + "</bdi>"; }
  function zuf(a, b){ return a + Math.floor(Math.random() * (b - a + 1)); }
  function wahl(L){ return L[Math.floor(Math.random() * L.length)]; }
  function komma(){ return !(lang === "en" || lang === "zh" || lang === "ja" || lang === "ar"); }
  function zahl(v, d){ if(d == null) d = 2; var r = Math.round(v * Math.pow(10, d)) / Math.pow(10, d); if(Object.is(r, -0)) r = 0; var s = String(Math.abs(r)); if(s.indexOf("e") >= 0) s = Math.abs(r).toFixed(d); if(komma()) s = s.replace(".", ","); return (r < 0 ? "−" : "") + s; }
  function genau(v, d){ d = d == null ? 2 : d; return Math.abs(v * Math.pow(10, d) - Math.round(v * Math.pow(10, d))) < 1e-7; }
  function zg(v, d){ return (genau(v, d) ? "" : "≈ ") + zahl(v, d); }
  function lies(s){ s = String(s).trim().replace(/\s/g, "").replace(",", "."); return s === "" ? NaN : Number(s); }

  // ---------- Graph ----------
  function plot(sv, o){
    leer(sv); var W = o.W || 420, H = o.H || 420, L = 34, R = W - 10, T = 10, B = H - 26;
    sv.setAttribute("viewBox", "0 0 " + W + " " + H);
    var X = function(x){ return L + (x - o.x0) / (o.x1 - o.x0) * (R - L); }, Y = function(y){ return B - (y - o.y0) / (o.y1 - o.y0) * (B - T); };
    function schritt(sp){ var r = sp / 8, z = Math.pow(10, Math.floor(Math.log10(r))); return [1, 2, 5, 10].map(function(m){ return m * z; }).filter(function(x){ return x >= r; })[0]; }
    var sx = o.sx || schritt(o.x1 - o.x0), sy = o.sy || schritt(o.y1 - o.y0);
    for(var x = Math.ceil(o.x0 / sx) * sx; x <= o.x1 + 1e-9; x += sx){ sv.appendChild(el("line", { x1: X(x), y1: T, x2: X(x), y2: B, "class": "gitter" })); if(Math.abs(x) > 1e-9) sv.appendChild(el("text", { x: X(x), y: Math.min(B, Math.max(T + 12, Y(0) + 15)), "class": "ko-zahl" }, zahl(x, 3))); }
    for(var y = Math.ceil(o.y0 / sy) * sy; y <= o.y1 + 1e-9; y += sy){ sv.appendChild(el("line", { x1: L, y1: Y(y), x2: R, y2: Y(y), "class": "gitter" })); if(Math.abs(y) > 1e-9) sv.appendChild(el("text", { x: Math.max(L - 6, Math.min(R - 20, X(0) - 6)), y: Y(y) + 4, "class": "ko-zahl", style: "text-anchor:end" }, zahl(y, 3))); }
    if(o.y0 <= 0 && o.y1 >= 0) sv.appendChild(el("line", { x1: L, y1: Y(0), x2: R, y2: Y(0), "class": "achse" }));
    if(o.x0 <= 0 && o.x1 >= 0) sv.appendChild(el("line", { x1: X(0), y1: T, x2: X(0), y2: B, "class": "achse" }));
    if(o.asym != null && o.asym > o.y0 && o.asym < o.y1) sv.appendChild(el("line", { x1: L, y1: Y(o.asym), x2: R, y2: Y(o.asym), "class": "asym" }));
    (o.kurven || []).forEach(function(k){
      var d = "", an = false;
      for(var i = 0; i <= 400; i++){ var xx = o.x0 + (o.x1 - o.x0) * i / 400, yy = k.f(xx);
        if(!isFinite(yy) || yy > o.y1 + (o.y1 - o.y0) || yy < o.y0 - (o.y1 - o.y0)){ an = false; continue; }
        d += (an ? "L" : "M") + X(xx).toFixed(1) + " " + Y(yy).toFixed(1); an = true; }
      var clip = "c" + Math.random().toString(36).slice(2);
      var cp = el("clipPath", { id: clip }); cp.appendChild(el("rect", { x: L, y: T, width: R - L, height: B - T })); sv.appendChild(cp);
      k._el = el("path", { d: d, "class": k.cls || "graph", "clip-path": "url(#" + clip + ")" }); sv.appendChild(k._el);
    });
    (o.treppe || []).forEach(function(s){
      if(s.y1 < o.y0 || s.y1 > o.y1 || s.y2 < o.y0 || s.y2 > o.y1) return;
      sv.appendChild(el("path", { d: "M" + X(s.x1) + " " + Y(s.y1) + " H" + X(s.x2) + " V" + Y(s.y2), "class": "treppe" }));
      sv.appendChild(el("text", { x: X(s.x2) + 5, y: (Y(s.y1) + Y(s.y2)) / 2 + 5, "class": "treppeT" }, s.txt));
    });
    (o.punkte || []).forEach(function(p){ if(p[1] >= o.y0 && p[1] <= o.y1 && p[0] >= o.x0 && p[0] <= o.x1){ sv.appendChild(el("circle", { cx: X(p[0]), cy: Y(p[1]), r: 6, "class": "punkt" })); if(p[2]) sv.appendChild(el("text", { x: X(p[0]) + 8, y: Y(p[1]) - 8, "class": "treppeT", style: "fill:#1d4ed8" }, p[2])); } });
    // Werte ablesen + Wertetabelle (/graph-ablesen.js), nur bei Erkunden-Graphen (o.abl)
    if(window.MS_ABL){ if(o.abl) MS_ABL.an(sv, { x0: o.x0, x1: o.x1, y0: o.y0, y1: o.y1, L: L, R: R, T: T, B: B, xName: o.abl.x || "x",
      kurven: (o.kurven || []).map(function(k, i){ return o.abl.namen[i] ? { f: k.f, el: k._el, name: o.abl.namen[i] } : null; }) }); else MS_ABL.aus(sv); }
  }

  // ---------- Reiter Parameter ----------
  var form = "b", P = { a: 1, b: 2, c: 0, d: 0, k: 0.7 };
  var REGLER = { b: [["a", -3, 3, 0.1], ["b", 0.1, 4, 0.05], ["c", -3, 3, 0.5], ["d", -3, 3, 0.5]], e: [["a", -3, 3, 0.1], ["k", -2, 2, 0.05], ["d", -3, 3, 0.5]] };
  function reglerBauen(){
    var box = $("regler"); box.innerHTML = "";
    REGLER[form].forEach(function(r){
      var l = document.createElement("label"); l.innerHTML = "<span>" + (window.MS_TIPP ? MS_TIPP.s(r[0], t("tip_" + r[0])) : r[0]) + " =</span>";
      var inp = document.createElement("input"); inp.type = "range"; inp.min = r[1]; inp.max = r[2]; inp.step = r[3]; inp.value = P[r[0]]; inp.id = "r_" + r[0];
      var w = document.createElement("b"); w.id = "w_" + r[0];
      inp.addEventListener("input", function(){ P[r[0]] = Number(inp.value); if(r[0] === "a" && Math.abs(P.a) < 0.05){ P.a = 0.1; } param(); });
      l.appendChild(inp); l.appendChild(w); box.appendChild(l);
    });
  }
  function fP(){ return form === "e" ? function(x){ return P.a * Math.exp(P.k * x) + P.d; } : function(x){ return P.a * Math.pow(P.b, x - P.c) + P.d; }; }
  function formelHTML(){
    var a = P.a, s = "f(x) = ";
    s += (a === 1 ? "" : a === -1 ? "−" : zahl(a) + " · ");
    if(form === "e") s += "e<sup>" + (P.k === 1 ? "" : P.k === -1 ? "−" : zahl(P.k) + "·") + "x</sup>";
    else s += zahl(P.b) + "<sup>" + (P.c === 0 ? "x" : "x " + (P.c > 0 ? "− " + zahl(P.c) : "+ " + zahl(-P.c))) + "</sup>";
    if(P.d) s += (P.d > 0 ? " + " : " − ") + zahl(Math.abs(P.d));
    return s;
  }
  function param(){
    REGLER[form].forEach(function(r){ $("w_" + r[0]).textContent = zahl(P[r[0]]); });
    $("formel").innerHTML = formelHTML();
    var f = fP(), b = form === "e" ? Math.exp(P.k) : P.b, a = P.a, d = P.d, c = form === "e" ? 0 : P.c;
    var tr = []; for(var x = -2; x < 4; x++){ var y1 = f(x), y2 = f(x + 1); if(Math.abs(b - 1) > 1e-9) tr.push({ x1: x, y1: y1, x2: x + 1, y2: y2, txt: "· " + zahl(b) }); }
    plot($("gSvg"), { x0: -4, x1: 6, y0: -4, y1: 10, sx: 1, sy: 1, kurven: [{ f: f }], abl: { namen: ["f(x)"] }, asym: d, treppe: b > 1 ? tr.slice(2, 5) : tr.slice(0, 3), punkte: [[0, f(0)]] });
    var E = [];
    var mono = Math.abs(b - 1) < 1e-9 ? "konst" : (a > 0) === (b > 1) ? "steigt" : "faellt";
    E.push("<b>" + t("monoL") + "</b> " + t("m_" + mono) + (mono === "konst" ? "" : " " + t(b > 1 ? "grund_wachs" : "grund_zerf", { b: bdi(zahl(b)) })));
    E.push("<b>" + t("asymL") + "</b> " + bdi("y = " + zahl(d)));
    E.push("<b>" + t("syL") + "</b> " + bdi("(0 | " + zg(f(0)) + ")"));
    var q = -d / a;
    if(mono !== "konst" && q > 0){ var x0 = c + Math.log(q) / Math.log(b); E.push("<b>" + t("nsL") + "</b> " + bdi("x " + (genau(x0) ? "=" : "≈") + " " + zahl(x0))); }
    else E.push("<b>" + t("nsL") + "</b> " + t("keineNS"));
    E.push("<b>" + t("wbL") + "</b> " + bdi(a > 0 ? "y > " + zahl(d) : "y < " + zahl(d)));
    if(form === "e") E.push(t("eUmrech", { k: bdi(zahl(P.k)), b: bdi(zahl(b, 3)) }));
    $("eigen").innerHTML = E.join("<br>");
    var h = "<tr><th>x</th>" + [-2, -1, 0, 1, 2, 3].map(function(x){ return "<td>" + zahl(x) + "</td>"; }).join("") + "</tr><tr><th>f(x)</th>" + [-2, -1, 0, 1, 2, 3].map(function(x){ return "<td>" + zahl(f(x)) + "</td>"; }).join("") + "</tr>";
    $("wt").innerHTML = h;
    $("pMerke").textContent = t(form === "e" ? "merkE" : "merkB");
  }
  $("form").querySelectorAll("button").forEach(function(b){ b.addEventListener("click", function(){ form = b.dataset.f; $("form").querySelectorAll("button").forEach(function(x){ x.setAttribute("aria-pressed", x === b ? "true" : "false"); }); reglerBauen(); param(); }); });

  // ---------- Reiter Wachstum ----------
  // Modelle: [art, N0, Wert (p % oder T), Dauer, Einheit Zeit, Einheit Menge]
  var MODELLE = {
    bakterien: ["verdopp", 100, 20, 120, "min", "stk"], zins: ["prozent", 1000, 3, 30, "j", "geld"], bevoelkerung: ["prozent", 8, 1, 50, "j", "mrd"],
    jod: ["halb", 1000, 8, 40, "d", "mg"], medikament: ["prozent", 400, -15, 12, "h", "mg"], eigen: ["prozent", 100, 10, 10, "s", "x"]
  };
  var mod = "bakterien";
  function eingabenBauen(){
    var M = MODELLE[mod], box = $("mEing"); box.innerHTML = "";
    [["N0", mod === "zins" && (lang === "ja" || lang === "ru") ? M[1] * 100 : M[1], "n0L"], ["w", M[2], M[0] === "prozent" ? "pL" : M[0] === "verdopp" ? "tdL" : "thL"], ["dauer", M[3], "dauerL"]].forEach(function(e){
      var l = document.createElement("label"), sp = document.createElement("span"); sp.textContent = t(e[2]); l.appendChild(sp);
      var inp = document.createElement("input"); inp.className = "zahl"; inp.id = "m_" + e[0]; inp.value = komma() ? String(e[1]).replace(".", ",") : e[1]; inp.setAttribute("inputmode", "decimal"); inp.addEventListener("input", wachstum); l.appendChild(inp);
      var u = document.createElement("span"); u.className = "einh"; u.textContent = e[0] === "N0" ? (M[5] === "x" ? "" : t("u_" + M[5])) : e[0] === "w" && M[0] === "prozent" ? "%" : t("z_" + M[4]); l.appendChild(u);
      box.appendChild(l);
    });
  }
  function wachstum(){
    var M = MODELLE[mod], N0 = lies($("m_N0").value), w = lies($("m_w").value), D = lies($("m_dauer").value);
    var ok = N0 > 0 && D > 0 && D <= 1000 && (M[0] === "prozent" ? w > -100 && w !== 0 : w > 0);
    $("mFehler").textContent = ok ? "" : t("fehler");
    $("mText").textContent = t("mt_" + mod);
    if(!ok){ leer($("wSvg")); ["mFormel", "mErg", "mTab"].forEach(function(id){ $(id).innerHTML = ""; }); return; }
    var q, zt = t("z_" + M[4]), me = M[5] === "x" ? "" : t("u_" + M[5]);
    if(M[0] === "prozent") q = 1 + w / 100; else if(M[0] === "verdopp") q = Math.pow(2, 1 / w); else q = Math.pow(0.5, 1 / w);
    var N = function(x){ return N0 * Math.pow(q, x); }, lin = function(x){ return Math.max(q < 1 ? 0 : -Infinity, N0 + (N(1) - N0) * x); };
    $("mFormel").innerHTML = M[0] === "prozent" ? bdi("N(t) = " + zahl(N0) + " · " + zahl(q, 4) + "<sup>t</sup>") : bdi("N(t) = " + zahl(N0) + " · " + (M[0] === "verdopp" ? "2" : "0,5".replace(",", komma() ? "," : ".")) + "<sup>t : " + zahl(w) + "</sup>");
    var E = [];
    E.push("<b>" + t("faktorL") + "</b> " + bdi("q " + (genau(q, 4) ? "=" : "≈") + " " + zahl(q, 4)) + " " + t(q > 1 ? "proSchrittPlus" : "proSchrittMinus", { p: bdi(zahl(Math.abs(q - 1) * 100, 2) + " %"), z: zt }));
    E.push("<b>" + t("endeL", { t: bdi(zahl(D) + " " + zt) }) + "</b> " + bdi(zg(N(D)) + (me ? " " + me : "")));
    var T = Math.log(2) / Math.abs(Math.log(q));
    E.push("<b>" + t(q > 1 ? "verdoppL" : "halbL") + "</b> " + bdi(zg(T) + " " + zt));
    E.push(t("linVergl", { l: bdi(zg(lin(D)) + (me ? " " + me : "")), e: bdi(zg(N(D)) + (me ? " " + me : "")) }));
    $("mErg").innerHTML = E.join("<br>");
    var ymax = Math.max(N(0), N(D), lin(D)) * 1.1, ymin = Math.min(0, lin(D));
    plot($("wSvg"), { W: 420, H: 300, x0: 0, x1: D, y0: ymin, y1: ymax, kurven: [{ f: N }, { f: lin, cls: "graph2" }], abl: { x: "t", namen: ["N(t)", t("legLin")] }, asym: 0, punkte: [[D, N(D)]] });
    $("mLeg").innerHTML = '<span><i style="border-color:#2563eb"></i>' + t("legExp") + '</span><span><i style="border-color:#f59e0b;border-top-style:dashed"></i>' + t("legLin") + "</span>";
    var schritt = Math.max(1, Math.ceil(D / 20)), h = "<tr><th>t (" + zt + ")</th><th>N(t)</th><th>" + t("legLin") + "</th></tr>";
    for(var x = 0; x <= D + 1e-9; x += schritt) h += "<tr><td>" + zahl(x) + "</td><td>" + zahl(N(x)) + "</td><td>" + zahl(lin(x)) + "</td></tr>";
    $("mTab").innerHTML = h;
    $("mMerke").textContent = t("mMerke");
  }
  $("modell").addEventListener("change", function(){ mod = $("modell").value; eingabenBauen(); wachstum(); });

  // ---------- Reiter Üben ----------
  var auf = null, punkte = 0, anzahl = 0, beantwortet = false, letzte = null;
  function neueAufgabe(){
    beantwortet = false; letzte = null;
    var typ = wahl(["wert", "faktor", "zweiP", "halb", "verdopp", "mono", "ablesen"]), A = { typ: typ };
    if(typ === "wert"){ A.a = wahl([1, 2, 3, 5, 0.5]); A.b = wahl([2, 3, 0.5, 1.5, 4]); A.x = wahl([-2, -1, 2, 3, 4]); A.l = A.a * Math.pow(A.b, A.x); }
    else if(typ === "faktor"){ A.p = wahl([2, 3, 5, 8, 12, 20, 25, 40]) * wahl([1, -1]); A.l = 1 + A.p / 100; }
    else if(typ === "zweiP"){ A.a = zuf(1, 5); A.b = wahl([2, 3, 0.5, 4]); A.x = wahl([2, 3]); A.l = A.b; A.y = A.a * Math.pow(A.b, A.x); }
    else if(typ === "halb"){ A.T = wahl([2, 3, 5, 8, 10]); A.n = zuf(2, 4); A.N0 = Math.pow(2, A.n) * zuf(2, 10); A.t = A.T * A.n; A.l = A.N0 / Math.pow(2, A.n); }
    else if(typ === "verdopp"){ A.T = wahl([2, 3, 4, 20, 30]); A.n = zuf(2, 5); A.N0 = zuf(2, 12) * 10; A.t = A.T * A.n; A.l = A.N0 * Math.pow(2, A.n); }
    else if(typ === "mono"){ A.a = wahl([2, 3, 0.5, -1, -2]); A.b = wahl([1.5, 2, 3, 0.2, 0.5, 0.8]); A.l = (A.a > 0) === (A.b > 1); }
    else { A.a = zuf(1, 4); A.b = wahl([2, 3, 0.5]); A.l = A.b; }
    auf = A; zeige();
  }
  function fTxt(a, b){ return (a === 1 ? "" : zahl(a) + " · ") + zahl(b) + "<sup>x</sup>"; }
  function zeige(){
    var A = auf, Z = $("antwortzeile"), sv = $("uSvg");
    sicht(sv, A.typ === "ablesen");
    if(A.typ === "wert") $("auftrag").innerHTML = t("u_wert", { f: bdi("f(x) = " + fTxt(A.a, A.b)), x: bdi(zahl(A.x)) });
    else if(A.typ === "faktor") $("auftrag").innerHTML = t(A.p > 0 ? "u_faktorPlus" : "u_faktorMinus", { p: bdi(zahl(Math.abs(A.p)) + " %") });
    else if(A.typ === "zweiP") $("auftrag").innerHTML = t("u_zweiP", { p: bdi("(0 | " + zahl(A.a) + ")"), q: bdi("(" + A.x + " | " + zahl(A.y) + ")") });
    else if(A.typ === "halb") $("auftrag").innerHTML = t("u_halb", { T: bdi(A.T + " " + t("z_d")), N: bdi(A.N0 + " g"), t: bdi(A.t + " " + t("z_d")) });
    else if(A.typ === "verdopp") $("auftrag").innerHTML = t("u_verdopp", { T: bdi(A.T + " " + t("z_h")), N: bdi(String(A.N0)), t: bdi(A.t + " " + t("z_h")) });
    else if(A.typ === "mono") $("auftrag").innerHTML = t("u_mono", { f: bdi("f(x) = " + fTxt(A.a, A.b)) });
    else { $("auftrag").innerHTML = t("u_ablesen"); var f = function(x){ return A.a * Math.pow(A.b, x); }; plot(sv, { W: 420, H: 300, x0: -3, x1: 4, y0: -1, y1: Math.max(9, A.a * 1.2), sx: 1, sy: 1, kurven: [{ f: f }], asym: 0, punkte: [[0, f(0), "(0 | " + zahl(f(0)) + ")"], [1, f(1), "(1 | " + zahl(f(1)) + ")"]] }); }
    $("meldung").textContent = ""; $("meldung").className = "meldung"; sicht($("uLauf"), false); Z.innerHTML = "";
    if(A.typ === "mono") [["steigt", true], ["faellt", false]].forEach(function(x){ var b = document.createElement("button"); b.type = "button"; b.className = "knopf"; b.textContent = t("m_" + x[0]); b.addEventListener("click", function(){ pruefe(x[1]); }); Z.appendChild(b); });
    else {
      var inp = document.createElement("input"); inp.className = "zahl"; inp.id = "uAntwort"; inp.setAttribute("inputmode", "decimal"); inp.setAttribute("autocomplete", "off"); inp.style.width = "130px";
      inp.addEventListener("keydown", function(e){ if(e.key === "Enter") pruefe(inp.value); });
      var pb = document.createElement("button"); pb.type = "button"; pb.className = "knopf"; pb.id = "pruefen"; pb.textContent = t("pruefen"); pb.addEventListener("click", function(){ pruefe(inp.value); });
      Z.appendChild(inp); Z.appendChild(pb);
    }
    $("weiter").textContent = t("weiterA"); $("punkte").textContent = t("punkte", { p: punkte, n: anzahl });
  }
  function pruefe(e){
    if(beantwortet) return;
    var A = auf, ok, lt, L = [];
    if(A.typ === "mono"){ ok = e === A.l; lt = t(A.l ? "m_steigt" : "m_faellt"); L.push(t(A.b > 1 ? "grund_wachs" : "grund_zerf", { b: bdi(zahl(A.b)) }) + " " + (A.a < 0 ? t("aNeg") : "")); }
    else {
      var v = lies(e); if(!isFinite(v)) return;
      ok = Math.abs(v - A.l) <= Math.max(0.011, Math.abs(A.l) * 0.003); lt = zg(A.l, 4);
      if(A.typ === "wert") L.push(bdi("f(" + zahl(A.x) + ") = " + (A.a === 1 ? "" : zahl(A.a) + " · ") + zahl(A.b) + "<sup>" + zahl(A.x) + "</sup> = " + zahl(A.l, 4)));
      else if(A.typ === "faktor") L.push(bdi("q = 1 " + (A.p > 0 ? "+ " : "− ") + zahl(Math.abs(A.p) / 100) + " = " + zahl(A.l)));
      else if(A.typ === "zweiP"){ L.push(bdi("a = " + zahl(A.a)) + " " + t("ausP0")); L.push(bdi(zahl(A.a) + " · b<sup>" + A.x + "</sup> = " + zahl(A.y) + " → b<sup>" + A.x + "</sup> = " + zahl(A.y / A.a) + " → b = " + zahl(A.b))); }
      else if(A.typ === "halb") L.push(bdi(A.t + " : " + A.T + " = " + A.n) + " " + t("halbN", { n: A.n }) + " " + bdi(A.N0 + " · 0,5".replace(",", komma() ? "," : ".") + "<sup>" + A.n + "</sup> = " + zahl(A.l) + " g"));
      else if(A.typ === "verdopp") L.push(bdi(A.t + " : " + A.T + " = " + A.n) + " " + t("verdN", { n: A.n }) + " " + bdi(A.N0 + " · 2<sup>" + A.n + "</sup> = " + zahl(A.l)));
      else L.push(t("ablesenWeg", { a: bdi(zahl(A.a)), y: bdi(zahl(A.a * A.b)), b: bdi(zahl(A.b)) }));
    }
    letzte = e; beantwortet = true; anzahl++; if(ok) punkte++;
    var m = $("meldung"); m.className = "meldung " + (ok ? "gut" : "schlecht"); m.innerHTML = ok ? t("richtig") + " " + bdi(lt) : t("falsch", { l: bdi(lt) });
    if(A.typ === "mono") $("antwortzeile").querySelectorAll("button").forEach(function(b){ b.disabled = true; });
    $("uLauf").innerHTML = L.map(function(s){ return "<li>" + s + "</li>"; }).join(""); sicht($("uLauf"), true);
    $("punkte").textContent = t("punkte", { p: punkte, n: anzahl });
  }
  $("weiter").addEventListener("click", neueAufgabe);

  // ---------- Reiter & Texte ----------
  var tab = "param", TABS = ["param", "wachstum", "ueben"];
  function zeigeTab(k){
    tab = k;
    document.querySelectorAll(".tabs button").forEach(function(b){ b.setAttribute("aria-selected", b.dataset.tab === k ? "true" : "false"); });
    TABS.forEach(function(x){ sicht($("s_" + x), x === k); });
    if(k === "ueben" && !auf) neueAufgabe();
    alles(true);
  }
  document.querySelectorAll(".tabs button").forEach(function(b){ b.addEventListener("click", function(){ zeigeTab(b.dataset.tab); }); });
  function alles(nurRechnen){
    if(!nurRechnen){
      document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.title = "miStudia – " + t("titel"); $("titel").textContent = t("titel");
      document.querySelectorAll(".tabs button").forEach(function(b){ b.textContent = t("tab_" + b.dataset.tab); });
      reglerBauen(); if($("tippHinweis")) $("tippHinweis").textContent = window.MS_TIPP ? MS_TIPP.hinweis(lang) : "";
      $("modell").innerHTML = Object.keys(MODELLE).map(function(k){ return '<option value="' + k + '">' + t("mo_" + k) + "</option>"; }).join(""); $("modell").value = mod;
      $("tModell").textContent = t("modellL");
      var alt = $("m_N0") ? [$("m_N0").value, $("m_w").value, $("m_dauer").value] : null; eingabenBauen(); if(alt){ $("m_N0").value = alt[0]; $("m_w").value = alt[1]; $("m_dauer").value = alt[2]; }
    }
    if(tab === "param") param(); else if(tab === "wachstum") wachstum();
    if(!nurRechnen && auf){ var war = beantwortet, e = letzte, gut = $("meldung").classList.contains("gut"); zeige(); if(war){ beantwortet = false; anzahl--; if(gut) punkte--; if($("uAntwort")) $("uAntwort").value = e; pruefe(e); } }
  }
  window.MS_LANG = { apply: function(l){ if(EX[l]){ lang = l; alles(); } } };
  alles();
})();
