// ============================================================
// flaechen/app.js – Umfang & Flächen
// Figuren: Quadrat, Rechteck, Parallelogramm, Dreieck, Trapez, Raute,
//   Drachen, Kreis – maßstäblich mit Kästchen, Formeln mit Einheiten.
// „Warum?“-Regler: Parallelogramm → Rechteck (Dreieck verschieben),
//   Dreieck/Trapez → Parallelogramm (Kopie drehen), Raute/Drachen im
//   Rechteck e·f, Kreis → Sektoren zu einem „Rechteck“ r · πr legen.
// Zusammengesetzt: L-Form – zerlegen oder ergänzen, Umfang wie Rechteck.
// Üben: Fläche/Umfang, rückwärts rechnen, L-Form.
// Texte: flaechen/texte.js (FL), Sprache aus dem Startmenü (MS_LANG).
// ============================================================
(function(){
  "use strict";
  var NS = "http://www.w3.org/2000/svg", lang = "de";
  function $(id){ return document.getElementById(id); }
  function t(k, v){ var s = (FL[lang] && FL[lang][k]) || FL.de[k] || k; if(v) for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  function el(n, a, txt){ var e = document.createElementNS(NS, n); for(var k in a) if(a[k] != null) e.setAttribute(k, a[k]); if(txt != null) e.textContent = txt; return e; }
  function leer(s){ while(s.lastChild) s.removeChild(s.lastChild); }
  function sicht(e, an){ if(an) e.removeAttribute("hidden"); else e.setAttribute("hidden", ""); }
  function bdi(s){ return '<bdi dir="ltr">' + s + "</bdi>"; }
  function zuf(a, b){ return a + Math.floor(Math.random() * (b - a + 1)); }
  function wahl(L){ return L[Math.floor(Math.random() * L.length)]; }
  function komma(){ return !(lang === "en" || lang === "zh" || lang === "ja" || lang === "ar"); }
  function zahl(v, d){ if(d == null) d = 2; var r = Math.round(v * Math.pow(10, d)) / Math.pow(10, d); if(Object.is(r, -0)) r = 0; var s = String(Math.abs(r)); if(s.indexOf("e") >= 0) s = Math.abs(r).toFixed(d); if(komma()) s = s.replace(".", ","); return (r < 0 ? "−" : "") + s; }
  function genau(v){ return Math.abs(v * 100 - Math.round(v * 100)) < 1e-7; }
  function zg(v){ return (genau(v) ? "" : "≈ ") + zahl(v); }
  function lies(s){ s = String(s).trim().replace(",", "."); return s === "" ? NaN : Number(s); }
  function hyp(x, y){ return Math.sqrt(x * x + y * y); }

  // ---------- Figuren ----------
  var FIGUREN = ["quadrat", "rechteck", "parallelogramm", "dreieck", "trapez", "raute", "drachen", "kreis"];
  var PARAM = {
    quadrat: [["a", 4]], rechteck: [["a", 6], ["b", 4]], parallelogramm: [["a", 6], ["b", 5], ["h", 4]],
    dreieck: [["g", 8], ["h", 5], ["v", 3, "regler"]], trapez: [["a", 8], ["c", 4], ["h", 4], ["v", 2, "regler"]],
    raute: [["e", 8], ["f", 5]], drachen: [["e", 8], ["f", 6], ["p", 2.5, "regler"]], kreis: [["r", 3]]
  };
  // Geometrie in „Mathe-Koordinaten“ (y nach oben)
  function geo(typ, P){
    var G = { pts: null, kreis: null, hoehe: null, diag: [], lab: [] };
    if(typ === "quadrat"){ var a = P.a; G.pts = [[0, 0], [a, 0], [a, a], [0, a]]; G.lab = [[a / 2, 0, "a", "u"], [a, a / 2, "a", "r"]]; }
    else if(typ === "rechteck"){ G.pts = [[0, 0], [P.a, 0], [P.a, P.b], [0, P.b]]; G.lab = [[P.a / 2, 0, "a", "u"], [P.a, P.b / 2, "b", "r"]]; }
    else if(typ === "parallelogramm"){ var s = Math.sqrt(Math.max(0, P.b * P.b - P.h * P.h)); G.pts = [[0, 0], [P.a, 0], [P.a + s, P.h], [s, P.h]]; G.hoehe = [[s, P.h], [s, 0]]; G.lab = [[P.a / 2, 0, "a", "u"], [s / 2, P.h / 2, "b", "l"], [s, P.h / 2, "h", "h"]]; G.s = s; }
    else if(typ === "dreieck"){ G.pts = [[0, 0], [P.g, 0], [P.v, P.h]]; G.hoehe = [[P.v, P.h], [P.v, 0]]; G.lab = [[P.g / 2, 0, "g", "u"], [P.v, P.h / 2, "h", "h"]]; if(P.v < 0 || P.v > P.g) G.verl = [[Math.min(0, P.v), 0], [Math.max(P.g, P.v), 0]]; }
    else if(typ === "trapez"){ G.pts = [[0, 0], [P.a, 0], [P.v + P.c, P.h], [P.v, P.h]]; G.hoehe = [[P.v, P.h], [P.v, 0]]; G.lab = [[P.a / 2, 0, "a", "u"], [P.v + P.c / 2, P.h, "c", "o"], [P.v, P.h / 2, "h", "h"]]; if(P.v < 0 || P.v > P.a) G.verl = [[Math.min(0, P.v), 0], [Math.max(P.a, P.v), 0]]; }
    else if(typ === "raute"){ var e = P.e / 2, f = P.f / 2; G.pts = [[-e, 0], [0, -f], [e, 0], [0, f]]; G.diag = [[[-e, 0], [e, 0]], [[0, -f], [0, f]]]; G.lab = [[e / 2, 0, "e", "d"], [0, f / 2, "f", "d"]]; }
    else if(typ === "drachen"){ var ff = P.f / 2; G.pts = [[0, P.e], [ff, P.e - P.p], [0, 0], [-ff, P.e - P.p]]; G.diag = [[[0, 0], [0, P.e]], [[-ff, P.e - P.p], [ff, P.e - P.p]]]; G.lab = [[0, P.e * 0.3, "e", "d"], [ff / 2, P.e - P.p, "f", "d"]]; }
    else { G.kreis = P.r; G.lab = [[P.r / 2, 0, "r", "u"]]; G.radius = [[0, 0], [P.r, 0]]; }
    return G;
  }
  function seitenDreieck(P){ return [P.g, hyp(P.g - P.v, P.h), hyp(P.v, P.h)]; }
  function seitenTrapez(P){ return [P.a, hyp(P.v + P.c - P.a, P.h), P.c, hyp(P.v, P.h)]; }
  function zwischen(typ, P, R){ // weitere Rechenschritte zwischen „eingesetzt“ und Ergebnis
    var E = einheit, z = function(v){ return zahl(v) + " " + E; }, zA = [], zu = [];
    if(typ === "trapez"){ zA.push(z(P.a + P.c) + " : 2 · " + z(P.h)); zA.push(z((P.a + P.c) / 2) + " · " + z(P.h)); }
    if(typ === "dreieck" || typ === "raute" || typ === "drachen"){ var x = typ === "dreieck" ? P.g * P.h : P.e * P.f; zA.push(zahl(x) + " " + E + "² : 2"); }
    if(typ === "kreis"){ zA.push("π · " + zahl(P.r * P.r) + " " + E + "²"); zu.push(zahl(2 * P.r) + " · π " + E); }
    if(typ === "rechteck" || typ === "parallelogramm") zu.push("2 · " + z(P.a + P.b));
    R.zA = zA; R.zu = zu; return R;
  }
  function berechne(typ, P){ return zwischen(typ, P, berechne0(typ, P)); }
  function berechne0(typ, P){ // {A, u, fA: [Formel, eingesetzt], fu}
    var E = einheit, E2 = einheit + "²", z = function(v){ return zahl(v) + " " + E; };
    if(typ === "quadrat") return { A: P.a * P.a, u: 4 * P.a, fA: ["A = a · a", z(P.a) + " · " + z(P.a)], fu: ["u = 4 · a", "4 · " + z(P.a)] };
    if(typ === "rechteck") return { A: P.a * P.b, u: 2 * (P.a + P.b), fA: ["A = a · b", z(P.a) + " · " + z(P.b)], fu: ["u = 2 · (a + b)", "2 · (" + z(P.a) + " + " + z(P.b) + ")"] };
    if(typ === "parallelogramm") return { A: P.a * P.h, u: 2 * (P.a + P.b), fA: ["A = a · h", z(P.a) + " · " + z(P.h)], fu: ["u = 2 · (a + b)", "2 · (" + z(P.a) + " + " + z(P.b) + ")"] };
    if(typ === "dreieck"){ var S = seitenDreieck(P); return { A: P.g * P.h / 2, u: S[0] + S[1] + S[2], fA: ["A = g · h : 2", z(P.g) + " · " + z(P.h) + " : 2"], fu: ["u = g + s₁ + s₂", S.map(function(x){ return zg(x).replace("≈ ", "") + " " + E; }).join(" + ")], seiten: S.slice(1) }; }
    if(typ === "trapez"){ var T = seitenTrapez(P); return { A: (P.a + P.c) / 2 * P.h, u: T[0] + T[1] + T[2] + T[3], fA: ["A = (a + c) : 2 · h", "(" + z(P.a) + " + " + z(P.c) + ") : 2 · " + z(P.h)], fu: ["u = a + b + c + d", T.map(function(x){ return zahl(x) + " " + E; }).join(" + ")], seiten: [T[1], T[3]] }; }
    if(typ === "raute"){ var s = hyp(P.e / 2, P.f / 2); return { A: P.e * P.f / 2, u: 4 * s, fA: ["A = e · f : 2", z(P.e) + " · " + z(P.f) + " : 2"], fu: ["u = 4 · a", "4 · " + zahl(s) + " " + E], seiten: [s] }; }
    if(typ === "drachen"){ var s1 = hyp(P.f / 2, P.p), s2 = hyp(P.f / 2, P.e - P.p); return { A: P.e * P.f / 2, u: 2 * (s1 + s2), fA: ["A = e · f : 2", z(P.e) + " · " + z(P.f) + " : 2"], fu: ["u = 2 · (a + b)", "2 · (" + zahl(s1) + " " + E + " + " + zahl(s2) + " " + E + ")"], seiten: [s1, s2] }; }
    return { A: Math.PI * P.r * P.r, u: 2 * Math.PI * P.r, fA: ["A = π · r²", "π · (" + z(P.r) + ")²"], fu: ["u = 2 · π · r", "2 · π · " + z(P.r)] };
  }
  function pruefParam(typ, P){
    for(var k in P) if(!(P[k] > 0) && k !== "v") return false;
    if(typ === "parallelogramm" && P.h > P.b) return "fehlerH";
    if(typ === "drachen" && P.p >= P.e) return "fehlerP";
    return true;
  }

  // ---------- Zeichnen ----------
  function zeichnen(sv, typ, P, o){
    o = o || {}; leer(sv);
    var G = geo(typ, P), W = o.breite || 400, H = o.hoehe || 300, rand = 34;
    var stuecke = warumStuecke(typ, P, G, o.warum || 0);
    // Grenzen (Original + beide Endlagen der Stücke)
    var X0 = Infinity, X1 = -Infinity, Y0 = Infinity, Y1 = -Infinity;
    function nimm(p){ X0 = Math.min(X0, p[0]); X1 = Math.max(X1, p[0]); Y0 = Math.min(Y0, p[1]); Y1 = Math.max(Y1, p[1]); }
    if(G.pts) G.pts.forEach(nimm); if(G.kreis){ nimm([-G.kreis, -G.kreis]); nimm([G.kreis, G.kreis]); }
    if(G.verl) G.verl.forEach(nimm);
    if(o.warumAn !== false) warumGrenzen(typ, P, G).forEach(nimm);
    var k = Math.min((W - 2 * rand) / (X1 - X0 || 1), (H - 2 * rand) / (Y1 - Y0 || 1));
    var ox = rand + ((W - 2 * rand) - (X1 - X0) * k) / 2 - X0 * k, oy = H - rand - ((H - 2 * rand) - (Y1 - Y0) * k) / 2 + Y0 * k;
    function X(x){ return ox + x * k; } function Y(y){ return oy - y * k; }
    sv.setAttribute("viewBox", "0 0 " + W + " " + H);
    // Kästchen (1 Einheit), wenn nicht zu viele
    if(o.kaestchen !== false && k >= 10){
      for(var gx = Math.floor(X0); gx <= Math.ceil(X1); gx++) sv.appendChild(el("line", { x1: X(gx), y1: Y(Math.floor(Y0)), x2: X(gx), y2: Y(Math.ceil(Y1)), "class": "kaestchen" }));
      for(var gy = Math.floor(Y0); gy <= Math.ceil(Y1); gy++) sv.appendChild(el("line", { x1: X(Math.floor(X0)), y1: Y(gy), x2: X(Math.ceil(X1)), y2: Y(gy), "class": "kaestchen" }));
    }
    function poly(pts, cls){ return el("polygon", { points: pts.map(function(p){ return X(p[0]).toFixed(1) + "," + Y(p[1]).toFixed(1); }).join(" "), "class": cls }); }
    if(stuecke.basis) sv.appendChild(poly(stuecke.basis, "form"));
    else if(G.kreis && !stuecke.sektoren) sv.appendChild(el("circle", { cx: X(0), cy: Y(0), r: G.kreis * k, "class": "form" }));
    else if(G.pts && !stuecke.ersetzt) sv.appendChild(poly(G.pts, "form"));
    (stuecke.teile || []).forEach(function(s){ sv.appendChild(poly(s.pts, s.cls)); });
    if(G.verl) sv.appendChild(el("line", { x1: X(G.verl[0][0]), y1: Y(0), x2: X(G.verl[1][0]), y2: Y(0), "class": "hoehe", style: "stroke:#64748b" }));
    if(G.hoehe && !stuecke.ohneHoehe){
      sv.appendChild(el("line", { x1: X(G.hoehe[0][0]), y1: Y(G.hoehe[0][1]), x2: X(G.hoehe[1][0]), y2: Y(G.hoehe[1][1]), "class": "hoehe" }));
      var hx = X(G.hoehe[1][0]), hy = Y(G.hoehe[1][1]), q = 12; sv.appendChild(el("path", { d: "M" + (hx + q) + " " + hy + " A" + q + " " + q + " 0 0 0 " + hx + " " + (hy - q), "class": "rw" }));
      sv.appendChild(el("circle", { cx: hx + q * 0.36, cy: hy - q * 0.36, r: 1.8, fill: "#dc2626" }));
    }
    G.diag.forEach(function(d){ sv.appendChild(el("line", { x1: X(d[0][0]), y1: Y(d[0][1]), x2: X(d[1][0]), y2: Y(d[1][1]), "class": "diag" })); });
    if(G.radius && !stuecke.sektoren){ sv.appendChild(el("line", { x1: X(0), y1: Y(0), x2: X(G.kreis), y2: Y(0), "class": "hoehe", style: "stroke:#1d4ed8;stroke-dasharray:none" })); sv.appendChild(el("circle", { cx: X(0), cy: Y(0), r: 4, fill: "#1d4ed8" })); }
    if(!stuecke.ohneLab) G.lab.forEach(function(l){
      var x = X(l[0]), y = Y(l[1]), d = l[3], txt = o.werte ? o.werte[l[2]] : l[2];
      if(d === "u") y += 22; else if(d === "o") y -= 10; else if(d === "r") x += 18; else if(d === "l") x -= 16; else if(d === "h") x -= 14; else if(d === "d"){ x += 12; y -= 8; }
      sv.appendChild(el("text", { x: x, y: y + 5, "class": "lab" + (d === "h" ? " h" : d === "d" ? " d" : "") }, txt));
    });
    (stuecke.labs || []).forEach(function(l){ sv.appendChild(el("text", { x: X(l[0]), y: Y(l[1]) + 5, "class": "lab" }, l[2])); });
  }

  // ---------- „Warum?“ ----------
  function lerp(a, b, s){ return a + (b - a) * s; }
  function dreh(p, m, w){ var c = Math.cos(w), s = Math.sin(w), x = p[0] - m[0], y = p[1] - m[1]; return [m[0] + c * x - s * y, m[1] + s * x + c * y]; }
  function sektoren(r, n, s){
    var w = 2 * Math.PI * r / n, d = Math.PI / n, L = [];
    for(var i = 0; i < n; i++){
      var phi0 = (i + 0.5) * 2 * Math.PI / n, auf = i % 2 === 0, kk = Math.floor(i / 2);
      var ziel = auf ? [-r + (kk + 0.5) * w, -r / 2] : [-r + (kk + 1) * w, r / 2], phi1 = auf ? Math.PI / 2 : -Math.PI / 2;
      while(phi1 - phi0 > Math.PI) phi1 -= 2 * Math.PI; while(phi0 - phi1 > Math.PI) phi1 += 2 * Math.PI;
      var ap = [lerp(0, ziel[0], s), lerp(0, ziel[1], s)], ph = lerp(phi0, phi1, s), pts = [ap];
      for(var j = 0; j <= 6; j++){ var a = ph - d + 2 * d * j / 6; pts.push([ap[0] + r * Math.cos(a), ap[1] + r * Math.sin(a)]); }
      L.push({ pts: pts, cls: auf ? "teil" : "teil2" });
    }
    return L;
  }
  function warumStuecke(typ, P, G, s){
    s = s / 100;
    if(typ === "parallelogramm" && s > 0){
      var sh = G.s, a = P.a, h = P.h;
      return { basis: [[sh, 0], [a, 0], [a + sh, h], [sh, h]], teile: [{ pts: [[0, 0], [sh, 0], [sh, h]].map(function(p){ return [p[0] + a * s, p[1]]; }), cls: "teil" }], ersetzt: true };
    }
    if((typ === "dreieck" || typ === "trapez") && s > 0){
      var B = G.pts[1], C = G.pts[2], M = [(B[0] + C[0]) / 2, (B[1] + C[1]) / 2];
      return { teile: [{ pts: G.pts.map(function(p){ return dreh(p, M, Math.PI * s); }), cls: "teil" }] };
    }
    if((typ === "raute" || typ === "drachen") && s > 0){
      var xs = G.pts.map(function(p){ return p[0]; }), ys = G.pts.map(function(p){ return p[1]; });
      var x0 = Math.min.apply(0, xs), x1 = Math.max.apply(0, xs), y0 = Math.min.apply(0, ys), y1 = Math.max.apply(0, ys), Lt = [];
      for(var i = 0; i < 4; i++){ var p = G.pts[i], q = G.pts[(i + 1) % 4], ecke = [Math.abs(p[0] - x0) < 1e-9 || Math.abs(q[0] - x0) < 1e-9 ? x0 : x1, Math.abs(p[1] - y0) < 1e-9 || Math.abs(q[1] - y0) < 1e-9 ? y0 : y1];
        Lt.push({ pts: [p, q, [lerp((p[0] + q[0]) / 2, ecke[0], s), lerp((p[1] + q[1]) / 2, ecke[1], s)]], cls: "teil" }); }
      return { teile: Lt };
    }
    if(typ === "kreis" && s > 0){
      var Lk = sektoren(P.r, 16, s), r = P.r;
      return { teile: Lk, sektoren: true, ohneLab: s > 0.95, labs: s > 0.95 ? [[-r + Math.PI * r / 2, r / 2 + r * 0.25, "≈ π · r"], [-r - r * 0.18, 0, "r"]] : [] };
    }
    if((typ === "rechteck" || typ === "quadrat") && s > 0){
      var aa = P.a, bb = typ === "quadrat" ? P.a : P.b, n = Math.round(Math.floor(aa) * Math.floor(bb) * s), T = [], c = 0;
      for(var yy = 0; yy < Math.floor(bb) && c < n; yy++) for(var xx = 0; xx < Math.floor(aa) && c < n; xx++, c++) T.push({ pts: [[xx, yy], [xx + 1, yy], [xx + 1, yy + 1], [xx, yy + 1]], cls: "teil" });
      return { teile: T };
    }
    return {};
  }
  function warumGrenzen(typ, P, G){
    if(typ === "dreieck" || typ === "trapez"){ var B = G.pts[1], C = G.pts[2], M = [(B[0] + C[0]) / 2, (B[1] + C[1]) / 2]; return G.pts.map(function(p){ return dreh(p, M, Math.PI); }); }
    if(typ === "kreis") return [[-P.r * 1.3, -P.r], [-P.r + Math.PI * P.r + P.r * 0.4, P.r]];
    return [];
  }
  function warumText(typ, P, s){
    var key = "w_" + typ + (s >= 100 ? "2" : "");
    return t(key);
  }

  // ---------- Reiter Figuren ----------
  var typ = "rechteck", einheit = "cm", werte = {};
  function paramsBauen(){
    var box = $("params"); box.innerHTML = "";
    PARAM[typ].forEach(function(p){
      var k = p[0], v = werte[typ + k] != null ? werte[typ + k] : p[1], l = document.createElement("label");
      var sp = document.createElement("span"); sp.textContent = t("p_" + (typ === "trapez" && k === "v" ? "vt" : typ === "drachen" && k === "p" ? "pd" : k)); l.appendChild(sp);
      var inp = document.createElement("input");
      if(p[2] === "regler"){ inp.type = "range"; var g = typ === "dreieck" ? 2 * (werte[typ + "g"] || 8) : typ === "trapez" ? werte[typ + "a"] || 8 : werte[typ + "e"] || 8; inp.min = typ === "drachen" ? 0.5 : -Math.round(g / 2); inp.max = typ === "drachen" ? g - 0.5 : g; inp.step = 0.5; inp.style.width = "160px"; }
      else { inp.className = "zahl"; inp.setAttribute("inputmode", "decimal"); inp.setAttribute("autocomplete", "off"); }
      inp.id = "p_" + k; inp.value = komma() && p[2] !== "regler" ? String(v).replace(".", ",") : v;
      inp.addEventListener("input", function(){ werte[typ + k] = lies(inp.value); if(p[2] !== "regler") paramsReglerAnpassen(); figur(); });
      l.appendChild(inp);
      var e = document.createElement("span"); e.className = "einh"; e.textContent = p[2] === "regler" ? "" : einheit; l.appendChild(e);
      box.appendChild(l);
    });
  }
  function paramsReglerAnpassen(){
    PARAM[typ].forEach(function(p){ if(p[2] !== "regler") return; var inp = $("p_" + p[0]); if(!inp) return;
      var g = typ === "dreieck" ? lies($("p_g").value) : typ === "trapez" ? lies($("p_a").value) : lies($("p_e").value); if(!(g > 0)) return;
      if(typ === "drachen"){ inp.min = 0.5; inp.max = Math.max(0.5, g - 0.5); } else { inp.min = -Math.round(g / 2); inp.max = typ === "dreieck" ? Math.round(g * 1.5) : g; } });
  }
  function leseP(){ var P = {}; PARAM[typ].forEach(function(p){ P[p[0]] = lies($("p_" + p[0]).value); }); return P; }
  function figur(){
    var P = leseP(), ok = pruefParam(typ, P);
    $("fehler").textContent = ok === true ? "" : t(ok || "fehler");
    if(ok !== true){ leer($("figSvg")); $("rechnung").innerHTML = ""; return; }
    var w = Number($("warum").value);
    zeichnen($("figSvg"), typ, P, { warum: w });
    var R = berechne(typ, P), E = einheit;
    var h = "<b>" + t("flaecheL") + "</b><br>" + R.fA[0] + "<br>A = " + R.fA[1] + R.zA.map(function(x){ return "<br>A = " + x; }).join("") + "<br>A " + (genau(R.A) ? "=" : "≈") + " " + zahl(R.A) + " " + E + "²";
    h += "<br><br><b>" + t("umfangL") + "</b><br>" + R.fu[0] + "<br>u = " + R.fu[1] + R.zu.map(function(x){ return "<br>u = " + x; }).join("") + "<br>u " + (genau(R.u) ? "=" : "≈") + " " + zahl(R.u) + " " + E;
    if(R.seiten) h += '<br><br><span class="muted">' + t("seitenL") + " " + R.seiten.map(function(x){ return zg(x) + " " + E; }).join(", ") + "</span>";
    $("rechnung").innerHTML = h;
    $("hWarum").textContent = t("warumL"); $("warumText").textContent = warumText(typ, P, w);
  }
  $("figur").addEventListener("change", function(){ typ = $("figur").value; $("warum").value = 0; paramsBauen(); figur(); });
  $("einheit").addEventListener("change", function(){ einheit = $("einheit").value; paramsBauen(); figur(); });
  $("warum").addEventListener("input", figur);

  // ---------- Reiter Zusammengesetzt (L-Form) ----------
  var zWeg = "zerlegen", ZP = { a: 8, b: 6, c: 3, d: 2 };
  function lForm(P){ return [[0, 0], [P.a, 0], [P.a, P.b - P.d], [P.a - P.c, P.b - P.d], [P.a - P.c, P.b], [0, P.b]]; }
  function zZeichnen(sv, P, weg, werte){
    leer(sv); var W = 400, H = 300, r = 34, k = Math.min((W - 2 * r) / P.a, (H - 2 * r) / P.b), ox = (W - P.a * k) / 2, oy = H - (H - P.b * k) / 2;
    function X(x){ return ox + x * k; } function Y(y){ return oy - y * k; }
    function poly(pts, cls){ sv.appendChild(el("polygon", { points: pts.map(function(p){ return X(p[0]) + "," + Y(p[1]); }).join(" "), "class": cls })); }
    if(k >= 10){ for(var x = 0; x <= P.a; x++) sv.appendChild(el("line", { x1: X(x), y1: Y(0), x2: X(x), y2: Y(P.b), "class": "kaestchen" })); for(var y = 0; y <= P.b; y++) sv.appendChild(el("line", { x1: X(0), y1: Y(y), x2: X(P.a), y2: Y(y), "class": "kaestchen" })); }
    if(weg === "zerlegen"){ poly([[0, 0], [P.a, 0], [P.a, P.b - P.d], [0, P.b - P.d]], "teil"); poly([[0, P.b - P.d], [P.a - P.c, P.b - P.d], [P.a - P.c, P.b], [0, P.b]], "teil2"); }
    else if(weg === "ergaenzen"){ poly([[0, 0], [P.a, 0], [P.a, P.b], [0, P.b]], "form"); poly([[P.a - P.c, P.b - P.d], [P.a, P.b - P.d], [P.a, P.b], [P.a - P.c, P.b]], "loch"); }
    else { poly(lForm(P), "form"); sv.appendChild(el("polyline", { points: [[P.a - P.c, P.b], [P.a, P.b], [P.a, P.b - P.d]].map(function(p){ return X(p[0]) + "," + Y(p[1]); }).join(" "), fill: "none", stroke: "#dc2626", "stroke-width": 3, "stroke-dasharray": "7 5" })); }
    sv.appendChild(el("polygon", { points: lForm(P).map(function(p){ return X(p[0]) + "," + Y(p[1]); }).join(" "), fill: "none", stroke: "#1d4ed8", "stroke-width": 3 }));
    var w = werte || { a: "a", b: "b", c: "c", d: "d" };
    sv.appendChild(el("text", { x: X(P.a / 2), y: Y(0) + 24, "class": "lab" }, w.a));
    sv.appendChild(el("text", { x: X(0) - 16, y: Y(P.b / 2) + 5, "class": "lab" }, w.b));
    sv.appendChild(el("text", { x: X(P.a - P.c / 2), y: Y(P.b - P.d) + 22, "class": "lab" }, w.c));
    sv.appendChild(el("text", { x: X(P.a) + 16, y: Y(P.b - P.d / 2) + 5, "class": "lab" }, w.d));
  }
  function zus(){
    var box = $("zParams");
    if(!box.childNodes.length) ["a", "b", "c", "d"].forEach(function(k){ var l = document.createElement("label"), sp = document.createElement("span"); sp.id = "tz_" + k; l.appendChild(sp); var inp = document.createElement("input"); inp.className = "zahl"; inp.id = "z_" + k; inp.value = ZP[k]; inp.setAttribute("inputmode", "decimal"); inp.addEventListener("input", zus); l.appendChild(inp); var e = document.createElement("span"); e.className = "einh"; e.textContent = "cm"; l.appendChild(e); box.appendChild(l); });
    ["a", "b", "c", "d"].forEach(function(k){ $("tz_" + k).textContent = t("z_" + k); });
    var P = {}; ["a", "b", "c", "d"].forEach(function(k){ P[k] = lies($("z_" + k).value); });
    var ok = P.a > 0 && P.b > 0 && P.c > 0 && P.d > 0 && P.c < P.a && P.d < P.b;
    $("zFehler").textContent = ok ? "" : t("zFehler");
    if(!ok){ leer($("zSvg")); $("zRechnung").innerHTML = ""; return; }
    zZeichnen($("zSvg"), P, zWeg);
    var z = function(v){ return zahl(v); }, A = P.a * P.b - P.c * P.d, h;
    if(zWeg === "zerlegen") h = "<b>" + t("zWeg1") + "</b><br>A₁ = " + z(P.a) + " · " + z(P.b - P.d) + " = " + z(P.a * (P.b - P.d)) + " cm²<br>A₂ = " + z(P.a - P.c) + " · " + z(P.d) + " = " + z((P.a - P.c) * P.d) + " cm²<br>A = A₁ + A₂ = " + z(A) + " cm²";
    else if(zWeg === "ergaenzen") h = "<b>" + t("zWeg2") + "</b><br>A = a · b − c · d<br>A = " + z(P.a) + " · " + z(P.b) + " − " + z(P.c) + " · " + z(P.d) + "<br>A = " + z(P.a * P.b) + " − " + z(P.c * P.d) + " = " + z(A) + " cm²";
    else h = "<b>" + t("zWeg3") + "</b><br>u = 2 · (a + b) = 2 · (" + z(P.a) + " + " + z(P.b) + ") = " + z(2 * (P.a + P.b)) + " cm";
    $("zRechnung").innerHTML = h;
    $("zText").textContent = t("zText"); $("zMerke").textContent = t(zWeg === "umfang" ? "zMerkeU" : "zMerke");
  }
  function setzeZWeg(w){ zWeg = w; var box = $("zWeg"); box.innerHTML = ""; [["zerlegen", "zw1"], ["ergaenzen", "zw2"], ["umfang", "zw3"]].forEach(function(x){ var b = document.createElement("button"); b.type = "button"; b.textContent = t(x[1]); b.setAttribute("aria-pressed", x[0] === zWeg ? "true" : "false"); b.addEventListener("click", function(){ setzeZWeg(x[0]); }); box.appendChild(b); }); zus(); }

  // ---------- Reiter Üben ----------
  var auf = null, punkte = 0, anzahl = 0, beantwortet = false, letzte = null;
  function neueAufgabe(){
    beantwortet = false; letzte = null;
    var art = wahl(["A", "A", "A", "u", "u", "rueck", "L"]), A = { art: art };
    if(art === "A" || art === "u"){
      var ty = art === "A" ? wahl(["quadrat", "rechteck", "parallelogramm", "dreieck", "trapez", "raute", "drachen", "kreis"]) : wahl(["quadrat", "rechteck", "parallelogramm", "kreis"]), P = {};
      if(ty === "quadrat") P.a = zuf(2, 12);
      else if(ty === "rechteck"){ P.a = zuf(3, 14); P.b = zuf(2, 10); }
      else if(ty === "parallelogramm"){ P.a = zuf(4, 12); P.h = zuf(2, 8); P.b = P.h + zuf(1, 4); }
      else if(ty === "dreieck"){ P.g = zuf(4, 12); P.h = zuf(2, 9); P.v = zuf(1, P.g - 1); }
      else if(ty === "trapez"){ P.a = zuf(6, 14); P.c = zuf(2, P.a - 2); P.h = zuf(2, 8); P.v = zuf(0, P.a - P.c); }
      else if(ty === "raute"){ P.e = zuf(4, 12); P.f = zuf(3, 10); }
      else if(ty === "drachen"){ P.e = zuf(6, 12); P.f = zuf(4, 10); P.p = zuf(2, P.e - 3); }
      else P.r = zuf(2, 9);
      var R = berechneFest(ty, P); A.ty = ty; A.P = P; A.l = art === "A" ? R.A : R.u; A.R = R;
    } else if(art === "rueck"){
      var w = wahl(["R", "Q", "K"]); A.w = w;
      if(w === "R"){ A.a = zuf(3, 12); A.b = zuf(2, 12); A.A = A.a * A.b; A.l = A.b; }
      else if(w === "Q"){ A.a = zuf(2, 15); A.A = A.a * A.a; A.l = A.a; }
      else { A.r = zuf(2, 12); A.u = 2 * Math.PI * A.r; A.l = A.r; }
    } else { A.P = { a: zuf(6, 12), b: zuf(5, 10) }; A.P.c = zuf(2, A.P.a - 2); A.P.d = zuf(2, A.P.b - 2); A.frage = wahl(["A", "u"]); A.l = A.frage === "A" ? A.P.a * A.P.b - A.P.c * A.P.d : 2 * (A.P.a + A.P.b); }
    auf = A; zeige();
  }
  function berechneFest(ty, P){ var alt = einheit; einheit = "cm"; var R = berechne(ty, P); einheit = alt; return R; }
  function zeige(){
    var A = auf, Z = $("antwortzeile"), sv = $("uSvg");
    sicht(sv, A.art !== "rueck");
    if(A.art === "A" || A.art === "u"){
      var w = {}; for(var k in A.P) w[k] = zahl(A.P[k]) + " cm";
      $("auftrag").innerHTML = t(A.art === "A" ? "u_A" : "u_u", { f: t("f_" + A.ty) }) + (A.ty === "kreis" ? " " + t("u_pi") : "");
      zeichnen(sv, A.ty, A.P, { werte: w, warumAn: false });
    } else if(A.art === "rueck"){
      $("auftrag").innerHTML = A.w === "R" ? t("u_rueckR", { A: bdi(A.A + " cm²"), a: bdi(A.a + " cm") }) : A.w === "Q" ? t("u_rueckQ", { A: bdi(A.A + " cm²") }) : t("u_rueckK", { u: bdi(zahl(A.u) + " cm") });
    } else {
      $("auftrag").innerHTML = t(A.frage === "A" ? "u_LA" : "u_Lu");
      var ww = {}; for(var kk in A.P) ww[kk] = A.P[kk] + " cm"; zZeichnen(sv, A.P, "keins", ww);
    }
    $("meldung").textContent = ""; $("meldung").className = "meldung"; sicht($("uLauf"), false); Z.innerHTML = "";
    var inp = document.createElement("input"); inp.className = "zahl"; inp.id = "uAntwort"; inp.setAttribute("inputmode", "decimal"); inp.setAttribute("autocomplete", "off"); inp.style.width = "130px";
    inp.addEventListener("keydown", function(e){ if(e.key === "Enter") pruefe(inp.value); });
    var ein = document.createElement("span"); ein.className = "einh"; ein.textContent = (A.art === "A" || (A.art === "L" && A.frage === "A")) ? "cm²" : "cm";
    var pb = document.createElement("button"); pb.type = "button"; pb.className = "knopf"; pb.id = "pruefen"; pb.textContent = t("pruefen"); pb.addEventListener("click", function(){ pruefe(inp.value); });
    Z.appendChild(inp); Z.appendChild(ein); Z.appendChild(pb);
    $("weiter").textContent = t("weiterA"); $("punkte").textContent = t("punkte", { p: punkte, n: anzahl });
  }
  function pruefe(e){
    if(beantwortet) return;
    var v = lies(e); if(!isFinite(v)) return;
    var A = auf, tol = Math.max(0.011, Math.abs(A.l) * 0.006), ok = Math.abs(v - A.l) <= tol;
    letzte = e; beantwortet = true; anzahl++; if(ok) punkte++;
    var einh = (A.art === "A" || (A.art === "L" && A.frage === "A")) ? " cm²" : " cm", lt = zg(A.l) + einh, L = [];
    if(A.art === "A") L.push(bdi(A.R.fA[0] + " = " + A.R.fA[1] + (A.R.zA || []).map(function(x){ return " = " + x; }).join("") + " " + (genau(A.l) ? "=" : "≈") + " " + zahl(A.l) + einh));
    else if(A.art === "u") L.push(bdi(A.R.fu[0] + " = " + A.R.fu[1] + (A.R.zu || []).map(function(x){ return " = " + x; }).join("") + " " + (genau(A.l) ? "=" : "≈") + " " + zahl(A.l) + einh));
    else if(A.art === "rueck") L.push(bdi(A.w === "R" ? "b = A : a = " + A.A + " : " + A.a + " = " + A.b + " cm" : A.w === "Q" ? "a = √A = √" + A.A + " = " + A.a + " cm" : "r = u : (2 · π) = " + zahl(A.u) + " : (2 · π) ≈ " + A.r + " cm"));
    else L.push(bdi(A.frage === "A" ? "A = a · b − c · d = " + A.P.a + " · " + A.P.b + " − " + A.P.c + " · " + A.P.d + " = " + A.l + " cm²" : "u = 2 · (a + b) = 2 · (" + A.P.a + " + " + A.P.b + ") = " + A.l + " cm"));
    var m = $("meldung"); m.className = "meldung " + (ok ? "gut" : "schlecht"); m.innerHTML = ok ? t("richtig") + " " + bdi(lt) : t("falsch", { l: bdi(lt) });
    $("uLauf").innerHTML = L.map(function(s){ return "<li>" + s + "</li>"; }).join(""); sicht($("uLauf"), true);
    $("punkte").textContent = t("punkte", { p: punkte, n: anzahl });
  }
  $("weiter").addEventListener("click", neueAufgabe);

  // ---------- Reiter & Texte ----------
  var tab = "figur", TABS = ["figur", "zus", "ueben"];
  function zeigeTab(k){
    tab = k;
    document.querySelectorAll(".tabs button").forEach(function(b){ b.setAttribute("aria-selected", b.dataset.tab === k ? "true" : "false"); });
    TABS.forEach(function(x){ sicht($("s_" + x), x === k); });
    if(k === "ueben" && !auf) neueAufgabe();
    if(k === "zus" && window.MS_FL_ZUS2) MS_FL_ZUS2.zeigen();
    alles(true);
  }
  document.querySelectorAll(".tabs button").forEach(function(b){ b.addEventListener("click", function(){ zeigeTab(b.dataset.tab); }); });
  function alles(nurRechnen){
    if(!nurRechnen){
      document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.title = "miStudia – " + t("titel"); $("titel").textContent = t("titel");
      document.querySelectorAll(".tabs button").forEach(function(b){ b.textContent = t("tab_" + b.dataset.tab); });
      $("figur").innerHTML = FIGUREN.map(function(k){ return '<option value="' + k + '">' + t("f_" + k) + "</option>"; }).join(""); $("figur").value = typ;
      $("tFigur").textContent = t("figurL"); $("tEinheit").textContent = t("einheitL");
      var alt = {}; if($("params").childNodes.length) PARAM[typ].forEach(function(p){ alt[p[0]] = $("p_" + p[0]).value; });
      paramsBauen(); PARAM[typ].forEach(function(p){ if(alt[p[0]] != null) $("p_" + p[0]).value = alt[p[0]]; });
      setzeZWeg(zWeg);
    }
    if(tab === "figur") figur(); else if(tab === "zus") zus();
    if(!nurRechnen && auf){ var war = beantwortet, e = letzte, gut = $("meldung").classList.contains("gut"); zeige(); if(war){ beantwortet = false; anzahl--; if(gut) punkte--; $("uAntwort").value = e; pruefe(e); } }
  }
  // Alltagsbeispiel laden (aus alltag-daten.js)
  window.MS_FLAECHE = { laden: function(w){
    typ = w.typ; einheit = w.einheit; for(var k in w.P) werte[typ + k] = w.P[k];
    $("figur").value = typ; $("einheit").value = einheit; $("warum").value = 0;
    paramsBauen(); zeigeTab("figur");
    $("figur").scrollIntoView({ behavior: "smooth", block: "start" });
  } };
  window.MS_LANG = { apply: function(l){ if(FL[l]){ lang = l; alles(); if(window.MS_FL_ZUS2) MS_FL_ZUS2.sprache(l); } } };
  alles();
})();
