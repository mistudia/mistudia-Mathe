// Erklär-Blasen für die Trigonometrie-Kachel (9 Sprachen) – nutzt MS_TIPP.auto aus /symbol-tipp.js.
(function(){
  "use strict";
  var TX = {
  de: { sin: "sin α (Sinus): im Einheitskreis die y-Koordinate von P; im rechtwinkligen Dreieck Gegenkathete : Hypotenuse.", cos: "cos α (Kosinus): im Einheitskreis die x-Koordinate von P; im rechtwinkligen Dreieck Ankathete : Hypotenuse.", tan: "tan α (Tangens) = sin α : cos α; im rechtwinkligen Dreieck Gegenkathete : Ankathete.",
    alpha: "α = der Winkel bei A (im Einheitskreis: Winkel zwischen x-Achse und dem Radius zu P).", beta: "β = der andere spitze Winkel (bei B). Im rechtwinkligen Dreieck gilt α + β = 90°.",
    a: "a = Gegenkathete von α: die Seite, die α gegenüberliegt.", b: "b = Ankathete von α: die Seite, die an α anliegt (nicht die Hypotenuse).", c: "c = Hypotenuse: liegt dem rechten Winkel gegenüber, die längste Seite.",
    inv: "sin⁻¹, cos⁻¹, tan⁻¹ (arcsin, arccos, arctan): rechnen rückwärts – aus dem Wert den Winkel. Taschenrechner: SHIFT + sin/cos/tan.", pyth: "Trigonometrischer Pythagoras: sin²α + cos²α = 1 – weil P auf dem Kreis mit Radius 1 liegt." },
  en: { sin: "sin α (sine): in the unit circle the y-coordinate of P; in a right triangle opposite : hypotenuse.", cos: "cos α (cosine): in the unit circle the x-coordinate of P; in a right triangle adjacent : hypotenuse.", tan: "tan α (tangent) = sin α : cos α; in a right triangle opposite : adjacent.",
    alpha: "α = the angle at A (in the unit circle: angle between the x-axis and the radius to P).", beta: "β = the other acute angle (at B). In a right triangle α + β = 90°.",
    a: "a = opposite side of α: the side facing α.", b: "b = adjacent side of α: the side next to α (not the hypotenuse).", c: "c = hypotenuse: opposite the right angle, the longest side.",
    inv: "sin⁻¹, cos⁻¹, tan⁻¹ (arcsin, arccos, arctan) work backwards – from the value to the angle. Calculator: SHIFT + sin/cos/tan.", pyth: "Pythagorean identity: sin²α + cos²α = 1 – because P lies on the circle with radius 1." },
  es: { sin: "sen α (seno): en la circunferencia unidad, la coordenada y de P; en el triángulo rectángulo, cateto opuesto : hipotenusa.", cos: "cos α (coseno): en la circunferencia unidad, la coordenada x de P; en el triángulo rectángulo, cateto contiguo : hipotenusa.", tan: "tan α (tangente) = sen α : cos α; en el triángulo rectángulo, cateto opuesto : cateto contiguo.",
    alpha: "α = el ángulo en A (en la circunferencia unidad: ángulo entre el eje x y el radio hasta P).", beta: "β = el otro ángulo agudo (en B). En el triángulo rectángulo α + β = 90°.",
    a: "a = cateto opuesto a α: el lado que está enfrente de α.", b: "b = cateto contiguo a α: el lado que forma parte de α (no la hipotenusa).", c: "c = hipotenusa: enfrente del ángulo recto, el lado más largo.",
    inv: "sen⁻¹, cos⁻¹, tan⁻¹ (arcoseno, arcocoseno, arcotangente): calculan al revés, del valor al ángulo. Calculadora: SHIFT + sin/cos/tan.", pyth: "Identidad fundamental: sen²α + cos²α = 1, porque P está en la circunferencia de radio 1." },
  zh: { sin: "sin α（正弦）：在单位圆中是 P 的纵坐标；在直角三角形中是 对边 : 斜边。", cos: "cos α（余弦）：在单位圆中是 P 的横坐标；在直角三角形中是 邻边 : 斜边。", tan: "tan α（正切）= sin α : cos α；在直角三角形中是 对边 : 邻边。",
    alpha: "α = A 处的角（单位圆中：x 轴与到 P 的半径之间的角）。", beta: "β = 另一个锐角（在 B 处）。直角三角形中 α + β = 90°。",
    a: "a = α 的对边：与 α 相对的边。", b: "b = α 的邻边：挨着 α 的边（不是斜边）。", c: "c = 斜边：直角所对的边，最长。",
    inv: "sin⁻¹、cos⁻¹、tan⁻¹（反正弦、反余弦、反正切）：倒过来算——由函数值求角。计算器：SHIFT + sin/cos/tan。", pyth: "三角恒等式：sin²α + cos²α = 1——因为 P 在半径为 1 的圆上。" },
  fr: { sin: "sin α (sinus) : dans le cercle trigonométrique, l’ordonnée de P ; dans le triangle rectangle, côté opposé : hypoténuse.", cos: "cos α (cosinus) : dans le cercle trigonométrique, l’abscisse de P ; dans le triangle rectangle, côté adjacent : hypoténuse.", tan: "tan α (tangente) = sin α : cos α ; dans le triangle rectangle, côté opposé : côté adjacent.",
    alpha: "α = l’angle en A (dans le cercle : angle entre l’axe des x et le rayon vers P).", beta: "β = l’autre angle aigu (en B). Dans le triangle rectangle, α + β = 90°.",
    a: "a = côté opposé à α : le côté en face de α.", b: "b = côté adjacent à α : le côté qui touche α (pas l’hypoténuse).", c: "c = hypoténuse : en face de l’angle droit, le plus long côté.",
    inv: "sin⁻¹, cos⁻¹, tan⁻¹ (arcsin, arccos, arctan) : calculent à l’envers – de la valeur à l’angle. Calculatrice : SHIFT + sin/cos/tan.", pyth: "Relation fondamentale : sin²α + cos²α = 1 – car P est sur le cercle de rayon 1." },
  ru: { sin: "sin α (синус): в единичной окружности – ордината точки P; в прямоугольном треугольнике – противолежащий катет : гипотенуза.", cos: "cos α (косинус): в единичной окружности – абсцисса точки P; в прямоугольном треугольнике – прилежащий катет : гипотенуза.", tan: "tg α (тангенс) = sin α : cos α; в прямоугольном треугольнике – противолежащий катет : прилежащий.",
    alpha: "α = угол при вершине A (в окружности: угол между осью x и радиусом к P).", beta: "β = второй острый угол (при B). В прямоугольном треугольнике α + β = 90°.",
    a: "a = противолежащий катет к α: сторона напротив α.", b: "b = прилежащий катет к α: сторона, прилегающая к α (не гипотенуза).", c: "c = гипотенуза: лежит напротив прямого угла, самая длинная сторона.",
    inv: "sin⁻¹, cos⁻¹, tg⁻¹ (arcsin, arccos, arctg) считают обратно – по значению находят угол. Калькулятор: SHIFT + sin/cos/tan.", pyth: "Основное тригонометрическое тождество: sin²α + cos²α = 1 – потому что P лежит на окружности радиуса 1." },
  ar: { sin: "sin α (الجيب): في دائرة الوحدة الإحداثي y للنقطة P؛ في المثلث القائم المقابل : الوتر.", cos: "cos α (جيب التمام): في دائرة الوحدة الإحداثي x للنقطة P؛ في المثلث القائم المجاور : الوتر.", tan: "tan α (الظل) = sin α : cos α؛ في المثلث القائم المقابل : المجاور.",
    alpha: "α = الزاوية عند A (في دائرة الوحدة: الزاوية بين محور x ونصف القطر إلى P).", beta: "β = الزاوية الحادة الأخرى (عند B). في المثلث القائم α + β = 90°.",
    a: "a = الضلع المقابل لـ α: الضلع الواقع أمام α.", b: "b = الضلع المجاور لـ α: الضلع الملاصق لـ α (ليس الوتر).", c: "c = الوتر: يقابل الزاوية القائمة، وهو أطول ضلع.",
    inv: "sin⁻¹ و cos⁻¹ و tan⁻¹ (arcsin و arccos و arctan) تحسب بالعكس – من القيمة إلى الزاوية. الآلة الحاسبة: SHIFT + sin/cos/tan.", pyth: "متطابقة فيثاغورس: sin²α + cos²α = 1 – لأن P تقع على دائرة نصف قطرها 1." },
  ja: { sin: "sin α（サイン）：単位円では点 P の y 座標。直角三角形では 対辺 : 斜辺。", cos: "cos α（コサイン）：単位円では点 P の x 座標。直角三角形では 隣辺 : 斜辺。", tan: "tan α（タンジェント）= sin α : cos α。直角三角形では 対辺 : 隣辺。",
    alpha: "α = A の角（単位円では x 軸と P への半径がつくる角）。", beta: "β = もう 1 つの鋭角（B の角）。直角三角形では α + β = 90°。",
    a: "a = α の対辺：α と向かい合う辺。", b: "b = α の隣辺：α にくっついている辺（斜辺ではない）。", c: "c = 斜辺：直角と向かい合う、いちばん長い辺。",
    inv: "sin⁻¹・cos⁻¹・tan⁻¹（arcsin・arccos・arctan）：値から角度を逆算する。電卓：SHIFT + sin/cos/tan。", pyth: "三角比の相互関係：sin²α + cos²α = 1――P が半径 1 の円の上にあるから。" },
  pt: { sin: "sen α (seno): no círculo trigonométrico, a coordenada y de P; no triângulo retângulo, cateto oposto : hipotenusa.", cos: "cos α (cosseno): no círculo trigonométrico, a coordenada x de P; no triângulo retângulo, cateto adjacente : hipotenusa.", tan: "tg α (tangente) = sen α : cos α; no triângulo retângulo, cateto oposto : cateto adjacente.",
    alpha: "α = o ângulo em A (no círculo: ângulo entre o eixo x e o raio até P).", beta: "β = o outro ângulo agudo (em B). No triângulo retângulo α + β = 90°.",
    a: "a = cateto oposto a α: o lado em frente de α.", b: "b = cateto adjacente a α: o lado junto de α (não a hipotenusa).", c: "c = hipotenusa: em frente do ângulo reto, o lado mais comprido.",
    inv: "sen⁻¹, cos⁻¹, tg⁻¹ (arco-seno, arco-cosseno, arco-tangente): calculam ao contrário – do valor para o ângulo. Calculadora: SHIFT + sin/cos/tan.", pyth: "Relação fundamental: sen²α + cos²α = 1 – porque P está no círculo de raio 1." }
  };
  if(!window.MS_TIPP) return;
  var W = "#werte, #rLauf, #pyth, #uLauf, #fSin, #fCos, #fTan";
  MS_TIPP.auto([
    { sel: "#pyth", re: /sin²α \+ cos²α/, k: "pyth" },
    { sel: W, re: /(?:sin|sen)⁻¹|cos⁻¹|(?:tan|tg)⁻¹/u, k: "inv" },
    { sel: W, re: /(?:sin|sen) α/u, k: "sin" }, { sel: W, re: /cos α/u, k: "cos" }, { sel: W, re: /(?:tan|tg) α/u, k: "tan" },
    { sel: "#werte, #eingaben", re: /(α) =/, k: "alpha" },
    { sel: "#rLauf, #eingaben", re: /(?:^|: )([a]) [=≈]/, k: "a" }, { sel: "#rLauf, #eingaben", re: /(?:^|: )([b]) [=≈]/, k: "b" }, { sel: "#rLauf, #eingaben", re: /(?:^|: )([c]) [=≈]/, k: "c" },
    { sel: "#rLauf", re: /(β) =/, k: "beta" }
  ], function(k){ var l = document.documentElement.lang; return (TX[l] && TX[l][k]) || TX.de[k]; }, "#werte, #eingaben");
})();
