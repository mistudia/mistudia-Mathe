// ============================================================
// zinsen/app.js – Prozent- & Zinsrechnung
// Prozent: Prozentwert W, Grundwert G, Prozentsatz p, Erhöhung, Senkung –
//   jeweils mit Formel, Dreisatz und Dezimalzahl/Faktor, Prozentstreifen.
// Zinsen: Z = K · p/100 · t (Jahre, Monate = /12, Tage = /360), auch K oder p gesucht.
// Zinseszins: K_n = K_0 · q^n mit Jahrestabelle, Diagramm (Vergleich ohne
//   Zinseszins), Verdopplungszeit und 72er-Regel.
// Üben: Textaufgaben zu allen Teilen. Geld in Japan/Russland ohne Cent (×100).
// Texte: zinsen/texte.js (ZR), Sprache aus dem Startmenü (MS_LANG).
// ============================================================
(function(){
  "use strict";
  var NS = "http://www.w3.org/2000/svg", lang = "de";
  function $(id){ return document.getElementById(id); }
  function t(k, v){ var s = (ZR[lang] && ZR[lang][k]) || ZR.de[k] || k; if(v) for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  function el(n, a, txt){ var e = document.createElementNS(NS, n); for(var k in a) if(a[k] != null) e.setAttribute(k, a[k]); if(txt != null) e.textContent = txt; return e; }
  function leer(s){ while(s.lastChild) s.removeChild(s.lastChild); }
  function sicht(e, an){ if(an) e.removeAttribute("hidden"); else e.setAttribute("hidden", ""); }
  function bdi(s){ return '<bdi dir="ltr">' + s + "</bdi>"; }
  function zuf(a, b){ return a + Math.floor(Math.random() * (b - a + 1)); }
  function wahl(L){ return L[Math.floor(Math.random() * L.length)]; }
  function komma(){ return !(lang === "en" || lang === "zh" || lang === "ja" || lang === "ar"); }
  function zahl(v, d){ if(d == null) d = 2; var r = Math.round(v * Math.pow(10, d)) / Math.pow(10, d); if(Object.is(r, -0)) r = 0; var s = String(Math.abs(r)); if(s.indexOf("e") >= 0) s = Math.abs(r).toFixed(d); if(komma()) s = s.replace(".", ","); return (r < 0 ? "−" : "") + s; }
  function genau(v, d){ return Math.abs(v * Math.pow(10, d) - Math.round(v * Math.pow(10, d))) < 1e-9; }
  function zg(v, d){ return (genau(v, d == null ? 2 : d) ? "" : "≈ ") + zahl(v, d); } // mit ≈, wenn gerundet
  function lies(s){ s = String(s).trim().replace(/[−–]/g, "-").replace(/\s/g, "").replace(/[€$₽元円%]/g, ""); if(/,/.test(s) && /\./.test(s)) s = s.replace(/\./g, ""); s = s.replace(",", "."); return s === "" ? NaN : Number(s); }
  function gf(){ return lang === "ja" || lang === "ru" ? 100 : 1; }
  function geld(v){ var d = gf() === 1 ? 2 : 0, s = (Math.round(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d); if(komma()) s = s.replace(".", ","); return t("geldFmt", { v: s }); }
  function waehrung(){ return t("geldFmt", { v: "" }).trim(); }
  var HOCH = "⁰¹²³⁴⁵⁶⁷⁸⁹";
  function hoch(k){ return String(k).split("").map(function(c){ return HOCH[+c]; }).join(""); }
  function wahlKnoepfe(box, liste, aktiv, klick){
    box.innerHTML = ""; liste.forEach(function(k){ var b = document.createElement("button"); b.type = "button"; b.textContent = t(k[1]); b.dataset.k = k[0]; b.setAttribute("aria-pressed", k[0] === aktiv ? "true" : "false"); b.addEventListener("click", function(){ klick(k[0]); }); box.appendChild(b); });
  }

  // ---------- Reiter Prozentrechnung ----------
  var pModus = "W", PMODI = ["W", "G", "P", "E", "S"];
  function prozent(){
    sicht($("bG"), pModus !== "G"); sicht($("bP"), pModus !== "P"); sicht($("bW"), pModus === "G" || pModus === "P");
    $("tG").textContent = t(pModus === "E" || pModus === "S" ? "gAlt" : "gL"); $("tP").textContent = t(pModus === "E" ? "pPlus" : pModus === "S" ? "pMinus" : "pL"); $("tW").textContent = t("wL");
    var G = lies($("pG").value), p = lies($("pP").value), W = lies($("pW").value), fe = "";
    if(pModus === "G"){ if(!(W >= 0 && p > 0)) fe = t("fehler"); else G = W * 100 / p; }
    else if(pModus === "P"){ if(!(G > 0 && W >= 0)) fe = t("fehler"); else p = W / G * 100; }
    else { if(!(G >= 0 && p >= 0) || (pModus === "S" && p > 100)) fe = t("fehler"); else W = G * p / 100; }
    $("pFehler").textContent = fe;
    if(fe){ $("pErgebnis").textContent = ""; $("pWege").innerHTML = ""; leer($("streifen")); return; }
    var q = p / 100, neu = pModus === "E" ? G + W : G - W, Z = function(v){ return zg(v, 4); };
    var erg = { W: "W = " + Z(W), G: "G = " + Z(G), P: "p = " + Z(p) + " %", E: t("neuL") + " " + Z(neu), S: t("neuL") + " " + Z(neu) }[pModus];
    $("pErgebnis").innerHTML = bdi(erg);
    var F = [], D = [], K = [];
    if(pModus === "W"){ F = ["W = G · p : 100", "W = " + Z(G) + " · " + Z(p) + " : 100 = " + Z(G * p) + " : 100 = " + Z(W)]; D = ["100 % ≙ " + Z(G), "1 % ≙ " + Z(G / 100), Z(p) + " % ≙ " + Z(W)]; K = [Z(p) + " % = " + Z(q), "W = " + Z(q) + " · " + Z(G) + " = " + Z(W)]; }
    else if(pModus === "G"){ F = ["G = W · 100 : p", "G = " + Z(W) + " · 100 : " + Z(p) + " = " + Z(W * 100) + " : " + Z(p) + " = " + Z(G)]; D = [Z(p) + " % ≙ " + Z(W), "1 % ≙ " + Z(W / p), "100 % ≙ " + Z(G)]; K = [Z(p) + " % = " + Z(q), "G = " + Z(W) + " : " + Z(q) + " = " + Z(G)]; }
    else if(pModus === "P"){ F = ["p = W : G · 100", "p = " + Z(W) + " : " + Z(G) + " · 100 = " + Z(W / G) + " · 100 = " + Z(p)]; D = [Z(G) + " ≙ 100 %", "1 ≙ " + Z(100 / G) + " %", Z(W) + " ≙ " + Z(p) + " %"]; K = [Z(W) + " : " + Z(G) + " = " + Z(q), Z(q) + " = " + Z(p) + " %"]; }
    else { var s = pModus === "E" ? "+" : "−", pp = pModus === "E" ? 100 + p : 100 - p;
      F = [t("neuK") + " = G · (100 " + s + " p) : 100", t("neuK") + " = " + Z(G) + " · " + Z(pp) + " : 100 = " + Z(neu)];
      D = ["100 % ≙ " + Z(G), "1 % ≙ " + Z(G / 100), Z(pp) + " % ≙ " + Z(neu)];
      K = ["q = 1 " + s + " " + Z(q) + " = " + Z(pp / 100), Z(G) + " · " + Z(pp / 100) + " = " + Z(neu), t("aenderung") + " " + s + Z(W)]; }
    function box(h, L){ return "<div><h3>" + h + "</h3>" + L.map(function(x){ return "<p>" + bdi(x) + "</p>"; }).join("") + "</div>"; }
    $("pWege").innerHTML = box(t("hFormel"), F) + box(t("hDreisatz"), D) + box(t("hFaktor"), K);
    $("pMerke").textContent = t("merk" + pModus);
    streifen(G, p, W, neu);
  }
  function streifen(G, p, W, neu){
    var sv = $("streifen"); leer(sv);
    var schmal = (sv.clientWidth || 640) < 520, VW = schmal ? 400 : 640;
    sv.setAttribute("viewBox", "0 0 " + VW + " 110");
    var max = pModus === "E" ? 100 + p : Math.max(100, p), L = 30, B = VW - 60, S = B / max, y = 34, h = 34;
    function X(pr){ return L + pr * S; }
    sv.appendChild(el("rect", { x: X(0), y: y, width: 100 * S, height: h, "class": "st-rand" }));
    if(pModus === "E"){ sv.appendChild(el("rect", { x: X(100), y: y, width: p * S, height: h, "class": "st-plus" })); sv.appendChild(el("rect", { x: X(0), y: y, width: (100 + p) * S, height: h, fill: "none", stroke: "#15803d", "stroke-width": 2, "stroke-dasharray": "6 4" })); }
    else if(pModus === "S") sv.appendChild(el("rect", { x: X(100 - p), y: y, width: p * S, height: h, "class": "st-minus" }));
    else sv.appendChild(el("rect", { x: X(0), y: y, width: Math.min(p, max) * S, height: h, "class": "st-teil" }));
    sv.appendChild(el("rect", { x: X(0), y: y, width: 100 * S, height: h, fill: "none", stroke: "#1a2233", "stroke-width": 2 }));
    var marken = [[0, 0], [100, G]];
    if(pModus === "E") marken.push([100 + p, neu]); else if(pModus === "S") marken.push([100 - p, neu]); else marken.push([p, W]);
    var Z = function(v){ return zahl(v, 2); }, belegt = [];
    marken.sort(function(a, b){ return a[0] - b[0]; }).forEach(function(m){
      var x = X(m[0]); if(belegt.some(function(b){ return Math.abs(b - x) < 40; }) && m[0] !== 100) return; belegt.push(x);
      sv.appendChild(el("line", { x1: x, y1: y - 6, x2: x, y2: y + h + 6, stroke: "#1a2233", "stroke-width": 1.5 }));
      sv.appendChild(el("text", { x: x, y: y - 11, "class": "st-klein" }, Z(m[0]) + " %"));
      sv.appendChild(el("text", { x: x, y: y + h + 24, "class": "st-txt" }, Z(m[1])));
    });
  }
  ["pG", "pP", "pW"].forEach(function(id){ $(id).addEventListener("input", prozent); });
  function setzePModus(m){ pModus = m; wahlKnoepfe($("pModus"), PMODI.map(function(x){ return [x, "pm_" + x]; }), pModus, setzePModus); prozent(); }

  // ---------- Reiter Zinsen ----------
  var zModus = "Z", ZMODI = ["Z", "K", "P"];
  function zeitFaktor(n, e){ return e === "m" ? n / 12 : e === "d" ? n / 360 : n; }
  function zeitText(n, e){ return t(e === "m" ? "zeitM" : e === "d" ? "zeitD" : "zeitJ", { n: zahl(n, 2) }); }
  function bruchZeit(n, e){ return e === "m" ? zahl(n, 0) + "/12" : e === "d" ? zahl(n, 0) + "/360" : zahl(n, 2); }
  function zins(){
    sicht($("bK"), zModus !== "K"); sicht($("bZp"), zModus !== "P"); sicht($("bZ"), zModus !== "Z");
    $("eK").textContent = waehrung(); $("eZ").textContent = waehrung();
    var K = lies($("zK").value), p = lies($("zP").value), Z = lies($("zZ").value), n = lies($("zT").value), e = $("zEinheit").value, f = zeitFaktor(n, e), fe = "";
    if(!(n > 0)) fe = t("fehler");
    else if(zModus === "Z"){ if(!(K >= 0 && p >= 0)) fe = t("fehler"); else Z = K * p / 100 * f; }
    else if(zModus === "K"){ if(!(Z >= 0 && p > 0)) fe = t("fehler"); else K = Z * 100 / (p * f); }
    else { if(!(Z >= 0 && K > 0)) fe = t("fehler"); else p = Z * 100 / (K * f); }
    $("zFehler").textContent = fe;
    if(fe){ $("zErgebnis").textContent = ""; $("zWeg").innerHTML = ""; return; }
    var L = [], jz = K * p / 100;
    if(zModus === "Z"){
      L.push(t("jahresZ") + " " + bdi("K · p : 100 = " + geld(K) + " · " + zahl(p, 3) + " : 100 = " + geld(jz)));
      if(e !== "j" || n !== 1) L.push(t("zeitAnteil") + " " + bdi(zeitText(n, e) + " = " + bruchZeit(n, e) + " " + t("jahrK")));
      if(e !== "j" || n !== 1) L.push(t("zinsenL") + " " + bdi("Z = " + geld(jz) + " · " + bruchZeit(n, e) + " = " + geld(Z)));
      $("zErgebnis").innerHTML = bdi("Z = " + geld(Z));
    } else if(zModus === "K"){
      L.push(t("umstellen") + " " + bdi("K = Z · 100 : (p · t)"));
      L.push(bdi("t = " + bruchZeit(n, e) + (e === "j" ? "" : " = " + zahl(f, 4))));
      L.push(bdi("K = " + geld(Z) + " · 100 : (" + zahl(p, 3) + " · " + zahl(f, 4) + ") = " + geld(K)));
      $("zErgebnis").innerHTML = bdi("K = " + geld(K));
    } else {
      L.push(t("umstellen") + " " + bdi("p = Z · 100 : (K · t)"));
      L.push(bdi("t = " + bruchZeit(n, e) + (e === "j" ? "" : " = " + zahl(f, 4))));
      L.push(bdi("p = " + geld(Z) + " · 100 : (" + geld(K) + " · " + zahl(f, 4) + ") = " + zg(p, 3) + " %"));
      $("zErgebnis").innerHTML = bdi("p = " + zg(p, 3) + " %");
    }
    L.push(t("formelZ") + " " + bdi("Z = K · p/100 · t"));
    $("zWeg").innerHTML = L.map(function(x){ return "<li>" + x + "</li>"; }).join("");
    $("zMerke").textContent = t("zMerke");
  }
  ["zK", "zP", "zZ", "zT"].forEach(function(id){ $(id).addEventListener("input", zins); }); $("zEinheit").addEventListener("change", zins);
  function setzeZModus(m){ zModus = m; wahlKnoepfe($("zModus"), ZMODI.map(function(x){ return [x, "zm_" + x]; }), zModus, setzeZModus); zins(); }

  // ---------- Reiter Zinseszins ----------
  function zinseszins(){
    $("eK0").textContent = waehrung();
    var K = lies($("zzK").value), p = lies($("zzP").value), n = lies($("zzN").value);
    // Schieberegler an die Eingaben angleichen (Kapital-Regler passend zur Währung)
    $("zzKR").min = 100 * gf(); $("zzKR").max = 10000 * gf(); $("zzKR").step = 100 * gf();
    if(K > 0) $("zzKR").value = K; if(p > 0) $("zzPR").value = p; if(n >= 1) $("zzNR").value = n;
    var ok = K > 0 && p > 0 && p <= 100 && n >= 1 && n <= 60 && Math.round(n) === n;
    $("zzFehler").textContent = ok ? "" : t("fehlerZZ");
    if(!ok){ ["zzErgebnis", "zzFormel", "zzVerdopp", "zzTab"].forEach(function(id){ $(id).innerHTML = ""; }); leer($("zzGraph")); return; }
    var q = 1 + p / 100, Kn = K * Math.pow(q, n), einfach = K * (1 + n * p / 100);
    $("zzErgebnis").innerHTML = bdi("K" + "<sub>" + n + "</sub> = " + geld(Kn));
    $("zzFormel").innerHTML = bdi("K<sub>n</sub> = K<sub>0</sub> · q<sup>n</sup>, q = 1 + " + zahl(p, 3) + " % = " + zahl(q, 5)) + "<br>" + bdi("K<sub>" + n + "</sub> = " + geld(K) + " · " + zahl(q, 5) + hoch(n) + " = " + geld(Kn)) + "<br>" +
      t("ohneZZ", { b: bdi(geld(einfach)), d: bdi(geld(Kn - einfach)) });
    var h = "<tr><th>" + t("jahr") + "</th><th>" + t("anfang") + "</th><th>" + t("zinsenS") + "</th><th>" + t("ende") + "</th></tr>", k = K, werte = [K];
    for(var j = 1; j <= n; j++){ var z = k * p / 100; h += "<tr><td>" + j + "</td><td>" + geld(k) + "</td><td>" + geld(z) + "</td><td>" + geld(k + z) + "</td></tr>"; k += z; werte.push(k); }
    $("zzTab").innerHTML = h;
    var nd = Math.ceil(Math.log(2) / Math.log(q) - 1e-9);
    $("zzVerdopp").innerHTML = t("verdopp", { n: nd, r: zahl(72 / p, 1) });
    // Diagramm
    var sv = $("zzGraph"); leer(sv);
    var VW = (sv.clientWidth || 640) < 520 ? 420 : 640; sv.setAttribute("viewBox", "0 0 " + VW + " 260");
    var L = 62, R = VW - 12, T = 14, Bt = 225, max = werte[n] * 1.05, bw = (R - L) / (n + 1);
    var Y = function(v){ return Bt - v / max * (Bt - T); };
    var roh = max / 4, zehn = Math.pow(10, Math.floor(Math.log10(roh))), step = [1, 2, 2.5, 5, 10].map(function(m){ return m * zehn; }).filter(function(x){ return x >= roh; })[0];
    for(var g = 0; g * step <= max; g++){ var v = g * step; sv.appendChild(el("line", { x1: L, y1: Y(v), x2: R, y2: Y(v), stroke: "#dbe7f6" })); sv.appendChild(el("text", { x: L - 6, y: Y(v) + 4, "class": "st-klein", "text-anchor": "end", style: "text-anchor:end" }, zahl(v, 0))); }
    werte.forEach(function(w, i){ sv.appendChild(el("rect", { x: L + i * bw + bw * 0.15, y: Y(w), width: bw * 0.7, height: Bt - Y(w), "class": i ? "balkenZ" : "balkenE" })); });
    var d = ""; for(var i2 = 0; i2 <= n; i2++) d += (i2 ? "L" : "M") + (L + i2 * bw + bw / 2).toFixed(1) + " " + Y(K * (1 + i2 * p / 100)).toFixed(1);
    sv.appendChild(el("path", { d: d, "class": "linieE" }));
    sv.appendChild(el("line", { x1: L, y1: Bt, x2: R, y2: Bt, stroke: "#1a2233", "stroke-width": 1.5 }));
    var schritt = Math.ceil((n + 1) / 12);
    for(var i3 = 0; i3 <= n; i3 += schritt) sv.appendChild(el("text", { x: L + i3 * bw + bw / 2, y: Bt + 18, "class": "st-klein" }, String(i3)));
    sv.appendChild(el("text", { x: R, y: Bt + 34, "class": "st-klein", style: "text-anchor:end" }, t("jahre")));
    $("zzLeg").innerHTML = '<span><i style="border-color:#2563eb;border-top-width:8px"></i>' + t("legMit") + '</span><span><i style="border-color:#f59e0b;border-top-style:dashed"></i>' + t("legOhne") + "</span>";
    $("zzMerke").textContent = t("zzMerke");
  }
  ["zzK", "zzP", "zzN"].forEach(function(id){ $(id).addEventListener("input", zinseszins); });
  [["zzKR", "zzK"], ["zzPR", "zzP"], ["zzNR", "zzN"]].forEach(function(x){ $(x[0]).addEventListener("input", function(){ var v = String(Number($(x[0]).value)); $(x[1]).value = komma() ? v.replace(".", ",") : v; zinseszins(); }); });

  // ---------- Reiter Üben ----------
  var auf = null, punkte = 0, anzahl = 0, beantwortet = false, letzte = null;
  function neueAufgabe(){
    beantwortet = false; letzte = null;
    var typ = wahl(["W", "W", "G", "P", "E", "S", "zJ", "zM", "zT", "zz"]), A = { typ: typ };
    if(typ === "W"){ A.p = wahl([5, 10, 15, 20, 25, 30, 40, 60, 75]); A.G = zuf(4, 30) * 20; A.l = A.G * A.p / 100; A.geld = false; }
    else if(typ === "G"){ A.p = wahl([10, 20, 25, 40, 50, 75]); A.G = zuf(4, 30) * 20; A.W = A.G * A.p / 100; A.l = A.G; }
    else if(typ === "P"){ A.G = wahl([20, 25, 40, 50, 80, 200, 400, 500]); A.p = wahl([5, 10, 15, 20, 25, 30, 35, 40, 45, 60, 65, 80]); A.W = A.G * A.p / 100; if(A.W !== Math.round(A.W)){ A.G = 200; A.W = 2 * A.p; } A.l = A.p; }
    else if(typ === "E" || typ === "S"){ A.G = zuf(8, 120) * 5 * gf(); A.p = wahl([5, 10, 15, 20, 25, 30, 40]); A.l = A.G * (1 + (typ === "E" ? 1 : -1) * A.p / 100); A.geld = true; }
    else if(typ === "zJ" || typ === "zM" || typ === "zT"){ A.K = zuf(4, 60) * 100 * gf(); A.p = wahl([1, 1.5, 2, 2.5, 3, 3.5, 4, 5]); A.n = typ === "zJ" ? 1 : typ === "zM" ? zuf(2, 11) : wahl([30, 45, 60, 72, 90, 120, 180, 240]); A.l = A.K * A.p / 100 * zeitFaktor(A.n, typ === "zM" ? "m" : typ === "zT" ? "d" : "j"); A.geld = true; }
    else { A.K = zuf(5, 50) * 100 * gf(); A.p = wahl([2, 2.5, 3, 4, 5]); A.n = zuf(2, 8); A.l = A.K * Math.pow(1 + A.p / 100, A.n); A.geld = true; }
    if(A.geld) A.l = Math.round(A.l * (gf() === 1 ? 100 : 1)) / (gf() === 1 ? 100 : 1);
    auf = A; zeige();
  }
  function zeige(){
    var A = auf, Z = $("antwortzeile"), g = function(v){ return A.typ === "W" || A.typ === "G" || A.typ === "P" ? zahl(v, 2) : geld(v); };
    var v = { G: bdi(g(A.G)), p: bdi(zahl(A.p, 2)), W: bdi(g(A.W)), K: bdi(geld(A.K || 0)), n: A.n };
    $("auftrag").innerHTML = t("u_" + A.typ, v);
    $("meldung").textContent = ""; $("meldung").className = "meldung"; sicht($("uLauf"), false); Z.innerHTML = "";
    var inp = document.createElement("input"); inp.className = "zahl"; inp.id = "uAntwort"; inp.setAttribute("inputmode", "decimal"); inp.setAttribute("autocomplete", "off"); inp.style.width = "150px";
    inp.addEventListener("keydown", function(e){ if(e.key === "Enter") pruefe(inp.value); });
    var ein = document.createElement("span"); ein.className = "einh"; ein.textContent = A.typ === "P" ? "%" : A.geld ? waehrung() : "";
    var pb = document.createElement("button"); pb.type = "button"; pb.className = "knopf"; pb.id = "pruefen"; pb.textContent = t("pruefen"); pb.addEventListener("click", function(){ pruefe(inp.value); });
    Z.appendChild(inp); Z.appendChild(ein); Z.appendChild(pb);
    if(A.typ === "zz" || A.typ === "zM" || A.typ === "zT"){ var h = document.createElement("span"); h.className = "muted"; h.textContent = t(gf() === 1 ? "rundenC" : "rundenG"); Z.appendChild(h); }
    $("weiter").textContent = t("weiterA"); $("punkte").textContent = t("punkte", { p: punkte, n: anzahl });
  }
  function pruefe(e){
    if(beantwortet) return;
    var v = lies(e); if(!isFinite(v)) return;
    var A = auf, tol = A.geld ? (gf() === 1 ? 0.011 : 1.01) : Math.max(0.011, Math.abs(A.l) * 0.001);
    var ok = Math.abs(v - A.l) <= tol;
    letzte = e; beantwortet = true; anzahl++; if(ok) punkte++;
    var g = function(x){ return A.geld ? geld(x) : zahl(x, 2); }, lt = A.typ === "P" ? zahl(A.l, 2) + " %" : g(A.l), L = [];
    if(A.typ === "W") L.push(bdi("W = G · p : 100 = " + zahl(A.G) + " · " + zahl(A.p) + " : 100 = " + zahl(A.G * A.p) + " : 100 = " + zahl(A.l)));
    else if(A.typ === "G") L.push(bdi("G = W · 100 : p = " + zahl(A.W) + " · 100 : " + zahl(A.p) + " = " + zahl(A.W * 100) + " : " + zahl(A.p) + " = " + zahl(A.l)));
    else if(A.typ === "P") L.push(bdi("p = W : G · 100 = " + zahl(A.W) + " : " + zahl(A.G) + " · 100 = " + zahl(A.W / A.G, 4) + " · 100 = " + zahl(A.l) + " %"));
    else if(A.typ === "E" || A.typ === "S"){ var pp = A.typ === "E" ? 100 + A.p : 100 - A.p; L.push(bdi("q = " + zahl(pp / 100) + " (" + zahl(pp) + " %)")); L.push(bdi(geld(A.G) + " · " + zahl(pp / 100) + " = " + geld(A.l))); }
    else if(A.typ === "zz"){ var q = 1 + A.p / 100; L.push(bdi("K<sub>" + A.n + "</sub> = K<sub>0</sub> · q<sup>n</sup> = " + geld(A.K) + " · " + zahl(q, 4) + hoch(A.n) + " = " + geld(A.K) + " · " + zahl(Math.pow(q, A.n), 6) + " = " + geld(A.l))); }
    else { var e2 = A.typ === "zM" ? "m" : A.typ === "zT" ? "d" : "j"; L.push(t("jahresZ") + " " + bdi(geld(A.K) + " · " + zahl(A.p) + " : 100 = " + geld(A.K * A.p / 100))); if(e2 !== "j") L.push(bdi("Z = " + geld(A.K * A.p / 100) + " · " + bruchZeit(A.n, e2) + " = " + geld(A.l))); }
    var m = $("meldung"); m.className = "meldung " + (ok ? "gut" : "schlecht"); m.innerHTML = ok ? t("richtig") + " " + bdi(lt) : t("falsch", { l: bdi(lt) });
    $("uLauf").innerHTML = L.map(function(s){ return "<li>" + s + "</li>"; }).join(""); sicht($("uLauf"), true);
    $("punkte").textContent = t("punkte", { p: punkte, n: anzahl });
  }
  $("weiter").addEventListener("click", neueAufgabe);

  // ---------- Reiter & Texte ----------
  var tab = "prozent", TABS = ["prozent", "zins", "zz", "ueben"], startGf = null;
  function zeigeTab(k){
    tab = k;
    document.querySelectorAll(".tabs button").forEach(function(b){ b.setAttribute("aria-selected", b.dataset.tab === k ? "true" : "false"); });
    TABS.forEach(function(x){ sicht($("s_" + x), x === k); });
    if(k === "ueben" && !auf) neueAufgabe();
    alles(true);
  }
  document.querySelectorAll(".tabs button").forEach(function(b){ b.addEventListener("click", function(){ zeigeTab(b.dataset.tab); }); });
  function startwerte(){ // Geldbeträge passend zur Währung (Yen/Rubel ohne Cent, ×100)
    var f = gf(); if(startGf === f) return; startGf = f;
    var k = function(v){ var s = String(v); return komma() ? s.replace(".", ",") : s; };
    if(!$("pG").value){ $("pG").value = "240"; $("pP").value = "15"; $("pW").value = "36"; }
    $("zK").value = String(2000 * f); if(!$("zP").value){ $("zP").value = k(2.5); $("zT").value = "7"; $("zEinheit").value = "m"; }
    $("zZ").value = String(35 * f);
    $("zzK").value = String(1000 * f); if(!$("zzP").value){ $("zzP").value = "3"; $("zzN").value = "10"; }
  }
  function alles(nurRechnen){
    if(!nurRechnen){
      document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.title = "miStudia – " + t("titel"); $("titel").textContent = t("titel");
      document.querySelectorAll(".tabs button").forEach(function(b){ b.textContent = t("tab_" + b.dataset.tab); });
      startwerte();
      $("tGesucht").textContent = t("gesucht"); $("tGesucht2").textContent = t("gesucht");
      wahlKnoepfe($("pModus"), PMODI.map(function(x){ return [x, "pm_" + x]; }), pModus, setzePModus);
      wahlKnoepfe($("zModus"), ZMODI.map(function(x){ return [x, "zm_" + x]; }), zModus, setzeZModus);
      $("tK").textContent = t("kL"); $("tZp").textContent = t("zpL"); $("tZ").textContent = t("zL"); $("tZeit").textContent = t("zeitL");
      var o = $("zEinheit").options; o[0].textContent = t("einJ"); o[1].textContent = t("einM"); o[2].textContent = t("einD");
      $("tK0").textContent = t("k0L"); $("tZzp").textContent = t("zpL"); $("tN").textContent = t("nL");
    }
    if(tab === "prozent") prozent(); else if(tab === "zins") zins(); else if(tab === "zz") zinseszins();
    if(!nurRechnen && auf){ var war = beantwortet, e = letzte, gut = $("meldung").classList.contains("gut"); zeige(); if(war){ beantwortet = false; anzahl--; if(gut) punkte--; $("uAntwort").value = e; pruefe(e); } }
  }
  window.MS_LANG = { apply: function(l){ if(ZR[l]){ var alt = gf(); lang = l; if(gf() !== alt && auf && !beantwortet){ auf = null; } alles(); if(tab === "ueben" && !auf) neueAufgabe(); } } };
  alles();
})();
