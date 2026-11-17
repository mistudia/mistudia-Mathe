// ============================================================
// vektoren/app.js – Vektorrechnung
// 2D: Vektoren a, b an den Spitzen ziehen (Raster 0,5); Addition mit
//   Parallelogramm, Subtraktion, Vielfaches k · a, Skalarprodukt und Winkel.
// 3D: Punkte A, B, C → Vektoren AB, AC, Länge, Mittelpunkt, Skalarprodukt,
//   Winkel, Kreuzprodukt, Parallelogramm-/Dreiecksfläche; Schrägbild.
// Geraden: x = p + t · u, Lage zweier Geraden (identisch, parallel,
//   schneidend mit Schnittpunkt, windschief) Schritt für Schritt.
// Üben: Verbindungsvektor, Betrag, Skalarprodukt, orthogonal?, Winkel,
//   Mittelpunkt, Kreuzprodukt, Lage zweier Geraden.
// Texte: vektoren/texte.js (VK), Sprache aus dem Startmenü (MS_LANG).
// ============================================================
(function(){
  "use strict";
  var NS = "http://www.w3.org/2000/svg", lang = "de";
  function $(id){ return document.getElementById(id); }
  function t(k, v){ var s = (VK[lang] && VK[lang][k] != null) ? VK[lang][k] : VK.de[k] != null ? VK.de[k] : k; if(v) for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  function el(n, a, txt){ var e = document.createElementNS(NS, n); for(var k in a) if(a[k] != null) e.setAttribute(k, a[k]); if(txt != null) e.textContent = txt; return e; }
  function leer(s){ while(s.lastChild) s.removeChild(s.lastChild); }
  function sicht(e, an){ if(an) e.removeAttribute("hidden"); else e.setAttribute("hidden", ""); }
  function bdi(s){ return '<bdi dir="ltr">' + s + "</bdi>"; }
  function zuf(a, b){ return a + Math.floor(Math.random() * (b - a + 1)); }
  function wahl(L){ return L[Math.floor(Math.random() * L.length)]; }
  function komma(){ return !(lang === "en" || lang === "zh" || lang === "ja" || lang === "ar"); }
  function zahl(v, d){ if(d == null) d = 2; var r = Math.round(v * Math.pow(10, d)) / Math.pow(10, d); if(Object.is(r, -0)) r = 0; var s = String(Math.abs(r)); if(s.indexOf("e") >= 0) s = Math.abs(r).toFixed(d); if(komma()) s = s.replace(".", ","); return (r < 0 ? "−" : "") + s; }
  function kz(x){ return x < 0 ? "(" + zahl(x) + ")" : zahl(x); }
  function sumZ(L){ return L.map(function(x, i){ return i ? (x < 0 ? " − " + zahl(-x) : " + " + zahl(x)) : zahl(x); }).join(""); }
  // Skalarprodukt ausführlich: (−3) · (−3) + (−2) · 11 = 9 − 22 = −13
  function skTxt(a, b){ var P = a.map(function(x, i){ return x * b[i]; }), r = P.reduce(function(s, x){ return s + x; }, 0);
    return a.map(function(x, i){ return kz(x) + " · " + kz(b[i]); }).join(" + ") + (a.length > 1 ? " = " + sumZ(P) : "") + " = " + zahl(r); }
  // Betrag ausführlich: √((−1)² + 4²) = √(1 + 16) = √17
  function btTxt(v){ var Q = v.map(function(x){ return x * x; }); return "√(" + v.map(function(x){ return kz(x) + "²"; }).join(" + ") + ") = √(" + Q.map(zahl).join(" + ") + ") = √" + zahl(Q.reduce(function(s, x){ return s + x; }, 0)); }
  function genau(v, d){ d = d == null ? 2 : d; return Math.abs(v * Math.pow(10, d) - Math.round(v * Math.pow(10, d))) < 1e-7; }
  function gl(v, d){ return genau(v, d) ? "=" : "≈"; }
  function zg(v, d){ return (genau(v, d) ? "" : "≈ ") + zahl(v, d); }
  function lies(s){ s = String(s).trim().replace(/[−–]/g, "-").replace(",", "."); return s === "" ? NaN : Number(s); }
  // Vektoralgebra
  function sub(a, b){ return a.map(function(x, i){ return x - b[i]; }); }
  function add(a, b){ return a.map(function(x, i){ return x + b[i]; }); }
  function mul(k, a){ return a.map(function(x){ return k * x; }); }
  function dot(a, b){ return a.reduce(function(s, x, i){ return s + x * b[i]; }, 0); }
  function len(a){ return Math.sqrt(dot(a, a)); }
  function kreuz(a, b){ return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function nullV(a){ return a.every(function(x){ return Math.abs(x) < 1e-9; }); }
  function vk(v, d){ return '<span class="vk">' + v.map(function(x){ return "<span>" + zahl(x, d) + "</span>"; }).join("") + "</span>"; }
  function winkel(a, b){ var c = dot(a, b) / (len(a) * len(b)); return Math.acos(Math.max(-1, Math.min(1, c))) * 180 / Math.PI; }
  function pfeil(sv, x1, y1, x2, y2, farbe, cls){
    var dx = x2 - x1, dy = y2 - y1, l = Math.hypot(dx, dy); if(l < 1) return;
    var ux = dx / l, uy = dy / l, s = Math.min(14, l * 0.4), bx = x2 - ux * s, by = y2 - uy * s;
    sv.appendChild(el("line", { x1: x1, y1: y1, x2: bx, y2: by, stroke: farbe, "class": cls || "vek" }));
    sv.appendChild(el("polygon", { points: x2 + "," + y2 + " " + (bx - uy * s * 0.45) + "," + (by + ux * s * 0.45) + " " + (bx + uy * s * 0.45) + "," + (by - ux * s * 0.45), fill: farbe }));
  }

  // ---------- Reiter 2D ----------
  var A2 = [3, 1], B2 = [1, 3], op = "add", OPS = ["add", "sub", "mult", "skalar"], R = 6, S2 = 420 / (2 * R + 1);
  function X(x){ return (x + R + 0.5) * S2; } function Y(y){ return (R + 0.5 - y) * S2; }
  var FA = "#2563eb", FB = "#16a34a", FE = "#dc2626";
  function zwei(){
    var sv = $("vSvg"); leer(sv);
    for(var i = -R; i <= R; i++){ sv.appendChild(el("line", { x1: X(i), y1: Y(-R), x2: X(i), y2: Y(R), "class": "gitter" })); sv.appendChild(el("line", { x1: X(-R), y1: Y(i), x2: X(R), y2: Y(i), "class": "gitter" })); }
    sv.appendChild(el("line", { x1: X(-R), y1: Y(0), x2: X(R), y2: Y(0), "class": "achse" })); sv.appendChild(el("line", { x1: X(0), y1: Y(-R), x2: X(0), y2: Y(R), "class": "achse" }));
    for(var j = -R + 1; j < R; j += 2){ if(j) { sv.appendChild(el("text", { x: X(j), y: Y(0) + 15, "class": "ko-zahl" }, zahl(j))); sv.appendChild(el("text", { x: X(0) - 10, y: Y(j) + 4, "class": "ko-zahl" }, zahl(j))); } }
    var a = A2, b = B2, k = Number($("k").value), L = [];
    function lab(p, txt, f){ sv.appendChild(el("text", { x: X(p[0]) + 8, y: Y(p[1]) - 8, "class": "vlab", fill: f }, txt)); }
    if(op === "add"){
      var s = add(a, b);
      sv.appendChild(el("polygon", { points: [[0, 0], a, s, b].map(function(p){ return X(p[0]) + "," + Y(p[1]); }).join(" "), fill: "rgba(220,38,38,0.07)", stroke: "none" }));
      pfeil(sv, X(a[0]), Y(a[1]), X(s[0]), Y(s[1]), FB, "hilf"); pfeil(sv, X(b[0]), Y(b[1]), X(s[0]), Y(s[1]), FA, "hilf");
      pfeil(sv, X(0), Y(0), X(s[0]), Y(s[1]), FE); lab(s, "a + b", FE);
      L.push(bdi("a + b = " + vk(a) + " + " + vk(b) + " = " + vk(s)));
      L.push(t("laenge") + " " + bdi("|a + b| = √(" + zahl(s[0]) + "² + " + zahl(s[1]) + "²) " + gl(len(s)) + " " + zahl(len(s))));
    } else if(op === "sub"){
      var d = sub(a, b);
      pfeil(sv, X(a[0]), Y(a[1]), X(d[0]), Y(d[1]), FB, "hilf"); lab([(a[0] + d[0]) / 2, (a[1] + d[1]) / 2], "−b", FB);
      pfeil(sv, X(b[0]), Y(b[1]), X(a[0]), Y(a[1]), "#94a3b8", "hilf");
      pfeil(sv, X(0), Y(0), X(d[0]), Y(d[1]), FE); lab(d, "a − b", FE);
      L.push(bdi("a − b = " + vk(a) + " − " + vk(b) + " = " + vk(d)));
      L.push(t("subInfo"));
    } else if(op === "mult"){
      var m = mul(k, a);
      pfeil(sv, X(0), Y(0), X(m[0]), Y(m[1]), FE); lab(m, zahl(k) + " · a", FE);
      L.push(bdi(zahl(k) + " · " + vk(a) + " = " + vk(m)));
      L.push(t(k < 0 ? "multNeg" : Math.abs(k) > 1 ? "multGross" : "multKlein", { k: bdi(zahl(Math.abs(k))) }));
      L.push(t("laenge") + " " + bdi("|" + zahl(k) + " · a| = " + zahl(Math.abs(k)) + " · " + zahl(len(a)) + " " + gl(len(m)) + " " + zahl(len(m))));
    } else {
      var w = winkel(a, b), sp = dot(a, b), r = 1.1, wa = Math.atan2(a[1], a[0]), wb = Math.atan2(b[1], b[0]);
      var w1 = wa, w2 = wb; if(((w2 - w1) + 4 * Math.PI) % (2 * Math.PI) > Math.PI){ var tmp = w1; w1 = w2; w2 = tmp; }
      var p1 = [r * Math.cos(w1), r * Math.sin(w1)], p2 = [r * Math.cos(w2), r * Math.sin(w2)];
      if(len(a) > 0 && len(b) > 0) sv.appendChild(el("path", { d: "M" + X(0) + " " + Y(0) + " L" + X(p1[0]) + " " + Y(p1[1]) + " A" + r * S2 + " " + r * S2 + " 0 0 0 " + X(p2[0]) + " " + Y(p2[1]) + " Z", "class": "bogen" }));
      L.push(t("skalarL") + " " + bdi("a · b = " + skTxt(a, b)));
      L.push(bdi("|a| " + gl(len(a)) + " " + zahl(len(a)) + ", |b| " + gl(len(b)) + " " + zahl(len(b))));
      L.push(t("winkelL") + " " + bdi("cos φ = " + zahl(sp) + " : (" + zahl(len(a)) + " · " + zahl(len(b)) + ") " + gl(sp / (len(a) * len(b)), 4) + " " + zahl(sp / (len(a) * len(b)), 4) + " → φ " + gl(w, 1) + " " + zahl(w, 1) + "°"));
      L.push(t(Math.abs(sp) < 1e-9 ? "orthoJa" : sp > 0 ? "spitz" : "stumpf"));
    }
    pfeil(sv, X(0), Y(0), X(a[0]), Y(a[1]), FA); pfeil(sv, X(0), Y(0), X(b[0]), Y(b[1]), FB);
    lab(a, "a", FA); lab(b, "b", FB);
    sv.appendChild(el("circle", { cx: X(a[0]), cy: Y(a[1]), r: 11, fill: FA, "class": "griff", "data-v": "a" }));
    sv.appendChild(el("circle", { cx: X(b[0]), cy: Y(b[1]), r: 11, fill: FB, "class": "griff", "data-v": "b" }));
    $("zRech").innerHTML = "<b>a</b> = " + vk(a) + "&nbsp; <b>b</b> = " + vk(b) + "<br>" + L.join("<br>");
    $("zMerke").textContent = t("m_" + op);
    sicht($("kBox"), op === "mult"); $("kW").textContent = zahl(k);
  }
  (function(){
    var sv = $("vSvg"), zieh = null;
    function pos(e){ var p = sv.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; var q = p.matrixTransform(sv.getScreenCTM().inverse()); return [Math.max(-R, Math.min(R, Math.round((q.x / S2 - R - 0.5) * 2) / 2)), Math.max(-R, Math.min(R, Math.round((R + 0.5 - q.y / S2) * 2) / 2))]; }
    sv.addEventListener("pointerdown", function(e){ var p = pos(e), da = Math.hypot(p[0] - A2[0], p[1] - A2[1]), db = Math.hypot(p[0] - B2[0], p[1] - B2[1]); if(Math.min(da, db) > 1.2) return; zieh = da <= db ? "a" : "b"; sv.setPointerCapture(e.pointerId); e.preventDefault(); });
    sv.addEventListener("pointermove", function(e){ if(!zieh) return; var p = pos(e); if(zieh === "a") A2 = p; else B2 = p; zwei(); });
    ["pointerup", "pointercancel"].forEach(function(n){ sv.addEventListener(n, function(){ zieh = null; }); });
  })();
  $("k").addEventListener("input", zwei);
  function setzeOp(o){ op = o; var box = $("op"); box.innerHTML = ""; OPS.forEach(function(x){ var b = document.createElement("button"); b.type = "button"; b.textContent = t("op_" + x); b.setAttribute("aria-pressed", x === op ? "true" : "false"); b.addEventListener("click", function(){ setzeOp(x); }); box.appendChild(b); }); zwei(); }

  // ---------- Schrägbild ----------
  function schraeg(sv, punkte, W, H){
    var proj = function(p){ return [p[1] - 0.354 * p[0], p[2] - 0.354 * p[0]]; };
    var ax = Math.max(4, Math.ceil(Math.max.apply(0, punkte.map(function(p){ return Math.max(Math.abs(p[0]), Math.abs(p[1]), Math.abs(p[2])); })) + 1));
    var alle = punkte.map(proj).concat([[0, 0], proj([ax, 0, 0]), proj([0, ax, 0]), proj([0, 0, ax])]);
    var x0 = Math.min.apply(0, alle.map(function(p){ return p[0]; })), x1 = Math.max.apply(0, alle.map(function(p){ return p[0]; }));
    var y0 = Math.min.apply(0, alle.map(function(p){ return p[1]; })), y1 = Math.max.apply(0, alle.map(function(p){ return p[1]; }));
    var k = Math.min((W - 60) / (x1 - x0 || 1), (H - 60) / (y1 - y0 || 1)), ox = (W - (x1 - x0) * k) / 2 - x0 * k, oy = (H + (y1 - y0) * k) / 2 + y0 * k;
    sv.setAttribute("viewBox", "0 0 " + W + " " + H); leer(sv);
    var P = function(p){ var q = proj(p); return [ox + q[0] * k, oy - q[1] * k]; };
    [[ax, 0, 0, "x₁"], [0, ax, 0, "x₂"], [0, 0, ax, "x₃"]].forEach(function(a){ var o = P([0, 0, 0]), e = P(a); pfeil(sv, o[0], o[1], e[0], e[1], "#64748b", "ax3"); sv.appendChild(el("text", { x: e[0] + 6, y: e[1] - 4, "class": "ko-zahl", style: "font-weight:700" }, a[3])); });
    for(var i = 1; i < ax; i++){ [[i, 0, 0], [0, i, 0], [0, 0, i]].forEach(function(q){ var p = P(q); sv.appendChild(el("circle", { cx: p[0], cy: p[1], r: 1.6, fill: "#64748b" })); }); }
    return P;
  }

  // ---------- Reiter 3D ----------
  var D = { A: [1, 2, 0], B: [4, 3, 2], C: [2, 5, 1] };
  function vecEingabe(box, name, wert, beiAenderung, prefix){
    var l = document.createElement("label"); l.innerHTML = "<span>" + name + "</span>";
    var w = document.createElement("span"); w.className = "vin"; w.appendChild(document.createTextNode("("));
    wert.forEach(function(v, i){ var inp = document.createElement("input"); inp.className = "zahl"; inp.id = prefix + i; inp.value = komma() ? String(v).replace(".", ",") : v; inp.setAttribute("inputmode", "decimal"); inp.addEventListener("input", beiAenderung); w.appendChild(inp); if(i < 2) w.appendChild(document.createTextNode("|")); });
    w.appendChild(document.createTextNode(")")); l.appendChild(w); box.appendChild(l);
  }
  function liesV(prefix){ var v = [0, 1, 2].map(function(i){ return lies($(prefix + i).value); }); return v.every(isFinite) ? v : null; }
  function drei(){
    var A = liesV("dA"), B = liesV("dB"), C = liesV("dC");
    $("dFehler").textContent = A && B && C ? "" : t("fehlerZahl");
    if(!(A && B && C)){ $("dErg").innerHTML = ""; $("dErg2").innerHTML = ""; leer($("dSvg")); return; }
    var AB = sub(B, A), AC = sub(C, A), M = mul(0.5, add(A, B)), sp = dot(AB, AC), kr = kreuz(AB, AC), w = len(AB) && len(AC) ? winkel(AB, AC) : NaN;
    var P = schraeg($("dSvg"), [A, B, C], 420, 380), pA = P(A), pB = P(B), pC = P(C);
    $("dSvg").appendChild(el("polygon", { points: [pA, pB, pC].map(function(p){ return p.join(","); }).join(" "), fill: "rgba(245,158,11,0.18)", stroke: "#b45309", "stroke-width": 1.5, "stroke-dasharray": "5 4" }));
    pfeil($("dSvg"), pA[0], pA[1], pB[0], pB[1], FA); pfeil($("dSvg"), pA[0], pA[1], pC[0], pC[1], FB);
    [["A", pA], ["B", pB], ["C", pC]].forEach(function(q){ $("dSvg").appendChild(el("circle", { cx: q[1][0], cy: q[1][1], r: 5, fill: "#1a2233" })); $("dSvg").appendChild(el("text", { x: q[1][0] + 7, y: q[1][1] - 7, "class": "vlab", fill: "#1a2233" }, q[0])); });
    var pM = P(M); $("dSvg").appendChild(el("circle", { cx: pM[0], cy: pM[1], r: 4, fill: FE })); $("dSvg").appendChild(el("text", { x: pM[0] - 20, y: pM[1] + 4, "class": "vlab", fill: FE }, "M"));
    function karte(h, s){ return "<div><h3>" + h + "</h3>" + s + "</div>"; }
    $("dErg").innerHTML = karte(t("h_vek"), "AB = B − A = " + vk(AB) + "<br>AC = C − A = " + vk(AC)) +
      karte(t("h_laenge"), "|AB| = " + btTxt(AB) + " " + gl(len(AB)) + " " + zahl(len(AB)) + "<br>|AC| " + gl(len(AC)) + " " + zahl(len(AC)));
    $("dErg2").innerHTML = karte(t("h_mitte"), "M = ½ · (A + B) = " + vk(M)) +
      karte(t("h_skalar"), "AB · AC = " + skTxt(AB, AC) + "<br>" + t(Math.abs(sp) < 1e-9 ? "orthoJa" : "orthoNein")) +
      karte(t("h_winkel"), isFinite(w) ? "cos α = " + zahl(sp) + " : (" + zahl(len(AB)) + " · " + zahl(len(AC)) + ") → α " + gl(w, 1) + " " + zahl(w, 1) + "°" : "–") +
      karte(t("h_kreuz"), "AB × AC = " + vk(kr) + "<br>" + t("flaecheP") + " |AB × AC| " + gl(len(kr)) + " " + zahl(len(kr)) + "<br>" + t("flaecheD") + " " + gl(len(kr) / 2) + " " + zahl(len(kr) / 2) + (nullV(kr) ? "<br>" + t("kollinear") : ""));
  }

  // ---------- Reiter Geraden ----------
  var BSPG = { schnitt: [[1, 0, 2], [1, 2, -1], [3, 4, 0], [0, -1, 1]], parallel: [[0, 0, 0], [1, 1, 2], [2, 0, 1], [2, 2, 4]], ident: [[1, 1, 1], [2, 0, 1], [3, 1, 2], [-4, 0, -2]], wind: [[0, 0, 0], [1, 0, 0], [0, 1, 1], [0, 0, 1]] };
  function lageBerechnen(p, u, q, v){
    var w = sub(q, p);
    if(nullV(u) || nullV(v)) return { art: "fehler" };
    if(nullV(kreuz(u, v))) return { art: nullV(kreuz(w, u)) ? "ident" : "parallel" };
    var I = [[0, 1], [0, 2], [1, 2]];
    for(var n = 0; n < 3; n++){
      var i = I[n][0], j = I[n][1], det = u[i] * (-v[j]) - (-v[i]) * u[j];
      if(Math.abs(det) > 1e-9){
        var tt = (w[i] * (-v[j]) - (-v[i]) * w[j]) / det, s = (u[i] * w[j] - u[j] * w[i]) / det, k = 3 - i - j;
        var rest = p[k] + tt * u[k] - (q[k] + s * v[k]);
        return { art: Math.abs(rest) < 1e-9 ? "schnitt" : "wind", t: tt, s: s, i: i, j: j, k: k, rest: rest, S: add(p, mul(tt, u)) };
      }
    }
    return { art: "fehler" };
  }
  function geraden(){
    var p = liesV("gp"), u = liesV("gu"), q = liesV("gq"), v = liesV("gv");
    $("gFehler").textContent = p && u && q && v ? "" : t("fehlerZahl");
    if(!(p && u && q && v)){ ["gLage", "gWeg"].forEach(function(id){ $(id).innerHTML = ""; }); leer($("gSvg2")); return; }
    var Lg = lageBerechnen(p, u, q, v), W = [];
    if(Lg.art === "fehler"){ $("gFehler").textContent = t("fehlerRicht"); return; }
    $("gLage").innerHTML = t("lage_" + Lg.art) + (Lg.art === "schnitt" ? " " + bdi("S" + "(" + Lg.S.map(function(x){ return zahl(x); }).join(" | ") + ")") : "");
    var kr = kreuz(u, v);
    W.push(t("w_richt") + " " + (nullV(kr) ? t("w_vielfach") : t("w_keinVielfach")));
    if(Lg.art === "ident" || Lg.art === "parallel") W.push(t("w_punkt") + " " + t(Lg.art === "ident" ? "w_punktJa" : "w_punktNein"));
    else {
      function term(c, k, n){ if(k === 0) return zahl(c); var kk = Math.abs(k) === 1 ? "" : zahl(Math.abs(k)); return (c === 0 ? (k < 0 ? "−" : "") : zahl(c) + (k < 0 ? " − " : " + ")) + kk + n; }
      W.push(t("w_gleich") + "<br>" + [0, 1, 2].map(function(i){ return bdi(term(p[i], u[i], "t") + " = " + term(q[i], v[i], "s")); }).join("<br>"));
      W.push(t("w_loes", { a: Lg.i + 1, b: Lg.j + 1 }) + " " + bdi("t " + gl(Lg.t) + " " + zahl(Lg.t) + ", s " + gl(Lg.s) + " " + zahl(Lg.s)));
      W.push(t("w_probe", { c: Lg.k + 1 }) + " " + t(Lg.art === "schnitt" ? "w_probeJa" : "w_probeNein"));
    }
    $("gWeg").innerHTML = W.map(function(s){ return "<li>" + s + "</li>"; }).join("");
    var g1 = [add(p, mul(-2, u)), add(p, mul(2, u))], g2 = [add(q, mul(-2, v)), add(q, mul(2, v))];
    var P = schraeg($("gSvg2"), g1.concat(g2).concat(Lg.S ? [Lg.S] : []), 420, 380);
    var a1 = P(g1[0]), b1 = P(g1[1]), a2 = P(g2[0]), b2 = P(g2[1]);
    $("gSvg2").appendChild(el("line", { x1: a1[0], y1: a1[1], x2: b1[0], y2: b1[1], stroke: FA, "stroke-width": 3 }));
    $("gSvg2").appendChild(el("line", { x1: a2[0], y1: a2[1], x2: b2[0], y2: b2[1], stroke: FB, "stroke-width": 3, "stroke-dasharray": Lg.art === "ident" ? "8 6" : null }));
    $("gSvg2").appendChild(el("text", { x: b1[0] + 6, y: b1[1], "class": "vlab", fill: FA }, "g")); $("gSvg2").appendChild(el("text", { x: b2[0] + 6, y: b2[1] + 14, "class": "vlab", fill: FB }, "h"));
    if(Lg.S){ var s = P(Lg.S); $("gSvg2").appendChild(el("circle", { cx: s[0], cy: s[1], r: 7, fill: FE, stroke: "#fff", "stroke-width": 2 })); $("gSvg2").appendChild(el("text", { x: s[0] + 8, y: s[1] - 8, "class": "vlab", fill: FE }, "S")); }
    $("gText").innerHTML = t("gText"); $("gMerke").textContent = t("gMerke");
  }

  // ---------- Reiter Üben ----------
  var auf = null, punkte = 0, anzahl = 0, beantwortet = false, zweiterV = false, letzte = null;
  function rv(a, b){ return [zuf(a, b), zuf(a, b), zuf(a, b)]; }
  function neueAufgabe(){
    beantwortet = false; zweiterV = false; letzte = null;
    var typ = wahl(["ab", "betrag", "skalar", "ortho", "winkel", "mitte", "kreuz", "lage"]), A = { typ: typ };
    if(typ === "ab"){ A.P = rv(-5, 6); A.Q = rv(-5, 6); A.l = sub(A.Q, A.P); A.n = 3; }
    else if(typ === "betrag"){ var T = wahl([[1, 2, 2], [2, 3, 6], [2, 6, 9], [4, 4, 7], [1, 4, 8], [2, 10, 11], [3, 4, 12]]); A.v = T.map(function(x){ return x * wahl([1, -1]); }).sort(function(){ return Math.random() - 0.5; }); A.l = len(A.v); A.n = 1; }
    else if(typ === "skalar"){ A.a = rv(-5, 5); A.b = rv(-5, 5); A.l = dot(A.a, A.b); A.n = 1; }
    else if(typ === "ortho"){ A.a = rv(-4, 4); if(nullV(A.a)) A.a = [1, 2, 3]; if(Math.random() < 0.5){ var x = rv(-3, 3), k = kreuz(A.a, x); A.b = nullV(k) ? [A.a[1], -A.a[0], 0] : k; } else { A.b = rv(-4, 4); } if(nullV(A.b)) A.b = [1, 1, 1]; A.l = dot(A.a, A.b) === 0; }
    else if(typ === "winkel"){ do { A.a = rv(-4, 4); A.b = rv(-4, 4); } while(nullV(A.a) || nullV(A.b)); A.l = winkel(A.a, A.b); A.n = 1; }
    else if(typ === "mitte"){ A.P = rv(-6, 6); A.Q = rv(-6, 6); A.l = mul(0.5, add(A.P, A.Q)); A.n = 3; }
    else if(typ === "kreuz"){ A.a = rv(-3, 3); A.b = rv(-3, 3); A.l = kreuz(A.a, A.b); A.n = 3; }
    else { var art = wahl(["schnitt", "parallel", "ident", "wind"]), B = BSPG[art]; var sh = rv(-2, 2); A.p = add(B[0], sh); A.u = mul(wahl([1, -1, 2]), B[1]); A.q = add(B[2], sh); A.v = B[3]; A.l = lageBerechnen(A.p, A.u, A.q, A.v).art; }
    auf = A; zeige();
  }
  function pk(P){ return bdi("(" + P.map(function(x){ return zahl(x); }).join(" | ") + ")"); }
  function zeige(){
    var A = auf, Z = $("antwortzeile"); Z.innerHTML = "";
    if(A.typ === "ab") $("auftrag").innerHTML = t("u_ab", { p: pk(A.P), q: pk(A.Q) });
    else if(A.typ === "betrag") $("auftrag").innerHTML = t("u_betrag", { v: bdi(vk(A.v)) });
    else if(A.typ === "skalar") $("auftrag").innerHTML = t("u_skalar", { a: bdi(vk(A.a)), b: bdi(vk(A.b)) });
    else if(A.typ === "ortho") $("auftrag").innerHTML = t("u_ortho", { a: bdi(vk(A.a)), b: bdi(vk(A.b)) });
    else if(A.typ === "winkel") $("auftrag").innerHTML = t("u_winkel", { a: bdi(vk(A.a)), b: bdi(vk(A.b)) });
    else if(A.typ === "mitte") $("auftrag").innerHTML = t("u_mitte", { p: pk(A.P), q: pk(A.Q) });
    else if(A.typ === "kreuz") $("auftrag").innerHTML = t("u_kreuz", { a: bdi(vk(A.a)), b: bdi(vk(A.b)) });
    else $("auftrag").innerHTML = t("u_lage") + "<br>" + bdi("g: x = " + vk(A.p) + " + t · " + vk(A.u)) + "<br>" + bdi("h: x = " + vk(A.q) + " + s · " + vk(A.v));
    $("meldung").textContent = ""; $("meldung").className = "meldung"; sicht($("uLauf"), false);
    if(A.typ === "ortho") [["ja", true], ["nein", false]].forEach(function(x){ Z.appendChild(knopf(t(x[0]), function(){ pruefe(x[1]); })); });
    else if(A.typ === "lage") ["schnitt", "parallel", "ident", "wind"].forEach(function(x){ Z.appendChild(knopf(t("lageK_" + x), function(){ pruefe(x); }, "hell")); });
    else {
      var ins = [], w = document.createElement("span"); w.className = "vin";
      if(A.n === 3) w.appendChild(document.createTextNode("("));
      for(var i = 0; i < A.n; i++){ var inp = document.createElement("input"); inp.className = "zahl"; inp.id = "uA" + i; inp.setAttribute("inputmode", "decimal"); inp.setAttribute("autocomplete", "off"); inp.style.width = A.n === 1 ? "120px" : "64px"; inp.addEventListener("keydown", function(e){ if(e.key === "Enter") los(); }); w.appendChild(inp); ins.push(inp); if(A.n === 3 && i < 2) w.appendChild(document.createTextNode("|")); }
      if(A.n === 3) w.appendChild(document.createTextNode(")"));
      Z.appendChild(w);
      var los = function(){ pruefe(ins.map(function(x){ return x.value; })); };
      Z.appendChild(knopf(t("pruefen"), los));
    }
    $("uHinweis").textContent = A.typ === "winkel" ? t("rundenGrad") : A.typ === "betrag" ? t("rundenZ") : "";
    $("weiter").textContent = t("weiterA"); $("punkte").textContent = t("punkte", { p: punkte, n: anzahl });
  }
  function knopf(txt, f, cls){ var b = document.createElement("button"); b.type = "button"; b.className = "knopf" + (cls ? " " + cls : ""); b.textContent = txt; b.addEventListener("click", f); return b; }
  function pruefe(e){
    if(beantwortet) return;
    var A = auf, ok, lt, L = [];
    if(A.typ === "ortho"){ ok = e === A.l; lt = t(A.l ? "ja" : "nein"); L.push(bdi("a · b = " + skTxt(A.a, A.b)) + " " + t(A.l ? "orthoJa" : "orthoNein")); }
    else if(A.typ === "lage"){ ok = e === A.l; lt = t("lageK_" + A.l); var Lg = lageBerechnen(A.p, A.u, A.q, A.v); L.push(t("w_richt") + " " + t(nullV(kreuz(A.u, A.v)) ? "w_vielfach" : "w_keinVielfach")); if(Lg.S) L.push(bdi("t = " + zahl(Lg.t) + ", s = " + zahl(Lg.s) + " → S" + pk(Lg.S))); else if(Lg.art === "wind") L.push(t("w_probe", { c: Lg.k + 1 }) + " " + t("w_probeNein")); else L.push(t("w_punkt") + " " + t(Lg.art === "ident" ? "w_punktJa" : "w_punktNein")); }
    else {
      var v = e.map(lies); if(!v.every(isFinite)) return;
      var ziel = Array.isArray(A.l) ? A.l : [A.l], tol = A.typ === "winkel" ? 0.15 : A.typ === "betrag" ? 0.011 : 1e-9;
      ok = v.every(function(x, i){ return Math.abs(x - ziel[i]) <= tol; });
      lt = Array.isArray(A.l) ? bdi(vk(A.l)) : bdi(zg(A.l, A.typ === "winkel" ? 1 : 2) + (A.typ === "winkel" ? "°" : ""));
      if(A.typ === "ab") L.push(bdi("PQ = Q − P = " + vk(A.Q) + " − " + vk(A.P) + " = " + vk(A.l)));
      else if(A.typ === "betrag") L.push(bdi("|v| = " + btTxt(A.v) + " " + (Math.abs(A.l * 100 - Math.round(A.l * 100)) < 1e-9 ? "=" : "≈") + " " + zahl(A.l)));
      else if(A.typ === "skalar") L.push(bdi("a · b = " + skTxt(A.a, A.b)));
      else if(A.typ === "winkel") L.push(bdi("a · b = " + skTxt(A.a, A.b)) + "<br>" + bdi("|a| = " + btTxt(A.a) + " ≈ " + zahl(len(A.a))) + "<br>" + bdi("|b| = " + btTxt(A.b) + " ≈ " + zahl(len(A.b))) + "<br>" + bdi("cos α = " + zahl(dot(A.a, A.b)) + " : (" + zahl(len(A.a)) + " · " + zahl(len(A.b)) + ") ≈ " + zahl(dot(A.a, A.b) / (len(A.a) * len(A.b)), 4) + " → α ≈ " + zahl(A.l, 1) + "°"));
      else if(A.typ === "mitte") L.push(bdi("M = ½ · (P + Q) = " + vk(A.l)));
      else { var a = A.a, b = A.b, z0 = function(x){ return x < 0 ? "(" + zahl(x) + ")" : zahl(x); };
        var zeilen = [z0(a[1]) + "·" + z0(b[2]) + " − " + z0(a[2]) + "·" + z0(b[1]), z0(a[2]) + "·" + z0(b[0]) + " − " + z0(a[0]) + "·" + z0(b[2]), z0(a[0]) + "·" + z0(b[1]) + " − " + z0(a[1]) + "·" + z0(b[0])];
        L.push(bdi("a × b = " + '<span class="vk">' + zeilen.map(function(x){ return "<span>" + x + "</span>"; }).join("") + "</span> = " + vk(A.l))); }
    }
    if(!ok && !zweiterV && msTippbar(e)){ zweiterV = true; msNochmal($("meldung")); return; } letzte = e; beantwortet = true; anzahl++; if(ok) punkte++;
    var m = $("meldung"); m.className = "meldung " + (ok ? "gut" : "schlecht"); m.innerHTML = ok ? t("richtig") + " " + lt : t("falsch", { l: lt });
    if(A.typ === "ortho" || A.typ === "lage") $("antwortzeile").querySelectorAll("button").forEach(function(b){ b.disabled = true; });
    $("uLauf").innerHTML = L.map(function(s){ return "<li>" + s + "</li>"; }).join(""); sicht($("uLauf"), true);
    $("punkte").textContent = t("punkte", { p: punkte, n: anzahl });
  }
  $("weiter").addEventListener("click", neueAufgabe);

  // ---------- Reiter & Texte ----------
  var tab = "zwei", TABS = ["zwei", "drei", "geraden", "ueben"];
  function zeigeTab(k){
    tab = k;
    document.querySelectorAll(".tabs button").forEach(function(b){ b.setAttribute("aria-selected", b.dataset.tab === k ? "true" : "false"); });
    TABS.forEach(function(x){ sicht($("s_" + x), x === k); });
    if(k === "ueben" && !auf) neueAufgabe();
    alles(true);
  }
  document.querySelectorAll(".tabs button").forEach(function(b){ b.addEventListener("click", function(){ zeigeTab(b.dataset.tab); }); });
  function alles(nurRechnen){
    if(!nurRechnen){
      document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.title = "miStudia – " + t("titel"); $("titel").textContent = t("titel");
      document.querySelectorAll(".tabs button").forEach(function(b){ b.textContent = t("tab_" + b.dataset.tab); });
      $("zHinweis").textContent = t("zHinweis");
      var alt3 = $("dA0") ? ["A", "B", "C"].map(function(n){ return liesV("d" + n) || D[n]; }) : [D.A, D.B, D.C];
      $("dEing").innerHTML = ""; ["A", "B", "C"].forEach(function(n, i){ vecEingabe($("dEing"), t("punktL") + " " + n, alt3[i], drei, "d" + n); });
      var altG = $("gp0") ? ["gp", "gu", "gq", "gv"].map(function(n){ return liesV(n); }) : BSPG.schnitt;
      $("gEing").innerHTML = ""; [["gp", "g: p ="], ["gu", "g: u ="], ["gq", "h: q ="], ["gv", "h: v ="]].forEach(function(x, i){ vecEingabe($("gEing"), x[1], altG[i] || BSPG.schnitt[i], geraden, x[0]); });
      var gb = $("gbsp"); gb.innerHTML = ""; ["schnitt", "parallel", "ident", "wind"].forEach(function(k){ var b = document.createElement("button"); b.type = "button"; b.textContent = t("lageK_" + k); b.addEventListener("click", function(){ BSPG[k].forEach(function(v, i){ var pre = ["gp", "gu", "gq", "gv"][i]; v.forEach(function(x, j){ $(pre + j).value = x; }); }); geraden(); }); gb.appendChild(b); });
      setzeOp(op);
    }
    if(tab === "zwei") zwei(); else if(tab === "drei") drei(); else if(tab === "geraden") geraden();
    if(!nurRechnen && auf){ var war = beantwortet, e = letzte, gut = $("meldung").classList.contains("gut"); zeige(); if(war){ beantwortet = false; anzahl--; if(gut) punkte--; if(Array.isArray(e)) e.forEach(function(v, i){ if($("uA" + i)) $("uA" + i).value = v; }); pruefe(e); } }
  }
  // Alltagsbeispiel laden (aus alltag-daten.js): {op, a, b, k} → 2D, {A, B, C} → 3D
  window.MS_VEK = { laden: function(w){
    if(w.A){
      zeigeTab("drei");
      ["A", "B", "C"].forEach(function(n){ w[n].forEach(function(v, i){ $("d" + n + i).value = komma() ? String(v).replace(".", ",") : String(v); }); });
      drei(); $("dEing").scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      A2 = w.a.slice(); B2 = w.b.slice(); if(w.k != null) $("k").value = w.k;
      zeigeTab("zwei"); setzeOp(w.op); $("vSvg").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  } };
  window.MS_LANG = { apply: function(l){ if(VK[l]){ lang = l; alles(); } } };
  alles();
})();
