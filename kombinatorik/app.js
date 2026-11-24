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
  // ---------- 🆕 24.11.2026: Wahrscheinlichkeitsaufgaben (Laplace, Pfadregel, Gegenereignis) ----------
  function ggt(a, b){ a = Math.abs(a); b = Math.abs(b); while(b){ var r = a % b; a = b; b = r; } return a || 1; }
  function wkKurz(z, n){ var g = ggt(z, n); return [z / g, n / g]; }
  function wbr(z, n){ return z + "/" + n; }
  function komma(){ return /^(de|es|fr|ru|pt)$/.test(lang); }
  function dz(x, d){ var s = x.toFixed(d == null ? 4 : d).replace(/0+$/, "").replace(/\.$/, ""); return komma() ? s.replace(".", ",") : s; }
  function pTxt(P){ var k = wkKurz(P[0], P[1]); return k[1] === 1 ? String(k[0]) : wbr(k[0], k[1]); }
  // Kette: „P = a = b = c ≈ d“ – formel.js setzt daraus Zeilen und Bruchstriche
  function kette2(start, schritte, P){
    var k = wkKurz(P[0], P[1]), L = [start].concat(schritte), letzt = L[L.length - 1].replace(/^P = /, ""), kb = k[1] === 1 ? String(k[0]) : wbr(k[0], k[1]);
    if(letzt !== kb) L.push(kb);
    var w = k[0] / k[1], s = L.join(" = ");
    if(k[1] === 1) return s;
    var ex4 = Math.abs(w * 1e4 - Math.round(w * 1e4)) < 1e-9, ex2 = Math.abs(w * 1e4 - Math.round(w * 1e4)) < 1e-9;
    s += (ex4 ? " = " : " ≈ ") + dz(w);
    return s + (ex2 ? " = " : " ≈ ") + dz(w * 100, 2) + " %";
  }
  // ---------- 🆕 24.11.2026 (l): Bilder, Baumdiagramm, Abzähl-Tabellen ----------
  var FR = "#e53935", FB = "#1e88e5";
  function svgB(w, h, inner, kl){ return '<svg class="' + (kl || "wkBild") + '" viewBox="0 0 ' + w + " " + h + '" role="img" aria-hidden="true" dir="ltr">' + inner + "</svg>"; }
  function wuerfelS(x, y, s, n){
    var P = { 1: [[.5, .5]], 2: [[.27, .27], [.73, .73]], 3: [[.25, .25], [.5, .5], [.75, .75]], 4: [[.27, .27], [.73, .27], [.27, .73], [.73, .73]], 5: [[.25, .25], [.75, .25], [.5, .5], [.25, .75], [.75, .75]], 6: [[.27, .22], [.73, .22], [.27, .5], [.73, .5], [.27, .78], [.73, .78]] };
    var h = '<rect x="' + x + '" y="' + y + '" width="' + s + '" height="' + s + '" rx="' + (s * .18) + '" fill="#fff" stroke="#1B3B6F" stroke-width="3"/>';
    (P[n] || P[1]).forEach(function(q){ h += '<circle cx="' + (x + q[0] * s) + '" cy="' + (y + q[1] * s) + '" r="' + (s * .09) + '" fill="' + (n === 6 ? "#d81b60" : "#1B3B6F") + '"/>'; });
    return h;
  }
  function kugelS(x, y, r, c){ return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + c + '" stroke="#1a2233" stroke-width="1.3"/><circle cx="' + (x - r * .35) + '" cy="' + (y - r * .35) + '" r="' + (r * .28) + '" fill="#fff" opacity=".6"/>'; }
  function figurS(x, y, c, brille){
    var h = '<circle cx="' + x + '" cy="' + y + '" r="7" fill="' + c + '"/><path d="M' + (x - 10) + " " + (y + 28) + " Q" + x + " " + (y + 2) + " " + (x + 10) + " " + (y + 28) + 'Z" fill="' + c + '"/>';
    if(brille) h += '<circle cx="' + (x - 3) + '" cy="' + y + '" r="2.6" fill="#fff" stroke="#1a2233" stroke-width="1.4"/><circle cx="' + (x + 3) + '" cy="' + y + '" r="2.6" fill="#fff" stroke="#1a2233" stroke-width="1.4"/>';
    return h;
  }
  var STIFT_F = ["#e53935", "#fb8c00", "#fdd835", "#43a047", "#1e88e5", "#5e35b1", "#d81b60"];
  function bildSVG(B){
    if(!B) return "";
    var h = "", i, x;
    if(B.art === "wuerfel") return svgB(170, 80, '<g transform="rotate(-8 45 40)">' + wuerfelS(12, 8, 62, B.a) + "</g>" + '<g transform="rotate(9 125 40)">' + wuerfelS(92, 8, 62, B.b) + "</g>");
    if(B.art === "karten"){
      [-16, 0, 16].forEach(function(w, k){ h += '<g transform="rotate(' + w + ' 85 100)"><rect x="62" y="14" width="46" height="66" rx="6" fill="#fff" stroke="#1B3B6F" stroke-width="2.5"/>' + (k === 2 ? '<text x="85" y="58" text-anchor="middle" font-size="30" fill="#8e24aa">♕</text>' : '<text x="85" y="56" text-anchor="middle" font-size="22" fill="' + (k ? "#c62828" : "#1a2233") + '">' + (k ? "♥" : "♠") + "</text>") + "</g>"; });
      return svgB(170, 92, h + '<text x="150" y="86" text-anchor="end" font-size="15" font-weight="800" fill="#1B3B6F">' + B.N + "</text>");
    }
    if(B.art === "urne"){
      var n = B.r + B.b, pro = n > 8 ? 4 : 3;
      h = '<path d="M40 14 h70 v8 q-6 4 -6 12 v52 q0 14 -14 14 h-30 q-14 0 -14 -14 v-52 q0 -8 -6 -12z" fill="#eef5ff" stroke="#1B3B6F" stroke-width="2.5"/>';
      for(i = 0; i < n; i++){ var zr = Math.floor(i / pro), sp = i % pro; h += kugelS(75 - (pro - 1) * 8.5 + sp * 17, 88 - zr * 16, 7.5, i < B.r ? FR : FB); }
      return svgB(150, 106, h);
    }
    if(B.art === "socken"){
      h = '<rect x="6" y="40" width="208" height="60" rx="6" fill="#d7b98e" stroke="#6d4c2f" stroke-width="2.5"/><rect x="96" y="66" width="28" height="7" rx="3" fill="#6d4c2f"/>';
      for(i = 0; i < B.r + B.b; i++){ x = 14 + (i % 6) * 34 + (i >= 6 ? 14 : 0); var y = i >= 6 ? 6 : 18; h += '<path d="M' + x + " " + y + " h10 v14 q0 6 6 6 h6 q5 0 5 5 q0 6 -6 6 h-10 q-11 0 -11 -11z" + '" fill="' + (i < B.r ? FR : FB) + '" stroke="#1a2233" stroke-width="1.2"/>'; }
      return svgB(220, 104, h);
    }
    if(B.art === "stifte"){
      for(i = 0; i < B.n; i++){ x = 10 + i * 24; h += '<rect x="' + x + '" y="20" width="14" height="56" rx="2" fill="' + STIFT_F[i % 7] + '" stroke="#1a2233" stroke-width="1.2"/><path d="M' + x + " 76 l7 14 l7 -14z" + '" fill="#f3d9b1" stroke="#1a2233" stroke-width="1.2"/><path d="M' + (x + 4.5) + " 85 l2.5 5 l2.5 -5z" + '" fill="' + STIFT_F[i % 7] + '"/>'; }
      return svgB(20 + B.n * 24, 96, h);
    }
    if(B.art === "pruef"){
      for(i = 0; i < B.N; i++){ x = 6 + (i % 5) * 34; var y2 = 6 + Math.floor(i / 5) * 40; var ok = i < B.m;
        h += '<rect x="' + x + '" y="' + y2 + '" width="28" height="34" rx="4" fill="' + (ok ? "#c8e6c9" : "#fff") + '" stroke="' + (ok ? "#2e7d32" : "#78909c") + '" stroke-width="2"/><text x="' + (x + 14) + '" y="' + (y2 + 17) + '" text-anchor="middle" font-size="13" font-weight="800" fill="#1a2233">' + (i + 1) + "</text>" + (ok ? '<text x="' + (x + 14) + '" y="' + (y2 + 30) + '" text-anchor="middle" font-size="11" fill="#2e7d32">✓</text>' : ""); }
      return svgB(178, 6 + Math.ceil(B.N / 5) * 40, h);
    }
    if(B.art === "paare"){
      for(i = 0; i < B.p; i++){ x = 18 + i * 56; h += figurS(x, 14, "#1e88e5") + figurS(x + 22, 14, "#d81b60") + '<text x="' + (x + 11) + '" y="58" text-anchor="middle" font-size="14" fill="#d81b60">♥</text>'; }
      return svgB(8 + B.p * 56, 64, h);
    }
    if(B.art === "monate"){
      h = '<rect x="6" y="8" width="96" height="76" rx="6" fill="#fff" stroke="#1B3B6F" stroke-width="2.5"/><rect x="6" y="8" width="96" height="16" rx="6" fill="#1e88e5"/>';
      for(i = 0; i < 12; i++) h += '<text x="' + (20 + (i % 4) * 23) + '" y="' + (42 + Math.floor(i / 4) * 17) + '" text-anchor="middle" font-size="12" font-weight="700" fill="#1a2233">' + (i + 1) + "</text>";
      for(i = 0; i < B.k; i++) h += figurS(124 + i * 26, 30, STIFT_F[i % 7]);
      return svgB(118 + B.k * 26, 92, h);
    }
    if(B.art === "reihe"){
      var nr = B.b + B.g;
      for(i = 0; i < nr; i++) h += figurS(16 + i * 26, 12, i % 2 ? "#d81b60" : "#1e88e5");
      return svgB(8 + nr * 26, 46, h);
    }
    if(B.art === "bus"){
      var W = 30 + Math.ceil(B.N / 2) * 18;
      h = '<rect x="4" y="10" width="' + W + '" height="58" rx="10" fill="#ffca28" stroke="#1a2233" stroke-width="2.5"/><circle cx="26" cy="72" r="9" fill="#37474f"/><circle cx="' + (W - 18) + '" cy="72" r="9" fill="#37474f"/>';
      for(i = 0; i < B.N; i++){ var bx = 22 + Math.floor(i / 2) * 18, by = 26 + (i % 2) * 22; h += '<circle cx="' + bx + '" cy="' + by + '" r="7" fill="' + (i < B.s ? "#e53935" : "#90a4ae") + '"/>' + (i < B.s ? '<text x="' + bx + '" y="' + (by + 4) + '" text-anchor="middle" font-size="10" font-weight="800" fill="#fff">?</text>' : ""); }
      return svgB(W + 10, 84, h);
    }
    if(B.art === "muenze"){
      for(i = 0; i < B.k; i++){ x = 24 + i * 46; var l = B.frage ? "?" : (i === B.k - 1 ? t("zahlK") : t("kopfK"));
        h += '<circle cx="' + x + '" cy="28" r="19" fill="#ffd54f" stroke="#a1781b" stroke-width="2.5"/><circle cx="' + x + '" cy="28" r="14" fill="none" stroke="#a1781b" stroke-width="1"/><text x="' + x + '" y="34" text-anchor="middle" font-size="17" font-weight="800" fill="#6d4c00">' + esc(l) + "</text>"; }
      return svgB(4 + B.k * 46, 56, h);
    }
    if(B.art === "klasse"){
      var Lk = [], k2;
      for(k2 = 0; k2 < B.M; k2++) Lk.push(["#d81b60", k2 < B.MB]);
      for(k2 = 0; k2 < B.J; k2++) Lk.push(["#1e88e5", k2 < B.JB]);
      Lk.forEach(function(q, j){ h += figurS(14 + (j % 10) * 24, 10 + Math.floor(j / 10) * 42, q[0], q[1]); });
      return svgB(246, 4 + Math.ceil(Lk.length / 10) * 42, h);
    }
    return "";
  }
  // Baumdiagramm mit 2 Stufen und je 2 Ästen. A/B = [Beschriftung, Farbe]; pA = P(A) als [z, n];
  // pAA = P(A | A), pAB = P(A | B) (2. Stufe), an = markierte Pfade [[i, j]], summe = zusätzliche Rechenzeilen
  function baum2(A, B, pA, pAA, pAB, an, summe){
    var pB = [pA[1] - pA[0], pA[1]], z2 = [[pAA, [pAA[1] - pAA[0], pAA[1]]], [pAB, [pAB[1] - pAB[0], pAB[1]]]];
    return { k: [A, B], s1: [pA, pB], s2: z2, an: an, weg: summe || null };
  }
  function sbr(x, y, z, n, c){
    return '<text x="' + x + '" y="' + (y - 3) + '" text-anchor="middle" font-size="13" font-weight="700" fill="' + c + '">' + z + '</text><line x1="' + (x - 9) + '" y1="' + y + '" x2="' + (x + 9) + '" y2="' + y + '" stroke="' + c + '" stroke-width="1.5"/><text x="' + x + '" y="' + (y + 13) + '" text-anchor="middle" font-size="13" font-weight="700" fill="' + c + '">' + n + "</text>";
  }
  function knoten(x, y, K){
    return K[0] ? '<circle cx="' + x + '" cy="' + y + '" r="13" fill="#fff" stroke="' + K[1] + '" stroke-width="2.5"/><text x="' + x + '" y="' + (y + 5) + '" text-anchor="middle" font-size="' + (K[0].length > 1 ? 11 : 14) + '" font-weight="800" fill="' + K[1] + '">' + esc(K[0]) + "</text>"
      : kugelS(x, y, 11, K[1]);
  }
  // Bruch neben die Kante setzen (senkrecht zur Linie nach außen), damit er die Linie nicht schneidet
  function kantenBr(x1, y1, x2, y2, z, n, c, tt){
    var dx = x2 - x1, dy = y2 - y1, L = Math.sqrt(dx * dx + dy * dy) || 1, k = dy < 0 ? 26 : 17, nx = dy < 0 ? dy / L : -dy / L, ny = dy < 0 ? -dx / L : dx / L;
    tt = tt || .5; return sbr(x1 + dx * tt + nx * k, y1 + dy * tt + ny * k + 4, z, n, c);
  }
  function baumSVG(T){
    var h = "", X0 = 18, X1 = 140, X2 = 268, Y1 = [62, 180], Y2 = [[24, 96], [146, 218]], AN = "#d81b60", GR = "#90a4ae";
    function istAn(i, j){ return T.an.some(function(q){ return q[0] === i && (j == null || q[1] === j); }); }
    for(var i = 0; i < 2; i++){
      var c1 = istAn(i) ? AN : GR;
      h += '<line x1="' + X0 + '" y1="121" x2="' + (X1 - 13) + '" y2="' + Y1[i] + '" stroke="' + c1 + '" stroke-width="' + (istAn(i) ? 4 : 2) + '"/>';
      h += kantenBr(X0, 121, X1, Y1[i], T.s1[i][0], T.s1[i][1], istAn(i) ? AN : "#1a2233");
      for(var j = 0; j < 2; j++){
        var a = istAn(i, j), pz = T.s2[i][j];
        h += '<line x1="' + (X1 + 13) + '" y1="' + Y1[i] + '" x2="' + (X2 - 13) + '" y2="' + Y2[i][j] + '" stroke="' + (a ? AN : GR) + '" stroke-width="' + (a ? 4 : 2) + '"/>';
        h += kantenBr(X1, Y1[i], X2, Y2[i][j], pz[0], pz[1], a ? AN : "#1a2233", .56);
        h += knoten(X2, Y2[i][j], T.k[j]);
        if(a){ var z = T.s1[i][0] * pz[0], n = T.s1[i][1] * pz[1]; h += '<text x="' + (X2 + 22) + '" y="' + (Y2[i][j] + 5) + '" font-size="14" font-weight="800" fill="' + AN + '">=</text>' + sbr(X2 + 46, Y2[i][j] + 2, z, n, AN); }
      }
      h += knoten(X1, Y1[i], T.k[i]);
    }
    h += '<circle cx="' + X0 + '" cy="121" r="5" fill="#1a2233"/>';
    return svgB(330, 240, h, "wkBaum");
  }
  function kopfZ(rot, i){ return rot != null ? '<span class="kp" style="background:' + (i < rot ? FR : FB) + '"></span>' + (i < rot ? i + 1 : i - rot + 1) : String(i + 1); }
  function ohneHTML(O){
    var h = "", g = 0, m = 0, i, j;
    if(O.art === "text") return '<p class="zeile">' + t(O.k, O.v) + "</p>";
    if(O.art === "wuerfel"){
      h = '<table class="wkTab" dir="ltr"><tr><th>1.\\2.</th>';
      for(j = 1; j <= 6; j++) h += "<th>" + j + "</th>";
      h += "</tr>";
      for(i = 1; i <= 6; i++){ h += "<tr><th>" + i + "</th>"; for(j = 1; j <= 6; j++){ var a = O.an(i, j); if(a) g++; h += '<td class="' + (a ? "an" : "") + '">' + O.txt(i, j) + "</td>"; } h += "</tr>"; }
      return '<p class="zeile">' + t("o_wuerfel") + "</p>" + h + "</table>" + zaehlZ(g, 36);
    }
    if(O.art === "paare"){
      var N = O.N || (O.rot + O.blau), rot = O.N ? null : O.rot, kopf = function(q){ return O.N ? '<span class="' + (q < O.m ? "qOk" : "") + '">' + (q + 1) + "</span>" : kopfZ(rot, q); };
      h = '<table class="wkTab' + (N > 9 ? " eng" : "") + '" dir="ltr"><tr><th>1.\\2.</th>';
      for(j = 0; j < N; j++) h += "<th>" + kopf(j) + "</th>";
      h += "</tr>";
      for(i = 0; i < N; i++){ h += "<tr><th>" + kopf(i) + "</th>";
        for(j = 0; j < N; j++){ if(O.ohneW && i === j){ h += '<td class="x">–</td>'; continue; } m++; var b = O.an(i, j); if(b) g++; h += '<td class="' + (b ? "an" : "") + '">' + (b ? "●" : "") + "</td>"; }
        h += "</tr>"; }
      return '<p class="zeile">' + t(O.k) + "</p>" + h + "</table>" + zaehlZ(g, m);
    }
    if(O.art === "folgen"){
      h = '<p class="zeile">' + t(O.txtK, { k: O.k, n: O.n, K: t("kopfK"), Z: t("zahlK") }) + '</p><p class="wkFolgen" dir="ltr">';
      O.liste.forEach(function(w){ var a = O.an(w); if(a) g++; h += '<span class="' + (a ? "an" : "") + '">' + esc(w.split("").map(function(c){ return c === "K" ? t("kopfK") : t("zahlK"); }).join(" ")) + "</span>"; });
      return h + "</p>" + zaehlZ(g, O.n);
    }
    if(O.art === "vier"){
      var B = O.MB + O.JB, S = O.M + O.J;
      var c = function(v, an, ges){ return '<td class="' + (an ? "an" : ges ? "ges" : "") + '">' + v + "</td>"; };
      h = '<table class="wkTab vier"><tr><th></th><th>' + esc(t("vf_b")) + "</th><th>" + esc(t("vf_k")) + "</th><th>" + esc(t("vf_s")) + "</th></tr>" +
        "<tr><th>" + esc(t("vf_m")) + "</th>" + c(O.MB) + c(O.M - O.MB, false, true) + c(O.M) + "</tr>" +
        "<tr><th>" + esc(t("vf_j")) + "</th>" + c(O.JB, true) + c(O.J - O.JB, false, true) + c(O.J) + "</tr>" +
        "<tr><th>" + esc(t("vf_s")) + "</th>" + c(B) + c(S - B, false, true) + c(S) + "</tr></table>";
      return '<p class="zeile">' + t("o_vier") + "</p>" + h + zaehlZ(O.JB, S, "o_kinder");
    }
    return "";
  }
  function zaehlZ(g, m, k){ return '<p class="zeile"><b>' + esc(t(k || "o_zaehl", { g: g, m: m })) + '</b></p><p class="rechnung wert" dir="ltr">' + esc(kette2("P = " + wbr(g, m), [], [g, m])) + "</p>"; }
  var REGEL_DEF = { wPfad: "pfad", wSumme: "summe", wGegen: "gegen" };
  function regelKnopf(r){ return r ? ' <button type="button" class="regelLink" data-r="' + r + '" title="' + esc(t("regelTip")) + '">↗ ' + esc(t("rl_" + r)) + "</button>" : ""; }
  function wegHTML(L){ return L.map(function(z){ return '<p class="zeile"><b>' + esc(t(z[0])) + "</b>" + regelKnopf(z[2] || REGEL_DEF[z[0]]) + '</p><p class="rechnung wert" dir="ltr">' + esc(z[1]) + "</p>"; }).join(""); }
  function loesungHTML(W){
    var h = '<h3 class="wkH">' + esc(t("rT")) + "</h3>" + wegHTML(W.weg);
    if(W.ohne) h += '<h3 class="wkH">' + esc(t("oT")) + "</h3>" + ohneHTML(W.ohne);
    if(W.gegen) h += '<h3 class="wkH">' + esc(t("gT")) + "</h3>" + wegHTML(W.gegen);
    if(W.baum) h += '<h3 class="wkH">' + esc(t("bT")) + "</h3>" + '<p class="zeile">' + esc(t("bPfad")) + "</p>" + baumSVG(W.baum) + (W.baum.weg ? wegHTML(W.baum.weg) : "");
    if(W.meth) h += '<div class="wkMeth"><b>' + esc(t("mT")) + "</b> " + t(W.meth, W.v) + "</div>";
    return h;
  }
  var WK_GEN = {
    stifte: function(r){ var n = r(4, 7), f = fak(n), pr = []; for(var i = n; i >= 1; i--) pr.push(i);
      return { v: { n: n }, P: [1, f], bild: { art: "stifte", n: n }, meth: "m_gross", ohne: { art: "text", k: "o_stifte", v: { n: n, f: gz(f) } },
        weg: [["wMoegl", n + "! = " + pr.join(" · ") + " = " + gz(f), "fak"], ["wGuen", "1"], ["wErg", kette2("P = " + wbr(1, f), [], [1, f]), "laplace"]] }; },
    karten: function(r){ var N = [20, 32, 52][r(0, 2)];
      return { v: { N: N }, P: [12, N * (N - 1)], bild: { art: "karten", N: N }, meth: "m_urne",
        baum: baum2(["♕", "#8e24aa"], ["–", "#78909c"], [4, N], [3, N - 1], [4, N - 1], [[0, 0]]),
        weg: [["wPfad", kette2("P = " + wbr(4, N) + " · " + wbr(3, N - 1), [wbr(12, N * (N - 1))], [12, N * (N - 1)])]] }; },
    summe: function(r){ var s = r(3, 11), g = 6 - Math.abs(s - 7), L = [];
      for(var a = 1; a <= 6; a++){ var b = s - a; if(b >= 1 && b <= 6) L.push("(" + a + "|" + b + ")"); }
      return { v: { s: s }, P: [g, 36], bild: { art: "wuerfel", a: Math.min(6, s - 1), b: s - Math.min(6, s - 1) }, meth: "m_tab",
        ohne: { art: "wuerfel", an: function(a, b){ return a + b === s; }, txt: function(a, b){ return a + b; } },
        weg: [["wMoegl", "6 · 6 = 36", "zaehl"], ["wGuen", L.join(", ") + " → " + g], ["wErg", kette2("P = " + wbr(g, 36), [], [g, 36]), "laplace"]] }; },
    teil: function(r){ var d = r(3, 5), g = 0, T = [];
      for(var s = 2; s <= 12; s++) if(s % d === 0){ var c = 6 - Math.abs(s - 7); g += c; T.push(c); }
      var sums = []; for(s = 2; s <= 12; s++) if(s % d === 0) sums.push(s);
      return { v: { d: d }, P: [g, 36], bild: { art: "wuerfel", a: 4, b: 2 }, meth: "m_tab",
        ohne: { art: "wuerfel", an: function(a, b){ return (a + b) % d === 0; }, txt: function(a, b){ return a + b; } },
        weg: [["wMoegl", "6 · 6 = 36", "zaehl"], ["wGuen", sums.join(", ") + ": " + T.join(" + ") + " = " + g], ["wErg", kette2("P = " + wbr(g, 36), [], [g, 36]), "laplace"]] }; },
    pruef: function(r){ var N = r(6, 10), m = r(2, N - 2), z = m * (m - 1), n = N * (N - 1);
      return { v: { N: N, m: m }, P: [z, n], bild: { art: "pruef", N: N, m: m }, meth: "m_urne",
        ohne: { art: "paare", N: N, m: m, ohneW: true, k: "o_pruef", an: function(i, j){ return i < m && j < m; } },
        baum: baum2(["✓", "#2e7d32"], ["✗", "#c62828"], [m, N], [m - 1, N - 1], [m, N - 1], [[0, 0]]),
        weg: [["wPfad", kette2("P = " + wbr(m, N) + " · " + wbr(m - 1, N - 1), [wbr(z, n)], [z, n])]] }; },
    pruef2: function(r){ var N = r(6, 10), m = r(2, N - 2), u = N - m, zn = u * (u - 1), n = N * (N - 1), z = n - zn;
      var a1 = m * (m - 1), a2 = m * u, a3 = u * m;
      return { v: { N: N, m: m }, P: [z, n], bild: { art: "pruef", N: N, m: m }, meth: "m_urne",
        ohne: { art: "paare", N: N, m: m, ohneW: true, k: "o_pruef", an: function(i, j){ return i < m || j < m; } },
        baum: baum2(["✓", "#2e7d32"], ["✗", "#c62828"], [m, N], [m - 1, N - 1], [m, N - 1], [[0, 0], [0, 1], [1, 0]],
          [["wSumme", kette2("P = " + wbr(m, N) + " · " + wbr(m - 1, N - 1) + " + " + wbr(m, N) + " · " + wbr(u, N - 1) + " + " + wbr(u, N) + " · " + wbr(m, N - 1), [wbr(a1, n) + " + " + wbr(a2, n) + " + " + wbr(a3, n), wbr(z, n)], [z, n]), "summe"]]),
        weg: [["wGegen", "P(Ē) = " + wbr(u, N) + " · " + wbr(u - 1, N - 1) + " = " + wbr(zn, n), "pfad"], ["wErg", kette2("P(E) = 1 − " + wbr(zn, n), [wbr(z, n)], [z, n]), "gegen"]] }; },
    paare: function(r){ var p = r(4, 7), N = 2 * p;
      return { v: { p: p, N: N }, P: [1, N - 1], bild: { art: "paare", p: p }, meth: "m_paare", ohne: { art: "text", k: "o_paare", v: { m: N - 1 } },
        weg: [["wPfad", kette2("P = " + wbr(N, N) + " · " + wbr(1, N - 1), [], [1, N - 1])]] }; },
    monate: function(r){ var k = r(2, 5), z = 1, f = []; for(var i = 0; i < k; i++){ z *= 12 - i; f.push(wbr(12 - i, 12)); } var n = Math.pow(12, k);
      return { v: { k: k }, P: [z, n], bild: { art: "monate", k: k }, meth: "m_gross", weg: [["wPfad", kette2("P = " + f.join(" · "), [wbr(z, n)], [z, n])]] }; },
    reihe: function(r){ var b = r(2, 4), g = b + r(0, 1), n = b + g, gu = (g === b ? 2 : 1) * fak(b) * fak(g), mo = fak(n);
      return { v: { b: b, g: g }, P: [gu, mo], bild: { art: "reihe", b: b, g: g }, meth: "m_gross",
        weg: [["wMoegl", n + "! = " + gz(mo), "fak"], ["wGuen", (g === b ? "2 · " : "") + b + "! · " + g + "! = " + gz(gu), "fak"], ["wErg", kette2("P = " + wbr(gu, mo), [], [gu, mo]), "laplace"]] }; },
    kontr: function(r){ var N = r(10, 20), s = r(1, 3), k = r(2, 4), z = 1, n = 1, f = [];
      for(var i = 0; i < k; i++){ z *= N - s - i; n *= N - i; f.push(wbr(N - s - i, N - i)); }
      return { v: { N: N, s: s, k: k }, P: [z, n], bild: { art: "bus", N: N, s: s }, meth: "m_gross", weg: [["wPfad", kette2("P = " + f.join(" · "), [wbr(z, n)], [z, n])]] }; },
    socken: function(r){ var a = r(2, 6), b = r(2, 6), n = a + b, z1 = a * (a - 1), z2 = b * (b - 1), N = n * (n - 1);
      return { v: { r: a, b: b }, P: [z1 + z2, N], bild: { art: "socken", r: a, b: b }, meth: "m_urne",
        ohne: { art: "paare", rot: a, blau: b, ohneW: true, k: "o_urneO", an: function(i, j){ return (i < a) === (j < a); } },
        baum: baum2(["", FR], ["", FB], [a, n], [a - 1, n - 1], [a, n - 1], [[0, 0], [1, 1]]),
        weg: [["wSumme", kette2("P = " + wbr(a, n) + " · " + wbr(a - 1, n - 1) + " + " + wbr(b, n) + " · " + wbr(b - 1, n - 1), [wbr(z1, N) + " + " + wbr(z2, N), wbr(z1 + z2, N)], [z1 + z2, N])]] }; },
    urneMit: function(r){ var a = r(2, 6), b = r(2, 6), n = a + b;
      return { v: { r: a, b: b }, P: [a * b, n * n], bild: { art: "urne", r: a, b: b }, meth: "m_urne",
        ohne: { art: "paare", rot: a, blau: b, ohneW: false, k: "o_urne", an: function(i, j){ return i >= a && j < a; } },
        baum: baum2(["", FR], ["", FB], [a, n], [a, n], [a, n], [[1, 0]]),
        weg: [["wPfad", kette2("P = " + wbr(b, n) + " · " + wbr(a, n), [wbr(a * b, n * n)], [a * b, n * n])]] }; },
    urneOhne: function(r){ var a = r(2, 6), b = r(2, 6), n = a + b;
      return { v: { r: a, b: b }, P: [a * b, n * (n - 1)], bild: { art: "urne", r: a, b: b }, meth: "m_urne",
        ohne: { art: "paare", rot: a, blau: b, ohneW: true, k: "o_urneO", an: function(i, j){ return i >= a && j < a; } },
        baum: baum2(["", FR], ["", FB], [a, n], [a - 1, n - 1], [a, n - 1], [[1, 0]]),
        weg: [["wPfad", kette2("P = " + wbr(b, n) + " · " + wbr(a, n - 1), [wbr(a * b, n * (n - 1))], [a * b, n * (n - 1)])]] }; },
    muenze: function(r){ var k = r(2, 7), n = Math.pow(2, k), f = []; for(var i = 0; i < k; i++) f.push(wbr(1, 2));
      var fol = []; for(i = 1; i < k; i++) fol.push("K"); fol.push("Z");
      return { v: { k: k }, P: [1, n], bild: { art: "muenze", k: k }, meth: "m_gross", ohne: { art: "folgen", k: k, n: n, liste: [fol.join("")], an: function(){ return true; }, txtK: "o_muenze" },
        weg: [["wPfad", kette2("P = " + f.join(" · "), [wbr(1, n)], [1, n])]] }; },
    // 🆕 24.11.2026 (l): drei Wege nebeneinander – Tabelle, Baum, Gegenereignis
    sechs: function(r){ r(1, 2);
      return { v: {}, P: [11, 36], bild: { art: "wuerfel", a: 6, b: 3 }, meth: "m_sechs",
        ohne: { art: "wuerfel", an: function(a, b){ return a === 6 || b === 6; }, txt: function(a, b){ return a + "|" + b; } },
        gegen: [["wGegen", "P(Ē) = " + wbr(5, 6) + " · " + wbr(5, 6) + " = " + wbr(25, 36), "pfad"], ["wErg", kette2("P(E) = 1 − " + wbr(25, 36), [wbr(11, 36)], [11, 36]), "gegen"]],
        baum: baum2(["6", "#d81b60"], ["≠6", "#546e7a"], [1, 6], [1, 6], [1, 6], [[0, 0], [0, 1], [1, 0]],
          [["wSumme", kette2("P = " + wbr(1, 6) + " · " + wbr(1, 6) + " + " + wbr(1, 6) + " · " + wbr(5, 6) + " + " + wbr(5, 6) + " · " + wbr(1, 6), [wbr(1, 36) + " + " + wbr(5, 36) + " + " + wbr(5, 36), wbr(11, 36)], [11, 36]), "summe"]]),
        weg: [["wMoegl", "6 · 6 = 36", "zaehl"], ["wGuen", "6 + 5 = 11"], ["wErg", kette2("P = " + wbr(11, 36), [], [11, 36]), "laplace"]] }; },
    mindK: function(r){ var k = r(2, 4), n = Math.pow(2, k), f = [], L = [];
      for(var i = 0; i < k; i++) f.push(wbr(1, 2));
      for(var c = 0; c < n; c++){ var w = ""; for(var j = k - 1; j >= 0; j--) w += (c >> j) & 1 ? "Z" : "K"; L.push(w); }
      return { v: { k: k, n: n }, P: [n - 1, n], bild: { art: "muenze", k: k, frage: true }, meth: "m_mindK",
        ohne: { art: "folgen", k: k, n: n, liste: L, an: function(w){ return w.indexOf("K") >= 0; }, txtK: "o_mindK" },
        weg: [["wGegen", "P(Ē) = " + f.join(" · ") + " = " + wbr(1, n), "pfad"], ["wErg", kette2("P(E) = 1 − " + wbr(1, n), [wbr(n - 1, n)], [n - 1, n]), "gegen"]] }; },
    klasse: function(r){ var N = r(24, 30), M = r(10, N - 10), J = N - M, B = r(6, 12), MB = r(Math.max(1, B - J + 2), Math.min(B - 2, M - 1)), JB = B - MB;
      return { v: { N: N, M: M, J: J, B: B, MB: MB }, P: [JB, N], bild: { art: "klasse", M: M, J: J, MB: MB, JB: JB }, meth: "m_vier",
        ohne: { art: "vier", M: M, J: J, MB: MB, JB: JB },
        weg: [["wVier", B + " − " + MB + " = " + JB], ["wErg", kette2("P = " + wbr(JB, N), [], [JB, N]), "laplace"]] }; }
  };
  var WK_IDS = Object.keys(WK_GEN);
  function zufall(seed){ var x = seed >>> 0 || 1; return function(a, b){ x ^= x << 13; x >>>= 0; x ^= x >> 17; x ^= x << 5; x >>>= 0; return a + x % (b - a + 1); }; }
  function wkBau(a){ return WK_GEN[a.id](zufall(a.seed)); }
  // Eingabe lesen: Bruch, Dezimalzahl oder Prozent → { z, n } (Bruch) bzw. { w } (Zahl)
  function liesP(s){
    s = String(s).trim().replace(/\s+/g, "").replace(/[−–]/g, "-"); if(!s) return null;
    var pz = /%$/.test(s); if(pz) s = s.slice(0, -1);
    var m = s.match(/^(\d+)\/(\d+)$/); if(m && !pz){ return +m[2] ? { z: +m[1], n: +m[2], w: +m[1] / +m[2] } : null; }
    s = s.replace(",", "."); if(!/^\d*\.?\d+$/.test(s)) return null;
    return { w: pz ? +s / 100 : +s };
  }
  function wkRichtig(e, P){
    var w = P[0] / P[1];
    if(e.z != null) return e.z * P[1] === e.n * P[0];
    return Math.abs(e.w - w) <= Math.max(w * 0.01, 0.00005);
  }
  window.MS_KOMB_TEST = { gen: WK_GEN, auf: function(){ return auf; }, setze: function(id, seed){ auf = { wk: true, id: id, seed: seed || 12345 }; nr++; status = null; $("uAntwort").value = ""; zeigeAufgabe(); } };
  var uArt = "mix"; try { uArt = localStorage.getItem("msKombArt") || "mix"; } catch(e){}

  var auf = null, nr = 0, punkte = 0, gemacht = 0, status = null; // status: {gut, eingabe}
  function neueAufgabe(){
    var faelle = Object.keys(VORL), fall, i, n, k;
    if(uArt === "wk" || (uArt === "mix" && Math.random() < 0.5)){
      var id; do { id = wahl(WK_IDS); } while(auf && auf.id === id && WK_IDS.length > 1);
      auf = { wk: true, id: id, seed: Math.floor(Math.random() * 4e9) + 1 }; nr++; status = null; $("uAntwort").value = ""; zeigeAufgabe();
      $("uAntwort").focus({ preventScroll: true }); return;
    }
    do { fall = wahl(faelle); i = zuf(0, VORL[fall].length - 1); n = bereich(VORL[fall][i].n); k = fall === "perm" ? n : bereich(VORL[fall][i].k); }
    while(auf && auf.fall === fall && auf.i === i && auf.n === n && auf.k === k);
    auf = { fall: fall, i: i, n: n, k: k }; nr++; status = null; $("uAntwort").value = ""; zeigeAufgabe();
    $("uAntwort").focus({ preventScroll: true });
  }
  function zeigeAufgabe(){
    if(!auf) return;
    $("uNr").textContent = t("aufgabe", { i: nr });
    $("antwortL").textContent = t(auf.wk ? "antwortP" : "antwortL"); $("tipp").textContent = t(auf.wk ? "tippP" : "tipp");
    $("uAntwort").setAttribute("inputmode", auf.wk ? "text" : "numeric");
    if(auf.wk){
      var W = wkBau(auf); auf.P = W.P;
      $("auftrag").textContent = t("p_" + auf.id, W.v);
      $("uBild").innerHTML = bildSVG(W.bild); sicht($("uBild"), !!W.bild);
      $("punkte").textContent = t("punkte", { p: punkte, n: gemacht });
      var m0 = $("meldung");
      if(!status){ m0.textContent = ""; m0.className = "meldung"; sicht($("uLoesung"), false); $("pruefen").disabled = false; return; }
      if(status.leer){ m0.textContent = t("keinWert"); m0.className = "meldung schlecht"; return; }
      if(status.nochmal){ msNochmal(m0); return; }
      m0.textContent = status.gut ? t("richtig") : t("falsch", { erg: pTxt(W.P) + " ≈ " + dz(W.P[0] / W.P[1] * 100, 2) + " %" }); m0.className = "meldung " + (status.gut ? "gut" : "schlecht");
      $("uLoesung").innerHTML = loesungHTML(W);
      sicht($("uLoesung"), true); $("pruefen").disabled = true; return;
    }
    $("uBild").innerHTML = ""; sicht($("uBild"), false);
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
    if(auf.wk){
      var e = liesP($("uAntwort").value); if(!e){ status = { leer: true }; zeigeAufgabe(); return; }
      var ok = wkRichtig(e, auf.P);
      if(!ok && !(status && status.nochmal)){ status = { nochmal: true }; msNochmal($("meldung")); return; }
      status = { gut: ok }; gemacht++; if(ok) punkte++; zeigeAufgabe(); return;
    }
    var s = $("uAntwort").value.replace(/[\s.,'’  ]/g, "");
    if(!/^\d+$/.test(s)){ status = { leer: true }; zeigeAufgabe(); return; }
    var gut = Number(s) === anzahl(auf.fall, auf.n, auf.k);
    if(!gut && !(status && status.nochmal)){ status = { nochmal: true }; msNochmal($("meldung")); return; } status = { gut: gut }; gemacht++; if(gut) punkte++;
    zeigeAufgabe();
  }
  $("pruefen").addEventListener("click", pruefe);
  $("uAntwort").addEventListener("keydown", function(e){ if(e.key === "Enter"){ if(status && !status.leer && !status.nochmal) neueAufgabe(); else pruefe(); } });
  $("weiter").addEventListener("click", neueAufgabe);
  $("uArt").addEventListener("change", function(){ uArt = this.value; try { localStorage.setItem("msKombArt", uArt); } catch(e){} neueAufgabe(); });

  // ---------- 🆕 24.11.2026 (l): Regeln für Wahrscheinlichkeiten (Formelübersicht), Sprung aus der Lösung ----------
  var REGELN = [
    ["laplace", "P(E) = " + br("|E|", "|Ω|")],
    ["zaehl", "|Ω| = n<sub>1</sub> · n<sub>2</sub> · …"],
    ["fak", "n! = n · (n − 1) · … · 1"],
    ["pfad", "P = p<sub>1</sub> · p<sub>2</sub> · …"],
    ["summe", "P(E) = P<sub>1</sub> + P<sub>2</sub> + …"],
    ["gegen", "P(E) = 1 − P(Ē)"]
  ];
  function regelKarte(){
    $("regelH").textContent = t("regelH"); $("regelT").textContent = t("regelT");
    $("regeln").innerHTML = REGELN.map(function(r){ return '<tr id="r_' + r[0] + '"><td><span class="f">' + r[1] + "</span></td><td><b>" + esc(t("rl_" + r[0])) + ":</b> " + esc(t("re_" + r[0])) + "</td></tr>"; }).join("");
    $("lkText").textContent = t("lkText"); $("lkBaum").textContent = t("lkBaum") + " →"; $("lkVier").textContent = t("lkVier") + " →";
    $("zurAuf").textContent = t("zurAuf");
  }
  document.addEventListener("click", function(e){
    var b = e.target.closest && e.target.closest(".regelLink"); if(!b) return;
    zeigeTab("uebersicht");
    var z = $("r_" + b.dataset.r); if(!z) return;
    sicht($("zurAuf"), true);
    z.classList.remove("blink"); void z.offsetWidth; z.classList.add("blink");
    z.scrollIntoView({ block: "center", behavior: "smooth" });
  });
  $("zurAuf").addEventListener("click", function(){ sicht($("zurAuf"), false); zeigeTab("ueben"); var l = $("uLoesung"); if(l) l.scrollIntoView({ block: "start", behavior: "smooth" }); });

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
    $("uArtL").textContent = t("artL"); $("uArt").innerHTML = ["mix", "anz", "wk"].map(function(v){ return '<option value="' + v + '"' + (v === uArt ? " selected" : "") + ">" + esc(t("art_" + v)) + "</option>"; }).join("");
    $("permFormel").innerHTML = tp("P<sub>n</sub>", "tip_Pn") + " = " + tp("n!", "tip_fak") + " = n · (n − 1) · … · 2 · 1";
    $("buch").innerHTML = t("buch").map(function(z){ return '<tr><td><span class="f">' + esc(z[0]).replace("^k", "<sup>k</sup>") + "</span></td><td>" + esc(z[1]) + "</td></tr>"; }).join("");
    var bv = $("bsp").value || "pin";
    $("bsp").innerHTML = ["pin", "podest", "lotto", "eis", "perm"].map(function(fa){
      var lab = fa === "perm" ? t("b_perm")[0] : t(fa === "pin" || fa === "podest" ? "mitR" : "ohneR") + ", " + t(fa === "pin" || fa === "eis" ? "mitW" : "ohneW");
      return '<optgroup label="' + esc(lab).replace(/"/g, "&quot;") + '">' + BSP.filter(function(b){ return b.fall === fa; }).map(function(b){ return '<option value="' + b.id + '">' + esc(t("b_" + b.id)[0]) + "</option>"; }).join("") + "</optgroup>";
    }).join("");
    $("bsp").value = bv;
    regelKarte(); uebersicht(); beispiele(); zeigeAufgabe();
  }
  window.MS_LANG = { apply: function(l){ if(KT[l]){ lang = l; alles(); } } };
  alles();
})();
