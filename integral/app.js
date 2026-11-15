// ============================================================
// integral/app.js – Integralrechnung
// Fläche annähern: Unter-, Ober-, Mittelpunkt- und Trapezsumme mit n Streifen.
// Stammfunktion: Regeln Schritt für Schritt, bestimmtes Integral F(b) − F(a).
// Flächen: an Nullstellen aufteilen, Beträge addieren; Fläche zwischen zwei
// Graphen (auch von Schnittpunkt zu Schnittpunkt). Üben: Stammfunktion
// erkennen, Integral berechnen, Fläche berechnen.
// Polynome exakt mit Brüchen über /funktionen/kern.js (FK).
// Texte: integral/texte.js (IT), Sprache aus dem Startmenü (MS_LANG).
// ============================================================
(function(){
  "use strict";
  var NS = "http://www.w3.org/2000/svg", lang = "de", B = FK.B, Bz = FK.Bz;
  function $(id){ return document.getElementById(id); }
  function t(k, v){ var s = (IT[lang] && IT[lang][k]) || IT.de[k] || k; if(v) for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  function el(n, a, txt){ var e = document.createElementNS(NS, n); for(var k in a) if(a[k] != null) e.setAttribute(k, a[k]); if(txt != null) e.textContent = txt; return e; }
  function leer(s){ while(s.lastChild) s.removeChild(s.lastChild); }
  function sicht(e, an){ if(an) e.removeAttribute("hidden"); else e.setAttribute("hidden", ""); }
  function z(v, d){ return FK.zahl(v, d == null ? 4 : d); }
  function bdi(s){ return '<bdi dir="ltr">' + s + "</bdi>"; }
  function lies(s){
    s = String(s).trim().replace(/[−–]/g, "-").replace(/\s/g, "").replace(/,/g, ".");
    var m = s.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/); if(m) return Number(m[1]) / Number(m[2]);
    return s === "" ? NaN : Number(s);
  }
  function zuf(a, b){ return a + Math.floor(Math.random() * (b - a + 1)); }
  function wahl(L){ return L[Math.floor(Math.random() * L.length)]; }
  function int(a, b, fx){ return '<span class="int">∫<sub>' + a + "</sub><sup>" + b + "</sup></span>" + (fx || "f(x)") + " dx"; }
  var TIEF = "₀₁₂₃₄₅₆₇₈₉"; function tief(n){ return String(n).split("").map(function(c){ return TIEF[+c]; }).join(""); }

  // ---------- Funktionen ----------
  function stamm(p){ var r = [B(0)]; p.forEach(function(c, i){ r.push(Bz.div(c, B(i + 1))); }); return FK.trim(r); }
  function ausPoly(p){
    var Fp = stamm(p);
    return { poly: p, Fp: Fp, txt: FK.ptxt(p), Ftxt: FK.ptxt(Fp), f: function(x){ return FK.wertN(p, x); }, F: function(x){ return FK.wertN(Fp, x); } };
  }
  var VORLAGEN = [
    { id: "x2", p: "x^2" }, { id: "p2", p: "0,5x^2 + 1" }, { id: "p2n", p: "-x^2 + 4" }, { id: "p3", p: "x^3 - 3x" },
    { id: "sin", txt: "sin x", Ftxt: "−cos x", f: Math.sin, F: function(x){ return -Math.cos(x); }, regel: "sin x → −cos x" },
    { id: "sqrt", txt: "√x", Ftxt: "⅔·x·√x", f: Math.sqrt, F: function(x){ return 2 / 3 * Math.pow(x, 1.5); }, dom: 0, domTxt: "≥ 0", regel: "√x = x^½ → x^(3/2) : (3/2) = ⅔·x·√x" },
    { id: "exp", txt: "eˣ", Ftxt: "eˣ", f: Math.exp, F: Math.exp, regel: "eˣ → eˣ" },
    { id: "inv", txt: "1/x", Ftxt: "ln x", f: function(x){ return 1 / x; }, F: Math.log, dom: 0, strikt: true, domTxt: "> 0", regel: "1/x → ln|x|" },
    { id: "eigen" }
  ];
  function holeFunktion(selId, inpId){
    var id = $(selId).value, v = VORLAGEN.filter(function(x){ return x.id === id; })[0] || VORLAGEN[0];
    sicht($(inpId), id === "eigen");
    try{
      if(id === "eigen"){ var p = FK.parse($(inpId).value); if(FK.grad(p) > 6) throw 1; return ausPoly(p); }
      if(v.p) return ausPoly(FK.parse(v.p));
    }catch(e){ return null; }
    return v;
  }
  function imDef(fn, x){ return fn.dom == null || (fn.strikt ? x > fn.dom : x >= fn.dom); }
  function grenze(id){ var s = $(id).value, v = lies(s), bb = null; try{ var p = FK.parse(s); if(FK.grad(p) <= 0) bb = p[0]; }catch(e){} return { v: v, b: bb }; }
  function exaktWert(fn, x, xb){ // Wert der Stammfunktion: exakt bei Polynomen mit rationaler Stelle
    if(fn.Fp && xb){ var w = FK.wertB(fn.Fp, xb); return { v: Bz.num(w), txt: FK.btxt(w), exakt: true }; }
    var v = fn.F(x); return { v: v, txt: z(v), exakt: false };
  }
  function wertTxt(w){ // „8/3 ≈ 2,6667“ oder „≈ 1,23“
    if(w.exakt) return w.txt + (w.txt.indexOf("/") >= 0 ? " ≈ " + z(w.v) : "");
    return "≈ " + z(w.v);
  }
  function differenz(fa, ga, aB, bB){ return { v: fa.v - ga.v, b: null }; }
  function integral(fn, a, b){ // {v, txt}
    var A = exaktWert(fn, a.v, a.b), Bw = exaktWert(fn, b.v, b.b);
    if(A.exakt && Bw.exakt){ var d = Bz.sub(FK.wertB(fn.Fp, b.b), FK.wertB(fn.Fp, a.b)); return { v: Bz.num(d), txt: FK.btxt(d), exakt: true, Fa: A, Fb: Bw }; }
    return { v: Bw.v - A.v, txt: z(Bw.v - A.v), exakt: false, Fa: A, Fb: Bw };
  }

  // ---------- Graph ----------
  function schritt(r){ var s = Math.pow(10, Math.floor(Math.log10(r / 6))), m = r / 6 / s; return s * (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10); }
  var GL = 44, GR = 628, GT = 14, GB = 378;
  function zeichne(svg, o){
    leer(svg);
    var x0 = o.xr[0], x1 = o.xr[1], ys = [0];
    (o.kurven || []).forEach(function(k){ for(var i = 0; i <= 200; i++){ var x = x0 + (x1 - x0) * i / 200; if(imDef(k.fn, x)){ var y = k.fn[k.F ? "F" : "f"](x); if(isFinite(y)) ys.push(y); } } });
    (o.rects || []).forEach(function(r){ ys.push(r.h); });
    ys.sort(function(a, b){ return a - b; });
    var lo = ys[Math.floor(ys.length * 0.02)], hi = ys[Math.ceil(ys.length * 0.98) - 1];
    lo = Math.min(lo, 0); hi = Math.max(hi, 0); if(hi - lo < 1e-9){ hi += 1; lo -= 1; }
    var pad = (hi - lo) * 0.1; lo -= pad; hi += pad;
    var X = function(x){ return GL + (x - x0) / (x1 - x0) * (GR - GL); }, Y = function(y){ return GB - (y - lo) / (hi - lo) * (GB - GT); };
    svg._X = X; svg._inv = function(px){ return x0 + (px - GL) / (GR - GL) * (x1 - x0); }; svg._xr = o.xr;
    var sx = schritt(x1 - x0), sy = schritt(hi - lo), v;
    for(v = Math.ceil(x0 / sx) * sx; v <= x1; v += sx){ svg.appendChild(el("line", { x1: X(v), y1: GT, x2: X(v), y2: GB, "class": "g-gitter" })); if(Math.abs(v) > sx / 2) svg.appendChild(el("text", { x: X(v), y: Math.min(GB - 4, Math.max(GT + 12, Y(0) + 16)), "class": "g-zahl", "text-anchor": "middle" }, z(v, 2))); }
    for(v = Math.ceil(lo / sy) * sy; v <= hi; v += sy){ svg.appendChild(el("line", { x1: GL, y1: Y(v), x2: GR, y2: Y(v), "class": "g-gitter" })); if(Math.abs(v) > sy / 2) svg.appendChild(el("text", { x: Math.min(GR - 30, Math.max(GL + 2, X(0) - 6)), y: Y(v) + 4, "class": "g-zahl", "text-anchor": X(0) - 6 < GL + 2 ? "start" : "end" }, z(v, 2))); }
    svg.appendChild(el("line", { x1: GL, y1: Y(0), x2: GR, y2: Y(0), "class": "g-achse" }));
    if(x0 <= 0 && x1 >= 0) svg.appendChild(el("line", { x1: X(0), y1: GT, x2: X(0), y2: GB, "class": "g-achse" }));
    var cl = function(y){ return Math.max(-2000, Math.min(2400, Y(y))); };
    (o.rects || []).forEach(function(r){ var y1 = cl(r.h), y0 = Y(0); svg.appendChild(el("rect", { x: X(r.x0), y: Math.min(y0, y1), width: Math.max(0.5, X(r.x1) - X(r.x0)), height: Math.abs(y1 - y0), "class": r.h >= 0 ? "g-pos" : "g-neg", "stroke-width": o.rects.length > 60 ? 0 : 1 })); });
    (o.polys || []).forEach(function(q){ svg.appendChild(el("polygon", { points: q.pts.map(function(p){ return X(p[0]).toFixed(1) + "," + cl(p[1]).toFixed(1); }).join(" "), "class": q.cls, "stroke-width": o.polys.length > 60 ? 0 : null })); });
    (o.kurven || []).forEach(function(k){
      var d = "", neu = true;
      for(var i = 0; i <= 600; i++){
        var x = x0 + (x1 - x0) * i / 600; if(!imDef(k.fn, x)){ neu = true; continue; }
        var y = k.fn[k.F ? "F" : "f"](x); if(!isFinite(y) || Y(y) < -1500 || Y(y) > 1900){ neu = true; continue; }
        d += (neu ? "M" : "L") + X(x).toFixed(1) + " " + Y(y).toFixed(1); neu = false;
      }
      k._el = el("path", { d: d, "class": k.cls }); svg.appendChild(k._el);
    });
    (o.grenzen || []).forEach(function(g){
      svg.appendChild(el("line", { x1: X(g.x), y1: GT, x2: X(g.x), y2: GB, "class": "g-grenze" }));
      svg.appendChild(el("circle", { cx: X(g.x), cy: GB - 12, r: 10, "class": "g-griff" }));
      svg.appendChild(el("text", { x: X(g.x), y: GB - 26, "class": "g-name", "text-anchor": "middle", fill: "#b45309" }, g.name));
    });
    (o.punkte || []).forEach(function(p){ svg.appendChild(el("circle", { cx: X(p.x), cy: cl(p.y), r: 5, "class": "g-null" })); });
    (o.namen || []).forEach(function(n){ svg.appendChild(el("text", { x: X(n.x), y: Math.max(GT + 14, Math.min(GB - 6, cl(n.y) + 5)), "class": "g-name", "text-anchor": "middle", fill: n.farbe || "#1a2233" }, n.text)); });
    // Werte ablesen + Wertetabelle (/graph-ablesen.js), nur bei Erkunden-Graphen (o.abl)
    if(window.MS_ABL){ if(o.abl) MS_ABL.an(svg, { x0: x0, x1: x1, y0: lo, y1: hi, L: GL, R: GR, T: GT, B: GB,
      kurven: (o.kurven || []).map(function(k, i){ return o.abl[i] ? { f: function(x){ return imDef(k.fn, x) ? k.fn[k.F ? "F" : "f"](x) : NaN; }, el: k._el, name: o.abl[i] } : null; }) }); else MS_ABL.aus(svg); }
  }
  function xBereich(a, b){
    var w = Math.max(b - a, 0.5), x0 = a - Math.max(0.4, 0.2 * w), x1 = b + Math.max(0.4, 0.2 * w);
    if(x0 > 0 && x0 < 1.2 * w) x0 = -0.08 * w; if(x1 < 0 && -x1 < 1.2 * w) x1 = 0.08 * w;
    return [x0, x1];
  }

  // ---------- Nullstellen im Intervall ----------
  function nullstellen(fn, a, b){
    if(fn.poly){
      return FK.nullstellen(fn.poly).filter(function(n){ return n.x > a + 1e-9 && n.x < b - 1e-9; }).map(function(n){ return { x: n.x, ex: n.ex, b: n.b || null }; });
    }
    var out = [], N = 800, xp = null, yp = null;
    for(var i = 0; i <= N; i++){
      var x = a + (b - a) * i / N; if(!imDef(fn, x)){ xp = null; continue; }
      var y = fn.f(x);
      if(xp != null && isFinite(y) && isFinite(yp) && (yp < 0) !== (y < 0) && Math.abs(y - yp) < 1e6){
        var l = xp, r = x, fl = yp; for(var k = 0; k < 70; k++){ var m = (l + r) / 2, fm = fn.f(m); if((fm < 0) === (fl < 0)){ l = m; fl = fm; } else r = m; }
        var nx = (l + r) / 2; if(nx > a + 1e-9 && nx < b - 1e-9) out.push({ x: nx, ex: null, b: null });
      }
      xp = x; yp = y;
    }
    return out;
  }
  function stelleTxt(n){ return n.ex != null ? n.ex : "≈ " + z(n.x, 3); }

  // ---------- Zustand ----------
  var art = "unter", fArt = "achse", tab = "riemann";
  function eingaben(){
    var fn = holeFunktion("fkt", "eigen"), a = grenze("a"), b = grenze("b"), fe = "";
    if(!fn) fe = t("fehlerParse");
    else if(!isFinite(a.v) || !isFinite(b.v) || a.v >= b.v) fe = t("fehlerAB");
    else if(!imDef(fn, a.v) || !imDef(fn, b.v)) fe = t("fehlerDef", { f: fn.txt, r: fn.domTxt });
    $("fehler").textContent = fe;
    return fe ? null : { fn: fn, a: a, b: b };
  }

  // ---------- Reiter 1: Fläche annähern ----------
  function riemannSumme(fn, a, b, n, art){
    var dx = (b - a) / n, s = 0, rects = [], polys = [];
    for(var i = 0; i < n; i++){
      var x0 = a + i * dx, x1 = x0 + dx, h;
      if(art === "trapez"){ var y0 = fn.f(x0), y1 = fn.f(x1); s += (y0 + y1) / 2 * dx; polys.push({ pts: [[x0, 0], [x0, y0], [x1, y1], [x1, 0]], cls: (y0 + y1) >= 0 ? "g-pos" : "g-neg" }); continue; }
      if(art === "mitte") h = fn.f((x0 + x1) / 2);
      else { var mn = Infinity, mx = -Infinity; for(var k = 0; k <= 16; k++){ var y = fn.f(x0 + dx * k / 16); mn = Math.min(mn, y); mx = Math.max(mx, y); } h = art === "unter" ? mn : mx; }
      s += h * dx; rects.push({ x0: x0, x1: x1, h: h });
    }
    return { s: s, rects: rects, polys: polys, dx: dx };
  }
  function riemann(){
    var E = eingaben(), svg = $("gR"); if(!E){ leer(svg); $("rWerte").innerHTML = ""; return; }
    var n = Number($("n").value); $("nWert").textContent = n;
    var R = riemannSumme(E.fn, E.a.v, E.b.v, n, art), I = integral(E.fn, E.a, E.b);
    zeichne(svg, { xr: drag.xr || xBereich(E.a.v, E.b.v), abl: ["f(x)"], kurven: [{ fn: E.fn, cls: "g-f" }], rects: R.rects, polys: R.polys, grenzen: [{ x: E.a.v, name: "a" }, { x: E.b.v, name: "b" }] });
    $("rWerte").innerHTML =
      "<div>" + t("breite") + "<br><b>" + bdi("Δx = " + z(R.dx)) + "</b></div>" +
      "<div>" + t("summe", { n: n }) + "<br><b>" + bdi("≈ " + z(R.s)) + "</b></div>" +
      "<div>" + t("exakt") + "<br><b>" + bdi(I.exakt ? wertTxt({ v: I.v, txt: I.txt, exakt: true }) : "≈ " + z(I.v)) + "</b></div>" +
      "<div>" + t("diff") + "<br><b>" + bdi(z(R.s - I.v)) + "</b></div>";
    $("rErkl").textContent = t("riemannErkl");
  }

  // ---------- Reiter 2: Stammfunktion ----------
  function stammfunktion(){
    var E = eingaben(), svg = $("gS");
    if(!E){ leer(svg); $("sF").innerHTML = ""; $("sSchritte").innerHTML = ""; $("sBestimmt").innerHTML = ""; return; }
    var fn = E.fn;
    $("sF").innerHTML = bdi('<span class="c-f">f(x) = ' + fn.txt + '</span><br><span class="c-F">F(x) = ' + fn.Ftxt + " + C</span>");
    $("sErkl").textContent = t("stammErkl");
    var S = [];
    if(fn.poly){
      S.push(t("sPotenz") + " " + bdi("xⁿ → xⁿ⁺¹ : (n + 1)"));
      fn.poly.map(function(c, k){ return [c, k]; }).reverse().forEach(function(ck){
        var c = ck[0], k = ck[1];
        if(Bz.null(c)) return;
        var tp = []; for(var i = 0; i <= k; i++) tp.push(B(0)); tp[k] = c;
        S.push(bdi(FK.ptxt(tp) + " → " + FK.ptxt(stamm(tp))) + (k === 0 ? " " + t("sKonst") : ""));
      });
      if(fn.poly.filter(function(c){ return !Bz.null(c); }).length > 1) S.push(t("sSumme") + " " + bdi("F(x) = " + fn.Ftxt + " + C"));
    } else S.push(t("sGrund") + " " + bdi(fn.regel));
    S.push(t("sProbe") + " " + bdi("F′(x) = " + fn.txt + " = f(x)"));
    $("sSchritte").innerHTML = S.map(function(s){ return "<li>" + s + "</li>"; }).join("");
    var I = integral(fn, E.a, E.b), at = z(E.a.v), bt = z(E.b.v);
    $("sBestimmt").innerHTML = bdi(int(at, bt) + " = [" + fn.Ftxt + "]<sub>" + at + "</sub><sup>" + bt + "</sup> = F(" + bt + ") − F(" + at + ") = " + (I.Fb.exakt ? I.Fb.txt : z(I.Fb.v)) + " − " + (I.Fa.v < 0 ? "(" : "") + (I.Fa.exakt ? I.Fa.txt : z(I.Fa.v)) + (I.Fa.v < 0 ? ")" : "") + " " + (I.exakt ? "= " + wertTxt({ v: I.v, txt: I.txt, exakt: true }) : "≈ " + z(I.v)));
    zeichne(svg, { xr: xBereich(E.a.v, E.b.v), abl: ["f(x)", "F(x)"], kurven: [{ fn: fn, cls: "g-f" }, { fn: fn, cls: "g-F", F: true }], polys: flaechenPolys(fn, null, E.a.v, E.b.v), punkte: [{ x: E.a.v, y: fn.F(E.a.v) }, { x: E.b.v, y: fn.F(E.b.v) }],
      namen: [{ x: E.b.v, y: fn.F(E.b.v) + 0, text: "F(b)", farbe: "var(--F)" }, { x: E.a.v, y: fn.F(E.a.v), text: "F(a)", farbe: "var(--F)" }] });
    $("sLegende").textContent = t("legende"); $("sHaupt").textContent = t("hauptsatz");
    var R = [[t("rPotenz"), "xⁿ", "xⁿ⁺¹ : (n + 1)"], [t("rFaktor"), "k · f(x)", "k · F(x)"], [t("rSumme"), "f(x) + g(x)", "F(x) + G(x)"], [t("rKonst"), "k", "k · x"],
      ["", "sin x", "−cos x"], ["", "cos x", "sin x"], ["", "eˣ", "eˣ"], ["", "1/x", "ln|x|"], ["", "√x", "⅔ · x · √x"]];
    $("regeln").innerHTML = "<tr><th></th><th>f(x)</th><th>F(x)</th></tr>" + R.map(function(r){ return "<tr><td>" + r[0] + "</td><td>" + bdi(r[1]) + "</td><td>" + bdi(r[2]) + "</td></tr>"; }).join("");
  }
  function flaechenPolys(fn, gn, a, b){ // Flächenstücke zwischen f und g (oder x-Achse), nach Vorzeichen gefärbt
    var d = gn ? { f: function(x){ return fn.f(x) - gn.f(x); } } : fn, P = [], N = 240, cur = null;
    for(var i = 0; i <= N; i++){
      var x = a + (b - a) * i / N, y = fn.f(x), y2 = gn ? gn.f(x) : 0, s = d.f(x) >= 0;
      if(!isFinite(y)) continue;
      if(!cur || cur.s !== s){ if(cur){ cur.oben.push([x, y]); cur.unten.push([x, y2]); P.push(cur); } cur = { s: s, oben: [], unten: [] }; }
      cur.oben.push([x, y]); cur.unten.push([x, y2]);
    }
    if(cur) P.push(cur);
    return P.map(function(c){ return { pts: c.oben.concat(c.unten.reverse()), cls: c.s ? "g-flpos" : "g-flneg" }; });
  }

  // ---------- Reiter 3: Flächen ----------
  function flaechenRechnung(fn, gn, a, b){ // a, b: {v, b}
    var d = gn ? { f: function(x){ return fn.f(x) - gn.f(x); }, F: function(x){ return fn.F(x) - gn.F(x); }, dom: fn.dom != null ? fn.dom : gn.dom, strikt: fn.strikt || gn.strikt } : fn;
    if(gn && fn.poly && gn.poly){ var dp = FK.padd(fn.poly, FK.pneg(gn.poly)); d = ausPoly(dp); }
    var Z = nullstellen(d, a.v, b.v), stellen = [a].concat(Z.map(function(n){ return { v: n.x, b: n.b, txt: stelleTxt(n) }; })).concat([b]);
    var teile = [], summe = 0, exakt = !!d.Fp, sB = B(0);
    for(var i = 0; i < stellen.length - 1; i++){
      var I = integral(d, stellen[i], stellen[i + 1]);
      teile.push({ von: stellen[i], bis: stellen[i + 1], I: I });
      summe += Math.abs(I.v);
      if(exakt && I.exakt){ var ib = Bz.sub(FK.wertB(d.Fp, stellen[i + 1].b), FK.wertB(d.Fp, stellen[i].b)); sB = Bz.add(sB, ib.n < 0 ? Bz.neg(ib) : ib); } else exakt = false;
    }
    var ganz = integral(d, a, b);
    return { d: d, Z: Z, teile: teile, A: summe, Atxt: exakt ? FK.btxt(sB) : null, ganz: ganz };
  }
  function flaeche(){
    var E = eingaben(), svg = $("gF"), zwei = fArt === "zwei";
    sicht($("zweiBox"), zwei); sicht($("schnittBox"), zwei);
    if(!E){ leer(svg); $("fSchritte").innerHTML = ""; $("fErg").innerHTML = ""; sicht($("fWarn"), false); return; }
    var gn = zwei ? holeFunktion("fkt2", "eigen2") : null;
    if(zwei && !gn){ $("fehler").textContent = t("fehlerParse"); leer(svg); return; }
    var a = E.a, b = E.b, S = [];
    if(zwei && $("schnitt").checked){
      var lo = -10, hi = 10; if(E.fn.dom != null) lo = E.fn.dom + 1e-6; if(gn.dom != null) lo = Math.max(lo, gn.dom + 1e-6);
      var dd = { f: function(x){ return E.fn.f(x) - gn.f(x); }, dom: E.fn.dom != null ? E.fn.dom : gn.dom, strikt: true };
      if(E.fn.poly && gn.poly) dd = ausPoly(FK.padd(E.fn.poly, FK.pneg(gn.poly)));
      var SZ = nullstellen(dd, lo, hi);
      if(SZ.length < 2){ $("fehler").textContent = t("keinSchnitt"); leer(svg); $("fSchritte").innerHTML = ""; $("fErg").innerHTML = ""; sicht($("fWarn"), false); return; }
      a = { v: SZ[0].x, b: SZ[0].b, txt: stelleTxt(SZ[0]) }; b = { v: SZ[SZ.length - 1].x, b: SZ[SZ.length - 1].b, txt: stelleTxt(SZ[SZ.length - 1]) };
      S.push(t("schnittT", { n: bdi(SZ.map(stelleTxt).join("; ")) }));
    }
    var R = flaechenRechnung(E.fn, gn, a, b), dname = zwei ? "(f − g)(x)" : "f(x)";
    if(zwei) S.push(t("differenz") + " " + bdi("f(x) − g(x) = " + (R.d.txt || "f(x) − g(x)")));
    if(!(zwei && $("schnitt").checked)) S.push(R.Z.length ? t(zwei ? "schnittIn" : "nullIn", { n: bdi(R.Z.map(stelleTxt).join("; ")) }) : t(zwei ? "keinSchnittIn" : "keineNull"));
    R.teile.forEach(function(tl, i){
      var vt = tl.von.txt || z(tl.von.v, 3), bt = tl.bis.txt || z(tl.bis.v, 3);
      S.push(bdi("I" + tief(i + 1) + " = " + int(vt, bt, dname) + " " + (tl.I.exakt ? "= " + wertTxt({ v: tl.I.v, txt: tl.I.txt, exakt: true }) : "≈ " + z(tl.I.v))));
    });
    $("fSchritte").innerHTML = S.map(function(s){ return "<li>" + s + "</li>"; }).join("");
    var summeTxt = R.teile.map(function(tl, i){ return "|I" + tief(i + 1) + "|"; }).join(" + ");
    $("fErg").innerHTML = "<b>" + t("flaecheL") + "</b> " + bdi("A = " + summeTxt + (R.Atxt ? " = " + R.Atxt + (R.Atxt.indexOf("/") >= 0 ? " ≈ " + z(R.A) : "") : " ≈ " + z(R.A)));
    var neg = R.teile.some(function(tl){ return tl.I.v < -1e-12; });
    sicht($("fWarn"), neg);
    if(neg) $("fWarn").innerHTML = R.teile.length > 1 ? t(zwei ? "warnungZwei" : "warnung", { w: bdi(int(a.txt || z(a.v, 3), b.txt || z(b.v, 3), dname) + (R.ganz.exakt ? " = " + R.ganz.txt : " ≈ " + z(R.ganz.v))) }) : t(zwei ? "warnNegZwei" : "warnNeg");
    var kurven = [{ fn: E.fn, cls: "g-f" }]; if(gn) kurven.push({ fn: gn, cls: "g-g" });
    var namen = R.teile.map(function(tl, i){ var m = (tl.von.v + tl.bis.v) / 2, y = gn ? (E.fn.f(m) + gn.f(m)) / 2 : E.fn.f(m) / 2; return { x: m, y: y, text: "I" + tief(i + 1) }; });
    if(gn){ var xl = a.v + (b.v - a.v) * 0.85, dy = (Math.abs(E.fn.f(xl) - gn.f(xl)) < 0.3 ? 0.4 : 0); namen.push({ x: xl, y: E.fn.f(xl) + (E.fn.f(xl) >= gn.f(xl) ? 1 : -1) * dy, text: "f", farbe: "var(--f)" }, { x: xl + (b.v - a.v) * 0.04, y: gn.f(xl + (b.v - a.v) * 0.04), text: "g", farbe: "var(--g)" }); }
    zeichne(svg, { xr: drag.xr || xBereich(a.v, b.v), abl: ["f(x)", "g(x)"], kurven: kurven, polys: flaechenPolys(E.fn, gn, a.v, b.v), punkte: R.Z.map(function(n){ return { x: n.x, y: gn ? gn.f(n.x) : 0 }; }),
      grenzen: zwei && $("schnitt").checked ? [] : [{ x: a.v, name: "a" }, { x: b.v, name: "b" }], namen: namen });
  }

  // ---------- Grenzen im Bild ziehen ----------
  var drag = { w: null, xr: null };
  ["gR", "gF"].forEach(function(id){
    var s = $(id);
    function px(ev){ var r = s.getBoundingClientRect(); return (ev.clientX - r.left) / r.width * 640; }
    s.addEventListener("pointerdown", function(ev){
      if(!s._X) return; var p = px(ev), a = lies($("a").value), b = lies($("b").value);
      var da = Math.abs(p - s._X(a)), db = Math.abs(p - s._X(b));
      if(Math.min(da, db) > 18) return;
      drag.w = da <= db ? "a" : "b"; drag.xr = s._xr; s.setPointerCapture(ev.pointerId); ev.preventDefault();
    });
    s.addEventListener("pointermove", function(ev){
      if(!drag.w) return;
      var v = Math.round(s._inv(px(ev)) * 10) / 10, a = lies($("a").value), b = lies($("b").value);
      if(drag.w === "a") v = Math.min(v, b - 0.1); else v = Math.max(v, a + 0.1);
      $(drag.w).value = z(v, 1).replace("−", "-"); alles(true);
    });
    var ende = function(){ if(drag.w){ drag.w = null; drag.xr = null; alles(true); } };
    s.addEventListener("pointerup", ende); s.addEventListener("pointercancel", ende);
  });

  // ---------- Reiter 4: Üben ----------
  var auf = null, punkte = 0, anzahl = 0, beantwortet = false;
  function zufPoly(gr, teilbar){
    var p = [];
    for(var k = 0; k <= gr; k++){ var c = zuf(-3, 3); if(teilbar && k > 0 && Math.random() < 0.7) c = (k + 1) * zuf(-2, 2); p.push(B(c)); }
    if(Bz.null(p[gr])) p[gr] = B(gr + 1);
    return FK.trim(p);
  }
  function neueAufgabe(){
    beantwortet = false;
    var typ = wahl(["stamm", "integral", "integral", "flaeche"]);
    if(typ === "stamm"){
      var p = zufPoly(zuf(1, 3), true), F = stamm(p), richtig = FK.ptxt(F);
      var falsch1 = FK.ptxt(FK.ableitung(p)), falsch2 = FK.ptxt([B(0)].concat(p)), falsch3 = FK.ptxt(FK.trim([B(0)].concat(p.map(function(c, i){ return i ? Bz.div(c, B(i)) : Bz.mul(c, B(2)); }))));
      var opt = [richtig]; [falsch1, falsch2, falsch3, FK.ptxt(FK.trim(F.map(function(c){ return Bz.mul(c, B(2)); })))].forEach(function(o){ if(opt.indexOf(o) < 0 && opt.length < 4) opt.push(o); });
      opt.sort(function(){ return Math.random() - 0.5; });
      auf = { typ: typ, p: p, opt: opt, l: richtig };
    } else if(typ === "integral"){
      var q = zufPoly(zuf(1, 2), false), a = zuf(-2, 2), b = zuf(a + 1, 3), fn = ausPoly(q), I = integral(fn, { v: a, b: B(a) }, { v: b, b: B(b) });
      auf = { typ: typ, fn: fn, a: a, b: b, I: I, l: I.v };
    } else {
      var p0 = zuf(-3, 1), q0 = zuf(p0 + 1, 3), k = wahl([1, -1]), fp = FK.pmul([B(-p0 * k), B(k)], [B(-q0), B(1)]), fn2 = ausPoly(fp);
      var a2 = wahl([p0, p0 - 1]), b2 = wahl([q0, q0 + 1]); if(a2 === p0 && b2 === q0 && Math.random() < 0.4) b2 = q0 + 1;
      var R = flaechenRechnung(fn2, null, { v: a2, b: B(a2) }, { v: b2, b: B(b2) });
      auf = { typ: typ, fn: fn2, a: a2, b: b2, R: R, l: R.A };
    }
    zeige();
  }
  function auftrag(){
    if(auf.typ === "stamm") return t("aufStamm", { f: bdi("<b>" + FK.ptxt(auf.p) + "</b>") });
    if(auf.typ === "integral") return t("aufInt") + " " + bdi("<b>" + int(auf.a, auf.b, "(" + auf.fn.txt + ")") + "</b>");
    return t("aufFl", { f: bdi("<b>" + auf.fn.txt + "</b>"), a: bdi(z(auf.a)), b: bdi(z(auf.b)) });
  }
  function zeige(){
    $("auftrag").innerHTML = auftrag(); $("meldung").textContent = ""; $("meldung").className = "meldung"; sicht($("uLauf"), false);
    var g = $("gU"); sicht(g, auf.typ === "flaeche");
    if(auf.typ === "flaeche") zeichne(g, { xr: xBereich(auf.a, auf.b), kurven: [{ fn: auf.fn, cls: "g-f" }], grenzen: [{ x: auf.a, name: "a" }, { x: auf.b, name: "b" }] });
    var z2 = $("antwortzeile"); z2.innerHTML = ""; z2.className = auf.typ === "stamm" ? "wahlListe" : "antwortzeile";
    if(auf.typ === "stamm"){
      auf.opt.forEach(function(o){ var b = document.createElement("button"); b.type = "button"; b.innerHTML = bdi("F(x) = " + o + " + C"); b.dataset.w = o; b.addEventListener("click", function(){ pruefe(o); }); z2.appendChild(b); });
    } else {
      var inp = document.createElement("input"); inp.className = "zahl"; inp.id = "uAntwort"; inp.setAttribute("inputmode", "text"); inp.setAttribute("autocomplete", "off"); inp.placeholder = t("eingabe"); inp.style.width = "120px";
      inp.addEventListener("keydown", function(e){ if(e.key === "Enter") pruefe(inp.value); });
      var pb = document.createElement("button"); pb.type = "button"; pb.className = "knopf"; pb.id = "pruefen"; pb.textContent = t("pruefen"); pb.addEventListener("click", function(){ pruefe(inp.value); });
      z2.appendChild(inp); z2.appendChild(pb);
    }
    $("weiter").textContent = t("weiter"); $("punkte").textContent = t("punkte", { p: punkte, n: anzahl });
  }
  function pruefe(e){
    if(beantwortet) return;
    var ok, ltxt, L = [];
    if(auf.typ === "stamm"){ ok = e === auf.l; ltxt = "F(x) = " + auf.l + " + C"; L.push(t("tippStamm")); }
    else {
      var v = lies(e); if(!isFinite(v)) return;
      ok = Math.abs(v - auf.l) <= 0.011;
      if(auf.typ === "integral"){
        var I = auf.I; ltxt = I.txt + (I.txt.indexOf("/") >= 0 ? " ≈ " + z(I.v, 2) : "");
        L.push(bdi("F(x) = " + auf.fn.Ftxt));
        L.push(bdi("F(" + auf.b + ") − F(" + auf.a + ") = " + I.Fb.txt + " − " + (I.Fa.v < 0 ? "(" + I.Fa.txt + ")" : I.Fa.txt) + " = " + I.txt));
      } else {
        var R = auf.R; ltxt = (R.Atxt || "") + (R.Atxt && R.Atxt.indexOf("/") < 0 ? "" : " ≈ " + z(R.A, 2));
        L.push(R.Z.length ? t("nullIn", { n: bdi(R.Z.map(stelleTxt).join("; ")) }) : t("keineNull"));
        R.teile.forEach(function(tl, i){ L.push(bdi("I" + tief(i + 1) + " = " + int(tl.von.txt || z(tl.von.v), tl.bis.txt || z(tl.bis.v)) + " = " + tl.I.txt)); });
        L.push(bdi("A = " + R.teile.map(function(tl, i){ return "|I" + tief(i + 1) + "|"; }).join(" + ") + " = " + ltxt));
        zeichne($("gU"), { xr: xBereich(auf.a, auf.b), kurven: [{ fn: auf.fn, cls: "g-f" }], polys: flaechenPolys(auf.fn, null, auf.a, auf.b), grenzen: [{ x: auf.a, name: "a" }, { x: auf.b, name: "b" }],
          namen: R.teile.map(function(tl, i){ var m = (tl.von.v + tl.bis.v) / 2; return { x: m, y: auf.fn.f(m) / 2, text: "I" + tief(i + 1) }; }) });
      }
    }
    beantwortet = true; anzahl++; if(ok) punkte++;
    var m = $("meldung"); m.className = "meldung " + (ok ? "gut" : "schlecht");
    m.innerHTML = ok ? t("richtig") + " " + bdi(ltxt) : t("falsch", { l: bdi(ltxt) });
    if(auf.typ === "stamm") $("antwortzeile").querySelectorAll("button").forEach(function(b){ if(b.dataset.w === auf.l) b.classList.add("gut"); else if(b.dataset.w === e) b.classList.add("schlecht"); });
    $("uLauf").innerHTML = L.map(function(s){ return "<li>" + s + "</li>"; }).join(""); sicht($("uLauf"), L.length > 0);
    $("punkte").textContent = t("punkte", { p: punkte, n: anzahl });
  }
  $("weiter").addEventListener("click", neueAufgabe);

  // ---------- Bedienung ----------
  function wahlGruppe(id, setze){ $(id).querySelectorAll("button").forEach(function(b){ b.addEventListener("click", function(){ setze(b.dataset.a); $(id).querySelectorAll("button").forEach(function(x){ x.setAttribute("aria-pressed", x === b ? "true" : "false"); }); alles(true); }); }); }
  wahlGruppe("rArt", function(v){ art = v; }); wahlGruppe("fArt", function(v){ fArt = v; });
  ["fkt", "fkt2", "schnitt"].forEach(function(id){ $(id).addEventListener("change", function(){ alles(true); }); });
  ["eigen", "eigen2", "a", "b", "n"].forEach(function(id){ $(id).addEventListener("input", function(){ alles(true); }); });
  function zeigeTab(k){
    tab = k;
    document.querySelectorAll(".tabs button").forEach(function(b){ b.setAttribute("aria-selected", b.dataset.tab === k ? "true" : "false"); });
    ["riemann", "stamm", "flaeche", "ueben"].forEach(function(x){ sicht($("s_" + x), x === k); });
    sicht($("eingabe"), k !== "ueben");
    if(k === "ueben" && !auf) neueAufgabe();
    alles(true);
  }
  document.querySelectorAll(".tabs button").forEach(function(b){ b.addEventListener("click", function(){ zeigeTab(b.dataset.tab); }); });

  // ---------- Texte und Neuzeichnen ----------
  function auswahlFuellen(sel, wert){
    sel.innerHTML = VORLAGEN.map(function(v){ var txt = v.id === "eigen" ? t("eigen") : v.p ? FK.ptxt(FK.parse(v.p)) : v.txt; return '<option value="' + v.id + '">' + (v.id === "eigen" ? txt : "f(x) = " + txt) + "</option>"; }).join("");
    sel.value = wert;
  }
  function alles(nurRechnen){
    if(!nurRechnen){
      document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.title = "miStudia – " + t("titel"); $("titel").textContent = t("titel");
      document.querySelectorAll(".tabs button").forEach(function(b){ b.textContent = t("tab_" + b.dataset.tab); });
      auswahlFuellen($("fkt"), $("fkt").value || "x2"); auswahlFuellen($("fkt2"), $("fkt2").value || "p2n");
      Array.prototype.forEach.call($("fkt2").options, function(o){ o.textContent = o.textContent.replace(/^f\(x\)/, "g(x)"); });
      $("tFkt").textContent = t("fkt"); $("tFkt2").textContent = t("fkt2"); $("tVon").textContent = t("von"); $("tBis").textContent = t("bis"); $("tZieh").textContent = t("zieh");
      $("eigen").placeholder = t("eigenPh"); $("eigen2").placeholder = t("eigenPh");
      $("rArt").querySelectorAll("button").forEach(function(b){ b.textContent = t(b.dataset.a); });
      $("fArt").querySelectorAll("button").forEach(function(b){ b.textContent = t(b.dataset.a); });
      $("tStreifen").textContent = t("streifen"); $("tSchritte").textContent = t("schritteT"); $("tBestimmt").textContent = t("bestimmt"); $("tRegeln").textContent = t("regelnT"); $("tSchnitt").textContent = t("schnitt");
    }
    if(tab === "riemann") riemann(); else if(tab === "stamm") stammfunktion(); else if(tab === "flaeche") flaeche();
    if(!nurRechnen && auf){
      var war = beantwortet, eing = $("uAntwort") ? $("uAntwort").value : null, gewaehlt = $("antwortzeile").querySelector("button.schlecht");
      var gut = $("meldung").classList.contains("gut");
      if(auf.typ === "integral") auf.I = integral(auf.fn, { v: auf.a, b: B(auf.a) }, { v: auf.b, b: B(auf.b) });
      if(auf.typ === "flaeche") auf.R = flaechenRechnung(auf.fn, null, { v: auf.a, b: B(auf.a) }, { v: auf.b, b: B(auf.b) });
      zeige();
      if(war){ beantwortet = false; anzahl--; if(gut) punkte--; pruefe(auf.typ === "stamm" ? (gut ? auf.l : (gewaehlt ? gewaehlt.dataset.w : "x")) : (eing || "999999")); }
    }
  }
  // Alltagsbeispiel laden (aus alltag-daten.js): {tab, f, a, b}
  window.MS_INT = { laden: function(w){
    $("fkt").value = "eigen"; $("eigen").value = w.f; $("a").value = String(w.a); $("b").value = String(w.b);
    zeigeTab(w.tab); $("eingabe").scrollIntoView({ behavior: "smooth", block: "start" });
  } };
  window.MS_LANG = { apply: function(l){ if(IT[l]){ lang = l; FK.setLang(l); alles(); } } };
  $("fkt").value = "x2"; alles();
})();
