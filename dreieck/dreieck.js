// ============================================================
// dreieck/dreieck.js – Dreiecke konstruieren wie auf Papier
// Blatt (kariert, Einheit mm), Werkzeuge: Punkt, Lineal, Zirkel,
// Geodreieck, Messen, Radieren, Verschieben; Schnittpunkte von
// Strecken und Kreisbögen werden automatisch zu Fangpunkten.
// Aufgabenmodus: SSS, SWS, WSW, SsW – Prüfung über Kongruenz
// (alle drei Seiten gleich ⇒ Dreieck richtig).
// Texte: dreieck/texte.js (DT), Sprache aus dem Startmenü.
// ============================================================
(function(){
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  var svg = document.getElementById("blatt");
  var lang = "de";
  function t(k, v){ var s = (DT[lang] && DT[lang][k]) || DT.de[k] || k; if(v) for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  function zahl(v, d){ var s = (Math.round(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d); return lang === "en" || lang === "zh" || lang === "ja" || lang === "ar" ? s : s.replace(".", ","); }
  function cm(mm){ return zahl(mm / 10, 1); }
  function grad(rad){ return zahl(rad * 180 / Math.PI, 0); }
  function el(n, a, txt){ var e = document.createElementNS(NS, n); for(var k in a) e.setAttribute(k, a[k]); if(txt != null) e.textContent = txt; return e; }

  // ---------- Zustand (Welt in mm, y nach unten) ----------
  function leeresBlatt(){ return { pts: [], lines: [], arcs: [], texte: [], dims: [], nr: 0 }; }
  var S = leeresBlatt();
  var hist = [];
  var tool = "lineal", step = 0, tmp = {};
  var view = { x: -15, y: -15, w: 180, h: 120 };
  var zeigeMasse = true;
  var modus = "frei", aufg = null, meldung = null;
  var schnitte = [], schnitteAlt = true;
  var hilfen = true, bemArt = "l", letzteKopie = null, raster = false, auswahl = null, zukunft = [];
  // Geodreieck (Overlay): Nullpunkt x/y in mm, Drehung w; lokale Hypotenuse von −80 bis 80 mm, Spitze bei (0, −80)
  var GD = { on: false, x: 60, y: 60, w: 0 };

  function merke(){ hist.push(JSON.stringify(S)); if(hist.length > 100) hist.shift(); zukunft = []; auswahl = null; schnitteAlt = true; }
  function laden(json){ S = JSON.parse(json); S.texte = S.texte || []; S.dims = S.dims || []; letzteKopie = null; auswahl = null; schnitteAlt = true; reset(); speichern(); zeichne(); hinweis(); }
  function rueck(){ if(!hist.length) return; zukunft.push(JSON.stringify(S)); laden(hist.pop()); }
  function vor(){ if(!zukunft.length) return; hist.push(JSON.stringify(S)); laden(zukunft.pop()); }
  function speichern(){ try{ localStorage.setItem("msDreieckBlatt", JSON.stringify(S)); }catch(e){} }
  function name(i){ var b = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; return i < 26 ? b[i] : b[i % 26] + "′".repeat(Math.floor(i / 26)); }
  function freierName(){ for(var i = 0; ; i++){ var n = name(i); if(!S.pts.some(function(q){ return q.n === n; })) return n; } }
  function neuerPunkt(x, y){ var p = { id: ++S.nr, x: x, y: y, n: freierName() }; S.pts.push(p); return p; }
  function punkt(id){ for(var i = 0; i < S.pts.length; i++) if(S.pts[i].id === id) return S.pts[i]; return null; }

  // ---------- Geometrie ----------
  function dist(a, b){ return Math.hypot(a.x - b.x, a.y - b.y); }
  function normWinkel(a){ a %= 2 * Math.PI; return a < 0 ? a + 2 * Math.PI : a; }
  function imBogen(arc, w){
    var s = Math.min(arc.a0, arc.a1), e = Math.max(arc.a0, arc.a1);
    if(e - s >= 2 * Math.PI - 1e-6) return true;
    return normWinkel(w - s) <= e - s + 1e-6;
  }
  function kk(a, b){ // Kreis-Kreis
    var d = Math.hypot(b.cx - a.cx, b.cy - a.cy);
    if(d < 1e-6 || d > a.r + b.r + 1e-6 || d < Math.abs(a.r - b.r) - 1e-6) return [];
    var l = (a.r * a.r - b.r * b.r + d * d) / (2 * d), h = Math.sqrt(Math.max(0, a.r * a.r - l * l));
    var mx = a.cx + l * (b.cx - a.cx) / d, my = a.cy + l * (b.cy - a.cy) / d;
    var ox = -h * (b.cy - a.cy) / d, oy = h * (b.cx - a.cx) / d;
    return h < 1e-6 ? [{ x: mx, y: my }] : [{ x: mx + ox, y: my + oy }, { x: mx - ox, y: my - oy }];
  }
  function kl(c, l){ // Kreis-Strecke
    var dx = l.x2 - l.x1, dy = l.y2 - l.y1, fx = l.x1 - c.cx, fy = l.y1 - c.cy;
    var A = dx * dx + dy * dy, Bq = 2 * (fx * dx + fy * dy), C = fx * fx + fy * fy - c.r * c.r, D = Bq * Bq - 4 * A * C;
    if(A < 1e-9 || D < 0) return [];
    var r = [], sq = Math.sqrt(D);
    [(-Bq - sq) / (2 * A), (-Bq + sq) / (2 * A)].forEach(function(u){ if(u >= -1e-6 && u <= 1 + 1e-6) r.push({ x: l.x1 + u * dx, y: l.y1 + u * dy }); });
    return r;
  }
  function ll(a, b){ // Strecke-Strecke
    var d = (a.x2 - a.x1) * (b.y2 - b.y1) - (a.y2 - a.y1) * (b.x2 - b.x1);
    if(Math.abs(d) < 1e-9) return [];
    var u = ((b.x1 - a.x1) * (b.y2 - b.y1) - (b.y1 - a.y1) * (b.x2 - b.x1)) / d;
    var v = ((b.x1 - a.x1) * (a.y2 - a.y1) - (b.y1 - a.y1) * (a.x2 - a.x1)) / d;
    return (u >= -1e-6 && u <= 1 + 1e-6 && v >= -1e-6 && v <= 1 + 1e-6) ? [{ x: a.x1 + u * (a.x2 - a.x1), y: a.y1 + u * (a.y2 - a.y1) }] : [];
  }
  function abstandStrecke(p, l){
    var dx = l.x2 - l.x1, dy = l.y2 - l.y1, A = dx * dx + dy * dy;
    var u = A ? ((p.x - l.x1) * dx + (p.y - l.y1) * dy) / A : 0; u = Math.max(0, Math.min(1, u));
    return Math.hypot(p.x - (l.x1 + u * dx), p.y - (l.y1 + u * dy));
  }
  function schnittpunkte(){
    if(!schnitteAlt) return schnitte;
    var r = [], A = S.arcs, L = S.lines, i, j;
    function add(q, ok){ q.forEach(function(p){ if(ok(p)) r.push(p); }); }
    for(i = 0; i < A.length; i++) for(j = i + 1; j < A.length; j++){
      var a = A[i], b = A[j];
      if(Math.abs(a.cx - b.cx) < 1e-6 && Math.abs(a.cy - b.cy) < 1e-6) continue;
      add(kk(a, b), function(p){ return imBogen(a, Math.atan2(p.y - a.cy, p.x - a.cx)) && imBogen(b, Math.atan2(p.y - b.cy, p.x - b.cx)); });
    }
    for(i = 0; i < A.length; i++) for(j = 0; j < L.length; j++){
      var c = A[i]; add(kl(c, L[j]), function(p){ return imBogen(c, Math.atan2(p.y - c.cy, p.x - c.cx)); });
    }
    for(i = 0; i < L.length; i++) for(j = i + 1; j < L.length; j++) add(ll(L[i], L[j]), function(){ return true; });
    schnitte = r; schnitteAlt = false; return r;
  }
  // Fangen: Punkte vor Schnittpunkten vor Strecken-Enden
  function ppm(){ return (svg.clientWidth || 600) / view.w; }
  function fang(p){
    var tol = 18 / ppm(), best = null, bd = tol;
    S.pts.forEach(function(q){ var d = dist(p, q); if(d < bd){ bd = d; best = { x: q.x, y: q.y, pid: q.id }; } });
    if(best) return best;
    schnittpunkte().forEach(function(q){ var d = dist(p, q); if(d < bd){ bd = d; best = { x: q.x, y: q.y, schnitt: true }; } });
    if(best) return best;
    S.lines.forEach(function(l){ [{ x: l.x1, y: l.y1 }, { x: l.x2, y: l.y2 }].forEach(function(q){ var d = dist(p, q); if(d < bd){ bd = d; best = { x: q.x, y: q.y }; } }); });
    if(!best && raster) best = { x: Math.round(p.x / 5) * 5, y: Math.round(p.y / 5) * 5, raster: true };
    return best;
  }
  function sicherePunkt(f, x, y){ // vorhandenen Punkt nehmen oder neuen anlegen
    if(f && f.pid) return punkt(f.pid);
    return neuerPunkt(f ? f.x : x, f ? f.y : y);
  }

  // ---------- Fanghilfen (waagrecht, senkrecht, parallel, rechtwinklig, gleich lang, tangential) ----------
  function modPi(d){ d %= Math.PI; if(d < 0) d += Math.PI; return Math.min(d, Math.PI - d); }
  function richtungen(){
    var r = [[0, "—", null], [Math.PI / 2, "|", null]];
    S.lines.forEach(function(l){ var w = Math.atan2(l.y2 - l.y1, l.x2 - l.x1); r.push([w, "∥", l]); r.push([w + Math.PI / 2, "⊥", l]); });
    return r;
  }
  function richtungsFang(a, b, festL){
    var L = festL || dist(a, b), w = Math.atan2(b.y - a.y, b.x - a.x), info = null;
    if(L < 0.5 || !hilfen) return { p: festL ? { x: a.x + L * Math.cos(w), y: a.y + L * Math.sin(w) } : b, info: null };
    var best = null, bd = 3 * Math.PI / 180;
    richtungen().forEach(function(c){ var d = modPi(w - c[0]); if(d < bd - 1e-9){ bd = d; best = c; } });
    if(best){ w = best[0] + Math.round((w - best[0]) / Math.PI) * Math.PI; info = { sym: best[1], ref: best[2] }; }
    if(!festL){
      var L0 = L, tol = 8 / ppm(), gl = null;
      S.lines.forEach(function(l){ var len = Math.hypot(l.x2 - l.x1, l.y2 - l.y1); if(!l.h && Math.abs(len - L0) < tol){ tol = Math.abs(len - L0); gl = l; L = len; } });
      if(gl){ info = info || { sym: "", ref: null }; info.gleich = gl; info.sym = (info.sym ? info.sym + " " : "") + "="; }
    }
    return { p: { x: a.x + L * Math.cos(w), y: a.y + L * Math.sin(w) }, info: info };
  }
  function abstandGerade(p, l){ // Abstand zur Strecke, nur wenn der Lotfußpunkt auf ihr liegt
    var dx = l.x2 - l.x1, dy = l.y2 - l.y1, A = dx * dx + dy * dy; if(A < 1e-9) return Infinity;
    var u = ((p.x - l.x1) * dx + (p.y - l.y1) * dy) / A; if(u < 0 || u > 1) return Infinity;
    return Math.abs((p.x - l.x1) * dy - (p.y - l.y1) * dx) / Math.sqrt(A);
  }
  function radFang(c, r){ // Radius so, dass der Kreis eine Linie/einen Kreis berührt
    if(!hilfen) return null;
    var tol = 10 / ppm(), best = null;
    S.lines.forEach(function(l){ var d = abstandGerade(c, l); if(d > 0.5 && Math.abs(d - r) < tol){ tol = Math.abs(d - r); best = { r: d, ref: l }; } });
    S.arcs.forEach(function(a){ var d = Math.hypot(a.cx - c.x, a.cy - c.y); if(d < 0.01) return;
      [d - a.r, d + a.r, a.r - d].forEach(function(rr){ if(rr > 0.5 && Math.abs(rr - r) < tol){ tol = Math.abs(rr - r); best = { r: rr, refA: a }; } }); });
    return best;
  }
  // ---------- Geodreieck ----------
  function gdWelt(lx, ly){ var c = Math.cos(GD.w), s = Math.sin(GD.w); return { x: GD.x + lx * c - ly * s, y: GD.y + lx * s + ly * c }; }
  function gdLokal(p){ var c = Math.cos(GD.w), s = Math.sin(GD.w), dx = p.x - GD.x, dy = p.y - GD.y; return { x: dx * c + dy * s, y: -dx * s + dy * c }; }
  function kanteProj(p){ var l = gdLokal(p); return gdWelt(Math.max(-80, Math.min(80, l.x)), 0); }
  function kanteAbstand(p){ var l = gdLokal(p); return Math.abs(l.x) <= 80 ? Math.abs(l.y) : Infinity; }
  function kantePunkt(p){ var f = fang(p); if(f && kanteAbstand(f) < 1.2) return { p: { x: f.x, y: f.y }, f: f }; return { p: kanteProj(p), f: null }; }
  var GRIFF = { zieh: [0, -27], dreh: [0, -68] };
  function gdGriff(p){
    if(!GD.on) return null;
    var tol = 22 / ppm();
    for(var k in GRIFF){ var q = gdWelt(GRIFF[k][0], GRIFF[k][1]); if(dist(p, q) < tol) return k; }
    return null;
  }
  function gdZiehen(p){
    tmp.info = null;
    if(tmp.gd.art === "zieh"){
      var nx = p.x + tmp.gd.ox, ny = p.y + tmp.gd.oy, f = fang({ x: nx, y: ny });
      GD.x = f ? f.x : nx; GD.y = f ? f.y : ny;
    } else {
      var w = Math.atan2(p.y - GD.y, p.x - GD.x) + Math.PI / 2;
      w = Math.round(w * 180 / Math.PI) * Math.PI / 180;
      if(hilfen){
        var bd = 2 * Math.PI / 180, best = null;
        richtungen().forEach(function(c){ var d = modPi(w - c[0]); if(d < bd - 1e-9){ bd = d; best = c; } });
        if(best){ w = best[0] + Math.round((w - best[0]) / Math.PI) * Math.PI; tmp.info = { sym: best[1], ref: best[2] }; }
      }
      GD.w = w;
      var g = Math.round(normWinkel(-w) * 180 / Math.PI) % 180;
      tmp.info = tmp.info || { sym: "" }; tmp.info.sym = (tmp.info.sym ? tmp.info.sym + "  " : "") + g + "°";
      tmp.infoPos = gdWelt(0, -68);
    }
    zeichne();
  }
  function zeichneGeo(){
    if(!GD.on) return;
    var k = 1 / ppm(), g = el("g", { "class": "gd", transform: "translate(" + GD.x + " " + GD.y + ") rotate(" + (GD.w * 180 / Math.PI) + ")" });
    g.appendChild(el("polygon", { points: "-80,0 80,0 0,-80", "class": "gdkoerper", "vector-effect": "non-scaling-stroke" }));
    var d = "";
    for(var j = 5; j < 80; j += 5) d += "M" + (-(80 - j) + 1.5) + " " + (-j) + "H" + (80 - j - 1.5);
    d += "M0 -6V-78";
    g.appendChild(el("path", { d: d, "class": "gdpar", "vector-effect": "non-scaling-stroke" }));
    var tk = "";
    for(var m = -79; m <= 79; m++){ var len = m % 10 === 0 ? 4 : m % 5 === 0 ? 2.6 : 1.5; tk += "M" + m + " 0V" + (-len); }
    for(var a = 0; a <= 180; a++){
      var rad = a * Math.PI / 180, r1 = a % 10 === 0 ? 48 : a % 5 === 0 ? 49.6 : 50.6;
      tk += "M" + (52 * Math.cos(rad)) + " " + (-52 * Math.sin(rad)) + "L" + (r1 * Math.cos(rad)) + " " + (-r1 * Math.sin(rad));
    }
    g.appendChild(el("path", { d: tk, "class": "gdskala", "vector-effect": "non-scaling-stroke" }));
    for(var c = -7; c <= 7; c++) g.appendChild(el("text", { x: c * 10, y: -6, "class": "gdzahl", "font-size": 3 }, String(Math.abs(c))));
    for(a = 0; a <= 180; a += 10){
      if(a === 90) continue;
      rad = a * Math.PI / 180;
      g.appendChild(el("text", { x: 45 * Math.cos(rad), y: -45 * Math.sin(rad) + 1, "class": "gdzahl", "font-size": 2.6 }, String(a)));
      g.appendChild(el("text", { x: 40.5 * Math.cos(rad), y: -40.5 * Math.sin(rad) + 1, "class": "gdzahl klein", "font-size": 2 }, String(180 - a)));
    }
    // Griffe (Bildschirmgröße)
    [["zieh", "M0 -8V8M-8 0H8M0 -8l-3 3M0 -8l3 3M0 8l-3 -3M0 8l3 -3M-8 0l3 -3M-8 0l3 3M8 0l-3 -3M8 0l-3 3"],
     ["dreh", "M5.5 -4A7 7 0 1 0 7 2M5.5 -4l0.5 -4.5M5.5 -4l-4.3 -1"]].forEach(function(h){
      var q = el("g", { transform: "translate(" + GRIFF[h[0]][0] + " " + GRIFF[h[0]][1] + ") scale(" + k + ")", "class": "gdgriff" });
      q.appendChild(el("circle", { r: 14 })); q.appendChild(el("path", { d: h[1] })); g.appendChild(q);
    });
    svg.appendChild(g);
  }

  // ---------- Kopieren (kongruente Figuren) ----------
  function inDreieck(p, P){
    function s(a, b, c){ return (a.x - c.x) * (b.y - c.y) - (b.x - c.x) * (a.y - c.y); }
    var d1 = s(p, P[0], P[1]), d2 = s(p, P[1], P[2]), d3 = s(p, P[2], P[0]);
    return !((d1 < 0 || d2 < 0 || d3 < 0) && (d1 > 0 || d2 > 0 || d3 > 0));
  }
  function kopieTrafo(f){
    if(!letzteKopie) return;
    var lk = letzteKopie; merke(); letzteKopie = lk;
    lk.pids.forEach(function(id){ var q = punkt(id); if(q){ var r = f(q.x, q.y); q.x = r.x; q.y = r.y; } });
    lk.lis.forEach(function(i){ var l = S.lines[i]; if(!l) return; var a = f(l.x1, l.y1), b = f(l.x2, l.y2); l.x1 = a.x; l.y1 = a.y; l.x2 = b.x; l.y2 = b.y; });
    schnitteAlt = true; zeichne(); hinweis();
  }
  function kopieMitte(){
    var x = 0, y = 0, n = 0;
    letzteKopie.lis.forEach(function(i){ var l = S.lines[i]; if(l){ x += l.x1 + l.x2; y += l.y1 + l.y2; n += 2; } });
    return n ? { x: x / n, y: y / n } : { x: 0, y: 0 };
  }
  function kopieDrehen(g){
    if(!letzteKopie) return;
    var c = kopieMitte(), w = g * Math.PI / 180, co = Math.cos(w), si = Math.sin(w);
    kopieTrafo(function(x, y){ return { x: c.x + (x - c.x) * co - (y - c.y) * si, y: c.y + (x - c.x) * si + (y - c.y) * co }; });
  }
  function kopieSpiegeln(){ if(!letzteKopie) return; var c = kopieMitte(); kopieTrafo(function(x, y){ return { x: 2 * c.x - x, y: y }; }); }

  // ---------- Konstruieren (wie GeoGebra): Mittelpunkt, Lot, Parallele, Mittelsenkrechte, Winkelhalbierende, Kreis durch 3 Punkte ----------
  var KONSTR = ["mitte", "lot", "parallele", "msenk", "whalb", "kreis3"];
  function linieBei(p){ var tol = 14 / ppm(), best = -1; S.lines.forEach(function(l, i){ var d = abstandStrecke(p, l); if(d < tol){ tol = d; best = i; } }); return best; }
  function hilfslinie(q, dx, dy, L){ var n = Math.hypot(dx, dy) || 1; dx /= n; dy /= n; S.lines.push({ x1: q.x - dx * L, y1: q.y - dy * L, x2: q.x + dx * L, y2: q.y + dy * L, h: 1 }); }
  function abstandUnendlich(p, l){ var dx = l.x2 - l.x1, dy = l.y2 - l.y1, n = Math.hypot(dx, dy) || 1; return Math.abs((p.x - l.x1) * dy - (p.y - l.y1) * dx) / n; }
  function punktDa(q){ return S.pts.some(function(r){ return dist(r, q) < 0.01; }); }
  function konstruiere(p){
    var f = fang(p), q = f ? { x: f.x, y: f.y } : null;
    if(tool === "lot" || tool === "parallele"){
      if(step === 0){ var i = linieBei(p); if(i < 0){ hinweis("hLinieWaehlen"); return; } tmp = { l: S.lines[i] }; step = 1; zeichne(); hinweis(); return; }
      var z = q || p, l = tmp.l, dx = l.x2 - l.x1, dy = l.y2 - l.y1, L;
      if(tool === "lot"){ var t0 = dx; dx = -dy; dy = t0; L = Math.max(60, abstandUnendlich(z, l) + 30); } else L = Math.max(60, Math.hypot(l.x2 - l.x1, l.y2 - l.y1) * 0.75);
      merke(); hilfslinie(z, dx, dy, L); reset(); fertig(); return;
    }
    if(tool === "mitte" || tool === "msenk"){
      var A, B;
      if(q){ tmp.m = (tmp.m || []).concat([q]); if(tmp.m.length < 2){ zeichne(); return; } A = tmp.m[0]; B = tmp.m[1]; }
      else {
        if(tmp.m && tmp.m.length){ zeichne(); return; }
        var i2 = linieBei(p); if(i2 < 0){ hinweis("hLinieWaehlen"); return; }
        var l2 = S.lines[i2]; A = { x: l2.x1, y: l2.y1 }; B = { x: l2.x2, y: l2.y2 };
      }
      tmp = {};
      if(dist(A, B) < 0.5){ zeichne(); return; }
      var M = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };
      merke();
      if(tool === "mitte"){ if(!punktDa(M)) neuerPunkt(M.x, M.y); }
      else hilfslinie(M, -(B.y - A.y), B.x - A.x, Math.max(40, dist(A, B) * 0.8));
      fertig(); return;
    }
    // whalb, kreis3: drei Punkte
    tmp.m = (tmp.m || []).concat([q || { x: p.x, y: p.y }]);
    if(tmp.m.length < 3){ zeichne(); return; }
    var P = tmp.m; tmp = {};
    if(tool === "whalb"){
      var S0 = P[1], u1 = { x: P[0].x - S0.x, y: P[0].y - S0.y }, u2 = { x: P[2].x - S0.x, y: P[2].y - S0.y }, n1 = Math.hypot(u1.x, u1.y), n2 = Math.hypot(u2.x, u2.y);
      if(n1 < 0.5 || n2 < 0.5){ zeichne(); return; }
      var bx = u1.x / n1 + u2.x / n2, by = u1.y / n1 + u2.y / n2;
      if(Math.hypot(bx, by) < 1e-6){ bx = -u1.y / n1; by = u1.x / n1; }
      var bn = Math.hypot(bx, by), Lw = Math.max(60, Math.max(n1, n2) * 1.2);
      merke(); S.lines.push({ x1: S0.x, y1: S0.y, x2: S0.x + bx / bn * Lw, y2: S0.y + by / bn * Lw, h: 1 }); fertig(); return;
    }
    var ax = P[0].x, ay = P[0].y, bx2 = P[1].x, by2 = P[1].y, cx = P[2].x, cy = P[2].y, d = 2 * (ax * (by2 - cy) + bx2 * (cy - ay) + cx * (ay - by2));
    if(Math.abs(d) < 1e-3){ zeichne(); hinweis("hKollinear"); return; }
    var a2 = ax * ax + ay * ay, b2 = bx2 * bx2 + by2 * by2, c2 = cx * cx + cy * cy;
    var ux = (a2 * (by2 - cy) + b2 * (cy - ay) + c2 * (ay - by2)) / d, uy = (a2 * (cx - bx2) + b2 * (ax - cx) + c2 * (bx2 - ax)) / d;
    merke(); S.arcs.push({ cx: ux, cy: uy, r: Math.hypot(ax - ux, ay - uy), a0: 0, a1: 2 * Math.PI });
    if(!punktDa({ x: ux, y: uy })) neuerPunkt(ux, uy);
    fertig();
  }

  // ---------- Trimmen (wie Onshape): Stück bis zu den nächsten Schnittpunkten entfernen ----------
  function winkelVon(a, p){ return Math.atan2(p.y - a.cy, p.x - a.cx); }
  function punkteAuf(typ, idx){
    var o = typ === "l" ? S.lines[idx] : S.arcs[idx], r = [];
    S.lines.forEach(function(l, i){
      if(typ === "l" && i === idx) return;
      r = r.concat(typ === "l" ? ll(o, l) : kl(o, l).filter(function(q){ return imBogen(o, winkelVon(o, q)); }));
    });
    S.arcs.forEach(function(a, i){
      if(typ === "a" && i === idx) return;
      if(typ === "l") r = r.concat(kl(a, o).filter(function(q){ return imBogen(a, winkelVon(a, q)); }));
      else if(Math.abs(a.cx - o.cx) > 1e-6 || Math.abs(a.cy - o.cy) > 1e-6) r = r.concat(kk(o, a).filter(function(q){ return imBogen(o, winkelVon(o, q)) && imBogen(a, winkelVon(a, q)); }));
    });
    S.pts.forEach(function(q){
      var d = typ === "l" ? abstandStrecke(q, o) : Math.abs(Math.hypot(q.x - o.cx, q.y - o.cy) - o.r);
      if(d < 0.3 && (typ === "l" || imBogen(o, winkelVon(o, q)))) r.push({ x: q.x, y: q.y });
    });
    return r;
  }
  function trimme(p){
    var tol = 14 / ppm(), best = null, eps = 1e-4;
    S.lines.forEach(function(l, i){ var d = abstandStrecke(p, l); if(d < tol){ tol = d; best = ["l", i]; } });
    S.arcs.forEach(function(a, i){ var d = Math.abs(Math.hypot(p.x - a.cx, p.y - a.cy) - a.r); if(d < tol && imBogen(a, winkelVon(a, p))){ tol = d; best = ["a", i]; } });
    if(!best){ hinweis("hTrimNix"); return; }
    var Q = punkteAuf(best[0], best[1]);
    merke(); letzteKopie = null;
    if(best[0] === "l"){
      var l = S.lines[best[1]], dx = l.x2 - l.x1, dy = l.y2 - l.y1, A = dx * dx + dy * dy || 1;
      var us = Q.map(function(q){ return ((q.x - l.x1) * dx + (q.y - l.y1) * dy) / A; }).filter(function(u){ return u > eps && u < 1 - eps; });
      var u0 = Math.max(0, Math.min(1, ((p.x - l.x1) * dx + (p.y - l.y1) * dy) / A)), lo = 0, hi = 1;
      us.forEach(function(u){ if(u < u0 && u > lo) lo = u; if(u > u0 && u < hi) hi = u; });
      var neu = [];
      var st = function(a, b){ var o = { x1: l.x1 + a * dx, y1: l.y1 + a * dy, x2: l.x1 + b * dx, y2: l.y1 + b * dy }; if(l.h) o.h = 1; return o; };
      if(lo > eps) neu.push(st(0, lo)); if(hi < 1 - eps) neu.push(st(hi, 1));
      Array.prototype.splice.apply(S.lines, [best[1], 1].concat(neu));
    } else {
      var a = S.arcs[best[1]], s0 = Math.min(a.a0, a.a1), e0 = Math.max(a.a0, a.a1), voll = e0 - s0 >= 2 * Math.PI - 1e-6, span = voll ? 2 * Math.PI : e0 - s0;
      var ts = Q.map(function(q){ return normWinkel(winkelVon(a, q) - s0); }).filter(function(t){ return voll || (t > eps && t < span - eps); }).sort(function(x, y){ return x - y; });
      var t1 = normWinkel(winkelVon(a, p) - s0), neuA = [];
      var bg = function(x, y){ return { cx: a.cx, cy: a.cy, r: a.r, a0: x, a1: y }; };
      if(voll){
        if(ts.length >= 2){
          var lo2 = null, hi2 = null;
          ts.forEach(function(t){ if(t < t1) lo2 = t; if(t > t1 && hi2 === null) hi2 = t; });
          if(lo2 === null) lo2 = ts[ts.length - 1] - 2 * Math.PI; if(hi2 === null) hi2 = ts[0] + 2 * Math.PI;
          if(lo2 + 2 * Math.PI - hi2 > eps) neuA.push(bg(s0 + hi2, s0 + lo2 + 2 * Math.PI));
        }
      } else {
        var lo3 = 0, hi3 = span;
        ts.forEach(function(t){ if(t < t1 && t > lo3) lo3 = t; if(t > t1 && t < hi3) hi3 = t; });
        if(lo3 > eps) neuA.push(bg(s0, s0 + lo3)); if(hi3 < span - eps) neuA.push(bg(s0 + hi3, e0));
      }
      Array.prototype.splice.apply(S.arcs, [best[1], 1].concat(neuA));
    }
    fertig();
  }

  // ---------- Auswählen (Fenster wie im CAD), verschieben, löschen; Punkte ziehen ----------
  function leereAuswahl(){ return { pts: [], lines: [], arcs: [], texte: [], dims: [] }; }
  function auswahlZahl(){ return auswahl ? auswahl.pts.length + auswahl.lines.length + auswahl.arcs.length + auswahl.texte.length + auswahl.dims.length : 0; }
  function bogenProben(a){ var s0 = Math.min(a.a0, a.a1), e0 = Math.max(a.a0, a.a1), r = []; for(var i = 0; i <= 48; i++){ var w = s0 + (e0 - s0) * i / 48; r.push({ x: a.cx + a.r * Math.cos(w), y: a.cy + a.r * Math.sin(w) }); } return r; }
  function textBox(n){ return [{ x: n.x, y: n.y - 5 }, { x: n.x + n.s.length * 2.9, y: n.y + 1 }]; }
  function inRect(q, R){ return q.x >= R.x0 && q.x <= R.x1 && q.y >= R.y0 && q.y <= R.y1; }
  function streckeTrifft(l, R){
    if(inRect({ x: l.x1, y: l.y1 }, R) || inRect({ x: l.x2, y: l.y2 }, R)) return true;
    return [[R.x0, R.y0, R.x1, R.y0], [R.x1, R.y0, R.x1, R.y1], [R.x1, R.y1, R.x0, R.y1], [R.x0, R.y1, R.x0, R.y0]].some(function(e){ return ll(l, { x1: e[0], y1: e[1], x2: e[2], y2: e[3] }).length > 0; });
  }
  function fensterWahl(a, b){
    var R = { x0: Math.min(a.x, b.x), x1: Math.max(a.x, b.x), y0: Math.min(a.y, b.y), y1: Math.max(a.y, b.y) }, kreuz = b.x < a.x, W = leereAuswahl();
    var test = function(P){ return kreuz ? P.some(function(q){ return inRect(q, R); }) : P.every(function(q){ return inRect(q, R); }); };
    S.pts.forEach(function(q){ if(inRect(q, R)) W.pts.push(q.id); });
    S.lines.forEach(function(l, i){ if(kreuz ? streckeTrifft(l, R) : test([{ x: l.x1, y: l.y1 }, { x: l.x2, y: l.y2 }])) W.lines.push(i); });
    S.arcs.forEach(function(c, i){ if(test(bogenProben(c))) W.arcs.push(i); });
    S.texte.forEach(function(n, i){ var B = textBox(n); if(kreuz ? !(B[1].x < R.x0 || B[0].x > R.x1 || B[1].y < R.y0 || B[0].y > R.y1) : test(B)) W.texte.push(i); });
    S.dims.forEach(function(d, i){ if(test(d.t === "l" ? [{ x: d.x1, y: d.y1 }, { x: d.x2, y: d.y2 }] : [{ x: d.x1, y: d.y1 }, { x: d.sx, y: d.sy }, { x: d.x2, y: d.y2 }])) W.dims.push(i); });
    return W;
  }
  function treffer(p){ // nächstes Element unter dem Finger: [Art, Index]
    var tol = 14 / ppm(), best = null, bd = tol;
    S.pts.forEach(function(q, i){ var d = dist(p, q); if(d < bd){ bd = d; best = ["pts", i]; } });
    if(best) return best;
    S.texte.forEach(function(n, i){ if(p.x > n.x - 1 && p.x < n.x + n.s.length * 2.9 + 1 && p.y > n.y - 5.5 && p.y < n.y + 1.5){ bd = 0; best = ["texte", i]; } });
    S.dims.forEach(function(d0, i){ var d = dist(p, bemMitte(d0)); if(d < bd + 2){ bd = d; best = ["dims", i]; } });
    if(best) return best;
    S.lines.forEach(function(l, i){ var d = abstandStrecke(p, l); if(d < bd){ bd = d; best = ["lines", i]; } });
    S.arcs.forEach(function(a, i){ var d = Math.abs(Math.hypot(p.x - a.cx, p.y - a.cy) - a.r); if(d < bd && imBogen(a, winkelVon(a, p))){ bd = d; best = ["arcs", i]; } });
    return best;
  }
  function auswahlAus(tr){ var W = leereAuswahl(); if(tr[0] === "pts") W.pts.push(S.pts[tr[1]].id); else W[tr[0]].push(tr[1]); return W; }
  function imAuswahl(tr){ if(!auswahl || !tr) return false; return tr[0] === "pts" ? auswahl.pts.indexOf(S.pts[tr[1]].id) >= 0 : auswahl[tr[0]].indexOf(tr[1]) >= 0; }
  function verschiebeAuswahl(orig, dx, dy){
    S = JSON.parse(orig);
    var A = auswahl, alt = [];
    A.pts.forEach(function(id){ var q = punkt(id); if(q){ alt.push({ x: q.x, y: q.y }); q.x += dx; q.y += dy; } });
    var haengt = function(x, y){ return alt.some(function(o){ return Math.abs(o.x - x) < 0.01 && Math.abs(o.y - y) < 0.01; }); };
    S.lines.forEach(function(l, i){ var g = A.lines.indexOf(i) >= 0; if(g || haengt(l.x1, l.y1)){ l.x1 += dx; l.y1 += dy; } if(g || haengt(l.x2, l.y2)){ l.x2 += dx; l.y2 += dy; } });
    S.arcs.forEach(function(a, i){ if(A.arcs.indexOf(i) >= 0 || haengt(a.cx, a.cy)){ a.cx += dx; a.cy += dy; } });
    S.texte.forEach(function(n, i){ if(A.texte.indexOf(i) >= 0){ n.x += dx; n.y += dy; } });
    S.dims.forEach(function(d, i){
      var g = A.dims.indexOf(i) >= 0;
      if(g || haengt(d.x1, d.y1)){ d.x1 += dx; d.y1 += dy; } if(g || haengt(d.x2, d.y2)){ d.x2 += dx; d.y2 += dy; }
      if(d.t === "w" && (g || haengt(d.sx, d.sy))){ d.sx += dx; d.sy += dy; }
    });
    schnitteAlt = true;
  }
  function auswahlLoeschen(){
    if(!auswahlZahl()) return;
    var A = auswahl; merke();
    S.pts = S.pts.filter(function(q){ return A.pts.indexOf(q.id) < 0; });
    ["lines", "arcs", "texte", "dims"].forEach(function(k){ S[k] = S[k].filter(function(x, i){ return A[k].indexOf(i) < 0; }); });
    auswahl = null; letzteKopie = null; fertig();
  }
  function allesWaehlen(){
    auswahl = leereAuswahl();
    S.pts.forEach(function(q){ auswahl.pts.push(q.id); });
    ["lines", "arcs", "texte", "dims"].forEach(function(k){ S[k].forEach(function(x, i){ auswahl[k].push(i); }); });
    if(!auswahlZahl()) auswahl = null;
    zeichne(); hinweis();
  }

  // ---------- Bild speichern (PNG) ----------
  function bildSpeichern(){
    var gdAn = GD.on, tAlt = tmp, aAlt = auswahl; GD.on = false; tmp = {}; auswahl = null; zeichne();
    var w = svg.clientWidth, h = svg.clientHeight, klon = svg.cloneNode(true), css = "";
    GD.on = gdAn; tmp = tAlt; auswahl = aAlt; zeichne();
    Array.prototype.forEach.call(document.styleSheets, function(sh){ try{ Array.prototype.forEach.call(sh.cssRules, function(r){ css += r.cssText + "\n"; }); }catch(e){} });
    klon.insertBefore(el("rect", { x: view.x, y: view.y, width: view.w, height: view.h, fill: "#ffffff" }), klon.firstChild);
    klon.insertBefore(el("style", {}, css), klon.firstChild);
    klon.setAttribute("xmlns", NS); klon.setAttribute("width", w); klon.setAttribute("height", h);
    var img = new Image();
    img.onload = function(){
      var c = document.createElement("canvas"), f = 2; c.width = w * f; c.height = h * f;
      var g = c.getContext("2d"); g.fillStyle = "#ffffff"; g.fillRect(0, 0, c.width, c.height); g.drawImage(img, 0, 0, c.width, c.height);
      c.toBlob(function(b){
        if(!b) return;
        var a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = "konstruktion.png";
        document.body.appendChild(a); a.click(); a.remove(); setTimeout(function(){ URL.revokeObjectURL(a.href); }, 3000);
      }, "image/png");
    };
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(klon));
  }

  // ---------- Dreiecke finden ----------
  function verbunden(p, q){
    return S.lines.some(function(l){ return !l.h && abstandStrecke(p, l) < 0.6 && abstandStrecke(q, l) < 0.6; });
  }
  function dreiecke(){
    var P = S.pts, n = P.length, r = [];
    if(n > 40) return r;
    for(var i = 0; i < n; i++) for(var j = i + 1; j < n; j++){
      if(!verbunden(P[i], P[j])) continue;
      for(var k = j + 1; k < n; k++){
        var A = P[i], B = P[j], C = P[k];
        if(!verbunden(A, C) || !verbunden(B, C)) continue;
        var fl = Math.abs((B.x - A.x) * (C.y - A.y) - (B.y - A.y) * (C.x - A.x)) / 2;
        if(fl > 4) r.push(masse(A, B, C));
      }
    }
    return r;
  }
  function winkelBei(P, Q, R){ // Winkel bei Q
    var a = Math.atan2(P.y - Q.y, P.x - Q.x), b = Math.atan2(R.y - Q.y, R.x - Q.x), d = Math.abs(a - b);
    return d > Math.PI ? 2 * Math.PI - d : d;
  }
  function masse(A, B, C){
    return { P: [A, B, C], a: dist(B, C), b: dist(A, C), c: dist(A, B), al: winkelBei(B, A, C), be: winkelBei(A, B, C), ga: winkelBei(A, C, B) };
  }

  // ---------- Ansicht ----------
  function setzeView(){
    var w = svg.clientWidth || 600, h = svg.clientHeight || 400;
    view.h = view.w * h / w;
    svg.setAttribute("viewBox", view.x + " " + view.y + " " + view.w + " " + view.h);
  }
  function welt(ev){
    var r = svg.getBoundingClientRect();
    return { x: view.x + (ev.clientX - r.left) / r.width * view.w, y: view.y + (ev.clientY - r.top) / r.height * view.h };
  }
  function zoom(f, cx, cy){
    var nw = Math.max(30, Math.min(600, view.w / f)); f = view.w / nw;
    if(cx == null){ cx = view.x + view.w / 2; cy = view.y + view.h / 2; }
    view.x = cx - (cx - view.x) / f; view.y = cy - (cy - view.y) / f; view.w = nw; setzeView(); zeichne();
  }
  function einpassen(){
    var xs = [], ys = [];
    S.pts.forEach(function(p){ xs.push(p.x); ys.push(p.y); });
    S.lines.forEach(function(l){ if(!l.h){ xs.push(l.x1, l.x2); ys.push(l.y1, l.y2); } });
    S.texte.forEach(function(n){ xs.push(n.x, n.x + n.s.length * 2.9); ys.push(n.y - 5, n.y); });
    S.arcs.forEach(function(a){ xs.push(a.cx - a.r, a.cx + a.r); ys.push(a.cy - a.r, a.cy + a.r); });
    if(!xs.length){ view = { x: -15, y: -15, w: 180, h: 120 }; setzeView(); zeichne(); return; }
    var x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs), y0 = Math.min.apply(null, ys), y1 = Math.max.apply(null, ys);
    var asp = (svg.clientHeight || 400) / (svg.clientWidth || 600), w = Math.max(60, x1 - x0 + 30, (y1 - y0 + 30) / asp);
    view.w = w; view.h = w * asp; view.x = (x0 + x1) / 2 - w / 2; view.y = (y0 + y1) / 2 - view.h / 2; setzeView(); zeichne();
  }

  // ---------- Zeichnen ----------
  function bogenPfad(a){
    var s = Math.min(a.a0, a.a1), e = Math.max(a.a0, a.a1);
    if(e - s >= 2 * Math.PI - 1e-6) return null;
    var x0 = a.cx + a.r * Math.cos(s), y0 = a.cy + a.r * Math.sin(s), x1 = a.cx + a.r * Math.cos(e), y1 = a.cy + a.r * Math.sin(e);
    return "M" + x0 + " " + y0 + "A" + a.r + " " + a.r + " 0 " + (e - s > Math.PI ? 1 : 0) + " 1 " + x1 + " " + y1;
  }
  function bogenEl(a, cls){
    var d = bogenPfad(a);
    return d ? el("path", { d: d, "class": cls, "vector-effect": "non-scaling-stroke" }) : el("circle", { cx: a.cx, cy: a.cy, r: a.r, "class": cls, "vector-effect": "non-scaling-stroke" });
  }
  function text(x, y, s, cls, px){ var k = 1 / ppm(); return el("text", { x: x, y: y, "class": cls, "font-size": (px || 14) * k, "stroke-width": 4 * k }, s); }
  function zeichne(){
    setzeView();
    var k = 1 / ppm();
    while(svg.lastChild) svg.removeChild(svg.lastChild);
    // Karopapier (5 mm)
    var defs = el("defs", {}), pat = el("pattern", { id: "karo", width: 5, height: 5, patternUnits: "userSpaceOnUse" });
    pat.appendChild(el("path", { d: "M5 0L0 0L0 5", fill: "none", stroke: "#7fa8d6", "stroke-width": 0.9, "vector-effect": "non-scaling-stroke" }));
    defs.appendChild(pat); svg.appendChild(defs);
    svg.appendChild(el("rect", { x: view.x, y: view.y, width: view.w, height: view.h, fill: "url(#karo)" }));
    S.arcs.forEach(function(a){ svg.appendChild(bogenEl(a, "bogen")); });
    S.lines.forEach(function(l){ svg.appendChild(el("line", { x1: l.x1, y1: l.y1, x2: l.x2, y2: l.y2, "class": l.h ? "strecke hilf" : "strecke", "vector-effect": "non-scaling-stroke" })); });
    S.dims.forEach(zeichneBem);
    S.texte.forEach(function(n){ svg.appendChild(el("text", { x: n.x, y: n.y, "class": "notiz", "font-size": 5, "stroke-width": 1 }, n.s)); });
    // Dreiecke + Maße
    var D = dreiecke();
    if(D.length && (zeigeMasse || modus === "aufg")){
      var d0 = D[D.length - 1];
      svg.appendChild(el("polygon", { points: d0.P.map(function(p){ return p.x + "," + p.y; }).join(" "), "class": "dreieck" }));
      // rechter Winkel: Quadrat mit Punkt
      [0, 1, 2].forEach(function(i){
        var p = d0.P[i], q1 = d0.P[(i + 1) % 3], q2 = d0.P[(i + 2) % 3];
        if(Math.abs(winkelBei(q1, p, q2) - Math.PI / 2) > 0.004) return;
        var s = 11 * k, u1 = { x: (q1.x - p.x) / dist(p, q1), y: (q1.y - p.y) / dist(p, q1) }, u2 = { x: (q2.x - p.x) / dist(p, q2), y: (q2.y - p.y) / dist(p, q2) };
        svg.appendChild(el("path", { d: "M" + (p.x + u1.x * s) + " " + (p.y + u1.y * s) + "L" + (p.x + (u1.x + u2.x) * s) + " " + (p.y + (u1.y + u2.y) * s) + "L" + (p.x + u2.x * s) + " " + (p.y + u2.y * s), "class": "rw", "vector-effect": "non-scaling-stroke" }));
        svg.appendChild(el("circle", { cx: p.x + (u1.x + u2.x) * s / 2, cy: p.y + (u1.y + u2.y) * s / 2, r: 1.6 * k, "class": "rwpunkt" }));
      });
      if(zeigeMasse){
        var mx = (d0.P[0].x + d0.P[1].x + d0.P[2].x) / 3, my = (d0.P[0].y + d0.P[1].y + d0.P[2].y) / 3;
        [[1, 2, "a"], [0, 2, "b"], [0, 1, "c"]].forEach(function(s){
          var p = d0.P[s[0]], q = d0.P[s[1]], cx = (p.x + q.x) / 2, cy = (p.y + q.y) / 2, ox = cx - mx, oy = cy - my, o = Math.hypot(ox, oy) || 1;
          svg.appendChild(text(cx + ox / o * 16 * k, cy + oy / o * 16 * k + 5 * k, s[2] + " = " + cm(d0[s[2]]) + " cm", "mass", 13));
        });
        [["al", 0, "α"], ["be", 1, "β"], ["ga", 2, "γ"]].forEach(function(w){
          var p = d0.P[w[1]], ox = mx - p.x, oy = my - p.y, o = Math.hypot(ox, oy) || 1;
          svg.appendChild(text(p.x + ox / o * 38 * k, p.y + oy / o * 38 * k + 5 * k, w[2] + " = " + grad(d0[w[0]]) + "°", "mass winkel", 13));
        });
      }
    }
    // Kongruenz zweier Dreiecke
    var kon = "";
    for(var i = 0; i < D.length && !kon; i++) for(var j = i + 1; j < D.length && !kon; j++){
      var s1 = [D[i].a, D[i].b, D[i].c].sort(function(x, y){ return x - y; }), s2 = [D[j].a, D[j].b, D[j].c].sort(function(x, y){ return x - y; });
      if(Math.abs(s1[0] - s2[0]) < 0.6 && Math.abs(s1[1] - s2[1]) < 0.6 && Math.abs(s1[2] - s2[2]) < 0.6)
        kon = t("kongruent", { a: D[i].P.map(function(q){ return q.n; }).join(""), b: D[j].P.map(function(q){ return q.n; }).join("") });
    }
    var inf = [];
    if(D.length && zeigeMasse){
      var dU = D[D.length - 1], sU = (dU.a + dU.b + dU.c) / 2, fl = Math.sqrt(Math.max(0, sU * (sU - dU.a) * (sU - dU.b) * (sU - dU.c)));
      inf.push(t("umfang", { n: dU.P.map(function(q){ return q.n; }).join(""), u: cm(dU.a + dU.b + dU.c), a: zahl(fl / 100, 2) }));
    }
    if(kon) inf.push(kon);
    document.getElementById("info").textContent = inf.join("\n");
    // Auswahl hervorheben
    if(auswahl){
      auswahl.lines.forEach(function(i){ var l = S.lines[i]; if(l) svg.appendChild(el("line", { x1: l.x1, y1: l.y1, x2: l.x2, y2: l.y2, "class": "sel", "vector-effect": "non-scaling-stroke" })); });
      auswahl.arcs.forEach(function(i){ if(S.arcs[i]) svg.appendChild(bogenEl(S.arcs[i], "sel")); });
      auswahl.texte.forEach(function(i){ var n = S.texte[i]; if(!n) return; var B = textBox(n); svg.appendChild(el("rect", { x: B[0].x - 1, y: B[0].y - 1, width: B[1].x - B[0].x + 2, height: B[1].y - B[0].y + 2, "class": "selbox", "vector-effect": "non-scaling-stroke" })); });
      auswahl.dims.forEach(function(i){ if(S.dims[i]){ var m = bemMitte(S.dims[i]); svg.appendChild(el("circle", { cx: m.x, cy: m.y, r: 9 * k, "class": "selp", "vector-effect": "non-scaling-stroke" })); } });
      auswahl.pts.forEach(function(id){ var q = punkt(id); if(q) svg.appendChild(el("circle", { cx: q.x, cy: q.y, r: 10 * k, "class": "selp", "vector-effect": "non-scaling-stroke" })); });
    }
    // Punkte
    var dz = D.length ? D[D.length - 1] : null;
    S.pts.forEach(function(p){
      var g = el("g", { "class": "punkt" }), s = 5 * k;
      g.appendChild(el("path", { d: "M" + (p.x - s) + " " + (p.y - s) + "L" + (p.x + s) + " " + (p.y + s) + "M" + (p.x - s) + " " + (p.y + s) + "L" + (p.x + s) + " " + (p.y - s), "vector-effect": "non-scaling-stroke" }));
      var nx = p.x + 7 * k, ny = p.y - 7 * k;
      if(dz){ // Ecke eines Dreiecks: Name nach außen, damit er nicht auf den Winkel fällt
        var mx2 = (dz.P[0].x + dz.P[1].x + dz.P[2].x) / 3, my2 = (dz.P[0].y + dz.P[1].y + dz.P[2].y) / 3;
        if(dz.P.some(function(q){ return dist(q, p) < 0.6; })){ var ox2 = p.x - mx2, oy2 = p.y - my2, o2 = Math.hypot(ox2, oy2) || 1; nx = p.x + ox2 / o2 * 16 * k - 5 * k; ny = p.y + oy2 / o2 * 16 * k + 6 * k; }
      }
      g.appendChild(text(nx, ny, p.n, "pname", 17));
      svg.appendChild(g);
    });
    zeichneGeo();
    vorschau();
    document.getElementById("rueck").disabled = !hist.length; document.getElementById("vor").disabled = !zukunft.length;
  }
  function zeichneBem(d){
    var k = 1 / ppm(), p, pf = 7 * k;
    if(d.t === "l"){
      var dx = d.x2 - d.x1, dy = d.y2 - d.y1, L = Math.hypot(dx, dy) || 1, nx = dy / L, ny = -dx / L, ux = dx / L, uy = dy / L, o = 18 * k;
      if(ny > 1e-9 || (Math.abs(ny) <= 1e-9 && nx > 0)){ nx = -nx; ny = -ny; }
      var ax = d.x1 + nx * o, ay = d.y1 + ny * o, bx = d.x2 + nx * o, by = d.y2 + ny * o;
      p = "M" + (d.x1 + nx * 3 * k) + " " + (d.y1 + ny * 3 * k) + "L" + (ax + nx * 5 * k) + " " + (ay + ny * 5 * k) + "M" + (d.x2 + nx * 3 * k) + " " + (d.y2 + ny * 3 * k) + "L" + (bx + nx * 5 * k) + " " + (by + ny * 5 * k) + "M" + ax + " " + ay + "L" + bx + " " + by;
      p += "M" + (ax + ux * pf + nx * pf * 0.4) + " " + (ay + uy * pf + ny * pf * 0.4) + "L" + ax + " " + ay + "L" + (ax + ux * pf - nx * pf * 0.4) + " " + (ay + uy * pf - ny * pf * 0.4);
      p += "M" + (bx - ux * pf + nx * pf * 0.4) + " " + (by - uy * pf + ny * pf * 0.4) + "L" + bx + " " + by + "L" + (bx - ux * pf - nx * pf * 0.4) + " " + (by - uy * pf - ny * pf * 0.4);
      svg.appendChild(el("path", { d: p, "class": "bem", "vector-effect": "non-scaling-stroke" }));
      svg.appendChild(text((ax + bx) / 2 + nx * 9 * k, (ay + by) / 2 + ny * 9 * k + 5 * k, cm(L) + " cm", "bemtext", 13));
    } else {
      var a1 = Math.atan2(d.y1 - d.sy, d.x1 - d.sx), a2 = Math.atan2(d.y2 - d.sy, d.x2 - d.sx), w = a2 - a1, R = 26 * k;
      while(w > Math.PI) w -= 2 * Math.PI; while(w <= -Math.PI) w += 2 * Math.PI;
      p = "M" + (d.sx + R * Math.cos(a1)) + " " + (d.sy + R * Math.sin(a1)) + "A" + R + " " + R + " 0 0 " + (w > 0 ? 1 : 0) + " " + (d.sx + R * Math.cos(a2)) + " " + (d.sy + R * Math.sin(a2));
      svg.appendChild(el("path", { d: p, "class": "bem", "vector-effect": "non-scaling-stroke" }));
      var m = a1 + w / 2;
      svg.appendChild(text(d.sx + (R + 16 * k) * Math.cos(m), d.sy + (R + 16 * k) * Math.sin(m) + 5 * k, grad(Math.abs(w)) + "°", "bemtext", 13));
    }
  }
  function bemMitte(d){
    if(d.t === "l") return { x: (d.x1 + d.x2) / 2, y: (d.y1 + d.y2) / 2 };
    var a1 = Math.atan2(d.y1 - d.sy, d.x1 - d.sx), a2 = Math.atan2(d.y2 - d.sy, d.x2 - d.sx), w = a2 - a1;
    while(w > Math.PI) w -= 2 * Math.PI; while(w <= -Math.PI) w += 2 * Math.PI;
    var R = 30 / ppm(); return { x: d.sx + R * Math.cos(a1 + w / 2), y: d.sy + R * Math.sin(a1 + w / 2) };
  }
  // Werkzeug-Vorschau (Zirkel, Lineal-Linie, Geodreieck, neue Werkzeuge)
  function vorschau(){
    var k = 1 / ppm();
    if(tmp.info){
      [tmp.info.ref, tmp.info.gleich].forEach(function(l){ if(l) svg.appendChild(el("line", { x1: l.x1, y1: l.y1, x2: l.x2, y2: l.y2, "class": "ref", "vector-effect": "non-scaling-stroke" })); });
      if(tmp.info.refA) svg.appendChild(bogenEl(tmp.info.refA, "ref"));
      var ip = tmp.infoPos || tmp.b || tmp.cur || tmp.stift;
      if(ip && tmp.info.sym) svg.appendChild(text(ip.x + 14 * k, ip.y + 26 * k, tmp.info.sym, "sym", 18));
    }
    if(tool === "kreis" && tmp.c){
      var rk = feldWert() ? feldWert() * 10 : (tmp.rFix || (tmp.stift ? dist(tmp.c, tmp.stift) : 0));
      if(rk > 0){
        var wk = tmp.stift ? Math.atan2(tmp.stift.y - tmp.c.y, tmp.stift.x - tmp.c.x) : -Math.PI / 4;
        svg.appendChild(el("circle", { cx: tmp.c.x, cy: tmp.c.y, r: rk, "class": "bogen vor", "vector-effect": "non-scaling-stroke" }));
        svg.appendChild(el("line", { x1: tmp.c.x, y1: tmp.c.y, x2: tmp.c.x + rk * Math.cos(wk), y2: tmp.c.y + rk * Math.sin(wk), "class": "strecke vor", "vector-effect": "non-scaling-stroke" }));
        svg.appendChild(text(tmp.c.x + rk / 2 * Math.cos(wk) + 8 * k, tmp.c.y + rk / 2 * Math.sin(wk) - 8 * k, "r = " + cm(rk) + " cm", "live", 15));
      }
      svg.appendChild(el("circle", { cx: tmp.c.x, cy: tmp.c.y, r: 3 * k, "class": "einstich" }));
      if(tmp.konz) svg.appendChild(text(tmp.c.x - 22 * k, tmp.c.y - 10 * k, "◎", "sym", 18));
    }
    if(tool === "rechteck" && tmp.a && tmp.b){
      var a = tmp.a, b = tmp.b;
      svg.appendChild(el("polygon", { points: [a.x, a.y, b.x, a.y, b.x, b.y, a.x, b.y].join(" "), "class": "strecke vor flaeche", "vector-effect": "non-scaling-stroke" }));
      svg.appendChild(text(Math.min(a.x, b.x), Math.min(a.y, b.y) - 8 * k, cm(Math.abs(b.x - a.x)) + " × " + cm(Math.abs(b.y - a.y)) + " cm", "live", 15));
    }
    if(tool === "vieleck" && tmp.poly && tmp.poly.length && tmp.cur){
      var lp = tmp.poly[tmp.poly.length - 1];
      svg.appendChild(el("line", { x1: lp.x, y1: lp.y, x2: tmp.cur.x, y2: tmp.cur.y, "class": "strecke vor", "vector-effect": "non-scaling-stroke" }));
      svg.appendChild(text((lp.x + tmp.cur.x) / 2, (lp.y + tmp.cur.y) / 2 - 10 * k, cm(dist(lp, tmp.cur)) + " cm", "live", 15));
      if(tmp.poly.length >= 3) svg.appendChild(el("circle", { cx: tmp.poly[0].x, cy: tmp.poly[0].y, r: 10 * k, "class": "fang", "vector-effect": "non-scaling-stroke" }));
    }
    if(tool === "kopieren" && tmp.kop){
      svg.appendChild(el("polygon", { points: tmp.kop.P.map(function(q){ return (q.x + tmp.kop.dx) + "," + (q.y + tmp.kop.dy); }).join(" "), "class": "kopie", "vector-effect": "non-scaling-stroke" }));
    }
    if(tmp.rahmen){
      var ra = tmp.rahmen.a, rb = tmp.rahmen.b;
      svg.appendChild(el("rect", { x: Math.min(ra.x, rb.x), y: Math.min(ra.y, rb.y), width: Math.abs(rb.x - ra.x), height: Math.abs(rb.y - ra.y), "class": rb.x < ra.x ? "rahmen kreuz" : "rahmen", "vector-effect": "non-scaling-stroke" }));
    }
    if((tool === "lot" || tool === "parallele") && tmp.l){
      var tl0 = tmp.l;
      svg.appendChild(el("line", { x1: tl0.x1, y1: tl0.y1, x2: tl0.x2, y2: tl0.y2, "class": "ref", "vector-effect": "non-scaling-stroke" }));
      if(tmp.cur){
        var ddx = tl0.x2 - tl0.x1, ddy = tl0.y2 - tl0.y1, dn = Math.hypot(ddx, ddy) || 1; if(tool === "lot"){ var sw = ddx; ddx = -ddy; ddy = sw; }
        svg.appendChild(el("line", { x1: tmp.cur.x - ddx / dn * 80, y1: tmp.cur.y - ddy / dn * 80, x2: tmp.cur.x + ddx / dn * 80, y2: tmp.cur.y + ddy / dn * 80, "class": "strecke hilf vor", "vector-effect": "non-scaling-stroke" }));
      }
    }
    if(tmp.m && tmp.m.length) tmp.m.forEach(function(q){ svg.appendChild(el("circle", { cx: q.x, cy: q.y, r: 8 * k, "class": "fang", "vector-effect": "non-scaling-stroke" })); });
    if(tmp.fang) svg.appendChild(el("circle", { cx: tmp.fang.x, cy: tmp.fang.y, r: 9 * k, "class": "fang", "vector-effect": "non-scaling-stroke" }));
    if(tool === "lineal" && tmp.a && tmp.b){
      svg.appendChild(el("line", { x1: tmp.a.x, y1: tmp.a.y, x2: tmp.b.x, y2: tmp.b.y, "class": "strecke vor", "vector-effect": "non-scaling-stroke" }));
      svg.appendChild(text((tmp.a.x + tmp.b.x) / 2, (tmp.a.y + tmp.b.y) / 2 - 10 * k, cm(dist(tmp.a, tmp.b)) + " cm", "live", 16));
    }
    if(tool === "zirkel" && tmp.c){
      var c = tmp.c, r = tmp.r || tmp.rFix || (tmp.stift ? dist(c, tmp.stift) : 0);
      if(r > 0){
        svg.appendChild(el("circle", { cx: c.x, cy: c.y, r: r, "class": "hilfskreis", "vector-effect": "non-scaling-stroke" }));
        if(tmp.bogen) svg.appendChild(bogenEl({ cx: c.x, cy: c.y, r: r, a0: tmp.bogen.a0, a1: tmp.bogen.a1 }, "bogen vor"));
        // Zirkel: zwei Schenkel mit Gelenk
        var w = tmp.bogen ? tmp.bogen.a1 : (tmp.stift ? Math.atan2(tmp.stift.y - c.y, tmp.stift.x - c.x) : -Math.PI / 4);
        var sx = c.x + r * Math.cos(w), sy = c.y + r * Math.sin(w), hx = (c.x + sx) / 2 + Math.sin(w) * r * 0.55, hy = (c.y + sy) / 2 - Math.cos(w) * r * 0.55;
        if(hy > (c.y + sy) / 2){ hx = (c.x + sx) / 2 - Math.sin(w) * r * 0.55; hy = (c.y + sy) / 2 + Math.cos(w) * r * 0.55; }
        svg.appendChild(el("path", { d: "M" + c.x + " " + c.y + "L" + hx + " " + hy + "L" + sx + " " + sy, "class": "zirkel", "vector-effect": "non-scaling-stroke" }));
        svg.appendChild(el("circle", { cx: hx, cy: hy, r: 4 * k, "class": "gelenk" }));
        svg.appendChild(el("circle", { cx: sx, cy: sy, r: 3 * k, "class": "mine" }));
        svg.appendChild(text(hx + 8 * k, hy - 6 * k, "r = " + cm(r) + " cm", "live", 15));
      }
      svg.appendChild(el("circle", { cx: c.x, cy: c.y, r: 3 * k, "class": "einstich" }));
    }
    if(tool === "geo" && tmp.s){
      var s = tmp.s;
      if(tmp.basis){
        var b0 = Math.atan2(tmp.basis.y - s.y, tmp.basis.x - s.x), R = 25 * k;
        svg.appendChild(el("path", { d: "M" + (s.x + 60 * k * Math.cos(b0)) + " " + (s.y + 60 * k * Math.sin(b0)) + "L" + s.x + " " + s.y, "class": "basis", "vector-effect": "non-scaling-stroke" }));
        if(tmp.w != null){
          var e = b0 + tmp.w, L = Math.max(view.w, view.h);
          svg.appendChild(el("line", { x1: s.x, y1: s.y, x2: s.x + L * Math.cos(e), y2: s.y + L * Math.sin(e), "class": "strecke vor", "vector-effect": "non-scaling-stroke" }));
          var lg = Math.abs(tmp.w) > Math.PI ? 1 : 0, sw = tmp.w > 0 ? 1 : 0;
          svg.appendChild(el("path", { d: "M" + (s.x + R * Math.cos(b0)) + " " + (s.y + R * Math.sin(b0)) + "A" + R + " " + R + " 0 " + lg + " " + sw + " " + (s.x + R * Math.cos(e)) + " " + (s.y + R * Math.sin(e)), "class": "winkelbogen", "vector-effect": "non-scaling-stroke" }));
          svg.appendChild(text(s.x + (R + 18 * k) * Math.cos(b0 + tmp.w / 2), s.y + (R + 18 * k) * Math.sin(b0 + tmp.w / 2), grad(Math.abs(tmp.w)) + "°", "live", 16));
        }
        // Geodreieck-Andeutung: Halbkreis um den Scheitel
        svg.appendChild(el("circle", { cx: s.x, cy: s.y, r: 70 * k, "class": "geo", "vector-effect": "non-scaling-stroke" }));
      }
    }
    if(tool === "messen" && tmp.m && tmp.m.length) tmp.m.forEach(function(p){ svg.appendChild(el("circle", { cx: p.x, cy: p.y, r: 8 * k, "class": "fang", "vector-effect": "non-scaling-stroke" })); });
  }

  // ---------- Eingabe ----------
  function feldWert(){ var v = parseFloat(String(document.getElementById("feld").value).replace(",", ".")); return isFinite(v) && v > 0 ? v : null; }
  var zeiger = {}, pinch = null, drag = false;
  svg.addEventListener("pointerdown", function(ev){
    svg.setPointerCapture(ev.pointerId);
    zeiger[ev.pointerId] = { x: ev.clientX, y: ev.clientY };
    var ids = Object.keys(zeiger);
    if(ids.length === 2){ // Zwei Finger: zoomen/verschieben, laufende Aktion abbrechen
      abbrechen();
      var a = zeiger[ids[0]], b = zeiger[ids[1]];
      pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), m: welt({ clientX: (a.x + b.x) / 2, clientY: (a.y + b.y) / 2 }), v: Object.assign({}, view) };
      return;
    }
    if(ids.length > 2) return;
    drag = true;
    var pw = welt(ev), gg = gdGriff(pw);
    if(gg){ tmp.gd = { art: gg, ox: GD.x - pw.x, oy: GD.y - pw.y }; tmp.infoPos = null; return; }
    if(tool === "hand"){ tmp.pan = { cx: ev.clientX, cy: ev.clientY, v: Object.assign({}, view) }; return; }
    runter(welt(ev));
  });
  svg.addEventListener("pointermove", function(ev){
    if(!zeiger[ev.pointerId]) { if(ev.pointerType === "mouse") hover(welt(ev)); return; }
    zeiger[ev.pointerId] = { x: ev.clientX, y: ev.clientY };
    var ids = Object.keys(zeiger);
    if(pinch && ids.length === 2){
      var a = zeiger[ids[0]], b = zeiger[ids[1]], d = Math.hypot(a.x - b.x, a.y - b.y), r = svg.getBoundingClientRect();
      var f = d / (pinch.d || 1), nw = Math.max(30, Math.min(600, pinch.v.w / f)), mxp = (a.x + b.x) / 2 - r.left, myp = (a.y + b.y) / 2 - r.top;
      view.w = nw; view.h = nw * r.height / r.width;
      view.x = pinch.m.x - mxp / r.width * view.w; view.y = pinch.m.y - myp / r.height * view.h;
      setzeView(); zeichne(); return;
    }
    if(drag && tmp.gd){ gdZiehen(welt(ev)); return; }
    if(drag && tool === "hand" && tmp.pan){
      var rr = svg.getBoundingClientRect();
      view.x = tmp.pan.v.x - (ev.clientX - tmp.pan.cx) / rr.width * view.w;
      view.y = tmp.pan.v.y - (ev.clientY - tmp.pan.cy) / rr.height * view.h;
      setzeView(); zeichne(); return;
    }
    if(drag) bewegt(welt(ev));
  });
  function hoch(ev){
    delete zeiger[ev.pointerId];
    if(pinch){ if(!Object.keys(zeiger).length) pinch = null; return; }
    if(drag && tmp.gd){ drag = false; delete tmp.gd; tmp.info = null; tmp.infoPos = null; zeichne(); return; }
    if(drag){ drag = false; los(welt(ev)); }
  }
  svg.addEventListener("pointerup", hoch);
  svg.addEventListener("pointercancel", function(ev){ delete zeiger[ev.pointerId]; pinch = null; if(drag){ drag = false; abbrechen(); } });
  svg.addEventListener("wheel", function(ev){ ev.preventDefault(); var p = welt(ev); zoom(ev.deltaY < 0 ? 1.15 : 1 / 1.15, p.x, p.y); }, { passive: false });
  function hover(p){ if(tool === "hand" || tool === "radieren" || tool === "auswahl" || tool === "trimmen") return; var f = fang(p); var alt = tmp.fang; tmp.fang = f; if((alt && !f) || f && (!alt || alt.x !== f.x || alt.y !== f.y)) zeichne(); }

  function abbrechen(){ drag = false; delete tmp.gd; tmp.info = null; if(tool === "auswahl"){ if(tmp.zieh && tmp.zieh.moved){ var aw = auswahl; S = JSON.parse(tmp.zieh.orig); hist.pop(); auswahl = aw; schnitteAlt = true; } tmp = {}; } else if(KONSTR.indexOf(tool) >= 0 || tool === "trimmen"){ tmp = {}; step = 0; } else if(tool === "lineal" || tool === "kreis" || tool === "rechteck" || tool === "kopieren"){ tmp = {}; if(tool === "kreis") step = 0; } else if(tool === "vieleck") tmp.cur = null; else if(tool === "zirkel"){ if(tmp.bogen) tmp.bogen = null; else if(!tmp.r){ tmp = {}; step = 0; } } else if(tool === "hand") tmp = {}; zeichne(); hinweis(); }
  function reset(){ tmp = {}; step = 0; }

  function runter(p){
    var f = fang(p);
    if(tool === "lineal"){
      if(GD.on && kanteAbstand(p) < 16 / ppm()){ var kp = kantePunkt(p); tmp = { a: kp.p, af: kp.f, b: kp.p, kante: true }; zeichne(); return; }
      tmp = { a: f || p, af: f, b: f || p }; zeichne(); return;
    }
    if(tool === "kreis"){
      var kz = f ? S.arcs.filter(function(a){ return Math.abs(a.cx - f.x) < 0.01 && Math.abs(a.cy - f.y) < 0.01; })[0] : null;
      tmp = { c: f || p, cf: f, stift: null, konz: kz }; step = 1; zeichne(); hinweis(); return;
    }
    if(tool === "rechteck"){ tmp = { a: f || p, af: f, b: f || p }; zeichne(); return; }
    if(tool === "auswahl"){
      var tr = treffer(p);
      if(tr && tr[0] === "pts" && !imAuswahl(tr)) auswahl = auswahlAus(tr); // Punkt direkt ziehen (Zugmodus)
      if(auswahlZahl() && imAuswahl(tr)){ tmp = { zieh: { start: p, orig: JSON.stringify(S), p0: tr[0] === "pts" ? { x: S.pts[tr[1]].x, y: S.pts[tr[1]].y } : null, moved: false } }; zeichne(); return; }
      tmp = { rahmen: { a: p, b: p } }; return;
    }
    if((tool === "lot" || tool === "parallele") && step === 1){ tmp.cur = f ? { x: f.x, y: f.y } : p; zeichne(); return; }
    if(tool === "vieleck"){ tmp.poly = tmp.poly || []; tmp.cur = vieleckPunkt(p); zeichne(); return; }
    if(tool === "kopieren"){
      var D = dreiecke(), d = null;
      for(var i = D.length - 1; i >= 0; i--) if(inDreieck(p, D[i].P)){ d = D[i]; break; }
      if(!d){ tmp = {}; hinweis("hKopieNix"); return; }
      tmp = { kop: { P: d.P.map(function(q){ return { x: q.x, y: q.y }; }), start: p, dx: 0, dy: 0 } }; zeichne(); return;
    }
    if(tool === "zirkel"){
      if(step === 2 && tmp.c && tmp.r){ var w = Math.atan2(p.y - tmp.c.y, p.x - tmp.c.x); tmp.bogen = { a0: w, a1: w, last: w }; zeichne(); return; }
      tmp = { c: f || p, cf: f, stift: null }; step = 1; zeichne(); hinweis(); return;
    }
    if(tool === "geo"){
      if(step === 2 && tmp.s && tmp.basis){ geoWinkel(p); zeichne(); return; }
      tmp.fang = f; zeichne(); return;
    }
    tmp.fang = f; zeichne();
  }
  function bewegt(p){
    var f;
    if(tool === "lineal" && tmp.a){
      var L = feldWert(), r;
      tmp.info = null;
      if(tmp.kante){
        if(L){ var q0 = gdLokal(tmp.a).x, q1 = gdLokal(p).x, sg = q1 >= q0 ? 1 : -1; tmp.b = { x: tmp.a.x + sg * L * 10 * Math.cos(GD.w), y: tmp.a.y + sg * L * 10 * Math.sin(GD.w) }; tmp.bf = null; }
        else { var kp = kantePunkt(p); tmp.b = kp.p; tmp.bf = kp.f; }
      }
      else if(L){ r = richtungsFang(tmp.a, p, L * 10); tmp.b = r.p; tmp.bf = null; tmp.info = r.info; }
      else { f = fang(p); if(f){ tmp.b = f; tmp.bf = f; } else { r = richtungsFang(tmp.a, p); tmp.b = r.p; tmp.bf = null; tmp.info = r.info; } }
      zeichne(); return;
    }
    if(tool === "kreis" && step === 1 && tmp.c){
      tmp.info = null; tmp.rFix = null;
      if(!feldWert()){
        f = fang(p); if(f && f.x === tmp.c.x && f.y === tmp.c.y) f = null; tmp.stift = f || p;
        if(!f){ var rs = radFang(tmp.c, dist(tmp.c, p)); if(rs){ tmp.rFix = rs.r; tmp.info = { sym: "⌒", ref: rs.ref, refA: rs.refA }; } }
      } else tmp.stift = p;
      zeichne(); return;
    }
    if(tool === "rechteck" && tmp.a){
      var wh = feldZwei();
      if(wh){ tmp.b = { x: tmp.a.x + (p.x >= tmp.a.x ? 1 : -1) * wh[0] * 10, y: tmp.a.y + (p.y >= tmp.a.y ? 1 : -1) * wh[1] * 10 }; tmp.bf = null; }
      else { f = fang(p); tmp.b = f || p; tmp.bf = f; }
      zeichne(); return;
    }
    if(tool === "vieleck" && tmp.poly){ tmp.cur = vieleckPunkt(p); zeichne(); return; }
    if(tool === "auswahl"){
      if(tmp.zieh){
        var zx = p.x - tmp.zieh.start.x, zy = p.y - tmp.zieh.start.y;
        if(!tmp.zieh.moved){ if(Math.hypot(zx, zy) * ppm() < 4) return; var aw = auswahl; merke(); auswahl = aw; tmp.zieh.moved = true; }
        if(tmp.zieh.p0 && raster){ zx = Math.round((tmp.zieh.p0.x + zx) / 5) * 5 - tmp.zieh.p0.x; zy = Math.round((tmp.zieh.p0.y + zy) / 5) * 5 - tmp.zieh.p0.y; }
        verschiebeAuswahl(tmp.zieh.orig, zx, zy); zeichne(); return;
      }
      if(tmp.rahmen){ tmp.rahmen.b = p; zeichne(); return; }
      return;
    }
    if((tool === "lot" || tool === "parallele") && step === 1){ f = fang(p); tmp.cur = f ? { x: f.x, y: f.y } : p; zeichne(); return; }
    if(tool === "kopieren" && tmp.kop){
      var dx = p.x - tmp.kop.start.x, dy = p.y - tmp.kop.start.y, tol = 18 / ppm(), best = null;
      tmp.kop.P.forEach(function(v){ S.pts.forEach(function(q){ var dd = Math.hypot(v.x + dx - q.x, v.y + dy - q.y); if(dd < tol){ tol = dd; best = { dx: q.x - v.x, dy: q.y - v.y }; } }); });
      if(best){ dx = best.dx; dy = best.dy; }
      tmp.kop.dx = dx; tmp.kop.dy = dy; zeichne(); return;
    }
    if(tool === "zirkel"){
      if(tmp.bogen){
        var w2 = Math.atan2(p.y - tmp.c.y, p.x - tmp.c.x), d = w2 - tmp.bogen.last;
        if(d > Math.PI) d -= 2 * Math.PI; if(d < -Math.PI) d += 2 * Math.PI;
        tmp.bogen.a1 += d; tmp.bogen.last = w2;
        if(tmp.bogen.a1 - tmp.bogen.a0 > 2 * Math.PI) tmp.bogen.a1 = tmp.bogen.a0 + 2 * Math.PI;
        if(tmp.bogen.a0 - tmp.bogen.a1 > 2 * Math.PI) tmp.bogen.a1 = tmp.bogen.a0 - 2 * Math.PI;
        zeichne(); return;
      }
      if(step === 1 && tmp.c && !feldWert()){
        f = fang(p); if(f && f.x === tmp.c.x && f.y === tmp.c.y) f = null; tmp.stift = f || p; tmp.rFix = null; tmp.info = null;
        if(!f){ var rz = radFang(tmp.c, dist(tmp.c, p)); if(rz){ tmp.rFix = rz.r; tmp.info = { sym: "⌒", ref: rz.ref, refA: rz.refA }; } }
        zeichne(); return;
      }
    }
    if(tool === "geo" && step === 2){ geoWinkel(p); zeichne(); return; }
    if(tool !== "hand"){ tmp.fang = fang(p); zeichne(); }
  }
  function geoWinkel(p){
    var b0 = Math.atan2(tmp.basis.y - tmp.s.y, tmp.basis.x - tmp.s.x), wf = Math.atan2(p.y - tmp.s.y, p.x - tmp.s.x), d = wf - b0;
    while(d > Math.PI) d -= 2 * Math.PI; while(d <= -Math.PI) d += 2 * Math.PI;
    var A = feldWert();
    tmp.w = A ? (d < 0 ? -1 : 1) * Math.min(A, 180) * Math.PI / 180 : Math.round(d * 180 / Math.PI) * Math.PI / 180;
  }
  function los(p){
    var f = fang(p);
    if(tool === "hand"){ tmp = {}; return; }
    if(tool === "punkt"){
      tmp.fang = null;
      if(f && f.pid) { zeichne(); return; }
      merke(); neuerPunkt(f ? f.x : p.x, f ? f.y : p.y); fertig(); return;
    }
    if(tool === "lineal" && tmp.a){
      var b = tmp.b, bf = tmp.bf;
      if(!b || dist(tmp.a, b) < 1){ tmp = {}; zeichne(); return; }
      merke();
      var A = sicherePunkt(tmp.af, tmp.a.x, tmp.a.y), B = sicherePunkt(bf, b.x, b.y);
      S.lines.push({ x1: A.x, y1: A.y, x2: B.x, y2: B.y });
      tmp = {}; fertig(); return;
    }
    if(tool === "zirkel"){
      if(tmp.bogen){
        var bg = tmp.bogen; tmp.bogen = null;
        if(Math.abs(bg.a1 - bg.a0) > 0.03){ merke(); S.arcs.push({ cx: tmp.c.x, cy: tmp.c.y, r: tmp.r, a0: bg.a0, a1: bg.a1 }); fertig(); return; }
        zeichne(); return;
      }
      if(step === 1 && tmp.c){
        var R = feldWert() ? feldWert() * 10 : (tmp.rFix || (tmp.stift ? dist(tmp.c, tmp.stift) : 0)); tmp.info = null;
        if(R < 1){ hinweis("hZ0"); zeichne(); return; }
        // Einstich als Punkt festhalten (sonst kann man später nicht messen/verbinden)
        if(!(tmp.cf && tmp.cf.pid)){ merke(); var c = sicherePunkt(tmp.cf, tmp.c.x, tmp.c.y); tmp.c = { x: c.x, y: c.y }; schnitteAlt = true; }
        tmp.r = R; tmp.rFix = null; step = 2; zeichne(); hinweis(); return;
      }
    }
    if(tool === "geo"){
      if(step === 0){ if(!f){ hinweis("hGeoPunkt"); return; } merke(); var s = sicherePunkt(f, p.x, p.y); tmp = { s: { x: s.x, y: s.y } }; step = 1; zeichne(); hinweis(); return; }
      if(step === 1){ if(!f || (f.x === tmp.s.x && f.y === tmp.s.y)){ hinweis("hGeoPunkt"); return; } tmp.basis = { x: f.x, y: f.y }; tmp.w = null; step = 2; zeichne(); hinweis(); return; }
      if(step === 2 && tmp.w != null && Math.abs(tmp.w) > 0.002){
        geoWinkel(p);
        var b0 = Math.atan2(tmp.basis.y - tmp.s.y, tmp.basis.x - tmp.s.x), e = b0 + tmp.w, L = 150;
        merke(); S.lines.push({ x1: tmp.s.x, y1: tmp.s.y, x2: tmp.s.x + L * Math.cos(e), y2: tmp.s.y + L * Math.sin(e), strahl: true });
        tmp = {}; step = 0; fertig(); return;
      }
    }
    if(tool === "messen"){
      if(!f){ return; }
      tmp.m = (tmp.m || []).concat([{ x: f.x, y: f.y, n: f.pid ? punkt(f.pid).n : "•" }]);
      if(tmp.m.length === 2) meldeMessung(t("messL", { p: tmp.m[0].n + tmp.m[1].n, v: cm(dist(tmp.m[0], tmp.m[1])) }));
      if(tmp.m.length === 3){ meldeMessung(t("messW", { p: tmp.m[0].n + tmp.m[1].n + tmp.m[2].n, v: zahl(winkelBei(tmp.m[0], tmp.m[1], tmp.m[2]) * 180 / Math.PI, 1) })); tmp.m = []; }
      zeichne(); return;
    }
    if(tool === "radieren"){ radiere(p); return; }
    if(tool === "trimmen"){ trimme(p); return; }
    if(KONSTR.indexOf(tool) >= 0){ tmp.fang = null; tmp.cur = null; konstruiere(p); return; }
    if(tool === "auswahl"){
      if(tmp.zieh){ var mv = tmp.zieh.moved; tmp = {}; if(mv) fertig(); else { zeichne(); hinweis(); } return; }
      if(tmp.rahmen){
        var rr = tmp.rahmen; tmp = {};
        if(dist(rr.a, rr.b) * ppm() < 6){ var tq = treffer(p); auswahl = tq ? auswahlAus(tq) : null; }
        else auswahl = fensterWahl(rr.a, rr.b);
        if(!auswahlZahl()) auswahl = null;
        zeichne(); hinweis(); return;
      }
      return;
    }
    if(tool === "kreis" && tmp.c){
      var Rk = feldWert() ? feldWert() * 10 : (tmp.rFix || (tmp.stift ? dist(tmp.c, tmp.stift) : 0));
      if(Rk < 1){ tmp = {}; step = 0; zeichne(); hinweis(); return; }
      merke(); var M = sicherePunkt(tmp.cf, tmp.c.x, tmp.c.y);
      S.arcs.push({ cx: M.x, cy: M.y, r: Rk, a0: 0, a1: 2 * Math.PI }); tmp = {}; step = 0; fertig(); return;
    }
    if(tool === "rechteck" && tmp.a){
      var a = tmp.a, e = tmp.b, ef = tmp.bf, af = tmp.af; tmp = {};
      if(!e || Math.abs(e.x - a.x) < 1 || Math.abs(e.y - a.y) < 1){ zeichne(); return; }
      merke();
      var P1 = sicherePunkt(af, a.x, a.y), P2 = neuerPunkt(e.x, a.y), P3 = sicherePunkt(ef, e.x, e.y), P4 = neuerPunkt(a.x, e.y);
      [[P1, P2], [P2, P3], [P3, P4], [P4, P1]].forEach(function(s){ S.lines.push({ x1: s[0].x, y1: s[0].y, x2: s[1].x, y2: s[1].y }); });
      fertig(); return;
    }
    if(tool === "vieleck" && tmp.poly){
      var q = tmp.cur || vieleckPunkt(p), poly = tmp.poly; tmp.cur = null; tmp.info = null;
      if(poly.length >= 3 && q.f && q.f.pid === poly[0].pid){
        merke(); var l0 = poly[poly.length - 1]; S.lines.push({ x1: l0.x, y1: l0.y, x2: poly[0].x, y2: poly[0].y }); tmp = {}; fertig(); return;
      }
      var last = poly[poly.length - 1];
      if(last && dist(last, q) < 1){ zeichne(); return; }
      merke(); var P = sicherePunkt(q.f, q.x, q.y);
      if(last) S.lines.push({ x1: last.x, y1: last.y, x2: P.x, y2: P.y });
      poly.push({ x: P.x, y: P.y, pid: P.id }); fertig(); return;
    }
    if(tool === "bemassung"){
      var bq = f ? { x: f.x, y: f.y } : { x: p.x, y: p.y };
      tmp.m = (tmp.m || []).concat([bq]);
      if(bemArt === "l" && tmp.m.length === 2){
        if(dist(tmp.m[0], tmp.m[1]) > 0.5){ merke(); S.dims.push({ t: "l", x1: tmp.m[0].x, y1: tmp.m[0].y, x2: tmp.m[1].x, y2: tmp.m[1].y }); }
        tmp = {}; fertig(); return;
      }
      if(bemArt === "w" && tmp.m.length === 3){
        var m3 = tmp.m; tmp = {};
        if(dist(m3[0], m3[1]) > 0.5 && dist(m3[2], m3[1]) > 0.5){ merke(); S.dims.push({ t: "w", x1: m3[0].x, y1: m3[0].y, sx: m3[1].x, sy: m3[1].y, x2: m3[2].x, y2: m3[2].y }); }
        fertig(); return;
      }
      zeichne(); return;
    }
    if(tool === "text"){
      var tx = String(document.getElementById("feld").value).trim();
      if(!tx){ hinweis("hTextLeer"); document.getElementById("feld").focus(); return; }
      merke(); S.texte.push({ x: p.x, y: p.y, s: tx }); fertig(); return;
    }
    if(tool === "kopieren" && tmp.kop){
      var kop = tmp.kop; tmp = {};
      var ddx = kop.dx, ddy = kop.dy;
      if(Math.hypot(ddx, ddy) < 1){ var xs = kop.P.map(function(v){ return v.x; }); ddx = Math.max.apply(null, xs) - Math.min.apply(null, xs) + 10; ddy = 0; }
      merke();
      var neu = [], pids = [], lis = [];
      kop.P.forEach(function(v){
        var x = v.x + ddx, y = v.y + ddy, alt = null;
        S.pts.forEach(function(q){ if(Math.hypot(q.x - x, q.y - y) < 0.01) alt = q; });
        if(alt) neu.push(alt); else { var np = neuerPunkt(x, y); neu.push(np); pids.push(np.id); }
      });
      [[0, 1], [1, 2], [2, 0]].forEach(function(s){ lis.push(S.lines.length); S.lines.push({ x1: neu[s[0]].x, y1: neu[s[0]].y, x2: neu[s[1]].x, y2: neu[s[1]].y }); });
      letzteKopie = { pids: pids, lis: lis };
      fertig(); return;
    }
  }
  function vieleckPunkt(p){
    tmp.info = null;
    var f = fang(p), last = tmp.poly && tmp.poly.length ? tmp.poly[tmp.poly.length - 1] : null;
    if(f) return { x: f.x, y: f.y, f: f };
    if(last){ var r = richtungsFang(last, p); tmp.info = r.info; return { x: r.p.x, y: r.p.y }; }
    return { x: p.x, y: p.y };
  }
  function feldZwei(){
    var z = String(document.getElementById("feld").value).replace(/,/g, ".").match(/\d+(\.\d+)?/g);
    if(!z) return null;
    var w = parseFloat(z[0]), h = z.length > 1 ? parseFloat(z[1]) : w;
    return w > 0 && h > 0 ? [w, h] : null;
  }
  function fertig(){ schnitteAlt = true; meldung = null; speichern(); zeichne(); hinweis(); aufgabeAnzeigen(); }
  function radiere(p){
    var best = treffer(p);
    if(!best) return;
    merke(); S[best[0]].splice(best[1], 1); letzteKopie = null; fertig();
  }
  function meldeMessung(s){ document.getElementById("messung").textContent = s; }

  // ---------- Werkzeugleiste ----------
  var GRUPPEN = { zeichnen: ["punkt", "lineal", "zirkel", "kreis", "geo", "rechteck", "vieleck"], konstr: ["mitte", "lot", "parallele", "msenk", "whalb", "kreis3"],
    messen: ["messen", "bemassung", "text"], bearb: ["auswahl", "trimmen", "kopieren", "radieren", "hand"] };
  var TOOLS = [].concat(GRUPPEN.zeichnen, GRUPPEN.konstr, GRUPPEN.messen, GRUPPEN.bearb), gruppe = "zeichnen";
  function zeigeGruppe(g){
    gruppe = g;
    document.querySelectorAll(".kat").forEach(function(b){ b.setAttribute("aria-selected", b.dataset.k === g ? "true" : "false"); });
    document.querySelectorAll(".wz").forEach(function(b){ b.hidden = GRUPPEN[g].indexOf(b.dataset.t) < 0; });
  }
  var FELD = { lineal: ["fLaenge", "cm", "frei"], zirkel: ["fRadius", "cm", "frei"], kreis: ["fRadius", "cm", "frei"], geo: ["fWinkel", "°", "frei"], rechteck: ["fMasse", "cm", "frei2"], text: ["fText", "", "textPh"] };
  function feldTexte(){
    var fc = FELD[tool]; if(!fc) return;
    document.getElementById("feldlabel").textContent = t(fc[0]);
    document.getElementById("einheit").textContent = fc[1];
    document.getElementById("feld").placeholder = t(fc[2]);
  }
  function waehle(tl){
    tool = tl; reset(); tmp = {};
    if(tl !== "auswahl") auswahl = null;
    for(var g in GRUPPEN) if(GRUPPEN[g].indexOf(tl) >= 0 && g !== gruppe) zeigeGruppe(g);
    document.querySelectorAll(".wz").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.t === tl ? "true" : "false"); });
    var feld = document.getElementById("feldbox");
    feld.hidden = !FELD[tl];
    var fe = document.getElementById("feld");
    fe.setAttribute("inputmode", tl === "text" ? "text" : "decimal");
    feld.classList.toggle("breit", tl === "text" || tl === "rechteck");
    fe.value = "";
    feldTexte();
    meldeMessung("");
    zeichne(); hinweis();
  }
  function hinweis(key){
    var k = key;
    if(!k){
      k = { punkt: "hPunkt", lineal: "hLineal", messen: "hMessen", radieren: "hRad", hand: "hHand", rechteck: "hRechteck", vieleck: "hVieleck", text: "hText", kopieren: "hKopie",
        bemassung: bemArt === "l" ? "hBemL" : "hBemW", kreis: step === 1 ? "hKreis1" : "hKreis0",
        mitte: "hMitte", lot: step === 1 ? "hLot1" : "hLot0", parallele: step === 1 ? "hPar1" : "hPar0", msenk: "hMsenk", whalb: "hWhalb", kreis3: "hKreis3", auswahl: "hAuswahl", trimmen: "hTrim" }[tool] || (tool === "zirkel" ? (step === 2 ? "hZ2" : step === 1 ? "hZ1" : "hZ0") : (step === 2 ? "hG2" : step === 1 ? "hG1" : "hG0"));
    }
    var h = document.getElementById("hinweis");
    h.textContent = t(k);
    h.classList.toggle("warn", !!key);
    optionen();
  }
  // werkzeugabhängige Knöpfe neben dem Eingabefeld (werden bei jedem hinweis() neu beschriftet → Sprachwechsel)
  function optionen(){
    var o = document.getElementById("optionen"), B = [];
    if(tool === "zirkel" && step === 2) B.push(["neuEinstich", t("neuEinstich"), function(){ reset(); zeichne(); hinweis(); }]);
    if(tool === "vieleck" && tmp.poly && tmp.poly.length) B.push(["fertigV", t("fertig"), function(){ reset(); zeichne(); hinweis(); }]);
    if(tool === "bemassung"){
      B.push(["bemL", t("bemLaenge"), function(){ bemArt = "l"; tmp = {}; zeichne(); hinweis(); }, bemArt === "l"]);
      B.push(["bemW", t("bemWinkel"), function(){ bemArt = "w"; tmp = {}; zeichne(); hinweis(); }, bemArt === "w"]);
    }
    if(tool === "auswahl"){
      B.push(["alle", t("alle"), allesWaehlen]);
      if(auswahlZahl()){ B.push(["loeschen", t("loeschen", { n: auswahlZahl() }), auswahlLoeschen]); B.push(["aufheben", t("aufheben"), function(){ auswahl = null; zeichne(); hinweis(); }]); }
    }
    if(tool === "kopieren" && letzteKopie){
      B.push(["drehL", "↺ 15°", function(){ kopieDrehen(-15); }, null, t("drehen")]);
      B.push(["drehR", "↻ 15°", function(){ kopieDrehen(15); }, null, t("drehen")]);
      B.push(["spiegeln", t("spiegeln"), kopieSpiegeln]);
    }
    o.innerHTML = "";
    B.forEach(function(b){
      var e = document.createElement("button"); e.type = "button"; e.className = "knopf hell"; e.id = b[0]; e.textContent = b[1];
      if(b[3] != null) e.setAttribute("aria-pressed", b[3] ? "true" : "false");
      if(b[4]) e.title = b[4];
      e.addEventListener("click", b[2]); o.appendChild(e);
    });
  }
  document.getElementById("feld").addEventListener("input", function(){ if(tool === "zirkel" && step === 2 && feldWert()){ tmp.r = feldWert() * 10; zeichne(); } });
  document.getElementById("rueck").addEventListener("click", rueck);
  document.getElementById("vor").addEventListener("click", vor);
  document.getElementById("bild").addEventListener("click", bildSpeichern);
  document.getElementById("raster").addEventListener("change", function(){ raster = this.checked; try{ localStorage.setItem("msDreieckRaster", raster ? "1" : "0"); }catch(e){} });
  document.querySelectorAll(".kat").forEach(function(b){ b.addEventListener("click", function(){ zeigeGruppe(b.dataset.k); if(GRUPPEN[b.dataset.k].indexOf(tool) < 0) waehle(GRUPPEN[b.dataset.k][0]); }); });
  document.getElementById("leer").addEventListener("click", function(){ if(!S.pts.length && !S.lines.length && !S.arcs.length && !S.texte.length && !S.dims.length) return; merke(); S = leeresBlatt(); letzteKopie = null; reset(); fertig(); });
  document.getElementById("fit").addEventListener("click", einpassen);
  document.getElementById("zplus").addEventListener("click", function(){ zoom(1.3); });
  document.getElementById("zminus").addEventListener("click", function(){ zoom(1 / 1.3); });
  document.getElementById("masse").addEventListener("change", function(){ zeigeMasse = this.checked; zeichne(); });
  document.getElementById("hilfen").addEventListener("change", function(){ hilfen = this.checked; });
  document.getElementById("gdBtn").addEventListener("click", function(){
    GD.on = !GD.on; this.setAttribute("aria-pressed", GD.on ? "true" : "false");
    if(GD.on){ GD.w = 0; GD.x = view.x + view.w / 2; GD.y = view.y + view.h / 2 + Math.min(40, view.h / 4); }
    zeichne();
    var h = document.getElementById("hinweis"); h.classList.remove("warn"); h.textContent = GD.on ? t("hGeo") : ""; if(!GD.on) hinweis();
  });
  TOOLS.forEach(function(tl){ document.querySelector('.wz[data-t="' + tl + '"]').addEventListener("click", function(){ waehle(tl); }); });
  document.addEventListener("keydown", function(e){
    var imFeld = e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA");
    var k = (e.key || "").toLowerCase();
    if((e.ctrlKey || e.metaKey) && (k === "y" || (k === "z" && e.shiftKey))){ e.preventDefault(); vor(); return; }
    if((e.ctrlKey || e.metaKey) && k === "z"){ e.preventDefault(); rueck(); return; }
    if(imFeld) return;
    if((e.ctrlKey || e.metaKey) && k === "a"){ e.preventDefault(); if(tool !== "auswahl") waehle("auswahl"); allesWaehlen(); return; }
    if((e.key === "Delete" || e.key === "Backspace") && auswahlZahl()){ e.preventDefault(); auswahlLoeschen(); return; }
    if(e.key === "Escape"){ abbrechen(); reset(); if(tool === "auswahl") auswahl = null; zeichne(); hinweis(); }
  });
  window.addEventListener("resize", function(){ zeichne(); });

  // ---------- Aufgaben ----------
  function zuf(a, b, s){ var n = Math.round((b - a) / s); return a + Math.floor(Math.random() * (n + 1)) * s; }
  function loesung(A, B, C){ return masse(A, B, C); }
  function neueAufgabe(typ){
    var typen = ["SSS", "SWS", "WSW", "SsW"]; typ = typ || typen[Math.floor(Math.random() * 4)];
    var A = { x: 0, y: 0 }, B, C, g = {};
    for(var v = 0; v < 200; v++){
      if(typ === "SSS"){ var a = zuf(3, 8, 0.5), b = zuf(3, 8, 0.5), c = zuf(4, 8, 0.5); if(a + b < c + 1 || a + c < b + 1 || b + c < a + 1) continue; B = { x: c * 10, y: 0 };
        var cc = kk({ cx: 0, cy: 0, r: b * 10 }, { cx: B.x, cy: 0, r: a * 10 }); C = cc[0].y < cc[1].y ? cc[0] : cc[1]; g = { a: a, b: b, c: c }; }
      else if(typ === "SWS"){ var b2 = zuf(3, 8, 0.5), c2 = zuf(4, 8, 0.5), al = zuf(30, 120, 5); B = { x: c2 * 10, y: 0 }; C = { x: b2 * 10 * Math.cos(al * Math.PI / 180), y: -b2 * 10 * Math.sin(al * Math.PI / 180) }; g = { b: b2, c: c2, al: al }; }
      else if(typ === "WSW"){ var c3 = zuf(4, 8, 0.5), al3 = zuf(30, 100, 5), be3 = zuf(30, 100, 5); if(al3 + be3 > 140) continue; B = { x: c3 * 10, y: 0 };
        var r1 = { x1: 0, y1: 0, x2: 300 * Math.cos(-al3 * Math.PI / 180), y2: 300 * Math.sin(-al3 * Math.PI / 180) }, r2 = { x1: B.x, y1: 0, x2: B.x + 300 * Math.cos(Math.PI + be3 * Math.PI / 180), y2: 300 * Math.sin(Math.PI + be3 * Math.PI / 180) };
        C = ll(r1, r2)[0]; if(!C) continue; g = { c: c3, al: al3, be: be3 }; }
      else { var c4 = zuf(3, 6, 0.5), b4 = zuf(c4 + 1, 8, 0.5), be4 = zuf(30, 110, 5); B = { x: c4 * 10, y: 0 };
        var r4 = { x1: B.x, y1: 0, x2: B.x + 300 * Math.cos(Math.PI + be4 * Math.PI / 180), y2: 300 * Math.sin(Math.PI + be4 * Math.PI / 180) };
        var cs = kl({ cx: 0, cy: 0, r: b4 * 10 }, r4); if(!cs.length) continue; C = cs[0]; g = { b: b4, c: c4, be: be4 }; }
      var m = loesung(A, B, C);
      if(Math.max(m.a, m.b, m.c) > 95 || Math.abs(C.y) > 90 || Math.min(m.al, m.be, m.ga) < 15 * Math.PI / 180) continue;
      aufg = { typ: typ, g: g, m: m }; break;
    }
    meldung = null; aufgabeAnzeigen();
  }
  function wertText(g){
    var s = [];
    ["a", "b", "c"].forEach(function(k){ if(g[k] != null) s.push(k + " = " + zahl(g[k], 1) + " cm"); });
    [["al", "α"], ["be", "β"], ["ga", "γ"]].forEach(function(k){ if(g[k[0]] != null) s.push(k[1] + " = " + g[k[0]] + "°"); });
    return s.join(", ");
  }
  function schritte(){
    var g = aufg.g, v = { a: g.a != null ? zahl(g.a, 1) : "", b: g.b != null ? zahl(g.b, 1) : "", c: zahl(g.c, 1), al: g.al, be: g.be };
    var L = { SSS: ["s1", "sssA", "sssB", "sssC", "verbAB"], SWS: ["s1", "wA", "zA", "verbB"], WSW: ["s1", "wA", "wB", "wswC"], SsW: ["s1", "wB", "zA", "verbA"] }[aufg.typ];
    return L.map(function(k){ return t(k, v); });
  }
  function aufgabeAnzeigen(){
    var box = document.getElementById("aufgabe");
    box.hidden = modus !== "aufg";
    if(modus !== "aufg") return;
    if(!aufg) neueAufgabe();
    var h = '<p class="auftrag">' + t("auftrag") + ' <b><bdi dir="ltr">' + wertText(aufg.g) + '</bdi></b> <span class="typ">(' + t("typ" + aufg.typ) + ")</span></p>";
    h += '<details class="schritte"><summary>' + t("schritte") + "</summary><ol>" + schritte().map(function(s){ return "<li>" + s + "</li>"; }).join("") + "</ol></details>";
    h += '<div class="knoepfe"><button type="button" class="knopf" id="pruefen">' + t("pruefen") + '</button><button type="button" class="knopf hell" id="neuA">' + t("neueAufg") + "</button></div>";
    if(meldung) h += '<p class="meldung ' + meldung[0] + '">' + meldung[1] + "</p>";
    box.innerHTML = h;
    document.getElementById("pruefen").addEventListener("click", pruefen);
    document.getElementById("neuA").addEventListener("click", function(){ merke(); S = leeresBlatt(); letzteKopie = null; reset(); neueAufgabe(); fertig(); einpassenStart(); });
  }
  function pruefen(){
    var D = dreiecke(), soll = [aufg.m.a, aufg.m.b, aufg.m.c].sort(function(x, y){ return x - y; }), best = null, be = 1e9;
    D.forEach(function(d){
      var ist = [d.a, d.b, d.c].sort(function(x, y){ return x - y; }), f = Math.max(Math.abs(ist[0] - soll[0]), Math.abs(ist[1] - soll[1]), Math.abs(ist[2] - soll[2]));
      if(f < be){ be = f; best = d; }
    });
    if(!best) meldung = ["schlecht", t("keinD")];
    else {
      var ist = "a = " + cm(best.a) + " cm, b = " + cm(best.b) + " cm, c = " + cm(best.c) + " cm, α = " + grad(best.al) + "°, β = " + grad(best.be) + "°, γ = " + grad(best.ga) + "°";
      var sl = "a = " + cm(aufg.m.a) + " cm, b = " + cm(aufg.m.b) + " cm, c = " + cm(aufg.m.c) + " cm, α = " + grad(aufg.m.al) + "°, β = " + grad(aufg.m.be) + "°, γ = " + grad(aufg.m.ga) + "°";
      var iso = function(x){ return '<bdi dir="ltr">' + x + "</bdi>"; };
      meldung = be <= 1.5 ? ["gut", t("richtig", { w: iso(sl) })] : ["schlecht", t("fast", { ist: iso(ist), soll: iso(sl) })];
    }
    aufgabeAnzeigen();
  }
  function einpassenStart(){ // Grundseite c auf y = 0, Dreieck darüber
    var asp = (svg.clientHeight || 400) / (svg.clientWidth || 600), w = 140;
    if(aufg) w = Math.max(120, aufg.m.c + 50, (Math.max(aufg.m.b, aufg.m.a) + 40) / asp);
    view.w = w; view.h = w * asp; view.x = -22 - (w - 120) / 4; view.y = -view.h + 25; zeichne();
  }
  function setzeModus(m){
    modus = m;
    document.getElementById("tabFrei").setAttribute("aria-selected", m === "frei"); document.getElementById("tabAufg").setAttribute("aria-selected", m === "aufg");
    if(m === "aufg"){ if(!aufg) neueAufgabe(); einpassenStart(); }
    aufgabeAnzeigen(); zeichne();
  }
  document.getElementById("tabFrei").addEventListener("click", function(){ setzeModus("frei"); });
  document.getElementById("tabAufg").addEventListener("click", function(){ setzeModus("aufg"); });

  // ---------- Texte ----------
  function texte(){
    document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = "miStudia – " + t("titel");
    document.getElementById("titel").textContent = t("titel");
    document.getElementById("tabFrei").textContent = t("tabFrei"); document.getElementById("tabAufg").textContent = t("tabAufg");
    TOOLS.forEach(function(tl){ var b = document.querySelector('.wz[data-t="' + tl + '"]'); b.querySelector("span").textContent = t("w_" + tl); b.title = t("w_" + tl); });
    ["rueck", "vor"].forEach(function(id){ var b = document.getElementById(id); b.title = t(id); b.setAttribute("aria-label", t(id)); });
    document.querySelectorAll(".kat").forEach(function(b){ b.textContent = t("k_" + b.dataset.k); });
    document.getElementById("bild").title = t("bild"); document.getElementById("bild").querySelector("span").textContent = t("bild");
    document.getElementById("tRaster").textContent = t("raster");
    document.getElementById("leer").title = t("leer"); document.getElementById("leer").querySelector("span").textContent = t("leer");
    document.getElementById("fit").title = t("fit"); document.getElementById("zplus").title = t("zplus"); document.getElementById("zminus").title = t("zminus");
    document.getElementById("tMasse").textContent = t("masse");
    feldTexte();
    document.getElementById("gdBtn").title = t("geoEin"); document.getElementById("gdBtn").setAttribute("aria-label", t("geoEin"));
    document.getElementById("tHilfen").textContent = t("hilfen"); document.getElementById("hilfenBox").title = t("hilfenTitel");
    hinweis(); aufgabeAnzeigen(); zeichne();
  }
  window.MS_LANG = { apply: function(l){ if(DT[l]){ lang = l; texte(); } } };
  var hatBlatt = false;
  try{
    var gs = JSON.parse(localStorage.getItem("msDreieckBlatt") || "null");
    if(gs && Array.isArray(gs.pts) && Array.isArray(gs.lines) && Array.isArray(gs.arcs)){ S = gs; S.texte = S.texte || []; S.dims = S.dims || []; S.nr = S.nr || 0; hatBlatt = S.pts.length + S.lines.length + S.arcs.length + S.texte.length > 0; }
    raster = localStorage.getItem("msDreieckRaster") === "1"; document.getElementById("raster").checked = raster;
  }catch(e){}
  zeigeGruppe("zeichnen");
  waehle("lineal");
  setzeModus("frei");
  texte();
  setTimeout(function(){ if(hatBlatt) einpassen(); else zeichne(); }, 50);
})();
