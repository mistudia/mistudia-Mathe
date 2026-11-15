// ============================================================
// symmetrie/app.js – Symmetrie
// Zeichnen: Kästchen anmalen, das Spiegelbild entsteht sofort (Achse
//   senkrecht, waagerecht, beide, diagonal; Punktsymmetrie; Drehung 4×).
// Figuren: Vierecke, Dreiecke, Vielecke, Kreis, Buchstaben – Achsen,
//   Punkt- und Drehsymmetrie werden aus der Figur berechnet; Drehregler.
// Koordinaten: Dreieck (Ecken ziehbar) an x-/y-Achse, Ursprung, y = x spiegeln.
// Graphen: Achsensymmetrie zur y-Achse / Punktsymmetrie zum Ursprung,
//   eigene Polynome über /funktionen/kern.js (FK).
// Üben: Achsen zählen, punktsymmetrisch?, Punkt spiegeln, Figur ergänzen,
//   Symmetrie einer Funktion.
// Texte: symmetrie/texte.js (SY), Sprache aus dem Startmenü (MS_LANG).
// ============================================================
(function(){
  "use strict";
  var NS = "http://www.w3.org/2000/svg", lang = "de";
  function $(id){ return document.getElementById(id); }
  function t(k, v){ var s = (SY[lang] && SY[lang][k]) || SY.de[k] || k; if(v) for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  function el(n, a, txt){ var e = document.createElementNS(NS, n); for(var k in a) if(a[k] != null) e.setAttribute(k, a[k]); if(txt != null) e.textContent = txt; return e; }
  function leer(s){ while(s.lastChild) s.removeChild(s.lastChild); }
  function sicht(e, an){ if(an) e.removeAttribute("hidden"); else e.setAttribute("hidden", ""); }
  function bdi(s){ return '<bdi dir="ltr">' + s + "</bdi>"; }
  function zuf(a, b){ return a + Math.floor(Math.random() * (b - a + 1)); }
  function wahl(L){ return L[Math.floor(Math.random() * L.length)]; }
  function komma(){ return !(lang === "en" || lang === "zh" || lang === "ja" || lang === "ar"); }
  function zahl(v, d){ if(d == null) d = 2; var r = Math.round(v * Math.pow(10, d)) / Math.pow(10, d); if(Object.is(r, -0)) r = 0; var s = String(Math.abs(r)); if(s.indexOf("e") >= 0) s = Math.abs(r).toFixed(d); if(komma()) s = s.replace(".", ","); return (r < 0 ? "−" : "") + s; }
  function wahlKnoepfe(box, liste, aktiv, klick){
    box.innerHTML = ""; liste.forEach(function(k){ var b = document.createElement("button"); b.type = "button"; b.textContent = t(k[1] || k[0]); b.dataset.k = k[0]; b.setAttribute("aria-pressed", k[0] === aktiv ? "true" : "false"); b.addEventListener("click", function(){ klick(k[0]); }); box.appendChild(b); });
  }

  // ---------- Reiter Zeichnen ----------
  var N = 12, ZG = 40, modus = "senk", farbe = 0, zellen = {};
  var FARBEN = ["#2563eb", "#dc2626", "#16a34a", "#f59e0b", "#7c3aed"];
  var MODI = ["senk", "waag", "beide", "diag", "punkt", "dreh4"];
  function bilder(r, c, m){
    var L = [[r, c]], M = N - 1;
    if(m === "senk") L.push([r, M - c]);
    else if(m === "waag") L.push([M - r, c]);
    else if(m === "beide") L.push([r, M - c], [M - r, c], [M - r, M - c]);
    else if(m === "diag") L.push([c, r]);
    else if(m === "punkt") L.push([M - r, M - c]);
    else if(m === "dreh4") L.push([c, M - r], [M - r, M - c], [M - c, r]);
    return L;
  }
  function zeichnen(){
    var sv = $("raster"); leer(sv);
    for(var r = 0; r < N; r++) for(var c = 0; c < N; c++){
      var f = zellen[r + "," + c];
      sv.appendChild(el("rect", { x: c * ZG, y: r * ZG, width: ZG, height: ZG, "class": "zelle", style: f != null ? "fill:" + FARBEN[f] : null }));
    }
    achsenZeichnen(sv, modus, N * ZG);
    $("zErkl").textContent = t("m_" + modus + "E");
  }
  function achsenZeichnen(sv, m, W){
    var h = W / 2;
    if(m === "senk" || m === "beide") sv.appendChild(el("line", { x1: h, y1: -4, x2: h, y2: W + 4, "class": "achse" }));
    if(m === "waag" || m === "beide") sv.appendChild(el("line", { x1: -4, y1: h, x2: W + 4, y2: h, "class": "achse" }));
    if(m === "diag") sv.appendChild(el("line", { x1: 0, y1: 0, x2: W, y2: W, "class": "achse" }));
    if(m === "punkt" || m === "dreh4" || m === "beide") sv.appendChild(el("circle", { cx: h, cy: h, r: 8, "class": "zentrum" }));
  }
  function zelleAus(ev, sv, n, w){
    var p = sv.createSVGPoint(); p.x = ev.clientX; p.y = ev.clientY; var q = p.matrixTransform(sv.getScreenCTM().inverse());
    var c = Math.floor(q.x / w), r = Math.floor(q.y / w); return r >= 0 && r < n.r && c >= 0 && c < n.c ? [r, c] : null;
  }
  (function(){
    var sv = $("raster"), aktion = null, letzte = "";
    function setze(rc){
      if(!rc) return; var key = rc[0] + "," + rc[1]; if(key === letzte) return; letzte = key;
      bilder(rc[0], rc[1], modus).forEach(function(b){ var k = b[0] + "," + b[1]; if(aktion === "malen") zellen[k] = farbe; else delete zellen[k]; });
      zeichnen();
    }
    sv.addEventListener("pointerdown", function(e){ var rc = zelleAus(e, sv, { r: N, c: N }, ZG); if(!rc) return; e.preventDefault(); sv.setPointerCapture(e.pointerId); aktion = zellen[rc[0] + "," + rc[1]] === farbe ? "weg" : "malen"; letzte = ""; setze(rc); });
    sv.addEventListener("pointermove", function(e){ if(aktion) setze(zelleAus(e, sv, { r: N, c: N }, ZG)); });
    ["pointerup", "pointercancel"].forEach(function(n){ sv.addEventListener(n, function(){ aktion = null; }); });
  })();
  $("loeschen").addEventListener("click", function(){ zellen = {}; zeichnen(); });
  $("muster").addEventListener("click", function(){
    zellen = {}; var k = zuf(9, 15), r0 = zuf(1, 3);
    for(var i = 0; i < k; i++){ var r = Math.min(N - 1, r0 + zuf(0, 7)), c = zuf(1, 5), f = zuf(0, FARBEN.length - 1); bilder(r, c, modus).forEach(function(b){ zellen[b[0] + "," + b[1]] = f; }); }
    zeichnen();
  });
  function setzeModus(m){
    modus = m; var alt = zellen; zellen = {};
    for(var k in alt){ var p = k.split(",").map(Number); bilder(p[0], p[1], m).forEach(function(b){ zellen[b[0] + "," + b[1]] = alt[k]; }); }
    wahlKnoepfe($("modus"), MODI.map(function(x){ return [x, "m_" + x]; }), modus, setzeModus); zeichnen();
  }

  // ---------- Figuren: Symmetrie aus den Strecken berechnen ----------
  function vieleck(n, r, start){ var P = []; for(var i = 0; i < n; i++){ var a = (start + i * 360 / n) * Math.PI / 180; P.push([r * Math.cos(a), r * Math.sin(a)]); } return P; }
  var FIG = {
    quadrat: { p: [[-80, -80], [80, -80], [80, 80], [-80, 80]] },
    rechteck: { p: [[-115, -65], [115, -65], [115, 65], [-115, 65]] },
    raute: { p: [[0, -115], [70, 0], [0, 115], [-70, 0]] },
    parallelogramm: { p: [[-115, -60], [45, -60], [115, 60], [-45, 60]] },
    drachen: { p: [[0, -105], [75, -35], [0, 115], [-75, -35]] },
    trapez: { p: [[-60, -60], [60, -60], [115, 60], [-115, 60]] },
    trapezA: { p: [[-40, -60], [90, -60], [115, 60], [-115, 60]] },
    dreieckGS: { p: vieleck(3, 120, -90) },
    dreieckGSch: { p: [[0, -115], [65, 85], [-65, 85]] },
    dreieck: { p: [[-95, 75], [105, 75], [-25, -95]] },
    fuenfeck: { p: vieleck(5, 120, -90) },
    sechseck: { p: vieleck(6, 120, -90) },
    kreis: { kreis: 110 },
    bH: { l: [[[-50, -90], [-50, 90]], [[50, -90], [50, 90]], [[-50, 0], [50, 0]]] },
    bA: { l: [[[-62, 90], [0, -90]], [[0, -90], [62, 90]], [[-32, 15], [32, 15]]] },
    bE: { l: [[[-45, -90], [-45, 90]], [[-45, -90], [50, -90]], [[-45, 0], [35, 0]], [[-45, 90], [50, 90]]] },
    bN: { l: [[[-50, 90], [-50, -90]], [[-50, -90], [50, 90]], [[50, 90], [50, -90]]] },
    bZ: { l: [[[-55, -90], [55, -90]], [[55, -90], [-55, 90]], [[-55, 90], [55, 90]]] },
    bX: { l: [[[-60, -90], [60, 90]], [[60, -90], [-60, 90]]] },
    bT: { l: [[[-65, -90], [65, -90]], [[0, -90], [0, 90]]] }
  };
  var FIGLISTE = ["quadrat", "rechteck", "raute", "parallelogramm", "drachen", "trapez", "trapezA", "dreieckGS", "dreieckGSch", "dreieck", "fuenfeck", "sechseck", "kreis", "bH", "bA", "bE", "bT", "bN", "bZ", "bX"];
  function strecken(F){ if(F.l) return F.l; return F.p.map(function(p, i){ return [p, F.p[(i + 1) % F.p.length]]; }); }
  function spiegelL(p, th){ var c = Math.cos(2 * th), s = Math.sin(2 * th); return [c * p[0] + s * p[1], s * p[0] - c * p[1]]; }
  function drehP(p, ph){ var c = Math.cos(ph), s = Math.sin(ph); return [c * p[0] - s * p[1], s * p[0] + c * p[1]]; }
  function gleich(a, b){ return Math.abs(a[0] - b[0]) < 0.6 && Math.abs(a[1] - b[1]) < 0.6; }
  function deckt(S, f){
    return S.every(function(st){ var a = f(st[0]), b = f(st[1]); return S.some(function(u){ return (gleich(a, u[0]) && gleich(b, u[1])) || (gleich(a, u[1]) && gleich(b, u[0])); }); });
  }
  function symmetrien(F){
    if(F.kreis) return { achsen: null, dreh: null };
    var S = strecken(F), A = [], D = [];
    for(var g = 0; g < 180; g++){ var th = g * Math.PI / 180; if(deckt(S, function(p){ return spiegelL(p, th); })) A.push(g); }
    for(var w = 1; w < 360; w++){ var ph = w * Math.PI / 180; if(deckt(S, function(p){ return drehP(p, ph); })) D.push(w); }
    return { achsen: A, dreh: D };
  }
  var SYMCACHE = {};
  function sym(k){ return SYMCACHE[k] || (SYMCACHE[k] = symmetrien(FIG[k])); }
  function figurZeichnen(sv, k, o){
    o = o || {}; leer(sv); var F = FIG[k], Y = sym(k);
    function form(ph, cls){
      if(F.kreis) return el("circle", { cx: 0, cy: 0, r: F.kreis, "class": cls });
      if(F.p) return el("polygon", { points: F.p.map(function(p){ var q = drehP(p, ph); return q[0].toFixed(1) + "," + q[1].toFixed(1); }).join(" "), "class": cls });
      var g = el("g", {}); F.l.forEach(function(s){ var a = drehP(s[0], ph), b = drehP(s[1], ph); g.appendChild(el("line", { x1: a[0], y1: a[1], x2: b[0], y2: b[1], "class": cls })); }); return g;
    }
    sv.appendChild(form(0, F.l ? "figL" : "fig"));
    if(o.achsen){
      if(F.kreis){ for(var i = 0; i < 6; i++){ var a = i * Math.PI / 6; sv.appendChild(el("line", { x1: -150 * Math.cos(a), y1: -150 * Math.sin(a), x2: 150 * Math.cos(a), y2: 150 * Math.sin(a), "class": "achse" })); } }
      else Y.achsen.forEach(function(g){ var a = g * Math.PI / 180; sv.appendChild(el("line", { x1: -152 * Math.cos(a), y1: -152 * Math.sin(a), x2: 152 * Math.cos(a), y2: 152 * Math.sin(a), "class": "achse" })); });
      if(F.kreis || Y.dreh.length) sv.appendChild(el("circle", { cx: 0, cy: 0, r: 6, "class": "zentrum" }));
    }
    if(o.dreh != null && o.dreh % 360 !== 0){
      var ok = F.kreis || Y.dreh.indexOf(o.dreh) >= 0;
      var c = form(o.dreh * Math.PI / 180, (F.l ? "kopieL" : "kopie") + (ok ? " deckt" : "")); sv.appendChild(c);
      sv.appendChild(el("circle", { cx: 0, cy: 0, r: 5, fill: "#1a2233" }));
    }
  }
  function figInfo(k){
    var Y = sym(k), F = FIG[k], h = "";
    var anz = F.kreis ? t("unendlich") : String(Y.achsen.length);
    h += t("iAchsen") + " <b>" + anz + "</b><br>";
    var punkt = F.kreis || Y.dreh.indexOf(180) >= 0;
    h += t("iPunkt") + " <b>" + t(punkt ? "ja" : "nein") + "</b><br>";
    h += t("iDreh") + " <b>" + (F.kreis ? t("jederWinkel") : Y.dreh.length ? bdi(Y.dreh.map(function(w){ return w + "°"; }).join(", ")) : t("nein")) + "</b>";
    return h;
  }
  function figuren(){
    var k = $("figur").value || "quadrat", w = Number($("dreh").value);
    figurZeichnen($("figSvg"), k, { achsen: true, dreh: w });
    $("drehW").textContent = w + "°";
    var Y = sym(k), ok = w % 360 !== 0 && (FIG[k].kreis || Y.dreh.indexOf(w) >= 0);
    $("deckt").textContent = w % 360 === 0 ? "" : ok ? t("decktJa", { w: w }) : "";
    $("deckt").className = "meldung" + (ok ? " gut" : "");
    $("figInfo").innerHTML = figInfo(k);
    $("figErkl").textContent = t("figErkl");
  }
  $("figur").addEventListener("change", function(){ $("dreh").value = 0; figuren(); });
  $("dreh").addEventListener("input", function(){ // in der Nähe einer Deckdrehung einrasten
    var k = $("figur").value, w = Number($("dreh").value), Y = sym(k);
    if(Y.dreh) Y.dreh.forEach(function(d){ if(Math.abs(d - w) <= 3) $("dreh").value = d; });
    figuren();
  });

  // ---------- Reiter Koordinaten ----------
  var KO = { A: [1, 1], B: [5, 2], C: [2, 5] }, koArt = "y";
  var KOARTEN = ["x", "y", "o", "d"];
  function koBild(p, a){ return a === "x" ? [p[0], -p[1]] : a === "y" ? [-p[0], p[1]] : a === "o" ? [-p[0], -p[1]] : [p[1], p[0]]; }
  var KR = 7, KS = 420 / (2 * KR + 2);
  function kx(x){ return (x + KR + 1) * KS; } function ky(y){ return (KR + 1 - y) * KS; }
  function koSystem(sv){
    for(var i = -KR; i <= KR; i++){ sv.appendChild(el("line", { x1: kx(i), y1: ky(-KR), x2: kx(i), y2: ky(KR), "class": "gitter" })); sv.appendChild(el("line", { x1: kx(-KR), y1: ky(i), x2: kx(KR), y2: ky(i), "class": "gitter" })); }
    sv.appendChild(el("line", { x1: kx(-KR - 0.6), y1: ky(0), x2: kx(KR + 0.6), y2: ky(0), "class": "ko-achse" })); sv.appendChild(el("line", { x1: kx(0), y1: ky(-KR - 0.6), x2: kx(0), y2: ky(KR + 0.6), "class": "ko-achse" }));
    for(var j = -KR + 1; j < KR; j += 1){ if(!j || j % 2) continue; sv.appendChild(el("text", { x: kx(j), y: ky(0) + 16, "class": "ko-zahl" }, zahl(j, 0))); sv.appendChild(el("text", { x: kx(0) - 12, y: ky(j) + 4, "class": "ko-zahl" }, zahl(j, 0))); }
    sv.appendChild(el("text", { x: kx(KR + 0.6) - 4, y: ky(0) - 8, "class": "ko-zahl" }, "x")); sv.appendChild(el("text", { x: kx(0) + 12, y: ky(KR + 0.6) + 10, "class": "ko-zahl" }, "y"));
  }
  function pt(p){ return bdi("(" + zahl(p[0], 0) + " | " + zahl(p[1], 0) + ")"); }
  function koord(){
    var sv = $("koSvg"); leer(sv); koSystem(sv);
    if(koArt === "x") sv.appendChild(el("line", { x1: kx(-KR), y1: ky(0), x2: kx(KR), y2: ky(0), "class": "achse" }));
    if(koArt === "y") sv.appendChild(el("line", { x1: kx(0), y1: ky(-KR), x2: kx(0), y2: ky(KR), "class": "achse" }));
    if(koArt === "o") sv.appendChild(el("circle", { cx: kx(0), cy: ky(0), r: 6, "class": "zentrum" }));
    if(koArt === "d") sv.appendChild(el("line", { x1: kx(-KR), y1: ky(-KR), x2: kx(KR), y2: ky(KR), "class": "achse" }));
    var N3 = ["A", "B", "C"], B = {}; N3.forEach(function(n){ B[n] = koBild(KO[n], koArt); });
    N3.forEach(function(n){ sv.appendChild(el("line", { x1: kx(KO[n][0]), y1: ky(KO[n][1]), x2: kx(B[n][0]), y2: ky(B[n][1]), "class": "verb" })); });
    sv.appendChild(el("polygon", { points: N3.map(function(n){ return kx(KO[n][0]) + "," + ky(KO[n][1]); }).join(" "), "class": "dreieck" }));
    sv.appendChild(el("polygon", { points: N3.map(function(n){ return kx(B[n][0]) + "," + ky(B[n][1]); }).join(" "), "class": "bilddr" }));
    N3.forEach(function(n){
      sv.appendChild(el("circle", { cx: kx(B[n][0]), cy: ky(B[n][1]), r: 6, "class": "punktB" }));
      sv.appendChild(el("text", { x: kx(B[n][0]) + 9, y: ky(B[n][1]) - 8, "class": "plab", fill: "#dc2626" }, n + "′"));
      var c = el("circle", { cx: kx(KO[n][0]), cy: ky(KO[n][1]), r: 11, "class": "punkt", "data-n": n }); sv.appendChild(c);
      sv.appendChild(el("text", { x: kx(KO[n][0]) + 12, y: ky(KO[n][1]) - 10, "class": "plab", fill: "#2563eb" }, n));
    });
    $("koRegel").innerHTML = bdi(t("regel_" + koArt));
    $("koTab").innerHTML = "<tr><th></th><th>" + t("original") + "</th><th>" + t("bild") + "</th></tr>" + N3.map(function(n){ return "<tr><th>" + n + "</th><td>" + pt(KO[n]) + "</td><td>" + pt(B[n]) + "</td></tr>"; }).join("");
    $("koErkl").textContent = t("ko_" + koArt + "E");
  }
  (function(){
    var sv = $("koSvg"), zieh = null;
    function pos(e){ var p = sv.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; var q = p.matrixTransform(sv.getScreenCTM().inverse()); return [Math.max(-KR, Math.min(KR, Math.round(q.x / KS - KR - 1))), Math.max(-KR, Math.min(KR, Math.round(KR + 1 - q.y / KS)))]; }
    sv.addEventListener("pointerdown", function(e){
      var p = pos(e), best = null, bd = 1.6;
      ["A", "B", "C"].forEach(function(n){ var d = Math.hypot(KO[n][0] - p[0], KO[n][1] - p[1]); if(d < bd){ bd = d; best = n; } });
      if(best){ zieh = best; sv.setPointerCapture(e.pointerId); e.preventDefault(); }
    });
    sv.addEventListener("pointermove", function(e){ if(!zieh) return; var p = pos(e); if(p[0] !== KO[zieh][0] || p[1] !== KO[zieh][1]){ KO[zieh] = p; koord(); } });
    ["pointerup", "pointercancel"].forEach(function(n){ sv.addEventListener(n, function(){ zieh = null; }); });
  })();
  function setzeKoArt(a){ koArt = a; wahlKnoepfe($("koArt"), KOARTEN.map(function(x){ return [x, "ka_" + x]; }), koArt, setzeKoArt); koord(); }

  // ---------- Reiter Graphen ----------
  var FUNKS = [
    { k: "x^2" }, { k: "x^3" }, { k: "x^4 - 2x^2" }, { k: "x^3 - 3x" }, { k: "0.5x^2 + x" }, { k: "x^3 + 1" },
    { k: "|x|", f: Math.abs, s: "y" }, { k: "cos(x)", f: Math.cos, s: "y" }, { k: "sin(x)", f: Math.sin, s: "o" }, { k: "1/x", f: function(x){ return 1 / x; }, s: "o" }, { k: "eigen" }
  ];
  function polyInfo(txt){
    var p = FK.parse(txt); p = FK.trim ? FK.trim(p) : p;
    var gerade = true, ungerade = true, ex = [];
    p.forEach(function(c, i){ if(c.n !== 0){ ex.push(i); if(i % 2) gerade = false; else ungerade = false; } });
    if(!ex.length){ ungerade = true; gerade = true; }
    return { f: function(x){ return FK.wertN(p, x); }, s: gerade && ungerade ? "beide" : gerade ? "y" : ungerade ? "o" : "keine", ex: ex, txt: FK.ptxt(p) };
  }
  function gZeichnen(sv, f, s, o){
    o = o || {}; leer(sv); var R = 5, S = 420 / (2 * R + 1);
    var X = function(x){ return (x + R + 0.5) * S; }, Yy = function(y){ return (R + 0.5 - y) * S; };
    for(var i = -R; i <= R; i++){ sv.appendChild(el("line", { x1: X(i), y1: Yy(-R - 0.5), x2: X(i), y2: Yy(R + 0.5), "class": "gitter" })); sv.appendChild(el("line", { x1: X(-R - 0.5), y1: Yy(i), x2: X(R + 0.5), y2: Yy(i), "class": "gitter" })); }
    sv.appendChild(el("line", { x1: X(-R - 0.5), y1: Yy(0), x2: X(R + 0.5), y2: Yy(0), "class": "ko-achse" })); sv.appendChild(el("line", { x1: X(0), y1: Yy(-R - 0.5), x2: X(0), y2: Yy(R + 0.5), "class": "ko-achse" }));
    for(var j = -4; j <= 4; j += 2){ if(!j) continue; sv.appendChild(el("text", { x: X(j), y: Yy(0) + 15, "class": "ko-zahl" }, zahl(j, 0))); sv.appendChild(el("text", { x: X(0) - 12, y: Yy(j) + 4, "class": "ko-zahl" }, zahl(j, 0))); }
    if(s === "y" && o.achse !== false) sv.appendChild(el("line", { x1: X(0), y1: Yy(-R - 0.5), x2: X(0), y2: Yy(R + 0.5), "class": "achse" }));
    if(s === "o" && o.achse !== false) sv.appendChild(el("circle", { cx: X(0), cy: Yy(0), r: 6, "class": "zentrum" }));
    function kurve(g, cls){
      var d = "", an = false;
      for(var k = 0; k <= 600; k++){
        var x = -R - 0.5 + k * (2 * R + 1) / 600, y = g(x);
        if(!isFinite(y) || Math.abs(y) > R + 3){ an = false; continue; }
        d += (an ? "L" : "M") + X(x).toFixed(1) + " " + Yy(y).toFixed(1); an = true;
      }
      sv.appendChild(el("path", { d: d, "class": cls }));
    }
    kurve(f, "graph");
    if(o.spiegel) kurve(o.spiegel, "graphS");
  }
  function graph(){
    var k = $("funk").value || FUNKS[0].k, F = FUNKS.filter(function(x){ return x.k === k; })[0], info;
    sicht($("eigenBox"), k === "eigen"); $("gFehler").textContent = "";
    try { info = F.f ? { f: F.f, s: F.s, txt: k.replace("|x|", "|x|") } : polyInfo(k === "eigen" ? $("eigenF").value : k); }
    catch(e){ $("gFehler").textContent = t("gFehler"); leer($("gSvg")); ["gUrteil", "gTab", "gGrund"].forEach(function(id){ $(id).innerHTML = ""; }); return; }
    var f = info.f, s = info.s;
    var sp = s === "o" ? function(x){ return -f(-x); } : function(x){ return f(-x); };
    gZeichnen($("gSvg"), f, s === "beide" ? "y" : s, { spiegel: sp });
    var ur = s === "y" ? "gAchse" : s === "o" ? "gPunkt" : s === "beide" ? "gBeide" : "gKeine";
    $("gUrteil").className = "urteilZ " + (s === "keine" ? "nein" : "ja");
    $("gUrteil").innerHTML = bdi("f(x) = " + info.txt) + "<br>" + t(ur);
    var h = "<tr><th>x</th><th>" + bdi("f(x)") + "</th><th>" + bdi("f(−x)") + "</th><th>" + bdi("−f(−x)") + "</th></tr>";
    [1, 2, 0.5].forEach(function(x){ var a = f(x), b = f(-x); h += "<tr><td>" + zahl(x) + "</td><td>" + (isFinite(a) ? zahl(a) : "–") + "</td><td>" + (isFinite(b) ? zahl(b) : "–") + "</td><td>" + (isFinite(b) ? zahl(-b) : "–") + "</td></tr>"; });
    $("gTab").innerHTML = h;
    var g = "";
    if(info.ex) g = t("gExp", { e: bdi(info.ex.join(", ")) }) + " " + t(s === "y" || s === "beide" ? "gExpG" : s === "o" ? "gExpU" : "gExpM");
    else g = t(s === "y" ? "gTestY" : "gTestO");
    $("gGrund").innerHTML = g;
    $("gLeg").innerHTML = '<span><i style="border-color:#2563eb"></i>' + bdi("f(x)") + '</span><span><i style="border-color:#dc2626;border-top-style:dashed"></i>' + bdi(s === "o" ? "−f(−x)" : "f(−x)") + "</span>";
    $("gErkl").textContent = t("gErkl");
  }
  $("funk").addEventListener("change", graph); $("eigenF").addEventListener("input", graph);

  // ---------- Reiter Üben ----------
  var auf = null, punkte = 0, anzahl = 0, beantwortet = false, letzte = null;
  var UFIG = ["quadrat", "rechteck", "raute", "parallelogramm", "drachen", "trapez", "dreieckGS", "dreieckGSch", "dreieck", "fuenfeck", "sechseck", "bH", "bA", "bE", "bN", "bZ", "bX", "bT"];
  function neueAufgabe(){
    beantwortet = false; letzte = null;
    var r = Math.random(), typ = r < 0.2 ? "achsen" : r < 0.36 ? "punkt" : r < 0.6 ? "spiegelP" : r < 0.82 ? "ergaenze" : "funktion";
    if(typ === "achsen" || typ === "punkt"){ var k = wahl(UFIG); auf = { typ: typ, k: k, l: typ === "achsen" ? sym(k).achsen.length : sym(k).dreh.indexOf(180) >= 0 }; }
    else if(typ === "spiegelP"){ var P; do { P = [zuf(-6, 6), zuf(-6, 6)]; } while(!P[0] || !P[1] || P[0] === P[1]); var a = wahl(KOARTEN); auf = { typ: typ, P: P, a: a, l: koBild(P, a) }; }
    else if(typ === "ergaenze"){
      var ax = wahl(["senk", "waag"]), C = 8, R = 6, links = {}, n = zuf(6, 9);
      while(Object.keys(links).length < n){ var rr = zuf(0, R - 1), cc = zuf(0, C - 1); if(ax === "senk" && cc >= C / 2) cc -= C / 2; if(ax === "waag" && rr >= R / 2) rr -= R / 2; links[rr + "," + cc] = 1; }
      auf = { typ: typ, ax: ax, C: C, R: R, links: links, wahl: {} };
    } else {
      var art = wahl(["y", "o", "keine"]), ex = [], st;
      if(art === "y") ex = wahl([[4, 2, 0], [2, 0], [4, 2], [6, 2], [4, 0], [2]]);
      else if(art === "o") ex = wahl([[3, 1], [5, 3], [3], [5, 1], [5, 3, 1]]);
      else ex = wahl([[3, 2], [2, 1], [4, 1], [3, 0], [4, 3, 1], [2, 1, 0]]);
      st = ex.map(function(e, i){ var c = zuf(1, 5) * (i && Math.random() < 0.5 ? -1 : 1); if(e === ex[0]) c = Math.abs(c) === 1 && Math.random() < 0.5 ? 1 : c; return { c: c, e: e }; });
      var txt = st.map(function(o, i){ var a = Math.abs(o.c), s = (a === 1 && o.e ? "" : a) + (o.e ? "x" + (o.e > 1 ? "⁰¹²³⁴⁵⁶"[o.e] : "") : ""); return (i === 0 ? (o.c < 0 ? "−" : "") : o.c < 0 ? " − " : " + ") + s; }).join("");
      auf = { typ: typ, txt: txt, l: art };
    }
    zeige();
  }
  function uRaster(zeigeLoes){
    var sv = $("uRaster"), Z = 40, A = auf; leer(sv);
    sv.setAttribute("viewBox", "0 0 " + A.C * Z + " " + A.R * Z);
    for(var r = 0; r < A.R; r++) for(var c = 0; c < A.C; c++){
      var k = r + "," + c, gegeben = !!A.links[k], ziel = istZiel(r, c), gew = !!A.wahl[k];
      var fill = gegeben ? "#2563eb" : gew ? "#60a5fa" : "#ffffff";
      sv.appendChild(el("rect", { x: c * Z, y: r * Z, width: Z, height: Z, "class": "zelle", style: "fill:" + fill }));
      if(zeigeLoes && ziel && !gew) sv.appendChild(el("rect", { x: c * Z + 4, y: r * Z + 4, width: Z - 8, height: Z - 8, "class": "fehlt" }));
      if(zeigeLoes && gew && !ziel){ sv.appendChild(el("line", { x1: c * Z + 8, y1: r * Z + 8, x2: c * Z + Z - 8, y2: r * Z + Z - 8, "class": "falschZ" })); sv.appendChild(el("line", { x1: c * Z + Z - 8, y1: r * Z + 8, x2: c * Z + 8, y2: r * Z + Z - 8, "class": "falschZ" })); }
    }
    var W = A.C * Z, H = A.R * Z;
    if(A.ax === "senk") sv.appendChild(el("line", { x1: W / 2, y1: -4, x2: W / 2, y2: H + 4, "class": "achse" }));
    else sv.appendChild(el("line", { x1: -4, y1: H / 2, x2: W + 4, y2: H / 2, "class": "achse" }));
  }
  function istZiel(r, c){ var A = auf; if(A.ax === "senk") return c >= A.C / 2 && !!A.links[r + "," + (A.C - 1 - c)]; return r >= A.R / 2 && !!A.links[(A.R - 1 - r) + "," + c]; }
  (function(){
    var sv = $("uRaster");
    sv.addEventListener("pointerdown", function(e){
      if(!auf || auf.typ !== "ergaenze" || beantwortet) return;
      var rc = zelleAus(e, sv, { r: auf.R, c: auf.C }, 40); if(!rc) return;
      var frei = auf.ax === "senk" ? rc[1] >= auf.C / 2 : rc[0] >= auf.R / 2; if(!frei) return;
      var k = rc[0] + "," + rc[1]; if(auf.wahl[k]) delete auf.wahl[k]; else auf.wahl[k] = 1; uRaster(false);
    });
  })();
  function knopf(txt, f, cls){ var b = document.createElement("button"); b.type = "button"; b.className = "knopf" + (cls ? " " + cls : ""); b.textContent = txt; b.addEventListener("click", f); return b; }
  function zeige(){
    var A = $("auftrag"), Z = $("antwortzeile"); Z.innerHTML = "";
    $("meldung").textContent = ""; $("meldung").className = "meldung"; sicht($("uLauf"), false);
    sicht($("uSvg"), auf.typ === "achsen" || auf.typ === "punkt"); sicht($("uRaster"), auf.typ === "ergaenze");
    if(auf.typ === "achsen" || auf.typ === "punkt"){
      A.innerHTML = t(auf.typ === "achsen" ? "aufAchsen" : "aufPunkt", { f: t("f_" + auf.k) });
      figurZeichnen($("uSvg"), auf.k, {});
      if(auf.typ === "punkt"){ Z.appendChild(knopf(t("ja"), function(){ pruefe(true); })); Z.appendChild(knopf(t("nein"), function(){ pruefe(false); })); }
      else eingabe(Z, 1);
    } else if(auf.typ === "spiegelP"){
      A.innerHTML = t("aufSpiegel", { p: pt(auf.P), a: t("ka_" + auf.a + "L") });
      eingabe(Z, 2);
    } else if(auf.typ === "ergaenze"){
      A.innerHTML = t(auf.ax === "senk" ? "aufErgSenk" : "aufErgWaag"); uRaster(false);
      Z.appendChild(knopf(t("pruefen"), function(){ pruefe(null); }));
    } else {
      A.innerHTML = t("aufFunk", { f: bdi("f(x) = " + auf.txt) });
      [["y", "gAchseK"], ["o", "gPunktK"], ["keine", "gKeineK"]].forEach(function(x){ Z.appendChild(knopf(t(x[1]), function(){ pruefe(x[0]); }, "hell")); });
    }
    $("weiter").textContent = t("weiterA"); $("punkte").textContent = t("punkte", { p: punkte, n: anzahl });
  }
  function eingabe(Z, n){
    var ins = [];
    if(n === 2) Z.appendChild(document.createTextNode("P′ = ( "));
    for(var i = 0; i < n; i++){
      var inp = document.createElement("input"); inp.className = "zahl klein"; inp.id = "uA" + i; inp.setAttribute("inputmode", "text"); inp.setAttribute("autocomplete", "off");
      inp.addEventListener("keydown", function(e){ if(e.key === "Enter") los(); }); Z.appendChild(inp); ins.push(inp);
      if(n === 2 && i === 0) Z.appendChild(document.createTextNode(" | "));
    }
    if(n === 2) Z.appendChild(document.createTextNode(" )"));
    function los(){ pruefe(ins.map(function(x){ return x.value; })); }
    Z.appendChild(knopf(t("pruefen"), los));
    if(n === 2) Z.style.direction = "ltr"; else Z.style.direction = "";
  }
  function lies(s){ s = String(s).trim().replace(/[−–]/g, "-").replace(",", "."); return s === "" ? NaN : Number(s); }
  function pruefe(e){
    if(beantwortet) return;
    var ok, lt, L = [];
    if(auf.typ === "achsen"){ var v = lies(e[0]); if(!isFinite(v)) return; ok = v === auf.l; lt = String(auf.l); }
    else if(auf.typ === "punkt"){ ok = e === auf.l; lt = t(auf.l ? "ja" : "nein"); }
    else if(auf.typ === "spiegelP"){ var a = lies(e[0]), b = lies(e[1]); if(!isFinite(a) || !isFinite(b)) return; ok = a === auf.l[0] && b === auf.l[1]; lt = "P′" + pt(auf.l); }
    else if(auf.typ === "ergaenze"){
      ok = true; for(var r = 0; r < auf.R; r++) for(var c = 0; c < auf.C; c++) if(istZiel(r, c) !== !!auf.wahl[r + "," + c]) ok = false;
      lt = t("siehe");
    } else { ok = e === auf.l; lt = t(auf.l === "y" ? "gAchseK" : auf.l === "o" ? "gPunktK" : "gKeineK"); }
    letzte = e; beantwortet = true; anzahl++; if(ok) punkte++;
    if(auf.typ === "achsen" || auf.typ === "punkt"){ figurZeichnen($("uSvg"), auf.k, { achsen: true, dreh: auf.typ === "punkt" ? 180 : null }); L.push(figInfo(auf.k)); if(auf.typ === "punkt") L.push(t("punktErkl")); }
    else if(auf.typ === "spiegelP") L.push(t("regel_" + auf.a) + ": " + pt(auf.P) + " → " + pt(auf.l));
    else if(auf.typ === "ergaenze"){ uRaster(true); L.push(t("ergErkl")); }
    else { var ex = auf.txt; void ex; L.push(t(auf.l === "y" ? "gExpG" : auf.l === "o" ? "gExpU" : "gExpM")); L.push(t("gRegel")); }
    var me = $("meldung"); me.className = "meldung " + (ok ? "gut" : "schlecht"); me.innerHTML = ok ? t("richtig") : t("falsch", { l: lt });
    $("antwortzeile").querySelectorAll("button").forEach(function(b){ b.disabled = true; });
    $("uLauf").innerHTML = L.map(function(s){ return "<li>" + s + "</li>"; }).join(""); sicht($("uLauf"), true);
    $("punkte").textContent = t("punkte", { p: punkte, n: anzahl });
  }
  $("weiter").addEventListener("click", neueAufgabe);

  // ---------- Reiter & Texte ----------
  var tab = "zeichnen", TABS = ["zeichnen", "figuren", "koord", "graph", "ueben"];
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
      if(window.FK && FK.setLang) FK.setLang(lang);
      document.title = "miStudia – " + t("titel"); $("titel").textContent = t("titel");
      document.querySelectorAll(".tabs button").forEach(function(b){ b.textContent = t("tab_" + b.dataset.tab); });
      wahlKnoepfe($("modus"), MODI.map(function(x){ return [x, "m_" + x]; }), modus, setzeModus);
      $("farben").innerHTML = ""; FARBEN.forEach(function(f, i){ var b = document.createElement("button"); b.type = "button"; b.style.background = f; b.setAttribute("aria-label", t("farbe") + " " + (i + 1)); b.setAttribute("aria-pressed", i === farbe ? "true" : "false"); b.addEventListener("click", function(){ farbe = i; $("farben").querySelectorAll("button").forEach(function(x, j){ x.setAttribute("aria-pressed", j === i ? "true" : "false"); }); }); $("farben").appendChild(b); });
      $("muster").textContent = t("muster"); $("loeschen").textContent = t("loeschen"); $("zHinweis").textContent = t("zHinweis");
      var fv = $("figur").value || "quadrat"; $("figur").innerHTML = FIGLISTE.map(function(k){ return '<option value="' + k + '">' + t("f_" + k) + "</option>"; }).join(""); $("figur").value = fv;
      $("tFigur").textContent = t("figurL"); $("tDreh").textContent = t("drehL");
      wahlKnoepfe($("koArt"), KOARTEN.map(function(x){ return [x, "ka_" + x]; }), koArt, setzeKoArt); $("koHinweis").textContent = t("koHinweis");
      var gv = $("funk").value || FUNKS[0].k; $("funk").innerHTML = FUNKS.map(function(F){ return '<option value="' + F.k + '">' + (F.k === "eigen" ? t("eigeneF") : "f(x) = " + F.k.replace(/\^(\d)/g, function(m, d){ return "⁰¹²³⁴⁵⁶⁷⁸⁹"[d]; }).replace("0.5", komma() ? "0,5" : "0.5")) + "</option>"; }).join(""); $("funk").value = gv;
      $("tFunk").textContent = t("funkL");
    }
    if(tab === "zeichnen") zeichnen(); else if(tab === "figuren") figuren(); else if(tab === "koord") koord(); else if(tab === "graph") graph();
    if(!nurRechnen && auf){
      var war = beantwortet, e = letzte, gut = $("meldung").classList.contains("gut"); zeige();
      if(war){ beantwortet = false; anzahl--; if(gut) punkte--; if(Array.isArray(e)) e.forEach(function(v, i){ if($("uA" + i)) $("uA" + i).value = v; }); pruefe(e); }
    }
  }
  // Alltagsbeispiel laden (aus alltag-daten.js): {fig, dreh} → Figuren, {funk, eigen} → Graph
  window.MS_SYM = { laden: function(w){
    if(w.fig){ zeigeTab("figuren"); $("figur").value = w.fig; $("dreh").value = w.dreh || 0; figuren(); $("figur").scrollIntoView({ behavior: "smooth", block: "start" }); }
    else { zeigeTab("graph"); $("funk").value = w.funk; if(w.eigen) $("eigenF").value = w.eigen; graph(); $("funk").scrollIntoView({ behavior: "smooth", block: "start" }); }
  } };
  window.MS_LANG = { apply: function(l){ if(SY[l]){ lang = l; alles(); } } };
  alles();
})();
