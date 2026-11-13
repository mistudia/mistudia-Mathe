// ============================================================
// funktionen/rational.js – gebrochen-rationale Funktionen f = Z/N
// Parser (Brüche von Polynomen), Kürzen (ggT), Definitionslücken
// (Polstellen mit/ohne Vorzeichenwechsel, hebbare Lücken), Asymptoten
// (senkrecht, waagerecht, schräg, Näherungskurve), Ableitungen,
// Extrema, Wendepunkte, Monotonie, Krümmung. Baut auf FK (kern.js) auf.
// ============================================================
var FR = (function(){
  "use strict";
  var B = FK.B, Bz = FK.Bz, trim = FK.trim, grad = FK.grad, padd = FK.padd, pmul = FK.pmul, pneg = FK.pneg;
  function konst(c){ return [c]; }
  function istNull(p){ return grad(p) < 0; }
  function pskal(p, c){ return trim(p.map(function(k){ return Bz.mul(k, c); })); }
  // exakte Polynomdivision a / b → { q, r }
  function pdiv(a, b){
    a = trim(a); b = trim(b);
    var db = grad(b); if(db < 0) throw { code: "div0" };
    var r = a.slice(), q = [];
    for(var i = 0; i <= Math.max(0, grad(a) - db); i++) q.push(B(0));
    while(grad(r) >= db && grad(r) >= 0){
      var dr = grad(r), c = Bz.div(r[dr], b[db]), s = dr - db;
      q[s] = Bz.add(q[s], c);
      for(var k = 0; k <= db; k++) r[s + k] = Bz.sub(r[s + k], Bz.mul(c, b[k]));
      r = trim(r);
      if(dr === 0) break;
    }
    return { q: trim(q), r: trim(r) };
  }
  function monisch(p){ p = trim(p); var g = grad(p); return g < 0 ? p : pskal(p, Bz.div(B(1), p[g])); }
  function pggT(a, b){
    a = trim(a); b = trim(b);
    while(!istNull(b)){ var r = pdiv(a, b).r; a = b; b = r; }
    return monisch(a);
  }
  function spiegel(p){ return trim(p.map(function(c, i){ return i % 2 ? Bz.neg(c) : c; })); } // p(−x)
  function gleich(p, q){ p = trim(p); q = trim(q); if(p.length !== q.length) return false; for(var i = 0; i < p.length; i++) if(p[i].n !== q[i].n || p[i].d !== q[i].d) return false; return true; }

  // ---------- Parser: Werte sind { z, n } ----------
  function parse(text){
    var s = String(text || "").trim();
    s = s.replace(/^\s*(f\s*\(\s*x\s*\)|y)\s*=\s*/i, "");
    s = s.replace(/[−–—]/g, "-").replace(/[·⋅×∙]/g, "*").replace(/[÷:]/g, "/").replace(/²/g, "^2").replace(/³/g, "^3").replace(/⁴/g, "^4").replace(/X/g, "x").replace(/\s+/g, "");
    if(!s) throw { code: "errParse" };
    var tok = [], m, re = /(\d+(?:[.,]\d+)?)|([x+\-*\/^()])/g, pos = 0;
    while((m = re.exec(s))){ if(m.index !== pos) throw { code: "errParse" }; pos = re.lastIndex; tok.push(m[1] ? { n: m[1] } : { o: m[2] }); }
    if(pos !== s.length) throw { code: "errParse" };
    var i = 0;
    function istOp(o){ return tok[i] && tok[i].o === o; }
    function add(a, b){ return { z: padd(pmul(a.z, b.n), pmul(b.z, a.n)), n: pmul(a.n, b.n) }; }
    function mul(a, b){ return { z: pmul(a.z, b.z), n: pmul(a.n, b.n) }; }
    function neg(a){ return { z: pneg(a.z), n: a.n }; }
    function kehr(a){ if(istNull(a.z)) throw { code: "div0" }; return { z: a.n, n: a.z }; }
    function expr(){ var r = term(); while(istOp("+") || istOp("-")){ var o = tok[i++].o, q = term(); r = add(r, o === "+" ? q : neg(q)); } return r; }
    function term(){
      var r = faktor();
      for(;;){
        if(istOp("*")){ i++; r = mul(r, faktor()); }
        else if(istOp("/")){ i++; r = mul(r, kehr(faktor())); }
        else if(tok[i] && (tok[i].n || tok[i].o === "x" || tok[i].o === "(")) r = mul(r, faktor());
        else return r;
      }
    }
    function faktor(){
      if(istOp("-")){ i++; return neg(faktor()); }
      if(istOp("+")){ i++; return faktor(); }
      var b = atom();
      if(istOp("^")){
        i++; var e = faktor();
        if(grad(e.n) !== 0 || grad(e.z) > 0) throw { code: "errExp" };
        var ex = Bz.div(e.z[0] || B(0), e.n[0]);
        if(ex.d !== 1 || Math.abs(ex.n) > 10) throw { code: "errExp" };
        var r = { z: [B(1)], n: [B(1)] }; for(var k = 0; k < Math.abs(ex.n); k++) r = mul(r, b);
        return ex.n < 0 ? kehr(r) : r;
      }
      return b;
    }
    function atom(){
      var tk = tok[i++]; if(!tk) throw { code: "errParse" };
      if(tk.n) return { z: FK.parse(tk.n), n: [B(1)] };
      if(tk.o === "x") return { z: [B(0), B(1)], n: [B(1)] };
      if(tk.o === "("){ var r = expr(); if(!istOp(")")) throw { code: "errParse" }; i++; return r; }
      throw { code: "errParse" };
    }
    var w = expr(); if(i !== tok.length) throw { code: "errParse" };
    // Nenner normieren (Leitkoeffizient 1), Konstanten aus dem Nenner ziehen
    var ln = w.n[grad(w.n)], f = Bz.div(B(1), ln);
    return { z: pskal(w.z, f), n: pskal(w.n, f) };
  }

  // ---------- Untersuchung ----------
  function wert(z, n, x){ return FK.wertN(z, x) / FK.wertN(n, x); }
  function wertExakt(z, n, b){ var nn = FK.wertB(n, b); return Bz.null(nn) ? null : Bz.div(FK.wertB(z, b), nn); }
  function yVon(Zr, Nr, s){
    if(s.b){ var e = wertExakt(Zr, Nr, s.b); if(e) return { v: Bz.num(e), ex: FK.btxt(e) }; }
    return { v: wert(Zr, Nr, s.x), ex: null };
  }
  function analyse(fz, fn){
    var res = { z: fz, n: fn };
    var g = pggT(fz, fn);
    var Zr = pdiv(fz, g).q, Nr = pdiv(fn, g).q;
    var ln = Nr[grad(Nr)], k = Bz.div(B(1), ln); Zr = pskal(Zr, k); Nr = pskal(Nr, k);
    res.Zr = Zr; res.Nr = Nr; res.gekuerzt = grad(g) > 0;
    var luecken = FK.nullstellen(fn), pole = FK.nullstellen(Nr);
    var nah = function(a, b){ return Math.abs(a - b) < 1e-9 * Math.max(1, Math.abs(a)); };
    res.luecken = luecken;
    res.pole = pole.map(function(p){
      var h = 1e-6 * Math.max(1, Math.abs(p.x)), l = wert(Zr, Nr, p.x - h), r = wert(Zr, Nr, p.x + h);
      return { z: p, vzw: p.m % 2 === 1, links: Math.sign(l), rechts: Math.sign(r) };
    });
    res.hebbar = luecken.filter(function(l){ return !pole.some(function(p){ return nah(p.x, l.x); }); }).map(function(l){ return { z: l, y: yVon(Zr, Nr, l) }; });
    var inD = function(x){ return !luecken.some(function(l){ return nah(l.x, x); }); };
    res.inD = inD;
    res.nst = FK.nullstellen(Zr).filter(function(s){ return inD(s.x); });
    res.y0 = inD(0) ? yVon(Zr, Nr, { x: 0, b: B(0) }) : null;
    // Symmetrie (Definitionsbereich muss auch symmetrisch sein)
    var dSym = luecken.every(function(l){ return luecken.some(function(m){ return nah(m.x, -l.x); }); });
    var lhs = pmul(spiegel(Zr), Nr), rhs = pmul(Zr, spiegel(Nr));
    res.sym = !dSym ? "N" : gleich(lhs, rhs) ? "Y" : gleich(lhs, pneg(rhs)) ? "O" : "N";
    // Asymptoten über Polynomdivision
    var dz = grad(Zr), dn = grad(Nr), dv = pdiv(Zr, Nr);
    res.div = dv; res.dz = dz; res.dn = dn;
    if(dn === 0) res.asym = { art: "P", q: dv.q }; else
    res.asym = dz < 0 ? { art: "W", q: [B(0)] } : dz < dn ? { art: "W", q: [B(0)] } : dz === dn ? { art: "W", q: dv.q } : dz === dn + 1 ? { art: "S", q: dv.q } : { art: "K", q: dv.q };
    // Unendlich
    if(dz <= dn) res.unendl = null;
    else { var lq = Bz.num(dv.q[grad(dv.q)]), gq = grad(dv.q); res.unendl = { plus: Math.sign(lq), minus: Math.sign(lq) * (gq % 2 ? -1 : 1) }; }
    // Ableitungen: f′ = P/Nr², f″ = Q/Nr³
    var P = padd(pmul(FK.ableitung(Zr), Nr), pneg(pmul(Zr, FK.ableitung(Nr))));
    var Q = padd(pmul(FK.ableitung(P), Nr), pneg(pskal(pmul(P, FK.ableitung(Nr)), B(2))));
    res.P = P; res.Q = Q;
    var f1 = function(x){ return FK.wertN(P, x) / Math.pow(FK.wertN(Nr, x), 2); };
    var f2 = function(x){ return FK.wertN(Q, x) / Math.pow(FK.wertN(Nr, x), 3); };
    res.f1 = f1; res.f2 = f2;
    var kp = grad(P) > 0 ? FK.nullstellen(P).filter(function(s){ return inD(s.x); }) : [];
    res.ext = []; res.sattel = [];
    kp.forEach(function(s){
      var y = yVon(Zr, Nr, s), h = 1e-5 * Math.max(1, Math.abs(s.x));
      if(s.m % 2 === 1) res.ext.push({ z: s, y: y, art: f1(s.x - h) > 0 ? "H" : "T", f2: f2(s.x), f2ex: s.b ? (function(){ var nn = FK.wertB(Nr, s.b); return FK.btxt(Bz.div(FK.wertB(Q, s.b), Bz.mul(nn, Bz.mul(nn, nn)))); })() : null });
      else res.sattel.push({ z: s, y: y });
    });
    var kq = grad(Q) > 0 ? FK.nullstellen(Q).filter(function(s){ return inD(s.x) && s.m % 2 === 1; }) : [];
    res.wp = kq.map(function(s){ var y = yVon(Zr, Nr, s); return { z: s, y: y, sattel: Math.abs(f1(s.x)) < 1e-9 }; });
    // Abschnitte (Monotonie, Krümmung) – Lücken trennen den Definitionsbereich
    function abschnitte(fn, stellen){
      var pkte = stellen.map(function(s){ return { z: s, luecke: false }; }).concat(luecken.map(function(l){ return { z: l, luecke: true }; }));
      pkte.sort(function(a, b){ return a.z.x - b.z.x; });
      var uniq = []; pkte.forEach(function(p){ var last = uniq[uniq.length - 1]; if(last && nah(last.z.x, p.z.x)){ last.luecke = last.luecke || p.luecke; } else uniq.push(p); });
      var out = [], gr = [null].concat(uniq, [null]);
      for(var i2 = 0; i2 < gr.length - 1; i2++){
        var lo = gr[i2], hi = gr[i2 + 1];
        var mx = !lo && !hi ? 0 : !lo ? hi.z.x - 1 : !hi ? lo.z.x + 1 : (lo.z.x + hi.z.x) / 2;
        var sg = Math.sign(fn(mx)), prev = out[out.length - 1];
        if(prev && prev.s === sg && lo && !lo.luecke) prev.r = hi;
        else out.push({ l: lo, r: hi, s: sg });
      }
      return out;
    }
    res.mon = abschnitte(f1, kp);
    res.kr = abschnitte(f2, kq);
    return res;
  }
  return { parse: parse, analyse: analyse, pdiv: pdiv, wert: wert };
})();
