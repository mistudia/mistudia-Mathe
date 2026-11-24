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
  var MS = { w: 60, seite: "r", geprueft: false, ok: 0, n: 0, rot: 0, vbTop: 0 };
  function messNeu(){ if(MS.probe) return; MS.w = zuf(12, 168); MS.seite = wahl(["r", "l"]); MS.geprueft = false; $("messEin").value = ""; $("messMeld").textContent = ""; $("messMeld").className = "meldung"; messZeichnen(); }
  // Ganzes Geodreieck (Bild aus /dreieck/geodreieck.png: 1036 × 522 px, Nullpunkt bei (518, 2), Spitze unten).
  // Der Winkel öffnet sich nach unten. Rechter Schenkel auf 0 → innere (graue) Skala, linker auf 0 → äußere (gelbe).
  var GK = 0.5, GX = 41, GY = 46, GOX = GX + 518 * GK, GOY = GY + 2 * GK, GR = 300;
  function messRichtung(w){ return MS.seite === "r" ? w : 180 - w; } // Bildschirmwinkel (nach unten positiv)
  function PU(r, d){ return [GOX + r * Math.cos(d * RAD), GOY + r * Math.sin(d * RAD)]; }
  function messZeichnen(){
    var sv = $("messSvg"); leer(sv);
    // beim Ausprobieren kann das Geodreieck gedreht sein → Bild nach oben erweitern (nur wachsen, damit nichts springt)
    if(MS.probe){ var top = 0; [[-259, 0], [259, 0], [0, 259], [230, 0]].forEach(function(q){ var c = Math.cos(MS.rot * RAD), s2 = Math.sin(MS.rot * RAD); top = Math.min(top, GOY + q[0] * s2 + q[1] * c - 24); }); top = Math.min(top, GOY + GR * Math.sin(messRichtung(MS.w) * RAD) - 14); MS.vbTop = Math.min(MS.vbTop, Math.floor(top)); } else MS.vbTop = 0;
    sv.setAttribute("viewBox", "0 " + MS.vbTop + " 600 " + (GY + GR + 12 - MS.vbTop));
    var dreh = MS.probe && MS.rot ? "rotate(" + MS.rot + " " + GOX + " " + GOY + ")" : null;
    var d1 = MS.seite === "r" ? 0 : 180, d2 = messRichtung(MS.w), lo = Math.min(d1, d2), hi = Math.max(d1, d2);
    // Körper des Geodreiecks (leicht getönt), dann die Schenkel, darüber das Bild
    sv.appendChild(el("polygon", { points: GX + "," + GY + " " + (GX + 1036 * GK) + "," + GY + " " + GOX + "," + (GY + 518 * GK), fill: "rgba(186,230,253,0.28)", stroke: "#94a3b8", "stroke-width": 1, transform: dreh }));
    var sk = function(a, b){ var p = [], n = 24; for(var i = 0; i <= n; i++){ var q = PU(44, a + (b - a) * i / n); p.push(q[0] + " " + q[1]); } return "M" + GOX + " " + GOY + " L" + p.join(" L") + "Z"; };
    sv.appendChild(el("path", { d: sk(lo, hi), fill: "rgba(34,197,94,0.35)", stroke: "#15803d", "stroke-width": 2 }));
    sv.appendChild(el("line", { x1: 4, y1: GOY, x2: 596, y2: GOY, stroke: "#94a3b8", "stroke-width": 1.2 }));
    [d1, d2].forEach(function(d, j){ var e = PU(GR, d); sv.appendChild(el("line", { x1: GOX, y1: GOY, x2: e[0], y2: e[1], stroke: "#b91c1c", "stroke-width": 3.5, "stroke-linecap": "round" }));
      if(MS.probe && MS.rot){ var n = PU(GR - 58, d); sv.appendChild(el("circle", { cx: n[0], cy: n[1], r: 12, fill: "#ffffff", stroke: "#b91c1c", "stroke-width": 2.5 })); txt(sv, n[0], n[1] + 5.5, String(j + 1), { "font-size": 15, fill: "#b91c1c", "stroke-width": 0 }); } });
    sv.appendChild(el("image", { href: "/dreieck/geodreieck.png", x: GX, y: GY, width: 1036 * GK, height: 522 * GK, opacity: 0.92, transform: dreh }));
    sv.appendChild(el("circle", { cx: GOX, cy: GOY, r: 4.5, fill: "#b91c1c" }));
    if(MS.probe){ // blauer Dreh-Griff am rechten Ende der 0-Linie
      var gg = el("g", { "class": "griff", transform: "rotate(" + MS.rot + " " + GOX + " " + GOY + ")" });
      gg.appendChild(el("circle", { cx: GOX + 230, cy: GOY, r: 15, fill: "#1d4ed8", "fill-opacity": 0.9, stroke: "#ffffff", "stroke-width": 3 }));
      gg.appendChild(el("path", { d: "M" + (GOX + 224) + " " + (GOY - 5) + " A7 7 0 1 1 " + (GOX + 223) + " " + (GOY + 3), fill: "none", stroke: "#ffffff", "stroke-width": 2.4, "stroke-linecap": "round" }));
      gg.appendChild(el("path", { d: "M" + (GOX + 220) + " " + (GOY - 9) + " l4 4.5 l-5.5 2 z", fill: "#ffffff" }));
      sv.appendChild(gg);
    }
    if(MS.probe){
      var h = PU(GR - 24, d2);
      sv.appendChild(el("circle", { cx: h[0], cy: h[1], r: 15, fill: "#b91c1c", "fill-opacity": 0.85, stroke: "#ffffff", "stroke-width": 3, "class": "griff" }));
      $("messMeld").textContent = (MS.rot || MS.w > 180) ? "α = " + MS.w + "°" : t("probWert", { w: MS.w, i: MS.seite === "r" ? MS.w : 180 - MS.w, a: MS.seite === "r" ? 180 - MS.w : MS.w });
      $("messMeld").className = "meldung";
      messAblesen(d1, d2);
    }
    if(MS.geprueft || MS.probe){ var m = PU(78, (lo + hi) / 2); txt(sv, m[0], m[1] + 6, MS.w + "°", { "font-size": 20, fill: "#15803d" }); }
  }
  // Ablesen am (gedrehten) Geodreieck: Richtung d (Bildschirm, nach unten positiv) → innere/äußere Skala oder null
  function winkelNorm(d){ d = ((d % 360) + 360) % 360; return d > 180 ? d - 360 : d; }
  function skala(d){ var r = winkelNorm(d - MS.rot); if(r < -0.5 || r > 180.5) return null; r = Math.max(0, Math.min(180, Math.round(r))); return { i: r, a: 180 - r }; }
  function messAblesen(d1, d2){
    var A = [skala(d1), skala(d2)], h = "";
    if(!MS.rot && MS.w <= 180){ $("messAblesen").hidden = true; return; }
    A.forEach(function(q, j){ h += '<p class="zeile">' + (q ? t("ablesen", { n: j + 1, i: q.i, a: q.a }) : t("nichtSkala", { n: j + 1 })) + "</p>"; });
    var auf = [0, 1].filter(function(j){ return A[j] && (A[j].i === 0 || A[j].a === 0); });
    if(auf.length) h += '<p class="zeile"><b>' + t("passt", { n: auf[0] + 1 }) + "</b></p>";
    else if(A[0] && A[1]){ var g = Math.max(A[0].i, A[1].i), k = Math.min(A[0].i, A[1].i); h += '<p class="zeile"><b dir="ltr">' + t("diff", { g: g, k: k, w: g - k }) + "</b></p>"; }
    if(MS.w > 180 && A[0] && A[1]) h += '<p class="zeile"><b dir="ltr">α = 360° − ' + (360 - MS.w) + "° = " + MS.w + "°</b></p>"; // überstumpf: Rest bis 360°
    $("messAblesen").innerHTML = h; $("messAblesen").hidden = false;
  }
  function messDrehen(r, einrasten){
    r = Math.round(winkelNorm(r));
    if(einrasten){ var d1 = MS.seite === "r" ? 0 : 180, d2 = messRichtung(MS.w); [d1, d2, d1 - 180, d2 - 180].forEach(function(z){ if(Math.abs(winkelNorm(r - z)) <= 3) r = Math.round(winkelNorm(z)); }); }
    MS.rot = r === -180 ? 180 : r; $("messDrehR").value = MS.rot; $("messDrehW").textContent = MS.rot + "°"; messZeichnen();
  }
  function svgPkt(e){ var sv = $("messSvg"), r = sv.getBoundingClientRect(), vb = sv.viewBox.baseVal; return [vb.x + (e.clientX - r.left) / r.width * vb.width, vb.y + (e.clientY - r.top) / r.height * vb.height]; }
  function messWinkelAus(e){
    var sv = $("messSvg"), r = sv.getBoundingClientRect(), vb = sv.viewBox.baseVal;
    var x = vb.x + (e.clientX - r.left) / r.width * vb.width, y = vb.y + (e.clientY - r.top) / r.height * vb.height;
    // 🆕 24.11.2026: beim Ausprobieren ringsum (auch nach oben) – Winkel bis 359°
    var d = Math.atan2(y - GOY, x - GOX) / RAD;
    var w = MS.seite === "r" ? d : 180 - d; w = ((w % 360) + 360) % 360;
    return Math.max(1, Math.min(359, Math.round(w)));
  }
  (function(){
    var sv = $("messSvg"), zieht = false;
    function amGriff(e){ var p = svgPkt(e), g = [GOX + 230 * Math.cos(MS.rot * RAD), GOY + 230 * Math.sin(MS.rot * RAD)]; return Math.hypot(p[0] - g[0], p[1] - g[1]) < 30; }
    function drehAus(e){ var p = svgPkt(e); messDrehen(Math.atan2(p[1] - GOY, p[0] - GOX) / RAD, true); }
    sv.addEventListener("pointerdown", function(e){ if(!MS.probe) return; zieht = amGriff(e) ? "dreh" : "arm"; try { sv.setPointerCapture(e.pointerId); } catch(x){} if(zieht === "dreh") drehAus(e); else { MS.w = messWinkelAus(e); messZeichnen(); } e.preventDefault(); });
    sv.addEventListener("pointermove", function(e){ if(!zieht) return; if(zieht === "dreh") drehAus(e); else { MS.w = messWinkelAus(e); messZeichnen(); } });
    ["pointerup", "pointercancel"].forEach(function(n){ sv.addEventListener(n, function(){ zieht = false; }); });
  })();
  function messModus(probe){
    MS.probe = probe;
    $("messSvg").style.touchAction = probe ? "none" : ""; $("messSvg").style.cursor = probe ? "grab" : "";
    ["messEin", "messPr", "messWeiter", "messEinL"].forEach(function(id){ var e = $(id); if(e) e.hidden = probe; });
    var eh = $("messEin").nextElementSibling; if(eh && eh.classList.contains("einh")) eh.hidden = probe;
    $("messSeite").hidden = !probe; $("messProbe").textContent = probe ? t("probAus") : t("probBtn");
    $("messProbeHint").hidden = !probe; $("messDreh").hidden = !probe; if(!probe){ $("messAblesen").hidden = true; MS.rot = 0; $("messDrehR").value = 0; $("messDrehW").textContent = "0°"; }
    if(!probe){ messNeu(); } else { MS.geprueft = false; messZeichnen(); }
  }
  function messPruefen(){
    if(MS.geprueft) return; var e = lies($("messEin").value); if(!isFinite(e)) return;
    MS.geprueft = true; MS.n++; var ok = Math.abs(e - MS.w) <= 1; if(ok) MS.ok++;
    var sk = t(MS.seite === "r" ? "innen" : "aussen");   // Geodreieck: rechter Schenkel auf 0 → innere Skala
    $("messMeld").textContent = ok ? t("messOk", { s: sk }) : t("messFalsch", { w: MS.w, s: sk });
    $("messMeld").className = "meldung " + (ok ? "gut" : "schlecht"); $("messPunkte").textContent = MS.ok + " / " + MS.n; messZeichnen();
  }
  $("messPr").addEventListener("click", messPruefen);
  $("messEin").addEventListener("keydown", function(e){ if(e.key === "Enter"){ e.preventDefault(); if(MS.geprueft){ messNeu(); } else messPruefen(); } });
  $("messWeiter").addEventListener("click", function(){ messNeu(); $("messEin").focus(); });
  $("messProbe").addEventListener("click", function(){ messModus(!MS.probe); });
  $("messSeite").addEventListener("click", function(){ MS.seite = MS.seite === "r" ? "l" : "r"; messZeichnen(); });
  $("messDrehR").addEventListener("input", function(){ messDrehen(+this.value, false); });
  $("messGerade").addEventListener("click", function(){ messDrehen(0, false); });

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
    var gp = P(160, 160, 128, w); $("artSvg").appendChild(el("circle", { cx: gp[0], cy: gp[1], r: 11, fill: "#1d4ed8", "fill-opacity": 0.85, stroke: "#ffffff", "stroke-width": 3 }));
    $("artName").textContent = t("a_" + a); $("artDef").textContent = "α " + t("d_" + a);
    $("artListe").innerHTML = ARTEN.map(function(k){ return '<button type="button" data-a="' + k + '" aria-pressed="' + (k === a) + '">' + t("a_" + k) + "</button>"; }).join("");
    $("artListe").querySelectorAll("button").forEach(function(b){ b.addEventListener("click", function(){ var k = b.dataset.a; $("artR").value = { null: 0, spitz: 45, recht: 90, stumpf: 130, gestreckt: 180, ueber: 250, voll: 360 }[k]; artZeigen(); }); });
  }
  $("artR").addEventListener("input", artZeigen);
  (function(){ // am blauen Schenkel ziehen (Winkel 0 … 360)
    var sv = $("artSvg"), zieht = false;
    function setz(e){
      var r = sv.getBoundingClientRect(), vb = sv.viewBox.baseVal;
      var x = vb.x + (e.clientX - r.left) / r.width * vb.width, y = vb.y + (e.clientY - r.top) / r.height * vb.height;
      var w = Math.atan2(160 - y, x - 160) / RAD; if(w < 0) w += 360;
      var alt = +$("artR").value;
      if(alt > 300 && w < 60) w = 360; else if(alt < 60 && alt > 0 && w > 300 && Math.abs(alt - w) > 180) w = 0;
      $("artR").value = Math.round(w); artZeigen();
    }
    sv.style.touchAction = "none"; sv.style.cursor = "grab";
    sv.addEventListener("pointerdown", function(e){ zieht = true; try { sv.setPointerCapture(e.pointerId); } catch(x){} setz(e); e.preventDefault(); });
    sv.addEventListener("pointermove", function(e){ if(zieht) setz(e); });
    ["pointerup", "pointercancel"].forEach(function(n){ sv.addEventListener(n, function(){ zieht = false; }); });
  })();
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
    sv.appendChild(el("text", { x: 16, y: 28, "font-family": "system-ui, sans-serif", "font-size": 16, "font-weight": 700, fill: "#475569" }, "g || h"));
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
  // 🆕 23.11.: Stufe 2 = drei Parallelen g || h || k (Winkel über zwei Schnittpunkte weitertragen),
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
    if(PQ.lv === 4){
      do { PQ.a = zuf(40, 72); PQ.b = zuf(45, 75); } while(PQ.a + PQ.b < 95 || PQ.a + PQ.b > 138 || Math.abs(PQ.a - PQ.b) < 4);
      PQ.c = 180 - PQ.a - PQ.b;
      PQ.w4 = { "α": PQ.b, "β": PQ.a + PQ.b, "γ": PQ.b, "δ": PQ.c, "ε": PQ.a, "ζ": 180 - PQ.b };
      PQ.e4 = {}; PQ.ok4 = {};
    } else if(PQ.lv === 3){
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
    sv.appendChild(el("text", { x: 16, y: 28, "font-family": "system-ui, sans-serif", "font-size": 16, "font-weight": 700, fill: "#475569" }, "g || h"));
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
    sv.appendChild(el("text", { x: 16, y: 28, "font-family": "system-ui, sans-serif", "font-size": 16, "font-weight": 700, fill: "#475569" }, "g || h || k"));
  }
  // 🆕 Stufe 4: f || g (fallend), h || i (waagerecht), s steigt und schneidet alle vier
  var N4 = ["α", "β", "γ", "δ", "ε", "ζ"];
  function parZeichnen4(sv){
    leer(sv);
    var a = PQ.a, b = PQ.b, ca = 1 / Math.tan(a * RAD), cb = 1 / Math.tan(b * RAD), hY = 50, iY = 320, y0 = 14, y1 = 356;
    var Si = 0, Fi = 112 * (ca + cb), Gi = 212 * (ca + cb);
    var xs = function(y){ return Si + (iY - y) * ca; }, xf = function(y, Q){ return Q - (iY - y) * cb; };
    var allX = [xs(y0), xs(y1), xf(y0, Fi), xf(y1, Fi), xf(y0, Gi), xf(y1, Gi)];
    var mn = Math.min.apply(null, allX) - 30, mx = Math.max.apply(null, allX) + 90, dx = -mn;
    var W = mx - mn; sv.setAttribute("viewBox", "0 0 " + W + " 384"); sv.style.maxWidth = Math.min(620, W * 1.1) + "px";
    function X(x){ return x + dx; }
    [[hY, "h"], [iY, "i"]].forEach(function(z){ sv.appendChild(el("line", { x1: 6, y1: z[0], x2: W - 6, y2: z[0], stroke: "#1a2233", "stroke-width": 3 })); txt(sv, 16, z[0] - 10, z[1], { "font-style": "italic", "font-size": 18 }); });
    function gerade(xa, xb, farbe, name, nx){ sv.appendChild(el("line", { x1: X(xa), y1: y0, x2: X(xb), y2: y1, stroke: farbe, "stroke-width": 3 })); txt(sv, X(xb) + nx, y1 - 4, name, { "font-style": "italic", "font-size": 18, fill: farbe }); }
    gerade(xf(y0, Fi), xf(y1, Fi), "#1a2233", "f", 14); gerade(xf(y0, Gi), xf(y1, Gi), "#1a2233", "g", 14); gerade(xs(y0), xs(y1), "#7c3aed", "s", -14);
    var tf = iY - 112, tg = iY - 212;
    var Pkt = { Si: [X(Si), iY], Fi: [X(Fi), iY], Gi: [X(Gi), iY], Fh: [X(xf(hY, Fi)), hY], Gh: [X(xf(hY, Gi)), hY], Sh: [X(xs(hY)), hY], Sf: [X(xs(tf)), tf], Sg: [X(xs(tg)), tg] };
    var fe = PQ.fertig, BL = "#2563eb", RT = "#dc2626", GR = "#16a34a", OR = "#f59e0b";
    var W4 = [
      ["geg1", "Si", 0, a, BL, a + "°"], ["geg2", "Fi", 180 - b, 180, BL, b + "°"],
      ["α", "Fh", 360 - b, 360], ["ζ", "Gh", 180, 360 - b], ["ε", "Sh", 0, a],
      ["β", "Sf", 360 - b, 360 + a], ["δ", "Sg", 180 + a, 360 - b], ["γ", "Gi", 180 - b, 180]
    ];
    if(fe) W4.push(["τ", "Sf", 180 + a, 360 - b, OR, PQ.c + "°"]);
    W4.forEach(function(w){
      var p = Pkt[w[1]], farbe = w[4] || (PQ.ok4[w[0]] ? GR : RT), r = w[0] === "τ" || w[0] === "δ" ? 24 : 30;
      var label = w[5] || (PQ.ok4[w[0]] || fe ? w[0] + " = " + PQ.w4[w[0]] + "°" : w[0]);
      sv.appendChild(el("path", { d: sektor(p[0], p[1], r, w[2], w[3]), fill: farbe, "fill-opacity": 0.35, stroke: farbe, "stroke-width": 2 }));
      var mid = (w[2] + w[3]) / 2, q = P(p[0], p[1], w[5] ? r + 12 : label.length > 4 ? r + 34 : r + 16, mid);
      txt(sv, q[0], q[1] + 6, label, { "font-size": 15 });
    });
    for(var k in Pkt) sv.appendChild(el("circle", { cx: Pkt[k][0], cy: Pkt[k][1], r: 3.5, fill: "#1a2233" }));
  }
  function pq4Box(){
    var box = $("pq4");
    if(!box){ box = document.createElement("div"); box.id = "pq4"; box.className = "pq4"; $("pqSvg").parentNode.insertBefore(box, $("pqSvg").nextSibling); }
    return box;
  }
  function pq4Render(){
    var box = pq4Box(), fe = PQ.fertig;
    box.innerHTML = '<div class="pq4-grid">' + N4.map(function(n){
      var v = PQ.e4[n] != null ? PQ.e4[n] : "", ok = PQ.ok4[n], cls = ok ? "gut" : (PQ.zw || fe) && v !== "" ? "schlecht" : "";
      return '<label class="pq4-f ' + cls + '"><span class="pq4-n">' + n + ' =</span><input class="zahl" data-nofit data-n="' + n + '" inputmode="numeric" autocomplete="off" value="' + (fe && !ok ? PQ.w4[n] : v) + '"' + (ok || fe ? " readonly" : "") + '><span class="einh">°</span></label>';
    }).join("") + '</div><div class="reihe"><button type="button" class="knopf" id="pq4Pr">' + t("pruefen") + '</button> <button type="button" class="knopf hell" id="pq4Neu">' + t("parNeu") + "</button></div>";
    box.querySelectorAll("input").forEach(function(inp, i, all){
      inp.addEventListener("input", function(){ PQ.e4[inp.dataset.n] = inp.value; });
      inp.addEventListener("keydown", function(e){ if(e.key === "Enter"){ e.preventDefault(); if(PQ.fertig){ pqNeu(); return; } var nx = [].slice.call(all).filter(function(x, j){ return j > i && !x.readOnly; })[0]; if(nx) nx.focus(); else pq4Pruefen(); } });
    });
    $("pq4Pr").addEventListener("click", pq4Pruefen); $("pq4Pr").disabled = fe;
    $("pq4Neu").addEventListener("click", function(){ pqNeu(); var f = box.querySelector("input"); if(f) f.focus(); });
  }
  function pq4Pruefen(){
    if(PQ.fertig) return;
    pq4Box().querySelectorAll("input").forEach(function(inp){ PQ.e4[inp.dataset.n] = inp.value; });
    if(N4.every(function(n){ return !String(PQ.e4[n] || "").trim(); })) return;
    var anz = 0;
    N4.forEach(function(n){ var e = lies(PQ.e4[n] || ""); PQ.ok4[n] = isFinite(e) && Math.abs(e - PQ.w4[n]) < 0.5; if(PQ.ok4[n]) anz++; });
    if(anz < 6 && !PQ.zw){ PQ.zw = true; $("pqMeld").textContent = t("teilOk", { n: anz }) + " " + t("nochmal6"); $("pqMeld").className = "meldung schlecht"; pqZeigen(); var r = pq4Box().querySelector("input:not([readonly])"); if(r) r.focus(); return; }
    PQ.fertig = true; PQ.n += 6; PQ.ok += anz;
    $("pqMeld").textContent = anz === 6 ? t("alleOk") : t("teilOk", { n: anz }); $("pqMeld").className = "meldung " + (anz === 6 ? "gut" : "schlecht");
    $("pqWegBox").open = true; pqZeigen();
  }
  function pqZeigen(){
    var L = [], fertig = PQ.fertig, BL = "#2563eb", RT = "#dc2626";
    var vier = PQ.lv === 4, rh = $("pqEin").closest(".reihe");
    if(rh) rh.hidden = vier;
    if($("pq4")) $("pq4").hidden = !vier;
    if(!vier) $("pqSvg").setAttribute("viewBox", "0 0 520 330"), $("pqSvg").style.maxWidth = "560px";
    if(vier){
      parZeichnen4($("pqSvg")); pq4Render();
      $("pqAuf").innerHTML = t("parQuiz4");
      var a = PQ.a, b = PQ.b, c = PQ.c;
      L.push(t("r_gleich", { x: "α", y: b + "°", p: t("p_wechsel") + ", " + t("paarHI") }));
      L.push(t("r_gleich", { x: "γ", y: b + "°", p: t("p_stufen") + ", " + t("paarFG") }));
      L.push(t("r_gleich", { x: "ε", y: a + "°", p: t("p_stufen") + ", " + t("paarHI") }));
      L.push(t("r_summe", { x: "ζ", y: "α", p: t("p_neben") }) + " = 180° − " + b + "° = " + (180 - b) + "°");
      L.push(t("r_drei", { a: a, b: b, c: c }));
      L.push(t("r_summe", { x: "β", y: c + "°", p: t("p_neben") }) + " = " + (a + b) + "°");
      L.push(t("r_gleich", { x: "δ", y: c + "°", p: t("p_stufen") + ", " + t("paarFG") }));
    } else if(PQ.lv === 3){
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
    if(sw){ sw.innerHTML = [1, 2, 3, 4].map(function(k){ return '<button type="button" data-lv="' + k + '" aria-pressed="' + (k === PQ.lv) + '">' + t("lv" + k) + "</button>"; }).join("");
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
    $("messProbe").textContent = MS.probe ? t("probAus") : t("probBtn"); $("messSeite").textContent = t("seiteW"); $("messProbeHint").textContent = t("probHint") + " " + t("drehHint") + " " + t("obenHint"); $("messDrehL").textContent = t("drehL"); $("messGerade").textContent = t("gerade"); $("messDrehW").textContent = MS.rot + "°"; if(MS.probe) messZeichnen();
    $("artH").textContent = t("artH"); $("artText").textContent = t("artText"); $("quizH").textContent = t("artQuiz"); $("quizWeiter").textContent = t("weiter");
    $("parH").textContent = t("parH"); $("parText").textContent = t("parText"); $("pqEinL").textContent = t("parEin"); $("pqPr").textContent = t("pruefen"); $("pqNeu").textContent = t("parNeu"); $("pqWegT").textContent = t("weg");
    schTexte();
    if(SCH.fertig){ var d = Math.round(Math.abs(SCH.est - SCH.w)), pk = d <= 5 ? 3 : d <= 10 ? 2 : d <= 20 ? 1 : 0; $("schMeld").textContent = t("sch" + pk, { d: d }) + " " + t("istL", { w: SCH.w }) + (SCH.n >= 10 ? " " + t("ende", { p: SCH.p }) : ""); }
    if(MS.geprueft){ var ok = $("messMeld").classList.contains("gut"), sk = t(MS.seite === "r" ? "innen" : "aussen"); $("messMeld").textContent = ok ? t("messOk", { s: sk }) : t("messFalsch", { w: MS.w, s: sk }); }
    artZeigen(); quizZeigen();
    if(QZ.fertig){ var ok2 = QZ.gew === QZ.a; $("quizMeld").textContent = ok2 ? t("artRichtig") : t("artFalsch", { a: t("a_" + QZ.a) }); }
    parZeigen(); pqZeigen();
    if(PQ.fertig && PQ.lv === 4){ var an = N4.filter(function(n){ return PQ.ok4[n]; }).length; $("pqMeld").textContent = an === 6 ? t("alleOk") : t("teilOk", { n: an }); }
    else if(PQ.fertig){ var w = PQ.ans, ok3 = $("pqMeld").classList.contains("gut"); $("pqMeld").textContent = ok3 ? t("parOk") : t("parFalsch", { w: w }); }
  }
  window.MS_LANG = { apply: function(l){ if(WK[l]){ lang = l; alles(); } } };
  schNeu(); messNeu(); quizNeu(); pqNeu(); alles();
})();
