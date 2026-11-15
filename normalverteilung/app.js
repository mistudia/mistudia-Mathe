// ============================================================
// normalverteilung/app.js – Normalverteilung
// Glockenkurve: μ und σ eingeben, P(X ≤ b), P(X ≥ a), P(a ≤ X ≤ b) als
//   Fläche, Standardisierung z = (x − μ) : σ, Φ(z), σ-Regeln (1σ/2σ/3σ),
//   Beispiele (Körpergröße, IQ, Abfüllung, Prüfung, Lebensdauer).
// Binomial → Normal: B(n, p) als Histogramm mit Glockenkurve, P(X ≤ k)
//   exakt und genähert (mit Stetigkeitskorrektur), Laplace-Bedingung σ > 3.
// Üben: P(X ≤ x), P(X ≥ x), P(a ≤ X ≤ b), σ-Regel, z-Wert, Quantil.
// Texte: normalverteilung/texte.js (NV), Sprache aus dem Startmenü (MS_LANG).
// ============================================================
(function(){
  "use strict";
  var NS = "http://www.w3.org/2000/svg", lang = "de";
  function $(id){ return document.getElementById(id); }
  function t(k, v){ var s = (NV[lang] && NV[lang][k] != null) ? NV[lang][k] : NV.de[k] != null ? NV.de[k] : k; if(v) for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  function el(n, a, txt){ var e = document.createElementNS(NS, n); for(var k in a) if(a[k] != null) e.setAttribute(k, a[k]); if(txt != null) e.textContent = txt; return e; }
  function leer(s){ while(s.lastChild) s.removeChild(s.lastChild); }
  function sicht(e, an){ if(an) e.removeAttribute("hidden"); else e.setAttribute("hidden", ""); }
  function bdi(s){ return '<bdi dir="ltr">' + s + "</bdi>"; }
  function zuf(a, b){ return a + Math.floor(Math.random() * (b - a + 1)); }
  function wahl(L){ return L[Math.floor(Math.random() * L.length)]; }
  function komma(){ return !(lang === "en" || lang === "zh" || lang === "ja" || lang === "ar"); }
  function zahl(v, d){ if(d == null) d = 4; var r = Math.round(v * Math.pow(10, d)) / Math.pow(10, d); if(Object.is(r, -0)) r = 0; var s = String(Math.abs(r)); if(s.indexOf("e") >= 0) s = Math.abs(r).toFixed(d); if(komma()) s = s.replace(".", ","); return (r < 0 ? "−" : "") + s; }
  function proz(v){ return zahl(v * 100, 2) + " %"; }
  function lies(s){ s = String(s).trim().replace(/\s/g, "").replace(/[−–]/g, "-").replace(",", "."); if(!s) return NaN; var pr = /%$/.test(s); if(pr) s = s.slice(0, -1); var v = Number(s); return pr ? v / 100 : v; }

  // ---------- Normalverteilung ----------
  function erfc(x){ // Numerical Recipes, Fehler < 1,2·10⁻⁷
    var z = Math.abs(x), tt = 1 / (1 + 0.5 * z);
    var r = tt * Math.exp(-z * z - 1.26551223 + tt * (1.00002368 + tt * (0.37409196 + tt * (0.09678418 + tt * (-0.18628806 + tt * (0.27886807 + tt * (-1.13520398 + tt * (1.48851587 + tt * (-0.82215223 + tt * 0.17087277)))))))));
    return x >= 0 ? r : 2 - r;
  }
  function Phi(z){ return 0.5 * erfc(-z / Math.SQRT2); }
  function phi(x, mu, s){ return Math.exp(-0.5 * Math.pow((x - mu) / s, 2)) / (s * Math.sqrt(2 * Math.PI)); }
  function quantil(q){ var a = -10, b = 10; for(var i = 0; i < 80; i++){ var m = (a + b) / 2; if(Phi(m) < q) a = m; else b = m; } return (a + b) / 2; }
  function verteilungB(n, p){ var lf = [0]; for(var i = 1; i <= n; i++) lf[i] = lf[i - 1] + Math.log(i); var P = []; for(var k = 0; k <= n; k++) P[k] = Math.exp(lf[n] - lf[k] - lf[n - k] + k * Math.log(p) + (n - k) * Math.log(1 - p)); return P; }

  // ---------- Reiter Glockenkurve ----------
  var BSP = { koerper: [170, 8, "cm", 160, 180], iq: [100, 15, "", 85, 115], abfuell: [500, 4, "g", 495, 505], pruefung: [60, 12, "", 50, 75], lampe: [1000, 80, "h", 900, 1100], eigen: [0, 1, "", -1, 1] };
  var art = "zwischen", ARTEN = ["hoechstens", "mindestens", "zwischen"];
  function einheit(){ var B = BSP[$("bsp").value]; return B && B[2] ? " " + t("e_" + B[2]) : ""; }
  function setzeArt(a, werte){
    art = a; var box = $("art"); box.innerHTML = "";
    ARTEN.forEach(function(x){ var b = document.createElement("button"); b.type = "button"; b.textContent = t("art_" + x); b.setAttribute("aria-pressed", x === art ? "true" : "false"); b.addEventListener("click", function(){ var alt = [$("xa") ? $("xa").value : null, $("xb") ? $("xb").value : null]; setzeArt(x, alt); }); box.appendChild(b); });
    var e = $("artEing"); e.innerHTML = "";
    function inp(id, v, txt){ var l = document.createElement("label"); l.innerHTML = txt; var i = document.createElement("input"); i.className = "zahl"; i.id = id; i.value = v; i.setAttribute("inputmode", "decimal"); i.style.width = "100px"; i.addEventListener("input", glocke); l.appendChild(i); e.appendChild(l); }
    var B = BSP[$("bsp").value] || BSP.eigen, w = werte || [String(B[3]), String(B[4])];
    if(art !== "mindestens") inp("xb", w[1] != null ? w[1] : B[4], art === "zwischen" ? " b = " : "b = ");
    if(art !== "hoechstens") inp("xa", w[0] != null ? w[0] : B[3], "a = ");
    if(art === "zwischen"){ var lb = e.lastChild; e.insertBefore(lb, e.firstChild); }
    glocke();
  }
  function glocke(){
    var mu = lies($("mu").value), s = lies($("sigma").value), a = $("xa") ? lies($("xa").value) : -Infinity, b = $("xb") ? lies($("xb").value) : Infinity;
    var ok = isFinite(mu) && s > 0 && !isNaN(a) && !isNaN(b) && a <= b;
    $("fehler").textContent = ok ? "" : t("fehler");
    if(!ok){ ["ergebnis", "weg"].forEach(function(id){ $(id).innerHTML = ""; }); leer($("nSvg")); return; }
    var za = (a - mu) / s, zb = (b - mu) / s, P = Phi(zb) - Phi(za), E = einheit();
    var ktxt = art === "hoechstens" ? "P(X ≤ " + zahl(b, 2) + ")" : art === "mindestens" ? "P(X ≥ " + zahl(a, 2) + ")" : "P(" + zahl(a, 2) + " ≤ X ≤ " + zahl(b, 2) + ")";
    $("ergebnis").innerHTML = bdi(ktxt + " ≈ " + zahl(P, 4) + " ≈ " + proz(P));
    var W = [];
    W.push(t("standard") + " " + bdi("z = (x − μ) : σ"));
    if(art !== "mindestens") W.push(bdi("z<sub>b</sub> = (" + zahl(b, 2) + " − " + zahl(mu, 2) + ") : " + zahl(s, 2) + " ≈ " + zahl(zb, 3) + " → Φ(" + zahl(zb, 2) + ") ≈ " + zahl(Phi(zb), 4)));
    if(art !== "hoechstens") W.push(bdi("z<sub>a</sub> = (" + zahl(a, 2) + " − " + zahl(mu, 2) + ") : " + zahl(s, 2) + " ≈ " + zahl(za, 3) + " → Φ(" + zahl(za, 2) + ") ≈ " + zahl(Phi(za), 4)));
    W.push(bdi(art === "hoechstens" ? ktxt + " = Φ(z<sub>b</sub>) ≈ " + zahl(P, 4) : art === "mindestens" ? ktxt + " = 1 − Φ(z<sub>a</sub>) ≈ " + zahl(P, 4) : ktxt + " = Φ(z<sub>b</sub>) − Φ(z<sub>a</sub>) ≈ " + zahl(P, 4)));
    $("weg").innerHTML = W.map(function(x){ return "<li>" + x + "</li>"; }).join("");
    kurve($("nSvg"), mu, s, a, b, E);
    $("nMerke").textContent = t("nMerke");
  }
  function kurve(sv, mu, s, a, b, E){
    leer(sv); var W = (sv.clientWidth || 640) < 520 ? 420 : 640, H = 300; sv.setAttribute("viewBox", "0 0 " + W + " " + H);
    var L = 20, R = W - 20, T = 16, B = H - 40, x0 = mu - 4 * s, x1 = mu + 4 * s, ymax = phi(mu, mu, s) * 1.12;
    var X = function(x){ return L + (x - x0) / (x1 - x0) * (R - L); }, Y = function(y){ return B - y / ymax * (B - T); };
    var aa = Math.max(a, x0), bb = Math.min(b, x1);
    if(bb > aa){ var d = "M" + X(aa) + " " + B; for(var i = 0; i <= 200; i++){ var x = aa + (bb - aa) * i / 200; d += " L" + X(x).toFixed(1) + " " + Y(phi(x, mu, s)).toFixed(1); } d += " L" + X(bb) + " " + B + " Z"; sv.appendChild(el("path", { d: d, "class": "flaeche" })); }
    for(var k = -3; k <= 3; k++){ var xs = mu + k * s; sv.appendChild(el("line", { x1: X(xs), y1: T, x2: X(xs), y2: B, "class": k ? "sigmaL" : "mu" })); sv.appendChild(el("text", { x: X(xs), y: B + 16, "class": "ko-zahl" }, zahl(xs, 2))); sv.appendChild(el("text", { x: X(xs), y: B + 31, "class": "ko-zahl", style: "fill:#94a3b8" }, k === 0 ? "μ" : (k > 0 ? "μ+" : "μ−") + (Math.abs(k) === 1 ? "" : Math.abs(k)) + "σ")); }
    var dd = ""; for(var j = 0; j <= 300; j++){ var xx = x0 + (x1 - x0) * j / 300; dd += (j ? " L" : "M") + X(xx).toFixed(1) + " " + Y(phi(xx, mu, s)).toFixed(1); }
    sv.appendChild(el("path", { d: dd, "class": "glocke" }));
    sv.appendChild(el("line", { x1: L, y1: B, x2: R, y2: B, "class": "achse" }));
    if(E) sv.appendChild(el("text", { x: R, y: T + 4, "class": "ko-zahl", style: "text-anchor:end" }, "x" + E.replace(" ", " in ")));
  }
  function sigmaRegel(k){ var mu = lies($("mu").value), s = lies($("sigma").value); if(!(s > 0)) return; setzeArt("zwischen", [String(Math.round((mu - k * s) * 1000) / 1000), String(Math.round((mu + k * s) * 1000) / 1000)]); [ $("xa"), $("xb") ].forEach(function(i){ if(komma()) i.value = i.value.replace(".", ","); }); glocke(); }
  ["mu", "sigma"].forEach(function(id){ $(id).addEventListener("input", function(){ $("bsp").value = "eigen"; $("bText").textContent = t("bt_eigen"); glocke(); }); });
  $("bsp").addEventListener("change", function(){ var B = BSP[$("bsp").value]; $("mu").value = B[0]; $("sigma").value = B[1]; $("bText").textContent = t("bt_" + $("bsp").value); setzeArt(art); });

  // ---------- Reiter Binomial → Normal ----------
  function naeherung(){
    var n = Number($("bn").value), p = Number($("bp").value), k = Math.min(n, Number($("bk").value)); $("bk").max = n; if(Number($("bk").value) > n) $("bk").value = n;
    $("bnW").textContent = n; $("bpW").textContent = zahl(p, 2); $("bkW").textContent = k;
    var P = verteilungB(n, p), mu = n * p, s = Math.sqrt(n * p * (1 - p)), exakt = 0; for(var i = 0; i <= k; i++) exakt += P[i];
    var mitK = Phi((k + 0.5 - mu) / s), ohneK = Phi((k - mu) / s);
    var sv = $("bnSvg"); leer(sv); var W = (sv.clientWidth || 640) < 520 ? 420 : 640, H = 300; sv.setAttribute("viewBox", "0 0 " + W + " " + H);
    var k0 = Math.max(0, Math.floor(mu - 4.5 * s)), k1 = Math.min(n, Math.ceil(mu + 4.5 * s)), L = 30, R = W - 10, T = 14, B = H - 30, ymax = Math.max(Math.max.apply(0, P.slice(k0, k1 + 1)), phi(mu, mu, s)) * 1.1;
    var bw = (R - L) / (k1 - k0 + 1), X = function(x){ return L + (x - k0 + 0.5) * bw; }, Y = function(y){ return B - y / ymax * (B - T); };
    for(var j = k0; j <= k1; j++) sv.appendChild(el("rect", { x: X(j) - bw / 2 + 0.5, y: Y(P[j]), width: Math.max(1, bw - 1), height: B - Y(P[j]), "class": "balken" + (j <= k ? " an" : "") }));
    var d = ""; for(var q = 0; q <= 300; q++){ var x = k0 - 0.5 + (k1 - k0 + 1) * q / 300; d += (q ? " L" : "M") + X(x).toFixed(1) + " " + Y(phi(x, mu, s)).toFixed(1); }
    sv.appendChild(el("path", { d: d, "class": "glocke" }));
    var st = Math.max(1, Math.ceil((k1 - k0 + 1) / 16)); for(var m = k0; m <= k1; m += st) sv.appendChild(el("text", { x: X(m), y: B + 16, "class": "ko-zahl" }, String(m)));
    sv.appendChild(el("line", { x1: L, y1: B, x2: R, y2: B, "class": "achse" }));
    $("bnErg").innerHTML = "<b>" + t("exakt") + "</b> " + bdi("P(X ≤ " + k + ") ≈ " + zahl(exakt, 4)) + "<br><b>" + t("mitKorr") + "</b> " + bdi("Φ((" + k + " + 0,5 − ".replace(",", komma() ? "," : ".") + zahl(mu, 2) + ") : " + zahl(s, 2) + ") ≈ " + zahl(mitK, 4)) +
      "<br><b>" + t("ohneKorr") + "</b> " + bdi("Φ((" + k + " − " + zahl(mu, 2) + ") : " + zahl(s, 2) + ") ≈ " + zahl(ohneK, 4)) + "<br>" + t(s > 3 ? "laplaceJa" : "laplaceNein", { s: bdi(zahl(s, 2)) });
    $("bnMerke").textContent = t("bnMerke");
  }
  ["bn", "bp", "bk"].forEach(function(id){ $(id).addEventListener("input", naeherung); });

  // ---------- Reiter Üben ----------
  var auf = null, punkte = 0, anzahl = 0, beantwortet = false, letzte = null;
  function neueAufgabe(){
    beantwortet = false; letzte = null;
    var bsp = wahl(["koerper", "iq", "abfuell", "pruefung", "lampe"]), B = BSP[bsp], mu = B[0], s = B[1];
    var typ = wahl(["kleiner", "groesser", "zwischen", "sigma", "z", "quantil"]), A = { typ: typ, bsp: bsp, mu: mu, s: s };
    var off = function(){ return Math.round(wahl([-2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2, 2.5]) * s * 10) / 10; };
    if(typ === "kleiner"){ A.x = mu + off(); A.l = Phi((A.x - mu) / s); }
    else if(typ === "groesser"){ A.x = mu + off(); A.l = 1 - Phi((A.x - mu) / s); }
    else if(typ === "zwischen"){ var o1 = off(), o2 = off(); A.a = mu + Math.min(o1, o2); A.b = mu + Math.max(o1, o2); if(A.a === A.b) A.b += s; A.l = Phi((A.b - mu) / s) - Phi((A.a - mu) / s); }
    else if(typ === "sigma"){ A.k = wahl([1, 2, 3]); A.l = [0, 0.6827, 0.9545, 0.9973][A.k]; }
    else if(typ === "z"){ A.x = mu + off(); A.l = (A.x - mu) / s; }
    else { A.q = wahl([0.9, 0.95, 0.1, 0.05, 0.75]); A.l = mu + quantil(A.q) * s; }
    auf = A; zeige();
  }
  function zeige(){
    var A = auf, Z = $("antwortzeile"), E = BSP[A.bsp][2] ? " " + t("e_" + BSP[A.bsp][2]) : "";
    var v = { kontext: t("ux_" + A.bsp, { mu: bdi(zahl(A.mu, 2) + E), s: bdi(zahl(A.s, 2) + E) }), x: bdi(zahl(A.x || 0, 2) + E), a: bdi(zahl(A.a || 0, 2) + E), b: bdi(zahl(A.b || 0, 2) + E), k: A.k, q: bdi(proz(A.q || 0)) };
    $("auftrag").innerHTML = v.kontext + " " + t("u_" + A.typ, v);
    $("meldung").textContent = ""; $("meldung").className = "meldung"; sicht($("uLauf"), false); Z.innerHTML = "";
    var inp = document.createElement("input"); inp.className = "zahl"; inp.id = "uAntwort"; inp.setAttribute("inputmode", "decimal"); inp.setAttribute("autocomplete", "off"); inp.style.width = "140px";
    inp.addEventListener("keydown", function(e){ if(e.key === "Enter") pruefe(inp.value); });
    var pb = document.createElement("button"); pb.type = "button"; pb.className = "knopf"; pb.id = "pruefen"; pb.textContent = t("pruefen"); pb.addEventListener("click", function(){ pruefe(inp.value); });
    Z.appendChild(inp); Z.appendChild(pb);
    $("uHinweis").textContent = A.typ === "z" ? t("runden2") : A.typ === "quantil" ? t("runden1") : t("runden4");
    $("weiter").textContent = t("weiterA"); $("punkte").textContent = t("punkte", { p: punkte, n: anzahl });
  }
  function pruefe(e){
    if(beantwortet) return;
    var v = lies(e); if(!isFinite(v)) return;
    var A = auf, tol = A.typ === "z" ? 0.011 : A.typ === "quantil" ? Math.max(0.15, A.s * 0.02) : A.typ === "sigma" ? 0.005 : 0.0015;
    var ok = Math.abs(v - A.l) <= tol, L = [], lt = A.typ === "z" ? zahl(A.l, 2) : A.typ === "quantil" ? "≈ " + zahl(A.l, 1) : "≈ " + zahl(A.l, 4) + " (" + proz(A.l) + ")";
    var z = function(x){ return (x - A.mu) / A.s; };
    if(A.typ === "kleiner") L.push(bdi("z = (" + zahl(A.x, 2) + " − " + zahl(A.mu, 2) + ") : " + zahl(A.s, 2) + " = " + zahl(z(A.x), 3) + " → Φ(z) ≈ " + zahl(A.l, 4)));
    else if(A.typ === "groesser") L.push(bdi("z = " + zahl(z(A.x), 3) + " → P = 1 − Φ(z) ≈ 1 − " + zahl(1 - A.l, 4) + " = " + zahl(A.l, 4)));
    else if(A.typ === "zwischen") L.push(bdi("Φ(" + zahl(z(A.b), 2) + ") − Φ(" + zahl(z(A.a), 2) + ") ≈ " + zahl(Phi(z(A.b)), 4) + " − " + zahl(Phi(z(A.a)), 4) + " = " + zahl(A.l, 4)));
    else if(A.typ === "sigma") L.push(t("sigmaRegel"));
    else if(A.typ === "z") L.push(bdi("z = (x − μ) : σ = (" + zahl(A.x, 2) + " − " + zahl(A.mu, 2) + ") : " + zahl(A.s, 2) + " = " + zahl(A.l, 2)));
    else L.push(bdi("Φ(z) = " + zahl(A.q, 2) + " → z ≈ " + zahl(quantil(A.q), 3) + " → x = μ + z · σ ≈ " + zahl(A.l, 1)));
    letzte = e; beantwortet = true; anzahl++; if(ok) punkte++;
    var m = $("meldung"); m.className = "meldung " + (ok ? "gut" : "schlecht"); m.innerHTML = ok ? t("richtig") + " " + bdi(lt) : t("falsch", { l: bdi(lt) });
    $("uLauf").innerHTML = L.map(function(s){ return "<li>" + s + "</li>"; }).join(""); sicht($("uLauf"), true);
    $("punkte").textContent = t("punkte", { p: punkte, n: anzahl });
  }
  $("weiter").addEventListener("click", neueAufgabe);

  // ---------- Reiter & Texte ----------
  var tab = "glocke", TABS = ["glocke", "naeherung", "ueben"];
  function zeigeTab(k){
    tab = k;
    document.querySelectorAll(".tabs button").forEach(function(b){ b.setAttribute("aria-selected", b.dataset.tab === k ? "true" : "false"); });
    TABS.forEach(function(x){ sicht($("s_" + x), x === k); });
    if(k === "ueben" && !auf) neueAufgabe();
    alles(true);
  }
  document.querySelectorAll(".tabs button").forEach(function(b){ b.addEventListener("click", function(){ zeigeTab(b.dataset.tab); }); });
  var erst = true;
  function alles(nurRechnen){
    if(!nurRechnen){
      document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.title = "miStudia – " + t("titel"); $("titel").textContent = t("titel");
      document.querySelectorAll(".tabs button").forEach(function(b){ b.textContent = t("tab_" + b.dataset.tab); });
      var bv = $("bsp").value || "koerper"; $("bsp").innerHTML = Object.keys(BSP).map(function(k){ return '<option value="' + k + '">' + t("bsp_" + k) + "</option>"; }).join(""); $("bsp").value = bv;
      $("tBsp").textContent = t("bspL"); $("bText").textContent = t("bt_" + bv);
      if(erst){ erst = false; $("mu").value = BSP.koerper[0]; $("sigma").value = BSP.koerper[1]; }
      var sk = $("sigmaKnoepfe"); sk.innerHTML = ""; [1, 2, 3].forEach(function(k){ var b = document.createElement("button"); b.type = "button"; b.className = "knopf hell"; b.textContent = "μ ± " + (k === 1 ? "" : k) + "σ"; b.addEventListener("click", function(){ sigmaRegel(k); }); sk.appendChild(b); });
      var alt = [$("xa") ? $("xa").value : null, $("xb") ? $("xb").value : null]; setzeArt(art, alt[0] != null || alt[1] != null ? alt : null);
    }
    if(tab === "glocke") glocke(); else if(tab === "naeherung") naeherung();
    if(!nurRechnen && auf){ var war = beantwortet, e = letzte, gut = $("meldung").classList.contains("gut"); zeige(); if(war){ beantwortet = false; anzahl--; if(gut) punkte--; $("uAntwort").value = e; pruefe(e); } }
  }
  window.MS_LANG = { apply: function(l){ if(NV[l]){ lang = l; alles(); } } };
  $("bsp").innerHTML = '<option value="koerper"></option>';
  alles();
})();
