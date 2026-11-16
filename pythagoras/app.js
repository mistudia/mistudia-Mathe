// ============================================================
// pythagoras/app.js – Satz des Pythagoras
// Entdecken: Ecke C ziehen; Quadrate über a, b, c mit Flächen; bei 90°
//   (Einrasten auf dem Thaleskreis) gilt a² + b² = c², sonst > oder <.
// Beweis: Puzzle – vier gleiche Dreiecke im Quadrat (a + b)² umlegen:
//   freie Fläche c² wird zu a² + b².
// Rechner: Hypotenuse oder Kathete, Alltagsbeispiele, Zeichnung.
// Üben: Hypotenuse, Kathete, Umkehrung (rechtwinklig?), Textaufgaben.
// Texte: pythagoras/texte.js (PY), Sprache aus dem Startmenü (MS_LANG).
// ============================================================
(function(){
  "use strict";
  var NS = "http://www.w3.org/2000/svg", lang = "de";
  function $(id){ return document.getElementById(id); }
  function t(k, v){ var s = (PY[lang] && PY[lang][k]) || PY.de[k] || k; if(v) for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  function el(n, a, txt){ var e = document.createElementNS(NS, n); for(var k in a) if(a[k] != null) e.setAttribute(k, a[k]); if(txt != null) e.textContent = txt; return e; }
  function leer(s){ while(s.lastChild) s.removeChild(s.lastChild); }
  function sicht(e, an){ if(an) e.removeAttribute("hidden"); else e.setAttribute("hidden", ""); }
  function bdi(s){ return '<bdi dir="ltr">' + s + "</bdi>"; }
  function zuf(a, b){ return a + Math.floor(Math.random() * (b - a + 1)); }
  function wahl(L){ return L[Math.floor(Math.random() * L.length)]; }
  function komma(){ return !(lang === "en" || lang === "zh" || lang === "ja" || lang === "ar"); }
  function zahl(v, d){ if(d == null) d = 2; var r = Math.round(v * Math.pow(10, d)) / Math.pow(10, d); if(Object.is(r, -0)) r = 0; var s = String(Math.abs(r)); if(s.indexOf("e") >= 0) s = Math.abs(r).toFixed(d); if(komma()) s = s.replace(".", ","); return (r < 0 ? "−" : "") + s; }
  function genau(v){ return Math.abs(v * 100 - Math.round(v * 100)) < 1e-7; }
  function zg(v){ return (genau(v) ? "" : "≈ ") + zahl(v); }
  function lies(s){ s = String(s).trim().replace(",", "."); return s === "" ? NaN : Number(s); }

  // ---------- Hilfen für Zeichnungen in Mathe-Koordinaten ----------
  function ansicht(sv, punkte, W, H, rand){
    var X0 = Infinity, X1 = -Infinity, Y0 = Infinity, Y1 = -Infinity;
    punkte.forEach(function(p){ X0 = Math.min(X0, p[0]); X1 = Math.max(X1, p[0]); Y0 = Math.min(Y0, p[1]); Y1 = Math.max(Y1, p[1]); });
    var k = Math.min((W - 2 * rand) / (X1 - X0 || 1), (H - 2 * rand) / (Y1 - Y0 || 1));
    var ox = (W - (X1 - X0) * k) / 2 - X0 * k, oy = (H + (Y1 - Y0) * k) / 2 + Y0 * k;
    sv.setAttribute("viewBox", "0 0 " + W + " " + H);
    return { k: k, X: function(x){ return ox + x * k; }, Y: function(y){ return oy - y * k; }, inv: function(px, py){ return [(px - ox) / k, (oy - py) / k]; } };
  }
  function poly(sv, V, pts, cls){ var p = el("polygon", { points: pts.map(function(q){ return V.X(q[0]).toFixed(1) + "," + V.Y(q[1]).toFixed(1); }).join(" "), "class": cls }); sv.appendChild(p); return p; }
  function text(sv, V, p, s, cls, dy){ sv.appendChild(el("text", { x: V.X(p[0]), y: V.Y(p[1]) + (dy || 5), "class": "lab " + (cls || "") }, s)); }
  function quadrat(P, Q, R){ // Quadrat über PQ, von R weg
    var dx = Q[0] - P[0], dy = Q[1] - P[1], n = [-dy, dx];
    var seite = (R[0] - P[0]) * n[0] + (R[1] - P[1]) * n[1]; if(seite > 0) n = [dy, -dx];
    return [P, Q, [Q[0] + n[0], Q[1] + n[1]], [P[0] + n[0], P[1] + n[1]]];
  }
  function rwBogen(px, py, ux, uy, vx, vy, r){ // rechter Winkel: Viertelkreisbogen + Punkt (Bildschirm-Koordinaten, u/v Einheitsvektoren)
    var sw = (ux * vy - uy * vx) > 0 ? 1 : 0, f = r * 0.36;
    return { d: "M" + (px + ux * r) + " " + (py + uy * r) + " A" + r + " " + r + " 0 0 " + sw + " " + (px + vx * r) + " " + (py + vy * r), cx: px + (ux + vx) * f, cy: py + (uy + vy) * f };
  }
  function mitte(L){ var x = 0, y = 0; L.forEach(function(p){ x += p[0]; y += p[1]; }); return [x / L.length, y / L.length]; }
  function abst(p, q){ return Math.hypot(p[0] - q[0], p[1] - q[1]); }

  // ---------- Reiter Entdecken ----------
  var A = [0, 0], B = [6, 0], C = [2.16, 2.88], VE = null;
  function entdecken(){
    var sv = $("pySvg"); leer(sv);
    var a = abst(B, C), b = abst(A, C), c = abst(A, B);
    var Qa = quadrat(B, C, A), Qb = quadrat(C, A, B), Qc = quadrat(A, B, C);
    VE = ansicht(sv, Qa.concat(Qb, Qc, [[3, 3.2]]), 420, 420, 18);
    var V = VE;
    sv.appendChild(el("circle", { cx: V.X(3), cy: V.Y(0), r: 3 * V.k, "class": "thales" }));
    poly(sv, V, Qa, "qa"); poly(sv, V, Qb, "qb"); poly(sv, V, Qc, "qc");
    var ca = (a * a + b * b - c * c) / (2 * a * b), w = Math.acos(Math.max(-1, Math.min(1, ca))) * 180 / Math.PI, recht = Math.abs(w - 90) < 0.05;
    poly(sv, V, [A, B, C], "dr" + (recht ? " recht" : ""));
    if(recht){ // rechter Winkel bei C
      var cx0 = V.X(C[0]), cy0 = V.Y(C[1]), ua = [V.X(A[0]) - cx0, V.Y(A[1]) - cy0], vb = [V.X(B[0]) - cx0, V.Y(B[1]) - cy0];
      var la = Math.hypot(ua[0], ua[1]) || 1, lb = Math.hypot(vb[0], vb[1]) || 1;
      var rb = rwBogen(cx0, cy0, ua[0] / la, ua[1] / la, vb[0] / lb, vb[1] / lb, 0.55 * V.k);
      sv.appendChild(el("path", { d: rb.d, fill: "none", stroke: "#dc2626", "stroke-width": 2 }));
      sv.appendChild(el("circle", { cx: rb.cx, cy: rb.cy, r: 2.5, fill: "#dc2626" }));
    }
    text(sv, V, mitte(Qa), "a² = " + zahl(a * a), "labA"); text(sv, V, mitte(Qb), "b² = " + zahl(b * b), "labB"); text(sv, V, mitte(Qc), "c² = " + zahl(c * c), "labC");
    var mi = mitte([A, B, C]);
    function seitenLab(P, Q, s, cls){ var m = mitte([P, Q]), d = [mi[0] - m[0], mi[1] - m[1]], l = Math.hypot(d[0], d[1]) || 1; text(sv, V, [m[0] + d[0] / l * 0.35, m[1] + d[1] / l * 0.35], s, cls); }
    seitenLab(B, C, "a", "labA"); seitenLab(A, C, "b", "labB"); seitenLab(A, B, "c", "labC");
    text(sv, V, [A[0] - 0.25, A[1] - 0.05], "A"); text(sv, V, [B[0] + 0.25, B[1] - 0.05], "B");
    sv.appendChild(el("circle", { cx: V.X(C[0]), cy: V.Y(C[1]), r: 12, "class": "ziehpunkt" }));
    text(sv, V, [C[0], C[1] + 0.45], "C");
    var s2 = a * a + b * b, rel = recht ? "=" : s2 > c * c ? ">" : "<";
    $("eGleichung").innerHTML = '<span class="a">a²</span> + <span class="b">b²</span> = ' + zahl(a * a) + " + " + zahl(b * b) + " = " + zahl(s2) + "<br>" + '<span class="c">c²</span> = ' + zahl(c * c) + "<br>" + '<span class="a">a²</span> + <span class="b">b²</span> ' + rel + ' <span class="c">c²</span>';
    $("eWinkel").innerHTML = t("winkelC", { w: bdi(zahl(w, 1) + "°") }) + " " + t(recht ? "eRecht" : s2 > c * c ? "eSpitz" : "eStumpf");
    $("eMerke").textContent = t("eMerke");
  }
  (function(){
    var sv = $("pySvg"), zieh = false;
    function pos(e){ var p = sv.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; var q = p.matrixTransform(sv.getScreenCTM().inverse()); return VE.inv(q.x, q.y); }
    sv.addEventListener("pointerdown", function(e){ if(!VE) return; var p = pos(e); if(abst(p, C) < 1.2){ zieh = true; sv.setPointerCapture(e.pointerId); e.preventDefault(); } });
    sv.addEventListener("pointermove", function(e){
      if(!zieh) return; var p = pos(e);
      p[1] = Math.max(0.6, Math.min(5.5, p[1])); p[0] = Math.max(-1.5, Math.min(7.5, p[0]));
      var d = abst(p, [3, 0]); if(Math.abs(d - 3) < 0.18){ p = [3 + (p[0] - 3) / d * 3, (p[1]) / d * 3]; } // auf den Thaleskreis einrasten
      C = p; entdecken();
    });
    ["pointerup", "pointercancel"].forEach(function(n){ sv.addEventListener(n, function(){ zieh = false; }); });
  })();

  // ---------- Reiter Beweis (Puzzle) ----------
  function beweis(){
    var a = Number($("bA").value), b = Number($("bB").value), s = a + b, tt = Number($("bT").value) / 100, sv = $("bSvg"); leer(sv);
    var V = ansicht(sv, [[0, 0], [s, s]], 420, 420, 20);
    // Dreieck mit rechtem Winkel im Ursprung, Kathete a längs x, b längs y, gedreht um r·90°
    function dreieck(p, r){ var w = r * Math.PI / 2, c = Math.round(Math.cos(w)), si = Math.round(Math.sin(w)); function d(x, y){ return [p[0] + c * x - si * y, p[1] + si * x + c * y]; } return [d(0, 0), d(a, 0), d(0, b)]; }
    var start = [[[0, 0], 0], [[s, 0], 1], [[s, s], 2], [[0, s], 3]], ziel = [[[0, a], 0], [[s, 0], 1], [[a, s], 2], [[a, a], 3]];
    poly(sv, V, [[0, 0], [s, 0], [s, s], [0, s]], "qc").setAttribute("style", "fill:#ffffff");
    // freie Flächen ein-/ausblenden
    var g1 = el("g", { opacity: (1 - tt).toFixed(2) }), g2 = el("g", { opacity: tt.toFixed(2) });
    sv.appendChild(g1); sv.appendChild(g2);
    poly(g1, V, [[a, 0], [s, a], [b, s], [0, b]], "qc"); text(g1, V, [s / 2, s / 2], "c²", "labC");
    poly(g2, V, [[0, 0], [a, 0], [a, a], [0, a]], "qa"); poly(g2, V, [[a, a], [s, a], [s, s], [a, s]], "qb");
    text(g2, V, [a / 2, a / 2], "a²", "labA"); text(g2, V, [a + b / 2, a + b / 2], "b²", "labB");
    start.forEach(function(st, i){ var z = ziel[i], p = [st[0][0] + (z[0][0] - st[0][0]) * tt, st[0][1] + (z[0][1] - st[0][1]) * tt]; poly(sv, V, dreieck(p, st[1]), "puzzleDr"); });
    sv.appendChild(el("rect", { x: V.X(0), y: V.Y(s), width: s * V.k, height: s * V.k, fill: "none", stroke: "#1a2233", "stroke-width": 3 }));
    text(sv, V, [a / 2, -0.35], "a"); text(sv, V, [a + b / 2, -0.35], "b");
    $("tUmlegen").textContent = t("umlegen");
    $("bText").innerHTML = t(tt < 0.5 ? "bVorher" : "bNachher");
    $("bMerke").textContent = t("bMerke");
  }
  ["bA", "bB", "bT"].forEach(function(id){ $(id).addEventListener("input", beweis); });

  // ---------- Reiter Rechner ----------
  var rModus = "c", BSP = { eigen: null, leiter: ["a", "", 1.5, 5], bild: ["c", 80, 45, ""], abstand: ["c", 6, 8, ""], rampe: ["b", 0.5, "", 4], kiste: ["c", 60, 40, ""] };
  function setzeModus(m){ rModus = m; var box = $("rModus"); box.innerHTML = ""; ["c", "a", "b"].forEach(function(k){ var b = document.createElement("button"); b.type = "button"; b.textContent = t("ges_" + k); b.setAttribute("aria-pressed", k === rModus ? "true" : "false"); b.addEventListener("click", function(){ setzeModus(k); }); box.appendChild(b); }); rechner(); }
  function dreieckZeichnen(sv, a, b, ges, werte){
    leer(sv); var V = ansicht(sv, [[0, 0], [b, 0], [0, a]], 400, 300, 40), C0 = [0, 0], Aa = [b, 0], Bb = [0, a];
    poly(sv, V, [C0, Aa, Bb], "dr");
    var rb = rwBogen(V.X(0), V.Y(0), 1, 0, 0, -1, Math.min(a, b) * 0.13 * V.k);
    sv.appendChild(el("path", { d: rb.d, fill: "none", stroke: "#dc2626", "stroke-width": 2 }));
    sv.appendChild(el("circle", { cx: rb.cx, cy: rb.cy, r: 2.5, fill: "#dc2626" }));
    function lab(p, txt, cls){ sv.appendChild(el("text", { x: p[0], y: p[1], "class": "lab " + cls }, txt)); }
    lab([V.X(0) - 22, V.Y(a / 2) + 5], werte.a, "labA" + (ges === "a" ? " h" : ""));
    lab([V.X(b / 2), V.Y(0) + 24], werte.b, "labB" + (ges === "b" ? " h" : ""));
    lab([V.X(b / 2) + 16, V.Y(a / 2) - 10], werte.c, "labC" + (ges === "c" ? " h" : ""));
  }
  function rechner(){
    sicht($("lA"), rModus !== "a"); sicht($("lB"), rModus !== "b"); sicht($("lC"), rModus !== "c");
    var a = lies($("rA").value), b = lies($("rB").value), c = lies($("rC").value), L = [], fe = "";
    if(rModus === "c"){ if(!(a > 0 && b > 0)) fe = t("fehler"); else { c = Math.sqrt(a * a + b * b); L = ["c² = a² + b²", "c² = " + zahl(a) + "² + " + zahl(b) + "² = " + zahl(a * a) + " + " + zahl(b * b) + " = " + zahl(a * a + b * b), "c = √" + zahl(a * a + b * b) + " " + (genau(c) ? "=" : "≈") + " " + zahl(c)]; } }
    else if(rModus === "a"){ if(!(b > 0 && c > 0)) fe = t("fehler"); else if(c <= b) fe = t("fehlerHyp"); else { a = Math.sqrt(c * c - b * b); L = ["a² = c² − b²", "a² = " + zahl(c) + "² − " + zahl(b) + "² = " + zahl(c * c) + " − " + zahl(b * b) + " = " + zahl(c * c - b * b), "a = √" + zahl(c * c - b * b) + " " + (genau(a) ? "=" : "≈") + " " + zahl(a)]; } }
    else { if(!(a > 0 && c > 0)) fe = t("fehler"); else if(c <= a) fe = t("fehlerHyp"); else { b = Math.sqrt(c * c - a * a); L = ["b² = c² − a²", "b² = " + zahl(c) + "² − " + zahl(a) + "² = " + zahl(c * c) + " − " + zahl(a * a) + " = " + zahl(c * c - a * a), "b = √" + zahl(c * c - a * a) + " " + (genau(b) ? "=" : "≈") + " " + zahl(b)]; } }
    $("rFehler").textContent = fe;
    if(fe){ leer($("rSvg")); $("rWeg").innerHTML = ""; $("rErgebnis").innerHTML = ""; return; }
    var bs = $("bsp").value, ein = bs === "eigen" ? "" : " " + t("einh_" + bs);
    dreieckZeichnen($("rSvg"), a, b, rModus, { a: (rModus === "a" ? "a = ?" : "a = " + zahl(a)), b: (rModus === "b" ? "b = ?" : "b = " + zahl(b)), c: (rModus === "c" ? "c = ?" : "c = " + zahl(c)) });
    $("rWeg").innerHTML = L.map(function(x){ return "<li>" + bdi(x) + "</li>"; }).join("");
    var v = rModus === "a" ? a : rModus === "b" ? b : c;
    $("rErgebnis").innerHTML = bdi(rModus + " " + (genau(v) ? "=" : "≈") + " " + zahl(v) + ein) + (bs !== "eigen" ? '<br><span class="zeile" style="font-weight:600;color:var(--text)">' + t("ant_" + bs, { v: bdi(zahl(v) + ein) }) + "</span>" : "");
  }
  ["rA", "rB", "rC"].forEach(function(id){ $(id).addEventListener("input", rechner); });
  $("bsp").addEventListener("change", function(){ var k = $("bsp").value, B2 = BSP[k]; $("rKontext").textContent = k === "eigen" ? t("kontextEigen") : t("ktx_" + k);
    if(B2){ var z = function(v){ return v === "" ? "" : komma() ? String(v).replace(".", ",") : String(v); }; $("rA").value = z(B2[1]); $("rB").value = z(B2[2]); $("rC").value = z(B2[3]); setzeModus(B2[0]); } else rechner(); });

  // ---------- Reiter Üben ----------
  var TRIPEL = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [7, 24, 25], [9, 12, 15], [20, 21, 29], [12, 16, 20]];
  var auf = null, punkte = 0, anzahl = 0, beantwortet = false, letzte = null;
  function neueAufgabe(){
    beantwortet = false; letzte = null;
    var typ = wahl(["hyp", "hyp", "kat", "kat", "umk", "leiter", "abstand", "bild"]), A2 = { typ: typ };
    if(typ === "hyp"){ if(Math.random() < 0.5){ var T = wahl(TRIPEL); A2.a = T[0]; A2.b = T[1]; } else { A2.a = zuf(2, 12); A2.b = zuf(2, 12); } A2.l = Math.hypot(A2.a, A2.b); }
    else if(typ === "kat"){ if(Math.random() < 0.5){ var T2 = wahl(TRIPEL); A2.b = T2[0]; A2.c = T2[2]; } else { A2.b = zuf(2, 10); A2.c = A2.b + zuf(1, 8); } A2.l = Math.sqrt(A2.c * A2.c - A2.b * A2.b); }
    else if(typ === "umk"){ var T3 = wahl(TRIPEL), k = wahl([1, 1, 2]); A2.s = [T3[0] * k, T3[1] * k, T3[2] * k]; if(Math.random() < 0.5){ A2.s[2] += wahl([-1, 1]); } A2.l = A2.s[0] * A2.s[0] + A2.s[1] * A2.s[1] === A2.s[2] * A2.s[2]; A2.s = A2.s.slice().sort(function(){ return Math.random() - 0.5; }); }
    else if(typ === "leiter"){ A2.c = wahl([3, 4, 5, 6, 8]); A2.b = wahl([0.8, 1, 1.2, 1.5, 2]); A2.l = Math.sqrt(A2.c * A2.c - A2.b * A2.b); }
    else if(typ === "abstand"){ A2.P = [zuf(-4, 4), zuf(-4, 4)]; do { A2.Q = [zuf(-5, 8), zuf(-5, 8)]; } while(A2.Q[0] === A2.P[0] || A2.Q[1] === A2.P[1]); A2.l = Math.hypot(A2.Q[0] - A2.P[0], A2.Q[1] - A2.P[1]); }
    else { var T4 = wahl([[16, 9], [4, 3], [16, 10]]), f = zuf(3, 8); A2.a = T4[0] * f; A2.b = T4[1] * f; A2.l = Math.hypot(A2.a, A2.b); }
    auf = A2; zeige();
  }
  function pt(p){ return bdi("(" + zahl(p[0]) + " | " + zahl(p[1]) + ")"); }
  function zeige(){
    var A2 = auf, Z = $("antwortzeile"), sv = $("uSvg");
    sicht(sv, A2.typ === "hyp" || A2.typ === "kat");
    if(A2.typ === "hyp"){ $("auftrag").innerHTML = t("u_hyp"); dreieckZeichnen(sv, A2.a, A2.b, "c", { a: "a = " + zahl(A2.a) + " cm", b: "b = " + zahl(A2.b) + " cm", c: "c = ?" }); }
    else if(A2.typ === "kat"){ $("auftrag").innerHTML = t("u_kat"); var a = Math.sqrt(A2.c * A2.c - A2.b * A2.b); dreieckZeichnen(sv, a, A2.b, "a", { a: "a = ?", b: "b = " + zahl(A2.b) + " cm", c: "c = " + zahl(A2.c) + " cm" }); }
    else if(A2.typ === "umk") $("auftrag").innerHTML = t("u_umk", { s: bdi(A2.s.map(function(x){ return zahl(x) + " cm"; }).join(", ")) });
    else if(A2.typ === "leiter") $("auftrag").innerHTML = t("u_leiter", { c: bdi(zahl(A2.c) + " m"), b: bdi(zahl(A2.b) + " m") });
    else if(A2.typ === "abstand") $("auftrag").innerHTML = t("u_abstand", { p: pt(A2.P), q: pt(A2.Q) });
    else $("auftrag").innerHTML = t("u_bild", { a: bdi(A2.a + " cm"), b: bdi(A2.b + " cm") });
    $("meldung").textContent = ""; $("meldung").className = "meldung"; sicht($("uLauf"), false); Z.innerHTML = "";
    if(A2.typ === "umk"){ [["ja", true], ["nein", false]].forEach(function(x){ var b = document.createElement("button"); b.type = "button"; b.className = "knopf"; b.textContent = t(x[0]); b.addEventListener("click", function(){ pruefe(x[1]); }); Z.appendChild(b); }); }
    else {
      var inp = document.createElement("input"); inp.className = "zahl"; inp.id = "uAntwort"; inp.setAttribute("inputmode", "decimal"); inp.setAttribute("autocomplete", "off"); inp.style.width = "130px";
      inp.addEventListener("keydown", function(e){ if(e.key === "Enter") pruefe(inp.value); });
      var ein = document.createElement("span"); ein.className = "einh"; ein.textContent = A2.typ === "leiter" ? "m" : A2.typ === "abstand" ? "" : "cm";
      var pb = document.createElement("button"); pb.type = "button"; pb.className = "knopf"; pb.id = "pruefen"; pb.textContent = t("pruefen"); pb.addEventListener("click", function(){ pruefe(inp.value); });
      Z.appendChild(inp); Z.appendChild(ein); Z.appendChild(pb);
      var h = document.createElement("span"); h.className = "muted"; h.textContent = t("runden"); Z.appendChild(h);
    }
    $("weiter").textContent = t("weiterA"); $("punkte").textContent = t("punkte", { p: punkte, n: anzahl });
  }
  function pruefe(e){
    if(beantwortet) return;
    var A2 = auf, ok, lt, L = [];
    if(A2.typ === "umk"){ ok = e === A2.l; lt = t(A2.l ? "ja" : "nein"); var s = A2.s.slice().sort(function(x, y){ return x - y; }); L.push(bdi(s[0] + "² + " + s[1] + "² = " + (s[0] * s[0] + s[1] * s[1]) + (A2.l ? " = " : " ≠ ") + s[2] + "² = " + s[2] * s[2])); L.push(t(A2.l ? "umkJa" : "umkNein")); }
    else {
      var v = lies(e); if(!isFinite(v)) return;
      ok = Math.abs(v - A2.l) <= Math.max(0.011, A2.l * 0.003); lt = zg(A2.l);
      if(A2.typ === "hyp" || A2.typ === "bild") L.push(bdi("c = √(" + zahl(A2.a) + "² + " + zahl(A2.b) + "²) = √(" + zahl(A2.a * A2.a) + " + " + zahl(A2.b * A2.b) + ") = √" + zahl(A2.a * A2.a + A2.b * A2.b) + " " + (genau(A2.l) ? "=" : "≈") + " " + zahl(A2.l)));
      else if(A2.typ === "kat" || A2.typ === "leiter") L.push(bdi((A2.typ === "kat" ? "a" : "h") + " = √(" + zahl(A2.c) + "² − " + zahl(A2.b) + "²) = √(" + zahl(A2.c * A2.c) + " − " + zahl(A2.b * A2.b) + ") = √" + zahl(A2.c * A2.c - A2.b * A2.b) + " " + (genau(A2.l) ? "=" : "≈") + " " + zahl(A2.l)));
      else { var dx = A2.Q[0] - A2.P[0], dy = A2.Q[1] - A2.P[1]; L.push(t("abstandWeg", { x: bdi(zahl(Math.abs(dx))), y: bdi(zahl(Math.abs(dy))) })); L.push(bdi("d = √(" + zahl(Math.abs(dx)) + "² + " + zahl(Math.abs(dy)) + "²) = √(" + (dx * dx) + " + " + (dy * dy) + ") = √" + (dx * dx + dy * dy) + " " + (genau(A2.l) ? "=" : "≈") + " " + zahl(A2.l))); }
    }
    letzte = e; beantwortet = true; anzahl++; if(ok) punkte++;
    var m = $("meldung"); m.className = "meldung " + (ok ? "gut" : "schlecht"); m.innerHTML = ok ? t("richtig") + " " + bdi(lt) : t("falsch", { l: bdi(lt) });
    $("antwortzeile").querySelectorAll("button").forEach(function(b){ if(A2.typ === "umk") b.disabled = true; });
    $("uLauf").innerHTML = L.map(function(s){ return "<li>" + s + "</li>"; }).join(""); sicht($("uLauf"), true);
    $("punkte").textContent = t("punkte", { p: punkte, n: anzahl });
  }
  $("weiter").addEventListener("click", neueAufgabe);

  // ---------- Reiter & Texte ----------
  var tab = "entdecken", TABS = ["entdecken", "beweis", "rechner", "ueben"];
  function zeigeTab(k){
    tab = k;
    document.querySelectorAll(".tabs button").forEach(function(b){ b.setAttribute("aria-selected", b.dataset.tab === k ? "true" : "false"); });
    TABS.forEach(function(x){ sicht($("s_" + x), x === k); });
    if(k === "ueben" && !auf) neueAufgabe();
    alles(true);
  }
  document.querySelectorAll(".tabs button").forEach(function(b){ b.addEventListener("click", function(){ zeigeTab(b.dataset.tab); }); });
  var erstesMal = true;
  function alles(nurRechnen){
    if(!nurRechnen){
      document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.title = "miStudia – " + t("titel"); $("titel").textContent = t("titel");
      document.querySelectorAll(".tabs button").forEach(function(b){ b.textContent = t("tab_" + b.dataset.tab); });
      $("eHinweis").textContent = t("eHinweis");
      var bv = $("bsp").value || "eigen"; $("bsp").innerHTML = ["eigen", "leiter", "bild", "abstand", "rampe", "kiste"].map(function(k){ return '<option value="' + k + '">' + t("bsp_" + k) + "</option>"; }).join(""); $("bsp").value = bv;
      $("tBsp").textContent = t("bspL"); $("tGes").textContent = t("gesucht");
      $("rKontext").textContent = bv === "eigen" ? t("kontextEigen") : t("ktx_" + bv);
      if(erstesMal){ erstesMal = false; $("rA").value = "3"; $("rB").value = "4"; }
      setzeModus(rModus);
    }
    if(tab === "entdecken") entdecken(); else if(tab === "beweis") beweis(); else if(tab === "rechner") rechner();
    if(!nurRechnen && auf){ var war = beantwortet, e = letzte, gut = $("meldung").classList.contains("gut"); zeige(); if(war){ beantwortet = false; anzahl--; if(gut) punkte--; if($("uAntwort")) $("uAntwort").value = e; pruefe(e); } }
  }
  window.MS_LANG = { apply: function(l){ if(PY[l]){ lang = l; alles(); } } };
  alles();
})();
