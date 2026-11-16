// ============================================================
// funktionen/ergaenzung.js – Quadratische Ergänzung Schritt für Schritt
// FE.zeilen(p): Normalform a·x² + b·x + c → Scheitelpunktform a·(x − d)² + e,
//   genau mit Brüchen (FK.Bz), ein „=“ pro Zeile. p = [c, b, a] (aufsteigend).
// FE.bild(p): Flächenbild „Quadrat ergänzen“ (x² + 2q·x + q² = (x + {q})²) als SVG.
// FE.texte: eigene Texte in 9 Sprachen (FE.t).
// ============================================================
var FE = (function(){
  "use strict";
  var B = FK.B, Bz = FK.Bz, M = FK.MINUS;
  var TX = {
    de: { titel: "Quadratische Ergänzung", aus: "a ausklammern", erg: "ergänzen: (b : 2)² dazu und wieder weg", bin: "binomische Formel", mult: "ausmultiplizieren", fertig: "Scheitelpunktform", schon: "Es gibt kein x-Glied – die Funktion steht schon fast in Scheitelpunktform.", bild: "Bild: Zu x² und zwei Rechtecken fehlt nur noch das kleine Eckquadrat – dann ist es ein ganzes Quadrat (x + {q})².", ablesen: "Scheitelpunkt ablesen:", oder: "Oder mit quadratischer Ergänzung:" },
    en: { titel: "Completing the square", aus: "factor out a", erg: "complete: add (b : 2)² and take it away again", bin: "binomial formula", mult: "multiply out", fertig: "Vertex form", schon: "There is no x term – the function is already almost in vertex form.", bild: "Picture: x² and two rectangles only miss the small corner square – then it is a whole square (x + {q})².", ablesen: "Read off the vertex:", oder: "Or by completing the square:" },
    es: { titel: "Completar el cuadrado", aus: "sacar a factor común", erg: "completar: sumar (b : 2)² y volver a restarlo", bin: "producto notable", mult: "multiplicar", fertig: "Forma canónica", schon: "No hay término en x: la función ya está casi en forma canónica.", bild: "Dibujo: a x² y los dos rectángulos solo les falta el cuadradito de la esquina; con él es un cuadrado entero (x + {q})².", ablesen: "Leer el vértice:", oder: "O completando el cuadrado:" },
    zh: { titel: "配方法", aus: "提出 a", erg: "配方：加上 (b : 2)² 再减去", bin: "完全平方公式", mult: "展开", fertig: "顶点式", schon: "没有一次项——函数已经接近顶点式。", bild: "图：x² 和两个长方形只差角上的小正方形——补上就是完整的正方形 (x + {q})²。", ablesen: "读出顶点：", oder: "或者用配方法：" },
    fr: { titel: "Forme canonique (compléter le carré)", aus: "mettre a en facteur", erg: "compléter : ajouter (b : 2)² et le retirer", bin: "identité remarquable", mult: "développer", fertig: "Forme canonique", schon: "Il n’y a pas de terme en x – la fonction est presque déjà sous forme canonique.", bild: "Dessin : à x² et aux deux rectangles il ne manque que le petit carré du coin – on obtient le carré entier (x + {q})².", ablesen: "Lire le sommet :", oder: "Ou en complétant le carré :" },
    ru: { titel: "Выделение полного квадрата", aus: "вынести a за скобку", erg: "дополнить: прибавить (b : 2)² и снова вычесть", bin: "формула сокращённого умножения", mult: "раскрыть скобки", fertig: "Вид через вершину", schon: "Слагаемого с x нет – функция уже почти в виде через вершину.", bild: "Рисунок: к x² и двум прямоугольникам не хватает только маленького углового квадрата – тогда получается целый квадрат (x + {q})².", ablesen: "Вершина:", oder: "Или выделением полного квадрата:" },
    ar: { titel: "إكمال المربع", aus: "إخراج a عاملًا مشتركًا", erg: "الإكمال: نضيف (b : 2)² ثم نطرحه", bin: "متطابقة مربع المجموع", mult: "فك الأقواس", fertig: "صيغة الرأس", schon: "لا يوجد حد في x – الدالة تقريبًا في صيغة الرأس.", bild: "الرسم: ينقص x² والمستطيلين مربعُ الزاوية الصغير فقط – بإضافته يصبح مربعًا كاملًا (x + {q})².", ablesen: "قراءة الرأس:", oder: "أو بإكمال المربع:" },
    ja: { titel: "平方完成", aus: "a でくくる", erg: "平方完成：(b : 2)² をたしてひく", bin: "乗法公式", mult: "かっこをはずす", fertig: "頂点の形", schon: "x の項がないので、すでにほぼ頂点の形です。", bild: "図：x² と 2 つの長方形に、角の小さな正方形をたすと、大きな正方形 (x + {q})² になる。", ablesen: "頂点を読む：", oder: "平方完成でも求められる：" },
    pt: { titel: "Completar quadrados", aus: "colocar a em evidência", erg: "completar: somar (b : 2)² e subtrair de novo", bin: "produto notável", mult: "multiplicar", fertig: "Forma canônica", schon: "Não há termo em x – a função já está quase na forma canônica.", bild: "Desenho: a x² e aos dois retângulos só falta o quadradinho do canto – então é um quadrado inteiro (x + {q})².", ablesen: "Ler o vértice:", oder: "Ou completando quadrados:" }
  };
  function lang(){ try { return FK.getLang(); } catch(e){ return "de"; } }
  function t(k){ var l = lang(), T = TX[l] || TX.de; return T[k] || TX.de[k]; }
  function bt(b){ return FK.btxt(b); }
  function kl(b){ var s = bt(b); return b.n < 0 || s.indexOf("/") >= 0 ? "(" + s + ")" : s; }
  function plus(b){ return Bz.null(b) ? "" : (b.n < 0 ? " " + M + " " + bt(Bz.neg(b)) : " + " + bt(b)); }
  function faktor(a){ var s = bt(a); return s === "1" ? "" : s === M + "1" ? M : (s.indexOf("/") >= 0 ? "(" + s + ")" : s) + "·"; }
  function xq(q){ return Bz.null(q) ? "x" : "(x" + plus(q) + ")"; } // (x + q)
  // Zeilen: [{ f: "f(x) = …", w: "Erklärung" }]
  function zeilen(p){
    p = FK.trim(p); var a = p[2], b = p[1] || B(0), c = p[0] || B(0), L = [];
    var pp = Bz.div(b, a), q = Bz.div(pp, B(2)), q2 = Bz.mul(q, q), e = Bz.sub(c, Bz.mul(a, q2)), eins = bt(a) === "1";
    var A = faktor(a), inner = FK.ptxt([B(0), pp, B(1)]);
    L.push({ f: "f(x) = " + FK.ptxt(p) });
    if(Bz.null(b)){ L.push({ w: t("schon") }); L.push({ f: "f(x) = " + A + "x²" + plus(c), w: t("fertig") }); return { L: L, d: B(0), e: c }; }
    if(!eins) L.push({ f: "f(x) = " + A + "(" + inner + ")" + plus(c), w: t("aus") });
    L.push({ f: "f(x) = " + A + "(" + inner + " + " + kl(q) + "² " + M + " " + kl(q) + "²)" + plus(c), w: t("erg") });
    L.push({ f: "f(x) = " + A + "(" + xq(q) + "² " + M + " " + kl(q2) + ")" + plus(c), w: t("bin") });
    L.push({ f: "f(x) = " + A + xq(q) + "²" + plus(Bz.neg(Bz.mul(a, q2))) + plus(c), w: t("mult") });
    L.push({ f: "f(x) = " + A + xq(q) + "²" + plus(e), w: t("fertig") });
    return { L: L, d: Bz.neg(q), e: e };
  }
  // Flächenbild für x² + 2q·x (q > 0): Quadrat x·x, zwei Rechtecke q·x, Eckquadrat q² gestrichelt
  function bild(p){
    p = FK.trim(p); var q = Bz.div(Bz.div(p[1] || B(0), p[2]), B(2)), qn = Math.abs(Bz.num(q)); if(qn === 0) return "";
    var qs = bt(B(Math.abs(q.n), q.d)), X = 120, Q = Math.max(26, Math.min(70, X * qn / 4)), x0 = 30, y0 = 18;
    function r(x, y, w, h, f, s, extra){ return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + f + '" stroke="' + s + '" stroke-width="2"' + (extra || "") + "/>"; }
    function tx(x, y, s, col){ return '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-weight="700" font-size="16" fill="' + (col || "#1a2233") + '" style="font-family:system-ui,sans-serif">' + s + "</text>"; }
    var s = '<svg viewBox="0 0 ' + (x0 + X + Q + 20) + " " + (y0 + X + Q + 30) + '" style="width:100%;max-width:280px;display:block;margin:6px auto" role="img" aria-hidden="true" dir="ltr">';
    s += r(x0, y0, X, X, "#bfdbfe", "#1d4ed8") + r(x0 + X, y0, Q, X, "#fde68a", "#b45309") + r(x0, y0 + X, X, Q, "#fde68a", "#b45309") + r(x0 + X, y0 + X, Q, Q, "#bbf7d0", "#15803d", ' stroke-dasharray="6 4"');
    s += tx(x0 + X / 2, y0 + X / 2 + 6, "x²", "#1d4ed8") + tx(x0 + X + Q / 2, y0 + X / 2 + 6, qs + "x", "#92400e") + tx(x0 + X / 2, y0 + X + Q / 2 + 6, qs + "x", "#92400e") + tx(x0 + X + Q / 2, y0 + X + Q / 2 + 6, qs + "²", "#15803d");
    s += tx(x0 + X / 2, y0 + X + Q + 22, "x") + tx(x0 + X + Q / 2, y0 + X + Q + 22, qs) + tx(14, y0 + X / 2 + 6, "x") + tx(14, y0 + X + Q / 2 + 6, qs);
    return s + "</svg>";
  }
  // HTML (Karte im Untersuchen-Bereich und Lösungsweg im Üben)
  function html(p, mitBild){
    var Z = zeilen(p), f = window.FS ? FS.f : function(s){ return '<span dir="ltr">' + s + "</span>"; }, h = "";
    Z.L.forEach(function(z){ h += '<div class="lw-f">' + (z.f ? f(z.f) : "") + (z.w ? ' <span class="klein-text">(' + z.w + ")</span>" : "") + "</div>"; });
    h += '<div class="lw-f"><b>' + t("ablesen") + " " + f("S(" + bt(Z.d) + " | " + bt(Z.e) + ")") + "</b></div>";
    if(mitBild && Bz.num(Bz.div(p[1] || B(0), p[2])) > 0) h += bild(p) + '<div class="klein-text">' + t("bild").split("{q}").join(bt(Bz.div(Bz.div(p[1], p[2]), B(2)))) + "</div>";
    return h;
  }
  return { zeilen: zeilen, bild: bild, html: html, t: t };
})();
