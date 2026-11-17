// ============================================================
// terme/app.js – Terme vereinfachen
// Kern: Parser für Terme mit Variablen (a–z, implizites Mal, Potenzen,
//   Klammern, Division durch Zahlen), Polynome als {Schlüssel → Bruch}.
// Vereinfachen: Klammern auflösen → Produkte ausrechnen → gleichartige
//   Terme farbig ordnen → Ergebnis; Probe durch Einsetzen.
// Ausmultiplizieren: Tabellen-/Rechteckmethode „jeder mit jedem“.
// Ausklammern: größter gemeinsamer Faktor (Zahl und Variablen).
// Üben: Eingabe wird auf Gleichwertigkeit UND vollständige Vereinfachung
//   (bzw. richtige ausgeklammerte Form) geprüft.
// Texte: terme/texte.js (TT), Sprache aus dem Startmenü (MS_LANG).
// ============================================================
(function(){
  "use strict";
  var lang = "de";
  function $(id){ return document.getElementById(id); }
  function t(k, v){ var s = (TT[lang] && TT[lang][k]) || TT.de[k] || k; if(v) for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  function sicht(e, an){ if(an) e.removeAttribute("hidden"); else e.setAttribute("hidden", ""); }
  function bdi(s){ return '<bdi dir="ltr">' + s + "</bdi>"; }
  function zuf(a, b){ return a + Math.floor(Math.random() * (b - a + 1)); }
  function wahl(L){ return L[Math.floor(Math.random() * L.length)]; }
  function komma(){ return !(lang === "en" || lang === "zh" || lang === "ja" || lang === "ar"); }
  function esc(s){ return String(s).replace(/[&<>]/g, function(c){ return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]; }); }

  // ---------- Brüche ----------
  function ggt(a, b){ a = Math.abs(a); b = Math.abs(b); while(b){ var r = a % b; a = b; b = r; } return a || 1; }
  function F(n, d){ if(d == null) d = 1; if(d < 0){ n = -n; d = -d; } var g = ggt(n, d); return { n: n / g, d: d / g }; }
  function fadd(a, b){ return F(a.n * b.d + b.n * a.d, a.d * b.d); }
  function fmul(a, b){ return F(a.n * b.n, a.d * b.d); }
  function fdiv(a, b){ return F(a.n * b.d, a.d * b.n); }
  function fnull(a){ return a.n === 0; }
  function ftxt(a){ // Betrag als Text
    var n = Math.abs(a.n), d = a.d;
    if(d === 1) return String(n);
    var x = d; while(x % 2 === 0) x /= 2; while(x % 5 === 0) x /= 5;
    if(x === 1 && d <= 10000){ var s = String(n / d); return komma() ? s.replace(".", ",") : s; }
    return n + "/" + d;
  }

  // ---------- Monome und Polynome ----------
  var HOCH = "⁰¹²³⁴⁵⁶⁷⁸⁹";
  function hoch(k){ return String(k).split("").map(function(c){ return HOCH[+c]; }).join(""); }
  function mkey(m){ return Object.keys(m).filter(function(v){ return m[v]; }).sort().map(function(v){ return v + m[v]; }).join(""); }
  function kparse(k){ var m = {}, re = /([a-z])(\d+)/g, x; while((x = re.exec(k))) m[x[1]] = +x[2]; return m; }
  function kgrad(k){ var s = 0, m = kparse(k); for(var v in m) s += m[v]; return s; }
  function vtxt(k){ var m = kparse(k); return Object.keys(m).sort().map(function(v){ return v + (m[v] > 1 ? hoch(m[v]) : ""); }).join(""); }
  function P(){ return {}; }
  function pconst(c){ var p = {}; if(!fnull(c)) p[""] = c; return p; }
  function padd(a, b){ var r = {}, k; for(k in a) r[k] = a[k]; for(k in b){ r[k] = r[k] ? fadd(r[k], b[k]) : b[k]; if(fnull(r[k])) delete r[k]; } return r; }
  function pskal(a, c){ var r = {}; for(var k in a){ var v = fmul(a[k], c); if(!fnull(v)) r[k] = v; } return r; }
  function kmul(k1, k2){ var a = kparse(k1), b = kparse(k2); for(var v in b) a[v] = (a[v] || 0) + b[v]; return mkey(a); }
  function pmul(a, b){ var r = {}; for(var k in a) for(var j in b){ var kk = kmul(k, j), v = fmul(a[k], b[j]); r[kk] = r[kk] ? fadd(r[kk], v) : v; if(fnull(r[kk])) delete r[kk]; } return r; }
  function ppow(a, e){ var r = pconst(F(1)); for(var i = 0; i < e; i++) r = pmul(r, a); return r; }
  function sortKeys(p){ return Object.keys(p).sort(function(x, y){
    var d = kgrad(y) - kgrad(x); if(d) return d; if(x === "") return 1; if(y === "") return -1;
    var a = kparse(x), b = kparse(y), V = Object.keys(a).concat(Object.keys(b)).sort();
    for(var i = 0; i < V.length; i++){ var e = (b[V[i]] || 0) - (a[V[i]] || 0); if(e) return e; }
    return 0; }); }
  function mtxt(k, c, erst){ // ein Glied mit Vorzeichen
    var neg = c.n < 0, v = vtxt(k), z = ftxt(c);
    var kern = v ? ((z === "1" ? "" : z.indexOf("/") >= 0 ? z + "·" : z) + v) : z;
    return erst ? (neg ? "−" : "") + kern : (neg ? " − " : " + ") + kern;
  }
  function ptxt(p){ var K = sortKeys(p); if(!K.length) return "0"; return K.map(function(k, i){ return mtxt(k, p[k], i === 0); }).join(""); }
  function pgleich(a, b){ var ka = Object.keys(a), kb = Object.keys(b); if(ka.length !== kb.length) return false; return ka.every(function(k){ return b[k] && b[k].n === a[k].n && b[k].d === a[k].d; }); }

  // ---------- Parser ----------
  function normal(s){
    return String(s).replace(/[−–—]/g, "-").replace(/[·⋅×∙*]/g, "*").replace(/÷/g, ":").replace(/²/g, "^2").replace(/³/g, "^3").replace(/⁴/g, "^4").replace(/⁵/g, "^5").replace(/[A-Z]/g, function(c){ return c.toLowerCase(); }).replace(/\s+/g, "");
  }
  function parse(text){
    var s = normal(text); if(!s) throw "leer";
    var tok = [], m, re = /(\d+(?:[.,]\d+)?)|([a-z])|([+\-*:\/^()])/g, pos = 0;
    while((m = re.exec(s))){ if(m.index !== pos) throw "zeichen"; pos = re.lastIndex; tok.push(m[1] ? { t: "n", v: m[1] } : m[2] ? { t: "v", v: m[2] } : { t: "o", v: m[3] }); }
    if(pos !== s.length) throw "zeichen";
    var i = 0;
    function ist(o){ return tok[i] && tok[i].t === "o" && tok[i].v === o; }
    function expr(){
      var items = [], sg = 1;
      if(ist("+")) i++; else if(ist("-")){ sg = -1; i++; }
      items.push({ s: sg, n: term() });
      while(ist("+") || ist("-")){ sg = tok[i].v === "-" ? -1 : 1; i++; items.push({ s: sg, n: term() }); }
      return items.length === 1 && items[0].s === 1 ? items[0].n : { t: "sum", items: items };
    }
    function term(){
      var f = [factor()];
      for(;;){
        if(ist("*")){ i++; f.push(factor()); }
        else if(ist(":") || ist("/")){ i++; var d = factor(), dv = expand(d); var ks = Object.keys(dv); if(ks.length !== 1 || ks[0] !== "") throw "division"; f.push({ t: "num", v: fdiv(F(1), dv[""]), div: d }); }
        else if(tok[i] && (tok[i].t === "v" || ist("("))) f.push(factor());
        else break;
      }
      return f.length === 1 ? f[0] : { t: "prod", f: f };
    }
    function factor(){
      var b = base();
      if(ist("^")){ i++; if(!tok[i] || tok[i].t !== "n" || /[.,]/.test(tok[i].v)) throw "potenz"; var e = +tok[i].v; i++; if(e > 9) throw "potenz"; return { t: "pow", b: b, e: e }; }
      return b;
    }
    function base(){
      var x = tok[i]; if(!x) throw "ende";
      if(x.t === "n"){ i++; var v = x.v.replace(",", "."), d = 1; if(v.indexOf(".") >= 0){ d = Math.pow(10, v.split(".")[1].length); } return { t: "num", v: F(Math.round(Number(v) * d), d) }; }
      if(x.t === "v"){ i++; return { t: "var", v: x.v }; }
      if(ist("(")){ i++; var e = expr(); if(!ist(")")) throw "klammer"; i++; return { t: "par", e: e }; }
      if(ist("-")){ i++; return { t: "neg", e: factor() }; }
      throw "zeichen";
    }
    var r = expr(); if(i !== tok.length) throw "zeichen";
    return r;
  }
  function expand(n){
    if(n.t === "num") return pconst(n.v);
    if(n.t === "var"){ var p = {}; p[n.v + "1"] = F(1); return p; }
    if(n.t === "par") return expand(n.e);
    if(n.t === "neg") return pskal(expand(n.e), F(-1));
    if(n.t === "pow") return ppow(expand(n.b), n.e);
    if(n.t === "prod") return n.f.reduce(function(r, f){ return pmul(r, expand(f)); }, pconst(F(1)));
    return n.items.reduce(function(r, it){ return padd(r, pskal(expand(it.n), F(it.s))); }, P());
  }
  function hatKlammer(n){ return n.t === "par" || (n.t === "prod" && n.f.some(hatKlammer)) || (n.t === "pow" && hatKlammer(n.b)) || (n.t === "neg" && hatKlammer(n.e)) || (n.t === "sum" && n.items.some(function(x){ return hatKlammer(x.n); })); }
  function render(n){
    if(n.t === "num") return n.div ? ": " + render(n.div) : ftxt(n.v);
    if(n.t === "var") return n.v;
    if(n.t === "par") return "(" + render(n.e) + ")";
    if(n.t === "neg") return "(−" + render(n.e) + ")";
    if(n.t === "pow"){ var b = render(n.b); return b + hoch(n.e); }
    if(n.t === "prod"){
      var s = "";
      n.f.forEach(function(f, i){ var r = render(f); if(i === 0) s = r; else if(f.t === "num" && f.div) s += " " + r; else if(f.t === "par" && !(n.f[i - 1].t === "num" && n.f[i - 1].div)) s += r;
      else if((f.t === "var" || f.t === "par" || (f.t === "pow" && f.b.t !== "num")) && ((n.f[i - 1].t === "num" && !n.f[i - 1].div) || ((f.t === "var" || (f.t === "pow" && f.b.t === "var")) && (n.f[i - 1].t === "var" || (n.f[i - 1].t === "pow" && n.f[i - 1].b.t === "var"))))) s += r; else s += " · " + r; });
      return s;
    }
    return n.items.map(function(it, i){ return (i === 0 ? (it.s < 0 ? "−" : "") : it.s < 0 ? " − " : " + ") + render(it.n); }).join("");
  }
  function summanden(n){ return n.t === "sum" ? n.items : [{ s: 1, n: n }]; }
  function auswerten(n, w){
    if(n.t === "num") return n.v.n / n.v.d;
    if(n.t === "var") return w[n.v];
    if(n.t === "par") return auswerten(n.e, w);
    if(n.t === "neg") return -auswerten(n.e, w);
    if(n.t === "pow") return Math.pow(auswerten(n.b, w), n.e);
    if(n.t === "prod") return n.f.reduce(function(r, f){ return r * auswerten(f, w); }, 1);
    return n.items.reduce(function(r, it){ return r + it.s * auswerten(it.n, w); }, 0);
  }
  function astVars(n){ var v = {}; (function lauf(x){ if(!x) return; if(x.t === "var") v[x.v] = 1; else if(x.t === "par" || x.t === "neg") lauf(x.e); else if(x.t === "pow") lauf(x.b); else if(x.t === "prod") x.f.forEach(lauf); else if(x.t === "sum") x.items.forEach(function(it){ lauf(it.n); }); })(n); return Object.keys(v).sort(); }
  function variablen(p){ var v = {}; Object.keys(p).forEach(function(k){ for(var x in kparse(k)) v[x] = 1; }); return Object.keys(v).sort(); }
  function zahl(v){ var r = Math.round(v * 1e6) / 1e6, s = String(Math.abs(r)); if(komma()) s = s.replace(".", ","); return (r < 0 ? "−" : "") + s; }
  function fehlerText(e){ return t("err_" + (typeof e === "string" ? e : "zeichen")); }

  // Zwischenschritt beim Klammerauflösen: Faktor · jedes Glied, z. B. −2(a − 3) → (−2) · a + (−2) · (−3)
  function faktorKl(p){ var K = sortKeys(p); if(K.length !== 1) return null; var s = mtxt(K[0], p[K[0]], true); return p[K[0]].n < 0 ? "(" + s + ")" : s; }
  function verteilZeile(it){
    var n = it.n, vor = [], par = null;
    if(n.t === "par") par = n;
    else if(n.t === "prod"){ for(var i = 0; i < n.f.length; i++){ var f = n.f[i]; if(f.t === "par"){ if(par) return null; par = f; } else if(hatKlammer(f) || (f.t === "num" && f.div)) return null; else vor.push(f); } }
    else return null;
    if(!par || par.e.t !== "sum") return null;
    var k = pskal(expand(vor.length ? { t: "prod", f: vor } : { t: "num", v: F(1) }), F(it.s)), kt = faktorKl(k); if(!kt || kt === "1") return null; // Plus vor der Klammer: Klammer fällt einfach weg
    var teile = par.e.items.map(function(x){ return faktorKl(pskal(expand(x.n), F(x.s))); });
    if(teile.some(function(x){ return !x; })) return null;
    return teile.map(function(x){ return kt + " · " + x; }).join(" + ");
  }

  // ---------- Reiter Vereinfachen ----------
  var probeW = {}, probeSig = null;
  function vereinfachen(){
    var L = [], ast;
    try { ast = parse($("term").value); } catch(e){ $("fehler").textContent = fehlerText(e); ["schritte", "ergebnis", "probe"].forEach(function(id){ $(id).innerHTML = ""; }); return; }
    $("fehler").textContent = "";
    var S = summanden(ast), glieder = [];
    // Glieder und Farben vorab (gleiche Farbe = gleichartige Terme, schon beim Klammerauflösen)
    S.forEach(function(it){ var p = pskal(expand(it.n), F(it.s)); sortKeys(p).forEach(function(k){ glieder.push({ k: k, c: p[k] }); }); });
    var gruppen = [], farbe = {};
    glieder.forEach(function(g){ if(!(g.k in farbe)){ farbe[g.k] = g.k === "" ? "gk" : "g" + (gruppen.length % 6); gruppen.push(g.k); } });
    function pchips(p){ return sortKeys(p).map(function(k, i){ return '<span class="chip ' + farbe[k] + '">' + mtxt(k, p[k], i === 0).trim() + "</span>"; }).join(" "); }
    // 1. Klammern auflösen – mit Zwischenschritt „jedes Glied einzeln malnehmen“
    var kl = S.filter(function(it){ return hatKlammer(it.n); });
    if(kl.length){
      L.push({ h: t("s_klammer"), f: kl.map(function(it){ var p = pskal(expand(it.n), F(it.s)), z = verteilZeile(it); return bdi((it.s < 0 ? "−" : "+") + " " + esc(render(it.n)) + (z ? " = " + z : "") + " = " + pchips(p)); }).join("<br>") + '<br><span class="muted" style="font-size:15px;line-height:1.35;display:inline-block">' + t(kl.some(function(it){ return it.s < 0; }) ? "s_klammerMinus" : "s_klammerInfo") + "</span>" });
    }
    // 2. Produkte ausrechnen
    var pr = S.filter(function(it){ if(hatKlammer(it.n)) return false; var p = expand(it.n), k = Object.keys(p); return k.length === 1 && esc(render(it.n)) !== ptxt(p).replace(/^−/, ""); });
    if(pr.length) L.push({ h: t("s_produkt"), f: pr.map(function(it){ return bdi(esc(render(it.n)) + " = " + ptxt(expand(it.n))); }).join("<br>") + '<br><span class="muted" style="font-size:15px;line-height:1.35;display:inline-block">' + t("s_produktInfo") + "</span>" });
    // 3. Gleichartige Terme ordnen
    function chip(g, i){ return '<span class="chip ' + farbe[g.k] + '">' + mtxt(g.k, g.c, i === 0).trim() + "</span>"; }
    var vorher = glieder.map(function(g, i){ return chip(g, i); }).join(" ");
    var mehrfach = gruppen.some(function(k){ return glieder.filter(function(g){ return g.k === k; }).length > 1; });
    var erg = expand(ast);
    if(glieder.length > 1){
      var geordnet = sortKeys(glieder.reduce(function(o, g){ o[g.k] = 1; return o; }, {})).map(function(k){
        var G = glieder.filter(function(g){ return g.k === k; });
        var inner = G.map(function(g, i){ return mtxt(g.k, g.c, i === 0); }).join("");
        return { k: k, txt: G.length > 1 ? "(" + inner + ")" : inner, neg: false };
      });
      var zeile = geordnet.map(function(x, i){ return (i ? " + " : "") + '<span class="chip ' + farbe[x.k] + '">' + x.txt + "</span>"; }).join("");
      L.push({ h: t(mehrfach ? "s_ordnen" : "s_keine"), f: bdi(vorher) + (mehrfach ? "<br>= " + bdi(zeile) : "") });
      if(mehrfach) L.push({ h: t("s_zusammen"), f: bdi(sortKeys(erg).map(function(k, i){ return '<span class="chip ' + (farbe[k] || "gk") + '">' + mtxt(k, erg[k], i === 0).trim() + "</span>"; }).join(" ") || "0") });
    }
    $("schritte").innerHTML = L.map(function(x){ return "<li><h3>" + x.h + '</h3><div class="f">' + x.f + "</div></li>"; }).join("");
    $("ergebnis").innerHTML = bdi(esc(render(ast)) + " = " + ptxt(erg));
    // Probe
    var V = astVars(ast), w = {}, werte = [2, 3, -1, 5, 4];
    V.forEach(function(v, i){ w[v] = probeW[v] != null ? probeW[v] : werte[i % werte.length]; probeW[v] = w[v]; });
    // Regler für die eingesetzten Werte (nur neu bauen, wenn sich die Variablen ändern – sonst ginge das Ziehen verloren)
    var sig = V.join(",");
    sicht($("probeRegler"), V.length > 0); $("probeReglerT").textContent = t("probeRegler");
    if(sig !== probeSig){ probeSig = sig;
      $("probeRegel").innerHTML = V.map(function(v){ return '<label>' + esc(v) + ' = <input type="range" min="-5" max="5" step="1" value="' + w[v] + '" data-v="' + esc(v) + '"> <b>' + zahl(w[v]) + "</b></label>"; }).join("");
      $("probeRegel").querySelectorAll("input").forEach(function(r){ r.addEventListener("input", function(){ probeW[r.dataset.v] = Number(r.value); r.nextElementSibling.textContent = zahl(Number(r.value)); vereinfachen(); }); });
    }
    var a = auswerten(ast, w), b = auswerten({ t: "sum", items: [] }, w), pe = 0;
    Object.keys(erg).forEach(function(k){ var m = kparse(k), x = erg[k].n / erg[k].d; for(var v in m) x *= Math.pow(w[v], m[v]); pe += x; }); void b;
    $("probe").innerHTML = V.length ? t("probe", { w: bdi(Object.keys(w).map(function(v){ return v + " = " + zahl(w[v]); }).join(", ")), a: bdi(zahl(a)), b: bdi(zahl(pe)) }) : "";
    $("merk1").textContent = t("merk1");
  }
  $("term").addEventListener("input", vereinfachen);

  // ---------- Reiter Ausmultiplizieren ----------
  function faktorPoly(n){ return expand(n); }
  function ausmult(){
    var ast;
    try { ast = parse($("term2").value); } catch(e){ $("fehler2").textContent = fehlerText(e); ["mText", "mTab", "mSchritte", "mErgebnis"].forEach(function(id){ $(id).innerHTML = ""; }); return; }
    var kern = ast, vzm = 1;
    if(ast.t === "sum" && ast.items.length === 1){ kern = ast.items[0].n; vzm = ast.items[0].s; }
    var fs = kern.t === "prod" ? kern.f.slice() : kern.t === "pow" && kern.e === 2 ? [kern.b, kern.b] : null;
    if(fs && vzm < 0) fs.unshift({ t: "num", v: F(-1) });
    if(fs){ // Zahlen/Variablen vorne zu einem Faktor zusammenziehen, Klammern bleiben Faktoren
      var vorne = fs.filter(function(f){ return !hatKlammer(f); }), kl = fs.filter(hatKlammer);
      if(kl.length === 1 && vorne.length) fs = [{ t: "prod", f: vorne }, kl[0]];
      else if(kl.length === 2 && !vorne.length) fs = kl;
      else if(kl.length === 1 && kl[0].t === "pow" && kl[0].e === 2 && !vorne.length) fs = [kl[0].b, kl[0].b];
      else fs = null;
    }
    if(!fs){ $("fehler2").textContent = t("err_produkt"); ["mText", "mTab", "mSchritte", "mErgebnis"].forEach(function(id){ $(id).innerHTML = ""; }); return; }
    $("fehler2").textContent = "";
    var A = faktorPoly(fs[0]), B = faktorPoly(fs[1]), KA = sortKeys(A), KB = sortKeys(B);
    $("mText").innerHTML = t("mText", { a: KA.length, b: KB.length, n: KA.length * KB.length });
    var h = "<tr><th>·</th>" + KB.map(function(k){ return "<th>" + mtxt(k, B[k], true) + "</th>"; }).join("") + "</tr>", prod = [];
    KA.forEach(function(ka){ h += "<tr><th>" + mtxt(ka, A[ka], true) + "</th>"; KB.forEach(function(kb){ var k = kmul(ka, kb), c = fmul(A[ka], B[kb]); prod.push({ k: k, c: c }); h += "<td>" + mtxt(k, c, true) + "</td>"; }); h += "</tr>"; });
    $("mTab").innerHTML = h;
    var erg = pmul(A, B), L = [];
    L.push({ h: t("m_alle"), f: bdi(prod.map(function(g, i){ return mtxt(g.k, g.c, i === 0); }).join("")) });
    var gl = {}, mehr = false; prod.forEach(function(g){ if(gl[g.k]) mehr = true; gl[g.k] = 1; });
    if(mehr) L.push({ h: t("s_zusammen"), f: bdi(ptxt(erg)) });
    $("mSchritte").innerHTML = L.map(function(x){ return "<li><h3>" + x.h + '</h3><div class="f">' + x.f + "</div></li>"; }).join("");
    $("mErgebnis").innerHTML = bdi(esc(render(ast)) + " = " + ptxt(erg));
    $("merk2").textContent = t("merk2");
  }
  $("term2").addEventListener("input", ausmult);

  // ---------- Reiter Ausklammern ----------
  function gemeinsam(p){ // größter gemeinsamer Faktor: {c: Bruch, k: Monom-Schlüssel}
    var K = Object.keys(p); if(!K.length) return null;
    var ganz = K.every(function(k){ return p[k].d === 1; }), g = 0;
    if(ganz) K.forEach(function(k){ g = ggt(g, p[k].n); });
    var m = null; K.forEach(function(k){ var x = kparse(k); if(m === null) m = x; else { for(var v in m) m[v] = Math.min(m[v], x[v] || 0); } });
    var erstes = sortKeys(p)[0];
    return { c: F((ganz ? g : 1) * (p[erstes].n < 0 ? -1 : 1)), k: mkey(m || {}) };
  }
  function kdiv(k1, k2){ var a = kparse(k1), b = kparse(k2); for(var v in b) a[v] -= b[v]; return mkey(a); }
  function ausklammern(p){
    var G = gemeinsam(p); if(!G) return null;
    var innen = {}; Object.keys(p).forEach(function(k){ innen[kdiv(k, G.k)] = fdiv(p[k], G.c); });
    return { G: G, innen: innen };
  }
  function faktorTxt(G){ return mtxt(G.k, G.c, true); }
  function klammer(){
    var ast;
    try { ast = parse($("term3").value); } catch(e){ $("fehler3").textContent = fehlerText(e); ["kSchritte", "kErgebnis"].forEach(function(id){ $(id).innerHTML = ""; }); return; }
    $("fehler3").textContent = "";
    var p = expand(ast), A = ausklammern(p), L = [];
    if(hatKlammer(ast) || esc(render(ast)) !== ptxt(p)) L.push({ h: t("k_erst"), f: bdi(ptxt(p)) });
    if(!A || Object.keys(p).length < 2 || (A.G.k === "" && Math.abs(A.G.c.n) === 1 && A.G.c.d === 1)){
      $("kSchritte").innerHTML = L.map(function(x){ return "<li><h3>" + x.h + '</h3><div class="f">' + x.f + "</div></li>"; }).join("") + "<li><div class=\"f\">" + t(Object.keys(p).length < 2 ? "k_einGlied" : "k_nichts") + "</div></li>";
      $("kErgebnis").innerHTML = ""; $("merk3").textContent = t("merk3"); return;
    }
    var K = sortKeys(p), ganz = K.every(function(k){ return p[k].d === 1; });
    if(ganz) L.push({ h: t("k_zahl"), f: bdi(t("ggtL") + "(" + K.map(function(k){ return ftxt(p[k]); }).join(", ") + ") = " + ftxt(A.G.c)) });
    if(A.G.k) L.push({ h: t("k_var"), f: bdi(vtxt(A.G.k)) + " " + t("k_varInfo") });
    var ft = faktorTxt(A.G);
    L.push({ h: t("k_zerlegen", { f: bdi(ft) }), f: K.map(function(k){ var ik = kdiv(k, A.G.k), ic = fdiv(p[k], A.G.c); return bdi(mtxt(k, p[k], true) + " = " + ft + " · " + (function(){ var x = Object.keys(kparse(ik)).length || Math.abs(ic.n) !== 1 || ic.d !== 1 ? mtxt(ik, ic, true) : (ic.n < 0 ? "−1" : "1"); return ic.n < 0 ? "(" + x + ")" : x; })()); }).join("<br>") });
    var erg = ft + "(" + ptxt(A.innen) + ")";
    L.push({ h: t("k_probe"), f: bdi(erg + " = " + ptxt(pmul(A.innen, (function(){ var x = {}; x[A.G.k] = A.G.c; return x; })()))) + " ✓" });
    $("kSchritte").innerHTML = L.map(function(x){ return "<li><h3>" + x.h + '</h3><div class="f">' + x.f + "</div></li>"; }).join("");
    $("kErgebnis").innerHTML = bdi(ptxt(p) + " = " + erg);
    $("merk3").textContent = t("merk3");
  }
  $("term3").addEventListener("input", klammer);

  function beispiele(box, inp, L, f){ box.innerHTML = ""; L.forEach(function(x){ var b = document.createElement("button"); b.type = "button"; b.textContent = x; b.addEventListener("click", function(){ inp.value = x; f(); }); box.appendChild(b); }); }

  // ---------- Reiter Üben ----------
  var auf = null, punkte = 0, anzahl = 0, beantwortet = false, zweiterV = false, letzte = null;
  function vz(c, erst){ return erst ? (c < 0 ? "−" : "") : (c < 0 ? " − " : " + "); }
  function glied(c, v, erst){ var a = Math.abs(c); return vz(c, erst) + (v ? (a === 1 ? "" : a) + v : a); }
  function nz(a, b){ var x; do { x = zuf(a, b); } while(!x); return x; }
  function neueAufgabe(){
    beantwortet = false; zweiterV = false; letzte = null;
    var typ = wahl(["zus", "zus", "prod", "klammer", "klammer", "pm", "pm", "binom", "aus", "aus"]), txt = "", V = wahl([["a", "b"], ["x", "y"], ["m", "n"]]);
    if(typ === "zus"){
      var n = zuf(4, 6), L = [];
      for(var i = 0; i < n; i++){ var art = wahl([V[0], V[0], V[1], V[1], ""]); L.push(glied(nz(-9, 9), art, i === 0)); }
      txt = L.join("");
    } else if(typ === "prod"){
      var a = nz(-6, 9), b = nz(-6, 9), v1 = wahl([V[0], V[0] + V[1], V[0] + "²"]), v2 = wahl([V[0], V[1], V[1] + "²"]);
      txt = (a < 0 ? "−" : "") + (Math.abs(a) === 1 ? "" : Math.abs(a)) + v1 + " · " + (b < 0 ? "(−" + (Math.abs(b) === 1 ? "" : Math.abs(b)) + v2 + ")" : (b === 1 ? "" : b) + v2);
    } else if(typ === "klammer"){
      var k1 = zuf(2, 6), k2 = nz(-5, 5), p1 = nz(-9, 9), p2 = nz(-9, 9), q1 = zuf(1, 4), q2 = nz(-9, 9);
      txt = k1 + "(" + glied(q1, V[0], true) + glied(p1, "", false) + ")" + (k2 < 0 ? " − " : " + ") + (Math.abs(k2) === 1 ? "" : Math.abs(k2)) + "(" + glied(zuf(1, 5), V[0], true) + glied(p2, "", false) + ")"; void q2;
    } else if(typ === "pm"){ // Plus- und Minusklammern ohne Zahl davor
      var s0 = nz(-9, 9), u1 = nz(-6, 6), u2 = nz(-9, 9), w1 = nz(-6, 6), w2 = nz(-9, 9);
      txt = glied(s0, V[0], true) + " + (" + glied(u1, V[0], true) + glied(u2, "", false) + ") − (" + glied(w1, V[0], true) + glied(w2, "", false) + ")";
      if(Math.random() < 0.5) txt = glied(nz(1, 9), "", true) + " − (" + glied(u1, V[0], true) + glied(u2, "", false) + ") + (" + glied(w1, V[0], true) + glied(w2, "", false) + ")";
    } else if(typ === "binom"){
      var b1 = zuf(1, 3), c1 = nz(-7, 7), b2 = zuf(1, 3), c2 = nz(-7, 7);
      txt = "(" + glied(b1, V[0], true) + glied(c1, "", false) + ")(" + glied(b2, V[0], true) + glied(c2, "", false) + ")";
    } else {
      var g = wahl([2, 3, 4, 5, 6, 7, 8]), mitV = Math.random() < 0.5, r1 = zuf(1, 6), r2 = nz(-9, 9);
      while(ggt(r1, r2) !== 1) r2 = nz(-9, 9);
      txt = mitV ? glied(g * r1, V[0] + "²", true) + glied(g * r2, V[0], false) : glied(g * r1, V[0], true) + glied(g * r2, "", false);
    }
    var ast = parse(txt);
    auf = { typ: typ, txt: txt, p: expand(ast), ast: ast };
    zeige();
  }
  function zeige(){
    var A = auf, Z = $("antwortzeile");
    $("auftrag").textContent = t(A.typ === "aus" ? "u_aus" : A.typ === "binom" ? "u_binom" : "u_einfach");
    $("uTerm").innerHTML = bdi(esc(A.txt) + " =");
    $("meldung").textContent = ""; $("meldung").className = "meldung"; sicht($("uLauf"), false); Z.innerHTML = "";
    var inp = document.createElement("input"); inp.className = "term eingabeT"; inp.id = "uAntwort"; inp.setAttribute("autocomplete", "off"); inp.setAttribute("autocapitalize", "off"); inp.setAttribute("spellcheck", "false");
    inp.addEventListener("keydown", function(e){ if(e.key === "Enter") pruefe(inp.value); });
    var pb = document.createElement("button"); pb.type = "button"; pb.className = "knopf"; pb.id = "pruefen"; pb.textContent = t("pruefen"); pb.addEventListener("click", function(){ pruefe(inp.value); });
    Z.appendChild(inp); Z.appendChild(pb);
    $("uHinweis").textContent = t("u_hinweis");
    $("weiter").textContent = t("weiterA"); $("punkte").textContent = t("punkte", { p: punkte, n: anzahl });
  }
  function vereinfacht(ast){ // keine Klammern, jedes Glied höchstens eine Zahl und jede Variable einmal, keine gleichartigen Glieder
    if(hatKlammer(ast)) return false;
    var S = summanden(ast), keys = {};
    for(var i = 0; i < S.length; i++){
      var n = S[i].n, f = n.t === "prod" ? n.f : [n], zahlen = 0, vs = {};
      for(var j = 0; j < f.length; j++){
        var x = f[j];
        if(x.t === "num"){ if(x.div) return false; zahlen++; }
        else if(x.t === "var" || (x.t === "pow" && x.b.t === "var")){ var v = x.t === "var" ? x.v : x.b.v; if(vs[v]) return false; vs[v] = 1; }
        else return false;
      }
      if(zahlen > 1) return false;
      var p = expand(n), k = Object.keys(p);
      if(k.length !== 1){ if(k.length === 0) return false; }
      if(keys[k[0]]) return false; keys[k[0]] = 1;
    }
    return true;
  }
  function pruefe(e){
    if(beantwortet) return;
    var ast; try { ast = parse(e); } catch(x){ $("meldung").className = "meldung schlecht"; $("meldung").textContent = fehlerText(x); return; }
    var A = auf, p = expand(ast), gleich = pgleich(p, A.p), ok = false, hinweis = "";
    if(A.typ === "aus"){
      var R = ausklammern(A.p), ft = faktorTxt(R.G);
      var S = summanden(ast), form = S.length === 1 && S[0].n.t === "prod";
      if(form){
        var vor = S[0].n.f.filter(function(f){ return !hatKlammer(f); }), kl = S[0].n.f.filter(hatKlammer);
        var fp = pskal(expand({ t: "prod", f: vor.length ? vor : [{ t: "num", v: F(1) }] }), F(S[0].s));
        var gk = {}; gk[R.G.k] = R.G.c;
        form = kl.length === 1 && (pgleich(fp, gk) || pgleich(fp, pskal(gk, F(-1))));
      }
      ok = gleich && form; if(gleich && !form) hinweis = t("h_nichtGanz", { f: bdi(ft) });
    } else { ok = gleich && vereinfacht(ast); if(gleich && !ok) hinweis = t("h_weiter"); }
    if(!ok && !zweiterV && msTippbar(e)){ zweiterV = true; msNochmal($("meldung")); if(hinweis) $("meldung").innerHTML += " " + hinweis; return; } letzte = e; beantwortet = true; anzahl++; if(ok) punkte++;
    var loes = A.typ === "aus" ? (function(){ var R = ausklammern(A.p); return faktorTxt(R.G) + "(" + ptxt(R.innen) + ")"; })() : ptxt(A.p);
    var m = $("meldung"); m.className = "meldung " + (ok ? "gut" : "schlecht");
    m.innerHTML = ok ? t("richtig") + " " + bdi(loes) : (hinweis ? hinweis + " " : (gleich ? "" : t("h_falsch") + " ")) + t("loesung", { l: bdi(loes) });
    var L = [];
    if(A.typ === "aus"){ var R2 = ausklammern(A.p); L.push(t("ggtL") + " " + bdi(faktorTxt(R2.G))); L.push(t("k_probe") + " " + bdi(faktorTxt(R2.G) + "(" + ptxt(R2.innen) + ") = " + ptxt(A.p))); }
    else {
      var S2 = summanden(A.ast);
      // jede Klammer einzeln mit Zwischenschritt
      S2.filter(function(it){ return hatKlammer(it.n); }).forEach(function(it){ var z = verteilZeile(it); if(z) L.push(bdi((it.s < 0 ? "−" : "+") + " " + esc(render(it.n)) + " = " + z + " = " + ptxt(pskal(expand(it.n), F(it.s))))); });
      if(hatKlammer(A.ast)) L.push(t("s_klammer") + " " + bdi(S2.map(function(it, i){ var q = pskal(expand(it.n), F(it.s)); return sortKeys(q).map(function(k, j){ return mtxt(k, q[k], i === 0 && j === 0); }).join(""); }).join("")));
      L.push(t("s_zusammen") + " " + bdi(ptxt(A.p)));
    }
    $("uLauf").innerHTML = L.map(function(s){ return "<li>" + s + "</li>"; }).join(""); sicht($("uLauf"), true);
    $("punkte").textContent = t("punkte", { p: punkte, n: anzahl });
  }
  $("weiter").addEventListener("click", neueAufgabe);

  // ---------- Reiter & Texte ----------
  var tab = "einfach", TABS = ["grund", "einfach", "mult", "klammer", "ueben"];
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
      document.querySelectorAll(".tabs button").forEach(function(b){ b.textContent = b.dataset.tab === "grund" ? MS_GRUND.t("tab", lang) : t("tab_" + b.dataset.tab); });
      // Grundlagen-Karten (gemeinsam mit „Negative Zahlen“, /grundlagen.js) in der aktuellen Sprache
      if(window.MS_GRUND) MS_GRUND.karten($("grundBox"), ["minus", "verteilen", "sorten", "fallen", "potenz", "kuerzen"], lang);
      $("tTerm").textContent = t("termL"); $("tTerm2").textContent = t("termL2"); $("tTerm3").textContent = t("termL3"); $("hinweis").textContent = t("hinweis");
      beispiele($("bsp1"), $("term"), ["3a + 5b − a + 2b + 4", "4x − 7 + 2x + 9 − x", "2a · 3b + 5ab − ab", "3x² + 2x − x² + 4x", "5(2a − 3) − 2(a − 4)", "−(x − 3) + 4x", "7x − (3x + 2)", "4 + (2x − 5) − (x − 1)", "8a − (−2a + 5)", "−2(3a − b) + 4(a + 2b)", "3(x + 2) − (x − 4) + 2(5 − x)"], vereinfachen);
      beispiele($("bsp2"), $("term2"), ["3(2x − 5)", "−4a(a + 2b)", "(a + 2)(a + 5)", "(2x + 3)(x − 4)", "(x − 3)²", "(a + b)(c − d)"], ausmult);
      beispiele($("bsp3"), $("term3"), ["12x + 18", "8a − 20b + 4", "12x² + 18x", "6a²b − 9ab²", "15xy − 10x + 5"], klammer);
    }
    if(tab === "einfach") vereinfachen(); else if(tab === "mult") ausmult(); else if(tab === "klammer") klammer();
    if(!nurRechnen && auf){ var war = beantwortet, e = letzte, gut = $("meldung").classList.contains("gut"); zeige(); if(war){ beantwortet = false; anzahl--; if(gut) punkte--; $("uAntwort").value = e; pruefe(e); } }
  }
  window.MS_LANG = { apply: function(l){ if(TT[l]){ lang = l; alles(); } } };
  // Testzugang für automatische Prüfungen
  window.MS_TERM_LADEN = function(w){ // Alltagsbeispiel (alltag-daten.js): {tab, term}
    var id = { einfach: "term", mult: "term2", klammer: "term3" }[w.tab];
    $(id).value = w.term; zeigeTab(w.tab); $(id).scrollIntoView({ behavior: "smooth", block: "center" });
  };
  window.MS_TERM = { parse: parse, expand: expand, ptxt: ptxt, vereinfacht: vereinfacht, ausklammern: ausklammern, faktorTxt: faktorTxt };
  alles();
})();
