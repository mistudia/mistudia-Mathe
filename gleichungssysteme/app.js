// ============================================================
// gleichungssysteme/app.js – Lineare Gleichungssysteme
// 2 Unbekannte: Einsetzungs-, Gleichsetzungs- oder Additionsverfahren, Probe,
//   Zeichnung (zwei Geraden und ihr Schnittpunkt).
// 3 Unbekannte: Gauß-Verfahren (Stufenform, jede Umformung als eigene Zeile),
//   Rückwärtseinsetzen, Probe. Sonderfälle: keine / unendlich viele Lösungen.
// Üben: Zufallssysteme mit ganzzahliger Lösung, 2 Versuche, dann Lösungsweg.
// Rechnen genau mit Brüchen über /funktionen/kern.js (FK). Ein „=“ pro Zeile.
// Texte: gleichungssysteme/texte.js (LG), Sprache aus dem Startmenü (MS_LANG).
// ============================================================
(function(){
  "use strict";
  var NS = "http://www.w3.org/2000/svg", lang = "de", B = FK.B, Bz = FK.Bz, M = FK.MINUS;
  function $(id){ return document.getElementById(id); }
  function t(k, v){ var s = (LG[lang] && LG[lang][k]) || LG.de[k] || k; if(v) for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  function el(n, a, txt){ var e = document.createElementNS(NS, n); for(var k in a) if(a[k] != null) e.setAttribute(k, a[k]); if(txt != null) e.textContent = txt; return e; }
  function sicht(e, an){ if(an) e.removeAttribute("hidden"); else e.setAttribute("hidden", ""); }
  function zuf(a, b){ return a + Math.floor(Math.random() * (b - a + 1)); }
  function bt(b){ return FK.btxt(b); }
  function kl(b){ return b.n < 0 ? "(" + bt(b) + ")" : bt(b); }
  function abs(b){ return B(Math.abs(b.n), b.d); }
  function gleich(a, b){ return a.n === b.n && a.d === b.d; }
  function f(s){ return '<span class="f" dir="ltr">' + s + "</span>"; }
  var VAR = ["x", "y", "z"], NAME = ["I", "II", "III"];

  // ---------- Gleichungen ----------
  // { k: [Koeffizienten], r: rechte Seite, n: Name }
  function koeff(c, v){ var a = bt(abs(c)); return (a === "1" ? "" : a + (a.indexOf("/") >= 0 ? "·" : "")) + v; }
  function linksTxt(k){
    var s = ""; k.forEach(function(c, i){ if(Bz.null(c)) return; s += s ? (c.n < 0 ? " " + M + " " : " + ") + koeff(c, VAR[i]) : (c.n < 0 ? M : "") + koeff(c, VAR[i]); });
    return s || "0";
  }
  function gl(E){ return linksTxt(E.k) + " = " + bt(E.r); }
  function zeile(E){ return E.n + ":  " + gl(E); }
  function mul(E, c, n){ return { k: E.k.map(function(x){ return Bz.mul(x, c); }), r: Bz.mul(E.r, c), n: n || E.n }; }
  function minus(E1, E2, n){ return { k: E1.k.map(function(x, i){ return Bz.sub(x, E2.k[i]); }), r: Bz.sub(E1.r, E2.r), n: n }; }
  function nullZeile(E){ return E.k.every(function(c){ return Bz.null(c); }); }
  function ggT(a, b){ a = Math.abs(a); b = Math.abs(b); while(b){ var x = a % b; a = b; b = x; } return a; }

  // Schritte: [{ h: Überschrift, z: [Formelzeilen] }]
  function block(S, h, z){ S.push({ h: h, z: z }); }
  // Kürzen, wenn alle Zahlen ganz sind und einen gemeinsamen Teiler haben (oder alle Koeffizienten negativ)
  function kuerzen(E, S){
    var alle = E.k.concat([E.r]);
    if(!alle.every(function(c){ return c.d === 1; })) return E;
    var g = alle.reduce(function(a, c){ return ggT(a, c.n); }, 0); if(!g) return E;
    var nz = E.k.filter(function(c){ return !Bz.null(c); }); if(nz.length && nz[0].n < 0) g = -g;
    if(g === 1) return E;
    var N = mul(E, B(1, g)); block(S, t("s_kurz"), [E.n + " : " + (g < 0 ? "(" + M + (-g) + ")" : g), zeile(N)]); return N;
  }
  // v aus E2 entfernen mit Hilfe von E1 → neue Gleichung
  function entferne(E1, E2, v, name, S){
    var p = E1.k[v], q = E2.k[v];
    if(Bz.null(q)) return { k: E2.k.slice(), r: E2.r, n: name, schon: true };
    var f2 = p, f1 = q;
    if(p.d === 1 && q.d === 1){ var g = ggT(p.n, q.n); f2 = B(p.n / g); f1 = B(q.n / g); }
    if(f2.n < 0){ f2 = Bz.neg(f2); f1 = Bz.neg(f1); }
    var plusF = f1.n < 0, f1a = plusF ? Bz.neg(f1) : f1; // „− (−4)·I“ wird zu „+ 4·I“
    var A = mul(E2, f2), C = mul(E1, f1a), N = plusF ? minus(A, mul(C, B(-1)), name) : minus(A, C, name), L = [];
    var fT = function(c, nm){ return (bt(c) === "1" ? "" : bt(c) + "·") + nm; };
    if(bt(f2) !== "1") L.push(E2.n + " · " + bt(f2) + ":  " + gl(A));
    if(bt(f1a) !== "1") L.push(E1.n + " · " + bt(f1a) + ":  " + gl(C));
    L.push(name + " = " + fT(f2, E2.n) + " " + (plusF ? "+" : M) + " " + fT(f1a, E1.n));
    L.push(zeile(N));
    block(S, t("s_mult", { v: VAR[v] }), L);
    return N;
  }
  // Rückwärts einsetzen: Werte W (Bz oder null) in E, nach Variable v auflösen
  function rueck(E, W, v, S){
    var L = [], links = "", werte = "", sum = B(0), c = E.k[v];
    E.k.forEach(function(k, i){
      if(Bz.null(k)) return;
      var neg = k.n < 0, teil, wteil;
      if(i === v){ teil = koeff(k, VAR[i]); wteil = teil; }
      else { teil = (bt(abs(k)) === "1" ? "" : bt(abs(k)) + "·") + kl(W[i]); var w = Bz.mul(k, W[i]); sum = Bz.add(sum, w); neg = w.n < 0; wteil = bt(abs(w)); if(k.n < 0 && w.n >= 0) neg = false; }
      var negT = i === v ? k.n < 0 : k.n < 0;
      links += links ? (negT ? " " + M + " " : " + ") + teil : (negT ? M : "") + teil;
      werte += werte ? (neg ? " " + M + " " : " + ") + wteil : (neg ? M : "") + wteil;
    });
    var cv = koeff(c, VAR[v]); if(c.n < 0) cv = M + cv;
    L.push(links + " = " + bt(E.r));
    var z2 = werte + " = " + bt(E.r); if(z2 !== L[L.length - 1]) L.push(z2);
    var z3 = cv + (Bz.null(sum) ? "" : (sum.n < 0 ? " " + M + " " : " + ") + bt(abs(sum))) + " = " + bt(E.r); if(z3 !== L[L.length - 1]) L.push(z3);
    if(!Bz.null(sum)){ var zz = cv + " = " + summe([[E.r, ""], [Bz.neg(sum), ""]]); if(zz !== L[L.length - 1]) L.push(zz); }
    var rest = Bz.sub(E.r, sum), z4 = cv + " = " + bt(rest); if(z4 !== L[L.length - 1]) L.push(z4);
    var wert = Bz.div(rest, c), z5 = VAR[v] + " = " + bt(wert); if(z5 !== L[L.length - 1]) L.push(z5);
    block(S, t("s_rueck", { g: E.n }), L);
    return wert;
  }
  function sonderfall(E, S, zwei){
    if(Bz.null(E.r)){ block(S, t("unendl"), zwei ? [t("unendlG")] : []); return "inf"; }
    block(S, t("keine", { c: bt(E.r) }), zwei ? [t("keineG")] : []); return "keine";
  }
  function probe(G, W, S){
    var L = G.map(function(E){
      var s = "", ws = B(0);
      E.k.forEach(function(c, i){ if(Bz.null(c)) return; var teil = (bt(abs(c)) === "1" ? "" : bt(abs(c)) + "·") + kl(W[i]); s += s ? (c.n < 0 ? " " + M + " " : " + ") + teil : (c.n < 0 ? M : "") + teil; ws = Bz.add(ws, Bz.mul(c, W[i])); });
      return E.n + ":  " + (s || "0") + " = " + bt(ws) + (gleich(ws, E.r) ? "  ✓" : "  ✗");
    });
    block(S, t("s_probe"), L);
  }
  // Summe aus [Koeffizient, Variable oder ""] als Text (Nullen weglassen)
  function summe(L){ var s = ""; L.forEach(function(p){ var c = p[0]; if(Bz.null(c)) return; var term = p[1] ? koeff(c, p[1]) : bt(abs(c)); s += s ? (c.n < 0 ? " " + M + " " : " + ") + term : (c.n < 0 ? M : "") + term; }); return s || "0"; }
  // Einsetzen v = A + B·w0: Zeilen „v = A + B·w0“, „v = A + (B·w0)“, „v = Ergebnis“
  function einsetzZeilen(v, A, Bk, w0){
    var L = [v + " = " + bt(A) + (Bz.null(Bk) ? "" : " + " + kl(Bk) + "·" + kl(w0))], p = Bz.mul(Bk, w0), e = Bz.add(A, p);
    var z2 = v + " = " + summe([[A, ""], [p, ""]]); if(L.indexOf(z2) < 0) L.push(z2);
    var z3 = v + " = " + bt(e); if(L.indexOf(z3) < 0) L.push(z3); return L;
  }
  // Ausdruck A + Bv als Text
  function ausdruck(A, Bk, v){
    var s = Bz.null(A) ? "" : bt(A);
    if(!Bz.null(Bk)){ var term = koeff(Bk, v); s += s ? (Bk.n < 0 ? " " + M + " " : " + ") + term : (Bk.n < 0 ? M : "") + term; }
    return s || "0";
  }

  // ---------- 2 Unbekannte ----------
  function loese2(G, verf){
    var S = [], W = null, art = null;
    block(S, t("s_sys"), G.map(zeile));
    var det = Bz.sub(Bz.mul(G[0].k[0], G[1].k[1]), Bz.mul(G[0].k[1], G[1].k[0]));
    if(verf === "add" || Bz.null(det)){
      var I = G[0], II = G[1];
      if(Bz.null(I.k[0]) && !Bz.null(II.k[0])){ block(S, t("s_tausch", { a: "I", b: "II", v: "x" }), []); var tmp = I; I = { k: II.k, r: II.r, n: "I" }; II = { k: tmp.k, r: tmp.r, n: "II" }; }
      var v = Bz.null(I.k[0]) ? 1 : 0;
      var N = entferne(I, II, v, "II'", S); N = kuerzen(N, S);
      if(nullZeile(N)) return { S: S, art: sonderfall(N, S, true) };
      var w = 1 - v, wert = Bz.div(N.r, N.k[w]);
      block(S, t("s_rech"), [koeff(N.k[w], VAR[w]) + " = " + bt(N.r), VAR[w] + " = " + bt(wert)].filter(function(x, i, a){ return a.indexOf(x) === i; }));
      W = [null, null]; W[w] = wert;
      W[v] = rueck(I, W, v, S);
    } else if(verf === "ein"){
      // Gleichung und Variable mit Koeffizient ±1 bevorzugen
      var wahl = null;
      [[0, 0], [0, 1], [1, 0], [1, 1]].forEach(function(p){ var c = G[p[0]].k[p[1]]; if(!wahl && !Bz.null(c) && Math.abs(c.n) === 1 && c.d === 1) wahl = p; });
      if(!wahl) wahl = Bz.null(G[0].k[0]) ? [0, 1] : [0, 0];
      var E = G[wahl[0]], O = G[1 - wahl[0]], vv = wahl[1], ww = 1 - vv, cv = E.k[vv], cw = E.k[ww];
      var A = Bz.div(E.r, cv), Bk = Bz.div(Bz.neg(cw), cv), L = [gl(E)];
      L.push(koeff(cv, VAR[vv]).replace(/^/, cv.n < 0 ? M : "") + " = " + ausdruck(E.r, Bz.neg(cw), VAR[ww]));
      var aus = VAR[vv] + " = " + ausdruck(A, Bk, VAR[ww]); if(L.indexOf(aus) < 0) L.push(aus);
      block(S, t("s_auf", { g: E.n, v: VAR[vv] }), L);
      var a = O.k[vv], b = O.k[ww], L2 = [];
      var vor = function(c){ return bt(abs(c)) === "1" ? "" : bt(abs(c)) + "·"; };
      var teil1 = (a.n < 0 ? M : "") + vor(a) + "(" + ausdruck(A, Bk, VAR[ww]) + ")";
      L2.push(Bz.null(a) ? gl(O) : teil1 + (Bz.null(b) ? "" : (b.n < 0 ? " " + M + " " : " + ") + koeff(b, VAR[ww])) + " = " + bt(O.r));
      var aA = Bz.mul(a, A), aB = Bz.mul(a, Bk), C = Bz.add(aB, b);
      if(!Bz.null(a)){
        var s3 = ausdruck(aA, aB, VAR[ww]) + (Bz.null(b) ? "" : (b.n < 0 ? " " + M + " " : " + ") + koeff(b, VAR[ww])) + " = " + bt(O.r);
        L2.push(s3);
      }
      var s4 = ausdruck(aA, C, VAR[ww]) + " = " + bt(O.r); if(L2.indexOf(s4) < 0) L2.push(s4);
      block(S, t("s_ein", { g: O.n }), L2);
      if(Bz.null(C)) return { S: S, art: sonderfall({ k: [B(0), B(0)], r: Bz.sub(O.r, aA) }, S, true) };
      var rest = Bz.sub(O.r, aA), wert2 = Bz.div(rest, C), L3 = [];
      if(!Bz.null(aA)) L3.push(koeff(C, VAR[ww]).replace(/^/, C.n < 0 ? M : "") + " = " + summe([[O.r, ""], [Bz.neg(aA), ""]]));
      L3.push(koeff(C, VAR[ww]).replace(/^/, C.n < 0 ? M : "") + " = " + bt(rest));
      L3.push(VAR[ww] + " = " + bt(wert2));
      block(S, t("s_rech"), L3.filter(function(x, i, a2){ return a2.indexOf(x) === i; }));
      var wv = Bz.add(A, Bz.mul(Bk, wert2));
      block(S, t("s_ein", { g: VAR[vv] + " = " + ausdruck(A, Bk, VAR[ww]) }), einsetzZeilen(VAR[vv], A, Bk, wert2));
      W = [null, null]; W[vv] = wv; W[ww] = wert2;
    } else { // gleich
      var vs = !Bz.null(G[0].k[1]) && !Bz.null(G[1].k[1]) ? 1 : 0, ws2 = 1 - vs, X = [];
      G.forEach(function(E){
        var c = E.k[vs], o = E.k[ws2], A2 = Bz.div(E.r, c), B2 = Bz.div(Bz.neg(o), c), L = [gl(E)];
        L.push(koeff(c, VAR[vs]).replace(/^/, c.n < 0 ? M : "") + " = " + ausdruck(E.r, Bz.neg(o), VAR[ws2]));
        var a3 = VAR[vs] + " = " + ausdruck(A2, B2, VAR[ws2]); if(L.indexOf(a3) < 0) L.push(a3);
        block(S, t("s_auf", { g: E.n, v: VAR[vs] }), L); X.push([A2, B2]);
      });
      var dB = Bz.sub(X[0][1], X[1][1]), dA = Bz.sub(X[1][0], X[0][0]), L4 = [ausdruck(X[0][0], X[0][1], VAR[ws2]) + " = " + ausdruck(X[1][0], X[1][1], VAR[ws2])];
      if(Bz.null(dB)){ block(S, t("s_gl"), L4); return { S: S, art: sonderfall({ k: [B(0), B(0)], r: dA }, S, true) }; }
      L4.push(summe([[X[0][1], VAR[ws2]], [Bz.neg(X[1][1]), VAR[ws2]]]) + " = " + summe([[X[1][0], ""], [Bz.neg(X[0][0]), ""]]));
      L4.push(koeff(dB, VAR[ws2]).replace(/^/, dB.n < 0 ? M : "") + " = " + bt(dA));
      var wv2 = Bz.div(dA, dB); L4.push(VAR[ws2] + " = " + bt(wv2));
      block(S, t("s_gl"), L4);
      var vv2 = Bz.add(X[0][0], Bz.mul(X[0][1], wv2));
      block(S, t("s_ein", { g: VAR[vs] + " = " + ausdruck(X[0][0], X[0][1], VAR[ws2]) }), einsetzZeilen(VAR[vs], X[0][0], X[0][1], wv2));
      W = [null, null]; W[vs] = vv2; W[ws2] = wv2;
    }
    probe(G, W, S);
    block(S, t("s_loes"), ["x = " + bt(W[0]), "y = " + bt(W[1])]);
    return { S: S, W: W, art: "eine" };
  }

  // ---------- 3 Unbekannte: Gauß ----------
  function loese3(G){
    var S = [], R = G.slice();
    block(S, t("s_sys"), R.map(zeile));
    // Spalte x
    if(Bz.null(R[0].k[0])){ var j = R[1].k[0].n ? 1 : R[2].k[0].n ? 2 : -1; if(j > 0){ block(S, t("s_tausch", { a: "I", b: NAME[j], v: "x" }), []); var a = R[0]; R[0] = { k: R[j].k, r: R[j].r, n: "I" }; R[j] = { k: a.k, r: a.r, n: NAME[j] }; } }
    var piv0 = Bz.null(R[0].k[0]) ? null : 0;
    var II = piv0 === 0 ? kuerzen(entferne(R[0], R[1], 0, "II'", S), S) : { k: R[1].k, r: R[1].r, n: "II'" };
    var III = piv0 === 0 ? kuerzen(entferne(R[0], R[2], 0, "III'", S), S) : { k: R[2].k, r: R[2].r, n: "III'" };
    // Spalte y
    if(Bz.null(II.k[1]) && !Bz.null(III.k[1])){ block(S, t("s_tausch", { a: "II'", b: "III'", v: "y" }), []); var b = II; II = { k: III.k, r: III.r, n: "II'" }; III = { k: b.k, r: b.r, n: "III'" }; }
    var III2 = Bz.null(II.k[1]) ? { k: III.k, r: III.r, n: "III''" } : kuerzen(entferne(II, III, 1, "III''", S), S);
    var St = [R[0], II, III2];
    block(S, t("s_stufe"), St.map(zeile));
    if(nullZeile(III2) || Bz.null(III2.k[2])){
      if(nullZeile(III2)) return { S: S, art: sonderfall(III2, S, false) };
      return { S: S, art: "inf" };
    }
    var W = [null, null, null];
    W[2] = Bz.div(III2.r, III2.k[2]);
    block(S, t("s_rech"), [koeff(III2.k[2], "z").replace(/^/, III2.k[2].n < 0 ? M : "") + " = " + bt(III2.r), "z = " + bt(W[2])].filter(function(x, i, a2){ return a2.indexOf(x) === i; }));
    if(Bz.null(II.k[1])) return { S: S, art: "inf" };
    W[1] = rueck(II, W, 1, S);
    if(Bz.null(R[0].k[0])) return { S: S, art: "inf" };
    W[0] = rueck(R[0], W, 0, S);
    probe(G, W, S);
    block(S, t("s_loes"), ["x = " + bt(W[0]), "y = " + bt(W[1]), "z = " + bt(W[2])]);
    return { S: S, W: W, art: "eine" };
  }
  function wegHtml(S){ return S.map(function(b){ return '<div class="wh">' + b.h + "</div>" + b.z.map(function(z){ return '<div class="wz">' + f(z) + "</div>"; }).join(""); }).join(""); }

  // ---------- Zeichnung (2 Unbekannte) ----------
  var GW = 480, GH = 380;
  function graph(sv, G, W){
    while(sv.lastChild) sv.removeChild(sv.lastChild); sv.setAttribute("viewBox", "0 0 " + GW + " " + GH);
    var cx = W ? Bz.num(W[0]) : 0, cy = W ? Bz.num(W[1]) : 0, hx = Math.max(6, Math.abs(cx) + 3), k = GW / (2 * hx); cx = W ? cx : 0; cy = W ? cy : 0;
    var x0 = Math.min(0, cx) - 3, x1 = Math.max(0, cx) + 3, y0 = Math.min(0, cy) - 3, y1 = Math.max(0, cy) + 3;
    var w = Math.max(x1 - x0, (y1 - y0) * GW / GH); k = GW / w; var mx = (x0 + x1) / 2, my = (y0 + y1) / 2, hw = GW / 2 / k, hh = GH / 2 / k;
    var X = function(x){ return (x - mx + hw) * k; }, Y = function(y){ return (my + hh - y) * k; };
    var st = k > 30 ? 1 : k > 12 ? 2 : 5;
    sv.appendChild(el("rect", { x: 0, y: 0, width: GW, height: GH, fill: "#ffffff" }));
    for(var gx = Math.ceil((mx - hw) / st) * st; gx <= mx + hw; gx += st){ sv.appendChild(el("line", { x1: X(gx), y1: 0, x2: X(gx), y2: GH, stroke: "#dbe4f0" })); if(gx) sv.appendChild(el("text", { x: X(gx), y: Math.min(Math.max(Y(0) + 14, 14), GH - 3), "class": "ax" }, gx < 0 ? M + (-gx) : gx)); }
    for(var gy = Math.ceil((my - hh) / st) * st; gy <= my + hh; gy += st){ sv.appendChild(el("line", { x1: 0, y1: Y(gy), x2: GW, y2: Y(gy), stroke: "#dbe4f0" })); if(gy) sv.appendChild(el("text", { x: Math.min(Math.max(X(0) - 4, 24), GW - 4), y: Y(gy) + 4, "class": "ax", style: "text-anchor:end" }, gy < 0 ? M + (-gy) : gy)); }
    sv.appendChild(el("line", { x1: 0, y1: Y(0), x2: GW, y2: Y(0), stroke: "#1a2233", "stroke-width": 1.6 })); sv.appendChild(el("line", { x1: X(0), y1: 0, x2: X(0), y2: GH, stroke: "#1a2233", "stroke-width": 1.6 }));
    var FAR = ["#2563eb", "#ea580c"];
    G.forEach(function(E, i){
      var a = Bz.num(E.k[0]), b = Bz.num(E.k[1]), r = Bz.num(E.r), xa = mx - hw, xb = mx + hw, p1, p2;
      if(Math.abs(b) > 1e-12){ p1 = [xa, (r - a * xa) / b]; p2 = [xb, (r - a * xb) / b]; } else if(Math.abs(a) > 1e-12){ p1 = [r / a, my - hh]; p2 = [r / a, my + hh]; } else return;
      sv.appendChild(el("line", { x1: X(p1[0]), y1: Y(p1[1]), x2: X(p2[0]), y2: Y(p2[1]), stroke: FAR[i], "stroke-width": 3.2 }));
      var lx = mx + hw * (i ? -0.7 : 0.7), ly = Math.abs(b) > 1e-12 ? (r - a * lx) / b : my + hh * 0.7; if(Math.abs(b) <= 1e-12) lx = r / a;
      if(Math.abs(ly - my) < hh * 0.9) sv.appendChild(el("text", { x: X(lx) + 6, y: Y(ly) - 10, "class": "gname", fill: FAR[i] }, E.n));
    });
    if(W) { sv.appendChild(el("circle", { cx: X(cx), cy: Y(cy), r: 6.5, fill: "#9333ea", stroke: "#ffffff", "stroke-width": 2 }));
      sv.appendChild(el("text", { x: X(cx) + 10, y: Y(cy) - 10, "class": "plab" }, "(" + bt(W[0]) + " | " + bt(W[1]) + ")")); }
  }

  // ---------- Rechnen ----------
  var n = 2, verf = "add", ROH = { 2: [["2", "3", "12"], ["1", "-1", "1"]], 3: [["1", "1", "1", "6"], ["2", "-1", "1", "3"], ["1", "2", "-1", "2"]] };
  function zahlLesen(s){ s = String(s).trim().replace(/−/g, "-"); if(s === "") return B(0); if(s === "-") return B(-1); var p = FK.parse(s.replace(/,/g, ".")); if(FK.grad(p) > 0) throw 1; return FK.trim(p)[0]; }
  function felder(){
    var box = $("rFelder"), h = "";
    for(var i = 0; i < n; i++){
      h += '<div class="glz" dir="ltr"><b class="gn">' + NAME[i] + ":</b>";
      for(var j = 0; j < n; j++) h += (j ? '<span class="op">+</span>' : "") + '<input class="zahl k" data-i="' + i + '" data-j="' + j + '" inputmode="text" autocomplete="off" value="' + (ROH[n][i][j] || "") + '"><span class="v">' + VAR[j] + "</span>";
      h += '<span class="op">=</span><input class="zahl k" data-i="' + i + '" data-j="' + n + '" inputmode="text" autocomplete="off" value="' + (ROH[n][i][n] || "") + '"></div>';
    }
    box.innerHTML = h;
    box.querySelectorAll("input").forEach(function(inp){ inp.addEventListener("input", function(){ ROH[n][+inp.dataset.i][+inp.dataset.j] = inp.value; }); inp.addEventListener("keydown", function(e){ if(e.key === "Enter") rechne(); }); });
  }
  function knoepfe(){
    var b1 = $("nWahl"); b1.innerHTML = "";
    [2, 3].forEach(function(k){ var b = document.createElement("button"); b.type = "button"; b.textContent = t("n" + k); b.setAttribute("aria-pressed", k === n ? "true" : "false"); b.addEventListener("click", function(){ n = k; knoepfe(); felder(); rechne(); }); b1.appendChild(b); });
    var b2 = $("vWahl"); b2.innerHTML = "";
    (n === 2 ? ["ein", "gleich", "add"] : ["gauss"]).forEach(function(k){ var b = document.createElement("button"); b.type = "button"; b.textContent = t("v_" + k); b.setAttribute("aria-pressed", (n === 3 || k === verf) ? "true" : "false"); b.addEventListener("click", function(){ if(n === 2){ verf = k; knoepfe(); rechne(); } }); b2.appendChild(b); });
  }
  function system(roh, k){ var G = []; for(var i = 0; i < k; i++){ var z = roh[i].map(zahlLesen); G.push({ k: z.slice(0, k), r: z[k], n: NAME[i] }); } return G; }
  function rechne(){
    var G; try { G = system(ROH[n], n); } catch(e){ $("rFehler").textContent = t("fehler"); $("rWeg").innerHTML = ""; return; }
    $("rFehler").textContent = "";
    var L;
    try { L = n === 2 ? loese2(G, verf) : loese3(G); }
    catch(e){ try { L = n === 2 ? loese2(G, "add") : null; } catch(e2){ L = null; } }
    if(!L){ $("rFehler").textContent = t("fehler"); $("rWeg").innerHTML = ""; return; }
    $("rWeg").innerHTML = wegHtml(L.S);
    sicht($("rBild"), n === 2); if(n === 2) graph($("rSvg"), G, L.W);
    $("rMerke").textContent = t(n === 2 ? "merke2" : "merke3"); $("rGraphT").textContent = t("graphT");
  }
  $("rechnenBtn").addEventListener("click", rechne);

  // ---------- Üben ----------
  var auf = null, punkte = 0, anzahl = 0, versuche = 0, fertig = false, eing = null;
  function det3(A){ return A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1]) - A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0]) + A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0]); }
  function neueAufgabe(){
    var k = Math.random() < 0.55 ? 2 : 3, A, Wn;
    for(var tries = 0; tries < 500; tries++){
      Wn = []; for(var i = 0; i < k; i++) Wn.push(zuf(-5, 5));
      A = []; for(var r = 0; r < k; r++){ var row = []; for(var c = 0; c < k; c++) row.push(Math.random() < (k === 3 ? 0.15 : 0.05) ? 0 : zuf(-4, 4)); A.push(row); }
      var d = k === 2 ? A[0][0] * A[1][1] - A[0][1] * A[1][0] : det3(A);
      if(d !== 0 && A.every(function(row){ return row.some(function(x){ return x; }); })) break;
    }
    var G = A.map(function(row, i){ return { k: row.map(function(x){ return B(x); }), r: B(row.reduce(function(s, x, j){ return s + x * Wn[j]; }, 0)), n: NAME[i] }; });
    auf = { k: k, G: G, W: Wn }; versuche = 0; fertig = false; eing = null; zeige();
  }
  function zeige(){
    $("uAuftrag").innerHTML = t("u_auftrag") + '<div class="fg">' + auf.G.map(function(E){ return f(zeile(E)); }).join("<br>") + "</div>";
    var h = ""; for(var i = 0; i < auf.k; i++) h += '<label class="uv" dir="ltr">' + VAR[i] + ' = <input class="zahl" id="u' + i + '" inputmode="text" autocomplete="off"' + (fertig ? " disabled" : "") + ' value="' + (eing ? eing[i] : "") + '"></label>';
    $("uFelder").innerHTML = h;
    $("uFelder").querySelectorAll("input").forEach(function(inp){ inp.addEventListener("keydown", function(e){ if(e.key === "Enter") pruefe(); }); });
    $("uPruefen").textContent = t("pruefen"); $("uPruefen").disabled = fertig; $("uWeiter").textContent = t("weiterA"); $("uPunkteZ").textContent = t("punkte", { p: punkte, n: anzahl });
    sicht($("uLoesung"), fertig);
    if(fertig){ var L = auf.k === 2 ? loese2(auf.G, "add") : loese3(auf.G); $("uWeg").innerHTML = wegHtml(L.S); sicht($("uBild"), auf.k === 2); if(auf.k === 2) graph($("uSvg"), auf.G, L.W); }
  }
  function pruefe(){
    if(fertig) return; var E = [], leer = false, m = $("uMeld");
    for(var i = 0; i < auf.k; i++){ var v = $("u" + i).value; if(!v.trim()) leer = true; E.push(v); }
    if(leer){ m.className = "meldung schlecht"; m.textContent = t("eingabeFehlt"); return; }
    eing = E;
    var ok = E.every(function(v, i){ try { var z = zahlLesen(v); return Bz.num(z) === auf.W[i]; } catch(e){ return false; } });
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
    $("rechnenBtn").textContent = t("rechnen");
    knoepfe(); felder(); rechne();
    if(auf){ var mk = $("uMeld").className, mt = $("uMeld").textContent; zeige(); if(mt){ $("uMeld").className = mk; $("uMeld").textContent = fertig ? t(mk.indexOf("gut") >= 0 ? "richtig" : "falsch") : t("nochmal"); } }
  }
  window.MS_LANG = { apply: function(l){ if(LG[l]){ lang = l; FK.setLang(l); alles(); } } };
  // Alltagsbeispiel „Ausprobieren“
  window.LG_LADEN = function(w){ n = w.n; ROH[n] = w.roh.map(function(r){ return r.map(String); }); if(w.verf) verf = w.verf; zeigeTab("rechnen"); knoepfe(); felder(); rechne(); window.scrollTo(0, 0); };
  alles();
})();
