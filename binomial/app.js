// ============================================================
// binomial/app.js – Binomialverteilung
// Verteilung: B(n, p) als Histogramm; P(X = k), P(X ≤ k), P(X ≥ k),
//   P(a ≤ X ≤ b) mit markierten Balken, Bernoulli-Formel mit Zahlen,
//   Erwartungswert μ = n·p und σ = √(n·p·(1−p)), Alltagsbeispiele.
// Galton-Brett: Kugeln fallen (eine animiert), Häufigkeiten gegen B(n, p).
// Üben: P(X = k), P(X ≤ k), mindestens einmal, μ und σ, „Wie oft muss man …?“
// Texte: binomial/texte.js (BN), Sprache aus dem Startmenü (MS_LANG).
// ============================================================
(function(){
  "use strict";
  var NS = "http://www.w3.org/2000/svg", lang = "de";
  function $(id){ return document.getElementById(id); }
  function t(k, v){ var s = (BN[lang] && BN[lang][k] != null) ? BN[lang][k] : BN.de[k] != null ? BN.de[k] : k; if(v) for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  function el(n, a, txt){ var e = document.createElementNS(NS, n); for(var k in a) if(a[k] != null) e.setAttribute(k, a[k]); if(txt != null) e.textContent = txt; return e; }
  function leer(s){ while(s.lastChild) s.removeChild(s.lastChild); }
  function sicht(e, an){ if(an) e.removeAttribute("hidden"); else e.setAttribute("hidden", ""); }
  function bdi(s){ return '<bdi dir="ltr">' + s + "</bdi>"; }
  function zuf(a, b){ return a + Math.floor(Math.random() * (b - a + 1)); }
  function wahl(L){ return L[Math.floor(Math.random() * L.length)]; }
  function komma(){ return !(lang === "en" || lang === "zh" || lang === "ja" || lang === "ar"); }
  function zahl(v, d){ if(d == null) d = 4; var r = Math.round(v * Math.pow(10, d)) / Math.pow(10, d); if(Object.is(r, -0)) r = 0; var s = String(Math.abs(r)); if(s.indexOf("e") >= 0) s = Math.abs(r).toFixed(d); if(komma()) s = s.replace(".", ","); return (r < 0 ? "−" : "") + s; }
  function genau(v, d){ return Math.abs(v * Math.pow(10, d) - Math.round(v * Math.pow(10, d))) < 1e-9; }
  function zg(v, d){ return (genau(v, d) ? "" : "≈ ") + zahl(v, d); }
  function proz(v){ return zahl(v * 100, 2) + " %"; }
  function lies(s){ s = String(s).trim().replace(/\s/g, "").replace(",", "."); if(!s) return NaN; var pr = /%$/.test(s); if(pr) s = s.slice(0, -1); var m = s.match(/^(\d+)\/(\d+)$/), v = m ? m[1] / m[2] : Number(s); return pr ? v / 100 : v; }

  // ---------- Binomial ----------
  function verteilung(n, p){
    var P = new Array(n + 1).fill(0);
    if(p <= 0){ P[0] = 1; return P; } if(p >= 1){ P[n] = 1; return P; }
    // über Logarithmen, damit auch n = 100 stabil ist
    var lf = [0]; for(var i = 1; i <= n; i++) lf[i] = lf[i - 1] + Math.log(i);
    for(var k = 0; k <= n; k++) P[k] = Math.exp(lf[n] - lf[k] - lf[n - k] + k * Math.log(p) + (n - k) * Math.log(1 - p));
    return P;
  }
  function binko(n, k){ var r = 1; for(var i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); }

  // ---------- Reiter Verteilung ----------
  var BSP = { eigen: null, muenze: [10, 0.5], wuerfel: [12, 1 / 6], mc: [20, 0.25], ausschuss: [50, 0.05], elfmeter: [8, 0.75] };
  var pFest = null; // exakter Wert aus einem Beispiel (z. B. 1/6), bis der Regler bewegt wird
  var art = "gleich", ARTEN = ["gleich", "hoechstens", "mindestens", "zwischen"];
  function setzeArt(a){ art = a; var box = $("art"); box.innerHTML = ""; ARTEN.forEach(function(x){ var b = document.createElement("button"); b.type = "button"; b.innerHTML = t("art_" + x); b.setAttribute("aria-pressed", x === art ? "true" : "false"); b.addEventListener("click", function(){ setzeArt(x); }); box.appendChild(b); });
    var e = $("artEing"); e.innerHTML = "";
    function inp(id, v, txt){ var l = document.createElement("label"); l.innerHTML = txt; var i = document.createElement("input"); i.className = "zahl"; i.id = id; i.value = v; i.setAttribute("inputmode", "numeric"); i.addEventListener("input", vert); l.appendChild(i); e.appendChild(l); }
    if(art === "zwischen"){ inp("ka", 4, "a = "); inp("kb", 6, " b = "); } else inp("k", 5, "k = ");
    vert(); }
  function vert(){
    var n = Number($("n").value), p = pFest != null ? pFest : Number($("p").value), P = verteilung(n, p);
    $("nW").textContent = n; $("pW").textContent = pTxt(p);
    var a, b;
    if(art === "zwischen"){ a = Math.round(lies($("ka").value)); b = Math.round(lies($("kb").value)); }
    else { var k = Math.round(lies($("k").value)); if(art === "gleich"){ a = k; b = k; } else if(art === "hoechstens"){ a = 0; b = k; } else { a = k; b = n; } }
    var ok = isFinite(a) && isFinite(b); a = Math.max(0, a); b = Math.min(n, b);
    var S = 0; if(ok) for(var i = a; i <= b; i++) S += P[i];
    var ktxt = art === "gleich" ? "P(X = " + a + ")" : art === "hoechstens" ? "P(X ≤ " + b + ")" : art === "mindestens" ? "P(X ≥ " + a + ")" : "P(" + a + " ≤ X ≤ " + b + ")";
    // Erklär-Blasen für die Zeichen
    var bspK = $("bsp").value || "eigen", V = { n: n, p: pTxt(p), k: a, a: a, b: b, tr: t("tr_" + bspK), q: zahl(1 - p, 4), bk: ok ? binko(n, a) : "" };
    var TT = window.MS_TIPP ? MS_TIPP.s : function(h){ return h; };
    function tp(h, key, w){ return TT(h, t(key, w || V)); }
    var vk = art === "hoechstens" ? { n: n, k: b, tr: V.tr } : V;
    var ktxtT = tp(ktxt, "tipP_" + art, vk);
    var gz = genau(S, 4) && !(S > 0 && S < 5e-5); $("ergebnis").innerHTML = ok ? bdi(ktxtT + " " + (gz ? "=" : "≈") + " " + zahl(S, 4) + " " + (gz ? "=" : "≈") + " " + proz(S)) : "";
    // Rechenweg
    var W = [];
    if(ok && art === "gleich" && a >= 0 && a <= n){
      W.push(t("bernoulli") + " " + bdi(tp("P(X = k)", "tipP_gleich", { n: "n", k: "k", tr: V.tr }) + " = " + tp(t("binkoSym"), "tip_binko") + " · " + tp("p<sup>k</sup>", "tip_pk") + " · " + tp("(1 − p)<sup>n − k</sup>", "tip_q")));
      W.push(bdi(tp("P(X = " + a + ")", "tipP_gleich") + " = " + tp(String(binko(n, a)), "tip_binko") + " · " + tp(zahl(p, 4) + "<sup>" + a + "</sup>", "tip_pk") + " · " + tp(zahl(1 - p, 4) + "<sup>" + (n - a) + "</sup>", "tip_q") + " " + (genau(P[a], 4) ? "=" : "≈") + " " + zahl(P[a], 4)));
      W.push(t("binkoInfo", { n: n, k: a, b: binko(n, a) }));
    } else if(ok && art === "mindestens" && a >= 1){
      W.push(t("gegen") + " " + bdi("P(X ≥ " + a + ") = 1 − P(X ≤ " + (a - 1) + ") = 1 − " + zahl(1 - S, 4) + " " + (genau(S, 4) ? "=" : "≈") + " " + zahl(S, 4)));
    } else if(ok){
      W.push(t("summe") + " " + bdi(ktxt + " = " + (b - a <= 4 ? range(a, b).map(function(i){ return "P(X = " + i + ")"; }).join(" + ") : "P(X = " + a + ") + … + P(X = " + b + ")")));
    }
    $("weg").innerHTML = W.map(function(s){ return "<li>" + s + "</li>"; }).join("");
    var mu = n * p, sg = Math.sqrt(n * p * (1 - p));
    V.mu = zahl(mu, 2); V.s = zahl(sg, 2);
    $("kenn").innerHTML = t("kenn", { mu: bdi(tp("μ", "tip_mu") + " = n · p = " + n + " · " + zahl(p, 4) + " " + (genau(mu, 2) ? "=" : "≈") + " " + zahl(mu, 2)), s: bdi(tp("σ", "tip_sigma") + " = √(n · p · (1 − p)) ≈ " + zahl(sg, 2)) });
    // Legende: alle Zeichen dieser Seite mit Erklärung
    var leg = [tp("n = " + n, "tip_n"), tp("p = " + pTxt(p), "tip_p")];
    if(art === "zwischen") leg.push(tp("a = " + a, "tip_a"), tp("b = " + b, "tip_b")); else leg.push(tp("k = " + (art === "hoechstens" ? b : a), "tip_k", vk));
    leg.push(tp("X", "tip_X"), tp("μ " + (genau(mu, 2) ? "=" : "≈") + " " + V.mu, "tip_mu"), tp("σ " + (genau(sg, 2) ? "=" : "≈") + " " + V.s, "tip_sigma"));
    $("legende").innerHTML = "<b>" + t("legH") + "</b> " + leg.map(bdi).join(" · ");
    $("tippHinweis").textContent = window.MS_TIPP ? MS_TIPP.hinweis(lang) : "";
    histogramm($("hSvg"), P, ok ? a : -1, ok ? b : -2, mu, sg);
    $("vMerke").textContent = t("vMerke");
  }
  function range(a, b){ var r = []; for(var i = a; i <= b; i++) r.push(i); return r; }
  function histogramm(sv, P, a, b, mu, sg){
    leer(sv); var n = P.length - 1, W = (sv.clientWidth || 640) < 520 ? 420 : 640, H = 300; sv.setAttribute("viewBox", "0 0 " + W + " " + H); var L = 46, R = W - 10, T = 14, B = H - 30;
    var max = Math.max.apply(0, P) * 1.12 || 1;
    // nur den sichtbaren Bereich zeigen, wenn n groß ist
    var k0 = 0, k1 = n; if(n > 40){ k0 = Math.max(0, Math.floor(mu - 4.5 * sg) - 1); k1 = Math.min(n, Math.ceil(mu + 4.5 * sg) + 1); if(k1 - k0 < 20){ k1 = Math.min(n, k0 + 20); } }
    var bw = (R - L) / (k1 - k0 + 1), X = function(k){ return L + (k - k0) * bw; }, Y = function(v){ return B - v / max * (B - T); };
    var st = max > 0.2 ? 0.05 : max > 0.1 ? 0.02 : max > 0.04 ? 0.01 : 0.005;
    for(var v = 0; v <= max; v += st){ sv.appendChild(el("line", { x1: L, y1: Y(v), x2: R, y2: Y(v), "class": "gitter" })); sv.appendChild(el("text", { x: L - 5, y: Y(v) + 4, "class": "ko-zahl", style: "text-anchor:end" }, zahl(v, 3))); }
    if(sg > 0) sv.appendChild(el("rect", { x: X(mu - sg) + bw / 2, y: T, width: 2 * sg * bw, height: B - T, "class": "sigma" }));
    var schritt = Math.max(1, Math.ceil((k1 - k0 + 1) / 20));
    for(var k = k0; k <= k1; k++){
      sv.appendChild(el("rect", { x: X(k) + 0.5, y: Y(P[k]), width: Math.max(1, bw - 1), height: B - Y(P[k]), "class": "balken" + (k >= a && k <= b ? " an" : "") }));
      if((k - k0) % schritt === 0) sv.appendChild(el("text", { x: X(k) + bw / 2, y: B + 16, "class": "ko-zahl" }, String(k)));
    }
    sv.appendChild(el("line", { x1: L, y1: B, x2: R, y2: B, "class": "achse" }));
    if(mu >= k0 - 0.5 && mu <= k1 + 0.5){ var xm = X(mu) + bw / 2; sv.appendChild(el("line", { x1: xm, y1: T, x2: xm, y2: B, "class": "mu" })); sv.appendChild(el("text", { x: xm, y: T + 12, "class": "hlab" }, "μ")); }
    sv.appendChild(el("text", { x: R, y: H - 2, "class": "ko-zahl", style: "text-anchor:end" }, "k"));
  }
  ["n", "p"].forEach(function(id){ $(id).addEventListener("input", function(){ if(id === "p") pFest = null; $("bsp").value = "eigen"; $("bText").textContent = t("bt_eigen"); vert(); }); });
  $("bsp").addEventListener("change", function(){ var k = $("bsp").value, B2 = BSP[k]; $("bText").textContent = t("bt_" + k); if(B2){ $("n").value = B2[0]; $("p").value = Math.round(B2[1] * 100) / 100; pFest = B2[1]; } else pFest = null; vert(); });

  // ---------- Reiter Galton-Brett ----------
  var gal = { faecher: [], kugeln: 0, pfad: null };
  function galReset(){ var n = Number($("gn").value); gal = { faecher: new Array(n + 1).fill(0), kugeln: 0, pfad: null }; galton(); }
  function fallen(m){
    var n = Number($("gn").value), p = Number($("gp").value);
    for(var i = 0; i < m; i++){ var r = 0, pf = [0]; for(var j = 0; j < n; j++){ if(Math.random() < p) r++; pf.push(r); } gal.faecher[r]++; gal.kugeln++; gal.pfad = pf; }
    galton();
  }
  function galton(){
    var n = Number($("gn").value), p = Number($("gp").value), sv = $("galton"); leer(sv);
    $("gnW").textContent = n; $("gpW").textContent = zahl(p, 2);
    if(gal.faecher.length !== n + 1) gal = { faecher: new Array(n + 1).fill(0), kugeln: 0, pfad: null };
    var W = 420, top = 20, dy = 200 / n, dx = 360 / (n + 1), cx = W / 2;
    function px(row, r){ return cx + (r - row / 2) * dx; }
    for(var row = 0; row < n; row++) for(var r = 0; r <= row; r++) sv.appendChild(el("circle", { cx: px(row, r), cy: top + row * dy + dy / 2, r: Math.max(2, Math.min(5, dx / 6)), "class": "peg" }));
    if(gal.pfad){ var d = "M" + cx + " " + (top - 6); gal.pfad.forEach(function(r, i){ d += " L" + px(i, r) + " " + (top + i * dy + dy / 2 - 6); }); d += " L" + px(n, gal.pfad[n]) + " " + (top + n * dy + 14); sv.appendChild(el("path", { d: d, "class": "pfad" })); sv.appendChild(el("circle", { cx: px(n, gal.pfad[n]), cy: top + n * dy + 14, r: 6, "class": "kugel" })); }
    var basis = 410, hoch = 160, P = verteilung(n, p), maxH = Math.max(Math.max.apply(0, P), gal.kugeln ? Math.max.apply(0, gal.faecher) / gal.kugeln : 0) * 1.1;
    for(var k = 0; k <= n; k++){
      var x = px(n, k), rel = gal.kugeln ? gal.faecher[k] / gal.kugeln : 0, h = rel / maxH * hoch;
      sv.appendChild(el("rect", { x: x - dx * 0.42, y: basis - h, width: dx * 0.84, height: h, "class": "fach" }));
      sv.appendChild(el("circle", { cx: x, cy: basis - P[k] / maxH * hoch, r: 3.5, "class": "soll" }));
      sv.appendChild(el("text", { x: x, y: basis + 0, "class": "ko-zahl", dy: "-2" }, ""));
    }
    sv.appendChild(el("line", { x1: 20, y1: basis, x2: 400, y2: basis, "class": "achse" }));
    $("gStat").innerHTML = t("gStat", { k: gal.kugeln, m: gal.kugeln ? bdi(zahl(gal.faecher.reduce(function(s, c, i){ return s + c * i; }, 0) / gal.kugeln, 2)) : "–", mu: bdi(zahl(n * p, 2)) });
    $("gText").textContent = t("gText"); $("gMerke").textContent = t("gMerke");
  }
  ["gn", "gp"].forEach(function(id){ $(id).addEventListener("input", galReset); });

  // ---------- Reiter Üben ----------
  var auf = null, punkte = 0, anzahl = 0, beantwortet = false, letzte = null;
  function neueAufgabe(){
    beantwortet = false; letzte = null;
    var typ = wahl(["gleich", "gleich", "hoechstens", "mind1", "mu", "sigma", "wieoft"]), A = { typ: typ };
    if(typ === "gleich" || typ === "hoechstens"){ A.n = zuf(4, 12); A.p = wahl([0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.75, 0.8]); A.k = Math.max(0, Math.min(A.n, Math.round(A.n * A.p) + zuf(-2, 1))); var P = verteilung(A.n, A.p); A.l = 0; for(var i = (typ === "gleich" ? A.k : 0); i <= A.k; i++) A.l += P[i]; }
    else if(typ === "mind1"){ A.n = zuf(3, 10); A.p = wahl([0.05, 0.1, 0.2, 0.25, 1 / 6]); A.l = 1 - Math.pow(1 - A.p, A.n); }
    else if(typ === "mu"){ A.n = wahl([20, 40, 50, 100, 120, 200]); A.p = wahl([0.1, 0.2, 0.25, 0.3, 0.5, 0.6]); A.l = A.n * A.p; }
    else if(typ === "sigma"){ A.n = wahl([16, 25, 36, 50, 100]); A.p = wahl([0.2, 0.5, 0.1]); A.l = Math.sqrt(A.n * A.p * (1 - A.p)); }
    else { A.p = wahl([0.1, 0.2, 0.25, 1 / 6, 0.05]); A.q = wahl([0.9, 0.95, 0.99]); A.l = Math.ceil(Math.log(1 - A.q) / Math.log(1 - A.p) - 1e-12); }
    auf = A; zeige();
  }
  function pTxt(p){ return Math.abs(p - 1 / 6) < 1e-9 ? "1/6" : zahl(p, 2); }
  function zeige(){
    var A = auf, Z = $("antwortzeile");
    var v = { n: A.n, p: bdi(pTxt(A.p)), k: A.k, q: bdi(proz(A.q || 0)) };
    $("auftrag").innerHTML = t("u_" + A.typ, v);
    $("meldung").textContent = ""; $("meldung").className = "meldung"; sicht($("uLauf"), false); Z.innerHTML = "";
    var inp = document.createElement("input"); inp.className = "zahl"; inp.id = "uAntwort"; inp.setAttribute("inputmode", "decimal"); inp.setAttribute("autocomplete", "off"); inp.style.width = "140px";
    inp.addEventListener("keydown", function(e){ if(e.key === "Enter") pruefe(inp.value); });
    var pb = document.createElement("button"); pb.type = "button"; pb.className = "knopf"; pb.id = "pruefen"; pb.textContent = t("pruefen"); pb.addEventListener("click", function(){ pruefe(inp.value); });
    Z.appendChild(inp); Z.appendChild(pb);
    $("uHinweis").textContent = A.typ === "mu" || A.typ === "wieoft" ? "" : A.typ === "sigma" ? t("runden2") : t("runden4");
    $("weiter").textContent = t("weiterA"); $("punkte").textContent = t("punkte", { p: punkte, n: anzahl });
  }
  function pruefe(e){
    if(beantwortet) return;
    var v = lies(e); if(!isFinite(v)) return;
    var A = auf, tol = A.typ === "mu" || A.typ === "wieoft" ? 1e-9 : A.typ === "sigma" ? 0.011 : 0.0011;
    var ok = Math.abs(v - A.l) <= tol, L = [];
    var lt = A.typ === "mu" || A.typ === "wieoft" ? zahl(A.l, 2) : A.typ === "sigma" ? zg(A.l, 2) : zg(A.l, 4) + " (" + proz(A.l) + ")";
    if(A.typ === "gleich") L.push(bdi("P(X = " + A.k + ") = " + binko(A.n, A.k) + " · " + zahl(A.p, 4) + "<sup>" + A.k + "</sup> · " + zahl(1 - A.p, 4) + "<sup>" + (A.n - A.k) + "</sup> ≈ " + zahl(A.l, 4)));
    else if(A.typ === "hoechstens") L.push(bdi("P(X ≤ " + A.k + ") = P(X = 0) + … + P(X = " + A.k + ") ≈ " + zahl(A.l, 4)));
    else if(A.typ === "mind1") L.push(t("gegen") + " " + bdi("P(X ≥ 1) = 1 − P(X = 0) = 1 − " + zahl(1 - A.p, 4) + "<sup>" + A.n + "</sup> ≈ " + zahl(A.l, 4)));
    else if(A.typ === "mu") L.push(bdi("μ = n · p = " + A.n + " · " + zahl(A.p, 2) + " = " + zahl(A.l, 2)));
    else if(A.typ === "sigma") L.push(bdi("σ = √(" + A.n + " · " + zahl(A.p, 2) + " · " + zahl(1 - A.p, 2) + ") = √" + zahl(A.n * A.p * (1 - A.p), 2) + " ≈ " + zahl(A.l, 2)));
    else { L.push(bdi("1 − " + zahl(1 - A.p, 4) + "<sup>n</sup> ≥ " + zahl(A.q, 2) + " ⇔ " + zahl(1 - A.p, 4) + "<sup>n</sup> ≤ " + zahl(1 - A.q, 2))); L.push(bdi("n ≥ ln(" + zahl(1 - A.q, 2) + ") : ln(" + zahl(1 - A.p, 4) + ") ≈ " + zahl(Math.log(1 - A.q) / Math.log(1 - A.p), 2) + " → n = " + A.l)); }
    letzte = e; beantwortet = true; anzahl++; if(ok) punkte++;
    var m = $("meldung"); m.className = "meldung " + (ok ? "gut" : "schlecht"); m.innerHTML = ok ? t("richtig") + " " + bdi(lt) : t("falsch", { l: bdi(lt) });
    $("uLauf").innerHTML = L.map(function(s){ return "<li>" + s + "</li>"; }).join(""); sicht($("uLauf"), true);
    $("punkte").textContent = t("punkte", { p: punkte, n: anzahl });
  }
  $("weiter").addEventListener("click", neueAufgabe);

  // ---------- Reiter & Texte ----------
  var tab = "erkl", TABS = ["erkl", "vert", "galton", "ueben"];
  function zeigeTab(k){
    tab = k;
    document.querySelectorAll(".tabs button").forEach(function(b){ b.setAttribute("aria-selected", b.dataset.tab === k ? "true" : "false"); });
    TABS.forEach(function(x){ sicht($("s_" + x), x === k); });
    if(k === "ueben" && !auf) neueAufgabe();
    alles(true);
  }
  document.querySelectorAll(".tabs button").forEach(function(b){ b.addEventListener("click", function(){ zeigeTab(b.dataset.tab); }); });
  function alles(nurRechnen){
    if(!nurRechnen){
      document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.title = "miStudia – " + t("titel"); $("titel").textContent = t("titel");
      document.querySelectorAll(".tabs button").forEach(function(b){ b.textContent = t("tab_" + b.dataset.tab); });
      var bv = $("bsp").value || "muenze"; $("bsp").innerHTML = Object.keys(BSP).map(function(k){ return '<option value="' + k + '">' + t("bsp_" + k) + "</option>"; }).join(""); $("bsp").value = bv;
      $("tBsp").textContent = t("bspL"); $("bText").textContent = t("bt_" + bv); $("tReihen").textContent = t("reihenL");
      var kb = $("gKnoepfe"); kb.innerHTML = ""; [1, 10, 100, 1000].forEach(function(m){ var b = document.createElement("button"); b.type = "button"; b.className = "knopf"; b.textContent = t("kugeln", { n: m }); b.addEventListener("click", function(){ fallen(m); }); kb.appendChild(b); });
      var r = document.createElement("button"); r.type = "button"; r.className = "knopf hell"; r.textContent = t("reset"); r.addEventListener("click", galReset); kb.appendChild(r);
      var altK = $("k") ? $("k").value : null, altA = $("ka") ? [$("ka").value, $("kb").value] : null; setzeArt(art);
      if(altK && $("k")) $("k").value = altK; if(altA && $("ka")){ $("ka").value = altA[0]; $("kb").value = altA[1]; }
    }
    if(tab === "vert") vert(); else if(tab === "galton") galton();
    if(!nurRechnen && auf){ var war = beantwortet, e = letzte, gut = $("meldung").classList.contains("gut"); zeige(); if(war){ beantwortet = false; anzahl--; if(gut) punkte--; $("uAntwort").value = e; pruefe(e); } }
  }
  window.MS_LANG = { apply: function(l){ if(BN[l]){ lang = l; alles(); if(window.MS_BIN_ERKL) MS_BIN_ERKL.sprache(l); } } };
  $("bsp").innerHTML = '<option value="muenze"></option>'; $("bsp").value = "muenze"; $("n").value = 10; $("p").value = 0.5; pFest = 0.5;
  alles();
})();
