// ============================================================
// rechengesetze/app.js – Rechengesetze & Rechenreihenfolge (Klasse 5–7)
// Reiter:
//  - Reihenfolge: Regeln (Klammer → Potenz → Punkt → Strich, links nach rechts)
//    und ein Rechner, der jede Rechnung Schritt für Schritt auflöst. Der gerade
//    gerechnete Teil wird farbig markiert (Klammer violett, Potenz türkis,
//    Punkt gold, Strich blau) und die Regel dazugeschrieben.
//  - Rechengesetze: Kommutativ- (Punktfeld drehen), Assoziativ- (Streifen),
//    Distributivgesetz (Rechteck in zwei Teilen), Gegenbeispiele für − und :,
//    geschickt rechnen.
//  - Typische Fehler: falsch / richtig mit Erklärung, Knopf öffnet den Rechner.
//  - Üben: Ausrechnen (3 Stufen), Was zuerst? (Rechenzeichen antippen),
//    Welches Gesetz?, Geschickt rechnen; zwei Versuche (msTippbar/msNochmal).
// Rechnen exakt mit Brüchen (Fr). Texte: texte.js (RG), Sprache aus dem Startmenü (MS_LANG).
// Einstellungen in localStorage "msRG".
// ============================================================
(function(){
  "use strict";
  var lang = "de";
  function $(id){ return document.getElementById(id); }
  function t(k, v){ var s = (RG[lang] && RG[lang][k]) || RG.de[k] || k; if(v) for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function sicht(e, an){ if(an) e.removeAttribute("hidden"); else e.setAttribute("hidden", ""); }
  function zuf(a, b){ return a + Math.floor(Math.random() * (b - a + 1)); }
  function wahl(L){ return L[Math.floor(Math.random() * L.length)]; }
  var EIN = {}; try { EIN = JSON.parse(localStorage.getItem("msRG") || "{}") || {}; } catch(e){}
  function merken(){ try { localStorage.setItem("msRG", JSON.stringify(EIN)); } catch(e){} }

  // ---------- Brüche ----------
  function ggt(a, b){ a = Math.abs(a); b = Math.abs(b); while(b){ var r = a % b; a = b; b = r; } return a || 1; }
  function Fr(n, d){ if(d === undefined) d = 1; if(d < 0){ n = -n; d = -d; } var g = ggt(n, d); return { n: n / g, d: d / g }; }
  function zu(f){ if(!isFinite(f.n) || !isFinite(f.d) || Math.abs(f.n) > 1e12 || f.d > 1e12) throw "gross"; return f; }
  var OPS = {
    "+": function(a, b){ return zu(Fr(a.n * b.d + b.n * a.d, a.d * b.d)); },
    "−": function(a, b){ return zu(Fr(a.n * b.d - b.n * a.d, a.d * b.d)); },
    "·": function(a, b){ return zu(Fr(a.n * b.n, a.d * b.d)); },
    ":": function(a, b){ if(b.n === 0) throw "null"; return zu(Fr(a.n * b.d, a.d * b.n)); },
    "^": function(a, b){ if(b.d !== 1 || b.n < 0 || b.n > 10) throw "hoch"; var r = Fr(1); for(var i = 0; i < b.n; i++) r = OPS["·"](r, a); return r; }
  };
  function komma(){ return lang === "en" || lang === "zh" || lang === "ja" ? "." : ","; }
  function zahlTxt(f){ // als Text (für Lösungen und Vergleiche)
    if(f.d === 1) return (f.n < 0 ? "−" : "") + Math.abs(f.n);
    var d = f.d, k = 0; while(d % 2 === 0){ d /= 2; k++; } var k5 = 0; while(d % 5 === 0){ d /= 5; k5++; }
    if(d === 1 && Math.max(k, k5) <= 4){ var s = (Math.abs(f.n) / f.d).toFixed(Math.max(k, k5)).replace(".", komma()); return (f.n < 0 ? "−" : "") + s; }
    return (f.n < 0 ? "−" : "") + Math.abs(f.n) + "/" + f.d;
  }
  function zahlHtml(f){
    if(f.d === 1 || /^[−\d.,]+$/.test(zahlTxt(f))) return esc(zahlTxt(f));
    return (f.n < 0 ? "−" : "") + '<span class="msf-br"><span>' + Math.abs(f.n) + "</span><span>" + f.d + "</span></span>";
  }

  // ---------- Einlesen ----------
  // Knoten: {t:"num", v} | {t:"op", o, a, b, id} | {t:"neg", a, id} | {t:"par", a, eck}
  var naechsteId = 1;
  function lex(s){
    s = s.replace(/[×*xX]/g, "·").replace(/[÷/]/g, ":").replace(/[-–—]/g, "−").replace(/\s+/g, "")
      .replace(/²/g, "^2").replace(/³/g, "^3");
    var T = [], i = 0;
    while(i < s.length){
      var c = s[i];
      if(/[0-9]/.test(c) || ((c === "," || c === ".") && /[0-9]/.test(s[i + 1] || ""))){
        var m = s.slice(i).match(/^[0-9]*(?:[.,][0-9]+)?/)[0]; i += m.length;
        var p = m.replace(",", ".").split("."), d = p[1] ? Math.pow(10, p[1].length) : 1;
        T.push({ k: "z", v: Fr(Number((p[0] || "0") + (p[1] || "")), d) }); continue;
      }
      if("+−·:^()[]".indexOf(c) >= 0){ T.push({ k: c }); i++; continue; }
      throw "syntax";
    }
    return T;
  }
  function parse(s){
    var T = lex(s), p = 0;
    function sieh(){ return T[p] && T[p].k; }
    function summe(){ var a = produkt(); while(sieh() === "+" || sieh() === "−"){ var o = T[p++].k; a = { t: "op", o: o, a: a, b: produkt(), id: naechsteId++ }; } return a; }
    function produkt(){ var a = vorzeichen(); while(sieh() === "·" || sieh() === ":"){ var o = T[p++].k; a = { t: "op", o: o, a: a, b: vorzeichen(), id: naechsteId++ }; } return a; }
    function vorzeichen(){ if(sieh() === "−"){ p++; var a = vorzeichen(); if(a.t === "num") return { t: "num", v: Fr(-a.v.n, a.v.d) }; return { t: "neg", a: a, id: naechsteId++ }; } if(sieh() === "+"){ p++; return vorzeichen(); } return potenz(); }
    function potenz(){ var a = basis(); if(sieh() === "^"){ p++; var b = vorzeichen(); return { t: "op", o: "^", a: a, b: b, id: naechsteId++ }; } return a; }
    function basis(){
      var k = sieh();
      if(k === "z"){ return { t: "num", v: T[p++].v }; }
      if(k === "(" || k === "["){ p++; var a = summe(), zu = k === "(" ? ")" : "]"; if(sieh() !== zu) throw "syntax"; p++; if(a.t === "num") return a; return { t: "par", a: a, eck: k === "[" }; }
      throw "syntax";
    }
    var r = summe(); if(p !== T.length) throw "syntax"; return r;
  }

  // ---------- Schritt für Schritt ----------
  var KLASSE = { "^": 3, "neg": 2, "·": 1, ":": 1, "+": 0, "−": 0 };
  function istZahl(n){ return n.t === "num"; }
  // reduzierbare Knoten mit Tiefe (Anzahl Klammern darüber) und Position (in Lesereihenfolge)
  function kandidaten(n){
    var L = [], pos = 0;
    (function geh(x, tiefe){
      if(x.t === "num"){ pos++; return; }
      if(x.t === "par"){ geh(x.a, tiefe + 1); return; }
      if(x.t === "neg"){ var p0 = pos; geh(x.a, tiefe); if(istZahl(x.a)) L.push({ n: x, tiefe: tiefe, kl: KLASSE.neg, pos: p0 }); return; }
      geh(x.a, tiefe); var p1 = pos; geh(x.b, tiefe);
      if(istZahl(x.a) && istZahl(x.b)) L.push({ n: x, tiefe: tiefe, kl: KLASSE[x.o], pos: p1 });
    })(n, 0);
    return L;
  }
  function besterKand(L){
    var b = null;
    L.forEach(function(k){ if(!b || k.tiefe > b.tiefe || (k.tiefe === b.tiefe && (k.kl > b.kl || (k.kl === b.kl && k.pos < b.pos)))) b = k; });
    return b;
  }
  // alle gleichwertig „ersten“ Schritte (für „Was zuerst?“): gleiche Tiefe und Klasse.
  // Reduzierbare Rechnungen haben nur Zahlen als Kinder – sie hängen also nie voneinander ab
  // (bei 12 : 3 · 2 ist nur 12 : 3 reduzierbar).
  function ersteMoeglich(baum){
    var L = kandidaten(baum), b = besterKand(L); if(!b) return [];
    return L.filter(function(k){ return k.tiefe === b.tiefe && k.kl === b.kl; }).map(function(k){ return k.n.id; });
  }
  function ersetze(x, ziel, neu){
    if(x === ziel) return neu;
    if(x.t === "num") return x;
    if(x.t === "par"){ var a = ersetze(x.a, ziel, neu); return istZahl(a) ? a : { t: "par", a: a, eck: x.eck }; }
    if(x.t === "neg"){ var na = ersetze(x.a, ziel, neu); return istZahl(na) ? { t: "num", v: Fr(-na.v.n, na.v.d) } : { t: "neg", a: na, id: x.id }; }
    return { t: "op", o: x.o, a: ersetze(x.a, ziel, neu), b: ersetze(x.b, ziel, neu), id: x.id };
  }
  function rechne(k){ var x = k.n; return x.t === "neg" ? Fr(-x.a.v.n, x.a.v.d) : OPS[x.o](x.a.v, x.b.v); }
  function regelVon(k, baum){
    if(k.tiefe > 0) return ["kl", t("k_kl")];
    if(k.kl === 3) return ["po", t("k_po")];
    if(k.kl === 2) return ["st", t("k_vz")];
    var nStrich = 0, nPunkt = 0;
    kandidatenAlle(baum).forEach(function(o){ if(o.o === "+" || o.o === "−") nStrich++; else if(o.o === "·" || o.o === ":") nPunkt++; });
    if(k.kl === 1) return ["pu", nStrich ? t("k_pu") : nPunkt > 1 ? t("k_lr") : t("f_pu")];
    return ["st", nStrich > 1 ? t("k_lr") : t("k_st")];
  }
  function kandidatenAlle(n){ var L = []; (function g(x){ if(!x || x.t === "num") return; if(x.t === "op") L.push(x); g(x.a); if(x.b) g(x.b); })(n); return L; }
  // HTML eines Terms; mark = Knoten, der markiert wird (Klasse kls)
  function html(x, mark, kls, ctx){
    ctx = ctx || {};
    var h;
    if(x.t === "num"){
      h = zahlHtml(x.v);
      if((x.v.n < 0 && !ctx.links) || (ctx.basis && (x.v.n < 0 || x.v.d !== 1))) h = "(" + h + ")";
    } else if(x.t === "par"){
      h = (x.eck ? "[" : "(") + html(x.a, mark, kls, { links: true }) + (x.eck ? "]" : ")");
    } else if(x.t === "neg"){
      h = "−" + html(x.a, mark, kls, { links: true, basis: x.a.t === "neg" });
      if(!ctx.links) h = "(" + h + ")";
    } else if(x.o === "^"){
      h = html(x.a, mark, kls, { basis: true, links: ctx.links }) + "<sup>" + html(x.b, mark, kls, { links: true }) + "</sup>";
    } else {
      var rechts = x.b;
      h = html(x.a, mark, kls, { links: ctx.links }) + " " + x.o + " " + html(rechts, mark, kls, { links: false });
    }
    if(x === mark) h = '<span class="mk mk-' + kls + '">' + h + "</span>";
    return h;
  }
  function loese(baum){
    var S = [], x = baum, n = 0;
    while(!istZahl(x) && n++ < 60){
      var L = kandidaten(x), k = besterKand(L); if(!k) throw "syntax";
      var r = rechne(k), rg = regelVon(k, x);
      S.push({ vor: html(x, k.n, rg[0], { links: true }), regel: rg, teil: html(k.n, null, "", { links: true }), erg: zahlHtml(r) });
      x = ersetze(x, k.n, { t: "num", v: r });
      if(x.t === "par") x = x.a;
    }
    return { S: S, e: x.v };
  }
  function schritteHtml(term){
    naechsteId = 1;
    var b = parse(term), R = loese(b);
    var h = '<table class="schritte"><tbody>';
    R.S.forEach(function(s, i){
      h += '<tr><td class="sz">' + (i ? "= " : "") + '<bdi dir="ltr">' + s.vor + '</bdi></td><td class="sr"><span class="rg rg-' + s.regel[0] + '">' + esc(s.regel[1]) + '</span> <bdi dir="ltr" class="nr">' + s.teil + " = " + s.erg + "</bdi></td></tr>";
    });
    h += '<tr class="end"><td class="sz">= <bdi dir="ltr"><b>' + zahlHtml(R.e) + '</b></bdi></td><td class="sr"><span class="rg rg-ok">' + esc(t("ergebnis")) + "</span></td></tr></tbody></table>";
    return { h: h, e: R.e };
  }
  function fehlerText(e){ return t(e === "null" ? "err_null" : e === "gross" ? "err_gross" : e === "hoch" ? "err_hoch" : "err_syntax"); }

  // ---------- Reiter Reihenfolge ----------
  var BSP = ["2 + 3 · 4", "(2 + 3) · 4", "20 − 8 : 4 · 2", "3 · 2² + (10 − 4) : 3", "100 : 10 : 2", "18 − 6 − 2", "[(4 + 8) : 3 − 1]²", "−3² + (−3)²"];
  function rechner(){
    var v = $("term").value.trim(), out = $("tAus");
    if(!v){ out.innerHTML = ""; return; }
    try { out.innerHTML = schritteHtml(v).h; } catch(e){ out.innerHTML = '<p class="meldung schlecht">' + esc(fehlerText(e)) + "</p>"; }
    EIN.term = v; merken();
  }
  function bspKnoepfe(){
    $("bspL").innerHTML = '<span class="muted">' + esc(t("bsp")) + "</span> " + BSP.map(function(b, i){ return '<button type="button" class="chip" data-b="' + i + '"><bdi dir="ltr">' + esc(b) + "</bdi></button>"; }).join(" ");
  }
  $("bspL").addEventListener("click", function(e){ var b = e.target.closest("[data-b]"); if(!b) return; $("term").value = BSP[+b.dataset.b]; rechner(); });
  $("los").addEventListener("click", rechner);
  $("term").addEventListener("keydown", function(e){ if(e.key === "Enter"){ e.preventDefault(); rechner(); } });
  function rechnerMit(term){ zeigeTab("reihe"); $("term").value = term; rechner(); $("rechnerKarte").scrollIntoView({ behavior: "smooth", block: "start" }); }

  // ---------- Reiter Rechengesetze ----------
  var GZ = { ka: EIN.ka || 3, kb: EIN.kb || 5, gedreht: false, aa: 3, ab: 5, ac: 4, da: 4, db: 5, dc: 3 };
  function svgEl(n, a, txt){ var s = "<" + n; for(var k in a) s += " " + k + '="' + a[k] + '"'; return s + (txt != null ? ">" + txt + "</" + n + ">" : "/>"); }
  function kommBild(){
    var a = GZ.gedreht ? GZ.kb : GZ.ka, b = GZ.gedreht ? GZ.ka : GZ.kb, s = 26, W = Math.max(GZ.ka, GZ.kb) * s + 20;
    var h = '<svg viewBox="0 0 ' + W + " " + W + '" class="gbild" style="max-width:' + Math.min(260, W) + 'px">';
    for(var r = 0; r < a; r++) for(var c = 0; c < b; c++) h += svgEl("circle", { cx: 10 + s / 2 + c * s, cy: 10 + s / 2 + r * s, r: 9, fill: r % 2 ? "#f59e0b" : "#1565c0" });
    return h + "</svg>";
  }
  function gesetze(){
    var a = GZ.ka, b = GZ.kb;
    var hk = '<div class="karte"><h2>' + esc(t("g_komm")) + '</h2><p class="zeile">' + esc(t("g_kommT")) + "</p>" +
      '<p class="regelzeile"><bdi dir="ltr">a + b = b + a</bdi> <span class="muted">·</span> <bdi dir="ltr">a · b = b · a</bdi></p>' +
      '<div class="reihe"><label>a <input type="range" min="1" max="8" value="' + a + '" id="gKa"></label><label>b <input type="range" min="1" max="8" value="' + b + '" id="gKb"></label><button type="button" class="knopf hell" id="gDreh">' + esc(t("g_drehen")) + "</button></div>" +
      '<div class="gzeile"><div id="kommBild">' + kommBild() + '</div><div><p class="zeile">' + esc(t("g_punkte", { a: GZ.gedreht ? b : a, b: GZ.gedreht ? a : b })) + '</p><p class="gross"><bdi dir="ltr">' + a + " · " + b + " = " + (a * b) + " = " + b + " · " + a + '</bdi></p><p class="gross"><bdi dir="ltr">' + a + " + " + b + " = " + (a + b) + " = " + b + " + " + a + "</bdi></p></div></div></div>";
    // Assoziativ: Streifen
    var A = GZ.aa, B = GZ.ab, C = GZ.ac, u = 18, w = (A + B + C) * u + 20;
    function streifen(y, gruppe){
      var h = "", x = 10, F = ["#1565c0", "#f59e0b", "#7c3aed"], N = [A, B, C];
      N.forEach(function(n, i){ h += svgEl("rect", { x: x, y: y, width: n * u - 2, height: 22, rx: 4, fill: F[i] }) + svgEl("text", { x: x + n * u / 2 - 1, y: y + 16, "text-anchor": "middle", fill: "#fff", "font-weight": 700, "font-size": 14 }, n); x += n * u; });
      var g0 = gruppe === 0 ? 10 : 10 + A * u, g1 = gruppe === 0 ? 10 + (A + B) * u - 2 : 10 + (A + B + C) * u - 2;
      h += svgEl("path", { d: "M" + g0 + " " + (y - 4) + " v-6 H" + g1 + " v6", fill: "none", stroke: "#1a2233", "stroke-width": 2 });
      return h;
    }
    var ha = '<div class="karte"><h2>' + esc(t("g_ass")) + '</h2><p class="zeile">' + esc(t("g_assT")) + "</p>" +
      '<p class="regelzeile"><bdi dir="ltr">(a + b) + c = a + (b + c)</bdi> <span class="muted">·</span> <bdi dir="ltr">(a · b) · c = a · (b · c)</bdi></p>' +
      '<div class="reihe"><label>a <input type="range" min="1" max="9" value="' + A + '" id="gAa"></label><label>b <input type="range" min="1" max="9" value="' + B + '" id="gAb"></label><label>c <input type="range" min="1" max="9" value="' + C + '" id="gAc"></label></div>' +
      '<svg viewBox="0 0 ' + w + ' 100" class="gbild" style="max-width:' + Math.min(560, w * 1.3) + 'px">' + streifen(18, 0) + streifen(70, 1) + "</svg>" +
      '<p class="gross"><bdi dir="ltr">(' + A + " + " + B + ") + " + C + " = " + (A + B) + " + " + C + " = " + (A + B + C) + "</bdi></p>" +
      '<p class="gross"><bdi dir="ltr">' + A + " + (" + B + " + " + C + ") = " + A + " + " + (B + C) + " = " + (A + B + C) + "</bdi></p>" +
      '<p class="gross"><bdi dir="ltr">(' + A + " · " + B + ") · " + C + " = " + (A * B) + " · " + C + " = " + (A * B * C) + " = " + A + " · " + (B * C) + " = " + A + " · (" + B + " · " + C + ")</bdi></p></div>";
    // Distributiv: Rechteck
    var da = GZ.da, db = GZ.db, dc = GZ.dc, q = 26, W2 = (db + dc) * q + 60, H2 = da * q + 50;
    var sv = '<svg viewBox="0 0 ' + W2 + " " + H2 + '" class="gbild" style="max-width:' + Math.min(420, W2 * 1.2) + 'px">' +
      svgEl("rect", { x: 40, y: 20, width: db * q, height: da * q, fill: "rgba(21,101,192,.22)", stroke: "#1565c0", "stroke-width": 2 }) +
      svgEl("rect", { x: 40 + db * q, y: 20, width: dc * q, height: da * q, fill: "rgba(245,158,11,.28)", stroke: "#b45309", "stroke-width": 2 }) +
      svgEl("text", { x: 40 + db * q / 2, y: 20 + da * q / 2 + 6, "text-anchor": "middle", "font-size": 16, "font-weight": 700, fill: "#0d3b78" }, da + " · " + db) +
      svgEl("text", { x: 40 + db * q + dc * q / 2, y: 20 + da * q / 2 + 6, "text-anchor": "middle", "font-size": 16, "font-weight": 700, fill: "#7c2d12" }, da + " · " + dc) +
      svgEl("text", { x: 28, y: 20 + da * q / 2 + 6, "text-anchor": "middle", "font-size": 16, "font-weight": 700 }, da) +
      svgEl("text", { x: 40 + db * q / 2, y: 20 + da * q + 20, "text-anchor": "middle", "font-size": 16, "font-weight": 700, fill: "#1565c0" }, db) +
      svgEl("text", { x: 40 + db * q + dc * q / 2, y: 20 + da * q + 20, "text-anchor": "middle", "font-size": 16, "font-weight": 700, fill: "#b45309" }, dc) + "</svg>";
    var hd = '<div class="karte"><h2>' + esc(t("g_dist")) + '</h2><p class="zeile">' + esc(t("g_distT")) + "</p>" +
      '<p class="regelzeile"><bdi dir="ltr">a · (b + c) = a · b + a · c</bdi></p>' +
      '<div class="reihe"><label>a <input type="range" min="1" max="7" value="' + da + '" id="gDa"></label><label>b <input type="range" min="1" max="8" value="' + db + '" id="gDb"></label><label>c <input type="range" min="1" max="8" value="' + dc + '" id="gDc"></label></div>' +
      '<div class="gzeile"><div>' + sv + '</div><div><p class="zeile muted">' + esc(t("g_flaeche")) + '</p><p class="gross"><bdi dir="ltr">' + da + " · (" + db + " + " + dc + ") = " + da + " · " + (db + dc) + " = " + (da * (db + dc)) + '</bdi></p><p class="gross"><bdi dir="ltr">' + da + " · " + db + " + " + da + " · " + dc + " = " + (da * db) + " + " + (da * dc) + " = " + (da * (db + dc)) + "</bdi></p></div></div></div>";
    // gilt nicht
    var hn = '<div class="karte"><h2>' + esc(t("g_nicht")) + '</h2><p class="zeile">' + esc(t("g_nichtT")) + "</p>" +
      '<p class="gross"><bdi dir="ltr">8 − 3 = 5</bdi> <span class="ne">≠</span> <bdi dir="ltr">3 − 8 = −5</bdi></p>' +
      '<p class="gross"><bdi dir="ltr">12 : 4 = 3</bdi> <span class="ne">≠</span> <bdi dir="ltr">4 : 12 = </bdi>' + zahlHtml(Fr(1, 3)) + "</p>" +
      '<p class="gross"><bdi dir="ltr">(10 − 4) − 2 = 4</bdi> <span class="ne">≠</span> <bdi dir="ltr">10 − (4 − 2) = 8</bdi></p>' +
      '<p class="gross"><bdi dir="ltr">(16 : 4) : 2 = 2</bdi> <span class="ne">≠</span> <bdi dir="ltr">16 : (4 : 2) = 8</bdi></p></div>';
    // geschickt rechnen
    var V = [["25 · 17 · 4 = 25 · 4 · 17 = 100 · 17 = 1700", "lab_komm"], ["37 + 48 + 63 = (37 + 63) + 48 = 100 + 48 = 148", "lab_ass"], ["7 · 98 = 7 · (100 − 2) = 700 − 14 = 686", "lab_dist"], ["13 · 6 + 13 · 4 = 13 · (6 + 4) = 13 · 10 = 130", "lab_aus"]];
    var hv = '<div class="karte"><h2>' + esc(t("g_geschickt")) + '</h2><ul class="vorteil">' + V.map(function(v){ return '<li><bdi dir="ltr">' + esc(v[0]) + '</bdi> <span class="lab">' + esc(t(v[1])) + "</span></li>"; }).join("") + "</ul></div>";
    $("gesetzeBox").innerHTML = hk + ha + hd + hn + hv;
    function regler(id, key){ var e = $(id); e.addEventListener("input", function(){ GZ[key] = +e.value; if(key === "ka" || key === "kb"){ EIN[key] = GZ[key]; merken(); } gesetze(); var f = $(id); if(f){ f.focus(); } }); }
    regler("gKa", "ka"); regler("gKb", "kb"); regler("gAa", "aa"); regler("gAb", "ab"); regler("gAc", "ac"); regler("gDa", "da"); regler("gDb", "db"); regler("gDc", "dc");
    $("gDreh").addEventListener("click", function(){
      var bild = $("kommBild").firstChild; bild.classList.add("dreht");
      setTimeout(function(){ GZ.gedreht = !GZ.gedreht; gesetze(); }, 450);
    });
  }

  // ---------- Reiter Typische Fehler ----------
  var FEHLER = [
    ["f1T", "2 + 3 · 4 = 5 · 4 = 20", "2 + 3 · 4 = 2 + 12 = 14", "f1E", "2 + 3 · 4"],
    ["f2T", "−3² = 9", "−3² = −(3 · 3) = −9", "f2E", "−3²"],
    ["f3T", "12 : 3 · 2 = 12 : 6 = 2", "12 : 3 · 2 = 4 · 2 = 8", "f3E", "12 : 3 · 2"],
    ["f4T", "10 − 4 − 2 = 10 − 2 = 8", "10 − 4 − 2 = 6 − 2 = 4", "f4E", "10 − 4 − 2"],
    ["f5T", "2 · 3² = 6² = 36", "2 · 3² = 2 · 9 = 18", "f5E", "2 · 3²"],
    ["f6T", "(2 + 3)² = 2² + 3² = 13", "(2 + 3)² = 5² = 25", "f6E", "(2 + 3)²"]
  ];
  function fehler(){
    $("fehlerBox").innerHTML = FEHLER.map(function(f, i){
      return '<div class="karte fkarte"><h2>' + esc(t(f[0])) + '</h2><p class="fz falsch"><span class="fl">✗ ' + esc(t("f_falsch")) + '</span> <bdi dir="ltr" class="durch">' + esc(f[1]) + '</bdi></p><p class="fz richtig"><span class="fl">✓ ' + esc(t("f_richtig")) + '</span> <bdi dir="ltr">' + esc(f[2]) + '</bdi></p><p class="zeile muted">' + esc(t(f[3])) + '</p><button type="button" class="knopf hell" data-f="' + i + '">' + esc(t("f_rechner")) + "</button></div>";
    }).join("");
  }
  $("fehlerBox").addEventListener("click", function(e){ var b = e.target.closest("[data-f]"); if(b) rechnerMit(FEHLER[+b.dataset.f][4]); });

  // ---------- Reiter Üben ----------
  var U = { typ: EIN.typ || "aus", stufe: EIN.stufe || 1 };
  var auf = null, beantwortet = false, zweiterV = false, punkte = 0, anzahl = 0, serie = 0;
  function einstellungen(){
    var T = [["aus", "u_aus"], ["zuerst", "u_zuerst"], ["gesetz", "u_gesetz"], ["vorteil", "u_vorteil"], ["mix", "u_mix"]];
    $("einst").innerHTML = '<div class="reihe"><b>' + esc(t("u_typ")) + '</b><span class="chips">' + T.map(function(x){ return '<button type="button" class="chip" data-typ="' + x[0] + '" aria-pressed="' + (U.typ === x[0]) + '">' + esc(t(x[1])) + "</button>"; }).join("") + "</span></div>" +
      '<div class="reihe"><b>' + esc(t("u_stufe")) + '</b><span class="chips">' + [1, 2, 3].map(function(s){ return '<button type="button" class="chip" data-st="' + s + '" aria-pressed="' + (U.stufe === s) + '">' + s + " · " + esc(t("s" + s)) + "</button>"; }).join("") + "</span></div>";
  }
  $("einst").addEventListener("click", function(e){
    var b = e.target.closest("button"); if(!b) return;
    if(b.dataset.typ) U.typ = EIN.typ = b.dataset.typ; else if(b.dataset.st) U.stufe = EIN.stufe = +b.dataset.st; else return;
    merken(); einstellungen(); aufraeumen(); neueAufgabe();
  });
  // Terme erzeugen: nur ganze Zahlen in allen Zwischenschritten, Ergebnis in sinnvollem Bereich
  var VORLAGEN = {
    1: ["a + b · c", "a · b + c", "a − b · c", "a · b − c · d", "a + b : c", "a · b + c · d", "a − b : c + d", "a : b + c · d", "a + b · c − d"],
    2: ["(a + b) · c", "a · (b + c)", "(a − b) · c + d", "a · (b − c) + d", "(a + b) : c", "a − (b + c) : d", "(a + b) · (c − d)", "a · b − (c + d)", "[a + (b − c) · d] : e"],
    3: ["a · b² − c", "(a + b)² : c", "a² + b · c", "a · (b − c)²", "a³ − b · c", "(a − b)² + c · d", "[a · (b + c)]² : d", "a² − (b + c) · d", "−a² + b · c"]
  };
  function erzeuge(stufe){
    for(var v = 0; v < 400; v++){
      var vor = wahl(VORLAGEN[stufe]), w = {};
      "abcde".split("").forEach(function(z){ w[z] = stufe === 3 && /[²³]/.test(vor) ? zuf(2, 9) : zuf(2, stufe === 1 ? 12 : 15); });
      var term = vor.replace(/[a-e]/g, function(z){ return w[z]; });
      try {
        naechsteId = 1; var R = loese(parse(term)), ok = R.e.d === 1 && Math.abs(R.e.n) <= (stufe === 3 ? 400 : 200);
        // alle Zwischenergebnisse ganzzahlig, in Stufe 1/2 nicht negativ
        R.S.forEach(function(s){ if(/msf-br/.test(s.erg) || /[.,]/.test(s.erg) || (stufe < 3 && /−/.test(s.erg))) ok = false; });
        if(ok) return term;
      } catch(e){}
    }
    return "2 + 3 · 4";
  }
  var GESETZ = [
    function(){ var a = zuf(2, 20), b = zuf(2, 20); return [a + " + " + b + " = " + b + " + " + a, "komm"]; },
    function(){ var a = zuf(2, 12), b = zuf(2, 12); return [a + " · " + b + " = " + b + " · " + a, "komm"]; },
    function(){ var a = zuf(2, 9), b = zuf(2, 9), c = zuf(2, 9); return ["(" + a + " + " + b + ") + " + c + " = " + a + " + (" + b + " + " + c + ")", "ass"]; },
    function(){ var a = zuf(2, 9), b = zuf(2, 9), c = zuf(2, 9); return ["(" + a + " · " + b + ") · " + c + " = " + a + " · (" + b + " · " + c + ")", "ass"]; },
    function(){ var a = zuf(2, 9), b = zuf(2, 9), c = zuf(2, 9); return [a + " · (" + b + " + " + c + ") = " + a + " · " + b + " + " + a + " · " + c, "dist"]; },
    function(){ var a = zuf(2, 9), b = zuf(6, 12), c = zuf(1, 5); return ["(" + b + " − " + c + ") · " + a + " = " + b + " · " + a + " − " + c + " · " + a, "dist"]; },
    function(){ var a = zuf(2, 15), b = zuf(2, 9), c = zuf(2, 9); return [a + " · " + b + " + " + a + " · " + c + " = " + a + " · (" + b + " + " + c + ")", "dist"]; },
    function(){ var a = zuf(10, 20), b = zuf(2, 9); return [a + " − " + b + " = " + b + " − " + a, "nein"]; },
    function(){ return ["(24 : 4) : 2 = 24 : (4 : 2)", "nein"]; },
    function(){ var a = zuf(2, 9), b = zuf(2, 9), c = zuf(2, 9); return [a + " · (" + b + " + " + c + ") = " + a + " · " + b + " + " + c, "nein"]; },
    function(){ var a = zuf(12, 20), b = zuf(2, 5), c = zuf(2, 5); return ["(" + a + " − " + b + ") − " + c + " = " + a + " − (" + b + " − " + c + ")", "nein"]; }
  ];
  var VORTEIL = [
    function(){ var x = zuf(11, 49); return { term: "25 · " + x + " · 4", weg: ["25 · " + x + " · 4 = 25 · 4 · " + x + "  (" + t("v_25") + ")", "= 100 · " + x + " = " + (100 * x)] }; },
    function(){ var a = zuf(11, 49), c = 100 - a, b = zuf(11, 89); return { term: a + " + " + b + " + " + c, weg: [a + " + " + b + " + " + c + " = (" + a + " + " + c + ") + " + b + "  (" + t("v_100") + ")", "= 100 + " + b + " = " + (100 + b)] }; },
    function(){ var a = zuf(3, 9), k = wahl([98, 99, 101, 102, 199, 201]); var d = k - (k > 150 ? 200 : 100), r = k > 150 ? 200 : 100;
      return { term: a + " · " + k, weg: [a + " · " + k + " = " + a + " · (" + r + (d < 0 ? " − " + (-d) : " + " + d) + ")  (" + t("v_rund") + ")", "= " + (a * r) + (d < 0 ? " − " : " + ") + Math.abs(a * d) + " = " + (a * k)] }; },
    function(){ var a = zuf(11, 39), b = zuf(2, 8), c = 10 - b; return { term: a + " · " + b + " + " + a + " · " + c, weg: [a + " · " + b + " + " + a + " · " + c + " = " + a + " · (" + b + " + " + c + ")  (" + t("v_aus") + ")", "= " + a + " · 10 = " + (a * 10)] }; },
    function(){ var x = zuf(3, 19); return { term: "8 · " + x + " · 125", weg: ["8 · " + x + " · 125 = 8 · 125 · " + x, "= 1000 · " + x + " = " + (1000 * x)] }; },
    function(){ var a = zuf(21, 79), b = zuf(2, 8), c = 10 - b; return { term: a + " · " + b + " + " + c + " · " + a, weg: [a + " · " + b + " + " + c + " · " + a + " = " + a + " · (" + b + " + " + c + ")  (" + t("v_aus") + ")", "= " + a + " · 10 = " + (a * 10)] }; }
  ];
  function neueAufgabe(){
    beantwortet = false; zweiterV = false;
    var typ = U.typ === "mix" ? wahl(["aus", "aus", "zuerst", "gesetz", "vorteil"]) : U.typ;
    if(typ === "aus"){ var term = erzeuge(U.stufe); naechsteId = 1; auf = { typ: typ, term: term, e: loese(parse(term)).e }; }
    else if(typ === "zuerst"){ var tz; do { tz = erzeuge(U.stufe); naechsteId = 1; var bz = parse(tz); } while(kandidatenAlle(bz).length < 2);
      auf = { typ: typ, term: tz, baum: bz, ok: ersteMoeglich(bz) }; }
    else if(typ === "gesetz"){ var g = wahl(GESETZ)(); auf = { typ: typ, term: g[0], g: g[1] }; }
    else { var v = wahl(VORTEIL)(); naechsteId = 1; auf = { typ: typ, term: v.term, weg: v.weg, e: loese(parse(v.term)).e }; }
    zeige();
    var i = $("uAntwort"); if(i && !$("uZeile").hidden){ i.value = ""; i.focus(); }
  }
  // Term mit antippbaren Rechenzeichen (für „Was zuerst?“)
  function termKnopfHtml(x, ctx){
    ctx = ctx || { links: true };
    if(x.t === "num"){ var h = zahlHtml(x.v); return x.v.n < 0 && !ctx.links ? "(" + h + ")" : h; }
    if(x.t === "par") return (x.eck ? "[" : "(") + termKnopfHtml(x.a, { links: true }) + (x.eck ? "]" : ")");
    if(x.t === "neg") return '<button type="button" class="opk" data-id="' + x.id + '">−</button>' + termKnopfHtml(x.a, { links: true });
    if(x.o === "^") return termKnopfHtml(x.a, { links: ctx.links }) + '<button type="button" class="opk hoch" data-id="' + x.id + '">' + esc(zahlTxt(x.b.v)) + "</button>";
    return termKnopfHtml(x.a, { links: ctx.links }) + ' <button type="button" class="opk" data-id="' + x.id + '">' + x.o + "</button> " + termKnopfHtml(x.b, { links: false });
  }
  function opText(baum, id){ var r = ""; (function g(x){ if(!x || x.t === "num") return; if(x.id === id){ r = html(x, null, "", { links: true }); return; } g(x.a); if(x.b) g(x.b); })(baum); return r; }
  function zeige(){
    if(!auf) return;
    var A = auf, a = $("auftrag");
    $("punkte").textContent = t("punkte", { r: punkte, n: anzahl }) + (serie > 1 ? " · " + t("serie", { s: serie }) : "");
    sicht($("uZeile"), A.typ === "aus" || A.typ === "vorteil"); sicht($("gWahl"), A.typ === "gesetz");
    if(A.typ === "aus"){ a.innerHTML = esc(t("q_aus")) + '<br><bdi dir="ltr" class="tgross">' + esc(A.term.replace(/\^(\d)/g, function(m, z){ return "²³"[z - 2] || "^" + z; })) + " = ?</bdi>"; }
    else if(A.typ === "vorteil"){ a.innerHTML = esc(t("q_vorteil")) + '<br><bdi dir="ltr" class="tgross">' + esc(A.term) + " = ?</bdi>"; }
    else if(A.typ === "zuerst"){ a.innerHTML = esc(t("q_zuerst")) + '<br><bdi dir="ltr" class="tgross ztt">' + termKnopfHtml(A.baum) + "</bdi>"; }
    else {
      a.innerHTML = esc(t("q_gesetz")) + '<br><bdi dir="ltr" class="tgross">' + esc(A.term) + "</bdi>";
      $("gWahl").innerHTML = ["komm", "ass", "dist", "nein"].map(function(k){ return '<button type="button" class="knopf hell gw" data-g="' + k + '">' + esc(t("o_" + k)) + "</button>"; }).join(" ");
    }
    // nach der Antwort Markierungen wieder setzen (zeige() baut die Knöpfe neu)
    if(beantwortet && A.typ === "zuerst") document.querySelectorAll(".opk").forEach(function(b){ var bid = +b.dataset.id; if(A.ok.indexOf(bid) >= 0) b.classList.add("ok"); else if(bid === A.getippt) b.classList.add("nein"); b.disabled = true; });
    if(beantwortet && A.typ === "gesetz") document.querySelectorAll(".gw").forEach(function(b){ if(b.dataset.g === A.g) b.classList.add("ok"); else if(b.dataset.g === A.gewaehlt) b.classList.add("nein"); b.disabled = true; });
    $("pruefen").textContent = t("pruefen"); $("weiter").textContent = t("weiter");
  }
  function richtigGemacht(){ punkte++; serie++; if(typeof window.msRichtig === "function") try { window.msRichtig(); } catch(e){} }
  function wegAus(){ return '<p class="zeile"><b>' + esc(t("loesung")) + "</b></p>" + schritteHtml(auf.term).h; }
  function pruefen(){
    if(!auf || beantwortet) return;
    var A = auf, m = $("meldung"), inp = $("uAntwort");
    if(A.typ === "aus" || A.typ === "vorteil"){
      var e = inp.value.trim(); if(!e) return;
      var z = Number(e.replace(/\s/g, "").replace(/[−–]/g, "-").replace(",", ".")), ok = isFinite(z) && Math.abs(z - A.e.n / A.e.d) < 1e-9;
      if(!ok && !zweiterV && typeof window.msTippbar === "function" && window.msTippbar(e)){ zweiterV = true; window.msNochmal(m); return; }
      beantwortet = true; anzahl++;
      if(ok){ richtigGemacht(); m.className = "meldung gut"; m.textContent = t("richtig"); inp.classList.add("richtig"); }
      else { serie = 0; m.className = "meldung schlecht"; m.textContent = t("falsch", { l: zahlTxt(A.e) }); inp.classList.add("falsch"); }
      $("uWeg").innerHTML = A.typ === "vorteil" ? '<p class="zeile"><b>' + esc(t("loesung")) + '</b></p><ol class="lauf">' + A.weg.map(function(s){ return '<li><bdi dir="ltr">' + esc(s) + "</bdi></li>"; }).join("") + "</ol>" : wegAus();
      sicht($("uWeg"), true); zeige();
    }
  }
  function zuerstGetippt(id){
    if(!auf || beantwortet || auf.typ !== "zuerst") return;
    var ok = auf.ok.indexOf(id) >= 0, m = $("meldung");
    beantwortet = true; anzahl++; auf.getippt = id;
    var erst = auf.ok.map(function(i){ return opText(auf.baum, i); }).join(" | ");
    if(ok){ richtigGemacht(); m.className = "meldung gut"; m.textContent = t("richtig"); }
    else { serie = 0; m.className = "meldung schlecht"; m.innerHTML = esc(t("falschZ", { l: "" })) + '<bdi dir="ltr">' + erst + "</bdi>"; }
    $("uWeg").innerHTML = (auf.ok.length > 1 ? '<p class="zeile muted">' + esc(t("beidesOk")) + "</p>" : "") + wegAus(); sicht($("uWeg"), true); zeige();
  }
  function gesetzGewaehlt(g){
    if(!auf || beantwortet || auf.typ !== "gesetz") return;
    var ok = g === auf.g, m = $("meldung");
    beantwortet = true; anzahl++; auf.gewaehlt = g;
    if(ok){ richtigGemacht(); m.className = "meldung gut"; m.textContent = t("richtig"); }
    else { serie = 0; m.className = "meldung schlecht"; m.textContent = t("falsch", { l: t("o_" + auf.g) }); }
    var seiten = auf.term.split(" = "), h = "";
    if(auf.g === "nein"){
      try { naechsteId = 1; var x = loese(parse(seiten[0])).e, y = loese(parse(seiten[1])).e; h = '<p class="zeile">' + esc(t("w_nein", { x: zahlTxt(x), y: zahlTxt(y) })) + "</p>"; } catch(e){}
    } else h = '<p class="zeile">' + esc(t("w_gesetz", { g: t("o_" + auf.g) })) + "</p>";
    $("uWeg").innerHTML = h; sicht($("uWeg"), true); zeige();
  }
  function aufraeumen(){ var m = $("meldung"); m.className = "meldung"; m.textContent = ""; sicht($("uWeg"), false); $("uWeg").innerHTML = ""; var i = $("uAntwort"); i.classList.remove("richtig", "falsch"); i.value = ""; }
  $("pruefen").addEventListener("click", pruefen);
  $("weiter").addEventListener("click", function(){ aufraeumen(); neueAufgabe(); });
  $("uAntwort").addEventListener("keydown", function(e){ if(e.key !== "Enter") return; e.preventDefault(); if(beantwortet){ aufraeumen(); neueAufgabe(); } else pruefen(); });
  $("auftrag").addEventListener("click", function(e){ var b = e.target.closest(".opk"); if(b) zuerstGetippt(+b.dataset.id); });
  $("gWahl").addEventListener("click", function(e){ var b = e.target.closest(".gw"); if(b) gesetzGewaehlt(b.dataset.g); });
  document.addEventListener("keydown", function(e){ if(e.key === "Enter" && beantwortet && tab === "ueben" && document.activeElement !== $("uAntwort") && auf && auf.typ !== "aus" && auf.typ !== "vorteil"){ aufraeumen(); neueAufgabe(); } });

  // ---------- Reiter & Texte ----------
  var tab = "reihe", TABS = ["reihe", "gesetze", "fehler", "ueben"];
  function zeigeTab(k){
    tab = k;
    document.querySelectorAll(".tabs button").forEach(function(b){ b.setAttribute("aria-selected", b.dataset.tab === k ? "true" : "false"); });
    TABS.forEach(function(x){ sicht($("s_" + x), x === k); });
    if(k === "ueben" && !auf) neueAufgabe();
  }
  document.querySelectorAll(".tabs button").forEach(function(b){ b.addEventListener("click", function(){ zeigeTab(b.dataset.tab); }); });
  function alles(){
    document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = "miStudia – " + t("titel"); $("titel").textContent = t("titel");
    document.querySelectorAll(".tabs button").forEach(function(b){ b.textContent = t("tab_" + b.dataset.tab); });
    $("rTitel").textContent = t("r_titel");
    $("regeln").innerHTML = ["kl", "po", "pu", "st"].map(function(k, i){ return '<li class="rr rr-' + k + '"><span class="rn">' + (i + 1) + "</span> " + esc(t("r" + (i + 1))) + "</li>"; }).join("");
    $("merk").textContent = t("merk");
    $("rechnerT").textContent = t("rechner"); $("rechnerH").textContent = t("rechnerH"); $("los").textContent = t("los");
    $("farben").innerHTML = '<span class="muted">' + esc(t("farben")) + '</span> <span class="rg rg-kl">' + esc(t("f_kl")) + '</span> <span class="rg rg-po">' + esc(t("f_po")) + '</span> <span class="rg rg-pu">' + esc(t("f_pu")) + '</span> <span class="rg rg-st">' + esc(t("f_st")) + "</span>";
    bspKnoepfe(); rechner(); gesetze(); fehler(); einstellungen();
    if(auf){ zeige(); if(beantwortet){ /* Lösungsweg in neuer Sprache */ if(auf.typ === "aus") $("uWeg").innerHTML = wegAus(); } }
    $("pruefen").textContent = t("pruefen"); $("weiter").textContent = t("weiter");
  }
  window.MS_LANG = { apply: function(l){ if(RG[l]){ lang = l; alles(); } } };
  $("term").value = EIN.term || "3 · 2² + (10 − 4) : 3";
  alles();
  var hz = (location.hash || "").slice(1); if(TABS.indexOf(hz) >= 0) zeigeTab(hz);
  window.MS_RG_TEST = { schritte: schritteHtml, erzeuge: erzeuge, parse: parse, ersteMoeglich: ersteMoeglich };
})();
