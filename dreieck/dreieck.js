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
  var S = { pts: [], lines: [], arcs: [], nr: 0 };
  var hist = [];
  var tool = "lineal", step = 0, tmp = {};
  var view = { x: -15, y: -15, w: 180, h: 120 };
  var zeigeMasse = true;
  var modus = "frei", aufg = null, meldung = null;
  var schnitte = [], schnitteAlt = true;

  function merke(){ hist.push(JSON.stringify(S)); if(hist.length > 100) hist.shift(); schnitteAlt = true; }
  function rueck(){ if(!hist.length) return; S = JSON.parse(hist.pop()); schnitteAlt = true; reset(); zeichne(); }
  function name(i){ var b = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; return i < 26 ? b[i] : b[i % 26] + "′".repeat(Math.floor(i / 26)); }
  function neuerPunkt(x, y){ var p = { id: ++S.nr, x: x, y: y, n: name(S.pts.length) }; S.pts.push(p); return p; }
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
    return best;
  }
  function sicherePunkt(f, x, y){ // vorhandenen Punkt nehmen oder neuen anlegen
    if(f && f.pid) return punkt(f.pid);
    return neuerPunkt(f ? f.x : x, f ? f.y : y);
  }

  // ---------- Dreiecke finden ----------
  function verbunden(p, q){
    return S.lines.some(function(l){ return abstandStrecke(p, l) < 0.6 && abstandStrecke(q, l) < 0.6; });
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
    S.lines.forEach(function(l){ xs.push(l.x1, l.x2); ys.push(l.y1, l.y2); });
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
    pat.appendChild(el("path", { d: "M5 0L0 0L0 5", fill: "none", stroke: "#b9d3ee", "stroke-width": 0.6, "vector-effect": "non-scaling-stroke" }));
    defs.appendChild(pat); svg.appendChild(defs);
    svg.appendChild(el("rect", { x: view.x, y: view.y, width: view.w, height: view.h, fill: "url(#karo)" }));
    S.arcs.forEach(function(a){ svg.appendChild(bogenEl(a, "bogen")); });
    S.lines.forEach(function(l){ svg.appendChild(el("line", { x1: l.x1, y1: l.y1, x2: l.x2, y2: l.y2, "class": "strecke", "vector-effect": "non-scaling-stroke" })); });
    // Dreiecke + Maße
    var D = dreiecke();
    if(D.length && (zeigeMasse || modus === "aufg")){
      var d0 = D[D.length - 1];
      svg.appendChild(el("polygon", { points: d0.P.map(function(p){ return p.x + "," + p.y; }).join(" "), "class": "dreieck" }));
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
    vorschau();
  }
  // Werkzeug-Vorschau (Zirkel, Lineal-Linie, Geodreieck)
  function vorschau(){
    var k = 1 / ppm();
    if(tmp.fang) svg.appendChild(el("circle", { cx: tmp.fang.x, cy: tmp.fang.y, r: 9 * k, "class": "fang", "vector-effect": "non-scaling-stroke" }));
    if(tool === "lineal" && tmp.a && tmp.b){
      svg.appendChild(el("line", { x1: tmp.a.x, y1: tmp.a.y, x2: tmp.b.x, y2: tmp.b.y, "class": "strecke vor", "vector-effect": "non-scaling-stroke" }));
      svg.appendChild(text((tmp.a.x + tmp.b.x) / 2, (tmp.a.y + tmp.b.y) / 2 - 10 * k, cm(dist(tmp.a, tmp.b)) + " cm", "live", 16));
    }
    if(tool === "zirkel" && tmp.c){
      var c = tmp.c, r = tmp.r || (tmp.stift ? dist(c, tmp.stift) : 0);
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
    if(drag){ drag = false; los(welt(ev)); }
  }
  svg.addEventListener("pointerup", hoch);
  svg.addEventListener("pointercancel", function(ev){ delete zeiger[ev.pointerId]; pinch = null; if(drag){ drag = false; abbrechen(); } });
  svg.addEventListener("wheel", function(ev){ ev.preventDefault(); var p = welt(ev); zoom(ev.deltaY < 0 ? 1.15 : 1 / 1.15, p.x, p.y); }, { passive: false });
  function hover(p){ if(tool === "hand" || tool === "radieren") return; var f = fang(p); var alt = tmp.fang; tmp.fang = f; if((alt && !f) || f && (!alt || alt.x !== f.x || alt.y !== f.y)) zeichne(); }

  function abbrechen(){ drag = false; if(tool === "lineal") tmp = {}; else if(tool === "zirkel"){ if(tmp.bogen) tmp.bogen = null; else if(!tmp.r){ tmp = {}; step = 0; } } else if(tool === "hand") tmp = {}; zeichne(); hinweis(); }
  function reset(){ tmp = {}; step = 0; }

  function runter(p){
    var f = fang(p);
    if(tool === "lineal"){ tmp = { a: f || p, af: f, b: f || p }; zeichne(); return; }
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
      var L = feldWert();
      if(L){ var w = Math.atan2(p.y - tmp.a.y, p.x - tmp.a.x); tmp.b = { x: tmp.a.x + L * 10 * Math.cos(w), y: tmp.a.y + L * 10 * Math.sin(w) }; tmp.bf = null; }
      else { f = fang(p); tmp.b = f || p; tmp.bf = f; }
      zeichne(); return;
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
      if(step === 1 && tmp.c && !feldWert()){ f = fang(p); if(f && f.x === tmp.c.x && f.y === tmp.c.y) f = null; tmp.stift = f || p; zeichne(); return; }
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
        var R = feldWert() ? feldWert() * 10 : (tmp.stift ? dist(tmp.c, tmp.stift) : 0);
        if(R < 1){ hinweis("hZ0"); zeichne(); return; }
        // Einstich als Punkt festhalten (sonst kann man später nicht messen/verbinden)
        if(!(tmp.cf && tmp.cf.pid)){ merke(); var c = sicherePunkt(tmp.cf, tmp.c.x, tmp.c.y); tmp.c = { x: c.x, y: c.y }; schnitteAlt = true; }
        tmp.r = R; step = 2; zeichne(); hinweis(); return;
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
  }
  function fertig(){ schnitteAlt = true; meldung = null; zeichne(); hinweis(); aufgabeAnzeigen(); }
  function radiere(p){
    var tol = 14 / ppm(), best = null, bd = tol;
    S.pts.forEach(function(q, i){ var d = dist(p, q); if(d < bd){ bd = d; best = ["pts", i]; } });
    if(!best){
      S.lines.forEach(function(l, i){ var d = abstandStrecke(p, l); if(d < bd){ bd = d; best = ["lines", i]; } });
      S.arcs.forEach(function(a, i){ var w = Math.atan2(p.y - a.cy, p.x - a.cx), d = Math.abs(Math.hypot(p.x - a.cx, p.y - a.cy) - a.r); if(d < bd && imBogen(a, w)){ bd = d; best = ["arcs", i]; } });
    }
    if(!best) return;
    merke(); S[best[0]].splice(best[1], 1); fertig();
  }
  function meldeMessung(s){ document.getElementById("messung").textContent = s; }

  // ---------- Werkzeugleiste ----------
  var TOOLS = ["punkt", "lineal", "zirkel", "geo", "messen", "radieren", "hand"];
  function waehle(tl){
    tool = tl; reset(); tmp = {};
    document.querySelectorAll(".wz").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.t === tl ? "true" : "false"); });
    var feld = document.getElementById("feldbox");
    feld.hidden = !(tl === "lineal" || tl === "zirkel" || tl === "geo");
    document.getElementById("feldlabel").textContent = t(tl === "lineal" ? "fLaenge" : tl === "zirkel" ? "fRadius" : "fWinkel");
    document.getElementById("einheit").textContent = tl === "geo" ? "°" : "cm";
    document.getElementById("feld").value = "";
    meldeMessung("");
    zeichne(); hinweis();
  }
  function hinweis(key){
    var k = key;
    if(!k){
      k = tool === "punkt" ? "hPunkt" : tool === "lineal" ? "hLineal" : tool === "messen" ? "hMessen" : tool === "radieren" ? "hRad" : tool === "hand" ? "hHand"
        : tool === "zirkel" ? (step === 2 ? "hZ2" : step === 1 ? "hZ1" : "hZ0") : (step === 2 ? "hG2" : step === 1 ? "hG1" : "hG0");
    }
    var h = document.getElementById("hinweis");
    h.textContent = t(k);
    h.classList.toggle("warn", !!key);
    document.getElementById("neuEinstich").hidden = !(tool === "zirkel" && step === 2);
  }
  document.getElementById("feld").addEventListener("input", function(){ if(tool === "zirkel" && step === 2 && feldWert()){ tmp.r = feldWert() * 10; zeichne(); } });
  document.getElementById("neuEinstich").addEventListener("click", function(){ reset(); zeichne(); hinweis(); });
  document.getElementById("rueck").addEventListener("click", rueck);
  document.getElementById("leer").addEventListener("click", function(){ if(!S.pts.length && !S.lines.length && !S.arcs.length) return; merke(); S = { pts: [], lines: [], arcs: [], nr: 0 }; reset(); fertig(); });
  document.getElementById("fit").addEventListener("click", einpassen);
  document.getElementById("zplus").addEventListener("click", function(){ zoom(1.3); });
  document.getElementById("zminus").addEventListener("click", function(){ zoom(1 / 1.3); });
  document.getElementById("masse").addEventListener("change", function(){ zeigeMasse = this.checked; zeichne(); });
  TOOLS.forEach(function(tl){ document.querySelector('.wz[data-t="' + tl + '"]').addEventListener("click", function(){ waehle(tl); }); });
  document.addEventListener("keydown", function(e){ if((e.ctrlKey || e.metaKey) && e.key === "z"){ e.preventDefault(); rueck(); } if(e.key === "Escape"){ abbrechen(); reset(); zeichne(); hinweis(); } });
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
    document.getElementById("neuA").addEventListener("click", function(){ merke(); S = { pts: [], lines: [], arcs: [], nr: 0 }; reset(); neueAufgabe(); fertig(); einpassenStart(); });
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
    document.getElementById("rueck").title = t("rueck"); document.getElementById("rueck").querySelector("span").textContent = t("rueck");
    document.getElementById("leer").title = t("leer"); document.getElementById("leer").querySelector("span").textContent = t("leer");
    document.getElementById("fit").title = t("fit"); document.getElementById("zplus").title = t("zplus"); document.getElementById("zminus").title = t("zminus");
    document.getElementById("neuEinstich").textContent = t("neuEinstich");
    document.getElementById("tMasse").textContent = t("masse");
    document.getElementById("feld").placeholder = t("frei");
    document.getElementById("feldlabel").textContent = t(tool === "lineal" ? "fLaenge" : tool === "zirkel" ? "fRadius" : "fWinkel");
    hinweis(); aufgabeAnzeigen(); zeichne();
  }
  window.MS_LANG = { apply: function(l){ if(DT[l]){ lang = l; texte(); } } };
  waehle("lineal");
  setzeModus("frei");
  texte();
  setTimeout(zeichne, 50);
})();
