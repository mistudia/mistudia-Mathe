// /funktionen/loesweg.js – Rechenweg für „Polynom = 0 lösen“ (9 Sprachen).
// FL.weg(p) → [{ h: Beschriftung oder "", f: Formelzeile }] – Schritte, wie man sie in der Schule aufschreibt:
//   Grad 1: umstellen · Grad 2: x ausklammern / Wurzel ziehen / Mitternachtsformel
//   Grad ≥ 3: x ausklammern, Substitution z = x², Lösung raten + Polynomdivision (Horner), sonst Näherung.
// FL.html(p, links) → fertiges HTML (Zeilen untereinander), links = linke Seite der Ausgangsgleichung, z. B. "f′(x)".
var FL = (function(){
  "use strict";
  var B = FK.B, Bz = FK.Bz, M = FK.MINUS;
  var TX = {
    de: { aus: "x ausklammern:", null_: "Ein Produkt ist 0, wenn ein Faktor 0 ist:", oder: "oder", sub: "Substitution z = x²:", rueck: "Rücksubstitution x² = z:", raten: "Eine Lösung durch Probieren finden (Teiler der Zahl ohne x):", div: "Polynomdivision durch", num: "Keine glatte Lösung – näherungsweise (Taschenrechner):", keine: "keine Lösung", neg: "Ein Quadrat ist nie negativ – keine Lösung.", dneg: "D < 0 – keine Lösung.", d0: "D = 0 – genau eine Lösung:", mnf: "Mitternachtsformel:", um: "Umstellen:", wurzel: "Wurzel ziehen:", erg: "Lösungen:" },
    en: { aus: "Factor out x:", null_: "A product is 0 if one factor is 0:", oder: "or", sub: "Substitution z = x²:", rueck: "Back-substitution x² = z:", raten: "Find one solution by trying (divisors of the constant term):", div: "Polynomial division by", num: "No exact solution – approximately (calculator):", keine: "no solution", neg: "A square is never negative – no solution.", dneg: "D < 0 – no solution.", d0: "D = 0 – exactly one solution:", mnf: "Quadratic formula:", um: "Rearrange:", wurzel: "Take the square root:", erg: "Solutions:" },
    es: { aus: "Sacar x factor común:", null_: "Un producto es 0 si un factor es 0:", oder: "o", sub: "Cambio de variable z = x²:", rueck: "Deshacer el cambio x² = z:", raten: "Buscar una solución probando (divisores del término independiente):", div: "División entre", num: "No hay solución exacta – aproximadamente (calculadora):", keine: "sin solución", neg: "Un cuadrado nunca es negativo – sin solución.", dneg: "D < 0 – sin solución.", d0: "D = 0 – exactamente una solución:", mnf: "Fórmula general:", um: "Despejar:", wurzel: "Sacar la raíz:", erg: "Soluciones:" },
    zh: { aus: "提取公因式 x：", null_: "乘积为 0，则至少一个因式为 0：", oder: "或", sub: "换元 z = x²：", rueck: "回代 x² = z：", raten: "试根（常数项的因数）：", div: "多项式除以", num: "没有精确解——近似值（计算器）：", keine: "无解", neg: "平方不可能是负数——无解。", dneg: "D < 0——无解。", d0: "D = 0——只有一个解：", mnf: "求根公式：", um: "移项：", wurzel: "开平方：", erg: "解：" },
    fr: { aus: "Mettre x en facteur :", null_: "Un produit est nul si un facteur est nul :", oder: "ou", sub: "Changement de variable z = x² :", rueck: "Retour à x : x² = z :", raten: "Trouver une solution en essayant (diviseurs du terme constant) :", div: "Division euclidienne par", num: "Pas de solution exacte – valeur approchée (calculatrice) :", keine: "pas de solution", neg: "Un carré n’est jamais négatif – pas de solution.", dneg: "Δ < 0 – pas de solution.", d0: "Δ = 0 – une seule solution :", mnf: "Formule du discriminant :", um: "Isoler x :", wurzel: "Racine carrée :", erg: "Solutions :" },
    ru: { aus: "Вынести x за скобки:", null_: "Произведение равно 0, если один из множителей равен 0:", oder: "или", sub: "Замена z = x²:", rueck: "Обратная замена x² = z:", raten: "Подобрать корень (делители свободного члена):", div: "Деление многочлена на", num: "Точного решения нет – приближённо (калькулятор):", keine: "нет решений", neg: "Квадрат не бывает отрицательным – нет решений.", dneg: "D < 0 – нет решений.", d0: "D = 0 – ровно одно решение:", mnf: "Формула корней:", um: "Выразить x:", wurzel: "Извлечь корень:", erg: "Решения:" },
    ar: { aus: "إخراج x عاملًا مشتركًا:", null_: "حاصل الضرب يساوي 0 إذا كان أحد العوامل 0:", oder: "أو", sub: "التعويض z = x²:", rueck: "الرجوع إلى x: ‏x² = z:", raten: "إيجاد حل بالتجربة (قواسم الحد الثابت):", div: "قسمة كثيرة الحدود على", num: "لا يوجد حل دقيق – تقريبًا (الآلة الحاسبة):", keine: "لا يوجد حل", neg: "المربع لا يكون سالبًا أبدًا – لا يوجد حل.", dneg: "D < 0 – لا يوجد حل.", d0: "D = 0 – حل واحد فقط:", mnf: "القانون العام:", um: "إعادة الترتيب:", wurzel: "أخذ الجذر:", erg: "الحلول:" },
    ja: { aus: "x でくくる：", null_: "かけ算が 0 なら、どれかの因数が 0：", oder: "または", sub: "z = x² とおく：", rueck: "もとにもどす x² = z：", raten: "解を 1 つ見つける（定数項の約数を試す）：", div: "多項式をわる：", num: "きれいな解がない――近似値（電卓）：", keine: "解なし", neg: "2 乗は負にならない――解なし。", dneg: "D < 0――解なし。", d0: "D = 0――解は 1 つ：", mnf: "解の公式：", um: "移項：", wurzel: "平方根をとる：", erg: "解：" },
    pt: { aus: "Pôr x em evidência:", null_: "Um produto é 0 se um fator for 0:", oder: "ou", sub: "Substituição z = x²:", rueck: "Voltar a x: x² = z:", raten: "Encontrar uma solução por tentativa (divisores do termo independente):", div: "Divisão de polinómios por", num: "Sem solução exata – aproximadamente (calculadora):", keine: "sem solução", neg: "Um quadrado nunca é negativo – sem solução.", dneg: "Δ < 0 – sem solução.", d0: "Δ = 0 – exatamente uma solução:", mnf: "Fórmula resolvente:", um: "Isolar x:", wurzel: "Tirar a raiz:", erg: "Soluções:" }
  };
  function tx(k){ var l = FK.getLang(); return (TX[l] && TX[l][k]) || TX.de[k]; }
  function bt(b){ return FK.btxt(b); }
  function kl(b){ return b.n < 0 ? "(" + bt(b) + ")" : bt(b); } // negative Zahlen in Klammern
  function quadrat(b){ // rationale Wurzel oder null
    if(b.n < 0) return null; var n = Math.round(Math.sqrt(b.n)), d = Math.round(Math.sqrt(b.d));
    return n * n === b.n && d * d === b.d ? B(n, d) : null;
  }
  function uniq(L){ var o = []; L.forEach(function(x){ if(!o.some(function(y){ return y.n === x.n && y.d === x.d; })) o.push(x); }); return o.sort(function(a, b){ return Bz.num(a) - Bz.num(b); }); }

  // löst p(v) = 0; schreibt Zeilen in Z; gibt rationale Lösungen zurück und markiert, ob es irrationale gab
  function loese(p, v, Z, info){
    p = FK.trim(p); var g = FK.grad(p), P = function(q){ return FK.ptxt(q, v); };
    if(g < 1) return [];
    if(g === 1){
      var a = p[1], b = p[0], x = Bz.div(Bz.neg(b), a);
      if(Bz.null(b)){ Z.push({ h: tx("um"), f: v + " = 0" }); return [B(0)]; }
      Z.push({ h: tx("um"), f: P([B(0), a]) + " = " + bt(Bz.neg(b)) });
      if(!(a.n === 1 && a.d === 1)) Z.push({ h: "", f: v + " = " + bt(Bz.neg(b)) + " : " + kl(a) + " = " + bt(x) });
      return [x];
    }
    // Faktor v ausklammern
    if(Bz.null(p[0])){
      var k = 0, q = p; while(Bz.null(q[0])){ q = q.slice(1); k++; }
      var vk = v + (k > 1 ? "²³⁴⁵⁶"[k - 2] : "");
      Z.push({ h: tx("aus"), f: vk + " · (" + P(q) + ") = 0" });
      Z.push({ h: tx("null_"), f: (k > 1 ? vk + " = 0 ⇒ " : "") + v + " = 0   " + tx("oder") + "   " + P(q) + " = 0" });
      return [B(0)].concat(loese(q, v, Z, info));
    }
    if(g === 2){
      var A = p[2], Bk = p[1], C = p[0];
      if(Bz.null(Bk)){ // a·x² + c = 0
        var r = Bz.div(Bz.neg(C), A);
        Z.push({ h: tx("um"), f: P([B(0), B(0), A]) + " = " + bt(Bz.neg(C)) + (A.n === 1 && A.d === 1 ? "" : "   ⇒   " + v + "² = " + bt(r)) });
        if(r.n < 0){ Z.push({ h: "", f: tx("neg") }); return []; }
        var w = quadrat(r);
        Z.push({ h: tx("wurzel"), f: v + " = ± √" + (r.d === 1 ? bt(r) : "(" + bt(r) + ")") + (w ? " = ± " + bt(w) : " ≈ ± " + FK.zahl(Math.sqrt(Bz.num(r)))) });
        if(w) return [Bz.neg(w), w];
        info.irr = true; return [];
      }
      var D = Bz.sub(Bz.mul(Bk, Bk), Bz.mul(B(4), Bz.mul(A, C)));
      var nenner = Bz.mul(B(2), A);
      if(window.MS_F){
        var wd0 = D.n >= 0 ? quadrat(D) : null, mb = Bz.neg(Bk), o = { v: v, a: bt(A), b: bt(Bk), c: bt(C), an: Bz.num(A), bn: Bz.num(Bk), cn: Bz.num(C),
          mbTxt: bt(mb), nen: kl(nenner), D: bt(D), Dn: Bz.num(D), txt: { keine: tx("dneg") } };
        if(D.n >= 0){
          if(wd0){ var e1 = Bz.div(Bz.add(mb, wd0), nenner), e2 = Bz.div(Bz.sub(mb, wd0), nenner); o.wD = bt(wd0); o.wExakt = true; o.x1 = bt(e1); o.x2 = bt(e2); o.x1Exakt = o.x2Exakt = true; }
          else { var sw = Math.sqrt(Bz.num(D)), mn = Bz.num(mb), nn = Bz.num(nenner); o.wD = FK.zahl(sw, 4); o.wExakt = false; o.x1 = FK.zahl((mn + sw) / nn); o.x2 = FK.zahl((mn - sw) / nn); }
        }
        Z.push({ h: tx("mnf"), mnf: o });
        if(D.n < 0) return [];
        if(wd0) return uniq([Bz.div(Bz.add(mb, wd0), nenner), Bz.div(Bz.sub(mb, wd0), nenner)]);
        info.irr = true; return [];
      }
      Z.push({ h: tx("mnf"), f: "a = " + bt(A) + ",  b = " + bt(Bk) + ",  c = " + bt(C) });
      Z.push({ h: "", f: "D = b² − 4ac = " + kl(Bk) + "² − 4 · " + kl(A) + " · " + kl(C) + " = " + bt(D) });
      if(D.n < 0){ Z.push({ h: "", f: tx("dneg") }); return []; }
      if(D.n === 0){ var x0 = Bz.div(Bz.neg(Bk), nenner); Z.push({ h: tx("d0"), f: v + " = −b : (2a) = " + bt(Bz.neg(Bk)) + " : " + kl(nenner) + " = " + bt(x0) }); return [x0]; }
      var wd = quadrat(D);
      var kopf = v + "₁,₂ = (−b ± √D) : (2a) = (" + bt(Bz.neg(Bk)) + " ± √" + bt(D) + ") : " + kl(nenner);
      if(wd){
        var x1 = Bz.div(Bz.sub(Bz.neg(Bk), wd), nenner), x2 = Bz.div(Bz.add(Bz.neg(Bk), wd), nenner);
        Z.push({ h: "", f: kopf + " = (" + bt(Bz.neg(Bk)) + " ± " + bt(wd) + ") : " + kl(nenner) });
        Z.push({ h: "", f: v + "₁ = " + bt(x1) + ",   " + v + "₂ = " + bt(x2) });
        return [x1, x2];
      }
      var ex = FK.nullstellen(p).map(function(z){ return z.ex != null ? z.ex : "≈ " + FK.zahl(z.x); });
      Z.push({ h: "", f: kopf });
      Z.push({ h: "", f: v + "₁ = " + ex[0] + ",   " + v + "₂ = " + ex[1] });
      info.irr = true; return [];
    }
    // Grad 4 mit nur geraden Potenzen: Substitution
    if(g === 4 && Bz.null(p[1]) && Bz.null(p[3]) && v === "x"){
      var pz = [p[0], p[2], p[4]];
      Z.push({ h: tx("sub"), f: FK.ptxt(pz, "z") + " = 0" });
      var zs = loese(pz, "z", Z, info), xs = [];
      if(zs.length) Z.push({ h: tx("rueck"), f: zs.map(function(z){
        if(z.n < 0) return "x² = " + bt(z) + " ⇒ " + tx("keine");
        if(z.n === 0){ xs.push(B(0)); return "x² = 0 ⇒ x = 0"; }
        var w = quadrat(z); if(w){ xs.push(Bz.neg(w), w); return "x² = " + bt(z) + " ⇒ x = ± " + bt(w); }
        info.irr = true; return "x² = " + bt(z) + " ⇒ x = ± √" + bt(z);
      }).join(";   ") });
      return xs;
    }
    // rationale Lösung raten, dann Polynomdivision
    var kand = FK.nullstellen(p).filter(function(z){ return z.b; }).map(function(z){ return z.b; })
      .sort(function(u, w){ return (u.d - w.d) || (Math.abs(Bz.num(u)) - Math.abs(Bz.num(w))); });
    if(kand.length){
      var r0 = kand[0], rest = FK.hornerDiv(p, r0), lin = r0.n < 0 ? "(" + v + " + " + bt(Bz.neg(r0)) + ")" : "(" + v + " " + M + " " + bt(r0) + ")";
      // Probe: die Summanden einzeln ausrechnen, z. B. 2 − 8 + 6 = 0
      var summ = []; for(var i = p.length - 1; i >= 0; i--){ if(Bz.null(p[i])) continue; var pot = B(1); for(var j = 0; j < i; j++) pot = Bz.mul(pot, r0); summ.push(Bz.mul(p[i], pot)); }
      var probe = summ.map(function(sv, i){ return i === 0 ? bt(sv) : (sv.n < 0 ? " " + M + " " + bt(Bz.neg(sv)) : " + " + bt(sv)); }).join("");
      Z.push({ h: tx("raten"), f: v + " = " + bt(r0) + ":   " + probe + " = 0 ✓" });
      Z.push({ h: tx("div") + " " + lin + ":", f: "(" + P(p) + ") : " + lin + " = " + P(rest) });
      return [r0].concat(loese(rest, v, Z, info));
    }
    Z.push({ h: tx("num"), f: FK.nullstellen(p).map(function(z){ return v + " ≈ " + FK.zahl(z.x); }).join(";   ") || tx("keine") });
    info.irr = true; info.numLetzte = Z.length; return [];
  }
  function weg(p, links){
    var Z = [], info = {};
    p = FK.trim(p);
    if(links !== false) Z.push({ h: "", f: (links ? links + " = " : "") + FK.ptxt(p) + " = 0" });
    var L = loese(p, "x", Z, info);
    if((FK.grad(p) >= 3 || (FK.grad(p) === 2 && Bz.null(p[0]))) && info.numLetzte !== Z.length){
      var alle = FK.nullstellen(p);
      Z.push({ h: tx("erg"), f: alle.length ? alle.map(function(z){ return z.ex != null ? "x = " + z.ex : "x ≈ " + FK.zahl(z.x); }).join(";   ") : tx("keine") });
    }
    void L;
    return Z;
  }
  function html(p, links){
    var f = window.FS ? FS.f : function(s){ return '<span class="f" dir="ltr">' + s + "</span>"; };
    return weg(p, links).map(function(z){
      var inhalt = z.mnf ? MS_F.mnf(z.mnf) : window.MS_F ? MS_F.kette(z.f) : f(z.f);
      return (z.h ? '<div class="lw-h">' + z.h + "</div>" : "") + '<div class="lw-f">' + inhalt + "</div>";
    }).join("");
  }
  var css = document.createElement("style");
  css.textContent = ".lw-h{font-size:14px;color:#4f5b6e;margin-top:6px}.lw-f{margin:2px 0}";
  document.head.appendChild(css);
  return { weg: weg, html: html, tx: tx };
})();
