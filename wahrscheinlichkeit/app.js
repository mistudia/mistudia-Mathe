// ============================================================
// wahrscheinlichkeit/app.js – Wahrscheinlichkeit & Baumdiagramme
// Baumdiagramm: Münze, Würfel (Sechs / keine Sechs), Urne mit und ohne
// Zurücklegen, Glücksrad, eigenes Treffer/Niete-Experiment; 1–3 Stufen.
// Pfade antippen oder Ereignis wählen → Pfadregel (multiplizieren),
// Summenregel (addieren), Gegenereignis. Anzeige als Bruch, Dezimalzahl, Prozent.
// Vierfeldertafel: bedingte Wahrscheinlichkeit, Baum und umgekehrter Baum, Unabhängigkeit.
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
  function genau(a){ return (a.n * 10000) % a.d === 0; }     // höchstens 4 Nachkommastellen
  function genau100(a){ return (a.n * 10000) % a.d === 0; }  // Prozent mit höchstens 2 Nachkommastellen
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
  var FARBE = { kopf: "#2563eb", zahl: "#d97706", sechs: "#16a34a", nicht6: "#64748b", rot: "#dc2626", blau: "#2563eb", gelb: "#eab308", treffer: "#16a34a", niete: "#64748b", A: "#7c3aed", nA: "#94a3b8", B: "#0d9488", nB: "#64748b" };
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
        svg.appendChild(el("text", { x: mx, y: c.y > n.y + 1 ? my + 17 : my - 6, "class": "b-p", "text-anchor": "middle" }, (o.f || fmt)(c.p, o.format)));
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
      svg.appendChild(el("text", { x: blattX + 20 * stufen, y: cy + 6, "class": "b-blatt" }, o.verdeckt && !aus[b.key] ? "= ?" : o.verdeckt && o.nurZiel ? "= ?" : ("= " + (o.f || fmt)(b.p, o.format)).replace("= ≈", "≈")));
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
    if(!still){ simReset(); if(tab === "baum") baum(); }
  }
  function klick(key){ if(auswahl[key]) delete auswahl[key]; else auswahl[key] = 1; ereignis = null; simReset(); baum(); }
  function gewaehlt(){ return B.blaetter.filter(function(b){ return auswahl[b.key]; }); }
  function pfadZeile(b){ return bdi("P" + pfadText(b.pfad) + " = " + b.ps.map(function(p){ return fmt(p, "bruch"); }).join(" · ") + " = " + fmt(b.p)); }
  function summe(L){ return L.reduce(function(s, b){ return add(s, b.p); }, F(0)); }

  // Ereignis-Knöpfe (im Baum-Reiter mit „Auswahl löschen“, in der Simulation ohne)
  function ereigKnoepfe(box, mitLeer){
    var h = "";
    EL.forEach(function(ev){ h += '<button type="button" data-id="' + ev.id + '" aria-pressed="' + (ereignis && ereignis.id === ev.id ? "true" : "false") + '">' + ev.txt + "</button>"; });
    if(mitLeer) h += '<button type="button" data-id="" aria-pressed="false">' + t("eLeer") + "</button>";
    box.innerHTML = h;
    box.querySelectorAll("button").forEach(function(b){ b.addEventListener("click", function(){ setzeEreignis(b.dataset.id ? EL.filter(function(x){ return x.id === b.dataset.id; })[0] : null); }); });
  }

  // ---------- Reiter Baumdiagramm ----------
  function baum(){
    zeichneBaum($("baum"), B, { stufen: E.stufen, auswahl: auswahl, klick: klick });
    ereigKnoepfe($("ereignisse"), true);
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

  // ---------- Reiter Grundlagen (Laplace) ----------
  // Ergebnisse je Versuch; Ereignisse als Filter; Klick auf ein Ergebnis schaltet es ein/aus.
  var GW = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
  function istPrim(n){ return n === 2 || n === 3 || n === 5; }
  var GEXP = {
    wuerfel: { omega: function(){ return [1, 2, 3, 4, 5, 6].map(function(w){ return { id: String(w), w: w }; }); }, ev: { gerade: function(o){ return o.w % 2 === 0; }, gr4: function(o){ return o.w > 4; }, prim: function(o){ return istPrim(o.w); }, sechs: function(o){ return o.w === 6; } } },
    zwei: { omega: function(){ var L = []; for(var a = 1; a <= 6; a++) for(var b = 1; b <= 6; b++) L.push({ id: a + "-" + b, a: a, b: b }); return L; }, ev: { s7: function(o){ return o.a + o.b === 7; }, pasch: function(o){ return o.a === o.b; }, s10: function(o){ return o.a + o.b >= 10; }, eine6: function(o){ return o.a === 6 || o.b === 6; } } },
    muenze3: { omega: function(){ var L = []; ["K", "Z"].forEach(function(x){ ["K", "Z"].forEach(function(y){ ["K", "Z"].forEach(function(z){ L.push({ id: x + y + z, s: [x, y, z] }); }); }); }); return L; }, ev: { genau2: function(o){ return o.s.filter(function(c){ return c === "K"; }).length === 2; }, mind1: function(o){ return o.s.indexOf("K") >= 0; }, gleich: function(o){ return o.s[0] === o.s[1] && o.s[1] === o.s[2]; } } },
    karten: { omega: function(){ var L = []; ["♥", "♦", "♠", "♣"].forEach(function(f){ ["7", "8", "9", "10", "B", "D", "K", "A"].forEach(function(r){ L.push({ id: f + r, f: f, r: r }); }); }); return L; }, ev: { herz: function(o){ return o.f === "♥"; }, ass: function(o){ return o.r === "A"; }, bild: function(o){ return o.r === "B" || o.r === "D" || o.r === "K"; }, rot: function(o){ return o.f === "♥" || o.f === "♦"; } } }
  };
  var gExp = "wuerfel", gWahl = {}, gEv = "gerade";
  function gText(exp, o){
    if(exp === "wuerfel") return GW[o.w - 1];
    if(exp === "zwei") return o.a + "|" + o.b;
    if(exp === "muenze3") return o.s.map(function(c){ return t(c === "K" ? "gKopf" : "gZahl"); }).join("");
    var r = { B: t("gBube"), D: t("gDame"), K: t("gKoenig"), A: t("gAss") }[o.r] || o.r; return o.f + r;
  }
  function gSetzeEv(k){ gEv = k; var f = GEXP[gExp].ev[k]; gWahl = {}; GEXP[gExp].omega().forEach(function(o){ if(f(o)) gWahl[o.id] = 1; }); grund(); }
  function grund(){
    var E = GEXP[gExp], O = E.omega(), n = O.length, k = O.filter(function(o){ return gWahl[o.id]; }).length;
    var box = $("gEvents"); box.innerHTML = "";
    Object.keys(E.ev).forEach(function(x){ var b = document.createElement("button"); b.type = "button"; b.textContent = t("ge_" + gExp + "_" + x); b.setAttribute("aria-pressed", x === gEv ? "true" : "false"); b.addEventListener("click", function(){ gSetzeEv(x); }); box.appendChild(b); });
    var h = "";
    if(gExp === "zwei"){
      h = '<table class="gTab"><tr><th></th>' + [1, 2, 3, 4, 5, 6].map(function(b){ return "<th>" + GW[b - 1] + "</th>"; }).join("") + "</tr>";
      for(var a = 1; a <= 6; a++){ h += "<tr><th>" + GW[a - 1] + "</th>"; for(var b = 1; b <= 6; b++){ var id = a + "-" + b; h += '<td><button type="button" class="gErg' + (gWahl[id] ? " an" : "") + '" data-id="' + id + '">' + (a + b) + "</button></td>"; } h += "</tr>"; }
      h += "</table>";
    } else h = O.map(function(o){ return '<button type="button" class="gErg ' + gExp + (gWahl[o.id] ? " an" : "") + (gExp === "karten" && (o.f === "♥" || o.f === "♦") ? " rotK" : "") + '" data-id="' + o.id + '">' + gText(gExp, o) + "</button>"; }).join("");
    $("gOmega").innerHTML = h;
    $("gOmega").querySelectorAll(".gErg").forEach(function(b){ b.addEventListener("click", function(){ var id = b.dataset.id; if(gWahl[id]) delete gWahl[id]; else gWahl[id] = 1; gEv = null; grund(); }); });
    var P = F(k, n), Q = F(n - k, n);
    var el = function(o){ return gExp === "zwei" ? "(" + o.a + "|" + o.b + ")" : gExp === "wuerfel" ? String(o.w) : gText(gExp, o); };
    var menge = function(L){ if(!L.length) return "{ } = ∅"; var s = L.length <= 12 ? L.map(el) : L.slice(0, 4).map(el).concat(["…"], L.slice(-2).map(el)); return "{" + s.join(", ") + "}"; };
    var EL2 = O.filter(function(o){ return gWahl[o.id]; }), NL = O.filter(function(o){ return !gWahl[o.id]; });
    $("gErgebnis").innerHTML = [["Ω", O, n], ["E", EL2, k], ["Ē", NL, n - k]].map(function(r){ return "<div>" + bdi("<b>" + r[0] + "</b> = " + menge(r[1])) + ' <span class="anz">' + bdi("|" + r[0] + "| = " + r[2]) + "</span></div>"; }).join("");
    $("gP").innerHTML = (bdi("P(E) = |E| : |Ω| = " + k + "/" + n + (P.d !== n ? " = " + fmt(P, "bruch") : "") + " = " + fmt(P, "dezimal") + " = " + fmt(P, "prozent")) + "<br>" + bdi("P(Ē) = 1 − P(E) = " + fmt(Q, "bruch") + " = " + fmt(Q, "prozent"))).replace(/= ≈/g, "≈");
    $("gText").textContent = t("gt_" + gExp); $("gEvText").textContent = t("gEvL"); $("gMerke").innerHTML = t("gMerke"); $("gZeichen").innerHTML = t("gZeichen"); $("tGExp").textContent = t("versuch");
  }
  // ---------- Begriffe (Daten in begriffe.js) ----------
  function begriffe(){
    var B = WB[lang] || WB.de, q = $("bSuche").value.trim().toLowerCase(), h = "", treffer = 0;
    var formel = function(s){ return s.replace(/ %/g, "\u00a0%").replace(/\$([^$]+)\$/g, function(m, f){ return bdi(f); }); };
    B.gruppen.forEach(function(g){
      var E = g[1].filter(function(e){ return !q || (e[0] + " " + e[1] + " " + e[2] + " " + e[3]).replace(/<[^>]+>/g, "").toLowerCase().indexOf(q) >= 0; });
      if(!E.length) return; treffer += E.length;
      h += '<h2 class="bGruppe">' + g[0] + '</h2><div class="bGrid">' + E.map(function(e){
        return '<div class="bKarte"><div class="bKopf">' + (e[0] ? '<span class="bSym">' + bdi(e[0]) + "</span>" : "") + '<span class="bName">' + e[1] + '</span></div><p class="bText">' + formel(e[2]) + '</p><p class="bBsp"><b>' + B.bsp + "</b> " + formel(e[3]) + "</p></div>";
      }).join("") + "</div>";
    });
    $("bListe").innerHTML = treffer ? h : '<p class="muted">' + B.nichts + "</p>";
    $("bIntro").textContent = B.intro; $("bSuche").placeholder = B.suche; $("bSuche").setAttribute("aria-label", B.suche);
  }
  $("bSuche").addEventListener("input", begriffe);
  $("gExp").addEventListener("change", function(){ gExp = $("gExp").value; gSetzeEv(Object.keys(GEXP[gExp].ev)[0]); });
  // Laplace-Aufgabe für den Üben-Reiter
  function neueLaplace(){
    var ex = wahl(Object.keys(GEXP)), evs = Object.keys(GEXP[ex].ev), ev = wahl(evs), O = GEXP[ex].omega(), k = O.filter(GEXP[ex].ev[ev]).length;
    auf = { typ: "lap", ex: ex, ev: ev, k: k, n: O.length, l: F(k, O.length) }; zeige();
  }
  function pruefeLap(v){
    var ok = Math.abs(v - num(auf.l)) <= 0.005; beantwortet = true; anzahl++; if(ok) punkte++;
    var lt = fmt(auf.l, "bruch") + " = " + fmt(auf.l, "prozent");
    var m = $("meldung"); m.className = "meldung " + (ok ? "gut" : "schlecht"); m.innerHTML = ok ? t("richtig") + " " + bdi(lt) : t("falsch", { l: bdi(lt) });
    $("uLauf").innerHTML = "<li>" + t("lapWeg", { k: auf.k, n: auf.n }) + " " + bdi("P = " + auf.k + "/" + auf.n + " = " + fmt(auf.l, "bruch")) + "</li>"; sicht($("uLauf"), true);
    $("punkte").textContent = t("punkte", { p: punkte, n: anzahl });
  }

  // ---------- Reiter Vierfeldertafel & bedingte Wahrscheinlichkeit ----------
  // Merkmale A/Ā (Zeilen) und B/B̄ (Spalten). Eingabe: P(A), P(B|A), P(B|Ā).
  // Tafel M[r][c]: r = A, Ā, Summe; c = B, B̄, Summe.
  var VPRESET = { med: ["1 %", "95 %", "10 %", 10000], regen: ["30 %", "40 %", "10 %", 1000], sport: ["60 %", "70 %", "40 %", 1000], eigen: ["1/4", "1/2", "1/3", 1000] };
  var vPreset = "med", vFormat = "prozent", vAnsicht = "p", vFrage = "A|B";
  var SYM = { A: "A", nA: "Ā", B: "B", nB: "B̄" }, ZEILE = { A: 0, nA: 1 }, SPALTE = { B: 0, nB: 1 };
  var FRAGEN = ["B|A", "B|nA", "nB|A", "nB|nA", "A|B", "nA|B", "A|nB", "nA|nB"];
  function sicher(a){ return a && Number.isSafeInteger(a.n) && Number.isSafeInteger(a.d) && a.d > 0; }
  function addL(a, b){ var g = ggt(a.d, b.d), L = a.d / g * b.d; return F(a.n * (L / a.d) + b.n * (L / b.d), L); }
  function mulK(a, b){ var g1 = ggt(a.n, b.d), g2 = ggt(b.n, a.d); return F((a.n / g1) * (b.n / g2), (a.d / g2) * (b.d / g1)); }
  function div(a, b){ if(!b || b.n === 0) return null; var g1 = ggt(a.n, b.n), g2 = ggt(a.d, b.d); return F((a.n / g1) * (b.d / g2), (a.d / g2) * (b.n / g1)); }
  function gleichB(a, b){ return a.n === b.n && a.d === b.d; }
  function vf(a, f){ f = f || vFormat; if(sicher(a)) return fmt(a, f); return f === "prozent" ? "≈ " + zahl(num(a) * 100, 2) + " %" : "≈ " + zahl(num(a), 4); }
  function vLies(s){ var r = liesBruch(s); if(!r) return null; if(r.d > 10000) r = F(Math.round(num(r) * 10000), 10000); return r; }
  function vName(k, pr){ return t((pr || vPreset) + "_" + k); }
  function istA(k){ return k === "A" || k === "nA"; }
  function zelle(x, y){ var a = istA(x) ? x : y, b = istA(x) ? y : x; return [ZEILE[a], SPALTE[b]]; }
  function randZelle(y){ return istA(y) ? [ZEILE[y], 2] : [2, SPALTE[y]]; }
  function schnitt(x, y){ var a = istA(x) ? x : y, b = istA(x) ? y : x; return SYM[a] + "∩" + SYM[b]; }
  function frageSym(q){ var p = q.split("|"); return "P(" + SYM[p[0]] + " | " + SYM[p[1]] + ")"; }
  function frageName(q, pr){ var p = q.split("|"); return "P(" + vName(p[0], pr) + " | " + vName(p[1], pr) + ")"; }
  function tafelHTML(M, o){ // o: {pr, wert(v, r, c), zaehler, nenner, luecke}
    function mark(r, c){ var k = []; if(r === 2 || c === 2) k.push(r === 2 && c === 2 ? "gesamt" : "summe");
      if(o.zaehler && o.zaehler[0] === r && o.zaehler[1] === c) k.push("zaehler");
      if(o.nenner && o.nenner[0] === r && o.nenner[1] === c) k.push("nenner");
      if(o.luecke && o.luecke[0] === r && o.luecke[1] === c) k.push("luecke");
      return k.length ? ' class="' + k.join(" ") + '"' : ""; }
    function kopf(k){ return "<th><b>" + SYM[k] + "</b><br><span>" + vName(k, o.pr) + "</span></th>"; }
    var h = "<tr><th></th>" + kopf("B") + kopf("nB") + "<th><b>Σ</b></th></tr>";
    ["A", "nA", null].forEach(function(z, r){
      h += "<tr>" + (z ? kopf(z) : "<th><b>Σ</b></th>");
      for(var c = 0; c < 3; c++) h += "<td" + mark(r, c) + ">" + (o.luecke && o.luecke[0] === r && o.luecke[1] === c ? "?" : bdi(o.wert(M[r][c], r, c))) + "</td>";
      h += "</tr>";
    });
    return h;
  }
  var V = null;
  function vRechnen(){
    var pa = vLies($("vPA").value), pba = vLies($("vPBA").value), pbna = vLies($("vPBnA").value);
    if(!pa || !pba || !pbna){ $("vFehler").textContent = t("vFehler"); return null; }
    $("vFehler").textContent = "";
    var eins = F(1), na = sub(eins, pa);
    var M = [[mulK(pa, pba), mulK(pa, sub(eins, pba)), pa], [mulK(na, pbna), mulK(na, sub(eins, pbna)), na], [null, null, eins]];
    M[2][0] = addL(M[0][0], M[1][0]); M[2][1] = addL(M[0][1], M[1][1]);
    return { pa: pa, pba: pba, pbna: pbna, M: M };
  }
  function vExp(erst, p1, bed){
    var zw = erst === "A" ? "B" : "A";
    return { stufen: 2, stufe: function(i, pfad){
      var L = i === 0 ? [{ k: erst, p: p1 }, { k: "n" + erst, p: sub(F(1), p1) }] : (function(){ var q = bed[pfad[0].k]; return q ? [{ k: zw, p: q }, { k: "n" + zw, p: sub(F(1), q) }] : []; })();
      return L.filter(function(o){ return o.p.n > 0; });
    } };
  }
  function vWert(N){ return function(v){ return vAnsicht === "n" ? zahl(num(v) * N, 2) : vf(v); }; }
  function vier(){
    var R = vRechnen(); V = R;
    var N = Number($("vN").value);
    sicht($("vNBox"), vAnsicht === "n");
    var pr = function(a){ return sicher(a) ? fmt(a, "prozent").replace("≈ ", "") : zahl(num(a) * 100, 2) + " %"; };
    $("vKontext").innerHTML = R ? t(vPreset + "_ctx", { pa: bdi(pr(R.pa)), pba: bdi(pr(R.pba)), pbna: bdi(pr(R.pbna)) }) : t(vPreset + "_ctx", { pa: "?", pba: "?", pbna: "?" });
    $("vLegende").innerHTML = ["A", "nA", "B", "nB"].map(function(k){ return "<b>" + SYM[k] + "</b> = " + vName(k); }).join(" · ");
    if(!R){ ["vTab", "vRechnung", "vDeutung", "vUnab"].forEach(function(id){ $(id).innerHTML = ""; }); leer($("vBaum1")); leer($("vBaum2")); sicht($("vBayes"), false); return; }
    var M = R.M, q = vFrage.split("|"), x = q[0], y = q[1], zc = zelle(x, y), nc = randZelle(y);
    $("vTab").innerHTML = tafelHTML(M, { wert: vWert(N), zaehler: zc, nenner: nc });
    // bedingte Wahrscheinlichkeit
    var zae = M[zc[0]][zc[1]], nen = M[nc[0]][nc[1]], p = div(zae, nen);
    var kopfQ = frageSym(vFrage) + (vPreset === "eigen" ? "" : " = " + frageName(vFrage));
    var h = bdi(kopfQ) + "<br>";
    if(!p) h += bdi(frageSym(vFrage) + " : ") + t("vNichtDef", { y: vName(y) });
    else if(vAnsicht === "n") h += bdi(frageSym(vFrage) + ' = <span class="zT">' + zahl(num(zae) * N, 2) + '</span> : <span class="nT">' + zahl(num(nen) * N, 2) + "</span> = " + vf(p));
    else h += bdi(frageSym(vFrage) + ' = <span class="zT">P(' + schnitt(x, y) + ")</span> : " + '<span class="nT">P(' + SYM[y] + ")</span> = " + vf(zae) + " : " + vf(nen) + " = " + vf(p));
    $("vRechnung").innerHTML = h.replace(/= ≈/g, "≈").replace(/ %/g, "\u00a0%").replace(/≈ /g, "≈\u00a0");
    $("vDeutung").innerHTML = !p ? "" : vAnsicht === "n" ? t("vDeutungN", { y: vName(y), x: vName(x), ny: bdi(zahl(num(nen) * N, 2)), nxy: bdi(zahl(num(zae) * N, 2)), p: bdi(vf(p)) }) : t("vDeutung", { y: vName(y), x: vName(x), p: bdi(vf(p)) });
    var bay = vPreset === "med" && vFrage === "A|B" && p;
    sicht($("vBayes"), !!bay);
    if(bay) $("vBayes").innerHTML = t("vBayes", { pba: bdi(pr(R.pba)), p: bdi(vf(p, "prozent")) });
    // Bäume
    var pB = M[2][0], bedA = { A: R.pba, nA: R.pbna }, bedB = {};
    if(pB.n > 0) bedB.B = div(M[0][0], pB);
    if(M[2][1].n > 0) bedB.nB = div(M[0][1], M[2][1]);
    var E1 = vExp("A", R.pa, bedA), E2 = vExp("B", pB, bedB);
    zeichneBaum($("vBaum1"), baumBauen(E1), { stufen: 2, format: vFormat, f: vf });
    zeichneBaum($("vBaum2"), baumBauen(E2), { stufen: 2, format: vFormat, f: vf });
    // Unabhängigkeit
    var prod = mulK(M[0][2], M[2][0]), un = gleichB(M[0][0], prod);
    $("vUnab").innerHTML = bdi("P(A∩B) = " + vf(M[0][0]) + (un ? " = " : " ≠ ") + "P(A) · P(B) = " + vf(M[0][2]) + " · " + vf(M[2][0]) + " = " + vf(prod)) + "<br>" +
      bdi("P(B | A) = " + vf(R.pba) + (un ? " = " : " ≠ ") + "P(B) = " + vf(M[2][0])) + "<br>" + t(un ? "vUnab" : "vAbh");
    $("vUnab").innerHTML = $("vUnab").innerHTML.replace(/= ≈/g, "≈");
  }
  function vierTexte(){
    $("tVPreset").textContent = t("vBeispiel");
    $("vPreset").innerHTML = ["med", "regen", "sport", "eigen"].map(function(k){ return '<option value="' + k + '">' + t("vp_" + k) + "</option>"; }).join(""); $("vPreset").value = vPreset;
    $("vFormat").querySelectorAll("button").forEach(function(b){ b.textContent = t("f_" + b.dataset.f); });
    $("vAnsicht").querySelectorAll("button").forEach(function(b){ b.textContent = t(b.dataset.a === "p" ? "vAnteile" : "vAnzahl"); });
    $("tVN").textContent = t("vN");
    $("vTafelH").textContent = t("vTafelH"); $("vErkl").textContent = t("vErkl");
    $("vBedH").textContent = t("vBedH"); $("tVFrage").textContent = t("vFrageL"); $("vFormelErkl").textContent = t("vFormel");
    $("vFrage").innerHTML = FRAGEN.map(function(q){ return '<option value="' + q + '">' + frageSym(q) + (vPreset === "eigen" ? "" : " – " + frageName(q)) + "</option>"; }).join(""); $("vFrage").value = vFrage;
    $("vBaumH").textContent = t("vBaumH"); $("tVBaum1").textContent = t("vBaum1"); $("tVBaum2").textContent = t("vBaum2"); $("vBaumErkl").textContent = t("vBaumErkl");
    $("vUnabH").textContent = t("vUnabH");
  }
  function vSetzePreset(k){
    vPreset = k; var P = VPRESET[k];
    var z = function(s){ return komma() ? s.replace(".", ",") : s; };
    $("vPA").value = z(P[0]); $("vPBA").value = z(P[1]); $("vPBnA").value = z(P[2]); $("vN").value = String(P[3]);
  }
  $("vPreset").addEventListener("change", function(){ vSetzePreset($("vPreset").value); vierTexte(); vier(); });
  ["vPA", "vPBA", "vPBnA"].forEach(function(id){ $(id).addEventListener("input", vier); });
  $("vN").addEventListener("change", vier);
  $("vFrage").addEventListener("change", function(){ vFrage = $("vFrage").value; vier(); });
  $("vFormat").querySelectorAll("button").forEach(function(b){ b.addEventListener("click", function(){ vFormat = b.dataset.f; $("vFormat").querySelectorAll("button").forEach(function(x){ x.setAttribute("aria-pressed", x === b ? "true" : "false"); }); vier(); }); });
  $("vAnsicht").querySelectorAll("button").forEach(function(b){ b.addEventListener("click", function(){ vAnsicht = b.dataset.a; $("vAnsicht").querySelectorAll("button").forEach(function(x){ x.setAttribute("aria-pressed", x === b ? "true" : "false"); }); vier(); }); });
  vSetzePreset("med");

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
    // ohne gewähltes Ereignis wären alle Knöpfe gesperrt → erstes Ereignis vorwählen
    if(!gewaehlt().length && EL.length) setzeEreignis(EL[0], true);
    var G = gewaehlt(), S = summe(G);
    ereigKnoepfe($("simEreignisse"), false);
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
  function neueVier(){
    var pr = wahl(["med", "regen", "sport"]), n = wahl([100, 200, 400]), nA = zuf(Math.round(n * 0.2), Math.round(n * 0.7)), nnA = n - nA;
    var a = zuf(Math.max(1, Math.round(nA * 0.1)), nA - 1), c = zuf(Math.max(1, Math.round(nnA * 0.1)), nnA - 1);
    var M = [[a, nA - a, nA], [c, nnA - c, nnA], [a + c, n - a - c, n]], typ = wahl(["luecke", "bed", "bed"]);
    auf = { typ: "vier", art: typ, pr: pr, M: M, n: n };
    if(typ === "luecke"){
      var Z = [[0, 0], [0, 1], [1, 0], [1, 1], [0, 2], [1, 2], [2, 0], [2, 1]], z = wahl(Z);
      // zwei Felder verdecken wäre zu schwer: nur eines, Rest bekannt
      auf.luecke = z; auf.l = M[z[0]][z[1]];
    } else {
      var q = wahl(FRAGEN), qq = q.split("|");
      auf.q = q; auf.zc = zelle(qq[0], qq[1]); auf.nc = randZelle(qq[1]);
      auf.l = F(M[auf.zc[0]][auf.zc[1]], M[auf.nc[0]][auf.nc[1]]);
    }
    zeige();
  }
  function vierAuftrag(){
    return t("uKtx_" + auf.pr, { n: auf.n }) + " " + (auf.art === "luecke" ? t("aufVierLuecke") : t("aufVierBed", { q: bdi(frageSym(auf.q) + " = " + frageName(auf.q, auf.pr)) }));
  }
  function neueAufgabe(){
    beantwortet = false;
    var zz = Math.random(); if(zz < 0.3) return neueVier(); if(zz < 0.5) return neueLaplace();
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
  function zahlW(v){ return String(v); }
  function zeige(){
    var vt = auf.typ === "vier", lp = auf.typ === "lap";
    $("auftrag").innerHTML = lp ? t("gt_" + auf.ex) + " " + t("aufLap", { e: t("ge_" + auf.ex + "_" + auf.ev) }) : vt ? vierAuftrag() : expText(auf.X) + " " + auf.txt;
    $("meldung").textContent = ""; $("meldung").className = "meldung"; sicht($("uLauf"), false);
    var sv = $("uBaum"); sicht(sv, auf.typ === "pfad"); sicht($("uTafel"), vt);
    if(vt) $("uTafel").innerHTML = '<table class="vt">' + tafelHTML(auf.M, { pr: auf.pr, wert: zahlW, luecke: auf.luecke }) + "</table>";
    if(auf.typ === "pfad") zeichneBaum(sv, auf.B, { stufen: auf.X.stufen, auswahl: auf.aus, verdeckt: true, nurZiel: true });
    var z = $("antwortzeile"); z.innerHTML = "";
    var inp = document.createElement("input"); inp.className = "zahl"; inp.id = "uAntwort"; inp.setAttribute("inputmode", "text"); inp.setAttribute("autocomplete", "off"); inp.placeholder = t("eingabe"); inp.style.width = "130px";
    inp.addEventListener("keydown", function(e){ if(e.key === "Enter") pruefe(inp.value); });
    var pb = document.createElement("button"); pb.type = "button"; pb.className = "knopf"; pb.id = "pruefen"; pb.textContent = t("pruefen"); pb.addEventListener("click", function(){ pruefe(inp.value); });
    var hi = document.createElement("span"); hi.className = "muted"; hi.textContent = vt && auf.art === "luecke" ? t("eingabeZ") : t("eingabeH");
    z.appendChild(inp); z.appendChild(pb); z.appendChild(hi);
    $("weiter").textContent = t("weiter"); $("punkte").textContent = t("punkte", { p: punkte, n: anzahl });
  }
  function pruefeVier(v){
    var lu = auf.art === "luecke", ok = lu ? Math.abs(v - auf.l) < 1e-9 : Math.abs(v - num(auf.l)) <= 0.005;
    beantwortet = true; anzahl++; if(ok) punkte++;
    var lt = lu ? String(auf.l) : fmt(auf.l, "bruch") + " ≈ " + zahl(num(auf.l) * 100, 2) + " %";
    var m = $("meldung"); m.className = "meldung " + (ok ? "gut" : "schlecht"); m.innerHTML = ok ? t("richtig") + " " + bdi(lt) : t("falsch", { l: bdi(lt) });
    var M = auf.M, L = [];
    if(lu){
      var r = auf.luecke[0], c = auf.luecke[1], f;
      if(c === 2) f = M[r][0] + " + " + M[r][1];
      else if(r === 2) f = M[0][c] + " + " + M[1][c];
      else f = M[r][2] + " − " + M[r][1 - c];
      L.push(t("lueckeRech") + " " + bdi(f + " = " + auf.l));
      $("uTafel").innerHTML = '<table class="vt">' + tafelHTML(M, { pr: auf.pr, wert: zahlW, zaehler: auf.luecke }) + "</table>";
    } else {
      var qq = auf.q.split("|"), z = M[auf.zc[0]][auf.zc[1]], nn = M[auf.nc[0]][auf.nc[1]];
      L.push(t("bedRech", { y: vName(qq[1], auf.pr) }) + " " + bdi(frageSym(auf.q) + ' = <span class="zT">' + z + '</span> : <span class="nT">' + nn + "</span> = " + fmt(auf.l, "bruch") + " ≈ " + zahl(num(auf.l) * 100, 2) + " %"));
      $("uTafel").innerHTML = '<table class="vt">' + tafelHTML(M, { pr: auf.pr, wert: zahlW, zaehler: auf.zc, nenner: auf.nc }) + "</table>";
    }
    $("uLauf").innerHTML = L.map(function(s){ return "<li>" + s + "</li>"; }).join(""); sicht($("uLauf"), true);
    $("punkte").textContent = t("punkte", { p: punkte, n: anzahl });
  }
  function pruefe(e){
    if(beantwortet) return;
    var v = liesWert(e); if(!isFinite(v)) return;
    if(auf.typ === "vier") return pruefeVier(v);
    if(auf.typ === "lap") return pruefeLap(v);
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
  var tab = "grund";
  function zeigeTab(k){
    tab = k;
    document.querySelectorAll(".tabs button").forEach(function(b){ b.setAttribute("aria-selected", b.dataset.tab === k ? "true" : "false"); });
    ["grund", "begr", "baum", "vier", "sim", "ueben"].forEach(function(x){ sicht($("s_" + x), x === k); });
    sicht($("eingabe"), k === "baum" || k === "sim");
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
    if(!nurRechnen){ vierTexte(); $("gExp").innerHTML = Object.keys(GEXP).map(function(x){ return '<option value="' + x + '">' + t("gx_" + x) + "</option>"; }).join(""); $("gExp").value = gExp; }
    if(tab === "grund") grund(); else if(tab === "begr") begriffe(); else if(tab === "baum") baum(); else if(tab === "sim") simZeigen(); else if(tab === "vier") vier();
    if(!nurRechnen && auf){
      var war = beantwortet, eing = $("uAntwort") ? $("uAntwort").value : null, gut = $("meldung").classList.contains("gut");
      if(auf.typ === "vier" || auf.typ === "lap"){ /* Auftrag wird in zeige() neu beschriftet */ }
      else if(auf.ev){ var ev = ereignisse(auf.X).filter(function(x){ return x.id === auf.ev.id; })[0]; if(ev){ auf.ev = ev; auf.txt = t("aufEreig", { e: ev.txt }); } }
      else { var bl = auf.B.blaetter.filter(function(b){ return auf.aus[b.key]; })[0]; auf.txt = t("aufPfad", { p: pfadText(bl.pfad) }); }
      zeige();
      if(war){ beantwortet = false; anzahl--; if(gut) punkte--; pruefe(eing || "-1"); }
    }
  }
  window.MS_LANG = { apply: function(l){ if(WT[l]){ lang = l; alles(); } } };
  $("versuch").innerHTML = '<option value="muenze">muenze</option>';
  sicht($("eingabe"), false); gSetzeEv("gerade");
  alles();
})();
