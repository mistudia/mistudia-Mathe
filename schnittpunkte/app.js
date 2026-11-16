// ============================================================
// schnittpunkte/app.js – Schnittpunkte von Geraden und Parabeln
// Rechnen: f(x) und g(x) eingeben (höchstens x²) → gleichsetzen, auf eine Seite,
//   lösen (Rechenweg aus /funktionen/loesweg.js), y-Werte, Schnittpunkte,
//   Einordnung (parallel, Sekante, Tangente, Passante) und Zeichnung.
// Üben: Zufallsaufgaben mit ganzzahligen Schnittpunkten (auch 0 oder 1 Punkt),
//   Anzahl wählen, Punkte eintragen, 2 Versuche, dann Lösung mit Bild.
// Rechnen mit /funktionen/kern.js (FK, genaue Brüche), Texte: schnittpunkte/texte.js (SN).
// ============================================================
(function(){
  "use strict";
  var NS = "http://www.w3.org/2000/svg", lang = "de", B = FK.B, Bz = FK.Bz, M = FK.MINUS;
  function $(id){ return document.getElementById(id); }
  function t(k, v){ var s = (SN[lang] && SN[lang][k]) || SN.de[k] || k; if(v) for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  function el(n, a, txt){ var e = document.createElementNS(NS, n); for(var k in a) if(a[k] != null) e.setAttribute(k, a[k]); if(txt != null) e.textContent = txt; return e; }
  function zuf(a, b){ return a + Math.floor(Math.random() * (b - a + 1)); }
  function wahl(L){ return L[Math.floor(Math.random() * L.length)]; }
  function bt(b){ return FK.btxt(typeof b === "number" ? B(b) : b); }
  function f(s){ return window.FS ? FS.f(s) : '<span class="f" dir="ltr">' + s + "</span>"; }
  function P(L){ return FK.trim(L.map(function(v){ return typeof v === "number" ? B(v) : v; })); }
  function minus(p, q){ return FK.padd(p, FK.pneg(q)); }
  var IDX = "₁₂₃₄";

  // ---------- Zeichnung mit selbst gewähltem Ausschnitt ----------
  var GW = 480, GH = 380;
  function schoen(x){ var p = Math.pow(10, Math.floor(Math.log10(x))), r = x / p; return (r < 1.5 ? 1 : r < 3.5 ? 2 : r < 7.5 ? 5 : 10) * p; }
  function zahlK(v){ return v < 0 ? M + FK.zahl(-v) : FK.zahl(v); }
  function graph(sv, F, pts){
    while(sv.lastChild) sv.removeChild(sv.lastChild); sv.setAttribute("viewBox", "0 0 " + GW + " " + GH);
    var xs = [0], ys = [0];
    pts.forEach(function(q){ xs.push(q[0]); ys.push(q[1]); });
    F.forEach(function(g){ var p = g.p; if(FK.grad(p) === 2){ var xv = -Bz.num(p[1]) / (2 * Bz.num(p[2])); xs.push(xv); ys.push(FK.wertN(p, xv)); } ys.push(FK.wertN(p, 0)); });
    var x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs), y0 = Math.min.apply(null, ys), y1 = Math.max.apply(null, ys);
    var hx = Math.max(4, (x1 - x0) / 2 + 2.5), hy = Math.max(3, (y1 - y0) / 2 + 2.5), cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    var k = Math.min(GW / (2 * hx), GH / (2 * hy)); hx = GW / (2 * k); hy = GH / (2 * k);
    var X = function(x){ return (x - cx + hx) * k; }, Y = function(y){ return (cy + hy - y) * k; }, st = Math.max(1, schoen(2 * hx / 12)), labs = [];
    var defs = el("defs"), cp = el("clipPath", { id: "snClip" + sv.id }); cp.appendChild(el("rect", { x: 0, y: 0, width: GW, height: GH })); defs.appendChild(cp); sv.appendChild(defs);
    sv.appendChild(el("rect", { x: 0, y: 0, width: GW, height: GH, fill: "#ffffff" }));
    for(var gx = Math.ceil((cx - hx) / st) * st; gx <= cx + hx; gx += st) sv.appendChild(el("line", { x1: X(gx), y1: 0, x2: X(gx), y2: GH, stroke: "#dbe4f0" }));
    for(var gy = Math.ceil((cy - hy) / st) * st; gy <= cy + hy; gy += st) sv.appendChild(el("line", { x1: 0, y1: Y(gy), x2: GW, y2: Y(gy), stroke: "#dbe4f0" }));
    var ax = Math.min(Math.max(Y(0), 0), GH), ay = Math.min(Math.max(X(0), 0), GW);
    sv.appendChild(el("line", { x1: 0, y1: ax, x2: GW, y2: ax, stroke: "#1a2233", "stroke-width": 1.6 })); sv.appendChild(el("line", { x1: ay, y1: 0, x2: ay, y2: GH, stroke: "#1a2233", "stroke-width": 1.6 }));
    for(gx = Math.ceil((cx - hx) / st) * st; gx <= cx + hx; gx += st) if(Math.abs(gx) > st / 2 && X(gx) > 10 && X(gx) < GW - 10) sv.appendChild(el("text", { x: X(gx), y: Math.min(ax + 14, GH - 3), "class": "ax" }, zahlK(gx)));
    for(gy = Math.ceil((cy - hy) / st) * st; gy <= cy + hy; gy += st) if(Math.abs(gy) > st / 2 && Y(gy) > 10 && Y(gy) < GH - 6) sv.appendChild(el("text", { x: Math.max(ay - 4, 22), y: Y(gy) + 4, "class": "ax", style: "text-anchor:end" }, zahlK(gy)));
    var g = el("g", { "clip-path": "url(#snClip" + sv.id + ")" }); sv.appendChild(g);
    F.forEach(function(q){ var d = "", an = false;
      for(var i = 0; i <= 500; i++){ var x = cx - hx + 2 * hx * i / 500, y = FK.wertN(q.p, x); if(Math.abs(y - cy) > 30 * hy){ an = false; continue; } d += (an ? "L" : "M") + X(x).toFixed(1) + " " + Y(y).toFixed(1); an = true; }
      g.appendChild(el("path", { d: d, fill: "none", stroke: q.farbe, "stroke-width": 3.2, "stroke-linejoin": "round" }));
      for(var xx = cx + hx * 0.85; xx > cx - hx * 0.85; xx -= hx / 20){ var yy = FK.wertN(q.p, xx); if(Math.abs(yy - cy) < hy * 0.8 && !labs.some(function(l){ return Math.hypot(X(l[0]) - X(xx), Y(l[1]) - Y(yy)) < 40; })){ labs.push([xx, yy]); g.appendChild(el("text", { x: X(xx), y: Y(yy) - 12, "class": "gname", fill: q.farbe }, q.name)); q.lx = xx; break; } }
    });
    pts.forEach(function(q, i){ g.appendChild(el("circle", { cx: X(q[0]), cy: Y(q[1]), r: 6.5, fill: "#9333ea", stroke: "#ffffff", "stroke-width": 2 }));
      g.appendChild(el("text", { x: X(q[0]) + 9, y: Y(q[1]) - 9, "class": "plab" }, q[2] || "S" + (pts.length > 1 ? IDX[i] : ""))); });
  }

  // ---------- Rechnen ----------
  // liefert { html, pts:[[x,y,label]], n } für f und g
  function loesung(pf, pg){
    var d = minus(pf, pg), gr = FK.grad(d), H = [], pts = [], n;
    function block(h, zeilen){ H.push('<div class="wh">' + h + "</div>" + zeilen.map(function(z){ return '<div class="wz">' + f(z) + "</div>"; }).join("")); }
    block(t("s_gleich"), ["f(x) = g(x)", FK.ptxt(pf) + " = " + FK.ptxt(pg)]);
    var gf = FK.grad(pf), gg = FK.grad(pg), art = Math.max(gf, gg) <= 1 ? "gg" : Math.min(gf, gg) <= 1 ? "pg" : "pp", satz;
    if(gr < 0){ n = Infinity; satz = t("nInf"); }
    else if(gr === 0){ block(t("s_seite"), [FK.ptxt(d) + " = 0"]); n = 0; satz = art === "gg" ? t("parallel") : t("n0"); }
    else {
      block(t("s_seite"), [FK.ptxt(d) + " = 0"]);
      H.push('<div class="wh">' + t("s_loesen") + "</div>" + FL.html(d, false));
      var Z = FK.nullstellen(d).sort(function(a, b){ return a.x - b.x; });
      Z.forEach(function(z, i){
        var xt = z.b ? bt(z.b) : z.ex != null ? z.ex : FK.zahl(z.x), yb = z.b ? FK.wertB(pg, z.b) : null, yv = FK.wertN(pg, z.x), yt = yb ? bt(yb) : FK.zahl(yv);
        var s = "S" + (Z.length > 1 ? IDX[i] : "");
        block(t("s_y") + " " + s, ["y = g(" + xt + ")", "y " + (yb ? "=" : "≈") + " " + yt]);
        pts.push([z.x, yv, s + "(" + (z.b ? xt : FK.zahl(z.x)) + " | " + yt + ")", xt, yt]);
      });
      n = Z.length;
      if(art === "pg") satz = t(n === 2 ? "sekante" : n === 1 ? "tangente" : "passante");
      else if(art === "pp" && n === 1 && gr === 2) satz = t("beruehr");
      else satz = t(n === 0 ? "n0" : n === 1 ? "n1" : "n2");
    }
    var erg = pts.length ? pts.map(function(q){ return q[2]; }) : [];
    H.push((erg.length ? '<div class="wh">' + t("s_erg") + "</div>" : "") + erg.map(function(s){ return '<div class="wz ende">' + f(s) + "</div>"; }).join("") + '<p class="satz">' + satz + "</p>");
    return { html: H.join(""), pts: pts, n: n };
  }
  var BSP = { gg: ["2x - 1", "-x + 5"], pg: ["x^2 - 2x - 3", "x + 1"], pp: ["x^2 - 4", "-x^2 + 2x"] }, art = "pg", ROH = {};
  function lesen(s){ s = String(s).replace(/^\s*([fg]\s*\(\s*x\s*\)|y)\s*=\s*/i, "").replace(/·/g, "*"); return FK.parse(s); }
  function rechne(){
    var fe = "", pf, pg; ROH[art] = [$("fIn").value, $("gIn").value];
    try { pf = lesen($("fIn").value); pg = lesen($("gIn").value); if(FK.grad(pf) > 2 || FK.grad(pg) > 2) fe = t("fehlerGrad"); } catch(e){ fe = t("fehler"); }
    $("rFehler").textContent = fe;
    if(fe){ $("rWeg").innerHTML = ""; return; }
    var L = loesung(pf, pg); $("rWeg").innerHTML = L.html;
    graph($("rSvg"), [{ p: pf, farbe: "#2563eb", name: "f" }, { p: pg, farbe: "#ea580c", name: "g" }], L.pts.map(function(q){ return [q[0], q[1], q[2]]; }));
  }
  function artKnoepfe(){
    var box = $("rArt"); box.innerHTML = "";
    ["gg", "pg", "pp"].forEach(function(k){ var b = document.createElement("button"); b.type = "button"; b.textContent = t("art_" + k); b.setAttribute("aria-pressed", k === art ? "true" : "false");
      b.addEventListener("click", function(){ art = k; var R = ROH[k] || BSP[k]; $("fIn").value = R[0]; $("gIn").value = R[1]; artKnoepfe(); rechne(); }); box.appendChild(b); });
  }
  $("rForm").addEventListener("submit", function(e){ e.preventDefault(); rechne(); });

  // ---------- Üben ----------
  function quad(a, x1, x2){ return FK.pmul(P([a]), FK.pmul(P([-x1, 1]), P([-x2, 1]))); }
  function aufgabe(){
    for(var n = 0; n < 500; n++){
      var typ = wahl(["gg", "pg", "pg", "pp", "pp"]), pf, pg, fall = Math.random();
      if(typ === "gg"){
        var x0 = zuf(-4, 4), y0 = zuf(-4, 4), m1 = zuf(-3, 3), m2 = zuf(-3, 3); if(m1 === m2) m2 = m1 + wahl([-1, 1]);
        pf = P([y0 - m1 * x0, m1]); pg = P([y0 - m2 * x0, m2]);
        if(fall < 0.15) pg = P([y0 - m1 * x0 + wahl([-3, -2, 2, 3]), m1]);
      } else {
        pg = typ === "pg" ? P([zuf(-4, 4), zuf(-3, 3)]) : P([zuf(-4, 4), zuf(-3, 3), wahl([1, -1, 2])]);
        var a = wahl([1, -1, 2, -1]); if(typ === "pp" && Bz.num(pg[2] || B(0)) + a === 0) a = -a * 2;
        var d;
        if(fall < 0.55){ var u = zuf(-4, 3), v = zuf(u + 1, 4); d = quad(a, u, v); }
        else if(fall < 0.75){ var w = zuf(-3, 3); d = quad(a, w, w); }
        else { var s = zuf(-3, 3); d = FK.padd(quad(a, s, s), P([a * zuf(1, 3)])); }
        if(typ === "pp" && Math.random() < 0.15){ d = P([zuf(-3, 3), wahl([-2, -1, 1, 2])]); } // gleiche Öffnung → Geradengleichung
        pf = FK.padd(pg, d);
        if(typ === "pp" && FK.grad(pf) !== 2) continue;
      }
      if(FK.grad(pf) < 1 && FK.grad(pg) < 1) continue;
      var L = loesung(pf, pg);
      if(!isFinite(L.n) || L.pts.some(function(q){ return Math.abs(q[1]) > 30 || !Number.isInteger(q[0]) || !Number.isInteger(Math.round(q[1] * 1e9) / 1e9); })) continue;
      return { pf: pf, pg: pg, L: L };
    }
  }
  var auf = null, punkte = 0, anzahl = 0, versuche = 0, fertig = false, wahlN = null, letzte = null;
  function neueAufgabe(){ auf = aufgabe(); versuche = 0; fertig = false; wahlN = null; letzte = null; zeige(); }
  function zeige(){
    $("uAuftrag").innerHTML = t("u_auftrag") + '<div class="fg">' + f("f(x) = " + FK.ptxt(auf.pf)) + "<br>" + f("g(x) = " + FK.ptxt(auf.pg)) + "</div>";
    $("uWie").textContent = t("u_wie");
    var box = $("uAnz"); box.innerHTML = "";
    [0, 1, 2].forEach(function(n){ var b = document.createElement("button"); b.type = "button"; b.textContent = n; b.setAttribute("aria-pressed", wahlN === n ? "true" : "false"); b.disabled = fertig;
      b.addEventListener("click", function(){ wahlN = n; zeige(); }); box.appendChild(b); });
    var pk = $("uPunkte"); pk.innerHTML = "";
    for(var i = 0; i < (wahlN || 0); i++){
      var r = document.createElement("div"); r.className = "prow"; r.dir = "ltr";
      r.innerHTML = "<b>S" + (wahlN > 1 ? IDX[i] : "") + '(</b><input class="zahl" inputmode="text" autocomplete="off" id="ux' + i + '"> <b>|</b> <input class="zahl" inputmode="text" autocomplete="off" id="uy' + i + '"><b>)</b>';
      pk.appendChild(r);
      if(letzte && letzte[i]){ r.querySelector("#ux" + i).value = letzte[i][0]; r.querySelector("#uy" + i).value = letzte[i][1]; }
      r.querySelectorAll("input").forEach(function(inp){ inp.disabled = fertig; inp.addEventListener("keydown", function(e){ if(e.key === "Enter") pruefe(); }); });
    }
    $("uPruefen").textContent = t("pruefen"); $("uPruefen").disabled = fertig || wahlN === null; $("uWeiter").textContent = t("weiterA");
    $("uPunkteZ").textContent = t("punkte", { p: punkte, n: anzahl });
    sicht($("uLoesung"), fertig);
    if(fertig){ $("uWeg").innerHTML = auf.L.html; graph($("uSvg"), [{ p: auf.pf, farbe: "#2563eb", name: "f" }, { p: auf.pg, farbe: "#ea580c", name: "g" }], auf.L.pts.map(function(q){ return [q[0], q[1], q[2]]; })); }
  }
  function sicht(e, an){ if(an) e.removeAttribute("hidden"); else e.setAttribute("hidden", ""); }
  function zahlLesen(s){ s = String(s).trim().replace(",", ".").replace(/−/g, "-"); if(s === "") return NaN; try { var p = FK.parse(s); return FK.grad(p) <= 0 ? Bz.num(p[0]) : NaN; } catch(e){ return NaN; } }
  function pruefe(){
    if(fertig || wahlN === null) return;
    var ein = [], leer = false;
    for(var i = 0; i < wahlN; i++){ var a = $("ux" + i).value, b = $("uy" + i).value; if(!a.trim() || !b.trim()) leer = true; ein.push([a, b]); }
    var m = $("uMeld"); if(leer){ m.className = "meldung schlecht"; m.textContent = t("eingabeFehlt"); return; }
    letzte = ein;
    var soll = auf.L.pts.map(function(q){ return [q[0], q[1]]; }), ok = wahlN === soll.length;
    if(ok){ var rest = soll.slice(); ein.forEach(function(e){ var x = zahlLesen(e[0]), y = zahlLesen(e[1]), j = rest.findIndex(function(q){ return Math.abs(q[0] - x) < 0.011 && Math.abs(q[1] - y) < 0.011; }); if(j < 0) ok = false; else rest.splice(j, 1); }); }
    if(!ok && versuche === 0){ versuche = 1; m.className = "meldung schlecht"; m.textContent = t("nochmal"); return; }
    fertig = true; anzahl++; if(ok) punkte++;
    m.className = "meldung " + (ok ? "gut" : "schlecht"); m.textContent = ok ? t("richtig") : t("falsch");
    zeige();
  }
  $("uPruefen").addEventListener("click", pruefe);
  $("uWeiter").addEventListener("click", function(){ $("uMeld").textContent = ""; $("uMeld").className = "meldung"; neueAufgabe(); });

  // ---------- Reiter, Texte, Sprache ----------
  var tab = "rechnen";
  function zeigeTab(k){ tab = k; document.querySelectorAll(".tabs button").forEach(function(b){ b.setAttribute("aria-selected", b.dataset.tab === k ? "true" : "false"); });
    sicht($("s_rechnen"), k === "rechnen"); sicht($("s_ueben"), k === "ueben"); if(k === "ueben" && !auf) neueAufgabe(); }
  document.querySelectorAll(".tabs button").forEach(function(b){ b.addEventListener("click", function(){ zeigeTab(b.dataset.tab); }); });
  function alles(){
    document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = "miStudia – " + t("titel"); $("titel").textContent = t("titel");
    document.querySelectorAll(".tabs button").forEach(function(b){ b.textContent = t("tab_" + b.dataset.tab); });
    $("rechnenBtn").textContent = t("rechnen"); $("merke").textContent = t("merke");
    artKnoepfe(); rechne();
    if(auf){ var mk = $("uMeld").className, mt = $("uMeld").textContent; zeige(); if(mt){ $("uMeld").className = mk; $("uMeld").textContent = fertig ? t(mk.indexOf("gut") >= 0 ? "richtig" : "falsch") : t("nochmal"); } }
  }
  window.MS_LANG = { apply: function(l){ if(SN[l]){ lang = l; FK.setLang(l); alles(); } } };
  // Alltagsbeispiel „Ausprobieren“: Funktionen in den Rechner laden
  window.SN_LADEN = function(w){ art = w.art; $("fIn").value = w.f; $("gIn").value = w.g; zeigeTab("rechnen"); artKnoepfe(); rechne(); window.scrollTo(0, 0); };
  $("fIn").value = BSP[art][0]; $("gIn").value = BSP[art][1];
  alles();
})();
