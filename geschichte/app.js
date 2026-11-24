// ============================================================
// geschichte/app.js – Kachel „Geschichte & Begriffe der Mathe“
// Reiter:
//  - Zeitleiste: Warum so früh Mathe? + Zeitleiste der Völker/Personen (Links zu Kacheln und „Berühmte Aufgaben“)
//  - Quellen & Fotos: Längen der Papyrusrollen maßstäblich, Ishango, Plimpton 322, YBC 7289, Papyrus Moskau/Rhind,
//    Euklids Elemente, Antikythera, Adam Ries (Rechenbrett zum Schieben). Originalfotos von Wikimedia Commons
//    werden erst nach Tippen geladen (Datenschutz); „alle zeigen“ merkt sich localStorage "msGS".
//  - Begriffe: Herkunft der Fachwörter (griech./lat./arab.) + Wörter-Rätsel
//  - Zahlenmengen: ℕ ⊂ ℕ₀ ⊂ ℤ ⊂ ℚ ⊂ ℝ als Bild, Zahl einordnen, Aufgabe (2 Versuche)
//  - Zahnräder & Uhr: zwei Zahnräder (Animation), Uhr 12 : 1, Antikythera-Rechnung 254/19, Aufgabe
// Texte: texte.js (GS, 9 Sprachen). Rechenketten: ein „=“ pro Zeile.
// ============================================================
(function(){
  "use strict";
  var lang = "de";
  function $(id){ return document.getElementById(id); }
  function t(k, v){ var s = (GS[lang] && GS[lang][k]) || GS.de[k] || k; if(Array.isArray(s)) return s; if(v) for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  function tA(k){ var v = (GS[lang] && GS[lang][k]) || GS.de[k]; return Array.isArray(v) ? v : []; }
  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function bdi(s){ return '<bdi dir="ltr">' + s + "</bdi>"; }
  function komma(){ return ["de", "es", "fr", "ru", "pt"].indexOf(lang) >= 0; }
  function z(x, d){ d = d == null ? 2 : d; var f = Math.pow(10, d), r = Math.round(x * f) / f, s = String(r); if(s.indexOf("e") >= 0) s = r.toFixed(d); return (komma() ? s.replace(".", ",") : s).replace("-", "−"); }
  function gz(n){ var s = String(Math.round(Math.abs(n))), sep = ["en", "zh", "ja", "ar"].indexOf(lang) >= 0 ? "," : " "; return (n < 0 ? "−" : "") + (s.length >= 5 ? s.replace(/\B(?=(\d{3})+(?!\d))/g, sep) : s); }
  function br(a, b){ return '<span class="msf-br"><span>' + a + "</span><span>" + b + "</span></span>"; }
  function hoch(n){ return String(n).replace(/\d/g, function(c){ return "⁰¹²³⁴⁵⁶⁷⁸⁹"[+c]; }); }
  function ggT(a, b){ a = Math.abs(a); b = Math.abs(b); while(b){ var r = a % b; a = b; b = r; } return a || 1; }
  function seeded(a){ return function(){ a |= 0; a = a + 0x6D2B79F5 | 0; var x = Math.imul(a ^ a >>> 15, 1 | a); x = x + Math.imul(x ^ x >>> 7, 61 | x) ^ x; return ((x ^ x >>> 14) >>> 0) / 4294967296; }; }
  var EIN = {}; try { EIN = JSON.parse(localStorage.getItem("msGS") || "{}") || {}; } catch(e){}
  function merken(){ try { localStorage.setItem("msGS", JSON.stringify(EIN)); } catch(e){} }
  // Rechenkette: jede Zeile genau ein Relationszeichen
  function kette(L){
    return '<div class="kette" dir="ltr">' + L.map(function(zl, i){
      if(typeof zl === "string") zl = { h: zl };
      return '<div class="kz"><span class="kg">' + (i === 0 ? "" : (zl.r || "=")) + '</span><span class="ke">' + zl.h + '</span><span class="kn">' + (zl.n || "") + "</span></div>";
    }).join("") + "</div>";
  }
  // Gleichungen untereinander (jede Zeile eine Gleichung)
  function gleichungen(L){ return '<div class="glg" dir="ltr">' + L.map(function(x){ return "<div>" + x + "</div>"; }).join("") + "</div>"; }
  function lies(s){ s = String(s).trim().replace(/\s+/g, "").replace(/[−–]/g, "-").replace(",", "."); return /^-?\d*\.?\d+$/.test(s) ? +s : NaN; }
  var SVGNS = "http://www.w3.org/2000/svg";
  function el(n, a, txt){ var e = document.createElementNS(SVGNS, n); for(var k in a) e.setAttribute(k, a[k]); if(txt != null) e.textContent = txt; return e; }

  // ---------- Originalfotos (Wikimedia Commons, erst nach Tippen laden) ----------
  var CM = "https://commons.wikimedia.org/wiki/File:";
  var FOTO = {
    ishango: { u: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Ishango_bone_%28cropped%29.jpg/500px-Ishango_bone_%28cropped%29.jpg", w: 360, h: 497, a: "Joeykentin", l: "CC BY-SA 4.0", p: "Ishango_bone_(cropped).jpg" },
    plimpton: { u: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Plimpton_322.jpg/500px-Plimpton_322.jpg", w: 480, h: 332, a: "", l: "", p: "Plimpton_322.jpg" },
    ybc: { u: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Ybc7289-bw.jpg", w: 400, h: 373, a: "Bill Casselman", l: "CC BY 2.5", p: "Ybc7289-bw.jpg" },
    moskau: { u: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Papyrus_moscow_4676-problem_14_part_1.jpg/500px-Papyrus_moscow_4676-problem_14_part_1.jpg", w: 480, h: 395, a: "", l: "", p: "Papyrus_moscow_4676-problem_14_part_1.jpg" },
    rhind: { u: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Rhind_Mathematical_Papyrus.jpg", w: 640, h: 383, a: "", l: "", p: "Rhind_Mathematical_Papyrus.jpg" },
    oxy: { u: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/P._Oxy._I_29.jpg/960px-P._Oxy._I_29.jpg", w: 560, h: 341, a: "", l: "", p: "P._Oxy._I_29.jpg" },
    elem1482: { u: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Euclide%2C_Elementa_geometriae%2C_1482.jpg/960px-Euclide%2C_Elementa_geometriae%2C_1482.jpg", w: 560, h: 340, a: "Zythème", l: "CC0", p: "Euclide,_Elementa_geometriae,_1482.jpg" },
    anti: { u: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/NAMA_Machine_d%27Anticyth%C3%A8re_1.jpg/500px-NAMA_Machine_d%27Anticyth%C3%A8re_1.jpg", w: 480, h: 428, a: "Marsyas", l: "CC BY 2.5", p: "NAMA_Machine_d%27Anticyth%C3%A8re_1.jpg" },
    ries: { u: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Ries.PNG/330px-Ries.PNG", w: 320, h: 319, a: "", l: "", p: "Ries.PNG" },
    riesbuch: { u: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Ries_-_Rechenung_nach_der_lenge_auff_den_Linihen_vnd_Feder_%28Titel%29.jpg/500px-Ries_-_Rechenung_nach_der_lenge_auff_den_Linihen_vnd_Feder_%28Titel%29.jpg", w: 400, h: 512, a: "", l: "", p: "Ries_-_Rechenung_nach_der_lenge_auff_den_Linihen_vnd_Feder_(Titel).jpg" }
  };
  function fotoBox(k, cap){
    return '<figure class="foto" data-foto="' + k + '"><button type="button" class="knopf hell fotoBtn">' + esc(t("foto_btn")) + '</button><figcaption class="muted klein">' + esc(cap ? cap + " – " : "") + esc(t("foto_hinweis")) + "</figcaption></figure>";
  }
  function fotoLaden(fig){
    var k = fig.dataset.foto, f = FOTO[k]; if(!f || fig.dataset.da) return;
    fig.dataset.da = "1";
    var cap = fig.querySelector("figcaption"), alt = cap.dataset.cap || "";
    var lic = f.l ? f.l : t("gemeinfrei");
    fig.innerHTML = '<img src="' + f.u + '" width="' + f.w + '" height="' + f.h + '" alt="' + esc(alt) + '" loading="lazy" referrerpolicy="no-referrer"><figcaption class="muted klein">' + (alt ? esc(alt) + " · " : "") + esc(t("foto_quelle")) + ": " + (f.a ? esc(f.a) + ", " : "") + esc(lic) + ', <a href="' + CM + f.p + '" target="_blank" rel="noopener">Wikimedia Commons</a></figcaption>';
  }
  function fotosVerdrahten(box){
    box.querySelectorAll("figure.foto").forEach(function(fig){
      var cap = fig.querySelector("figcaption"); cap.dataset.cap = fig.dataset.cap || "";
      var b = fig.querySelector(".fotoBtn"); if(b) b.addEventListener("click", function(){ fotoLaden(fig); });
      if(EIN.fotos) fotoLaden(fig);
    });
  }

  // ---------- Reiter: Zeitleiste ----------
  var REG = { af: "#a16207", me: "#b45309", eg: "#ca8a04", cn: "#dc2626", gr: "#2563eb", "in": "#ea580c", am: "#059669", ar: "#0d9488", eu: "#7c3aed" };
  var ZL = [
    { r: "af" }, { r: "me", l: [["winkel"]] }, { r: "eg", l: [["flaechen"]] }, { r: "me", l: [["pythagoras"]] }, { r: "eg", l: [["brueche"]] },
    { r: "cn", l: [["negativ"], ["gleichungssysteme"]] }, { r: "gr", l: [["beruehmt/#thales", 1], ["pythagoras"]] }, { r: "gr", l: [["beruehmt/#euklid", 1]] },
    { r: "gr", l: [["beruehmt/#archimedes", 1], ["beruehmt/#eratosthenes", 1]] }, { r: "gr" }, { r: "am" }, { r: "in", l: [["negativ"]] },
    { r: "ar", l: [["beruehmt/#chwarizmi", 1], ["quadratisch"]] }, { r: "eu", l: [["beruehmt/#fibonacci", 1]] }, { r: "eu", l: [["schriftlich"]] },
    { r: "eu", l: [["logarithmus"], ["graphen"]] }, { r: "eu", l: [["beruehmt/#newton", 1], ["differential"], ["integral"]] },
    { r: "eu", l: [["beruehmt/#euler", 1], ["beruehmt/#gauss", 1]] }, { r: "eu", l: [["beruehmt/#lovelace", 1], ["beruehmt/#turing", 1]] }
  ];
  var ZLREG = { af: "reg_af", me: "reg_me", eg: "reg_eg", cn: "reg_cn", gr: "reg_gr", "in": "reg_in", am: "reg_am", ar: "reg_ar", eu: "reg_eu" };
  function lkName(slug){ var L = (GS[lang] && GS[lang].lk) || GS.de.lk || {}; return L[slug] || GS.de.lk[slug] || slug; }
  function linkHtml(l){ var pfeil = lang === "ar" ? " ←" : " →"; return '<a class="zlLink" href="/' + l[0] + '">' + esc(lkName(l[0])) + pfeil + "</a>"; }
  function zeitleiste(){
    var h = '<div class="karte"><h2>' + esc(t("warum_h")) + '</h2><p class="zeile">' + esc(t("warum_i")) + '</p><ul class="warum">' + tA("warum_l").map(function(x){ return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>";
    h += '<div class="karte"><h2>' + esc(t("zl_h")) + '</h2><p class="zeile muted">' + esc(t("zl_i")) + '</p><ol class="zl">';
    ZL.forEach(function(e, i){
      var n = i + 1;
      h += '<li class="zlE" style="--rc:' + REG[e.r] + '"><span class="zlJ">' + esc(t("z" + n + "_j")) + '</span><span class="zlR">' + esc(t(ZLREG[e.r])) + "</span><b class=\"zlW\">" + esc(t("z" + n + "_w")) + '</b><p class="zlT">' + esc(t("z" + n + "_t")) + "</p>" +
        (e.l ? '<p class="zlL">' + e.l.map(function(l){ return linkHtml(l); }).join(" ") + "</p>" : "") + "</li>";
    });
    h += "</ol></div>";
    $("zeitBox").innerHTML = h;
  }

  // ---------- Reiter: Quellen & Fotos ----------
  function laengenBild(){
    var W = 640, H = 250, k = 1.08, x0 = 20, s = el("svg", { viewBox: "0 0 " + W + " " + H, "class": "bild", role: "img" });
    function txt(x, y, s0, cls){ s.appendChild(el("text", { x: x, y: y, "class": cls || "bt" }, s0)); }
    // Rhind: 295,5 + Lücke 18 + 199,5 cm, 32 cm breit
    var y = 30;
    s.appendChild(el("rect", { x: x0, y: y, width: 295.5 * k, height: 32 * k, fill: "#fde68a", stroke: "#92400e", "stroke-width": 1.5 }));
    s.appendChild(el("rect", { x: x0 + 295.5 * k, y: y, width: 18 * k, height: 32 * k, fill: "none", stroke: "#92400e", "stroke-width": 1.2, "stroke-dasharray": "3 3" }));
    s.appendChild(el("rect", { x: x0 + 313.5 * k, y: y, width: 199.5 * k, height: 32 * k, fill: "#fde68a", stroke: "#92400e", "stroke-width": 1.5 }));
    txt(x0, y - 8, "Rhind  ≈ 513 cm × 32 cm");
    // Moskau: 550 cm, 3,8–7,6 cm
    y = 110;
    s.appendChild(el("path", { d: "M" + x0 + " " + y + " L" + (x0 + 550 * k) + " " + (y + 1) + " L" + (x0 + 550 * k) + " " + (y + 4) + " L" + x0 + " " + (y + 8.2) + " Z", fill: "#fde68a", stroke: "#92400e", "stroke-width": 1.2 }));
    txt(x0, y - 8, "Moskau / Moscow  ≈ 550 cm × 3,8–7,6 cm");
    // Kind 140 cm (liegend) und A4
    y = 170;
    var kx = x0, kl = 140 * k;
    s.appendChild(el("circle", { cx: kx + 10, cy: y + 14, r: 10, fill: "#fca5a5", stroke: "#1a2233", "stroke-width": 1.5 }));
    s.appendChild(el("rect", { x: kx + 20, y: y + 4, width: kl * 0.45, height: 20, rx: 6, fill: "#60a5fa", stroke: "#1a2233", "stroke-width": 1.5 }));
    s.appendChild(el("rect", { x: kx + 20 + kl * 0.45, y: y + 6, width: kl * 0.55 - 20, height: 7, rx: 3, fill: "#1e3a8a" }));
    s.appendChild(el("rect", { x: kx + 20 + kl * 0.45, y: y + 15, width: kl * 0.55 - 20, height: 7, rx: 3, fill: "#1e3a8a" }));
    txt(kx, y + 46, "140 cm", "bt");
    var ax = x0 + 200;
    s.appendChild(el("rect", { x: ax, y: y, width: 29.7 * k, height: 21 * k, fill: "#ffffff", stroke: "#1a2233", "stroke-width": 1.5 }));
    txt(ax, y + 46, "A4", "bt");
    // Maßstab 1 m
    var mx = W - 20 - 100 * k;
    s.appendChild(el("line", { x1: mx, y1: y + 30, x2: mx + 100 * k, y2: y + 30, stroke: "#1a2233", "stroke-width": 3 }));
    s.appendChild(el("line", { x1: mx, y1: y + 24, x2: mx, y2: y + 36, stroke: "#1a2233", "stroke-width": 2 }));
    s.appendChild(el("line", { x1: mx + 100 * k, y1: y + 24, x2: mx + 100 * k, y2: y + 36, stroke: "#1a2233", "stroke-width": 2 }));
    txt(mx + 34, y + 20, "1 m", "bt");
    return s;
  }
  function quelle(k, titel, inhaltHtml, fotos){
    return '<div class="karte quelle" id="q_' + k + '"><h2>' + esc(t(titel + "_h")) + '</h2><div class="qGitter"><div><dl class="qDaten"><dt>' + esc(t("wo")) + "</dt><dd>" + esc(t(titel + "_wo")) + "</dd><dt>" + esc(t("alter")) + "</dt><dd>" + esc(t(titel + "_a")) + "</dd><dt>" + esc(t("groesse")) + "</dt><dd>" + esc(t(titel + "_g")) + '</dd></dl><p class="zeile">' + esc(t(titel + "_t")) + "</p>" + (inhaltHtml || "") + '</div><div class="qFotos">' + fotos.map(function(f){ return fotoBox(f[0], f[1]).replace('<figure class="foto"', '<figure class="foto" data-cap="' + esc(f[1] || t(titel + "_h")) + '"'); }).join("") + "</div></div></div>";
  }
  function quellen(){
    var h = '<div class="karte"><h2>' + esc(t("q_h")) + '</h2><p class="zeile">' + esc(t("q_i")) + '</p><div id="lBild"></div><ul class="klein"><li>' + esc(t("q_rhind")) + "</li><li>" + esc(t("q_moskau")) + "</li><li>" + esc(t("q_kind")) + " · " + esc(t("q_a4")) + "</li></ul>" +
      '<p class="zeile">' + esc(t("q_lang")) + "</p>" + kette([z(295.5, 1) + " cm + 18 cm + " + z(199.5, 1) + " cm", "513 cm"]) +
      '<p class="zeile">' + esc(t("q_verh")) + "</p>" + kette([br("513 cm", "32 cm"), { r: "≈", h: "16" }]) +
      '<p class="zeile">' + esc(t("q_verhM")) + "</p>" + kette([br("550 cm", z(5.7, 1) + " cm"), { r: "≈", h: "96" }]) +
      '<label class="fotoAlle"><input type="checkbox" id="fotoAlle"' + (EIN.fotos ? " checked" : "") + "> " + esc(t("foto_alle")) + "</label></div>";
    h += quelle("ishango", "s_ishango", "", [["ishango"]]);
    h += quelle("plimpton", "s_plimpton", '<p class="zeile"><b>' + esc(t("s_plimpton_b")) + "</b></p>" + kette(["119² + 120²", gz(14161) + " + " + gz(14400), gz(28561), "169²"]), [["plimpton"]]);
    h += quelle("ybc", "s_ybc", '<p class="zeile"><b>' + esc(t("s_ybc_b")) + "</b></p>" + kette(["1;24,51,10", "1 + " + br(24, 60) + " + " + br(51, gz(3600)) + " + " + br(10, gz(216000)), { r: "≈", h: z(1.41421296, 6) }]) + kette(["√2", { r: "≈", h: z(1.41421356, 6) }]), [["ybc"]]);
    h += quelle("moskau", "s_moskau", '<p class="zeile"><b>' + esc(t("s_moskau_b")) + "</b></p>" + kette(["V", br("h", 3) + " · (a² + a · b + b²)", br(6, 3) + " · (16 + 8 + 4)", "2 · 28", "56"]), [["moskau"]]);
    h += quelle("rhind", "s_rhind", '<p class="zeile"><b>' + esc(t("s_rhind_b")) + "</b></p>" + gleichungen(["x + " + br("x", 7) + " = 19", br(8, 7) + " · x = 19", "x = 19 · " + br(7, 8), "x = " + br(133, 8), "x = " + z(16.625, 3)]), [["rhind"]]);
    h += quelle("euklid", "s_euklid", '<p class="merke">' + esc(t("s_euklid_b")) + "</p>", [["oxy", "P. Oxy. I 29"], ["elem1482", "Venedig / Venice 1482"]]);
    h += quelle("anti", "s_anti", '<p class="zeile"><a href="#zahnrad" class="zlLink">' + esc(t("s_anti_b")) + "</a></p>", [["anti"]]);
    h += quelle("ries", "s_ries", '<p class="zeile"><b>' + esc(t("s_ries_b")) + '</b></p><div class="regler"><label>' + esc(t("ries_zahl")) + ' <input type="range" id="riesR" min="1" max="9999" value="' + (EIN.ries || 1522) + '"> <output id="riesW"></output></label></div><div id="riesBild"></div>', [["ries"], ["riesbuch", t("ries_buch")]]);
    $("quellenBox").innerHTML = h;
    $("lBild").appendChild(laengenBild());
    fotosVerdrahten($("quellenBox"));
    $("fotoAlle").addEventListener("change", function(){ EIN.fotos = this.checked ? 1 : 0; merken(); if(EIN.fotos) document.querySelectorAll("figure.foto").forEach(fotoLaden); });
    $("riesR").addEventListener("input", function(){ EIN.ries = +this.value; merken(); riesZeichnen(); });
    riesZeichnen();
  }
  function riesZeichnen(){
    var n = +$("riesR").value, W = 360, H = 232, s = el("svg", { viewBox: "0 0 " + W + " " + H, "class": "bild ries", role: "img" });
    $("riesW").textContent = gz(n);
    s.appendChild(el("rect", { x: 0, y: 0, width: W, height: H, rx: 10, fill: "#fef3c7" }));
    var WERT = [1000, 100, 10, 1], y0 = 52, dy = 52;
    WERT.forEach(function(w, i){
      var y = y0 + i * dy, ziffer = Math.floor(n / w) % 10, fuenf = ziffer >= 5, eins = ziffer % 5;
      s.appendChild(el("line", { x1: 70, y1: y, x2: W - 14, y2: y, stroke: "#78350f", "stroke-width": 2.5 }));
      s.appendChild(el("text", { x: 60, y: y + 5, "text-anchor": "end", "class": "bt" }, gz(w)));
      s.appendChild(el("text", { x: 60, y: y - dy / 2 + 5, "text-anchor": "end", "class": "bt klein2" }, gz(w * 5)));
      for(var j = 0; j < eins; j++) s.appendChild(el("circle", { cx: 100 + j * 30, cy: y, r: 11, fill: "#d97706", stroke: "#78350f", "stroke-width": 2 }));
      if(fuenf) s.appendChild(el("circle", { cx: 100, cy: y - dy / 2, r: 11, fill: "#fbbf24", stroke: "#78350f", "stroke-width": 2 }));
      s.appendChild(el("text", { x: W - 20, y: y - 8, "text-anchor": "end", "class": "bt" }, String(ziffer)));
    });
    var b = $("riesBild"); b.innerHTML = ""; b.appendChild(s);
  }

  // ---------- Reiter: Begriffe ----------
  var W_ = [
    ["mathematik", "gr", "∑", "#1565c0", ""], ["arithmetik", "gr", "1+2", "#ea580c", "rechengesetze"], ["geometrie", "gr", "△○", "#059669", "flaechen"],
    ["algebra", "ar", "x", "#0e7490", "terme"], ["algorithmus", "ar", "1→2→3", "#475569", "schriftlich"], ["trigonometrie", "gr", "sin", "#7c3aed", "trigonometrie"],
    ["bruch", "la", "¾", "#db2777", "brueche"], ["prozent", "la", "%", "#ca8a04", "prozent"], ["null", "ar", "0", "#334155", "negativ"],
    ["analysis", "gr", "f′", "#9333ea", "differential"], ["ableitung", "la", "f′(x)", "#b91c1c", "differential"], ["differential", "la", "dx", "#c2410c", "differential"],
    ["integral", "la", "∫", "#0f766e", "integral"], ["infinitesimal", "la", "∞", "#4338ca", "integral"], ["analytisch", "gr", "(x|y)", "#0369a1", "graphen"],
    ["linear", "la", "[a b]", "#0891b2", "matrizen"], ["stochastik", "gr", "⚂", "#16a34a", "wahrscheinlichkeit"], ["statistik", "la", "▁▃▆", "#65a30d", "normalverteilung"],
    ["kalkulieren", "la", "●●●", "#a16207", "schriftlich"], ["hypotenuse", "gr", "a² + b²", "#be123c", "pythagoras"], ["logarithmus", "gr", "log", "#6d28d9", "logarithmus"],
    ["matrix", "la", "⎡⎤", "#155e75", "matrizen"], ["kombinatorik", "la", "n!", "#9a3412", "kombinatorik"]
  ];
  function begriffe(){
    var h = '<div class="karte"><h2>' + esc(t("b_h")) + '</h2><p class="zeile">' + esc(t("b_i")) + '</p><div class="wGitter">';
    W_.forEach(function(w){
      var d = tA("w_" + w[0]); if(d.length < 4) return;
      h += '<div class="wKarte"><span class="wSym" style="background:' + w[3] + '" dir="ltr">' + esc(w[2]) + '</span><div><b class="wName">' + esc(d[0]) + '</b><span class="wSp">' + esc(t("sp_" + w[1])) + ': <i dir="ltr">' + esc(d[1]) + '</i></span><span class="wWoe"><b>' + esc(t("woertlich")) + ":</b> " + esc(d[2]) + '</span><span class="wHeute"><b>' + esc(t("heute")) + ":</b> " + esc(d[3]) + "</span>" +
        (w[4] ? linkHtml([w[4]]) : "") + "</div></div>";
    });
    h += "</div></div>";
    h += '<div class="karte"><h2>' + esc(t("quiz_h")) + '</h2><span class="punkte" id="qzP"></span><p class="auftrag" id="qzQ"></p><div class="mc" id="qzMc"></div><p class="meldung" id="qzM"></p><p><button type="button" class="knopf hell" id="qzNeu">' + esc(t("quiz_neu")) + "</button></p></div>";
    $("begriffeBox").innerHTML = h;
    $("qzNeu").addEventListener("click", function(){ qz = null; quizZeigen(); });
    quizZeigen();
  }
  var qz = null, qzR = 0, qzN = 0;
  function quizZeigen(){
    if(!qz){ var sd = Math.floor(Math.random() * 1e9), r = seeded(sd), L = W_.map(function(w){ return w[0]; }), i = Math.floor(r() * L.length), A = [i];
      while(A.length < 4){ var j = Math.floor(r() * L.length); if(A.indexOf(j) < 0) A.push(j); }
      for(var a = A.length - 1; a > 0; a--){ var b = Math.floor(r() * (a + 1)), x = A[a]; A[a] = A[b]; A[b] = x; }
      qz = { i: i, A: A, v: 0, fertig: false, wahl: -1 }; }
    var d = tA("w_" + W_[qz.i][0]);
    $("qzQ").textContent = t("quiz_q", { w: d[0] });
    $("qzMc").innerHTML = qz.A.map(function(j){ var dj = tA("w_" + W_[j][0]); var cls = qz.fertig ? (j === qz.i ? " richtig" : j === qz.wahl ? " falsch" : "") : (qz.falsch && qz.falsch.indexOf(j) >= 0 ? " falsch" : ""); return '<button type="button" class="mcB' + cls + '" data-j="' + j + '"' + (qz.fertig ? " disabled" : "") + ">" + esc(dj[2]) + "</button>"; }).join("");
    $("qzMc").querySelectorAll("[data-j]").forEach(function(b){ b.addEventListener("click", function(){ quizAntwort(+b.dataset.j); }); });
    var m = $("qzM");
    if(qz.fertig){ m.className = "meldung " + (qz.ok ? "gut" : "schlecht"); m.textContent = qz.ok ? t("richtig") : t("falsch", { l: d[2] }); }
    else if(!qz.falsch){ m.className = "meldung"; m.textContent = ""; }
    $("qzP").textContent = qzN ? t("punkte", { r: qzR, n: qzN }) : "";
  }
  function quizAntwort(j){
    if(qz.fertig) return;
    var ok = j === qz.i;
    if(!ok && !qz.falsch){ qz.falsch = [j]; quizZeigen(); if(typeof msNochmal === "function") msNochmal($("qzM")); return; }
    qz.fertig = true; qz.ok = ok; qz.wahl = j; qzN++; if(ok){ qzR++; if(typeof msRichtig === "function") try { msRichtig(); } catch(x){} }
    quizZeigen();
  }

  // ---------- Reiter: Zahlenmengen ----------
  // 🆕 24.11.2026 (2): Ovale wie im Schulbuch – ℕ ⊂ ℕ₀ ⊂ ℤ ⊂ ℚ ⊂ ℝ, daneben die irrationalen Zahlen
  // (ℝ \ ℚ) als eigenes graues Oval. Jede Menge hat ein Schild auf ihrem Rand: Symbol, Name, Herkunft des Buchstabens.
  // Beispielzahlen stehen im Teil der Menge, der nicht in der kleineren liegt.
  var MENG = [
    { k: "R",  s: "ℝ",  i: 4, cx: 450, cy: 260, rx: 440, ry: 250, f: "#fff1e3", c: "#c2410c", tag: [700, 466] },
    { k: "I",  s: "",   i: -1, cx: 770, cy: 228, rx: 98, ry: 122, f: "#eceef2", c: "#4b5563", tag: [775, 94] },
    { k: "Q",  s: "ℚ",  i: 3, cx: 360, cy: 250, rx: 300, ry: 215, f: "#ddf4ff", c: "#0369a1", tag: [370, 35] },
    { k: "Z",  s: "ℤ",  i: 2, cx: 290, cy: 265, rx: 210, ry: 165, f: "#ffe1e3", c: "#be123c", tag: [270, 100] },
    { k: "N0", s: "ℕ₀", i: 1, cx: 360, cy: 285, rx: 130, ry: 105, f: "#fff3c4", c: "#a16207", tag: [348, 180] },
    { k: "N",  s: "ℕ",  i: 0, cx: 395, cy: 300, rx: 85,  ry: 62,  f: "#e3e1ff", c: "#4338ca", tag: [410, 238] }
  ];
  // [x, y, Text] oder [x, y, Zähler, Nenner, Vorzeichen]
  var ZM_BSP = { N: [[338, 302, "1"], [452, 302, "2"], [358, 345, "17"], [432, 345, "100"]], N0: [[268, 318, "0"]],
    Z: [[150, 268, "−1"], [125, 330, "−7"], [195, 395, "−50"]],
    Q: [[568, 198, "1", "2", ""], [585, 268, "3", "4", "−"], [575, 345, "0,25"], [515, 412, "0,333…"]],
    R: [[732, 205, "√2"], [808, 215, "π"], [742, 268, "e"], [800, 292, "−√5"]] };
  var ZM_MARK = { N: [395, 312], N0: [282, 262], Z: [160, 215], Q: [545, 140], R: [770, 160] };
  function svgBruch(g, x, y, z, n, vz, cls, fill){
    var w = Math.max(String(z).length, String(n).length) * 11 + 6, dx = vz ? 8 : 0;
    if(vz) g.appendChild(el("text", { x: x + dx - w / 2 - 3, y: y + 7, "text-anchor": "end", "class": cls, fill: fill, "data-roh": "1" }, vz));
    g.appendChild(el("text", { x: x + dx, y: y - 4, "text-anchor": "middle", "class": cls, fill: fill, "data-roh": "1" }, z));
    g.appendChild(el("line", { x1: x + dx - w / 2, y1: y + 2, x2: x + dx + w / 2, y2: y + 2, stroke: fill, "stroke-width": 2 }));
    g.appendChild(el("text", { x: x + dx, y: y + 22, "text-anchor": "middle", "class": cls, fill: fill, "data-roh": "1" }, n));
  }
  function zmBreite(s, px){ var w = 0; for(var i = 0; i < s.length; i++){ var c = s.charCodeAt(i); w += c > 0x2e80 ? px * 1.05 : c >= 0x400 && c < 0x700 ? px * 0.64 : px * 0.57; } return w; }
  function zmBild(hl, marker){
    var s = el("svg", { viewBox: "0 -6 900 524", "class": "bild zm", role: "img", dir: "ltr", "data-roh": "1" });
    var NA = tA("zm_name"), WI = tA("zm_wie");
    var mark = hl === "R" ? "I" : hl;
    MENG.forEach(function(m){
      if(mark === m.k) s.appendChild(el("ellipse", { cx: m.cx, cy: m.cy, rx: m.rx + 5, ry: m.ry + 5, fill: "none", stroke: m.c, "stroke-opacity": .25, "stroke-width": 7 }));
      s.appendChild(el("ellipse", { cx: m.cx, cy: m.cy, rx: m.rx, ry: m.ry, fill: m.f, stroke: m.c, "stroke-width": mark === m.k ? 5 : 2.5 }));
    });
    // Schilder (nach den Flächen, damit sie über allen Rändern liegen)
    MENG.forEach(function(m){
      var irr = m.k === "I", na = irr ? t("zm_irr") : (NA[m.i] || ""), wi = irr ? "ℝ \\ ℚ · " + t("zm_irrK") : (WI[m.i] || "");
      var fsN = 14, fsW = 11.5, sym = irr ? 0 : 34;
      var w = Math.max(zmBreite(na, fsN) * 1.02, zmBreite(wi, fsW)) + sym + 24, h = 40, x = m.tag[0] - w / 2, y = m.tag[1] - h / 2;
      if(x < 4) x = 4; if(x + w > 896) x = 896 - w;
      var g = el("g", {});
      g.appendChild(el("rect", { x: x, y: y, width: w, height: h, rx: 20, fill: "#ffffff", stroke: m.c, "stroke-width": mark === m.k ? 3.5 : 2.5 }));
      if(!irr){
        g.appendChild(el("circle", { cx: x + 22, cy: y + h / 2, r: 15, fill: m.c }));
        g.appendChild(el("text", { x: x + 22, y: y + h / 2 + 6.5, "text-anchor": "middle", "class": "zmS", fill: "#ffffff", "font-size": m.k === "N0" ? 15 : 19 }, m.s));
      }
      // Arabisch: zentriert (eine RTL-Zeile mit Anker „start“ läuft sonst aus dem Schild)
      var ar = lang === "ar", tx0 = ar ? x + sym + (w - sym) / 2 : x + 12 + sym, an = ar ? "middle" : "start";
      g.appendChild(el("text", { x: tx0, y: y + 17, "class": "zmName", fill: m.c, "font-size": fsN, "text-anchor": an }, na));
      g.appendChild(el("text", { x: tx0, y: y + 32, "class": "zmWie", fill: "#3b4556", "font-size": fsW, "text-anchor": an }, wi));
      s.appendChild(g);
    });
    for(var k in ZM_BSP) ZM_BSP[k].forEach(function(p){
      if(p.length > 3){ svgBruch(s, p[0], p[1], p[2], p[3], p[4], "zmZ", "#1a2233"); return; }
      var tx = p[2]; if(!komma()) tx = tx.replace(",", ".");
      s.appendChild(el("text", { x: p[0], y: p[1], "text-anchor": "middle", "class": "zmZ", fill: "#1a2233", "data-roh": "1" }, tx));
    });
    if(marker){
      var q = ZM_MARK[marker.k], g = el("g", { "data-roh": "1" }), mt = String(marker.t), fr = mt.match(/^(−?)(\d+)\/(\d+)$/);
      var w = fr ? Math.max(fr[2].length, fr[3].length) * 11 + 46 : Math.max(56, mt.length * 11 + 26), h = fr ? 54 : 32;
      g.appendChild(el("rect", { x: q[0] - w / 2, y: q[1] - h / 2, width: w, height: h, rx: 14, fill: "#1a2233" }));
      g.appendChild(el("path", { d: "M" + (q[0] - 7) + " " + (q[1] + h / 2) + " l7 8 l7 -8 z", fill: "#1a2233" }));
      if(fr) svgBruch(g, q[0] - (fr[1] ? 4 : 0), q[1] - 4, fr[2], fr[3], fr[1], "zmM", "#ffffff");
      else g.appendChild(el("text", { x: q[0], y: q[1] + 6, "text-anchor": "middle", "class": "zmM", fill: "#ffffff" }, mt));
      s.appendChild(g);
    }
    return s;
  }
  // Zahl lesen → { k: kleinste Menge, t: Anzeige, v: Wert-Hinweis } oder null
  function zmLies(s0){
    var s = String(s0).trim().replace(/\s+/g, "").replace(/[−–]/g, "-").replace(/̅/g, "");
    if(!s) return null;
    var neg = false; if(/^-/.test(s)){ neg = true; s = s.slice(1); }
    var anz = (neg ? "−" : "") + s;
    if(/^(π|pi|e)$/i.test(s)) return { k: "R", t: anz };
    var m = s.match(/^(?:√|sqrt\(?|wurzel\(?)(\d+)\)?$/i);
    if(m){ var n = +m[1], w = Math.round(Math.sqrt(n)); if(w * w === n) return { k: neg ? (w ? "Z" : "N0") : (w ? "N" : "N0"), t: anz, info: t("zm_wurzelGanz", { n: n, w: (neg ? "−" : "") + w }) }; return { k: "R", t: anz }; }
    m = s.match(/^(\d+)\/(\d+)$/);
    if(m){ var a = +m[1], b = +m[2]; if(!b) return null; var g = ggT(a, b); if(a % b === 0){ var q = a / b; return { k: q === 0 ? "N0" : neg ? "Z" : "N", t: anz, info: anz + " = " + (neg && q ? "−" : "") + q }; } return { k: "Q", t: anz }; }
    if(/^\d*[.,]\d+(\.\.\.|…)$/.test(s)) return { k: "Q", t: anz };
    m = s.match(/^(\d*)[.,](\d+)$/);
    if(m){ var v = +(m[1] + "." + m[2]); if(v === Math.floor(v)) return { k: v === 0 ? "N0" : neg ? "Z" : "N", t: anz }; var nk = m[2].length, Zz = Math.round(v * Math.pow(10, nk)), Nn = Math.pow(10, nk), gg = ggT(Zz, Nn); return { k: "Q", t: anz, info: t("zm_dezBruch", { d: anz, b: (neg ? "−" : "") + (Zz / gg) + "/" + (Nn / gg) }) }; }
    if(/^\d+$/.test(s)){ var i = +s; return { k: i === 0 ? "N0" : neg ? "Z" : "N", t: anz }; }
    return null;
  }
  var ORD = ["N", "N0", "Z", "Q", "R"], SYM = { N: "ℕ", N0: "ℕ₀", Z: "ℤ", Q: "ℚ", R: "ℝ" };
  function zahlen(){
    var h = '<div class="karte"><h2>' + esc(t("zm_h")) + '</h2><p class="zeile">' + esc(t("zm_i")) + '</p><div id="zmBild"></div><ul class="zmL">' +
      ["zm_N", "zm_N0", "zm_Z", "zm_Q", "zm_R"].map(function(k){ return "<li>" + esc(t(k)) + "</li>"; }).join("") + '</ul><p class="merke">' + esc(t("zm_null")) + '</p><p class="zeile muted">' + esc(t("zm_buch")) + "</p></div>";
    h += '<div class="karte"><p class="zeile"><b>' + esc(t("zm_ein")) + '</b></p><div class="reihe"><input class="zahl" id="zmIn" autocomplete="off" aria-label="Zahl" value="' + esc(EIN.zm || "3/4") + '"><span class="muted">' + esc(t("zm_bsp")) + '</span><span class="chips" id="zmChips"></span></div><div id="zmAus"></div></div>';
    h += '<div class="karte"><h2>' + esc(t("auf_h")) + '</h2><span class="punkte" id="zaP"></span><p class="auftrag">' + esc(t("zm_auf")) + '</p><p class="tgross" id="zaQ" dir="ltr"></p><div class="mc" id="zaMc"></div><p class="meldung" id="zaM"></p><div id="zaW"></div><p><button type="button" class="knopf hell" id="zaNeu">' + esc(t("neu")) + "</button></p></div>";
    $("zahlenBox").innerHTML = h;
    var CH = ["7", "0", "−3", "2/5", komma() ? "0,75" : "0.75", "12/4", "√9", "√2", "π"];
    $("zmChips").innerHTML = CH.map(function(c){ return '<button type="button" class="chip" data-z="' + esc(c) + '" dir="ltr">' + esc(c) + "</button>"; }).join("");
    $("zmChips").addEventListener("click", function(e){ var b = e.target.closest("[data-z]"); if(!b) return; $("zmIn").value = b.dataset.z; zmRechnen(); });
    $("zmIn").addEventListener("input", zmRechnen);
    $("zaNeu").addEventListener("click", function(){ za = null; zaZeigen(); });
    zmRechnen(); zaZeigen();
  }
  function zmRechnen(){
    var v = $("zmIn").value; EIN.zm = v; merken();
    var r = zmLies(v), box = $("zmAus"), bild = $("zmBild");
    bild.innerHTML = ""; bild.appendChild(zmBild(r ? r.k : null, r));
    if(!r){ box.innerHTML = v.trim() ? '<p class="fehler">' + esc(t("zm_fehler")) + "</p>" : ""; return; }
    var idx = ORD.indexOf(r.k);
    box.innerHTML = (r.info ? '<p class="zeile" dir="auto">' + esc(r.info) + "</p>" : "") + '<ul class="zmErg">' + ORD.map(function(k, i){ var drin = i >= idx; return '<li class="' + (drin ? "ja" : "nein") + '"><span class="zmHk">' + (drin ? "✓" : "✗") + "</span> " + bdi(esc(r.t)) + " " + esc(t(drin ? "zm_in" : "zm_nicht")) + " <b>" + SYM[k] + "</b></li>"; }).join("") + '</ul><p class="zeile"><b>' + esc(t("zm_klein")) + "</b> " + SYM[r.k] + "</p>";
  }
  var ZA_POOL = ["5", "12", "0", "−4", "−17", "3/7", "−2/3", "0,25", "1,5", "12/4", "−8/2", "√16", "√5", "π", "−√9", "0/3", "√49", "2,25", "√10", "e"];
  var za = null, zaR = 0, zaN = 0;
  function zaZeigen(){
    if(!za){ var q = ZA_POOL[Math.floor(Math.random() * ZA_POOL.length)]; za = { q: q, r: zmLies(q), fertig: false }; }
    var qq = komma() ? za.q : za.q.replace(",", ".");
    $("zaQ").textContent = qq;
    $("zaMc").innerHTML = ORD.map(function(k){ var cls = za.fertig ? (k === za.r.k ? " richtig" : k === za.wahl ? " falsch" : "") : (za.falsch === k ? " falsch" : ""); return '<button type="button" class="mcB zmB' + cls + '" data-k="' + k + '"' + (za.fertig ? " disabled" : "") + ">" + SYM[k] + "</button>"; }).join("");
    $("zaMc").querySelectorAll("[data-k]").forEach(function(b){ b.addEventListener("click", function(){ zaAntwort(b.dataset.k); }); });
    var m = $("zaM"), w = $("zaW");
    if(za.fertig){ m.className = "meldung " + (za.ok ? "gut" : "schlecht"); m.textContent = za.ok ? t("richtig") : t("falsch", { l: SYM[za.r.k] });
      var L = []; if(za.r.info) L.push(za.r.info); L.push(t("zm_klein") + " " + SYM[za.r.k]);
      w.innerHTML = '<p class="zeile"><b>' + esc(t("weg")) + "</b></p>" + L.map(function(x){ return '<p class="zeile" dir="auto">' + esc(x) + "</p>"; }).join("") + '<p class="zeile">' + esc(t("zm_" + za.r.k)) + "</p>";
    } else { if(!za.falsch){ m.className = "meldung"; m.textContent = ""; } w.innerHTML = ""; }
    $("zaP").textContent = zaN ? t("punkte", { r: zaR, n: zaN }) : "";
  }
  function zaAntwort(k){
    if(za.fertig) return;
    var ok = k === za.r.k;
    if(!ok && !za.falsch){ za.falsch = k; zaZeigen(); if(typeof msNochmal === "function") msNochmal($("zaM")); return; }
    za.fertig = true; za.ok = ok; za.wahl = k; zaN++; if(ok){ zaR++; if(typeof msRichtig === "function") try { msRichtig(); } catch(x){} }
    zaZeigen();
  }

  // ---------- Reiter: Zahnräder & Uhr ----------
  var zr = { a: EIN.za || 12, b: EIN.zb || 36, w: 0, lauf: true, T: null, last: 0, uhr: 0, uhrLauf: true };
  var UHR_TEMPO = [1, 5, 15, 60, 240]; // Uhr-Minuten je echter Sekunde
  function zahnPfad(n, r){
    var ra = r + 4.5, ri = r - 5, d = "";
    for(var i = 0; i < n; i++){
      var a0 = (i - 0.5) * 2 * Math.PI / n, s = 2 * Math.PI / n;
      var P = [[ri, a0 + s * 0.05], [ra, a0 + s * 0.3], [ra, a0 + s * 0.7], [ri, a0 + s * 0.95]];
      P.forEach(function(p, j){ d += (i === 0 && j === 0 ? "M" : "L") + (p[0] * Math.cos(p[1])).toFixed(2) + " " + (p[0] * Math.sin(p[1])).toFixed(2) + " "; });
    }
    return d + "Z";
  }
  function zahnrad(){
    var h = '<div class="karte"><h2>' + esc(t("zr_h")) + '</h2><p class="zeile">' + esc(t("zr_i")) + '</p><div class="regler"><label>' + esc(t("zr_a")) + ' <input type="range" id="zrA" min="6" max="40" value="' + zr.a + '"> <output id="zrAW"></output></label><label>' + esc(t("zr_b")) + ' <input type="range" id="zrB" min="6" max="40" value="' + zr.b + '"> <output id="zrBW"></output></label><button type="button" class="knopf hell" id="zrLauf"></button></div><div id="zrBild"></div><p class="zeile" id="zrErg"></p><div id="zrK"></div><p class="merke">' + esc(t("zr_regel")) + "</p></div>";
    h += '<div class="karte"><h2>' + esc(t("zr_uhr_h")) + '</h2><p class="zeile">' + esc(t("zr_uhr_i")) + '</p><ul><li>' + esc(t("zr_uhr_p1")) + "</li><li>" + esc(t("zr_uhr_p2")) + "</li></ul>" + kette([br(24, 8) + " · " + br(32, 8), "3 · 4", "12"]) + '<div id="uhrBild"></div><p class="uhrLeg"><span class="ul ulM">' + esc(tA("zr_uhr_n")[0]) + ': 8</span><span class="ul ulZ">' + esc(tA("zr_uhr_n")[1]) + ': 24 + 8</span><span class="ul ulS">' + esc(tA("zr_uhr_n")[2]) + ': 32</span></p>' +
      '<div class="regler"><label>' + esc(t("zr_uhr_tempo")) + ' <input type="range" id="uhrT" min="0" max="4" value="' + (EIN.ut == null ? 2 : EIN.ut) + '"> <output id="uhrTW" dir="ltr"></output></label><button type="button" class="knopf hell" id="uhrLauf"></button></div>' +
      '<p class="zeile"><b>' + esc(t("zr_uhr_z")) + '</b> <span id="uhrZeit" dir="ltr"></span></p><p class="zeile" id="uhrUm"></p><p class="merke">' + esc(t("zr_uhr_leg")) + "</p></div>";
    h += '<div class="karte" id="q_zanti"><h2>' + esc(t("zr_anti_h")) + '</h2><p class="zeile">' + esc(t("zr_anti_i")) + "</p>" + kette([br(64, 38) + " · " + br(48, 24) + " · " + br(127, 32), br("64 · 48 · 127", "38 · 24 · 32"), br(gz(390144), gz(29184)), br(254, 19), { r: "≈", h: z(13.368, 3) }]) + '<p class="zeile">' + esc(t("zr_anti_m")) + '</p><p class="zeile">' + esc(t("zr_anti_s")) + "</p>" + fotoBox("anti").replace('<figure class="foto"', '<figure class="foto" data-cap="' + esc(t("s_anti_h")) + '"') + "</div>";
    h += '<div class="karte"><h2>' + esc(t("auf_h")) + '</h2><span class="punkte" id="zgP"></span><p class="auftrag" id="zgQ"></p><div class="antwortzeile"><input class="zahl" id="zgIn" inputmode="decimal" autocomplete="off" aria-label="="><button type="button" class="knopf" id="zgPr">' + esc(t("pruefen")) + '</button></div><p class="meldung" id="zgM"></p><div id="zgW"></div><p><button type="button" class="knopf hell" id="zgNeu">' + esc(t("neu")) + "</button></p></div>";
    $("zahnradBox").innerHTML = h;
    fotosVerdrahten($("zahnradBox"));
    $("zrA").addEventListener("input", function(){ zr.a = +this.value; EIN.za = zr.a; merken(); zrText(); zrZeichnen(); });
    $("zrB").addEventListener("input", function(){ zr.b = +this.value; EIN.zb = zr.b; merken(); zrText(); zrZeichnen(); });
    $("zrLauf").addEventListener("click", function(){ zr.lauf = !zr.lauf; zrText(); });
    $("uhrT").addEventListener("input", function(){ EIN.ut = +this.value; merken(); uhrText(); });
    $("uhrLauf").addEventListener("click", function(){ zr.uhrLauf = !zr.uhrLauf; uhrText(); });
    $("zgPr").addEventListener("click", zgPruefen);
    $("zgIn").addEventListener("keydown", function(e){ if(e.key === "Enter"){ e.preventDefault(); if(zg && zg.fertig){ zg = null; zgZeigen(); } else zgPruefen(); } });
    $("zgNeu").addEventListener("click", function(){ zg = null; zgZeigen(); });
    zrText(); zrZeichnen(); uhrText(); uhrZeichnen(); zgZeigen();
    if(!zr.T) zr.T = requestAnimationFrame(tick);
  }
  function bruchKurz(a, b){ var g = ggT(a, b); a /= g; b /= g; return b === 1 ? String(a) : br(a, b); }
  function zrText(){
    $("zrAW").textContent = zr.a; $("zrBW").textContent = zr.b; $("zrLauf").textContent = zr.lauf ? t("zr_stopp") : t("zr_start");
    var g = ggT(zr.a, zr.b), q = zr.a / zr.b;
    $("zrErg").innerHTML = esc(t("zr_erg", { n: "§" })).replace("§", bdi(bruchKurz(zr.a, zr.b) + (g !== zr.b && zr.b / g !== 1 ? " ≈ " + z(q, 2) : "")));
    $("zrK").innerHTML = kette(["n₂", "n₁ · " + br("z₁", "z₂"), "1 · " + br(zr.a, zr.b), { r: zr.a % zr.b === 0 || (q * 100) % 1 === 0 ? "=" : "≈", h: z(q, 2) }]);
  }
  function zrZeichnen(){
    var box = $("zrBild"); if(!box) return;
    var m = 3.2, rA = zr.a * m, rB = zr.b * m, W = 2 * (rA + rB) + 40, H = 2 * Math.max(rA, rB) + 50, cy = (H - 22) / 2, cA = 16 + rA, cB = cA + rA + rB;
    var s = el("svg", { viewBox: "0 0 " + W.toFixed(0) + " " + H.toFixed(0), "class": "bild zr", role: "img", dir: "ltr" });
    var wB = -zr.w * zr.a / zr.b + Math.PI - Math.PI / zr.b;
    [[cA, rA, zr.a, zr.w, "#f59e0b"], [cB, rB, zr.b, wB, "#38bdf8"]].forEach(function(q){
      var g = el("g", { transform: "translate(" + q[0].toFixed(1) + "," + cy.toFixed(1) + ") rotate(" + (q[3] * 180 / Math.PI).toFixed(2) + ")" });
      g.appendChild(el("path", { d: zahnPfad(q[2], q[1]), fill: q[4], stroke: "#1a2233", "stroke-width": 1.5 }));
      g.appendChild(el("circle", { r: Math.max(5, q[1] * 0.18), fill: "#ffffff", stroke: "#1a2233", "stroke-width": 1.5 }));
      g.appendChild(el("line", { x1: q[1] * 0.25, y1: 0, x2: q[1] - 8, y2: 0, stroke: "#b91c1c", "stroke-width": 4, "stroke-linecap": "round" }));
      s.appendChild(g);
    });
    var rundA = zr.w / (2 * Math.PI), rundB = rundA * zr.a / zr.b;
    s.appendChild(el("text", { x: cA, y: H - 4, "text-anchor": "middle", "class": "bt" }, "↻ " + z(rundA, 1)));
    s.appendChild(el("text", { x: cB, y: H - 4, "text-anchor": "middle", "class": "bt" }, "↺ " + z(rundB, 1)));
    box.innerHTML = ""; box.appendChild(s);
  }
  // 🆕 24.11.: Uhr mit sichtbarem Räderwerk (Zeigerwerk): Minutenrad 8 → 24 | 8 → Stundenrad 32 (3 · 4 = 12)
  function uhrText(){
    var i = EIN.ut == null ? 2 : EIN.ut; $("uhrTW").textContent = "1 s = " + UHR_TEMPO[i] + " min";
    $("uhrLauf").textContent = zr.uhrLauf ? t("zr_stopp") : t("zr_start");
  }
  function rad(s, x, y, n, r, w, farbe, opa){
    var g = el("g", { transform: "translate(" + x.toFixed(1) + "," + y.toFixed(1) + ") rotate(" + (w * 180 / Math.PI).toFixed(2) + ")" });
    g.appendChild(el("path", { d: zahnPfad(n, r), fill: farbe, stroke: "#1a2233", "stroke-width": 1.3, "fill-opacity": opa || 1 }));
    for(var k = 0; k < (r > 20 ? 4 : 0); k++){ var a = k * Math.PI / 2; g.appendChild(el("line", { x1: 0, y1: 0, x2: (r - 7) * Math.cos(a), y2: (r - 7) * Math.sin(a), stroke: "#1a2233", "stroke-opacity": .35, "stroke-width": 3 })); }
    s.appendChild(g);
  }
  function zeiger(s, x, y, l, grad, farbe, dicke){ var a = grad * Math.PI / 180; s.appendChild(el("line", { x1: x, y1: y, x2: x + l * Math.sin(a), y2: y - l * Math.cos(a), stroke: farbe, "stroke-width": dicke, "stroke-linecap": "round" })); }
  function uhrZeichnen(){
    var box = $("uhrBild"); if(!box) return;
    var s = el("svg", { viewBox: "0 0 486 244", "class": "bild uhr", role: "img", dir: "ltr" });
    var min = zr.uhr % 720, wm = (min % 60) * 6, wh = (min / 60) * 30, cx = 102, cy = 122;
    // Zifferblatt
    s.appendChild(el("circle", { cx: cx, cy: cy, r: 96, fill: "#ffffff", stroke: "#1a2233", "stroke-width": 4 }));
    for(var i = 0; i < 60; i++){ var a = i * Math.PI / 30, l = i % 5 ? 6 : 13; s.appendChild(el("line", { x1: cx + 88 * Math.sin(a), y1: cy - 88 * Math.cos(a), x2: cx + (88 - l) * Math.sin(a), y2: cy - (88 - l) * Math.cos(a), stroke: "#1a2233", "stroke-width": i % 5 ? 1.2 : 3 })); }
    for(var hh = 1; hh <= 12; hh++){ var bw = hh * Math.PI / 6; s.appendChild(el("text", { x: cx + 63 * Math.sin(bw), y: cy - 63 * Math.cos(bw) + 6, "text-anchor": "middle", "class": "bt" }, String(hh))); }
    zeiger(s, cx, cy, 48, wh, "#1d4ed8", 8);
    zeiger(s, cx, cy, 78, wm, "#dc2626", 4.5);
    s.appendChild(el("circle", { cx: cx, cy: cy, r: 6, fill: "#1a2233" }));
    // Räderwerk: A (8, Minutenwelle) → B (24) | C (8, gleiche Achse) → D (32, Stundenrad)
    var m = 2.2, rA = 8 * m, rB = 24 * m, rD = 32 * m, A = [262, 84], B = [A[0] + rA + rB, 84], psi = 62 * Math.PI / 180, D = [B[0] + (rA + rD) * Math.cos(psi), B[1] + (rA + rD) * Math.sin(psi)];
    var aA = zr.uhr * 6 * Math.PI / 180,  // 🆕 durchgehend (nicht mod 60), sonst springt das Räderwerk zur vollen Stunde
       aB = -aA * 8 / 24 + Math.PI - Math.PI / 24, aC = aB, aD = -(aC - psi) * 8 / 32 + psi + Math.PI - Math.PI / 32;
    rad(s, D[0], D[1], 32, rD, aD, "#60a5fa");
    rad(s, B[0], B[1], 24, rB, aB, "#fbbf24", .92);
    rad(s, B[0], B[1], 8, rA, aC, "#f97316");
    rad(s, A[0], A[1], 8, rA, aA, "#f87171");
    // Zeiger auf den Achsen: rot = Minutenzeiger (sitzt auf Rad A), blau = Stundenzeiger (sitzt auf Rad D)
    zeiger(s, D[0], D[1], rD - 6, wh, "#1d4ed8", 6);
    zeiger(s, A[0], A[1], rA + 20, wm, "#dc2626", 4.5);
    [A, B, D].forEach(function(p){ s.appendChild(el("circle", { cx: p[0], cy: p[1], r: 3.5, fill: "#1a2233" })); });
    s.appendChild(el("text", { x: A[0] - rA - 10, y: A[1] + 5, "text-anchor": "end", "class": "bt" }, "8"));
    s.appendChild(el("text", { x: B[0], y: B[1] - rB - 9, "text-anchor": "middle", "class": "bt" }, "24 + 8"));
    s.appendChild(el("text", { x: D[0] + rD + 9, y: D[1] + 5, "text-anchor": "start", "class": "bt" }, "32"));
    box.innerHTML = ""; box.appendChild(s);
    var hhh = Math.floor(min / 60), mm = Math.floor(min % 60);
    $("uhrZeit").textContent = (hhh === 0 ? 12 : hhh) + ":" + (mm < 10 ? "0" : "") + mm;
    $("uhrUm").innerHTML = esc(t("zr_uhr_um", { m: "§1", z: "§2", h: "§3" })).replace("§1", bdi(z(zr.uhr / 60, 2))).replace("§2", bdi(z(zr.uhr / 180, 2))).replace("§3", bdi(z(zr.uhr / 720, 2)));
  }
  function tick(ts){
    zr.T = requestAnimationFrame(tick);
    var dt = zr.last ? Math.min(0.1, (ts - zr.last) / 1000) : 0; zr.last = ts;
    if($("s_zahnrad").hidden) return;
    if(zr.lauf){ zr.w += dt * 2 * Math.PI / 4; zrZeichnen(); }
    if(zr.uhrLauf){ zr.uhr += dt * UHR_TEMPO[EIN.ut == null ? 2 : EIN.ut]; uhrZeichnen(); }
  }
  var zg = null, zgR = 0, zgN = 0;
  function zgErzeuge(sd){
    var r = seeded(sd), Z = [8, 10, 12, 15, 16, 18, 20, 24, 25, 30, 32, 36, 40, 45, 48, 60];
    function w(L){ return L[Math.floor(r() * L.length)]; }
    var a = w(Z), b, n, e;
    do { b = w(Z); } while(b === a);
    if(r() < 0.6){
      n = (b / ggT(a, b)) * (1 + Math.floor(r() * 3)); e = n * a / b;
      return { sd: sd, q: ["zr_q", { a: a, b: b, n: n }], w: e, weg: [["n₂", "n₁ · " + br("z₁", "z₂"), n + " · " + br(a, b), br(n * a, b), String(e)]] };
    }
    // treibendes Rad gesucht: z₁ = z₂ · n₂ : n₁
    var n2 = 1 + Math.floor(r() * 6), n1; do { n1 = 1 + Math.floor(r() * 6); } while((b * n2) % n1 !== 0 || n1 === n2);
    e = b * n2 / n1;
    return { sd: sd, q: ["zr_q2", { a: b, n: n2, m: n1 }], w: e, weg: [["z₁", "z₂ · " + br("n₂", "n₁"), b + " · " + br(n2, n1), br(b * n2, n1), String(e)]] };
  }
  function zgZeigen(){
    if(!zg){ zg = zgErzeuge(Math.floor(Math.random() * 1e9)); zg.fertig = false; zg.v = 0; $("zgIn").value = ""; }
    else { var alt = zg; zg = zgErzeuge(alt.sd); zg.fertig = alt.fertig; zg.ok = alt.ok; zg.v = alt.v; }
    $("zgQ").textContent = t(zg.q[0], zg.q[1]);
    var m = $("zgM"), w = $("zgW");
    if(zg.fertig){ m.className = "meldung " + (zg.ok ? "gut" : "schlecht"); m.textContent = zg.ok ? t("richtig") : t("falsch", { l: zg.w }); w.innerHTML = '<p class="zeile"><b>' + esc(t("weg")) + "</b></p>" + zg.weg.map(kette).join(""); $("zgIn").readOnly = true; }
    else { if(!zg.v){ m.className = "meldung"; m.textContent = ""; } w.innerHTML = ""; $("zgIn").readOnly = false; }
    $("zgP").textContent = zgN ? t("punkte", { r: zgR, n: zgN }) : "";
  }
  function zgPruefen(){
    if(!zg || zg.fertig) return;
    var e = lies($("zgIn").value); if(!isFinite(e)) return;
    var ok = Math.abs(e - zg.w) < 1e-9;
    if(!ok && !zg.v && typeof msNochmal === "function"){ zg.v = 1; msNochmal($("zgM")); return; }
    zg.fertig = true; zg.ok = ok; zgN++; if(ok){ zgR++; if(typeof msRichtig === "function") try { msRichtig(); } catch(x){} }
    zgZeigen();
  }

  // ---------- Reiter & Texte ----------
  var TABS = ["zeit", "quellen", "begriffe", "zahlen", "zahnrad"], tab = "zeit";
  function zeigeTab(k){
    tab = k;
    document.querySelectorAll(".tabs button").forEach(function(b){ b.setAttribute("aria-selected", b.dataset.tab === k ? "true" : "false"); });
    TABS.forEach(function(x){ $("s_" + x).hidden = x !== k; });
  }
  document.querySelectorAll(".tabs button").forEach(function(b){ b.addEventListener("click", function(){ zeigeTab(b.dataset.tab); history.replaceState(null, "", "#" + b.dataset.tab); window.scrollTo(0, 0); }); });
  function route(){
    var hz = (location.hash || "").slice(1);
    if(TABS.indexOf(hz) >= 0){ zeigeTab(hz); return; }
    var q = hz && document.getElementById("q_" + hz);
    if(q){ zeigeTab(q.closest("section").id.slice(2)); q.scrollIntoView(); }
  }
  window.addEventListener("hashchange", route);
  function alles(){
    document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = "miStudia – " + t("titel"); $("titel").textContent = t("titel"); $("intro").textContent = t("intro");
    document.querySelectorAll(".tabs button").forEach(function(b){ b.textContent = t("tab_" + b.dataset.tab); });
    zeitleiste(); quellen(); begriffe(); zahlen(); zahnrad();
  }
  window.MS_LANG = { apply: function(l){ if(GS[l]){ lang = l; alles(); } } };
  alles(); route();
  window.MS_GS_TEST = { zmLies: zmLies, zgErzeuge: zgErzeuge };
})();
