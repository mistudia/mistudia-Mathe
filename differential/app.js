// ============================================================
// differential/app.js – Differentialrechnung
// Änderungsrate: Sekante → Tangente (h → 0), Differenzenquotient und
//   Differentialquotient mit Zahlen, Tabelle für kleiner werdendes h;
//   Differenzierbarkeit (Knick, Sprung, glatt) mit Sekanten von links/rechts.
// Ableitungsregeln: Potenz-, Faktor-, Summen-, Produkt-, Quotienten-,
//   Kettenregel – je Beispiele Schritt für Schritt, f und f′ im Graph.
// Optimierung: Gewinn = Erlös − Kosten (G′ = 0, G″ < 0, Lösungsweg über
//   /funktionen/loesweg.js), Zaun an einer Mauer, Dose mit wenig Blech.
// Differentialgleichungen: Wachstum, Zerfall, Abkühlung, logistisch –
//   Richtungsfeld, Lösung, Euler-Verfahren.
// Üben: Differenzenquotient, f′(x₀), Produkt-/Quotienten-/Kettenregel, Optimierung.
// Texte: differential/texte.js (DT), Sprache aus dem Startmenü (MS_LANG).
// ============================================================
(function(){
  "use strict";
  var NS = "http://www.w3.org/2000/svg", lang = "de", M = "−";
  function $(id){ return document.getElementById(id); }
  function t(k, v){ var s = (DT[lang] && DT[lang][k] != null) ? DT[lang][k] : DT.de[k] != null ? DT.de[k] : k; if(v) for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  function sicht(e, an){ if(an) e.removeAttribute("hidden"); else e.setAttribute("hidden", ""); }
  function esc(s){ return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
  function el(n, a, txt){ var e = document.createElementNS(NS, n); for(var k in a) if(a[k] != null) e.setAttribute(k, a[k]); if(txt != null) e.textContent = txt; return e; }
  function leer(s){ while(s.lastChild) s.removeChild(s.lastChild); }
  function komma(){ return !(lang === "en" || lang === "zh" || lang === "ja" || lang === "ar"); }
  function zahl(v, d){ if(d == null) d = 2; if(!isFinite(v)) return v > 0 ? "∞" : M + "∞"; var r = Math.round(v * Math.pow(10, d)) / Math.pow(10, d); if(Object.is(r, -0) || Math.abs(r) < 1e-12) r = 0; var s = String(Math.abs(r)); if(s.indexOf("e") >= 0) s = Math.abs(r).toFixed(d); if(komma()) s = s.replace(".", ","); return (r < 0 ? M : "") + s; }
  function genau(v, d){ return Math.abs(v * Math.pow(10, d) - Math.round(v * Math.pow(10, d))) < 1e-9; }
  function zg(v, d){ return (genau(v, d) ? "= " : "≈ ") + zahl(v, d); }
  function kl(v, d){ return v < 0 ? "(" + zahl(v, d) + ")" : zahl(v, d); }
  function bdi(s){ return '<bdi dir="ltr" class="f">' + s + "</bdi>"; }
  function br(z, n){ return '<span class="br"><span>' + z + "</span><span>" + n + "</span></span>"; }
  function TT(h, txt){ return window.MS_TIPP ? MS_TIPP.s(h, txt) : h; }
  function tp(h, k, v){ return TT(h, t(k, v)); }
  // Zufall mit Startwert: Beim Sprachwechsel wird dieselbe Aufgabe in der neuen Sprache neu erzeugt
  var rng = Math.random;
  function mulberry(a){ return function(){ a |= 0; a = a + 0x6D2B79F5 | 0; var q = Math.imul(a ^ a >>> 15, 1 | a); q = q + Math.imul(q ^ q >>> 7, 61 | q) ^ q; return ((q ^ q >>> 14) >>> 0) / 4294967296; }; }
  function zuf(a, b){ return a + Math.floor(rng() * (b - a + 1)); }
  function wahl(L){ return L[Math.floor(rng() * L.length)]; }
  var HOCH = "⁰¹²³⁴⁵⁶⁷⁸⁹";
  function hoch(n){ return String(n).replace("-", "⁻").split("").map(function(c){ return c === "⁻" ? c : HOCH[+c]; }).join(""); }

  // ---------- Graph ----------
  function schritt(r){ var s = Math.pow(10, Math.floor(Math.log10(r / 6))), n = r / 6 / s; return s * (n < 1.5 ? 1 : n < 3.5 ? 2 : n < 7.5 ? 5 : 10); }
  function plot(sv, o){
    var o0 = o; if(o.abl && window.MS_ABL) o = MS_ABL.sicht(sv, o); // Verschieben/Zoomen (graph-ablesen.js)
    leer(sv);
    var W = (sv.clientWidth || (sv.parentNode && sv.parentNode.clientWidth) || 640) < 520 ? 420 : 640, H = o.H || 360;
    sv.setAttribute("viewBox", "0 0 " + W + " " + H);
    var L = 46, R = W - 12, T = 12, B = H - 28;
    var X = function(x){ return L + (x - o.x0) / (o.x1 - o.x0) * (R - L); }, Y = function(y){ return B - (y - o.y0) / (o.y1 - o.y0) * (B - T); };
    var id = "clip_" + sv.id, defs = el("defs"), cp = el("clipPath", { id: id }); cp.appendChild(el("rect", { x: L, y: T, width: R - L, height: B - T })); defs.appendChild(cp); sv.appendChild(defs);
    var sx = o.sx || schritt(o.x1 - o.x0), sy = o.sy || schritt(o.y1 - o.y0);
    for(var gx = Math.ceil(o.x0 / sx) * sx; gx <= o.x1 + 1e-9; gx += sx){ sv.appendChild(el("line", { x1: X(gx), y1: T, x2: X(gx), y2: B, "class": "g-gitter" })); sv.appendChild(el("text", { x: X(gx), y: B + 16, "class": "g-zahl" }, zahl(gx, 2))); }
    for(var gy = Math.ceil(o.y0 / sy) * sy; gy <= o.y1 + 1e-9; gy += sy){ sv.appendChild(el("line", { x1: L, y1: Y(gy), x2: R, y2: Y(gy), "class": "g-gitter" })); sv.appendChild(el("text", { x: L - 5, y: Y(gy) + 4, "class": "g-zahl", style: "text-anchor:end" }, zahl(gy, 2))); }
    var ax = o.x0 <= 0 && o.x1 >= 0 ? X(0) : L, ay = o.y0 <= 0 && o.y1 >= 0 ? Y(0) : B;
    sv.appendChild(el("line", { x1: L, y1: ay, x2: R, y2: ay, "class": "g-achse" })); sv.appendChild(el("line", { x1: ax, y1: T, x2: ax, y2: B, "class": "g-achse" }));
    if(o.xName) sv.appendChild(el("text", { x: R, y: ay - 6, "class": "g-zahl", style: "text-anchor:end" }, o.xName));
    var g = el("g", { "clip-path": "url(#" + id + ")" }); sv.appendChild(g);
    (o.flaechen || []).forEach(function(fl){ g.appendChild(el("rect", { x: X(fl.a), y: T, width: Math.max(0, X(fl.b) - X(fl.a)), height: B - T, "class": fl.cls })); });
    (o.feld || []).forEach(function(s){ var px = X(s[0]), py = Y(s[1]), dx = (R - L) / (o.x1 - o.x0), dy = (B - T) / (o.y1 - o.y0), vx = dx, vy = -s[2] * dy, n = Math.sqrt(vx * vx + vy * vy) || 1, l = 8; g.appendChild(el("line", { x1: px - vx / n * l, y1: py - vy / n * l, x2: px + vx / n * l, y2: py + vy / n * l, "class": "k-feld" })); });
    (o.kurven || []).forEach(function(k){
      var a = k.von != null ? Math.max(k.von, o.x0) : o.x0, b = k.bis != null ? Math.min(k.bis, o.x1) : o.x1, n = 500, d = "", auf = false, py = null;
      for(var i = 0; i <= n; i++){
        var x = a + (b - a) * i / n, y = k.f(x);
        if(!isFinite(y) || Math.abs(y - (o.y0 + o.y1) / 2) > 50 * (o.y1 - o.y0) || (py != null && Math.abs(y - py) > 4 * (o.y1 - o.y0))){ auf = false; py = isFinite(y) ? y : null; continue; }
        d += (auf ? "L" : "M") + X(x).toFixed(1) + " " + Y(y).toFixed(1); auf = true; py = y;
      }
      k._el = el("path", { d: d, "class": k.cls }); g.appendChild(k._el);
    });
    (o.linien || []).forEach(function(l){ g.appendChild(el("line", { x1: X(l.x1), y1: Y(l.y1), x2: X(l.x2), y2: Y(l.y2), "class": l.cls })); });
    (o.polys || []).forEach(function(p){ g.appendChild(el("polyline", { points: p.pts.map(function(q){ return X(q[0]).toFixed(1) + "," + Y(q[1]).toFixed(1); }).join(" "), "class": p.cls })); });
    (o.punkte || []).forEach(function(p){ if(p.y < o.y0 - 1e-9 || p.y > o.y1 + 1e-9 || p.x < o.x0 - 1e-9 || p.x > o.x1 + 1e-9) return; sv.appendChild(el("circle", { cx: X(p.x), cy: Y(p.y), r: p.r || 5, "class": p.cls || "pt" })); if(p.txt) sv.appendChild(el("text", { x: X(p.x) + (p.dx || 8), y: Y(p.y) + (p.dy || -8), "class": "lab" + (p.tcls ? " " + p.tcls : "") }, p.txt)); });
    (o.texte || []).forEach(function(p){ if(p.x < o.x0 || p.x > o.x1 || p.y < o.y0 || p.y > o.y1) return; sv.appendChild(el("text", { x: X(p.x), y: Y(p.y), "class": "lab " + (p.cls || ""), "text-anchor": p.anker || "middle" }, p.txt)); });
    // Werte ablesen + Wertetabelle (/graph-ablesen.js), nur bei Erkunden-Graphen (o.abl)
    if(window.MS_ABL){ if(o.abl) MS_ABL.an(sv, { x0: o.x0, x1: o.x1, y0: o.y0, y1: o.y1, L: L, R: R, T: T, B: B, xName: o.abl.x || "x", neu: function(){ plot(sv, o0); },
      kurven: (o.kurven || []).map(function(k, i){ return o.abl.namen[i] ? { f: function(x){ return (k.von != null && x < k.von) || (k.bis != null && x > k.bis) ? NaN : k.f(x); }, el: k._el, name: o.abl.namen[i] } : null; }) }); else MS_ABL.aus(sv); }
    return { X: X, Y: Y };
  }
  function yBereich(fs, x0, x1, min, max){
    var lo = Infinity, hi = -Infinity;
    fs.forEach(function(f){ for(var i = 0; i <= 200; i++){ var y = f(x0 + (x1 - x0) * i / 200); if(isFinite(y)){ lo = Math.min(lo, y); hi = Math.max(hi, y); } } });
    lo = Math.max(lo, min); hi = Math.min(hi, max); if(!(hi > lo)){ lo -= 1; hi += 1; }
    var p = (hi - lo) * 0.1; return [lo - p, hi + p];
  }
  function legende(L){ return '<div class="legende">' + L.map(function(x){ return '<span><i class="' + x[0] + '"></i>' + esc(x[1]) + "</span>"; }).join("") + "</div>"; }

  // ---------- Reiter 1: Änderungsrate ----------
  var FKT = {
    x2:   { txt: function(){ return "x²"; }, f: function(x){ return x * x; }, d: function(x){ return 2 * x; }, x0: [-3, 3, 1] },
    kub:  { txt: function(){ return zahl(0.5) + "x³ " + M + " 2x"; }, f: function(x){ return 0.5 * x * x * x - 2 * x; }, d: function(x){ return 1.5 * x * x - 2; }, x0: [-3, 3, 1.5] },
    wurz: { txt: function(){ return "√x"; }, f: function(x){ return x >= 0 ? Math.sqrt(x) : NaN; }, d: function(x){ return 0.5 / Math.sqrt(x); }, x0: [0.2, 6, 1], von: 0 },
    sin:  { txt: function(){ return "sin x"; }, f: Math.sin, d: Math.cos, x0: [-3, 3, 1] },
    exp:  { txt: function(){ return "eˣ"; }, f: Math.exp, d: Math.exp, x0: [-2, 2, 0.5] }
  };
  var fktW = "x2", anim = null;
  function aend(){
    var F = FKT[fktW], x0 = Number($("x0").value), h = Number($("h").value);
    $("x0W").textContent = zahl(x0, 2); $("hW").textContent = zahl(h, 3);
    var y0 = F.f(x0), y1 = F.f(x0 + h), ms = (y1 - y0) / h, m = F.d(x0);
    var fT = "f(x) = " + F.txt();
    $("aFkt").innerHTML = bdi(fT);
    var dx = tp("Δx", "tip_dx"), dy = tp("Δy", "tip_dy");
    $("sekF").innerHTML = bdi(tp("m", "tip_ms") + " = " + br(dy, dx) + " = " + br("f(" + tp("x₀", "tip_x0") + " + " + tp("h", "tip_h") + ") " + M + " f(x₀)", "h") + " = " + br("f(" + zahl(x0 + h, 3) + ") " + M + " f(" + zahl(x0, 2) + ")", zahl(h, 3)) + " = " + br(zahl(y1, 4) + " " + M + " " + kl(y0, 4), zahl(h, 3)) + " " + zg(ms, 4));
    $("tanF").innerHTML = bdi(tp("f′(x₀)", "tip_f1") + " = " + tp('<span class="lim">lim<small>h → 0</small></span>', "tip_lim") + " " + br("f(x₀ + h) " + M + " f(x₀)", "h") + " " + zg(m, 4));
    var hs = [1, 0.1, 0.01, 0.001];
    $("hTab").innerHTML = "<tr><th>h</th>" + hs.map(function(q){ return "<td>" + zahl(q, 3) + "</td>"; }).join("") + "<td>→ 0</td></tr><tr><th>" + esc(t("spMs")) + "</th>" + hs.map(function(q){ return "<td>" + zahl((F.f(x0 + q) - y0) / q, 4) + "</td>"; }).join("") + "<td><b>" + zahl(m, 4) + "</b></td></tr>";
    // Graph
    var xa = Math.min(x0, x0 + h) - 2.5, xb = Math.max(x0, x0 + h) + 2.5; if(F.von != null){ xa = Math.max(xa, -0.5); }
    var yr = yBereich([F.f], xa, xb, -12, 12); yr[0] = Math.min(yr[0], Math.min(y0, y1) - 1); yr[1] = Math.max(yr[1], Math.max(y0, y1) + 1);
    plot($("aSvg"), { x0: xa, x1: xb, y0: yr[0], y1: yr[1], abl: { namen: ["f(x)"] },
      kurven: [{ f: F.f, cls: "k-f", von: F.von }],
      linien: [{ x1: xa, y1: y0 + ms * (xa - x0), x2: xb, y2: y0 + ms * (xb - x0), cls: "k-s" }, { x1: xa, y1: y0 + m * (xa - x0), x2: xb, y2: y0 + m * (xb - x0), cls: "k-t" },
               { x1: x0, y1: y0, x2: x0 + h, y2: y0, cls: "k-dr" }, { x1: x0 + h, y1: y0, x2: x0 + h, y2: y1, cls: "k-dr" }],
      punkte: [{ x: x0, y: y0, txt: "P", cls: "pt" }, { x: x0 + h, y: y1, txt: "Q", cls: "pt-q" }],
      texte: Math.abs(h) < 0.4 ? [] : [{ x: x0 + h / 2, y: y0, txt: "Δx", cls: "lab-dr" }, { x: x0 + h, y: (y0 + y1) / 2, txt: " Δy", cls: "lab-dr", anker: "start" }] });
    $("aLeg").innerHTML = legende([["l-f", t("leg_f")], ["l-s", t("leg_s")], ["l-t", t("leg_t")]]);
  }
  function hAnim(){
    if(anim){ cancelAnimationFrame(anim); anim = null; }
    var start = Number($("h").value), t0 = null;
    function schritt2(ts){ if(t0 == null) t0 = ts; var q = Math.min(1, (ts - t0) / 1800), h = Math.exp(Math.log(start) + (Math.log(0.01) - Math.log(start)) * q); $("h").value = h; aend(); if(q < 1) anim = requestAnimationFrame(schritt2); else anim = null; }
    anim = requestAnimationFrame(schritt2);
  }
  // Differenzierbarkeit
  var DB = {
    knick: { f: function(x){ return Math.abs(x); }, sl: -1, sr: 1 },
    sprung: { f: function(x){ return x <= 0 ? x : x + 1; } },
    glatt: { f: function(x){ return x * x; } }
  };
  var dbW = "knick";
  function diffb(){
    var D = DB[dbW], h = Number($("hd").value), f0 = D.f(0); $("hdW").textContent = zahl(h, 2);
    var ml = (D.f(-h) - f0) / (-h), mr = (D.f(h) - f0) / h, hs = [1, 0.1, 0.01, 0.001];
    $("dTab").innerHTML = "<tr><th>h</th>" + hs.map(function(q){ return "<td>" + zahl(q, 3) + "</td>"; }).join("") + "</tr>" +
      "<tr><th>" + esc(t("links")) + "</th>" + hs.map(function(q){ return "<td>" + zahl((D.f(-q) - f0) / (-q), 3) + "</td>"; }).join("") + "</tr>" +
      "<tr><th>" + esc(t("rechts")) + "</th>" + hs.map(function(q){ return "<td>" + zahl((D.f(q) - f0) / q, 3) + "</td>"; }).join("") + "</tr>";
    $("dText").textContent = t("d_" + dbW);
    plot($("dSvg"), { x0: -2.5, x1: 2.5, y0: -2, y1: 3, H: 300, abl: { namen: ["f(x)"] },
      kurven: dbW === "sprung" ? [{ f: D.f, cls: "k-f", bis: 0 }, { f: D.f, cls: "k-f", von: 1e-9 }] : [{ f: D.f, cls: "k-f" }],
      linien: [{ x1: -2.5, y1: f0 + ml * (-2.5), x2: 2.5, y2: f0 + ml * 2.5, cls: "k-l" }, { x1: -2.5, y1: f0 + mr * (-2.5), x2: 2.5, y2: f0 + mr * 2.5, cls: "k-r" }],
      punkte: [{ x: 0, y: f0, txt: "P", cls: "pt" }, { x: -h, y: D.f(-h), cls: "pt-l" }, { x: h, y: D.f(h), cls: "pt-r" }].concat(dbW === "sprung" ? [{ x: 0, y: 1, cls: "pt-offen" }] : []) });
    $("dLeg").innerHTML = legende([["l-l", t("links") + ": m " + zg(ml, 3)], ["l-r", t("rechts") + ": m " + zg(mr, 3)]]);
  }

  // ---------- Reiter 2: Ableitungsregeln ----------
  var U = function(s){ return tp(s, "tip_u"); };
  function RF(){ return {
    potenz: "f(x) = xⁿ  ⇒  f′(x) = n · xⁿ⁻¹",
    faktor: "f(x) = c · g(x)  ⇒  f′(x) = c · g′(x)",
    summe: "f(x) = g(x) ± h(x)  ⇒  f′(x) = g′(x) ± h′(x)",
    produkt: "f(x) = " + U("u(x)") + " · " + U("v(x)") + "  ⇒  f′(x) = " + U("u′(x)") + " · v(x) + u(x) · " + U("v′(x)"),
    quotient: "f(x) = " + br(U("u(x)"), U("v(x)")) + "  ⇒  f′(x) = " + br(U("u′(x)") + " · v(x) " + M + " u(x) · " + U("v′(x)"), "(v(x))²"),
    kette: "f(x) = " + tp("u", "tip_aussen") + "(" + tp("v(x)", "tip_innen") + ")  ⇒  f′(x) = u′(v(x)) · v′(x)"
  }; }
  var hx = function(e){ return "x<sup>" + e + "</sup>"; }, sp = function(e){ return "<sup>" + e + "</sup>"; };
  function BSP(){ var h = zahl(0.5); return {
    potenz: [
      { f: "x⁵", s: [["s_regel", "f′(x) = 5 · x⁵⁻¹ = 5x⁴"]], fn: function(x){ return Math.pow(x, 5); }, d: function(x){ return 5 * Math.pow(x, 4); }, r: [-1.6, 1.6] },
      { f: "√x", s: [["s_umschr", "√x = " + hx("½")], ["s_regel", "f′(x) = ½ · " + hx("½ " + M + " 1") + " = ½ · " + hx(M + "½")], ["s_vereinf", "f′(x) = " + br("1", "2√x")]], fn: function(x){ return x >= 0 ? Math.sqrt(x) : NaN; }, d: function(x){ return x > 0 ? 0.5 / Math.sqrt(x) : NaN; }, r: [0, 5] },
      { f: br("1", "x²"), s: [["s_umschr", br("1", "x²") + " = " + hx(M + "2")], ["s_regel", "f′(x) = " + M + "2 · " + hx(M + "2 " + M + " 1") + " = " + M + "2 · " + hx(M + "3")], ["s_vereinf", "f′(x) = " + M + br("2", "x³")]], fn: function(x){ return 1 / (x * x); }, d: function(x){ return -2 / (x * x * x); }, r: [-3, 3] }
    ],
    faktor: [
      { f: "3x⁴", s: [["s_regel", "f′(x) = 3 · 4x³ = 12x³"]], fn: function(x){ return 3 * Math.pow(x, 4); }, d: function(x){ return 12 * x * x * x; }, r: [-1.5, 1.5] },
      { f: M + "2x⁵", s: [["s_regel", "f′(x) = " + M + "2 · 5x⁴ = " + M + "10x⁴"]], fn: function(x){ return -2 * Math.pow(x, 5); }, d: function(x){ return -10 * Math.pow(x, 4); }, r: [-1.4, 1.4] },
      { f: "4√x", s: [["s_regel", "f′(x) = 4 · " + br("1", "2√x")], ["s_vereinf", "f′(x) = " + br("2", "√x")]], fn: function(x){ return x >= 0 ? 4 * Math.sqrt(x) : NaN; }, d: function(x){ return x > 0 ? 2 / Math.sqrt(x) : NaN; }, r: [0, 5] }
    ],
    summe: [
      { f: "x³ + 5x² " + M + " 2x + 7", s: [["s_summand", "(x³)′ = 3x²,  (5x²)′ = 10x,  (" + M + "2x)′ = " + M + "2,  (7)′ = 0"], ["s_vereinf", "f′(x) = 3x² + 10x " + M + " 2"]], fn: function(x){ return x * x * x + 5 * x * x - 2 * x + 7; }, d: function(x){ return 3 * x * x + 10 * x - 2; }, r: [-5, 1.5] },
      { f: "2x⁴ " + M + " 3x² + 1", s: [["s_summand", "(2x⁴)′ = 8x³,  (" + M + "3x²)′ = " + M + "6x,  (1)′ = 0"], ["s_vereinf", "f′(x) = 8x³ " + M + " 6x"]], fn: function(x){ return 2 * Math.pow(x, 4) - 3 * x * x + 1; }, d: function(x){ return 8 * x * x * x - 6 * x; }, r: [-1.6, 1.6] },
      { f: "x² " + M + " " + br("1", "x"), s: [["s_umschr", "f(x) = x² " + M + " " + hx(M + "1")], ["s_summand", "(x²)′ = 2x,  (" + M + hx(M + "1") + ")′ = " + hx(M + "2")], ["s_vereinf", "f′(x) = 2x + " + br("1", "x²")]], fn: function(x){ return x * x - 1 / x; }, d: function(x){ return 2 * x + 1 / (x * x); }, r: [-3, 3] }
    ],
    produkt: [
      { f: "x² · (3x + 1)", s: [["s_zerlegen", "u = x²,  v = 3x + 1"], ["s_einzeln", "u′ = 2x,  v′ = 3"], ["s_einsetzen", "f′(x) = u′ · v + u · v′ = 2x · (3x + 1) + x² · 3"], ["s_vereinf", "f′(x) = 6x² + 2x + 3x² = 9x² + 2x"]], fn: function(x){ return x * x * (3 * x + 1); }, d: function(x){ return 9 * x * x + 2 * x; }, r: [-1.2, 0.8] },
      { f: "x · eˣ", s: [["s_zerlegen", "u = x,  v = eˣ"], ["s_einzeln", "u′ = 1,  v′ = eˣ"], ["s_einsetzen", "f′(x) = 1 · eˣ + x · eˣ"], ["s_vereinf", "f′(x) = (1 + x) · eˣ"]], fn: function(x){ return x * Math.exp(x); }, d: function(x){ return (1 + x) * Math.exp(x); }, r: [-4, 1.2] },
      { f: "x² · sin x", s: [["s_zerlegen", "u = x²,  v = sin x"], ["s_einzeln", "u′ = 2x,  v′ = cos x"], ["s_einsetzen", "f′(x) = 2x · sin x + x² · cos x"]], fn: function(x){ return x * x * Math.sin(x); }, d: function(x){ return 2 * x * Math.sin(x) + x * x * Math.cos(x); }, r: [-4, 4] }
    ],
    quotient: [
      { f: br("x + 1", "x " + M + " 1"), s: [["s_zerlegen", "u = x + 1,  v = x " + M + " 1"], ["s_einzeln", "u′ = 1,  v′ = 1"], ["s_einsetzen", "f′(x) = " + br("1 · (x " + M + " 1) " + M + " (x + 1) · 1", "(x " + M + " 1)²")], ["s_vereinf", "f′(x) = " + br("x " + M + " 1 " + M + " x " + M + " 1", "(x " + M + " 1)²") + " = " + br(M + "2", "(x " + M + " 1)²")]], fn: function(x){ return (x + 1) / (x - 1); }, d: function(x){ return -2 / ((x - 1) * (x - 1)); }, r: [-3, 4] },
      { f: br("x²", "x + 1"), s: [["s_zerlegen", "u = x²,  v = x + 1"], ["s_einzeln", "u′ = 2x,  v′ = 1"], ["s_einsetzen", "f′(x) = " + br("2x · (x + 1) " + M + " x² · 1", "(x + 1)²")], ["s_vereinf", "f′(x) = " + br("x² + 2x", "(x + 1)²")]], fn: function(x){ return x * x / (x + 1); }, d: function(x){ return (x * x + 2 * x) / ((x + 1) * (x + 1)); }, r: [-4, 3] },
      { f: br("eˣ", "x"), s: [["s_zerlegen", "u = eˣ,  v = x"], ["s_einzeln", "u′ = eˣ,  v′ = 1"], ["s_einsetzen", "f′(x) = " + br("eˣ · x " + M + " eˣ · 1", "x²")], ["s_vereinf", "f′(x) = " + br("(x " + M + " 1) · eˣ", "x²")]], fn: function(x){ return Math.exp(x) / x; }, d: function(x){ return (x - 1) * Math.exp(x) / (x * x); }, r: [-3, 3] }
    ],
    kette: [
      { f: "(3x + 2)⁵", s: [["s_aussen", "u(z) = z⁵,  v(x) = 3x + 2"], ["s_einzeln", "u′(z) = 5z⁴,  v′(x) = 3"], ["s_einsetzen", "f′(x) = u′(v(x)) · v′(x) = 5 · (3x + 2)⁴ · 3"], ["s_vereinf", "f′(x) = 15 · (3x + 2)⁴"]], fn: function(x){ return Math.pow(3 * x + 2, 5); }, d: function(x){ return 15 * Math.pow(3 * x + 2, 4); }, r: [-1.2, 0] },
      { f: "e" + sp("2x"), s: [["s_aussen", "u(z) = eᶻ,  v(x) = 2x"], ["s_einzeln", "u′(z) = eᶻ,  v′(x) = 2"], ["s_einsetzen", "f′(x) = e" + hx("2x") + " · 2"], ["s_vereinf", "f′(x) = 2e" + hx("2x")]], fn: function(x){ return Math.exp(2 * x); }, d: function(x){ return 2 * Math.exp(2 * x); }, r: [-2, 1] },
      { f: "√(x² + 1)", s: [["s_aussen", "u(z) = √z,  v(x) = x² + 1"], ["s_einzeln", "u′(z) = " + br("1", "2√z") + ",  v′(x) = 2x"], ["s_einsetzen", "f′(x) = " + br("1", "2√(x² + 1)") + " · 2x"], ["s_vereinf", "f′(x) = " + br("x", "√(x² + 1)")]], fn: function(x){ return Math.sqrt(x * x + 1); }, d: function(x){ return x / Math.sqrt(x * x + 1); }, r: [-3, 3] },
      { f: "sin(x²)", s: [["s_aussen", "u(z) = sin z,  v(x) = x²"], ["s_einzeln", "u′(z) = cos z,  v′(x) = 2x"], ["s_einsetzen", "f′(x) = cos(x²) · 2x"], ["s_vereinf", "f′(x) = 2x · cos(x²)"]], fn: function(x){ return Math.sin(x * x); }, d: function(x){ return 2 * x * Math.cos(x * x); }, r: [-2.5, 2.5] }
    ]
  }; }
  var REGELN = ["potenz", "faktor", "summe", "produkt", "quotient", "kette"], regelW = "potenz", bspI = 0;
  function regeln(){
    var box = $("rWahl"); box.innerHTML = REGELN.map(function(r){ return '<button type="button" data-r="' + r + '" aria-pressed="' + (r === regelW) + '">' + esc(t("r_" + r)) + "</button>"; }).join("");
    box.querySelectorAll("button").forEach(function(b){ b.addEventListener("click", function(){ regelW = b.dataset.r; bspI = 0; regeln(); }); });
    $("rH").textContent = t("r_" + regelW); $("rFormel").innerHTML = bdi(RF()[regelW]); $("rErkl").textContent = t("e_" + regelW);
    var L = BSP()[regelW]; if(bspI >= L.length) bspI = 0;
    var bb = $("bWahl"); bb.innerHTML = L.map(function(x, i){ return '<button type="button" data-i="' + i + '" aria-pressed="' + (i === bspI) + '">' + esc(t("bspL", { i: i + 1 })) + "</button>"; }).join("");
    bb.querySelectorAll("button").forEach(function(b){ b.addEventListener("click", function(){ bspI = +b.dataset.i; regeln(); }); });
    var E = L[bspI];
    $("bF").innerHTML = bdi("f(x) = " + E.f);
    $("bSchritte").innerHTML = E.s.map(function(s){ return '<li><span class="sh">' + esc(t(s[0])) + "</span>" + bdi(s[1]) + "</li>"; }).join("");
    var yr = yBereich([E.fn, E.d], E.r[0], E.r[1], -12, 12);
    plot($("rSvg"), { x0: E.r[0], x1: E.r[1], y0: Math.min(yr[0], -0.5), y1: Math.max(yr[1], 0.5), H: 300, abl: { namen: ["f(x)", "f′(x)"] }, kurven: [{ f: E.fn, cls: "k-f" }, { f: E.d, cls: "k-fa" }] });
    $("rLeg").innerHTML = legende([["l-f", "f"], ["l-fa", t("leg_fa")]]);
  }
  function wichtig(){
    var W = [["xⁿ", "n · xⁿ⁻¹"], ["c", "0"], ["√x", br("1", "2√x")], [br("1", "x"), M + br("1", "x²")], ["eˣ", "eˣ"], ["e" + sp("kx"), "k · e" + sp("kx")], ["ln x", br("1", "x")], ["sin x", "cos x"], ["cos x", M + "sin x"]];
    $("wTab").innerHTML = "<tr><th>f(x)</th><th>f′(x)</th></tr>" + W.map(function(w){ return "<tr><td>" + bdi(w[0]) + "</td><td>" + bdi(w[1]) + "</td></tr>"; }).join("");
  }

  // ---------- Reiter 3: Optimierung ----------
  var szW = "gewinn";
  function zeilen(L){ return L.map(function(z){ return '<li><span class="sh">' + esc(t(z[0])) + "</span>" + (z[2] ? z[1] : bdi(z[1])) + "</li>"; }).join(""); }
  function opt(){
    ["gewinn", "zaun", "dose"].forEach(function(k){ sicht($("o_" + k), k === szW); });
    if(szW === "gewinn") gewinn(); else if(szW === "zaun") zaun(); else dose();
  }
  function gewinn(){
    var p = Number($("op").value), F = Number($("oF").value); $("opW").textContent = p + " €"; $("oFW").textContent = F + " €";
    $("gText").textContent = t("g_text");
    var K = function(x){ return 0.1 * x * x * x - 3 * x * x + 40 * x + F; }, E = function(x){ return p * x; }, G = function(x){ return E(x) - K(x); };
    var a = p - 40, Dk = 36 + 1.2 * a, xm = (6 + Math.sqrt(Math.max(0, Dk))) / 0.6, gm = G(xm);
    var Bq = window.FK ? FK.B : null, L = [];
    var lin = a === 0 ? "" : (a > 0 ? " + " + a : " " + M + " " + (-a)), Gt = M + zahl(0.1) + "x³ + 3x²" + (lin ? lin + "x" : "") + (F ? " " + M + " " + F : ""), G1t = M + zahl(0.3) + "x² + 6x" + lin;
    L.push(["st_ziel", tp("G(x)", "tip_G") + " = " + tp("E(x)", "tip_E") + " " + M + " " + tp("K(x)", "tip_K") + " = " + p + "x " + M + " (" + zahl(0.1) + "x³ " + M + " 3x² + 40x + " + F + ")"]);
    L.push(["", "G(x) = " + Gt]);
    L.push(["st_abl", "G′(x) = " + G1t + ",   G″(x) = " + M + zahl(0.6) + "x + 6"]);
    if(window.FL && Bq){ var g1 = FK.trim([Bq(a), Bq(6), Bq(-3, 10)]); L.push(["st_null", FL.html(g1, "G′(x)"), true]); }
    else L.push(["st_null", "G′(x) = 0  ⇒  x ≈ " + zahl(xm)]);
    L.push(["st_pruef", "G″(" + zahl(xm) + ") = " + zahl(-0.6 * xm + 6) + " < 0  ⇒  " + t("max")]);
    L.push(["st_erg", "G(" + zahl(xm) + ") ≈ " + zahl(gm)]);
    $("gWeg").innerHTML = zeilen(L);
    // Gewinnzone (Nullstellen von G für x ≥ 0)
    var nst = []; for(var x = 0; x < 40; x += 0.01){ if(G(x) * G(x + 0.01) < 0) nst.push(x + 0.005); }
    $("gErg").innerHTML = gm > 0 ? t("g_erg", { x: zahl(xm, 2), g: zahl(gm, 2) }) + (nst.length >= 2 ? "<br>" + t("g_zone", { a: zahl(nst[0], 1), b: zahl(nst[nst.length - 1], 1) }) : "") : t("g_kein");
    var yr = yBereich([K, E, G], 0, 32, -800, 3000);
    plot($("gSvg"), { x0: 0, x1: 32, y0: Math.min(yr[0], -200), y1: yr[1], xName: "x", abl: { namen: ["K(x)", "E(x)", "G(x)"] },
      kurven: [{ f: K, cls: "k-K" }, { f: E, cls: "k-E" }, { f: G, cls: "k-G" }],
      linien: [{ x1: xm, y1: 0, x2: xm, y2: gm, cls: "k-dr" }],
      punkte: [{ x: xm, y: gm, txt: t("max"), cls: "pt-max" }] });
    $("gLeg").innerHTML = legende([["l-K", t("leg_K")], ["l-E", t("leg_E")], ["l-G", t("leg_G")]]);
  }
  function zaun(){
    var Lz = Number($("oL").value), xs = $("ox"); xs.max = Lz / 2; var x = Math.min(Number(xs.value), Lz / 2);
    $("oLW").textContent = Lz + " m"; $("oxW").textContent = zahl(x, 1) + " m";
    $("zText").textContent = t("z_text", { l: Lz });
    var A = function(q){ return q * (Lz - 2 * q); }, xm = Lz / 4;
    $("zWeg").innerHTML = zeilen([
      ["st_neben", "2x + y = " + Lz + "  ⇒  y = " + Lz + " " + M + " 2x"], ["st_ziel", "A = x · y"], ["st_einsetzen", "A(x) = x · (" + Lz + " " + M + " 2x) = " + Lz + "x " + M + " 2x²"],
      ["st_abl", "A′(x) = " + Lz + " " + M + " 4x,   A″(x) = " + M + "4"], ["st_null", Lz + " " + M + " 4x = 0  ⇒  x = " + Lz + " : 4 = " + zahl(xm)], ["st_pruef", "A″(" + zahl(xm) + ") = " + M + "4 < 0  ⇒  " + t("max")]]);
    $("zErg").innerHTML = t("z_erg", { x: zahl(xm), y: zahl(Lz - 2 * xm), a: zahl(A(xm)) }) + "<br>" + t("z_jetzt", { x: zahl(x, 1), a: zahl(A(x), 1) });
    plot($("zSvg"), { x0: 0, x1: Lz / 2, y0: 0, y1: A(xm) * 1.15, H: 280, xName: "x", abl: { namen: ["A(x)"] }, kurven: [{ f: A, cls: "k-G" }], linien: [{ x1: x, y1: 0, x2: x, y2: A(x), cls: "k-dr" }], punkte: [{ x: xm, y: A(xm), txt: t("max"), cls: "pt-max" }, { x: x, y: A(x), cls: "pt" }] });
    // Skizze: Mauer oben, Beet darunter (maßstabsgetreu: ganze Zaunlänge = Breite der Skizze)
    var sv = $("zSkizze"); leer(sv); var W = 300, sk = (W - 40) / Lz, bw = (Lz - 2 * x) * sk, bh = x * sk, H2 = Math.max(60, 18 + bh + 26);
    sv.setAttribute("viewBox", "0 0 " + W + " " + H2);
    sv.appendChild(el("rect", { x: 10, y: 8, width: W - 20, height: 10, "class": "mauer" }));
    sv.appendChild(el("rect", { x: (W - bw) / 2, y: 18, width: Math.max(bw, 1), height: Math.max(bh, 1), "class": "beet" }));
    sv.appendChild(el("text", { x: (W - bw) / 2 - 6, y: 18 + bh / 2 + 5, "class": "lab", "text-anchor": "end" }, "x"));
    sv.appendChild(el("text", { x: W / 2, y: 18 + bh + 18, "class": "lab", "text-anchor": "middle" }, "y"));
  }
  function dose(){
    var V = Number($("oV").value), r = Number($("or").value); $("oVW").textContent = V + " cm³"; $("orW").textContent = zahl(r, 1) + " cm";
    $("doText").textContent = t("d_text", { v: V });
    var O = function(q){ return 2 * Math.PI * q * q + 2 * V / q; }, rm = Math.cbrt(V / (2 * Math.PI)), hm = V / (Math.PI * rm * rm);
    $("doWeg").innerHTML = zeilen([
      ["st_neben", "V = π · r² · h = " + V + "  ⇒  h = " + br(V, "π · r²")], ["st_ziel", "O = 2 · π · r² + 2 · π · r · h"], ["st_einsetzen", "O(r) = 2πr² + " + br(2 * V, "r")],
      ["st_abl", "O′(r) = 4πr " + M + " " + br(2 * V, "r²")], ["st_null", "4πr = " + br(2 * V, "r²") + "  ⇒  r³ = " + br(V, "2π") + "  ⇒  r = ∛" + br(V, "2π") + " ≈ " + zahl(rm)],
      ["st_pruef", "O″(r) = 4π + " + br(4 * V, "r³") + " > 0  ⇒  " + t("min")]]);
    $("doErg").innerHTML = t("d_erg", { r: zahl(rm), h: zahl(hm), o: zahl(O(rm), 1) }) + "<br>" + t("d_jetzt", { r: zahl(r, 1), o: zahl(O(r), 1) });
    var yr = [0, O(rm) * 3];
    plot($("doSvg"), { x0: 0, x1: 15, y0: yr[0], y1: yr[1], H: 280, xName: "r", abl: { x: "r", namen: ["O(r)"] }, kurven: [{ f: O, cls: "k-G", von: 0.3 }], linien: [{ x1: r, y1: 0, x2: r, y2: O(r), cls: "k-dr" }], punkte: [{ x: rm, y: O(rm), txt: t("min"), cls: "pt-max" }, { x: r, y: O(r), cls: "pt" }] });
  }

  // ---------- Reiter 4: Differentialgleichungen ----------
  var DG = {
    wachs:  { k: [0.05, 1, 0.05, 0.3], f0: [0.5, 10, 0.5, 2], t1: 10, gl: function(){ return "f′(t) = k · f(t)"; }, rhs: function(k, S, f){ return k * f; }, l: function(k, S, f0, x){ return f0 * Math.exp(k * x); }, lt: function(k, S, f0){ return "f(t) = " + zahl(f0) + " · e" + sp(zahl(k) + "t"); } },
    zerfall:{ k: [0.05, 1, 0.05, 0.2], f0: [10, 100, 5, 50], t1: 15, gl: function(){ return "f′(t) = " + M + "k · f(t)"; }, rhs: function(k, S, f){ return -k * f; }, l: function(k, S, f0, x){ return f0 * Math.exp(-k * x); }, lt: function(k, S, f0){ return "f(t) = " + zahl(f0) + " · e" + sp(M + zahl(k) + "t"); } },
    kuehl:  { k: [0.02, 0.4, 0.01, 0.1], f0: [40, 100, 5, 90], S: [0, 35, 1, 20], t1: 40, gl: function(){ return "f′(t) = " + M + "k · (f(t) " + M + " S)"; }, rhs: function(k, S, f){ return -k * (f - S); }, l: function(k, S, f0, x){ return S + (f0 - S) * Math.exp(-k * x); }, lt: function(k, S, f0){ return "f(t) = " + zahl(S) + " + " + zahl(f0 - S) + " · e" + sp(M + zahl(k) + "t"); } },
    logist: { k: [0.2, 2, 0.1, 0.8], f0: [1, 100, 1, 10], S: [100, 1000, 50, 500], t1: 20, gl: function(){ return "f′(t) = k · f(t) · (1 " + M + " " + br("f(t)", "S") + ")"; }, rhs: function(k, S, f){ return k * f * (1 - f / S); }, l: function(k, S, f0, x){ return S / (1 + (S / f0 - 1) * Math.exp(-k * x)); }, lt: function(k, S, f0){ return "f(t) = " + br(zahl(S), "1 + " + zahl(S / f0 - 1) + " · e" + sp(M + zahl(k) + "t")); } }
  };
  var dgW = "wachs";
  function reglerSetzen(id, r, wert){ var e = $(id); e.min = r[0]; e.max = r[1]; e.step = r[2]; e.value = wert != null ? wert : r[3]; }
  function dglWahl(neu){ var D = DG[dgW]; reglerSetzen("dk", D.k); reglerSetzen("df0", D.f0); sicht($("dSBox"), !!D.S); if(D.S) reglerSetzen("dS", D.S); if(neu) dgl(); }
  function dgl(){
    var D = DG[dgW], k = Number($("dk").value), f0 = Number($("df0").value), S = D.S ? Number($("dS").value) : 0;
    $("dkW").textContent = zahl(k); $("df0W").textContent = zahl(f0); $("dSW").textContent = zahl(S);
    $("dgT").textContent = t("dgT_" + dgW);
    var gl = D.gl().replace("f′(t)", tp("f′(t)", "tip_ft")).replace(/(^|[ (·])k( ·)/, "$1" + tp("k", "tip_k") + "$2").replace(/(\(| )S\)/, "$1" + tp("S", "tip_S") + ")");
    $("dgGl").innerHTML = bdi(gl);
    var f = function(x){ return D.l(k, S, f0, x); }, f1 = f(1), rhs1 = D.rhs(k, S, f1), num = (f(1 + 1e-5) - f(1 - 1e-5)) / 2e-5;
    $("dgLoes").innerHTML = "<b>" + esc(t("loesL")) + "</b> " + bdi(D.lt(k, S, f0)) + "<br><b>" + esc(t("probeL")) + "</b> " + bdi("f(1) ≈ " + zahl(f1) + ";  " + D.gl().replace(/f\(t\)/g, "f(1)").replace("f′(t)", "f′(1)").replace(/\bk\b/, zahl(k)).replace(/\bS\b/g, zahl(S)) + " ≈ " + zahl(rhs1) + "  ✓");
    void num;
    var t1 = D.t1, yr = [0, 0];
    var ymax = Math.max(f0, S, f(t1), f(0)) * 1.15; if(dgW === "wachs") ymax = Math.min(f(t1), 200) * 1.1; yr = [0, Math.max(ymax, 1)];
    var feld = []; for(var i = 0; i <= 16; i++) for(var j = 1; j <= 10; j++){ var tx = t1 * i / 16, fy = yr[1] * j / 10.5; feld.push([tx, fy, D.rhs(k, S, fy)]); }
    var polys = [];
    if($("dEuler").checked){ var dt = t1 / 8, pts = [[0, f0]], y = f0; for(var s = 1; s <= 8; s++){ y = y + dt * D.rhs(k, S, y); pts.push([s * dt, y]); } polys.push({ pts: pts, cls: "k-eu" }); }
    plot($("dgSvg"), { x0: 0, x1: t1, y0: yr[0], y1: yr[1], xName: "t", abl: { x: "t", namen: ["f(t)"] }, feld: feld, kurven: [{ f: f, cls: "k-f" }], polys: polys, punkte: [{ x: 0, y: f0, cls: "pt", txt: "f(0)" }].concat($("dEuler").checked ? polys[0].pts.slice(1).map(function(q){ return { x: q[0], y: q[1], r: 3.5, cls: "pt-eu" }; }) : []), linien: D.S && dgW === "kuehl" ? [{ x1: 0, y1: S, x2: t1, y2: S, cls: "k-dr" }] : dgW === "logist" ? [{ x1: 0, y1: S, x2: t1, y2: S, cls: "k-dr" }] : [] });
    sicht($("eulerT"), $("dEuler").checked); $("eulerT").textContent = t("eulerT");
  }

  // ---------- Reiter 4, Teil 2: Grundbegriffe, Lösen, Prüfen, freier Fall ----------
  var dgNav = "begr", quizA = {};
  var dotT = function(s){ return tp(s, "tip_dot"); };
  function dglTeil(){
    document.querySelectorAll("#dgNav button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.n === dgNav ? "true" : "false"); });
    ["vorg", "begr", "loes", "pruef", "fall"].forEach(function(n){ sicht($("dg_" + n), n === dgNav); });
    if(dgNav === "vorg") dgl(); else if(dgNav === "begr") begriffe(); else if(dgNav === "loes") loesen(); else if(dgNav === "pruef") pruefen(); else fall();
  }
  var QUIZ = [{ g: "ẏ = 2y", o: 1, e: 1 }, { g: "ÿ = 6y + ẏ", o: 2, e: 1 }, { g: "ÿ " + M + " 6y " + M + " ẏ = 0", o: 2, e: 0 }, { g: "y′ + 3y = x", o: 1, e: 0 }, { g: "y‴ = x · y′", o: 3, e: 1 }, { g: "s̈ = g", o: 2, e: 1 }];
  function begriffe(){
    $("bTab").innerHTML = "<tr><th></th><th>y(t)</th><th>y(x)</th><th>Leibniz</th></tr>" +
      [["b_s1", dotT("ẏ"), "y′", br("dy", "dt")], ["b_s2", dotT("ÿ"), "y″", br("d²y", "dt²")], ["b_sn", "–", "y⁽ⁿ⁾", br("dⁿy", "dtⁿ")]].map(function(r){ return "<tr><th>" + esc(t(r[0])) + "</th><td>" + bdi(r[1]) + "</td><td>" + bdi(r[2]) + "</td><td>" + bdi(r[3]) + "</td></tr>"; }).join("");
    $("bOrd").innerHTML = '<div class="bsp2"><div>' + bdi(dotT("ẏ") + " = 2y") + " → " + esc(t("b_ord1")) + "</div><div>" + bdi(dotT("ÿ") + " = 6y + ẏ") + " → " + esc(t("b_ord2")) + "</div><div>" + bdi("y⁽ⁿ⁾ = …") + " → n</div></div>";
    $("bExpl").innerHTML = '<div class="bsp2"><div><b class="ok-t">✓ ' + esc(t("expl")) + "</b><br>" + bdi("ÿ = 6y + ẏ") + '<br><span class="muted">' + esc(t("b_expl")) + '</span></div><div><b class="no-t">' + esc(t("impl")) + "</b><br>" + bdi("ÿ " + M + " 6y " + M + " ẏ = 0") + '<br><span class="muted">' + esc(t("b_impl")) + "</span></div></div>";
    var alle = true;
    $("bQuiz").innerHTML = '<div class="quiz">' + QUIZ.map(function(q, i){ var a = quizA[i] || {}; var ok = a.o === q.o && a.e === q.e; if(!ok) alle = false;
      return "<div><b>" + bdi(q.g) + "</b> <span>" + esc(t("b_ordL")) + '</span> <span class="wahl">' + [1, 2, 3].map(function(o){ return '<button type="button" data-q="' + i + '" data-o="' + o + '" aria-pressed="' + (a.o === o) + '">' + o + "</button>"; }).join("") + '</span> <span class="wahl">' + [1, 0].map(function(e){ return '<button type="button" data-q="' + i + '" data-e="' + e + '" aria-pressed="' + (a.e === e) + '">' + esc(t(e ? "expl" : "impl")) + "</button>"; }).join("") + "</span> " +
        (a.o != null && a.e != null ? (ok ? '<span class="ok">✓</span>' : '<span class="no">✗</span>') : "") + "</div>"; }).join("") + "</div>" + (alle ? '<p class="ergebnis">' + esc(t("b_alle")) + "</p>" : "");
    $("bQuiz").querySelectorAll("button").forEach(function(b){ b.addEventListener("click", function(){ var i = +b.dataset.q; quizA[i] = quizA[i] || {}; if(b.dataset.o) quizA[i].o = +b.dataset.o; else quizA[i].e = +b.dataset.e; begriffe(); }); });
  }
  function loesen(){
    var k = Number($("lk").value); if(Math.abs(k) < 0.05) k = 0.1; var y0 = Number($("ly0").value);
    $("lkW").textContent = zahl(k); $("ly0W").textContent = zahl(y0);
    var kk = zahl(k), C = tp("C", "tip_C"), e = function(x){ return "e" + sp(x); };
    $("lWeg").innerHTML = zeilen([
      ["l_s1", br("dy", "dt") + " = " + kl(k) + " · y"],
      ["l_s2", br("1", "y") + " dy = " + kl(k) + " dt"],
      ["l_s3", "∫ " + br("1", "y") + " dy = ∫ " + kl(k) + " dt   ⇒   ln|y| = " + kk + "t + C₁"],
      ["l_s4", "|y| = " + e(kk + "t + C₁") + " = " + e("C₁") + " · " + e(kk + "t") + "   ⇒   y = " + C + " · " + e(kk + "t")],
      ["l_s5", "y(0) = " + C + " · e⁰ = C = " + zahl(y0)],
      ["l_s6", "y(t) = " + zahl(y0) + " · " + e(kk + "t")],
      ["l_s7", dotT("ẏ") + " = " + zahl(y0) + " · " + kl(k) + " · " + e(kk + "t") + " = " + kl(k) + " · y  ✓"]]);
    var kurven = [-3, -2, -1, 1, 2, 3, 4].map(function(c){ return { f: function(x){ return c * Math.exp(k * x); }, cls: "k-schar" }; });
    kurven.push({ f: function(x){ return y0 * Math.exp(k * x); }, cls: "k-f" });
    plot($("lSvg"), { x0: -2, x1: 3, y0: -6, y1: 8, H: 320, xName: "t", abl: { x: "t", namen: kurven.map(function(k, i){ return i === kurven.length - 1 ? "y(t)" : null; }) }, kurven: kurven, punkte: [{ x: 0, y: y0, txt: "y(0)", cls: "pt" }] });
  }
  var PDGL = [{ g: "ÿ = 6y + ẏ", p: 1, q: 6 }, { g: "ÿ = 4y", p: 0, q: 4 }, { g: "ÿ = " + M + "3ẏ " + M + " 2y", p: -3, q: -2 }, { g: "ÿ = 2ẏ " + M + " y", p: 2, q: -1 }, { g: "ÿ = ẏ + 2y", p: 1, q: 2 }];
  var pW = 0;
  function pruefen(){
    var P = PDGL[pW], a = Number($("pa").value), C = Number($("pc").value); $("paW").textContent = a; $("pcW").textContent = C;
    var e = "e" + sp((a === 1 ? "" : a === -1 ? M : a) + "t"), ce = (C === 1 ? "" : C + " · ") + e;
    $("pVor").innerHTML = bdi("y = " + ce);
    var l = a * a, r = P.p * a + P.q, gleich = l === r;
    var rTxt = (P.p ? (P.p === 1 ? "" : P.p === -1 ? M : P.p + " · ") + "(" + a * C + " · " + e + ")" : "") + (P.q ? (P.p ? (P.q > 0 ? " + " : " " + M + " ") + Math.abs(P.q) : P.q) + " · (" + ce + ")" : "");
    $("pWeg").innerHTML = zeilen([
      ["p_s1", dotT("ẏ") + " = " + (a * C) + " · " + e + ",   " + dotT("ÿ") + " = " + (a * a * C) + " · " + e],
      ["p_s2", (a * a * C) + " · " + e + " = " + rTxt.replace(/\+ −/g, M)],
      ["p_s3", (a * a) + " " + (gleich ? "=" : "≠") + " " + (P.p ? P.p + " · " + kl(a) : "") + (P.q ? (P.p ? (P.q > 0 ? " + " : " " + M + " ") + Math.abs(P.q) : P.q) : "") + " = " + r]]);
    $("pErg").textContent = t(gleich ? "p_ja" : "p_nein"); $("pErg").style.color = gleich ? "" : "var(--schlecht)";
    var D = P.p * P.p + 4 * P.q, wurzeln = D < 0 ? [] : D === 0 ? [P.p / 2] : [(P.p - Math.sqrt(D)) / 2, (P.p + Math.sqrt(D)) / 2];
    $("pTipp").innerHTML = esc(t("p_tipp")) + " " + bdi("a² " + (P.p ? (P.p > 0 ? M + " " : "+ ") + (Math.abs(P.p) === 1 ? "" : Math.abs(P.p)) + "a " : "") + (P.q ? (P.q > 0 ? M + " " : "+ ") + Math.abs(P.q) + " " : "") + "= 0   ⇒   a = " + wurzeln.map(function(w){ return zahl(w); }).join(" " + t("oder") + " "));
  }
  var ORTE = { erde: 9.81, mond: 1.62, mars: 3.71 }, fOrt = "erde";
  function fall(){
    var g = ORTE[fOrt], v0 = Number($("fv0").value), tt = Number($("ft").value); $("fv0W").textContent = v0 + " m/s"; $("ftW").textContent = zahl(tt, 1) + " s";
    var gT = tp("g", "tip_g"), s = function(x){ return 0.5 * g * x * x + v0 * x; }, v = function(x){ return g * x + v0; };
    $("fWeg").innerHTML = zeilen([
      ["f_geg", "s̈ = " + gT + " = " + zahl(g) + " m/s²,   ṡ(0) = " + tp("v₀", "tip_v0") + " = " + v0 + ",   s(0) = 0"],
      ["f_s1", "v = ṡ = ∫ g dt = g · t + C₁;   ṡ(0) = C₁ = " + v0 + "   ⇒   v(t) = " + zahl(g) + "t" + (v0 ? " + " + v0 : "")],
      ["f_s2", "s = ∫ (g · t + v₀) dt = ½ g t² + v₀ t + C₂;   s(0) = C₂ = 0   ⇒   s(t) = " + zahl(g / 2, 3) + "t²" + (v0 ? " + " + v0 + "t" : "")],
      ["f_s3", "v(" + zahl(tt, 1) + ") = " + zahl(v(tt)) + " m/s,   s(" + zahl(tt, 1) + ") = " + zahl(s(tt)) + " m"]]);
    var ymax = Math.max(s(5), v(5)) * 1.1;
    plot($("fSvg"), { x0: 0, x1: 5, y0: 0, y1: ymax, H: 320, xName: "t", abl: { x: "t", namen: ["s(t)", "v(t)"] }, kurven: [{ f: s, cls: "k-f" }, { f: v, cls: "k-fa" }], linien: [{ x1: tt, y1: 0, x2: tt, y2: Math.max(s(tt), v(tt)), cls: "k-dr" }],
      punkte: [{ x: tt, y: s(tt), cls: "pt", txt: zahl(s(tt), 1) + " m" }, { x: tt, y: v(tt), cls: "pt-r", txt: zahl(v(tt), 1) + " m/s", dy: 16 }] });
    $("fLeg").innerHTML = legende([["l-f", t("leg_sF")], ["l-fa", t("leg_vF")]]);
  }
  ["lk", "ly0"].forEach(function(id){ $(id).addEventListener("input", loesen); });
  ["pa", "pc"].forEach(function(id){ $(id).addEventListener("input", pruefen); });
  $("pDgl").addEventListener("change", function(){ pW = +$("pDgl").value; pruefen(); });
  ["fv0", "ft"].forEach(function(id){ $(id).addEventListener("input", fall); });
  $("fOrt").addEventListener("change", function(){ fOrt = $("fOrt").value; fall(); });
  document.querySelectorAll("#dgNav button").forEach(function(b){ b.addEventListener("click", function(){ dgNav = b.dataset.n; dglTeil(); }); });

  // ---------- Reiter 5: Üben ----------
  var auf = null, nr = 0, punkte = 0, gemacht = 0, status = null;
  function pol(c){ // [a3, a2, a1, a0] → Text
    var s = "", grade = c.length - 1;
    c.forEach(function(a, i){ var g = grade - i; if(!a) return; var abs = Math.abs(a), vz = a < 0 ? (s ? " " + M + " " : M) : (s ? " + " : "");
      s += vz + (g === 0 ? zahl(abs) : (abs === 1 ? "" : zahl(abs)) + "x" + (g > 1 ? hoch(g) : "")); });
    return s || "0";
  }
  var GENU = {
    dq: function(){ var a = wahl([1, 2, 3, -1, 0.5]), x1 = zuf(-2, 2), x2 = x1 + zuf(1, 3), f = function(x){ return a * x * x; }, m = (f(x2) - f(x1)) / (x2 - x1);
      return { txt: t("u_dq", { f: pol([a, 0, 0]), a: x1, b: x2 }), soll: m, weg: ["f(" + x2 + ") = " + zahl(f(x2)) + ",  f(" + x1 + ") = " + zahl(f(x1)), "m = " + br("f(" + x2 + ") " + M + " f(" + x1 + ")", x2 + " " + M + " " + kl(x1)) + " = " + br(zahl(f(x2)) + " " + M + " " + kl(f(x1)), x2 - x1) + " = " + zahl(m)] }; },
    abl: function(){ var c = [wahl([1, 2, -1, 0.5]), zuf(-3, 3), zuf(-5, 5), zuf(-5, 5)], x0 = zuf(-2, 2), d = [3 * c[0], 2 * c[1], c[2]], v = d[0] * x0 * x0 + d[1] * x0 + d[2];
      return { txt: t("u_abl", { x: x0, f: pol(c) }), soll: v, weg: ["f′(x) = " + pol(d), "f′(" + x0 + ") = " + zahl(d[0]) + " · " + kl(x0) + "² + " + kl(d[1]) + " · " + kl(x0) + " + " + kl(d[2]) + " = " + zahl(v)] }; },
    prod: function(){ var a = zuf(-3, 3), b = wahl([1, 2, 3, -2]), c = zuf(-4, 4), x0 = zuf(-2, 2);
      var u = x0 * x0 + a, v = b * x0 + c, up = 2 * x0, vp = b, w = up * v + u * vp;
      return { txt: t("u_prod", { x: x0, f: "(" + pol([1, 0, a]) + ") · (" + pol([b, c]) + ")" }), soll: w, weg: ["u = " + pol([1, 0, a]) + ",  v = " + pol([b, c]) + ",  u′ = 2x,  v′ = " + zahl(b), "f′(x) = 2x · (" + pol([b, c]) + ") + (" + pol([1, 0, a]) + ") · " + kl(b), "f′(" + x0 + ") = " + kl(up) + " · " + kl(v) + " + " + kl(u) + " · " + kl(vp) + " = " + zahl(w)] }; },
    quot: function(){ var a = wahl([1, 2, 3]), b = zuf(-3, 3), c = zuf(-3, 3), x0 = zuf(-2, 2); while(x0 + c === 0) x0 = zuf(-2, 3);
      var w = (a * c - b) / ((x0 + c) * (x0 + c));
      return { txt: t("u_quot", { x: x0, f: "(" + pol([a, b]) + ") / (" + pol([1, c]) + ")" }), soll: w, weg: ["u = " + pol([a, b]) + ",  v = " + pol([1, c]) + ",  u′ = " + a + ",  v′ = 1", "f′(x) = " + br(a + " · (" + pol([1, c]) + ") " + M + " (" + pol([a, b]) + ") · 1", "(" + pol([1, c]) + ")²") + " = " + br(zahl(a * c - b), "(" + pol([1, c]) + ")²"), "f′(" + x0 + ") = " + br(zahl(a * c - b), kl(x0 + c) + "²") + " " + zg(w, 2)] }; },
    kette: function(){ var a = wahl([2, 3, -1, 4]), b = zuf(-3, 3), n = wahl([2, 3, 4]), x0 = zuf(-1, 1), inn = a * x0 + b, w = n * Math.pow(inn, n - 1) * a;
      return { txt: t("u_kette", { x: x0, f: "(" + pol([a, b]) + ")" + hoch(n) }), soll: w, weg: ["u(z) = z" + hoch(n) + ",  v(x) = " + pol([a, b]) + ",  u′(z) = " + n + "z" + (n > 2 ? hoch(n - 1) : "") + ",  v′(x) = " + zahl(a), "f′(x) = " + n + " · (" + pol([a, b]) + ")" + (n > 2 ? hoch(n - 1) : "") + " · " + kl(a), "f′(" + x0 + ") = " + n + " · " + kl(inn) + (n > 2 ? hoch(n - 1) : "") + " · " + kl(a) + " = " + zahl(w)] }; },
    zaun: function(){ var L = wahl([40, 60, 80, 100, 120, 36, 50]);
      return { txt: t("u_zaun", { l: L }), soll: L / 4, weg: ["A(x) = x · (" + L + " " + M + " 2x) = " + L + "x " + M + " 2x²", "A′(x) = " + L + " " + M + " 4x = 0  ⇒  x = " + zahl(L / 4), "A″(x) = " + M + "4 < 0  ⇒  " + t("max")] }; },
    dgl_ord: function(){ var q = wahl(QUIZ.concat([{ g: "y⁗ + y = 0", o: 4 }, { g: "ẏ = " + M + "0,3 · y".replace("0,3", zahl(0.3)), o: 1 }]));
      return { txt: t("u_ord", { g: q.g }), soll: q.o, weg: [q.g + "  →  " + (q.o === 1 ? "ẏ / y′" : q.o === 2 ? "ÿ / y″" : q.o === 3 ? "y‴" : "y⁗") + "  ⇒  " + q.o] }; },
    dgl_trenn: function(){ var k = wahl([0.5, 1, 2, -1, -0.5, 0.2]), a = wahl([1, 2, 3, 5, 10]), w = a * Math.exp(k);
      return { txt: t("u_trenn", { k: zahl(k), a: a }), soll: w, weg: [br("1", "y") + " dy = " + kl(k) + " dt  ⇒  ln|y| = " + zahl(k) + "t + C₁  ⇒  y = C · e" + sp(zahl(k) + "t"), "y(0) = C = " + a + "  ⇒  y(t) = " + a + " · e" + sp(zahl(k) + "t"), "y(1) = " + a + " · e" + sp(zahl(k)) + " ≈ " + zahl(w)] }; },
    dgl_char: function(){ var r1 = zuf(1, 4), r2 = -zuf(1, 3), p = r1 + r2, q = -r1 * r2;
      var g = "ÿ = " + (p ? (p === 1 ? "" : p === -1 ? M : p) + "ẏ + " : "") + q + "y";
      return { txt: t("u_char", { g: g }), soll: r1, weg: ["ẏ = a · eᵃᵗ,  ÿ = a² · eᵃᵗ", "a² · eᵃᵗ = " + (p ? p + " · a · eᵃᵗ + " : "") + q + " · eᵃᵗ  ⇒  a² = " + (p ? p + "a + " : "") + q, "a² " + (p ? (p > 0 ? M + " " + p : "+ " + (-p)) + "a " : "") + M + " " + q + " = 0  ⇒  a = " + r1 + " " + t("oder") + " a = " + r2 + "  ⇒  a = " + r1] }; },
    dgl_fall: function(){ var tt = wahl([1, 2, 3, 4, 1.5, 2.5]), g = 9.81, w = 0.5 * g * tt * tt;
      return { txt: t("u_fall", { g: zahl(g), t: zahl(tt) }), soll: w, weg: ["s̈ = g  ⇒  ṡ = g · t  ⇒  s = ½ · g · t²", "s(" + zahl(tt) + ") = ½ · " + zahl(g) + " · " + zahl(tt) + "² ≈ " + zahl(w)] }; },
    gewinn: function(){ var b = 2 * zuf(4, 15), c = zuf(10, 60);
      return { txt: t("u_gewinn", { g: pol([-1, b, -c]) }), soll: b / 2, weg: ["G′(x) = " + M + "2x + " + b + " = 0  ⇒  x = " + (b / 2), "G″(x) = " + M + "2 < 0  ⇒  " + t("max")] }; }
  };
  function lies(s){ s = String(s).trim().replace(/\s/g, "").replace(",", ".").replace(/[−–]/g, "-"); if(!s) return NaN; var m = s.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/); return m ? Number(m[1]) / Number(m[2]) : Number(s); }
  function erzeuge(typ, seed){ rng = mulberry(seed); var a = GENU[typ](); a.typ = typ; a.seed = seed; rng = Math.random; return a; }
  function neueAufgabe(){ var k = Object.keys(GENU), alt = auf && auf.typ, typ; do { typ = k[Math.floor(Math.random() * k.length)]; } while(typ === alt); auf = erzeuge(typ, Math.floor(Math.random() * 1e9)); nr++; status = null; $("uAntwort").value = ""; zeigeAufgabe(); }
  function zeigeAufgabe(){
    if(!auf) return;
    // Text neu erzeugen wäre zufällig – nur die Beschriftungen ändern sich mit der Sprache
    $("uNr").textContent = t("aufgabe", { i: nr }); $("auftrag").innerHTML = auf.txt.replace(/\(([^()]*)\) \/ \(([^()]*)\)/, function(m, a, b){ return bdi(br(a, b)); });
    $("punkte").textContent = t("punkte", { p: punkte, n: gemacht });
    var m = $("meldung");
    if(!status){ m.textContent = ""; m.className = "meldung"; sicht($("uWeg"), false); $("pruefen").disabled = false; return; }
    if(status.leer){ m.textContent = t("keineZahl"); m.className = "meldung schlecht"; return; }
    if(status.nochmal){ msNochmal(m); return; }
    m.textContent = status.gut ? t("richtig") : t("falsch", { erg: zahl(auf.soll, 2) }); m.className = "meldung " + (status.gut ? "gut" : "schlecht");
    $("uWeg").innerHTML = "<b>" + esc(t("wegL")) + "</b><ol>" + auf.weg.map(function(z){ return "<li>" + bdi(z) + "</li>"; }).join("") + "</ol>";
    sicht($("uWeg"), true); $("pruefen").disabled = true;
  }
  function pruefe(){
    if(!auf || (status && !status.leer && !status.nochmal)) return;
    var v = lies($("uAntwort").value);
    if(!isFinite(v)){ status = { leer: true }; zeigeAufgabe(); return; }
    var gut = Math.abs(v - auf.soll) <= 0.0051 + 1e-9 * Math.abs(auf.soll);
    if(!gut && !(status && status.nochmal)){ status = { nochmal: true }; msNochmal($("meldung")); return; } status = { gut: gut }; gemacht++; if(gut) punkte++; zeigeAufgabe();
  }
  $("pruefen").addEventListener("click", pruefe);
  $("uAntwort").addEventListener("keydown", function(e){ if(e.key === "Enter"){ if(status && !status.leer && !status.nochmal) neueAufgabe(); else pruefe(); } });
  $("weiter").addEventListener("click", neueAufgabe);

  // ---------- Reiter & Texte ----------
  var tab = "aend", TABS = ["aend", "regeln", "opt", "dgl", "ueben"];
  function zeigeTab(k){
    tab = k;
    document.querySelectorAll(".tabs button").forEach(function(b){ b.setAttribute("aria-selected", b.dataset.tab === k ? "true" : "false"); });
    TABS.forEach(function(x){ sicht($("s_" + x), x === k); });
    if(k === "ueben" && !auf) neueAufgabe();
    rechnen();
  }
  function rechnen(){ if(tab === "aend"){ aend(); diffb(); } else if(tab === "regeln"){ regeln(); wichtig(); } else if(tab === "opt") opt(); else if(tab === "dgl") dglTeil(); }
  document.querySelectorAll(".tabs button").forEach(function(b){ b.addEventListener("click", function(){ zeigeTab(b.dataset.tab); }); });
  ["x0", "h"].forEach(function(id){ $(id).addEventListener("input", function(){ if(anim && id === "h"){ cancelAnimationFrame(anim); anim = null; } aend(); }); });
  $("fkt").addEventListener("change", function(){ fktW = $("fkt").value; var F = FKT[fktW]; $("x0").min = F.x0[0]; $("x0").max = F.x0[1]; $("x0").value = F.x0[2]; aend(); });
  $("anim").addEventListener("click", hAnim);
  $("dbWahl").addEventListener("change", function(){ dbW = $("dbWahl").value; diffb(); });
  $("hd").addEventListener("input", diffb);
  $("szWahl").addEventListener("change", function(){ szW = $("szWahl").value; opt(); });
  ["op", "oF"].forEach(function(id){ $(id).addEventListener("input", gewinn); });
  ["oL", "ox"].forEach(function(id){ $(id).addEventListener("input", zaun); });
  ["oV", "or"].forEach(function(id){ $(id).addEventListener("input", dose); });
  $("dgWahl").addEventListener("change", function(){ dgW = $("dgWahl").value; dglWahl(true); });
  ["dk", "df0", "dS", "dEuler"].forEach(function(id){ $(id).addEventListener("input", dgl); });
  window.addEventListener("resize", function(){ rechnen(); });
  function sel(id, keys, pre, wert){ $(id).innerHTML = keys.map(function(k){ return '<option value="' + k + '">' + esc(typeof pre === "function" ? pre(k) : t(pre + k)) + "</option>"; }).join(""); $(id).value = wert; }
  function alles(){
    document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    if(window.FK) FK.setLang(lang);
    document.title = "miStudia – " + t("titel"); $("titel").textContent = t("titel");
    document.querySelectorAll(".tabs button").forEach(function(b){ b.textContent = t("tab_" + b.dataset.tab); });
    document.querySelectorAll("[data-t]").forEach(function(e){ e.textContent = t(e.dataset.t); });
    sel("fkt", Object.keys(FKT), function(k){ return "f(x) = " + FKT[k].txt(); }, fktW);
    sel("dbWahl", Object.keys(DB), "db_", dbW);
    sel("szWahl", ["gewinn", "zaun", "dose"], "sz_", szW);
    sel("dgWahl", Object.keys(DG), "dg_", dgW);
    sel("pDgl", PDGL.map(function(x, i){ return i; }), function(i){ return PDGL[i].g; }, pW);
    sel("fOrt", Object.keys(ORTE), function(k){ return t("f_" + k) + " (g = " + zahl(ORTE[k]) + " m/s²)"; }, fOrt);
    $("tipH").textContent = window.MS_TIPP ? MS_TIPP.hinweis(lang) : "";
    $("dEulerL").lastChild.textContent = " " + t("eulerL");
    if(auf) auf = erzeuge(auf.typ, auf.seed);
    rechnen(); zeigeAufgabe();
  }
  window.MS_LANG = { apply: function(l){ if(DT[l]){ lang = l; alles(); } } };
  dglWahl(false);
  alles();
})();
