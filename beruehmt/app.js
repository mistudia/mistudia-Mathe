// ============================================================
// beruehmt/app.js – Kachel „Berühmte Aufgaben“
// Übersicht (Karten) → Detail je Person (Direktlink #gauss, #rubik, #archimedes, #thales, #davinci, #demere, #eratosthenes):
// Geschichte, Ausprobieren (interaktiv), eigene Aufgabe (2 Versuche, dann Lösungsweg), Links zu passenden Kacheln.
// Texte: texte.js (BA). Zeichen-Legende über /zeichen.js (MS_ZEICHEN.html).
// ============================================================
(function(){
  "use strict";
  var lang = "de";
  function $(id){ return document.getElementById(id); }
  function t(k, v){ var s = (BA[lang] && BA[lang][k]) || BA.de[k] || k; if(v) for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function bdi(s){ return '<bdi dir="ltr">' + s + "</bdi>"; }
  function komma(){ return ["de", "es", "fr", "ru", "pt"].indexOf(lang) >= 0; }
  function z(x, d){ d = d == null ? 2 : d; var f = Math.pow(10, d), r = Math.round(x * f) / f, s = String(r); if(s.indexOf("e") >= 0) s = r.toFixed(d); return (komma() ? s.replace(".", ",") : s).replace("-", "−"); }
  function lies(s){ s = String(s).trim().replace(/\s+/g, ""); if(/^-?\d{1,3}(,\d{3})+$/.test(s) && !komma()) s = s.replace(/,/g, ""); if(/^-?\d{1,3}(\.\d{3})+$/.test(s) && komma()) s = s.replace(/\./g, ""); s = s.replace(/[−–]/g, "-").replace(/[%a-zA-Zа-яА-Я]+$/, "").replace(",", "."); return /^-?\d*\.?\d+$/.test(s) ? +s : NaN; }
  function hoch(n){ return String(n).replace(/\d/g, function(c){ return "⁰¹²³⁴⁵⁶⁷⁸⁹"[+c]; }); }
  function zuf(a, b){ return a + Math.floor(Math.random() * (b - a + 1)); }
  function wahl(L){ return L[Math.floor(Math.random() * L.length)]; }
  var SVGNS = "http://www.w3.org/2000/svg";

  // ---------- Personen ----------
  var P = [
    { k: "gauss", p: "g", sym: "Σ", col: "#1565c0", leg: "gS gn", link: [["terme", "link_terme"]] },
    { k: "archimedes", p: "a", sym: "π", col: "#7c3aed", leg: "nEcken dKreis u pi approx", link: [["flaechen", "link_flaechen"]] },
    { k: "thales", p: "t", sym: "△", col: "#b8860b", leg: "thH thS thh ths", link: [["dreisatz", "link_dreisatz"]] },
    { k: "davinci", p: "v", sym: "1:8", col: "#0e7490", leg: "", link: [["dreisatz", "link_dreisatz"]] },
    { k: "demere", p: "m", sym: "⚅", col: "#4338ca", leg: "Pw", link: [["wahrscheinlichkeit", "link_wk"]] },
    { k: "eratosthenes", p: "e", sym: "⊕", col: "#475569", leg: "", link: [["trigonometrie/#erdumfang", "e_l1"], ["teilbarkeit/#sieb", "e_l2"]], nurText: true },
    { k: "newton", p: "n", sym: "g", col: "#b45309", leg: "nm ng nF nN", link: [["groessen", "link_groessen"]] },
    { k: "curie", p: "c", sym: "½", col: "#0f766e", leg: "N0 cN cT cn", link: [["exponential", "link_exp"]] },
    { k: "tesla", p: "te", sym: "U", col: "#1d4ed8", leg: "tU tN tV", link: [["dreisatz", "link_dreisatz"]] },
    { k: "einstein", p: "ei", sym: "c", col: "#6d28d9", leg: "cLicht sKm tSek", link: [["groessen", "link_groessen"]] },
    { k: "turing", p: "tu", sym: "01", col: "#334155", leg: "bin", link: [] },
    { k: "vierfarben", p: "f", sym: "4", col: "#c2410c", leg: "", link: [], ohneAufgabe: true },
    { k: "fibonacci", p: "fi", sym: "Fₙ", col: "#a16207", leg: "", link: [] },
    { k: "euler", p: "eu", sym: "7", col: "#0369a1", leg: "euE euK euF", link: [["koerper", "link_koerper"]] },
    { k: "pascal", p: "pf", sym: "A:B", col: "#9333ea", leg: "", link: [["wahrscheinlichkeit", "link_wk"]] },
    { k: "buffon", p: "bu", sym: "π?", col: "#be123c", leg: "buN buK buL buD buX buTh pi approx", link: [["wahrscheinlichkeit", "link_wk"]] },
    { k: "heron", p: "he", sym: "√", col: "#15803d", leg: "heA heX wurzel", link: [["pythagoras", "link_wurzel"]] },
    { k: "chwarizmi", p: "ch", sym: "x²", col: "#0e7490", leg: "xUnb wurzel", link: [["quadratisch", "link_quad"]] },
    { k: "galilei", p: "ga", sym: "↓", col: "#475569", leg: "gaH tSek gErd", link: [] },
    { k: "bernoulli", p: "jb", sym: "e", col: "#059669", leg: "jbN e", link: [["zinsen", "link_zinsen"]] },
    { k: "ramanujan", p: "ra", sym: "1729", col: "#c2410c", leg: "", link: [["terme", "link_terme"]] }
  ];
  function symGr(s){ return s.length > 3 ? 15 : s.length > 2 ? 18 : 24; }
  function finde(k){ for(var i = 0; i < P.length; i++) if(P[i].k === k) return P[i]; return null; }
  var akt = null;

  // ---------- Übersicht ----------
  function uebersicht(){
    $("karten").innerHTML = P.map(function(p){
      return '<a class="bk" href="#' + p.k + '"><span class="bk-sym" style="background:' + p.col + ";font-size:" + symGr(p.sym) + 'px">' + esc(p.sym) + '</span><span class="bk-txt"><b>' + esc(t(p.p + "_name")) + '</b><span class="bk-zeit">' + esc(t(p.p + "_zeit")) + '</span><span class="bk-kurz">' + esc(t(p.p + "_kurz")) + "</span></span></a>";
    }).join("");
  }

  // ---------- Detail ----------
  function detail(){
    var p = akt;
    $("dName").textContent = t(p.p + "_name"); $("dZeit").textContent = t(p.p + "_zeit");
    $("dSym").textContent = p.sym; $("dSym").style.background = p.col; $("dSym").style.fontSize = symGr(p.sym) + "px";
    $("hGesch").textContent = t("geschichte"); $("dStory").textContent = t(p.p + "_story");
    $("hProbe").textContent = t("probieren"); $("hAuf").textContent = t("aufgabe");
    $("zurueck").textContent = t("alle"); $("mehrT").textContent = t("mehr");
    $("links").innerHTML = p.link.map(function(l){ return '<a class="knopf hell" href="/' + l[0] + '">' + esc(t(l[1])) + (lang === "ar" ? " ←" : " →") + "</a>"; }).join(" ");
    var nurText = !!p.nurText;
    $("kProbe").hidden = nurText; $("kAuf").hidden = nurText || !!p.ohneAufgabe;
    $("links").parentNode.hidden = !p.link.length;
    $("pruefen").textContent = t("pruefen"); $("neuAuf").textContent = t("neu"); $("antw").placeholder = t("ein");
    legende(p.leg);
    if(!nurText){ PROBE[p.k](); if(!p.ohneAufgabe){ if(!auf || auf.k !== p.k) neueAufgabe(); else zeigeAufgabe(); } }
  }
  function legende(keys, n){
    var box = $("dLeg");
    if(!keys){ box.hidden = true; return; }
    if(!window.MS_ZEICHEN){ if((n || 0) < 40) setTimeout(function(){ legende(keys, (n || 0) + 1); }, 100); return; }
    box.hidden = false; box.innerHTML = MS_ZEICHEN.html(keys.split(" "));
  }
  function route(){
    var p = finde(location.hash.slice(1));
    akt = p;
    $("s_liste").hidden = !!p; $("s_detail").hidden = !p;
    if(p){ detail(); window.scrollTo(0, 0); }
  }
  $("zurueck").addEventListener("click", function(){ history.pushState(null, "", location.pathname + location.search); route(); });
  window.addEventListener("hashchange", route);

  // ---------- Hilfen fürs Zeichnen ----------
  function el(n, a, txt){ var e = document.createElementNS(SVGNS, n); for(var k in a) e.setAttribute(k, a[k]); if(txt != null) e.textContent = txt; return e; }
  function svgNeu(w, h, cls){ var s = el("svg", { viewBox: "0 0 " + w + " " + h, "class": cls || "bsvg", role: "img" }); return s; }
  function weg(L){ return L.map(function(x){ return x.lbl ? '<li class="wl">' + esc(x.lbl) + "</li>" : "<li>" + bdi(esc(x)) + "</li>"; }).join(""); }

  // ---------- Ausprobieren ----------
  var gN = 10, aN = 6, tWinkel = 40, mStat = [{ g: 0, n: 0, last: "" }, { g: 0, n: 0, last: "" }], vMass = {};
  var PROBE = {
    gauss: function(){
      var b = $("probe");
      b.innerHTML = '<p class="zeile">' + esc(t("g_idee")) + '</p><label class="reglerZ"><span>' + esc(t("g_n")) + ' <b id="gNz"></b></span><input type="range" id="gN" min="3" max="20" step="1"></label><div id="gSvg"></div><ol class="weg" id="gWeg"></ol>';
      $("gN").value = gN;
      $("gN").addEventListener("input", function(){ gN = +this.value; gZeichnen(); });
      gZeichnen();
    },
    archimedes: function(){
      var b = $("probe");
      b.innerHTML = '<p class="zeile">' + esc(t("a_erkl")) + '</p><div class="chips" id="aChips"><b>' + esc(t("a_ecken")) + "</b> " + [6, 12, 24, 48, 96].map(function(n){ return '<button type="button" class="chip" data-n="' + n + '">' + n + "</button>"; }).join("") +
        '</div><div class="zwei"><div id="aSvg"></div><div><table class="tab" id="aTab"></table><p class="merke">' + esc(t("a_erg")) + "</p></div></div>";
      b.querySelectorAll("[data-n]").forEach(function(c){ c.addEventListener("click", function(){ aN = +c.dataset.n; aZeichnen(); }); });
      aZeichnen();
    },
    thales: function(){
      var b = $("probe");
      b.innerHTML = '<p class="zeile">' + esc(t("t_hinweis")) + '</p><label class="reglerZ"><span>' + esc(t("t_sonne")) + ' <b id="tWz"></b></span><input type="range" id="tW" min="25" max="65" step="1"></label><div id="tSvg"></div><ol class="weg" id="tWeg"></ol><p class="merke">' + esc(t("t_regel")) + "</p>";
      $("tW").value = tWinkel;
      $("tW").addEventListener("input", function(){ tWinkel = +this.value; tZeichnen(); });
      tZeichnen();
    },
    davinci: function(){
      var b = $("probe"), F = [["g", "v_groesse"], ["sp", "v_spanne"], ["k", "v_kopf"], ["f", "v_fuss"]];
      b.innerHTML = '<div class="zwei"><div id="vSvg"></div><div><p class="zeile muted">' + esc(t("v_tipp")) + "</p>" +
        F.map(function(f){ return '<label class="vfeld"><span>' + esc(t(f[1])) + '</span><span><input class="zahl" inputmode="decimal" data-v="' + f[0] + '" value="' + esc(vMass[f[0]] || "") + '"> cm</span></label>'; }).join("") +
        '</div></div><div id="vErg"></div><p class="zeile muted">' + esc(t("v_erkl")) + "</p>";
      b.querySelectorAll("[data-v]").forEach(function(i){ i.addEventListener("input", function(){ vMass[i.dataset.v] = i.value; vRechnen(); }); });
      vFigur(); vRechnen();
    },
    demere: function(){
      var b = $("probe"), h = "";
      [0, 1].forEach(function(i){
        h += '<div class="mw"><p class="zeile"><b>' + esc(t(i ? "m_w2" : "m_w1")) + '</b></p><p class="zeile">' + esc(t("m_spielen")) + " " +
          [1, 10, 100, 1000].map(function(n){ return '<button type="button" class="chip" data-w="' + i + '" data-n="' + n + '">+' + n + "</button>"; }).join("") +
          '</p><p class="mLast" id="mLast' + i + '"></p><div class="mBalken"><span id="mBar' + i + '"></span><i></i></div><p class="zeile" id="mStat' + i + '"></p></div>';
      });
      b.innerHTML = '<div class="zwei">' + h + '</div><p class="merke">' + esc(t("m_trick")) + '</p><ol class="weg" id="mWeg"></ol><p class="zeile"><b>' + esc(t("m_fazit")) + "</b></p>";
      b.querySelectorAll("[data-w]").forEach(function(c){ c.addEventListener("click", function(){ mSpielen(+c.dataset.w, +c.dataset.n); }); });
      mAnzeigen();
    }
  };

  // Gauß: Summe zweimal untereinander
  function gZeichnen(){
    var n = gN; $("gNz").textContent = n;
    var W = 660, cw = Math.min(46, (W - 70) / n), x0 = 60, s = svgNeu(W, 150);
    s.appendChild(el("text", { x: 8, y: 36, "class": "bt" }, "S ="));
    s.appendChild(el("text", { x: 8, y: 78, "class": "bt" }, "S ="));
    s.appendChild(el("text", { x: 2, y: 128, "class": "bt", fill: "#7c3aed" }, "2 · S"));
    for(var i = 1; i <= n; i++){
      var x = x0 + (i - 1) * cw;
      s.appendChild(el("rect", { x: x + 1, y: 14, width: cw - 2, height: 32, rx: 6, fill: "#e3eefc", stroke: "#1565c0" }));
      s.appendChild(el("text", { x: x + cw / 2, y: 36, "text-anchor": "middle", "class": "bz" }, String(i)));
      s.appendChild(el("rect", { x: x + 1, y: 56, width: cw - 2, height: 32, rx: 6, fill: "#fdf3d8", stroke: "#b8860b" }));
      s.appendChild(el("text", { x: x + cw / 2, y: 78, "text-anchor": "middle", "class": "bz" }, String(n + 1 - i)));
      s.appendChild(el("text", { x: x + cw / 2, y: 128, "text-anchor": "middle", "class": "bz", fill: "#7c3aed", "font-weight": 800 }, String(n + 1)));
      s.appendChild(el("line", { x1: x + cw / 2, y1: 94, x2: x + cw / 2, y2: 108, stroke: "#7c3aed", "stroke-width": 2 }));
    }
    $("gSvg").innerHTML = ""; $("gSvg").appendChild(s);
    $("gWeg").innerHTML = weg([
      { lbl: t("g_anz") + ": " + n + " · " + t("g_spalte") + ": 1 + " + n + " = " + (n + 1) },
      "2 · S = " + n + " · " + (n + 1) + " = " + (n * (n + 1)),
      "S = " + (n * (n + 1)) + " : 2 = " + (n * (n + 1) / 2),
      { lbl: "n = 100:" }, "S = 100 · 101 : 2 = 5050"
    ]);
  }

  // Archimedes: Vielecke innen und außen
  function aZeichnen(){
    document.querySelectorAll("#aChips [data-n]").forEach(function(c){ c.setAttribute("aria-pressed", +c.dataset.n === aN ? "true" : "false"); });
    var s = svgNeu(300, 300), C = 150, R = 118, n = aN, Ra = R / Math.cos(Math.PI / n);
    function vieleck(r, col, fill){ var d = ""; for(var i = 0; i <= n; i++){ var w = 2 * Math.PI * i / n - Math.PI / 2 + Math.PI / n; d += (i ? "L" : "M") + (C + r * Math.cos(w)).toFixed(2) + " " + (C + r * Math.sin(w)).toFixed(2); } s.appendChild(el("path", { d: d + "Z", fill: fill, stroke: col, "stroke-width": 2.2, "stroke-linejoin": "round" })); }
    vieleck(Ra, "#b8860b", "rgba(184,134,11,0.08)");
    s.appendChild(el("circle", { cx: C, cy: C, r: R, fill: "#ffffff", stroke: "#1a2233", "stroke-width": 2.6 }));
    vieleck(R, "#7c3aed", "rgba(124,58,237,0.10)");
    s.appendChild(el("line", { x1: C - R, y1: C, x2: C + R, y2: C, stroke: "#1a2233", "stroke-width": 1.6, "stroke-dasharray": "5 4" }));
    s.appendChild(el("text", { x: C, y: C - 8, "text-anchor": "middle", "class": "bt" }, "d = 1"));
    $("aSvg").innerHTML = ""; $("aSvg").appendChild(s);
    $("aSvg").insertAdjacentHTML("beforeend", '<p class="leg"><span style="color:#7c3aed">■ ' + esc(t("a_innen")) + '</span> · <span style="color:#b8860b">■ ' + esc(t("a_aussen")) + "</span></p>");
    var h = "<tr><th>" + esc(t("a_tabE")) + "</th><th>" + esc(t("a_tabI")) + "</th><th>" + esc(t("a_tabA")) + "</th></tr>";
    [6, 12, 24, 48, 96].forEach(function(m){ h += '<tr class="' + (m === n ? "an" : "") + '"><td>' + m + "</td><td>" + bdi(z(m * Math.sin(Math.PI / m), 4)) + "</td><td>" + bdi(z(m * Math.tan(Math.PI / m), 4)) + "</td></tr>"; });
    $("aTab").innerHTML = h;
  }

  // Thales: Schatten von Pyramide und Stab
  function tZeichnen(){
    $("tWz").textContent = tWinkel + "°";
    var a = tWinkel * Math.PI / 180, H = 146, B2 = 115, S = H / Math.tan(a), h = 2, sS = h / Math.tan(a);
    var s = svgNeu(680, 250), G = 215, k = 0.72, X = 40 + B2 * k;
    s.appendChild(el("line", { x1: 10, y1: G, x2: 670, y2: G, stroke: "#8a6d3b", "stroke-width": 3 }));
    // Pyramide
    s.appendChild(el("path", { d: "M" + (X - B2 * k) + " " + G + "L" + X + " " + (G - H * k) + "L" + (X + B2 * k) + " " + G + "Z", fill: "#f3d68a", stroke: "#8a6d3b", "stroke-width": 2 }));
    s.appendChild(el("path", { d: "M" + (X + B2 * k) + " " + G + "L" + X + " " + (G - H * k) + "L" + (X + S * k) + " " + G + "Z", fill: "rgba(26,34,51,0.28)" }));
    s.appendChild(el("line", { x1: X, y1: G, x2: X, y2: G - H * k, stroke: "#7c3aed", "stroke-width": 2.4, "stroke-dasharray": "6 4" }));
    s.appendChild(el("line", { x1: X, y1: G + 12, x2: X + S * k, y2: G + 12, stroke: "#1565c0", "stroke-width": 2.4 }));
    s.appendChild(el("text", { x: X - 8, y: G - H * k / 2 + 10, "class": "bt", fill: "#7c3aed", "text-anchor": "end" }, "H = 146 m"));
    s.appendChild(el("text", { x: X + S * k / 2, y: G + 32, "class": "bt", fill: "#1565c0", "text-anchor": "middle" }, "S ≈ " + z(S, 1) + " m"));
    // Sonnenstrahl
    var L = 120; s.appendChild(el("line", { x1: X - L * Math.cos(a), y1: G - H * k - L * Math.sin(a), x2: X + S * k, y2: G, stroke: "#f59e0b", "stroke-width": 2, "stroke-dasharray": "4 4" }));
    s.appendChild(el("circle", { cx: X - L * Math.cos(a) - 8, cy: G - H * k - L * Math.sin(a) - 4, r: 13, fill: "#fbbf24", stroke: "#f59e0b", "stroke-width": 2 }));
    // Stab (vergrößert, eigener Maßstab)
    var kx = 30, SX = 520;
    s.appendChild(el("rect", { x: SX - 36, y: G - h * kx - 30, width: 150, height: h * kx + 60, fill: "none", stroke: "#b0b0b8", "stroke-dasharray": "3 4", rx: 8 }));
    s.appendChild(el("text", { x: SX - 30, y: G - h * kx - 14, "class": "bk-klein" }, t("t_stab") + " (×" + Math.round(kx / k) + ")"));
    s.appendChild(el("line", { x1: SX, y1: G, x2: SX + sS * kx, y2: G, stroke: "#1a2233", "stroke-opacity": 0.4, "stroke-width": 7 }));
    s.appendChild(el("line", { x1: SX, y1: G, x2: SX, y2: G - h * kx, stroke: "#8a6d3b", "stroke-width": 5, "stroke-linecap": "round" }));
    s.appendChild(el("line", { x1: SX - 50 * Math.cos(a), y1: G - h * kx - 50 * Math.sin(a), x2: SX + sS * kx, y2: G, stroke: "#f59e0b", "stroke-width": 2, "stroke-dasharray": "4 4" }));
    s.appendChild(el("text", { x: SX - 8, y: G - h * kx / 2, "class": "bt", fill: "#7c3aed", "text-anchor": "end" }, "h = 2 m"));
    s.appendChild(el("text", { x: SX + sS * kx / 2, y: G + 24, "class": "bt", fill: "#1565c0", "text-anchor": "middle" }, "s ≈ " + z(sS, 2) + " m"));
    $("tSvg").innerHTML = ""; $("tSvg").appendChild(s);
    $("tWeg").innerHTML = weg(["H : S = 146 : " + z(S, 1) + " ≈ " + z(146 / S, 3), "h : s = 2 : " + z(sS, 2) + " ≈ " + z(2 / sS, 3)]);
  }

  // da Vinci: Figur und eigene Maße
  function vFigur(){
    var s = svgNeu(240, 240), c = 120;
    s.appendChild(el("rect", { x: 30, y: 30, width: 180, height: 180, fill: "none", stroke: "#0e7490", "stroke-width": 2.4 }));
    s.appendChild(el("circle", { cx: c, cy: 132, r: 104, fill: "none", stroke: "#b8860b", "stroke-width": 2.4 }));
    var st = { stroke: "#1a2233", "stroke-width": 4, "stroke-linecap": "round", fill: "none" };
    s.appendChild(el("circle", { cx: c, cy: 52, r: 16, fill: "#fde7c8", stroke: "#1a2233", "stroke-width": 2.5 }));
    s.appendChild(el("line", Object.assign({ x1: c, y1: 68, x2: c, y2: 140 }, st)));
    s.appendChild(el("line", Object.assign({ x1: 30, y1: 86, x2: 210, y2: 86 }, st)));
    s.appendChild(el("line", Object.assign({ x1: c, y1: 140, x2: 88, y2: 210 }, st)));
    s.appendChild(el("line", Object.assign({ x1: c, y1: 140, x2: 152, y2: 210 }, st)));
    s.appendChild(el("line", { x1: 30, y1: 224, x2: 210, y2: 224, stroke: "#0e7490", "stroke-width": 1.6 }));
    s.appendChild(el("text", { x: c, y: 238, "text-anchor": "middle", "class": "bk-klein", fill: "#0e7490" }, t("v_spanne").split(" (")[0] + " = " + t("v_groesse")));
    $("vSvg").innerHTML = ""; $("vSvg").appendChild(s);
  }
  function vRechnen(){
    var g = lies(vMass.g || ""), R = [["sp", "v_r1", 1, function(x){ return x / g; }], ["k", "v_r2", 8, function(x){ return g / x; }], ["f", "v_r3", 6, function(x){ return g / x; }]];
    if(!(g > 0)){ $("vErg").innerHTML = '<p class="zeile muted">' + esc(t("v_leer")) + "</p>"; return; }
    $("vErg").innerHTML = R.map(function(r){
      var x = lies(vMass[r[0]] || ""); if(!(x > 0)) return "";
      var w = r[3](x), ab = Math.abs(w - r[2]) / r[2] * 100;
      return '<div class="vzeile"><b>' + esc(t(r[1])) + "</b> = " + bdi(z(w, 2)) + ' <span class="muted">(' + esc(t("v_vitruv", { w: r[2] })) + ")</span><br><span class=\"" + (ab < 5 ? "vnah" : "vweit") + '">' + esc(ab < 5 ? t("v_nah") : t("v_weit", { p: z(ab, 0) })) + "</span></div>";
    }).join("") || '<p class="zeile muted">' + esc(t("v_leer")) + "</p>";
  }

  // de Méré: simulieren
  function wurf(){ return 1 + Math.floor(Math.random() * 6); }
  var WF = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
  function mSpielen(i, n){
    var S = mStat[i];
    for(var r = 0; r < n; r++){
      var ok = false, txt = [];
      if(i === 0){ for(var j = 0; j < 4; j++){ var w = wurf(); txt.push(WF[w - 1]); if(w === 6) ok = true; } }
      else { for(var j2 = 0; j2 < 24; j2++){ var a = wurf(), b = wurf(); if(a === 6 && b === 6){ ok = true; txt.push(WF[5] + WF[5]); } } if(!txt.length) txt.push("–"); }
      S.n++; if(ok) S.g++; S.last = txt.join(" ") + (ok ? " ✓" : " ✗");
    }
    mAnzeigen();
  }
  function mAnzeigen(){
    var PT = [1 - Math.pow(5 / 6, 4), 1 - Math.pow(35 / 36, 24)];
    [0, 1].forEach(function(i){
      var S = mStat[i], q = S.n ? S.g / S.n : 0;
      $("mBar" + i).style.width = (q * 100) + "%";
      $("mStat" + i).innerHTML = (S.n ? esc(t("m_gew", { g: S.g, n: S.n, p: z(q * 100, 1) + " %" })) + "<br>" : "") + esc(t("m_ber", { p: z(PT[i] * 100, 1) + " %" }));
      $("mLast" + i).textContent = S.last;
    });
    $("mWeg").innerHTML = weg([
      { lbl: t("m_w1") + " – P = P(" + t("m_mind") + ")" }, "P = 1 − (5/6)⁴ = 1 − 625/1296 = 671/1296 ≈ " + z(PT[0] * 100, 1) + " %",
      { lbl: t("m_w2") + " – P = P(" + t("m_mind2") + ")" }, "P = 1 − (35/36)²⁴ ≈ 1 − " + z(Math.pow(35 / 36, 24), 3) + " ≈ " + z(PT[1] * 100, 1) + " %"
    ]);
  }

  // ---------- Aufgaben ----------
  var auf = null, punkte = 0, anzahl = 0;
  var GEN = {
    gauss: function(){
      if(Math.random() < 0.5){ var n = wahl([20, 30, 40, 50, 60, 80, 100, 200, 1000]), S = n * (n + 1) / 2;
        return { q: t("g_q1", { n: n }), w: S, tol: 0, l: String(S), weg: [{ lbl: t("g_anz") + ": " + n }, { lbl: t("g_spalte") + ": 1 + " + n + " = " + (n + 1) }, "2 · S = " + n + " · " + (n + 1) + " = " + (n * (n + 1)), "S = " + (n * (n + 1)) + " : 2 = " + S] }; }
      var a = zuf(10, 40), k = zuf(10, 60), b = a + k - 1, S2 = k * (a + b) / 2;
      return { q: t("g_q2", { a: a, a1: a + 1, a2: a + 2, b: b }), w: S2, tol: 0, l: String(S2), weg: [{ lbl: t("g_anz") }, b + " − " + a + " + 1 = " + k, { lbl: t("g_spalte") }, a + " + " + b + " = " + (a + b), "2 · S = " + k + " · " + (a + b) + " = " + (k * (a + b)), "S = " + (k * (a + b)) + " : 2 = " + S2] };
    },
    archimedes: function(){
      var d = 7 * zuf(2, 14), u = 22 * d / 7;
      return { q: t("a_q", { d: d }), w: u, tol: 0.5, l: u + " cm", weg: [{ lbl: t("a_w1") }, "u = π · d", "u ≈ 22/7 · " + d, "u = 22 · " + d + " : 7 = 22 · " + (d / 7) + " = " + u + " cm"] };
    },
    thales: function(){
      var H = zuf(100, 150), h = wahl([1, 2]), q = wahl([0.8, 1.2, 1.5, 2, 2.5]), s = h * q, S = H * q;
      return { q: t("t_q", { h: z(h, 1), s: z(s, 2), S: z(S, 1) }), w: H, tol: 0.6, l: H + " m", weg: ["H : S = h : s", "H = S · h : s", "H = " + z(S, 1) + " · " + z(h, 1) + " : " + z(s, 2), "H = " + H + " m"] };
    },
    davinci: function(){
      var art = wahl(["K", "F", "S"]), g;
      if(art === "K"){ g = 8 * zuf(16, 24); return { q: t("v_qK", { g: g }), w: g / 8, tol: 0.2, l: (g / 8) + " cm", weg: [t("v_wK"), t("v_wK").split("=")[0].trim() + " = " + g + " : 8 = " + (g / 8) + " cm"] }; }
      if(art === "F"){ g = 6 * zuf(22, 31); return { q: t("v_qF", { g: g }), w: g / 6, tol: 0.2, l: (g / 6) + " cm", weg: [t("v_wF"), t("v_wF").split("=")[0].trim() + " = " + g + " : 6 = " + (g / 6) + " cm"] }; }
      g = zuf(120, 190); return { q: t("v_qS", { g: g }), w: g, tol: 0.2, l: g + " cm", weg: [t("v_wS"), t("v_wS").split("=")[0].trim() + " = " + g + " cm"] };
    },
    demere: function(){
      var n = wahl([2, 3, 5, 6, 8, 10]), k = Math.pow(5 / 6, n), p = (1 - k) * 100;
      return { q: t("m_q", { n: n }), w: Math.round(p * 10) / 10, tol: 0.15, l: z(p, 1) + " %", weg: ["P(" + t("m_keine") + ") = (5/6)" + hoch(n) + " ≈ " + z(k, 4), "P(" + t("m_mind") + ") = 1 − " + z(k, 4) + " ≈ " + z(1 - k, 4), "P ≈ " + z(p, 1) + " %"] };
    }
  };
  // ---------- Runde 2: Einstein, Newton, Curie, Tesla, Turing, Vierfarbensatz ----------
  function tA(k){ var v = (BA[lang] && BA[lang][k]) || BA.de[k]; return Array.isArray(v) ? v : []; }
  function gz(n){ var s = String(Math.round(n)), sep = ["en", "zh", "ja", "ar"].indexOf(lang) >= 0 ? "," : " "; return s.replace(/\B(?=(\d{3})+(?!\d))/g, sep); }
  var C_LICHT = 300000, EI_S = [40075, 384400, 149600000, 56000000, 4500000000], eiZ = 2;
  function eiZeit(sek){ if(sek >= 3600) return t("ei_std", { h: z(sek / 3600, 1) }); if(sek >= 60) return t("ei_min", { m: Math.floor(sek / 60), s: Math.round(sek % 60) }); return ""; }
  PROBE.einstein = function(){
    var b = $("probe");
    b.innerHTML = '<div class="chips" id="eiChips"><b>' + esc(t("ei_ziel")) + "</b> " + tA("ei_Z").map(function(n, i){ return '<button type="button" class="chip" data-i="' + i + '">' + esc(n) + "</button>"; }).join("") +
      '</div><div id="eiSvg"></div><p><button type="button" class="knopf" id="eiStart">' + esc(t("ei_start")) + '</button></p><ol class="weg" id="eiWeg"></ol>';
    b.querySelectorAll("#eiChips [data-i]").forEach(function(c){ c.addEventListener("click", function(){ eiZ = +c.dataset.i; eiZeichnen(); }); });
    $("eiStart").addEventListener("click", eiStart);
    eiZeichnen();
  };
  function eiZeichnen(){
    document.querySelectorAll("#eiChips [data-i]").forEach(function(c){ c.setAttribute("aria-pressed", +c.dataset.i === eiZ ? "true" : "false"); });
    var s = svgNeu(660, 120), x0 = 60, x1 = 600;
    s.appendChild(el("line", { x1: x0, y1: 60, x2: x1, y2: 60, stroke: "#b0b0b8", "stroke-width": 2, "stroke-dasharray": "6 6" }));
    s.appendChild(el("circle", { cx: x0, cy: 60, r: 26, fill: "#3b82f6", stroke: "#1e3a8a", "stroke-width": 2 }));
    var zc = ["#3b82f6", "#d1d5db", "#fbbf24", "#e07a4a", "#60a5fa"][eiZ], zr = [26, 14, 34, 16, 20][eiZ];
    if(eiZ > 0) s.appendChild(el("circle", { cx: x1, cy: 60, r: zr, fill: zc, stroke: "#4b5563", "stroke-width": 1.5 }));
    else s.appendChild(el("path", { d: "M" + x0 + " 30 A 300 30 0 0 1 " + x0 + " 90", fill: "none", stroke: "#3b82f6", "stroke-width": 2, "stroke-dasharray": "4 4" }));
    s.appendChild(el("circle", { id: "eiPunkt", cx: x0 + 28, cy: 60, r: 7, fill: "#fde047", stroke: "#ca8a04", "stroke-width": 2 }));
    s.appendChild(el("text", { x: (x0 + x1) / 2, y: 30, "text-anchor": "middle", "class": "bt" }, "s = " + gz(EI_S[eiZ]) + " km"));
    $("eiSvg").innerHTML = ""; $("eiSvg").appendChild(s);
    var tt = EI_S[eiZ] / C_LICHT, zus = eiZeit(tt);
    $("eiWeg").innerHTML = weg(["t = s : c", "t = " + gz(EI_S[eiZ]) + " : " + gz(C_LICHT), "t ≈ " + z(tt, tt < 10 ? 2 : 0) + " s"].concat(zus ? [{ lbl: zus }] : []));
  }
  function eiStart(){
    var p = $("eiPunkt"); if(!p) return;
    var a0 = performance.now(), dauer = 2400, x0 = 88, x1 = 600 - ([26, 14, 34, 16, 20][eiZ]) - 4;
    if(eiZ === 0){ x1 = 560; }
    (function lauf(n){ var f = Math.min(1, (n - a0) / dauer); p.setAttribute("cx", x0 + (x1 - x0) * f); if(f < 1) requestAnimationFrame(lauf); })(a0);
  }

  var N_G = [9.81, 1.62, 3.71, 8.87, 24.79], nM = 50;
  PROBE.newton = function(){
    var b = $("probe");
    b.innerHTML = '<label class="reglerZ"><span>' + esc(t("n_masse")) + ' <b id="nMz"></b></span><input type="range" id="nM" min="20" max="120" step="1"></label><div class="tabWrap"><table class="tab" id="nTab"></table></div><p class="merke">' + esc(t("n_erkl")) + '</p><ol class="weg" id="nWeg"></ol>';
    $("nM").value = nM; $("nM").addEventListener("input", function(){ nM = +this.value; nZeichnen(); });
    nZeichnen();
  };
  function nZeichnen(){
    $("nMz").textContent = nM + " kg";
    var K = tA("n_K"), h = "<tr><th>" + esc(t("n_koerper")) + "</th><th>" + esc(t("n_g")) + "</th><th>" + esc(t("n_F")) + "</th><th>" + esc(t("n_waage")) + "</th><th>" + esc(t("n_sprung")) + "</th></tr>";
    N_G.forEach(function(g, i){ h += "<tr" + (i === 1 ? ' class="an"' : "") + "><td>" + esc(K[i]) + "</td><td>" + bdi(z(g, 2)) + "</td><td>" + bdi(gz(nM * g) + " N") + "</td><td>" + bdi(z(nM * g / 9.81, 1) + " kg") + "</td><td>" + bdi(gz(50 * 9.81 / g) + " cm") + "</td></tr>"; });
    $("nTab").innerHTML = h;
    $("nWeg").innerHTML = weg([{ lbl: K[1] }, "F = m · g", "F = " + nM + " kg · 1,62 N/kg".replace(",", komma() ? "," : "."), "F ≈ " + gz(nM * 1.62) + " N"]);
  }

  var cAt = [], cN = 0, cVerlauf = [];
  function cReset(){ cAt = []; for(var i = 0; i < 100; i++) cAt.push(true); cN = 0; cVerlauf = [100]; }
  PROBE.curie = function(){
    if(!cAt.length) cReset();
    var b = $("probe");
    b.innerHTML = '<div class="zwei"><div id="cSvg"></div><div><p class="zeile" id="cNoch"></p><p class="zeile muted" id="cErw"></p><p class="zeile" id="cVerl"></p><p><button type="button" class="knopf" id="cWeiter">' + esc(t("c_weiter")) + '</button> <button type="button" class="knopf hell" id="cReset">' + esc(t("c_reset")) + '</button></p><p class="merke">' + esc(t("c_zufall")) + "</p></div></div>";
    $("cWeiter").addEventListener("click", function(){ if(cN >= 8) return; cAt = cAt.map(function(a){ return a && Math.random() >= 0.5; }); cN++; cVerlauf.push(cAt.filter(Boolean).length); cZeichnen(); });
    $("cReset").addEventListener("click", function(){ cReset(); cZeichnen(); });
    cZeichnen();
  };
  function cZeichnen(){
    var s = svgNeu(300, 300);
    cAt.forEach(function(a, i){ s.appendChild(el("circle", { cx: 18 + (i % 10) * 29, cy: 18 + Math.floor(i / 10) * 29, r: 11, fill: a ? "#7c3aed" : "#e5e7eb", stroke: a ? "#4c1d95" : "#b0b0b8", "stroke-width": 1.5 })); });
    $("cSvg").innerHTML = ""; $("cSvg").appendChild(s);
    var noch = cAt.filter(Boolean).length;
    $("cNoch").innerHTML = "<b>" + esc(t("c_noch", { n: cN, a: noch })) + "</b>";
    $("cErw").textContent = t("c_erwartet", { n: hoch(cN), e: z(100 / Math.pow(2, cN), 2) }).replace("^", "");
    $("cVerl").textContent = cVerlauf.join(" → ");
    $("cWeiter").disabled = cN >= 8 || noch === 0;
  }

  var teN1 = 1000, teN2 = 100;
  PROBE.tesla = function(){
    var b = $("probe");
    b.innerHTML = '<label class="reglerZ"><span>' + esc(t("te_N1")) + ' <b id="teN1z"></b></span><input type="range" id="teN1" min="100" max="2000" step="100"></label>' +
      '<label class="reglerZ"><span>' + esc(t("te_N2")) + ' <b id="teN2z"></b></span><input type="range" id="teN2" min="0" max="40" step="1"></label><div id="teSvg"></div><ol class="weg" id="teWeg"></ol><p class="merke">' + esc(t("te_hoch")) + "</p>";
    $("teN1").value = teN1; $("teN2").value = TE_N2.indexOf(teN2) >= 0 ? TE_N2.indexOf(teN2) : 5;
    $("teN1").addEventListener("input", function(){ teN1 = +this.value; teZeichnen(); });
    $("teN2").addEventListener("input", function(){ teN2 = TE_N2[+this.value]; teZeichnen(); });
    teZeichnen();
  };
  var TE_N2 = [10, 20, 30, 40, 50, 100, 150, 200, 250, 300, 400, 500, 600, 700, 800, 900, 1000, 1200, 1500, 2000, 2500, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 12000, 14000, 16000, 18000, 20000, 25000, 30000, 40000, 50000, 60000, 80000, 100000];
  function teZeichnen(){
    var U2 = 230 * teN2 / teN1;
    $("teN1z").textContent = gz(teN1); $("teN2z").textContent = gz(teN2);
    var s = svgNeu(660, 230), st = { fill: "none", stroke: "#b45309", "stroke-width": 3 };
    s.appendChild(el("rect", { x: 200, y: 30, width: 260, height: 170, rx: 10, fill: "none", stroke: "#6b7280", "stroke-width": 26 }));
    s.appendChild(el("text", { x: 330, y: 120, "text-anchor": "middle", "class": "bk-klein" }, t("te_kern")));
    function spule(x, n){ var k = Math.max(2, Math.min(18, Math.round(Math.log(n) * 2.2 - 6))), h = 120 / k; for(var i = 0; i < k; i++) s.appendChild(el("ellipse", Object.assign({ cx: x, cy: 55 + h * (i + 0.5), rx: 24, ry: h / 2 }, st))); return k; }
    spule(200, teN1); spule(460, teN2);
    s.appendChild(el("text", { x: 120, y: 112, "text-anchor": "middle", "class": "bt", fill: "#1565c0" }, "U₁ = 230 V"));
    s.appendChild(el("text", { x: 120, y: 134, "text-anchor": "middle", "class": "bk-klein" }, t("te_ein") + " · N₁ = " + gz(teN1)));
    s.appendChild(el("text", { x: 560, y: 112, "text-anchor": "middle", "class": "bt", fill: "#7c3aed" }, "U₂ ≈ " + (U2 >= 100 ? gz(U2) : z(U2, 1)) + " V"));
    s.appendChild(el("text", { x: 560, y: 134, "text-anchor": "middle", "class": "bk-klein" }, t("te_aus") + " · N₂ = " + gz(teN2)));
    $("teSvg").innerHTML = ""; $("teSvg").appendChild(s);
    $("teWeg").innerHTML = weg(["U₂ : U₁ = N₂ : N₁", "U₂ = U₁ · N₂ : N₁", "U₂ = 230 V · " + gz(teN2) + " : " + gz(teN1) + " ≈ " + (U2 >= 100 ? gz(U2) : z(U2, 2)) + " V"]);
  }

  var tuBand = [], tuPos = 0, tuHalt = false, tuStart = "1011", tuTimer = null, tuRegel = -1;
  function tuLaden(b){ tuStart = b; tuBand = [" "].concat(b.split("")); tuPos = tuBand.length - 1; tuHalt = false; tuRegel = -1; }
  function tuWert(L){ var s = L.join("").trim(); return s ? parseInt(s, 2) : 0; }
  function tuSchritt(){
    if(tuHalt) return;
    if(tuBand[tuPos] === "1"){ tuBand[tuPos] = "0"; tuRegel = 0; tuPos--; if(tuPos < 0){ tuBand.unshift(" "); tuPos = 0; } }
    else { tuBand[tuPos] = "1"; tuRegel = 1; tuHalt = true; }
    tuZeichnen();
  }
  PROBE.turing = function(){
    if(!tuBand.length) tuLaden(tuStart);
    var b = $("probe");
    b.innerHTML = '<p class="merke">' + esc(t("tu_bin")) + '</p><label class="reglerZ"><span>' + esc(t("tu_zahl")) + '</span><input class="zahl" id="tuEin" inputmode="numeric" maxlength="12" value="' + esc(tuStart) + '"></label><p class="zeile muted" id="tuFehl"></p>' +
      '<div class="tuBand" id="tuBand" dir="ltr"></div><p class="zeile"><b>' + esc(t("tu_zustand")) + ':</b> <span id="tuZ"></span></p>' +
      '<p><button type="button" class="knopf" id="tuS">' + esc(t("tu_schritt")) + '</button> <button type="button" class="knopf" id="tuA">' + esc(t("tu_auto")) + '</button> <button type="button" class="knopf hell" id="tuR">' + esc(t("tu_reset")) + "</button></p>" +
      '<p class="zeile"><b>' + esc(t("tu_regeln")) + '</b></p><ol class="tuRegeln"><li id="tuR0">' + esc(t("tu_r1")) + '</li><li id="tuR1">' + esc(t("tu_r2")) + '</li></ol><p class="meldung gut" id="tuFertig"></p>';
    $("tuEin").addEventListener("input", function(){ var v = this.value.trim(); clearInterval(tuTimer); if(/^[01]{1,12}$/.test(v)){ $("tuFehl").textContent = ""; tuLaden(v); tuZeichnen(); } else $("tuFehl").textContent = t("tu_ungueltig"); });
    $("tuS").addEventListener("click", function(){ clearInterval(tuTimer); tuSchritt(); });
    $("tuA").addEventListener("click", function(){ clearInterval(tuTimer); tuTimer = setInterval(function(){ if(tuHalt || !document.getElementById("tuBand")){ clearInterval(tuTimer); return; } tuSchritt(); }, 450); });
    $("tuR").addEventListener("click", function(){ clearInterval(tuTimer); tuLaden(tuStart); tuZeichnen(); });
    tuZeichnen();
  };
  function tuZeichnen(){
    var n = tuBand.length, h = "";
    tuBand.forEach(function(c, i){ var wert = Math.pow(2, n - 1 - i); h += '<div class="tuZ' + (i === tuPos ? " kopf" : "") + '"><span class="tuS">' + (c === " " ? "&nbsp;" : c) + '</span><small>' + (i === 0 && c === " " ? "" : wert) + "</small></div>"; });
    $("tuBand").innerHTML = h;
    $("tuZ").textContent = tuHalt ? t("tu_halt") : t("tu_laeuft");
    ["tuR0", "tuR1"].forEach(function(id, i){ $(id).className = i === tuRegel ? "an" : ""; });
    $("tuFertig").textContent = tuHalt ? t("tu_fertig", { a: parseInt(tuStart, 2), b: tuWert(tuBand) }) : "";
    $("tuS").disabled = tuHalt; $("tuA").disabled = tuHalt;
  }

  // Vierfarbensatz: zufällige Karte aus Sechseck-Zellen
  var F_FARBEN = ["#60a5fa", "#fbbf24", "#a78bfa", "#2dd4bf"], fKarte = null, fFarbe = 0, fGel = [], fMin = 0;
  var HX_C = 15, HX_R = 10, HX = 21, HW = Math.sqrt(3) * HX;
  function hxMitte(c, r){ return [HW * (c + 0.5 * (r & 1)) + HW / 2 + 8, 1.5 * HX * r + HX + 6]; }
  function hxNach(c, r){ var o = r & 1; return [[1, 0], o ? [1, 1] : [0, 1], o ? [0, 1] : [-1, 1], [-1, 0], o ? [0, -1] : [-1, -1], o ? [1, -1] : [0, -1]].map(function(d){ return [c + d[0], r + d[1]]; }); }
  function fNeu(){
    var land = {}, zellen = [], cx = (HX_C - 1) / 2, cy = (HX_R - 1) / 2;
    for(var r = 0; r < HX_R; r++) for(var c = 0; c < HX_C; c++){ var dx = (c - cx) / (cx + 0.6), dy = (r - cy) / (cy + 0.6); if(dx * dx + dy * dy + Math.random() * 0.25 < 1.05){ land[c + "," + r] = -1; zellen.push([c, r]); } }
    var n = zuf(11, 15), front = [], reg = 0;
    var gemischt = zellen.slice().sort(function(){ return Math.random() - 0.5; });
    gemischt.forEach(function(z0){ if(reg >= n) return; var k = z0[0] + "," + z0[1]; var nah = hxNach(z0[0], z0[1]).some(function(q){ return land[q[0] + "," + q[1]] >= 0; }); if(land[k] === -1 && !nah){ land[k] = reg++; front.push(z0); } });
    while(front.length){
      var i = Math.floor(Math.random() * front.length), z1 = front[i], frei = hxNach(z1[0], z1[1]).filter(function(q){ return land[q[0] + "," + q[1]] === -1; });
      if(!frei.length){ front.splice(i, 1); continue; }
      var q = frei[Math.floor(Math.random() * frei.length)]; land[q[0] + "," + q[1]] = land[z1[0] + "," + z1[1]]; front.push(q);
    }
    var nb = []; for(var a = 0; a < reg; a++) nb.push({});
    zellen.forEach(function(z2){ var g = land[z2[0] + "," + z2[1]]; hxNach(z2[0], z2[1]).forEach(function(q){ var h = land[q[0] + "," + q[1]]; if(h != null && h >= 0 && h !== g){ nb[g][h] = 1; } }); });
    fKarte = { land: land, zellen: zellen, n: reg, nb: nb.map(function(o){ return Object.keys(o).map(Number); }) };
    fGel = []; for(var b = 0; b < reg; b++) fGel.push(-1);
    fMin = fChrom();
  }
  // Färben mit k Farben: DSatur (Land mit den meisten verschiedenen Nachbarfarben zuerst) + Rücksetzen, mit Schrittgrenze
  function fLoese(k){
    var N = fKarte.n, NB = fKarte.nb, col = [], schritte = 0;
    for(var i = 0; i < N; i++) col.push(-1);
    function waehle(){
      var best = -1, bs = -1, bd = -1;
      for(var v = 0; v < N; v++){ if(col[v] >= 0) continue; var m = {}, sat = 0; NB[v].forEach(function(u){ if(col[u] >= 0 && !m[col[u]]){ m[col[u]] = 1; sat++; } }); if(sat > bs || (sat === bs && NB[v].length > bd)){ best = v; bs = sat; bd = NB[v].length; } }
      return best;
    }
    function rek(){
      var v = waehle(); if(v < 0) return true; if(++schritte > 200000) return false;
      for(var c = 0; c < k; c++){ if(NB[v].every(function(u){ return col[u] !== c; })){ col[v] = c; if(rek()) return true; col[v] = -1; } }
      return false;
    }
    return rek() ? col : null;
  }
  function fChrom(){
    var N = fKarte.n, NB = fKarte.nb, kanten = NB.some(function(L){ return L.length; });
    if(!kanten) return 1;
    if(fLoese(2)) return 2;
    var adj = NB.map(function(L){ var o = {}; L.forEach(function(u){ o[u] = 1; }); return o; });
    for(var u = 0; u < N; u++) for(var a = 0; a < NB[u].length; a++){ var v = NB[u][a]; if(v < u) continue;
      var gem = NB[u].filter(function(w){ return adj[v][w]; });
      for(var x = 0; x < gem.length; x++) for(var y = x + 1; y < gem.length; y++) if(adj[gem[x]][gem[y]]) return 4; }
    return fLoese(3) ? 3 : 4;
  }
  var fView = null;
  var F_ARTEN = ["zufall", "deutschland", "europa", "afrika", "asien", "nordamerika", "usa", "suedamerika", "welt"], fNetz = false, fHi = null, fArt = "deutschland", fName = "";
  function fWaehle(art){
    fArt = art; fName = "";
    if(art === "zufall"){ fNeu(); fZeichnen(); return; }
    if(!window.F_KARTEN){
      $("fSvg").innerHTML = '<p class="zeile muted">' + esc(t("f_laden")) + "</p>";
      if(!document.getElementById("fKartenSkript")){ var sc = document.createElement("script"); sc.id = "fKartenSkript"; sc.src = "karten-data.js"; sc.onload = function(){ if(fArt === art && $("fSvg")) fWaehle(art); }; document.head.appendChild(sc); }
      return;
    }
    var K = F_KARTEN[art];
    fKarte = { echt: true, art: art, K: K, n: K.r.length, nb: K.nb }; fView = { x: 0, y: 0, w: K.w, h: K.h };
    fGel = []; for(var i = 0; i < fKarte.n; i++) fGel.push(-1);
    fMin = fChrom();
    if(fHi && fHi.art === art){ fHi.g = K.r.findIndex(function(r){ return r.n[0] === fHi.name; }); fHiView(); } else fHi = null;
    fBspZeigen(); fZeichnen();
  }
  // Ansicht auf ein Beispiel-Land und seinen Nachbarring richten
  function fHiView(){
    var K = fKarte.K, g = fHi.g; if(g < 0) return;
    var P = [g].concat(K.nb[g]).map(function(i){ return K.r[i].c; }).filter(Boolean);
    var x0 = Math.min.apply(null, P.map(function(p){ return p[0]; })), x1 = Math.max.apply(null, P.map(function(p){ return p[0]; }));
    var y0 = Math.min.apply(null, P.map(function(p){ return p[1]; })), y1 = Math.max.apply(null, P.map(function(p){ return p[1]; }));
    var w = Math.max(x1 - x0, (y1 - y0) * K.w / K.h) * 2.2 + K.w / 25; w = Math.min(K.w, w);
    var h = w * K.h / K.w;
    fView = { x: (x0 + x1) / 2 - w / 2, y: (y0 + y1) / 2 - h / 2, w: w, h: h }; fKlemmen();
  }
  var F_BSP = [["deutschland", "Thüringen"], ["deutschland", "Sachsen-Anhalt"], ["europa", "Luxemburg"], ["europa", "Tschechien"], ["afrika", "Malawi"], ["afrika", "Burundi"], ["afrika", "Tschad"], ["afrika", "Niger"], ["asien", "Laos"], ["asien", "Usbekistan"], ["asien", "Kirgisistan"], ["asien", "Afghanistan"], ["usa", "Nevada"], ["usa", "Kansas"], ["suedamerika", "Paraguay"], ["suedamerika", "Bolivien"]];
  function fNameVon(art, name){ var K = window.F_KARTEN && F_KARTEN[art], ni = Math.max(0, ["de", "en", "es", "zh", "fr", "ru", "ar", "ja", "pt"].indexOf(lang)); if(!K) return null; var r = K.r.filter(function(x){ return x.n[0] === name; })[0]; return r ? { r: r, g: K.r.indexOf(r), name: r.n[ni] || r.n[1], K: K } : null; }
  function fBspZeigen(){
    var box = $("fBsp"); if(!box || !window.F_KARTEN || box.dataset.ok) return; box.dataset.ok = "1";
    var gr = {}, folge = [];
    F_BSP.forEach(function(e, i){ var x = fNameVon(e[0], e[1]); if(!x) return; if(!gr[e[0]]){ gr[e[0]] = []; folge.push(e[0]); } gr[e[0]].push('<button type="button" class="chip" data-i="' + i + '">' + esc(x.name) + " (" + x.K.nb[x.g].length + ")</button>"); });
    box.innerHTML = '<p class="zeile"><b>' + esc(t("f_bsp")) + "</b></p>" + folge.map(function(a){ return '<div class="chips fBspG"><span class="muted">' + esc(tA("f_karten")[F_ARTEN.indexOf(a)]) + ":</span> " + gr[a].join("") + "</div>"; }).join("");
    box.querySelectorAll("[data-i]").forEach(function(bt){ bt.addEventListener("click", function(){ var e = F_BSP[+bt.dataset.i]; fHi = { art: e[0], name: e[1] }; fWaehle(e[0]); var z = $("fSvg"); if(z && z.scrollIntoView) z.scrollIntoView({ behavior: "smooth", block: "center" }); }); });
  }
  PROBE.vierfarben = function(){
    var b = $("probe");
    b.innerHTML = '<p class="zeile">' + esc(t("f_anl")) + '</p><div class="chips" id="fArt"><b>' + esc(t("f_wahl")) + "</b> " + F_ARTEN.map(function(a, i){ return '<button type="button" class="chip" data-a="' + a + '">' + esc(tA("f_karten")[i]) + "</button>"; }).join("") + '</div><div class="chips" id="fPal">' + F_FARBEN.map(function(c, i){ return '<button type="button" class="fFarbe" data-f="' + i + '" style="background:' + c + '" aria-label="' + (i + 1) + '"></button>'; }).join("") +
      '<button type="button" class="chip" data-f="-1">' + esc(t("f_radier")) + '</button></div><div id="fSvg"></div><p class="zeile" id="fStatus"></p>' +
      '<p><button type="button" class="knopf hell" id="fNeu">' + esc(t("f_neu")) + '</button> <button type="button" class="knopf hell" id="fLeer">' + esc(t("f_leeren")) + '</button> <button type="button" class="knopf hell" id="fLoes">' + esc(t("f_loesung")) + '</button> <button type="button" class="chip" id="fNetzB">' + esc(t("f_netz")) + '</button></p><p class="zeile" id="fHiTxt" hidden></p><p class="merke">' + esc(t("f_warum")) + "</p>" +
      '<div id="fBsp"></div>' +
      '<h3 class="fH">' + esc(t("f_ring_h")) + '</h3><p class="zeile">' + esc(t("f_ring_anl")) + '</p><label class="reglerZ"><span>' + esc(t("f_ring_n")) + ' <b id="frNz"></b></span><input type="range" id="frN" min="3" max="8" step="1"></label>' +
      '<div id="frSvg"></div><p class="zeile" id="frStatus"></p><p><button type="button" class="knopf hell" id="frLoes">' + esc(t("f_loesung")) + '</button> <button type="button" class="knopf hell" id="frLeer">' + esc(t("f_leeren")) + '</button></p><p class="merke" id="frRegel"></p>' +
      '<h3 class="fH">' + esc(t("f_bew_h")) + '</h3><ol class="fBew">' + tA("f_bew").map(function(x){ return "<li>" + esc(x) + "</li>"; }).join("") + "</ol>";
    b.querySelectorAll("#fPal [data-f]").forEach(function(x){ x.addEventListener("click", function(){ fFarbe = +x.dataset.f; fZeichnen(); }); });
    b.querySelectorAll("#fArt [data-a]").forEach(function(x){ x.addEventListener("click", function(){ fHi = null; fWaehle(x.dataset.a); }); });
    $("fNetzB").addEventListener("click", function(){ fNetz = !fNetz; fZeichnen(); });
    $("frN").value = frN; $("frN").addEventListener("input", function(){ frN = +this.value; frGel = []; frZeichnen(); });
    $("frLoes").addEventListener("click", function(){ frGel = [0]; for(var i = 0; i < frN; i++) frGel.push(i === frN - 1 && frN % 2 ? 3 : 1 + i % 2); frZeichnen(); });
    $("frLeer").addEventListener("click", function(){ frGel = []; frZeichnen(); });
    frZeichnen(); fBspZeigen();
    $("fNeu").addEventListener("click", function(){ fWaehle("zufall"); });
    $("fLeer").addEventListener("click", function(){ fGel = fGel.map(function(){ return -1; }); fZeichnen(); });
    $("fLoes").addEventListener("click", function(){ var l = fLoese(fMin) || fLoese(4); if(l) fGel = l; fZeichnen(); });
    if(fKarte && (fKarte.echt ? fKarte.art : "zufall") === fArt) fZeichnen(); else fWaehle(fArt);
  };
  // Zoomen und Verschieben (Ansicht = viewBox in Kartenkoordinaten)
  function fZoomUm(px, py, f){
    var K = fKarte.K, w = Math.min(K.w, Math.max(K.w / 25, fView.w / f)), k = w / fView.w, h = fView.h * k;
    fView = { x: px - (px - fView.x) * k, y: py - (py - fView.y) * k, w: w, h: h }; fKlemmen();
  }
  function fKlemmen(){ var K = fKarte.K; fView.x = Math.max(0, Math.min(K.w - fView.w, fView.x)); fView.y = Math.max(0, Math.min(K.h - fView.h, fView.y)); }
  function fViewSetzen(s){
    s.setAttribute("viewBox", fView.x + " " + fView.y + " " + fView.w + " " + fView.h);
    var zf = fView.w / fKarte.K.w; s.querySelectorAll(".fPunkt").forEach(function(c){ c.setAttribute("r", c.getAttribute("data-r") * zf); });
  }
  function fGesten(s, malen){
    var P = {}, start = null, bewegt = false;
    function punkt(e){ var r = s.getBoundingClientRect(); return [fView.x + (e.clientX - r.left) / r.width * fView.w, fView.y + (e.clientY - r.top) / r.height * fView.h]; }
    function liste(){ return Object.keys(P).map(function(k){ return P[k]; }); }
    s.addEventListener("wheel", function(e){ e.preventDefault(); var q = punkt(e); fZoomUm(q[0], q[1], Math.pow(1.0015, -e.deltaY)); fViewSetzen(s); }, { passive: false });
    s.addEventListener("pointerdown", function(e){
      P[e.pointerId] = { x: e.clientX, y: e.clientY }; try { s.setPointerCapture(e.pointerId); } catch(x){}
      var L = liste(); bewegt = L.length > 1;
      start = { v: { x: fView.x, y: fView.y, w: fView.w, h: fView.h }, L: L.map(function(p){ return { x: p.x, y: p.y }; }), ziel: e.target };
    });
    s.addEventListener("pointermove", function(e){
      if(!P[e.pointerId] || !start) return;
      P[e.pointerId] = { x: e.clientX, y: e.clientY };
      var L = liste(), r = s.getBoundingClientRect(), sk = start.v.w / r.width;
      if(L.length === 1 && start.L.length === 1){
        var dx = L[0].x - start.L[0].x, dy = L[0].y - start.L[0].y;
        if(Math.abs(dx) + Math.abs(dy) > 6) bewegt = true;
        if(bewegt){ fView = { x: start.v.x - dx * sk, y: start.v.y - dy * sk, w: start.v.w, h: start.v.h }; fKlemmen(); fViewSetzen(s); }
      } else if(L.length >= 2 && start.L.length >= 2){
        var d0 = Math.hypot(start.L[0].x - start.L[1].x, start.L[0].y - start.L[1].y), d1 = Math.hypot(L[0].x - L[1].x, L[0].y - L[1].y);
        var mx = (L[0].x + L[1].x) / 2, my = (L[0].y + L[1].y) / 2, m0x = (start.L[0].x + start.L[1].x) / 2, m0y = (start.L[0].y + start.L[1].y) / 2;
        fView = { x: start.v.x, y: start.v.y, w: start.v.w, h: start.v.h };
        var px = start.v.x + (m0x - r.left) / r.width * start.v.w, py = start.v.y + (m0y - r.top) / r.height * start.v.h;
        fZoomUm(px, py, d1 / Math.max(10, d0));
        fView.x -= (mx - m0x) * fView.w / r.width; fView.y -= (my - m0y) * fView.h / r.height; fKlemmen(); fViewSetzen(s);
      }
    });
    function ende(e){
      if(!P[e.pointerId]) return;
      delete P[e.pointerId];
      var rest = liste();
      if(!rest.length){ if(!bewegt && start && start.ziel && start.ziel.getAttribute && start.ziel.getAttribute("data-g") != null) malen(+start.ziel.getAttribute("data-g")); start = null; }
      else start = { v: { x: fView.x, y: fView.y, w: fView.w, h: fView.h }, L: rest.map(function(p){ return { x: p.x, y: p.y }; }), ziel: null };
    }
    s.addEventListener("pointerup", ende); s.addEventListener("pointercancel", function(e){ bewegt = true; ende(e); });
  }
  // Ring-Demo: ein Land in der Mitte, rundherum n Nachbarn
  var frN = 5, frGel = [];
  function frZeichnen(){
    var n = frN, W = 300, M = 150, r0 = 52, r1 = 134, s = svgNeu(W, W, "bsvg frSvg"), F = function(i){ return frGel[i] >= 0 ? F_FARBEN[frGel[i]] : "#ffffff"; };
    $("frNz").textContent = n;
    function pt(r, a){ var w = (a - 90) * Math.PI / 180; return (M + r * Math.cos(w)).toFixed(1) + " " + (M + r * Math.sin(w)).toFixed(1); }
    var konf = 0, rand = [];
    for(var i = 0; i < n; i++){
      var a0 = 360 / n * i, a1 = 360 / n * (i + 1);
      var p = el("path", { d: "M" + pt(r1, a0) + "A" + r1 + " " + r1 + " 0 0 1 " + pt(r1, a1) + "L" + pt(r0, a1) + "A" + r0 + " " + r0 + " 0 0 0 " + pt(r0, a0) + "Z", fill: F(i + 1), stroke: "#1a2233", "stroke-width": 3, "stroke-linejoin": "round", "data-i": i + 1, "class": "fZelle" });
      s.appendChild(p);
      var j = (i + 1) % n;
      if(frGel[i + 1] >= 0 && frGel[i + 1] === frGel[j + 1]){ konf++; rand.push("M" + pt(r0, a1) + "L" + pt(r1, a1)); }
      if(frGel[i + 1] >= 0 && frGel[i + 1] === frGel[0]){ konf++; rand.push("M" + pt(r0, a0) + "A" + r0 + " " + r0 + " 0 0 1 " + pt(r0, a1)); }
    }
    s.appendChild(el("circle", { cx: M, cy: M, r: r0, fill: F(0), stroke: "#1a2233", "stroke-width": 3, "data-i": 0, "class": "fZelle" }));
    rand.forEach(function(d){ s.appendChild(el("path", { d: d, fill: "none", stroke: "#dc2626", "stroke-width": 5, "stroke-dasharray": "6 4", "stroke-linecap": "round", "pointer-events": "none" })); });
    $("frSvg").innerHTML = ""; $("frSvg").appendChild(s);
    s.querySelectorAll("[data-i]").forEach(function(x){ x.addEventListener("click", function(){ var i = +x.getAttribute("data-i"), v = frGel[i] >= 0 ? frGel[i] : -1; frGel[i] = v >= 3 ? -1 : v + 1; frZeichnen(); }); });
    var offen = 0, ben = {}; for(var k = 0; k <= n; k++){ if(!(frGel[k] >= 0)) offen++; else ben[frGel[k]] = 1; }
    var st = $("frStatus");
    if(konf){ st.className = "zeile schlecht"; st.textContent = t("f_konflikt", { n: konf }); }
    else if(offen){ st.className = "zeile"; st.textContent = t("f_offen", { n: offen }); }
    else { st.className = "zeile gut"; st.textContent = t("f_geschafft", { k: Object.keys(ben).length }); }
    $("frRegel").textContent = t(n % 2 ? "f_ring_u" : "f_ring_g", { n: n });
  }
  // Nachbarschaftsnetz: Punkt je Land, Linie je Nachbarpaar
  function fNetzMalen(s, C, NB, zf){
    if(!fNetz) return;
    var g = el("g", { "pointer-events": "none" });
    NB.forEach(function(L, a){ L.forEach(function(b){ if(b > a && C[a] && C[b]) g.appendChild(el("line", { x1: C[a][0], y1: C[a][1], x2: C[b][0], y2: C[b][1], stroke: "#1a2233", "stroke-width": 1.8, "vector-effect": "non-scaling-stroke" })); }); });
    C.forEach(function(c){ if(c) g.appendChild(el("circle", { cx: c[0], cy: c[1], r: 3.5 * zf, "data-r": 3.5, "class": "fPunkt", fill: "#1a2233" })); });
    s.appendChild(g);
  }
  function fZeichnenEcht(){
    var K = fKarte.K, s = svgNeu(K.w, K.h, "bsvg fKarte fEcht"), sw = fKarte.art === "welt" ? 0.7 : 1.1, zf = fView.w / K.w;
    s.setAttribute("viewBox", fView.x + " " + fView.y + " " + fView.w + " " + fView.h);
    s.appendChild(el("rect", { x: 0, y: 0, width: K.w, height: K.h, rx: 12, fill: "#e0f2fe" }));
    var konf = {}, schlecht = {};
    K.nb.forEach(function(L, g){ L.forEach(function(h){ if(fGel[g] >= 0 && fGel[g] === fGel[h]){ konf[Math.min(g, h) + "-" + Math.max(g, h)] = 1; schlecht[g] = schlecht[h] = 1; } }); });
    var ni = Math.max(0, ["de", "en", "es", "zh", "fr", "ru", "ar", "ja", "pt"].indexOf(lang));
    K.r.forEach(function(r, g){
      var f = fGel[g] >= 0 ? F_FARBEN[fGel[g]] : "#ffffff", p = el("path", { d: r.d, fill: f, stroke: "#1a2233", "stroke-width": sw, "vector-effect": "non-scaling-stroke", "stroke-linejoin": "round", "data-g": g, "class": "fZelle" });
      p.appendChild(el("title", {}, r.n[ni] || r.n[1])); s.appendChild(p);
      if(r.m && r.ml){
        s.appendChild(el("line", { x1: r.c[0], y1: r.c[1], x2: r.m[0], y2: r.m[1], stroke: "#1a2233", "stroke-width": 1, "vector-effect": "non-scaling-stroke", "pointer-events": "none" }));
        var ch = el("circle", { cx: r.m[0], cy: r.m[1], r: 12, fill: f, stroke: "#1a2233", "stroke-width": 1.4, "vector-effect": "non-scaling-stroke", "data-g": g, "class": "fZelle" }); ch.appendChild(el("title", {}, r.n[ni] || r.n[1])); s.appendChild(ch);
        s.appendChild(el("text", { x: r.m[0] + 15, y: r.m[1] + 4.5, "class": "bk-klein", "pointer-events": "none" }, r.k));
      } else if(r.m){ var c = el("circle", { cx: r.m[0], cy: r.m[1], r: (fKarte.art === "welt" ? 4 : 5) * zf, fill: f, stroke: "#1a2233", "stroke-width": 1, "vector-effect": "non-scaling-stroke", "data-g": g, "class": "fZelle fPunkt", "data-r": fKarte.art === "welt" ? 4 : 5 }); c.appendChild(el("title", {}, r.n[ni] || r.n[1])); s.appendChild(c); }
    });
    K.r.forEach(function(r, g){ if(schlecht[g]) s.appendChild(el("path", { d: r.d, fill: "none", stroke: "#dc2626", "stroke-width": 2.6, "vector-effect": "non-scaling-stroke", "stroke-dasharray": "5 3", "pointer-events": "none" })); });
    if(fHi && fHi.art === fKarte.art && fHi.g >= 0){
      K.nb[fHi.g].forEach(function(h){ s.appendChild(el("path", { d: K.r[h].d, fill: "none", stroke: "#7c3aed", "stroke-width": 3, "vector-effect": "non-scaling-stroke", "stroke-linejoin": "round", "pointer-events": "none" })); });
      s.appendChild(el("path", { d: K.r[fHi.g].d, fill: "none", stroke: "#7c3aed", "stroke-width": 6, "vector-effect": "non-scaling-stroke", "stroke-linejoin": "round", "pointer-events": "none" }));
    }
    fNetzMalen(s, K.r.map(function(r){ return r.ml ? r.c : (r.m || r.c); }), K.nb, zf);
    return { s: s, nk: Object.keys(konf).length, ni: ni };
  }
  function fZeichnen(){
    document.querySelectorAll("#fPal [data-f]").forEach(function(x){ x.setAttribute("aria-pressed", +x.dataset.f === fFarbe ? "true" : "false"); });
    document.querySelectorAll("#fArt [data-a]").forEach(function(x){ x.setAttribute("aria-pressed", x.dataset.a === fArt ? "true" : "false"); });
    $("fNeu").hidden = fArt !== "zufall";
    $("fNetzB").setAttribute("aria-pressed", fNetz ? "true" : "false");
    var hx = $("fHiTxt"), aktiv = fHi && fKarte.echt && fHi.art === fKarte.art && fHi.g >= 0;
    hx.hidden = !aktiv;
    if(aktiv){ var ni = Math.max(0, ["de", "en", "es", "zh", "fr", "ru", "ar", "ja", "pt"].indexOf(lang)), R = fKarte.K.r, NBh = fKarte.K.nb[fHi.g], nm = function(i){ return R[i].n[ni] || R[i].n[1]; };
      hx.textContent = t("f_bsp_info", { c: nm(fHi.g), n: NBh.length, l: NBh.map(nm).join(lang === "ar" ? "، " : (lang === "zh" || lang === "ja") ? "、" : ", ") }) + " " + t(NBh.length % 2 ? "f_hier4" : "f_hier3"); }
    if(fKarte.echt){
      var E = fZeichnenEcht();
      $("fSvg").innerHTML = '<div class="fZoom"><button type="button" class="chip" data-z="1.6" aria-label="+">+</button><button type="button" class="chip" data-z="0.625" aria-label="−">−</button><button type="button" class="chip" data-z="0" aria-label="⟲">⟲</button><span class="muted">' + esc(t("f_zoom")) + "</span></div>";
      $("fSvg").appendChild(E.s);
      $("fSvg").insertAdjacentHTML("beforeend", '<p class="leg muted">' + esc(t("f_klein")) + " " + esc(t("f_quelle")) + "</p>");
      $("fSvg").querySelectorAll("[data-z]").forEach(function(bz){ bz.addEventListener("click", function(){ var f = +bz.dataset.z; if(!f) fView = { x: 0, y: 0, w: fKarte.K.w, h: fKarte.K.h }; else fZoomUm(fView.x + fView.w / 2, fView.y + fView.h / 2, f); fViewSetzen(E.s); }); });
      fGesten(E.s, function(g){ fGel[g] = fFarbe; fName = fKarte.K.r[g].n[E.ni] || fKarte.K.r[g].n[1]; fZeichnen(); });
      return fStatus(E.nk);
    }
    var K = fKarte, W = HW * (HX_C + 0.5) + 16, H = 1.5 * HX * (HX_R - 1) + 2 * HX + 12, s = svgNeu(W, H, "bsvg fKarte");
    s.appendChild(el("rect", { x: 0, y: 0, width: W, height: H, rx: 12, fill: "#e0f2fe" }));
    function ecke(m, i){ var w = Math.PI / 180 * (60 * i - 30); return [m[0] + HX * Math.cos(w), m[1] + HX * Math.sin(w)]; }
    K.zellen.forEach(function(zl){
      var g = K.land[zl[0] + "," + zl[1]], m = hxMitte(zl[0], zl[1]), f = fGel[g] >= 0 ? F_FARBEN[fGel[g]] : "#ffffff", d = "";
      for(var i = 0; i < 6; i++){ var p = ecke(m, i); d += (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1); }
      s.appendChild(el("path", { d: d + "Z", fill: f, stroke: f, "stroke-width": 1.2, "data-g": g, "class": "fZelle" }));
    });
    var konf = {};
    K.zellen.forEach(function(zl){
      var g = K.land[zl[0] + "," + zl[1]], m = hxMitte(zl[0], zl[1]);
      hxNach(zl[0], zl[1]).forEach(function(q, i){
        var h = K.land[q[0] + "," + q[1]]; if(h === g) return;
        var p1 = ecke(m, i), p2 = ecke(m, (i + 1) % 6), schlecht = h != null && h >= 0 && fGel[g] >= 0 && fGel[g] === fGel[h];
        if(schlecht) konf[Math.min(g, h) + "-" + Math.max(g, h)] = 1;
        s.appendChild(el("line", { x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1], stroke: schlecht ? "#dc2626" : "#1a2233", "stroke-width": schlecht ? 4 : 2.2, "stroke-dasharray": schlecht ? "5 3" : "none", "stroke-linecap": "round", "pointer-events": "none" }));
      });
    });
    var CS = []; K.zellen.forEach(function(zl){ var g = K.land[zl[0] + "," + zl[1]], m = hxMitte(zl[0], zl[1]); if(!CS[g]) CS[g] = [0, 0, 0]; CS[g][0] += m[0]; CS[g][1] += m[1]; CS[g][2]++; });
    fNetzMalen(s, CS.map(function(c){ return c ? [c[0] / c[2], c[1] / c[2]] : null; }), K.nb, 1);
    $("fSvg").innerHTML = ""; $("fSvg").appendChild(s);
    s.querySelectorAll(".fZelle").forEach(function(p){ p.addEventListener("click", function(){ fGel[+p.getAttribute("data-g")] = fFarbe; fZeichnen(); }); });
    fStatus(Object.keys(konf).length);
  }
  function fStatus(nk){
    var offen = fGel.filter(function(x){ return x < 0; }).length, st = $("fStatus"), vor = fName ? fName + " · " : "";
    var benutzt = {}; fGel.forEach(function(x){ if(x >= 0) benutzt[x] = 1; });
    if(nk){ st.className = "zeile schlecht"; st.textContent = vor + t("f_konflikt", { n: nk }); }
    else if(offen){ st.className = "zeile"; st.textContent = vor + t("f_offen", { n: offen }); }
    else { st.className = "zeile gut"; st.textContent = t("f_geschafft", { k: Object.keys(benutzt).length }) + " " + t("f_min", { k: fMin }); if(typeof msRichtig === "function") try { msRichtig(); } catch(x){} }
  }

  GEN.einstein = function(){
    var tt = zuf(2, 900), s = C_LICHT * tt, zus = eiZeit(tt);
    return { q: t("ei_q", { s: gz(s) }), w: tt, tol: 0.5, l: tt + " s", weg: ["t = s : c", "t = " + gz(s) + " : " + gz(C_LICHT), "t = " + tt + " s"].concat(zus ? [{ lbl: zus }] : []) };
  };
  GEN.newton = function(){
    var i = zuf(0, 4), g = N_G[i], m = zuf(60, 140), F = Math.round(m * g);
    return { q: t("n_q", { K: tA("n_K")[i], g: z(g, 2), m: m }), w: F, tol: 1, l: gz(F) + " N", weg: ["F = m · g", "F = " + m + " · " + z(g, 2), "F ≈ " + gz(F) + " N"] };
  };
  GEN.curie = function(){
    var T = wahl([2, 3, 5, 8, 10, 30]), k = zuf(1, 5), N0 = wahl([32, 64, 80, 96, 128, 160, 200, 320, 400]), N = N0 / Math.pow(2, k);
    return { q: t("c_q", { T: T, N0: N0, t: T * k }), w: N, tol: 0.011, l: z(N, 3) + " g", weg: ["n = t : T = " + (T * k) + " : " + T + " = " + k, "N = N₀ · (½)" + hoch(k), "N = " + N0 + " : " + Math.pow(2, k) + " = " + z(N, 3) + " g"] };
  };
  GEN.tesla = function(){
    var U1 = wahl([230, 400, 12, 10000]), r = wahl([0.5, 0.25, 0.2, 0.1, 0.05, 2, 4, 5, 10, 20, 50]), N1 = wahl([200, 400, 500, 1000, 1200]), N2 = Math.round(N1 * r), U2 = U1 * N2 / N1;
    return { q: t("te_q", { N1: gz(N1), N2: gz(N2), U1: gz(U1) }), w: U2, tol: 0.05, l: (U2 >= 100 ? gz(U2) : z(U2, 2)) + " V", weg: ["U₂ = U₁ · N₂ : N₁", "U₂ = " + gz(U1) + " · " + gz(N2) + " : " + gz(N1), "U₂ = " + (U2 >= 100 ? gz(U2) : z(U2, 2)) + " V"] };
  };
  GEN.turing = function(){
    var v = zuf(5, 100), b = v.toString(2), n = b.length, teile = b.split("").map(function(c, i){ return c + " · " + Math.pow(2, n - 1 - i); });
    var L = [b + "₂ = " + teile.join(" + "), b + "₂ = " + v];
    if(Math.random() < 0.5) return { q: t("tu_q1", { b: b }), w: v, tol: 0, l: String(v), weg: L };
    return { q: t("tu_q2", { b: b }), w: v + 1, tol: 0, l: String(v + 1), weg: L.concat([v + " + 1 = " + (v + 1)]) };
  };
  // ---------- Runde 3: Fibonacci, Euler, Pascal & Fermat, Buffon, Heron, al-Chwarizmi ----------
  function fib(n){ var a = 1, b = 1; for(var i = 2; i < n; i++){ var c = a + b; a = b; b = c; } return n <= 2 ? 1 : b; }
  var fiN = 8;
  PROBE.fibonacci = function(){
    var b = $("probe");
    b.innerHTML = '<label class="reglerZ"><span>' + esc(t("fi_n")) + ' <b id="fiNz"></b></span><input type="range" id="fiN" min="3" max="11" step="1"></label><p class="fiFolge" id="fiFolge" dir="ltr"></p><div id="fiSvg"></div><p class="zeile muted">' + esc(t("fi_spirale")) + '</p><p class="zeile">' + esc(t("fi_quot")) + '</p><p class="fiFolge" id="fiQ" dir="ltr"></p>';
    $("fiN").value = fiN; $("fiN").addEventListener("input", function(){ fiN = +this.value; fiZeichnen(); });
    fiZeichnen();
  };
  function fiZeichnen(){
    $("fiNz").textContent = fiN;
    var F = []; for(var i = 1; i <= fiN; i++) F.push(fib(i));
    $("fiFolge").textContent = F.join(", ");
    var Q = []; for(var j = 1; j < fiN; j++) Q.push(F[j] + " : " + F[j - 1] + " = " + z(F[j] / F[j - 1], 3));
    $("fiQ").innerHTML = Q.slice(-4).map(esc).join("<br>");
    // Quadrate anlegen (mathematische Koordinaten, y nach oben)
    var R = { x: 0, y: 0, w: 1, h: 1 }, Q2 = [{ x: 0, y: 0, s: 1 }], P = [1, 0], arcs = [{ c: [0, 0], a: [0, 1], e: [1, 0], r: 1 }];
    for(var k = 2; k <= fiN; k++){
      var s = F[k - 1], d = (k - 2) % 4, q, e1, e2;
      if(d === 0){ q = { x: R.x + R.w, y: R.y, s: s }; e1 = [q.x, q.y]; e2 = [q.x, q.y + s]; R = { x: R.x, y: R.y, w: R.w + s, h: R.h }; }
      else if(d === 1){ q = { x: R.x, y: R.y + R.h, s: s }; e1 = [q.x, q.y]; e2 = [q.x + s, q.y]; R = { x: R.x, y: R.y, w: R.w, h: R.h + s }; }
      else if(d === 2){ q = { x: R.x - s, y: R.y, s: s }; e1 = [R.x, q.y]; e2 = [R.x, q.y + s]; R = { x: R.x - s, y: R.y, w: R.w + s, h: R.h }; }
      else { q = { x: R.x, y: R.y - s, s: s }; e1 = [q.x, R.y]; e2 = [q.x + s, R.y]; R = { x: R.x, y: R.y - s, w: R.w, h: R.h + s }; }
      Q2.push(q);
      var c = (Math.abs(e1[0] - P[0]) + Math.abs(e1[1] - P[1]) < 1e-9) ? e2 : e1;
      // Endpunkt: diagonal gegenüber von P im neuen Quadrat
      var ex = P[0] === q.x ? q.x + s : q.x, ey = P[1] === q.y ? q.y + s : q.y, ende = [ex, ey];
      arcs.push({ c: c, a: P, e: ende, r: s }); P = ende;
    }
    var W = 560, H = 360, sk = Math.min((W - 20) / R.w, (H - 20) / R.h), ox = (W - R.w * sk) / 2 - R.x * sk, oy = (H + R.h * sk) / 2 + R.y * sk;
    function X(x){ return ox + x * sk; } function Y(y){ return oy - y * sk; }
    var sv = svgNeu(W, H), farben = ["#dbeafe", "#fdf3d8", "#ede9fe", "#ccfbf1"];
    Q2.forEach(function(q, i){
      sv.appendChild(el("rect", { x: X(q.x), y: Y(q.y + q.s), width: q.s * sk, height: q.s * sk, fill: farben[i % 4], stroke: "#4f5b6e", "stroke-width": 1.5 }));
      if(q.s * sk > 16) sv.appendChild(el("text", { x: X(q.x + q.s / 2), y: Y(q.y + q.s / 2) + 5, "text-anchor": "middle", "class": "bz", "font-size": Math.min(22, 8 + q.s * sk / 8) }, String(q.s)));
    });
    var d = "M" + X(arcs[0].a[0]) + " " + Y(arcs[0].a[1]);
    arcs.forEach(function(a){
      var ax = X(a.a[0]) - X(a.c[0]), ay = Y(a.a[1]) - Y(a.c[1]), bx = X(a.e[0]) - X(a.c[0]), by = Y(a.e[1]) - Y(a.c[1]);
      d += " A" + (a.r * sk) + " " + (a.r * sk) + " 0 0 " + (ax * by - ay * bx > 0 ? 1 : 0) + " " + X(a.e[0]).toFixed(1) + " " + Y(a.e[1]).toFixed(1);
    });
    sv.appendChild(el("path", { d: d, fill: "none", stroke: "#7c3aed", "stroke-width": 3 }));
    $("fiSvg").innerHTML = ""; $("fiSvg").appendChild(sv);
  }
  GEN.fibonacci = function(){
    if(Math.random() < 0.5){ var a = zuf(1, 9), b = zuf(1, 9), L = [a, b]; while(L.length < 6) L.push(L[L.length - 1] + L[L.length - 2]);
      return { q: t("fi_q1", { f: L.slice(0, 5).join(", ") }), w: L[5], tol: 0, l: String(L[5]), weg: [L[3] + " + " + L[4] + " = " + L[5]] }; }
    var n = zuf(6, 15), F = []; for(var i = 1; i <= n; i++) F.push(fib(i));
    return { q: t("fi_q2", { n: n }), w: F[n - 1], tol: 0, l: String(F[n - 1]), weg: [F.join(", "), F[n - 3] + " + " + F[n - 2] + " = " + F[n - 1]] };
  };

  // Euler: Königsberger Brücken
  var EU_BR = [[0, 1, 130, 98, 22, 40], [0, 1, 280, 98, 22, 40], [0, 2, 130, 192, 22, 40], [0, 2, 280, 192, 22, 40], [0, 3, 366, 154, 58, 22], [1, 3, 500, 98, 22, 40], [2, 3, 500, 192, 22, 40], [1, 3, 565, 98, 22, 40]];
  var EU_LAND = [[70, 135, 300, 60], [0, 0, 620, 100], [0, 230, 620, 100], [420, 135, 190, 60]];
  var eu = { extra: false, cur: -1, used: [], weg: [] };
  PROBE.euler = function(){
    var b = $("probe");
    b.innerHTML = '<p class="zeile">' + esc(t("eu_anl")) + '</p><div id="euSvg"></div><p class="zeile" id="euStand"></p><p class="zeile" id="euWeg"></p>' +
      '<p><button type="button" class="knopf hell" id="euNeu">' + esc(t("eu_neu")) + '</button> <button type="button" class="knopf hell" id="euBau"></button></p><p class="merke">' + esc(t("eu_regel")) + "</p>";
    $("euNeu").addEventListener("click", function(){ eu.cur = -1; eu.used = []; eu.weg = []; euZeichnen(); });
    $("euBau").addEventListener("click", function(){ eu.extra = !eu.extra; eu.cur = -1; eu.used = []; eu.weg = []; euZeichnen(); });
    euZeichnen();
  };
  function euBruecken(){ return EU_BR.slice(0, eu.extra ? 8 : 7); }
  function euZeichnen(){
    var BR = euBruecken(), L = tA("eu_L"), s = svgNeu(620, 330, "bsvg euKarte");
    s.appendChild(el("rect", { x: 0, y: 95, width: 620, height: 140, fill: "#93c5fd" }));
    EU_LAND.forEach(function(r, i){
      var g = el("rect", { x: r[0], y: r[1], width: r[2], height: r[3], rx: i === 0 || i === 3 ? 28 : 0, fill: i === eu.cur ? "#ede9fe" : "#f1e7c8", stroke: i === eu.cur ? "#7c3aed" : "#8a6d3b", "stroke-width": i === eu.cur ? 4 : 1.5, "class": "euLand" });
      g.addEventListener("click", function(){ if(eu.cur < 0){ eu.cur = i; eu.weg = [i]; euZeichnen(); } });
      s.appendChild(g);
      var grad = BR.filter(function(bb){ return bb[0] === i || bb[1] === i; }).length;
      var tx = r[0] + r[2] / 2, ty = i === 1 ? 52 : i === 2 ? 285 : r[1] + 36;
      s.appendChild(el("text", { x: tx, y: ty, "text-anchor": "middle", "class": "bt", "pointer-events": "none", fill: grad % 2 ? "#b8860b" : "#1a2233" }, L[i] + " · " + t("eu_brk", { n: grad })));
    });
    BR.forEach(function(bb, j){
      var nr = eu.used.indexOf(j), g = el("rect", { x: bb[2], y: bb[3], width: bb[4], height: bb[5], rx: 4, fill: nr >= 0 ? "#7c3aed" : "#8b5e3c", stroke: "#1a2233", "stroke-width": 1.5, "class": "euBr" });
      g.addEventListener("click", function(){
        if(eu.cur < 0 || nr >= 0 || (bb[0] !== eu.cur && bb[1] !== eu.cur)) return;
        eu.used.push(j); eu.cur = bb[0] === eu.cur ? bb[1] : bb[0]; eu.weg.push(eu.cur); euZeichnen();
      });
      s.appendChild(g);
      if(nr >= 0) s.appendChild(el("text", { x: bb[2] + bb[4] / 2, y: bb[3] + bb[5] / 2 + 5, "text-anchor": "middle", fill: "#ffffff", "font-weight": 800, "font-size": 14, "pointer-events": "none" }, String(nr + 1)));
    });
    $("euSvg").innerHTML = ""; $("euSvg").appendChild(s);
    $("euBau").textContent = t(eu.extra ? "eu_abriss" : "eu_bau");
    var st = $("euStand"), offen = BR.filter(function(bb, j){ return eu.used.indexOf(j) < 0 && (bb[0] === eu.cur || bb[1] === eu.cur); }).length;
    if(eu.used.length === BR.length){ st.className = "zeile gut"; st.textContent = t("eu_ok"); if(typeof msRichtig === "function") try { msRichtig(); } catch(x){} }
    else if(eu.cur >= 0 && !offen){ st.className = "zeile schlecht"; st.textContent = t("eu_benutzt", { k: eu.used.length, n: BR.length }) + " – " + t("eu_fest"); }
    else { st.className = "zeile"; st.textContent = t("eu_benutzt", { k: eu.used.length, n: BR.length }); }
    $("euWeg").textContent = eu.weg.length ? t("eu_weg") + " " + eu.weg.map(function(i){ return L[i]; }).join(" → ") : "";
  }
  var EU_P = [[8, 12, 6], [4, 6, 4], [6, 12, 8], [20, 30, 12], [12, 30, 20], [12, 18, 8], [6, 10, 6]];
  GEN.euler = function(){
    var i = zuf(0, 6), P = EU_P[i], E = P[0], K = P[1], F = P[2], art = wahl(["E", "K", "F"]), nm = tA("eu_KP")[i];
    if(art === "E") return { q: t("eu_qE", { K: nm, Ka: K, F: F }), w: E, tol: 0, l: String(E), weg: ["E − K + F = 2", "E = 2 + K − F = 2 + " + K + " − " + F + " = " + E] };
    if(art === "K") return { q: t("eu_qK", { K: nm, E: E, F: F }), w: K, tol: 0, l: String(K), weg: ["E − K + F = 2", "K = E + F − 2 = " + E + " + " + F + " − 2 = " + K] };
    return { q: t("eu_qF", { K: nm, E: E, Ka: K }), w: F, tol: 0, l: String(F), weg: ["E − K + F = 2", "F = 2 − E + K = 2 − " + E + " + " + K + " = " + F] };
  };

  // Pascal & Fermat: geteilter Einsatz
  var pf = { n: 3, a: 2, b: 1 };
  function pfRechne(n, a, b){
    var na = n - a, nb = n - b, r = na + nb - 1, m = Math.pow(2, r), g = 0, L = [];
    for(var i = 0; i < m; i++){ var s = "", cA = 0; for(var j = r - 1; j >= 0; j--){ var x = (i >> j) & 1; s += x ? "B" : "A"; if(!x) cA++; } var win = cA >= na; if(win) g++; L.push([s, win]); }
    return { r: r, m: m, g: g, L: L };
  }
  PROBE.pascal = function(){
    var b = $("probe");
    b.innerHTML = '<div class="chips" id="pfZiel"><b>' + esc(t("pf_ziel")) + "</b> " + [2, 3, 4, 5].map(function(n){ return '<button type="button" class="chip" data-n="' + n + '">' + n + "</button>"; }).join("") + "</div>" +
      '<div class="chips"><b>' + esc(t("pf_stand")) + '</b> <span class="pfStep">A <button type="button" class="chip" data-p="a-">−</button><b id="pfA"></b><button type="button" class="chip" data-p="a+">+</button></span> <span class="pfStep">B <button type="button" class="chip" data-p="b-">−</button><b id="pfB"></b><button type="button" class="chip" data-p="b+">+</button></span> <span class="muted">' + esc(t("pf_einsatz")) + "</span></div>" +
      '<p class="zeile" id="pfRest"></p><div class="pfFolgen" id="pfL" dir="ltr"></div><p class="zeile" id="pfErg"></p>';
    b.querySelectorAll("#pfZiel [data-n]").forEach(function(c){ c.addEventListener("click", function(){ pf.n = +c.dataset.n; pf.a = Math.min(pf.a, pf.n - 1); pf.b = Math.min(pf.b, pf.n - 1); pfZeichnen(); }); });
    b.querySelectorAll("[data-p]").forEach(function(c){ c.addEventListener("click", function(){ var k = c.dataset.p[0], d = c.dataset.p[1] === "+" ? 1 : -1; pf[k] = Math.max(0, Math.min(pf.n - 1, pf[k] + d)); pfZeichnen(); }); });
    pfZeichnen();
  };
  function pfZeichnen(){
    document.querySelectorAll("#pfZiel [data-n]").forEach(function(c){ c.setAttribute("aria-pressed", +c.dataset.n === pf.n ? "true" : "false"); });
    $("pfA").textContent = " " + pf.a + " "; $("pfB").textContent = " " + pf.b + " ";
    var R = pfRechne(pf.n, pf.a, pf.b);
    $("pfRest").textContent = t("pf_rest", { r: R.r, m: R.m });
    $("pfL").innerHTML = R.m <= 64 ? R.L.map(function(x){ return '<span class="pfF' + (x[1] ? " an" : "") + '">' + x[0] + "</span>"; }).join("") : "";
    var A = 100 * R.g / R.m;
    $("pfErg").innerHTML = "<b>" + esc(t("pf_chance", { g: R.g, m: R.m })) + "</b><br>" + esc(t("pf_teil", { a: z(A, 2) + " €", b: z(100 - A, 2) + " €" }));
  }
  GEN.pascal = function(){
    var L = [];
    [3, 4].forEach(function(n){ for(var a = 0; a < n; a++) for(var b = 0; b < n; b++){ var r = 2 * n - a - b - 1; if(r >= 2 && r <= 4 && a + b > 0) L.push([n, a, b]); } });
    var c = wahl(L), R = pfRechne(c[0], c[1], c[2]), E = R.m * wahl([5, 10, 20]), A = E * R.g / R.m;
    return { q: t("pf_q", { n: c[0], a: c[1], b: c[2], E: E }), w: A, tol: 0.01, l: z(A, 2) + " €", weg: [{ lbl: t("pf_w1", { r: R.r, m: R.m }) }, { lbl: t("pf_w2", { g: R.g }) }, "A = " + R.g + "/" + R.m + " · " + E + " € = " + z(A, 2) + " €"] };
  };

  // Buffon: Nadeln werfen
  var bu = { n: 0, k: 0, N: [] }, BU_D = 50;
  function buWerfen(anz){
    for(var i = 0; i < anz; i++){
      var x = Math.random() * 600, y = Math.random() * 280 + 10, w = Math.random() * Math.PI, dx = Math.cos(w) * BU_D / 2, dy = Math.sin(w) * BU_D / 2;
      var hit = Math.floor((x - dx) / BU_D) !== Math.floor((x + dx) / BU_D);
      bu.n++; if(hit) bu.k++; bu.N.push([x - dx, y - dy, x + dx, y + dy, hit]); if(bu.N.length > 250) bu.N.shift();
    }
    buZeichnen();
  }
  PROBE.buffon = function(){
    var b = $("probe");
    b.innerHTML = '<p class="zeile">' + esc(t("bu_werfen")) + " " + [1, 10, 100, 1000].map(function(n){ return '<button type="button" class="chip" data-n="' + n + '">+' + n + "</button>"; }).join("") + ' <button type="button" class="knopf hell" id="buR">' + esc(t("bu_reset")) + '</button></p><div id="buSvg"></div><p class="zeile" id="buStand"></p><ol class="weg" id="buWeg"></ol><p class="zeile muted">' + esc(t("bu_echt")) + " " + esc(t("bu_zufall")) + "</p>";
    b.querySelectorAll("[data-n]").forEach(function(c){ c.addEventListener("click", function(){ buWerfen(+c.dataset.n); }); });
    $("buR").addEventListener("click", function(){ bu = { n: 0, k: 0, N: [] }; buZeichnen(); });
    buZeichnen();
  };
  function buZeichnen(){
    var s = svgNeu(600, 300);
    s.appendChild(el("rect", { x: 0, y: 0, width: 600, height: 300, fill: "#fbf6ea" }));
    for(var x = 0; x <= 600; x += BU_D) s.appendChild(el("line", { x1: x, y1: 0, x2: x, y2: 300, stroke: "#8a6d3b", "stroke-width": 2 }));
    bu.N.forEach(function(nd){ s.appendChild(el("line", { x1: nd[0], y1: nd[1], x2: nd[2], y2: nd[3], stroke: nd[4] ? "#dc2626" : "#1565c0", "stroke-width": 2.2, "stroke-linecap": "round" })); });
    $("buSvg").innerHTML = ""; $("buSvg").appendChild(s);
    $("buStand").textContent = t("bu_stand", { n: bu.n, k: bu.k });
    $("buWeg").innerHTML = bu.k ? weg(["π ≈ 2 · n : k = 2 · " + bu.n + " : " + bu.k + " ≈ " + z(2 * bu.n / bu.k, 4)]) : "";
  }
  GEN.buffon = function(){
    var n = zuf(10, 200) * 10, k = Math.round(2 * n / Math.PI * (1 + (Math.random() - 0.5) * 0.06)), p = Math.round(2 * n / k * 100) / 100;
    return { q: t("bu_q", { n: n, k: k }), w: p, tol: 0.011, l: z(p, 2), weg: ["π ≈ 2 · n : k", "π ≈ 2 · " + n + " : " + k + " ≈ " + z(p, 2)] };
  };

  // Heron: Wurzel ziehen
  var he = { a: 10, L: [10] };
  PROBE.heron = function(){
    var b = $("probe");
    b.innerHTML = '<label class="reglerZ"><span>' + esc(t("he_a")) + '</span><input class="zahl" id="heA" inputmode="decimal" value="' + he.a + '"></label><p class="merke">' + esc(t("he_regel")) + '</p><div class="zwei"><div id="heSvg"></div><div><table class="tab" id="heTab"></table></div></div>' +
      '<p><button type="button" class="knopf" id="heS">' + esc(t("he_schritt")) + '</button> <button type="button" class="knopf hell" id="heR">' + esc(t("he_reset")) + "</button></p>";
    $("heA").addEventListener("input", function(){ var v = lies(this.value); if(v > 0 && v <= 10000){ he.a = v; he.L = [v]; heZeichnen(); } });
    $("heS").addEventListener("click", function(){ if(he.L.length > 7) return; var x = he.L[he.L.length - 1]; he.L.push((x + he.a / x) / 2); heZeichnen(); });
    $("heR").addEventListener("click", function(){ he.L = [he.a]; heZeichnen(); });
    heZeichnen();
  };
  function heZeichnen(){
    var a = he.a, x = he.L[he.L.length - 1], y = a / x, M = Math.max(x, y, Math.sqrt(a)), sk = 220 / M, s = svgNeu(260, 260), w = Math.sqrt(a);
    s.appendChild(el("rect", { x: 20, y: 240 - w * sk, width: w * sk, height: w * sk, fill: "none", stroke: "#b8860b", "stroke-width": 2, "stroke-dasharray": "6 4" }));
    s.appendChild(el("rect", { x: 20, y: 240 - y * sk, width: x * sk, height: y * sk, fill: "rgba(124,58,237,0.15)", stroke: "#7c3aed", "stroke-width": 2.5 }));
    s.appendChild(el("text", { x: 20 + Math.min(x * sk, 230) / 2, y: 255, "text-anchor": "middle", "class": "bk-klein" }, "x = " + z(x, 3)));
    $("heSvg").innerHTML = ""; $("heSvg").appendChild(s);
    var h = "<tr><th>" + esc(t("he_tab")) + "</th><th>x</th><th>" + esc(t("he_seite2")) + "</th></tr>";
    he.L.forEach(function(v, i){ h += "<tr" + (i === he.L.length - 1 ? ' class="an"' : "") + "><td>x" + "₀₁₂₃₄₅₆₇₈"[i] + "</td><td>" + bdi(z(v, 6)) + "</td><td>" + bdi(z(a / v, 6)) + "</td></tr>"; });
    h += "<tr><td>√a</td><td colspan=\"2\">" + bdi(z(w, 6)) + "</td></tr>";
    $("heTab").innerHTML = h; $("heS").disabled = he.L.length > 7;
  }
  GEN.heron = function(){
    var a; do { a = zuf(2, 99); } while(Math.sqrt(a) % 1 === 0);
    var x0 = Math.max(1, Math.round(Math.sqrt(a)) + wahl([-1, 0, 1])), q = a / x0, x1 = (x0 + q) / 2;
    return { q: t("he_q", { a: a, x0: x0 }), w: Math.round(x1 * 100) / 100, tol: 0.006, l: z(x1, 2), weg: ["x₁ = (x₀ + a : x₀) : 2", "x₁ = (" + x0 + " + " + a + " : " + x0 + ") : 2", "x₁ ≈ (" + x0 + " + " + z(q, 4) + ") : 2", "x₁ ≈ " + z(x1, 4)] };
  };

  // al-Chwarizmi: quadratische Ergänzung
  var CH_B = [[10, 39], [6, 16], [8, 20], [4, 21], [12, 28], [14, 15]], chI = 0;
  function chWeg(b, c){ var h = b / 2, S = c + h * h, r = Math.sqrt(S), x = r - h; return ["x² + " + b + "x = " + c, "x² + " + b + "x + " + h + "² = " + c + " + " + (h * h), "(x + " + h + ")² = " + S, "x + " + h + " = √" + S + " = " + r, "x = " + r + " − " + h + " = " + x]; }
  PROBE.chwarizmi = function(){
    var b = $("probe");
    b.innerHTML = '<div class="chips" id="chChips"><b>' + esc(t("ch_bsp")) + "</b> " + CH_B.map(function(e, i){ return '<button type="button" class="chip" data-i="' + i + '" dir="ltr">x² + ' + e[0] + "x = " + e[1] + "</button>"; }).join("") + '</div><div class="zwei"><div id="chSvg"></div><ol class="weg" id="chWeg"></ol></div>';
    b.querySelectorAll("#chChips [data-i]").forEach(function(c){ c.addEventListener("click", function(){ chI = +c.dataset.i; chZeichnen(); }); });
    chZeichnen();
  };
  function chZeichnen(){
    document.querySelectorAll("#chChips [data-i]").forEach(function(c){ c.setAttribute("aria-pressed", +c.dataset.i === chI ? "true" : "false"); });
    var b = CH_B[chI][0], c = CH_B[chI][1], h = b / 2, x = Math.sqrt(c + h * h) - h, sk = 230 / (x + h), X = x * sk, Hh = h * sk, s = svgNeu(280, 280), o = 24;
    s.appendChild(el("rect", { x: o, y: o, width: X, height: X, fill: "#dbeafe", stroke: "#1565c0", "stroke-width": 2 }));
    s.appendChild(el("rect", { x: o + X, y: o, width: Hh, height: X, fill: "#ede9fe", stroke: "#7c3aed", "stroke-width": 2 }));
    s.appendChild(el("rect", { x: o, y: o + X, width: X, height: Hh, fill: "#ede9fe", stroke: "#7c3aed", "stroke-width": 2 }));
    s.appendChild(el("rect", { x: o + X, y: o + X, width: Hh, height: Hh, fill: "#fdf3d8", stroke: "#b8860b", "stroke-width": 2, "stroke-dasharray": "6 4" }));
    s.appendChild(el("text", { x: o + X / 2, y: o + X / 2 + 5, "text-anchor": "middle", "class": "bt" }, "x²"));
    s.appendChild(el("text", { x: o + X + Hh / 2, y: o + X / 2 + 5, "text-anchor": "middle", "class": "bk-klein" }, h + "x"));
    s.appendChild(el("text", { x: o + X / 2, y: o + X + Hh / 2 + 5, "text-anchor": "middle", "class": "bk-klein" }, h + "x"));
    s.appendChild(el("text", { x: o + X + Hh / 2, y: o + X + Hh / 2 + 5, "text-anchor": "middle", "class": "bk-klein" }, h + "² = " + (h * h)));
    s.appendChild(el("text", { x: o + X / 2, y: o - 6, "text-anchor": "middle", "class": "bk-klein" }, "x"));
    s.appendChild(el("text", { x: o + X + Hh / 2, y: o - 6, "text-anchor": "middle", "class": "bk-klein" }, String(h)));
    $("chSvg").innerHTML = ""; $("chSvg").appendChild(s);
    $("chSvg").insertAdjacentHTML("beforeend", '<p class="leg"><span style="color:#b8860b">▣ ' + esc(t("ch_fehlt")) + "</span></p>");
    $("chWeg").innerHTML = weg(chWeg(b, c));
  }
  GEN.chwarizmi = function(){ var x = zuf(1, 9), b = 2 * zuf(1, 8), c = x * x + b * x; return { q: t("ch_q", { b: b, c: c }), w: x, tol: 0, l: String(x), weg: chWeg(b, c) }; };
  // ---------- Runde 4: Galilei, Jakob Bernoulli, Ramanujan ----------
  var ga = { h: 56, mond: false, an: null };
  PROBE.galilei = function(){
    var b = $("probe");
    b.innerHTML = '<label class="reglerZ"><span>' + esc(t("ga_hoehe")) + ' <b id="gaHz"></b></span><input type="range" id="gaH" min="1" max="100" step="1"></label>' +
      '<div class="chips" id="gaOrt"><button type="button" class="chip" data-m="0">' + esc(t("ga_erde")) + '</button><button type="button" class="chip" data-m="1">' + esc(t("ga_mond")) + '</button> <button type="button" class="knopf" id="gaLos">' + esc(t("ga_fallen")) + '</button> <b id="gaUhr" class="gaUhr"></b></div>' +
      '<div class="zwei"><div id="gaSvg"></div><div><ol class="weg" id="gaWeg"></ol><div class="tabWrap"><table class="tab" id="gaTab"></table></div><p class="zeile muted">' + esc(t("ga_turm")) + "</p></div></div>";
    $("gaH").value = ga.h; $("gaH").addEventListener("input", function(){ ga.h = +this.value; gaZeichnen(0); });
    b.querySelectorAll("#gaOrt [data-m]").forEach(function(c){ c.addEventListener("click", function(){ ga.mond = c.dataset.m === "1"; gaZeichnen(0); }); });
    $("gaLos").addEventListener("click", gaStart);
    gaZeichnen(0);
  };
  function gaG(){ return ga.mond ? 1.62 : 9.81; }
  function gaZeichnen(tt){
    document.querySelectorAll("#gaOrt [data-m]").forEach(function(c){ c.setAttribute("aria-pressed", (c.dataset.m === "1") === ga.mond ? "true" : "false"); });
    $("gaHz").textContent = ga.h + " m";
    var g = gaG(), T = Math.sqrt(2 * ga.h / g), s = Math.min(ga.h, 0.5 * g * tt * tt), H = 300, sk = 260 / 100, y0 = H - 20 - ga.h * sk, sv = svgNeu(200, H);
    sv.appendChild(el("rect", { x: 0, y: 0, width: 200, height: H, fill: ga.mond ? "#1f2636" : "#e0f2fe", rx: 10 }));
    sv.appendChild(el("rect", { x: 0, y: H - 20, width: 200, height: 20, fill: ga.mond ? "#9ca3af" : "#86a35b" }));
    sv.appendChild(el("rect", { x: 40, y: y0, width: 34, height: ga.h * sk, fill: "#f3e7c9", stroke: "#8a6d3b", "stroke-width": 1.5 }));
    sv.appendChild(el("circle", { cx: 100, cy: y0 + s * sk - 9, r: 9, fill: "#7c3aed", stroke: "#4c1d95", "stroke-width": 1.5 }));
    sv.appendChild(el("text", { x: 120, y: y0 + 4, "class": "bk-klein", fill: ga.mond ? "#e8ecf4" : "#4f5b6e" }, "h = " + ga.h + " m"));
    $("gaSvg").innerHTML = ""; $("gaSvg").appendChild(sv);
    $("gaUhr").textContent = "t = " + z(Math.min(tt, T), 2) + " s";
    $("gaWeg").innerHTML = weg(["h = ½ · g · t²", "t = √(2 · h : g)", "t = √(2 · " + ga.h + " : " + z(g, 2) + ") ≈ " + z(T, 2) + " s"]);
    var h = "<tr><th>" + esc(t("ga_tab")) + "</th><th>" + esc(t("ga_weg")) + "</th><th>" + esc(t("ga_dazu")) + "</th></tr>";
    for(var i = 1; i <= 4; i++) h += "<tr><td>" + i + " s</td><td>" + bdi(z(0.5 * g * i * i, 1) + " m") + "</td><td>" + bdi(z(0.5 * g * (2 * i - 1), 1) + " m = " + (2 * i - 1) + " · " + z(0.5 * g, 2) + " m") + "</td></tr>";
    $("gaTab").innerHTML = h;
  }
  function gaStart(){
    var a0 = performance.now(), T = Math.sqrt(2 * ga.h / gaG());
    cancelAnimationFrame(ga.an);
    (function lauf(n){ var tt = (n - a0) / 1000; if(!document.getElementById("gaSvg")) return; gaZeichnen(Math.min(tt, T)); if(tt < T) ga.an = requestAnimationFrame(lauf); })(a0);
  }
  GEN.galilei = function(){
    var tt = wahl([1, 1.5, 2, 2.5, 3, 4, 5]), s = 0.5 * 9.81 * tt * tt;
    return { q: t("ga_q", { t: z(tt, 1) }), w: Math.round(s * 10) / 10, tol: 0.06, l: z(s, 1) + " m", weg: ["s = ½ · g · t²", "s = 0,5 · 9,81 · " + z(tt, 1) + "²".replace(",", komma() ? "," : "."), "s ≈ " + z(s, 1) + " m"].map(function(x){ return komma() ? x : x.replace(/(\d),(\d)/g, "$1.$2"); }) };
  };

  var JB_N = [1, 2, 4, 12, 52, 365, 8760, 525600], jbI = 3;
  PROBE.bernoulli = function(){
    var b = $("probe");
    b.innerHTML = '<div class="chips" id="jbChips"><b>' + esc(t("jb_n")) + "</b> " + JB_N.map(function(n, i){ return '<button type="button" class="chip" data-i="' + i + '">' + gz(n) + "</button>"; }).join("") + '</div><ol class="weg" id="jbWeg"></ol><div class="tabWrap"><table class="tab" id="jbTab"></table></div>';
    b.querySelectorAll("#jbChips [data-i]").forEach(function(c){ c.addEventListener("click", function(){ jbI = +c.dataset.i; jbZeichnen(); }); });
    jbZeichnen();
  };
  function jbZeichnen(){
    document.querySelectorAll("#jbChips [data-i]").forEach(function(c){ c.setAttribute("aria-pressed", +c.dataset.i === jbI ? "true" : "false"); });
    var n = JB_N[jbI], v = Math.pow(1 + 1 / n, n);
    $("jbWeg").innerHTML = weg(["(1 + 1/" + gz(n) + ")" + hoch(n) + " ≈ " + z(v, 5) + " €", { lbl: "e = 2,71828…".replace(",", komma() ? "," : ".") }]);
    var N = tA("jb_N"), h = "<tr><th>" + esc(t("jb_tab")) + "</th><th>" + esc(t("jb_betrag")) + "</th></tr>";
    JB_N.forEach(function(m, i){ h += "<tr" + (i === jbI ? ' class="an"' : "") + "><td>" + esc(N[i]) + "</td><td>" + bdi(z(Math.pow(1 + 1 / m, m), 5) + " €") + "</td></tr>"; });
    $("jbTab").innerHTML = h;
  }
  GEN.bernoulli = function(){
    var n = wahl([2, 3, 4, 5, 6, 10]), q = 1 + 1 / n, v = Math.pow(q, n);
    return { q: t("jb_q", { n: n }).replace("^" + n, hoch(n)), w: Math.round(v * 1000) / 1000, tol: 0.0011, l: z(v, 3) + " €", weg: ["(1 + 1/" + n + ")" + hoch(n) + " = " + z(q, 4) + hoch(n) + " ≈ " + z(v, 3)] };
  };

  var ra = { a: 1, b: 12 };
  function raSummen(){ var M = {}; for(var a = 1; a <= 20; a++) for(var b = a; b <= 20; b++){ var s = a * a * a + b * b * b; (M[s] = M[s] || []).push([a, b]); } return M; }
  PROBE.ramanujan = function(){
    var b = $("probe");
    b.innerHTML = '<p class="merke">' + esc(t("ra_kubik")) + '</p><label class="reglerZ"><span>' + esc(t("ra_a")) + ' <b id="raAz"></b></span><input type="range" id="raA" min="1" max="20" step="1"></label><label class="reglerZ"><span>' + esc(t("ra_b")) + ' <b id="raBz"></b></span><input type="range" id="raB" min="1" max="20" step="1"></label>' +
      '<ol class="weg" id="raWeg"></ol><p class="zeile" id="raGl"></p><p class="zeile"><b>' + esc(t("ra_liste")) + '</b></p><p class="fiFolge" id="raListe" dir="ltr"></p><div class="raKub" id="raKub" dir="ltr"></div>';
    $("raA").value = ra.a; $("raB").value = ra.b;
    $("raA").addEventListener("input", function(){ ra.a = +this.value; raZeichnen(); });
    $("raB").addEventListener("input", function(){ ra.b = +this.value; raZeichnen(); });
    raZeichnen();
  };
  function raZeichnen(){
    var a = ra.a, b = ra.b, s = a * a * a + b * b * b, M = raSummen(), lo = Math.min(a, b), hi = Math.max(a, b);
    $("raAz").textContent = a; $("raBz").textContent = b;
    $("raWeg").innerHTML = weg([a + "³ + " + b + "³ = " + (a * a * a) + " + " + (b * b * b) + " = " + gz(s)]);
    var andere = (M[s] || []).filter(function(p){ return !(p[0] === lo && p[1] === hi); });
    var gl = $("raGl");
    gl.className = andere.length ? "zeile gut" : "zeile muted";
    gl.textContent = andere.length ? t("ra_gleich", { p: andere.map(function(p){ return p[0] + "³ + " + p[1] + "³"; }).join(", ") }) : t("ra_keine");
    $("raListe").innerHTML = Object.keys(M).filter(function(k){ return M[k].length > 1; }).map(function(k){ return '<span class="fzB" dir="ltr">' + M[k].map(function(p, i){ return '<span class="fzL">' + (i ? "" : "<b>" + gz(+k) + "</b>") + '</span><span class="fzR">= ' + p[0] + "³ + " + p[1] + "³</span>"; }).join("") + "</span>"; }).join("");
    var h = ""; for(var n = 1; n <= 20; n++) h += '<span class="' + (n === a || n === b ? "an" : "") + '">' + n + "³ = " + gz(n * n * n) + "</span>";
    $("raKub").innerHTML = h;
  }
  GEN.ramanujan = function(){
    var a = zuf(1, 12), b = zuf(1, 12), s = a * a * a + b * b * b;
    return { q: t("ra_q", { a: a, b: b }), w: s, tol: 0, l: gz(s), weg: [a + "³ = " + a + " · " + a + " · " + a + " = " + (a * a * a), b + "³ = " + b + " · " + b + " · " + b + " = " + (b * b * b), a + "³ + " + b + "³ = " + (a * a * a) + " + " + (b * b * b) + " = " + s] };
  };
  // ---------- Runde 5: genauere Erklärungen, neue Bilder, Quadratur des Kreises, Eratosthenes zum Ausprobieren ----------
  function karteH(k){ return '<h3 class="fH">' + esc(t(k)) + "</h3>"; }
  function absatz(k, v){ return '<p class="zeile">' + esc(t(k, v)) + "</p>"; }
  function merkeP(k, v){ return '<p class="merke">' + esc(t(k, v)) + "</p>"; }
  function liste(k){ return '<ul class="bListe">' + tA(k).map(function(x){ return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>"; }
  function schrift(s, x, y, text, a, cls, extra){ var o = { x: x, y: y, "text-anchor": a || "middle", "class": cls || "bk-klein" }; for(var k in extra || {}) o[k] = extra[k]; var e = el("text", o, text); s.appendChild(e); return e; }
  function pfeil(s, x1, y1, x2, y2, col, beide){
    var w = Math.atan2(y2 - y1, x2 - x1), L = 9, B = 4.5;
    function spitze(x, y, ww){ s.appendChild(el("path", { d: "M" + x + " " + y + "L" + (x - L * Math.cos(ww) + B * Math.sin(ww)) + " " + (y - L * Math.sin(ww) - B * Math.cos(ww)) + "L" + (x - L * Math.cos(ww) - B * Math.sin(ww)) + " " + (y - L * Math.sin(ww) + B * Math.cos(ww)) + "Z", fill: col })); }
    s.appendChild(el("line", { x1: x1, y1: y1, x2: x2, y2: y2, stroke: col, "stroke-width": 1.8 }));
    spitze(x2, y2, w); if(beide) spitze(x1, y1, w + Math.PI);
  }

  // ===== Leonardo da Vinci: Vitruvianischer Mensch =====
  var vPose = 2, vRaster = true;
  // Figur: Körpergröße H = 300 (Quadrat), Nabel bei 61 % → Kreis um den Nabel; zwei Haltungen wie bei Leonardo
  function vMensch(s, o){
    var cx = o.cx, fu = o.fu, H = o.H, p = o.p || 0.61, sk = H / 300, top = fu - H, nY = fu - p * H, R = p * H;
    var haut = "#fde7c8", linie = "#1a2233";
    function glied(pts, alpha){
      var d = pts.map(function(q, i){ return (i ? "L" : "M") + q[0].toFixed(1) + " " + q[1].toFixed(1); }).join("");
      s.appendChild(el("path", { d: d, fill: "none", stroke: linie, "stroke-width": 12 * sk, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: alpha }));
      s.appendChild(el("path", { d: d, fill: "none", stroke: haut, "stroke-width": 8.5 * sk, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: alpha < 1 ? 1 : 1 }));
    }
    var schY = top + 54 * sk, huefY = fu - 150 * sk, hx = 17 * sk;
    // Kreis-Haltung: Arme schräg nach oben bis an den Kreis, Beine gespreizt bis an den Kreis
    if(o.pose !== 0){
      var a = o.pose === 2 ? 0.75 : 1, wA = 58 * Math.PI / 180, wB = 30 * Math.PI / 180;
      [-1, 1].forEach(function(sg){
        glied([[cx + sg * 22 * sk, schY], [cx + sg * R * Math.sin(wA) * 0.55, nY - R * Math.cos(wA) * 0.62], [cx + sg * R * Math.sin(wA), nY - R * Math.cos(wA)]], a);
        glied([[cx + sg * hx, huefY], [cx + sg * R * Math.sin(wB) * 0.62, nY + R * Math.cos(wB) * 0.62], [cx + sg * R * Math.sin(wB), nY + R * Math.cos(wB)]], a);
      });
    }
    // Quadrat-Haltung: Arme waagrecht (Spanne = H), Beine geschlossen
    if(o.pose !== 1){
      [-1, 1].forEach(function(sg){
        glied([[cx + sg * 22 * sk, schY], [cx + sg * 90 * sk, schY + 2 * sk], [cx + sg * 150 * sk, schY]], 1);
        glied([[cx + sg * hx, huefY], [cx + sg * 13 * sk, fu - 75 * sk], [cx + sg * 10 * sk, fu - 4 * sk]], 1);
        s.appendChild(el("path", { d: "M" + (cx + sg * 10 * sk) + " " + (fu - 4 * sk) + "l" + (sg * 16 * sk) + " 0", stroke: linie, "stroke-width": 4 * sk, "stroke-linecap": "round" }));
      });
    }
    // Rumpf, Hals, Kopf
    s.appendChild(el("path", { d: "M" + (cx - 30 * sk) + " " + (schY - 4 * sk) + "Q" + cx + " " + (schY - 12 * sk) + " " + (cx + 30 * sk) + " " + (schY - 4 * sk) + "L" + (cx + 22 * sk) + " " + (huefY - 20 * sk) + "Q" + (cx + 26 * sk) + " " + (huefY + 8 * sk) + " " + cx + " " + (huefY + 6 * sk) + "Q" + (cx - 26 * sk) + " " + (huefY + 8 * sk) + " " + (cx - 22 * sk) + " " + (huefY - 20 * sk) + "Z", fill: haut, stroke: linie, "stroke-width": 2.2 * sk, "stroke-linejoin": "round" }));
    s.appendChild(el("rect", { x: cx - 6 * sk, y: top + 34 * sk, width: 12 * sk, height: 18 * sk, fill: haut, stroke: linie, "stroke-width": 2 * sk }));
    s.appendChild(el("ellipse", { cx: cx, cy: top + 18.75 * sk, rx: 14 * sk, ry: 18.75 * sk, fill: haut, stroke: linie, "stroke-width": 2.4 * sk }));
    s.appendChild(el("path", { d: "M" + (cx - 14 * sk) + " " + (top + 14 * sk) + "Q" + cx + " " + (top - 6 * sk) + " " + (cx + 14 * sk) + " " + (top + 14 * sk), fill: "none", stroke: "#8a6d3b", "stroke-width": 4 * sk, "stroke-linecap": "round" }));
    s.appendChild(el("circle", { cx: cx, cy: nY, r: 3.2 * sk, fill: linie }));
    return { nY: nY, R: R, top: top };
  }
  PROBE.davinci = function(){
    var b = $("probe"), F = [["g", "v_groesse"], ["sp", "v_spanne"], ["k", "v_kopf"], ["f", "v_fuss"]];
    b.innerHTML = '<div class="chips" id="vPose"><b>' + esc(t("v_pose")) + "</b> " + tA("v_posen").map(function(x, i){ return '<button type="button" class="chip" data-p="' + i + '">' + esc(x) + "</button>"; }).join("") +
      ' <label class="chk"><input type="checkbox" id="vRaster"> ' + esc(t("v_raster")) + '</label></div><div class="zwei"><div id="vSvg"></div><div><p class="zeile muted">' + esc(t("v_tipp")) + "</p>" +
      F.map(function(f){ return '<label class="vfeld"><span>' + esc(t(f[1])) + '</span><span><input class="zahl" inputmode="decimal" data-v="' + f[0] + '" value="' + esc(vMass[f[0]] || "") + '"> cm</span></label>'; }).join("") +
      '<div id="vErg"></div></div></div><p class="zeile muted">' + esc(t("v_erkl")) + "</p>" +
      karteH("v_zwei_h") + absatz("v_zwei") + karteH("v_wer_h") + absatz("v_wer") + merkeP("v_gold");
    b.querySelectorAll("[data-v]").forEach(function(i){ i.addEventListener("input", function(){ vMass[i.dataset.v] = i.value; vRechnen(); }); });
    b.querySelectorAll("#vPose [data-p]").forEach(function(c){ c.addEventListener("click", function(){ vPose = +c.dataset.p; vFigur(); }); });
    $("vRaster").checked = vRaster; $("vRaster").addEventListener("change", function(){ vRaster = this.checked; vFigur(); });
    vFigur(); vRechnen();
  };
  vFigur = function(){
    document.querySelectorAll("#vPose [data-p]").forEach(function(c){ c.setAttribute("aria-pressed", +c.dataset.p === vPose ? "true" : "false"); });
    var W = 420, Hh = 470, cx = 214, fu = 400, H = 300, s = svgNeu(W, Hh, "bsvg vSvg"), x0 = cx - H / 2, y0 = fu - H, nY = fu - 0.61 * H, R = 0.61 * H;
    s.appendChild(el("rect", { x: 0, y: 0, width: W, height: Hh, rx: 12, fill: "#fbf6ea" }));
    if(vRaster) for(var i = 0; i <= 8; i++){
      var y = fu - i * H / 8;
      s.appendChild(el("line", { x1: x0, y1: y, x2: x0 + H, y2: y, stroke: "#c9b98f", "stroke-width": 1, "stroke-dasharray": "3 4" }));
      if(i < 8) schrift(s, x0 - 14, y - H / 16 + 4, String(8 - i), "middle", "bk-klein", { fill: i === 7 ? "#7c3aed" : "#8a6d3b" });
    }
    if(vRaster) s.appendChild(el("rect", { x: x0 - 22, y: y0, width: 16, height: H / 8, fill: "rgba(124,58,237,0.18)", stroke: "#7c3aed" }));
    s.appendChild(el("rect", { x: x0, y: y0, width: H, height: H, fill: "none", stroke: "#0e7490", "stroke-width": 2.6 }));
    if(vPose !== 0) s.appendChild(el("circle", { cx: cx, cy: nY, r: R, fill: "none", stroke: "#b8860b", "stroke-width": 2.6 }));
    vMensch(s, { cx: cx, fu: fu, H: H, pose: vPose, p: 0.61 });
    // Mittelpunkte
    s.appendChild(el("circle", { cx: cx, cy: fu - H / 2, r: 4.5, fill: "#0e7490" }));
    schrift(s, cx + 38, fu - H / 2 + 4, t("v_qmitte"), "start", "bk-klein", { fill: "#0e7490" });
    if(vPose !== 0){ s.appendChild(el("circle", { cx: cx, cy: nY, r: 4.5, fill: "#b8860b" })); schrift(s, cx + 38, nY + 4, t("v_nabel"), "start", "bk-klein", { fill: "#8a5a00" }); }
    // Maße
    pfeil(s, x0, fu + 38, x0 + H, fu + 38, "#0e7490", true);
    schrift(s, cx, fu + 56, t("v_spanne").split(" (")[0] + " = " + t("v_groesse"), "middle", "bk-klein", { fill: "#0e7490" });
    pfeil(s, x0 + H + 22, y0, x0 + H + 22, fu, "#0e7490", true);
    var tg = schrift(s, x0 + H + 36, (y0 + fu) / 2, t("v_groesse"), "middle", "bk-klein", { fill: "#0e7490" }); tg.setAttribute("transform", "rotate(90 " + (x0 + H + 36) + " " + ((y0 + fu) / 2) + ")");
    if(vRaster){ schrift(s, x0 - 14, y0 - 8, t("v_kopflbl"), "middle", "bk-klein", { fill: "#7c3aed" }); pfeil(s, cx + 4, fu + 12, cx + 4 + H / 6, fu + 12, "#b45309", true); schrift(s, cx + 4 + H / 6 + 6, fu + 16, t("v_fusslbl"), "start", "bk-klein", { fill: "#b45309" }); }
    $("vSvg").innerHTML = ""; $("vSvg").appendChild(s);
  };

  // ===== Quadratur des Kreises =====
  P.splice(P.indexOf(finde("davinci")) + 1, 0, { k: "quadratur", p: "q", sym: "○=□", col: "#7e22ce", leg: "r qa Afl pi wurzel approx", link: [["beruehmt/#davinci", "q_lDav"], ["beruehmt/#archimedes", "q_lArchi"], ["flaechen", "link_flaechen"]] });
  finde("davinci").link = [["beruehmt/#quadratur", "q_name"], ["dreisatz", "link_dreisatz"]];
  var qm = { mod: 0, d: 18, a: 4, p: 0.61 };
  PROBE.quadratur = function(){
    var b = $("probe");
    b.innerHTML = '<div class="chips" id="qMod">' + tA("q_modi").map(function(x, i){ return '<button type="button" class="chip" data-m="' + i + '">' + esc(x) + "</button>"; }).join("") + '</div><div id="qBox"></div>' +
      merkeP("q_rech") + karteH("q_warum_h") + absatz("q_warum");
    b.querySelectorAll("#qMod [data-m]").forEach(function(c){ c.addEventListener("click", function(){ qm.mod = +c.dataset.m; qAufbau(); }); });
    qAufbau();
  };
  function qAufbau(){
    document.querySelectorAll("#qMod [data-m]").forEach(function(c){ c.setAttribute("aria-pressed", +c.dataset.m === qm.mod ? "true" : "false"); });
    var B = $("qBox");
    if(qm.mod === 0){
      B.innerHTML = absatz("q_aeg_erkl") + '<label class="reglerZ"><span>' + esc(t("q_d")) + ' <b id="qDz"></b></span><input type="range" id="qD" min="9" max="36" step="1"></label><div class="zwei"><div id="qSvg"></div><div><ol class="weg" id="qWeg"></ol><p class="zeile" id="qErg"></p></div></div>';
      $("qD").value = qm.d; $("qD").addEventListener("input", function(){ qm.d = +this.value; qAeg(); }); qAeg();
    } else if(qm.mod === 1){
      B.innerHTML = absatz("q_mond_erkl") + '<label class="reglerZ"><span>' + esc(t("q_a")) + ' <b id="qAz"></b></span><input type="range" id="qA" min="2" max="10" step="1"></label><div class="zwei"><div id="qSvg"></div><div><ol class="weg" id="qWeg"></ol></div></div>' + merkeP("q_mond_fazit");
      $("qA").value = qm.a; $("qA").addEventListener("input", function(){ qm.a = +this.value; qMond(); }); qMond();
    } else {
      B.innerHTML = absatz("q_vit_erkl") + '<label class="reglerZ"><span>' + esc(t("q_nabel")) + ' <b id="qPz"></b></span><input type="range" id="qP" min="50" max="70" step="0.1"></label><div class="chips" id="qPc">' +
        [[56.4, 0], [60, 1], [61.8, 2]].map(function(x){ return '<button type="button" class="chip" data-v="' + x[0] + '">' + esc(tA("q_vit_b")[x[1]]) + "</button>"; }).join("") + '</div><div class="zwei"><div id="qSvg"></div><div><ol class="weg" id="qWeg"></ol><p class="zeile" id="qErg"></p></div></div>';
      $("qP").value = qm.p * 100; $("qP").addEventListener("input", function(){ qm.p = this.value / 100; qVit(); });
      B.querySelectorAll("#qPc [data-v]").forEach(function(c){ c.addEventListener("click", function(){ qm.p = c.dataset.v / 100; $("qP").value = c.dataset.v; qVit(); }); });
      qVit();
    }
  }
  function qLeg(){ return '<p class="leg"><span style="color:#7c3aed">■ ' + esc(t("q_kreis")) + '</span> · <span style="color:#b8860b">■ ' + esc(t("q_quadrat")) + "</span></p>"; }
  function qAeg(){
    var d = qm.d, r = d / 2, sq = 8 / 9 * d, AK = Math.PI * r * r, AQ = sq * sq, sk = 250 / d, s = svgNeu(300, 300), C = 150;
    $("qDz").textContent = z(d, 0) + " m";
    s.appendChild(el("circle", { cx: C, cy: C, r: r * sk, fill: "rgba(124,58,237,0.16)", stroke: "#7c3aed", "stroke-width": 2.6 }));
    s.appendChild(el("rect", { x: C - sq * sk / 2, y: C - sq * sk / 2, width: sq * sk, height: sq * sk, fill: "rgba(184,134,11,0.16)", stroke: "#b8860b", "stroke-width": 2.6 }));
    pfeil(s, C - r * sk, C, C + r * sk, C, "#7c3aed", true); schrift(s, C, C - 6, "d = " + z(d, 0), "middle", "bt", { fill: "#5b21b6" });
    pfeil(s, C - sq * sk / 2, C + sq * sk / 2 + 14, C + sq * sk / 2, C + sq * sk / 2 + 14, "#b8860b", true); schrift(s, C, C + sq * sk / 2 + 30, "8/9 · d = " + z(sq, 2), "middle", "bk-klein", { fill: "#8a5a00" });
    $("qSvg").innerHTML = ""; $("qSvg").appendChild(s); $("qSvg").insertAdjacentHTML("beforeend", qLeg());
    $("qWeg").innerHTML = weg([{ lbl: t("q_kreis") }, "r = " + z(d, 0) + " : 2 = " + z(r, 1), "A = π · r² = π · " + z(r, 1) + "² ≈ " + z(AK, 2) + " m²", { lbl: t("q_quadrat") }, "a = 8/9 · " + z(d, 0) + (sq % 1 ? " ≈ " : " = ") + z(sq, 2), "A = a² " + (sq % 1 ? "≈ " : "= ") + z(AQ, 2) + " m²"]);
    $("qErg").innerHTML = "<b>" + esc(t("q_abw", { p: z(Math.abs(AQ - AK) / AK * 100, 2) })) + '</b><span class="fzZ" style="display:block">' + esc(t("q_piAeg")) + "</span>";
  }
  function qMond(){
    var a = qm.a, c = a * Math.SQRT2, D = a * a / 2, KH = Math.PI * a * a / 4, s = svgNeu(320, 260), O = [160, 230], R = 130, rs = R / Math.SQRT2;
    $("qAz").textContent = a + " cm";
    var A = [O[0] - R, O[1]], B = [O[0] + R, O[1]], Cp = [O[0], O[1] - R];
    function P2(p){ return p[0].toFixed(1) + " " + p[1].toFixed(1); }
    s.appendChild(el("path", { d: "M" + P2(A) + "A" + R + " " + R + " 0 0 1 " + P2(B), fill: "none", stroke: "#1a2233", "stroke-width": 1.6, "stroke-dasharray": "6 4" }));
    s.appendChild(el("path", { d: "M" + P2(A) + "A" + rs + " " + rs + " 0 0 1 " + P2(Cp) + "A" + R + " " + R + " 0 0 0 " + P2(A) + "Z", fill: "rgba(184,134,11,0.35)", stroke: "#b8860b", "stroke-width": 2.4 }));
    s.appendChild(el("path", { d: "M" + P2(B) + "A" + rs + " " + rs + " 0 0 0 " + P2(Cp) + "A" + R + " " + R + " 0 0 1 " + P2(B) + "Z", fill: "rgba(184,134,11,0.35)", stroke: "#b8860b", "stroke-width": 2.4 }));
    s.appendChild(el("path", { d: "M" + P2(A) + "L" + P2(Cp) + "L" + P2(B) + "Z", fill: "rgba(124,58,237,0.22)", stroke: "#7c3aed", "stroke-width": 2.6, "stroke-linejoin": "round" }));
    s.appendChild(el("path", { d: "M" + (Cp[0] - 9) + " " + (Cp[1] + 9) + "L" + Cp[0] + " " + (Cp[1] + 18) + "L" + (Cp[0] + 9) + " " + (Cp[1] + 9), fill: "none", stroke: "#7c3aed", "stroke-width": 1.6 }));
    s.appendChild(el("circle", { cx: Cp[0], cy: Cp[1] + 9, r: 1.8, fill: "#7c3aed" }));
    schrift(s, (A[0] + Cp[0]) / 2 + 12, (A[1] + Cp[1]) / 2 + 16, "a", "middle", "bt", { fill: "#5b21b6" });
    schrift(s, (B[0] + Cp[0]) / 2 - 12, (B[1] + Cp[1]) / 2 + 16, "a", "middle", "bt", { fill: "#5b21b6" });
    schrift(s, O[0], O[1] + 20, "c", "middle", "bt");
    $("qSvg").innerHTML = ""; $("qSvg").appendChild(s);
    $("qSvg").insertAdjacentHTML("beforeend", '<p class="leg"><span style="color:#7c3aed">■ ' + esc(t("q_dreieck")) + '</span> · <span style="color:#b8860b">■ ' + esc(t("q_moend")) + "</span></p>");
    $("qWeg").innerHTML = weg([{ lbl: t("q_w_dr") }, "A = a · a : 2 = " + a + " · " + a + " : 2 = " + z(D, 2) + " cm²", { lbl: t("q_w_klein") }, "2 · ½ · π · (a : 2)² = π · a² : 4 ≈ " + z(KH, 2) + " cm²", { lbl: t("q_w_gross") }, "½ · π · (c : 2)² = π · 2a² : 8 = π · a² : 4 ≈ " + z(KH, 2) + " cm²", { lbl: t("q_w_m") }, z(KH, 2) + " − (" + z(KH, 2) + " − " + z(D, 2) + ") = " + z(D, 2) + " cm²"]);
  }
  function qVit(){
    var p = qm.p, H = 260, s = svgNeu(400, 400, "bsvg vSvg"), cx = 200, fu = 382, R = p * H, AQ = 1, AK = Math.PI * p * p;
    $("qPz").textContent = z(p * 100, 1) + " %";
    document.querySelectorAll("#qPc [data-v]").forEach(function(c){ c.setAttribute("aria-pressed", Math.abs(c.dataset.v / 100 - p) < 0.0006 ? "true" : "false"); });
    s.appendChild(el("rect", { x: cx - H / 2, y: fu - H, width: H, height: H, fill: "rgba(184,134,11,0.14)", stroke: "#b8860b", "stroke-width": 2.6 }));
    s.appendChild(el("circle", { cx: cx, cy: fu - R, r: R, fill: "rgba(124,58,237,0.14)", stroke: "#7c3aed", "stroke-width": 2.6 }));
    vMensch(s, { cx: cx, fu: fu, H: H, pose: 2, p: p });
    pfeil(s, cx, fu - R, cx, fu, "#7c3aed", false); schrift(s, cx - 30, fu - R / 2, "r", "end", "bt", { fill: "#5b21b6" });
    $("qSvg").innerHTML = ""; $("qSvg").appendChild(s); $("qSvg").insertAdjacentHTML("beforeend", qLeg());
    $("qWeg").innerHTML = weg([{ lbl: t("q_quadrat") + " (" + t("v_groesse") + " = 1)" }, "A = 1 · 1 = 1", { lbl: t("q_kreis") }, "r = " + z(p, 3), "A = π · r² = π · " + z(p, 3) + "² ≈ " + z(AK, 3)]);
    var gleich = Math.abs(AK - AQ) < 0.004;
    $("qErg").className = "zeile" + (gleich ? " gut" : "");
    $("qErg").textContent = t("q_vit_anteil", { p: z(AK * 100, 1) }) + " " + t("q_vit_gleich");
  }
  GEN.quadratur = function(){
    var art = wahl(["A", "E", "M"]);
    if(art === "A"){ var r = zuf(2, 20), A = Math.PI * r * r, a = r * Math.sqrt(Math.PI), aw = Math.round(a * 10) / 10;
      return { q: t("q_qA", { r: r }), w: aw, tol: 0.051, l: z(aw, 1) + " cm", weg: ["A = π · r² = π · " + r + "² ≈ " + z(A, 2) + " cm²", "a = √A ≈ √" + z(A, 2) + " ≈ " + z(a, 2) + " cm", { lbl: t("q_kurz2") }, "a = r · √π ≈ " + r + " · 1,7725 ≈ " + z(aw, 1) + " cm"] }; }
    if(art === "E"){ var k = zuf(1, 8), d = 9 * k, sq = 8 * k;
      return { q: t("q_qE", { d: d }), w: sq * sq, tol: 0, l: gz(sq * sq) + " m²", weg: ["a = 8/9 · d = 8 · " + d + " : 9 = " + sq + " m", "A = a² = " + sq + " · " + sq + " = " + gz(sq * sq) + " m²"] }; }
    var m = zuf(2, 12);
    return { q: t("q_qM", { a: m }), w: m * m / 2, tol: 0.01, l: z(m * m / 2, 1) + " cm²", weg: [{ lbl: t("q_wM") }, "A = a · a : 2 = " + m + " · " + m + " : 2 = " + z(m * m / 2, 1) + " cm²"] };
  };

  // ===== Fibonacci: goldener Schnitt =====
  var fiG = 0.7, PHI = (1 + Math.sqrt(5)) / 2, _fiAlt = PROBE.fibonacci;
  PROBE.fibonacci = function(){
    _fiAlt();
    $("probe").insertAdjacentHTML("beforeend", karteH("fi_g_h") + absatz("fi_g_erkl") + '<label class="reglerZ"><span>' + esc(t("fi_g_pos")) + ' <b id="fgPz"></b></span><input type="range" id="fgP" min="50" max="90" step="0.1"></label><p><button type="button" class="knopf hell" id="fgB">' + esc(t("fi_g_btn")) + '</button></p><div id="fgSvg"></div><ol class="weg" id="fgWeg"></ol><p class="zeile" id="fgErg"></p>' +
      merkeP("fi_g_formel") + '<div class="zwei"><div id="fgPent"></div><div>' + karteH("fi_g_wo_h") + liste("fi_g_wo") + "</div></div>");
    $("fgP").value = fiG * 100; $("fgP").addEventListener("input", function(){ fiG = this.value / 100; fgZeichnen(); });
    $("fgB").addEventListener("click", function(){ fiG = 1 / PHI; $("fgP").value = (100 / PHI).toFixed(1); fgZeichnen(); });
    fgZeichnen(); fgPent();
  };
  function fgZeichnen(){
    var L = 10, a = fiG * L, b = L - a, s = svgNeu(620, 250), x0 = 30, W = 560, xa = x0 + W * fiG;
    $("fgPz").textContent = z(fiG * 100, 1) + " %";
    s.appendChild(el("line", { x1: x0, y1: 40, x2: xa, y2: 40, stroke: "#7c3aed", "stroke-width": 8, "stroke-linecap": "round" }));
    s.appendChild(el("line", { x1: xa, y1: 40, x2: x0 + W, y2: 40, stroke: "#b8860b", "stroke-width": 8, "stroke-linecap": "round" }));
    s.appendChild(el("circle", { cx: xa, cy: 40, r: 7, fill: "#ffffff", stroke: "#1a2233", "stroke-width": 2.5 }));
    schrift(s, (x0 + xa) / 2, 26, "a = " + z(a, 2), "middle", "bt", { fill: "#5b21b6" });
    schrift(s, (xa + x0 + W) / 2, 26, "b = " + z(b, 2), "middle", "bt", { fill: "#8a5a00" });
    pfeil(s, x0, 64, x0 + W, 64, "#1a2233", true); schrift(s, x0 + W / 2, 80, "a + b = " + L, "middle", "bk-klein");
    // goldenes Rechteck a × (a+b) bzw. Rechteck mit Seiten (a+b) und a: Quadrat a·a + Rest
    var h = 140, sk = h / a, wR = L * sk, rx = (620 - wR) / 2, ry = 100;
    s.appendChild(el("rect", { x: rx, y: ry, width: a * sk, height: h, fill: "rgba(124,58,237,0.16)", stroke: "#7c3aed", "stroke-width": 2 }));
    s.appendChild(el("rect", { x: rx + a * sk, y: ry, width: b * sk, height: h, fill: "rgba(184,134,11,0.18)", stroke: "#b8860b", "stroke-width": 2 }));
    schrift(s, rx + a * sk / 2, ry + h / 2 + 5, "a × a", "middle", "bt", { fill: "#5b21b6" });
    $("fgSvg").innerHTML = ""; $("fgSvg").appendChild(s);
    var q1 = L / a, q2 = a / b, ok = Math.abs(q1 - q2) < 0.01;
    $("fgWeg").innerHTML = weg(["(a + b) : a = " + L + " : " + z(a, 2) + " ≈ " + z(q1, 3), "a : b = " + z(a, 2) + " : " + z(b, 2) + " ≈ " + z(q2, 3)]);
    $("fgErg").className = "zeile" + (ok ? " gut" : ""); $("fgErg").textContent = ok ? t("fi_g_treffer") : t("fi_g_nicht");
  }
  function fgPent(){
    var s = svgNeu(260, 250), C = [130, 132], R = 110, P5 = [];
    for(var i = 0; i < 5; i++){ var w = -Math.PI / 2 + i * 2 * Math.PI / 5; P5.push([C[0] + R * Math.cos(w), C[1] + R * Math.sin(w)]); }
    function pp(p){ return p[0].toFixed(1) + " " + p[1].toFixed(1); }
    s.appendChild(el("path", { d: "M" + P5.map(pp).join("L") + "Z", fill: "rgba(184,134,11,0.12)", stroke: "#b8860b", "stroke-width": 2.6 }));
    s.appendChild(el("path", { d: "M" + [0, 2, 4, 1, 3].map(function(i){ return pp(P5[i]); }).join("L") + "Z", fill: "none", stroke: "#7c3aed", "stroke-width": 2.2 }));
    s.appendChild(el("line", { x1: P5[0][0], y1: P5[0][1], x2: P5[2][0], y2: P5[2][1], stroke: "#7c3aed", "stroke-width": 5, "stroke-linecap": "round" }));
    s.appendChild(el("line", { x1: P5[2][0], y1: P5[2][1], x2: P5[3][0], y2: P5[3][1], stroke: "#b8860b", "stroke-width": 5, "stroke-linecap": "round" }));
    $("fgPent").innerHTML = ""; $("fgPent").appendChild(s);
    $("fgPent").insertAdjacentHTML("beforeend", '<p class="leg"><span style="color:#7c3aed">▬ ' + esc(t("fi_g_diag")) + '</span> : <span style="color:#b8860b">▬ ' + esc(t("fi_g_seite")) + "</span> = φ</p><p class=\"leg\">φ ≈ " + z(1.618, 3) + "</p>");
  }

  // ===== Euler: Karte wird zum Netz =====
  var _euAlt = PROBE.euler, _euZ = euZeichnen;
  PROBE.euler = function(){
    _euAlt();
    $("probe").insertAdjacentHTML("beforeend", karteH("eu_netz_h") + absatz("eu_netz_erkl") + '<div class="zwei"><div id="euNetz"></div><div><p class="zeile" id="euUng"></p>' + merkeP("eu_warum") + "</div></div>" + absatz("eu_nikolaus"));
    euNetz();
  };
  euZeichnen = function(){ _euZ(); if($("euNetz")) euNetz(); };
  function euNetz(){
    var BR = euBruecken(), L = tA("eu_L"), POS = [[90, 135], [190, 32], [190, 238], [300, 135]], s = svgNeu(380, 270), zaehl = {};
    BR.forEach(function(bb, j){
      var key = Math.min(bb[0], bb[1]) + "-" + Math.max(bb[0], bb[1]), n = BR.filter(function(c){ return Math.min(c[0], c[1]) + "-" + Math.max(c[0], c[1]) === key; }).length, k = zaehl[key] = (zaehl[key] || 0) + 1;
      var p = POS[bb[0]], q = POS[bb[1]], mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2, dx = q[0] - p[0], dy = q[1] - p[1], len = Math.hypot(dx, dy), off = n > 1 ? (k - (n + 1) / 2) * 50 : 0;
      var cxq = mx - dy / len * off, cyq = my + dx / len * off, used = eu.used.indexOf(j) >= 0;
      s.appendChild(el("path", { d: "M" + p[0] + " " + p[1] + "Q" + cxq + " " + cyq + " " + q[0] + " " + q[1], fill: "none", stroke: used ? "#7c3aed" : "#8b5e3c", "stroke-width": used ? 5 : 3.5, "stroke-linecap": "round" }));
      if(used){ var tx = 0.25 * p[0] + 0.5 * cxq + 0.25 * q[0], ty = 0.25 * p[1] + 0.5 * cyq + 0.25 * q[1]; s.appendChild(el("circle", { cx: tx, cy: ty, r: 10, fill: "#7c3aed" })); schrift(s, tx, ty + 4.5, String(eu.used.indexOf(j) + 1), "middle", "bk-klein", { fill: "#ffffff" }); }
    });
    var ung = 0;
    POS.forEach(function(p, i){
      var g = BR.filter(function(bb){ return bb[0] === i || bb[1] === i; }).length; if(g % 2) ung++;
      s.appendChild(el("circle", { cx: p[0], cy: p[1], r: 19, fill: g % 2 ? "#fde68a" : "#ede9fe", stroke: g % 2 ? "#b8860b" : "#7c3aed", "stroke-width": i === eu.cur ? 5 : 2.6 }));
      schrift(s, p[0], p[1] + 6, String(g), "middle", "bt");
      var lx = i === 0 ? p[0] - 24 : i === 3 ? p[0] + 24 : p[0] + 26, ly = i === 1 ? p[1] + 5 : i === 2 ? p[1] + 5 : p[1] - 26;
      schrift(s, i === 0 || i === 3 ? p[0] : lx, ly, L[i], i === 0 || i === 3 ? "middle" : "start", "bk-klein");
    });
    $("euNetz").innerHTML = ""; $("euNetz").appendChild(s);
    $("euNetz").insertAdjacentHTML("beforeend", '<p class="leg"><span style="color:#b8860b">● ' + esc(t("eu_ungerade")) + '</span> · <span style="color:#7c3aed">● ' + esc(t("eu_gerade")) + "</span></p>");
    $("euUng").innerHTML = "<b>" + esc(t("eu_ung", { n: ung })) + "</b> " + esc(t(ung === 0 ? "eu_n0" : ung === 2 ? "eu_n2" : "eu_n4"));
  }

  // ===== Buffon: warum π? =====
  var _buAlt = PROBE.buffon, _buZ = buZeichnen;
  PROBE.buffon = function(){
    _buAlt();
    $("probe").insertAdjacentHTML("beforeend", karteH("bu_th_h") + '<div class="zwei"><div><div id="buEins"></div>' + absatz("bu_th1") + '</div><div><div id="buFl"></div>' + absatz("bu_th2") + "</div></div>" + '<ol class="weg" id="buTh"></ol>' + merkeP("bu_lazz"));
    buEins(); buFlaeche();
    $("buTh").innerHTML = weg([{ lbl: t("bu_w1") }, "A₁ = l : 2 · 2 = l", { lbl: t("bu_w2") }, "A₂ = π · d : 2", { lbl: t("bu_w3") }, "P = A₁ : A₂ = 2 · l : (π · d)", { lbl: t("bu_w4") }, "P = 2 : π  ⇒  π = 2 : P ≈ 2 · n : k"]);
  };
  buZeichnen = function(){ _buZ(); if($("buFl")) buFlaeche(); };
  function buEins(){
    var s = svgNeu(320, 220), d = 140, x1 = 40, x2 = x1 + d, M = [112, 110], th = 55 * Math.PI / 180, l = d;
    s.appendChild(el("rect", { x: 0, y: 0, width: 320, height: 220, fill: "#fbf6ea" }));
    [x1, x2, x2 + d].forEach(function(x){ s.appendChild(el("line", { x1: x, y1: 0, x2: x, y2: 220, stroke: "#8a6d3b", "stroke-width": 2 })); });
    var dx = Math.cos(th) * l / 2, dy = Math.sin(th) * l / 2;
    s.appendChild(el("line", { x1: M[0] - dx, y1: M[1] + dy, x2: M[0] + dx, y2: M[1] - dy, stroke: "#1565c0", "stroke-width": 4, "stroke-linecap": "round" }));
    s.appendChild(el("circle", { cx: M[0], cy: M[1], r: 4.5, fill: "#1a2233" }));
    pfeil(s, x1, 196, x2, 196, "#1a2233", true); schrift(s, (x1 + x2) / 2, 212, "d", "middle", "bt");
    pfeil(s, x1, M[1], M[0], M[1], "#7c3aed", true); schrift(s, (x1 + M[0]) / 2, M[1] + 16, "x", "middle", "bt", { fill: "#5b21b6" });
    s.appendChild(el("line", { x1: M[0], y1: M[1], x2: M[0] + 60, y2: M[1], stroke: "#1a2233", "stroke-width": 1, "stroke-dasharray": "4 3" }));
    s.appendChild(el("path", { d: "M" + (M[0] + 30) + " " + M[1] + "A30 30 0 0 0 " + (M[0] + 30 * Math.cos(th)) + " " + (M[1] - 30 * Math.sin(th)), fill: "none", stroke: "#b8860b", "stroke-width": 2.4 }));
    schrift(s, M[0] + 40, M[1] - 12, "θ", "start", "bt", { fill: "#8a5a00" });
    schrift(s, M[0] + dx + 8, M[1] - dy + 4, "l", "start", "bt", { fill: "#1565c0" });
    s.appendChild(el("line", { x1: M[0] - dx, y1: M[1] + dy, x2: M[0] - dx, y2: M[1], stroke: "#b8860b", "stroke-width": 2, "stroke-dasharray": "4 3" }));
    $("buEins").innerHTML = ""; $("buEins").appendChild(s);
  }
  function buFlaeche(){
    var W = 320, H = 210, L = 40, Bm = 175, sx = (W - L - 20) / Math.PI, sy = (Bm - 20) / 25, s = svgNeu(W, H);
    s.appendChild(el("rect", { x: L, y: Bm - 25 * sy, width: Math.PI * sx, height: 25 * sy, fill: "#f8fafc", stroke: "#1a2233", "stroke-width": 1.6 }));
    var d = "M" + L + " " + Bm; for(var i = 0; i <= 60; i++){ var th = Math.PI * i / 60; d += "L" + (L + th * sx).toFixed(1) + " " + (Bm - 25 * Math.sin(th) * sy).toFixed(1); }
    s.appendChild(el("path", { d: d + "Z", fill: "rgba(184,134,11,0.25)", stroke: "#b8860b", "stroke-width": 2.4 }));
    bu.N.forEach(function(nd){
      var cx = (nd[0] + nd[2]) / 2, th = Math.atan2(nd[3] - nd[1], nd[2] - nd[0]), r = ((cx % BU_D) + BU_D) % BU_D, x = Math.min(r, BU_D - r);
      s.appendChild(el("circle", { cx: L + th * sx, cy: Bm - x * sy, r: 2.6, fill: nd[4] ? "#dc2626" : "#1565c0" }));
    });
    schrift(s, L - 6, Bm + 4, "0", "end"); schrift(s, L - 6, Bm - 25 * sy + 4, "d/2", "end"); schrift(s, L + Math.PI * sx, Bm + 16, "π", "middle", "bt"); schrift(s, L + Math.PI / 2 * sx, Bm + 16, "θ", "middle", "bt", { fill: "#8a5a00" });
    schrift(s, L - 22, Bm - 12.5 * sy, "x", "middle", "bt", { fill: "#5b21b6" });
    schrift(s, L + Math.PI / 2 * sx, Bm - 6 * sy, "x ≤ l/2 · sin θ", "middle", "bk-klein", { fill: "#8a5a00" });
    $("buFl").innerHTML = ""; $("buFl").appendChild(s);
    $("buFl").insertAdjacentHTML("beforeend", '<p class="leg"><span style="color:#dc2626">● ' + esc(t("bu_treff")) + '</span> · <span style="color:#1565c0">● ' + esc(t("bu_daneben")) + "</span></p>");
  }

  // ===== Eratosthenes: Erdumfang mit Schatten =====
  var er = { a: 7.2, s: 800, mod: 0, H: 25, S: 3.15 };
  finde("eratosthenes").nurText = false; finde("eratosthenes").leg = "alpha sKm eU erH erS";
  PROBE.eratosthenes = function(){
    var b = $("probe");
    b.innerHTML = absatz("e_anl") + '<div class="chips" id="erMod">' + tA("e_mod").map(function(x, i){ return '<button type="button" class="chip" data-m="' + i + '">' + esc(x) + "</button>"; }).join("") + "</div>" +
      '<div id="erWBox"><label class="reglerZ"><span>' + esc(t("e_alpha")) + ' <b id="erAz"></b></span><input type="range" id="erA" min="3" max="15" step="0.1"></label></div>' +
      '<div id="erOBox"><div class="zwei"><div><label class="reglerZ"><span>' + esc(t("e_H")) + ' <b id="erHz"></b></span><input type="range" id="erH" min="10" max="40" step="0.5"></label><label class="reglerZ"><span>' + esc(t("e_Sch")) + ' <b id="erShz"></b></span><input type="range" id="erSh" min="0.5" max="6" step="0.05"></label></div><div id="erObSvg"></div></div></div>' +
      '<label class="reglerZ"><span>' + esc(t("e_s")) + ' <b id="erSz"></b></span><input type="range" id="erS" min="400" max="1200" step="10"></label>' +
      '<div class="zwei"><div id="erSvg"></div><div><ol class="weg" id="erWeg"></ol><p class="zeile" id="erErg"></p></div></div>' + merkeP("e_wechsel") + absatz("e_stadion") + merkeP("e_obelisk");
    $("erA").value = er.a; $("erS").value = er.s; $("erH").value = er.H; $("erSh").value = er.S;
    $("erA").addEventListener("input", function(){ er.a = +this.value; erZeichnen(); });
    $("erS").addEventListener("input", function(){ er.s = +this.value; erZeichnen(); });
    $("erH").addEventListener("input", function(){ er.H = +this.value; erZeichnen(); });
    $("erSh").addEventListener("input", function(){ er.S = +this.value; erZeichnen(); });
    b.querySelectorAll("#erMod [data-m]").forEach(function(c){ c.addEventListener("click", function(){ er.mod = +c.dataset.m; erZeichnen(); }); });
    erZeichnen();
  };
  function erObelisk(){
    var W = 260, Hs = 230, s = svgNeu(W, Hs), fx = 150, by = 205, sk = 170 / 40, h = er.H * sk, sl = er.S * sk * 3, a = Math.atan(er.S / er.H);
    s.appendChild(el("rect", { x: 0, y: 0, width: W, height: Hs, rx: 10, fill: "#eef5ff" }));
    s.appendChild(el("line", { x1: 10, y1: by, x2: W - 10, y2: by, stroke: "#8a6d3b", "stroke-width": 3 }));
    s.appendChild(el("path", { d: "M" + (fx - 7) + " " + by + "L" + (fx - 4) + " " + (by - h + 8) + "L" + fx + " " + (by - h) + "L" + (fx + 4) + " " + (by - h + 8) + "L" + (fx + 7) + " " + by + "Z", fill: "#e7d3a8", stroke: "#5b3a1e", "stroke-width": 1.6 }));
    s.appendChild(el("line", { x1: fx, y1: by - h, x2: fx - sl, y2: by, stroke: "#f59e0b", "stroke-width": 2.4 }));
    s.appendChild(el("line", { x1: fx, y1: by, x2: fx - sl, y2: by, stroke: "#334155", "stroke-width": 6, opacity: 0.55 }));
    s.appendChild(el("path", { d: "M" + fx + " " + (by - h + 30) + "A30 30 0 0 1 " + (fx - 30 * Math.sin(a * 3 > 1.2 ? 1.2 : a * 3)) + " " + (by - h + 30 * Math.cos(a * 3 > 1.2 ? 1.2 : a * 3)), fill: "none", stroke: "#7c3aed", "stroke-width": 2.4 }));
    schrift(s, fx - 12, by - h + 46, "α", "end", "bt", { fill: "#5b21b6" });
    schrift(s, fx + 12, by - h / 2, "H", "start", "bt"); schrift(s, fx - sl / 2, by + 18, "S", "middle", "bt");
    schrift(s, W / 2, 16, t("e_nicht"), "middle", "bk-klein");
    $("erObSvg").innerHTML = ""; $("erObSvg").appendChild(s);
  }
  function erZeichnen(){
    document.querySelectorAll("#erMod [data-m]").forEach(function(c){ c.setAttribute("aria-pressed", +c.dataset.m === er.mod ? "true" : "false"); });
    $("erWBox").hidden = er.mod !== 0; $("erOBox").hidden = er.mod !== 1;
    if(er.mod === 1){ er.a = Math.round(Math.atan(er.S / er.H) * 1800 / Math.PI) / 10; $("erHz").textContent = z(er.H, 1) + " m"; $("erShz").textContent = z(er.S, 2) + " m"; erObelisk(); }
    var a = er.a, U = 360 / a * er.s, s = svgNeu(400, 420), C = [200, 350], R = 175, vis = a * 4 * Math.PI / 180;
    $("erAz").textContent = z(a, 1) + "°"; $("erSz").textContent = gz(er.s) + " km";
    s.appendChild(el("rect", { x: 0, y: 0, width: 400, height: 420, rx: 12, fill: "#eef5ff" }));
    s.appendChild(el("circle", { cx: C[0], cy: C[1], r: R, fill: "#bfe3c0", stroke: "#1a2233", "stroke-width": 2.4 }));
    var Sy = [C[0], C[1] - R], Al = [C[0] - R * Math.sin(vis), C[1] - R * Math.cos(vis)], st = 64, Top = [C[0] - (R + st) * Math.sin(vis), C[1] - (R + st) * Math.cos(vis)];
    // parallele Sonnenstrahlen bis zum Boden
    for(var x = 22; x <= 390; x += 34){ var dx = x - C[0], yb = Math.abs(dx) < R ? C[1] - Math.sqrt(R * R - dx * dx) : 420; s.appendChild(el("line", { x1: x, y1: 8, x2: x, y2: yb, stroke: "#f59e0b", "stroke-width": 1.4, "stroke-dasharray": "5 6", opacity: 0.8 })); }
    s.appendChild(el("rect", { x: 236, y: 10, width: 156, height: 22, rx: 6, fill: "#ffffff", stroke: "#f59e0b" }));
    schrift(s, 314, 26, t("e_sonne"), "middle", "bk-klein", { fill: "#b45309" });
    // Strahl durch den Brunnen bis zur Erdmitte, Strahl an der Stabspitze
    s.appendChild(el("line", { x1: Sy[0], y1: 40, x2: C[0], y2: C[1], stroke: "#f59e0b", "stroke-width": 2.6 }));
    s.appendChild(el("line", { x1: Top[0], y1: 40, x2: Top[0], y2: C[1] - Math.sqrt(R * R - (Top[0] - C[0]) * (Top[0] - C[0])), stroke: "#f59e0b", "stroke-width": 2.6 }));
    s.appendChild(el("line", { x1: C[0], y1: C[1], x2: Al[0], y2: Al[1], stroke: "#1a2233", "stroke-width": 1.6, "stroke-dasharray": "5 4" }));
    // Schatten (vom Fuß des Stabs weg von Syene) und Stab
    var sch = st * Math.tan(vis);
    s.appendChild(el("line", { x1: Al[0], y1: Al[1], x2: Al[0] - Math.cos(vis) * sch, y2: Al[1] + Math.sin(vis) * sch, stroke: "#334155", "stroke-width": 6, "stroke-linecap": "round", opacity: 0.55 }));
    s.appendChild(el("line", { x1: Al[0], y1: Al[1], x2: Top[0], y2: Top[1], stroke: "#5b3a1e", "stroke-width": 4.5, "stroke-linecap": "round" }));
    s.appendChild(el("rect", { x: Sy[0] - 8, y: Sy[1] - 1, width: 16, height: 20, fill: "#1e3a8a", stroke: "#1a2233" }));
    function bogen(m, r, w0, w1, col, sw){ s.appendChild(el("path", { d: "M" + (m[0] + r * Math.cos(w0)) + " " + (m[1] + r * Math.sin(w0)) + "A" + r + " " + r + " 0 0 " + (w1 > w0 ? 1 : 0) + " " + (m[0] + r * Math.cos(w1)) + " " + (m[1] + r * Math.sin(w1)), fill: "none", stroke: col, "stroke-width": sw || 2.6 })); }
    bogen(Top, 26, Math.PI / 2 - vis, Math.PI / 2, "#7c3aed", 3);
    var wb = Math.PI / 2 - vis / 2; schrift(s, Top[0] + 42 * Math.cos(wb), Top[1] + 42 * Math.sin(wb) + 5, "α", "middle", "bt", { fill: "#5b21b6" });
    bogen(C, 46, -Math.PI / 2 - vis, -Math.PI / 2, "#7c3aed", 3);
    var wc = -Math.PI / 2 - vis / 2; schrift(s, C[0] + 62 * Math.cos(wc), C[1] + 62 * Math.sin(wc) + 5, "α", "middle", "bt", { fill: "#5b21b6" });
    bogen(C, R + 7, -Math.PI / 2 - vis, -Math.PI / 2, "#0f766e", 4);
    var ws = -Math.PI / 2 - vis / 2; schrift(s, C[0] + (R + 22) * Math.cos(ws) + 6, C[1] + (R + 22) * Math.sin(ws) + 5, "s", "middle", "bt", { fill: "#0f766e" });
    var halo = { stroke: "#ffffff", "stroke-width": 4, "paint-order": "stroke" };
    schrift(s, Sy[0] + 14, Sy[1] + 30, t("e_syene"), "start", "bk-klein", halo); schrift(s, Al[0] + 4, Al[1] + 30, t("e_alex"), "end", "bk-klein", halo);
    s.appendChild(el("circle", { cx: C[0], cy: C[1], r: 4.5, fill: "#1a2233" })); schrift(s, C[0] + 10, C[1] + 22, t("e_mitte"), "start", "bk-klein");
    schrift(s, 200, 412, t("e_nicht"), "middle", "bk-klein");
    $("erSvg").innerHTML = ""; $("erSvg").appendChild(s);
    var n = 360 / a, gl = Math.abs(n - Math.round(n * 100) / 100) < 1e-9 ? " = " : " ≈ ";
    var tanW = er.mod === 1 ? [{ lbl: t("e_wtan") }, "tan α = S : H", "tan α = " + z(er.S, 2) + " : " + z(er.H, 1) + " ≈ " + z(er.S / er.H, 4), "α ≈ " + z(a, 1) + "°"] : [];
    $("erWeg").innerHTML = weg(tanW.concat([{ lbl: t("e_w1") }, "360° : " + z(a, 1) + "°" + gl + z(n, 2), { lbl: t("e_w2") }, "U = " + z(n, 2) + " · " + gz(er.s) + " km" + gl + gz(U) + " km", { lbl: t("e_w3") }, "r = U : (2 · π) ≈ " + gz(U / 2 / Math.PI) + " km"]));
    var ab = (U - 40075) / 40075 * 100;
    $("erErg").innerHTML = esc(t("e_real")) + "<br><b>" + esc(t("e_abw", { p: (ab > 0 ? "+" : "") + z(ab, 1) })) + "</b>";
  }
  GEN.eratosthenes = function(){
    if(Math.random() < 0.4){ var H = wahl([20, 24, 25, 30]), S = Math.round(H * Math.tan(wahl([6, 7.2, 7.5, 9]) * Math.PI / 180) * 100) / 100, al = Math.atan(S / H) * 180 / Math.PI, alr = Math.round(al * 10) / 10, sk = zuf(5, 10) * 100, Uo = 360 / alr * sk;
      return { q: t("e_qO", { H: H, S: z(S, 2), s: gz(sk) }), w: Uo, tol: Uo * 0.015, l: "≈ " + gz(Uo) + " km", weg: ["tan α = S : H", "tan α = " + z(S, 2) + " : " + H + " ≈ " + z(S / H, 4), "α ≈ " + z(alr, 1) + "°", "U = 360° : " + z(alr, 1) + "° · " + gz(sk) + " km", "U ≈ " + gz(Uo) + " km"] }; }
    var a = wahl([3.6, 4.5, 5, 6, 7.2, 7.5, 9, 10, 12]), s = zuf(4, 12) * 100, n = 360 / a, U = n * s;
    return { q: t("e_q", { a: z(a, 1), s: gz(s) }), w: U, tol: 1, l: gz(U) + " km", weg: ["360° : " + z(a, 1) + "° = " + z(n, 2), "U = " + z(n, 2) + " · " + gz(s) + " km = " + gz(U) + " km"] };
  };

  // ---------- Runde 6: Liu Hui, Sangaku, Ada Lovelace, Galileis Fallrinne ----------
  P.splice(P.indexOf(finde("archimedes")) + 1, 0, { k: "liuhui", p: "lh", sym: "3072", col: "#9a3412", leg: "nEcken lhs lhA r pi approx wurzel", link: [["beruehmt/#archimedes", "a_name"], ["pythagoras", "lh_lPy"]] });
  P.push({ k: "sangaku", p: "sg", sym: "○○", col: "#78350f", leg: "sgR r sgd wurzel", link: [["pythagoras", "lh_lPy"]] });
  P.push({ k: "lovelace", p: "al", sym: "V₁", col: "#be185d", leg: "alV", link: [["beruehmt/#turing", "tu_name"], ["beruehmt/#gauss", "g_name"]] });
  finde("galilei").leg = "gaH tSek gErd alpha";

  // ===== Liu Hui: Vieleck verdoppeln =====
  var LH_N = [6, 12, 24, 48, 96, 192, 384, 768, 1536, 3072], lhI = 1;
  function lhTab(){ var L = [{ n: 6, s: 1 }]; for(var i = 1; i < LH_N.length; i++){ var s = L[i - 1].s, a = Math.sqrt(1 - s * s / 4), g = 1 - a; L.push({ n: LH_N[i], s: Math.sqrt(s * s / 4 + g * g), a: a, g: g, sv: s }); } return L; }
  PROBE.liuhui = function(){
    var b = $("probe");
    b.innerHTML = absatz("lh_erkl") + '<div class="chips" id="lhC"><b>' + esc(t("lh_ecken")) + "</b> " + LH_N.slice(1).map(function(n, i){ return '<button type="button" class="chip" data-i="' + (i + 1) + '">' + n + "</button>"; }).join("") +
      '</div><div class="zwei"><div id="lhSvg"></div><div><ol class="weg" id="lhWeg"></ol></div></div><div class="tabWrap"><table class="tab" id="lhTab"></table></div>' + merkeP("lh_grenze") + absatz("lh_zu");
    b.querySelectorAll("#lhC [data-i]").forEach(function(c){ c.addEventListener("click", function(){ lhI = +c.dataset.i; lhZeichnen(); }); });
    lhZeichnen();
  };
  function lhZeichnen(){
    document.querySelectorAll("#lhC [data-i]").forEach(function(c){ c.setAttribute("aria-pressed", +c.dataset.i === lhI ? "true" : "false"); });
    var L = lhTab(), e = L[lhI], alt = L[lhI - 1], s = svgNeu(320, 320), C = 160, R = 140;
    function vieleck(n, col, sw, fill){ var d = ""; for(var i = 0; i <= Math.min(n, 400); i++){ var w = 2 * Math.PI * i / Math.min(n, 400) - Math.PI / 2; d += (i ? "L" : "M") + (C + R * Math.cos(w)).toFixed(2) + " " + (C + R * Math.sin(w)).toFixed(2); } s.appendChild(el("path", { d: d + "Z", fill: fill || "none", stroke: col, "stroke-width": sw, "stroke-linejoin": "round" })); }
    s.appendChild(el("circle", { cx: C, cy: C, r: R, fill: "#ffffff", stroke: "#1a2233", "stroke-width": 2.4 }));
    vieleck(alt.n, "#b8860b", 2, "rgba(184,134,11,0.10)");
    if(e.n <= 96) vieleck(e.n, "#7c3aed", 2);
    // Ein Abschnitt vergrößert (nur bei kleinen n gut sichtbar): Mitte → halbe Seite → Lücke g
    if(alt.n <= 24){
      var w1 = -Math.PI / 2, w2 = -Math.PI / 2 + 2 * Math.PI / alt.n, P1 = [C + R * Math.cos(w1), C + R * Math.sin(w1)], P2 = [C + R * Math.cos(w2), C + R * Math.sin(w2)], M = [(P1[0] + P2[0]) / 2, (P1[1] + P2[1]) / 2], wm = (w1 + w2) / 2, Q = [C + R * Math.cos(wm), C + R * Math.sin(wm)];
      s.appendChild(el("line", { x1: C, y1: C, x2: Q[0], y2: Q[1], stroke: "#1a2233", "stroke-width": 1.6, "stroke-dasharray": "5 4" }));
      s.appendChild(el("line", { x1: M[0], y1: M[1], x2: Q[0], y2: Q[1], stroke: "#0f766e", "stroke-width": 4 }));
      s.appendChild(el("line", { x1: P1[0], y1: P1[1], x2: Q[0], y2: Q[1], stroke: "#7c3aed", "stroke-width": 4 }));
      schrift(s, (M[0] + Q[0]) / 2 + 10, (M[1] + Q[1]) / 2 + 4, "g", "start", "bt", { fill: "#0f766e" });
      schrift(s, (C + M[0]) / 2 + 8, (C + M[1]) / 2, "a", "start", "bt");
    }
    $("lhSvg").innerHTML = ""; $("lhSvg").appendChild(s);
    $("lhSvg").insertAdjacentHTML("beforeend", '<p class="leg"><span style="color:#b8860b">■ ' + alt.n + " " + esc(t("lh_eck")) + '</span> · <span style="color:#7c3aed">■ ' + e.n + " " + esc(t("lh_eck")) + "</span></p>");
    var h = "<tr><th>n</th><th>sₙ</th><th>A₂ₙ = n · sₙ : 2</th><th>" + esc(t("lh_oben")) + "</th></tr>";
    for(var i = 0; i < L.length - 1; i++){ var A2 = L[i].n * L[i].s / 2, A1 = i ? L[i - 1].n * L[i - 1].s / 2 : 0; h += "<tr" + (i === lhI - 1 ? ' class="an"' : "") + "><td>" + L[i].n + "</td><td>" + bdi(z(L[i].s, 6)) + "</td><td>" + bdi(z(A2, 6)) + "</td><td>" + (i ? bdi(z(2 * A2 - A1, 6)) : "–") + "</td></tr>"; }
    $("lhTab").innerHTML = h;
    $("lhWeg").innerHTML = weg([{ lbl: t("lh_w0", { n: alt.n }) }, "s = " + z(e.sv, 5), { lbl: t("lh_w1") }, "a = √(1 − (s : 2)²) ≈ " + z(e.a, 5), { lbl: t("lh_w2") }, "g = 1 − a ≈ " + z(e.g, 5), { lbl: t("lh_w3", { n: e.n }) }, "s₂ = √((s : 2)² + g²) ≈ " + z(e.s, 5), { lbl: t("lh_w4", { n: e.n }) }, "A = " + alt.n + " · " + z(e.sv, 5) + " : 2 ≈ " + z(alt.n * e.sv / 2, 5)]);
  }
  GEN.liuhui = function(){
    var L = lhTab();
    if(Math.random() < 0.5){ var i = zuf(1, 4), n = L[i].n, sv = Math.round(L[i].s * 10000) / 10000, A = n * sv / 2;
      return { q: t("lh_qA", { n: n, s: z(sv, 4), m: 2 * n }), w: A, tol: 0.0006, l: z(A, 4), weg: [{ lbl: t("lh_wA") }, "A = n · s : 2 = " + n + " · " + z(sv, 4) + " : 2 ≈ " + z(A, 4)] }; }
    var e = L[1];
    return { q: t("lh_qS"), w: e.s, tol: 0.0006, l: z(e.s, 4), weg: ["a = √(1 − 0,5²) = √0,75 ≈ 0,8660", "g = 1 − 0,8660 = 0,1340", "s₁₂ = √(0,5² + 0,1340²) ≈ √0,26795 ≈ 0,5176"].map(function(x){ return komma() ? x : x.replace(/(\d),(\d)/g, "$1.$2"); }) };
  };

  // ===== Sangaku: drei Kreise an einer Geraden =====
  var sg = { a: 9, b: 4 };
  PROBE.sangaku = function(){
    var b = $("probe");
    b.innerHTML = absatz("sg_erkl") + '<label class="reglerZ"><span>R₁ = <b id="sgAz"></b></span><input type="range" id="sgA" min="1" max="16" step="1"></label><label class="reglerZ"><span>R₂ = <b id="sgBz"></b></span><input type="range" id="sgB" min="1" max="16" step="1"></label>' +
      '<div id="sgSvg"></div><ol class="weg" id="sgWeg"></ol>' + merkeP("sg_tipp") + absatz("sg_mehr");
    $("sgA").value = sg.a; $("sgB").value = sg.b;
    $("sgA").addEventListener("input", function(){ sg.a = +this.value; sgZeichnen(); });
    $("sgB").addEventListener("input", function(){ sg.b = +this.value; sgZeichnen(); });
    sgZeichnen();
  };
  function sgZeichnen(){
    var A = sg.a, B = sg.b, d = 2 * Math.sqrt(A * B), r = Math.pow(1 / (1 / Math.sqrt(A) + 1 / Math.sqrt(B)), 2), W = 640, H = 360;
    $("sgAz").textContent = A; $("sgBz").textContent = B;
    var breite = A + d + B, sk = Math.min((W - 80) / breite, (H - 100) / (2 * Math.max(A, B))), y0 = H - 58, x1 = (W - breite * sk) / 2 + A * sk, x2 = x1 + d * sk, xr = x1 + 2 * Math.sqrt(A * r) * sk;
    var s = svgNeu(W, H);
    s.appendChild(el("rect", { x: 4, y: 4, width: W - 8, height: H - 8, rx: 10, fill: "#fbf3e2", stroke: "#78350f", "stroke-width": 8 }));
    s.appendChild(el("line", { x1: 30, y1: y0, x2: W - 30, y2: y0, stroke: "#1a2233", "stroke-width": 2.4 }));
    s.appendChild(el("circle", { cx: x1, cy: y0 - A * sk, r: A * sk, fill: "rgba(124,58,237,0.12)", stroke: "#7c3aed", "stroke-width": 2.6 }));
    s.appendChild(el("circle", { cx: x2, cy: y0 - B * sk, r: B * sk, fill: "rgba(184,134,11,0.14)", stroke: "#b8860b", "stroke-width": 2.6 }));
    s.appendChild(el("circle", { cx: xr, cy: y0 - r * sk, r: r * sk, fill: "rgba(15,118,110,0.18)", stroke: "#0f766e", "stroke-width": 2.6 }));
    // Hilfsdreieck zwischen den Mittelpunkten (Pythagoras)
    var yA = y0 - A * sk, yB = y0 - B * sk;
    s.appendChild(el("path", { d: "M" + x1 + " " + yA + "L" + x2 + " " + yB + "L" + (A > B ? x2 : x1) + " " + (A > B ? yA : yB) + "Z", fill: "none", stroke: "#1a2233", "stroke-width": 1.4, "stroke-dasharray": "5 4" }));
    [[x1, yA], [x2, yB], [xr, y0 - r * sk]].forEach(function(p){ s.appendChild(el("circle", { cx: p[0], cy: p[1], r: 3, fill: "#1a2233" })); });
    pfeil(s, x1, y0 + 16, x2, y0 + 16, "#1a2233", true); schrift(s, (x1 + x2) / 2, y0 + 32, "d = 2 · √(R₁ · R₂)", "middle", "bk-klein");
    schrift(s, x1, yA - 8, "R₁", "middle", "bt", { fill: "#5b21b6" }); schrift(s, x2, yB - 8, "R₂", "middle", "bt", { fill: "#8a5a00" }); schrift(s, xr, y0 - 2 * r * sk - 6, "r", "middle", "bt", { fill: "#0f766e" });
    $("sgSvg").innerHTML = ""; $("sgSvg").appendChild(s);
    $("sgWeg").innerHTML = weg([{ lbl: t("sg_w1") }, "d² = (R₁ + R₂)² − (R₁ − R₂)² = 4 · R₁ · R₂", "d = 2 · √(" + A + " · " + B + ") ≈ " + z(d, 3), { lbl: t("sg_w2") }, "2 · √(R₁ · r) + 2 · √(R₂ · r) = 2 · √(R₁ · R₂)", { lbl: t("sg_w3") }, "1 : √r = 1 : √R₁ + 1 : √R₂", "1 : √r = 1 : √" + A + " + 1 : √" + B + " ≈ " + z(1 / Math.sqrt(r), 4), "r ≈ " + z(r, 3)]);
  }
  GEN.sangaku = function(){
    var a = zuf(1, 6), b; do { b = zuf(1, 6); } while(b === a);
    if(Math.random() < 0.35) return { q: t("sg_qd", { A: a * a, B: b * b }), w: 2 * a * b, tol: 0.01, l: String(2 * a * b), weg: ["d = 2 · √(R₁ · R₂)", "d = 2 · √(" + a * a + " · " + b * b + ") = 2 · " + a * b + " = " + 2 * a * b] };
    var sr = a * b / (a + b), r = sr * sr;
    return { q: t("sg_q", { A: a * a, B: b * b }), w: Math.round(r * 100) / 100, tol: 0.011, l: z(r, 2), weg: ["1 : √r = 1 : √R₁ + 1 : √R₂", "1 : √r = 1 : " + a + " + 1 : " + b + " = " + (a + b) + " : " + a * b, "√r = " + a * b + " : " + (a + b) + " ≈ " + z(sr, 4), "r ≈ " + z(r, 2)] };
  };

  // ===== Ada Lovelace: Programm auf Lochkarten =====
  var AL_P = [
    { v: function(n){ return [1, 0, n]; }, k: [["V2", "V2 + V1"], ["V1", "V1 + 2"], ["V3", "V3 − 1"], ["?"]] },
    { v: function(n){ return [1, 0, n]; }, k: [["V2", "V2 + V1"], ["V1", "V1 + 1"], ["V3", "V3 − 1"], ["?"]] },
    { v: function(n){ return [0, 1, n]; }, k: [["V2", "V2 + V2"], ["V3", "V3 − 1"], ["?"]] }
  ];
  var al = { p: 0, n: 5, V: null, z: 0, fertig: false, log: [] };
  function alReset(){ al.V = AL_P[al.p].v(al.n); al.z = 0; al.fertig = false; al.log = []; }
  function alSchritt(){
    if(al.fertig) return;
    var K = AL_P[al.p].k, c = K[al.z], V = al.V;
    if(c[0] === "?"){ if(V[2] > 0) al.z = 0; else { al.fertig = true; } al.log.push(V[1]); return; }
    var i = +c[0][1] - 1, ausdr = c[1].split(" "), x = V[+ausdr[0][1] - 1], y = ausdr[2][0] === "V" ? V[+ausdr[2][1] - 1] : +ausdr[2];
    V[i] = ausdr[1] === "+" ? x + y : x - y; al.z++;
  }
  PROBE.lovelace = function(){
    var b = $("probe");
    b.innerHTML = absatz("al_erkl") + '<div class="chips" id="alP"><b>' + esc(t("al_prog")) + "</b> " + tA("al_progs").map(function(x, i){ return '<button type="button" class="chip" data-p="' + i + '">' + esc(x) + "</button>"; }).join("") + "</div>" +
      '<label class="reglerZ"><span>' + esc(t("al_runden")) + ' <b id="alNz"></b></span><input type="range" id="alN" min="1" max="10" step="1"></label>' +
      '<div class="zwei"><div id="alKarten"></div><div><div id="alSpeicher"></div><p class="zeile" id="alLog"></p></div></div>' +
      '<p><button type="button" class="knopf" id="alS">' + esc(t("al_schritt")) + '</button> <button type="button" class="knopf hell" id="alE">' + esc(t("al_ende")) + '</button> <button type="button" class="knopf hell" id="alR">' + esc(t("al_neu")) + "</button></p>" +
      merkeP("al_schleife") + absatz("al_musik");
    b.querySelectorAll("#alP [data-p]").forEach(function(c){ c.addEventListener("click", function(){ al.p = +c.dataset.p; alReset(); alZeichnen(); }); });
    $("alN").value = al.n; $("alN").addEventListener("input", function(){ al.n = +this.value; alReset(); alZeichnen(); });
    $("alS").addEventListener("click", function(){ alSchritt(); alZeichnen(); });
    $("alE").addEventListener("click", function(){ var g = 0; while(!al.fertig && g++ < 500) alSchritt(); alZeichnen(); });
    $("alR").addEventListener("click", function(){ alReset(); alZeichnen(); });
    if(!al.V) alReset(); alZeichnen();
  };
  function alZeichnen(){
    document.querySelectorAll("#alP [data-p]").forEach(function(c){ c.setAttribute("aria-pressed", +c.dataset.p === al.p ? "true" : "false"); });
    $("alNz").textContent = al.n;
    var K = AL_P[al.p].k;
    $("alKarten").innerHTML = '<p class="zeile"><b>' + esc(t("al_karten")) + "</b></p>" + K.map(function(c, i){
      var txt = c[0] === "?" ? t("al_wenn") : c[0] + " = " + c[1];
      return '<div class="alKarte' + (i === al.z && !al.fertig ? " an" : "") + '" dir="ltr"><span class="alNr">' + (i + 1) + "</span>" + esc(txt) + '<span class="alLoch"></span></div>';
    }).join("");
    $("alSpeicher").innerHTML = '<p class="zeile"><b>' + esc(t("al_speicher")) + '</b></p><div class="alV" dir="ltr">' + al.V.map(function(v, i){ return '<div class="alSp"><span>V' + (i + 1) + "</span><b>" + v + "</b><i>" + esc(tA("al_vn" + al.p)[i]) + "</i></div>"; }).join("") + "</div>";
    $("alLog").innerHTML = (al.log.length ? "<b>" + esc(t("al_log")) + "</b> " + bdi(al.log.join(", ")) : "") + (al.fertig ? '<br><span class="gut">' + esc(t("al_fertig" + al.p, { n: al.n, w: al.V[1] })) + "</span>" : "");
    $("alS").disabled = al.fertig;
  }
  GEN.lovelace = function(){
    var p = zuf(0, 2), n = p === 2 ? zuf(3, 10) : zuf(3, 12), w = p === 0 ? n * n : p === 1 ? n * (n + 1) / 2 : Math.pow(2, n), L = [], V = AL_P[p].v(n);
    for(var k = 0; k < n; k++){ if(p === 2) V[1] *= 2; else { V[1] += V[0]; V[0] += p === 0 ? 2 : 1; } L.push(V[1]); }
    var weg1 = p === 0 ? "1 + 3 + 5 + … = " + n + "² = " + w : p === 1 ? "1 + 2 + … + " + n + " = " + n + " · " + (n + 1) + " : 2 = " + w : "2" + hoch(n) + " = " + w;
    return { q: t("al_q", { p: tA("al_progs")[p], n: n }), w: w, tol: 0, l: gz(w), weg: [{ lbl: t("al_log") }, L.join(", "), weg1] };
  };

  // ===== Galilei: die Fallrinne =====
  var gr = { w: 8, an: null, klang: true }, _gaAlt = PROBE.galilei;
  PROBE.galilei = function(){
    _gaAlt();
    $("probe").insertAdjacentHTML("beforeend", karteH("ga_r_h") + absatz("ga_r_erkl") + '<label class="reglerZ"><span>' + esc(t("ga_r_w")) + ' <b id="grWz"></b></span><input type="range" id="grW" min="2" max="30" step="1"></label>' +
      '<p><button type="button" class="knopf" id="grLos">' + esc(t("ga_r_los")) + '</button> <label class="chk"><input type="checkbox" id="grTon"> ' + esc(t("ga_r_ton")) + '</label></p><div id="grSvg"></div><div class="tabWrap"><table class="tab" id="grTab"></table></div>' + merkeP("ga_r_uhr"));
    $("grW").value = gr.w; $("grW").addEventListener("input", function(){ gr.w = +this.value; if(gr.an){ cancelAnimationFrame(gr.an); gr.an = null; } grZeichnen(0, -1); });
    $("grTon").checked = gr.klang; $("grTon").addEventListener("change", function(){ gr.klang = this.checked; });
    $("grLos").addEventListener("click", grStart);
    grZeichnen(0, -1); grTabelle();
  };
  var grAudio = null;
  function grDing(){ if(!gr.klang) return; try { grAudio = grAudio || new (window.AudioContext || window.webkitAudioContext)(); var o = grAudio.createOscillator(), g = grAudio.createGain(); o.frequency.value = 1320; o.type = "sine"; g.gain.setValueAtTime(0.25, grAudio.currentTime); g.gain.exponentialRampToValueAtTime(0.001, grAudio.currentTime + 0.5); o.connect(g); g.connect(grAudio.destination); o.start(); o.stop(grAudio.currentTime + 0.5); } catch(x){} }
  function grT(){ var a = 9.81 * Math.sin(gr.w * Math.PI / 180) * 5 / 7; return Math.sqrt(2 * 5 / a); }
  function grStart(){
    if(gr.an) cancelAnimationFrame(gr.an);
    // Ton gleich beim Klick vorbereiten (sonst kommt der erste Klang am Handy verspätet)
    if(gr.klang){ try { grAudio = grAudio || new (window.AudioContext || window.webkitAudioContext)(); if(grAudio.resume) grAudio.resume(); } catch(x){} }
    var T = grT(), t0 = performance.now(), k = 0;
    (function bild(){
      var tt = (performance.now() - t0) / 1000, q = Math.min(1, tt / T), kk = Math.floor(q * 5 + 1e-9);
      while(k < kk){ k++; grDing(); }
      grZeichnen(q, k);
      if(q < 1) gr.an = requestAnimationFrame(bild); else gr.an = null;
    })();
  }
  function grZeichnen(q, k){
    var W = 640, w = gr.w * Math.PI / 180, wz = Math.max(w, 6 * Math.PI / 180), L = 540, x0 = 50, y0 = 56, H = Math.round(y0 + L * Math.sin(wz) + 34), s = svgNeu(W, H);
    $("grWz").textContent = gr.w + "°";
    var ex = x0 + L * Math.cos(wz), ey = y0 + L * Math.sin(wz);
    s.appendChild(el("rect", { x: 0, y: 0, width: W, height: H, rx: 12, fill: "#fbf6ea" }));
    s.appendChild(el("path", { d: "M" + x0 + " " + y0 + "L" + ex + " " + ey + "L" + x0 + " " + ey + "Z", fill: "#e7d3a8", stroke: "#8a6d3b", "stroke-width": 2 }));
    s.appendChild(el("line", { x1: x0, y1: y0, x2: ex, y2: ey, stroke: "#5b3a1e", "stroke-width": 5, "stroke-linecap": "round" }));
    for(var i = 1; i <= 5; i++){
      var f = i * i / 25, bx = x0 + f * L * Math.cos(wz), by = y0 + f * L * Math.sin(wz), an = i <= k;
      s.appendChild(el("line", { x1: bx, y1: by, x2: bx - 16 * Math.sin(wz), y2: by - 16 * Math.cos(wz), stroke: "#1a2233", "stroke-width": 1.6 }));
      s.appendChild(el("path", { d: "M" + (bx - 16 * Math.sin(wz) - 9) + " " + (by - 16 * Math.cos(wz)) + "q9 -16 18 0z", fill: an ? "#facc15" : "#d6d3d1", stroke: "#1a2233", "stroke-width": 1.4 }));
      schrift(s, bx - 30 * Math.sin(wz), by - 30 * Math.cos(wz) - 4, i * i + "", "middle", "bk-klein", { fill: "#7c2d12" });
      if(i > 1){ var f0 = (i - 1) * (i - 1) / 25, mx = x0 + (f + f0) / 2 * L * Math.cos(wz), my = y0 + (f + f0) / 2 * L * Math.sin(wz); schrift(s, mx + 12 * Math.sin(wz), my + 12 * Math.cos(wz) + 12, "+" + (2 * i - 1), "middle", "bk-klein", { fill: "#7c3aed" }); }
    }
    schrift(s, x0 + 0.02 * L * Math.cos(wz) + 12 * Math.sin(wz), y0 + 0.02 * L * Math.sin(wz) + 22, "+1", "start", "bk-klein", { fill: "#7c3aed" });
    var bq = Math.max(0, q) * Math.max(0, q), cx = x0 + bq * L * Math.cos(wz) - 10 * Math.sin(wz), cy = y0 + bq * L * Math.sin(wz) - 10 * Math.cos(wz);
    s.appendChild(el("circle", { cx: cx, cy: cy, r: 10, fill: "#1565c0", stroke: "#0b3d91", "stroke-width": 2 }));
    // Neigungswinkel unten zwischen Boden und Rinne (Bogen im Uhrzeigersinn von der Bodenlinie zur Rinne)
    var rB = 70;
    s.appendChild(el("path", { d: "M" + ex + " " + ey + "L" + (ex - rB) + " " + ey + "A" + rB + " " + rB + " 0 0 1 " + (ex - rB * Math.cos(wz)) + " " + (ey - rB * Math.sin(wz)) + "Z", fill: "rgba(124,58,237,.15)", stroke: "#7c3aed", "stroke-width": 2 }));
    schrift(s, ex - rB * 0.62, ey + 24, gr.w + "°", "middle", "bk-klein", { fill: "#5b21b6" });
    $("grSvg").innerHTML = ""; $("grSvg").appendChild(s);
    if(w < 6 * Math.PI / 180) $("grSvg").insertAdjacentHTML("beforeend", '<p class="leg muted">' + esc(t("ga_r_flach")) + "</p>");
    var T = grT(); $("grSvg").insertAdjacentHTML("beforeend", '<p class="leg">' + esc(t("ga_r_zeit", { T: z(T, 2), d: z(T / 5, 2) })) + "</p>");
  }
  function grTabelle(){
    var h = "<tr><th>" + esc(t("ga_r_tk")) + "</th><th>" + esc(t("ga_r_ts")) + "</th><th>" + esc(t("ga_r_tg")) + "</th></tr>";
    for(var i = 1; i <= 5; i++) h += "<tr><td>" + i + "</td><td>" + (2 * i - 1) + "</td><td>" + i * i + "</td></tr>";
    $("grTab").innerHTML = h;
  }

  // ---------- Runde 7: Die Jagd nach π, riesige Primzahlen ----------
  P.push({ k: "pijagd", p: "pj", sym: "π…", col: "#4338ca", leg: "piN piK pi approx", link: [["beruehmt/#archimedes", "a_name"], ["beruehmt/#liuhui", "lh_name"], ["beruehmt/#buffon", "bu_name"]] });
  P.push({ k: "primzahlen", p: "pr", sym: "2ᵖ−1", col: "#0f766e", leg: "prP prM prS", link: [["teilbarkeit/#sieb", "e_l2"], ["beruehmt/#eratosthenes", "e_name"]] });
  var PI_STR = "3.14159265358979323846264338327950288419716939937510";
  function piStellen(x){ var s = x.toFixed(15), n = 0; for(var i = 0; i < s.length && s[i] === PI_STR[i]; i++) if(s[i] !== ".") n++; return Math.max(0, n - 1); }

  // ===== Die Jagd nach π =====
  // [Jahr (negativ = v. Chr.), Wert, richtige Nachkommastellen]
  var PJ_ZEIT = [[-1800, "25/8 = 3,125", "1"], [-1650, "256/81 ≈ 3,16", "1"], [-250, "3,1408 < π < 3,1429", "2"], [263, "3,1416", "4"], [480, "355/113 ≈ 3,1415929", "6"], [1400, "3,14159265359", "11"], [1424, "3,1415926535897932", "16"], [1610, "3,14159265358979323846…", "35"], [1706, "3,14159…", "100"], [1949, "3,14159…", "2037"], [2025, "3,14159…", ""]];
  var pj = { mod: 0, n: 0, k: 0, P: [], reihe: 0, t: 20 };
  PROBE.pijagd = function(){
    var b = $("probe");
    b.innerHTML = '<div class="chips" id="pjMod">' + tA("pj_modi").map(function(x, i){ return '<button type="button" class="chip" data-m="' + i + '">' + esc(x) + "</button>"; }).join("") + '</div><div id="pjBox"></div>';
    b.querySelectorAll("#pjMod [data-m]").forEach(function(c){ c.addEventListener("click", function(){ pj.mod = +c.dataset.m; pjAufbau(); }); });
    pjAufbau();
  };
  function pjAufbau(){
    document.querySelectorAll("#pjMod [data-m]").forEach(function(c){ c.setAttribute("aria-pressed", +c.dataset.m === pj.mod ? "true" : "false"); });
    var B = $("pjBox");
    if(pj.mod === 0){
      var W = tA("pj_wer"), J = tA("pj_wie");
      B.innerHTML = absatz("pj_zeit_erkl") + '<div class="tabWrap"><table class="tab pjTab"><tr><th>' + esc(t("pj_jahr")) + "</th><th>" + esc(t("pj_wer_h")) + "</th><th>" + esc(t("pj_wert")) + "</th><th>" + esc(t("pj_richtig")) + "</th></tr>" +
        PJ_ZEIT.map(function(z2, i){ var jahr = z2[0] < 0 ? t("pj_vchr", { j: -z2[0] }) : String(z2[0]), wert = komma() ? z2[1] : z2[1].replace(/(\d),(\d)/g, "$1.$2"); return "<tr><td>" + esc(jahr) + "</td><td><b>" + esc(W[i] || "") + '</b><br><span class="muted">' + esc(J[i] || "") + "</span></td><td>" + bdi(esc(wert)) + "</td><td>" + esc(z2[2] ? gz(+z2[2]) : t("pj_rek_zahl")) + "</td></tr>"; }).join("") + "</table></div>" + merkeP("pj_zeit_fazit");
    } else if(pj.mod === 1){
      B.innerHTML = absatz("pj_mc_erkl") + '<p class="zeile">' + [10, 100, 1000, 10000].map(function(n){ return '<button type="button" class="chip" data-n="' + n + '">+' + gz(n) + "</button>"; }).join("") + ' <button type="button" class="knopf hell" id="pjR">' + esc(t("bu_reset")) + '</button></p><div class="zwei"><div id="pjSvg"></div><div><ol class="weg" id="pjWeg"></ol><p class="zeile" id="pjErg"></p></div></div>' + merkeP("pj_mc_warum");
      B.querySelectorAll("[data-n]").forEach(function(c){ c.addEventListener("click", function(){ pjWerfen(+c.dataset.n); }); });
      $("pjR").addEventListener("click", function(){ pj.n = 0; pj.k = 0; pj.P = []; pjMc(); });
      pjMc();
    } else {
      B.innerHTML = absatz("pj_r_erkl") + '<div class="chips" id="pjR2">' + tA("pj_reihen").map(function(x, i){ return '<button type="button" class="chip" data-r="' + i + '">' + esc(x) + "</button>"; }).join("") + '</div><p class="pjFormel" id="pjF" dir="ltr"></p><label class="reglerZ"><span>' + esc(t("pj_glieder")) + ' <b id="pjTz"></b></span><input type="range" id="pjT" min="1" max="200" step="1"></label><div id="pjKurve"></div><ol class="weg" id="pjRW"></ol><p class="zeile" id="pjRE"></p>' + merkeP("pj_r_heute");
      B.querySelectorAll("#pjR2 [data-r]").forEach(function(c){ c.addEventListener("click", function(){ pj.reihe = +c.dataset.r; pjReihe(); }); });
      $("pjT").value = pj.t; $("pjT").addEventListener("input", function(){ pj.t = +this.value; pjReihe(); });
      pjReihe();
    }
  }
  function pjWerfen(a){ for(var i = 0; i < a; i++){ var x = Math.random(), y = Math.random(), d = x * x + y * y <= 1; pj.n++; if(d) pj.k++; pj.P.push([x, y, d]); if(pj.P.length > 3000) pj.P.shift(); } pjMc(); }
  function pjMc(){
    var S = 300, s = svgNeu(S + 20, S + 20), o = 10;
    s.appendChild(el("rect", { x: o, y: o, width: S, height: S, fill: "#f8fafc", stroke: "#1a2233", "stroke-width": 2 }));
    s.appendChild(el("path", { d: "M" + o + " " + o + "A" + S + " " + S + " 0 0 1 " + (o + S) + " " + (o + S) + "L" + o + " " + (o + S) + "Z", fill: "rgba(124,58,237,0.12)", stroke: "#7c3aed", "stroke-width": 2 }));
    pj.P.forEach(function(p){ s.appendChild(el("circle", { cx: o + p[0] * S, cy: o + S - p[1] * S, r: 1.8, fill: p[2] ? "#7c3aed" : "#b8860b" })); });
    $("pjSvg").innerHTML = ""; $("pjSvg").appendChild(s);
    $("pjSvg").insertAdjacentHTML("beforeend", '<p class="leg"><span style="color:#7c3aed">● ' + esc(t("pj_innen")) + '</span> · <span style="color:#b8860b">● ' + esc(t("pj_aussen")) + "</span></p>");
    $("pjWeg").innerHTML = pj.n ? weg([{ lbl: t("pj_mc_w1") }, "k : n = π : 4", { lbl: t("pj_mc_w2") }, "π ≈ 4 · k : n", "π ≈ 4 · " + gz(pj.k) + " : " + gz(pj.n), "π ≈ " + z(4 * pj.k / pj.n, 4)]) : "";
    $("pjErg").textContent = pj.n ? t("pj_stellen", { n: piStellen(4 * pj.k / pj.n) }) : t("pj_mc_leer");
  }
  function pjSumme(r, n){
    var s = 0, i, L = [];
    if(r === 0){ for(i = 0; i < n; i++){ s += (i % 2 ? -1 : 1) / (2 * i + 1); L.push(4 * s); } }
    else if(r === 1){ s = 3; for(i = 0; i < n; i++){ var a = 2 * i + 2; s += (i % 2 ? -4 : 4) / (a * (a + 1) * (a + 2)); L.push(s); } }
    else { s = 1; for(i = 1; i <= n; i++){ s *= (4 * i * i) / (4 * i * i - 1); L.push(2 * s); } }
    return L;
  }
  function pjReihe(){
    document.querySelectorAll("#pjR2 [data-r]").forEach(function(c){ c.setAttribute("aria-pressed", +c.dataset.r === pj.reihe ? "true" : "false"); });
    var r = pj.reihe, n = pj.t, L = pjSumme(r, n), v = L[n - 1];
    $("pjTz").textContent = n;
    $("pjF").textContent = ["π : 4 = 1 − 1/3 + 1/5 − 1/7 + …", "π = 3 + 4/(2·3·4) − 4/(4·5·6) + 4/(6·7·8) − …", "π : 2 = (2/1 · 2/3) · (4/3 · 4/5) · (6/5 · 6/7) · …"][r];
    var W = 620, H = 200, s = svgNeu(W, H), lo = 2.6, hi = 3.7, sx = (W - 50) / Math.max(n, 2), sy = function(y){ return H - 20 - (Math.max(lo, Math.min(hi, y)) - lo) / (hi - lo) * (H - 40); };
    s.appendChild(el("rect", { x: 0, y: 0, width: W, height: H, rx: 10, fill: "#f8fafc" }));
    s.appendChild(el("line", { x1: 40, y1: sy(Math.PI), x2: W - 6, y2: sy(Math.PI), stroke: "#0f766e", "stroke-width": 2, "stroke-dasharray": "6 4" }));
    schrift(s, 34, sy(Math.PI) + 4, "π", "end", "bt", { fill: "#0f766e" });
    s.appendChild(el("polyline", { points: L.map(function(y, i){ return (40 + (i + 1) * sx).toFixed(1) + "," + sy(y).toFixed(1); }).join(" "), fill: "none", stroke: "#7c3aed", "stroke-width": 2.2 }));
    [3, 3.5].forEach(function(y){ schrift(s, 34, sy(y) + 4, z(y, 1), "end", "bk-klein"); });
    $("pjKurve").innerHTML = ""; $("pjKurve").appendChild(s);
    var weg1 = r === 0 ? ["S = 1 − 1/3 + 1/5 − …", "S ≈ " + z(L[n - 1] / 4, 8), "π ≈ 4 · S", "π ≈ " + z(v, 8)] : ["π ≈ " + z(v, 8)];
    $("pjRW").innerHTML = weg([{ lbl: t("pj_nach", { n: n }) }].concat(weg1));
    $("pjRE").textContent = t("pj_stellen", { n: piStellen(v) }) + " " + t("pj_r_hinweis" + r);
  }
  GEN.pijagd = function(){
    if(Math.random() < 0.5){ var n = zuf(2, 20) * 50, k = Math.round(n * Math.PI / 4 * (1 + (Math.random() - 0.5) * 0.04)), v = Math.round(4 * k / n * 100) / 100;
      return { q: t("pj_qMC", { n: gz(n), k: gz(k) }), w: v, tol: 0.011, l: z(v, 2), weg: ["π ≈ 4 · k : n", "π ≈ 4 · " + gz(k) + " : " + gz(n), "π ≈ " + z(4 * k / n, 4)] }; }
    var g = zuf(3, 5), L = [], s = 0; for(var i = 0; i < g; i++){ s += (i % 2 ? -1 : 1) / (2 * i + 1); L.push((i ? (i % 2 ? " − " : " + ") : "") + "1/" + (2 * i + 1)); }
    var w = Math.round(4 * s * 1000) / 1000;
    return { q: t("pj_qL", { g: g, s: L.join("").replace(/^1\/1/, "1") }), w: w, tol: 0.0011, l: z(w, 3), weg: ["S = " + L.join("").replace(/^1\/1/, "1"), "S ≈ " + z(s, 5), "π ≈ 4 · S", "π ≈ " + z(4 * s, 3)] };
  };

  // ===== Riesige Primzahlen =====
  var PR_P = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 61, 67, 89, 107, 127];
  var pr = { eu: [2, 3, 5], p: 13 };
  function prFaktoren(n){ var f = [], d = 2; while(d * d <= n){ while(n % d === 0){ f.push(d); n /= d; } d++; } if(n > 1) f.push(n); return f; }
  PROBE.primzahlen = function(){
    var b = $("probe"), PE = [2, 3, 5, 7, 11, 13, 17];
    b.innerHTML = karteH("pr_eu_h") + absatz("pr_eu_erkl") + '<div class="chips" id="prEu">' + PE.map(function(p){ return '<button type="button" class="chip" data-p="' + p + '">' + p + "</button>"; }).join("") + '</div><ol class="weg" id="prEuW"></ol><p class="zeile" id="prEuE"></p>' +
      karteH("pr_me_h") + absatz("pr_me_erkl") + '<div class="chips" id="prMe"><b>p:</b> ' + PR_P.map(function(p){ return '<button type="button" class="chip" data-p="' + p + '">' + p + "</button>"; }).join("") + '</div><div id="prZahl"></div><div class="tabWrap"><table class="tab" id="prLL"></table></div><p class="zeile" id="prLLE"></p>' + merkeP("pr_ll_info") +
      karteH("pr_rek_h") + absatz("pr_rek") + '<div id="prRek"></div>' + merkeP("pr_wozu");
    b.querySelectorAll("#prEu [data-p]").forEach(function(c){ c.addEventListener("click", function(){ var p = +c.dataset.p, i = pr.eu.indexOf(p); if(i >= 0){ if(pr.eu.length > 1) pr.eu.splice(i, 1); } else pr.eu.push(p); pr.eu.sort(function(a, b2){ return a - b2; }); prEuklid(); }); });
    b.querySelectorAll("#prMe [data-p]").forEach(function(c){ c.addEventListener("click", function(){ pr.p = +c.dataset.p; prMersenne(); }); });
    prEuklid(); prMersenne(); prRekord();
  };
  function prEuklid(){
    document.querySelectorAll("#prEu [data-p]").forEach(function(c){ c.setAttribute("aria-pressed", pr.eu.indexOf(+c.dataset.p) >= 0 ? "true" : "false"); });
    var prod = pr.eu.reduce(function(a, b2){ return a * b2; }, 1), N = prod + 1, F = prFaktoren(N);
    $("prEuW").innerHTML = weg([pr.eu.join(" · ") + " = " + gz(prod), gz(prod) + " + 1 = " + gz(N), { lbl: F.length === 1 ? t("pr_eu_prim", { n: gz(N) }) : t("pr_eu_zerl", { n: gz(N) }) }].concat(F.length > 1 ? [gz(N) + " = " + F.map(gz).join(" · ")] : []));
    $("prEuE").textContent = t("pr_eu_neu", { f: F.filter(function(x, i){ return F.indexOf(x) === i; }).map(gz).join(", ") });
  }
  function prMersenne(){
    document.querySelectorAll("#prMe [data-p]").forEach(function(c){ c.setAttribute("aria-pressed", +c.dataset.p === pr.p ? "true" : "false"); });
    var p = pr.p, M = (1n << BigInt(p)) - 1n, ds = M.toString(), bin = "1".repeat(p);
    $("prZahl").innerHTML = '<p class="zeile" dir="ltr"><b>M' + hochTief(p) + " = 2" + hoch(p) + " − 1</b></p>" +
      '<p class="prZiffern" dir="ltr">' + esc(ds.length > 60 ? ds.slice(0, 30) + " … " + ds.slice(-20) : ds) + '</p><p class="zeile muted">' + esc(t("pr_stellen", { n: ds.length })) + " · " + esc(t("pr_binaer")) + ' <span class="prBin" dir="ltr">' + esc(bin.length > 60 ? bin.slice(0, 60) + "…" : bin) + "</span></p>";
    var L = [], s = 4n, rows = "";
    if(p === 2){ $("prLL").innerHTML = ""; $("prLLE").className = "zeile gut"; $("prLLE").textContent = t("pr_ll_2"); return; }
    for(var k = 1; k <= p - 2; k++){ s = (s * s - 2n) % M; L.push(s); }
    var zeig = function(v){ var st = v.toString(); return st.length > 24 ? st.slice(0, 10) + "…" + st.slice(-8) : st.length > 15 ? st : gz(Number(st)); };
    rows = "<tr><th>k</th><th>sₖ</th></tr><tr><td>0</td><td>4</td></tr>";
    L.forEach(function(v, i){ if(i < 6 || i >= L.length - 3){ rows += "<tr" + (i === L.length - 1 ? ' class="an"' : "") + "><td>" + (i + 1) + "</td><td dir=\"ltr\">" + esc(zeig(v)) + "</td></tr>"; } else if(i === 6) rows += "<tr><td>…</td><td>…</td></tr>"; });
    $("prLL").innerHTML = rows;
    var prim = L[L.length - 1] === 0n, e = $("prLLE");
    if(prim){ e.className = "zeile gut"; e.textContent = t("pr_ll_ja", { f: "2" + hoch(p) + " − 1", k: p - 2 }); }
    else {
      var f = null; if(p < 64){ var Mn = Number(M); for(var d = 2 * p + 1; d * d <= Mn && d < 5e6; d += 2 * p){ if(Mn % d === 0){ f = d; break; } } }
      e.className = "zeile"; e.textContent = t("pr_ll_nein", { f: "2" + hoch(p) + " − 1", p: p, k: p - 2 }) + (f ? " " + t("pr_ll_teiler", { d: gz(f), q: gz(Number(M) / f) }) : "") + (p === 67 ? " " + t("pr_cole") : "");
    }
  }
  function hochTief(n){ return String(n).replace(/\d/g, function(c){ return "₀₁₂₃₄₅₆₇₈₉"[+c]; }); }
  function prRekord(){
    var p = 136279841, st = Math.floor(p * Math.log10(2)) + 1, seiten = Math.round(st / 3000), km = st * 2 / 1e6;
    $("prRek").innerHTML = '<ol class="weg">' + weg([{ lbl: t("pr_rek_w1") }, "M = 2" + hoch(p) + " − 1", { lbl: t("pr_rek_w2") }, gz(p) + " · " + z(0.30103, 5) + " ≈ " + gz(st), { lbl: t("pr_rek_w3") }, gz(st) + " : 3000 ≈ " + gz(seiten), { lbl: t("pr_rek_w4") }, gz(st) + " · 2 mm ≈ " + z(km, 0) + " km"]) + "</ol>";
  }
  GEN.primzahlen = function(){
    var a = zuf(0, 2);
    if(a === 0){ var E = [[2, 3], [2, 3, 5], [2, 3, 5, 7], [2, 3, 5, 7, 11]][zuf(0, 3)], pd = E.reduce(function(x, y){ return x * y; }, 1);
      return { q: t("pr_qE", { l: E.join(" · ") }), w: pd + 1, tol: 0, l: gz(pd + 1), weg: [E.join(" · ") + " = " + gz(pd), gz(pd) + " + 1 = " + gz(pd + 1)] }; }
    if(a === 1){ var p = wahl([3, 5, 7, 11, 13, 17]), M = Math.pow(2, p) - 1;
      return { q: t("pr_qM", { f: "2" + hoch(p) + " − 1" }), w: M, tol: 0, l: gz(M), weg: ["2" + hoch(p) + " = " + gz(M + 1), gz(M + 1) + " − 1 = " + gz(M)] }; }
    var c = wahl([[11, 23, 89], [23, 47, 178481], [29, 233, 2304167]]), Mc = Math.pow(2, c[0]) - 1;
    return { q: t("pr_qT", { f: "2" + hoch(c[0]) + " − 1", M: gz(Mc), d: gz(c[1]) }), w: Mc / c[1], tol: 0, l: gz(Mc / c[1]), weg: ["2" + hoch(c[0]) + " − 1 = " + gz(Mc), gz(Mc) + " : " + gz(c[1]) + " = " + gz(Mc / c[1])] };
  };


  // ===== Euler: Haus vom Nikolaus zum Ausprobieren =====
  var NK_P = [[60, 250], [220, 250], [220, 110], [60, 110], [140, 30]], NK_K = [[0, 1], [1, 2], [2, 3], [3, 0], [0, 2], [1, 3], [3, 4], [2, 4]];
  var nk = { start: -1, cur: -1, used: [], grad: true, loesT: null };
  var _euAlt2 = PROBE.euler;
  PROBE.euler = function(){
    _euAlt2();
    $("probe").insertAdjacentHTML("beforeend", karteH("eu_nk_h") + absatz("eu_nk_anl") + '<p><label class="chk"><input type="checkbox" id="nkG"> ' + esc(t("eu_nk_grad")) + '</label></p><div class="zwei"><div id="nkSvg"></div><div><p class="zeile" id="nkSt"></p><p class="nkSilben" id="nkSil"></p><p><button type="button" class="knopf hell" id="nkNeu">' + esc(t("eu_nk_neu")) + '</button> <button type="button" class="knopf hell" id="nkLoes">' + esc(t("eu_nk_loes")) + "</button></p></div></div>" + merkeP("eu_nk_regel"));
    $("nkG").checked = nk.grad; $("nkG").addEventListener("change", function(){ nk.grad = this.checked; nkZeichnen(); });
    $("nkNeu").addEventListener("click", function(){ nkReset(); nkZeichnen(); });
    $("nkLoes").addEventListener("click", function(){ nkReset(); var W = [0, 1, 2, 3, 0, 2, 4, 3, 1], i = 0; nk.start = nk.cur = 0; nkZeichnen(); nk.loesT = setInterval(function(){ i++; if(i >= W.length || !$("nkSvg")){ clearInterval(nk.loesT); nk.loesT = null; return; } nkSchritt(W[i]); }, 600); });
    nkZeichnen();
  };
  function nkReset(){ if(nk.loesT){ clearInterval(nk.loesT); nk.loesT = null; } nk.start = nk.cur = -1; nk.used = []; }
  function nkKante(a, b){ for(var i = 0; i < NK_K.length; i++){ var k = NK_K[i]; if((k[0] === a && k[1] === b) || (k[0] === b && k[1] === a)) return i; } return -1; }
  function nkSchritt(i){
    if(nk.cur < 0){ nk.start = nk.cur = i; nkZeichnen(); return; }
    var k = nkKante(nk.cur, i); if(k < 0 || nk.used.indexOf(k) >= 0) return;
    nk.used.push(k); nk.cur = i; nkZeichnen();
  }
  function nkZeichnen(){
    var s = svgNeu(280, 290);
    s.appendChild(el("rect", { x: 0, y: 0, width: 280, height: 290, rx: 12, fill: "#fbf6ea" }));
    NK_K.forEach(function(k, i){ var a = NK_P[k[0]], b = NK_P[k[1]], n = nk.used.indexOf(i);
      s.appendChild(el("line", { x1: a[0], y1: a[1], x2: b[0], y2: b[1], stroke: n >= 0 ? "#7c3aed" : "#c9b98f", "stroke-width": n >= 0 ? 6 : 3, "stroke-dasharray": n >= 0 ? "none" : "6 6", "stroke-linecap": "round" }));
      if(n >= 0){ var q = (i === 4 || i === 5) ? 0.3 : 0.5, mx = a[0] + (b[0] - a[0]) * q, my = a[1] + (b[1] - a[1]) * q; s.appendChild(el("circle", { cx: mx, cy: my, r: 10, fill: "#7c3aed" })); schrift(s, mx, my + 4.5, String(n + 1), "middle", "bk-klein", { fill: "#ffffff" }); }
    });
    NK_P.forEach(function(p, i){
      var g = NK_K.filter(function(k){ return k[0] === i || k[1] === i; }).length, frei = nk.cur >= 0 && i !== nk.cur && nkKante(nk.cur, i) >= 0 && nk.used.indexOf(nkKante(nk.cur, i)) < 0;
      var c = el("circle", { cx: p[0], cy: p[1], r: 17, fill: i === nk.cur ? "#7c3aed" : frei ? "#ede9fe" : (nk.grad ? (g % 2 ? "#fde68a" : "#ffffff") : "#ffffff"), stroke: nk.grad && g % 2 ? "#b8860b" : "#1a2233", "stroke-width": frei ? 3.5 : 2.4, "class": "nkEcke" });
      c.style.cursor = "pointer"; c.addEventListener("click", function(){ if(!nk.loesT) nkSchritt(i); }); s.appendChild(c);
      if(nk.grad) schrift(s, p[0], p[1] + 5, String(g), "middle", "bt", { fill: i === nk.cur ? "#ffffff" : "#1a2233", "pointer-events": "none" });
    });
    $("nkSvg").innerHTML = ""; $("nkSvg").appendChild(s);
    var S = tA("eu_nk_silben"); $("nkSil").textContent = nk.used.map(function(k, i){ return S[i]; }).join(" ").replace(/- /g, "-");
    var st = $("nkSt"), offen = NK_K.filter(function(k, i){ return nk.used.indexOf(i) < 0 && (k[0] === nk.cur || k[1] === nk.cur); }).length;
    if(nk.used.length === 8){ st.className = "zeile gut"; st.textContent = t("eu_nk_ok"); if(typeof msRichtig === "function" && !nk.loesT) try { msRichtig(); } catch(x){} }
    else if(nk.cur >= 0 && !offen){ var gs = NK_K.filter(function(k){ return k[0] === nk.start || k[1] === nk.start; }).length; st.className = "zeile schlecht"; st.textContent = t("eu_nk_fest", { n: nk.used.length }) + (gs % 2 ? "" : " " + t("eu_nk_start")); }
    else { st.className = "zeile"; st.textContent = nk.cur < 0 ? t("eu_nk_tipp") : t("eu_nk_stand", { n: nk.used.length }); }
  }
  // ---------- Gleichungen im Fließtext: höchstens ein „=“/„≈“ pro Zeile ----------
  // Enthält ein Absatz (p.zeile, p.merke, p.story, #frage, li …) zwei oder mehr = bzw. ≈, wird jede Formel
  // mit = oder ≈ als eigener Block gesetzt; Ketten (a = b = c) stehen untereinander, am Zeichen ausgerichtet.
  var FZ_REL = /^[=≈]$/;
  var FZ_RE = (function(){
    var opd = "[\\(\\[]*[−-]?(?:√\\(?)?(?:[0-9][0-9,./]*[a-zA-Z]?|[a-zA-Zπφθαβ](?:[₀-₉ₙₖₚ]+|′)?)[²³⁰-⁹ⁿ]*…?[\\)\\]]*[²³]?";
    var num = "[0-9][0-9,./]*";
    return new RegExp("(?<![A-Za-zÀ-ÿА-яЁё0-9])" + opd + "(?:\\s+[=≈<>+−·:/×]\\s+" + opd + "|\\s+" + num + "(?![A-Za-zÀ-ÿА-яЁё]))*(?![A-Za-zÀ-ÿА-яЁё0-9])", "g");
  })();
  function fzHtml(s){
    var teile = [], pos = 0, n = 0, m;
    FZ_RE.lastIndex = 0;
    while((m = FZ_RE.exec(s))){
      var f = m[0].replace(/[.,]$/, ""), r = (f.match(/\s[=≈]\s/g) || []).length;
      if(!r){ if(!m[0].length) FZ_RE.lastIndex++; continue; }
      teile.push({ t: s.slice(pos, m.index) }); teile.push({ f: f }); pos = m.index + f.length; n += r;
    }
    if(n < 2) return null;
    teile.push({ t: s.slice(pos) });
    return teile.map(function(x){
      if(x.t != null){ var t2 = x.t.replace(/^[\s.,;:：。、，،]+/, "").trim(); return t2 ? '<span class="fzT">' + esc(t2) + "</span>" : ""; }
      var Z = x.f.split(/\s(?=[=≈]\s)/);
      return '<span class="fzB" dir="ltr">' + Z.slice(1).map(function(z, i){ return '<span class="fzL">' + (i ? "" : esc(Z[0])) + '</span><span class="fzR">' + esc(z) + "</span>"; }).join("") + "</span>";
    }).join(" ");
  }
  function fzElement(e){
    if(e.children.length || e.dataset.fz === e.textContent) return;
    var h = fzHtml(e.textContent);
    if(h){ e.innerHTML = h; e.classList.add("fzP"); }
    e.dataset.fz = e.textContent;
  }
  function fzAlle(){ document.querySelectorAll("#s_detail p.zeile, #s_detail p.merke, #s_detail p.story, #frage, #s_detail ul.bListe li, #s_detail p.leg").forEach(fzElement); }
  var fzPlan = false;
  new MutationObserver(function(){ if(fzPlan) return; fzPlan = true; requestAnimationFrame(function(){ fzPlan = false; fzAlle(); }); }).observe(document.getElementById("s_detail"), { childList: true, subtree: true, characterData: true });

  // ---------- Runde 8: Eratosthenes (Bibliothek, Weltwunder), Thales im Kreis, Türme von Hanoi, Euklids ggT-Spiel ----------
  var _erAlt8 = PROBE.eratosthenes;
  PROBE.eratosthenes = function(){
    _erAlt8();
    $("probe").insertAdjacentHTML("beforeend", karteH("e_bib_h") + absatz("e_bib") + karteH("e_wunder_h") + absatz("e_wunder_m") +
      '<ol class="bListe">' + tA("e_wunder").map(function(x){ return "<li>" + esc(x) + "</li>"; }).join("") + "</ol>");
  };

  // Thales-Kreis: C auf dem Halbkreis ziehbar; thk.w = Winkel CMB in Grad
  var thk = { w: 120 };
  var _thAlt8 = PROBE.thales;
  PROBE.thales = function(){
    _thAlt8();
    $("probe").insertAdjacentHTML("beforeend", karteH("th_k_h") + absatz("th_k_anl") +
      '<div class="zwei"><div id="thkSvg"></div><div><p class="zeile"><b>' + esc(t("th_k_w")) + ' <bdi id="thkW" dir="ltr"></bdi></b></p><p class="zeile">' + esc(t("th_k_bew")) + '</p><ol class="weg" id="thkWeg"></ol></div></div>' +
      merkeP("th_k_merke") + absatz("th_k_bez"));
    thkZeichnen();
  };
  function thkZeichnen(){
    var box = $("thkSvg"); if(!box) return;
    var W = 440, H = 270, mx = 220, my = 225, r = 180, s = svgNeu(W, H);
    var w = thk.w * Math.PI / 180, A = [mx - r, my], B = [mx + r, my], C = [mx + r * Math.cos(w), my - r * Math.sin(w)], M = [mx, my];
    var al = thk.w / 2, be = 90 - al;
    function ang(P, Q){ return Math.atan2(Q[1] - P[1], Q[0] - P[0]); }
    function keil(P, a1, a2, rad, col){
      var d = a2 - a1; while(d > Math.PI) d -= 2 * Math.PI; while(d < -Math.PI) d += 2 * Math.PI;
      var p1 = [P[0] + rad * Math.cos(a1), P[1] + rad * Math.sin(a1)], p2 = [P[0] + rad * Math.cos(a1 + d), P[1] + rad * Math.sin(a1 + d)];
      s.appendChild(el("path", { d: "M" + P[0] + " " + P[1] + "L" + p1[0].toFixed(1) + " " + p1[1].toFixed(1) + "A" + rad + " " + rad + " 0 0 " + (d > 0 ? 1 : 0) + " " + p2[0].toFixed(1) + " " + p2[1].toFixed(1) + "Z", fill: col, stroke: "#1a2233", "stroke-width": 1 }));
      return a1 + d / 2;
    }
    function lbl(P, mitte, rad, txt, cls){ schrift(s, P[0] + rad * Math.cos(mitte), P[1] + rad * Math.sin(mitte) + 6, txt, "middle", cls || "bk-klein", { style: "font:800 19px system-ui,sans-serif" }); }
    s.appendChild(el("path", { d: "M" + A[0] + " " + my + "A" + r + " " + r + " 0 0 1 " + B[0] + " " + my, fill: "none", stroke: "#94a3b8", "stroke-width": 2, "stroke-dasharray": "6 5" }));
    s.appendChild(el("path", { d: "M" + A.join(" ") + "L" + C[0].toFixed(1) + " " + C[1].toFixed(1) + "L" + B.join(" ") + "Z", fill: "rgba(184,134,11,0.10)", stroke: "#1a2233", "stroke-width": 2.5, "stroke-linejoin": "round" }));
    s.appendChild(el("line", { x1: mx, y1: my, x2: C[0], y2: C[1], stroke: "#7c3aed", "stroke-width": 2, "stroke-dasharray": "5 4" }));
    var FA = "rgba(245,158,11,0.55)", FB = "rgba(167,139,250,0.6)";
    var mA = keil(A, ang(A, B), ang(A, C), 40, FA); lbl(A, mA, 56, "α");
    var mB = keil(B, ang(B, A), ang(B, C), 40, FB); lbl(B, mB, 56, "β");
    var mCa = keil(C, ang(C, A), ang(C, M), 34, FA), mCb = keil(C, ang(C, M), ang(C, B), 34, FB);
    lbl(C, mCa, 48, "α"); lbl(C, mCb, 48, "β");
    s.appendChild(el("circle", { cx: C[0] + 14 * Math.cos(ang(C, M)), cy: C[1] + 14 * Math.sin(ang(C, M)), r: 3, fill: "#1a2233" }));
    [[A, "A", -16, 22], [B, "B", 16, 22], [M, "M", 0, 24]].forEach(function(q){ schrift(s, q[0][0] + q[2], q[0][1] + q[3], q[1], "middle", "bk-klein", { style: "font:800 19px system-ui,sans-serif" }); });
    var cx = C[0] - mx, cy = C[1] - my, cl = Math.hypot(cx, cy) || 1;
    schrift(s, C[0] + cx / cl * 22, C[1] + cy / cl * 22 + 5, "C", "middle", "bk-klein", { style: "font:800 19px system-ui,sans-serif" });
    s.appendChild(el("circle", { cx: C[0], cy: C[1], r: 13, fill: "rgba(124,58,237,0.25)", stroke: "#7c3aed", "stroke-width": 2.5, style: "cursor:grab" }));
    s.style.touchAction = "none";
    box.innerHTML = ""; box.appendChild(s);
    $("thkW").textContent = z(al, 1) + "° + " + z(be, 1) + "° = 90°";
    $("thkWeg").innerHTML = weg(["α + β + (α + β) = 180°", "2 · (α + β) = 180°", "α + β = 90°", "α ≈ " + z(al, 1) + "°", "β ≈ " + z(be, 1) + "°"]);
    var zieh = false;
    function setze(e){ var q = s.getBoundingClientRect(), k = W / q.width, x = (e.clientX - q.left) * k, y = (e.clientY - q.top) * k; var g = Math.atan2(my - y, x - mx) * 180 / Math.PI; if(g < -90) g = 180; thk.w = Math.max(6, Math.min(174, g)); thkZeichnen(); }
    s.addEventListener("pointerdown", function(e){ zieh = true; try { s.setPointerCapture(e.pointerId); } catch(x){} setze(e); });
    s.addEventListener("pointermove", function(e){ if(zieh) setze(e); });
    s.addEventListener("pointerup", function(){ zieh = false; });
  }

  // Türme von Hanoi
  P.push({ k: "hanoi", p: "ha", sym: "2ⁿ−1", col: "#b45309", leg: "haN haZ", link: [["exponential", "link_exp"]] });
  P.push({ k: "euklid", p: "eg", sym: "▯▫", col: "#7c2d12", leg: "egAB", link: [["brueche", "eg_l1"], ["beruehmt/#eratosthenes", "e_name"]] });
  var ha = { n: 4, st: null, sel: -1, z: 0, msg: "", T: null, auto: false };
  function haReset(){ if(ha.T){ clearInterval(ha.T); ha.T = null; } ha.st = [[], [], []]; for(var i = ha.n; i >= 1; i--) ha.st[0].push(i); ha.sel = -1; ha.z = 0; ha.msg = ""; ha.auto = false; ha.gelobt = false; }
  PROBE.hanoi = function(){
    if(!ha.st) haReset();
    var b = $("probe"), T = [];
    for(var n = 1; n <= 10; n++) T.push([n, Math.pow(2, n) - 1]);
    b.innerHTML = absatz("ha_anl") + '<div class="chips" id="haN"><b>' + esc(t("ha_n")) + "</b> " + [3, 4, 5, 6, 7, 8].map(function(n){ return '<button type="button" class="chip" data-n="' + n + '">' + n + "</button>"; }).join("") + "</div>" +
      '<div id="haSvg"></div><p class="zeile" id="haSt"></p><p class="zeile" id="haMsg"></p><p><button type="button" class="knopf hell" id="haNeu">' + esc(t("ha_neu")) + '</button> <button type="button" class="knopf hell" id="haLoes">' + esc(t("ha_loes")) + "</button></p>" +
      karteH("ha_formel_h") + absatz("ha_formel") + '<ol class="weg">' + weg(["Z(1) = 1", "Z(n) = 2 · Z(n − 1) + 1", "Z(n) = 2" + "ⁿ − 1"]) + "</ol>" +
      '<div class="haTabW"><table class="haTab" dir="ltr"><tr><th>' + esc(t("ha_tab")) + "</th>" + T.map(function(r){ return "<td>" + r[0] + "</td>"; }).join("") + "</tr><tr><th>" + esc(t("ha_tabZ")) + "</th>" + T.map(function(r){ return "<td>" + gz(r[1]) + "</td>"; }).join("") + "</tr></table></div>" +
      merkeP("ha_legende");
    b.querySelectorAll("#haN [data-n]").forEach(function(c){ c.addEventListener("click", function(){ ha.n = +c.dataset.n; haReset(); haZeichnen(); }); });
    $("haNeu").addEventListener("click", function(){ haReset(); haZeichnen(); });
    $("haLoes").addEventListener("click", function(){
      haReset(); ha.auto = true; var Z = [];
      (function zug(n, von, nach, frei){ if(!n) return; zug(n - 1, von, frei, nach); Z.push([von, nach]); zug(n - 1, frei, nach, von); })(ha.n, 0, 2, 1);
      var i = 0; haZeichnen();
      ha.T = setInterval(function(){ if(i >= Z.length || !$("haSvg")){ clearInterval(ha.T); ha.T = null; return; } ha.st[Z[i][1]].push(ha.st[Z[i][0]].pop()); ha.z++; i++; haZeichnen(); }, ha.n <= 4 ? 450 : ha.n <= 6 ? 160 : 60);
    });
    haZeichnen();
  };
  function haKlick(p){
    if(ha.T || ha.st[2].length === ha.n) return;
    ha.msg = "";
    if(ha.sel < 0){ if(ha.st[p].length) ha.sel = p; }
    else if(ha.sel === p) ha.sel = -1;
    else {
      var d = ha.st[ha.sel][ha.st[ha.sel].length - 1], oben = ha.st[p][ha.st[p].length - 1];
      if(oben && oben < d) ha.msg = "falsch";
      else { ha.st[p].push(ha.st[ha.sel].pop()); ha.z++; ha.sel = -1; }
    }
    haZeichnen();
  }
  function haZeichnen(){
    var box = $("haSvg"); if(!box) return;
    var W = 600, H = 250, X = [100, 300, 500], yb = 215, dh = Math.min(22, 150 / ha.n), maxB = 180, s = svgNeu(W, H);
    var FARB = ["#f59e0b", "#fb923c", "#a78bfa", "#f472b6", "#2dd4bf", "#facc15", "#c084fc", "#fdba74"];
    s.appendChild(el("rect", { x: 10, y: yb, width: W - 20, height: 14, rx: 5, fill: "#a16207" }));
    X.forEach(function(x, p){
      s.appendChild(el("rect", { x: x - 5, y: 40, width: 10, height: yb - 40, rx: 4, fill: "#78350f" }));
      if(p === 2) s.appendChild(el("text", { x: x, y: 32, "text-anchor": "middle", "class": "bk-klein", "font-weight": 800 }, "★"));
    });
    X.forEach(function(x, p){
      ha.st[p].forEach(function(d, i){
        var weg = p === ha.sel && i === ha.st[p].length - 1, bw = 34 + (maxB - 34) * (d - 1) / Math.max(1, ha.n - 1), y = weg ? 6 : yb - (i + 1) * dh;
        s.appendChild(el("rect", { x: x - bw / 2, y: y, width: bw, height: dh - 2, rx: Math.min(9, dh / 2), fill: FARB[(d - 1) % FARB.length], stroke: "#1a2233", "stroke-width": weg ? 3 : 1.5 }));
        if(dh >= 16) s.appendChild(el("text", { x: x, y: y + dh / 2 + 4, "text-anchor": "middle", "font-size": 12, "font-weight": 800, fill: "#1a2233" }, String(d)));
      });
      var hit = el("rect", { x: x - 100, y: 0, width: 200, height: H, fill: "transparent", style: "cursor:pointer" });
      hit.addEventListener("click", function(){ haKlick(p); }); s.appendChild(hit);
    });
    box.innerHTML = ""; box.appendChild(s);
    var min = Math.pow(2, ha.n) - 1, fertig = ha.st[2].length === ha.n, st = $("haSt"), mg = $("haMsg");
    document.querySelectorAll("#haN [data-n]").forEach(function(c){ c.setAttribute("aria-pressed", +c.dataset.n === ha.n ? "true" : "false"); });
    st.className = "zeile"; st.textContent = t("ha_zuege", { z: ha.z, m: min });
    mg.className = "zeile"; mg.textContent = "";
    if(ha.msg === "falsch"){ mg.className = "zeile schlecht"; mg.textContent = t("ha_falsch"); }
    if(fertig){ mg.className = "zeile gut"; mg.textContent = t(ha.z === min ? "ha_okMin" : "ha_ok", { z: ha.z }); if(!ha.auto && !ha.gelobt){ ha.gelobt = true; if(typeof msRichtig === "function") try { msRichtig(); } catch(x){} } }
  }
  GEN.hanoi = function(){
    if(Math.random() < 0.5){ var n = zuf(3, 12), p = Math.pow(2, n), Z = p - 1; return { q: t("ha_q", { n: n }), w: Z, tol: 0, l: gz(Z), weg: ["Z = 2" + hoch(n) + " − 1", "Z = " + gz(p) + " − 1", "Z = " + gz(Z)] }; }
    var m = zuf(3, 11), Zm = Math.pow(2, m) - 1, Z2 = 2 * Zm + 1;
    return { q: t("ha_q2", { n: m, z: gz(Zm), m: m + 1 }), w: Z2, tol: 0, l: gz(Z2), weg: ["Z(n + 1) = 2 · Z(n) + 1", "Z(" + (m + 1) + ") = 2 · " + gz(Zm) + " + 1", "Z(" + (m + 1) + ") = " + gz(Z2)] };
  };

  // Euklids ggT-Spiel: Rechteck a × b, größte Quadrate abschneiden
  var eg = { a: 21, b: 13, cut: 0 };
  function egPlan(a, b){
    var Q = [], x = 0, y = 0, w = a, h = b, D = [], A = Math.max(a, b), B = Math.min(a, b);
    while(B > 0){ D.push([A, Math.floor(A / B), B, A % B]); var r = A % B; A = B; B = r; }
    var runde = 0, letzt = null;
    while(w > 0 && h > 0){ var sq = Math.min(w, h); if(letzt !== null && sq !== letzt) runde++; letzt = sq; Q.push({ x: x, y: y, s: sq, r: runde }); if(w >= h){ x += h; w -= h; } else { y += w; h -= w; } }
    return { Q: Q, D: D, g: A };
  }
  function ggtWort(){ return t("eg_ggt"); }
  PROBE.euklid = function(){
    var b = $("probe");
    b.innerHTML = absatz("eg_anl") + '<div class="chips"><label>' + esc(t("eg_a")) + ' <input class="zahl egZ" id="egA" inputmode="numeric" maxlength="3" value="' + eg.a + '"></label><label>' + esc(t("eg_b")) + ' <input class="zahl egZ" id="egB" inputmode="numeric" maxlength="3" value="' + eg.b + '"></label>' +
      '<button type="button" class="knopf hell" id="egAll">' + esc(t("eg_alles")) + '</button><button type="button" class="knopf hell" id="egNeu">' + esc(t("eg_neu")) + "</button></div>" +
      '<div id="egSvg"></div><p class="zeile" id="egSt"></p><p class="zeile"><b>' + esc(t("eg_weg_h")) + '</b></p><ol class="weg" id="egWeg"></ol>' + absatz("eg_warum") + merkeP("eg_merke");
    function lies(id, alt){ var v = parseInt($(id).value, 10); return v >= 1 && v <= 300 ? v : alt; }
    $("egA").addEventListener("input", function(){ eg.a = lies("egA", eg.a); eg.cut = 0; egZeichnen(); });
    $("egB").addEventListener("input", function(){ eg.b = lies("egB", eg.b); eg.cut = 0; egZeichnen(); });
    $("egAll").addEventListener("click", function(){ eg.cut = 9999; egZeichnen(); });
    $("egNeu").addEventListener("click", function(){ var g = zuf(2, 12), m = zuf(2, 12), n; do { n = zuf(1, m - 1); } while(ggT(m, n) !== 1); eg.a = g * m; eg.b = g * n; if(Math.random() < 0.5){ var x = eg.a; eg.a = eg.b; eg.b = x; } $("egA").value = eg.a; $("egB").value = eg.b; eg.cut = 0; egZeichnen(); });
    egZeichnen();
  };
  function ggT(a, b){ while(b){ var r = a % b; a = b; b = r; } return a; }
  function egZeichnen(){
    var box = $("egSvg"); if(!box) return;
    var Pl = egPlan(eg.a, eg.b), N = Pl.Q.length, cut = Math.min(eg.cut, N - 1), fertig = cut >= N - 1;
    var k = Math.min(560 / eg.a, 300 / eg.b), W = eg.a * k + 20, H = eg.b * k + 20, s = svgNeu(W, H);
    var FARB = ["#fbbf24", "#a78bfa", "#2dd4bf", "#fb923c", "#f472b6", "#facc15", "#c084fc", "#fdba74"];
    s.appendChild(el("rect", { x: 10, y: 10, width: eg.a * k, height: eg.b * k, fill: "#ffffff", stroke: "#1a2233", "stroke-width": 2 }));
    for(var i = 0; i < cut; i++){ var q = Pl.Q[i]; s.appendChild(el("rect", { x: 10 + q.x * k, y: 10 + q.y * k, width: q.s * k, height: q.s * k, fill: FARB[q.r % FARB.length], stroke: "#1a2233", "stroke-width": 1.5 })); if(q.s * k >= 26) schrift(s, 10 + (q.x + q.s / 2) * k, 10 + (q.y + q.s / 2) * k + 6, String(q.s), "middle", "bk-klein", { "font-weight": 800 }); }
    // Rest-Rechteck
    var R = cut < N ? Pl.Q[cut] : null, rx = R ? R.x : 0, ry = R ? R.y : 0, rw = 0, rh = 0;
    if(R){ var x2 = 0, y2 = 0; for(var j = cut; j < N; j++){ x2 = Math.max(x2, Pl.Q[j].x + Pl.Q[j].s); y2 = Math.max(y2, Pl.Q[j].y + Pl.Q[j].s); } rw = x2 - rx; rh = y2 - ry; }
    if(fertig){ s.appendChild(el("rect", { x: 10 + rx * k, y: 10 + ry * k, width: rw * k, height: rh * k, fill: "rgba(124,58,237,0.35)", stroke: "#5b21b6", "stroke-width": 3.5 })); if(rw * k >= 22) schrift(s, 10 + (rx + rw / 2) * k, 10 + (ry + rh / 2) * k + 6, String(rw), "middle", "bk-klein", { "font-weight": 800 }); }
    else s.appendChild(el("rect", { x: 10 + rx * k, y: 10 + ry * k, width: rw * k, height: rh * k, fill: "none", stroke: "#7c3aed", "stroke-width": 3, "stroke-dasharray": "7 5" }));
    s.style.cursor = fertig ? "default" : "pointer";
    s.addEventListener("click", function(){ if(eg.cut < N - 1){ eg.cut++; egZeichnen(); } });
    box.innerHTML = ""; box.appendChild(s);
    var st = $("egSt");
    if(fertig){ st.className = "zeile gut"; st.textContent = t("eg_fertig", { g: Pl.g, a: eg.a, b: eg.b }); }
    else { st.className = "zeile"; st.textContent = t("eg_stand", { n: cut, x: rw, y: rh }); }
    // Rechnung: Zeile einer Runde erscheint, sobald ihre Quadrate abgeschnitten sind
    var L = [], kum = 0;
    Pl.D.forEach(function(d, i){ kum += d[1]; var schwelle = i === Pl.D.length - 1 ? kum - 1 : kum; if(cut >= schwelle) L.push(d[0] + " = " + d[1] + " · " + d[2] + " + " + d[3]); });
    if(fertig) L.push(ggtWort() + "(" + eg.a + ", " + eg.b + ") = " + Pl.g);
    $("egWeg").innerHTML = weg(L);
  }
  GEN.euklid = function(){
    var g = zuf(2, 15), m = zuf(3, 14), n; do { n = zuf(2, m - 1); } while(ggT(m, n) !== 1);
    var a = g * m, b = g * n, Pl = egPlan(a, b);
    return { q: t("eg_q", { a: a, b: b }), w: g, tol: 0, l: String(g), weg: Pl.D.map(function(d){ return d[0] + " = " + d[1] + " · " + d[2] + " + " + d[3]; }).concat([ggtWort() + "(" + a + ", " + b + ") = " + g]) };
  };

  // ---------- Runde 9: Vitruv-Original, Bematisten, Turingmaschine zum Zuschauen ----------
  var _vAlt9 = PROBE.davinci;
  PROBE.davinci = function(){
    _vAlt9();
    $("probe").insertAdjacentHTML("afterbegin", karteH("v_orig_h") + '<figure class="vOrig"><img src="vitruv-leonardo.webp" width="466" height="453" alt="' + esc(t("v_orig_h")) + '" loading="lazy"><figcaption>' + esc(t("v_orig_q")) + "</figcaption></figure>" + absatz("v_orig"));
  };
  var _erAlt9 = PROBE.eratosthenes;
  PROBE.eratosthenes = function(){
    _erAlt9();
    var h = karteH("e_bema_h") + absatz("e_bema") + merkeP("e_bema_r");
    var bib = Array.prototype.filter.call(document.querySelectorAll("#probe h3.fH"), function(x){ return x.textContent === t("e_bib_h"); })[0];
    if(bib) bib.insertAdjacentHTML("beforebegin", h); else $("probe").insertAdjacentHTML("beforeend", h);
  };

  // Turingmaschine: Programme als Regeltabellen {Zustand: {gelesen: [schreibt, Richtung, neu]}}
  var TV_P = [
    { start: "rechts", R: { A: { "1": ["0", "L", "A"], "0": ["1", "N", "S"], " ": ["1", "N", "S"] } } },
    { start: "links", R: { A: { "0": ["0", "R", "A"], "1": ["1", "R", "A"], " ": ["0", "N", "S"] } } },
    { start: "links", R: { A: { "0": ["1", "R", "A"], "1": ["0", "R", "A"], " ": [" ", "N", "S"] } } }
  ];
  var tv = { p: 0, ein: "1011", band: [], pos: 0, z: "A", n: 0, last: null, T: null, tempo: 600 };
  function tvLaden(){
    if(tv.T){ clearInterval(tv.T); tv.T = null; }
    tv.band = [" "].concat(tv.ein.split("")).concat([" "]); tv.z = "A"; tv.n = 0; tv.last = null;
    tv.pos = TV_P[tv.p].start === "rechts" ? tv.band.length - 2 : 1;
  }
  function tvSchritt(){
    if(tv.z === "S") return;
    var c = tv.band[tv.pos], r = TV_P[tv.p].R[tv.z][c];
    tv.last = { z: tv.z, c: c };
    tv.band[tv.pos] = r[0]; tv.z = r[2]; tv.n++;
    if(r[1] === "L"){ tv.pos--; if(tv.pos < 0){ tv.band.unshift(" "); tv.pos = 0; } }
    else if(r[1] === "R"){ tv.pos++; if(tv.pos >= tv.band.length) tv.band.push(" "); }
    tvZeichnen();
  }
  function tvWert(b){ var s = b.join("").trim(); return s ? parseInt(s, 2) : 0; }
  PROBE.turing = function(){
    var b = $("probe");
    b.innerHTML = karteH("tv_h") + absatz("tv_anl") + '<div class="chips" id="tvProg">' + tA("tv_prog").map(function(x, i){ return '<button type="button" class="chip" data-p="' + i + '">' + esc(x) + "</button>"; }).join("") + "</div>" +
      '<p class="zeile" id="tvInfo"></p><label class="reglerZ"><span>' + esc(t("tu_zahl")) + '</span><input class="zahl" id="tvEin" inputmode="numeric" maxlength="10" style="max-width:160px" data-nofit value="' + esc(tv.ein) + '"></label><p class="zeile muted" id="tvFehl"></p>' +
      '<div id="tvSvg"></div><p><button type="button" class="knopf" id="tvS">' + esc(t("tu_schritt")) + '</button> <button type="button" class="knopf" id="tvA">' + esc(t("tu_auto")) + '</button> <button type="button" class="knopf hell" id="tvR">' + esc(t("tu_reset")) + '</button> <label class="chk">' + esc(t("tv_tempo")) + ' <input type="range" id="tvT" min="0" max="4" step="1" value="2" data-nofit> ' + esc(t("tv_tempo2")) + "</label></p>" +
      '<div class="zwei"><div><table class="tvTab" dir="ltr" id="tvTab"></table></div><div><p class="zeile" id="tvErg"></p></div></div>' +
      '<p class="merke">' + esc(t("tu_bin")) + "</p>" + karteH("tv_mensch_h") + '<table class="tvTab tvM"><tr><th>' + esc(tA("tv_mensch_k")[0]) + "</th><th>" + esc(tA("tv_mensch_k")[1]) + "</th></tr>" +
      tA("tv_mensch").map(function(r){ return "<tr><td>" + esc(r[0]) + "</td><td>" + esc(r[1]) + "</td></tr>"; }).join("") + "</table>" + absatz("tv_uni");
    if(!tv.band.length) tvLaden();
    b.querySelectorAll("#tvProg [data-p]").forEach(function(c){ c.addEventListener("click", function(){ tv.p = +c.dataset.p; tvLaden(); tvZeichnen(); }); });
    $("tvEin").addEventListener("input", function(){ var v = this.value.trim(); if(/^[01]{1,10}$/.test(v)){ $("tvFehl").textContent = ""; tv.ein = v; tvLaden(); tvZeichnen(); } else $("tvFehl").textContent = t("tu_ungueltig"); });
    $("tvS").addEventListener("click", function(){ if(tv.T){ clearInterval(tv.T); tv.T = null; } tvSchritt(); });
    $("tvA").addEventListener("click", function(){ if(tv.T) clearInterval(tv.T); tv.T = setInterval(function(){ if(tv.z === "S" || !$("tvSvg")){ clearInterval(tv.T); tv.T = null; return; } tvSchritt(); }, tv.tempo); });
    $("tvR").addEventListener("click", function(){ tvLaden(); tvZeichnen(); });
    $("tvT").addEventListener("input", function(){ tv.tempo = [1100, 800, 600, 350, 180][+this.value]; if(tv.T){ clearInterval(tv.T); tv.T = null; $("tvA").click(); } });
    tvZeichnen();
  };
  function tvZeichnen(){
    var box = $("tvSvg"); if(!box) return;
    var n = tv.band.length, Z = 46, W = Math.max(560, n * Z + 40), H = 210, x0 = (W - n * Z) / 2, y0 = 110, s = svgNeu(W, H);
    var ziff = tv.band.join("").trim().length;
    // Band
    s.appendChild(el("rect", { x: x0 - 14, y: y0 - 6, width: n * Z + 28, height: Z + 12, rx: 6, fill: "#fef3c7", stroke: "#b8860b", "stroke-width": 1.5 }));
    tv.band.forEach(function(c, i){
      var x = x0 + i * Z, akt = i === tv.pos;
      s.appendChild(el("rect", { x: x + 2, y: y0, width: Z - 4, height: Z, rx: 6, fill: akt ? "#ede9fe" : "#ffffff", stroke: akt ? "#7c3aed" : "#b0b0b8", "stroke-width": akt ? 3 : 1.5 }));
      if(c !== " ") schrift(s, x + Z / 2, y0 + Z / 2 + 9, c, "middle", "bk-klein", { style: "font:800 26px ui-monospace,monospace" });
    });
    // Stellenwerte unter den Ziffern (von der letzten Ziffer aus)
    var letzte = -1; tv.band.forEach(function(c, i){ if(c !== " ") letzte = i; });
    tv.band.forEach(function(c, i){ if(c !== " " && letzte - i < 12) schrift(s, x0 + i * Z + Z / 2, y0 + Z + 22, String(Math.pow(2, letzte - i)), "middle", "bk-klein", { style: "font-size:12px;fill:#64748b" }); });
    // Lesekopf (kleiner Roboter) über dem aktuellen Feld
    var hx = x0 + tv.pos * Z + Z / 2, stop = tv.z === "S";
    var g = el("g", { transform: "translate(" + hx + ",0)" });
    g.appendChild(el("rect", { x: -26, y: 18, width: 52, height: 44, rx: 10, fill: stop ? "#e2e8f0" : "#c4b5fd", stroke: "#1a2233", "stroke-width": 2 }));
    g.appendChild(el("circle", { cx: -10, cy: 34, r: 5, fill: "#1a2233" })); g.appendChild(el("circle", { cx: 10, cy: 34, r: 5, fill: "#1a2233" }));
    g.appendChild(el("line", { x1: 0, y1: 18, x2: 0, y2: 8, stroke: "#1a2233", "stroke-width": 2 })); g.appendChild(el("circle", { cx: 0, cy: 6, r: 4, fill: stop ? "#94a3b8" : "#f59e0b" }));
    g.appendChild(el("path", { d: "M-10 62 L10 62 L0 96 Z", fill: "#7c3aed" }));
    var zt = stop ? t("tv_stop") : t("tu_zustand") + " " + tv.z;
    schrift(g, 0, 54, zt.length > 9 ? (stop ? "■" : tv.z) : zt, "middle", "bk-klein", { style: "font:800 11px system-ui,sans-serif" });
    s.appendChild(g);
    // Bewegungspfeil des letzten Schritts
    if(tv.last && !stop){ var r = TV_P[tv.p].R[tv.last.z][tv.last.c]; if(r[1] !== "N") pfeil(s, hx + (r[1] === "L" ? Z * 0.9 : -Z * 0.9), 40, hx + (r[1] === "L" ? 32 : -32), 40, "#b8860b"); }
    box.innerHTML = ""; box.appendChild(s);
    document.querySelectorAll("#tvProg [data-p]").forEach(function(c){ c.setAttribute("aria-pressed", +c.dataset.p === tv.p ? "true" : "false"); });
    $("tvInfo").textContent = tA("tv_info")[tv.p];
    // Regeltabelle mit markierter Zeile
    var R = TV_P[tv.p].R, D = { L: t("tv_L"), R: t("tv_R"), N: t("tv_N") };
    function zn(c){ return c === " " ? t("tv_leer") : c; }
    var h = "<tr>" + tA("tv_tab").map(function(x){ return "<th>" + esc(x) + "</th>"; }).join("") + "</tr>";
    Object.keys(R).forEach(function(z){ ["0", "1", " "].forEach(function(c){ var r = R[z][c], an = tv.last && tv.last.z === z && tv.last.c === c;
      h += '<tr class="' + (an ? "an" : "") + '"><td>' + z + "</td><td>" + esc(zn(c)) + "</td><td>" + esc(zn(r[0])) + "</td><td>" + esc(D[r[1]]) + "</td><td>" + (r[2] === "S" ? esc(t("tv_stop")) : r[2]) + "</td></tr>"; }); });
    $("tvTab").innerHTML = h;
    $("tvErg").innerHTML = "<b>" + esc(t("tv_vorher")) + "</b> " + bdi(esc(tv.ein)) + " (" + parseInt(tv.ein, 2) + ")<br><b>" + esc(t("tv_nachher")) + "</b> " + (stop ? bdi(esc(tv.band.join("").trim())) + " (" + tvWert(tv.band) + ")" : "…") + "<br>" + esc(t("tv_schritte", { n: tv.n }));
    $("tvS").disabled = stop; $("tvA").disabled = stop;
    if(stop && tv.n && !tv.gelobt){ tv.gelobt = true; }
    if(!stop) tv.gelobt = false;
  }

  // ---------- Runde 10: Bewegungen im Diagramm (/bewegung.js) auf der Galilei-Seite ----------
  var _gaAlt10 = PROBE.galilei;
  PROBE.galilei = function(){
    _gaAlt10();
    $("probe").insertAdjacentHTML("beforeend", karteH("gs_h") + absatz("gs_intro") + karteH("gs_ged_h") + absatz("gs_ged") + karteH("gs_warum_h") + absatz("gs_warum") +
      karteH("gs_luft_h") + absatz("gs_luft") + '<p class="zeile"><b>' + esc(t("gs_sim")) + '</b></p><div class="chips" id="gsWahl"></div><div class="chips" id="gsLuft"></div>' +
      '<p><button type="button" class="knopf" id="gsLos">' + esc(t("gs_los")) + '</button></p><div id="gsSvg"></div><p class="zeile" id="gsErg"></p>' +
      merkeP("gs_mond") + absatz("gs_versuch") + '<p class="zeile muted">' + esc(t("gs_g")) + "</p>");
    gsBauen();
    $("probe").insertAdjacentHTML("beforeend", '<div data-ms-bewegung id="bewegung"></div>');
    if(window.MS_BEW) MS_BEW.einbauen(document.getElementById("bewegung"));
  };

  // Fallversuch: zwei Gegenstände aus 10 m, mit Luft (Endgeschwindigkeit vt) oder ohne Luft
  var GS_VT = [140, 30, 6, 1.2, 0.6], GS_F = ["#64748b", "#c6e03a", "#e2e8f0", "#ffffff", "#f5f5f4"];
  var gs = { a: 0, b: 3, luft: true, t: 0, raf: 0, lauf: false };
  function gsZeit(i, luft){ var g = 9.81, h = 10; if(!luft) return Math.sqrt(2 * h / g); var v = GS_VT[i]; return v / g * Math.log(Math.exp(h * g / (v * v)) + Math.sqrt(Math.exp(2 * h * g / (v * v)) - 1)); }
  function gsWeg(i, t, luft){ var g = 9.81; if(!luft) return 0.5 * g * t * t; var v = GS_VT[i]; return v * v / g * Math.log(Math.cosh(g * t / v)); }
  function gsBauen(){
    var O = tA("gs_obj");
    $("gsWahl").innerHTML = [0, 1].map(function(k){ return '<span class="gsSp">' + O.map(function(o, i){ return '<button type="button" class="chip" data-k="' + k + '" data-i="' + i + '" aria-pressed="' + ((k ? gs.b : gs.a) === i) + '">' + esc(o) + "</button>"; }).join("") + "</span>"; }).join('<b class="gsVs">↔</b>');
    $("gsLuft").innerHTML = [true, false].map(function(l){ return '<button type="button" class="chip" data-l="' + l + '" aria-pressed="' + (gs.luft === l) + '">' + esc(t(l ? "gs_mit" : "gs_ohne")) + "</button>"; }).join("");
    $("gsWahl").querySelectorAll("[data-i]").forEach(function(c){ c.addEventListener("click", function(){ if(+c.dataset.k) gs.b = +c.dataset.i; else gs.a = +c.dataset.i; gs.t = 0; gs.lauf = false; gsBauen(); }); });
    $("gsLuft").querySelectorAll("[data-l]").forEach(function(c){ c.addEventListener("click", function(){ gs.luft = c.dataset.l === "true"; gs.t = 0; gs.lauf = false; gsBauen(); }); });
    $("gsLos").onclick = function(){ cancelAnimationFrame(gs.raf); gs.t = 0; gs.lauf = true; var t0 = performance.now(), tmax = Math.max(gsZeit(gs.a, gs.luft), gsZeit(gs.b, gs.luft));
      (function f(now){ if(!$("gsSvg")) return; gs.t = Math.min(tmax, (now - t0) / 1000); gsZeichnen(); if(gs.t < tmax) gs.raf = requestAnimationFrame(f); else { gs.lauf = false; gsZeichnen(); } })(t0); };
    gsZeichnen();
  }
  function gsZeichnen(){
    var box = $("gsSvg"); if(!box) return;
    var W = 420, H = 330, y0 = 30, y1 = 300, k = (y1 - y0) / 10, s = svgNeu(W, H), O = tA("gs_obj");
    s.appendChild(el("rect", { x: 0, y: 0, width: W, height: H, rx: 12, fill: gs.luft ? "#e0f2fe" : "#1e293b" }));
    s.appendChild(el("rect", { x: 0, y: y1, width: W, height: H - y1, fill: gs.luft ? "#86efac" : "#94a3b8" }));
    for(var m = 0; m <= 10; m += 2){ var yy = y0 + m * k; s.appendChild(el("line", { x1: 30, y1: yy, x2: 40, y2: yy, stroke: gs.luft ? "#475569" : "#cbd5e1", "stroke-width": 1.5 })); schrift(s, 26, yy + 4, (10 - m) + " m", "end", "bk-klein", { style: "font-size:11px;fill:" + (gs.luft ? "#475569" : "#e2e8f0") }); }
    [[gs.a, 150], [gs.b, 300]].forEach(function(q){
      var i = q[0], x = q[1], tz = gsZeit(i, gs.luft), w = Math.min(10, gsWeg(i, gs.t, gs.luft)), y = y0 + w * k - (i < 2 ? (i ? 10 : 14) : i === 3 ? 4 : 10), wk = gs.luft ? 1 : 0, g = el("g", { transform: "translate(" + x + "," + y + ")" });
      if(i === 0 || i === 1) g.appendChild(el("circle", { cx: 0, cy: 0, r: i ? 10 : 14, fill: GS_F[i], stroke: "#1a2233", "stroke-width": 2 }));
      else if(i === 2) g.appendChild(el("path", { d: "M-11 -4 L-6 -11 L3 -9 L11 -3 L9 7 L1 11 L-8 8 Z", fill: GS_F[i], stroke: "#1a2233", "stroke-width": 1.8 }));
      else if(i === 3) g.appendChild(el("rect", { x: -22, y: -2, width: 44, height: 4, transform: "rotate(" + (wk * Math.sin(gs.t * 3) * 14) + ")", fill: GS_F[i], stroke: "#1a2233", "stroke-width": 1.5 }));
      else g.appendChild(el("path", { d: "M-16 6 C-6 -10 8 -12 18 -8 C10 -2 0 4 -16 6 Z M-16 6 L-22 10", fill: GS_F[i], stroke: "#1a2233", "stroke-width": 1.5, transform: "rotate(" + (wk * Math.sin(gs.t * 2) * 20) + ")" }));
      s.appendChild(g);
      schrift(s, x, 16, O[i], "middle", "bk-klein", { style: "font:700 12px system-ui,sans-serif;fill:" + (gs.luft ? "#1a2233" : "#f8fafc") });
      if(gs.t >= tz - 1e-6 && gs.t > 0) schrift(s, x, y1 + 20, z(tz, 2) + " s", "middle", "bk-klein", { style: "font:800 15px system-ui,sans-serif;fill:#1a2233" });
    });
    schrift(s, W - 8, H - 8, "t = " + z(gs.t, 2) + " s", "end", "bk-klein", { style: "font:700 13px system-ui,sans-serif;fill:#1a2233" });
    box.innerHTML = ""; box.appendChild(s);
    var e = $("gsErg");
    if(!gs.luft) e.textContent = t("gs_ohneErg", { t: z(gsZeit(0, false), 2) });
    else e.textContent = [gs.a, gs.b].map(function(i){ return t("gs_unten", { o: O[i], t: z(gsZeit(i, true), 2) }); }).join(" · ");
  }

  // ---------- Runde 11: Zauberwürfel (Rubik’s Cube) ----------
  P.push({ k: "rubik", p: "rb", sym: "3³", col: "#dc2626", leg: "fak", link: [["kombinatorik", "link_komb"]] });
  // Würfel als 54 Aufkleber: Position p (x, y, z ∈ {−1, 0, 1}), Blickrichtung n, Farbe c
  var RB_F = { U: "#ffffff", D: "#facc15", F: "#16a34a", B: "#2563eb", R: "#dc2626", L: "#f97316" };
  var RB_N = { U: [0, 1, 0], D: [0, -1, 0], F: [0, 0, 1], B: [0, 0, -1], R: [1, 0, 0], L: [-1, 0, 0] };
  var rb = { s: null, z: 0, T: null };
  function rbNeu(){
    var S = [];
    for(var f in RB_N){ var n = RB_N[f];
      for(var a = -1; a <= 1; a++) for(var b = -1; b <= 1; b++){
        var p = n[0] ? [n[0], a, b] : n[1] ? [a, n[1], b] : [a, b, n[2]];
        S.push({ p: p, n: n.slice(), c: f });
      } }
    rb.s = S; rb.z = 0;
  }
  // Drehung um Achse ax (0 = x, 1 = y, 2 = z), Schicht v, um +90° (gegen den Uhrzeigersinn von +Achse aus) oder −90°
  function rbRot(v3, ax, plus){
    var x = v3[0], y = v3[1], zz = v3[2];
    if(ax === 0) return plus ? [x, -zz, y] : [x, zz, -y];
    if(ax === 1) return plus ? [zz, y, -x] : [-zz, y, x];
    return plus ? [-y, x, zz] : [y, -x, zz];
  }
  var RB_Z = { U: [1, 1, false], D: [1, -1, true], R: [0, 1, false], L: [0, -1, true], F: [2, 1, false], B: [2, -1, true] };
  function rbZug(m){
    var f = m[0], inv = m.length > 1, d = RB_Z[f], ax = d[0], v = d[1], plus = inv ? !d[2] : d[2];
    rb.s.forEach(function(st){ if(st.p[ax] === v){ st.p = rbRot(st.p, ax, plus); st.n = rbRot(st.n, ax, plus); } });
  }
  function rbGeloest(){
    var M = {}; for(var i = 0; i < rb.s.length; i++){ var k = rb.s[i].n.join(","); if(M[k] && M[k] !== rb.s[i].c) return false; M[k] = rb.s[i].c; } return true;
  }
  // Netz: Spalte/Zeile je Seite
  function rbNetz(st){
    var p = st.p, n = st.n;
    if(n[1] === 1) return [3 + p[0] + 1, 0 + p[2] + 1];
    if(n[2] === 1) return [3 + p[0] + 1, 3 + 1 - p[1]];
    if(n[1] === -1) return [3 + p[0] + 1, 6 + 1 - p[2]];
    if(n[0] === -1) return [0 + p[2] + 1, 3 + 1 - p[1]];
    if(n[0] === 1) return [6 + 1 - p[2], 3 + 1 - p[1]];
    return [9 + 1 - p[0], 3 + 1 - p[1]];
  }
  function rbZeichnen(){
    var box = $("rbSvg"); if(!box) return;
    var a = 34, s = svgNeu(12 * a + 8, 9 * a + 8);
    s.appendChild(el("rect", { x: 0, y: 0, width: 12 * a + 8, height: 9 * a + 8, rx: 10, fill: "#f1f5f9" }));
    rb.s.forEach(function(st){ var q = rbNetz(st); s.appendChild(el("rect", { x: 4 + q[0] * a + 1.5, y: 4 + q[1] * a + 1.5, width: a - 3, height: a - 3, rx: 5, fill: RB_F[st.c], stroke: "#1a2233", "stroke-width": 1.5 })); });
    [["U", 4.5, 1.5], ["L", 1.5, 4.5], ["F", 4.5, 4.5], ["R", 7.5, 4.5], ["B", 10.5, 4.5], ["D", 4.5, 7.5]].forEach(function(l){ s.appendChild(el("text", { x: 4 + l[1] * a, y: 4 + l[2] * a + 6, "text-anchor": "middle", "font-size": 15, "font-weight": 800, fill: l[0] === "U" ? "#475569" : "#1a2233", opacity: 0.55 }, l[0])); });
    box.innerHTML = ""; box.appendChild(s);
    $("rbZ").textContent = t("rb_zuege", { z: rb.z });
    var g = rbGeloest(), m = $("rbM");
    m.className = "zeile" + (g && rb.z ? " gut" : ""); m.textContent = g && rb.z ? t("rb_geloest") : "";
    if(g && rb.z && !rb.gelobt && !rb.gemischtAuto){ rb.gelobt = true; if(typeof msRichtig === "function") try { msRichtig(); } catch(x){} }
  }
  function gzS(s){ var sep = ["en", "zh", "ja", "ar"].indexOf(lang) >= 0 ? "," : " "; return s.replace(/\B(?=(\d{3})+(?!\d))/g, sep); }
  PROBE.rubik = function(){
    if(!rb.s) rbNeu();
    var b = $("probe"), Z = ["U", "U′", "D", "D′", "L", "L′", "R", "R′", "F", "F′", "B", "B′"];
    b.innerHTML = absatz("rb_anl") + '<div id="rbSvg"></div><div class="chips rbKn" dir="ltr">' + Z.map(function(m){ return '<button type="button" class="chip" data-m="' + m + '">' + m + "</button>"; }).join("") + "</div>" +
      '<p><button type="button" class="knopf hell" id="rbMisch">' + esc(t("rb_mischen")) + '</button> <button type="button" class="knopf hell" id="rbReset">' + esc(t("rb_reset")) + '</button> <b id="rbZ"></b></p><p class="zeile" id="rbM"></p><p class="zeile muted">' + esc(t("rb_not")) + "</p>" +
      karteH("rb_zahl_h") + absatz("rb_zahl") + '<ol class="weg">' + weg([{ lbl: t("rb_l1") }, "8! = " + gz(40320), { lbl: t("rb_l2") }, "3⁷ = " + gz(2187), { lbl: t("rb_l3") }, "12! = " + gz(479001600), { lbl: t("rb_l4") }, "2¹¹ = " + gz(2048), { lbl: t("rb_l5") }, "N = 8! · 3⁷ · 12! · 2¹¹ : 2", "N = " + gzS("43252003274489856000"), "N ≈ 4" + (["de", "es", "fr", "ru", "pt"].indexOf(lang) >= 0 ? "," : ".") + "3 · 10¹⁹"]) + "</ol>" +
      karteH("rb_gott_h") + absatz("rb_gott") + merkeP("rb_sek");
    b.querySelectorAll("[data-m]").forEach(function(k){ k.addEventListener("click", function(){ if(rb.T) return; rbZug(k.dataset.m.replace("′", "'")); rb.z++; rb.gemischtAuto = false; rbZeichnen(); }); });
    $("rbMisch").addEventListener("click", function(){
      if(rb.T) return; var i = 0, last = "";
      rb.gelobt = false;
      rb.T = setInterval(function(){
        if(i >= 25 || !$("rbSvg")){ clearInterval(rb.T); rb.T = null; rb.z = 0; rbZeichnen(); return; }
        var m; do { m = "UDLRFB"[Math.floor(Math.random() * 6)]; } while(m === last); last = m;
        rbZug(Math.random() < 0.5 ? m : m + "'"); i++; rb.gemischtAuto = true; rbZeichnen();
      }, 60);
    });
    $("rbReset").addEventListener("click", function(){ if(rb.T) return; rbNeu(); rb.gelobt = false; rbZeichnen(); });
    rbZeichnen();
  };
  function fak(n){ var r = 1; for(var i = 2; i <= n; i++) r *= i; return r; }
  GEN.rubik = function(){
    var v = zuf(0, 3);
    if(v === 0){ var n = zuf(4, 8), L = []; for(var i = 1; i <= n; i++) L.push(i); return { q: t("rb_q1", { n: n }), w: fak(n), tol: 0, l: gz(fak(n)), weg: [n + "! = " + L.join(" · "), n + "! = " + gz(fak(n))] }; }
    if(v === 1){ var k = zuf(3, 7), A = []; for(var j = 0; j < k; j++) A.push(3); return { q: t("rb_q2", { k: k }), w: Math.pow(3, k), tol: 0, l: gz(Math.pow(3, k)), weg: ["3" + hoch(k) + " = " + A.join(" · "), "3" + hoch(k) + " = " + gz(Math.pow(3, k))] }; }
    if(v === 2){ var k2 = zuf(4, 11); return { q: t("rb_q3", { k: k2 }), w: Math.pow(2, k2), tol: 0, l: gz(Math.pow(2, k2)), weg: ["2" + hoch(k2) + " = " + gz(Math.pow(2, k2))] }; }
    return { q: t("rb_q4"), w: 3674160, tol: 0, l: gz(3674160), weg: ["7! = " + gz(5040), "3⁶ = " + gz(729), "N = " + gz(5040) + " · " + gz(729), "N = " + gz(3674160)] };
  };

  function neueAufgabe(){ auf = GEN[akt.k](); auf.k = akt.k; auf.fertig = false; auf.versuch = 0; $("antw").value = ""; zeigeAufgabe(); }
  function zeigeAufgabe(){
    $("frage").textContent = auf.q;
    var m = $("meldung");
    if(!auf.fertig){ m.className = "meldung"; m.textContent = ""; $("lWeg").hidden = true; $("antw").readOnly = false; }
    else zeigeLoesung(auf.ok);
    $("punkte").textContent = anzahl ? t("punkte", { r: punkte, n: anzahl }) : "";
  }
  function zeigeLoesung(ok){
    var m = $("meldung");
    m.className = "meldung " + (ok ? "gut" : "schlecht"); m.textContent = ok ? t("richtig") : t("falsch", { l: auf.l });
    $("lWegH").textContent = t("weg"); $("lWegL").innerHTML = weg(auf.weg); $("lWeg").hidden = false; $("antw").readOnly = true;
  }
  function pruefen(){
    if(!auf || auf.fertig) return;
    var e = lies($("antw").value); if(!isFinite(e)) return;
    var ok = Math.abs(e - auf.w) <= auf.tol + 1e-9;
    if(!ok && auf.versuch === 0 && typeof msNochmal === "function"){ auf.versuch = 1; msNochmal($("meldung")); return; }
    auf.fertig = true; auf.ok = ok; anzahl++; if(ok) punkte++;
    if(ok && typeof msRichtig === "function") try { msRichtig(); } catch(x){}
    zeigeLoesung(ok); $("punkte").textContent = t("punkte", { r: punkte, n: anzahl });
  }
  $("pruefen").addEventListener("click", pruefen);
  $("antw").addEventListener("keydown", function(e){ if(e.key === "Enter"){ e.preventDefault(); if(auf && auf.fertig) neueAufgabe(); else pruefen(); } });
  $("neuAuf").addEventListener("click", neueAufgabe);

  // ---------- Texte ----------
  function alles(){
    document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = "miStudia – " + t("titel"); $("titel").textContent = t("titel"); $("intro").textContent = t("intro");
    uebersicht(); route();
  }
  window.MS_LANG = { apply: function(l){ if(BA[l]){ lang = l; alles(); } } };
  alles();
})();
