// ============================================================
// trigonometrie/app.js – Trigonometrie
// Einheitskreis: Punkt P ziehen, cos (x, blau), sin (y, rot), tan (grün,
// auf der Tangente bei x = 1), Kurven laufen rechts mit; exakte Werte,
// Bogenmaß, Vorzeichen je Quadrant, Herkunft der Namen.
// Dreieck: rechtwinkliges Dreieck (rechter Winkel bei C), Gegenkathete,
// Ankathete, Hypotenuse bezogen auf α oder β, sin/cos/tan mit Zahlen.
// Berechnen: aus zwei Größen alle anderen, mit Rechenweg.
// Üben: Seiten benennen, Seite berechnen, Winkel berechnen, Werte am Kreis.
// Texte: trigonometrie/texte.js (TG), Sprache aus dem Startmenü (MS_LANG).
// ============================================================
(function(){
  "use strict";
  var NS = "http://www.w3.org/2000/svg", lang = "de", GRAD = Math.PI / 180;
  function $(id){ return document.getElementById(id); }
  function t(k, v){ var s = (TG[lang] && TG[lang][k]) || TG.de[k] || k; if(v) for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  function el(n, a, txt){ var e = document.createElementNS(NS, n); for(var k in a) e.setAttribute(k, a[k]); if(txt != null) e.textContent = txt; return e; }
  function leer(s){ while(s.lastChild) s.removeChild(s.lastChild); }
  function komma(){ return !(lang === "en" || lang === "zh" || lang === "ja" || lang === "ar"); }
  function z(v, d){
    d = d == null ? 2 : d;
    var r = Math.round(v * Math.pow(10, d)) / Math.pow(10, d); if(Object.is(r, -0)) r = 0;
    var s = String(Math.abs(r)); if(s.indexOf("e") >= 0) s = Math.abs(r).toFixed(d);
    if(komma()) s = s.replace(".", ",");
    return (r < 0 ? "−" : "") + s;
  }
  function zf(v, d){ var s = Math.abs(v).toFixed(d); if(komma()) s = s.replace(".", ","); return (v < -1e-12 && Math.abs(v).toFixed(d) !== (0).toFixed(d) ? "−" : "") + s; }
  function lies(s){ s = String(s).trim().replace(/[−–]/g, "-").replace(/\s/g, "").replace(",", "."); return s === "" ? NaN : Number(s); }
  function zuf(a, b){ return a + Math.floor(Math.random() * (b - a + 1)); }
  function wahl(L){ return L[Math.floor(Math.random() * L.length)]; }
  function sicht(e, an){ if(an) e.removeAttribute("hidden"); else e.setAttribute("hidden", ""); } // SVG kennt .hidden nicht
  function bdi(s){ return '<bdi dir="ltr">' + s + "</bdi>"; }

  // ---------- exakte Werte und Bogenmaß ----------
  var SX = { 0: "0", 30: "½", 45: "½·√2", 60: "½·√3", 90: "1" }, TX = { 0: "0", 30: "⅓·√3", 45: "1", 60: "√3" };
  function exakt(fn, deg){
    var d = ((deg % 360) + 360) % 360;
    if(d % 30 && d % 45) return null;
    var ref = d <= 90 ? d : d <= 180 ? 180 - d : d <= 270 ? d - 180 : 360 - d;
    var v = fn === "sin" ? Math.sin(d * GRAD) : fn === "cos" ? Math.cos(d * GRAD) : Math.tan(d * GRAD);
    var s = fn === "sin" ? SX[ref] : fn === "cos" ? SX[90 - ref] : TX[ref];
    if(s == null) return null;
    return (v < -1e-9 && s !== "0" ? "−" : "") + s;
  }
  function ggt(a, b){ return b ? ggt(b, a % b) : a; }
  function bogen(deg){
    var g = ggt(deg, 180), zae = deg / g, nen = 180 / g;
    var s = deg === 0 ? "0" : (deg % 15 === 0 ? (zae === 1 ? "" : zae) + "π" + (nen === 1 ? "" : "/" + nen) : null);
    return (s ? s + " ≈ " : "≈ ") + z(deg * GRAD, 3);
  }
  function tanDef(deg){ return Math.abs(Math.cos(deg * GRAD)) > 1e-9; }

  // ---------- Einheitskreis mit Graph ----------
  var CX = 190, CY = 190, R = 140, GX0 = 410, GX1 = 765;
  function gx(deg){ return GX0 + deg / 360 * (GX1 - GX0); }
  function kreisZeichnen(svg, deg, o){
    leer(svg);
    var w = deg * GRAD, c = Math.cos(w), s = Math.sin(w), Px = CX + R * c, Py = CY - R * s;
    // Gitter und Achsen
    for(var i = -1; i <= 1; i += 0.5){
      svg.appendChild(el("line", { x1: CX - R - 20, y1: CY - i * R, x2: CX + R + 20, y2: CY - i * R, "class": "k-gitter" }));
      svg.appendChild(el("line", { x1: CX + i * R, y1: CY - R - 20, x2: CX + i * R, y2: CY + R + 20, "class": "k-gitter" }));
    }
    svg.appendChild(el("line", { x1: CX - R - 30, y1: CY, x2: CX + R + 34, y2: CY, "class": "k-achse" }));
    svg.appendChild(el("line", { x1: CX, y1: CY + R + 30, x2: CX, y2: CY - R - 30, "class": "k-achse" }));
    svg.appendChild(el("text", { x: CX + R + 30, y: CY - 8, "class": "k-klein" }, "x"));
    svg.appendChild(el("text", { x: CX + 8, y: CY - R - 18, "class": "k-klein" }, "y"));
    [["1", CX + R + 4, CY + 16], ["−1", CX - R - 20, CY + 16], ["1", CX + 6, CY - R - 4], ["−1", CX + 6, CY + R + 16]].forEach(function(q){ svg.appendChild(el("text", { x: q[1], y: q[2], "class": "k-klein" }, q[0])); });
    [["I", 1, -1], ["II", -1, -1], ["III", -1, 1], ["IV", 1, 1]].forEach(function(q){ svg.appendChild(el("text", { x: CX + q[1] * R * 0.5 - 6, y: CY + q[2] * R * 0.5 + 6, "class": "k-quad" }, q[0])); });
    svg.appendChild(el("circle", { cx: CX, cy: CY, r: R, "class": "k-kreis" }));
    // Tangente bei x = 1
    svg.appendChild(el("line", { x1: CX + R, y1: CY - R * 1.3, x2: CX + R, y2: CY + R * 1.3, "class": "k-hilf" }));
    // Winkelbogen
    var rb = 34, gross = deg > 180 ? 1 : 0;
    if(deg > 0 && deg < 360) svg.appendChild(el("path", { d: "M" + CX + " " + CY + "L" + (CX + rb) + " " + CY + "A" + rb + " " + rb + " 0 " + gross + " 0 " + (CX + rb * c) + " " + (CY - rb * s) + "Z", "class": "k-bogen" }));
    svg.appendChild(el("text", { x: CX + 44 * Math.cos(w / 2) - 5, y: CY - 44 * Math.sin(w / 2) + 6, "class": "k-text", fill: "#b45309" }, "α"));
    // tan
    if(o.tan && tanDef(deg)){
      var tv = Math.tan(w), ty = CY - R * Math.max(-1.3, Math.min(1.3, tv));
      svg.appendChild(el("line", { x1: CX, y1: CY, x2: CX + R, y2: CY - R * tv, "class": "k-hilf", "clip-path": "none" }));
      svg.appendChild(el("line", { x1: CX + R, y1: CY, x2: CX + R, y2: ty, "class": "k-tan" }));
      svg.appendChild(el("text", { x: CX + R + 8, y: (CY + ty) / 2 + 5, "class": "k-text", fill: "var(--tan)" }, "tan"));
    }
    // cos und sin
    svg.appendChild(el("line", { x1: CX, y1: CY, x2: Px, y2: CY, "class": "k-cos" }));
    svg.appendChild(el("line", { x1: Px, y1: CY, x2: Px, y2: Py, "class": "k-sin" }));
    svg.appendChild(el("line", { x1: CX, y1: CY, x2: Px, y2: Py, "class": "k-radius" }));
    svg.appendChild(el("text", { x: (CX + Px) / 2 - 14, y: CY + (s >= 0 ? 22 : -10), "class": "k-text", fill: "var(--cos)" }, "cos"));
    svg.appendChild(el("text", { x: Px + (c >= 0 ? 8 : -36), y: (CY + Py) / 2 + 5, "class": "k-text", fill: "var(--sin)" }, "sin"));
    svg.appendChild(el("text", { x: (CX + Px) / 2 + (s >= 0 ? -16 : 6) * (c >= 0 ? 1 : -1) - 4, y: (CY + Py) / 2 - 6, "class": "k-text", fill: "#1a2233" }, "1"));
    svg.appendChild(el("circle", { cx: Px, cy: Py, r: 10, "class": "k-punkt" }));
    svg.appendChild(el("text", { x: Px + (c >= 0 ? 12 : -26), y: Py + (s >= 0 ? -12 : 26), "class": "k-text", fill: "#b45309" }, "P"));
    if(o.ohneGraph) return;
    // Graph rechts: 0° … 360°
    svg.appendChild(el("line", { x1: GX0, y1: CY, x2: GX1 + 10, y2: CY, "class": "k-achse" }));
    svg.appendChild(el("line", { x1: GX0, y1: CY - R - 20, x2: GX0, y2: CY + R + 20, "class": "k-achse" }));
    for(var g = 90; g <= 360; g += 90){
      svg.appendChild(el("line", { x1: gx(g), y1: CY - R - 10, x2: gx(g), y2: CY + R + 10, "class": "k-gitter" }));
      svg.appendChild(el("text", { x: gx(g) - 12, y: CY + R + 28, "class": "k-klein" }, g + "°"));
    }
    [1, -1].forEach(function(v){ svg.appendChild(el("line", { x1: GX0, y1: CY - v * R, x2: GX1, y2: CY - v * R, "class": "k-gitter" })); });
    ["sin", "cos", "tan"].forEach(function(fn){
      if(!o[fn]) return;
      var d = "", neu = true;
      for(var q = 0; q <= 360; q += 2){
        var v = fn === "sin" ? Math.sin(q * GRAD) : fn === "cos" ? Math.cos(q * GRAD) : Math.tan(q * GRAD);
        if(fn === "tan" && (Math.abs(v) > 1.22 || !tanDef(q))){ neu = true; continue; }
        d += (neu ? "M" : "L") + gx(q).toFixed(1) + " " + (CY - R * v).toFixed(1); neu = false;
      }
      svg.appendChild(el("path", { d: d, "class": "k-kurve " + fn }));
    });
    // Verbindung von P zum Graphen und mitlaufende Strecken
    svg.appendChild(el("line", { x1: Px, y1: Py, x2: gx(deg), y2: Py, "class": "k-hilf" }));
    if(o.cos) svg.appendChild(el("line", { x1: gx(deg) - 4, y1: CY, x2: gx(deg) - 4, y2: CY - R * c, "class": "k-cos" }));
    if(o.sin) svg.appendChild(el("line", { x1: gx(deg), y1: CY, x2: gx(deg), y2: Py, "class": "k-sin" }));
    svg.appendChild(el("circle", { cx: gx(deg), cy: Py, r: 6, "class": "k-punkt" }));
  }

  var alpha = 40;
  function kreis(){
    var o = { sin: $("gSin").checked, cos: $("gCos").checked, tan: $("gTan").checked };
    kreisZeichnen($("kreis"), alpha, o);
    $("alpha").value = alpha; if(document.activeElement !== $("alphaZ")) $("alphaZ").value = alpha;
    var w = alpha * GRAD, s = Math.sin(w), c = Math.cos(w);
    var ex = function(fn){ var e = exakt(fn, alpha); return e ? '<small>' + t("genau", { e: bdi(e) }) + "</small>" : ""; };
    $("werte").innerHTML =
      "<div>α = <b>" + bdi(alpha + "°") + "</b><small>" + t("bogen") + ": " + bdi(bogen(alpha)) + "</small></div>" +
      '<div><span class="c-sin">sin α</span> = <b>' + bdi(zf(s, 3)) + "</b>" + ex("sin") + "</div>" +
      '<div><span class="c-cos">cos α</span> = <b>' + bdi(zf(c, 3)) + "</b>" + ex("cos") + "</div>" +
      '<div><span class="c-tan">tan α</span> = <b>' + (tanDef(alpha) ? bdi(zf(Math.tan(w), 3)) : t("nd")) + "</b>" + (tanDef(alpha) ? ex("tan") : "") + "</div>";
    var q = alpha === 0 || alpha === 360 || alpha % 90 === 0 ? 0 : Math.floor(alpha / 90) + 1;
    var vz = function(v){ return Math.abs(v) < 1e-9 ? "0" : t(v > 0 ? "pos" : "neg"); };
    $("quadrant").innerHTML = q ? t("quad", { q: ["I", "II", "III", "IV"][q - 1], s: vz(s), c: vz(c), t: vz(Math.tan(w)) }) : t("aufAchse");
    $("pyth").innerHTML = bdi("sin²α + cos²α = " + zf(s * s, 3) + " + " + zf(c * c, 3) + " = 1") + " · " + t("tanDef");
  }
  (function(){
    var s = $("kreis"), aktiv = false;
    function setze(ev){
      var r = s.getBoundingClientRect(), x = (ev.clientX - r.left) / r.width * 780, y = (ev.clientY - r.top) / r.height * 380, d;
      if(x > GX0 - 10){ d = (x - GX0) / (GX1 - GX0) * 360; }
      else { d = Math.atan2(CY - y, x - CX) / GRAD; if(d < 0) d += 360; }
      d = Math.max(0, Math.min(360, Math.round(d)));
      [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330, 360].forEach(function(m){ if(Math.abs(d - m) <= 2) d = m; });
      if(d !== alpha){ alpha = d; kreis(); }
    }
    s.addEventListener("pointerdown", function(ev){ aktiv = true; s.setPointerCapture(ev.pointerId); setze(ev); });
    s.addEventListener("pointermove", function(ev){ if(aktiv) setze(ev); });
    s.addEventListener("pointerup", function(){ aktiv = false; });
    s.addEventListener("pointercancel", function(){ aktiv = false; });
  })();
  $("alpha").addEventListener("input", function(){ alpha = Number(this.value); kreis(); });
  $("alphaZ").addEventListener("input", function(){ var v = lies(this.value); if(isFinite(v)){ alpha = Math.round(((v % 360) + 360) % 360 || (v === 360 ? 360 : 0)); kreis(); } });
  ["gSin", "gCos", "gTan"].forEach(function(id){ $(id).addEventListener("change", kreis); });

  // ---------- rechtwinkliges Dreieck ----------
  // a = BC (Gegenkathete von α), b = AC (Ankathete von α), c = AB (Hypotenuse); rechter Winkel bei C
  function dreieckZeichnen(svg, a, b, c, o){
    leer(svg);
    var sk = Math.min(480 / b, 280 / a), ax = (640 - b * sk) / 2 - 20, ay = 330;
    var A = { x: ax, y: ay }, C = { x: ax + b * sk, y: ay }, B = { x: C.x, y: ay - a * sk };
    svg.appendChild(el("polygon", { points: [A.x, A.y, C.x, C.y, B.x, B.y].join(" "), "class": "d-flaeche" }));
    var rolle = function(seite){ if(!o.bez) return "d-neutral"; if(seite === "c") return "d-seite d-hyp"; return (o.bez === "al") === (seite === "a") ? "d-seite d-gk" : "d-seite d-ak"; };
    svg.appendChild(el("line", { x1: B.x, y1: B.y, x2: C.x, y2: C.y, "class": rolle("a") }));
    svg.appendChild(el("line", { x1: A.x, y1: A.y, x2: C.x, y2: C.y, "class": rolle("b") }));
    svg.appendChild(el("line", { x1: A.x, y1: A.y, x2: B.x, y2: B.y, "class": rolle("c") }));
    // rechter Winkel bei C
    var q = 21, sw0 = 1; svg.appendChild(el("path", { d: "M" + (C.x - q) + " " + C.y + " A" + q + " " + q + " 0 0 " + sw0 + " " + C.x + " " + (C.y - q), "class": "d-rw" }));
    svg.appendChild(el("circle", { cx: C.x - q * 0.36, cy: C.y - q * 0.36, r: 2.5, fill: "#1a2233" }));
    // Winkelbögen
    var al = Math.atan2(a, b), rb = 44;
    var bogenA = "M" + A.x + " " + A.y + "L" + (A.x + rb) + " " + A.y + "A" + rb + " " + rb + " 0 0 0 " + (A.x + rb * Math.cos(al)) + " " + (A.y - rb * Math.sin(al)) + "Z";
    var bogenB = "M" + B.x + " " + B.y + "L" + B.x + " " + (B.y + rb) + "A" + rb + " " + rb + " 0 0 1 " + (B.x - rb * Math.cos(al)) + " " + (B.y + rb * Math.sin(al)) + "Z";
    svg.appendChild(el("path", { d: bogenA, "class": o.bez === "be" ? "d-flaeche" : "d-wb", stroke: o.bez === "be" ? "#94a3b8" : null }));
    svg.appendChild(el("path", { d: bogenB, "class": o.bez === "be" ? "d-wb" : "d-flaeche", stroke: o.bez === "be" ? null : "#94a3b8" }));
    var lab = o.labels || {};
    svg.appendChild(el("text", { x: A.x + 52 * Math.cos(al / 2), y: A.y - 52 * Math.sin(al / 2) + 6, "class": "k-text", fill: "#b45309" }, lab.al || "α"));
    svg.appendChild(el("text", { x: B.x - 58 * Math.sin((Math.PI / 2 - al) / 2) - 4, y: B.y + 58 * Math.cos((Math.PI / 2 - al) / 2) + 4, "class": "k-text", fill: "#b45309", "text-anchor": "middle" }, lab.be || "β"));
    // Ecken
    svg.appendChild(el("text", { x: A.x - 22, y: A.y + 20, "class": "d-ecke" }, "A"));
    svg.appendChild(el("text", { x: C.x + 8, y: C.y + 20, "class": "d-ecke" }, "C"));
    svg.appendChild(el("text", { x: B.x + 6, y: B.y - 8, "class": "d-ecke" }, "B"));
    // Seitenbeschriftungen
    var farbe = function(seite){ var r = rolle(seite); return r.indexOf("gk") >= 0 ? "var(--sin)" : r.indexOf("ak") >= 0 ? "var(--cos)" : r.indexOf("hyp") >= 0 ? "var(--hyp)" : "#1a2233"; };
    svg.appendChild(el("text", { x: B.x + 12, y: (B.y + C.y) / 2 + 6, "class": "k-text", fill: farbe("a") }, lab.a || "a"));
    svg.appendChild(el("text", { x: (A.x + C.x) / 2, y: A.y + 28, "class": "k-text", fill: farbe("b"), "text-anchor": "middle" }, lab.b || "b"));
    var nx = -Math.sin(al), ny = -Math.cos(al);
    svg.appendChild(el("text", { x: (A.x + B.x) / 2 + nx * 22, y: (A.y + B.y) / 2 + ny * 22 + 4, "class": "k-text", fill: farbe("c"), "text-anchor": "middle" }, lab.c || "c"));
  }
  var bez = "al";
  function dreieck(){
    var al = Number($("dAlpha").value), c = Number($("dC").value), a = c * Math.sin(al * GRAD), b = c * Math.cos(al * GRAD), be = 90 - al;
    $("dAlphaW").textContent = al + "°"; $("dCW").textContent = z(c, 1) + " cm";
    dreieckZeichnen($("dreieck"), a, b, c, { bez: bez, labels: { a: "a = " + z(a, 2), b: "b = " + z(b, 2), c: "c = " + z(c, 1), al: "α = " + al + "°", be: "β = " + be + "°" } });
    var w = bez === "al" ? "α" : "β", gk = bez === "al" ? "a" : "b", ak = bez === "al" ? "b" : "a", gkv = bez === "al" ? a : b, akv = bez === "al" ? b : a, wv = bez === "al" ? al : be;
    $("dreieckH").textContent = t("dreieckH", { w: w });
    $("seiten").innerHTML = '<li><span class="c-sin">' + t("gk") + " (" + gk + ")</span>: " + t("gkE") + "</li>" +
      '<li><span class="c-cos">' + t("ak") + " (" + ak + ")</span>: " + t("akE") + "</li>" +
      '<li><span class="c-hyp">' + t("hyp") + " (c)</span>: " + t("hypE") + "</li>";
    var f = function(fn, zae, nen, zv, nv, wert){ return bdi(fn + " " + w + " = ") + "<span class=\"" + (zae === t("gk") ? "c-sin" : "c-cos") + "\">" + zae + "</span> : <span class=\"" + (nen === t("hyp") ? "c-hyp" : "c-cos") + "\">" + nen + "</span> " + bdi("= " + z(zv, 2) + " : " + z(nv, 2) + " = " + zf(wert, 3)) + " " + bdi("(" + fn + " " + wv + "° ≈ " + zf(fn === "sin" ? Math.sin(wv * GRAD) : fn === "cos" ? Math.cos(wv * GRAD) : Math.tan(wv * GRAD), 3) + ")"); };
    $("fSin").innerHTML = f("sin", t("gk"), t("hyp"), gkv, c, gkv / c);
    $("fCos").innerHTML = f("cos", t("ak"), t("hyp"), akv, c, akv / c);
    $("fTan").innerHTML = f("tan", t("gk"), t("ak"), gkv, akv, gkv / akv);
    $("merk").textContent = t("merk");
  }
  ["dAlpha", "dC"].forEach(function(id){ $(id).addEventListener("input", dreieck); });
  $("bezug").querySelectorAll("button").forEach(function(b){ b.addEventListener("click", function(){ bez = b.dataset.b; $("bezug").querySelectorAll("button").forEach(function(x){ x.setAttribute("aria-pressed", x === b ? "true" : "false"); }); dreieck(); }); });

  // ---------- Rechner ----------
  var FAELLE = { ac: ["al", "c"], aa: ["al", "a"], ab: ["al", "b"], xy: ["a", "b"], xc: ["a", "c"], yc: ["b", "c"] };
  var WERTE = { al: 35, a: 4, b: 6, c: 8 }, REINH = "cm";
  var NAME = { al: "α", a: "a", b: "b", c: "c" };
  // liefert {a, b, c, al, be, schritte[]} oder {fehler}
  function loese(fall, v, E){
    var a, b, c, al, S = [], cm = " " + (E || "cm"), sn = function(x){ return "sin " + z(x, 1) + "°"; }, cs = function(x){ return "cos " + z(x, 1) + "°"; }, tn = function(x){ return "tan " + z(x, 1) + "°"; };
    if(fall.charAt(0) === "a" && fall !== "xy"){ al = v.al; if(!(al > 0 && al < 90)) return { fehler: "fehlerWinkel" }; }
    if(fall === "ac"){ c = v.c; a = c * Math.sin(al * GRAD); b = c * Math.cos(al * GRAD);
      S.push("a = c · sin α = " + z(c) + " · " + sn(al) + " ≈ " + z(c) + " · " + z(Math.sin(al * GRAD), 4) + " ≈ " + z(a) + cm); S.push("b = c · cos α = " + z(c) + " · " + cs(al) + " ≈ " + z(c) + " · " + z(Math.cos(al * GRAD), 4) + " ≈ " + z(b) + cm); }
    if(fall === "aa"){ a = v.a; c = a / Math.sin(al * GRAD); b = a / Math.tan(al * GRAD);
      S.push("c = a : sin α = " + z(a) + " : " + sn(al) + " ≈ " + z(a) + " : " + z(Math.sin(al * GRAD), 4) + " ≈ " + z(c) + cm); S.push("b = a : tan α = " + z(a) + " : " + tn(al) + " ≈ " + z(a) + " : " + z(Math.tan(al * GRAD), 4) + " ≈ " + z(b) + cm); }
    if(fall === "ab"){ b = v.b; c = b / Math.cos(al * GRAD); a = b * Math.tan(al * GRAD);
      S.push("c = b : cos α = " + z(b) + " : " + cs(al) + " ≈ " + z(b) + " : " + z(Math.cos(al * GRAD), 4) + " ≈ " + z(c) + cm); S.push("a = b · tan α = " + z(b) + " · " + tn(al) + " ≈ " + z(b) + " · " + z(Math.tan(al * GRAD), 4) + " ≈ " + z(a) + cm); }
    if(fall === "xy"){ a = v.a; b = v.b; if(!(a > 0 && b > 0)) return { fehler: "fehlerEing" };
      c = Math.hypot(a, b); al = Math.atan(a / b) / GRAD;
      S.push(t("pyth2") + ": c = √(a² + b²) = √(" + z(a) + "² + " + z(b) + "²) = √(" + z(a * a) + " + " + z(b * b) + ") = √" + z(a * a + b * b) + " ≈ " + z(c) + cm);
      S.push("tan α = a : b = " + z(a) + " : " + z(b) + " ≈ " + z(a / b, 3) + " ⇒ α = tan⁻¹(" + z(a / b, 3) + ") ≈ " + z(al, 1) + "°"); }
    if(fall === "xc"){ a = v.a; c = v.c; if(!(a > 0 && c > 0)) return { fehler: "fehlerEing" }; if(a >= c) return { fehler: "fehlerHyp" };
      b = Math.sqrt(c * c - a * a); al = Math.asin(a / c) / GRAD;
      S.push(t("pyth2") + ": b = √(c² − a²) = √(" + z(c) + "² − " + z(a) + "²) = √(" + z(c * c) + " − " + z(a * a) + ") = √" + z(c * c - a * a) + " ≈ " + z(b) + cm);
      S.push("sin α = a : c = " + z(a) + " : " + z(c) + " ≈ " + z(a / c, 3) + " ⇒ α = sin⁻¹(" + z(a / c, 3) + ") ≈ " + z(al, 1) + "°"); }
    if(fall === "yc"){ b = v.b; c = v.c; if(!(b > 0 && c > 0)) return { fehler: "fehlerEing" }; if(b >= c) return { fehler: "fehlerHyp" };
      a = Math.sqrt(c * c - b * b); al = Math.acos(b / c) / GRAD;
      S.push(t("pyth2") + ": a = √(c² − b²) = √(" + z(c) + "² − " + z(b) + "²) = √(" + z(c * c) + " − " + z(b * b) + ") = √" + z(c * c - b * b) + " ≈ " + z(a) + cm);
      S.push("cos α = b : c = " + z(b) + " : " + z(c) + " ≈ " + z(b / c, 3) + " ⇒ α = cos⁻¹(" + z(b / c, 3) + ") ≈ " + z(al, 1) + "°"); }
    if(!(a > 0 && b > 0 && c > 0)) return { fehler: "fehlerEing" };
    S.push("β = 90° − α = 90° − " + z(al, 1) + "° = " + z(90 - al, 1) + "°");
    return { a: a, b: b, c: c, al: al, be: 90 - al, schritte: S };
  }
  function rechnerFelder(){
    var f = FAELLE[$("fall").value];
    $("eingaben").innerHTML = f.map(function(k){ return "<label>" + NAME[k] + ' = <input class="zahl" id="rIn_' + k + '" inputmode="decimal" value="' + z(WERTE[k], 2) + '"> ' + (k === "al" ? "°" : REINH) + "</label>"; }).join("");
    f.forEach(function(k){ $("rIn_" + k).addEventListener("input", function(){ var v = lies(this.value); if(isFinite(v)) WERTE[k] = v; rechner(); }); });
    rechner();
  }
  function rechner(){
    var f = $("fall").value, v = {};
    FAELLE[f].forEach(function(k){ v[k] = lies($("rIn_" + k).value); });
    var L = loese(f, v, REINH);
    if(L.fehler){ $("rFehler").textContent = t(L.fehler); $("rLauf").innerHTML = ""; leer($("rDreieck")); return; }
    $("rFehler").textContent = "";
    $("rLauf").innerHTML = L.schritte.map(function(s){ return "<li>" + bdi(s) + "</li>"; }).join("");
    dreieckZeichnen($("rDreieck"), L.a, L.b, L.c, { bez: "al", labels: { a: "a ≈ " + z(L.a), b: "b ≈ " + z(L.b), c: "c ≈ " + z(L.c), al: "α ≈ " + z(L.al, 1) + "°", be: "β ≈ " + z(L.be, 1) + "°" } });
  }
  $("fall").addEventListener("change", rechnerFelder);

  // ---------- Üben ----------
  var auf = null, punkte = 0, anzahl = 0, beantwortet = false;
  function neueAufgabe(){
    beantwortet = false;
    var typ = wahl(["begriff", "seite", "seite", "winkel", "kreis"]);
    if(typ === "begriff"){
      var a = zuf(3, 8), b = zuf(4, 9), bz = wahl(["al", "be"]), was = wahl(["gk", "ak", "hyp"]);
      var l = was === "hyp" ? "c" : (was === "gk") === (bz === "al") ? "a" : "b";
      auf = { typ: typ, a: a, b: b, c: Math.hypot(a, b), bz: bz, was: was, l: l };
    } else if(typ === "seite"){
      var al = zuf(15, 75), bek = wahl(["a", "b", "c"]), wert = zuf(3, 12), ges = wahl(["a", "b", "c"].filter(function(x){ return x !== bek; }));
      var L = loese({ a: "aa", b: "ab", c: "ac" }[bek], { al: al, a: wert, b: wert, c: wert });
      auf = { typ: typ, al: al, bek: bek, wert: wert, ges: ges, L: L, l: L[ges] };
    } else if(typ === "winkel"){
      var fall = wahl(["xy", "xc", "yc"]), v = {};
      if(fall === "xy"){ v.a = zuf(2, 10); v.b = zuf(2, 10); } else { v.c = zuf(6, 13); v[fall.charAt(0) === "x" ? "a" : "b"] = zuf(2, v.c - 1); }
      var L2 = loese(fall, v);
      auf = { typ: typ, fall: fall, v: v, L: L2, l: L2.al };
    } else {
      var deg = wahl([0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330]), fn = wahl(["sin", "cos", "sin", "cos", "tan"]);
      if(fn === "tan" && !tanDef(deg)) fn = "sin";
      auf = { typ: typ, deg: deg, fn: fn, l: fn === "sin" ? Math.sin(deg * GRAD) : fn === "cos" ? Math.cos(deg * GRAD) : Math.tan(deg * GRAD) };
    }
    zeige();
  }
  function auftrag(){
    if(auf.typ === "begriff") return t("aufBegriff", { s: "<b>" + t(auf.was) + "</b>", w: "<b>" + (auf.bz === "al" ? "α" : "β") + "</b>" });
    if(auf.typ === "seite") return t("aufSeite", { x: "<b>" + auf.ges + "</b>" });
    if(auf.typ === "winkel") return t("aufWinkel");
    return t("aufKreis") + " " + bdi("<b>" + auf.fn + " " + auf.deg + "°</b> = ?");
  }
  function zeigeBild(geloest){
    var D = $("uDreieck"), K = $("uKreis");
    sicht(D, auf.typ !== "kreis"); sicht(K, auf.typ === "kreis" && geloest);
    if(auf.typ === "begriff") dreieckZeichnen(D, auf.a, auf.b, auf.c, { bez: geloest ? auf.bz : null, labels: { al: "α", be: "β" } });
    if(auf.typ === "seite"){
      var L = auf.L, lb = { al: "α = " + auf.al + "°", be: "β" };
      ["a", "b", "c"].forEach(function(k){ lb[k] = k === auf.bek ? k + " = " + z(auf.wert) + " cm" : k === auf.ges ? (geloest ? k + " ≈ " + z(L[k]) : k + " = ?") : k; });
      dreieckZeichnen(D, L.a, L.b, L.c, { bez: "al", labels: lb });
    }
    if(auf.typ === "winkel"){
      var L2 = auf.L, lb2 = { al: geloest ? "α ≈ " + z(L2.al, 1) + "°" : "α = ?", be: "β" };
      ["a", "b", "c"].forEach(function(k){ lb2[k] = auf.v[k] != null ? k + " = " + z(auf.v[k]) + " cm" : k; });
      dreieckZeichnen(D, L2.a, L2.b, L2.c, { bez: "al", labels: lb2 });
    }
    if(auf.typ === "kreis" && geloest) kreisZeichnen(K, auf.deg, { sin: auf.fn === "sin", cos: auf.fn === "cos", tan: auf.fn === "tan" });
  }
  function zeige(){
    $("auftrag").innerHTML = auftrag();
    $("meldung").textContent = ""; $("meldung").className = "meldung"; $("uLauf").hidden = true;
    zeigeBild(false);
    var z2 = $("antwortzeile"); z2.innerHTML = "";
    if(auf.typ === "begriff"){
      ["a", "b", "c"].forEach(function(k){ var b = document.createElement("button"); b.type = "button"; b.className = "knopf hell zeichen"; b.textContent = k; b.dataset.w = k; b.addEventListener("click", function(){ pruefe(k); }); z2.appendChild(b); });
    } else {
      var inp = document.createElement("input"); inp.className = "zahl"; inp.id = "uAntwort"; inp.setAttribute("inputmode", "decimal"); inp.setAttribute("autocomplete", "off"); inp.placeholder = t("eingabe");
      inp.addEventListener("keydown", function(e){ if(e.key === "Enter") pruefe(inp.value); });
      var ein = document.createElement("span"); ein.textContent = auf.typ === "seite" ? "cm" : auf.typ === "winkel" ? "°" : "";
      var pb = document.createElement("button"); pb.type = "button"; pb.className = "knopf"; pb.id = "pruefen"; pb.textContent = t("pruefen");
      pb.addEventListener("click", function(){ pruefe(inp.value); });
      if(auf.typ === "kreis"){ var mb = document.createElement("button"); mb.type = "button"; mb.className = "knopf hell zeichen"; mb.textContent = "±"; mb.title = t("vorzeichen"); mb.addEventListener("click", function(){ var v = inp.value.trim(); inp.value = /^[−-]/.test(v) ? v.replace(/^[−-]/, "") : "−" + v; inp.focus(); }); z2.appendChild(mb); }
      z2.appendChild(inp); z2.appendChild(ein); z2.appendChild(pb);
    }
    $("weiter").textContent = t("weiter");
    $("punkte").textContent = t("punkte", { p: punkte, n: anzahl });
  }
  function pruefe(eingabe){
    if(beantwortet) return;
    var ok, ltxt, lauf = [];
    if(auf.typ === "begriff"){ ok = eingabe === auf.l; ltxt = auf.l; }
    else {
      var v = lies(eingabe); if(!isFinite(v)) return;
      if(auf.typ === "seite"){ ok = Math.abs(v - auf.l) <= Math.max(0.06, 0.006 * auf.l); ltxt = "≈ " + z(auf.l, 1) + " cm"; lauf = auf.L.schritte.slice(0, 2); }
      else if(auf.typ === "winkel"){ ok = Math.abs(v - auf.l) <= 0.6; ltxt = "≈ " + z(auf.l, 1) + "°"; lauf = auf.L.schritte.slice(1, 2); }
      else { ok = Math.abs(v - auf.l) <= 0.011; var e = exakt(auf.fn, auf.deg); ltxt = zf(auf.l, 2) + (e && e !== zf(auf.l, 2) && e !== "1" && e !== "0" && e !== "−1" ? " (" + t("genau", { e: e }) + ")" : ""); }
    }
    beantwortet = true; anzahl++; if(ok) punkte++;
    var m = $("meldung"); m.className = "meldung " + (ok ? "gut" : "schlecht");
    m.innerHTML = ok ? t("richtig") + " " + bdi(ltxt) : t("falsch", { l: bdi(ltxt) });
    if(auf.typ === "begriff") m.innerHTML += '<br><span class="muted" style="font-weight:400">' + t(auf.was + "E") + "</span>";
    if(lauf.length){ $("uLauf").innerHTML = lauf.map(function(s){ return "<li>" + bdi(s) + "</li>"; }).join(""); $("uLauf").hidden = false; }
    zeigeBild(true);
    if(auf.typ === "begriff") $("antwortzeile").querySelectorAll("button").forEach(function(b){ if(b.dataset.w === auf.l) b.className = "knopf zeichen"; });
    $("punkte").textContent = t("punkte", { p: punkte, n: anzahl });
    $("weiter").focus();
  }
  $("weiter").addEventListener("click", neueAufgabe);

  // ---------- Reiter ----------
  function zeigeTab(k){
    document.querySelectorAll(".tabs button").forEach(function(b){ b.setAttribute("aria-selected", b.dataset.tab === k ? "true" : "false"); });
    ["kreis", "dreieck", "fig", "rechner", "ueben"].forEach(function(x){ $("s_" + x).hidden = x !== k; });
    if(k === "fig" && window.MS_TRIG_FIG) MS_TRIG_FIG.zeigen();
    if(k === "ueben" && !auf) neueAufgabe();
  }
  document.querySelectorAll(".tabs button").forEach(function(b){ b.addEventListener("click", function(){ zeigeTab(b.dataset.tab); }); });

  // ---------- Texte (bei jedem Sprachwechsel alles neu beschriften) ----------
  function alles(){
    document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = "miStudia – " + t("titel");
    $("titel").textContent = t("titel");
    document.querySelectorAll(".tabs button").forEach(function(b){ b.textContent = t("tab_" + b.dataset.tab); });
    $("kreisH").textContent = t("kreisH"); $("tWinkel").textContent = t("winkel"); $("tGraphen").textContent = t("graphen");
    $("kreisErkl").textContent = t("kreisErkl"); $("sinusLink").textContent = t("sinusLink");
    $("namenT").textContent = t("namenT"); $("namen1").textContent = t("namen1"); $("namen2").textContent = t("namen2"); $("namen3").textContent = t("namen3");
    $("tHyp").textContent = t("hypL"); $("tBezug").textContent = t("bezug");
    $("rechnerH").textContent = t("rechnerH"); $("tKennt").textContent = t("kennt");
    kreis(); dreieck(); rechnerFelder();
    if(auf){
      var war = beantwortet, eing = $("uAntwort") ? $("uAntwort").value : null, gut = $("meldung").classList.contains("gut");
      if(auf.typ === "seite" || auf.typ === "winkel") auf.L = loese(auf.typ === "seite" ? { a: "aa", b: "ab", c: "ac" }[auf.bek] : auf.fall, auf.typ === "seite" ? { al: auf.al, a: auf.wert, b: auf.wert, c: auf.wert } : auf.v);
      zeige();
      if(war){ beantwortet = false; anzahl--; if(gut) punkte--; pruefe(auf.typ === "begriff" ? (gut ? auf.l : "x") : (eing != null && eing !== "" ? eing : "999999")); }
    }
  }
  // Alltagsbeispiel in den Rechner laden (aus alltag-daten.js)
  window.MS_TRIG = { laden: function(w){
    REINH = w.einheit; for(var k in w.v) WERTE[k] = w.v[k];
    $("fall").value = w.fall; zeigeTab("rechner"); rechnerFelder();
    $("fall").scrollIntoView({ behavior: "smooth", block: "start" });
  } };
  window.MS_LANG = { apply: function(l){ if(TG[l]){ lang = l; alles(); if(window.MS_TRIG_FIG) MS_TRIG_FIG.sprache(l); } } };
  alles();
})();
