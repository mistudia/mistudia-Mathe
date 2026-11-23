// ============================================================
// winkel/app.js – Winkel: Schätzen, Messen, Winkelarten, Winkel an Parallelen
// Texte: winkel/texte.js (WK), Sprache aus dem Startmenü (MS_LANG).
// ============================================================
(function(){
  "use strict";
  var NS = "http://www.w3.org/2000/svg", lang = "de";
  try { lang = localStorage.getItem("msMathLang") || "de"; } catch(e){}
  if(!WK[lang]) lang = "de";
  function $(id){ return document.getElementById(id); }
  function t(k, v){ var s = (WK[lang] && WK[lang][k] != null) ? WK[lang][k] : WK.de[k]; if(s == null) return k; if(v) for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  function zuf(a, b){ return a + Math.floor(Math.random() * (b - a + 1)); }
  function wahl(L){ return L[Math.floor(Math.random() * L.length)]; }
  function lies(s){ s = String(s).trim().replace(/[°\s]/g, "").replace(",", "."); return /^-?\d*\.?\d+$/.test(s) ? +s : NaN; }
  var RAD = Math.PI / 180;
  function P(cx, cy, r, d){ return [cx + r * Math.cos(d * RAD), cy - r * Math.sin(d * RAD)]; }
  function sektor(cx, cy, r, a1, a2){ // gegen den Uhrzeigersinn von a1 nach a2 (Grad)
    var w = a2 - a1; if(w >= 359.999) return "M" + (cx - r) + " " + cy + " a" + r + " " + r + " 0 1 0 " + 2 * r + " 0 a" + r + " " + r + " 0 1 0 " + (-2 * r) + " 0Z";
    var p1 = P(cx, cy, r, a1), p2 = P(cx, cy, r, a2);
    return "M" + cx + " " + cy + " L" + p1[0] + " " + p1[1] + " A" + r + " " + r + " 0 " + (w > 180 ? 1 : 0) + " 0 " + p2[0] + " " + p2[1] + "Z";
  }
  function el(n, a, txt){ var e = document.createElementNS(NS, n); for(var k in a) if(a[k] != null) e.setAttribute(k, a[k]); if(txt != null) e.textContent = txt; return e; }
  function leer(s){ while(s.lastChild) s.removeChild(s.lastChild); }
  function txt(sv, x, y, s, a){ var o = { x: x, y: y, "text-anchor": "middle", "font-family": "system-ui, sans-serif", "font-weight": 700, "font-size": 16, fill: "#1a2233", "paint-order": "stroke", stroke: "#ffffff", "stroke-width": 4 }; for(var k in a) o[k] = a[k]; sv.appendChild(el("text", o, s)); }

  // ---------- Schätzen ----------
  var SCH = { n: 1, p: 0, s: 0, w: 0, fertig: false, est: null };
  function schNeu(){ SCH.s = wahl([0, 30, 60, 90, 120, 180, 210, 270, 300]); SCH.w = zuf(8, 352); SCH.est = null; SCH.fertig = false; $("schEin").value = ""; $("schMeld").textContent = ""; $("schMeld").className = "meldung"; schZeichnen(); schTexte(); }
  function schZeichnen(){
    var sv = $("schSvg"); leer(sv); var c = 160;
    sv.appendChild(el("circle", { cx: c, cy: c, r: 146, fill: "#ffffff", stroke: "#64748b", "stroke-width": 2 }));
    sv.appendChild(el("circle", { cx: c, cy: c, r: 130, fill: "#ffffff", stroke: "#64748b", "stroke-width": 2 }));
    sv.appendChild(el("path", { d: sektor(c, c, 126, SCH.s, SCH.s + SCH.w), fill: "#22c55e", stroke: "#1a2233", "stroke-width": 2, "stroke-linejoin": "round" }));
    for(var d = 0; d < 360; d += 30){ var a = P(c, c, 122, d), b = P(c, c, 152, d); sv.appendChild(el("line", { x1: a[0], y1: a[1], x2: b[0], y2: b[1], stroke: "#1a2233", "stroke-width": 2 })); }
    if(SCH.fertig){
      var e = P(c, c, 140, SCH.s + SCH.est); if(SCH.est !== null) sv.appendChild(el("line", { x1: c, y1: c, x2: e[0], y2: e[1], stroke: "#dc2626", "stroke-width": 3, "stroke-dasharray": "7 5" }));
      var m = P(c, c, 70, SCH.s + SCH.w / 2); txt(sv, m[0], m[1] + 6, SCH.w + "°", { "font-size": 22, fill: "#14532d" });
    }
  }
  function schTexte(){
    $("schRunde").textContent = t("runde", { n: SCH.n }); $("schPunkte").textContent = t("punkte", { p: SCH.p });
    $("schWeiter").textContent = SCH.n >= 10 && SCH.fertig ? t("nochmal") : t("weiter");
  }
  function schPruefen(){
    if(SCH.fertig) return; var e = lies($("schEin").value); if(!isFinite(e)) return;
    if(window.MS_LEER_LOES){   // Prüfen ohne Eingabe: nur die Lösung zeigen, keine Schätzung werten
      SCH.fertig = true; $("schEin").value = ""; $("schMeld").textContent = t("istL", { w: SCH.w }) + (SCH.n >= 10 ? " " + t("ende", { p: SCH.p }) : ""); $("schMeld").className = "meldung schlecht";
      $("schWeiter").hidden = false; SCH.est = null; schZeichnen(); schTexte(); $("schWeiter").focus(); return;
    }
    SCH.est = Math.max(0, Math.min(360, e)); SCH.fertig = true;
    var d = Math.round(Math.abs(SCH.est - SCH.w)), pk = d <= 5 ? 3 : d <= 10 ? 2 : d <= 20 ? 1 : 0; SCH.p += pk;
    $("schMeld").textContent = t("sch" + pk, { d: d }) + " " + t("istL", { w: SCH.w }) + (SCH.n >= 10 ? " " + t("ende", { p: SCH.p }) : "");
    $("schMeld").className = "meldung " + (pk >= 2 ? "gut" : pk === 0 ? "schlecht" : "");
    $("schWeiter").hidden = false; schZeichnen(); schTexte(); $("schWeiter").focus();
  }
  $("schPr").addEventListener("click", schPruefen);
  $("schEin").addEventListener("keydown", function(e){ if(e.key === "Enter"){ e.preventDefault(); schPruefen(); } });
  $("schWeiter").addEventListener("click", function(){ if(SCH.n >= 10){ SCH.n = 1; SCH.p = 0; } else SCH.n++; $("schWeiter").hidden = true; schNeu(); $("schEin").focus(); });

  // ---------- Messen ----------
  var MS = { w: 60, seite: "r", geprueft: false, ok: 0, n: 0 };
  function messNeu(){ MS.w = zuf(12, 168); MS.seite = wahl(["r", "l"]); MS.geprueft = false; $("messEin").value = ""; $("messMeld").textContent = ""; $("messMeld").className = "meldung"; messZeichnen(); }
  function messZeichnen(){
    var sv = $("messSvg"); leer(sv); var cx = 260, cy = 262, R = 210;
    sv.appendChild(el("path", { d: "M" + (cx - R) + " " + cy + " A" + R + " " + R + " 0 0 1 " + (cx + R) + " " + cy + " Z", fill: "rgba(219,234,254,0.75)", stroke: "#1d4ed8", "stroke-width": 2 }));
    sv.appendChild(el("path", { d: "M" + (cx - 70) + " " + cy + " A70 70 0 0 1 " + (cx + 70) + " " + cy, fill: "none", stroke: "#93c5fd", "stroke-width": 1.5 }));
    for(var d = 0; d <= 180; d++){
      var l = d % 10 === 0 ? 16 : d % 5 === 0 ? 11 : 6, a = P(cx, cy, R, d), b = P(cx, cy, R - l, d);
      sv.appendChild(el("line", { x1: a[0], y1: a[1], x2: b[0], y2: b[1], stroke: "#1e3a8a", "stroke-width": d % 10 === 0 ? 1.6 : 1 }));
      if(d % 10 === 0){
        var o = P(cx, cy, R - 30, d), i = P(cx, cy, R - 52, d);
        sv.appendChild(el("text", { x: o[0], y: o[1] + 5, "text-anchor": "middle", "font-family": "system-ui, sans-serif", "font-size": 13, "font-weight": 700, fill: "#1e3a8a", transform: "rotate(" + (90 - d) + " " + o[0] + " " + o[1] + ")" }, String(d)));
        sv.appendChild(el("text", { x: i[0], y: i[1] + 4, "text-anchor": "middle", "font-family": "system-ui, sans-serif", "font-size": 11, "font-weight": 700, fill: "#b45309", transform: "rotate(" + (90 - d) + " " + i[0] + " " + i[1] + ")" }, String(180 - d)));
      }
    }
    sv.appendChild(el("line", { x1: cx - R - 20, y1: cy, x2: cx + R + 20, y2: cy, stroke: "#1e3a8a", "stroke-width": 1.5 }));
    var d1 = MS.seite === "r" ? 0 : 180, d2 = MS.seite === "r" ? MS.w : 180 - MS.w, lo = Math.min(d1, d2), hi = Math.max(d1, d2);
    sv.appendChild(el("path", { d: sektor(cx, cy, 44, lo, hi), fill: "rgba(34,197,94,0.35)", stroke: "#15803d", "stroke-width": 2 }));
    [d1, d2].forEach(function(d){ var e = P(cx, cy, R + 22, d); sv.appendChild(el("line", { x1: cx, y1: cy, x2: e[0], y2: e[1], stroke: "#b91c1c", "stroke-width": 3.5, "stroke-linecap": "round" })); });
    sv.appendChild(el("circle", { cx: cx, cy: cy, r: 4.5, fill: "#b91c1c" }));
    if(MS.geprueft){ var m = P(cx, cy, 100, (lo + hi) / 2); txt(sv, m[0], m[1] + 6, MS.w + "°", { "font-size": 20, fill: "#15803d" }); }
  }
  function messPruefen(){
    if(MS.geprueft) return; var e = lies($("messEin").value); if(!isFinite(e)) return;
    MS.geprueft = true; MS.n++; var ok = Math.abs(e - MS.w) <= 1; if(ok) MS.ok++;
    var sk = t(MS.seite === "r" ? "aussen" : "innen");
    $("messMeld").textContent = ok ? t("messOk", { s: sk }) : t("messFalsch", { w: MS.w, s: sk });
    $("messMeld").className = "meldung " + (ok ? "gut" : "schlecht"); $("messPunkte").textContent = MS.ok + " / " + MS.n; messZeichnen();
  }
  $("messPr").addEventListener("click", messPruefen);
  $("messEin").addEventListener("keydown", function(e){ if(e.key === "Enter"){ e.preventDefault(); if(MS.geprueft){ messNeu(); } else messPruefen(); } });
  $("messWeiter").addEventListener("click", function(){ messNeu(); $("messEin").focus(); });

  // ---------- Winkelarten ----------
  var ARTEN = ["null", "spitz", "recht", "stumpf", "gestreckt", "ueber", "voll"];
  function artVon(w){ return w <= 0 ? "null" : w < 90 ? "spitz" : w === 90 ? "recht" : w < 180 ? "stumpf" : w === 180 ? "gestreckt" : w < 360 ? "ueber" : "voll"; }
  function winkelBild(sv, w, start, beschr, farbe){
    leer(sv); var c = [160, 160], L = 128, s0 = start || 0;
    var f = farbe || "#22c55e";
    if(w > 0) sv.appendChild(el("path", { d: sektor(c[0], c[1], w === 90 ? 0.01 : 44, s0, s0 + w), fill: f, "fill-opacity": 0.35, stroke: f, "stroke-width": 2 }));
    if(w === 90){ var a = P(c[0], c[1], 22, s0), b = P(c[0], c[1], 22, s0 + 90), q = [a[0] + b[0] - c[0], a[1] + b[1] - c[1]]; sv.appendChild(el("path", { d: "M" + a[0] + " " + a[1] + " L" + q[0] + " " + q[1] + " L" + b[0] + " " + b[1], fill: "none", stroke: "#1a2233", "stroke-width": 2 })); sv.appendChild(el("circle", { cx: (c[0] + q[0]) / 2, cy: (c[1] + q[1]) / 2, r: 2.5, fill: "#1a2233" })); }
    [s0, s0 + w].forEach(function(d, i){ var e = P(c[0], c[1], L, d); sv.appendChild(el("line", { x1: c[0], y1: c[1], x2: e[0], y2: e[1], stroke: i ? "#1d4ed8" : "#1a2233", "stroke-width": 4, "stroke-linecap": "round" })); });
    sv.appendChild(el("circle", { cx: c[0], cy: c[1], r: 5, fill: "#1a2233" }));
    if(beschr){ var m = P(c[0], c[1], w > 300 ? 66 : 74, s0 + Math.max(w, 1) / 2); txt(sv, m[0], m[1] + 6, beschr, { "font-size": 19, fill: "#14532d" }); }
  }
  function artZeigen(){
    var w = +$("artR").value, a = artVon(w);
    $("artW").textContent = w + "°"; winkelBild($("artSvg"), w, 0, "α = " + w + "°");
    $("artName").textContent = t("a_" + a); $("artDef").textContent = "α " + t("d_" + a);
    $("artListe").innerHTML = ARTEN.map(function(k){ return '<button type="button" data-a="' + k + '" aria-pressed="' + (k === a) + '">' + t("a_" + k) + "</button>"; }).join("");
    $("artListe").querySelectorAll("button").forEach(function(b){ b.addEventListener("click", function(){ var k = b.dataset.a; $("artR").value = { null: 0, spitz: 45, recht: 90, stumpf: 130, gestreckt: 180, ueber: 250, voll: 360 }[k]; artZeigen(); }); });
  }
  $("artR").addEventListener("input", artZeigen);
  var QZ = { w: 0, s: 0, a: "", fertig: false, ok: 0, n: 0, gew: null };
  function quizNeu(){
    var a = wahl(ARTEN.concat(["spitz", "stumpf", "ueber"])), w = { null: 0, spitz: zuf(10, 80), recht: 90, stumpf: zuf(100, 170), gestreckt: 180, ueber: zuf(195, 345), voll: 360 }[a];
    QZ.w = w; QZ.a = a; QZ.s = wahl([0, 15, 30, 45, 90, 120, 200, 270]); QZ.fertig = false; QZ.gew = null; quizZeigen();
  }
  function quizZeigen(){
    winkelBild($("quizSvg"), QZ.w, QZ.s, QZ.fertig ? QZ.w + "°" : "", "#2563eb");
    $("quizWahl").innerHTML = ARTEN.map(function(k){ var cls = QZ.fertig ? (k === QZ.a ? "richtig" : k === QZ.gew ? "falsch" : "") : ""; return '<button type="button" data-a="' + k + '" class="' + cls + '">' + t("a_" + k) + "</button>"; }).join("");
    $("quizWahl").querySelectorAll("button").forEach(function(b){ b.addEventListener("click", function(){
      if(QZ.fertig) return; QZ.fertig = true; QZ.gew = b.dataset.a; QZ.n++; var ok = QZ.gew === QZ.a; if(ok) QZ.ok++;
      $("quizMeld").textContent = ok ? t("artRichtig") : t("artFalsch", { a: t("a_" + QZ.a) }); $("quizMeld").className = "meldung " + (ok ? "gut" : "schlecht"); quizZeigen();
    }); });
    $("quizPunkte").textContent = QZ.ok + " / " + QZ.n;
    if(!QZ.fertig){ $("quizMeld").textContent = ""; $("quizMeld").className = "meldung"; }
  }
  $("quizWeiter").addEventListener("click", quizNeu);

  // ---------- Winkel an Parallelen ----------
  var NAMEN = ["α", "β", "γ", "δ"], STR = "′";
  var PAARE = { scheitel: [["α", 1], ["γ", 1]], neben: [["α", 1], ["β", 1]], stufen: [["α", 1], ["α", 2]], wechsel: [["γ", 1], ["α", 2]], nachbar: [["δ", 1], ["α", 2]] };
  var paar = "stufen";
  function parGeo(phi){
    var S1 = [300, 105], h = 130, S2 = [300 - h * Math.cos(phi * RAD) / Math.sin(phi * RAD), 235];
    return { S1: S1, S2: S2, gy: 105, hy: 235 };
  }
  function bereich(n, phi){ return { "α": [0, phi], "β": [phi, 180], "γ": [180, 180 + phi], "δ": [180 + phi, 360] }[n]; }
  function wertVon(n, phi){ return n === "α" || n === "γ" ? phi : 180 - phi; }
  // mark: { "α1": {f: Farbe, t: Text} }
  function parZeichnen(sv, phi, mark){
    leer(sv); var G = parGeo(phi), u = [Math.cos(phi * RAD), -Math.sin(phi * RAD)];
    [G.gy, G.hy].forEach(function(y, i){ sv.appendChild(el("line", { x1: 10, y1: y, x2: 510, y2: y, stroke: "#1a2233", "stroke-width": 3 })); txt(sv, 500, y - 10, i ? "h" : "g", { "font-style": "italic", "font-size": 18 }); });
    var a = [G.S1[0] + u[0] * 95, G.S1[1] + u[1] * 95], b = [G.S2[0] - u[0] * 95, G.S2[1] - u[1] * 95];
    sv.appendChild(el("line", { x1: a[0], y1: a[1], x2: b[0], y2: b[1], stroke: "#7c3aed", "stroke-width": 3 })); txt(sv, a[0] + 12, a[1] + 4, "s", { "font-style": "italic", "font-size": 18, fill: "#7c3aed" });
    [G.S1, G.S2].forEach(function(S, i){
      NAMEN.forEach(function(n){
        var key = n + (i + 1), m = mark[key], B = bereich(n, phi);
        sv.appendChild(el("path", { d: sektor(S[0], S[1], 30, B[0], B[1]), fill: m ? m.f : "#e2e8f0", "fill-opacity": m ? 0.55 : 0.6, stroke: m ? m.f : "#94a3b8", "stroke-width": m ? 2 : 1 }));
        var mid = (B[0] + B[1]) / 2, p = P(S[0], S[1], m && m.t && m.t.length > 3 ? 58 : 46, mid);
        txt(sv, p[0], p[1] + 6, m && m.t ? m.t : n + (i ? STR : ""), { "font-size": m ? 16 : 14, fill: m ? "#1a2233" : "#64748b" });
      });
      sv.appendChild(el("circle", { cx: S[0], cy: S[1], r: 4, fill: "#1a2233" }));
    });
    sv.appendChild(el("text", { x: 16, y: 28, "font-family": "system-ui, sans-serif", "font-size": 16, "font-weight": 700, fill: "#475569" }, "g ∥ h"));
  }
  function parZeigen(){
    var phi = +$("parR").value; $("parW").textContent = phi + "°"; $("parWL").textContent = t("parWinkel");
    var pr = PAARE[paar], mark = {};
    pr.forEach(function(x){ var n = x[0], v = wertVon(n, phi); mark[n + x[1]] = { f: "#f59e0b", t: n + (x[1] === 2 ? STR : "") + " = " + v + "°" }; });
    parZeichnen($("parSvg"), phi, mark);
    $("paarWahl").innerHTML = Object.keys(PAARE).map(function(k){ return '<button type="button" data-p="' + k + '" aria-pressed="' + (k === paar) + '">' + t("p_" + k) + "</button>"; }).join("");
    $("paarWahl").querySelectorAll("button").forEach(function(b){ b.addEventListener("click", function(){ paar = b.dataset.p; parZeigen(); }); });
    $("paarText").textContent = t("e_" + paar);
  }
  $("parR").addEventListener("input", parZeigen);
  // ---------- Übung an Parallelen (3 Stufen) ----------
  // 🆕 23.11.: Stufe 2 = drei Parallelen g ∥ h ∥ k (Winkel über zwei Schnittpunkte weitertragen),
  // Stufe 3 = Dreieck zwischen zwei Parallelen (Wechselwinkel + gestreckter Winkel → Winkelsumme 180°)
  var PQ = { lv: 1, phi: 60, ziel: "β", st: 1, fertig: false, ok: 0, n: 0, ans: 0 };
  try { PQ.lv = +localStorage.getItem("msWinkelStufe") || 1; } catch(e){}
  var STRS = ["", "", STR, "″"];
  function nm(n, i){ return n + STRS[i]; }
  function rel(von, zu, phi){   // Schritt von Name „von“ zu Name „zu“ am selben Schnittpunkt
    if(von === zu) return null;
    var sch = { "α": "γ", "γ": "α", "β": "δ", "δ": "β" };
    return sch[von] === zu ? "scheitel" : "neben";
  }
  function pqNeu(){
    PQ.zw = false; PQ.fertig = false;
    if(PQ.lv === 3){
      do { PQ.a = zuf(38, 80); PQ.b = zuf(38, 80); } while(PQ.a + PQ.b > 150 || PQ.a + PQ.b < 85);
      PQ.c = 180 - PQ.a - PQ.b;
      PQ.typ = wahl(["c", "c", "b", "aS"]);   // gesucht: γ, β (aus α und γ) oder α′ an der Spitze
      PQ.ans = PQ.typ === "c" ? PQ.c : PQ.typ === "b" ? PQ.b : PQ.a;
    } else {
      do { PQ.phi = zuf(PQ.lv === 2 ? 35 : 25, PQ.lv === 2 ? 145 : 155); } while(Math.abs(PQ.phi - 90) < 8);
      if(PQ.lv === 1){
        var L = []; NAMEN.forEach(function(n){ [1, 2].forEach(function(s){ if(!(n === "α" && s === 1)) L.push([n, s]); }); });
        var z = wahl(L); PQ.gn = "α"; PQ.gs = 1; PQ.ziel = z[0]; PQ.st = z[1];
      } else {
        PQ.gn = wahl(NAMEN); PQ.gs = wahl([1, 3]); PQ.st = PQ.gs === 1 ? 3 : 1;
        if(Math.random() < 0.35) PQ.st = 2;
        PQ.ziel = wahl(NAMEN.filter(function(n){ return n !== PQ.gn; }));
      }
      PQ.ans = wertVon(PQ.ziel, PQ.phi);
    }
    $("pqEin").value = ""; $("pqMeld").textContent = ""; $("pqMeld").className = "meldung"; $("pqWegBox").open = false; pqZeigen();
  }
  function zielName(){ return nm(PQ.ziel, PQ.st); }
  function parZeichnen3(sv, mark){   // g oben? nein: h oben (Spitze P), g unten (A, B)
    leer(sv);
    var H = 170, P0 = [260, 80], gy = 250, A = [P0[0] - H / Math.tan(PQ.a * RAD), gy], B = [P0[0] + H / Math.tan(PQ.b * RAD), gy];
    [[P0[1], "h"], [gy, "g"]].forEach(function(z){ sv.appendChild(el("line", { x1: 10, y1: z[0], x2: 510, y2: z[0], stroke: "#1a2233", "stroke-width": 3 })); txt(sv, 500, z[0] - 10, z[1], { "font-style": "italic", "font-size": 18 }); });
    function verl(Q, R, k){ return [R[0] + (R[0] - Q[0]) * k, R[1] + (R[1] - Q[1]) * k]; }
    var s1 = verl(P0, A, 0.15), s2 = verl(A, P0, 0.22), t1 = verl(P0, B, 0.15), t2 = verl(B, P0, 0.22);
    sv.appendChild(el("line", { x1: s1[0], y1: s1[1], x2: s2[0], y2: s2[1], stroke: "#7c3aed", "stroke-width": 3 }));
    sv.appendChild(el("line", { x1: t1[0], y1: t1[1], x2: t2[0], y2: t2[1], stroke: "#0d9488", "stroke-width": 3 }));
    var W = [
      ["αA", A, 0, PQ.a], ["βB", B, 180 - PQ.b, 180],
      ["αP", P0, 180, 180 + PQ.a], ["γP", P0, 180 + PQ.a, 360 - PQ.b], ["βP", P0, 360 - PQ.b, 360]
    ];
    W.forEach(function(w){
      var m = mark[w[0]], r = w[0] === "γP" ? 34 : 30;
      if(!m) return;
      sv.appendChild(el("path", { d: sektor(w[1][0], w[1][1], r, w[2], w[3]), fill: m.f, "fill-opacity": 0.5, stroke: m.f, "stroke-width": 2 }));
      var mid = (w[2] + w[3]) / 2, p = P(w[1][0], w[1][1], m.t.length > 3 ? 62 : 50, mid);
      txt(sv, p[0], p[1] + 6, m.t, { "font-size": 15 });
    });
    [A, B, P0].forEach(function(S){ sv.appendChild(el("circle", { cx: S[0], cy: S[1], r: 4, fill: "#1a2233" })); });
    sv.appendChild(el("text", { x: 16, y: 28, "font-family": "system-ui, sans-serif", "font-size": 16, "font-weight": 700, fill: "#475569" }, "g ∥ h"));
  }
  function parZeichnen2(sv, phi, mark){   // drei Parallelen g, h, k mit einer Schnittgeraden
    leer(sv); var Y = [70, 165, 260], u = [Math.cos(phi * RAD), -Math.sin(phi * RAD)], ct = Math.cos(phi * RAD) / Math.sin(phi * RAD);
    var S = Y.map(function(y){ return [300 + (165 - y) * ct, y]; });
    Y.forEach(function(y, i){ sv.appendChild(el("line", { x1: 10, y1: y, x2: 510, y2: y, stroke: "#1a2233", "stroke-width": 3 })); txt(sv, 500, y - 10, ["g", "h", "k"][i], { "font-style": "italic", "font-size": 18 }); });
    var a = [S[0][0] + u[0] * 55, S[0][1] + u[1] * 55], b = [S[2][0] - u[0] * 55, S[2][1] - u[1] * 55];
    sv.appendChild(el("line", { x1: a[0], y1: a[1], x2: b[0], y2: b[1], stroke: "#7c3aed", "stroke-width": 3 })); txt(sv, a[0] + 12, a[1] + 4, "s", { "font-style": "italic", "font-size": 18, fill: "#7c3aed" });
    S.forEach(function(Sp, i){
      NAMEN.forEach(function(n){
        var key = n + (i + 1), m = mark[key], Bb = bereich(n, phi);
        sv.appendChild(el("path", { d: sektor(Sp[0], Sp[1], 26, Bb[0], Bb[1]), fill: m ? m.f : "#e2e8f0", "fill-opacity": m ? 0.55 : 0.6, stroke: m ? m.f : "#94a3b8", "stroke-width": m ? 2 : 1 }));
        var mid = (Bb[0] + Bb[1]) / 2, p = P(Sp[0], Sp[1], m && m.t && m.t.length > 4 ? 56 : 42, mid);
        txt(sv, p[0], p[1] + 6, m && m.t ? m.t : nm(n, i + 1), { "font-size": m ? 15 : 13, fill: m ? "#1a2233" : "#64748b" });
      });
      sv.appendChild(el("circle", { cx: Sp[0], cy: Sp[1], r: 4, fill: "#1a2233" }));
    });
    sv.appendChild(el("text", { x: 16, y: 28, "font-family": "system-ui, sans-serif", "font-size": 16, "font-weight": 700, fill: "#475569" }, "g ∥ h ∥ k"));
  }
  function pqZeigen(){
    var L = [], fertig = PQ.fertig, BL = "#2563eb", RT = "#dc2626";
    if(PQ.lv === 3){
      var mark = {}, ziel = PQ.typ === "c" ? "γP" : PQ.typ === "b" ? "βB" : "αP";
      mark.αA = { f: BL, t: "α = " + PQ.a + "°" };
      if(PQ.typ === "b") mark.γP = { f: BL, t: "γ = " + PQ.c + "°" }; else mark.βB = { f: BL, t: "β = " + PQ.b + "°" };
      var zn = PQ.typ === "c" ? "γ" : PQ.typ === "b" ? "β" : "α" + STR;
      mark[ziel] = { f: RT, t: zn + (fertig ? " = " + PQ.ans + "°" : " = ?") };
      if(fertig){ if(!mark.αP) mark.αP = { f: "#f59e0b", t: "α" + STR }; if(!mark.βP) mark.βP = { f: "#f59e0b", t: "β" + STR }; if(!mark.γP) mark.γP = { f: "#f59e0b", t: "γ" }; }
      parZeichnen3($("pqSvg"), mark);
      $("pqAuf").innerHTML = t(PQ.typ === "b" ? "parQuiz3b" : "parQuiz3a", { a: PQ.a, b: PQ.b, c: PQ.c, w: "<b>" + zn + "</b>" });
      L.push(t("r_gleich", { x: "α" + STR, y: "α", p: t("p_wechsel") }));
      if(PQ.typ !== "aS"){
        L.push(t("r_gleich", { x: "β" + STR, y: "β", p: t("p_wechsel") }));
        L.push(t("r_summe3", { a: "α" + STR, b: "γ", c: "β" + STR, p: t("p_gestreckt") }));
        if(PQ.typ === "c") L.push(t("r_rest", { x: "γ", a: "α", b: "β" }) + " = 180° − " + PQ.a + "° − " + PQ.b + "° = " + PQ.c + "°");
        else L.push(t("r_rest", { x: "β", a: "α", b: "γ" }) + " = 180° − " + PQ.a + "° − " + PQ.c + "° = " + PQ.b + "°");
        L.push(t("parMerk3"));
      } else L.push("α" + STR + " = " + PQ.a + "°");
    } else {
      var mk = {}, gkey = PQ.gn + PQ.gs, w = PQ.ans;
      mk[gkey] = { f: BL, t: nm(PQ.gn, PQ.gs) + " = " + wertVon(PQ.gn, PQ.phi) + "°" };
      mk[PQ.ziel + PQ.st] = { f: RT, t: zielName() + (fertig ? " = " + w + "°" : " = ?") };
      if(PQ.lv === 1){ parZeichnen($("pqSvg"), PQ.phi, mk); $("pqAuf").innerHTML = t("parQuiz", { a: PQ.phi, w: "<b>" + zielName() + "</b>" }); }
      else { parZeichnen2($("pqSvg"), PQ.phi, mk); $("pqAuf").innerHTML = t("parQuiz2", { g: nm(PQ.gn, PQ.gs), a: wertVon(PQ.gn, PQ.phi), w: "<b>" + zielName() + "</b>" }); }
      // Weg: erst am gegebenen Schnittpunkt zum Zielnamen, dann per Stufenwinkel zum Zielpunkt
      var X = PQ.ziel, G = PQ.gn, r = rel(G, X), gv = wertVon(G, PQ.phi);
      if(r === "scheitel") L.push(t("r_gleich", { x: nm(X, PQ.gs), y: nm(G, PQ.gs), p: t("p_scheitel") }) + " = " + gv + "°");
      else if(r === "neben") L.push(t("r_summe", { x: nm(X, PQ.gs), y: nm(G, PQ.gs), p: t("p_neben") }) + " = " + w + "°");
      if(PQ.st !== PQ.gs) L.push(t("r_gleich", { x: nm(X, PQ.st), y: nm(X, PQ.gs), p: t("p_stufen") }));
      L.push(zielName() + " = " + w + "°");
    }
    $("pqPunkte").textContent = PQ.ok + " / " + PQ.n;
    $("pqWeg").innerHTML = L.map(function(s){ return '<li><bdi dir="ltr">' + s + "</bdi></li>"; }).join("");
    var sw = $("pqStufe");
    if(sw){ sw.innerHTML = [1, 2, 3].map(function(k){ return '<button type="button" data-lv="' + k + '" aria-pressed="' + (k === PQ.lv) + '">' + t("lv" + k) + "</button>"; }).join("");
      sw.querySelectorAll("button").forEach(function(b){ b.addEventListener("click", function(){ PQ.lv = +b.dataset.lv; try { localStorage.setItem("msWinkelStufe", PQ.lv); } catch(e){} pqNeu(); }); }); }
  }
  function pqPruefen(){
    if(PQ.fertig) return; var e = lies($("pqEin").value); if(!isFinite(e)) return;
    var w = PQ.ans, ok = Math.abs(e - w) < 0.5;
    if(!ok && !PQ.zw){ PQ.zw = true; msNochmal($("pqMeld")); return; }
    PQ.fertig = true; PQ.n++; if(ok) PQ.ok++;
    $("pqMeld").textContent = ok ? t("parOk") : t("parFalsch", { w: w }); $("pqMeld").className = "meldung " + (ok ? "gut" : "schlecht");
    $("pqWegBox").open = true; pqZeigen();
  }
  $("pqPr").addEventListener("click", pqPruefen);
  $("pqEin").addEventListener("keydown", function(e){ if(e.key === "Enter"){ e.preventDefault(); if(PQ.fertig) pqNeu(); else pqPruefen(); } });
  $("pqNeu").addEventListener("click", function(){ pqNeu(); $("pqEin").focus(); });

  // ---------- Reiter & Texte ----------
  function zeigeTab(k){
    document.querySelectorAll(".tabs button").forEach(function(b){ b.setAttribute("aria-selected", b.dataset.tab === k ? "true" : "false"); });
    ["sch", "mess", "art", "par"].forEach(function(x){ $("s_" + x).hidden = x !== k; });
  }
  document.querySelectorAll(".tabs button").forEach(function(b){ b.addEventListener("click", function(){ zeigeTab(b.dataset.tab); }); });
  function alles(){
    document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = "miStudia – " + t("titel"); $("titel").textContent = t("titel");
    document.querySelectorAll(".tabs button").forEach(function(b){ b.textContent = t("tab_" + b.dataset.tab); });
    $("schH").textContent = t("schH"); $("schText").textContent = t("schText"); $("schEinL").textContent = t("schEin"); $("schPr").textContent = t("pruefen");
    $("messH").textContent = t("messH"); $("messText").textContent = t("messText"); $("messEinL").textContent = t("messEin"); $("messPr").textContent = t("pruefen"); $("messWeiter").textContent = t("weiter"); $("messMerke").textContent = t("ueberstumpf");
    $("artH").textContent = t("artH"); $("artText").textContent = t("artText"); $("quizH").textContent = t("artQuiz"); $("quizWeiter").textContent = t("weiter");
    $("parH").textContent = t("parH"); $("parText").textContent = t("parText"); $("pqEinL").textContent = t("parEin"); $("pqPr").textContent = t("pruefen"); $("pqNeu").textContent = t("parNeu"); $("pqWegT").textContent = t("weg");
    schTexte();
    if(SCH.fertig){ var d = Math.round(Math.abs(SCH.est - SCH.w)), pk = d <= 5 ? 3 : d <= 10 ? 2 : d <= 20 ? 1 : 0; $("schMeld").textContent = t("sch" + pk, { d: d }) + " " + t("istL", { w: SCH.w }) + (SCH.n >= 10 ? " " + t("ende", { p: SCH.p }) : ""); }
    if(MS.geprueft){ var ok = $("messMeld").classList.contains("gut"), sk = t(MS.seite === "r" ? "aussen" : "innen"); $("messMeld").textContent = ok ? t("messOk", { s: sk }) : t("messFalsch", { w: MS.w, s: sk }); }
    artZeigen(); quizZeigen();
    if(QZ.fertig){ var ok2 = QZ.gew === QZ.a; $("quizMeld").textContent = ok2 ? t("artRichtig") : t("artFalsch", { a: t("a_" + QZ.a) }); }
    parZeigen(); pqZeigen();
    if(PQ.fertig){ var w = PQ.ans, ok3 = $("pqMeld").classList.contains("gut"); $("pqMeld").textContent = ok3 ? t("parOk") : t("parFalsch", { w: w }); }
  }
  window.MS_LANG = { apply: function(l){ if(WK[l]){ lang = l; alles(); } } };
  schNeu(); messNeu(); quizNeu(); pqNeu(); alles();
})();
