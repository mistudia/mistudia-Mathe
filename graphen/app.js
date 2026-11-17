// ============================================================
// graphen/app.js – Funktionsgleichungen aus Graphen ablesen
// Mehrere Graphen (Geraden, Parabeln, Polynome Grad 3–5) in einem festen
// Koordinatensystem mit 1er-Kästchen. Zu jedem Graphen die Gleichung eintippen;
// geprüft wird genau (Brüche, FK.parse – jede gleichwertige Schreibweise zählt).
// 2 Versuche, danach Lösungsweg + Markierungen im Bild (Steigungsdreieck,
// Scheitel, Nullstellen, Hilfspunkt). Tipp-Knopf zeigt die ablesbaren Punkte.
// Rechnen mit /funktionen/kern.js (FK), Texte: graphen/texte.js (GA).
// ============================================================
(function(){
  "use strict";
  var NS = "http://www.w3.org/2000/svg", lang = "de", B = FK.B, Bz = FK.Bz, M = FK.MINUS;
  function $(id){ return document.getElementById(id); }
  function t(k, v){ var s = (GA[lang] && GA[lang][k]) || GA.de[k] || k; if(v) for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  function el(n, a, txt){ var e = document.createElementNS(NS, n); for(var k in a) if(a[k] != null) e.setAttribute(k, a[k]); if(txt != null) e.textContent = txt; return e; }
  function zuf(a, b){ return a + Math.floor(Math.random() * (b - a + 1)); }
  function wahl(L){ return L[Math.floor(Math.random() * L.length)]; }
  function mischen(a){ a = a.slice(); for(var i = a.length - 1; i > 0; i--){ var j = Math.floor(Math.random() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
  function bt(b){ return FK.btxt(typeof b === "number" ? B(b) : b); }
  function f(s){ return '<span class="f" dir="ltr">' + s + "</span>"; }
  function plus(b){ b = typeof b === "number" ? B(b) : b; return Bz.null(b) ? "" : (b.n < 0 ? " " + M + " " + bt(Bz.neg(b)) : " + " + bt(b)); }
  var HOCH = "⁰¹²³⁴⁵⁶⁷⁸⁹";
  function hoch(n){ return n > 1 ? String(n).split("").map(function(c){ return HOCH[+c]; }).join("") : ""; }
  function faktor(r, m){ var s = r === 0 ? "x" : "(x " + (r > 0 ? M + " " + r : "+ " + (-r)) + ")"; return s + hoch(m); }
  function faktorWert(x, r, m){ return "(" + bt(x) + (r === 0 ? "" : r > 0 ? " " + M + " " + r : " + " + (-r)) + ")" + hoch(m); }
  function aTxt(a){ var s = bt(a); return s === "1" ? "" : s === M + "1" ? M : s + "·"; }
  function lin(r){ return [B(-r), B(1)]; }
  function gleich(p, q){ p = FK.trim(p); q = FK.trim(q); return p.length === q.length && p.every(function(c, i){ return c.n === q[i].n && c.d === q[i].d; }); }
  function wertN(p, x){ return FK.wertN(p, x); }

  // ---------- Aufgaben ----------
  var STEIG = [B(1), B(2), B(3), B(1, 2), B(1, 3), B(2, 3), B(3, 2), B(3, 4)];
  function gerade(){
    for(var n = 0; n < 200; n++){
      var m = wahl(STEIG); if(Math.random() < 0.5) m = Bz.neg(m);
      var b = zuf(-5, 5), dx = m.d, dy = m.n, P = [dx, b + dy];
      if(Math.abs(P[1]) > 6){ P = [-dx, b - dy]; if(Math.abs(P[1]) > 6) continue; dx = -dx; dy = -dy; }
      var p = FK.trim([B(b), m]);
      return { typ: "lin", p: p, pkt: [[0, b], P], dreieck: { x: 0, y: b, dx: dx, dy: dy },
        weg: function(){ return [{ h: t("w_b"), z: ["t = " + bt(b)] }, { h: t("w_m"), z: ["m = Δy : Δx", "m = " + bt(dy) + " : " + bt(dx), "m = " + bt(m)] }, { h: t("w_erg"), z: ["f(x) = " + FK.ptxt(p)] }]; } };
    }
  }
  function parabel(){
    for(var n = 0; n < 300; n++){
      var a = wahl([B(1), B(2), B(1, 2)]); if(Math.random() < 0.5) a = Bz.neg(a);
      var d = zuf(-4, 4), e = a.n > 0 ? zuf(-5, 2) : zuf(-2, 5), sx = Math.random() < 0.5 ? 1 : -1, s = a.d === 1 ? 1 : 2, x1 = d + sx * s;
      var y1 = Bz.add(B(e), Bz.mul(a, B(s * s)));
      if(Math.abs(x1) > 6 || Math.abs(Bz.num(y1)) > 6.5 || x1 === 0 && d === 0) continue;
      var p = FK.padd(FK.pmul([a], FK.pmul(lin(d), lin(d))), [B(e)]);
      return { typ: "par", p: p, pkt: [[d, e], [x1, Bz.num(y1)]], scheitel: [d, e],
        weg: function(){ var k = (x1 - d) * (x1 - d);
          return [{ h: t("w_s"), z: ["S(" + bt(d) + " | " + bt(e) + ")"] }, { h: t("w_ans"), z: ["f(x) = a·" + faktor(d, 2) + plus(e)] },
            { h: t("w_ein", { p: "P(" + bt(x1) + " | " + bt(y1) + ")" }), z: [bt(y1) + " = a·" + faktorWert(x1, d, 2) + plus(e), bt(y1) + " = " + k + "·a" + plus(e), bt(Bz.sub(y1, B(e))) + " = " + k + "·a", "a = " + bt(a)] },
            { h: t("w_erg"), z: ["f(x) = " + aTxt(a) + faktor(d, 2) + plus(e), "f(x) = " + FK.ptxt(p)] }]; } };
    }
  }
  var MUSTER = { 3: [[1, 1, 1], [2, 1], [1, 2], [3]], 4: [[1, 1, 1, 1], [2, 1, 1], [1, 1, 2], [2, 2], [3, 1], [1, 3]], 5: [[2, 1, 1, 1], [1, 1, 1, 2], [2, 2, 1], [1, 2, 2], [3, 1, 1], [1, 1, 3], [1, 1, 1, 1, 1]] };
  var NENNER = [1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 16, 20, 24, 30, 32, 36, 40, 48, 50, 60, 64, 72, 80, 96, 100, 120, 144, 160, 200, 240];
  function polynom(grad){
    for(var n = 0; n < 2000; n++){
      var g = grad || zuf(3, 5), mu = wahl(MUSTER[g]), k = mu.length, R = [];
      var start = zuf(-5, 5 - (k - 1)); for(var i = 0; i < k; i++){ R.push(start); start += zuf(1, 3); }
      if(R[k - 1] > 5) continue;
      var basis = [B(1)]; R.forEach(function(r, i){ for(var j = 0; j < mu[i]; j++) basis = FK.pmul(basis, lin(r)); });
      var mx = 0; for(var x = R[0] - 0.4; x <= R[k - 1] + 0.4; x += 0.02) mx = Math.max(mx, Math.abs(wertN(basis, x)));
      if(k === 1) mx = Math.max(mx, Math.abs(wertN(basis, R[0] + 2)));
      var nen = NENNER.filter(function(q){ return mx / q <= 6.5; })[0]; if(!nen || mx / nen < 1.5) continue;
      var a = B(Math.random() < 0.5 ? 1 : -1, nen), p = FK.pmul([a], basis);
      // Hilfspunkt mit ganzzahligen Koordinaten, nicht auf einer Nullstelle
      var kand = [0, 1, -1, 2, -2, 3, -3, 4, -4, 5, -5, 6, -6].filter(function(x){ return R.indexOf(x) < 0; }), H = null;
      for(var c = 0; c < kand.length; c++){ var y = FK.wertB(p, B(kand[c])); if(y.d === 1 && Math.abs(y.n) <= 6 && y.n !== 0){ H = [kand[c], y.n]; break; } }
      if(!H) continue;
      return { typ: "pol", p: p, pkt: R.map(function(r){ return [r, 0]; }).concat([H]), nst: R, mu: mu, hp: H,
        weg: (function(R, mu, H, a){ return function(){
          var fa = R.map(function(r, i){ return faktor(r, mu[i]); }).join("·"), fw = R.map(function(r, i){ return faktorWert(H[0], r, mu[i]); }).join("·");
          var prod = B(1); R.forEach(function(r, i){ for(var j = 0; j < mu[i]; j++) prod = Bz.mul(prod, B(H[0] - r)); });
          return [{ h: t("w_nst"), z: R.map(function(r, i){ return "x" + "₁₂₃₄₅"[i] + " = " + bt(r) + (mu[i] === 2 ? "  (" + t("doppelt") + ")" : mu[i] === 3 ? "  (" + t("dreifach") + ")" : ""); }) },
            { h: t("w_ans"), z: ["f(x) = a·" + fa] },
            { h: t("w_ein", { p: "P(" + bt(H[0]) + " | " + bt(H[1]) + ")" }), z: [bt(H[1]) + " = a·" + fw, bt(H[1]) + " = " + bt(prod) + "·a", "a = " + bt(a)] },
            { h: t("w_erg"), z: ["f(x) = " + aTxt(a) + fa] }]; }; })(R, mu, H, a) };
    }
  }
  var NAMEN = ["f", "g", "h", "k"], FARBE = ["#2563eb", "#ea580c", "#16a34a", "#9333ea"];
  var art = "mix", G = [], punkte = 0, anzahl = 0;
  function neu(){
    var L, n = 0;
    do {
      L = art === "lin" ? [gerade(), gerade(), gerade()] : art === "par" ? [parabel(), parabel(), parabel()] : art === "pol" ? [polynom(3), polynom(zuf(4, 5))] : mischen([gerade(), parabel(), polynom()]);
      n++;
    } while(n < 50 && L.some(function(a, i){ return L.some(function(b, j){ return j > i && gleich(a.p, b.p); }); }));
    G = L.map(function(x, i){ x.name = NAMEN[i]; x.farbe = FARBE[i]; x.vers = 0; x.fertig = false; x.ok = false; x.tipp = false; x.eingabe = ""; x.meld = ""; return x; });
    karten(); zeichne();
  }

  // ---------- Koordinatensystem ----------
  var W = 500, U = 7, S = (W - 40) / (2 * U), O = W / 2;
  function X(x){ return O + x * S; } function Y(y){ return O - y * S; }
  function zeichne(){
    var sv = $("gSvg"); while(sv.lastChild) sv.removeChild(sv.lastChild);
    sv.setAttribute("viewBox", "0 0 " + W + " " + W);
    var defs = el("defs"), cp = el("clipPath", { id: "gaClip" }); cp.appendChild(el("rect", { x: X(-U), y: Y(U), width: 2 * U * S, height: 2 * U * S })); defs.appendChild(cp); sv.appendChild(defs);
    sv.appendChild(el("rect", { x: X(-U), y: Y(U), width: 2 * U * S, height: 2 * U * S, fill: "#ffffff", stroke: "#b0b0b8" }));
    for(var i = -U; i <= U; i++){
      sv.appendChild(el("line", { x1: X(i), y1: Y(-U), x2: X(i), y2: Y(U), stroke: i === 0 ? "#1a2233" : "#dbe4f0", "stroke-width": i === 0 ? 1.8 : 1 }));
      sv.appendChild(el("line", { x1: X(-U), y1: Y(i), x2: X(U), y2: Y(i), stroke: i === 0 ? "#1a2233" : "#dbe4f0", "stroke-width": i === 0 ? 1.8 : 1 }));
      if(i !== 0 && Math.abs(i) < U){ sv.appendChild(el("text", { x: X(i), y: Y(0) + 14, "class": "ax" }, i < 0 ? M + (-i) : String(i))); sv.appendChild(el("text", { x: X(0) - 5, y: Y(i) + 4, "class": "ax", style: "text-anchor:end" }, i < 0 ? M + (-i) : String(i))); }
    }
    sv.appendChild(el("text", { x: X(U) - 4, y: Y(0) - 6, "class": "ax achse", style: "text-anchor:end" }, "x")); sv.appendChild(el("text", { x: X(0) + 6, y: Y(U) + 14, "class": "ax achse", style: "text-anchor:start" }, "y"));
    var gC = el("g", { "clip-path": "url(#gaClip)" }), labs = []; sv.appendChild(gC);
    G.forEach(function(g){
      var d = "", an = false;
      for(var k = 0; k <= 700; k++){ var x = -U - 0.3 + (2 * U + 0.6) * k / 700, y = wertN(g.p, x); if(Math.abs(y) > 40){ an = false; continue; } d += (an ? "L" : "M") + X(x).toFixed(1) + " " + Y(y).toFixed(1); an = true; }
      gC.appendChild(el("path", { d: d, fill: "none", stroke: g.farbe, "stroke-width": 3.2, "stroke-linejoin": "round", "stroke-linecap": "round" }));
    });
    // Markierungen: nach dem Lösen (Dreieck/Scheitel/Nullstellen) bzw. nach „Tipp“ (nur Punkte)
    G.forEach(function(g){
      if(g.fertig && g.typ === "lin"){ var D = g.dreieck, x2 = D.x + D.dx, y2 = D.y + D.dy;
        gC.appendChild(el("path", { d: "M" + X(D.x) + " " + Y(D.y) + " L" + X(x2) + " " + Y(D.y) + " L" + X(x2) + " " + Y(y2), fill: "none", stroke: g.farbe, "stroke-width": 2.5, "stroke-dasharray": "7 5" }));
        (function(){ var px = X(x2), py = Y(D.y), ux = X(D.x) - px, vy = Y(y2) - py, lu = Math.abs(ux), lv = Math.abs(vy); if(lu < 16 || lv < 16) return; var r = Math.min(12, lu * 0.4, lv * 0.4), sx = Math.sign(ux), sy = Math.sign(vy);
          gC.appendChild(el("path", { d: "M" + (px + sx * r) + " " + py + " A" + r + " " + r + " 0 0 " + (sx * sy > 0 ? 1 : 0) + " " + px + " " + (py + sy * r), fill: "none", stroke: g.farbe, "stroke-width": 1.6 }));
          gC.appendChild(el("circle", { cx: px + sx * r * 0.36, cy: py + sy * r * 0.36, r: 1.7, fill: g.farbe })); })(); // rechter Winkel im Steigungsdreieck
        gC.appendChild(el("text", { x: (X(D.x) + X(x2)) / 2, y: Y(D.y) + (D.dy > 0 ? 18 : -8), "class": "mk", fill: g.farbe }, "Δx = " + bt(D.dx)));
        gC.appendChild(el("text", { x: X(x2) + (D.dx > 0 ? 6 : -6), y: (Y(D.y) + Y(y2)) / 2 + 5, "class": "mk", fill: g.farbe, style: "text-anchor:" + (D.dx > 0 ? "start" : "end") }, "Δy = " + bt(D.dy))); }
      if(g.fertig || g.tipp) g.pkt.forEach(function(q){ gC.appendChild(el("circle", { cx: X(q[0]), cy: Y(q[1]), r: 6, fill: g.farbe, stroke: "#ffffff", "stroke-width": 2 })); });
    });
    // Namen an die Graphen (rechts beginnend eine freie Stelle suchen)
    G.forEach(function(g){
      for(var x = U - 0.6; x > -U + 0.5; x -= 0.2){
        var y = wertN(g.p, x); if(Math.abs(y) > U - 0.7) continue;
        var px = X(x), py = Y(y) - 14; if(labs.some(function(l){ return Math.hypot(l[0] - px, l[1] - py) < 34; })) continue;
        labs.push([px, py]); sv.appendChild(el("text", { x: px, y: py, "class": "gname", fill: g.farbe }, g.name)); break;
      }
    });
  }

  // ---------- Eingabe-Karten ----------
  function karten(){
    var box = $("karten"); box.innerHTML = "";
    G.forEach(function(g, i){
      var k = document.createElement("div"); k.className = "gkarte"; k.style.borderColor = g.farbe;
      k.innerHTML = '<div class="gzeile" dir="ltr"><label class="gl" style="color:' + g.farbe + '" for="in' + i + '">' + g.name + '(x) =</label><input type="text" id="in' + i + '" autocomplete="off" autocapitalize="off" spellcheck="false"></div>' +
        '<div class="gknoepfe"><button type="button" class="knopf" id="pr' + i + '"></button> <button type="button" class="knopf hell" id="tp' + i + '"></button></div><p class="meldung" id="me' + i + '"></p><p class="hinweis" id="hi' + i + '" hidden></p><div class="weg" id="we' + i + '" hidden></div>';
      box.appendChild(k);
      var inp = $("in" + i);
      inp.addEventListener("keydown", function(e){ if(e.key === "Enter") pruefe(i); });
      inp.addEventListener("input", function(){ g.eingabe = inp.value; });
      $("pr" + i).addEventListener("click", function(){ pruefe(i); });
      $("tp" + i).addEventListener("click", function(){ g.tipp = true; zeigeKarte(i); zeichne(); });
      zeigeKarte(i);
    });
    $("punkte").textContent = t("punkte", { p: punkte, n: anzahl });
  }
  function zeigeKarte(i){
    var g = G[i];
    $("pr" + i).textContent = t("pruefen"); $("tp" + i).textContent = t("tipp");
    $("pr" + i).disabled = g.fertig; $("in" + i).disabled = g.fertig; $("tp" + i).disabled = g.fertig;
    var me = $("me" + i); me.className = "meldung " + (g.meld === "ok" ? "gut" : g.meld ? "schlecht" : "");
    me.innerHTML = g.meld === "ok" ? t("richtig") : g.meld === "nochmal" ? t("nochmal") : g.meld === "falsch" ? t("falsch") + " " + f(g.name + "(x) = " + FK.ptxt(g.p)) : g.meld === "parse" ? t("fehlerEingabe") : "";
    var hi = $("hi" + i); hi.hidden = !(g.tipp && !g.fertig); hi.textContent = t(g.typ === "lin" ? "hLin" : g.typ === "par" ? "hPar" : "hPol");
    var we = $("we" + i); we.hidden = !g.fertig;
    if(g.fertig) we.innerHTML = g.weg().map(function(b){ return '<div class="wh">' + b.h + "</div>" + b.z.map(function(z){ return '<div class="wz">' + f(z) + "</div>"; }).join(""); }).join("");
  }
  function pruefe(i){
    var g = G[i]; if(g.fertig) return; var roh = $("in" + i).value.trim(); if(!roh) return;
    roh = roh.replace(/^\s*([fghk]\s*\(\s*x\s*\)|y)\s*=\s*/i, "").replace(/·/g, "*");
    var q; try { q = FK.parse(roh); } catch(e){ g.meld = "parse"; zeigeKarte(i); return; }
    var ok = gleich(q, g.p);
    if(!ok && g.vers === 0){ g.vers = 1; g.meld = "nochmal"; zeigeKarte(i); return; }
    g.fertig = true; g.ok = ok; g.meld = ok ? "ok" : "falsch"; anzahl++; if(ok) punkte++;
    zeigeKarte(i); zeichne(); $("punkte").textContent = t("punkte", { p: punkte, n: anzahl });
  }

  // ---------- Auswahl, Texte, Sprache ----------
  function wahlKnoepfe(){
    var box = $("art"); box.innerHTML = "";
    ["mix", "lin", "par", "pol"].forEach(function(k){ var b = document.createElement("button"); b.type = "button"; b.textContent = t("art_" + k); b.setAttribute("aria-pressed", k === art ? "true" : "false");
      b.addEventListener("click", function(){ art = k; wahlKnoepfe(); neu(); }); box.appendChild(b); });
  }
  function alles(){
    document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = "miStudia – " + t("titel"); $("titel").textContent = t("titel");
    $("intro").textContent = t("intro"); $("neu").textContent = t("neu"); $("hilfe").textContent = t("hilfe");
    $("soT").textContent = t("so"); $("soLin").textContent = t("soLin"); $("soPar").textContent = t("soPar"); $("soPol").textContent = t("soPol");
    wahlKnoepfe(); G.forEach(function(g, i){ zeigeKarte(i); }); $("punkte").textContent = t("punkte", { p: punkte, n: anzahl }); zeichne();
  }
  $("neu").addEventListener("click", neu);
  window.MS_LANG = { apply: function(l){ if(GA[l]){ lang = l; FK.setLang(l); alles(); } } };
  neu(); alles();
})();
