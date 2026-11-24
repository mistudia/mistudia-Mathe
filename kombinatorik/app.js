// ============================================================
// kombinatorik/app.js – Kombinatorik
// Übersicht: Permutation n! (mit allen Anordnungen für n ≤ 4), zwei Fragen
//   (Reihenfolge? Wiederholung?) markieren das passende Feld der Vierfeldertafel
//   n^k | n!/(n−k)! | (n+k−1 über k) | (n über k), Werte live aus n und k.
// Beispiele: PIN-Code, Podestplätze, Lotto, Eiskugeln, Permutation – groß
//   im Alltag und klein mit allen Möglichkeiten zum Nachzählen.
// Üben: Textaufgaben, Lösung mit Fall und Rechnung.
// Texte: kombinatorik/texte.js (KT), Sprache aus dem Startmenü (MS_LANG).
// ============================================================
(function(){
  "use strict";
  var lang = "de";
  function $(id){ return document.getElementById(id); }
  function t(k, v){ var s = (KT[lang] && KT[lang][k] != null) ? KT[lang][k] : KT.de[k] != null ? KT.de[k] : k; if(v && typeof s === "string") for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  function sicht(e, an){ if(an) e.removeAttribute("hidden"); else e.setAttribute("hidden", ""); }
  function esc(s){ return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
  function zuf(a, b){ return a + Math.floor(Math.random() * (b - a + 1)); }
  function wahl(L){ return L[Math.floor(Math.random() * L.length)]; }
  // große Zahlen mit schmalem Leerzeichen gruppieren (ab 5 Stellen), in allen Sprachen gleich
  function gz(v){ var s = String(v); return s.length < 5 ? s : s.replace(/\B(?=(\d{3})+(?!\d))/g, " "); }

  // Erklär-Blasen (gemeinsam: /symbol-tipp.js)
  function TT(h, txt){ return window.MS_TIPP ? MS_TIPP.s(h, txt) : h; }
  function tp(h, key, w){ return TT(h, t(key, w)); }
  var PROD3 = { pin: "tip_pin3", podest: "tip_podest3", lotto: "tip_bk3", eis: "tip_bk3", perm: "tip_perm3" };

  // ---------- Mathematik ----------
  function fak(n){ var r = 1; for(var i = 2; i <= n; i++) r *= i; return r; }
  function binko(n, k){ if(k < 0 || k > n) return 0; var r = 1; for(var i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); }
  function anzahl(fall, n, k){
    if(fall === "pin") return Math.pow(n, k);
    if(fall === "podest") return k > n ? 0 : fak(n) / fak(n - k);
    if(fall === "lotto") return binko(n, k);
    if(fall === "eis") return binko(n + k - 1, k);
    return fak(n); // perm
  }
  var OHNE_W = { podest: 1, lotto: 1, perm: 1 };

  // ---------- Formel-Bausteine ----------
  function br(z, n){ return '<span class="br"><span>' + z + "</span><span>" + n + "</span></span>"; }
  function bk(o, u){ return '<span class="bk"><span><span>' + o + "</span><span>" + u + "</span></span></span>"; }
  function f(s){ return '<span class="f">' + s + "</span>"; }
  // absteigendes Produkt a · (a−1) · … · b, lange Produkte abgekürzt
  function prod(a, b){ var L = []; for(var i = a; i >= b; i--) L.push(i); if(L.length > 7) L = [L[0], L[1], L[2], "…", L[L.length - 1]]; return L.join(" · "); }
  var ALLG = {
    pin: "n<sup>k</sup>",
    podest: br("n!", "(n − k)!"),
    eis: bk("n + k − 1", "k"),
    lotto: br("n!", "(n − k)! · k!") + " = " + bk("n", "k"),
    perm: "n!"
  };
  // kurze Rechnung für die Tafel
  function kurz(fall, n, k){
    if(fall === "pin") return n + "<sup>" + k + "</sup>";
    if(fall === "podest") return br(n + "!", (n - k) + "!");
    if(fall === "eis") return bk(n + k - 1, k);
    if(fall === "lotto") return bk(n, k);
    return n + "!";
  }
  // ausführliche Rechnung: allgemeine Formel = eingesetzt = Produkt = Ergebnis
  function rechnung(fall, n, k){
    var w = anzahl(fall, n, k), v = { n: n, k: k }, T = [tp(ALLG[fall], fall === "perm" ? "tip_fak" : "erk_" + fall)];
    if(fall === "pin"){ T.push(n + "<sup>" + k + "</sup>"); if(k > 1 && k <= 6) T.push(Array(k + 1).join(n + " · ").slice(0, -3)); }
    else if(fall === "podest"){ T.push(br(n + "!", (n - k) + "!")); if(k > 1) T.push(prod(n, n - k + 1)); }
    else if(fall === "lotto"){ T.push(bk(n, k)); if(k > 1) T.push(br(prod(n, n - k + 1), prod(k, 1))); }
    else if(fall === "eis"){ T.push(bk(n + k - 1, k)); if(k > 1) T.push(br(prod(n + k - 1, n), prod(k, 1))); }
    else { T.push(n + "!"); if(n > 1) T.push(prod(n, 1)); }
    // eingesetzter Schritt und Produkt-Schritt bekommen eine Erklär-Blase
    if(T.length > 1) T[1] = tp(T[1], fall === "perm" ? "tip_einPerm" : "tip_ein", v);
    if(T.length > 2) T[2] = tp(T[2], PROD3[fall], v);
    T.push("<b>" + gz(w) + "</b>");
    return f(T.join(" = "));
  }
  function fallName(fall){
    if(fall === "perm") return t("b_perm")[0];
    var r = fall === "pin" || fall === "podest", w = fall === "pin" || fall === "eis";
    return t(r ? "mitR" : "ohneR") + ", " + t(w ? "mitW" : "ohneW") + " – " + t("ex_" + fall);
  }

  // ---------- Aufzählen (kleine Fälle) ----------
  function aufzaehlen(items, k, geordnet, wdh){
    var E = [];
    (function weiter(start, wahlL, benutzt){
      if(wahlL.length === k){ E.push(wahlL.slice()); return; }
      for(var i = geordnet ? 0 : start; i < items.length; i++){
        if(!wdh && benutzt[i]) continue;
        benutzt[i] = true; wahlL.push(items[i]);
        weiter(wdh ? i : i + 1, wahlL, benutzt);
        wahlL.pop(); benutzt[i] = false;
      }
    })(0, [], []);
    return E;
  }

  // ---------- Übersicht ----------
  var rf = true, wd = false; // Antworten auf die zwei Fragen
  function feldVon(r, w){ return r ? (w ? "pin" : "podest") : (w ? "eis" : "lotto"); }
  function jaNein(box, wert, setz){
    box.innerHTML = "";
    [true, false].forEach(function(v){ var b = document.createElement("button"); b.type = "button"; b.textContent = t(v ? "ja" : "nein"); b.setAttribute("aria-pressed", v === wert ? "true" : "false"); b.addEventListener("click", function(){ setz(v); uebersicht(); }); box.appendChild(b); });
  }
  function perm(){
    var n = Number($("pn").value); $("pnW").textContent = n;
    $("permBsp").textContent = t("permBsp", { n: n });
    $("permWert").innerHTML = f(tp(n + "!", "tip_fak") + " = " + (n > 1 ? prod(n, 1) + " = " : "") + "<b>" + gz(fak(n)) + "</b>");
    sicht($("permListeBox"), n <= 4);
    if(n <= 4) $("permAlle").innerHTML = aufzaehlen("ABCD".slice(0, n).split(""), n, true, false).map(function(e){ return "<span>" + e.join("") + "</span>"; }).join("");
  }
  function uebersicht(){
    perm();
    jaNein($("w1"), rf, function(v){ rf = v; });
    jaNein($("w2"), wd, function(v){ wd = v; });
    var n = Number($("tn").value), k = Number($("tk").value), an = feldVon(rf, wd);
    $("tnW").textContent = n; $("tkW").textContent = k;
    var h = '<div class="kopf ecke"></div><div class="kopf">' + tp(esc(t("mitR")), "tip_mitR") + '</div><div class="kopf">' + tp(esc(t("ohneR")), "tip_ohneR") + "</div>";
    [true, false].forEach(function(w){
      h += '<div class="kopf zkopf">' + tp(esc(t(w ? "mitW" : "ohneW")), w ? "tip_mitW" : "tip_ohneW") + "</div>";
      [true, false].forEach(function(r){
        var fa = feldVon(r, w), zu = OHNE_W[fa] && k > n;
        h += '<button type="button" class="feld' + (fa === an ? " an" : "") + '" data-r="' + r + '" data-w="' + w + '">' +
          '<span class="bez">' + t("ex_" + fa) + (fa === "lotto" ? "<small>" + t("binko") + "</small>" : "") + "</span>" +
          '<span class="fo">' + f(ALLG[fa]) + "</span>" +
          (zu ? '<span class="zw nein">' + t("nurKleinerGleich") + "</span>" : '<span class="zw">' + f(kurz(fa, n, k) + " = <b>" + gz(anzahl(fa, n, k)) + "</b>") + "</span>") +
          "</button>";
      });
    });
    $("tafel").innerHTML = h;
    $("tafel").querySelectorAll(".feld").forEach(function(b){ b.addEventListener("click", function(){ rf = b.dataset.r === "true"; wd = b.dataset.w === "true"; uebersicht(); }); });
    var bkSym = t("buch")[3][0];
    $("nkInfo").innerHTML = "<b>" + esc(t("legH")) + "</b> " + [tp("n = " + n, "tip_n", { n: n }), tp("k = " + k, "tip_k", { k: k }), tp("n!", "tip_fak"), tp(esc(bkSym), "tip_binko", { n: n, k: k, v: gz(binko(n, k)) }), tp("n<sup>k</sup>", "tip_pot")].map(f).join(" · ");
    $("tippHinweis").textContent = window.MS_TIPP ? MS_TIPP.hinweis(lang) : "";
    $("erkl").innerHTML = "<b>" + esc(t("ex_" + an)) + ":</b> " + esc(t("erk_" + an));
  }

  // ---------- Beispiele ----------
  // 🆕 24.11.2026: je Fall mehrere Beispiele (id → Texte b_<id>), Auswahl nach Fall gruppiert
  var BSP = [
    { id: "pin",       fall: "pin",    gross: [10, 4],  klein: [3, 2], items: ["1", "2", "3"] },
    { id: "schloss",   fall: "pin",    gross: [10, 3],  klein: [2, 2], items: ["0", "1"] },
    { id: "muenze",    fall: "pin",    gross: [2, 5],   klein: [2, 3], items: { de: ["K", "Z"], en: ["H", "T"], es: ["C", "X"], zh: ["Z", "F"], fr: ["P", "F"], ru: ["О", "Р"], ar: ["ص", "ك"], ja: ["O", "U"], pt: ["C", "K"] } },
    { id: "toto",      fall: "pin",    gross: [3, 13],  klein: [3, 2], items: { de: ["1", "0", "2"], es: ["1", "X", "2"], fr: ["1", "N", "2"], pt: ["1", "X", "2"], _: ["1", "0", "2"] } },
    { id: "podest",    fall: "podest", gross: [8, 3],   klein: [4, 2], items: ["A", "B", "C", "D"] },
    { id: "sprecher",  fall: "podest", gross: [25, 2],  klein: [3, 2], items: ["A", "B", "C"] },
    { id: "vorstand",  fall: "podest", gross: [10, 3],  klein: [4, 2], items: ["A", "B", "C", "D"] },
    { id: "lotto",     fall: "lotto",  gross: [49, 6],  klein: [4, 2], items: ["A", "B", "C", "D"] },
    { id: "haende",    fall: "lotto",  gross: [10, 2],  klein: [4, 2], items: ["A", "B", "C", "D"] },
    { id: "pizza",     fall: "lotto",  gross: [8, 3],   klein: [4, 2], items: ["T", "S", "P", "O"] },
    { id: "team",      fall: "lotto",  gross: [12, 5],  klein: [4, 2], items: ["A", "B", "C", "D"] },
    { id: "eis",       fall: "eis",    gross: [8, 3],   klein: [3, 2], items: ["V", "S", "E"] },
    { id: "gummi",     fall: "eis",    gross: [6, 5],   klein: [3, 2], items: ["R", "G", "Y"] },
    { id: "wuerfel2",  fall: "eis",    gross: [6, 2],   klein: [3, 2], items: ["1", "2", "3"] },
    { id: "perm",      fall: "perm",   gross: [6, 6],   klein: [3, 3], items: ["A", "B", "C"] },
    { id: "regal",     fall: "perm",   gross: [5, 5],   klein: [3, 3], items: ["A", "B", "C"] },
    { id: "anagramm",  fall: "perm",   gross: [5, 5],   klein: [3, 3], items: ["O", "M", "A"] }
  ];
  function bspVon(id){ for(var i = 0; i < BSP.length; i++) if(BSP[i].id === id) return BSP[i]; return BSP[0]; }
  function bspItems(B){ var it = B.items; return Array.isArray(it) ? it : (it[lang] || it._ || it.de); }
  function fragenTxt(fall){
    var r = fall === "pin" || fall === "podest" || fall === "perm", w = fall === "pin" || fall === "eis";
    return esc(t("f1")) + " <b>" + t(r ? "ja" : "nein") + "</b> · " + esc(t("f2")) + " <b>" + t(w ? "ja" : "nein") + "</b>";
  }
  function gegeben(fall, n, k){ return fall === "perm" ? tp("n = " + n, "tip_nPerm", { n: n }) : tp("n = " + n, "tip_n", { n: n }) + ", " + tp("k = " + k, "tip_k", { k: k }); }
  function beispiele(){
    var B = bspVon($("bsp").value || "pin"), fall = B.fall, T = t("b_" + B.id);
    $("bTitel").textContent = T[0];
    function teil(titel, text, nk, liste){
      var n = nk[0], k = nk[1], h = "<h3>" + esc(titel) + "</h3><p class=\"zeile\">" + esc(text) + "</p>" +
        '<p class="zeile"><b>' + esc(t("gegeben")) + "</b> " + f(gegeben(fall, n, k)) + "</p>" +
        '<p class="zeile"><b>' + esc(t("fragen")) + "</b> " + fragenTxt(fall) + "</p>" +
        '<p class="zeile"><b>' + esc(t("rechnung")) + "</b></p><p class=\"wert\">" + rechnung(fall, n, k) + "</p>";
      if(liste){
        var E = aufzaehlen(bspItems(B), k, fall === "pin" || fall === "podest" || fall === "perm", fall === "pin" || fall === "eis");
        var trenn = fall === "lotto" ? ", " : "";
        h += '<p class="zeile muted">' + esc(t("alle", { z: E.length })) + '</p><div class="liste">' +
          E.map(function(e){ return "<span>" + (fall === "lotto" ? "{" + e.join(trenn) + "}" : e.join(fall === "podest" ? " " : "")) + "</span>"; }).join("") + "</div>";
      }
      return h;
    }
    $("bGross").innerHTML = teil(t("gross"), T[1], B.gross, false);
    $("bKlein").innerHTML = teil(t("klein"), T[2], B.klein, true);
  }

  // ---------- Üben ----------
  // je Fall: Vorlagen passend zu den Texten u_<fall> (n fest oder Bereich, k Bereich)
  var VORL = {
    pin:    [{ n: 10, k: [3, 5] }, { n: 26, k: [2, 4] }, { n: 2, k: [3, 8] }],
    podest: [{ n: [5, 12], k: [2, 4] }, { n: [4, 25], k: 2 }, { n: [6, 20], k: [2, 4] }],
    lotto:  [{ n: [6, 30], k: [2, 5] }, { n: [10, 49], k: [3, 6] }, { n: [4, 30], k: 2 }],
    eis:    [{ n: [3, 10], k: [2, 4] }, { n: [3, 8], k: [2, 5] }],
    perm:   [{ n: [3, 8] }, { n: [3, 9] }]
  };
  function bereich(v){ return Array.isArray(v) ? zuf(v[0], v[1]) : v; }
  var auf = null, nr = 0, punkte = 0, gemacht = 0, status = null; // status: {gut, eingabe}
  function neueAufgabe(){
    var faelle = Object.keys(VORL), fall, i, n, k;
    do { fall = wahl(faelle); i = zuf(0, VORL[fall].length - 1); n = bereich(VORL[fall][i].n); k = fall === "perm" ? n : bereich(VORL[fall][i].k); }
    while(auf && auf.fall === fall && auf.i === i && auf.n === n && auf.k === k);
    auf = { fall: fall, i: i, n: n, k: k }; nr++; status = null; $("uAntwort").value = ""; zeigeAufgabe();
    $("uAntwort").focus({ preventScroll: true });
  }
  function zeigeAufgabe(){
    if(!auf) return;
    $("uNr").textContent = t("aufgabe", { i: nr });
    $("auftrag").textContent = t("u_" + auf.fall)[auf.i].split("{n}").join(auf.n).split("{k}").join(auf.k);
    $("punkte").textContent = t("punkte", { p: punkte, n: gemacht });
    var m = $("meldung");
    if(!status){ m.textContent = ""; m.className = "meldung"; sicht($("uLoesung"), false); $("pruefen").disabled = false; return; }
    if(status.leer){ m.textContent = t("keineZahl"); m.className = "meldung schlecht"; return; }
    if(status.nochmal){ msNochmal(m); return; }
    var w = anzahl(auf.fall, auf.n, auf.k);
    m.textContent = status.gut ? t("richtig") : t("falsch", { erg: gz(w) }); m.className = "meldung " + (status.gut ? "gut" : "schlecht");
    $("uLoesung").innerHTML = '<p class="zeile">' + esc(t("fall", { fall: fallName(auf.fall) })) + '</p><p class="zeile">' + f(gegeben(auf.fall, auf.n, auf.k)) + '</p><p class="wert">' + rechnung(auf.fall, auf.n, auf.k) + "</p>";
    sicht($("uLoesung"), true); $("pruefen").disabled = true;
  }
  function pruefe(){
    if(!auf || (status && !status.leer && !status.nochmal)) return;
    var s = $("uAntwort").value.replace(/[\s.,'’  ]/g, "");
    if(!/^\d+$/.test(s)){ status = { leer: true }; zeigeAufgabe(); return; }
    var gut = Number(s) === anzahl(auf.fall, auf.n, auf.k);
    if(!gut && !(status && status.nochmal)){ status = { nochmal: true }; msNochmal($("meldung")); return; } status = { gut: gut }; gemacht++; if(gut) punkte++;
    zeigeAufgabe();
  }
  $("pruefen").addEventListener("click", pruefe);
  $("uAntwort").addEventListener("keydown", function(e){ if(e.key === "Enter"){ if(status && !status.leer && !status.nochmal) neueAufgabe(); else pruefe(); } });
  $("weiter").addEventListener("click", neueAufgabe);

  // ---------- Reiter & Texte ----------
  var tab = "uebersicht", TABS = ["uebersicht", "beispiele", "ueben"];
  function zeigeTab(k){
    tab = k;
    document.querySelectorAll(".tabs button").forEach(function(b){ b.setAttribute("aria-selected", b.dataset.tab === k ? "true" : "false"); });
    TABS.forEach(function(x){ sicht($("s_" + x), x === k); });
    if(k === "ueben" && !auf) neueAufgabe();
  }
  document.querySelectorAll(".tabs button").forEach(function(b){ b.addEventListener("click", function(){ zeigeTab(b.dataset.tab); }); });
  ["pn"].forEach(function(id){ $(id).addEventListener("input", perm); });
  ["tn", "tk"].forEach(function(id){ $(id).addEventListener("input", uebersicht); });
  $("bsp").addEventListener("change", beispiele);
  function alles(){
    document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = "miStudia – " + t("titel"); $("titel").textContent = t("titel");
    document.querySelectorAll(".tabs button").forEach(function(b){ b.textContent = t("tab_" + b.dataset.tab); });
    ["permH", "permT", "permListe", "tabH", "tabT", "f1", "f2", "buchH", "wahlL", "antwortL", "tipp"].forEach(function(id){ $(id).textContent = t(id); });
    $("pruefen").textContent = t("pruefen"); $("weiter").textContent = t("weiter");
    $("permFormel").innerHTML = tp("P<sub>n</sub>", "tip_Pn") + " = " + tp("n!", "tip_fak") + " = n · (n − 1) · … · 2 · 1";
    $("buch").innerHTML = t("buch").map(function(z){ return '<tr><td><span class="f">' + esc(z[0]).replace("^k", "<sup>k</sup>") + "</span></td><td>" + esc(z[1]) + "</td></tr>"; }).join("");
    var bv = $("bsp").value || "pin";
    $("bsp").innerHTML = ["pin", "podest", "lotto", "eis", "perm"].map(function(fa){
      var lab = fa === "perm" ? t("b_perm")[0] : t(fa === "pin" || fa === "podest" ? "mitR" : "ohneR") + ", " + t(fa === "pin" || fa === "eis" ? "mitW" : "ohneW");
      return '<optgroup label="' + esc(lab).replace(/"/g, "&quot;") + '">' + BSP.filter(function(b){ return b.fall === fa; }).map(function(b){ return '<option value="' + b.id + '">' + esc(t("b_" + b.id)[0]) + "</option>"; }).join("") + "</optgroup>";
    }).join("");
    $("bsp").value = bv;
    uebersicht(); beispiele(); zeigeAufgabe();
  }
  window.MS_LANG = { apply: function(l){ if(KT[l]){ lang = l; alles(); } } };
  alles();
})();
