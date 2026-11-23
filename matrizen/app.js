// ============================================================
// matrizen/app.js – Matrizen (Klasse 11–13)
// Reiter:
//  - Grundlagen: Matrix bearbeiten (1–4 Zeilen/Spalten), Element aᵢⱼ zeigen,
//    besondere Matrizen, Transponieren (Zeilen farbig → Spalten), Addieren/
//    Subtrahieren/Vervielfachen mit ausgeschriebenen Zwischenschritten.
//  - Multiplikation: Falksches Schema; Ergebnis-Element antippen → Zeile mal
//    Spalte farbig, Rechnung; Format-Regel; B · A zum Vergleich.
//  - Determinante & Inverse: 2×2 (Diagonalen) und 3×3 (Sarrus, Terme
//    antippen/überfahren markieren die Elemente), Inverse 2×2 per Formel,
//    3×3 per Gauß-Jordan (alle Zeilenumformungen), Probe A · A⁻¹ = E.
//  - Abbildungen: 2×2-Matrix mit Reglern + Vorlagen, Figur „F“ und
//    Einheitsquadrat werden abgebildet, Flächenfaktor = det.
//  - Üben: Format, Element von A · B, Addieren & Vervielfachen, det 2×2/3×3,
//    Inverse 2×2; Stufen 1–3; zwei Versuche (msTippbar/msNochmal).
// Exakte Brüche (Fr). Texte: texte.js (MX). Einstellungen localStorage "msMX".
// Rechenketten: ein „=“ pro Zeile (kette()).
// ============================================================
(function(){
  "use strict";
  var lang = "de";
  function $(id){ return document.getElementById(id); }
  function t(k, v){ var s = (MX[lang] && MX[lang][k]) || MX.de[k] || k; if(v) for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function sicht(e, an){ if(an) e.removeAttribute("hidden"); else e.setAttribute("hidden", ""); }
  var rnd = Math.random;
  function zuf(a, b){ return a + Math.floor(rnd() * (b - a + 1)); }
  function wahl(L){ return L[Math.floor(rnd() * L.length)]; }
  function seeded(a){ return function(){ a |= 0; a = a + 0x6D2B79F5 | 0; var x = Math.imul(a ^ a >>> 15, 1 | a); x = x + Math.imul(x ^ x >>> 7, 61 | x) ^ x; return ((x ^ x >>> 14) >>> 0) / 4294967296; }; }
  var EIN = {}; try { EIN = JSON.parse(localStorage.getItem("msMX") || "{}") || {}; } catch(e){}
  function merken(){ try { localStorage.setItem("msMX", JSON.stringify(EIN)); } catch(e){} }

  // ---------- Brüche ----------
  function ggt(a, b){ a = Math.abs(a); b = Math.abs(b); while(b){ var r = a % b; a = b; b = r; } return a || 1; }
  function Fr(n, d){ if(d === undefined) d = 1; if(d < 0){ n = -n; d = -d; } var g = ggt(n, d); return { n: n / g, d: d / g }; }
  function plus(a, b){ return Fr(a.n * b.d + b.n * a.d, a.d * b.d); }
  function minus(a, b){ return Fr(a.n * b.d - b.n * a.d, a.d * b.d); }
  function mal(a, b){ return Fr(a.n * b.n, a.d * b.d); }
  function durch(a, b){ return Fr(a.n * b.d, a.d * b.n); }
  function gleich(a, b){ return a.n * b.d === b.n * a.d; }
  function F(n){ return Fr(n); }
  var NULL = Fr(0), EINS = Fr(1);
  function komma(){ return lang === "en" || lang === "zh" || lang === "ja" ? "." : ","; }
  function zahlTxt(f){ return (f.n < 0 ? "−" : "") + Math.abs(f.n) + (f.d === 1 ? "" : "/" + f.d); }
  function bruchHtml(z, n){ return '<span class="msf-br"><span>' + z + "</span><span>" + n + "</span></span>"; }
  function zH(f){ return f.d === 1 ? esc(zahlTxt(f)) : (f.n < 0 ? "−" : "") + bruchHtml(Math.abs(f.n), f.d); }
  function zK(f){ return f.n < 0 ? "(" + zH(f) + ")" : zH(f); } // negative Zahl in Klammern (als zweiter Faktor/Summand)
  function leseZahl(s){
    s = String(s).replace(/[\s  ]/g, "").replace(/[−–—]/g, "-").replace(/[:÷]/g, "/").replace(",", ".");
    var m = s.match(/^(-?)(\d+)\/(\d+)$/); if(m){ if(+m[3] === 0) return null; return Fr((m[1] ? -1 : 1) * +m[2], +m[3]); }
    m = s.match(/^(-?)(\d*)(?:\.(\d+))?$/); if(!m || (!m[2] && !m[3])) return null;
    var nach = m[3] || ""; if(nach.length > 6) return null;
    return Fr((m[1] ? -1 : 1) * parseInt((m[2] || "0") + nach, 10), Math.pow(10, nach.length));
  }

  // ---------- Matrizen ----------
  function neu(m, n, f){ var M = []; for(var i = 0; i < m; i++){ M.push([]); for(var j = 0; j < n; j++) M[i].push(f ? f(i, j) : NULL); } return M; }
  function kopie(M){ return M.map(function(r){ return r.slice(); }); }
  function zufM(m, n, lo, hi){ return neu(m, n, function(){ return F(zuf(lo, hi)); }); }
  function mmul(A, B){ return neu(A.length, B[0].length, function(i, j){ var s = NULL; for(var k = 0; k < B.length; k++) s = plus(s, mal(A[i][k], B[k][j])); return s; }); }
  function det(M){
    if(M.length === 1) return M[0][0];
    if(M.length === 2) return minus(mal(M[0][0], M[1][1]), mal(M[0][1], M[1][0]));
    var s = NULL; for(var j = 0; j < M.length; j++){ var U = M.slice(1).map(function(r){ return r.filter(function(_, k){ return k !== j; }); }); var x = mal(M[0][j], det(U)); s = j % 2 ? minus(s, x) : plus(s, x); }
    return s;
  }
  function sub(b, i, j){ return b + "<sub>" + (i + 1) + (j + 1) + "</sub>"; }
  // Matrix als HTML; o.zk(i,j) → zusätzliche Klasse, o.daten(i,j) → Attribute, o.trenn = Spalte mit senkrechtem Strich davor
  function matH(M, o){
    o = o || {};
    var h = '<span class="mw" dir="ltr"><table class="mat">';
    M.forEach(function(r, i){
      h += "<tr>" + r.map(function(x, j){
        var k = o.zk ? o.zk(i, j) : ""; if(o.trenn && j === o.trenn) k += " tr";
        return '<td class="' + k + '"' + (o.daten ? " " + o.daten(i, j) : "") + ">" + (o.inhalt ? o.inhalt(i, j) : zH(x)) + "</td>";
      }).join("") + "</tr>";
    });
    return h + "</table></span>";
  }
  function kette(L){
    return '<div class="kette" dir="ltr">' + L.map(function(z, i){
      if(typeof z === "string") z = { h: z };
      return '<div class="kz"><span class="kg">' + (i === 0 ? "" : (z.r || "=")) + '</span><span class="ke">' + z.h + '</span><span class="kn">' + (z.n || "") + "</span></div>";
    }).join("") + "</div>";
  }
  var RF = ["#e11d48", "#2563eb", "#16a34a", "#d97706"]; // Zeilenfarben beim Transponieren

  // ---------- Editor ----------
  function editor(box, M, name, onch, o){
    o = o || {};
    var h = '<span class="mw ed" dir="ltr"><table class="mat">';
    M.forEach(function(r, i){ h += "<tr>" + r.map(function(x, j){ return '<td><input class="mz" data-i="' + i + '" data-j="' + j + '" value="' + esc(zahlTxt(x).replace("−", "-")) + '" inputmode="decimal" autocomplete="off" aria-label="' + name + (i + 1) + (j + 1) + '" data-nofit data-nonav></td>'; }).join("") + "</tr>"; });
    box.innerHTML = '<span class="mname">' + name + ' =</span> ' + h + "</table></span>";
    box.querySelectorAll("input.mz").forEach(function(inp){
      inp.addEventListener("input", function(){
        var z = leseZahl(inp.value); inp.classList.toggle("bad", !z);
        if(z){ M[+inp.dataset.i][+inp.dataset.j] = z; onch(); }
      });
      if(o.hover) ["mouseenter", "focus"].forEach(function(ev){ inp.addEventListener(ev, function(){ o.hover(+inp.dataset.i, +inp.dataset.j); }); });
    });
  }
  function groesse(box, m, n, onch, maxM, maxN){
    var k = function(w, d, v){ return '<button type="button" class="pm" data-w="' + w + '" data-d="' + d + '">' + v + "</button>"; };
    box.innerHTML = '<span class="gr">' + esc(t("zeilen")) + ": " + k("m", -1, "−") + " <b>" + m + "</b> " + k("m", 1, "+") + "</span>" +
      (maxN ? '<span class="gr">' + esc(t("spalten")) + ": " + k("n", -1, "−") + " <b>" + n + "</b> " + k("n", 1, "+") + "</span>" : "");
    box.onclick = function(e){ var b = e.target.closest(".pm"); if(!b) return; var w = b.dataset.w, d = +b.dataset.d;
      if(w === "m"){ var mm = Math.max(1, Math.min(maxM, m + d)); if(mm !== m) onch(mm, n); } else { var nn = Math.max(1, Math.min(maxN, n + d)); if(nn !== n) onch(m, nn); } };
  }
  function anpassen(M, m, n){ return neu(m, n, function(i, j){ return M[i] && M[i][j] ? M[i][j] : F(zuf(0, 5) - (i === j ? 0 : 1)); }); }
  function ladeM(x, m, n, lo, hi){ try { if(Array.isArray(x) && x.length) return x.map(function(r){ return r.map(function(v){ return Fr(v[0], v[1]); }); }); } catch(e){} return zufM(m, n, lo, hi); }
  function speichM(M){ return M.map(function(r){ return r.map(function(v){ return [v.n, v.d]; }); }); }

  // ---------- Reiter Grundlagen ----------
  var GA = ladeM(EIN.GA, 3, 4, -3, 9), R1 = ladeM(EIN.R1, 2, 3, -4, 6), R2 = ladeM(EIN.R2, 2, 3, -4, 6), rOp = EIN.rOp || "add", rZahl = EIN.rZahl || 2;
  function grundKarte(){
    groesse($("gaGr"), GA.length, GA[0].length, function(m, n){ GA = anpassen(GA, m, n); grundKarte(); }, 4, 4);
    editor($("gaEd"), GA, "A", grundInfo, { hover: grundZeig });
    grundInfo();
  }
  function grundInfo(){
    var m = GA.length, n = GA[0].length;
    $("gaTyp").innerHTML = esc(t("g_typ", { m: m, n: n })) + (m === n ? " " + esc(t("g_quad")) : "") + ' <span class="muted">' + esc(t("g_zeigen")) + "</span>";
    $("gaTrans").innerHTML = '<div class="reihe2">' + matH(GA, { zk: function(i){ return "rf" + (i % 4); } }) + '<span class="pfeil">→</span><span class="mname">A<sup>T</sup> =</span> ' +
      matH(neu(n, m, function(i, j){ return GA[j][i]; }), { zk: function(i, j){ return "rf" + (j % 4); } }) + "</div>";
    EIN.GA = speichM(GA); merken();
  }
  function grundZeig(i, j){
    $("gaEd").querySelectorAll("input.mz").forEach(function(x){ var a = +x.dataset.i, b = +x.dataset.j; x.classList.toggle("hlR", a === i); x.classList.toggle("hlC", b === j); x.classList.toggle("hlX", a === i && b === j); });
    $("gaInfo").innerHTML = esc(t("g_elem", { e: "§", i: i + 1, j: j + 1, w: "¤" })).replace("§", "<b>" + sub("a", i, j) + "</b>").replace("¤", "<b>" + zH(GA[i][j]) + "</b>");
  }
  function besondere(){
    var E = neu(3, 3, function(i, j){ return i === j ? EINS : NULL; });
    $("gBes").innerHTML = "<h2>" + esc(t("g_bes")) + '</h2><div class="gitter3"><div><p class="zeile">' + esc(t("g_null")) + "</p>" + matH(neu(2, 3)) + '</div><div><p class="zeile">' + esc(t("g_einheit")) + '</p><span class="mname">E =</span> ' +
      matH(E, { zk: function(i, j){ return i === j ? "diag" : ""; } }) + '</div><div><p class="zeile">' + esc(t("g_diag")) + "</p>" + matH(neu(3, 3, function(i, j){ return F(i * 3 + j + 1); }), { zk: function(i, j){ return i === j ? "diag" : ""; } }) + "</div></div>";
  }
  function rechKarte(){
    groesse($("r1Gr"), R1.length, R1[0].length, function(m, n){ R1 = anpassen(R1, m, n); rechKarte(); }, 4, 4);
    groesse($("r2Gr"), R2.length, R2[0].length, function(m, n){ R2 = anpassen(R2, m, n); rechKarte(); }, 4, 4);
    editor($("r1Ed"), R1, "A", rechAus); editor($("r2Ed"), R2, "B", rechAus);
    rechAus();
  }
  function rechAus(){
    $("rOps").innerHTML = [["add", "A + B"], ["sub", "A − B"], ["mul", "r · A"]].map(function(o){ return '<button type="button" class="chip" data-op="' + o[0] + '" aria-pressed="' + (o[0] === rOp) + '">' + o[1] + "</button>"; }).join(" ");
    sicht($("rZL"), rOp === "mul"); sicht($("r2Box"), rOp !== "mul");
    var aus = $("rAus"), L;
    if(rOp === "mul"){
      var r = leseZahl($("rZ").value) || F(2);
      L = [zH(r) + " · " + matH(R1), matH(R1, { inhalt: function(i, j){ return zH(r) + " · " + zK(R1[i][j]); } }), matH(neu(R1.length, R1[0].length, function(i, j){ return mal(r, R1[i][j]); }))];
    } else {
      if(R1.length !== R2.length || R1[0].length !== R2[0].length){ aus.innerHTML = '<p class="fehler">' + esc(t("g_formatFalsch")) + "</p>"; speich(); return; }
      var z = rOp === "add" ? " + " : " − ", f = rOp === "add" ? plus : minus;
      L = [matH(R1) + z + matH(R2), matH(R1, { inhalt: function(i, j){ return zH(R1[i][j]) + z + zK(R2[i][j]); } }), matH(neu(R1.length, R1[0].length, function(i, j){ return f(R1[i][j], R2[i][j]); }))];
    }
    aus.innerHTML = kette(L); speich();
  }
  function speich(){ EIN.R1 = speichM(R1); EIN.R2 = speichM(R2); EIN.rOp = rOp; EIN.rZahl = $("rZ").value; merken(); }

  // ---------- Reiter Multiplikation ----------
  var MA = ladeM(EIN.MA, 2, 3, -3, 5), MB = ladeM(EIN.MB, 3, 2, -3, 5), sel = [0, 0];
  function multKarte(){
    groesse($("maGr"), MA.length, MA[0].length, function(m, n){ MA = anpassen(MA, m, n); sel = [0, 0]; multKarte(); }, 4, 4);
    groesse($("mbGr"), MB.length, MB[0].length, function(m, n){ MB = anpassen(MB, m, n); sel = [0, 0]; multKarte(); }, 4, 4);
    editor($("maEd"), MA, "A", multAus); editor($("mbEd"), MB, "B", multAus);
    multAus();
  }
  function fmt(m, n){ return m + "×" + n; }
  function multAus(){
    var m = MA.length, n = MA[0].length, k = MB.length, p = MB[0].length;
    EIN.MA = speichM(MA); EIN.MB = speichM(MB); merken();
    if(n !== k){ $("mFormat").innerHTML = '<span class="fehler">' + esc(t("m_nicht", { n: n, k: k })) + "</span>"; $("mFalk").innerHTML = ""; $("mRech").innerHTML = ""; $("mBA").innerHTML = ""; sicht($("mWeiter"), false); return; }
    sicht($("mWeiter"), true);
    $("mFormat").innerHTML = '<b dir="ltr">' + esc(t("m_format", { a: fmt(m, n), b: fmt(k, p), c: fmt(m, p) })) + "</b>";
    if(sel[0] >= m || sel[1] >= p) sel = [0, 0];
    var C = mmul(MA, MB), i0 = sel[0], j0 = sel[1];
    $("mFalk").innerHTML = '<div class="falk" dir="ltr"><div></div><div>' + matH(MB, { zk: function(i, j){ return j === j0 ? "hlC" : ""; } }) + '</div><div class="fA">' + matH(MA, { zk: function(i){ return i === i0 ? "hlR" : ""; } }) +
      "</div><div>" + matH(C, { zk: function(i, j){ return "klick" + (i === i0 && j === j0 ? " hlX" : ""); }, daten: function(i, j){ return 'data-ci="' + i + '" data-cj="' + j + '"'; } }) + '</div></div><p class="zeile muted">' + esc(t("m_klick")) + "</p>";
    var prod = [], werte = [];
    for(var q = 0; q < n; q++){ prod.push('<span class="cR">' + zH(MA[i0][q]) + '</span> · <span class="cC">' + zK(MB[q][j0]) + "</span>"); werte.push(mal(MA[i0][q], MB[q][j0])); }
    var L = [{ h: "<b>" + sub("c", i0, j0) + "</b>", n: esc(t("m_zs", { i: i0 + 1, j: j0 + 1 })) }, prod.join(" + ")];
    if(n > 1) L.push(werte.map(function(w, x){ return x ? zK(w) : zH(w); }).join(" + "));
    L.push("<b>" + zH(C[i0][j0]) + "</b>");
    $("mRech").innerHTML = kette(L);
    if(p === m){
      var BA = mmul(MB, MA), gl = BA.length === C.length && BA.every(function(r, i){ return r.every(function(x, j){ return gleich(x, C[i][j]); }); });
      $("mBA").innerHTML = '<p class="merke">' + esc(t("m_komm")) + '</p><div class="reihe2"><span class="mname">A · B =</span> ' + matH(C) + '<span class="pfeil">' + (gl ? "=" : "≠") + '</span><span class="mname">B · A =</span> ' + matH(BA) + "</div>";
    } else $("mBA").innerHTML = '<p class="merke">' + esc(t("m_komm")) + "</p>";
  }

  // ---------- Reiter Determinante & Inverse ----------
  var dN = EIN.dN === 3 ? 3 : 2, D2 = ladeM(EIN.D2, 2, 2, -4, 6), D3 = ladeM(EIN.D3, 3, 3, -3, 4);
  function detKarte(){
    $("dGr").innerHTML = '<b>' + esc(t("d_groesse")) + '</b> <span class="chips">' + [2, 3].map(function(k){ return '<button type="button" class="chip" data-n="' + k + '" aria-pressed="' + (k === dN) + '">' + k + "×" + k + "</button>"; }).join("") + "</span>";
    editor($("dEd"), dN === 2 ? D2 : D3, "A", detAus);
    detAus();
  }
  function sarrusTerme(M){ // [[i,j]×3, Vorzeichen]
    var T = [];
    for(var s = 0; s < 3; s++) T.push([[[0, s], [1, (s + 1) % 3], [2, (s + 2) % 3]], 1]);
    for(var u = 0; u < 3; u++) T.push([[[0, (u + 2) % 3], [1, (u + 1) % 3], [2, u]], -1]);
    return T;
  }
  function detWeg(M){ // HTML: Bild + Rechnung
    if(M.length === 2){
      var p = mal(M[0][0], M[1][1]), q = mal(M[0][1], M[1][0]), d = minus(p, q);
      return '<p class="zeile">' + esc(t("d_T2")) + "</p>" + '<div class="reihe2"><span class="mname">det</span> ' + matH(M, { zk: function(i, j){ return i === j ? "d1" : "d2"; } }) + "</div>" +
        kette(["det A", '<span class="cD1">' + zH(M[0][0]) + " · " + zK(M[1][1]) + '</span> − <span class="cD2">' + zK(M[0][1]) + " · " + zK(M[1][0]) + "</span>", zH(p) + " − " + zK(q), "<b>" + zH(d) + "</b>"]);
    }
    var T = sarrusTerme(M), S = neu(3, 5, function(i, j){ return M[i][j % 3]; }), sum = NULL;
    var tab = matH(S, { zk: function(i, j){ return j >= 3 ? "blass" : ""; } });
    var terme = T.map(function(tt, x){
      var w = tt[0].reduce(function(a, c){ return mal(a, M[c[0]][c[1]]); }, EINS); sum = tt[1] > 0 ? plus(sum, w) : minus(sum, w);
      var vz = x === 0 ? (tt[1] < 0 ? "− " : "") : (tt[1] > 0 ? "+ " : "− ");
      return '<span class="st ' + (tt[1] > 0 ? "sp" : "sm") + '" data-k="' + x + '">' + vz + tt[0].map(function(c, y){ return y || vz ? zK(M[c[0]][c[1]]) : zH(M[c[0]][c[1]]); }).join(" · ") + "</span>";
    });
    var werte = T.map(function(tt, x){ var w = tt[0].reduce(function(a, c){ return mal(a, M[c[0]][c[1]]); }, EINS); return (x === 0 ? (tt[1] < 0 ? "− " : "") : (tt[1] > 0 ? " + " : " − ")) + (x === 0 && tt[1] > 0 ? zH(w) : zK(w)); });
    return '<p class="zeile">' + esc(t("d_T3")) + '</p><div id="sarrus">' + tab + "</div>" + kette(["det A", terme.join(" "), werte.join(""), "<b>" + zH(sum) + "</b>"]);
  }
  function detAus(){
    var M = dN === 2 ? D2 : D3, d = det(M), h = detWeg(M);
    h += '<p class="merke">' + esc(t("d_sinn")) + "</p>";
    $("dAus").innerHTML = h;
    // Inverse
    var I = "<h2>" + esc(t("i_titel")) + '</h2><p class="zeile">' + esc(t("i_T")) + "</p>";
    if(d.n === 0) I += '<p class="fehler">' + esc(t("d_null")) + "</p>";
    else if(dN === 2){
      var adj = [[M[1][1], Fr(-M[0][1].n, M[0][1].d)], [Fr(-M[1][0].n, M[1][0].d), M[0][0]]], inv = adj.map(function(r){ return r.map(function(x){ return durch(x, d); }); });
      I += '<p class="zeile">' + esc(t("i_2")) + "</p>" + kette(["A<sup>−1</sup>", bruchHtml(1, zH(d)) + " · " + matH(adj, { zk: function(i, j){ return i === j ? "d1" : "d2"; } }), "<b>" + matH(inv) + "</b>"]);
      I += '<p class="zeile"><b>' + esc(t("i_probe")) + "</b></p>" + kette([matH(M) + " · " + matH(inv), matH(mmul(M, inv))]);
    } else {
      var gj = gaussJordan(M);
      I += '<p class="zeile">' + esc(t("i_gj")) + '</p><div class="gj">' + gj.schritte.map(function(s){ return '<div class="gjs"><span class="kn">' + (s.n || "") + "</span>" + matH(s.M, { trenn: 3 }) + "</div>"; }).join('<span class="pfeil">→</span>') + "</div>";
      I += kette(["A<sup>−1</sup>", "<b>" + matH(gj.inv) + "</b>"]) + '<p class="zeile"><b>' + esc(t("i_probe")) + "</b></p>" + kette(["A · A<sup>−1</sup>", matH(mmul(M, gj.inv))]);
    }
    $("iAus").innerHTML = I;
    EIN.dN = dN; EIN.D2 = speichM(D2); EIN.D3 = speichM(D3); merken();
  }
  function gaussJordan(A){
    var n = A.length, M = neu(n, 2 * n, function(i, j){ return j < n ? A[i][j] : (j - n === i ? EINS : NULL); }), S = [{ M: kopie(M), n: "" }], Z = t("zk");
    var nm = function(i){ return Z + (i + 1); };
    for(var c = 0; c < n; c++){
      var notes = [];
      var p = c; while(p < n && M[p][c].n === 0) p++;
      if(p !== c){ var tmp = M[p]; M[p] = M[c]; M[c] = tmp; notes.push(nm(c) + " ↔ " + nm(p)); }
      var pv = M[c][c];
      if(!gleich(pv, EINS)){ M[c] = M[c].map(function(x){ return durch(x, pv); }); notes.push(nm(c) + " : " + zK(pv)); }
      if(notes.length){ S.push({ M: kopie(M), n: notes.join(", ") }); notes = []; }
      for(var r = 0; r < n; r++){ if(r === c || M[r][c].n === 0) continue; var f = M[r][c];
        M[r] = M[r].map(function(x, j){ return minus(x, mal(f, M[c][j])); });
        notes.push(nm(r) + (f.n > 0 ? " − " : " + ") + (gleich(f, EINS) || gleich(f, F(-1)) ? "" : zH(Fr(Math.abs(f.n), f.d)) + " · ") + nm(c)); }
      if(notes.length) S.push({ M: kopie(M), n: notes.join(", ") });
    }
    return { schritte: S, inv: M.map(function(r){ return r.slice(n); }) };
  }

  // ---------- Reiter Abbildungen ----------
  var AB = EIN.AB || { a: 1, b: 0.5, c: 0, d: 1 }, aWinkel = EIN.aW || 30, aVor = EIN.aVor || "";
  var FIG = [[0, 0], [0.4, 0], [0.4, 0.8], [1, 0.8], [1, 1.1], [0.4, 1.1], [0.4, 1.6], [1.2, 1.6], [1.2, 2], [0, 2]];
  function abbVorlagen(){
    var V = [["ident", "a_ident"], ["dreh", "a_dreh"], ["spieg", "a_spieg"], ["streck", "a_streck"], ["scher", "a_scher"], ["proj", "a_proj"]];
    $("aVor").innerHTML = '<span class="muted">' + esc(t("a_vor")) + "</span> " + V.map(function(v){ return '<button type="button" class="chip" data-v="' + v[0] + '" aria-pressed="' + (v[0] === aVor) + '">' + esc(t(v[1])) + "</button>"; }).join(" ");
    sicht($("aWL"), aVor === "dreh");
  }
  function setzVorlage(v){
    aVor = v;
    var M = { ident: [1, 0, 0, 1], spieg: [1, 0, 0, -1], streck: [2, 0, 0, 1.5], scher: [1, 1, 0, 1], proj: [1, 0, 0, 0] }[v];
    if(v === "dreh"){ var w = aWinkel * Math.PI / 180; M = [Math.cos(w), -Math.sin(w), Math.sin(w), Math.cos(w)]; }
    AB = { a: M[0], b: M[1], c: M[2], d: M[3] };
    ["a", "b", "c", "d"].forEach(function(k){ $("ab" + k).value = AB[k]; });
    abbVorlagen(); abbAus();
  }
  function r2(x){ var v = Math.round(x * 100) / 100; if(Math.abs(v) < 1e-9) v = 0; return (v < 0 ? "−" : "") + String(Math.abs(v)).replace(".", komma()); }
  function r2k(x){ var s = r2(x); return s.charAt(0) === "−" ? "(" + s + ")" : s; }
  function bdiC(h){ return h.replace(/C = [^.。،:：]+/, function(m){ return '<bdi dir="ltr">' + m.trim() + "</bdi>" + (m.slice(-1) === " " ? " " : ""); }); }
  function abbAus(){
    ["a", "b", "c", "d"].forEach(function(k){ $("ab" + k + "W").textContent = r2(AB[k]); });
    $("aWW").textContent = aWinkel + "°";
    var S = 50, X = function(x){ return (200 + x * S).toFixed(1); }, Y = function(y){ return (200 - y * S).toFixed(1); };
    var ab = function(p){ return [AB.a * p[0] + AB.b * p[1], AB.c * p[0] + AB.d * p[1]]; };
    var poly = function(P, f, s, extra){ return '<polygon points="' + P.map(function(p){ return X(p[0]) + "," + Y(p[1]); }).join(" ") + '" fill="' + f + '" stroke="' + s + '" stroke-width="2" ' + (extra || "") + "/>"; };
    var h = '<svg class="bild" viewBox="0 0 400 400" width="400" role="img">';
    for(var g = -5; g <= 5; g++) h += '<line x1="' + X(g) + '" y1="0" x2="' + X(g) + '" y2="400" stroke="#e2e8f0"/><line x1="0" y1="' + Y(g) + '" x2="400" y2="' + Y(g) + '" stroke="#e2e8f0"/>';
    h += '<line x1="0" y1="200" x2="400" y2="200" stroke="#64748b"/><line x1="200" y1="0" x2="200" y2="400" stroke="#64748b"/>';
    var Q = [[0, 0], [1, 0], [1, 1], [0, 1]];
    h += poly(Q, "none", "#94a3b8", 'stroke-dasharray="4 4"') + poly(FIG, "rgba(148,163,184,0.25)", "#94a3b8", 'stroke-dasharray="5 4"');
    h += poly(Q.map(ab), "rgba(124,58,237,0.12)", "#7c3aed") + poly(FIG.map(ab), "rgba(234,88,12,0.45)", "#c2410c");
    var pfeil = function(p, f){ var x = X(p[0]), y = Y(p[1]); return '<line x1="200" y1="200" x2="' + x + '" y2="' + y + '" stroke="' + f + '" stroke-width="3.5"/><circle cx="' + x + '" cy="' + y + '" r="5" fill="' + f + '"/>'; };
    h += pfeil(ab([1, 0]), "#e11d48") + pfeil(ab([0, 1]), "#2563eb");
    h += '<text x="8" y="20" font-size="14" fill="#64748b">' + esc(t("a_orig")) + '</text><text x="8" y="38" font-size="14" font-weight="700" fill="#c2410c">' + esc(t("a_bild")) + "</text>";
    $("aBild").innerHTML = h + "</svg>";
    var d = AB.a * AB.d - AB.b * AB.c;
    $("aMat").innerHTML = '<span class="mname">A =</span> <span class="mw" dir="ltr"><table class="mat"><tr><td class="cE1">' + r2(AB.a) + '</td><td class="cE2">' + r2(AB.b) + '</td></tr><tr><td class="cE1">' + r2(AB.c) + '</td><td class="cE2">' + r2(AB.d) + "</td></tr></table></span>" +
      kette(["det A", r2(AB.a) + " · " + r2k(AB.d) + " − " + r2k(AB.b) + " · " + r2k(AB.c), "<b>" + r2(d) + "</b>"]) +
      '<p class="zeile">' + (Math.abs(d) < 0.005 ? esc(t("a_platt")) : esc(t("a_fl", { d: r2(Math.abs(d)) })) + (d < 0 ? " " + esc(t("a_spiegelt")) : "")) + "</p>";
    EIN.AB = AB; EIN.aW = aWinkel; EIN.aVor = aVor; merken();
  }

  // ---------- Üben ----------
  var TYPEN = ["format", "eintrag", "add", "det2", "det3", "inv", "mix"];
  var typ = TYPEN.indexOf(EIN.typ) >= 0 ? EIN.typ : "eintrag", stufe = [1, 2, 3].indexOf(EIN.stufe) >= 0 ? EIN.stufe : 1;
  var auf = null, beantwortet = false, zweiterV = false, punkte = 0, anzahl = 0, serie = 0;
  function einstellungen(){
    $("einst").innerHTML = '<div class="reihe"><b>' + esc(t("u_typ")) + '</b><span class="chips">' + TYPEN.map(function(k){ return '<button type="button" class="chip" data-typ="' + k + '" aria-pressed="' + (k === typ) + '">' + esc(t("u_" + k)) + "</button>"; }).join("") + "</span></div>" +
      '<div class="reihe"><b>' + esc(t("u_stufe")) + '</b><span class="chips">' + [1, 2, 3].map(function(s){ return '<button type="button" class="chip" data-st="' + s + '" aria-pressed="' + (s === stufe) + '">' + s + " · " + esc(t("s" + s)) + "</button>"; }).join("") + "</span></div>";
  }
  $("einst").addEventListener("click", function(e){
    var b = e.target.closest("button"); if(!b) return;
    if(b.dataset.typ){ typ = b.dataset.typ; EIN.typ = typ; } else if(b.dataset.st){ stufe = +b.dataset.st; EIN.stufe = stufe; } else return;
    merken(); einstellungen(); aufraeumen(); neueAufgabe();
  });
  function bereich(){ return stufe === 1 ? [0, 5] : stufe === 2 ? [-5, 6] : [-9, 9]; }
  function genFormat(){
    var m = zuf(1, 4), n = zuf(1, 4), p = zuf(1, 4), k = rnd() < 0.7 ? n : wahl([1, 2, 3, 4].filter(function(x){ return x !== n; }));
    var richtig = k === n ? fmt(m, p) : "nichtDef", opts = [richtig];
    [fmt(p, m), fmt(m, n), fmt(n, p), fmt(k, n), fmt(m, k), "nichtDef"].forEach(function(o){ if(opts.indexOf(o) < 0 && opts.length < 4) opts.push(o); });
    opts.sort(function(){ return rnd() - 0.5; });
    var A = neu(m, n, function(){ return F(zuf(0, 9)); }), B = neu(k, p, function(){ return F(zuf(0, 9)); });
    return { typ: "format", frage: function(){ return esc(t("q_format")) + '<div class="reihe2"><span class="mname">A =</span> ' + matH(A) + '<span class="mname">B =</span> ' + matH(B) + "</div>"; },
      opts: opts, ok: richtig,
      weg: function(){ return '<p class="zeile">' + esc(t("m_bed")) + "</p><p class=\"zeile\"><b dir=\"ltr\">" + (k === n ? esc(t("m_format", { a: fmt(m, n), b: fmt(k, p), c: fmt(m, p) })) : esc(t("m_nicht", { n: n, k: k }))) + "</b></p>"; } };
  }
  function genEintrag(){
    var b = bereich(), m = stufe === 1 ? 2 : zuf(2, 3), n = stufe === 1 ? 2 : zuf(2, 3), p = stufe === 3 ? zuf(2, 3) : 2;
    var A = zufM(m, n, b[0], b[1]), B = zufM(n, p, b[0], b[1]), i = zuf(0, m - 1), j = zuf(0, p - 1), C = mmul(A, B);
    return { typ: "eintrag", e: C[i][j], frage: function(){ return bdiC(esc(t("q_eintrag", { e: "§" }))).replace("§", "<b>" + sub("c", i, j) + "</b>") + '<div class="reihe2"><span class="mname">A =</span> ' + matH(A) + '<span class="mname">B =</span> ' + matH(B) + "</div>"; },
      weg: function(){
        var prod = [], w = []; for(var q = 0; q < n; q++){ prod.push('<span class="cR">' + zH(A[i][q]) + '</span> · <span class="cC">' + zK(B[q][j]) + "</span>"); w.push(mal(A[i][q], B[q][j])); }
        return '<div class="reihe2">' + matH(A, { zk: function(x){ return x === i ? "hlR" : ""; } }) + "<span class=\"pfeil\">·</span>" + matH(B, { zk: function(x, y){ return y === j ? "hlC" : ""; } }) + "</div>" +
          kette([{ h: "<b>" + sub("c", i, j) + "</b>", n: esc(t("m_zs", { i: i + 1, j: j + 1 })) }, prod.join(" + "), w.map(function(x, y){ return y ? zK(x) : zH(x); }).join(" + "), "<b>" + zH(C[i][j]) + "</b>"]);
      } };
  }
  function genAdd(){
    var b = bereich(), m = zuf(2, 3), n = zuf(2, 3), A = zufM(m, n, b[0], b[1]), B = zufM(m, n, b[0], b[1]);
    var r = stufe === 1 ? 1 : zuf(2, 3), s = stufe === 1 ? 1 : stufe === 2 ? -1 : -zuf(2, 3), i = zuf(0, m - 1), j = zuf(0, n - 1);
    var term = (r === 1 ? "" : r + " · ") + "A " + (s < 0 ? "− " : "+ ") + (Math.abs(s) === 1 ? "" : Math.abs(s) + " · ") + "B";
    var e = plus(mal(F(r), A[i][j]), mal(F(s), B[i][j]));
    return { typ: "add", e: e, frage: function(){ return bdiC(esc(t("q_add", { e: "§", term: term }))).replace("§", "<b>" + sub("c", i, j) + "</b>") + '<div class="reihe2"><span class="mname">A =</span> ' + matH(A, {}) + '<span class="mname">B =</span> ' + matH(B) + "</div>"; },
      weg: function(){
        var z1 = (r === 1 ? "" : r + " · ") + zK(A[i][j]), z2 = (Math.abs(s) === 1 ? "" : Math.abs(s) + " · ") + zK(B[i][j]);
        var L = [{ h: "<b>" + sub("c", i, j) + "</b>", n: sub("a", i, j) + ", " + sub("b", i, j) }, z1 + (s < 0 ? " − " : " + ") + z2];
        if(r !== 1 || Math.abs(s) !== 1) L.push(zH(mal(F(r), A[i][j])) + (s < 0 ? " − " : " + ") + zK(mal(F(Math.abs(s)), B[i][j])));
        L.push("<b>" + zH(e) + "</b>");
        return '<div class="reihe2">' + matH(A, { zk: function(x, y){ return x === i && y === j ? "hlX" : ""; } }) + matH(B, { zk: function(x, y){ return x === i && y === j ? "hlX" : ""; } }) + "</div>" + kette(L);
      } };
  }
  function genDet(n){
    var b = bereich(), M = zufM(n, n, n === 3 && stufe === 3 ? -6 : b[0], n === 3 && stufe === 3 ? 6 : b[1]);
    return { typ: "det" + n, e: det(M), frage: function(){ return esc(t("q_det")) + '<div class="reihe2"><span class="mname">A =</span> ' + matH(M) + "</div>"; }, weg: function(){ return detWeg(M); } };
  }
  function genInv(){
    var M, d, erlaubt = stufe === 1 ? [1, -1] : stufe === 2 ? [1, -1, 2, -2] : [2, -2, 3, -3, 4, 5, -5];
    do { M = zufM(2, 2, stufe === 1 ? -3 : -6, 6); d = det(M); } while(erlaubt.indexOf(d.n) < 0);
    var adj = [[M[1][1], Fr(-M[0][1].n)], [Fr(-M[1][0].n), M[0][0]]], inv = adj.map(function(r){ return r.map(function(x){ return durch(x, d); }); }), i = zuf(0, 1), j = zuf(0, 1);
    return { typ: "inv", e: inv[i][j], hinweis: true,
      frage: function(){ return esc(t("q_inv", { e: "§" })).replace("§", "<b>" + sub("a", i, j) + "</b> (A<sup>−1</sup>)") + '<div class="reihe2"><span class="mname">A =</span> ' + matH(M) + "</div>"; },
      weg: function(){ return kette(["det A", zH(M[0][0]) + " · " + zK(M[1][1]) + " − " + zK(M[0][1]) + " · " + zK(M[1][0]), "<b>" + zH(d) + "</b>"]) + '<p class="zeile">' + esc(t("i_2")) + "</p>" +
        kette(["A<sup>−1</sup>", bruchHtml(1, zH(d)) + " · " + matH(adj), matH(inv, { zk: function(x, y){ return x === i && y === j ? "hlX" : ""; } })]); } };
  }
  function erzeuge(seed, ty, st){
    var altT = typ, altS = stufe; typ = ty || typ; stufe = st || stufe;
    var sd = seed === undefined ? Math.floor(Math.random() * 2147483647) : seed, A;
    rnd = seeded(sd);
    try {
      var tp = typ === "mix" ? wahl(["format", "eintrag", "add", "det2", "det3", "inv"]) : typ;
      A = tp === "format" ? genFormat() : tp === "eintrag" ? genEintrag() : tp === "add" ? genAdd() : tp === "det2" ? genDet(2) : tp === "det3" ? genDet(3) : genInv();
    } finally { rnd = Math.random; }
    A.seed = sd; A.typ0 = typ; A.stufe0 = stufe; typ = altT; stufe = altS;
    return A;
  }
  function neueAufgabe(){ auf = erzeuge(); beantwortet = false; zweiterV = false; zeige(); var i = $("uAntwort"); if(auf.typ !== "format" && tab === "ueben" && document.activeElement !== i) try { i.focus({ preventScroll: true }); } catch(e){} }
  function zeige(){
    if(!auf) return;
    $("punkte").textContent = t("punkte", { r: punkte, n: anzahl }) + (serie > 1 ? " · " + t("serie", { s: serie }) : "");
    $("auftrag").innerHTML = auf.frage();
    var mc = auf.typ === "format"; sicht($("uZeile"), !mc); sicht($("gWahl"), mc);
    if(mc){
      $("gWahl").innerHTML = auf.opts.map(function(o){ return '<button type="button" class="knopf hell gw" data-o="' + o + '"><bdi dir="ltr">' + esc(o === "nichtDef" ? t("nichtDef") : o) + "</bdi></button>"; }).join(" ");
      if(beantwortet) $("gWahl").querySelectorAll(".gw").forEach(function(b){ if(b.dataset.o === auf.ok) b.classList.add("ok"); else if(b.dataset.o === auf.gewaehlt) b.classList.add("nein"); b.disabled = true; });
    }
    $("hinweis").textContent = auf.hinweis ? t("h_bruch") : ""; sicht($("hinweis"), !!auf.hinweis);
    $("pruefen").textContent = t("pruefen"); $("weiter").textContent = t("weiter");
  }
  function richtigGemacht(){ punkte++; serie++; if(typeof window.msRichtig === "function") try { window.msRichtig(); } catch(e){} }
  function ergebnisZeigen(){
    var m = $("meldung");
    if(auf.richtig){ m.className = "meldung gut"; m.textContent = t("richtig"); }
    else { m.className = "meldung schlecht"; m.textContent = t("falsch", { l: auf.typ === "format" ? (auf.ok === "nichtDef" ? t("nichtDef") : auf.ok) : zahlTxt(auf.e) }); }
    $("uWeg").innerHTML = '<p class="zeile"><b>' + esc(t("loesung")) + "</b></p>" + auf.weg(); sicht($("uWeg"), true);
  }
  function pruefen(){
    if(!auf || beantwortet || auf.typ === "format") return;
    var m = $("meldung"), inp = $("uAntwort"), e = inp.value.trim(); if(!e) return;
    var z = leseZahl(e), ok = !!z && gleich(z, auf.e);
    if(!ok && !zweiterV && typeof window.msTippbar === "function" && window.msTippbar(e)){ zweiterV = true; window.msNochmal(m); return; }
    beantwortet = true; anzahl++; auf.richtig = ok;
    if(ok){ richtigGemacht(); inp.classList.add("richtig"); } else { serie = 0; inp.classList.add("falsch"); }
    ergebnisZeigen(); zeige();
  }
  function formatGewaehlt(o){
    if(!auf || beantwortet || auf.typ !== "format") return;
    beantwortet = true; anzahl++; auf.gewaehlt = o; auf.richtig = o === auf.ok;
    if(auf.richtig) richtigGemacht(); else serie = 0;
    zeige(); ergebnisZeigen();
  }
  function aufraeumen(){ var m = $("meldung"); m.className = "meldung"; m.textContent = ""; sicht($("uWeg"), false); $("uWeg").innerHTML = ""; var i = $("uAntwort"); i.classList.remove("richtig", "falsch"); i.value = ""; }
  $("pruefen").addEventListener("click", pruefen);
  $("weiter").addEventListener("click", function(){ aufraeumen(); neueAufgabe(); });
  $("uAntwort").addEventListener("keydown", function(e){ if(e.key !== "Enter") return; e.preventDefault(); if(beantwortet){ aufraeumen(); neueAufgabe(); } else pruefen(); });
  $("gWahl").addEventListener("click", function(e){ var b = e.target.closest(".gw"); if(b) formatGewaehlt(b.dataset.o); });
  document.addEventListener("keydown", function(e){ if(e.key === "Enter" && beantwortet && tab === "ueben" && auf && auf.typ === "format" && document.activeElement && document.activeElement.tagName !== "INPUT"){ aufraeumen(); neueAufgabe(); } });

  // ---------- Bedienung ----------
  $("rOps").addEventListener("click", function(e){ var b = e.target.closest("[data-op]"); if(!b) return; rOp = b.dataset.op; rechAus(); });
  $("rZ").addEventListener("input", rechAus);
  $("rZuf").addEventListener("click", function(){ var b = [-4, 6]; R1 = zufM(R1.length, R1[0].length, b[0], b[1]); R2 = zufM(R2.length, R2[0].length, b[0], b[1]); rechKarte(); });
  $("mFalk").addEventListener("click", function(e){ var c = e.target.closest("[data-ci]"); if(!c) return; sel = [+c.dataset.ci, +c.dataset.cj]; multAus(); });
  $("mWeiter").addEventListener("click", function(){ var p = MB[0].length, m = MA.length; sel[1]++; if(sel[1] >= p){ sel[1] = 0; sel[0] = (sel[0] + 1) % m; } multAus(); });
  $("mZuf").addEventListener("click", function(){ MA = zufM(MA.length, MA[0].length, -3, 5); MB = zufM(MB.length, MB[0].length, -3, 5); multKarte(); });
  $("dGr").addEventListener("click", function(e){ var b = e.target.closest("[data-n]"); if(!b) return; dN = +b.dataset.n; detKarte(); });
  $("dZuf").addEventListener("click", function(){ if(dN === 2) D2 = zufM(2, 2, -4, 6); else D3 = zufM(3, 3, -3, 4); detKarte(); });
  // Sarrus: Term überfahren/antippen → Zellen markieren
  function sarrusMark(x){
    var box = $("sarrus"); if(!box) return;
    box.querySelectorAll("td").forEach(function(td){ td.classList.remove("sm1", "sm2"); });
    if(x === null) return;
    var trs = box.querySelectorAll("tr"), cls = x < 3 ? "sm1" : "sm2";
    var cells = x < 3 ? [[0, x], [1, x + 1], [2, x + 2]] : [[0, x - 1], [1, x - 2], [2, x - 3]];
    cells.forEach(function(c){ var td = trs[c[0]] && trs[c[0]].children[c[1]]; if(td) td.classList.add(cls); });
  }
  ["dAus", "uWeg"].forEach(function(id){
    $(id).addEventListener("mouseover", function(e){ var s = e.target.closest(".st"); sarrusMark(s ? +s.dataset.k : null); });
    $(id).addEventListener("click", function(e){ var s = e.target.closest(".st"); if(s) sarrusMark(+s.dataset.k); });
  });
  ["a", "b", "c", "d"].forEach(function(k){ $("ab" + k).addEventListener("input", function(){ AB[k] = +$("ab" + k).value; aVor = ""; abbVorlagen(); abbAus(); }); });
  $("aW").addEventListener("input", function(){ aWinkel = +$("aW").value; setzVorlage("dreh"); });
  $("aVor").addEventListener("click", function(e){ var b = e.target.closest("[data-v]"); if(b) setzVorlage(b.dataset.v); });

  // ---------- Reiter & Texte ----------
  var tab = "grund", TABS = ["grund", "mult", "det", "abb", "ueben"];
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
    $("gaInfo").textContent = "";
    grundKarte(); besondere(); rechKarte(); multKarte(); detKarte(); abbVorlagen(); abbAus(); einstellungen();
    if(auf){ var r = auf.richtig, g = auf.gewaehlt; auf = erzeuge(auf.seed, auf.typ0, auf.stufe0); auf.richtig = r; auf.gewaehlt = g; zeige(); if(beantwortet) ergebnisZeigen(); }
  }
  window.MS_LANG = { apply: function(l){ if(MX[l]){ lang = l; alles(); } } };
  $("rZ").value = rZahl;
  ["a", "b", "c", "d"].forEach(function(k){ $("ab" + k).value = AB[k]; }); $("aW").value = aWinkel;
  alles();
  var hz = (location.hash || "").slice(1); if(TABS.indexOf(hz) >= 0) zeigeTab(hz);
  window.MS_MX_TEST = { erzeuge: erzeuge, det: det, mmul: mmul, gaussJordan: gaussJordan, leseZahl: leseZahl, Fr: Fr };
})();
