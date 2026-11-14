// ============================================================
// teilbarkeit/app.js – Teilbarkeitsregeln
// Regeln: 2, 3, 4, 5, 6, 8, 9, 10, 11, 25 an einer eigenen Zahl – die
// entscheidenden Ziffern werden markiert, dazu Rechnung und „Warum?“.
// Teiler & Primzahlen: Teilerpaare, Teilermenge, Primzahl ja/nein,
// Primfaktorzerlegung mit Baum, Sieb des Eratosthenes bis 100.
// Üben: teilbar ja/nein, fehlende Ziffer, Primzahl?, Anzahl der Teiler.
// Texte: teilbarkeit/texte.js (TB), Sprache aus dem Startmenü (MS_LANG).
// ============================================================
(function(){
  "use strict";
  var NS = "http://www.w3.org/2000/svg", lang = "de";
  function $(id){ return document.getElementById(id); }
  function t(k, v){ var s = (TB[lang] && TB[lang][k]) || TB.de[k] || k; if(v) for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  function el(n, a, txt){ var e = document.createElementNS(NS, n); for(var k in a) e.setAttribute(k, a[k]); if(txt != null) e.textContent = txt; return e; }
  function leer(s){ while(s.lastChild) s.removeChild(s.lastChild); }
  function sicht(e, an){ if(an) e.removeAttribute("hidden"); else e.setAttribute("hidden", ""); }
  function bdi(s){ return '<bdi dir="ltr">' + s + "</bdi>"; }
  function zuf(a, b){ return a + Math.floor(Math.random() * (b - a + 1)); }
  function wahl(L){ return L[Math.floor(Math.random() * L.length)]; }
  function minus(v){ return v < 0 ? "−" + (-v) : String(v); }
  var TEILER = [2, 3, 4, 5, 6, 8, 9, 10, 11, 25];
  var FARBE = { 2: "#d97706", 3: "#0284c7", 4: "#b45309", 5: "#059669", 6: "#7c3aed", 8: "#92400e", 9: "#0369a1", 10: "#047857", 11: "#be123c", 25: "#4d7c0f" };

  // ---------- Regeln anwenden ----------
  function teilbarText(a, d){ return t(a % d === 0 ? "istT" : "nichtT", { a: bdi(minus(a)), d: d }); }
  function ziffernHTML(s, marks){ return '<span class="ziffern">' + s.split("").map(function(c, i){ return "<span" + (marks[i] ? ' class="' + marks[i] + '"' : "") + ">" + c + "</span>"; }).join("") + "</span>"; }
  function anwenden(d, s){
    var n = Number(s), L = s.length, m = {}, z = [], ok = n % d === 0, i;
    function endeMark(k){ for(var j = Math.max(0, L - k); j < L; j++) m[j] = "m"; }
    function ende(k){ return Number(s.slice(Math.max(0, L - k))); }
    if(d === 2 || d === 5 || d === 10){
      endeMark(1); var e = ende(1);
      z.push(t("letzteZ", { z: e }) + (d === 2 ? " – " + t(e % 2 === 0 ? "gerade" : "ungerade") : ""));
    } else if(d === 4 || d === 25){
      endeMark(2); var e2 = s.slice(Math.max(0, L - 2));
      z.push(t("letzte2", { z: bdi(e2) }) + " " + (d === 4 ? teilbarText(Number(e2), 4) : t(ok ? "ist25" : "nicht25")));
    } else if(d === 8){
      endeMark(3); var e3 = s.slice(Math.max(0, L - 3));
      z.push(t("letzte3", { z: bdi(e3) }) + " " + teilbarText(Number(e3), 8));
    } else if(d === 3 || d === 9){
      var q = 0; for(i = 0; i < L; i++){ m[i] = "m"; q += Number(s[i]); }
      z.push(t("qs") + " " + bdi(s.split("").join(" + ") + " = " + q) + ". " + teilbarText(q, d));
    } else if(d === 6){
      endeMark(1); var q6 = 0; for(i = 0; i < L; i++) q6 += Number(s[i]);
      z.push(t("durch", { d: 2 }) + " " + (n % 2 === 0 ? "✓" : "✗") + " (" + t("letzteZ", { z: s[L - 1] }) + ")");
      z.push(t("durch", { d: 3 }) + " " + (n % 3 === 0 ? "✓" : "✗") + " (" + t("qs") + " " + bdi(String(q6)) + ")");
    } else if(d === 11){
      var a = 0, teile = [];
      for(i = L - 1, k = 0; i >= 0; i--, k++){ var v = Number(s[i]), plus = k % 2 === 0; a += plus ? v : -v; m[i] = plus ? "p" : "n"; teile.push((k === 0 ? "" : plus ? " + " : " − ") + v); }
      var k;
      z.push(t("aqs") + " " + bdi(teile.join("") + " = " + minus(a)) + ". " + teilbarText(a, 11));
    }
    return { ok: ok, m: m, z: z, ziffern: ziffernHTML(s, m) };
  }
  function warum(d){
    if(d === 2 || d === 5 || d === 10) return t("wEnde1", { d: d });
    if(d === 4 || d === 25) return t("wEnde2", { d: d });
    if(d === 8) return t("wEnde3", { d: d });
    if(d === 3 || d === 9) return t("wQS", { d: d });
    if(d === 6) return t("w6");
    return t("w11");
  }

  // ---------- Reiter Regeln ----------
  function liesZahl(v, max){ var s = String(v).replace(/[\s.,'’_]/g, "").replace(/^0+(?=\d)/, ""); if(!/^\d+$/.test(s) || s.length > max || Number(s) < 1) return null; return s; }
  function regeln(){
    var s = liesZahl($("zahl").value, 12);
    $("fehler").textContent = s ? "" : t("fehler", { m: "999 999 999 999" });
    if(!s){ $("regeln").innerHTML = ""; $("zusammen").textContent = ""; return; }
    var ja = [], nein = [], h = "";
    TEILER.forEach(function(d){
      var A = anwenden(d, s); (A.ok ? ja : nein).push(d);
      h += '<div class="regel ' + (A.ok ? "ja" : "nein") + '" style="--farbe:' + FARBE[d] + '"><div class="kopf"><span class="d">' + d + '</span><span class="urteil">' + (A.ok ? "✓ " : "✗ ") + t(A.ok ? "istT" : "nichtT", { a: bdi(s), d: d }) + "</span></div>" +
        '<p class="text">' + t("r" + d) + "</p>" + A.ziffern + A.z.map(function(x){ return '<p class="anw">' + x + "</p>"; }).join("") +
        '<p class="warum"><b>' + t("warumL") + "</b> " + warum(d) + "</p></div>";
    });
    $("regeln").innerHTML = h;
    $("zusammen").innerHTML = t("zusJa", { n: bdi(s), l: ja.length ? bdi(ja.join(", ")) : "–" }) + "<br>" + t("zusNein", { l: nein.length ? bdi(nein.join(", ")) : "–" });
  }
  $("zahl").addEventListener("input", regeln);
  $("zufall").addEventListener("click", function(){
    var n = wahl([zuf(100, 99999), zuf(10, 9999) * wahl([6, 8, 9, 11, 12, 25, 36]), zuf(1000, 999999)]);
    $("zahl").value = String(n); regeln();
  });

  // ---------- Reiter Teiler & Primzahlen ----------
  function teilerVon(n){ var a = [], b = []; for(var i = 1; i * i <= n; i++) if(n % i === 0){ a.push(i); if(i * i !== n) b.unshift(n / i); } return a.concat(b); }
  function faktoren(n){ var f = [], p = 2; while(p * p <= n){ while(n % p === 0){ f.push(p); n /= p; } p += p === 2 ? 1 : 2; } if(n > 1) f.push(n); return f; }
  var HOCH = "⁰¹²³⁴⁵⁶⁷⁸⁹";
  function hoch(k){ return String(k).split("").map(function(c){ return HOCH[+c]; }).join(""); }
  function potenzForm(f){ var g = []; f.forEach(function(p){ var l = g[g.length - 1]; if(l && l.p === p) l.k++; else g.push({ p: p, k: 1 }); }); return g.map(function(x){ return x.p + (x.k > 1 ? hoch(x.k) : ""); }).join(" · "); }
  function istPrim(n){ return n > 1 && faktoren(n).length === 1; }
  function teiler(){
    var s = liesZahl($("zahl2").value, 7), n = s ? Number(s) : 0;
    if(n > 1000000) s = null;
    $("fehler2").textContent = s ? "" : t("fehler", { m: "1 000 000" });
    $("hPaare").textContent = t("hPaare"); $("hFaktor").textContent = t("hFaktor"); $("merkPrim").textContent = t("merkPrim");
    if(!s){ ["paare", "teilerliste", "primUrteil", "zerlegung"].forEach(function(id){ $(id).innerHTML = ""; }); leer($("baumSvg")); return; }
    var T = teilerVon(n), P = [];
    for(var i = 0; i < T.length && T[i] * T[i] <= n; i++) P.push(bdi(T[i] + " · " + n / T[i]));
    $("paare").innerHTML = P.join("&emsp; ");
    $("teilerliste").innerHTML = "<b>" + bdi("T" + "<sub>" + n + "</sub> =") + "</b> " + T.map(function(x){ return "<span>" + x + "</span>"; }).join("") + ' <b class="muted">' + t("anzT", { k: T.length }) + "</b>";
    $("primUrteil").innerHTML = n === 1 ? t("eins") : T.length === 2 ? t("istPrim", { n: bdi(n) }) : t("keinPrim", { n: bdi(n), k: T.length });
    var F = faktoren(n);
    $("zerlegung").innerHTML = n === 1 ? t("einsF") : bdi(n + " = " + F.join(" · ") + (F.length > 1 && potenzForm(F) !== F.join(" · ") ? " = " + potenzForm(F) : ""));
    baumZeichnen(n, F);
  }
  function baumZeichnen(n, F){
    var sv = $("baumSvg"); leer(sv);
    if(F.length < 2){ sv.setAttribute("viewBox", "0 0 10 1"); return; }
    var stufen = F.length - 1, W = Math.max(240, 90 + stufen * 46), H = 40 + stufen * 56;
    sv.setAttribute("viewBox", "0 0 " + W + " " + H); sv.style.maxWidth = Math.min(520, W * 1.3) + "px";
    var x = 70, y = 22, rest = n;
    for(var i = 0; i < stufen; i++){
      var p = F[i], r = rest / p, ny = y + 56;
      sv.appendChild(el("line", { x1: x, y1: y + 12, x2: x - 26, y2: ny - 14, "class": "bk" }));
      sv.appendChild(el("line", { x1: x, y1: y + 12, x2: x + 46, y2: ny - 14, "class": "bk" }));
      if(i === 0){ knoten(sv, x, y, rest, false); }
      knoten(sv, x - 30, ny, p, true);
      knoten(sv, x + 46, ny, r, i === stufen - 1);
      x += 46; y = ny; rest = r;
    }
  }
  function knoten(sv, x, y, v, prim){
    var w = Math.max(30, String(v).length * 10 + 14);
    sv.appendChild(el(prim ? "circle" : "rect", prim ? { cx: x, cy: y, r: Math.max(15, w / 2), "class": "bp" } : { x: x - w / 2, y: y - 14, width: w, height: 28, rx: 8, "class": "bn" }));
    sv.appendChild(el("text", { x: x, y: y + 6, "class": prim ? "bpt" : "bz" }, String(v)));
  }
  $("zahl2").addEventListener("input", teiler);

  // Sieb des Eratosthenes
  var SP = [2, 3, 5, 7], SF = { 2: "#f59e0b", 3: "#0ea5e9", 5: "#10b981", 7: "#e11d48" }, siebSchritt = 0;
  function sieb(){
    var h = "";
    for(var n = 1; n <= 100; n++){
      var weg = null, prim = false;
      for(var j = 0; j < Math.min(siebSchritt, 4); j++){ var p = SP[j]; if(n !== p && n % p === 0 && !weg) weg = p; }
      if(siebSchritt >= 5 && n > 1 && !weg) prim = true;
      var gezeigt = SP.indexOf(n) >= 0 && SP.indexOf(n) < siebSchritt;
      var st = weg ? "box-shadow: inset 0 -5px 0 " + SF[weg] + ";" : gezeigt && !prim ? "outline: 3px solid " + SF[n] + "; outline-offset: -3px;" : "";
      h += '<button type="button" data-n="' + n + '" class="' + (n === 1 ? "eins" : weg ? "weg" : prim ? "prim" : "") + '"' + (st ? ' style="' + st + '"' : "") + ">" + n + "</button>";
    }
    $("sieb").innerHTML = h;
    $("sieb").querySelectorAll("button").forEach(function(b){ b.addEventListener("click", function(){ $("zahl2").value = b.dataset.n; teiler(); $("zahl2").scrollIntoView({ block: "center", behavior: "smooth" }); }); });
    $("hSieb").textContent = t("hSieb");
    $("siebText").textContent = siebSchritt === 0 ? t("sieb0") : siebSchritt <= 4 ? t("siebS", { p: SP[siebSchritt - 1] }) : t("siebEnde");
    $("siebWeiter").textContent = t("weiterS"); $("siebWeiter").disabled = siebSchritt >= 5; $("siebReset").textContent = t("reset");
    $("siebLeg").innerHTML = SP.map(function(p){ return '<span><i style="background:' + SF[p] + '"></i>' + t("vielf", { p: p }) + "</span>"; }).join("") + '<span><i style="background:#4f46e5"></i>' + t("primL") + "</span>";
  }
  $("siebWeiter").addEventListener("click", function(){ if(siebSchritt < 5){ siebSchritt++; sieb(); } });
  $("siebReset").addEventListener("click", function(){ siebSchritt = 0; sieb(); });

  // ---------- Reiter Üben ----------
  var auf = null, punkte = 0, anzahl = 0, beantwortet = false, letzteEingabe = null;
  function neueAufgabe(){
    beantwortet = false; letzteEingabe = null;
    var r = Math.random(), typ = r < 0.4 ? "jn" : r < 0.65 ? "ziffer" : r < 0.85 ? "prim" : "anzahl";
    if(typ === "jn"){
      var d = wahl(TEILER), ja = Math.random() < 0.5, n;
      if(ja) n = d * zuf(Math.ceil(100 / d), Math.floor(99999 / d));
      else do { n = zuf(100, 99999); } while(n % d === 0 || (d !== 2 && d !== 5 && d !== 10 && Math.random() < 0.3 && n % 2 !== 0));
      auf = { typ: typ, d: d, s: String(n), l: n % d === 0 };
    } else if(typ === "ziffer"){
      var dd, s, pos, gut;
      do {
        dd = wahl([3, 9, 4, 11, 6]); var len = zuf(4, 5); s = String(zuf(1, 9)); for(var i = 1; i < len; i++) s += zuf(0, 9);
        if(dd === 4) pos = len - 2; else if(dd === 6){ pos = zuf(0, len - 2); if(Number(s[len - 1]) % 2) s = s.slice(0, -1) + "4"; } else pos = zuf(0, len - 1);
        gut = [];
        for(var z = pos === 0 ? 1 : 0; z <= 9; z++){ var tst = s.slice(0, pos) + z + s.slice(pos + 1); if(Number(tst) % dd === 0) gut.push(z); }
      } while(!gut.length || gut.length === 10);
      auf = { typ: typ, d: dd, s: s, pos: pos, gut: gut };
    } else if(typ === "prim"){
      var nn;
      if(Math.random() < 0.5){ do { nn = zuf(11, 199); } while(!istPrim(nn)); }
      else { do { nn = zuf(15, 199); } while(istPrim(nn) || nn % 2 === 0 || (nn % 5 === 0 && Math.random() < 0.6)); }
      auf = { typ: typ, n: nn, l: istPrim(nn) };
    } else {
      var N = wahl([12, 18, 20, 24, 28, 30, 32, 36, 40, 42, 45, 48, 50, 54, 60, 64, 72, 75, 80, 84, 90, 96, 100]);
      auf = { typ: typ, n: N, l: teilerVon(N).length };
    }
    zeige();
  }
  function luecke(){ return bdi(auf.s.slice(0, auf.pos) + "□" + auf.s.slice(auf.pos + 1)); }
  function zeige(){
    var A = $("auftrag"), Z = $("antwortzeile");
    if(auf.typ === "jn") A.innerHTML = t("aufJN", { n: bdi(auf.s), d: auf.d });
    else if(auf.typ === "ziffer") A.innerHTML = t("aufZiffer", { z: luecke(), d: auf.d });
    else if(auf.typ === "prim") A.innerHTML = t("aufPrim", { n: bdi(auf.n) });
    else A.innerHTML = t("aufAnz", { n: bdi(auf.n) });
    $("meldung").textContent = ""; $("meldung").className = "meldung"; sicht($("uLauf"), false); Z.innerHTML = "";
    if(auf.typ === "jn" || auf.typ === "prim"){
      [["ja", true], ["nein", false]].forEach(function(x){ var b = document.createElement("button"); b.type = "button"; b.className = "knopf"; b.textContent = t(x[0]); b.dataset.a = x[0]; b.addEventListener("click", function(){ pruefe(x[1]); }); Z.appendChild(b); });
    } else {
      var inp = document.createElement("input"); inp.className = "zahl"; inp.id = "uAntwort"; inp.setAttribute("inputmode", "numeric"); inp.setAttribute("autocomplete", "off"); inp.style.width = "110px";
      inp.addEventListener("keydown", function(e){ if(e.key === "Enter") pruefe(inp.value); });
      var pb = document.createElement("button"); pb.type = "button"; pb.className = "knopf"; pb.id = "pruefen"; pb.textContent = t("pruefen"); pb.addEventListener("click", function(){ pruefe(inp.value); });
      Z.appendChild(inp); Z.appendChild(pb);
    }
    $("weiter").textContent = t("weiterA"); $("punkte").textContent = t("punkte", { p: punkte, n: anzahl });
  }
  function pruefe(e){
    if(beantwortet) return;
    var ok, L = [], lt;
    if(auf.typ === "jn" || auf.typ === "prim"){ ok = e === auf.l; lt = t(auf.l ? "ja" : "nein"); }
    else {
      var v = String(e).trim(); if(!/^\d+$/.test(v)) return;
      if(auf.typ === "ziffer"){ ok = v.length === 1 && auf.gut.indexOf(Number(v)) >= 0; lt = bdi(auf.gut.join(", ")); }
      else { ok = Number(v) === auf.l; lt = String(auf.l); }
    }
    letzteEingabe = e; beantwortet = true; anzahl++; if(ok) punkte++;
    if(auf.typ === "jn"){
      var A = anwenden(auf.d, auf.s); L.push(t("r" + auf.d)); L.push(A.ziffern + " " + A.z.join("<br>"));
      L.push(t(A.ok ? "istT" : "nichtT", { a: bdi(auf.s), d: auf.d }));
    } else if(auf.typ === "ziffer"){
      var o = auf.s.slice(0, auf.pos) + auf.s.slice(auf.pos + 1), q = 0, i;
      if(auf.d === 3 || auf.d === 9 || auf.d === 6){ for(i = 0; i < o.length; i++) q += Number(o[i]); L.push(t("zifQS", { q: q, d: auf.d === 6 ? 3 : auf.d })); if(auf.d === 6) L.push(t("zif6")); }
      else if(auf.d === 4) L.push(t("zif4", { e: bdi("□" + auf.s[auf.s.length - 1]) }));
      else { L.push(t("r11")); }
      L.push(t("alleZ", { l: bdi(auf.gut.join(", ")) }));
      var bsp = auf.s.slice(0, auf.pos) + auf.gut[0] + auf.s.slice(auf.pos + 1), m = {}; m[auf.pos] = "m";
      L.push(t("bsp") + " " + ziffernHTML(bsp, m) + " " + t("istT", { a: bdi(bsp), d: auf.d }));
    } else if(auf.typ === "prim"){
      if(auf.l) L.push(t("istPrim", { n: bdi(auf.n) }) + " " + t("primProbe", { w: Math.floor(Math.sqrt(auf.n)) }));
      else { var f = faktoren(auf.n)[0]; L.push(bdi(auf.n + " = " + f + " · " + auf.n / f)); L.push(t("keinPrim", { n: bdi(auf.n), k: teilerVon(auf.n).length })); }
    } else {
      var T = teilerVon(auf.n), P = []; for(var j = 0; j < T.length && T[j] * T[j] <= auf.n; j++) P.push(bdi(T[j] + " · " + auf.n / T[j]));
      L.push(t("hPaare") + ": " + P.join(", ")); L.push(bdi("T<sub>" + auf.n + "</sub> = {" + T.join(", ") + "}") + " – " + t("anzT", { k: T.length }));
    }
    var me = $("meldung"); me.className = "meldung " + (ok ? "gut" : "schlecht"); me.innerHTML = ok ? t("richtig") : t("falsch", { l: lt });
    $("antwortzeile").querySelectorAll("button[data-a]").forEach(function(b){ b.disabled = true; });
    $("uLauf").innerHTML = L.map(function(s){ return "<li>" + s + "</li>"; }).join(""); sicht($("uLauf"), true);
    $("punkte").textContent = t("punkte", { p: punkte, n: anzahl });
  }
  $("weiter").addEventListener("click", neueAufgabe);

  // ---------- Reiter & Texte ----------
  var tab = "regeln";
  function zeigeTab(k){
    tab = k;
    document.querySelectorAll(".tabs button").forEach(function(b){ b.setAttribute("aria-selected", b.dataset.tab === k ? "true" : "false"); });
    ["regeln", "teiler", "ueben"].forEach(function(x){ sicht($("s_" + x), x === k); });
    if(k === "ueben" && !auf) neueAufgabe();
    alles(true);
  }
  document.querySelectorAll(".tabs button").forEach(function(b){ b.addEventListener("click", function(){ zeigeTab(b.dataset.tab); }); });
  function alles(nurRechnen){
    if(!nurRechnen){
      document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.title = "miStudia – " + t("titel"); $("titel").textContent = t("titel");
      document.querySelectorAll(".tabs button").forEach(function(b){ b.textContent = t("tab_" + b.dataset.tab); });
      $("tZahl").textContent = t("zahlL"); $("tZahl2").textContent = t("zahlL"); $("zufall").textContent = t("zufall");
    }
    if(tab === "regeln") regeln(); else if(tab === "teiler"){ teiler(); sieb(); }
    if(!nurRechnen && auf){ var war = beantwortet, e = letzteEingabe, gut = $("meldung").classList.contains("gut"); zeige(); if(war){ beantwortet = false; anzahl--; if(gut) punkte--; if($("uAntwort")) $("uAntwort").value = e; pruefe(e); } }
  }
  window.MS_LANG = { apply: function(l){ if(TB[l]){ lang = l; alles(); } } };
  alles();
})();
