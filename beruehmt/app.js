// ============================================================
// beruehmt/app.js – Kachel „Berühmte Aufgaben“
// Übersicht (Karten) → Detail je Person (Direktlink #gauss, #archimedes, #thales, #davinci, #demere, #eratosthenes):
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
  function lies(s){ s = String(s).trim().replace(/\s+/g, "").replace(/[−–]/g, "-").replace(/[%a-zA-Zа-яА-Я]+$/, "").replace(",", "."); return /^-?\d*\.?\d+$/.test(s) ? +s : NaN; }
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
    { k: "vierfarben", p: "f", sym: "4", col: "#c2410c", leg: "", link: [], ohneAufgabe: true }
  ];
  function finde(k){ for(var i = 0; i < P.length; i++) if(P[i].k === k) return P[i]; return null; }
  var akt = null;

  // ---------- Übersicht ----------
  function uebersicht(){
    $("karten").innerHTML = P.map(function(p){
      return '<a class="bk" href="#' + p.k + '"><span class="bk-sym" style="background:' + p.col + '">' + esc(p.sym) + '</span><span class="bk-txt"><b>' + esc(t(p.p + "_name")) + '</b><span class="bk-zeit">' + esc(t(p.p + "_zeit")) + '</span><span class="bk-kurz">' + esc(t(p.p + "_kurz")) + "</span></span></a>";
    }).join("");
  }

  // ---------- Detail ----------
  function detail(){
    var p = akt;
    $("dName").textContent = t(p.p + "_name"); $("dZeit").textContent = t(p.p + "_zeit");
    $("dSym").textContent = p.sym; $("dSym").style.background = p.col;
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
  function fLoese(k){
    var N = fKarte.n, col = []; for(var i = 0; i < N; i++) col.push(-1);
    var ord = []; for(var j = 0; j < N; j++) ord.push(j); ord.sort(function(a, b){ return fKarte.nb[b].length - fKarte.nb[a].length; });
    function rek(p){ if(p === N) return true; var v = ord[p]; for(var c = 0; c < k; c++){ if(fKarte.nb[v].every(function(u){ return col[u] !== c; })){ col[v] = c; if(rek(p + 1)) return true; col[v] = -1; } } return false; }
    return rek(0) ? col : null;
  }
  function fChrom(){ for(var k = 1; k <= 4; k++) if(fLoese(k)) return k; return 4; }
  PROBE.vierfarben = function(){
    if(!fKarte) fNeu();
    var b = $("probe");
    b.innerHTML = '<p class="zeile">' + esc(t("f_anl")) + '</p><div class="chips" id="fPal">' + F_FARBEN.map(function(c, i){ return '<button type="button" class="fFarbe" data-f="' + i + '" style="background:' + c + '" aria-label="' + (i + 1) + '"></button>'; }).join("") +
      '<button type="button" class="chip" data-f="-1">' + esc(t("f_radier")) + '</button></div><div id="fSvg"></div><p class="zeile" id="fStatus"></p>' +
      '<p><button type="button" class="knopf hell" id="fNeu">' + esc(t("f_neu")) + '</button> <button type="button" class="knopf hell" id="fLeer">' + esc(t("f_leeren")) + '</button> <button type="button" class="knopf hell" id="fLoes">' + esc(t("f_loesung")) + '</button></p><p class="merke">' + esc(t("f_warum")) + "</p>";
    b.querySelectorAll("#fPal [data-f]").forEach(function(x){ x.addEventListener("click", function(){ fFarbe = +x.dataset.f; fZeichnen(); }); });
    $("fNeu").addEventListener("click", function(){ fNeu(); fZeichnen(); });
    $("fLeer").addEventListener("click", function(){ fGel = fGel.map(function(){ return -1; }); fZeichnen(); });
    $("fLoes").addEventListener("click", function(){ var l = fLoese(fMin); if(l) fGel = l; fZeichnen(); });
    fZeichnen();
  };
  function fZeichnen(){
    document.querySelectorAll("#fPal [data-f]").forEach(function(x){ x.setAttribute("aria-pressed", +x.dataset.f === fFarbe ? "true" : "false"); });
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
    $("fSvg").innerHTML = ""; $("fSvg").appendChild(s);
    s.querySelectorAll(".fZelle").forEach(function(p){ p.addEventListener("click", function(){ fGel[+p.getAttribute("data-g")] = fFarbe; fZeichnen(); }); });
    var nk = Object.keys(konf).length, offen = fGel.filter(function(x){ return x < 0; }).length, st = $("fStatus");
    var benutzt = {}; fGel.forEach(function(x){ if(x >= 0) benutzt[x] = 1; });
    if(nk){ st.className = "zeile schlecht"; st.textContent = t("f_konflikt", { n: nk }); }
    else if(offen){ st.className = "zeile"; st.textContent = t("f_offen", { n: offen }); }
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
