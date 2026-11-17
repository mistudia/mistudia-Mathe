// ============================================================
// negativ/app.js – Negative Zahlen
// Entdecken: Thermometer (−30 … 40 °C) und Zahlenstrahl, beide ziehbar,
// Betrag, Gegenzahl, Vergleichen, Alltagsbeispiele.
// Rechnen: a + b, a − b als Pfeile am Zahlenstrahl, a · b und a : b mit
// Vorzeichenregel. Üben: gemischte Aufgaben mit Lösungsweg.
// Texte: negativ/texte.js (NT), Sprache aus dem Startmenü (MS_LANG).
// ============================================================
(function(){
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  var lang = "de";
  function $(id){ return document.getElementById(id); }
  function t(k, v){ var s = (NT[lang] && NT[lang][k]) || NT.de[k] || k; if(v) for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  function el(n, a, txt){ var e = document.createElementNS(NS, n); for(var k in a) e.setAttribute(k, a[k]); if(txt != null) e.textContent = txt; return e; }
  function punktKomma(){ return !(lang === "en" || lang === "zh" || lang === "ja" || lang === "ar"); }
  // Zahl mit echtem Minuszeichen (−) und landesüblichem Dezimalzeichen
  function z(v){
    var r = Math.round(v * 100) / 100, s = String(Math.abs(r));
    if(punktKomma()) s = s.replace(".", ",");
    return (r < 0 ? "−" : "") + s;
  }
  function zk(v){ return v < 0 ? "(" + z(v) + ")" : z(v); } // in Klammern, wenn negativ
  function zp(v){ return (Math.round(v * 100) > 0 ? "+" : "") + z(v); } // mit Vorzeichen, auch „+“
  function zkp(v){ return Math.round(v * 100) !== 0 ? "(" + zp(v) + ")" : z(v); } // 2. Zahl immer mit Vorzeichen in Klammern
  function lies(s){ s = String(s).trim().replace(/[−–]/g, "-").replace(",", ".").replace(/\s/g, ""); if(s === "" || s === "-") return NaN; return Number(s); }
  function zuf(a, b){ return a + Math.floor(Math.random() * (b - a + 1)); }
  function sicht(e, an){ if(an) e.removeAttribute("hidden"); else e.setAttribute("hidden", ""); } // SVG kennt .hidden nicht
  function bdi(s){ return '<bdi dir="ltr">' + s + "</bdi>"; }

  // ---------- Zahlenstrahl ----------
  // o: { min, max, marken: [{ v, cls, text }], pfeile: [{ von, bis, cls, text, ebene }], zieh }
  function zahlenstrahl(svg, o){
    while(svg.lastChild) svg.removeChild(svg.lastChild);
    var vb = svg.viewBox.baseVal, W = vb.width, H = vb.height, rand = 24, y0 = H - 40;
    var span = o.max - o.min, sx = (W - 2 * rand) / span;
    var X = function(v){ return rand + (v - o.min) * sx; };
    svg._X = X; svg._inv = function(px){ return o.min + (px - rand) / sx; };
    svg.appendChild(el("line", { x1: rand - 12, y1: y0, x2: W - rand + 14, y2: y0, "class": "achse" }));
    svg.appendChild(el("path", { d: "M" + (W - rand + 16) + " " + y0 + "l-12 -6v12z", fill: "#1a2233" }));
    var schritt = span <= 16 ? 1 : span <= 50 ? 5 : 10;
    for(var v = Math.ceil(o.min); v <= o.max; v++){
      var gross = v % schritt === 0;
      if(!gross && span > 50 && v % 5 !== 0) continue;
      if(!gross && v === 0) gross = true;
      svg.appendChild(el("line", { x1: X(v), y1: y0 - (gross ? 9 : 5), x2: X(v), y2: y0 + (gross ? 9 : 5), "class": gross ? "tick" : "tick klein" }));
      if(gross) svg.appendChild(el("text", { x: X(v), y: y0 + 28, "class": "tzahl" + (v < 0 ? " neg" : v > 0 ? " pos" : " null") }, z(v)));
    }
    (o.pfeile || []).forEach(function(p){
      var x1 = X(p.von), x2 = X(p.bis), yy = y0 - 22 - (p.ebene || 0) * 26, h = Math.min(26, Math.abs(x2 - x1) / 2 + 6);
      if(Math.abs(x2 - x1) < 2) return;
      var dir = x2 > x1 ? 1 : -1;
      svg.appendChild(el("path", { d: "M" + x1 + " " + yy + "Q" + ((x1 + x2) / 2) + " " + (yy - h) + " " + (x2 - dir * 2) + " " + yy, "class": "pfeil " + p.cls + (p.gestr ? " gestr" : "") }));
      svg.appendChild(el("path", { d: "M" + x2 + " " + yy + "l" + (-dir * 11) + " -7M" + x2 + " " + yy + "l" + (-dir * 11) + " 3", "class": "pfeil " + p.cls }));
      if(p.text) svg.appendChild(el("text", { x: (x1 + x2) / 2, y: yy - h / 2 - 8, "class": "ptext " + p.cls }, p.text));
    });
    (o.marken || []).forEach(function(m){
      svg.appendChild(el("circle", { cx: X(m.v), cy: y0, r: 9, "class": "marke" + (m.cls ? " " + m.cls : "") }));
      if(m.text != null) svg.appendChild(el("text", { x: X(m.v), y: y0 - 16, "class": "mtext" + (m.cls ? " " + m.cls : "") }, m.text));
    });
  }
  function bereich(werte, minSpan){
    var lo = Math.min.apply(null, werte.concat([0])), hi = Math.max.apply(null, werte.concat([0]));
    lo = Math.floor((lo - 2) / 5) * 5; hi = Math.ceil((hi + 2) / 5) * 5;
    while(hi - lo < (minSpan || 20)){ lo -= 5; if(hi - lo < (minSpan || 20)) hi += 5; }
    return { min: lo, max: hi };
  }

  // ---------- Entdecken: Thermometer + Zahlenstrahl ----------
  var temp = -7, TMIN = -30, TMAX = 40;
  var TY0 = 40, TY1 = 440; // y für 40 °C bzw. −30 °C
  function ty(v){ return TY1 - (v - TMIN) / (TMAX - TMIN) * (TY1 - TY0); }
  function thermo(){
    var s = $("thermo"); while(s.lastChild) s.removeChild(s.lastChild);
    var farbe = temp < 0 ? "#2563eb" : temp > 0 ? "#dc2626" : "#7c3aed";
    s.appendChild(el("rect", { x: 70, y: 18, width: 34, height: 450, rx: 17, fill: "#f8fafc", stroke: "#6b7280", "stroke-width": 2.5 }));
    s.appendChild(el("circle", { cx: 87, cy: 490, r: 34, fill: farbe, stroke: "#6b7280", "stroke-width": 2.5 }));
    s.appendChild(el("rect", { x: 79, y: ty(temp), width: 16, height: 490 - ty(temp), fill: farbe }));
    s.appendChild(el("rect", { x: 79, y: 466, width: 16, height: 10, fill: farbe }));
    for(var v = TMIN; v <= TMAX; v += 2){
      var g = v % 10 === 0;
      s.appendChild(el("line", { x1: 104, y1: ty(v), x2: 104 + (g ? 18 : 9), y2: ty(v), stroke: v === 0 ? "#7c3aed" : "#1a2233", "stroke-width": g ? 2 : 1 }));
      if(g) s.appendChild(el("text", { x: 158, y: ty(v) + 5, "text-anchor": "end", "font-size": 16, "font-weight": v === 0 ? 800 : 600, fill: v < 0 ? "#2563eb" : v > 0 ? "#dc2626" : "#7c3aed", "font-family": "system-ui, sans-serif" }, z(v)));
    }
    s.appendChild(el("line", { x1: 60, y1: ty(0), x2: 104, y2: ty(0), stroke: "#7c3aed", "stroke-width": 2, "stroke-dasharray": "4 3" }));
    s.appendChild(el("text", { x: 34, y: 30, "text-anchor": "middle", "font-size": 18, "font-weight": 700, fill: "#1a2233", "font-family": "system-ui, sans-serif" }, "°C"));
    s.appendChild(el("rect", { x: 40, y: ty(temp) - 15, width: 30, height: 30, rx: 8, fill: "#ffffff", stroke: farbe, "stroke-width": 2 }));
    s.appendChild(el("path", { d: "M70 " + ty(temp) + "l-8 -6v12z", fill: farbe }));
  }
  function entdecken(){
    thermo();
    var w = $("tempWert"); w.textContent = z(temp) + " °C"; w.className = "gross " + (temp < 0 ? "kalt" : "warm");
    $("tempText").textContent = temp < 0 ? t("unterNull", { n: Math.abs(temp) }) : temp > 0 ? t("ueberNull", { n: temp }) : t("nullGrad");
    zahlenstrahl($("zsEntd"), { min: TMIN, max: TMAX, marken: [{ v: temp, text: z(temp) }],
      pfeile: temp ? [{ von: 0, bis: temp, cls: temp < 0 ? "minus" : "plus", text: String(Math.abs(temp)), gestr: true }] : [] });
    $("betrag").innerHTML = bdi("|" + z(temp) + "| = " + z(Math.abs(temp))) + " – " + t("betrag");
    $("gegen").innerHTML = t("gegenL", { z: bdi(z(temp)), g: bdi(z(-temp)) });
  }
  function ziehbar(svg, setze){
    var aktiv = false;
    function wert(ev){ var r = svg.getBoundingClientRect(), vb = svg.viewBox.baseVal; return svg._inv((ev.clientX - r.left) / r.width * vb.width); }
    svg.addEventListener("pointerdown", function(ev){ aktiv = true; svg.setPointerCapture(ev.pointerId); setze(wert(ev)); });
    svg.addEventListener("pointermove", function(ev){ if(aktiv) setze(wert(ev)); });
    svg.addEventListener("pointerup", function(){ aktiv = false; });
    svg.addEventListener("pointercancel", function(){ aktiv = false; });
  }
  function setzeTemp(v){ v = Math.max(TMIN, Math.min(TMAX, Math.round(v))); if(v !== temp){ temp = v; entdecken(); } }
  ziehbar($("zsEntd"), setzeTemp);
  (function(){
    var s = $("thermo"), aktiv = false;
    function wert(ev){ var r = s.getBoundingClientRect(), y = (ev.clientY - r.top) / r.height * 540; return TMIN + (TY1 - y) / (TY1 - TY0) * (TMAX - TMIN); }
    s.addEventListener("pointerdown", function(ev){ aktiv = true; s.setPointerCapture(ev.pointerId); setzeTemp(wert(ev)); });
    s.addEventListener("pointermove", function(ev){ if(aktiv) setzeTemp(wert(ev)); });
    s.addEventListener("pointerup", function(){ aktiv = false; });
    s.addEventListener("pointercancel", function(){ aktiv = false; });
    s.addEventListener("keydown", function(ev){ if(ev.key === "ArrowUp"){ setzeTemp(temp + 1); ev.preventDefault(); } if(ev.key === "ArrowDown"){ setzeTemp(temp - 1); ev.preventDefault(); } });
    s.setAttribute("tabindex", "0");
  })();

  function vergleich(){
    var a = lies($("va").value), b = lies($("vb").value);
    if(!isFinite(a) || !isFinite(b)){ $("vrel").textContent = "?"; $("vText").textContent = ""; return; }
    var r = a < b ? "<" : a > b ? ">" : "=";
    $("vrel").textContent = r;
    var B = bereich([a, b], 20);
    zahlenstrahl($("zsVgl"), { min: B.min, max: B.max, marken: [{ v: a, text: z(a) }, { v: b, cls: "b", text: z(b) }] });
    $("vText").innerHTML = r === "=" ? t("vGleich") : t("vErkl", { k: bdi(z(Math.min(a, b))), g: bdi(z(Math.max(a, b))) }) + " " + bdi(z(a) + " " + r + " " + z(b));
  }
  ["va", "vb"].forEach(function(id){ $(id).addEventListener("input", vergleich); });

  function alltag(){
    var h = "";
    ["a1", "a2", "a3", "a4", "a5"].forEach(function(k){ var p = t(k).split("|"); h += "<div><b>" + bdi(p[0]) + "</b>" + p[1] + "</div>"; });
    $("alltag").innerHTML = h;
  }

  // ---------- Rechnen ----------
  function rechne(a, op, b){ return op === "+" ? a + b : op === "-" ? a - b : op === "*" ? a * b : (b === 0 ? NaN : a / b); }
  function opZ(op){ return op === "+" ? "+" : op === "-" ? "−" : op === "*" ? "·" : ":"; }
  // Pfeile und Schritte für a op b
  function loesung(a, op, b){
    var r = rechne(a, op, b), pf = [], sch = [], ges = "";
    if(op === "+" || op === "-"){
      var weg = op === "+" ? b : -b; // tatsächliche Bewegung
      pf.push({ von: 0, bis: a, cls: "start", text: z(a), gestr: true });
      pf.push({ von: a, bis: r, cls: weg >= 0 ? "plus" : "minus", text: (weg >= 0 ? "+" : "−") + z(Math.abs(weg)), ebene: 1 });
      sch.push(t("start", { a: '<span class="start">' + bdi(z(a)) + "</span>" }));
      var k = op === "+" ? (b >= 0 ? "plusPos" : "plusNeg") : (b >= 0 ? "minusPos" : "minusNeg");
      var cls = weg >= 0 ? "plus" : "minus";
      sch.push('<span class="' + cls + '">' + t(k, { b: bdi(z(b)), n: Math.abs(b) }) + "</span>");
      sch.push(t("ergebnis", { r: "<b>" + bdi(z(r)) + "</b>" }));
      if(op === "+" && b < 0 || op === "-" && b < 0) sch.push(t("umform", { u: bdi(z(a) + " " + opZ(op) + " " + zk(b) + " = " + z(a) + " " + (weg >= 0 ? "+" : "−") + " " + z(Math.abs(b))) }));
      ges = t(weg >= 0 ? "geschW" : "geschK", { a: bdi(z(a)), n: Math.abs(weg), r: bdi(z(r)) });
    } else {
      var sa = a < 0 ? "−" : "+", sb = b < 0 ? "−" : "+", sr = (a < 0) !== (b < 0) ? "−" : "+";
      if(op === "*" && Number.isInteger(a) && Math.abs(a) >= 1 && Math.abs(a) <= 10 && Number.isInteger(b)){
        for(var i = 0; i < Math.abs(a); i++) pf.push({ von: i * b, bis: (i + 1) * b, cls: b >= 0 ? "plus" : "minus", text: i === 0 ? z(b) : "", ebene: 0 });
        if(a < 0) pf.push({ von: 0, bis: r, cls: "start", text: z(r), ebene: 2, gestr: true });
        sch.push(t("malSpr", { a: Math.abs(a), b: bdi(zk(b)), p: bdi(z(Math.abs(a) * b)) }) + (a < 0 ? " " + t("malUm", { r: bdi(z(r)) }) : ""));
      }
      sch.push(t("vorz", { v: bdi("(" + sa + ") " + opZ(op) + " (" + sb + ") = (" + sr + ")") }));
      sch.push(t("betr", { v: bdi(z(Math.abs(a)) + " " + opZ(op) + " " + z(Math.abs(b)) + " = " + (isFinite(r) ? z(Math.abs(r)) : "?")) }));
      sch.push(t("ergebnis", { r: "<b>" + bdi(isFinite(r) ? z(r) : "–") + "</b>" }));
      if(op === ":" && b === 0) sch = [t("durchNull")];
    }
    var werte = [a, isFinite(r) ? r : 0]; pf.forEach(function(p){ werte.push(p.von, p.bis); });
    return { r: r, pfeile: pf, schritte: sch, gesch: ges, werte: werte };
  }
  function rechnen(){
    var a = lies($("ra").value), b = lies($("rb").value), op = $("rop").value;
    if(!isFinite(a) || !isFinite(b)){ $("rerg").textContent = "?"; return; }
    var L = loesung(a, op, b), B = bereich(L.werte, 20);
    $("rerg").textContent = isFinite(L.r) ? z(L.r) : "–";
    zahlenstrahl($("zsRech"), { min: B.min, max: B.max, pfeile: L.pfeile, marken: isFinite(L.r) ? [{ v: L.r, text: z(L.r) }] : [] });
    $("rSchritte").innerHTML = L.schritte.map(function(s){ return "<li>" + s + "</li>"; }).join("");
    $("rGeschichte").innerHTML = L.gesch;
    // Vorzeichenregel hervorheben
    var an = (op === "*" || op === ":") ? (a < 0 ? "-" : "+") + (b < 0 ? "-" : "+") : "";
    var h = "";
    [["+", "+"], ["-", "-"], ["+", "-"], ["-", "+"]].forEach(function(p){
      var rr = p[0] === p[1] ? "+" : "−", o = (op === ":" ? ":" : "·");
      h += '<tr class="' + (an === p[0] + p[1] ? "an" : "") + '"><td>(' + (p[0] === "-" ? "−" : "+") + ") " + o + " (" + (p[1] === "-" ? "−" : "+") + ")</td><td>=</td><td>(" + rr + ")</td></tr>";
    });
    $("regeln").innerHTML = h;
    vier(); varianten();
  }
  // Alle vier Rechenarten mit denselben Zahlen a und b
  function vz(v){ return v < 0 ? "(−)" : v > 0 ? "(+)" : "0"; }
  function plusSchritte(a, b){
    var r = a + b, S = [];
    if(a === 0 || b === 0) S.push(t("plusNull"));
    else if((a < 0) === (b < 0)) S.push(t("plusGleich", { x: bdi("|" + z(a) + "| + |" + z(b) + "| = " + z(Math.abs(a) + Math.abs(b))), v: bdi(vz(a)) }));
    else {
      var g = Math.abs(a) >= Math.abs(b) ? a : b, k = g === a ? b : a;
      S.push(t("plusVersch", { x: bdi("|" + z(g) + "| − |" + z(k) + "| = " + z(Math.abs(g) - Math.abs(k))), g: bdi(z(g)), v: bdi(vz(r === 0 ? 0 : g)) }));
    }
    S.push(t("ergebnis", { r: "<b>" + bdi(z(r)) + "</b>" }));
    return S;
  }
  function vier(){
    var a = lies($("ra").value), b = lies($("rb").value), box = $("vier");
    if(!isFinite(a) || !isFinite(b)){ box.innerHTML = ""; return; }
    $("vierH").innerHTML = t("vierH", { a: "<b>" + bdi(z(a)) + "</b>", b: "<b>" + bdi(z(b)) + "</b>" });
    box.innerHTML = "";
    [["+", "regelPlus"], ["-", "regelMinus"], ["*", "regelMal"], [":", "regelGeteilt"]].forEach(function(o){
      var op = o[0], r = rechne(a, op, b), S, pf = [], mk = [];
      var d = document.createElement("div");
      if(op === "+"){ S = plusSchritte(a, b); pf = loesung(a, "+", b).pfeile; }
      else if(op === "-"){ S = [t("minusUm", { u: bdi(z(a) + " − " + zk(b) + " = " + z(a) + " + " + zk(-b)) })].concat(plusSchritte(a, -b)); pf = loesung(a, "-", b).pfeile; }
      else {
        var L = loesung(a, op, b); S = L.schritte.slice(); pf = L.pfeile;
        if(op === "*" && !pf.length && Number.isInteger(b) && Math.abs(b) >= 1 && Math.abs(b) <= 10){ var L2 = loesung(b, "*", a); pf = L2.pfeile; S.unshift(t("malSpr", { a: Math.abs(b), b: bdi(zk(a)), p: bdi(z(Math.abs(b) * a)) }) + (b < 0 ? " " + t("malUm2", { r: bdi(z(a * b)) }) : "")); } // Vertauschen: |b|-mal a
        if(op === ":" && b !== 0 && Number.isInteger(r)){
          S.push(t("probe", { p: bdi(zk(r) + " · " + zk(b) + " = " + z(a)) }));
          if(Math.abs(r) >= 1 && Math.abs(r) <= 12){ var sch = (a < 0 ? -1 : 1) * Math.abs(b); pf = []; for(var i = 0; i < Math.abs(r); i++) pf.push({ von: i * sch, bis: (i + 1) * sch, cls: sch < 0 ? "minus" : "plus", text: i === 0 ? z(sch) : "" }); }
        }
      }
      if(isFinite(r)) mk.push({ v: r, text: z(r) });
      d.innerHTML = "<h3>" + bdi(z(a) + " " + opZ(op) + " " + zk(b) + (isFinite(r) ? (Math.abs(r * 100 - Math.round(r * 100)) > 1e-9 ? " ≈ " : " = ") + z(r) : " = –")) + '</h3><p class="regel">' + t(o[1]) + "</p>";
      var sv = document.createElementNS(NS, "svg"); sv.setAttribute("viewBox", "0 0 600 130"); sv.setAttribute("class", "zs"); d.appendChild(sv);
      var ol = document.createElement("ol"); ol.innerHTML = S.map(function(x){ return "<li>" + x + "</li>"; }).join(""); d.appendChild(ol);
      box.appendChild(d);
      var werte = [a, isFinite(r) ? r : 0]; pf.forEach(function(p){ werte.push(p.von, p.bis); });
      var B = bereich(werte, 20); zahlenstrahl(sv, { min: B.min, max: B.max, pfeile: pf, marken: mk });
    });
  }
  // Alle Vorzeichen-Varianten: eigene kleine Beträge (Start 3 und 4), vier Vorzeichenpaare × vier Rechenarten.
  // Markierung: Plus/Minus (blau) – Rechenzeichen + Vorzeichen werden in der Rechnung zu EINEM Zeichen;
  // Mal/Geteilt (rosa) – Rechenzeichen bleibt, die zwei Vorzeichen ergeben das Vorzeichen des Ergebnisses.
  // Modi (gemerkt): "zeigen" (ansehen), "vz" (Vorzeichen zusammenfassen per +/−), "selbst" (Ergebnis eintippen).
  // Eingaben bleiben bei Sprachwechsel/Neuzeichnen erhalten (VE/VS, Schlüssel „x op y“).
  var VPAARE = [[3, 4], [4, 2], [2, 5], [6, 3], [5, 2], [8, 4], [4, 5], [9, 3], [6, 4], [2, 8]];
  var VA = 3, VB = 4;
  var VMOD = (function(){ try { var m = localStorage.getItem("msNegVarModus"); if(m === "zeigen" || m === "vz" || m === "selbst") return m; return localStorage.getItem("msNegSelbst") === "1" ? "selbst" : "zeigen"; } catch(e){ return "zeigen"; } })();
  var VE = {}, VS = {}, VZEIG = false;
  function vRund(r){ return Math.round(r * 100) / 100; }
  function vzc(v){ return v < 0 ? "−" : "+"; }
  function vPruefe(inp){
    var r = Number(inp.dataset.r), v = lies(inp.value);
    inp.classList.remove("richtig", "falsch", "zeig");
    if(inp.value.trim() === ""){ VE[inp.dataset.k] = ""; vStand(); return; }
    VE[inp.dataset.k] = inp.value;
    inp.classList.add(isFinite(v) && Math.abs(v - vRund(r)) < 0.006 ? "richtig" : "falsch");
    vStand();
  }
  function vStand(){
    var st = $("varStand"); if(!st) return;
    if(VMOD === "zeigen"){ st.textContent = ""; return; }
    var alle = document.querySelectorAll(VMOD === "selbst" ? "#varianten .vein" : "#varianten .vsein"), n = 0;
    alle.forEach(function(i){ if(i.classList.contains("richtig")) n++; });
    st.textContent = n === alle.length && n ? t("selbstAlle") : t("selbstStand", { r: n, n: alle.length });
    st.className = "vstand" + (n === alle.length && n ? " gut" : "");
  }
  // Eine Zeile als HTML-Teile: Aufgabe (markiert), Zwischenschritt/Ergebnis je nach Modus
  function vZeile(x, op, y, r, ex){
    var strich = op === "+" || op === "-", k = z(x) + op + z(y), gl = ex ? " ≈ " : " = ";
    var m = strich ? ((op === "+") === (y > 0) ? "+" : "−") : vzc(r);
    var auf, teile = [];
    if(strich){
      auf = zp(x) + ' <span class="vpaar">' + (VMOD === "zeigen" ? '<span class="vmk">' + m + "</span>" : "") + opZ(op) + " (" + vzc(y) + "</span>" + z(Math.abs(y)) + ")";
    } else {
      auf = '<span class="vpz">' + vzc(x) + "</span>" + z(Math.abs(x)) + " " + opZ(op) + ' (<span class="vpz">' + vzc(y) + "</span>" + z(Math.abs(y)) + ")";
    }
    teile.push(auf);
    var slot = function(){
      var g = VS[k];
      var cls = g ? (g === m ? " richtig" : " falsch") : (VZEIG ? " zeig" : "");
      var val = g || (VZEIG ? m : "");
      return '<input class="vsein vziel' + (strich ? " s" : " p") + cls + '" maxlength="1" autocomplete="off" spellcheck="false" inputmode="text" dir="ltr" aria-label="+ / −" data-k="' + k + '" data-m="' + m + '"' +
        (strich ? ' data-e="' + (gl.trim() + " " + zp(r)).replace(/"/g, "") + '"' : "") + ' value="' + val + '"' + (g === m || (VZEIG && !g) ? " readonly" : "") + ">";
    };
    if(VMOD === "zeigen"){
      if(strich) teile.push("= " + zp(x) + ' <b class="vsm vziel">' + m + "</b> " + z(Math.abs(y)));
      teile.push(gl.trim() + " <b>" + (strich ? zp(r) : '<span class="vpm vziel">' + vzc(r) + "</span>" + z(Math.abs(vRund(r)))) + "</b>");
    } else if(VMOD === "vz"){
      if(strich){
        teile.push("= " + zp(x) + " " + slot() + " " + z(Math.abs(y)));
        if(VS[k] === m) teile.push(gl.trim() + " <b>" + zp(r) + "</b>");
      } else teile.push(gl.trim() + " " + slot() + z(Math.abs(vRund(r))));
    } else {
      var wert = VE[k] || "";
      if(VZEIG && !wert) wert = zp(vRund(r));
      teile.push(gl.trim() + ' <input class="vein vziel' + (VZEIG && !VE[k] ? " zeig" : "") + '" autocomplete="off" spellcheck="false" dir="ltr" data-k="' + k + '" data-r="' + r + '" value="' + wert.replace(/"/g, "") + '"' + (VZEIG && !VE[k] ? " readonly" : "") + ">");
    }
    return teile.map(function(s){ return '<span class="vseg">' + s + "</span>"; }).join(" ");
  }
  // Pfeile wie von Hand: Plus/Minus – vom zusammengefassten Zeichen (bzw. eingekreisten Zeichenpaar) zum Zeichen in der Rechnung;
  // Mal/Geteilt – Vorzeichen 1 → Vorzeichen 2 → Vorzeichen des Ergebnisses. SVG über jeder Zeile, nach jedem Zeichnen/Größenwechsel neu.
  var VNS = "http://www.w3.org/2000/svg";
  function vPfeile(){
    document.querySelectorAll("#varianten .vzeile").forEach(function(row){
      var alt = row.querySelector("svg.vpfeile"); if(alt) alt.remove();
      var R = row.getBoundingClientRect(); if(!R.width) return;
      var strich = !!row.querySelector(".vpaar"), ziel = row.querySelector(".vziel"); if(!ziel || (strich && ziel.tagName === "INPUT")) return;
      var mk = row.querySelector(".vmk");
      var quellen = strich ? [mk || row.querySelector(".vpaar")] : Array.prototype.slice.call(row.querySelectorAll(".vpz"));
      var pts = quellen.concat([ziel]).map(function(e){ var b = e.getBoundingClientRect(); return { x: b.left - R.left + b.width / 2, y: b.top - R.top, r: b.right - R.left, m: b.top - R.top + b.height / 2, u: b.bottom - R.top }; });
      var svg = document.createElementNS(VNS, "svg"); svg.setAttribute("class", "vpfeile " + (strich ? "s" : "p"));
      svg.setAttribute("width", R.width); svg.setAttribute("height", R.height); svg.setAttribute("aria-hidden", "true");
      var d = "";
      for(var i = 0; i + 1 < pts.length; i++){
        var a = pts[i], b = pts[i + 1], x1, y1, x2 = b.x, y2 = b.y - 1;
        if(strich && mk){ x1 = a.r + 1; y1 = a.m; } else { x1 = a.x + 3; y1 = a.y - 1; }
        if(y2 > a.u + 4){ // Zeile umgebrochen: Bogen von unten nach unten
          x1 = a.x; y1 = a.u + 1;
          d += "M" + x1.toFixed(1) + " " + y1.toFixed(1) + " C" + x1.toFixed(1) + " " + (y1 + 10).toFixed(1) + " " + x2.toFixed(1) + " " + (y2 - 10).toFixed(1) + " " + x2.toFixed(1) + " " + y2.toFixed(1) + " ";
        } else {
        var top = Math.max(2, Math.min(y1, y2) - 12);
        d += "M" + x1.toFixed(1) + " " + y1.toFixed(1) + " C" + (x1 + (x2 - x1) * 0.3).toFixed(1) + " " + top.toFixed(1) + " " + (x1 + (x2 - x1) * 0.8).toFixed(1) + " " + top.toFixed(1) + " " + x2.toFixed(1) + " " + y2.toFixed(1) + " ";
        }
        d += "M" + (x2 - 4.5).toFixed(1) + " " + (y2 - 6).toFixed(1) + " L" + x2.toFixed(1) + " " + y2.toFixed(1) + " L" + (x2 + 4.5).toFixed(1) + " " + (y2 - 6).toFixed(1) + " ";
      }
      var pa = document.createElementNS(VNS, "path"); pa.setAttribute("d", d); svg.appendChild(pa);
      row.appendChild(svg);
    });
  }
  if(window.ResizeObserver){ var vRO = new ResizeObserver(function(){ requestAnimationFrame(vPfeile); }); vRO.observe(document.getElementById("varianten")); }
  else window.addEventListener("resize", vPfeile);
  function varianten(){
    var a = lies($("ra").value), b = lies($("rb").value), tb = $("varianten");
    var A = VA, B = VB;
    $("varH").innerHTML = t("varH", { a: "<b>" + bdi(z(A)) + "</b>", b: "<b>" + bdi(z(B)) + "</b>" });
    document.querySelectorAll("#varModus button").forEach(function(bt){
      var mm = bt.dataset.m; bt.textContent = mm === "zeigen" ? t("modAnsehen") : mm === "vz" ? t("modVz") : t("selbst");
      bt.setAttribute("aria-pressed", mm === VMOD ? "true" : "false");
    });
    $("varSelbstH").textContent = VMOD === "selbst" ? t("selbstH") : VMOD === "vz" ? t("vzH") : "";
    $("varSelbstH").hidden = VMOD === "zeigen"; $("varStand").hidden = VMOD === "zeigen";
    $("varLoes").hidden = VMOD === "zeigen";
    $("varLoes").textContent = VZEIG ? t("selbstVerbergen") : t("selbstLoes"); $("varNeu").textContent = t("neuesBsp");
    $("varLegS").textContent = t("legS"); $("varLegP").textContent = t("legP");
    var paare = [[A, B], [A, -B], [-A, B], [-A, -B]], h = "";
    [["+", "regelPlus"], ["-", "regelMinus"], ["*", "regelMal"], [":", "regelGeteilt"]].forEach(function(o){
      var op = o[0];
      h += '<div class="vbox ' + (op === "+" || op === "-" ? "strich" : "punkt") + '"><div class="vkopf">' + opZ(op) + "</div>";
      paare.forEach(function(p){
        var x = p[0], y = p[1], r = rechne(x, op, y), ex = isFinite(r) && Math.abs(r * 100 - Math.round(r * 100)) > 1e-9, an = x === a && y === b;
        var inhalt = vZeile(x, op, y, r, ex);
        if(VMOD === "zeigen") h += '<button type="button" dir="ltr" class="vzeile mitm' + (an ? " an" : "") + '" data-a="' + x + '" data-b="' + y + '">' + inhalt + "</button>";
        else h += '<div dir="ltr" class="vzeile vselbst' + (an ? " an" : "") + '">' + inhalt + "</div>";
      });
      h += "</div>";
    });
    tb.innerHTML = h; tb.classList.toggle("selbst", VMOD !== "zeigen");
    tb.querySelectorAll("button.vzeile").forEach(function(z1){ z1.addEventListener("click", function(){ $("ra").value = z(Number(z1.dataset.a)).replace("−", "-"); $("rb").value = z(Number(z1.dataset.b)).replace("−", "-"); rechnen(); $("tVier").scrollIntoView({ behavior: "smooth", block: "start" }); }); });
    // Vorzeichen zusammenfassen: ein Zeichen eintippen (+ oder −/-), wird sofort geprüft
    var vsIns = Array.prototype.slice.call(tb.querySelectorAll(".vsein"));
    function vsWeiter(inp){
      var i = vsIns.indexOf(inp);
      for(var j = 1; j <= vsIns.length; j++){ var n = vsIns[(i + j) % vsIns.length]; if(!n.readOnly){ n.focus(); n.select(); return; } }
      inp.blur();
    }
    function vsPruefe(inp, springen){
      var v = inp.value.trim().replace(/[-–−]/g, "−");
      inp.classList.remove("richtig", "falsch");
      if(!v){ delete VS[inp.dataset.k]; vStand(); return; }
      if(v !== "+" && v !== "−"){ inp.value = ""; delete VS[inp.dataset.k]; vStand(); return; }
      inp.value = v; VS[inp.dataset.k] = v;
      if(v === inp.dataset.m){
        inp.classList.add("richtig"); inp.readOnly = true;
        if(inp.dataset.e && !inp.parentNode.parentNode.querySelector(".verg")){ var sp = document.createElement("span"); sp.className = "vseg verg"; sp.innerHTML = inp.dataset.e.replace(/(\S+)$/, "<b>$1</b>"); inp.parentNode.parentNode.insertBefore(sp, inp.parentNode.nextSibling); }
        vStand(); requestAnimationFrame(vPfeile);
        if(springen) vsWeiter(inp);
      } else { inp.classList.add("falsch"); vStand(); inp.select(); }
    }
    vsIns.forEach(function(inp){
      inp.addEventListener("input", function(){ vsPruefe(inp, true); });
      inp.addEventListener("keydown", function(e){ if(e.key === "Enter"){ e.preventDefault(); if(inp.value) vsPruefe(inp, false); vsWeiter(inp); } });
      inp.addEventListener("focus", function(){ try { inp.select(); } catch(x){} });
    });
    var ins = Array.prototype.slice.call(tb.querySelectorAll(".vein"));
    ins.forEach(function(inp, i){
      if(VE[inp.dataset.k]) vPruefe(inp);
      inp.addEventListener("change", function(){ vPruefe(inp); });
      inp.addEventListener("keydown", function(e){
        if(e.key !== "Enter") return;
        e.preventDefault(); vPruefe(inp);
        for(var j = 1; j <= ins.length; j++){ var n = ins[(i + j) % ins.length]; if(!n.classList.contains("richtig") && !n.readOnly){ n.focus(); return; } }
        inp.blur();
      });
    });
    vStand();
    $("varMerk").textContent = t("varMerk");
    requestAnimationFrame(vPfeile);
  }
  document.querySelectorAll("#varModus button").forEach(function(bt){ bt.addEventListener("click", function(){
    VMOD = bt.dataset.m; VZEIG = false;
    try { localStorage.setItem("msNegVarModus", VMOD); } catch(e){}
    varianten();
  }); });
  $("varLoes").addEventListener("click", function(){ VZEIG = !VZEIG; varianten(); });
  $("varNeu").addEventListener("click", function(){
    var p; do { p = VPAARE[zuf(0, VPAARE.length - 1)]; } while(p[0] === VA && p[1] === VB);
    VA = p[0]; VB = p[1]; VE = {}; VS = {}; VZEIG = false; varianten();
  });
  $("neuesBsp").addEventListener("click", function(){
    var b, q, a;
    do { b = zuf(-9, 9); q = zuf(-9, 9); } while(!b || !q || Math.abs(b) === 1 || Math.abs(q) === 1 || (b > 0 && q > 0));
    a = b * q; $("ra").value = z(a).replace("−", "-"); $("rb").value = z(b).replace("−", "-"); rechnen();
  });
  ["ra", "rb"].forEach(function(id){ $(id).addEventListener("input", rechnen); });
  $("rop").addEventListener("change", rechnen);

  // ---------- Üben ----------
  var auf = null, punkte = 0, anzahl = 0, beantwortet = false, zweiterV = false;
  var TYPEN = ["ablesen", "vergleich", "temp", "plusminus", "plusminus", "maldurch", "betrag"];
  function neueAufgabe(){
    var typ = TYPEN[zuf(0, TYPEN.length - 1)], a, b, op;
    beantwortet = false; zweiterV = false;
    if(typ === "ablesen"){ a = zuf(-15, 15) || -6; auf = { typ: typ, a: a, l: a }; }
    else if(typ === "vergleich"){ a = zuf(-20, 20); b = Math.random() < 0.1 ? a : zuf(-20, 20); auf = { typ: typ, a: a, b: b, l: a < b ? "<" : a > b ? ">" : "=" }; }
    else if(typ === "temp"){ a = zuf(-12, 8); var n = zuf(2, 15), w = Math.random() < 0.5 ? 1 : -1; auf = { typ: typ, a: a, n: n, w: w, l: a + w * n, op: w > 0 ? "+" : "-", b: n }; }
    else if(typ === "plusminus"){ a = zuf(-20, 20); b = zuf(-15, 15) || 4; op = Math.random() < 0.5 ? "+" : "-"; auf = { typ: typ, a: a, b: b, op: op, l: rechne(a, op, b) }; }
    else if(typ === "maldurch"){
      a = zuf(-10, 10) || -3; b = zuf(-10, 10) || 5; op = Math.random() < 0.5 ? "*" : ":";
      if(op === ":"){ var q = a; a = q * b; auf = { typ: typ, a: a, b: b, op: op, l: q }; } else auf = { typ: typ, a: a, b: b, op: op, l: a * b };
    }
    else { a = zuf(-25, 25) || -9; var g = Math.random() < 0.5; auf = { typ: g ? "gegen" : "betrag", a: a, l: g ? -a : Math.abs(a) }; }
    zeigeAufgabe();
  }
  function aufgabeText(){
    var A = auf;
    if(A.typ === "ablesen") return t("aufAblesen");
    if(A.typ === "vergleich") return t("aufVergleich") + " " + bdi(z(A.a) + " ☐ " + z(A.b));
    if(A.typ === "temp") return t("aufTemp", { a: bdi(z(A.a)), n: A.n, w: t(A.w > 0 ? "waermer" : "kaelter") });
    if(A.typ === "plusminus" || A.typ === "maldurch") return t("aufRechnen") + " " + bdi(z(A.a) + " " + opZ(A.op) + " " + zk(A.b) + " = ?");
    if(A.typ === "betrag") return t("aufBetrag", { z: bdi("|" + z(A.a) + "|") });
    return t("aufGegen", { z: bdi(z(A.a)) });
  }
  function zeigeAufgabe(){
    $("auftrag").innerHTML = aufgabeText();
    $("meldung").textContent = ""; $("meldung").className = "meldung";
    sicht($("zsLoes"), false);
    var zs = $("zsUeb");
    sicht(zs, auf.typ === "ablesen");
    if(auf.typ === "ablesen") zahlenstrahl(zs, { min: -20, max: 20, marken: [{ v: auf.a, text: "?" }] });
    var z2 = $("antwortzeile"); z2.innerHTML = "";
    if(auf.typ === "vergleich"){
      ["<", "=", ">"].forEach(function(c){ var b = document.createElement("button"); b.type = "button"; b.className = "knopf hell zeichen"; b.textContent = c; b.addEventListener("click", function(){ pruefe(c); }); z2.appendChild(b); });
    } else {
      var inp = document.createElement("input"); inp.className = "zahl"; inp.id = "antwort"; inp.setAttribute("inputmode", "text"); inp.setAttribute("autocomplete", "off"); inp.placeholder = t("eingabe");
      inp.addEventListener("keydown", function(e){ if(e.key === "Enter") pruefe(inp.value); });
      var mb = document.createElement("button"); mb.type = "button"; mb.className = "knopf hell zeichen"; mb.textContent = "±"; mb.title = t("vorzeichenKnopf");
      mb.addEventListener("click", function(){ var v = inp.value.trim(); inp.value = /^[−-]/.test(v) ? v.replace(/^[−-]/, "") : "−" + v; inp.focus(); });
      var pb = document.createElement("button"); pb.type = "button"; pb.className = "knopf"; pb.id = "pruefen"; pb.textContent = t("pruefen");
      pb.addEventListener("click", function(){ pruefe(inp.value); });
      z2.appendChild(mb); z2.appendChild(inp); z2.appendChild(pb);
    }
    $("weiter").textContent = t("weiter");
    $("punkte").textContent = t("punkte", { p: punkte, n: anzahl });
  }
  function pruefe(eingabe){
    if(beantwortet) return;
    var ok;
    if(auf.typ === "vergleich") ok = eingabe === auf.l;
    else { var v = lies(eingabe); if(!isFinite(v)) return; ok = Math.abs(v - auf.l) < 1e-9; }
    if(!ok && !zweiterV && msTippbar(eingabe)){ zweiterV = true; msNochmal($("meldung")); return; } beantwortet = true; anzahl++; if(ok) punkte++;
    var m = $("meldung");
    var loesText = auf.typ === "vergleich" ? z(auf.a) + " " + auf.l + " " + z(auf.b) : z(auf.l);
    m.className = "meldung " + (ok ? "gut" : "schlecht");
    m.innerHTML = ok ? t("richtig") + " " + bdi(loesText) : t("falsch", { l: bdi(loesText) });
    // Lösungsweg am Zahlenstrahl
    var s = $("zsLoes"), B;
    if(auf.typ === "temp" || auf.typ === "plusminus" || (auf.typ === "maldurch" && auf.op === "*")){
      var L = loesung(auf.a, auf.op, auf.b); B = bereich(L.werte, 20);
      zahlenstrahl(s, { min: B.min, max: B.max, pfeile: L.pfeile, marken: [{ v: L.r, text: z(L.r) }] }); sicht(s, true);
      if(!ok) m.innerHTML += '<br><span class="muted" style="font-weight:400">' + L.schritte.join(" · ") + "</span>";
    } else if(auf.typ === "maldurch" && !ok){
      m.innerHTML += '<br><span class="muted" style="font-weight:400">' + loesung(auf.a, auf.op, auf.b).schritte.join(" · ") + "</span>";
    } else if(auf.typ === "vergleich" || auf.typ === "betrag" || auf.typ === "gegen" || auf.typ === "ablesen"){
      var mk = auf.typ === "vergleich" ? [{ v: auf.a, text: z(auf.a) }, { v: auf.b, cls: "b", text: z(auf.b) }] : auf.typ === "ablesen" ? [{ v: auf.a, text: z(auf.a) }] : [{ v: auf.a, text: z(auf.a) }, { v: -auf.a, cls: "b", text: z(-auf.a) }];
      var pf = auf.typ === "betrag" ? [{ von: 0, bis: auf.a, cls: auf.a < 0 ? "minus" : "plus", text: String(Math.abs(auf.a)) }] : [];
      B = bereich(mk.map(function(q){ return q.v; }), 20);
      zahlenstrahl(s, { min: B.min, max: B.max, marken: auf.typ === "betrag" ? [mk[0]] : mk, pfeile: pf }); sicht(s, true);
      if(auf.typ === "vergleich" && !ok) m.innerHTML += '<br><span class="muted" style="font-weight:400">' + t("vErkl", { k: bdi(z(Math.min(auf.a, auf.b))), g: bdi(z(Math.max(auf.a, auf.b))) }) + "</span>";
    }
    $("punkte").textContent = t("punkte", { p: punkte, n: anzahl });
    $("weiter").focus();
  }
  $("weiter").addEventListener("click", neueAufgabe);

  // ---------- Reiter ----------
  var tab = "entd";
  function zeigeTab(k){
    tab = k;
    document.querySelectorAll(".tabs button").forEach(function(b){ b.setAttribute("aria-selected", b.dataset.tab === k ? "true" : "false"); });
    ["entd", "rech", "ueben"].forEach(function(x){ $("s_" + x).hidden = x !== k; });
    if(k === "ueben" && !auf) neueAufgabe();
    alles();
  }
  document.querySelectorAll(".tabs button").forEach(function(b){ b.addEventListener("click", function(){ zeigeTab(b.dataset.tab); }); });

  // ---------- Texte (bei jedem Sprachwechsel alles neu beschriften) ----------
  function alles(){
    document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = "miStudia – " + t("titel");
    $("titel").textContent = t("titel");
    document.querySelectorAll(".tabs button").forEach(function(b){ b.textContent = t("tab_" + b.dataset.tab); });
    $("tZieh").textContent = t("zieh");
    $("tVergleich").textContent = t("tVergleich"); $("tAlltag").textContent = t("tAlltag");
    $("tRechnen").textContent = t("tRechnen"); $("tVier").textContent = t("tVier"); $("tVarianten").textContent = t("tVarianten"); $("neuesBsp").textContent = t("neuesBsp"); $("tRegeln").textContent = t("tRegeln"); $("regelHinweis").textContent = t("regelHinweis");
    // Guthaben/Schulden-Karte „Minus = Gegenzahl dazu“ (gemeinsam mit „Terme vereinfachen“, /grundlagen.js)
    if(window.MS_GRUND) MS_GRUND.karten($("grundMinus"), ["minus"], lang);
    entdecken(); vergleich(); alltag(); rechnen();
    if(auf){
      var alt = $("meldung").innerHTML, war = beantwortet, eing = $("antwort") ? $("antwort").value : "";
      $("auftrag").innerHTML = aufgabeText(); $("weiter").textContent = t("weiter"); $("punkte").textContent = t("punkte", { p: punkte, n: anzahl });
      if($("antwort")){ $("antwort").placeholder = t("eingabe"); $("pruefen").textContent = t("pruefen"); }
      if(war && alt){ beantwortet = false; anzahl--; var richtigVorher = $("meldung").classList.contains("gut"); if(richtigVorher) punkte--; pruefe(auf.typ === "vergleich" ? (richtigVorher ? auf.l : "x") : (richtigVorher ? String(auf.l) : (eing || "999999"))); }
    }
  }
  window.MS_LANG = { apply: function(l){ if(NT[l]){ lang = l; alles(); } } };
  alles();
})();
