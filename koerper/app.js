// ============================================================
// koerper/app.js – Körper: Volumen und Oberfläche
// Grundkörper: Würfel, Quader, Dreiecksprisma, Zylinder, Pyramide, Kegel,
//   Kugel, Halbkugel – drehbare 3D-Zeichnung (Ziehen), eigene Maße,
//   Rechenweg für V und O (Formel zuerst, ein „=“ pro Zeile).
// Zusammengesetzt: aufgesetzt (V addieren, Berührflächen fallen weg) und
//   ausgeschnitten (V abziehen, Innenflächen dazu); fehlende Längen
//   (Mantellinie, Seitenhöhe) mit dem Satz des Pythagoras.
// Üben: Zufallsaufgaben, 2 Versuche, danach Lösungsweg.
// 3D: einfaches Flächennetz, Maler-Algorithmus, Rückseiten weggelassen,
//   verdeckte Kanten gestrichelt, glatte Flächen nur mit Umrisslinie.
// Texte: koerper/texte.js (KO), Sprache aus dem Startmenü (MS_LANG).
// ============================================================
(function(){
  "use strict";
  var NS = "http://www.w3.org/2000/svg", lang = "de";
  function $(id){ return document.getElementById(id); }
  function t(k, v){ var s = (KO[lang] && KO[lang][k]) || KO.de[k] || k; if(v) for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  function el(n, a, txt){ var e = document.createElementNS(NS, n); for(var k in a) if(a[k] != null) e.setAttribute(k, a[k]); if(txt != null) e.textContent = txt; return e; }
  function leer(s){ while(s.lastChild) s.removeChild(s.lastChild); }
  function sicht(e, an){ if(an) e.removeAttribute("hidden"); else e.setAttribute("hidden", ""); }
  function bdi(s){ return '<bdi dir="ltr">' + s + "</bdi>"; }
  function esc(s){ return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
  function zuf(a, b){ return a + Math.floor(Math.random() * (b - a + 1)); }
  function wahl(L){ return L[Math.floor(Math.random() * L.length)]; }
  function komma(){ return !(lang === "en" || lang === "zh" || lang === "ja" || lang === "ar"); }
  function zahl(v, d){ if(d == null) d = 2; var r = Math.round(v * Math.pow(10, d)) / Math.pow(10, d); if(Object.is(r, -0)) r = 0; var s = String(Math.abs(r)); if(s.indexOf("e") >= 0) s = Math.abs(r).toFixed(d); if(komma()) s = s.replace(".", ","); return (r < 0 ? "−" : "") + s; }
  function genau(v){ return Math.abs(v * 100 - Math.round(v * 100)) < 1e-7; }
  function rel(v){ return genau(v) ? "=" : "≈"; }
  function lies(s){ s = String(s).trim().replace(",", "."); return s === "" ? NaN : Number(s); }

  // ---------- 3D-Hilfen ----------
  function sub(a, b){ return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function dot(a, b){ return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function norm(a){ var l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; }
  function mitte3(L){ var m = [0, 0, 0]; L.forEach(function(p){ m[0] += p[0]; m[1] += p[1]; m[2] += p[2]; }); return [m[0] / L.length, m[1] / L.length, m[2] / L.length]; }
  function newell(L){ var n = [0, 0, 0]; for(var i = 0; i < L.length; i++){ var a = L[i], b = L[(i + 1) % L.length]; n[0] += (a[1] - b[1]) * (a[2] + b[2]); n[1] += (a[2] - b[2]) * (a[0] + b[0]); n[2] += (a[0] - b[0]) * (a[1] + b[1]); } return n; }

  // ---------- Bausteine für Flächennetze ----------
  // Fläche: { p: Eckpunkte, loch: Lochrand | null, o: Bezugspunkt im Körper, f: Farbe, g: glatte Gruppe, inv: Normale zum Bezugspunkt hin (Lochwände) }
  var N = 48, gid = 0;
  function kreis(r, y){ var L = []; for(var i = 0; i < N; i++){ var w = 2 * Math.PI * i / N; L.push([r * Math.cos(w), y, -r * Math.sin(w)]); } return L; }
  function quader(F, b, f, ohne, lochO, lochU, inv){
    var x0 = b[0], x1 = b[1], y0 = b[2], y1 = b[3], z0 = b[4], z1 = b[5], o = [(x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2]; ohne = ohne || "";
    var S = { unten: [[x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1]], oben: [[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]],
      vorne: [[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]], hinten: [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0]],
      links: [[x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0]], rechts: [[x1, y0, z0], [x1, y0, z1], [x1, y1, z1], [x1, y1, z0]] };
    for(var s in S) if(ohne.indexOf(s) < 0) F.push({ p: S[s], o: o, f: f, inv: inv, loch: s === "oben" ? lochO : s === "unten" ? lochU : null });
  }
  function zylinder(F, r, y0, y1, f, opt){
    opt = opt || {}; var A = kreis(r, y0), B = kreis(r, y1), g = "g" + (++gid), o = [0, (y0 + y1) / 2, 0];
    for(var i = 0; i < N; i++){ var j = (i + 1) % N; F.push({ p: [A[i], A[j], B[j], B[i]], o: o, f: f, g: g, inv: opt.inv }); }
    if(opt.unten !== false) F.push({ p: A, o: o, f: f, inv: opt.inv }); if(opt.oben !== false) F.push({ p: B, o: o, f: f, inv: opt.inv });
  }
  function kegel(F, r, y0, ys, f, opt){
    opt = opt || {}; var A = kreis(r, y0), S = [0, ys, 0], g = "g" + (++gid), o = [0, y0 + (ys - y0) / 4, 0];
    for(var i = 0; i < N; i++) F.push({ p: [A[i], A[(i + 1) % N], S], o: o, f: f, g: g, inv: opt.inv });
    if(opt.boden !== false) F.push({ p: A, o: o, f: f, loch: opt.loch || null });
  }
  function pyramide(F, a, y0, ys, f, opt){
    opt = opt || {}; var h = a / 2, C = [[-h, y0, -h], [h, y0, -h], [h, y0, h], [-h, y0, h]], S = [0, ys, 0], o = [0, y0 + (ys - y0) / 4, 0];
    for(var i = 0; i < 4; i++) F.push({ p: [C[i], C[(i + 1) % 4], S], o: o, f: f, inv: opt.inv });
    if(opt.boden !== false) F.push({ p: C, o: o, f: f, loch: opt.loch || null });
  }
  function halbkugel(F, r, y0, f, opt){
    opt = opt || {}; var M = 16, s = opt.unten ? -1 : 1, g = opt.g || "g" + (++gid), o = [0, y0 + s * r * 0.3, 0], R = [];
    for(var j = 0; j <= M; j++){ var w = Math.PI / 2 * j / M; R.push(j < M ? kreis(r * Math.cos(w), y0 + s * r * Math.sin(w)) : null); }
    var top = [0, y0 + s * r, 0];
    for(j = 0; j < M; j++) for(var i = 0; i < N; i++){ var k = (i + 1) % N;
      F.push({ p: j + 1 < M ? [R[j][i], R[j][k], R[j + 1][k], R[j + 1][i]] : [R[j][i], R[j][k], top], o: o, f: f, g: g }); }
    if(opt.boden !== false) F.push({ p: R[0], o: o, f: f });
  }
  function halbzylinder(F, r, cx, cy, z0, z1, f){ // liegend, Achse längs z, Wölbung nach +x
    var n = N / 2, A = [], B = [], g = "g" + (++gid), o = [cx + r * 0.4, cy, (z0 + z1) / 2];
    for(var i = 0; i <= n; i++){ var w = -Math.PI / 2 + Math.PI * i / n; A.push([cx + r * Math.cos(w), cy + r * Math.sin(w), z1]); B.push([cx + r * Math.cos(w), cy + r * Math.sin(w), z0]); }
    for(i = 0; i < n; i++) F.push({ p: [A[i], A[i + 1], B[i + 1], B[i]], o: o, f: f, g: g });
    F.push({ p: A, o: o, f: f }); F.push({ p: B, o: o, f: f });
  }
  function prisma(F, g, hd, L, y0, f, opt){
    opt = opt || {}; var T = function(z){ return [[-g / 2, y0, z], [g / 2, y0, z], [0, y0 + hd, z]]; }, A = T(L / 2), B = T(-L / 2), o = [0, y0 + hd / 3, 0];
    F.push({ p: A, o: o, f: f }); F.push({ p: B, o: o, f: f });
    if(opt.boden !== false) F.push({ p: [A[0], A[1], B[1], B[0]], o: o, f: f });
    F.push({ p: [A[0], A[2], B[2], B[0]], o: o, f: f }); F.push({ p: [A[1], A[2], B[2], B[1]], o: o, f: f });
  }

  // ---------- Szene: drehbare Zeichnung ----------
  var FARBEN = [[96, 165, 250], [251, 191, 36], [248, 113, 113], [74, 222, 128]], W = 440, H = 380;
  function Szene(sv){
    var S = this, zieh = null; S.sv = sv; S.yaw = -0.55; S.pitch = 0.42; S.F = []; S.L = [];
    sv.addEventListener("pointerdown", function(e){ zieh = [e.clientX, e.clientY]; try { sv.setPointerCapture(e.pointerId); } catch(x){} e.preventDefault(); });
    sv.addEventListener("pointermove", function(e){
      if(!zieh) return; var r = sv.getBoundingClientRect(), f = W / (r.width || W);
      S.yaw += (e.clientX - zieh[0]) * f * 0.011; S.pitch = Math.max(-0.3, Math.min(1.45, S.pitch + (e.clientY - zieh[1]) * f * 0.009));
      zieh = [e.clientX, e.clientY]; S.zeichne();
    });
    ["pointerup", "pointercancel"].forEach(function(n){ sv.addEventListener(n, function(){ zieh = null; }); });
  }
  function schluessel(p){ return p.map(function(v){ var r = Math.round(v * 1e5) / 1e5; return r === 0 ? "0" : String(r); }).join(","); }
  Szene.prototype.setze = function(F, L){
    var x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity, z0 = Infinity, z1 = -Infinity, E = {};
    function box(p){ x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]); y0 = Math.min(y0, p[1]); y1 = Math.max(y1, p[1]); z0 = Math.min(z0, p[2]); z1 = Math.max(z1, p[2]); }
    F.forEach(function(f){ f.p.forEach(box); });
    var c = [(x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2], R = 0;
    F.forEach(function(f){ f.p.forEach(function(p){ R = Math.max(R, Math.hypot(p[0] - c[0], p[1] - c[1], p[2] - c[2])); }); });
    F.forEach(function(f, i){
      var n = newell(f.p), m = mitte3(f.p), s = dot(n, sub(m, f.o)) < 0 ? -1 : 1; if(f.inv) s = -s;
      f.n = norm([n[0] * s, n[1] * s, n[2] * s]); f.m = m; f.k = [];
      [f.p].concat(f.loch ? [f.loch] : []).forEach(function(lp){
        for(var j = 0; j < lp.length; j++){
          var a = lp[j], b = lp[(j + 1) % lp.length], ka = schluessel(a), kb = schluessel(b); if(ka === kb) continue;
          var k = ka < kb ? ka + "|" + kb : kb + "|" + ka; if(!E[k]) E[k] = { a: a, b: b, f: [] }; E[k].f.push(i); f.k.push(k);
        }
      });
    });
    for(var k in E){ var e = E[k]; e.glatt = e.f.length === 2 && !!F[e.f[0]].g && F[e.f[0]].g === F[e.f[1]].g; }
    this.y0 = y0; this.y1 = y1; this.F = F; this.E = E; this.L = L || []; this.c = c; this.R = R || 1; this.zeichne();
  };
  Szene.prototype.zeichne = function(){
    var S = this, sv = S.sv; leer(sv); sv.setAttribute("viewBox", "0 0 " + W + " " + H); if(!S.F.length) return;
    var k = (Math.min(W, H) / 2 - 30) / S.R, cy = Math.cos(S.yaw), sy = Math.sin(S.yaw), cp = Math.cos(S.pitch), sp = Math.sin(S.pitch);
    function rot(v){ var x1 = v[0] * cy + v[2] * sy, z1 = -v[0] * sy + v[2] * cy; return [x1, v[1] * cp - z1 * sp, v[1] * sp + z1 * cp]; }
    function P(p){ var r = rot([p[0] - S.c[0], p[1] - S.c[1], p[2] - S.c[2]]); return [W / 2 + r[0] * k, H / 2 - r[1] * k, r[2]]; }
    function pfad(L){ return L.map(function(p, i){ var q = P(p); return (i ? "L" : "M") + q[0].toFixed(1) + " " + q[1].toFixed(1); }).join("") + "Z"; }
    function kante(e, versteckt){ var a = P(e.a), b = P(e.b); sv.appendChild(el("line", { x1: a[0].toFixed(1), y1: a[1].toFixed(1), x2: b[0].toFixed(1), y2: b[1].toFixed(1), "class": versteckt ? "kv" : "ks" })); }
    var LV = norm([-0.35, 0.75, 0.6]);
    var vorn = S.F.map(function(f){ var r = rot(f.n); f.licht = Math.max(0, dot(r, LV)); f.tief = P(f.m)[2]; return r[2] > 1e-6; });
    // Rand eines Lochs: sichtbar, wenn die Außenfläche vorne liegt – oder wenn man durch die Öffnung (oben/unten) hineinschaut
    var siehtOben = rot([0, 1, 0])[2] > 1e-6, siehtUnten = rot([0, -1, 0])[2] > 1e-6;
    function sichtbar(e){
      var aussen = e.f.filter(function(j){ return !S.F[j].inv; }), innen = e.f.filter(function(j){ return S.F[j].inv; });
      if(!aussen.length || !innen.length) return e.f.some(function(j){ return vorn[j]; });
      if(aussen.some(function(j){ return vorn[j]; })) return true;
      var oben = Math.abs(e.a[1] - S.y1) < 1e-6 && Math.abs(e.b[1] - S.y1) < 1e-6, unten = Math.abs(e.a[1] - S.y0) < 1e-6 && Math.abs(e.b[1] - S.y0) < 1e-6;
      return innen.some(function(j){ return vorn[j]; }) && ((oben && siehtOben) || (unten && siehtUnten));
    }
    var ord = []; S.F.forEach(function(f, i){ if(vorn[i]) ord.push(i); });
    ord.sort(function(a, b){ return S.F[a].tief - S.F[b].tief; });
    // Aussparung (Loch, ausgeschnittener Körper): wie im Schulbuch rot „durchscheinend“ über den blauen Grundkörper legen
    var loch = S.F.some(function(f){ return f.inv; }), innen = [];
    function flaeche(f, ziel){
      var B = FARBEN[f.f] || FARBEN[0], w = 0.15 + 0.35 * f.licht, h = 0.8 + 0.2 * f.licht;
      var col = "rgb(" + B.map(function(v){ return Math.round((v * (1 - w) + 255 * w) * h); }).join(",") + ")";
      var a = { d: pfad(f.p) + (f.loch ? pfad(f.loch) : ""), fill: col, "fill-rule": "evenodd" };
      if(f.g){ a.stroke = col; a["stroke-width"] = 0.9; a["stroke-linejoin"] = "round"; }
      ziel.appendChild(el("path", a));
    }
    ord.forEach(function(i){
      var f = S.F[i];
      if(loch){ if(f.inv) innen.push(f); else flaeche(f, sv); return; }
      flaeche(f, sv);
      f.k.forEach(function(kk){ var e = S.E[kk]; if(e.glatt ? e.f.some(function(j){ return !vorn[j]; }) : sichtbar(e)) kante(e, false); });
    });
    if(loch){
      var gI = el("g", { opacity: 0.82 }); sv.appendChild(gI); innen.forEach(function(f){ flaeche(f, gI); });
      for(var k2 in S.E){ var e2 = S.E[k2];
        if(e2.glatt ? (e2.f.some(function(j){ return vorn[j]; }) && e2.f.some(function(j){ return !vorn[j]; })) : sichtbar(e2)) kante(e2, false); }
    }
    // verdeckte Kanten zu Linienzügen verbinden, damit die Strichelung auch bei Kreisen durchläuft
    var VK = [], AN = {};
    for(var kk in S.E){ var e = S.E[kk]; if(!e.glatt && !sichtbar(e)){ var ka = schluessel(e.a), kb = schluessel(e.b), x = { a: e.a, b: e.b, ka: ka, kb: kb, weg: false }; VK.push(x); (AN[ka] = AN[ka] || []).push(x); (AN[kb] = AN[kb] || []).push(x); } }
    VK.forEach(function(x){
      if(x.weg) return; x.weg = true; var zug = [x.a, x.b], ende = [x.ka, x.kb];
      [1, 0].forEach(function(seite){
        for(var n = 0; n < 500; n++){
          var kk2 = ende[seite], nx = (AN[kk2] || []).filter(function(y){ return !y.weg; })[0]; if(!nx) break; nx.weg = true;
          var weiter = nx.ka === kk2 ? [nx.b, nx.kb] : [nx.a, nx.ka];
          if(seite) zug.push(weiter[0]); else zug.unshift(weiter[0]); ende[seite] = weiter[1];
        }
      });
      sv.appendChild(el("path", { d: zug.map(function(p, i){ var q = P(p); return (i ? "L" : "M") + q[0].toFixed(1) + " " + q[1].toFixed(1); }).join(""), "class": "kv", fill: "none" }));
    });
    // Rechte Winkel: zwei Maßlinien (nicht nur Kanten) mit gemeinsamem Punkt, die im Raum senkrecht stehen
    // → Viertelkreis im Raum (dreht sich mit) + Punkt, ca. 12 px groß
    (function(){
      var gleich = function(p, q){ return Math.abs(p[0] - q[0]) + Math.abs(p[1] - q[1]) + Math.abs(p[2] - q[2]) < 1e-6; };
      var gesehen = {};
      for(var i = 0; i < S.L.length; i++) for(var j = i + 1; j < S.L.length; j++){
        var A = S.L[i], B = S.L[j]; if(A.art === "kante" && B.art === "kante") continue;
        [[A.a, A.b], [A.b, A.a]].forEach(function(ea){ [[B.a, B.b], [B.b, B.a]].forEach(function(eb){
          if(!gleich(ea[0], eb[0])) return;
          var c = ea[0], u = sub(ea[1], c), v = sub(eb[1], c), lu = Math.hypot(u[0], u[1], u[2]), lv = Math.hypot(v[0], v[1], v[2]);
          if(lu < 1e-9 || lv < 1e-9 || Math.abs(dot(u, v)) > 1e-6 * lu * lv) return;
          var key = schluessel(c) + "|" + schluessel(norm(u)) + "|" + schluessel(norm(v)); if(gesehen[key]) return; gesehen[key] = 1;
          var r3 = Math.min(13 / k, lu * 0.3, lv * 0.3), un = norm(u), vn = norm(v), d = "";
          for(var n = 0; n <= 10; n++){ var w = n / 10 * Math.PI / 2, q = P([c[0] + r3 * (Math.cos(w) * un[0] + Math.sin(w) * vn[0]), c[1] + r3 * (Math.cos(w) * un[1] + Math.sin(w) * vn[1]), c[2] + r3 * (Math.cos(w) * un[2] + Math.sin(w) * vn[2])]); d += (n ? "L" : "M") + q[0].toFixed(1) + " " + q[1].toFixed(1); }
          sv.appendChild(el("path", { d: d, fill: "none", stroke: "#1a2233", "stroke-width": 1.6 }));
          var pk = P([c[0] + r3 * 0.38 * (un[0] + vn[0]), c[1] + r3 * 0.38 * (un[1] + vn[1]), c[2] + r3 * 0.38 * (un[2] + vn[2])]);
          sv.appendChild(el("circle", { cx: pk[0].toFixed(1), cy: pk[1].toFixed(1), r: 1.7, fill: "#1a2233" }));
        }); });
      }
    })();
    S.L.forEach(function(L){
      var a = P(L.a), b = P(L.b), mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
      if(L.art !== "kante"){ sv.appendChild(el("line", { x1: a[0].toFixed(1), y1: a[1].toFixed(1), x2: b[0].toFixed(1), y2: b[1].toFixed(1), "class": "ml " + L.art })); if(L.art === "r") sv.appendChild(el("circle", { cx: a[0].toFixed(1), cy: a[1].toFixed(1), r: 3.5, "class": "mp" })); }
      var dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy), nx = 1, ny = 0;
      if(l > 1){ nx = -dy / l; ny = dx / l; if((mx - W / 2) * nx + (my - H / 2) * ny < 0){ nx = -nx; ny = -ny; } }
      var off = L.art === "kante" ? 16 : 12, anc = nx > 0.45 ? "start" : nx < -0.45 ? "end" : "middle";
      sv.appendChild(el("text", { x: (mx + nx * off).toFixed(1), y: (my + ny * off + (ny > 0.45 ? 12 : ny < -0.45 ? -2 : 5)).toFixed(1), "class": "lab " + (L.cls || ""), style: "text-anchor:" + anc }, L.txt));
    });
  };

  // ---------- Körper: Netz, Beschriftung, Rechnung ----------
  // Rechnung: { py: [Zeilen] (Pythagoras), v: { n: [Namen], t: [Terme] }, o: {...}, weg: [Namen] }
  // Term: { s: Formel, z: mit Zahlen, v: Wert, neg: abziehen }
  function z(v){ return zahl(v); }
  function q(v){ return z(v) + "²"; }
  function k3(v){ return z(v) + "³"; }
  function T(s, zz, v, neg){ return { s: s, z: zz, v: v, neg: !!neg }; }
  function lab(a, b, txt, art, cls){ return { a: a, b: b, txt: txt, art: art || "kante", cls: cls || "" }; }
  function pyWurzel(sym, A, B, fa, fb){ // sym = √(A² + B²)
    var w = A * A + B * B, v = Math.sqrt(w);
    return { v: v, zeilen: [sym + " = √(" + fa + "² + " + fb + "²)", sym + " = √(" + q(A) + " + " + q(B) + ")", sym + " = √" + z(w), sym + " " + rel(v) + " " + z(v)] };
  }
  function nm(k, teil){ return t(k) + (teil ? " (" + t(teil) + ")" : ""); }
  var KOERPER = {
    wuerfel: { ein: [["a", "e_a", 4, 2, 10]],
      netz: function(d, F){ var h = d.a / 2; quader(F, [-h, h, 0, d.a, -h, h], 0); },
      lab: function(d){ var h = d.a / 2; return [lab([-h, 0, h], [h, 0, h], "a = " + z(d.a))]; },
      rechne: function(d){ return { v: { t: [T("a³", k3(d.a), Math.pow(d.a, 3))] }, o: { t: [T("6 · a²", "6 · " + q(d.a), 6 * d.a * d.a)] } }; } },
    quader: { ein: [["a", "e_l", 6, 2, 10], ["b", "e_b", 4, 2, 8], ["h", "e_h", 3, 2, 9]],
      netz: function(d, F){ quader(F, [-d.a / 2, d.a / 2, 0, d.h, -d.b / 2, d.b / 2], 0); },
      lab: function(d){ var x = d.a / 2, zz = d.b / 2; return [lab([-x, 0, zz], [x, 0, zz], "a = " + z(d.a)), lab([x, 0, zz], [x, 0, -zz], "b = " + z(d.b)), lab([x, 0, zz], [x, d.h, zz], "h = " + z(d.h))]; },
      rechne: function(d){ return { v: { t: [T("a · b · h", z(d.a) + " · " + z(d.b) + " · " + z(d.h), d.a * d.b * d.h)] },
        o: { t: [T("2 · a · b", "2 · " + z(d.a) + " · " + z(d.b), 2 * d.a * d.b), T("2 · a · h", "2 · " + z(d.a) + " · " + z(d.h), 2 * d.a * d.h), T("2 · b · h", "2 · " + z(d.b) + " · " + z(d.h), 2 * d.b * d.h)] } }; } },
    prisma: { ein: [["g", "e_g", 4, 2, 8], ["hd", "e_hd", 3, 2, 6], ["h", "e_h", 7, 4, 12]],
      netz: function(d, F){ prisma(F, d.g, d.hd, d.h, 0, 0); },
      lab: function(d){ var x = d.g / 2, L = d.h / 2; return [lab([-x, 0, L], [x, 0, L], "g = " + z(d.g)), lab([0, 0, L], [0, d.hd, L], "h_d = " + z(d.hd), "h", "h"), lab([x, 0, L], [x, 0, -L], "h = " + z(d.h)), lab([x, 0, L], [0, d.hd, L], "s", "kante", "s"), lab([0, 0, L], [x, 0, L], "g : 2", "r", "d")]; },
      rechne: function(d){ var P = pyWurzel("s", d.hd, d.g / 2, "h_d", "(g : 2)"), s = P.v;
        return { py: P.zeilen, v: { t: [T("½ · g · h_d · h", "½ · " + z(d.g) + " · " + z(d.hd) + " · " + z(d.h), d.g * d.hd * d.h / 2)] },
          o: { n: [t("f_grund"), t("f_seiten")], t: [T("2 · ½ · g · h_d", "2 · ½ · " + z(d.g) + " · " + z(d.hd), d.g * d.hd), T("(g + 2 · s) · h", "(" + z(d.g) + " + 2 · " + z(s) + ") · " + z(d.h), (d.g + 2 * s) * d.h)] } }; } },
    zylinder: { ein: [["r", "e_r", 3, 1, 6], ["h", "e_h", 6, 2, 12]],
      netz: function(d, F){ zylinder(F, d.r, 0, d.h, 0); },
      lab: function(d){ return [lab([0, d.h, 0], [d.r, d.h, 0], "r = " + z(d.r), "r", "d"), lab([0, 0, 0], [0, d.h, 0], "h = " + z(d.h), "h", "h")]; },
      rechne: function(d){ var r = d.r, h = d.h;
        return { v: { t: [T("π · r² · h", "π · " + q(r) + " · " + z(h), Math.PI * r * r * h)] },
          o: { n: [t("f_boden"), t("f_deckel"), t("f_mantel")], t: [T("π · r²", "π · " + q(r), Math.PI * r * r), T("π · r²", "π · " + q(r), Math.PI * r * r), T("2 · π · r · h", "2 · π · " + z(r) + " · " + z(h), 2 * Math.PI * r * h)] } }; } },
    pyramide: { ein: [["a", "e_a", 6, 2, 10], ["h", "e_h", 4, 2, 10]],
      netz: function(d, F){ pyramide(F, d.a, 0, d.h, 0); },
      lab: function(d){ var x = d.a / 2; return [lab([-x, 0, x], [x, 0, x], "a = " + z(d.a)), lab([0, 0, 0], [0, d.h, 0], "h = " + z(d.h), "h", "h"), lab([0, 0, x], [0, d.h, 0], "h_s", "s", "s"), lab([0, 0, 0], [0, 0, x], "a : 2", "r", "d")]; },
      rechne: function(d){ var P = pyWurzel("h_s", d.h, d.a / 2, "h", "(a : 2)"), hs = P.v;
        return { py: P.zeilen, v: { t: [T("⅓ · a² · h", "⅓ · " + q(d.a) + " · " + z(d.h), d.a * d.a * d.h / 3)] },
          o: { n: [t("f_grund"), t("f_seiten")], t: [T("a²", q(d.a), d.a * d.a), T("4 · ½ · a · h_s", "4 · ½ · " + z(d.a) + " · " + z(hs), 2 * d.a * hs)] } }; } },
    kegel: { ein: [["r", "e_r", 3, 1, 6], ["h", "e_h", 4, 2, 10]],
      netz: function(d, F){ kegel(F, d.r, 0, d.h, 0); },
      lab: function(d){ return [lab([0, 0, 0], [d.r, 0, 0], "r = " + z(d.r), "r", "d"), lab([0, 0, 0], [0, d.h, 0], "h = " + z(d.h), "h", "h"), lab([0, 0, d.r], [0, d.h, 0], "s", "s", "s")]; },
      rechne: function(d){ var P = pyWurzel("s", d.r, d.h, "r", "h"), s = P.v, r = d.r;
        return { py: P.zeilen, v: { t: [T("⅓ · π · r² · h", "⅓ · π · " + q(r) + " · " + z(d.h), Math.PI * r * r * d.h / 3)] },
          o: { n: [t("f_grund"), t("f_mantel")], t: [T("π · r²", "π · " + q(r), Math.PI * r * r), T("π · r · s", "π · " + z(r) + " · " + z(s), Math.PI * r * s)] } }; } },
    kugel: { ein: [["r", "e_r", 3, 1, 8]],
      netz: function(d, F){ var g = "g" + (++gid); halbkugel(F, d.r, 0, 0, { boden: false, g: g }); halbkugel(F, d.r, 0, 0, { boden: false, g: g, unten: true }); },
      lab: function(d){ return [lab([0, 0, 0], [d.r, 0, 0], "r = " + z(d.r), "r", "d")]; },
      rechne: function(d){ var r = d.r; return { v: { t: [T("4/3 · π · r³", "4/3 · π · " + k3(r), 4 / 3 * Math.PI * r * r * r)] }, o: { t: [T("4 · π · r²", "4 · π · " + q(r), 4 * Math.PI * r * r)] } }; } },
    halbkugel: { ein: [["r", "e_r", 3, 1, 8]],
      netz: function(d, F){ halbkugel(F, d.r, 0, 0); },
      lab: function(d){ return [lab([0, 0, 0], [d.r, 0, 0], "r = " + z(d.r), "r", "d")]; },
      rechne: function(d){ var r = d.r; return { v: { t: [T("⅔ · π · r³", "⅔ · π · " + k3(r), 2 / 3 * Math.PI * r * r * r)] },
        o: { n: [t("f_grund"), t("f_halbk")], t: [T("π · r²", "π · " + q(r), Math.PI * r * r), T("2 · π · r²", "2 · π · " + q(r), 2 * Math.PI * r * r)] } }; } },

    // ----- zusammengesetzt -----
    silo: { add: true, ein: [["r", "e_r", 3, 1, 5], ["h1", "e_h1", 8, 3, 10]],
      netz: function(d, F){ zylinder(F, d.r, 0, d.h1, 0, { oben: false }); halbkugel(F, d.r, d.h1, 1, { boden: false }); },
      lab: function(d){ return [lab([0, d.h1, 0], [d.r, d.h1, 0], "r = " + z(d.r), "r", "d"), lab([0, 0, 0], [0, d.h1, 0], "h₁ = " + z(d.h1), "h", "h")]; },
      rechne: function(d){ var r = d.r, h = d.h1, pi = Math.PI;
        return { v: { n: [t("k_zylinder"), t("k_halbkugel")], t: [T("π · r² · h₁", "π · " + q(r) + " · " + z(h), pi * r * r * h), T("⅔ · π · r³", "⅔ · π · " + k3(r), 2 / 3 * pi * r * r * r)] },
          o: { n: [t("f_boden"), t("f_mantel"), t("f_halbk")], t: [T("π · r²", "π · " + q(r), pi * r * r), T("2 · π · r · h₁", "2 · π · " + z(r) + " · " + z(h), 2 * pi * r * h), T("2 · π · r²", "2 · π · " + q(r), 2 * pi * r * r)] },
          weg: [nm("f_deckel", "k_zylinder"), nm("f_grund", "k_halbkugel")] }; } },
    haus: { add: true, ein: [["a", "e_a", 6, 2, 8], ["h1", "e_h1", 5, 2, 10], ["h2", "e_h2", 4, 2, 6]],
      netz: function(d, F){ var x = d.a / 2; quader(F, [-x, x, 0, d.h1, -x, x], 0, "oben"); pyramide(F, d.a, d.h1, d.h1 + d.h2, 1, { boden: false }); },
      lab: function(d){ var x = d.a / 2; return [lab([-x, 0, x], [x, 0, x], "a = " + z(d.a)), lab([x, 0, x], [x, d.h1, x], "h₁ = " + z(d.h1)), lab([0, d.h1, 0], [0, d.h1 + d.h2, 0], "h₂ = " + z(d.h2), "h", "h"), lab([0, d.h1, x], [0, d.h1 + d.h2, 0], "h_s", "s", "s"), lab([0, d.h1, 0], [0, d.h1, x], "a : 2", "r", "d")]; },
      rechne: function(d){ var a = d.a, P = pyWurzel("h_s", d.h2, a / 2, "h₂", "(a : 2)"), hs = P.v;
        return { py: P.zeilen, v: { n: [t("k_quader"), t("k_pyramide")], t: [T("a² · h₁", q(a) + " · " + z(d.h1), a * a * d.h1), T("⅓ · a² · h₂", "⅓ · " + q(a) + " · " + z(d.h2), a * a * d.h2 / 3)] },
          o: { n: [t("f_boden"), t("f_waende"), t("f_dach")], t: [T("a²", q(a), a * a), T("4 · a · h₁", "4 · " + z(a) + " · " + z(d.h1), 4 * a * d.h1), T("4 · ½ · a · h_s", "4 · ½ · " + z(a) + " · " + z(hs), 2 * a * hs)] },
          weg: [nm("f_deckel", "k_quader"), nm("f_grund", "k_pyramide")] }; } },
    rakete: { add: true, ein: [["r", "e_r", 2, 1, 3], ["h1", "e_h1", 10, 5, 12], ["h2", "e_h2", 3, 2, 5]],
      netz: function(d, F){ zylinder(F, d.r, 0, d.h1, 0, { oben: false }); kegel(F, d.r, d.h1, d.h1 + d.h2, 1, { boden: false }); },
      lab: function(d){ return [lab([0, 0, 0], [d.r, 0, 0], "r = " + z(d.r), "r", "d"), lab([0, 0, 0], [0, d.h1, 0], "h₁ = " + z(d.h1), "h", "h"), lab([0, d.h1, 0], [0, d.h1 + d.h2, 0], "h₂ = " + z(d.h2), "h", "h"), lab([0, d.h1, d.r], [0, d.h1 + d.h2, 0], "s", "s", "s")]; },
      rechne: function(d){ var r = d.r, pi = Math.PI, P = pyWurzel("s", r, d.h2, "r", "h₂"), s = P.v;
        return { py: P.zeilen, v: { n: [t("k_zylinder"), t("k_kegel")], t: [T("π · r² · h₁", "π · " + q(r) + " · " + z(d.h1), pi * r * r * d.h1), T("⅓ · π · r² · h₂", "⅓ · π · " + q(r) + " · " + z(d.h2), pi * r * r * d.h2 / 3)] },
          o: { n: [t("f_boden"), nm("f_mantel", "k_zylinder"), nm("f_mantel", "k_kegel")], t: [T("π · r²", "π · " + q(r), pi * r * r), T("2 · π · r · h₁", "2 · π · " + z(r) + " · " + z(d.h1), 2 * pi * r * d.h1), T("π · r · s", "π · " + z(r) + " · " + z(s), pi * r * s)] },
          weg: [nm("f_deckel", "k_zylinder"), nm("f_grund", "k_kegel")] }; } },
    eis: { add: true, ein: [["r", "e_r", 3, 2, 4], ["h", "e_h", 8, 5, 12]],
      netz: function(d, F){ kegel(F, d.r, d.h, 0, 1, { boden: false }); halbkugel(F, d.r, d.h, 3, { boden: false }); },
      lab: function(d){ return [lab([0, d.h, 0], [d.r, d.h, 0], "r = " + z(d.r), "r", "d"), lab([0, 0, 0], [0, d.h, 0], "h = " + z(d.h), "h", "h"), lab([0, d.h, d.r], [0, 0, 0], "s", "s", "s")]; },
      rechne: function(d){ var r = d.r, pi = Math.PI, P = pyWurzel("s", r, d.h, "r", "h"), s = P.v;
        return { py: P.zeilen, v: { n: [t("k_kegel"), t("k_halbkugel")], t: [T("⅓ · π · r² · h", "⅓ · π · " + q(r) + " · " + z(d.h), pi * r * r * d.h / 3), T("⅔ · π · r³", "⅔ · π · " + k3(r), 2 / 3 * pi * r * r * r)] },
          o: { n: [t("f_mantel"), t("f_halbk")], t: [T("π · r · s", "π · " + z(r) + " · " + z(s), pi * r * s), T("2 · π · r²", "2 · π · " + q(r), 2 * pi * r * r)] },
          weg: [nm("f_grund", "k_kegel"), nm("f_grund", "k_halbkugel")] }; } },
    dach: { add: true, ein: [["a", "e_l", 10, 6, 12], ["b", "e_b", 6, 4, 8], ["h1", "e_h1", 4, 3, 6], ["d", "e_d", 4, 2, 5]],
      netz: function(d, F){ var x = d.b / 2, L = d.a / 2; quader(F, [-x, x, 0, d.h1, -L, L], 0, "oben"); prisma(F, d.b, d.d, d.a, d.h1, 2, { boden: false }); },
      lab: function(d){ var x = d.b / 2, L = d.a / 2; return [lab([x, 0, L], [x, 0, -L], "a = " + z(d.a)), lab([-x, 0, L], [x, 0, L], "b = " + z(d.b)), lab([-x, 0, L], [-x, d.h1, L], "h₁ = " + z(d.h1)), lab([0, d.h1, L], [0, d.h1 + d.d, L], "d = " + z(d.d), "h", "h"), lab([x, d.h1, L], [0, d.h1 + d.d, L], "s", "kante", "s")]; },
      rechne: function(d){ var a = d.a, b = d.b, P = pyWurzel("s", d.d, b / 2, "d", "(b : 2)"), s = P.v;
        return { py: P.zeilen, v: { n: [t("k_quader"), t("k_prisma")], t: [T("a · b · h₁", z(a) + " · " + z(b) + " · " + z(d.h1), a * b * d.h1), T("½ · b · d · a", "½ · " + z(b) + " · " + z(d.d) + " · " + z(a), b * d.d * a / 2)] },
          o: { n: [t("f_boden"), t("f_waende"), t("f_giebel"), t("f_dach")], t: [T("a · b", z(a) + " · " + z(b), a * b), T("2 · (a + b) · h₁", "2 · (" + z(a) + " + " + z(b) + ") · " + z(d.h1), 2 * (a + b) * d.h1), T("2 · ½ · b · d", "2 · ½ · " + z(b) + " · " + z(d.d), b * d.d), T("2 · a · s", "2 · " + z(a) + " · " + z(s), 2 * a * s)] },
          weg: [nm("f_deckel", "k_quader"), nm("f_boden", "k_prisma")] }; } },
    dpyr: { add: true, ein: [["a", "e_a", 6, 2, 10], ["h1", "e_h1", 4, 2, 10], ["h2", "e_h2", 7, 2, 12]],
      netz: function(d, F){ pyramide(F, d.a, 0, d.h1, 0, { boden: false }); pyramide(F, d.a, 0, -d.h2, 1, { boden: false }); },
      lab: function(d){ var x = d.a / 2; return [lab([-x, 0, x], [x, 0, x], "a = " + z(d.a)), lab([0, 0, 0], [0, d.h1, 0], "h₁ = " + z(d.h1), "h", "h"), lab([0, 0, 0], [0, -d.h2, 0], "h₂ = " + z(d.h2), "h", "h")]; },
      rechne: function(d){ var a = d.a, P1 = pyWurzel("h_s1", d.h1, a / 2, "h₁", "(a : 2)"), P2 = pyWurzel("h_s2", d.h2, a / 2, "h₂", "(a : 2)");
        return { py: P1.zeilen.concat(P2.zeilen), v: { n: [t("k_pyramide") + " 1", t("k_pyramide") + " 2"], t: [T("⅓ · a² · h₁", "⅓ · " + q(a) + " · " + z(d.h1), a * a * d.h1 / 3), T("⅓ · a² · h₂", "⅓ · " + q(a) + " · " + z(d.h2), a * a * d.h2 / 3)] },
          o: { n: [t("f_sOben"), t("f_sUnten")], t: [T("4 · ½ · a · h_s1", "4 · ½ · " + z(a) + " · " + z(P1.v), 2 * a * P1.v), T("4 · ½ · a · h_s2", "4 · ½ · " + z(a) + " · " + z(P2.v), 2 * a * P2.v)] },
          weg: [nm("f_grund", "k_pyramide") + " 1", nm("f_grund", "k_pyramide") + " 2"] }; } },
    qhz: { add: true, ein: [["a", "e_l", 20, 6, 20], ["b", "e_b", 9, 3, 10], ["h", "e_h", 18, 4, 12]],
      netz: function(d, F){ var x = d.b / 2, L = d.a / 2; quader(F, [-x, x, 0, d.h, -L, L], 0, "rechts"); halbzylinder(F, d.h / 2, x, d.h / 2, -L, L, 1); },
      lab: function(d){ var x = d.b / 2, L = d.a / 2; return [lab([-x, 0, L], [x, 0, L], "b = " + z(d.b)), lab([-x, 0, L], [-x, d.h, L], "h = " + z(d.h)), lab([-x, d.h, L], [-x, d.h, -L], "a = " + z(d.a)), lab([x, d.h / 2, L], [x + d.h / 2, d.h / 2, L], "r = h : 2", "r", "d")]; },
      rechne: function(d){ var a = d.a, b = d.b, h = d.h, r = h / 2, pi = Math.PI;
        return { v: { n: [t("k_quader"), t("k_halbzyl")], t: [T("a · b · h", z(a) + " · " + z(b) + " · " + z(h), a * b * h), T("½ · π · (h : 2)² · a", "½ · π · " + q(r) + " · " + z(a), pi * r * r * a / 2)] },
          o: { n: [t("f_aussen"), t("f_halbkreis"), t("f_mantel")], t: [T("2 · b · h + 2 · a · b + a · h", "2 · " + z(b) + " · " + z(h) + " + 2 · " + z(a) + " · " + z(b) + " + " + z(a) + " · " + z(h), 2 * b * h + 2 * a * b + a * h), T("π · (h : 2)²", "π · " + q(r), pi * r * r), T("π · (h : 2) · a", "π · " + z(r) + " · " + z(a), pi * r * a)] },
          weg: [nm("f_klebe", "k_quader"), nm("f_klebe", "k_halbzyl")] }; } },
    wpyr: { sub: true, ein: [["a", "e_a", 6, 3, 10], ["t", "e_t", 4, 2, 10]], passt: function(d){ return d.t <= d.a; },
      netz: function(d, F){ var x = d.a / 2; quader(F, [-x, x, 0, d.a, -x, x], 0, "oben"); pyramide(F, d.a, d.a, d.a - d.t, 2, { boden: false, inv: true }); },
      lab: function(d){ var x = d.a / 2; return [lab([-x, 0, x], [x, 0, x], "a = " + z(d.a)), lab([0, d.a, 0], [0, d.a - d.t, 0], "t = " + z(d.t), "h", "h"), lab([0, d.a, x], [0, d.a - d.t, 0], "h_s", "s", "s"), lab([0, d.a, 0], [0, d.a, x], "a : 2", "r", "d")]; },
      rechne: function(d){ var a = d.a, P = pyWurzel("h_s", d.t, a / 2, "t", "(a : 2)"), hs = P.v;
        return { py: P.zeilen, v: { n: [t("k_wuerfel"), t("k_pyramide")], t: [T("a³", k3(a), a * a * a), T("⅓ · a² · t", "⅓ · " + q(a) + " · " + z(d.t), a * a * d.t / 3, true)] },
          o: { n: [t("f_aussen"), t("f_innen")], t: [T("5 · a²", "5 · " + q(a), 5 * a * a), T("4 · ½ · a · h_s", "4 · ½ · " + z(a) + " · " + z(hs), 2 * a * hs)] },
          weg: [nm("f_deckel", "k_wuerfel")] }; } },
    wzyl: { sub: true, ein: [["a", "e_a", 6, 4, 10], ["r", "e_rl", 2, 1, 4]], passt: function(d){ return 2 * d.r < d.a; },
      netz: function(d, F){ var x = d.a / 2; quader(F, [-x, x, 0, d.a, -x, x], 0, "", kreis(d.r, d.a), kreis(d.r, 0)); zylinder(F, d.r, 0, d.a, 2, { oben: false, unten: false, inv: true }); },
      lab: function(d){ var x = d.a / 2; return [lab([-x, 0, x], [x, 0, x], "a = " + z(d.a)), lab([0, d.a, 0], [d.r, d.a, 0], "r = " + z(d.r), "r", "d")]; },
      rechne: function(d){ var a = d.a, r = d.r, pi = Math.PI;
        return { v: { n: [t("k_wuerfel"), t("k_zylinder")], t: [T("a³", k3(a), a * a * a), T("π · r² · a", "π · " + q(r) + " · " + z(a), pi * r * r * a, true)] },
          o: { n: [t("f_aussen"), t("f_oeffnung"), t("f_loch")], t: [T("6 · a²", "6 · " + q(a), 6 * a * a), T("2 · π · r²", "2 · π · " + q(r), 2 * pi * r * r, true), T("2 · π · r · a", "2 · π · " + z(r) + " · " + z(a), 2 * pi * r * a)] } }; } },
    wkeg: { sub: true, ein: [["a", "e_a", 8, 4, 10], ["r", "e_rl", 3, 1, 4], ["t", "e_t", 4, 2, 10]], passt: function(d){ return 2 * d.r < d.a && d.t <= d.a; },
      netz: function(d, F){ var x = d.a / 2; quader(F, [-x, x, 0, d.a, -x, x], 0, "", kreis(d.r, d.a)); kegel(F, d.r, d.a, d.a - d.t, 2, { boden: false, inv: true }); },
      lab: function(d){ var x = d.a / 2; return [lab([-x, 0, x], [x, 0, x], "a = " + z(d.a)), lab([0, d.a, 0], [d.r, d.a, 0], "r = " + z(d.r), "r", "d"), lab([0, d.a, 0], [0, d.a - d.t, 0], "t = " + z(d.t), "h", "h"), lab([0, d.a, d.r], [0, d.a - d.t, 0], "s", "s", "s")]; },
      rechne: function(d){ var a = d.a, r = d.r, pi = Math.PI, P = pyWurzel("s", r, d.t, "r", "t"), s = P.v;
        return { py: P.zeilen, v: { n: [t("k_wuerfel"), t("k_kegel")], t: [T("a³", k3(a), a * a * a), T("⅓ · π · r² · t", "⅓ · π · " + q(r) + " · " + z(d.t), pi * r * r * d.t / 3, true)] },
          o: { n: [t("f_aussen"), t("f_oeffnung"), t("f_mantel")], t: [T("6 · a²", "6 · " + q(a), 6 * a * a), T("π · r²", "π · " + q(r), pi * r * r, true), T("π · r · s", "π · " + z(r) + " · " + z(s), pi * r * s)] } }; } },
    kwue: { sub: true, ein: [["r", "e_r", 6, 3, 8], ["h", "e_h", 10, 6, 12], ["k", "e_k", 3, 1, 4]], passt: function(d){ return d.k / Math.SQRT2 < d.r * (1 - d.k / d.h); },
      netz: function(d, F){ var x = d.k / 2; kegel(F, d.r, 0, d.h, 0, { loch: [[-x, 0, -x], [x, 0, -x], [x, 0, x], [-x, 0, x]] }); quader(F, [-x, x, 0, d.k, -x, x], 2, "unten", null, null, true); },
      lab: function(d){ var x = d.k / 2; return [lab([0, 0, 0], [d.r, 0, 0], "r = " + z(d.r), "r", "d"), lab([0, d.k, 0], [0, d.h, 0], "h = " + z(d.h), "h", "h"), lab([0, 0, d.r], [0, d.h, 0], "s", "s", "s"), lab([-x, 0, x], [x, 0, x], "k = " + z(d.k))]; },
      rechne: function(d){ var r = d.r, k = d.k, pi = Math.PI, P = pyWurzel("s", r, d.h, "r", "h"), s = P.v;
        return { py: P.zeilen, v: { n: [t("k_kegel"), t("k_wuerfel")], t: [T("⅓ · π · r² · h", "⅓ · π · " + q(r) + " · " + z(d.h), pi * r * r * d.h / 3), T("k³", k3(k), k * k * k, true)] },
          o: { n: [t("f_grund"), t("f_oeffnung"), t("f_mantel"), t("f_innen")], t: [T("π · r²", "π · " + q(r), pi * r * r), T("k²", q(k), k * k, true), T("π · r · s", "π · " + z(r) + " · " + z(s), pi * r * s), T("5 · k²", "5 · " + q(k), 5 * k * k)] } }; } },
    pzyl: { sub: true, ein: [["a", "e_a", 11, 6, 12], ["h", "e_h", 9, 6, 12], ["r", "e_rl", 3, 1, 3], ["t", "e_t", 2, 1, 4]], passt: function(d){ return d.t < d.h && d.r < d.a / 2 * (1 - d.t / d.h); },
      netz: function(d, F){ pyramide(F, d.a, d.h, 0, 0, { loch: kreis(d.r, d.h) }); zylinder(F, d.r, d.h - d.t, d.h, 2, { oben: false, inv: true }); },
      lab: function(d){ var x = d.a / 2; return [lab([x, d.h, x], [x, d.h, -x], "a = " + z(d.a)), lab([0, 0, 0], [0, d.h - d.t, 0], "h = " + z(d.h), "h", "h"), lab([d.r, d.h, 0], [d.r, d.h - d.t, 0], "t = " + z(d.t), "h", "h"), lab([0, d.h, 0], [-d.r, d.h, 0], "r = " + z(d.r), "r", "d"), lab([0, d.h, x], [0, 0, 0], "h_s", "s", "s")]; },
      rechne: function(d){ var a = d.a, r = d.r, pi = Math.PI, P = pyWurzel("h_s", d.h, a / 2, "h", "(a : 2)"), hs = P.v;
        return { py: P.zeilen, v: { n: [t("k_pyramide"), t("k_zylinder")], t: [T("⅓ · a² · h", "⅓ · " + q(a) + " · " + z(d.h), a * a * d.h / 3), T("π · r² · t", "π · " + q(r) + " · " + z(d.t), pi * r * r * d.t, true)] },
          o: { n: [t("f_grund"), t("f_oeffnung"), t("f_seiten"), t("f_loch"), t("f_lochboden")], t: [T("a²", q(a), a * a), T("π · r²", "π · " + q(r), pi * r * r, true), T("4 · ½ · a · h_s", "4 · ½ · " + z(a) + " · " + z(hs), 2 * a * hs), T("2 · π · r · t", "2 · π · " + z(r) + " · " + z(d.t), 2 * pi * r * d.t), T("π · r²", "π · " + q(r), pi * r * r)] } }; } }
  };
  var GRUND = ["wuerfel", "quader", "prisma", "zylinder", "pyramide", "kegel", "kugel", "halbkugel"], ZUS = ["silo", "haus", "rakete", "eis", "dach", "dpyr", "qhz", "wpyr", "wzyl", "wkeg", "kwue", "pzyl"];
  function name(k){ return t(GRUND.indexOf(k) >= 0 ? "k_" + k : "z_" + k); }

  // Rechenweg-Zeilen für V oder O: Namen, Formel, Zahlen, Teilergebnisse, Ergebnis
  function verbinde(L, f){ return L.map(function(x, i){ return (i ? (x.neg ? " − " : " + ") : (x.neg ? "−" : "")) + f(x); }).join(""); }
  function zeilen(sym, R, einh){
    var Z = [], sum = 0; R.t.forEach(function(x){ sum += x.neg ? -x.v : x.v; });
    if(R.n) Z.push({ txt: esc(sym + " = " + R.n.map(function(n, i){ return (i ? (R.t[i].neg ? " − " : " + ") : "") + n; }).join("")), name: true });
    Z.push({ txt: bdi(sym + " = " + verbinde(R.t, function(x){ return x.s; })) });
    Z.push({ txt: bdi(sym + " = " + verbinde(R.t, function(x){ return x.z; })) });
    if(R.t.length > 1){ var alle = R.t.every(function(x){ return genau(x.v); }); Z.push({ txt: bdi(sym + " " + (alle ? "=" : "≈") + " " + verbinde(R.t, function(x){ return zahl(x.v); })) }); }
    Z.push({ txt: bdi(sym + " " + rel(sum) + " " + zahl(sum) + " " + einh), end: true });
    return { Z: Z, wert: sum };
  }
  function wegHtml(k, R, nur, e){
    e = e || "cm";
    var h = "";
    if(R.py && (nur !== "v")){ h += '<p class="muted">' + t("pyth") + "</p>" + R.py.map(function(s){ return "<p>" + bdi(s) + "</p>"; }).join(""); }
    function block(sym, X, einh, titel){ var Y = zeilen(sym, X, einh); h += "<h3>" + titel + "</h3>"; Y.Z.forEach(function(L){ h += '<p class="' + (L.end ? "ende" : L.name ? "namen" : "") + '">' + L.txt + "</p>"; }); }
    if(nur !== "o") block("V", R.v, e + "³", t("vol"));
    if(nur !== "v"){ block("O", R.o, e + "²", t("ofl")); if(R.weg) h += '<p class="muted">' + esc(t("weg", { f: R.weg.join(", ") })) + "</p>"; }
    return h;
  }
  function werte(k, roh){ var d = {}, ok = true; KOERPER[k].ein.forEach(function(e){ var v = lies(roh[e[0]]); if(!(v > 0)) ok = false; d[e[0]] = v; }); return ok ? d : null; }

  // ---------- Reiter Grundkörper / Zusammengesetzt ----------
  var ROH = {}, ART = { grund: "zylinder", zus: "silo" }, SZ = {}, EINH = { g: "cm", z: "cm" }, EINHEITEN = ["mm", "cm", "dm", "m"];
  function roh(k){ if(!ROH[k]){ ROH[k] = {}; KOERPER[k].ein.forEach(function(e){ ROH[k][e[0]] = String(e[2]); }); } return ROH[k]; }
  function wahlKnoepfe(p){
    var box = $(p + "Wahl"), L = p === "g" ? GRUND : ZUS, art = ART[p === "g" ? "grund" : "zus"]; box.innerHTML = "";
    L.forEach(function(k){ var b = document.createElement("button"); b.type = "button"; b.textContent = name(k); b.setAttribute("aria-pressed", k === art ? "true" : "false");
      b.addEventListener("click", function(){ ART[p === "g" ? "grund" : "zus"] = k; wahlKnoepfe(p); felder(p); rechne(p, true); }); box.appendChild(b); });
  }
  function felder(p){
    var k = ART[p === "g" ? "grund" : "zus"], box = $(p + "Eing"), R = roh(k); box.innerHTML = "";
    KOERPER[k].ein.forEach(function(e){
      var l = document.createElement("label"), s = document.createElement("span"), i = document.createElement("input");
      s.textContent = t(e[1]) + " ="; i.className = "zahl"; i.setAttribute("inputmode", "decimal"); i.setAttribute("autocomplete", "off"); i.value = komma() ? R[e[0]].replace(".", ",") : R[e[0]].replace(",", ".");
      i.addEventListener("input", function(){ R[e[0]] = i.value; rechne(p, false); });
      var u = document.createElement("span"); u.className = "einh"; u.textContent = EINH[p];
      l.appendChild(s); l.appendChild(i); l.appendChild(u); box.appendChild(l);
    });
    var l2 = document.createElement("div"), s2 = document.createElement("span"), w = document.createElement("div"); s2.textContent = t("einheit"); w.className = "wahl"; l2.className = "einhWahl";
    EINHEITEN.forEach(function(x){ var b = document.createElement("button"); b.type = "button"; b.textContent = x; b.setAttribute("aria-pressed", x === EINH[p] ? "true" : "false");
      b.addEventListener("click", function(){ EINH[p] = x; felder(p); rechne(p, false); $(p + "Masse").textContent = t("masse", { e: x }); }); w.appendChild(b); });
    l2.appendChild(s2); l2.appendChild(w); box.appendChild(l2);
  }
  // Legende der Formelzeichen unter dem Bild (aus den Beschriftungen + V, O, π)
  var SYM = {"de": {"_": "Bezeichnungen", "a": "Kante (Seite)", "b": "Kante", "g": "Grundseite des Dreiecks", "h": "Höhe", "h_d": "Höhe des Dreiecks", "h_s": "Seitenhöhe (Höhe einer Seitenfläche, Mitte der Kante bis zur Spitze)", "s_kegel": "Mantellinie (vom Rand der Grundfläche zur Spitze)", "s": "schräge Seite", "r": "Radius", "k": "Würfelkante", "t": "Tiefe der Aussparung", "d": "Höhe des Dachs", "h₁": "Höhe des unteren Teils", "h₂": "Höhe des oberen Teils", "a : 2": "halbe Kante (Mitte bis Kante)", "g : 2": "halbe Grundseite", "V": "Volumen", "O": "Oberfläche", "π": "Kreiszahl ≈ 3,14"}, "en": {"_": "Symbols", "a": "edge (side)", "b": "edge", "g": "base of the triangle", "h": "height", "h_d": "height of the triangle", "h_s": "slant height (height of a side face, from the middle of an edge to the apex)", "s_kegel": "slant height (from the edge of the base to the apex)", "s": "slanted side", "r": "radius", "k": "cube edge", "t": "depth of the cut-out", "d": "height of the roof", "h₁": "height of the lower part", "h₂": "height of the upper part", "a : 2": "half edge (centre to edge)", "g : 2": "half base", "V": "volume", "O": "surface area", "π": "pi ≈ 3.14"}, "es": {"_": "Símbolos", "a": "arista (lado)", "b": "arista", "g": "base del triángulo", "h": "altura", "h_d": "altura del triángulo", "h_s": "apotema (altura de una cara lateral, del medio de la arista a la cúspide)", "s_kegel": "generatriz (del borde de la base a la cúspide)", "s": "lado inclinado", "r": "radio", "k": "arista del cubo", "t": "profundidad del hueco", "d": "altura del tejado", "h₁": "altura de la parte inferior", "h₂": "altura de la parte superior", "a : 2": "media arista (centro hasta la arista)", "g : 2": "media base", "V": "volumen", "O": "área total", "π": "pi ≈ 3,14"}, "zh": {"_": "符号", "a": "棱（边）", "b": "棱", "g": "三角形的底边", "h": "高", "h_d": "三角形的高", "h_s": "斜高（侧面的高，从棱中点到顶点）", "s_kegel": "母线（从底面边缘到顶点）", "s": "斜边", "r": "半径", "k": "正方体的棱", "t": "挖去部分的深度", "d": "屋顶的高", "h₁": "下部的高", "h₂": "上部的高", "a : 2": "半条棱（中心到棱）", "g : 2": "底边的一半", "V": "体积", "O": "表面积", "π": "圆周率 ≈ 3.14"}, "fr": {"_": "Notations", "a": "arête (côté)", "b": "arête", "g": "base du triangle", "h": "hauteur", "h_d": "hauteur du triangle", "h_s": "apothème (hauteur d’une face latérale, du milieu de l’arête au sommet)", "s_kegel": "génératrice (du bord de la base au sommet)", "s": "côté oblique", "r": "rayon", "k": "arête du cube", "t": "profondeur de l’évidement", "d": "hauteur du toit", "h₁": "hauteur de la partie basse", "h₂": "hauteur de la partie haute", "a : 2": "demi-arête (centre jusqu’à l’arête)", "g : 2": "demi-base", "V": "volume", "O": "aire totale", "π": "pi ≈ 3,14"}, "ru": {"_": "Обозначения", "a": "ребро (сторона)", "b": "ребро", "g": "основание треугольника", "h": "высота", "h_d": "высота треугольника", "h_s": "апофема (высота боковой грани, от середины ребра до вершины)", "s_kegel": "образующая (от края основания до вершины)", "s": "наклонная сторона", "r": "радиус", "k": "ребро куба", "t": "глубина выемки", "d": "высота крыши", "h₁": "высота нижней части", "h₂": "высота верхней части", "a : 2": "половина ребра (от центра до ребра)", "g : 2": "половина основания", "V": "объём", "O": "площадь поверхности", "π": "число пи ≈ 3,14"}, "ar": {"_": "الرموز", "a": "الحرف (الضلع)", "b": "الحرف", "g": "قاعدة المثلث", "h": "الارتفاع", "h_d": "ارتفاع المثلث", "h_s": "الارتفاع الجانبي (ارتفاع وجه جانبي، من منتصف الحرف إلى الرأس)", "s_kegel": "الراسم (من حافة القاعدة إلى الرأس)", "s": "ضلع مائل", "r": "نصف القطر", "k": "حرف المكعب", "t": "عمق التجويف", "d": "ارتفاع السقف", "h₁": "ارتفاع الجزء السفلي", "h₂": "ارتفاع الجزء العلوي", "a : 2": "نصف الحرف (من المركز إلى الحرف)", "g : 2": "نصف القاعدة", "V": "الحجم", "O": "المساحة الكلية", "π": "باي ≈ 3.14"}, "ja": {"_": "記号", "a": "辺", "b": "辺", "g": "三角形の底辺", "h": "高さ", "h_d": "三角形の高さ", "h_s": "側面の高さ（辺の中点から頂点まで）", "s_kegel": "母線（底面のふちから頂点まで）", "s": "ななめの辺", "r": "半径", "k": "立方体の辺", "t": "くりぬいた部分の深さ", "d": "屋根の高さ", "h₁": "下の部分の高さ", "h₂": "上の部分の高さ", "a : 2": "辺の半分（中心から辺まで）", "g : 2": "底辺の半分", "V": "体積", "O": "表面積", "π": "円周率 ≈ 3.14"}, "pt": {"_": "Símbolos", "a": "aresta (lado)", "b": "aresta", "g": "base do triângulo", "h": "altura", "h_d": "altura do triângulo", "h_s": "apótema (altura de uma face lateral, do meio da aresta ao vértice)", "s_kegel": "geratriz (da borda da base ao vértice)", "s": "lado inclinado", "r": "raio", "k": "aresta do cubo", "t": "profundidade do recorte", "d": "altura do telhado", "h₁": "altura da parte de baixo", "h₂": "altura da parte de cima", "a : 2": "meia aresta (centro até a aresta)", "g : 2": "meia base", "V": "volume", "O": "área total", "π": "pi ≈ 3,14"}};
  function legende(k, L){
    var S0 = SYM[lang] || SYM.de, kegelig = /kegel|rakete|eis|wkeg|kwue/.test(k), seen = {}, teile = [];
    L.forEach(function(x){ var sym = String(x.txt || "").split(" = ")[0].trim(); if(!sym || seen[sym]) return; seen[sym] = 1;
      var e = sym === "s" && kegelig ? S0.s_kegel : S0[sym]; if(e) teile.push(sym + " = " + e); });
    ["V", "O", "π"].forEach(function(x){ teile.push(x + " = " + S0[x]); });
    return S0._ + ": " + teile.join(" · ");
  }
  function legSetzen(id, k, L){ var e = $(id); if(e) e.textContent = legende(k, L); }
  function rechne(p, neuBild){
    var k = ART[p === "g" ? "grund" : "zus"], K = KOERPER[k], d = werte(k, roh(k)), fe = "";
    if(!d) fe = t("fehler"); else if(K.passt && !K.passt(d)) fe = t("fehlerPasst");
    $(p + "Fehler").textContent = fe;
    if(!SZ[p]) SZ[p] = new Szene($(p + "Svg"));
    if(fe){ $(p + "Rechnung").innerHTML = ""; SZ[p].F = []; SZ[p].zeichne(); return; }
    var F = []; K.netz(d, F); SZ[p].setze(F, K.lab(d)); legSetzen(p + "Leg", k, K.lab(d));
    $(p + "Rechnung").innerHTML = wegHtml(k, K.rechne(d), null, EINH[p]);
    $(p + "Merke").textContent = t(p === "g" ? "merkeGrund" : K.sub ? "merkeSub" : "merkeAdd");
  }

  // ---------- Reiter Üben ----------
  var auf = null, punkte = 0, anzahl = 0, versuche = 0, fertig = false, letzte = null, uSz = null;
  function neueAufgabe(){
    var k = wahl(GRUND.concat(ZUS)), K = KOERPER[k], d;
    do { d = {}; K.ein.forEach(function(e){ d[e[0]] = zuf(e[3], e[4]); }); } while(K.passt && !K.passt(d));
    auf = { k: k, d: d, was: Math.random() < 0.5 ? "v" : "o" }; versuche = 0; fertig = false; letzte = null;
    if(!uSz) uSz = new Szene($("uSvg"));
    var F = []; K.netz(d, F); uSz.setze(F, K.lab(d)); legSetzen("uLeg", k, K.lab(d)); zeige();
  }
  function loesung(){ var R = KOERPER[auf.k].rechne(auf.d), Y = zeilen(auf.was === "v" ? "V" : "O", R[auf.was], ""); return { R: R, l: Y.wert }; }
  function zeige(){
    $("auftrag").innerHTML = "<b>" + esc(name(auf.k)) + "</b><br>" + t(auf.was === "v" ? "u_vol" : "u_ofl");
    var Z = $("antwortzeile"); Z.innerHTML = "";
    var inp = document.createElement("input"); inp.className = "zahl"; inp.id = "uAntwort"; inp.setAttribute("inputmode", "decimal"); inp.setAttribute("autocomplete", "off"); inp.style.width = "150px";
    inp.addEventListener("keydown", function(e){ if(e.key === "Enter") pruefe(inp.value); });
    var ein = document.createElement("span"); ein.className = "einh"; ein.textContent = auf.was === "v" ? "cm³" : "cm²";
    var pb = document.createElement("button"); pb.type = "button"; pb.className = "knopf"; pb.id = "pruefen"; pb.textContent = t("pruefen"); pb.addEventListener("click", function(){ pruefe(inp.value); });
    var h = document.createElement("span"); h.className = "muted"; h.textContent = t("runden");
    Z.appendChild(inp); Z.appendChild(ein); Z.appendChild(pb); Z.appendChild(h);
    $("meldung").textContent = ""; $("meldung").className = "meldung"; $("uLauf").innerHTML = ""; sicht($("uLauf"), false);
    $("uMasse").textContent = t("masse", { e: "cm" }); $("uDrehen").textContent = t("drehen");
    $("weiter").textContent = t("weiterA"); $("punkte").textContent = t("punkte", { p: punkte, n: anzahl });
  }
  function abschluss(ok){
    var L = loesung(), m = $("meldung"), lt = rel(L.l) + " " + zahl(L.l) + (auf.was === "v" ? " cm³" : " cm²");
    m.className = "meldung " + (ok ? "gut" : "schlecht"); m.innerHTML = ok ? t("richtig") + " " + bdi(lt) : t("falsch", { l: bdi(lt) });
    $("uLauf").innerHTML = wegHtml(auf.k, L.R, auf.was); sicht($("uLauf"), true);
    $("pruefen").disabled = true; $("punkte").textContent = t("punkte", { p: punkte, n: anzahl });
  }
  function pruefe(e){
    if(fertig) return; var v = lies(e); if(!isFinite(v)) return;
    var l = loesung().l, ok = Math.abs(v - l) <= Math.max(0.02, l * 0.005); letzte = e;
    if(!ok && versuche === 0){ versuche = 1; var m = $("meldung"); m.className = "meldung schlecht"; m.textContent = t("nochmal"); return; }
    fertig = true; anzahl++; if(ok) punkte++; abschluss(ok);
  }
  $("weiter").addEventListener("click", neueAufgabe);

  // ---------- Reiter & Texte ----------
  var tab = "grund", TABS = ["grund", "zus", "ueben"];
  function zeigeTab(k){
    tab = k;
    document.querySelectorAll(".tabs button").forEach(function(b){ b.setAttribute("aria-selected", b.dataset.tab === k ? "true" : "false"); });
    TABS.forEach(function(x){ sicht($("s_" + x), x === k); });
    if(k === "ueben" && !auf) neueAufgabe();
    if(k === "grund") rechne("g", true); else if(k === "zus") rechne("z", true);
  }
  document.querySelectorAll(".tabs button").forEach(function(b){ b.addEventListener("click", function(){ zeigeTab(b.dataset.tab); }); });
  function alles(){
    document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = "miStudia – " + t("titel"); $("titel").textContent = t("titel");
    document.querySelectorAll(".tabs button").forEach(function(b){ b.textContent = t("tab_" + b.dataset.tab); });
    ["g", "z"].forEach(function(p){ wahlKnoepfe(p); felder(p); $(p + "Drehen").textContent = t("drehen"); $(p + "Masse").textContent = t("masse", { e: EINH[p] }); });
    if(tab === "grund") rechne("g", true); else if(tab === "zus") rechne("z", true);
    if(auf) legSetzen("uLeg", auf.k, KOERPER[auf.k].lab(auf.d));
    if(auf){ var war = fertig, e = letzte, gut = $("meldung").classList.contains("gut"), vs = versuche; zeige();
      if(war){ $("uAntwort").value = e; abschluss(gut); } else if(vs && e != null){ $("uAntwort").value = e; var m = $("meldung"); m.className = "meldung schlecht"; m.textContent = t("nochmal"); } }
  }
  // Alltagsbeispiel „Ausprobieren“: Körper mit Maßen in den passenden Reiter laden
  window.KO_LADEN = function(w){
    if(!KOERPER[w.k]) return; var g = GRUND.indexOf(w.k) >= 0, p = g ? "g" : "z"; ART[g ? "grund" : "zus"] = w.k; ROH[w.k] = {};
    for(var x in w.d) ROH[w.k][x] = String(w.d[x]);
    EINH[p] = w.e || "cm"; $(p + "Masse").textContent = t("masse", { e: EINH[p] });
    wahlKnoepfe(p); felder(p); zeigeTab(g ? "grund" : "zus"); window.scrollTo(0, 0);
  };
  window.MS_LANG = { apply: function(l){ if(KO[l]){ lang = l; alles(); } } };
  alles();
})();
