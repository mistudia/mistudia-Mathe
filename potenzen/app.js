// ============================================================
// potenzen/app.js – Potenzen & Wurzeln (Klasse 5–10)
// Reiter:
//  - Potenzen: Regler Basis/Exponent (−3…8) mit ausgeschriebenem Produkt,
//    Punktquadrat (hoch 2) bzw. Würfel (hoch 3), Potenzleiter (warum a⁰ = 1,
//    a⁻ⁿ = 1 : aⁿ), Vorzeichen, Zehnerpotenzen + wissenschaftliche Schreibweise.
//  - Potenzgesetze: 5 Gesetze zum Ausprobieren (ausgeschrieben, gekürzt),
//    Überblick, typische Fehler mit Gegenrechnung.
//  - Wurzeln: Quadrat mit Flächeninhalt a (Seite √a), teilweise Wurzel ziehen,
//    Würfel (∛), n-te Wurzel als Potenz, Quadrat-/Kubikzahlen, Wurzelgesetze.
//  - Üben: Potenz ausrechnen, Potenzgesetze, Wurzeln, teilweise Wurzel ziehen,
//    Zehnerpotenzen, gemischt; Stufen 1–3; zwei Versuche (msTippbar/msNochmal).
// Rechnen exakt mit Brüchen (Fr). Texte: texte.js (PW), Sprache aus dem Startmenü (MS_LANG).
// Einstellungen in localStorage "msPW". Rechenketten: ein „=“ pro Zeile (kette()).
// ============================================================
(function(){
  "use strict";
  var lang = "de";
  function $(id){ return document.getElementById(id); }
  function t(k, v){ var s = (PW[lang] && PW[lang][k]) || PW.de[k] || k; if(v) for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function sicht(e, an){ if(an) e.removeAttribute("hidden"); else e.setAttribute("hidden", ""); }
  var rnd = Math.random; // beim Erzeugen einer Aufgabe: Zufall mit Startwert (gleiche Aufgabe nach Sprachwechsel)
  function zuf(a, b){ return a + Math.floor(rnd() * (b - a + 1)); }
  function wahl(L){ return L[Math.floor(rnd() * L.length)]; }
  function seeded(a){ return function(){ a |= 0; a = a + 0x6D2B79F5 | 0; var x = Math.imul(a ^ a >>> 15, 1 | a); x = x + Math.imul(x ^ x >>> 7, 61 | x) ^ x; return ((x ^ x >>> 14) >>> 0) / 4294967296; }; }
  var EIN = {}; try { EIN = JSON.parse(localStorage.getItem("msPW") || "{}") || {}; } catch(e){}
  function merken(){ try { localStorage.setItem("msPW", JSON.stringify(EIN)); } catch(e){} }

  // ---------- Brüche ----------
  function ggt(a, b){ a = Math.abs(a); b = Math.abs(b); while(b){ var r = a % b; a = b; b = r; } return a || 1; }
  function Fr(n, d){ if(d === undefined) d = 1; if(d < 0){ n = -n; d = -d; } var g = ggt(n, d); return { n: n / g, d: d / g }; }
  function mal(a, b){ return Fr(a.n * b.n, a.d * b.d); }
  function durch(a, b){ return Fr(a.n * b.d, a.d * b.n); }
  function gleich(a, b){ return a.n * b.d === b.n * a.d; }
  function pot(a, n){ // a: Fr, n: ganze Zahl; null wenn nicht festgelegt
    if(a.n === 0 && n <= 0) return null;
    var r = Fr(1); for(var i = 0; i < Math.abs(n); i++) r = mal(r, a);
    return n < 0 ? Fr(r.d, r.n) : r;
  }
  function komma(){ return lang === "en" || lang === "zh" || lang === "ja" ? "." : ","; }
  function gruppe(s){ return s.length >= 5 ? s.replace(/\B(?=(\d{3})+(?!\d))/g, " ") : s; }
  function dezimal(f){ // Text, falls f ein endlicher Dezimalbruch ist (sonst null)
    var d = f.d, k2 = 0, k5 = 0; while(d % 2 === 0){ d /= 2; k2++; } while(d % 5 === 0){ d /= 5; k5++; }
    if(d !== 1) return null;
    var m = Math.max(k2, k5); if(m > 12) return null;
    var ganz = Math.abs(f.n) * (Math.pow(10, m) / f.d); if(!isFinite(ganz) || ganz > 9e15) return null;
    var s = String(Math.round(ganz)); while(s.length <= m) s = "0" + s;
    var vor = s.slice(0, s.length - m), nach = s.slice(s.length - m);
    return (f.n < 0 ? "−" : "") + gruppe(vor) + (m ? komma() + nach : "");
  }
  function zahlTxt(f){
    var d = dezimal(f); if(d !== null && (f.d === 1 || f.d <= 10000)) return d;
    return (f.n < 0 ? "−" : "") + Math.abs(f.n) + "/" + f.d;
  }
  function bruchHtml(z, n){ return '<span class="msf-br"><span>' + z + "</span><span>" + n + "</span></span>"; }
  function zahlHtml(f, nurBruch){
    if(f.d === 1) return esc(zahlTxt(f));
    var h = (f.n < 0 ? "−" : "") + bruchHtml(gruppe(String(Math.abs(f.n))), gruppe(String(f.d)));
    var d = dezimal(f); if(!nurBruch && d !== null && f.d <= 1000) return h + ' <span class="kn">= ' + esc(d) + "</span>";
    return h;
  }
  function zahlKurz(f){ return f.d === 1 ? esc(zahlTxt(f)) : (f.n < 0 ? "−" : "") + bruchHtml(Math.abs(f.n), f.d); }
  function expTxt(n){ return n < 0 ? "−" + (-n) : String(n); }
  function basisHtml(a){ // Fr; negative Zahlen und Brüche in Klammern
    var h = zahlKurz(a);
    return '<span class="pb">' + (a.n < 0 || a.d !== 1 ? "(" + h + ")" : h) + "</span>";
  }
  function potH(a, n, eKlasse){ return basisHtml(a) + '<sup class="' + (eKlasse || "pe") + '">' + esc(expTxt(n)) + "</sup>"; }
  function faktoren(a, n, trenner){ var L = []; for(var i = 0; i < n; i++) L.push(basisHtml(a)); return L.join(trenner || " · "); }
  // Rechenkette: jede Zeile genau ein Relationszeichen; Einträge String oder {r:"≈", h:"…", n:"Notiz"}
  function kette(L){
    return '<div class="kette" dir="ltr">' + L.map(function(z, i){
      if(typeof z === "string") z = { h: z };
      var r = i === 0 ? "" : (z.r || "=");
      return '<div class="kz"><span class="kg">' + r + '</span><span class="ke">' + z.h + "</span>" + '<span class="kn">' + (z.n || "") + "</span>" + "</div>";
    }).join("") + "</div>";
  }
  function F(n){ return Fr(n); }

  // ---------- Reiter Potenzen ----------
  function wertH(f){ return f === null ? "?" : zahlHtml(f); }
  function potenzKarte(){
    var a = +$("pa").value, n = +$("pn").value, A = F(a);
    $("paW").textContent = a < 0 ? "−" + (-a) : a; $("pnW").textContent = expTxt(n);
    var h = '<div class="legende"><span class="chip-b">' + esc(t("lblA")) + ": " + esc(a < 0 ? "−" + (-a) : String(a)) + '</span> <span class="chip-e">' + esc(t("lblN")) + ": " + esc(expTxt(n)) + "</span></div>";
    h += '<p class="zeile muted">' + esc(t("p_lies", { a: a < 0 ? "(−" + (-a) + ")" : a, n: expTxt(n) })) + "</p>";
    var w = pot(A, n);
    if(w === null){ h += kette([potH(A, n)]) + '<p class="merke">' + esc(t("p_nn")) + "</p>"; $("potAus").innerHTML = h; $("potBild").innerHTML = ""; return; }
    var L = [potH(A, n)];
    if(n > 0){
      L.push('<span class="klam"><span>' + faktoren(A, n) + '</span><span class="klamT">' + esc(t("p_fak", { n: n })) + "</span></span>");
      L.push(wertH(w));
      h += kette(L);
    } else if(n === 0){
      L.push({ h: "1", n: esc(t("l_null")) }); h += kette(L) + '<p class="merke">' + esc(t("p_null")) + "</p>";
    } else {
      L.push({ h: bruchHtml("1", potH(A, -n)), n: esc(t("l_kehr")) });
      if(-n > 1) L.push(bruchHtml("1", faktoren(A, -n)));
      L.push(bruchHtml("1", zahlKurz(pot(A, -n))));
      if(w.n < 0 || !gleich(w, Fr(1, pot(A, -n).n))) L.push(zahlKurz(w));
      var d = dezimal(w); if(d !== null && w.d <= 100000) L.push(esc(d));
      h += kette(L) + '<p class="merke">' + esc(t("p_negE")) + "</p>";
    }
    $("potAus").innerHTML = h;
    // Bild
    var b = "";
    if(n === 2 && a >= 1 && a <= 12) b = punktQuadrat(a) + '<p class="zeile muted">' + esc(t("p_quad", { a: a })) + "</p>";
    else if(n === 3 && a >= 1 && a <= 8) b = wuerfel(a, 0) + '<p class="zeile muted">' + esc(t("p_kub", { a: a })) + "</p>";
    $("potBild").innerHTML = b;
    leiter(); EIN.pa = a; EIN.pn = n; merken();
  }
  function punktQuadrat(a){
    var g = 200, s = g / a, r = Math.min(9, s * 0.32), h = '<svg class="bild" viewBox="-10 -10 ' + (g + 20) + " " + (g + 20) + '" width="220" role="img">';
    h += '<rect x="0" y="0" width="' + g + '" height="' + g + '" fill="#fff7ed" stroke="#ea580c" stroke-width="2"/>';
    for(var i = 0; i < a; i++) for(var j = 0; j < a; j++) h += '<circle cx="' + (s * (i + 0.5)).toFixed(1) + '" cy="' + (s * (j + 0.5)).toFixed(1) + '" r="' + r.toFixed(1) + '" fill="#ea580c"/>';
    return h + "</svg>";
  }
  // Würfel in Schrägbild; a Teilungen; u = innere Markierung (0 = keine)
  function wuerfel(a, kante){
    var L = 150, k = 0.5, dx = L * k * Math.cos(Math.PI / 6), dy = -L * k * Math.sin(Math.PI / 6), x0 = 10, y0 = 10 - dy;
    var P = function(x, y, z){ return [(x0 + x * L + z * dx).toFixed(1), (y0 + (L - y * L) + z * dy).toFixed(1)]; };
    var poly = function(pts, f){ return '<polygon points="' + pts.map(function(p){ return p.join(","); }).join(" ") + '" fill="' + f + '" stroke="#7c2d12" stroke-width="1.5"/>'; };
    var lin = function(p, q){ return '<line x1="' + p[0] + '" y1="' + p[1] + '" x2="' + q[0] + '" y2="' + q[1] + '" stroke="#9a3412" stroke-width="0.8" opacity="0.7"/>'; };
    var w = (L + dx + 20).toFixed(0), hh = (L - dy + 42).toFixed(0);
    var h = '<svg class="bild" viewBox="0 0 ' + w + " " + hh + '" width="230" role="img">';
    h += poly([P(0, 0, 0), P(1, 0, 0), P(1, 1, 0), P(0, 1, 0)], "#fed7aa") + poly([P(0, 1, 0), P(1, 1, 0), P(1, 1, 1), P(0, 1, 1)], "#ffedd5") + poly([P(1, 0, 0), P(1, 0, 1), P(1, 1, 1), P(1, 1, 0)], "#fdba74");
    if(a > 1 && a <= 12) for(var i = 1; i < a; i++){
      var f = i / a;
      h += lin(P(f, 0, 0), P(f, 1, 0)) + lin(P(0, f, 0), P(1, f, 0));
      h += lin(P(0, 1, f), P(1, 1, f)) + lin(P(f, 1, 0), P(f, 1, 1));
      h += lin(P(1, f, 0), P(1, f, 1)) + lin(P(1, 0, f), P(1, 1, f));
    }
    if(kante) h += '<text x="' + ((+P(0, 0, 0)[0] + +P(1, 0, 0)[0]) / 2) + '" y="' + (+P(0, 0, 0)[1] + 0) + '" dy="16" text-anchor="middle" font-size="14" font-weight="700" fill="#7c2d12">' + esc(kante) + "</text>";
    return h + "</svg>";
  }
  function leiter(){
    var a = +$("pa").value; if(a === 0 || a === 1 || a === -1) a = 2;
    var A = F(a), ab = a < 0 ? "(−" + (-a) + ")" : String(a);
    $("leiterT").textContent = t("p_leiter"); $("leiterH").textContent = t("p_leiterT", { a: ab });
    var h = '<table class="leiter" dir="ltr">';
    for(var n = 4; n >= -3; n--){
      var w = pot(A, n);
      h += '<tr class="' + (n === 0 || n === -1 ? "hl" : "") + '"><td class="lp">' + potH(A, n) + '</td><td class="lg">=</td><td class="lw">' + zahlKurz(w) + "</td>" +
        '<td class="lpf">' + (n > -3 ? '<span class="pfl">↓ : ' + esc(ab) + "</span>" : "") + "</td></tr>";
    }
    $("leiterTab").innerHTML = h + "</table>";
  }
  function vorzeichenKarte(){
    var A = F(-2), h = '<table class="vz" dir="ltr">';
    for(var n = 1; n <= 6; n++){
      h += "<tr><td>" + potH(A, n) + "</td><td>=</td><td>" + faktoren(A, n) + "</td><td>=</td><td><b>" + zahlKurz(pot(A, n)) + '</b></td><td class="' + (n % 2 ? "ung" : "ger") + '">' + esc(t(n % 2 ? "p_ungerade" : "p_gerade")) + "</td></tr>";
    }
    h += "</table>";
    $("vzTab").innerHTML = '<div class="tabwrap">' + h + "</div>";
    $("vzK").innerHTML = '<p class="zeile">' + esc(t("p_vzK")) + '</p><div class="zwei">' +
      kette(["−" + potH(F(2), 4), "−(" + faktoren(F(2), 4) + ")", "−16"]) +
      kette([potH(F(-2), 4), faktoren(F(-2), 4), "16"]) + "</div>";
  }
  // wissenschaftliche Schreibweise (über Ziffernfolgen, ohne Rundungsfehler)
  function wissen(s){
    s = String(s).replace(/[\s  ']/g, "");
    if(/^\d{1,3}(\.\d{3})+$/.test(s) && komma() === ",") s = s.replace(/\./g, "");
    s = s.replace(",", ".");
    if(!/^\d*\.?\d*$/.test(s) || !/\d/.test(s)) return null;
    var teile = s.split("."), ganz = teile[0].replace(/^0+/, ""), nach = teile[1] || "";
    var alle = (ganz + nach), ex;
    if(ganz.length){ ex = ganz.length - 1; }
    else { var m = nach.match(/^0*/)[0].length; if(m === nach.length) return null; ex = -(m + 1); }
    var z = alle.replace(/^0+/, "").replace(/0+$/, ""); if(!z) return null;
    var mant = z[0] + (z.length > 1 ? komma() + z.slice(1) : "");
    return { mant: mant, ex: ex, ein: gruppe((ganz || "0")) + (nach ? komma() + nach : "") };
  }
  var Z_BSP = [["z_sonne", "150000000"], ["z_welt", "8100000000"], ["z_licht", "299792458"], ["z_haar", "0,00007"], ["z_virus", "0,0000001"]];
  function zehnKarte(){
    var h = '<div class="zgitter" dir="ltr">';
    for(var n = 6; n >= -3; n--){ var w = pot(F(10), n); h += "<div>" + potH(F(10), n) + " = " + (n < 0 ? bruchHtml("1", gruppe(String(w.d))) + " = " + esc(dezimal(w)) : esc(dezimal(w))) + "</div>"; }
    $("zListe").innerHTML = h + "</div>";
    $("zBsp").innerHTML = '<span class="muted">' + esc(t("p_zBsp")) + "</span> " + Z_BSP.map(function(b){ return '<button type="button" class="chip" data-z="' + b[1] + '">' + esc(t(b[0])) + "</button>"; }).join(" ");
    zehnRechnen();
  }
  function zehnRechnen(){
    var r = wissen($("zIn").value), aus = $("zAus");
    if(!r){ aus.innerHTML = '<p class="fehler">' + esc(t("err_zahl")) + "</p>"; return; }
    var note = r.ex > 0 ? t("p_zL", { k: r.ex }) : r.ex < 0 ? t("p_zR", { k: -r.ex }) : t("p_z0");
    aus.innerHTML = kette([esc(r.ein), { h: esc(r.mant) + " · " + potH(F(10), r.ex, "pe10"), n: esc(note) }]);
    EIN.z = $("zIn").value; merken();
  }

  // ---------- Reiter Potenzgesetze ----------
  var GES = [
    { k: "g1", allg: 'a<sup class="pe">m</sup> · a<sup class="pe">n</sup> = a<sup class="pe">m + n</sup>' },
    { k: "g2", allg: 'a<sup class="pe">m</sup> : a<sup class="pe">n</sup> = a<sup class="pe">m − n</sup>' },
    { k: "g3", allg: '(a<sup class="pe">m</sup>)<sup class="pe">n</sup> = a<sup class="pe">m · n</sup>' },
    { k: "g4", allg: 'a<sup class="pe">n</sup> · b<sup class="pe">n</sup> = (a · b)<sup class="pe">n</sup>' },
    { k: "g5", allg: 'a<sup class="pe">n</sup> : b<sup class="pe">n</sup> = (a : b)<sup class="pe">n</sup>' }
  ];
  function gesetzKarte(){
    var g = EIN.g || 0, a = +$("ga").value, b = +$("gb").value, m = +$("gm").value, n = +$("gn").value, A = F(a), B = F(b);
    ["ga", "gb", "gm", "gn"].forEach(function(id){ $(id + "W").textContent = $(id).value; });
    sicht($("gbL"), g >= 3); sicht($("gmL"), g <= 2);
    $("gChips").innerHTML = GES.map(function(x, i){ return '<button type="button" class="chip" data-g="' + i + '" aria-pressed="' + (i === g) + '">' + (i + 1) + ". " + esc(t(x.k)) + "</button>"; }).join(" ");
    var h = '<p class="regelzeile" dir="ltr">' + GES[g].allg + "</p><p class=\"zeile muted\">" + esc(t("g_warum")) + "</p>", L;
    var wert = function(f){ return f && Math.abs(f.n) < 1e13 && f.d < 1e13 ? zahlKurz(f) : null; };
    if(g === 0){
      L = [potH(A, m) + " · " + potH(A, n), "(" + faktoren(A, m) + ") · (" + faktoren(A, n) + ")", { h: potH(A, m + n), n: esc(t("l_add")) + ": " + m + " + " + n + " = " + (m + n) }];
    } else if(g === 1){
      var k = Math.min(m, n), z = [], u = [];
      for(var i = 0; i < m; i++) z.push(i < k ? '<span class="weg">' + basisHtml(A) + "</span>" : basisHtml(A));
      for(var j = 0; j < n; j++) u.push(j < k ? '<span class="weg">' + basisHtml(A) + "</span>" : basisHtml(A));
      L = [potH(A, m) + " : " + potH(A, n), { h: bruchHtml(z.join(" · "), u.join(" · ")), n: esc(t("g_kuerzen")) }, { h: potH(A, m - n), n: esc(t("l_sub")) + ": " + m + " − " + n + " = " + expTxt(m - n) }];
      if(m - n < 0) L.push(bruchHtml("1", potH(A, n - m)));
    } else if(g === 2){
      var p = []; for(var q = 0; q < n; q++) p.push(potH(A, m));
      L = ["(" + potH(A, m) + ")" + '<sup class="pe">' + n + "</sup>", p.join(" · "), { h: potH(A, m * n), n: esc(t("l_mul")) + ": " + m + " · " + n + " = " + (m * n) }];
    } else if(g === 3){
      var pr = []; for(var r = 0; r < n; r++) pr.push("(" + basisHtml(A) + " · " + basisHtml(B) + ")");
      L = [potH(A, n) + " · " + potH(B, n), "(" + faktoren(A, n) + ") · (" + faktoren(B, n) + ")", pr.join(" · "), { h: "(" + basisHtml(A) + " · " + basisHtml(B) + ')<sup class="pe">' + n + "</sup>", n: esc(t("l_basen")) }, potH(F(a * b), n)];
    } else {
      var br = []; for(var s = 0; s < n; s++) br.push(bruchHtml(basisHtml(A), basisHtml(B)));
      L = [potH(A, n) + " : " + potH(B, n), bruchHtml(faktoren(A, n), faktoren(B, n)), br.join(" · "), { h: "(" + basisHtml(A) + " : " + basisHtml(B) + ')<sup class="pe">' + n + "</sup>", n: esc(t("l_basenT")) }];
      var q2 = Fr(a, b); if(q2.d === 1) L.push(potH(q2, n)); else L.push("(" + bruchHtml(q2.n, q2.d) + ')<sup class="pe">' + n + "</sup>");
    }
    var e = g === 0 ? pot(A, m + n) : g === 1 ? pot(A, m - n) : g === 2 ? pot(A, m * n) : g === 3 ? pot(F(a * b), n) : pot(Fr(a, b), n);
    var ew = wert(e); if(ew) L.push(ew);
    h += kette(L);
    $("gAus").innerHTML = h;
    EIN.ga = a; EIN.gb = b; EIN.gm = m; EIN.gn = n; merken();
  }
  function gesetzUebersicht(){
    $("gAlle").innerHTML = '<h2>' + esc(t("g_alle")) + "</h2><ol class=\"galle\">" + GES.map(function(x){ return '<li><span class="regelzeile" dir="ltr">' + x.allg + "</span> <span class=\"muted\">" + esc(t(x.k)) + "</span></li>"; }).join("") + '</ol><p class="merke">' + esc(t("g_bed")) + "</p>";
    var falschZ = function(h){ return '<p class="fz"><span class="fl f">' + esc(t("g_falsch")) + '</span> <bdi dir="ltr" class="durch">' + h + "</bdi></p>"; };
    var two = function(x, y){ return '<div class="zwei">' + kette(x) + kette(y) + "</div>"; };
    $("gFehler").innerHTML = "<h2>" + esc(t("g_achtung")) + "</h2>" +
      '<div class="fkarte"><p class="zeile">' + esc(t("g_a1")) + "</p>" + falschZ(potH(F(2), 3) + " + " + potH(F(2), 2) + " = " + potH(F(2), 5)) +
        two([potH(F(2), 3) + " + " + potH(F(2), 2), "8 + 4", "<b>12</b>"], [potH(F(2), 5), "<b>32</b>"]) + "</div>" +
      '<div class="fkarte"><p class="zeile">' + esc(t("g_a2")) + "</p>" + falschZ("(2 + 3)<sup>2</sup> = " + potH(F(2), 2) + " + " + potH(F(3), 2)) +
        two(["(2 + 3)<sup>2</sup>", "5<sup>2</sup>", "<b>25</b>"], [potH(F(2), 2) + " + " + potH(F(3), 2), "4 + 9", "<b>13</b>"]) + "</div>" +
      '<div class="fkarte"><p class="zeile">' + esc(t("g_a3")) + "</p>" + falschZ(potH(F(2), 3) + " · " + potH(F(2), 2) + " = " + potH(F(4), 5)) +
        two([potH(F(2), 3) + " · " + potH(F(2), 2), potH(F(2), 5), "<b>32</b>"], [potH(F(4), 5), "<b>1024</b>"]) + "</div>";
  }

  // ---------- Reiter Wurzeln ----------
  function nk(x, s){ return (Math.round(x * Math.pow(10, s)) / Math.pow(10, s)).toFixed(s).replace(".", komma()); }
  function teilweise(a){ var k = 1; for(var i = 2; i * i <= a; i++) if(a % (i * i) === 0) k = i; return k; }
  function wurzelKarte(){
    var a = +$("wa").value; $("waW").textContent = a;
    var s = Math.sqrt(a), u = Math.floor(s + 1e-9), genau = u * u === a, h = "";
    h += '<p class="zeile"><b>' + esc(t("w_flaeche", { a: a })) + "</b></p>";
    if(genau){ h += '<p class="zeile">' + esc(t("w_genau", { a: a, s: u })) + "</p>" + kette(["√" + a, "<b>" + u + "</b>"]); }
    else {
      h += '<p class="zeile">' + esc(t("w_zw", { a: a, u: u, o: u + 1, u2: u * u, o2: (u + 1) * (u + 1) })) + "</p>";
      h += kette(["√" + a, { r: "≈", h: "<b>" + nk(s, 3) + "</b>" }]);
      var k = teilweise(a);
      h += '<p class="zeile">' + esc(t("w_teil")) + "</p>";
      if(k > 1){ var r = a / (k * k); h += kette(["√" + a, { h: "√(" + (k * k) + " · " + r + ")", n: esc(t("l_qz", { a: a, q: k * k })) }, "√" + (k * k) + " · √" + r, "<b>" + k + " · √" + r + "</b>"]); }
      else h += '<p class="zeile muted">' + esc(t("w_teilNicht", { a: a })) + "</p>";
      h += '<p class="merke">' + esc(t("w_irr")) + "</p>";
    }
    $("wAus").innerHTML = h;
    // Bild: Quadrat mit Einheitsgitter, innen das größte ganze Quadrat
    var G = 220, e = s > 0 ? G / s : 0, b = '<svg class="bild" viewBox="-30 -10 ' + (G + 50) + " " + (G + 45) + '" width="260" role="img">';
    b += '<rect x="0" y="0" width="' + G + '" height="' + G + '" fill="#fff7ed" stroke="#ea580c" stroke-width="2.5"/>';
    if(a > 0 && a <= 400) for(var i = 1; i < s; i++){ var p = (i * e).toFixed(1); b += '<line x1="' + p + '" y1="0" x2="' + p + '" y2="' + G + '" stroke="#fdba74" stroke-width="1"/><line x1="0" y1="' + p + '" x2="' + G + '" y2="' + p + '" stroke="#fdba74" stroke-width="1"/>'; }
    if(!genau && u > 0) b += '<rect x="0" y="' + (G - u * e).toFixed(1) + '" width="' + (u * e).toFixed(1) + '" height="' + (u * e).toFixed(1) + '" fill="none" stroke="#7c3aed" stroke-width="2" stroke-dasharray="6 4"/>';
    b += '<text x="' + G / 2 + '" y="' + (G / 2 + 7) + '" text-anchor="middle" font-size="22" font-weight="800" fill="#7c2d12">' + a + "</text>";
    b += '<text x="' + G / 2 + '" y="' + (G + 26) + '" text-anchor="middle" font-size="16" font-weight="700" fill="#1a2233">√' + a + (genau ? " = " + u : " ≈ " + nk(s, 2)) + "</text>";
    $("wBild").innerHTML = b + "</svg>";
    EIN.wa = a; merken();
  }
  function kubusKarte(){
    var a = +$("wk").value; $("wkW").textContent = a;
    var c = Math.cbrt(a), u = Math.floor(c + 1e-9), genau = u * u * u === a, h = '<p class="zeile"><b>' + esc(t("w_vol", { a: a })) + "</b></p>";
    if(genau) h += '<p class="zeile">' + esc(t("w_kgenau", { a: a, s: u })) + "</p>" + kette(["∛" + a, "<b>" + u + "</b>"]);
    else h += '<p class="zeile">' + esc(t("w_kzw", { a: a, u: u, o: u + 1, u3: u * u * u, o3: Math.pow(u + 1, 3) })) + "</p>" + kette(["∛" + a, { r: "≈", h: "<b>" + nk(c, 3) + "</b>" }]);
    $("kAus").innerHTML = h;
    $("kBild").innerHTML = wuerfel(genau ? u : 0, "∛" + a + (genau ? " = " + u : " ≈ " + nk(c, 2)));
    EIN.wk = a; merken();
  }
  function wurzelRest(){
    $("nAll").innerHTML = '<p class="zeile">' + esc(t("w_nAll")) + '</p><p class="regelzeile" dir="ltr" data-nobr><span>ⁿ√a = a<sup class="pe">1/n</sup></span></p><div class="drei">' +
      kette(["∛8", '8<sup class="pe" data-nobr>1/3</sup>', "2"]) + kette(["⁴√16", '16<sup class="pe" data-nobr>1/4</sup>', "2"]) + kette(["⁵√32", '32<sup class="pe" data-nobr>1/5</sup>', "2"]) + "</div>";
    var q = '<div class="zahlen" dir="ltr">'; for(var i = 1; i <= 20; i++) q += "<span>" + i + "<sup>2</sup> = " + i * i + "</span>"; q += "</div>";
    var k = '<div class="zahlen" dir="ltr">'; for(var j = 1; j <= 10; j++) k += "<span>" + j + "<sup>3</sup> = " + gruppe(String(j * j * j)) + "</span>"; k += "</div>";
    $("wTab").innerHTML = "<h2>" + esc(t("w_tab")) + "</h2>" + q + k;
    var reg = function(titel, allg, L){ return '<div class="fkarte"><p class="zeile"><b>' + esc(t(titel)) + '</b></p><p class="regelzeile" dir="ltr">' + allg + "</p>" + kette(L) + "</div>"; };
    $("wGes").innerHTML = "<h2>" + esc(t("w_ges")) + '</h2><div class="gitter2">' +
      reg("w_g1", "√a · √b = √(a · b)", ["√2 · √8", "√(2 · 8)", "√16", "4"]) +
      reg("w_g2", "√a : √b = √(a : b)", ["√50 : √2", "√(50 : 2)", "√25", "5"]) +
      reg("w_g3", "√(a<sup>2</sup>) = |a|", ["√((−3)<sup>2</sup>)", "√9", "3"]) +
      reg("w_g4", 'ⁿ√a = a<sup class="pe" data-nobr>1/n</sup>', ["√9", '9<sup class="pe" data-nobr>1/2</sup>', "3"]) + "</div>" +
      '<div class="fkarte"><p class="zeile">' + esc(t("w_aT")) + '</p><p class="fz"><span class="fl f">' + esc(t("g_falsch")) + '</span> <bdi dir="ltr" class="durch">√(9 + 16) = √9 + √16</bdi></p><div class="zwei">' +
      kette(["√(9 + 16)", "√25", "<b>5</b>"]) + kette(["√9 + √16", "3 + 4", "<b>7</b>"]) + '</div></div><p class="merke">' + esc(t("w_neg")) + "</p>";
  }

  // ---------- Üben ----------
  var TYPEN = ["wert", "gesetz", "wurzel", "teil", "zehn", "mix"];
  var typ = TYPEN.indexOf(EIN.typ) >= 0 ? EIN.typ : "wert", stufe = [1, 2, 3].indexOf(EIN.stufe) >= 0 ? EIN.stufe : 1;
  var auf = null, beantwortet = false, zweiterV = false, punkte = 0, anzahl = 0, serie = 0;
  var KASTEN = '<span class="kasten">□</span>';
  function einstellungen(){
    $("einst").innerHTML = '<div class="reihe"><b>' + esc(t("u_typ")) + '</b><span class="chips">' + TYPEN.map(function(k){ return '<button type="button" class="chip" data-typ="' + k + '" aria-pressed="' + (k === typ) + '">' + esc(t("u_" + k)) + "</button>"; }).join("") + "</span></div>" +
      '<div class="reihe"><b>' + esc(t("u_stufe")) + '</b><span class="chips">' + [1, 2, 3].map(function(s){ return '<button type="button" class="chip" data-st="' + s + '" aria-pressed="' + (s === stufe) + '">' + s + " · " + esc(t("s" + s)) + "</button>"; }).join("") + "</span></div>";
  }
  $("einst").addEventListener("click", function(e){
    var b = e.target.closest("button"); if(!b) return;
    if(b.dataset.typ){ typ = b.dataset.typ; EIN.typ = typ; } else if(b.dataset.st){ stufe = +b.dataset.st; EIN.stufe = stufe; } else return;
    merken(); einstellungen(); aufraeumen(); neueAufgabe();
  });
  function wegPot(A, n, minus){
    var w = pot(A, n), L = [(minus ? "−" : "") + potH(A, n)];
    if(n === 0) L.push({ h: (minus ? "−" : "") + "1", n: esc(t("l_null")) });
    else if(n > 0){ if(n > 1) L.push(minus ? { h: "−(" + faktoren(A, n) + ")", n: esc(t("l_vz")) } : faktoren(A, n)); L.push((minus ? "−" : "") + zahlKurz(w)); }
    else { L.push({ h: (minus ? "−" : "") + bruchHtml("1", potH(A, -n)), n: esc(t("l_kehr")) }); if(-n > 1) L.push((minus ? "−" : "") + bruchHtml("1", faktoren(A, -n))); L.push((minus ? "−" : "") + zahlKurz(w)); }
    var d = dezimal(w); if(w.d !== 1 && d !== null && w.d <= 10000) L.push((minus ? "−" : "") + esc(d));
    return kette(L);
  }
  function genWert(){
    var A, n, minus = false, r = rnd();
    if(stufe === 1){
      if(r < 0.2){ A = F(10); n = zuf(2, 6); }
      else { do { A = F(zuf(2, 12)); n = zuf(2, 5); } while(Math.pow(A.n, n) > 1000); }
    } else if(stufe === 2){
      if(r < 0.45){ do { A = F(-zuf(1, 5)); n = zuf(2, 5); } while(Math.pow(Math.abs(A.n), n) > 625); }
      else if(r < 0.7){ do { A = F(zuf(2, 5)); n = zuf(2, 4); } while(Math.pow(A.n, n) > 625); minus = true; }
      else { A = F(wahl([-7, -3, 2, 5, 9, 12, 100])); n = wahl([0, 1]); }
    } else {
      if(r < 0.5){ do { A = F(wahl([2, 3, 4, 5, 10])); n = -zuf(1, 4); } while(Math.pow(A.n, -n) > 1000); }
      else if(r < 0.75){ A = wahl([Fr(1, 2), Fr(1, 3), Fr(2, 3), Fr(3, 4), Fr(1, 10)]); n = zuf(2, 3); }
      else { A = F(-wahl([2, 3])); n = -zuf(1, 3); }
    }
    var e = pot(A, n); if(minus) e = Fr(-e.n, e.d);
    return { typ: "wert", frage: esc(t("q_rechne")) + '<br><bdi dir="ltr" class="tgross">' + (minus ? "−" : "") + potH(A, n) + " = ?</bdi>", e: e, weg: wegPot(A, n, minus), hinweis: stufe === 3 };
  }
  function genGesetz(){
    var a = zuf(2, 9), A = F(a), m, n, p, r = rnd(), frage, e, L;
    if(stufe === 1 || (stufe === 2 && r < 0.3)){
      m = zuf(2, 8); n = zuf(2, 7);
      if(rnd() < 0.5){ frage = potH(A, m) + " · " + potH(A, n); e = m + n; L = [frage, { h: basisHtml(A) + '<sup class="pe">' + m + " + " + n + "</sup>", n: esc(t("l_add")) }]; }
      else { if(m <= n){ var x = m; m = n + 1; n = x; } frage = potH(A, m) + " : " + potH(A, n); e = m - n; L = [frage, { h: basisHtml(A) + '<sup class="pe">' + m + " − " + n + "</sup>", n: esc(t("l_sub")) }]; }
    } else if(stufe === 2){
      if(r < 0.65){ m = zuf(2, 5); n = zuf(2, 4); frage = "(" + potH(A, m) + ')<sup class="pe">' + n + "</sup>"; e = m * n; L = [frage, { h: basisHtml(A) + '<sup class="pe">' + m + " · " + n + "</sup>", n: esc(t("l_mul")) }]; }
      else { m = zuf(2, 6); n = zuf(2, 6); p = zuf(1, 5); frage = potH(A, m) + " · " + potH(A, n) + " · " + potH(A, p); e = m + n + p; L = [frage, { h: basisHtml(A) + '<sup class="pe">' + m + " + " + n + " + " + p + "</sup>", n: esc(t("l_add")) }]; }
    } else {
      if(r < 0.3){ // gleiche Exponenten: Basis gesucht
        var b = wahl([[2, 5], [4, 25], [2, 50], [5, 20], [3, 3], [2, 3], [4, 5]]); n = zuf(3, 9);
        frage = potH(F(b[0]), n) + " · " + potH(F(b[1]), n); var basis = b[0] * b[1];
        return { typ: "gesetz", frage: esc(t("q_gesetz")) + '<br><bdi dir="ltr" class="tgross">' + frage + " = " + KASTEN + '<sup class="pe">' + n + "</sup></bdi>", e: F(basis),
          weg: kette([frage, { h: "(" + b[0] + " · " + b[1] + ')<sup class="pe">' + n + "</sup>", n: esc(t("l_basen")) }, potH(F(basis), n)]) };
      }
      if(r < 0.65){ m = zuf(2, 4); n = zuf(2, 3); p = zuf(-5, 5) || 2; frage = "(" + potH(A, m) + ')<sup class="pe">' + n + "</sup> · " + potH(A, p); e = m * n + p;
        L = [frage, { h: potH(A, m * n) + " · " + potH(A, p), n: esc(t("l_mul")) }, { h: basisHtml(A) + '<sup class="pe">' + (m * n) + (p < 0 ? " − " + (-p) : " + " + p) + "</sup>", n: esc(t("l_add")) }]; }
      else { m = zuf(-4, 6) || -2; n = zuf(2, 7); p = zuf(1, 5); frage = potH(A, m) + " · " + potH(A, p) + " : " + potH(A, n); e = m + p - n;
        L = [frage, { h: basisHtml(A) + '<sup class="pe">' + expTxt(m) + " + " + p + " − " + n + "</sup>", n: esc(t("l_add")) + ", " + esc(t("l_sub")) }]; }
    }
    L.push(potH(A, e));
    return { typ: "gesetz", frage: esc(t("q_gesetz")) + '<br><bdi dir="ltr" class="tgross">' + frage + " = " + basisHtml(A) + '<sup class="pe kasten">□</sup></bdi>', e: F(e), weg: kette(L) };
  }
  function genWurzel(){
    var r = rnd(), k, frage, e, L;
    if(stufe === 1){ k = zuf(1, 20); frage = "√" + k * k; e = F(k); L = [frage, { h: "<b>" + k + "</b>", n: k + " · " + k + " = " + k * k }]; }
    else if(stufe === 2){
      if(r < 0.4){ k = zuf(1, 10); frage = "∛" + gruppe(String(k * k * k)); e = F(k); L = [frage, { h: "<b>" + k + "</b>", n: k + " · " + k + " · " + k + " = " + k * k * k }]; }
      else if(r < 0.7){ k = wahl([1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12]); var q = Fr(k * k, 100), w = Fr(k, 10); frage = "√" + esc(dezimal(q)); e = w; L = [frage, "√" + bruchHtml(k * k, 100), bruchHtml("√" + k * k, "√100"), bruchHtml(k, 10), "<b>" + esc(dezimal(w)) + "</b>"]; }
      else { k = zuf(2, 5); var n = wahl([4, 5]); if(n === 5) k = zuf(2, 3); var z = Math.pow(k, n); frage = (n === 4 ? "⁴√" : "⁵√") + z; e = F(k); L = [frage, { h: "<b>" + k + "</b>", n: Array(n).fill(k).join(" · ") + " = " + z }]; }
    } else {
      var m = wahl([2, 3, 5, 6, 7]), k1 = zuf(1, 4), k2 = zuf(1, 4);
      if(r < 0.4){ if(k1 === k2) k2++; var a = m * k1 * k1, b = m * k2 * k2, p = a * b, s = Math.round(Math.sqrt(p)); frage = "√" + a + " · √" + b; e = F(s); L = [frage, "√(" + a + " · " + b + ")", "√" + p, "<b>" + s + "</b>"]; }
      else if(r < 0.75){ k1 = zuf(2, 6); var a2 = m * k1 * k1; frage = "√" + a2 + " : √" + m; e = F(k1); L = [frage, "√(" + a2 + " : " + m + ")", "√" + k1 * k1, "<b>" + k1 + "</b>"]; }
      else { k = zuf(2, 15); frage = "√((−" + k + ")<sup>2</sup>)"; e = F(k); L = [frage, "√" + k * k, "<b>" + k + "</b>"]; }
    }
    return { typ: "wurzel", frage: esc(t("q_rechne")) + '<br><bdi dir="ltr" class="tgross">' + frage + " = ?</bdi>", e: e, weg: kette(L), hinweis: false };
  }
  function genTeil(){
    var m = wahl(stufe === 3 ? [2, 3, 5, 6, 7, 10, 11, 13] : [2, 3, 5]), k = stufe === 1 ? zuf(2, 5) : stufe === 2 ? zuf(2, 10) : zuf(3, 12), a = k * k * m;
    return { typ: "teil", frage: esc(t("q_teil")) + '<br><bdi dir="ltr" class="tgross">√' + a + " = " + KASTEN + " · √" + m + "</bdi>", e: F(k),
      weg: kette(["√" + a, { h: "√(" + k * k + " · " + m + ")", n: esc(t("l_qz", { a: a, q: k * k })) }, "√" + k * k + " · √" + m, "<b>" + k + " · √" + m + "</b>"]) };
  }
  function zehnBau(ziffern, ex){ // Zahl ziffern[0],ziffern[1..] · 10^ex → Fr
    var e = ex - (ziffern.length - 1), z = parseInt(ziffern, 10);
    return e >= 0 ? Fr(z * Math.pow(10, e)) : Fr(z, Math.pow(10, -e));
  }
  function genZehn(){
    var ziffern = String(zuf(1, 9)) + (rnd() < 0.6 ? String(zuf(1, 9)) : "") + (stufe === 3 && rnd() < 0.4 ? String(zuf(1, 9)) : "");
    var ex = stufe === 1 ? zuf(3, 9) : stufe === 2 ? -zuf(1, 7) : wahl([-zuf(2, 6), zuf(3, 8)]);
    var f = zehnBau(ziffern, ex), mant = ziffern[0] + (ziffern.length > 1 ? komma() + ziffern.slice(1) : ""), zahl = dezimal(f);
    var note = ex > 0 ? t("p_zL", { k: ex }) : t("p_zR", { k: -ex });
    if(stufe === 3 && rnd() < 0.5){
      return { typ: "zehn", frage: esc(t("q_zahl")) + '<br><bdi dir="ltr" class="tgross">' + esc(mant) + " · " + potH(F(10), ex, "pe10") + " = ?</bdi>", e: f,
        weg: kette([esc(mant) + " · " + potH(F(10), ex, "pe10"), { h: "<b>" + esc(zahl) + "</b>", n: esc(note) }]) };
    }
    return { typ: "zehn", frage: esc(t("q_zehn")) + '<br><bdi dir="ltr" class="tgross">' + esc(zahl) + " = " + esc(mant) + ' · 10<sup class="pe10 kasten">□</sup></bdi>', e: F(ex),
      weg: kette([esc(zahl), { h: esc(mant) + " · " + potH(F(10), ex, "pe10"), n: esc(note) }]) };
  }
  function erzeuge(seed, ty, st){
    var altT = typ, altS = stufe; typ = ty || typ; stufe = st || stufe;
    var sd = seed === undefined ? Math.floor(Math.random() * 2147483647) : seed, A;
    rnd = seeded(sd);
    try {
      var tp = typ === "mix" ? wahl(["wert", "gesetz", "wurzel", "teil", "zehn"]) : typ;
      A = tp === "wert" ? genWert() : tp === "gesetz" ? genGesetz() : tp === "wurzel" ? genWurzel() : tp === "teil" ? genTeil() : genZehn();
    } finally { rnd = Math.random; }
    A.seed = sd; A.typ0 = typ; A.stufe0 = stufe; typ = altT; stufe = altS;
    return A;
  }
  function neueAufgabe(){ auf = erzeuge(); beantwortet = false; zweiterV = false; zeige(); var i = $("uAntwort"); if(i && document.activeElement !== i && tab === "ueben") try { i.focus({ preventScroll: true }); } catch(e){} }
  function zeige(){
    if(!auf) return;
    $("punkte").textContent = t("punkte", { r: punkte, n: anzahl }) + (serie > 1 ? " · " + t("serie", { s: serie }) : "");
    $("auftrag").innerHTML = auf.frage;
    $("hinweis").textContent = auf.hinweis ? t("h_bruch") : ""; sicht($("hinweis"), !!auf.hinweis);
    $("pruefen").textContent = t("pruefen"); $("weiter").textContent = t("weiter");
  }
  function leseZahl(s){
    s = String(s).replace(/[\s  ']/g, "").replace(/[−–—]/g, "-").replace(/÷|:/g, "/");
    if(/^-?\d{1,3}(\.\d{3})+$/.test(s) && komma() === ",") s = s.replace(/\./g, "");
    s = s.replace(",", ".");
    var m = s.match(/^(-?)(\d+)\/(\d+)$/); if(m){ if(+m[3] === 0) return null; return Fr((m[1] ? -1 : 1) * +m[2], +m[3]); }
    m = s.match(/^(-?)(\d*)(?:\.(\d+))?$/); if(!m || (!m[2] && !m[3])) return null;
    var nach = m[3] || "", z = parseInt((m[2] || "0") + nach, 10); if(!isFinite(z)) return null;
    return Fr((m[1] ? -1 : 1) * z, Math.pow(10, nach.length));
  }
  function richtigGemacht(){ punkte++; serie++; if(typeof window.msRichtig === "function") try { window.msRichtig(); } catch(e){} }
  function pruefen(){
    if(!auf || beantwortet) return;
    var m = $("meldung"), inp = $("uAntwort"), e = inp.value.trim(); if(!e) return;
    var z = leseZahl(e), ok = !!z && gleich(z, auf.e);
    if(!ok && !zweiterV && typeof window.msTippbar === "function" && window.msTippbar(e)){ zweiterV = true; window.msNochmal(m); return; }
    beantwortet = true; anzahl++;
    auf.ok = ok;
    if(ok){ richtigGemacht(); inp.classList.add("richtig"); } else { serie = 0; inp.classList.add("falsch"); }
    ergebnisZeigen(); zeige();
  }
  function ergebnisZeigen(){
    var m = $("meldung");
    if(auf.ok){ m.className = "meldung gut"; m.textContent = t("richtig"); }
    else { m.className = "meldung schlecht"; m.textContent = t("falsch", { l: zahlTxt(auf.e) }); }
    $("uWeg").innerHTML = '<p class="zeile"><b>' + esc(t("loesung")) + "</b></p>" + auf.weg; sicht($("uWeg"), true);
  }
  function aufraeumen(){ var m = $("meldung"); m.className = "meldung"; m.textContent = ""; sicht($("uWeg"), false); $("uWeg").innerHTML = ""; var i = $("uAntwort"); i.classList.remove("richtig", "falsch"); i.value = ""; }
  $("pruefen").addEventListener("click", pruefen);
  $("weiter").addEventListener("click", function(){ aufraeumen(); neueAufgabe(); });
  $("uAntwort").addEventListener("keydown", function(e){ if(e.key !== "Enter") return; e.preventDefault(); if(beantwortet){ aufraeumen(); neueAufgabe(); } else pruefen(); });

  // ---------- Bedienung ----------
  ["pa", "pn"].forEach(function(id){ $(id).addEventListener("input", potenzKarte); });
  ["ga", "gb", "gm", "gn"].forEach(function(id){ $(id).addEventListener("input", gesetzKarte); });
  $("gChips").addEventListener("click", function(e){ var b = e.target.closest("[data-g]"); if(!b) return; EIN.g = +b.dataset.g; merken(); gesetzKarte(); });
  $("wa").addEventListener("input", wurzelKarte); $("wk").addEventListener("input", kubusKarte);
  $("zIn").addEventListener("input", zehnRechnen);
  $("zBsp").addEventListener("click", function(e){ var b = e.target.closest("[data-z]"); if(!b) return; $("zIn").value = b.dataset.z.replace(",", komma()); zehnRechnen(); });

  // ---------- Reiter & Texte ----------
  var tab = "pot", TABS = ["pot", "ges", "wur", "ueben"];
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
    document.querySelectorAll("[data-t]").forEach(function(el){ el.textContent = t(el.dataset.t); });
    potenzKarte(); vorzeichenKarte(); zehnKarte(); gesetzKarte(); gesetzUebersicht(); wurzelKarte(); kubusKarte(); wurzelRest(); einstellungen();
    if(auf){ var ok = auf.ok; auf = erzeuge(auf.seed, auf.typ0, auf.stufe0); auf.ok = ok; zeige(); if(beantwortet) ergebnisZeigen(); }
  }
  window.MS_LANG = { apply: function(l){ if(PW[l]){ lang = l; alles(); } } };
  function setz(id, v){ if(v !== undefined && v !== null) $(id).value = v; }
  setz("pa", EIN.pa); setz("pn", EIN.pn); setz("ga", EIN.ga); setz("gb", EIN.gb); setz("gm", EIN.gm); setz("gn", EIN.gn); setz("wa", EIN.wa); setz("wk", EIN.wk);
  $("zIn").value = EIN.z || "150000000";
  alles();
  var hz = (location.hash || "").slice(1); if(TABS.indexOf(hz) >= 0) zeigeTab(hz);
  window.MS_PW_TEST = { erzeuge: erzeuge, leseZahl: leseZahl, wissen: wissen, pot: pot, setTyp: function(a, s){ typ = a; stufe = s; } };
})();
