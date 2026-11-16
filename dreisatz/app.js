// ============================================================
// dreisatz/app.js – Dreisatz & Zuordnungen
// Dreisatz: Beispiele aus dem Alltag (4 proportional, 4 antiproportional)
// oder eigene Werte; drei Schritte mit farbigen Rechenzeichen
// (: orange, · grün). Zuordnungen: y = k·x bzw. y = k : x mit Tabelle,
// Graph, Quotienten-/Produktgleichheit; eigene Tabelle prüfen.
// Üben: Textaufgaben, Zuordnung erkennen, Lücke in der Tabelle.
// Texte: dreisatz/texte.js (DS), Sprache aus dem Startmenü (MS_LANG).
// ============================================================
(function(){
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  var lang = "de";
  function $(id){ return document.getElementById(id); }
  function t(k, v){ var s = (DS[lang] && DS[lang][k]) || DS.de[k] || k; if(v) for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  function el(n, a, txt){ var e = document.createElementNS(NS, n); for(var k in a) e.setAttribute(k, a[k]); if(txt != null) e.textContent = txt; return e; }
  function komma(){ return !(lang === "en" || lang === "zh" || lang === "ja" || lang === "ar"); }
  function z(v, d){ // höchstens d Nachkommastellen, ohne überflüssige Nullen
    d = d == null ? 2 : d;
    var r = Math.round(v * Math.pow(10, d)) / Math.pow(10, d), s = String(r);
    if(s.indexOf("e") >= 0) s = r.toFixed(d);
    return komma() ? s.replace(".", ",") : s;
  }
  function genau(v){ return Math.abs(v * 100 - Math.round(v * 100)) < 1e-6; }
  function lies(s){ s = String(s).trim().replace(/[−–]/g, "-").replace(/\s/g, "").replace(",", "."); return s === "" ? NaN : Number(s); }
  function zuf(a, b){ return a + Math.floor(Math.random() * (b - a + 1)); }
  function wahl(L){ return L[Math.floor(Math.random() * L.length)]; }
  function bdi(s){ return '<bdi dir="ltr">' + s + "</bdi>"; }
  // Geld: in Japan/Russland ohne Nachkommastellen (Beträge ×100)
  function gf(){ return lang === "ja" || lang === "ru" ? 100 : 1; }
  function geld(v){
    var d = gf() === 1 ? 2 : 0, s = (Math.round(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d);
    if(komma()) s = s.replace(".", ",");
    return t("geldFmt", { v: s });
  }

  // ---------- Beispiele ----------
  // Erzeugt Werte {a, b, c, r, art, tpl} – b ist der zu a gehörende Wert, r die Lösung zu c.
  var VORLAGEN = ["tP1", "tP2", "tP3", "tP4", "tA1", "tA2", "tA3", "tA4"];
  function erzeuge(tpl){
    var a, b, c, u, k, art = tpl.charAt(1) === "P" ? "p" : "a";
    if(tpl === "tP1"){ a = zuf(2, 6); u = wahl([0.8, 1.2, 1.5, 0.75, 1.25, 2.4, 0.9]) * gf(); c = zuf(2, 12); }
    if(tpl === "tP2"){ a = wahl([50, 100, 200]); u = wahl([0.05, 0.06, 0.07, 0.08]); c = wahl([150, 250, 300, 350, 400, 500]); }
    if(tpl === "tP3"){ a = wahl([2, 4, 6]); u = wahl([50, 75, 100, 125]); c = zuf(1, 10); }
    if(tpl === "tP4"){ a = zuf(2, 5); u = wahl([12, 15, 18, 20, 24]); c = zuf(3, 15); }
    if(art === "p"){ if(c === a) c = a + 1; b = a * u; return { art: art, tpl: tpl, a: a, b: b, c: c, r: c * u, eins: u }; }
    var R = { tA1: [2, 6, 2, 8], tA2: [3, 12, 2, 12], tA3: [2, 6, 2, 8], tA4: [2, 8, 2, 8] }[tpl];
    a = zuf(R[0], R[1]); c = zuf(R[2], R[3]); if(c === a) c = a + 1;
    var m = tpl === "tA4" ? zuf(2, 4) : zuf(1, 3);
    k = a * c * m; // durch a und c teilbar
    if(tpl === "tA2") k *= 2;
    b = k / a;
    return { art: art, tpl: tpl, a: a, b: b, c: c, r: k / c, eins: k };
  }
  function vor(tpl){
    var a = t(tpl).split("|");
    if(tpl === "tE"){ // eigene Aufgabe: selbst benannte Größen
      var n1 = ($("eN1") && $("eN1").value || "").trim(), n2 = ($("eN2") && $("eN2").value || "").trim();
      if(n1) a[1] = esc(n1); if(n2) a[3] = esc(n2);
    }
    return a;
  }
  function esc(s){ return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); } // [Text, Kopf x, Einheit x, Kopf y, Einheit y]
  function xZelle(V, v){ var e = vor(V.tpl)[2]; return z(v) + (e ? " " + e : ""); }
  function yZelle(V, v){ var e = vor(V.tpl)[4]; return e === "geld" ? geld(v) : z(v) + (e ? " " + e : ""); }
  function problemText(V){ return vor(V.tpl)[0].split("{a}").join(bdi(xZelle(V, V.a))).split("{b}").join(bdi(yZelle(V, V.b))).split("{c}").join(bdi(xZelle(V, V.c))); }

  // Dreisatz-Raster: Gegeben → auf 1 → auf c
  function dreisatzHTML(V, ziel){
    var vo = vor(V.tpl), p = V.art === "p", h = "";
    var op = function(z1, cls){ return '<span class="' + cls + '">' + z1 + "</span>"; };
    var g = function(s){ return op(": " + z(V.a), "geteilt"); }, m = function(){ return op("· " + z(V.a), "mal"); };
    var g2 = function(){ return op(": " + z(V.c), "geteilt"); }, m2 = function(){ return op("· " + z(V.c), "mal"); };
    var einsWert = p ? V.b / V.a : V.b * V.a;
    var rund = function(v){ return genau(v) ? "" : " ≈"; };
    h += '<div class="schritt"></div><div class="kopf">' + vo[1] + '</div><div></div><div class="kopf">' + vo[3] + "</div><div></div>";
    h += '<div class="schritt">1.</div><div class="wert">' + bdi(xZelle(V, V.a)) + '</div><div class="pf">→</div><div class="wert">' + bdi(yZelle(V, V.b)) + '</div><div class="schritt">' + t("s1") + "</div>";
    h += '<div></div><div class="op">↓ ' + g() + '</div><div></div><div class="op">↓ ' + (p ? g() : m()) + "</div><div></div>";
    h += '<div class="schritt">2.</div><div class="wert">' + bdi(xZelle(V, 1)) + '</div><div class="pf">→</div><div class="wert">' + bdi(rund(einsWert) + yZelle(V, einsWert)) + '</div><div class="schritt">' + t("s2") + "</div>";
    h += '<div></div><div class="op">↓ ' + m2() + '</div><div></div><div class="op">↓ ' + (p ? m2() : g2()) + "</div><div></div>";
    h += '<div class="schritt">3.</div><div class="wert">' + bdi(xZelle(V, V.c)) + '</div><div class="pf">→</div><div class="wert ziel">' + bdi(rund(V.r) + yZelle(V, V.r)) + '</div><div class="schritt">' + t("s3") + "</div>";
    return h;
  }

  // ---------- Reiter Dreisatz ----------
  var D = erzeuge("tP1"), eigeneArt = "p";
  function eigeneWerte(){
    var a = lies($("eA").value), b = lies($("eB").value), c = lies($("eC").value);
    if(!(a > 0) || !(b > 0) || !(c > 0)) return null;
    var p = eigeneArt === "p";
    return { art: eigeneArt, tpl: "tE", a: a, b: b, c: c, r: p ? b / a * c : a * b / c };
  }
  function dreisatz(){
    var sel = $("bsp").value, V = sel === "eigene" ? eigeneWerte() : D;
    $("eigeneBox").hidden = sel !== "eigene"; $("neuZ").hidden = sel === "eigene";
    if(!V){ $("drei").innerHTML = ""; $("antwort").textContent = ""; $("problem").textContent = t("eigFehlt"); return; }
    var n1 = $("eN1").value.trim(), n2 = $("eN2").value.trim();
    $("problem").innerHTML = V.tpl !== "tE" ? problemText(V)
      : (n1 && n2) ? t("eigFrage", { a: bdi(z(V.a) + " " + esc(n1)), b: bdi(z(V.b) + " " + esc(n2)), c: bdi(z(V.c) + " " + esc(n1)), n2: esc(n2) }) : t("eigText");
    $("eigBtn").setAttribute("aria-pressed", sel === "eigene" ? "true" : "false");
    $("artText").innerHTML = "<b>" + t(V.art === "p" ? "prop" : "anti") + "</b>: " + t(V.art === "p" ? "propL" : "antiL");
    $("drei").innerHTML = dreisatzHTML(V);
    $("antwort").innerHTML = t("antwortL", { x: bdi(xZelle(V, V.c)), y: "<b>" + bdi((genau(V.r) ? "" : "≈ ") + yZelle(V, V.r)) + "</b>" });
    $("merke").textContent = t(V.art === "p" ? "merkProp" : "merkAnti");
  }
  $("bsp").addEventListener("change", function(){ if(this.value !== "eigene") D = erzeuge(this.value); dreisatz(); });
  $("neuZ").addEventListener("click", function(){ D = erzeuge($("bsp").value); dreisatz(); });
  ["eA", "eB", "eC", "eN1", "eN2"].forEach(function(id){ $(id).addEventListener("input", dreisatz); });
  $("eigBtn").addEventListener("click", function(){ $("bsp").value = "eigene"; dreisatz(); $("eN1").focus(); });
  $("artWahl").querySelectorAll("button").forEach(function(b){ b.addEventListener("click", function(){ eigeneArt = b.dataset.art; $("artWahl").querySelectorAll("button").forEach(function(x){ x.setAttribute("aria-pressed", x === b ? "true" : "false"); }); dreisatz(); }); });

  // ---------- Reiter Zuordnungen ----------
  var zArt = "p";
  var XS_P = [1, 2, 3, 4, 5, 6], XS_A = [1, 2, 3, 4, 6, 12];
  function zuordnung(){
    var k = Number($("k").value), p = zArt === "p", xs = p ? XS_P : XS_A;
    $("kWert").textContent = z(k);
    var h = "<tr><th>x</th>" + xs.map(function(x){ return "<td>" + z(x) + "</td>"; }).join("") + "</tr>";
    h += "<tr><th>y</th>" + xs.map(function(x){ return "<td>" + z(p ? k * x : k / x) + "</td>"; }).join("") + "</tr>";
    h += '<tr><th>' + (p ? "y : x" : "x · y") + "</th>" + xs.map(function(){ return '<td class="hinweis">' + z(k) + "</td>"; }).join("") + "</tr>";
    $("zTab").innerHTML = h;
    $("zEig").innerHTML = t(p ? "quot" : "prod", { k: "<b>" + bdi(z(k)) + "</b>" });
    $("zViel").innerHTML = t(p ? "vielProp" : "vielAnti", { k: bdi(z(k)) });
    $("zGraph").textContent = t(p ? "graphProp" : "graphAnti");
    graph(k, p, xs);
  }
  function graph(k, p, xs){
    var s = $("graph"); while(s.lastChild) s.removeChild(s.lastChild);
    var L = 52, R = 580, T = 20, B = 340, xmax = p ? 7 : 13, ymax0 = p ? k * 7 : k * 1.25;
    var st = [1, 2, 5, 10, 20, 25, 50, 100], ys = st[0];
    for(var i = 0; i < st.length; i++){ ys = st[i]; if(ymax0 / ys <= 8) break; }
    var ymax = Math.ceil(ymax0 / ys) * ys;
    var X = function(x){ return L + x / xmax * (R - L); }, Y = function(y){ return B - y / ymax * (B - T); };
    for(var x = 1; x <= xmax; x++){ s.appendChild(el("line", { x1: X(x), y1: T, x2: X(x), y2: B, "class": "g-gitter" })); s.appendChild(el("text", { x: X(x), y: B + 20, "class": "g-zahl", "text-anchor": "middle" }, z(x))); }
    for(var y = ys; y <= ymax + 1e-9; y += ys){ s.appendChild(el("line", { x1: L, y1: Y(y), x2: R, y2: Y(y), "class": "g-gitter" })); s.appendChild(el("text", { x: L - 8, y: Y(y) + 4, "class": "g-zahl", "text-anchor": "end" }, z(y))); }
    s.appendChild(el("line", { x1: L, y1: B, x2: R + 10, y2: B, "class": "g-achse" })); s.appendChild(el("line", { x1: L, y1: B, x2: L, y2: T - 10, "class": "g-achse" }));
    s.appendChild(el("text", { x: R + 8, y: B - 8, "class": "g-name" }, "x")); s.appendChild(el("text", { x: L + 8, y: T - 4, "class": "g-name" }, "y"));
    s.appendChild(el("text", { x: L - 8, y: B + 20, "class": "g-zahl", "text-anchor": "end" }, "0"));
    var d = "", erst = true;
    for(var q = p ? 0 : 0.05; q <= xmax + 1e-9; q += 0.05){
      var v = p ? k * q : k / q; if(v > ymax * 1.02){ erst = true; continue; }
      d += (erst ? "M" : "L") + X(q).toFixed(1) + " " + Y(v).toFixed(1); erst = false;
    }
    s.appendChild(el("path", { d: d, "class": "g-kurve" }));
    xs.forEach(function(x){ var v = p ? k * x : k / x; if(x <= xmax && v <= ymax) s.appendChild(el("circle", { cx: X(x), cy: Y(v), r: 6, "class": "g-punkt" })); });
  }
  $("k").addEventListener("input", zuordnung);
  $("zArt").querySelectorAll("button").forEach(function(b){ b.addEventListener("click", function(){ zArt = b.dataset.art; $("zArt").querySelectorAll("button").forEach(function(x){ x.setAttribute("aria-pressed", x === b ? "true" : "false"); }); zuordnung(); }); });

  // eigene Tabelle prüfen
  (function(){
    var start = [[2, 3], [4, 6], [6, 9], ["", ""], ["", ""]], h = "<tr><th>x</th>", h2 = "<tr><th>y</th>";
    start.forEach(function(w, i){ h += '<td><input id="px' + i + '" inputmode="decimal" value="' + w[0] + '"></td>'; h2 += '<td><input id="py' + i + '" inputmode="decimal" value="' + w[1] + '"></td>'; });
    $("pTab").innerHTML = h + "</tr>" + h2 + "</tr>";
  })();
  function klassifiziere(paare){
    var q = paare.map(function(w){ return w[1] / w[0]; }), pr = paare.map(function(w){ return w[0] * w[1]; });
    var gleich = function(L){ return L.every(function(v){ return Math.abs(v - L[0]) <= 1e-6 * Math.max(1, Math.abs(L[0])); }); };
    return { art: gleich(q) ? "p" : gleich(pr) ? "a" : "k", q: q, p: pr };
  }
  function pruefeTabelle(){
    var paare = [];
    for(var i = 0; i < 5; i++){ var x = lies($("px" + i).value), y = lies($("py" + i).value); if(isFinite(x) && isFinite(y) && x !== 0) paare.push([x, y]); }
    var e = $("pErg");
    if(paare.length < 3){ e.className = "meldung schlecht"; e.textContent = t("zuWenig"); return; }
    var K = klassifiziere(paare);
    e.className = "meldung " + (K.art === "k" ? "schlecht" : "gut");
    e.innerHTML = K.art === "p" ? t("istProp", { k: bdi(z(K.q[0], 3)) }) : K.art === "a" ? t("istAnti", { k: bdi(z(K.p[0], 3)) })
      : t("istKeine", { q: bdi(K.q.map(function(v){ return z(v, 2); }).join("; ")), p: bdi(K.p.map(function(v){ return z(v, 2); }).join("; ")) });
  }
  $("pruefBtn").addEventListener("click", pruefeTabelle);

  // ---------- Üben ----------
  var auf = null, punkte = 0, anzahl = 0, beantwortet = false;
  function neueAufgabe(){
    beantwortet = false;
    var typ = wahl(["text", "text", "text", "erk", "luecke"]);
    if(typ === "text"){ var V = erzeuge(wahl(VORLAGEN)); auf = { typ: typ, V: V, l: V.r }; }
    else if(typ === "erk"){
      var art = wahl(["p", "a", "k"]), k = zuf(2, 9), xs, ys;
      if(art === "p"){ var b0 = zuf(1, 3); xs = [b0, b0 * 2, b0 * 3, b0 * 5]; ys = xs.map(function(x){ return k * x; }); }
      else if(art === "a"){ var K2 = wahl([12, 24, 36, 48, 60]); xs = [1, 2, 3, 4, 6].sort(function(){ return Math.random() - 0.5; }).slice(0, 4).sort(function(x, y){ return x - y; }); ys = xs.map(function(x){ return K2 / x; }); }
      else { xs = [1, 2, 3, 4]; var d = zuf(1, 3); ys = xs.map(function(x){ return k + d * x; }); } // linear, aber nicht durch 0
      auf = { typ: typ, xs: xs, ys: ys, l: art };
    } else {
      var art2 = wahl(["p", "a"]), k3 = art2 === "p" ? zuf(2, 9) : wahl([12, 24, 36, 60]), xs3 = art2 === "p" ? [1, 2, 3, 5] : [1, 2, 3, 4, 6].slice(0, 4);
      var ys3 = xs3.map(function(x){ return art2 === "p" ? k3 * x : k3 / x; }), luecke = zuf(1, 3);
      auf = { typ: typ, art: art2, xs: xs3, ys: ys3, i: luecke, l: ys3[luecke] };
    }
    zeige();
  }
  function tabelleHTML(xs, ys, luecke){
    return "<tr><th>x</th>" + xs.map(function(x){ return "<td>" + z(x) + "</td>"; }).join("") + "</tr><tr><th>y</th>" + ys.map(function(y, i){ return "<td>" + (i === luecke ? "<b>?</b>" : z(y)) + "</td>"; }).join("") + "</tr>";
  }
  function auftragText(){
    if(auf.typ === "text") return problemText(auf.V);
    if(auf.typ === "erk") return t("aufErk");
    return t("aufLuecke", { art: "<b>" + t(auf.art === "p" ? "prop" : "anti") + "</b>" });
  }
  function zeige(){
    $("auftrag").innerHTML = auftragText();
    var tb = $("uTab"); tb.hidden = auf.typ === "text";
    if(auf.typ !== "text") tb.innerHTML = tabelleHTML(auf.xs, auf.ys, auf.typ === "luecke" ? auf.i : -1);
    $("meldung").textContent = ""; $("meldung").className = "meldung"; $("uLoes").hidden = true;
    var z2 = $("antwortzeile"); z2.innerHTML = "";
    if(auf.typ === "erk"){
      [["p", "prop"], ["a", "anti"], ["k", "keine"]].forEach(function(w){ var b = document.createElement("button"); b.type = "button"; b.className = "knopf hell"; b.dataset.w = w[0]; b.textContent = t(w[1]); b.addEventListener("click", function(){ pruefe(w[0]); }); z2.appendChild(b); });
    } else {
      var inp = document.createElement("input"); inp.className = "zahl"; inp.id = "uAntwort"; inp.setAttribute("inputmode", "decimal"); inp.setAttribute("autocomplete", "off"); inp.placeholder = t("eingabe");
      inp.addEventListener("keydown", function(e){ if(e.key === "Enter") pruefe(inp.value); });
      var ein = document.createElement("span"); ein.id = "einheit";
      if(auf.typ === "text"){ var e = vor(auf.V.tpl)[4]; ein.textContent = e === "geld" ? t("geldFmt", { v: "" }).trim() : e; }
      var pb = document.createElement("button"); pb.type = "button"; pb.className = "knopf"; pb.id = "pruefen"; pb.textContent = t("pruefen");
      pb.addEventListener("click", function(){ pruefe(inp.value); });
      z2.appendChild(inp); z2.appendChild(ein); z2.appendChild(pb);
    }
    $("weiter").textContent = t("weiter");
    $("punkte").textContent = t("punkte", { p: punkte, n: anzahl });
  }
  function pruefe(eingabe){
    if(beantwortet) return;
    var ok, ltxt;
    if(auf.typ === "erk"){ ok = eingabe === auf.l; ltxt = t(auf.l === "p" ? "prop" : auf.l === "a" ? "anti" : "keine"); }
    else { var v = lies(eingabe); if(!isFinite(v)) return; ok = Math.abs(v - auf.l) <= 0.005 * Math.max(1, Math.abs(auf.l)); ltxt = auf.typ === "text" ? yZelle(auf.V, auf.l) : z(auf.l); }
    beantwortet = true; anzahl++; if(ok) punkte++;
    var m = $("meldung"); m.className = "meldung " + (ok ? "gut" : "schlecht");
    m.innerHTML = ok ? t("richtig") + " " + bdi(ltxt) : t("falsch", { l: bdi(ltxt) });
    if(auf.typ === "text"){ $("uLoes").innerHTML = dreisatzHTML(auf.V); $("uLoes").hidden = false; }
    else {
      var K = klassifiziere(auf.xs.map(function(x, i){ return [x, auf.ys[i]]; }));
      var erkl = auf.typ === "luecke" ? (auf.art === "p" ? t("quot", { k: bdi(z(K.q[0])) }) : t("prod", { k: bdi(z(K.p[0])) }))
        : K.art === "p" ? t("istProp", { k: bdi(z(K.q[0])) }) : K.art === "a" ? t("istAnti", { k: bdi(z(K.p[0])) })
        : t("istKeine", { q: bdi(K.q.map(function(v){ return z(v); }).join("; ")), p: bdi(K.p.map(function(v){ return z(v); }).join("; ")) });
      m.innerHTML += '<br><span class="muted" style="font-weight:400">' + erkl + "</span>";
      if(auf.typ === "luecke") $("uTab").innerHTML = tabelleHTML(auf.xs, auf.ys, -1);
    }
    if(auf.typ === "erk") $("antwortzeile").querySelectorAll("button").forEach(function(b){ if(b.dataset.w === auf.l) b.className = "knopf"; });
    $("punkte").textContent = t("punkte", { p: punkte, n: anzahl });
    $("weiter").focus();
  }
  $("weiter").addEventListener("click", neueAufgabe);

  // ---------- Reiter ----------
  function zeigeTab(k){
    document.querySelectorAll(".tabs button").forEach(function(b){ b.setAttribute("aria-selected", b.dataset.tab === k ? "true" : "false"); });
    ["drei", "zuo", "ueben"].forEach(function(x){ $("s_" + x).hidden = x !== k; });
    if(k === "ueben" && !auf) neueAufgabe();
  }
  document.querySelectorAll(".tabs button").forEach(function(b){ b.addEventListener("click", function(){ zeigeTab(b.dataset.tab); }); });

  // ---------- Texte (bei jedem Sprachwechsel alles neu beschriften) ----------
  var altLang = null;
  function alles(){
    document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = "miStudia – " + t("titel");
    $("titel").textContent = t("titel");
    document.querySelectorAll(".tabs button").forEach(function(b){ b.textContent = t("tab_" + b.dataset.tab); });
    var sel = $("bsp"), w = sel.value || "tP1";
    sel.innerHTML = VORLAGEN.map(function(v){ return '<option value="' + v + '">' + t(v.charAt(1) === "P" ? "prop" : "anti") + ": " + vor(v)[1] + " → " + vor(v)[3] + "</option>"; }).join("") + '<option value="eigene">' + t("eigene") + "</option>";
    sel.value = w;
    // Geldbeträge an die neue Sprache anpassen (Faktor 100 für Yen/Rubel)
    if(altLang && altLang !== lang){ var f = (lang === "ja" || lang === "ru" ? 100 : 1) / (altLang === "ja" || altLang === "ru" ? 100 : 1); if(f !== 1){ if(D.tpl === "tP1"){ D = Object.assign({}, D, { b: D.b * f, r: D.r * f, eins: D.eins * f }); } if(auf && auf.typ === "text" && auf.V.tpl === "tP1"){ auf.V = Object.assign({}, auf.V, { b: auf.V.b * f, r: auf.V.r * f, eins: auf.V.eins * f }); auf.l = auf.V.r; } } }
    altLang = lang;
    $("tBsp").textContent = t("bsp"); $("neuZ").textContent = t("neueZahlen");
    $("artWahl").querySelectorAll("button").forEach(function(b){ b.textContent = t(b.dataset.art === "p" ? "prop" : "anti"); });
    $("zArt").querySelectorAll("button").forEach(function(b){ b.textContent = t(b.dataset.art === "p" ? "prop" : "anti"); });
    $("tEA").textContent = t("eA"); $("tEB").textContent = t("eB"); $("tEC").textContent = t("eC");
    $("eigBtn").textContent = t("eigBtn"); $("tEN1").textContent = t("eN1"); $("tEN2").textContent = t("eN2");
    $("eN1").placeholder = t("eN1ph"); $("eN2").placeholder = t("eN2ph");
    $("tZuo").textContent = t("tZuo"); $("tK").textContent = t("kL"); $("tTab").textContent = t("tTab"); $("tGraph").textContent = t("tGraph");
    $("tPruef").textContent = t("tPruef"); $("pruefH").textContent = t("pruefH"); $("pruefBtn").textContent = t("pruefBtn");
    if($("pErg").textContent) pruefeTabelle();
    dreisatz(); zuordnung();
    if(auf){
      var war = beantwortet, eing = $("uAntwort") ? $("uAntwort").value : null, gewaehlt = $("meldung").classList.contains("gut");
      zeige();
      if(war){ beantwortet = false; anzahl--; if(gewaehlt) punkte--; pruefe(auf.typ === "erk" ? (gewaehlt ? auf.l : "x") : (eing != null && eing !== "" ? eing : "999999")); }
    }
  }
  window.MS_LANG = { apply: function(l){ if(DS[l]){ lang = l; alles(); } } };
  alles();
})();
