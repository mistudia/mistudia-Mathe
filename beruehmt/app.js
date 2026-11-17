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
    { k: "eratosthenes", p: "e", sym: "⊕", col: "#475569", leg: "", link: [["trigonometrie/#erdumfang", "e_l1"], ["teilbarkeit/#sieb", "e_l2"]], nurText: true }
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
    $("kProbe").hidden = nurText; $("kAuf").hidden = nurText;
    $("pruefen").textContent = t("pruefen"); $("neuAuf").textContent = t("neu"); $("antw").placeholder = t("ein");
    legende(p.leg);
    if(!nurText){ PROBE[p.k](); if(!auf || auf.k !== p.k) neueAufgabe(); else zeigeAufgabe(); }
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
