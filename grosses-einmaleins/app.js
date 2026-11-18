// ============================================================
// grosses-einmaleins/app.js – Großes Einmaleins (11 bis 20)
// Tabelle: alle Produkte 11 · 11 … 20 · 20, Feld antippen = Rechenweg
// (Zerlegen, dazu passende Tricks). Tricks: Zerlegen, mal 11, mal 15,
// Quadratzahlen, Nachbarn einer Quadratzahl – je mit neuem Beispiel.
// Üben: Reihen 11–20 wählbar, zweiter Faktor 1–10 / 11–20 / 1–20,
// Malnehmen / Teilen / gemischt; zwei Versuche (msTippbar/msNochmal),
// danach Lösung mit Rechenweg. Einstellungen in localStorage "msGE".
// Texte: texte.js (GE), Sprache aus dem Startmenü (MS_LANG).
// ============================================================
(function(){
  "use strict";
  var lang = "de";
  function $(id){ return document.getElementById(id); }
  function t(k, v){ var s = (GE[lang] && GE[lang][k]) || GE.de[k] || k; if(v) for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function sicht(e, an){ if(an) e.removeAttribute("hidden"); else e.setAttribute("hidden", ""); }
  function zuf(a, b){ return a + Math.floor(Math.random() * (b - a + 1)); }
  function wahl(L){ return L[Math.floor(Math.random() * L.length)]; }
  function li(s){ return '<li><bdi dir="ltr">' + esc(s) + "</bdi></li>"; }

  // ---------- Rechenweg für a · b ----------
  // Zerlegen der Zahl, die größer als 10 ist, in 10 + Rest; dazu ein passender Trick
  function weg(a, b){
    var L = [], p = a * b;
    var gross = a > 10 ? a : b, klein = gross === a ? b : a;
    if(gross > 10 && gross !== 10){
      var rest = gross - 10;
      if(klein > 10 && klein !== gross){ // beide zweistellig: zweite Zahl zerlegen
        var r2 = b - 10;
        L.push(a + " · " + b + " = " + a + " · 10 + " + a + " · " + r2 + " = " + (a * 10) + " + " + (a * r2) + " = " + p);
      } else if(klein > 10){ // gleiche Zahlen (Quadrat)
        L.push(a + " · " + b + " = " + a + " · 10 + " + a + " · " + (b - 10) + " = " + (a * 10) + " + " + (a * (b - 10)) + " = " + p);
      } else {
        L.push(gross + " · " + klein + " = 10 · " + klein + " + " + rest + " · " + klein + " = " + (10 * klein) + " + " + (rest * klein) + " = " + p);
      }
    } else L.push(a + " · " + b + " = " + p);
    var tr = [];
    if(a === b && a > 10) tr.push(t("tr_quad") + ": " + a + "² = " + p);
    else if(a > 10 && b > 10 && (a + b) % 2 === 0 && a !== b){ var m = (a + b) / 2, d = Math.abs(a - b) / 2; tr.push(t("tr_nach") + ": " + Math.min(a, b) + " · " + Math.max(a, b) + " = " + m + "² − " + d + "² = " + (m * m) + " − " + (d * d) + " = " + p); }
    if(a === 11 || b === 11){ var o = a === 11 ? b : a; if(o !== 11) tr.push(t("tr_11") + ": 11 · " + o + " = 10 · " + o + " + " + o + " = " + (10 * o) + " + " + o + " = " + p); }
    if((a === 15 || b === 15) && ((a === 15 ? b : a) % 2 === 0)){ var o2 = a === 15 ? b : a; tr.push(t("tr_15") + ": 15 · " + o2 + " = 30 · " + o2 + " : 2 = " + (30 * o2) + " : 2 = " + p); }
    return { L: L, tr: tr };
  }
  function wegHtml(a, b, durch){
    var W = weg(a, b), h = '<p class="zeile"><b>' + esc(t("weg")) + '</b> <span class="muted">' + esc(t("zerl")) + '</span></p><ol class="lauf">' + W.L.map(li).join("");
    if(durch) h += li((a * b) + " : " + durch.d + " = " + durch.e);
    h += "</ol>";
    if(W.tr.length) h += '<ul class="trick">' + W.tr.map(function(s){ return '<li><bdi dir="ltr">' + esc(s) + "</bdi></li>"; }).join("") + "</ul>";
    return h;
  }

  // ---------- Tabelle ----------
  var wahlZelle = null;
  function tabelle(){
    var h = '<table class="tab"><thead><tr><th>·</th>';
    for(var c = 11; c <= 20; c++) h += "<th>" + c + "</th>";
    h += "</tr></thead><tbody>";
    for(var r = 11; r <= 20; r++){
      h += "<tr><th>" + r + "</th>";
      for(var c2 = 11; c2 <= 20; c2++){
        var an = wahlZelle && wahlZelle[0] === r && wahlZelle[1] === c2;
        h += '<td><button type="button" class="z' + (r === c2 ? " quad" : "") + (an ? " an" : "") + '" data-r="' + r + '" data-c="' + c2 + '">' + (r * c2) + "</button></td>";
      }
      h += "</tr>";
    }
    $("tabelle").innerHTML = h + "</tbody></table>";
    $("tabelle").querySelectorAll("button.z").forEach(function(b){ b.addEventListener("click", function(){ wahlZelle = [+b.dataset.r, +b.dataset.c]; tabelle(); }); });
    $("tabWeg").innerHTML = wahlZelle ? wegHtml(wahlZelle[0], wahlZelle[1]) : "";
  }

  // ---------- Tricks ----------
  var BSP = {};
  function bspNeu(k){
    if(k === "zerl") BSP.zerl = [zuf(11, 19), zuf(12, 19)];
    if(k === "11") BSP["11"] = zuf(12, 19);
    if(k === "15") BSP["15"] = wahl([12, 14, 16, 18, 20]);
    if(k === "nach"){ var m = zuf(13, 19), d = zuf(1, 3); BSP.nach = [m, d]; }
  }
  function tricks(){
    ["zerl", "11", "15", "nach"].forEach(function(k){ if(BSP[k] == null) bspNeu(k); });
    var a = BSP.zerl[0], b = BSP.zerl[1], o = BSP["11"], f = BSP["15"], m = BSP.nach[0], d = BSP.nach[1];
    var K = [
      ["zerl", t("tr_zerl"), t("tr_zerlT"), [a + " · " + b + " = " + a + " · 10 + " + a + " · " + (b - 10) + " = " + (a * 10) + " + " + (a * (b - 10)) + " = " + (a * b)]],
      ["11", t("tr_11"), t("tr_11T"), ["11 · " + o + " = 10 · " + o + " + " + o + " = " + (10 * o) + " + " + o + " = " + (11 * o)]],
      ["15", t("tr_15"), t("tr_15T"), ["15 · " + f + " = 30 · " + f + " : 2 = " + (30 * f) + " : 2 = " + (15 * f), "15 · " + f + " = 10 · " + f + " + 5 · " + f + " = " + (10 * f) + " + " + (5 * f) + " = " + (15 * f)]],
      ["nach", t("tr_nach"), t("tr_nachT"), [(m - d) + " · " + (m + d) + " = " + m + "² − " + d + "² = " + (m * m) + " − " + (d * d) + " = " + ((m - d) * (m + d))]]
    ];
    var h = "";
    K.forEach(function(x){
      h += '<div class="karte trick-k"><h2>' + esc(x[1]) + '</h2><p class="zeile">' + esc(x[2]) + '</p><ol class="lauf">' + x[3].map(li).join("") + '</ol><button type="button" class="knopf hell" data-neu="' + x[0] + '">↻ ' + esc(t("tr_neu")) + "</button></div>";
    });
    var q = ""; for(var n = 11; n <= 20; n++) q += '<span class="qz"><bdi dir="ltr">' + n + "² = " + (n * n) + "</bdi></span>";
    h += '<div class="karte trick-k"><h2>' + esc(t("tr_quad")) + '</h2><p class="zeile">' + esc(t("tr_quadT")) + '</p><div class="qliste">' + q + "</div></div>";
    $("tricks").innerHTML = h;
    $("tricks").querySelectorAll("[data-neu]").forEach(function(btn){ btn.addEventListener("click", function(){ bspNeu(btn.dataset.neu); tricks(); }); });
  }

  // ---------- Üben ----------
  var EIN = (function(){ try { var o = JSON.parse(localStorage.getItem("msGE") || "null"); if(o && o.r && o.r.length) return o; } catch(e){} return { r: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20], f: "f1", a: "mal" }; })();
  function speichern(){ try { localStorage.setItem("msGE", JSON.stringify(EIN)); } catch(e){} }
  var auf = null, punkte = 0, anzahl = 0, serie = 0, beantwortet = false, zweiterV = false, letzte = "";
  function einstellungen(){
    var h = '<div class="reihe"><b>' + esc(t("reihen")) + ':</b> <span class="chips">';
    for(var r = 11; r <= 20; r++) h += '<button type="button" class="chip" data-r="' + r + '" aria-pressed="' + (EIN.r.indexOf(r) >= 0) + '">' + r + "</button>";
    h += '</span></div><div class="reihe"><b>' + esc(t("faktor")) + ':</b> <span class="chips">' + ["f1", "f2", "f3"].map(function(k){ return '<button type="button" class="chip" data-f="' + k + '" aria-pressed="' + (EIN.f === k) + '">' + esc(t(k)) + "</button>"; }).join("") +
      '</span></div><div class="reihe"><b>' + esc(t("art")) + ':</b> <span class="chips">' + ["mal", "durch", "mix"].map(function(k){ return '<button type="button" class="chip" data-a="' + k + '" aria-pressed="' + (EIN.a === k) + '">' + esc(t("art_" + k)) + "</button>"; }).join("") + "</span></div>";
    $("einst").innerHTML = h;
    $("einst").querySelectorAll("[data-r]").forEach(function(b){ b.addEventListener("click", function(){ var r = +b.dataset.r, i = EIN.r.indexOf(r); if(i >= 0){ if(EIN.r.length > 1) EIN.r.splice(i, 1); } else EIN.r.push(r); speichern(); einstellungen(); }); });
    $("einst").querySelectorAll("[data-f]").forEach(function(b){ b.addEventListener("click", function(){ EIN.f = b.dataset.f; speichern(); einstellungen(); neueAufgabe(); }); });
    $("einst").querySelectorAll("[data-a]").forEach(function(b){ b.addEventListener("click", function(){ EIN.a = b.dataset.a; speichern(); einstellungen(); neueAufgabe(); }); });
  }
  function neueAufgabe(){
    var a = wahl(EIN.r), lo = EIN.f === "f2" ? 11 : 1, hi = EIN.f === "f1" ? 10 : 20, b, n = 0;
    do { b = zuf(lo, hi); n++; } while(n < 20 && auf && auf.a === a && auf.b === b);
    var durch = EIN.a === "durch" || (EIN.a === "mix" && Math.random() < 0.5);
    auf = { a: a, b: b, durch: durch };
    beantwortet = false; zweiterV = false; letzte = "";
    zeige();
    var i = $("uAntwort"); if(i){ i.value = ""; i.focus(); }
  }
  function zeige(){
    if(!auf) return;
    var A = auf, frage = A.durch ? (A.a * A.b) + " : " + A.a + " = ?" : A.a + " · " + A.b + " = ?";
    $("auftrag").innerHTML = '<bdi dir="ltr">' + esc(frage) + "</bdi>";
    $("punkte").textContent = t("punkte", { r: punkte, n: anzahl }) + (serie > 1 ? " · " + t("serie", { s: serie }) : "");
    $("pruefen").textContent = t("pruefen"); $("weiter").textContent = t("weiter");
  }
  function pruefen(){
    if(!auf || beantwortet) return;
    var e = $("uAntwort").value.trim(); if(!e) return;
    var soll = auf.durch ? auf.b : auf.a * auf.b, ok = Number(e.replace(/\s/g, "")) === soll, m = $("meldung");
    letzte = e;
    if(!ok && !zweiterV && msTippbar(e)){ zweiterV = true; msNochmal(m); if(auf.durch){ m.textContent += " " + t("durchHilfe", { b: auf.a, p: auf.a * auf.b }); } return; }
    beantwortet = true; anzahl++;
    if(ok){ punkte++; serie++; m.className = "meldung gut"; m.textContent = t("richtig"); $("uAntwort").classList.add("richtig"); }
    else { serie = 0; m.className = "meldung schlecht"; m.textContent = t("falsch", { l: soll }); $("uAntwort").classList.add("falsch"); }
    $("uWeg").innerHTML = wegHtml(auf.a, auf.b, auf.durch ? { d: auf.a, e: auf.b } : null); sicht($("uWeg"), true);
    zeige();
  }
  function aufraeumen(){ var m = $("meldung"); m.className = "meldung"; m.textContent = ""; sicht($("uWeg"), false); $("uWeg").innerHTML = ""; var i = $("uAntwort"); i.classList.remove("richtig", "falsch"); }
  $("pruefen").addEventListener("click", pruefen);
  $("weiter").addEventListener("click", function(){ aufraeumen(); neueAufgabe(); });
  $("uAntwort").addEventListener("keydown", function(e){ if(e.key !== "Enter") return; e.preventDefault(); if(beantwortet){ aufraeumen(); neueAufgabe(); } else pruefen(); });

  // ---------- Reiter & Texte ----------
  var tab = "diplom", TABS = ["diplom", "tabelle", "tricks", "ueben"];
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
    $("tabIntro").textContent = t("tabIntro");
    tabelle(); tricks(); einstellungen();
    if(auf){ zeige(); if(beantwortet) $("uWeg").innerHTML = wegHtml(auf.a, auf.b, auf.durch ? { d: auf.a, e: auf.b } : null); }
    $("pruefen").textContent = t("pruefen"); $("weiter").textContent = t("weiter");
  }
  window.MS_LANG = { apply: function(l){ if(GE[l]){ lang = l; alles(); try { var w = $("diplomFrame").contentWindow; if(w && w.MS_LANG) w.MS_LANG.apply(l); } catch(x){} } } };
  // Diplom (eingebettete Einmaleins-Diplom-Ansicht im Modus „groß“): Höhe vom Rahmen übernehmen
  window.addEventListener("message", function(e){ if(e.origin === location.origin && e.data && e.data.msEmbedH) $("diplomFrame").style.height = (e.data.msEmbedH + 8) + "px"; });
  alles();
  var hz = (location.hash || "").slice(1); if(TABS.indexOf(hz) >= 0) zeigeTab(hz);
})();
