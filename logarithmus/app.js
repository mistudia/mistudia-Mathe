// ============================================================
// logarithmus/app.js – Logarithmusfunktionen
// Was ist ein Logarithmus: log_b(x) = „b hoch wie viel ergibt x?“ mit
//   Potenzleiter, lg/ln/log₂, Rechengesetze mit den eingegebenen Zahlen.
// Funktion: f(x) = a · log_b(x − c) + d mit Reglern, senkrechte Asymptote,
//   Umkehrfunktion b^x und Spiegelachse y = x, Treppe „+1 bei · b“.
// Gleichungen: a · b^x = c → x = log_b(c : a) = ln(c : a) : ln(b), Probe.
// Üben: Logarithmen im Kopf, Gesetze, Gleichungen, Definitionsbereich, Zeit.
// Texte: logarithmus/texte.js (LG), Sprache aus dem Startmenü (MS_LANG).
// ============================================================
(function(){
  "use strict";
  var NS = "http://www.w3.org/2000/svg", lang = "de";
  function $(id){ return document.getElementById(id); }
  function t(k, v){ var s = (LG[lang] && LG[lang][k] != null) ? LG[lang][k] : LG.de[k] != null ? LG.de[k] : k; if(v) for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  function el(n, a, txt){ var e = document.createElementNS(NS, n); for(var k in a) if(a[k] != null) e.setAttribute(k, a[k]); if(txt != null) e.textContent = txt; return e; }
  function leer(s){ while(s.lastChild) s.removeChild(s.lastChild); }
  function sicht(e, an){ if(an) e.removeAttribute("hidden"); else e.setAttribute("hidden", ""); }
  function bdi(s){ return '<bdi dir="ltr">' + s + "</bdi>"; }
  function zuf(a, b){ return a + Math.floor(Math.random() * (b - a + 1)); }
  function wahl(L){ return L[Math.floor(Math.random() * L.length)]; }
  function komma(){ return !(lang === "en" || lang === "zh" || lang === "ja" || lang === "ar"); }
  function zahl(v, d){ if(d == null) d = 2; var r = Math.round(v * Math.pow(10, d)) / Math.pow(10, d); if(Object.is(r, -0)) r = 0; var s = String(Math.abs(r)); if(s.indexOf("e") >= 0) s = Math.abs(r).toFixed(d); if(komma()) s = s.replace(".", ","); return (r < 0 ? "−" : "") + s; }
  function genau(v, d){ d = d == null ? 2 : d; return Math.abs(v * Math.pow(10, d) - Math.round(v * Math.pow(10, d))) < 1e-7; }
  function zg(v, d){ return (genau(v, d) ? "" : "≈ ") + zahl(v, d); }
  function gl(v, d){ return genau(v, d) ? "=" : "≈"; }
  function lies(s){ s = String(s).trim().replace(/\s/g, "").replace(",", ".").replace(/^e$/i, String(Math.E)); var m = s.match(/^(-?\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/); if(m) return Number(m[1]) / Number(m[2]); return s === "" ? NaN : Number(s); }
  function logb(b, x){ return Math.log(x) / Math.log(b); }
  var TIEF = "₀₁₂₃₄₅₆₇₈₉";
  function tief(s){ return String(s).split("").map(function(c){ return /\d/.test(c) ? TIEF[+c] : c === "," || c === "." ? "," : c; }).join(""); }
  function logName(b){ if(Math.abs(b - 10) < 1e-12) return "lg"; if(Math.abs(b - Math.E) < 1e-12) return "ln"; return "log<sub>" + zahl(b, 3) + "</sub>"; }
  function bTxt(b){ return Math.abs(b - Math.E) < 1e-12 ? "e" : zahl(b, 3); }

  function plot(sv, o){
    var o0 = o; if(o.abl && window.MS_ABL) o = MS_ABL.sicht(sv, o); // Verschieben/Zoomen (graph-ablesen.js)
    leer(sv); var W = o.W || 420, H = o.H || 420, L = 34, R = W - 10, T = 10, B = H - 26;
    sv.setAttribute("viewBox", "0 0 " + W + " " + H);
    var X = function(x){ return L + (x - o.x0) / (o.x1 - o.x0) * (R - L); }, Y = function(y){ return B - (y - o.y0) / (o.y1 - o.y0) * (B - T); };
    function schritt(sp){ var r = sp / 8, z = Math.pow(10, Math.floor(Math.log10(r))); return [1, 2, 5, 10].map(function(m){ return m * z; }).filter(function(x){ return x >= r; })[0]; }
    var sx = o.sx || schritt(o.x1 - o.x0), sy = o.sy || schritt(o.y1 - o.y0);
    for(var x = Math.ceil(o.x0 / sx) * sx; x <= o.x1 + 1e-9; x += sx){ sv.appendChild(el("line", { x1: X(x), y1: T, x2: X(x), y2: B, "class": "gitter" })); if(Math.abs(x) > 1e-9) sv.appendChild(el("text", { x: X(x), y: Math.min(B, Math.max(T + 12, Y(0) + 15)), "class": "ko-zahl" }, zahl(x, 3))); }
    for(var y = Math.ceil(o.y0 / sy) * sy; y <= o.y1 + 1e-9; y += sy){ sv.appendChild(el("line", { x1: L, y1: Y(y), x2: R, y2: Y(y), "class": "gitter" })); if(Math.abs(y) > 1e-9) sv.appendChild(el("text", { x: Math.max(L - 6, Math.min(R - 20, X(0) - 6)), y: Y(y) + 4, "class": "ko-zahl", style: "text-anchor:end" }, zahl(y, 3))); }
    if(o.y0 <= 0 && o.y1 >= 0) sv.appendChild(el("line", { x1: L, y1: Y(0), x2: R, y2: Y(0), "class": "achse" }));
    if(o.x0 <= 0 && o.x1 >= 0) sv.appendChild(el("line", { x1: X(0), y1: T, x2: X(0), y2: B, "class": "achse" }));
    if(o.asymV != null && o.asymV > o.x0 && o.asymV < o.x1) sv.appendChild(el("line", { x1: X(o.asymV), y1: T, x2: X(o.asymV), y2: B, "class": "asymV" }));
    if(o.asym != null && o.asym > o.y0 && o.asym < o.y1) sv.appendChild(el("line", { x1: L, y1: Y(o.asym), x2: R, y2: Y(o.asym), "class": "asym" }));
    (o.kurven || []).forEach(function(k){
      var d = "", an = false;
      for(var i = 0; i <= 400; i++){ var xx = o.x0 + (o.x1 - o.x0) * i / 400, yy = k.f(xx);
        if(!isFinite(yy) || yy > o.y1 + (o.y1 - o.y0) || yy < o.y0 - (o.y1 - o.y0)){ an = false; continue; }
        d += (an ? "L" : "M") + X(xx).toFixed(1) + " " + Y(yy).toFixed(1); an = true; }
      var clip = "c" + Math.random().toString(36).slice(2);
      var cp = el("clipPath", { id: clip }); cp.appendChild(el("rect", { x: L, y: T, width: R - L, height: B - T })); sv.appendChild(cp);
      k._el = el("path", { d: d, "class": k.cls || "graph", "clip-path": "url(#" + clip + ")" }); sv.appendChild(k._el);
    });
    (o.treppe || []).forEach(function(s){
      if(s.y1 < o.y0 || s.y1 > o.y1 || s.y2 < o.y0 || s.y2 > o.y1) return;
      sv.appendChild(el("path", { d: "M" + X(s.x1) + " " + Y(s.y1) + " H" + X(s.x2) + " V" + Y(s.y2), "class": "treppe" }));
      sv.appendChild(el("text", { x: X(s.x2) + 5, y: (Y(s.y1) + Y(s.y2)) / 2 + 5, "class": "treppeT" }, s.txt));
    });
    (o.punkte || []).forEach(function(p){ if(p[1] >= o.y0 && p[1] <= o.y1 && p[0] >= o.x0 && p[0] <= o.x1){ sv.appendChild(el("circle", { cx: X(p[0]), cy: Y(p[1]), r: 6, "class": "punkt" })); if(p[2]) sv.appendChild(el("text", { x: X(p[0]) + 8, y: Y(p[1]) - 8, "class": "treppeT", style: "fill:#1d4ed8" }, p[2])); } });
    // Werte ablesen + Wertetabelle (/graph-ablesen.js), nur bei Erkunden-Graphen (o.abl)
    if(window.MS_ABL){ if(o.abl) MS_ABL.an(sv, { x0: o.x0, x1: o.x1, y0: o.y0, y1: o.y1, L: L, R: R, T: T, B: B, xName: o.abl.x || "x", neu: function(){ plot(sv, o0); },
      kurven: (o.kurven || []).map(function(k, i){ return o.abl.namen[i] ? { f: k.f, el: k._el, name: o.abl.namen[i] } : null; }) }); else MS_ABL.aus(sv); }
  }


  // ---------- Reiter Was ist ein Logarithmus? ----------
  function was(){
    var b = lies($("lb").value), x = lies($("lx").value), ok = b > 0 && b !== 1 && x > 0;
    $("lFehler").textContent = ok ? "" : t("fehlerLog");
    if(!ok){ ["lFrage", "lErgebnis", "leiter", "gesetze"].forEach(function(id){ $(id).innerHTML = ""; }); return; }
    var y = logb(b, x), L = logName(b), roh = $("lx").value.trim(), xd = /\/|^e$/i.test(roh) ? roh.replace(/^E$/, "e") : zahl(x, 4);
    $("lFrage").innerHTML = bdi(L + "(" + xd + ") = ?") + '<br><span style="font-size:18px;font-weight:600;color:var(--text)">' + t("frage", { b: bdi(bTxt(b)), x: bdi(xd) }) + "</span>";
    $("lErgebnis").innerHTML = bdi(L + "(" + xd + ") " + gl(y, 4) + " " + zahl(y, 4)) + "<br>" + bdi(bTxt(b) + "<sup>" + zahl(y, 4) + "</sup> " + (genau(y, 4) ? "=" : "≈") + " " + xd);
    var h = "", k0 = Math.floor(y) - 2;
    for(var k = k0; k <= k0 + 6; k++){ var w = Math.pow(b, k), an = Math.abs(k - y) < 1e-9; h += "<span" + (an ? ' class="an"' : "") + ">" + bTxt(b) + "<sup>" + zahl(k, 0) + "</sup> = " + zg(w, 4) + "</span>"; if(!an && y > k && y < k + 1) h += '<span class="an">' + bTxt(b) + "<sup>" + zahl(y, 3) + "</sup> = " + zahl(x, 4) + "</span>"; }
    $("leiter").innerHTML = h;
    $("lMerke").innerHTML = t("lMerke");
    // Rechengesetze mit u = x, v = 2 (bzw. 3), r = 3
    var u = x, v = 2, r = 3, G = [];
    function z4(q){ return zahl(q, 4); }
    G.push(["g1", L + "(u · v) = " + L + "(u) + " + L + "(v)", L + "(" + z4(u) + " · " + v + ") = " + z4(logb(b, u)) + " + " + z4(logb(b, v)) + " = " + z4(logb(b, u * v))]);
    G.push(["g2", L + "(u : v) = " + L + "(u) − " + L + "(v)", L + "(" + z4(u) + " : " + v + ") = " + z4(logb(b, u)) + " − " + z4(logb(b, v)) + " = " + z4(logb(b, u / v))]);
    G.push(["g3", L + "(u<sup>r</sup>) = r · " + L + "(u)", L + "(" + z4(u) + "<sup>" + r + "</sup>) = " + r + " · " + z4(logb(b, u)) + " = " + z4(r * logb(b, u))]);
    G.push(["g4", L + "(x) = ln(x) : ln(b)", "ln(" + z4(x) + ") : ln(" + bTxt(b) + ") = " + z4(Math.log(x)) + " : " + z4(Math.log(b)) + " = " + z4(y)]);
    G.push(["g5", L + "(1) = 0, " + L + "(b) = 1", L + "(1) = 0, " + L + "(" + bTxt(b) + ") = 1"]);
    $("gesetze").innerHTML = G.map(function(g){ return "<div><h3>" + t(g[0]) + "</h3>" + g[1] + "<br>" + g[2] + "</div>"; }).join("");
    $("hGesetze").textContent = t("hGesetze");
  }
  ["lb", "lx"].forEach(function(id){ $(id).addEventListener("input", was); });

  // ---------- Reiter Funktion ----------
  var P = { a: 1, b: 2, c: 0, d: 0 };
  var REGLER = [["a", -3, 3, 0.1], ["b", 0.2, 5, 0.1], ["c", -3, 3, 0.5], ["d", -3, 3, 0.5]];
  function reglerBauen(){
    var box = $("regler"); box.innerHTML = "";
    REGLER.forEach(function(r){
      var l = document.createElement("label"); l.innerHTML = "<span>" + r[0] + " =</span>";
      var inp = document.createElement("input"); inp.type = "range"; inp.min = r[1]; inp.max = r[2]; inp.step = r[3]; inp.value = P[r[0]]; inp.id = "r_" + r[0];
      var w = document.createElement("b"); w.id = "w_" + r[0];
      inp.addEventListener("input", function(){ P[r[0]] = Number(inp.value); if(r[0] === "a" && Math.abs(P.a) < 0.05) P.a = 0.1; if(r[0] === "b" && Math.abs(P.b - 1) < 0.05) P.b = 1.1; funktion(); });
      l.appendChild(inp); l.appendChild(w); box.appendChild(l);
    });
  }
  function funktion(){
    REGLER.forEach(function(r){ $("w_" + r[0]).textContent = zahl(P[r[0]]); });
    var a = P.a, b = P.b, c = P.c, d = P.d, f = function(x){ return x > c ? a * logb(b, x - c) + d : NaN; };
    var s = "f(x) = " + (a === 1 ? "" : a === -1 ? "−" : zahl(a) + " · ") + "log<sub>" + zahl(b) + "</sub>(" + (c === 0 ? "x" : "x " + (c > 0 ? "− " + zahl(c) : "+ " + zahl(-c))) + ")" + (d ? (d > 0 ? " + " : " − ") + zahl(Math.abs(d)) : "");
    $("formel").innerHTML = s;
    var kurven = [{ f: f }], umk = function(y){ return Math.pow(b, (y - d) / a) + c; };
    if($("zeigeExp").checked){ kurven.push({ f: umk, cls: "graph2" }); kurven.push({ f: function(x){ return x; }, cls: "graph3" }); }
    var tr = [];
    if($("zeigeTreppe").checked && b > 1) [1, b, b * b].forEach(function(x, i, A){ if(i < 2) tr.push({ x1: c + A[i], y1: f(c + A[i]), x2: c + A[i + 1], y2: f(c + A[i + 1]), txt: (a > 0 ? "+" : "−") + zahl(Math.abs(a)) }); });
    plot($("gSvg"), { x0: -4, x1: 8, y0: -5, y1: 7, sx: 1, sy: 1, kurven: kurven, abl: { namen: ["f(x)", "f⁻¹(x)", null] }, asymV: c, treppe: tr, punkte: [[c + 1, d, "(" + zahl(c + 1) + " | " + zahl(d) + ")"]] });
    var E = [];
    var steigt = (a > 0) === (b > 1);
    E.push("<b>" + t("dbL") + "</b> " + bdi("x > " + zahl(c)));
    E.push("<b>" + t("asymL") + "</b> " + bdi("x = " + zahl(c)));
    E.push("<b>" + t("monoL") + "</b> " + t(steigt ? "m_steigt" : "m_faellt"));
    var x0 = c + Math.pow(b, -d / a); E.push("<b>" + t("nsL") + "</b> " + bdi("x " + gl(x0) + " " + zahl(x0)));
    E.push("<b>" + t("fpL") + "</b> " + bdi("(" + zahl(c + 1) + " | " + zahl(d) + ")") + " " + t("fpInfo"));
    E.push("<b>" + t("wbL") + "</b> " + t("alleZahlen"));
    $("eigen").innerHTML = E.join("<br>");
    $("gLeg").innerHTML = '<span><i style="border-color:#2563eb"></i>f</span>' + ($("zeigeExp").checked ? '<span><i style="border-color:#f59e0b;border-top-style:dashed"></i>' + t("umkehr") + '</span><span><i style="border-color:#94a3b8;border-top-style:dotted"></i>y = x</span>' : "");
    $("fMerke").textContent = t("fMerke");
  }
  ["zeigeExp", "zeigeTreppe"].forEach(function(id){ $(id).addEventListener("change", funktion); });

  // ---------- Reiter Gleichungen ----------
  function gleichung(){
    var a = lies($("ga").value), b = lies($("gb").value), c = lies($("gc").value), ok = a !== 0 && b > 0 && b !== 1 && c / a > 0;
    $("gFehler").textContent = ok ? "" : t("fehlerGl");
    if(!ok){ ["gWeg", "gErgebnis", "gProbe"].forEach(function(id){ $(id).innerHTML = ""; }); return; }
    var q = c / a, x = Math.log(q) / Math.log(b), L = [];
    if(a !== 1) L.push(t("s_teilen", { a: bdi(zahl(a, 4)) }) + " " + bdi(zahl(b, 4) + "<sup>x</sup> = " + zahl(c, 4) + " : " + zahl(a, 4) + " = " + zahl(q, 4)));
    L.push(t("s_log") + " " + bdi("x = log<sub>" + zahl(b, 4) + "</sub>(" + zahl(q, 4) + ")"));
    L.push(t("s_ln") + " " + bdi("x = ln(" + zahl(q, 4) + ") : ln(" + zahl(b, 4) + ") = " + zahl(Math.log(q), 4) + " : " + zahl(Math.log(b), 4)));
    $("gWeg").innerHTML = L.map(function(s){ return "<li>" + s + "</li>"; }).join("");
    $("gErgebnis").innerHTML = bdi("x " + gl(x, 4) + " " + zahl(x, 4));
    $("gProbe").innerHTML = t("probe") + " " + bdi(zahl(a, 4) + " · " + zahl(b, 4) + "<sup>" + zahl(x, 4) + "</sup> ≈ " + zahl(a * Math.pow(b, x), 3));
    $("gText").textContent = t("gText"); $("gMerke").textContent = t("gMerke");
  }
  ["ga", "gb", "gc"].forEach(function(id){ $(id).addEventListener("input", gleichung); });

  // ---------- Reiter Üben ----------
  var auf = null, punkte = 0, anzahl = 0, beantwortet = false, letzte = null;
  function neueAufgabe(){
    beantwortet = false; letzte = null;
    var typ = wahl(["kopf", "kopf", "kopfNeg", "gesetz", "gleich", "gleich", "db", "zeit"]), A = { typ: typ };
    if(typ === "kopf"){ var B = wahl([2, 3, 5, 10]), k = B === 2 ? zuf(1, 8) : B === 10 ? zuf(1, 6) : zuf(1, 4); A.b = B; A.x = Math.pow(B, k); A.l = k; }
    else if(typ === "kopfNeg"){ var B2 = wahl([2, 3, 10]), k2 = -zuf(1, 3); A.b = B2; A.xs = "1/" + Math.pow(B2, -k2); A.l = k2; if(Math.random() < 0.3){ A.xs = "1"; A.l = 0; } }
    else if(typ === "gesetz"){ var G = wahl([["lg", 2, 5, "+"], ["lg", 20, 5, "+"], ["lg", 200, 2, "−"], ["log₂", 12, 3, "−"], ["log₂", 4, 8, "+"], ["log₃", 18, 2, "−"]]); A.G = G; var bb = G[0] === "lg" ? 10 : G[0] === "log₂" ? 2 : 3; A.l = Math.round(logb(bb, G[3] === "+" ? G[1] * G[2] : G[1] / G[2])); }
    else if(typ === "gleich"){ A.a = wahl([1, 2, 3, 5, 100]); A.b = wahl([2, 3, 1.5, 1.1, 0.5]); A.c = A.a * wahl([4, 8, 10, 20, 0.25]); A.l = Math.log(A.c / A.a) / Math.log(A.b); }
    else if(typ === "db"){ A.c = zuf(-4, 4); A.l = A.c; }
    else { A.p = wahl([2, 3, 4, 5, 8]); A.l = Math.log(2) / Math.log(1 + A.p / 100); }
    auf = A; zeige();
  }
  function zeige(){
    var A = auf, Z = $("antwortzeile");
    if(A.typ === "kopf") $("auftrag").innerHTML = t("u_kopf", { l: bdi(logName(A.b) + "(" + A.x + ")") });
    else if(A.typ === "kopfNeg") $("auftrag").innerHTML = t("u_kopf", { l: bdi(logName(A.b) + "(" + A.xs + ")") });
    else if(A.typ === "gesetz") $("auftrag").innerHTML = t("u_gesetz", { l: bdi(A.G[0] + "(" + A.G[1] + ") " + A.G[3] + " " + A.G[0] + "(" + A.G[2] + ")") });
    else if(A.typ === "gleich") $("auftrag").innerHTML = t("u_gleich", { g: bdi((A.a === 1 ? "" : zahl(A.a) + " · ") + zahl(A.b) + "<sup>x</sup> = " + zahl(A.c)) });
    else if(A.typ === "db") $("auftrag").innerHTML = t("u_db", { f: bdi("f(x) = log<sub>2</sub>(x" + (A.c > 0 ? " − " + A.c : A.c < 0 ? " + " + (-A.c) : "") + ")") });
    else $("auftrag").innerHTML = t("u_zeit", { p: bdi(zahl(A.p) + " %") });
    $("meldung").textContent = ""; $("meldung").className = "meldung"; sicht($("uLauf"), false); Z.innerHTML = "";
    var inp = document.createElement("input"); inp.className = "zahl"; inp.id = "uAntwort"; inp.setAttribute("inputmode", "decimal"); inp.setAttribute("autocomplete", "off"); inp.style.width = "130px";
    inp.addEventListener("keydown", function(e){ if(e.key === "Enter") pruefe(inp.value); });
    var pb = document.createElement("button"); pb.type = "button"; pb.className = "knopf"; pb.id = "pruefen"; pb.textContent = t("pruefen"); pb.addEventListener("click", function(){ pruefe(inp.value); });
    if(A.typ === "db"){ var s = document.createElement("span"); s.textContent = "x > "; s.style.fontWeight = "700"; s.style.direction = "ltr"; Z.appendChild(s); }
    Z.appendChild(inp); Z.appendChild(pb);
    if(A.typ === "gleich" || A.typ === "zeit"){ var h = document.createElement("span"); h.className = "muted"; h.textContent = t("runden"); Z.appendChild(h); }
    $("weiter").textContent = t("weiterA"); $("punkte").textContent = t("punkte", { p: punkte, n: anzahl });
  }
  function pruefe(e){
    if(beantwortet) return;
    var v = lies(e); if(!isFinite(v)) return;
    var A = auf, ok = Math.abs(v - A.l) <= Math.max(0.011, Math.abs(A.l) * 0.002), lt = zg(A.l, 2), L = [];
    if(A.typ === "kopf") L.push(bdi(A.b + "<sup>" + A.l + "</sup> = " + A.x) + " → " + bdi(logName(A.b) + "(" + A.x + ") = " + A.l));
    else if(A.typ === "kopfNeg") L.push(bdi(A.b + "<sup>" + A.l + "</sup> = " + A.xs) + " → " + bdi(logName(A.b) + "(" + A.xs + ") = " + A.l));
    else if(A.typ === "gesetz"){ var w = A.G[3] === "+" ? A.G[1] * A.G[2] : A.G[1] / A.G[2]; L.push(bdi(A.G[0] + "(" + A.G[1] + " " + (A.G[3] === "+" ? "·" : ":") + " " + A.G[2] + ") = " + A.G[0] + "(" + w + ") = " + A.l)); }
    else if(A.typ === "gleich"){ var q = A.c / A.a; if(A.a !== 1) L.push(bdi(zahl(A.b) + "<sup>x</sup> = " + zahl(q))); L.push(bdi("x = ln(" + zahl(q) + ") : ln(" + zahl(A.b) + ") " + gl(A.l, 2) + " " + zahl(A.l, 4))); }
    else if(A.typ === "db") L.push(t("dbWeg", { c: bdi(zahl(A.c)) }));
    else L.push(bdi(zahl(1 + A.p / 100, 2) + "<sup>n</sup> = 2 → n = ln(2) : ln(" + zahl(1 + A.p / 100, 2) + ") ≈ " + zahl(A.l)));
    letzte = e; beantwortet = true; anzahl++; if(ok) punkte++;
    var m = $("meldung"); m.className = "meldung " + (ok ? "gut" : "schlecht"); m.innerHTML = ok ? t("richtig") + " " + bdi(lt) : t("falsch", { l: bdi(lt) });
    $("uLauf").innerHTML = L.map(function(s){ return "<li>" + s + "</li>"; }).join(""); sicht($("uLauf"), true);
    $("punkte").textContent = t("punkte", { p: punkte, n: anzahl });
  }
  $("weiter").addEventListener("click", neueAufgabe);

  // ---------- Reiter & Texte ----------
  var tab = "was", TABS = ["was", "funktion", "gleichung", "ueben"];
  function zeigeTab(k){
    tab = k;
    document.querySelectorAll(".tabs button").forEach(function(b){ b.setAttribute("aria-selected", b.dataset.tab === k ? "true" : "false"); });
    TABS.forEach(function(x){ sicht($("s_" + x), x === k); });
    if(k === "ueben" && !auf) neueAufgabe();
    alles(true);
  }
  document.querySelectorAll(".tabs button").forEach(function(b){ b.addEventListener("click", function(){ zeigeTab(b.dataset.tab); }); });
  function beispiele(box, L, f){ box.innerHTML = ""; L.forEach(function(x){ var b = document.createElement("button"); b.type = "button"; b.innerHTML = x[0]; b.addEventListener("click", function(){ x[1](); f(); }); box.appendChild(b); }); }
  function setz(id, v){ $(id).value = komma() ? String(v).replace(".", ",") : String(v); }
  function alles(nurRechnen){
    if(!nurRechnen){
      document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.title = "miStudia – " + t("titel"); $("titel").textContent = t("titel");
      document.querySelectorAll(".tabs button").forEach(function(b){ b.textContent = t("tab_" + b.dataset.tab); });
      $("tBasis").textContent = t("basisL"); $("tZahl").textContent = t("zahlL"); $("tExp").textContent = t("zeigeExp"); $("tTreppe").textContent = t("zeigeTreppe");
      beispiele($("lbsp"), [["log<sub>2</sub>(8)", function(){ setz("lb", 2); setz("lx", 8); }], ["lg(1000)", function(){ setz("lb", 10); setz("lx", 1000); }], ["lg(0,01)".replace(",", komma() ? "," : "."), function(){ setz("lb", 10); setz("lx", 0.01); }], ["log<sub>3</sub>(1/9)", function(){ $("lb").value = "3"; $("lx").value = "1/9"; }], ["ln(e)", function(){ $("lb").value = "e"; $("lx").value = "e"; }], ["log<sub>2</sub>(10)", function(){ setz("lb", 2); setz("lx", 10); }]], was);
      beispiele($("gbsp"), [[t("bspVerdopp"), function(){ setz("ga", 500); setz("gb", 1.05); setz("gc", 1000); }], [t("bspHalb"), function(){ setz("ga", 80); setz("gb", 0.9); setz("gc", 40); }], ["2<sup>x</sup> = 50", function(){ setz("ga", 1); setz("gb", 2); setz("gc", 50); }], ["3 · 4<sup>x</sup> = 96", function(){ setz("ga", 3); setz("gb", 4); setz("gc", 96); }]], gleichung);
      reglerBauen();
    }
    if(tab === "was") was(); else if(tab === "funktion") funktion(); else if(tab === "gleichung") gleichung();
    if(!nurRechnen && auf){ var war = beantwortet, e = letzte, gut = $("meldung").classList.contains("gut"); zeige(); if(war){ beantwortet = false; anzahl--; if(gut) punkte--; $("uAntwort").value = e; pruefe(e); } }
  }
  // Alltagsbeispiel laden (aus alltag-daten.js): {b, x} → Reiter „Was ist …“, {a, b, c} → Gleichung
  window.MS_LOG = { laden: function(w){
    if(w.c != null){ setz("ga", w.a); setz("gb", w.b); setz("gc", w.c); zeigeTab("gleichung"); $("ga").scrollIntoView({ behavior: "smooth", block: "center" }); }
    else { setz("lb", w.b); setz("lx", w.x); zeigeTab("was"); $("lb").scrollIntoView({ behavior: "smooth", block: "center" }); }
  } };
  window.MS_LANG = { apply: function(l){ if(LG[l]){ lang = l; alles(); } } };
  alles();
})();
