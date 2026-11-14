// ============================================================
// wahrscheinlichkeit/app.js – Wahrscheinlichkeit & Baumdiagramme
// Baumdiagramm: Münze, Würfel (Sechs / keine Sechs), Urne mit und ohne
// Zurücklegen, Glücksrad, eigenes Treffer/Niete-Experiment; 1–3 Stufen.
// Pfade antippen oder Ereignis wählen → Pfadregel (multiplizieren),
// Summenregel (addieren), Gegenereignis. Anzeige als Bruch, Dezimalzahl, Prozent.
// Simulation: relative Häufigkeit nähert sich der Wahrscheinlichkeit.
// Üben: Pfad- und Ereigniswahrscheinlichkeiten mit Lösungsbaum.
// Texte: wahrscheinlichkeit/texte.js (WT), Sprache aus dem Startmenü (MS_LANG).
// ============================================================
(function(){
  "use strict";
  var NS = "http://www.w3.org/2000/svg", lang = "de";
  function $(id){ return document.getElementById(id); }
  function t(k, v){ var s = (WT[lang] && WT[lang][k]) || WT.de[k] || k; if(v) for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  function el(n, a, txt){ var e = document.createElementNS(NS, n); for(var k in a) if(a[k] != null) e.setAttribute(k, a[k]); if(txt != null) e.textContent = txt; return e; }
  function leer(s){ while(s.lastChild) s.removeChild(s.lastChild); }
  function sicht(e, an){ if(an) e.removeAttribute("hidden"); else e.setAttribute("hidden", ""); }
  function bdi(s){ return '<bdi dir="ltr">' + s + "</bdi>"; }
  function komma(){ return !(lang === "en" || lang === "zh" || lang === "ja" || lang === "ar"); }
  function zahl(v, d){ var r = Math.round(v * Math.pow(10, d)) / Math.pow(10, d), s = String(r); if(s.indexOf("e") >= 0) s = r.toFixed(d); return komma() ? s.replace(".", ",") : s; }
  function zuf(a, b){ return a + Math.floor(Math.random() * (b - a + 1)); }
  function wahl(L){ return L[Math.floor(Math.random() * L.length)]; }

  // ---------- Brüche ----------
  function ggt(a, b){ a = Math.abs(a); b = Math.abs(b); while(b){ var r = a % b; a = b; b = r; } return a || 1; }
  function F(n, d){ if(d == null) d = 1; if(d < 0){ n = -n; d = -d; } var g = ggt(n, d); return { n: n / g, d: d / g }; }
  function mul(a, b){ return F(a.n * b.n, a.d * b.d); }
  function add(a, b){ return F(a.n * b.d + b.n * a.d, a.d * b.d); }
  function sub(a, b){ return F(a.n * b.d - b.n * a.d, a.d * b.d); }
  function num(a){ return a.n / a.d; }
  var format = "bruch";
  function fmt(a, f){
    f = f || format;
    if(f === "dezimal") return (genau(a) ? "" : "≈ ") + zahl(num(a), 4);
    if(f === "prozent") return (genau100(a) ? "" : "≈ ") + zahl(num(a) * 100, 2) + " %";
    return a.d === 1 ? String(a.n) : a.n + "/" + a.d;
  }
  function genau(a){ var d = a.d; while(d % 2 === 0) d /= 2; while(d % 5 === 0) d /= 5; return d === 1 && a.d <= 10000; }
  function genau100(a){ return genau(a) && a.d <= 100 * 4; }
  function liesWert(s){ // "3/8", "0,375", "37,5 %"
    s = String(s).trim().replace(/\s/g, "").replace(/,/g, ".").replace(/[−–]/g, "-");
    if(!s) return NaN;
    var proz = /%$/.test(s); if(proz) s = s.slice(0, -1);
    var m = s.match(/^(\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/), v = m ? Number(m[1]) / Number(m[2]) : Number(s);
    return proz ? v / 100 : v;
  }
  function liesBruch(s){
    s = String(s).trim().replace(/\s/g, "").replace(/,/g, ".");
    var m = s.match(/^(\d+)\/(\d+)$/); if(m && +m[2] > 0 && +m[1] <= +m[2]) return F(+m[1], +m[2]);
    var v = liesWert(s); if(!(v >= 0 && v <= 1)) return null;
    var d = 1; while(Math.abs(v * d - Math.round(v * d)) > 1e-9 && d < 1e6) d *= 10;
    return F(Math.round(v * d), d);
  }

  // ---------- Experimente ----------
  // Ergebnis: { k: Schlüssel, farbe }; Name und Kürzel kommen aus den Texten (k, k + "K")
  var FARBE = { kopf: "#2563eb", zahl: "#d97706", sechs: "#16a34a", nicht6: "#64748b", rot: "#dc2626", blau: "#2563eb", gelb: "#eab308", treffer: "#16a34a", niete: "#64748b" };
  var VERSUCHE = ["muenze", "wuerfel", "urneMit", "urneOhne", "rad", "eigen"];
  function experiment(art, stufen, r, b, pT){
    return { art: art, stufen: stufen, r: r, b: b, pT: pT,
      stufe: function(i, pfad){
        if(art === "muenze") return [{ k: "kopf", p: F(1, 2) }, { k: "zahl", p: F(1, 2) }];
        if(art === "wuerfel") return [{ k: "sechs", p: F(1, 6) }, { k: "nicht6", p: F(5, 6) }];
        if(art === "rad") return [{ k: "rot", p: F(1, 2) }, { k: "gelb", p: F(1, 3) }, { k: "blau", p: F(1, 6) }];
        if(art === "eigen") return [{ k: "treffer", p: pT }, { k: "niete", p: sub(F(1), pT) }].filter(function(o){ return o.p.n > 0; });
        var rr = r, bb = b;
        if(art === "urneOhne") pfad.forEach(function(o){ if(o.k === "rot") rr--; else bb--; });
        var n = rr + bb; return [{ k: "rot", p: F(rr, n) }, { k: "blau", p: F(bb, n) }].filter(function(o){ return o.p.n > 0; });
      } };
  }
  // Baum aufbauen: Blätter mit Pfad und Pfadwahrscheinlichkeit
  function baumBauen(E){
    var blaetter = [];
    function knoten(tiefe, pfad, ps){
      var n = { kinder: [], pfad: pfad, ps: ps };
      if(tiefe === E.stufen){ n.blatt = blaetter.length; blaetter.push({ pfad: pfad, ps: ps, p: ps.reduce(mul, F(1)), key: pfad.map(function(o){ return o.k; }).join(",") }); return n; }
      E.stufe(tiefe, pfad).forEach(function(o){ var c = knoten(tiefe + 1, pfad.concat([o]), ps.concat([o.p])); c.o = o; c.p = o.p; n.kinder.push(c); });
      return n;
    }
    var wurzel = knoten(0, [], []);
    return { wurzel: wurzel, blaetter: blaetter };
  }
  function kurz(k){ return t(k + "K"); }
  function pfadName(pfad){ return pfad.map(function(o){ return kurz(o.k); }).join(lang === "zh" || lang === "ja" ? "" : ""); }
  function pfadText(pfad){ return "(" + pfad.map(function(o){ return t(o.k); }).join(", ") + ")"; }

  // ---------- Baum zeichnen ----------
  function zeichneBaum(svg, B, o){
    leer(svg);
    var schmal = (svg.clientWidth || (svg.parentNode && svg.parentNode.clientWidth) || 640) < 520;
    var L = B.blaetter.length, zeile = L > 12 ? 30 : 38, H = Math.max(140, L * zeile + 24), W = schmal ? 400 : 640;
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    var stufen = o.stufen, blattX = W - (20 * stufen + 92), colW = (blattX - 84) / stufen, y = 12 + zeile / 2;
    // Positionen
    function lage(n, tiefe){
      n.x = 22 + tiefe * colW;
      if(!n.kinder.length){ n.y = y; y += zeile; return; }
      n.kinder.forEach(function(c){ lage(c, tiefe + 1); });
      n.y = n.kinder.reduce(function(s, c){ return s + c.y; }, 0) / n.kinder.length;
    }
    lage(B.wurzel, 0);
    var aus = o.auswahl || {};
    // Zeilen (Blätter) zum Antippen
    B.blaetter.forEach(function(b, i){
      var ry = 12 + i * zeile;
      var r = el("rect", { x: blattX - 14, y: ry + 1, width: W - blattX + 12, height: zeile - 2, rx: 8, "class": "b-zeile" + (aus[b.key] ? " an" : "") });
      if(o.klick){ r.addEventListener("click", function(){ o.klick(b.key); }); r.setAttribute("tabindex", "0"); r.addEventListener("keydown", function(e){ if(e.key === "Enter" || e.key === " "){ e.preventDefault(); o.klick(b.key); } }); }
      svg.appendChild(r);
    });
    // Kanten und Knoten
    function kanten(n){
      n.kinder.forEach(function(c){
        var an = c.blatt != null ? !!aus[B.blaetter[c.blatt].key] : unterAn(c);
        svg.appendChild(el("line", { x1: n.x + (n === B.wurzel ? 4 : 14), y1: n.y, x2: c.x - 14, y2: c.y, "class": "b-kante" + (an ? " an" : "") }));
        var mx = (n.x + c.x) / 2, my = (n.y + c.y) / 2;
        svg.appendChild(el("text", { x: mx, y: c.y > n.y + 1 ? my + 17 : my - 6, "class": "b-p", "text-anchor": "middle" }, fmt(c.p)));
        kanten(c);
      });
      if(n !== B.wurzel) knotenZeichnen(svg, n.x, n.y, n.o, 13);
    }
    function unterAn(n){ return n.kinder.some(function(c){ return c.blatt != null ? !!aus[B.blaetter[c.blatt].key] : unterAn(c); }); }
    svg.appendChild(el("circle", { cx: B.wurzel.x, cy: B.wurzel.y, r: 5, fill: "#1a2233" }));
    kanten(B.wurzel);
    // Blattbeschriftung: Pfad als Kreise und Wahrscheinlichkeit
    B.blaetter.forEach(function(b, i){
      var cy = 12 + i * zeile + zeile / 2, x = blattX;
      b.pfad.forEach(function(oo){ knotenZeichnen(svg, x, cy, oo, 9); x += 20; });
      svg.appendChild(el("text", { x: blattX + 20 * stufen, y: cy + 6, "class": "b-blatt" }, o.verdeckt && !aus[b.key] ? "= ?" : o.verdeckt && o.nurZiel ? "= ?" : "= " + fmt(b.p)));
    });
  }
  function knotenZeichnen(svg, x, y, o, r){
    var g = el("g", { "class": "b-knoten" });
    g.appendChild(el("circle", { cx: x, cy: y, r: r, fill: FARBE[o.k] || "#475569" }));
    g.appendChild(el("text", { x: x, y: y + (r > 11 ? 5 : 4), "font-size": r > 11 ? 13 : 11 }, kurz(o.k)));
    svg.appendChild(g);
  }

  // ---------- Ereignisse ----------
  function ereignisse(E){
    var erste = E.stufe(0, []).map(function(o){ return o.k; }), L = [];
    var haupt = E.art === "muenze" ? ["kopf"] : E.art === "wuerfel" ? ["sechs"] : E.art === "eigen" ? ["treffer"] : E.art === "rad" ? ["rot", "gelb"] : ["rot", "blau"];
    haupt.forEach(function(x){
      var name = t(x), anz = function(b){ return b.pfad.filter(function(o){ return o.k === x; }).length; };
      if(E.stufen > 1){
        L.push({ id: "mind_" + x, txt: t("eMind", { x: name }), test: function(b){ return anz(b) >= 1; }, gegen: { txt: t("eKein", { x: name }), test: function(b){ return anz(b) === 0; } } });
        L.push({ id: "genau_" + x, txt: t("eGenau", { x: name }), test: function(b){ return anz(b) === 1; } });
        L.push({ id: "alle_" + x, txt: t("eAlle", { x: name }), test: function(b){ return anz(b) === E.stufen; } });
        L.push({ id: "kein_" + x, txt: t("eKein", { x: name }), test: function(b){ return anz(b) === 0; } });
      } else L.push({ id: "eins_" + x, txt: name, test: function(b){ return anz(b) === 1; } });
    });
    if(E.stufen > 1) L.push({ id: "gleich", txt: t("eGleich"), test: function(b){ return b.pfad.every(function(o){ return o.k === b.pfad[0].k; }); } });
    void erste;
    return L;
  }

  // ---------- Zustand ----------
  var E = null, B = null, auswahl = {}, ereignis = null, EL = [];
  function lesen(){
    var art = $("versuch").value, st = Number($("stufen").value), r = Number($("nRot").value), b = Number($("nBlau").value), pT = F(1, 4), fe = "";
    sicht($("urneBox"), art === "urneMit" || art === "urneOhne"); sicht($("eigenBox"), art === "eigen");
    if(art === "eigen"){ pT = liesBruch($("pTreffer").value); if(!pT){ fe = t("fehlerP"); pT = F(1, 4); } }
    if(art === "urneOhne" && st > r + b) fe = t("fehlerUrne");
    $("fehler").textContent = fe;
    E = experiment(art, st, r, b, pT); B = baumBauen(E); EL = ereignisse(E);
    if(ereignis){ var neu = EL.filter(function(x){ return x.id === ereignis.id; })[0]; ereignis = neu || null; }
    if(ereignis) setzeEreignis(ereignis, true); else { var gueltig = {}; B.blaetter.forEach(function(bl){ if(auswahl[bl.key]) gueltig[bl.key] = 1; }); auswahl = gueltig; }
    sicht($("ohneHinweis"), art === "urneOhne" && st > 1);
  }
  function setzeEreignis(ev, still){
    ereignis = ev; auswahl = {};
    if(ev) B.blaetter.forEach(function(b){ if(ev.test(b)) auswahl[b.key] = 1; });
    if(!still){ simReset(); baum(); }
  }
  function klick(key){ if(auswahl[key]) delete auswahl[key]; else auswahl[key] = 1; ereignis = null; simReset(); baum(); }
  function gewaehlt(){ return B.blaetter.filter(function(b){ return auswahl[b.key]; }); }
  function pfadZeile(b){ return bdi("P" + pfadText(b.pfad) + " = " + b.ps.map(function(p){ return fmt(p, "bruch"); }).join(" · ") + " = " + fmt(b.p)); }
  function summe(L){ return L.reduce(function(s, b){ return add(s, b.p); }, F(0)); }

  // ---------- Reiter Baumdiagramm ----------
  function baum(){
    zeichneBaum($("baum"), B, { stufen: E.stufen, auswahl: auswahl, klick: klick });
    var h = "";
    EL.forEach(function(ev){ h += '<button type="button" data-id="' + ev.id + '" aria-pressed="' + (ereignis && ereignis.id === ev.id ? "true" : "false") + '">' + ev.txt + "</button>"; });
    h += '<button type="button" data-id="" aria-pressed="false">' + t("eLeer") + "</button>";
    $("ereignisse").innerHTML = h;
    $("ereignisse").querySelectorAll("button").forEach(function(b){ b.addEventListener("click", function(){ setzeEreignis(b.dataset.id ? EL.filter(function(x){ return x.id === b.dataset.id; })[0] : null); }); });
    var G = gewaehlt(), R = [];
    $("tEreignis").textContent = t("ereignisL") + " " + (ereignis ? ereignis.txt : G.length ? t("eigeneAusw") : "–");
    if(!G.length){
      R.push(t("pfadregel")); R.push(pfadZeile(B.blaetter[0]));
      R.push(t("summeEins") + " " + bdi(B.blaetter.map(function(b){ return fmt(b.p, "bruch"); }).join(" + ") + " = " + fmt(summe(B.blaetter), "bruch")));
      $("ergebnis").textContent = "";
    } else {
      R.push(t("pfadregel")); G.forEach(function(b){ R.push(pfadZeile(b)); });
      var S = summe(G);
      if(G.length > 1) R.push(t("summenregel") + " " + bdi("P(E) = " + G.map(function(b){ return fmt(b.p); }).join(" + ") + " = " + fmt(S)));
      if(ereignis && ereignis.gegen){
        var GG = B.blaetter.filter(ereignis.gegen.test), SG = summe(GG);
        R.push(t("gegenL", { g: ereignis.gegen.txt }) + " " + bdi("P(E) = 1 − " + fmt(SG) + " = " + fmt(S)));
      }
      $("ergebnis").innerHTML = bdi("P(" + (ereignis ? ereignis.txt : t("eigeneAusw")) + ") = " + fmt(S) + (format === "bruch" ? " ≈ " + zahl(num(S) * 100, 2) + " %" : ""));
    }
    $("rechnung").innerHTML = R.map(function(r){ return "<li>" + r + "</li>"; }).join("");
    $("regeln").textContent = t("regelnText");
  }

  // ---------- Reiter Simulation ----------
  var sim = { n: 0, k: 0, verlauf: [], letzte: null };
  function simReset(){ sim = { n: 0, k: 0, verlauf: [], letzte: null }; if(tab === "sim") simZeigen(); }
  function zieh(){
    var pfad = [];
    for(var i = 0; i < E.stufen; i++){
      var O = E.stufe(i, pfad), z = Math.random(), s = 0, w = O[O.length - 1];
      for(var j = 0; j < O.length; j++){ s += num(O[j].p); if(z < s){ w = O[j]; break; } }
      pfad.push(w);
    }
    return pfad;
  }
  function simLauf(m){
    for(var i = 0; i < m; i++){
      var p = zieh(), key = p.map(function(o){ return o.k; }).join(",");
      sim.n++; if(auswahl[key]) sim.k++; sim.letzte = p;
      if(sim.verlauf.length < 20000) sim.verlauf.push(sim.k / sim.n);
    }
    simZeigen();
  }
  function simZeigen(){
    var G = gewaehlt(), S = summe(G);
    $("simH").textContent = t("simH");
    $("simEreig").textContent = G.length ? t("ereignisL") + " " + (ereignis ? ereignis.txt : t("eigeneAusw")) : t("simKein");
    var kn = $("simKnoepfe"); kn.innerHTML = "";
    [1, 10, 100, 1000].forEach(function(m){ var b = document.createElement("button"); b.type = "button"; b.className = "knopf"; b.textContent = t("mal", { n: m }); b.disabled = !G.length; b.addEventListener("click", function(){ simLauf(m); }); kn.appendChild(b); });
    var r = document.createElement("button"); r.type = "button"; r.className = "knopf hell"; r.textContent = t("reset"); r.addEventListener("click", simReset); kn.appendChild(r);
    var l = $("letzte"); l.innerHTML = "";
    if(sim.letzte){
      l.appendChild(document.createTextNode(t("letzte") + " "));
      var sv = el("svg", { viewBox: "0 0 " + (sim.letzte.length * 26 + 4) + " 26", width: sim.letzte.length * 26 + 4, height: 26 }); sv.style.verticalAlign = "middle";
      sim.letzte.forEach(function(o, i){ knotenZeichnen(sv, 13 + i * 26, 13, o, 11); });
      l.appendChild(sv);
      var key = sim.letzte.map(function(o){ return o.k; }).join(",");
      l.appendChild(document.createTextNode(" " + (auswahl[key] ? "✓" : "✗")));
    }
    $("simWerte").innerHTML = "<div>" + t("anzahl") + "<br><b>" + sim.n + "</b></div><div>" + t("imEreig") + "<br><b>" + sim.k + "</b></div>" +
      "<div>" + t("relH") + "<br><b>" + (sim.n ? bdi(zahl(sim.k / sim.n, 4)) : "–") + "</b></div><div>" + t("wahr") + "<br><b>" + (G.length ? bdi(fmt(S) + (format !== "dezimal" ? " ≈ " + zahl(num(S), 4) : "")) : "–") + "</b></div>";
    // Verlauf
    var s = $("simGraph"); leer(s);
    var L = 46, R = 625, T = 12, Bt = 245, n = sim.verlauf.length;
    var X = function(i){ return L + (n > 1 ? i / (n - 1) : 0) * (R - L); }, Y = function(v){ return Bt - v * (Bt - T); };
    [0, 0.25, 0.5, 0.75, 1].forEach(function(v){ s.appendChild(el("line", { x1: L, y1: Y(v), x2: R, y2: Y(v), "class": "s-gitter" })); s.appendChild(el("text", { x: L - 6, y: Y(v) + 4, "class": "s-zahl", "text-anchor": "end" }, zahl(v, 2))); });
    s.appendChild(el("line", { x1: L, y1: Bt, x2: R, y2: Bt, "class": "s-achse" })); s.appendChild(el("line", { x1: L, y1: T, x2: L, y2: Bt, "class": "s-achse" }));
    s.appendChild(el("text", { x: R, y: Bt + 22, "class": "s-zahl", "text-anchor": "end" }, "n = " + sim.n));
    s.appendChild(el("text", { x: L, y: Bt + 22, "class": "s-zahl" }, "1"));
    if(G.length) s.appendChild(el("line", { x1: L, y1: Y(num(S)), x2: R, y2: Y(num(S)), "class": "s-p" }));
    if(n){ var schritt = Math.max(1, Math.floor(n / 500)), d = ""; for(var i = 0; i < n; i += schritt) d += (i ? "L" : "M") + X(i).toFixed(1) + " " + Y(sim.verlauf[i]).toFixed(1); d += "L" + X(n - 1).toFixed(1) + " " + Y(sim.verlauf[n - 1]).toFixed(1); s.appendChild(el("path", { d: d, "class": "s-linie" })); }
  }

  // ---------- Reiter Üben ----------
  var auf = null, punkte = 0, anzahl = 0, beantwortet = false;
  function expText(X){
    var k = X.stufen;
    if(X.art === "muenze") return t("expMuenze", { k: k });
    if(X.art === "wuerfel") return t("expWuerfel", { k: k });
    if(X.art === "rad") return t("expRad", { k: k });
    return t(X.art === "urneMit" ? "expUrneMit" : "expUrneOhne", { r: X.r, b: X.b, k: k });
  }
  function neueAufgabe(){
    beantwortet = false;
    var art = wahl(["muenze", "wuerfel", "urneMit", "urneOhne", "urneOhne", "rad"]), st = art === "rad" ? 2 : wahl([2, 2, 3]);
    var r = zuf(2, 6), b = zuf(2, 5), X = experiment(art, st, r, b, F(1, 4)), BB = baumBauen(X), typ = wahl(["pfad", "ereignis", "ereignis"]);
    if(typ === "pfad"){
      var bl = wahl(BB.blaetter), aus = {}; aus[bl.key] = 1;
      auf = { typ: typ, X: X, B: BB, aus: aus, l: bl.p, txt: t("aufPfad", { p: pfadText(bl.pfad) }) };
    } else {
      var EV = ereignisse(X).filter(function(e){ return e.id !== "gleich" || X.art !== "rad"; }), ev = wahl(EV), aus2 = {};
      BB.blaetter.forEach(function(bb){ if(ev.test(bb)) aus2[bb.key] = 1; });
      auf = { typ: typ, X: X, B: BB, aus: aus2, ev: ev, l: summe(BB.blaetter.filter(function(bb){ return aus2[bb.key]; })), txt: t("aufEreig", { e: ev.txt }) };
    }
    zeige();
  }
  function zeige(){
    $("auftrag").innerHTML = expText(auf.X) + " " + auf.txt;
    $("meldung").textContent = ""; $("meldung").className = "meldung"; sicht($("uLauf"), false);
    var sv = $("uBaum"); sicht(sv, auf.typ === "pfad");
    if(auf.typ === "pfad") zeichneBaum(sv, auf.B, { stufen: auf.X.stufen, auswahl: auf.aus, verdeckt: true, nurZiel: true });
    var z = $("antwortzeile"); z.innerHTML = "";
    var inp = document.createElement("input"); inp.className = "zahl"; inp.id = "uAntwort"; inp.setAttribute("inputmode", "text"); inp.setAttribute("autocomplete", "off"); inp.placeholder = t("eingabe"); inp.style.width = "130px";
    inp.addEventListener("keydown", function(e){ if(e.key === "Enter") pruefe(inp.value); });
    var pb = document.createElement("button"); pb.type = "button"; pb.className = "knopf"; pb.id = "pruefen"; pb.textContent = t("pruefen"); pb.addEventListener("click", function(){ pruefe(inp.value); });
    var hi = document.createElement("span"); hi.className = "muted"; hi.textContent = t("eingabeH");
    z.appendChild(inp); z.appendChild(pb); z.appendChild(hi);
    $("weiter").textContent = t("weiter"); $("punkte").textContent = t("punkte", { p: punkte, n: anzahl });
  }
  function pruefe(e){
    if(beantwortet) return;
    var v = liesWert(e); if(!isFinite(v)) return;
    var ok = Math.abs(v - num(auf.l)) <= 0.005;
    beantwortet = true; anzahl++; if(ok) punkte++;
    var lt = fmt(auf.l, "bruch") + " ≈ " + zahl(num(auf.l) * 100, 2) + " %";
    var m = $("meldung"); m.className = "meldung " + (ok ? "gut" : "schlecht"); m.innerHTML = ok ? t("richtig") + " " + bdi(lt) : t("falsch", { l: bdi(lt) });
    var sv = $("uBaum"); sicht(sv, true); zeichneBaum(sv, auf.B, { stufen: auf.X.stufen, auswahl: auf.aus });
    var G = auf.B.blaetter.filter(function(b){ return auf.aus[b.key]; }), L = G.map(function(b){ return bdi("P" + pfadText(b.pfad) + " = " + b.ps.map(function(p){ return fmt(p, "bruch"); }).join(" · ") + " = " + fmt(b.p, "bruch")); });
    if(G.length > 1) L.push(t("summenregel") + " " + bdi(G.map(function(b){ return fmt(b.p, "bruch"); }).join(" + ") + " = " + fmt(auf.l, "bruch")));
    if(auf.ev && auf.ev.gegen){ var SG = summe(auf.B.blaetter.filter(auf.ev.gegen.test)); L.push(t("gegenL", { g: auf.ev.gegen.txt }) + " " + bdi("1 − " + fmt(SG, "bruch") + " = " + fmt(auf.l, "bruch"))); }
    $("uLauf").innerHTML = L.map(function(s){ return "<li>" + s + "</li>"; }).join(""); sicht($("uLauf"), true);
    $("punkte").textContent = t("punkte", { p: punkte, n: anzahl });
  }
  $("weiter").addEventListener("click", neueAufgabe);

  // ---------- Bedienung ----------
  ["versuch", "stufen", "nRot", "nBlau"].forEach(function(id){ $(id).addEventListener("change", function(){ simReset(); lesen(); alles(true); }); });
  $("pTreffer").addEventListener("input", function(){ simReset(); lesen(); alles(true); });
  $("format").querySelectorAll("button").forEach(function(b){ b.addEventListener("click", function(){ format = b.dataset.f; $("format").querySelectorAll("button").forEach(function(x){ x.setAttribute("aria-pressed", x === b ? "true" : "false"); }); alles(true); }); });
  var tab = "baum";
  function zeigeTab(k){
    tab = k;
    document.querySelectorAll(".tabs button").forEach(function(b){ b.setAttribute("aria-selected", b.dataset.tab === k ? "true" : "false"); });
    ["baum", "sim", "ueben"].forEach(function(x){ sicht($("s_" + x), x === k); });
    sicht($("eingabe"), k !== "ueben");
    if(k === "ueben" && !auf) neueAufgabe();
    alles(true);
  }
  document.querySelectorAll(".tabs button").forEach(function(b){ b.addEventListener("click", function(){ zeigeTab(b.dataset.tab); }); });
  (function(){ var h = ""; for(var i = 1; i <= 9; i++) h += "<option>" + i + "</option>"; $("nRot").innerHTML = h; $("nBlau").innerHTML = h; $("nRot").value = "3"; $("nBlau").value = "2"; })();

  // ---------- Texte (bei jedem Sprachwechsel alles neu beschriften) ----------
  function alles(nurRechnen){
    if(!nurRechnen){
      document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.title = "miStudia – " + t("titel"); $("titel").textContent = t("titel");
      document.querySelectorAll(".tabs button").forEach(function(b){ b.textContent = t("tab_" + b.dataset.tab); });
      var v = $("versuch").value || "muenze";
      $("versuch").innerHTML = VERSUCHE.map(function(x){ return '<option value="' + x + '">' + t("v_" + x) + "</option>"; }).join(""); $("versuch").value = v;
      $("tVersuch").textContent = t("versuch"); $("tStufen").textContent = t("stufen"); $("tRot").textContent = t("rotN"); $("tBlau").textContent = t("blauN"); $("tPTreffer").textContent = t("pTreffer");
      $("format").querySelectorAll("button").forEach(function(b){ b.textContent = t("f_" + b.dataset.f); });
      $("hinweisKlick").textContent = t("hinweisKlick"); $("ohneHinweis").textContent = t("ohneHinweis");
      var altId = ereignis && ereignis.id; lesen(); if(altId){ ereignis = EL.filter(function(x){ return x.id === altId; })[0] || null; if(ereignis) setzeEreignis(ereignis, true); }
    }
    if(tab === "baum") baum(); else if(tab === "sim") simZeigen();
    if(!nurRechnen && auf){
      var war = beantwortet, eing = $("uAntwort") ? $("uAntwort").value : null, gut = $("meldung").classList.contains("gut");
      if(auf.ev){ var ev = ereignisse(auf.X).filter(function(x){ return x.id === auf.ev.id; })[0]; if(ev){ auf.ev = ev; auf.txt = t("aufEreig", { e: ev.txt }); } }
      else { var bl = auf.B.blaetter.filter(function(b){ return auf.aus[b.key]; })[0]; auf.txt = t("aufPfad", { p: pfadText(bl.pfad) }); }
      zeige();
      if(war){ beantwortet = false; anzahl--; if(gut) punkte--; pruefe(eing || "-1"); }
    }
  }
  window.MS_LANG = { apply: function(l){ if(WT[l]){ lang = l; alles(); } } };
  $("versuch").innerHTML = '<option value="muenze">muenze</option>';
  alles();
})();
