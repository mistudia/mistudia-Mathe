// ============================================================
// funktionen/kern.js – gemeinsamer Rechen- und Zeichenkern für
// /linear/, /quadratisch/ und /polynom/ (miStudia Mathe)
//  • exakte Brüche (Bruch), Polynome als Koeffizienten-Arrays
//  • Parser: "2x^3 - x/2 + 0,5", "(x-1)(x+2)^2", "f(x)=…", "y=…"
//  • Nullstellen exakt (rational, quadratisch mit Wurzel), sonst Näherung
//  • Kurvendiskussion: Ableitungen, Extrema, Wendepunkte, Monotonie,
//    Krümmung, Symmetrie, Wertebereich, Verhalten im Unendlichen
//  • Graph (SVG) mit Verschieben, Zwei-Finger-Zoom, Mausrad, Knöpfen
// Texte: FT (texte.js), Sprache aus dem Startmenü (window.MS_MATH_LANG).
// ============================================================
var FK = (function(){
  "use strict";
  var MINUS = "−";

  // ---------- Sprache / Formatierung ----------
  var lang = "de";
  var LOC = { de:"de-DE", en:"en-US", es:"es-ES", zh:"zh-CN", fr:"fr-FR", ru:"ru-RU", ar:"ar-u-nu-latn", ja:"ja-JP", pt:"pt-BR" };
  function setLang(l){ if(FT[l]) lang = l; }
  function getLang(){ return lang; }
  function t(k, vars){
    var s = (FT[lang] && FT[lang][k] != null) ? FT[lang][k] : FT.de[k];
    if(s == null) return k;
    if(vars) for(var v in vars) s = s.split("{" + v + "}").join(vars[v]);
    return s;
  }
  function kommaSprache(){ return ["de","es","fr","ru","pt"].indexOf(lang) >= 0; }
  function zahl(v, max){
    if(!isFinite(v)) return v > 0 ? "∞" : MINUS + "∞";
    if(Math.abs(v) < 1e-10) v = 0;
    return new Intl.NumberFormat(LOC[lang] || "de-DE", { maximumFractionDigits: max == null ? 2 : max, useGrouping: false }).format(v).replace("-", MINUS);
  }

  // ---------- Brüche ----------
  function ggT(a, b){ a = Math.abs(a); b = Math.abs(b); while(b){ var r = a % b; a = b; b = r; } return a; }
  function B(n, d){
    if(d === undefined) d = 1;
    if(d === 0) throw { code: "div0" };
    if(d < 0){ n = -n; d = -d; }
    var g = ggT(n, d) || 1; n /= g; d /= g;
    if(!Number.isSafeInteger(n) || !Number.isSafeInteger(d)) throw { code: "errBig" };
    return { n: n === 0 ? 0 : n, d: d };
  }
  var Bz = { add: function(a, b){ return B(a.n * b.d + b.n * a.d, a.d * b.d); },
             sub: function(a, b){ return B(a.n * b.d - b.n * a.d, a.d * b.d); },
             mul: function(a, b){ var g1 = ggT(a.n, b.d) || 1, g2 = ggT(b.n, a.d) || 1; return B((a.n / g1) * (b.n / g2), (a.d / g2) * (b.d / g1)); },
             div: function(a, b){ if(b.n === 0) throw { code: "div0" }; return Bz.mul(a, B(b.d, b.n)); },
             neg: function(a){ return B(-a.n, a.d); },
             null: function(a){ return a.n === 0; },
             num: function(a){ return a.n / a.d; } };
  function bruchAusDezimal(s){
    s = s.replace(",", ".");
    var i = s.indexOf(".");
    if(i < 0) return B(parseInt(s, 10), 1);
    var nk = s.length - i - 1;
    if(nk > 9) throw { code: "errBig" };
    return B(parseInt(s.replace(".", ""), 10), Math.pow(10, nk));
  }
  // Bruch als Text: ganze Zahl, abbrechende Dezimalzahl (≤ 4 Stellen) oder n/d
  function btxt(a){
    if(a.d === 1) return zahl(a.n, 0);
    var d = a.d; while(d % 2 === 0) d /= 2; while(d % 5 === 0) d /= 5;
    if(d === 1){ var v = a.n / a.d; var s = zahl(v, 6); if(s.replace(/[^0-9]/g, "").length <= 6) return s; }
    return (a.n < 0 ? MINUS : "") + Math.abs(a.n) + "/" + a.d;
  }

  // ---------- Polynome (Koeffizienten aufsteigend, Brüche) ----------
  function trim(p){ p = p.slice(); while(p.length > 1 && Bz.null(p[p.length - 1])) p.pop(); if(!p.length) p = [B(0)]; return p; }
  function grad(p){ p = trim(p); return (p.length === 1 && Bz.null(p[0])) ? -1 : p.length - 1; }
  function padd(p, q){ var r = []; for(var i = 0; i < Math.max(p.length, q.length); i++) r.push(Bz.add(p[i] || B(0), q[i] || B(0))); return trim(r); }
  function pneg(p){ return p.map(Bz.neg); }
  function pmul(p, q){
    var r = []; for(var i = 0; i < p.length + q.length - 1; i++) r.push(B(0));
    for(var i2 = 0; i2 < p.length; i2++) for(var j = 0; j < q.length; j++) r[i2 + j] = Bz.add(r[i2 + j], Bz.mul(p[i2], q[j]));
    return trim(r);
  }
  function ableitung(p){ var r = []; for(var i = 1; i < p.length; i++) r.push(Bz.mul(p[i], B(i))); return trim(r.length ? r : [B(0)]); }
  function wertB(p, x){ var r = B(0); for(var i = p.length - 1; i >= 0; i--) r = Bz.add(Bz.mul(r, x), p[i]); return r; }
  function wertN(p, x){ var r = 0; for(var i = p.length - 1; i >= 0; i--) r = r * x + p[i].n / p[i].d; return r; }
  function wertNf(c, x){ var r = 0; for(var i = c.length - 1; i >= 0; i--) r = r * x + c[i]; return r; }

  // Polynom als Text, z. B. "2x³ − x + 1/2"
  var HOCH = "⁰¹²³⁴⁵⁶⁷⁸⁹";
  function hoch(n){ return String(n).split("").map(function(c){ return HOCH[+c]; }).join(""); }
  function ptxt(p, varName){
    varName = varName || "x";
    p = trim(p); var teile = [];
    for(var i = p.length - 1; i >= 0; i--){
      var c = p[i]; if(Bz.null(c) && p.length > 1) continue;
      var neg = c.n < 0, a = B(Math.abs(c.n), c.d), s;
      var ct = btxt(a); if(ct.indexOf("/") >= 0 && i > 0) ct = ct + "·";
      if(i === 0) s = btxt(a);
      else s = (a.n === 1 && a.d === 1 ? "" : ct) + varName + (i > 1 ? hoch(i) : "");
      teile.push({ neg: neg, s: s });
    }
    if(!teile.length) return "0";
    return teile.map(function(x, k){ return k === 0 ? (x.neg ? MINUS : "") + x.s : (x.neg ? " " + MINUS + " " : " + ") + x.s; }).join("");
  }

  // ---------- Parser ----------
  function parse(text){
    var s = String(text || "").trim();
    s = s.replace(/^\s*(f\s*\(\s*x\s*\)|y)\s*=\s*/i, "");
    s = s.replace(/[−–—]/g, "-").replace(/[·⋅×∙]/g, "*").replace(/÷/g, "/").replace(/²/g, "^2").replace(/³/g, "^3").replace(/⁴/g, "^4").replace(/⁵/g, "^5").replace(/⁶/g, "^6").replace(/X/g, "x").replace(/\s+/g, "");
    if(!s) throw { code: "errParse" };
    var tok = [], m, re = /(\d+(?:[.,]\d+)?)|([x+\-*\/^()])/g, pos = 0;
    while((m = re.exec(s))){ if(m.index !== pos) throw { code: "errParse" }; pos = re.lastIndex; tok.push(m[1] ? { n: m[1] } : { o: m[2] }); }
    if(pos !== s.length) throw { code: "errParse" };
    var i = 0;
    function peek(){ return tok[i]; }
    function istOp(o){ return tok[i] && tok[i].o === o; }
    function expr(){
      var r = term();
      while(istOp("+") || istOp("-")){ var o = tok[i++].o; var q = term(); r = o === "+" ? padd(r, q) : padd(r, pneg(q)); }
      return r;
    }
    function term(){
      var r = faktor();
      for(;;){
        if(istOp("*")){ i++; r = pmul(r, faktor()); }
        else if(istOp("/")){ i++; var q = faktor(); if(grad(q) > 0) throw { code: "errDiv" }; if(grad(q) < 0) throw { code: "div0" }; r = r.map(function(c){ return Bz.div(c, q[0]); }); r = trim(r); }
        else if(peek() && (peek().n || peek().o === "x" || peek().o === "(")) r = pmul(r, faktor());
        else return r;
      }
    }
    function faktor(){
      if(istOp("-")){ i++; return pneg(faktor()); }
      if(istOp("+")){ i++; return faktor(); }
      var b = atom();
      if(istOp("^")){
        i++; var e = faktor();
        if(grad(e) > 0 || e[0].d !== 1 || e[0].n < 0 || e[0].n > 10) throw { code: "errExp" };
        var r = [B(1)]; for(var k = 0; k < e[0].n; k++) r = pmul(r, b);
        return r;
      }
      return b;
    }
    function atom(){
      var tk = tok[i++];
      if(!tk) throw { code: "errParse" };
      if(tk.n) return [bruchAusDezimal(tk.n)];
      if(tk.o === "x") return [B(0), B(1)];
      if(tk.o === "("){ var r = expr(); if(!istOp(")")) throw { code: "errParse" }; i++; return r; }
      throw { code: "errParse" };
    }
    var p = expr();
    if(i !== tok.length) throw { code: "errParse" };
    return trim(p);
  }

  // ---------- Nullstellen ----------
  function teiler(n){
    n = Math.abs(n); var r = [];
    if(n === 0 || n > 1e9) return r;
    for(var k = 1; k * k <= n; k++) if(n % k === 0){ r.push(k); if(k * k !== n) r.push(n / k); }
    return r;
  }
  function kgV(a, b){ return a / ggT(a, b) * b; }
  function hornerDiv(p, x){ // p / (X - x), exakt
    var n = p.length - 1, q = new Array(n); var r = p[n];
    for(var k = n - 1; k >= 0; k--){ q[k] = r; r = Bz.add(p[k], Bz.mul(r, x)); }
    return trim(q);
  }
  // numerische reelle Nullstellen (Koeffizienten als Zahlen), mit Vielfachheit 1/2…
  function nNull(c){
    while(c.length > 1 && Math.abs(c[c.length - 1]) < 1e-14) c = c.slice(0, -1);
    var n = c.length - 1;
    if(n <= 0) return [];
    if(n === 1) return [{ x: -c[0] / c[1], m: 1 }];
    if(n === 2){
      var a = c[2], b = c[1], cc = c[0], D = b * b - 4 * a * cc, sk = Math.max(b * b, Math.abs(4 * a * cc), 1e-300);
      if(D < -1e-12 * sk) return [];
      if(Math.abs(D) <= 1e-12 * sk) return [{ x: -b / (2 * a), m: 2 }];
      var w = Math.sqrt(D), q = -0.5 * (b + (b >= 0 ? w : -w));
      return [{ x: q / a, m: 1 }, { x: cc / q, m: 1 }].sort(function(u, v){ return u.x - v.x; });
    }
    var dc = []; for(var k = 1; k <= n; k++) dc.push(k * c[k]);
    var krit = nNull(dc).map(function(z){ return z.x; });
    var bound = 1; for(var j = 0; j < n; j++) bound = Math.max(bound, 1 + Math.abs(c[j] / c[n]));
    var pts = [-bound - 1].concat(krit, [bound + 1]);
    var res = [];
    var skala = 0; for(var j2 = 0; j2 <= n; j2++) skala = Math.max(skala, Math.abs(c[j2]));
    krit.forEach(function(x){ if(Math.abs(wertNf(c, x)) <= 1e-9 * skala * Math.max(1, Math.pow(Math.abs(x), n))) res.push({ x: x, m: 2 }); });
    for(var s = 0; s < pts.length - 1; s++){
      var l = pts[s], r = pts[s + 1], fl = wertNf(c, l), fr = wertNf(c, r);
      if(fl === 0 || fr === 0 || fl * fr > 0) continue;
      for(var it = 0; it < 200; it++){ var mid = (l + r) / 2, fm = wertNf(c, mid); if(fm === 0){ l = r = mid; break; } if(fl * fm < 0){ r = mid; } else { l = mid; fl = fm; } if(r - l < 1e-14 * Math.max(1, Math.abs(l))) break; }
      var x0 = (l + r) / 2;
      if(!res.some(function(z){ return Math.abs(z.x - x0) < 1e-7; })) res.push({ x: x0, m: 1 });
    }
    return res.sort(function(u, v){ return u.x - v.x; });
  }
  function wurzelZerlegen(D){ // D = k²·m
    var k = 1, m = D;
    for(var f = 2; f * f <= m; f++) while(m % (f * f) === 0){ m /= f * f; k *= f; }
    return { k: k, m: m };
  }
  // Nullstellen eines Polynoms mit Brüchen → [{x, ex (Text oder null), b (Bruch oder null), m}]
  function nullstellen(p){
    p = trim(p);
    if(grad(p) <= 0) return [];
    var out = [], q = p;
    var mult0 = 0; while(grad(q) > 0 && Bz.null(q[0])){ q = q.slice(1); mult0++; }
    if(mult0) out.push({ x: 0, b: B(0), ex: "0", m: mult0 });
    // rationale Kandidaten
    if(grad(q) > 0){
      var L = q.reduce(function(a, c){ return kgV(a, c.d); }, 1);
      var ints = q.map(function(c){ return c.n * (L / c.d); });
      var dp = teiler(ints[0]), dq = teiler(ints[ints.length - 1]);
      if(dp.length && dq.length && dp.length * dq.length < 40000){
        var kand = [];
        dp.forEach(function(a){ dq.forEach(function(b){ var f = B(a, b); kand.push(f, Bz.neg(f)); }); });
        var gesehen = {};
        kand.forEach(function(f){
          var key = f.n + "/" + f.d; if(gesehen[key]) return; gesehen[key] = 1;
          var m = 0;
          while(grad(q) > 0 && Bz.null(wertB(q, f))){ q = hornerDiv(q, f); m++; }
          if(m) out.push({ x: Bz.num(f), b: f, ex: btxt(f), m: m });
        });
      }
    }
    // Rest
    var g = grad(q);
    if(g === 2){
      var L2 = q.reduce(function(a, c){ return kgV(a, c.d); }, 1);
      var A = q[2].n * (L2 / q[2].d), Bk = q[1].n * (L2 / q[1].d), C = q[0].n * (L2 / q[0].d);
      var D = Bk * Bk - 4 * A * C;
      if(D > 0){
        var w = wurzelZerlegen(D), gg = ggT(ggT(Math.abs(Bk), w.k), Math.abs(2 * A)) || 1;
        var b0 = -Bk / gg, kk = w.k / gg, den = 2 * A / gg;
        if(den < 0){ b0 = -b0; den = -den; }
        [-1, 1].forEach(function(sg){
          var wt = (kk === 1 ? "" : kk) + "√" + w.m;
          var s = (b0 !== 0 ? zahl(b0, 0) + (sg > 0 ? " + " : " " + MINUS + " ") + wt : (sg > 0 ? "" : MINUS) + wt);
          if(den !== 1) s = (b0 !== 0 ? "(" + s + ")" : s) + "/" + den;
          var xv = (b0 + sg * kk * Math.sqrt(w.m)) / den;
          out.push({ x: xv, b: null, ex: s, m: 1 });
        });
      }
    } else if(g >= 3){
      nNull(q.map(Bz.num)).forEach(function(z){ out.push({ x: z.x, b: null, ex: null, m: z.m }); });
    }
    return out.sort(function(u, v){ return u.x - v.x; });
  }
  function xtxt(z){ return z.ex != null ? z.ex : t("ca") + " " + zahl(z.x); }
  function xtxtKurz(z){ return z.ex != null && z.ex.length <= 7 ? z.ex : zahl(z.x); }
  // y-Wert: exakt bei rationalem x; bei Wurzel-x nur dann exakt, wenn der Wert
  // ein einfacher Bruch ist (z. B. f(√2) = −4)
  function glatt(v){
    for(var d = 1; d <= 12; d++){ var n = Math.round(v * d); if(Math.abs(n / d - v) < 1e-9 * Math.max(1, Math.abs(v))) return B(n, d); }
    return null;
  }
  function ywert(p, z){
    if(z.b) return { v: Bz.num(wertB(p, z.b)), ex: btxt(wertB(p, z.b)) };
    var v = wertN(p, z.x), g = z.ex != null ? glatt(v) : null;
    return { v: v, ex: g ? btxt(g) : null };
  }
  function ytxt(y){ return y.ex != null ? y.ex : t("ca") + " " + zahl(y.v); }

  // Punkt- und Intervall-Schreibweise je Sprache
  function punkt(name, xs, ys){
    if(lang === "de") return name + "(" + xs + " | " + ys + ")";
    // \u200E: nach arabischem Namen sonst Zahlen rechts-nach-links (1, 4) → (4 ,1)
    return name + (lang === "ar" ? "\u200E" : "") + "(" + xs + (kommaSprache() ? "; " : ", ") + ys + ")";
  }
  function intervall(l, r, lz, rz){ // lz/rz: Rand gehört dazu
    var sep = kommaSprache() || lang === "de" ? "; " : ", ";
    if(lang === "de" || lang === "fr") return (lz ? "[" : "]") + l + sep + r + (rz ? "]" : "[");
    return (lz ? "[" : "(") + l + sep + r + (rz ? "]" : ")");
  }
  var R = "ℝ", INF = "∞";

  // ---------- Kurvendiskussion ----------
  function analyse(p){
    p = trim(p);
    var n = grad(p), a1 = ableitung(p), a2 = ableitung(a1);
    var res = { p: p, n: n, a1: a1, a2: a2 };
    res.nst = nullstellen(p);
    res.yAchse = p[0];
    // Symmetrie
    var gerade = true, ungerade = true;
    p.forEach(function(c, i){ if(!Bz.null(c)){ if(i % 2) gerade = false; else ungerade = false; } });
    res.sym = n <= 0 ? "Y" : gerade ? "Y" : ungerade ? "O" : "N";
    // Extrema
    var k1 = n >= 2 ? nullstellen(a1) : [];
    res.ext = []; res.sattel = [];
    k1.forEach(function(z){
      var y = ywert(p, z), h = 1e-4 * Math.max(1, Math.abs(z.x));
      var l = wertN(a1, z.x - h), r = wertN(a1, z.x + h);
      if(z.m % 2 === 1){ res.ext.push({ z: z, y: y, art: l > 0 ? "H" : "T" }); }
      else res.sattel.push({ z: z, y: y });
    });
    // Wendepunkte
    var k2 = n >= 3 ? nullstellen(a2) : [];
    res.wp = [];
    k2.forEach(function(z){
      if(z.m % 2 === 1){
        var y = ywert(p, z), s = Math.abs(wertN(a1, z.x)) < 1e-9 * Math.max(1, Math.abs(y.v));
        res.wp.push({ z: z, y: y, sattel: s });
      }
    });
    // Monotonie & Krümmung
    function abschnitte(q, stellen){
      if(grad(q) < 0) return [{ l: null, r: null, s: 0 }];
      var xs = stellen.map(function(z){ return z; });
      var out = [], grenzen = [null].concat(xs, [null]);
      for(var k = 0; k < grenzen.length - 1; k++){
        var lo = grenzen[k], hi = grenzen[k + 1];
        var mx = lo == null && hi == null ? 0 : lo == null ? hi.x - 1 : hi == null ? lo.x + 1 : (lo.x + hi.x) / 2;
        var s = Math.sign(wertN(q, mx));
        if(out.length && out[out.length - 1].s === s) out[out.length - 1].r = hi;
        else out.push({ l: lo, r: hi, s: s });
      }
      return out;
    }
    res.mon = n >= 1 ? abschnitte(a1, k1) : [{ l: null, r: null, s: 0 }];
    res.kr = n >= 2 ? abschnitte(a2, k2) : [];
    // Wertebereich
    var an = n >= 0 ? Bz.num(p[n]) : 0;
    if(n <= 0) res.wb = { art: "const", y: { v: Bz.num(p[0]), ex: btxt(p[0]) } };
    else if(n % 2 === 1) res.wb = { art: "R" };
    else {
      var kand = res.ext.map(function(e){ return e.y; }).concat(res.sattel.map(function(e){ return e.y; }));
      var best = null;
      kand.forEach(function(y){ if(!best || (an > 0 ? y.v < best.v : y.v > best.v)) best = y; });
      res.wb = { art: an > 0 ? "ab" : "bis", y: best };
    }
    res.anVz = Math.sign(an);
    return res;
  }

  // ---------- Graph ----------
  function Graph(svg, opts){
    this.svg = svg; this.opts = opts || {};
    this.v = { x0: -6, x1: 6, y0: -4, y1: 4 };
    this.layers = null; this.ptr = new Map(); this.start = null;
    var self = this;
    this.kurven = []; this.hover = null; this.pin = null; this.tipp0 = null; this.tab = null;
    svg.addEventListener("pointerdown", function(e){
      self.tipp0 = self.ptr.size ? null : { x: e.clientX, y: e.clientY, id: e.pointerId };
      svg.setPointerCapture && (function(){ try { svg.setPointerCapture(e.pointerId); } catch(er){} })();
      self.ptr.set(e.pointerId, { x: e.clientX, y: e.clientY });
      self.beginne();
    });
    svg.addEventListener("pointermove", function(e){
      if(!self.ptr.has(e.pointerId)){
        if(e.pointerType === "mouse"){ var r0 = svg.getBoundingClientRect(); self.hover = { px: e.clientX - r0.left, py: e.clientY - r0.top }; self.zeichneAblesen(); }
        return;
      }
      if(self.tipp0 && Math.hypot(e.clientX - self.tipp0.x, e.clientY - self.tipp0.y) > 6) self.tipp0 = null;
      if(self.tipp0) return;
      self.hover = null;
      self.ptr.set(e.pointerId, { x: e.clientX, y: e.clientY });
      self.bewege(); e.preventDefault();
    });
    function ende(e){
      if(!self.ptr.has(e.pointerId)) return; self.ptr.delete(e.pointerId); self.beginne();
      if(e.type === "pointerup" && self.tipp0 && self.tipp0.id === e.pointerId && !self.ptr.size){ var r1 = svg.getBoundingClientRect(); self.tippen(e.clientX - r1.left, e.clientY - r1.top); }
      self.tipp0 = null;
    }
    svg.addEventListener("pointerup", ende); svg.addEventListener("pointercancel", ende);
    svg.addEventListener("pointerleave", function(e){ if(e.pointerType === "mouse" && self.hover){ self.hover = null; self.zeichneAblesen(); } });
    if(this.opts.tabelle !== false) this.tabelleBauen();
    svg.addEventListener("wheel", function(e){
      e.preventDefault();
      var r = svg.getBoundingClientRect();
      self.zoom(e.deltaY < 0 ? 1 / 1.2 : 1.2, (e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height);
    }, { passive: false });
  }
  Graph.prototype.beginne = function(){
    var pts = Array.from(this.ptr.values());
    this.start = pts.length ? { pts: pts.map(function(p){ return { x: p.x, y: p.y }; }), v: Object.assign({}, this.v) } : null;
  };
  Graph.prototype.bewege = function(){
    if(!this.start) return;
    var r = this.svg.getBoundingClientRect(), pts = Array.from(this.ptr.values()), s = this.start, v0 = s.v;
    var sx = (v0.x1 - v0.x0) / r.width, sy = (v0.y1 - v0.y0) / r.height;
    if(pts.length >= 2 && s.pts.length >= 2){
      var d0 = Math.hypot(s.pts[0].x - s.pts[1].x, s.pts[0].y - s.pts[1].y) || 1;
      var d1 = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) || 1;
      var f = d0 / d1;
      var c0x = (s.pts[0].x + s.pts[1].x) / 2 - r.left, c0y = (s.pts[0].y + s.pts[1].y) / 2 - r.top;
      var c1x = (pts[0].x + pts[1].x) / 2 - r.left, c1y = (pts[0].y + pts[1].y) / 2 - r.top;
      var wx = v0.x0 + c0x * sx, wy = v0.y1 - c0y * sy;
      var nw = (v0.x1 - v0.x0) * f, nh = (v0.y1 - v0.y0) * f;
      var x0 = wx - c1x / r.width * nw, y1 = wy + c1y / r.height * nh;
      this.v = { x0: x0, x1: x0 + nw, y0: y1 - nh, y1: y1 };
    } else if(pts.length === 1){
      var dx = (pts[0].x - s.pts[0].x) * sx, dy = (pts[0].y - s.pts[0].y) * sy;
      this.v = { x0: v0.x0 - dx, x1: v0.x1 - dx, y0: v0.y0 + dy, y1: v0.y1 + dy };
    }
    this.zeichne();
  };
  Graph.prototype.zoom = function(f, fx, fy){
    if(fx == null){ fx = 0.5; fy = 0.5; }
    var v = this.v, w = v.x1 - v.x0, h = v.y1 - v.y0;
    var wx = v.x0 + fx * w, wy = v.y1 - fy * h;
    var nw = w * f, nh = h * f;
    if(nw < 1e-3 || nw > 1e6) return;
    this.v = { x0: wx - fx * nw, x1: wx - fx * nw + nw, y1: wy + fy * nh, y0: wy + fy * nh - nh };
    this.zeichne();
  };
  // passenden Ausschnitt um wichtige Punkte wählen
  Graph.prototype.passend = function(xs, fns){
    xs = xs.filter(isFinite);
    var lo = Math.min.apply(null, xs.concat([0])), hi = Math.max.apply(null, xs.concat([0]));
    var w = Math.max(hi - lo, 4), pad = w * 0.35 + 1;
    var x0 = lo - pad, x1 = hi + pad;
    var ys = [];
    fns.forEach(function(f){ for(var i = 0; i <= 200; i++){ var x = x0 + (x1 - x0) * i / 200, y = f(x); if(isFinite(y)) ys.push(y); } });
    // nur den Bereich um die wichtigen Punkte (nicht die Ränder) für y nehmen
    var yWicht = []; fns.forEach(function(f){ xs.concat([0]).forEach(function(x){ var y = f(x); if(isFinite(y)) yWicht.push(y); }); });
    var ylo = Math.min.apply(null, yWicht.concat([0])), yhi = Math.max.apply(null, yWicht.concat([0]));
    var hgt = Math.max(yhi - ylo, 4), ypad = hgt * 0.3 + 1;
    var y0 = ylo - ypad, y1 = yhi + ypad;
    // Seitenverhältnis grob angleichen, damit nichts extrem verzerrt
    var r = this.svg.getBoundingClientRect(), asp = (r.height || 400) / (r.width || 600);
    if((y1 - y0) < (x1 - x0) * asp * 0.5){ var m = (y0 + y1) / 2, hh = (x1 - x0) * asp * 0.5; y0 = m - hh / 2; y1 = m + hh / 2; }
    this.v = { x0: x0, x1: x1, y0: y0, y1: y1 };
  };
  function schoen(spanne, ziel){
    var roh = spanne / ziel, p = Math.pow(10, Math.floor(Math.log10(roh))), f = roh / p;
    return (f < 1.5 ? 1 : f < 3.5 ? 2 : f < 7.5 ? 5 : 10) * p;
  }
  function E(name, a, txt){ var e = document.createElementNS("http://www.w3.org/2000/svg", name); for(var k in a) e.setAttribute(k, a[k]); if(txt != null) e.textContent = txt; return e; }
  Graph.prototype.zeichne = function(){
    var svg = this.svg, r = svg.getBoundingClientRect(), W = Math.max(280, Math.round(r.width || 600)), H = Math.max(220, Math.round(r.height || 400));
    var v = this.v, self = this;
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.innerHTML = "";
    var X = function(x){ return (x - v.x0) / (v.x1 - v.x0) * W; }, Y = function(y){ return (v.y1 - y) / (v.y1 - v.y0) * H; };
    this.X = X; this.Y = Y; this.W = W; this.H = H;
    var defs = E("defs", {}), cp = E("clipPath", { id: "fkClip" }); cp.appendChild(E("rect", { x: 0, y: 0, width: W, height: H })); defs.appendChild(cp); svg.appendChild(defs);
    // Gitter
    var gx = schoen(v.x1 - v.x0, W / 70), gy = schoen(v.y1 - v.y0, H / 55);
    var g = E("g", { "font-size": 12, fill: "#333", "font-family": "system-ui, sans-serif" });
    for(var x = Math.ceil(v.x0 / gx) * gx; x <= v.x1; x += gx){
      var px = X(x); g.appendChild(E("line", { x1: px, y1: 0, x2: px, y2: H, stroke: "#e2e8f0" }));
    }
    for(var y = Math.ceil(v.y0 / gy) * gy; y <= v.y1; y += gy){
      var py = Y(y); g.appendChild(E("line", { x1: 0, y1: py, x2: W, y2: py, stroke: "#e2e8f0" }));
    }
    // Liegt eine Achse außerhalb des Ausschnitts, stehen ihre Zahlen auf einem Streifen am Rand
    // (mit Pfeil in Richtung der Achse) – statt einer falschen Achse am Rand.
    var xUnten = Y(0) > H, xOben = Y(0) < 0, yLinks = X(0) < 0, yRechts = X(0) > W;
    var ax = xUnten ? H - 22 : xOben ? 2 : Y(0), ay = yLinks ? 48 : yRechts ? W : X(0);
    if(xUnten || xOben){ var by = xUnten ? H - 24 : 0;
      g.appendChild(E("rect", { x: 0, y: by, width: W, height: 24, fill: "#f1f5f9", opacity: 0.94 }));
      g.appendChild(E("line", { x1: 0, y1: xUnten ? by : 24, x2: W, y2: xUnten ? by : 24, stroke: "#64748b", "stroke-width": 1.2, "stroke-dasharray": "6 4" }));
    } else g.appendChild(E("line", { x1: 0, y1: ax, x2: W, y2: ax, stroke: "#444", "stroke-width": 1.5 }));
    if(yLinks || yRechts){ var bx = yLinks ? 0 : W - 52;
      g.appendChild(E("rect", { x: bx, y: 0, width: 52, height: H, fill: "#f1f5f9", opacity: 0.94 }));
      g.appendChild(E("line", { x1: yLinks ? 52 : bx, y1: 0, x2: yLinks ? 52 : bx, y2: H, stroke: "#64748b", "stroke-width": 1.2, "stroke-dasharray": "6 4" }));
    } else g.appendChild(E("line", { x1: ay, y1: 0, x2: ay, y2: H, stroke: "#444", "stroke-width": 1.5 }));
    this.rand = { xUnten: xUnten, xOben: xOben, yLinks: yLinks, yRechts: yRechts };
    var stellen = function(st){ return Math.max(0, -Math.floor(Math.log10(st) + 1e-9)); };
    for(var x2 = Math.ceil(v.x0 / gx) * gx; x2 <= v.x1; x2 += gx){
      if(Math.abs(x2) < gx / 2) continue;
      var px2 = X(x2); if(px2 < 12 || px2 > W - 12 || (yLinks && px2 < 60) || (yRechts && px2 > W - 60)) continue;
      g.appendChild(E("text", { x: px2, y: xUnten ? H - 7 : xOben ? 17 : Math.min(Math.max(ax + 15, 14), H - 4), "text-anchor": "middle", "paint-order": "stroke", stroke: "#fff", "stroke-width": 3 }, zahl(x2, stellen(gx))));
    }
    for(var y2 = Math.ceil(v.y0 / gy) * gy; y2 <= v.y1; y2 += gy){
      if(Math.abs(y2) < gy / 2) continue;
      var py2 = Y(y2); if(py2 < 10 || py2 > H - 8 || (xUnten && py2 > H - 30) || (xOben && py2 < 32)) continue;
      var lx = yRechts ? W - 4 : Math.min(Math.max(ay - 5, 30), W - 4);
      g.appendChild(E("text", { x: lx, y: py2 + 4, "text-anchor": "end", "paint-order": "stroke", stroke: "#fff", "stroke-width": 3 }, zahl(y2, stellen(gy))));
    }
    g.appendChild(E("text", { x: W - 6, y: xUnten ? H - 30 : xOben ? 42 : Math.min(Math.max(ax - 6, 12), H - 4), "text-anchor": "end", "font-style": "italic", "font-size": 14, "font-weight": (xUnten || xOben) ? 700 : 400, fill: (xUnten || xOben) ? "#475569" : "#333" }, (xUnten ? "x ↓" : xOben ? "x ↑" : "x")));
    g.appendChild(E("text", { x: yRechts ? W - 58 : yLinks ? 58 : Math.min(Math.max(ay + 6, 6), W - 14), y: 14, "font-style": "italic", "font-size": 14, "text-anchor": yRechts ? "end" : "start", "font-weight": (yLinks || yRechts) ? 700 : 400, fill: (yLinks || yRechts) ? "#475569" : "#333" }, (yLinks ? "← y" : yRechts ? "y →" : "y")));
    svg.appendChild(g);
    var inhalt = E("g", { "clip-path": "url(#fkClip)" }); svg.appendChild(inhalt);
    this.inhalt = inhalt; this.kurven = [];
    if(this.opts.zeichnen) this.opts.zeichnen(this);
    this.tabelleZeichnen();
    this.zeichneAblesen();
  };
  // brueche: x-Stellen (Polstellen/Lücken), an denen die Linie unterbrochen wird
  Graph.prototype.kurve = function(f, farbe, breite, strich, brueche){
    var v = this.v, n = Math.max(400, this.W), d = "", an = false, hgt = v.y1 - v.y0, xAlt = null;
    brueche = brueche || [];
    for(var i = 0; i <= n; i++){
      var x = v.x0 + (v.x1 - v.x0) * i / n, y = f(x);
      if(xAlt !== null && brueche.some(function(b){ return b > xAlt - 1e-12 && b <= x + 1e-12; })) an = false;
      xAlt = x;
      if(!isFinite(y) || y > v.y1 + 50 * hgt || y < v.y0 - 50 * hgt){ an = false; continue; }
      d += (an ? "L" : "M") + this.X(x).toFixed(1) + " " + this.Y(y).toFixed(1); an = true;
    }
    var a = { d: d, fill: "none", stroke: farbe, "stroke-width": breite || 3, "stroke-linejoin": "round", "stroke-linecap": "round" };
    if(strich) a["stroke-dasharray"] = strich;
    this.inhalt.appendChild(E("path", a));
    if(!strich) this.kurven.push({ f: f, farbe: farbe, breite: breite || 3 });
  };
  Graph.prototype.linie = function(x1, y1, x2, y2, farbe, breite, strich){
    var a = { x1: this.X(x1), y1: this.Y(y1), x2: this.X(x2), y2: this.Y(y2), stroke: farbe, "stroke-width": breite || 2 };
    if(strich) a["stroke-dasharray"] = strich;
    this.inhalt.appendChild(E("line", a));
  };
  Graph.prototype.text = function(x, y, s, farbe, opt){
    opt = opt || {};
    var px = this.X(x) + (opt.dx || 0), py = this.Y(y) + (opt.dy || 0);
    this.inhalt.appendChild(E("text", { x: px, y: py, fill: farbe, "font-size": opt.size || 14, "font-weight": 700, "font-family": "system-ui, sans-serif", "text-anchor": opt.anker || "start", "dominant-baseline": "middle", "paint-order": "stroke", stroke: "#fff", "stroke-width": 4, direction: "ltr", "unicode-bidi": "embed" }, s));
  };
  Graph.prototype.punkt = function(x, y, farbe, label, lage){
    var px = this.X(x), py = this.Y(y);
    this.inhalt.appendChild(E("circle", { cx: px, cy: py, r: 6, fill: farbe, stroke: "#fff", "stroke-width": 2 }));
    if(label){
      var dy = lage === "unten" ? 18 : -16, anker = "middle";
      this.inhalt.appendChild(E("text", { x: px, y: py + dy, fill: farbe, "font-size": 13, "font-weight": 700, "font-family": "system-ui, sans-serif", "text-anchor": anker, "dominant-baseline": "middle", "paint-order": "stroke", stroke: "#fff", "stroke-width": 4, direction: "ltr", "unicode-bidi": "embed" }, label));
    }
  };
  // Lücke: leerer Kreis
  Graph.prototype.loch = function(x, y, farbe, label){
    var px = this.X(x), py = this.Y(y);
    this.inhalt.appendChild(E("circle", { cx: px, cy: py, r: 6, fill: "#fff", stroke: farbe, "stroke-width": 3 }));
    if(label) this.inhalt.appendChild(E("text", { x: px, y: py - 16, fill: farbe, "font-size": 13, "font-weight": 700, "font-family": "system-ui, sans-serif", "text-anchor": "middle", "dominant-baseline": "middle", "paint-order": "stroke", stroke: "#fff", "stroke-width": 4, direction: "ltr", "unicode-bidi": "embed" }, label));
  };
  // Rechter Winkel bei (x, y) zwischen den Richtungen zu (ax, ay) und (bx, by): Bogen mit Punkt (Bildschirmmaße)
  Graph.prototype.rechterWinkel = function(x, y, ax, ay, bx, by, farbe){
    var px = this.X(x), py = this.Y(y), A = [this.X(ax) - px, this.Y(ay) - py], B = [this.X(bx) - px, this.Y(by) - py];
    var la = Math.hypot(A[0], A[1]), lb = Math.hypot(B[0], B[1]); if(la < 16 || lb < 16) return;
    var r = Math.min(12, la * 0.4, lb * 0.4), u = [A[0] / la, A[1] / la], v = [B[0] / lb, B[1] / lb], sw = (u[0] * v[1] - u[1] * v[0]) > 0 ? 1 : 0;
    this.inhalt.appendChild(E("path", { d: "M" + (px + u[0] * r) + " " + (py + u[1] * r) + " A" + r + " " + r + " 0 0 " + sw + " " + (px + v[0] * r) + " " + (py + v[1] * r), fill: "none", stroke: farbe || "#1a2233", "stroke-width": 1.6 }));
    this.inhalt.appendChild(E("circle", { cx: px + (u[0] + v[0]) * r * 0.36, cy: py + (u[1] + v[1]) * r * 0.36, r: 1.7, fill: farbe || "#1a2233" }));
  };
  Graph.prototype.polygon = function(pts, fuell, rand){
    var self = this;
    this.inhalt.appendChild(E("polygon", { points: pts.map(function(p){ return self.X(p[0]).toFixed(1) + "," + self.Y(p[1]).toFixed(1); }).join(" "), fill: fuell, stroke: rand || "none", "stroke-width": 2 }));
  };

  // ---------- Werte ablesen (Maus darüber / Tippen) ----------
  // Hover (Maus) zeigt einen Ablesepunkt auf der nächstliegenden durchgezogenen Kurve,
  // Tippen/Klicken lässt ihn stehen; erneutes Tippen auf den Punkt entfernt ihn.
  function klemm(v, a, b){ return Math.min(Math.max(v, a), b); }
  Graph.prototype.hauptKurve = function(){
    var b = null; this.kurven.forEach(function(k){ if(!b || k.breite > b.breite) b = k; }); return b;
  };
  Graph.prototype.ablSchritt = function(){
    var roh = (this.v.x1 - this.v.x0) / (this.W || 600) * 12;
    var s = Math.pow(10, Math.floor(Math.log10(roh))); return { s: s, d: Math.max(0, -Math.round(Math.log10(s))) };
  };
  Graph.prototype.weltX = function(px){ var v = this.v; return v.x0 + px / (this.W || 600) * (v.x1 - v.x0); };
  Graph.prototype.naechste = function(x, py){
    var self = this, best = -1, bd = Infinity;
    this.kurven.forEach(function(k, i){ var y = k.f(x); var d = isFinite(y) ? Math.abs(self.Y(y) - py) : 1e9; if(d < bd){ bd = d; best = i; } });
    return best < 0 ? 0 : best;
  };
  Graph.prototype.tippen = function(px, py){
    if(!this.kurven.length || !this.X) return;
    if(this.pin){ var k = this.kurven[Math.min(this.pin.k, this.kurven.length - 1)], y = k.f(this.pin.x);
      if(Math.abs(this.X(this.pin.x) - px) < 16 && (!isFinite(y) || Math.abs(klemm(this.Y(y), 0, this.H) - py) < 16)){ this.pin = null; this.zeichneAblesen(); return; } }
    var st = this.ablSchritt(), x = Math.round(this.weltX(px) / st.s) * st.s;
    this.pin = { x: Number(x.toFixed(st.d)), d: st.d, k: this.naechste(x, py) };
    this.hover = null; this.zeichneAblesen();
  };
  Graph.prototype.zeichneAblesen = function(){
    if(this.ablG){ this.ablG.remove(); this.ablG = null; }
    if(!this.X || !this.kurven.length) return;
    var self = this, g = E("g", { "pointer-events": "none" });
    var R = this.rand || {}, W = this.W, H = this.H;
    var achseY = R.xUnten ? H - 24 : R.xOben ? 24 : this.Y(0), achseX = R.yLinks ? 52 : R.yRechts ? W - 52 : this.X(0);
    function ziel(x, d, k, stark){
      var y = k.f(x), px = self.X(x), farbe = k.farbe, xs = zahl(x, d), txt, py, pyc;
      var lin = { stroke: farbe, "stroke-width": stark ? 2 : 1.5, "stroke-dasharray": "5 4", opacity: stark ? 1 : 0.7 };
      if(!isFinite(y)){
        g.appendChild(E("line", Object.assign({ x1: px, y1: 0, x2: px, y2: H }, lin)));
        txt = "(" + xs + " | —)"; pyc = 40;
      } else {
        py = self.Y(y); pyc = klemm(py, 0, H);
        var ay = Math.abs(y), yd = ay < 100 ? 2 : ay < 10000 ? 1 : 0;
        g.appendChild(E("line", Object.assign({ x1: px, y1: pyc, x2: px, y2: achseY }, lin)));
        if(py >= 0 && py <= H){
          g.appendChild(E("line", Object.assign({ x1: px, y1: py, x2: achseX, y2: py }, lin)));
          g.appendChild(E("circle", { cx: px, cy: py, r: stark ? 7 : 6, fill: stark ? farbe : "#ffffff", stroke: stark ? "#ffffff" : farbe, "stroke-width": stark ? 2.5 : 3 }));
        }
        txt = (py < 0 ? "↑ " : py > H ? "↓ " : "") + "(" + xs + " | " + zahl(y, yd) + ")";
      }
      var w = txt.length * 7.8 + 16, h = 24, lx = px + 12, ly = pyc - 36;
      if(lx + w > W - 4) lx = px - 12 - w;
      if(lx < 4) lx = 4;
      if(ly < 4) ly = pyc + 12;
      var unten = R.xUnten ? H - 28 : H - 2, oben = R.xOben ? 28 : 4;
      if(ly < oben) ly = oben;
      if(ly + h > unten) ly = unten - h;
      g.appendChild(E("rect", { x: lx, y: ly, width: w, height: h, rx: 7, fill: "#ffffff", stroke: farbe, "stroke-width": 2, opacity: stark ? 1 : 0.92 }));
      g.appendChild(E("text", { x: lx + w / 2, y: ly + 16.5, "text-anchor": "middle", fill: "#1a2233", "font-size": 14, "font-weight": 700, "font-family": "system-ui, sans-serif", direction: "ltr", "unicode-bidi": "embed" }, txt));
    }
    if(this.hover){
      var st = this.ablSchritt(), x = Math.round(this.weltX(this.hover.px) / st.s) * st.s;
      ziel(Number(x.toFixed(st.d)), st.d, this.kurven[this.naechste(x, this.hover.py)], false);
    }
    if(this.pin) ziel(this.pin.x, this.pin.d, this.kurven[Math.min(this.pin.k, this.kurven.length - 1)], true);
    this.svg.appendChild(g); this.ablG = g;
  };

  // ---------- Wertetabelle unter dem Graphen ----------
  // Eigene x-Werte eintragen → f(x) der Hauptkurve; Punkte erscheinen im Graphen,
  // ⌖ verschiebt den Ausschnitt zum Punkt.
  function xLesen(s){
    s = String(s).trim().replace(/[−–]/g, "-").replace(/\s+/g, "").replace(",", ".");
    if(!s) return NaN;
    var m = s.match(/^(-?\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/);
    if(m) return +m[2] ? +m[1] / +m[2] : NaN;
    return /^-?(\d+\.?\d*|\.\d+)$/.test(s) ? +s : NaN;
  }
  var ZIEL_SVG = '<svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><circle cx="10" cy="10" r="6" fill="none" stroke="currentColor" stroke-width="2"/><path d="M10 1v5M10 14v5M1 10h5M14 10h5" stroke="currentColor" stroke-width="2"/></svg>';
  Graph.prototype.tabelleBauen = function(){
    var wrap = this.svg.closest(".graph-wrap"); if(!wrap) return;
    var self = this, det = document.createElement("details");
    det.className = "wt";
    det.innerHTML = '<summary></summary><p class="wt-h"></p><div class="wt-scroll" dir="ltr"><table><thead><tr><th class="m">x</th><th class="m">f(x)</th><th></th></tr></thead><tbody></tbody></table></div>' +
      '<div class="wt-knoepfe"><button type="button" class="wt-neu"></button><button type="button" class="wt-auto"></button><label><input type="checkbox" class="wt-zeig" checked> <span></span></label></div>';
    var ref = wrap.nextElementSibling && wrap.nextElementSibling.classList.contains("legende") ? wrap.nextElementSibling : wrap;
    ref.parentNode.insertBefore(det, ref.nextSibling);
    var T = this.tab = { det: det, body: det.querySelector("tbody"), xs: [], lang: null };
    det.addEventListener("toggle", function(){ if(det.open && !T.xs.length) self.tabAuto(); else self.zeichne(); });
    det.querySelector(".wt-auto").addEventListener("click", function(){ self.tabAuto(); });
    det.querySelector(".wt-neu").addEventListener("click", function(){
      var n = T.xs.filter(isFinite), st = n.length >= 2 ? n[n.length - 1] - n[n.length - 2] : 1;
      T.xs.push(n.length ? Number((n[n.length - 1] + (st || 1)).toFixed(8)) : 0);
      self.tabZeilen(); self.zeichne();
      var inp = T.body.querySelectorAll("input"); if(inp.length){ inp[inp.length - 1].focus(); inp[inp.length - 1].select(); }
    });
    det.querySelector(".wt-zeig").addEventListener("change", function(){ self.zeichne(); });
    T.body.addEventListener("input", function(e){
      var i = +e.target.dataset.i; if(isNaN(i)) return;
      T.xs[i] = xLesen(e.target.value); e.target.classList.toggle("wt-falsch", !isFinite(T.xs[i]) && e.target.value.trim() !== "");
      self.zeichne();
    });
    T.body.addEventListener("click", function(e){
      var b = e.target.closest("button"); if(!b) return; var i = +b.dataset.i;
      if(b.classList.contains("wt-weg")){ T.xs.splice(i, 1); self.tabZeilen(); self.zeichne(); return; }
      if(b.classList.contains("wt-ziel")){
        var x = T.xs[i], k = self.hauptKurve(); if(!isFinite(x) || !k) return;
        var y = k.f(x), v = self.v, w = v.x1 - v.x0, h = v.y1 - v.y0;
        self.v = { x0: x - w / 2, x1: x + w / 2, y0: isFinite(y) ? y - h / 2 : v.y0, y1: isFinite(y) ? y + h / 2 : v.y1 };
        self.pin = { x: x, d: 6, k: Math.max(0, self.kurven.indexOf(k)) };
        self.zeichne();
      }
    });
  };
  Graph.prototype.tabAuto = function(){
    var v = this.v, st = schoen(v.x1 - v.x0, 6), xs = [];
    for(var x = Math.ceil(v.x0 / st) * st; x <= v.x1 + 1e-9 && xs.length < 12; x += st) xs.push(Number(x.toFixed(10)));
    this.tab.xs = xs; this.tabZeilen(); this.zeichne();
  };
  Graph.prototype.tabZeilen = function(){
    var T = this.tab, h = "";
    T.xs.forEach(function(x, i){
      h += '<tr><td><input type="text" inputmode="decimal" autocomplete="off" data-i="' + i + '" value="' + (isFinite(x) ? zahl(x, 6) : "") + '"></td><td class="wt-y m"></td>' +
        '<td class="wt-akt"><button type="button" class="wt-ziel" data-i="' + i + '">' + ZIEL_SVG + '</button><button type="button" class="wt-weg" data-i="' + i + '">×</button></td></tr>';
    });
    T.body.innerHTML = h; T.lang = null;
  };
  Graph.prototype.tabelleZeichnen = function(){
    var T = this.tab; if(!T) return;
    if(T.lang !== lang){
      T.lang = lang;
      T.det.querySelector("summary").textContent = t("wtTitel");
      T.det.querySelector(".wt-h").textContent = t("wtHinweis");
      T.det.querySelector(".wt-neu").textContent = t("wtNeu");
      T.det.querySelector(".wt-auto").textContent = t("wtAuto");
      T.det.querySelector(".wt-zeig + span").textContent = t("wtPunkte");
      T.body.querySelectorAll(".wt-ziel").forEach(function(b){ b.title = t("wtZiel"); b.setAttribute("aria-label", t("wtZiel")); });
      T.body.querySelectorAll(".wt-weg").forEach(function(b){ b.title = t("wtWeg"); b.setAttribute("aria-label", t("wtWeg")); });
      T.body.querySelectorAll("input").forEach(function(e){ e.setAttribute("aria-label", t("wtX")); e.placeholder = "x"; });
    }
    if(!T.det.open) return;
    var k = this.hauptKurve(), self = this, zeig = T.det.querySelector(".wt-zeig").checked;
    var zellen = T.body.querySelectorAll(".wt-y");
    T.xs.forEach(function(x, i){
      var y = (k && isFinite(x)) ? k.f(x) : NaN, ay = Math.abs(y);
      if(zellen[i]) zellen[i].textContent = isFinite(x) ? (isFinite(y) ? zahl(y, ay < 100 ? 3 : 2) : "—") : "";
      if(zeig && isFinite(y) && isFinite(x)){
        var px = self.X(x), py = self.Y(y);
        self.inhalt.appendChild(E("circle", { cx: px, cy: py, r: 5.5, fill: "#7c3aed", stroke: "#ffffff", "stroke-width": 2 }));
      }
    });
  };


  // Zoom-Knöpfe an einen Graphen hängen
  function knoepfe(box, graph, passend){
    box.innerHTML = '<button type="button" data-z="in">+</button><button type="button" data-z="out">' + MINUS + '</button><button type="button" data-z="fit">⤢</button>';
    box.querySelector('[data-z="in"]').addEventListener("click", function(){ graph.zoom(1 / 1.4); });
    box.querySelector('[data-z="out"]').addEventListener("click", function(){ graph.zoom(1.4); });
    box.querySelector('[data-z="fit"]').addEventListener("click", function(){ passend(); graph.zeichne(); });
    function titel(){ box.querySelector('[data-z="in"]').title = t("zin"); box.querySelector('[data-z="out"]').title = t("zout"); box.querySelector('[data-z="fit"]').title = t("fit");
      box.querySelectorAll("button").forEach(function(b){ b.setAttribute("aria-label", b.title); }); }
    titel(); return titel;
  }

  return { padd: padd, pmul: pmul, pneg: pneg, hornerDiv: hornerDiv, wurzelZerlegen: wurzelZerlegen, B: B, Bz: Bz, btxt: btxt, zahl: zahl, t: t, setLang: setLang, getLang: getLang, parse: parse, ptxt: ptxt, grad: grad, ableitung: ableitung,
           wertB: wertB, wertN: wertN, nullstellen: nullstellen, analyse: analyse, xtxt: xtxt, xtxtKurz: xtxtKurz, ytxt: ytxt, ywert: ywert,
           punkt: punkt, intervall: intervall, R: R, INF: INF, MINUS: MINUS, Graph: Graph, knoepfe: knoepfe, trim: trim, kommaSprache: kommaSprache };
})();
