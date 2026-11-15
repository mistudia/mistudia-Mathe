// Erklär-Blasen für die Logarithmus-Kachel (9 Sprachen) – nutzt MS_TIPP.auto aus /symbol-tipp.js.
(function(){
  "use strict";
  var TX = {
  de: { log: "log_b(x) = Logarithmus von x zur Basis b: der Exponent, mit dem man b potenzieren muss, um x zu erhalten. Beispiel: log₂(8) = 3, weil 2³ = 8.", lg: "lg = Logarithmus zur Basis 10 (Zehnerlogarithmus). lg(1000) = 3, weil 10³ = 1000.", ln: "ln = natürlicher Logarithmus, Basis e ≈ 2,718. ln(e) = 1.",
    b: "b = Basis: die Zahl, die potenziert wird. Sie muss positiv und ≠ 1 sein.", x: "x = die Zahl, deren Logarithmus gesucht ist (der Wert der Potenz). Sie muss positiv sein.",
    u: "u = eine positive Zahl – hier deine Zahl x.", v: "v = eine zweite positive Zahl – hier 2.", r: "r = Exponent (beliebige Zahl) – hier 3.",
    pa: "a = Streckfaktor: macht den Graphen steiler oder flacher; a < 0 spiegelt ihn an der x-Achse.", pb: "b = Basis des Logarithmus: b > 1 und a > 0 → steigend, 0 < b < 1 → fallend.", pc: "c = Verschiebung nach rechts (bei negativem c nach links). Die senkrechte Asymptote liegt bei x = c.", pd: "d = Verschiebung nach oben (bei negativem d nach unten). Der Punkt (c + 1 | d) liegt immer auf dem Graphen." },
  en: { log: "log_b(x) = logarithm of x to base b: the exponent you have to raise b to in order to get x. Example: log₂(8) = 3 because 2³ = 8.", lg: "lg = logarithm to base 10 (common logarithm). lg(1000) = 3 because 10³ = 1000.", ln: "ln = natural logarithm, base e ≈ 2.718. ln(e) = 1.",
    b: "b = base: the number that is raised to a power. It must be positive and ≠ 1.", x: "x = the number whose logarithm you want (the value of the power). It must be positive.",
    u: "u = a positive number – here your number x.", v: "v = a second positive number – here 2.", r: "r = exponent (any number) – here 3.",
    pa: "a = stretch factor: makes the graph steeper or flatter; a < 0 reflects it in the x-axis.", pb: "b = base of the logarithm: b > 1 and a > 0 → increasing, 0 < b < 1 → decreasing.", pc: "c = shift to the right (left if c is negative). The vertical asymptote is at x = c.", pd: "d = shift up (down if d is negative). The point (c + 1 | d) always lies on the graph." },
  es: { log: "log_b(x) = logaritmo de x en base b: el exponente al que hay que elevar b para obtener x. Ejemplo: log₂(8) = 3, porque 2³ = 8.", lg: "lg = logaritmo en base 10 (decimal). lg(1000) = 3, porque 10³ = 1000.", ln: "ln = logaritmo neperiano (natural), base e ≈ 2,718. ln(e) = 1.",
    b: "b = base: el número que se eleva. Debe ser positivo y ≠ 1.", x: "x = el número cuyo logaritmo se busca (el valor de la potencia). Debe ser positivo.",
    u: "u = un número positivo; aquí tu número x.", v: "v = otro número positivo; aquí 2.", r: "r = exponente (cualquier número); aquí 3.",
    pa: "a = factor de dilatación: hace el gráfico más empinado o más plano; a < 0 lo refleja en el eje x.", pb: "b = base del logaritmo: b > 1 y a > 0 → creciente, 0 < b < 1 → decreciente.", pc: "c = desplazamiento a la derecha (izquierda si c es negativo). La asíntota vertical está en x = c.", pd: "d = desplazamiento hacia arriba (abajo si d es negativo). El punto (c + 1 | d) siempre está en el gráfico." },
  zh: { log: "log_b(x) = 以 b 为底 x 的对数：b 要乘方多少次才能得到 x。例：log₂(8) = 3，因为 2³ = 8。", lg: "lg = 以 10 为底的对数（常用对数）。lg(1000) = 3，因为 10³ = 1000。", ln: "ln = 自然对数，底数 e ≈ 2.718。ln(e) = 1。",
    b: "b = 底数：被乘方的数。必须是正数且 ≠ 1。", x: "x = 要求对数的数（幂的值）。必须是正数。",
    u: "u = 一个正数——这里就是你的 x。", v: "v = 另一个正数——这里是 2。", r: "r = 指数（任意数）——这里是 3。",
    pa: "a = 伸缩系数：使图像更陡或更平；a < 0 时关于 x 轴翻转。", pb: "b = 对数的底：b > 1 且 a > 0 时递增，0 < b < 1 时递减。", pc: "c = 向右平移（c 为负则向左）。竖直渐近线是 x = c。", pd: "d = 向上平移（d 为负则向下）。点 (c + 1 | d) 总在图像上。" },
  fr: { log: "log_b(x) = logarithme de x en base b : l’exposant auquel il faut élever b pour obtenir x. Exemple : log₂(8) = 3, car 2³ = 8.", lg: "lg = logarithme décimal (base 10). lg(1000) = 3, car 10³ = 1000.", ln: "ln = logarithme népérien, base e ≈ 2,718. ln(e) = 1.",
    b: "b = base : le nombre que l’on élève à une puissance. Il doit être positif et ≠ 1.", x: "x = le nombre dont on cherche le logarithme (la valeur de la puissance). Il doit être positif.",
    u: "u = un nombre positif – ici ton nombre x.", v: "v = un deuxième nombre positif – ici 2.", r: "r = exposant (n’importe quel nombre) – ici 3.",
    pa: "a = coefficient d’étirement : rend la courbe plus raide ou plus plate ; a < 0 la retourne par rapport à l’axe des x.", pb: "b = base du logarithme : b > 1 et a > 0 → croissante, 0 < b < 1 → décroissante.", pc: "c = translation vers la droite (vers la gauche si c < 0). L’asymptote verticale est x = c.", pd: "d = translation vers le haut (vers le bas si d < 0). Le point (c + 1 | d) est toujours sur la courbe." },
  ru: { log: "log_b(x) = логарифм x по основанию b: показатель степени, в которую нужно возвести b, чтобы получить x. Пример: log₂(8) = 3, так как 2³ = 8.", lg: "lg = десятичный логарифм (основание 10). lg(1000) = 3, так как 10³ = 1000.", ln: "ln = натуральный логарифм, основание e ≈ 2,718. ln(e) = 1.",
    b: "b = основание: число, которое возводят в степень. Оно должно быть положительным и ≠ 1.", x: "x = число, логарифм которого ищут (значение степени). Оно должно быть положительным.",
    u: "u = положительное число – здесь твоё x.", v: "v = второе положительное число – здесь 2.", r: "r = показатель (любое число) – здесь 3.",
    pa: "a = коэффициент растяжения: делает график круче или положе; при a < 0 отражает его относительно оси x.", pb: "b = основание логарифма: b > 1 и a > 0 → возрастает, 0 < b < 1 → убывает.", pc: "c = сдвиг вправо (влево, если c < 0). Вертикальная асимптота: x = c.", pd: "d = сдвиг вверх (вниз, если d < 0). Точка (c + 1 | d) всегда лежит на графике." },
  ar: { log: "log_b(x) = لوغاريتم x للأساس b: الأس الذي نرفع إليه b لنحصل على x. مثال: log₂(8) = 3 لأن 2³ = 8.", lg: "lg = اللوغاريتم العشري (الأساس 10). lg(1000) = 3 لأن 10³ = 1000.", ln: "ln = اللوغاريتم الطبيعي، الأساس e ≈ 2.718. ln(e) = 1.",
    b: "b = الأساس: العدد الذي نرفعه إلى قوة. يجب أن يكون موجبًا و ≠ 1.", x: "x = العدد الذي نبحث عن لوغاريتمه (قيمة القوة). يجب أن يكون موجبًا.",
    u: "u = عدد موجب – هنا عددك x.", v: "v = عدد موجب ثانٍ – هنا 2.", r: "r = أس (أي عدد) – هنا 3.",
    pa: "a = معامل التمدد: يجعل المنحنى أشد أو أقل انحدارًا؛ إذا كان a < 0 ينعكس حول محور x.", pb: "b = أساس اللوغاريتم: b > 1 و a > 0 → متزايد، 0 < b < 1 → متناقص.", pc: "c = إزاحة إلى اليمين (إلى اليسار إذا كان c سالبًا). خط التقارب الرأسي x = c.", pd: "d = إزاحة إلى الأعلى (إلى الأسفل إذا كان d سالبًا). النقطة (c + 1 | d) تقع دائمًا على المنحنى." },
  ja: { log: "log_b(x) = b を底とする x の対数：b を何乗すると x になるか、その指数。例：2³ = 8 なので log₂(8) = 3。", lg: "lg = 10 を底とする対数（常用対数）。10³ = 1000 なので lg(1000) = 3。", ln: "ln = 自然対数、底は e ≈ 2.718。ln(e) = 1。",
    b: "b = 底：累乗するもとの数。正の数で 1 以外。", x: "x = 対数を求めたい数（累乗の値）。正の数。",
    u: "u = 正の数――ここではあなたの x。", v: "v = もう 1 つの正の数――ここでは 2。", r: "r = 指数（どんな数でもよい）――ここでは 3。",
    pa: "a = 縦の伸び：グラフを急にしたりゆるやかにしたりする。a < 0 なら x 軸について折り返す。", pb: "b = 対数の底：b > 1 かつ a > 0 なら増加、0 < b < 1 なら減少。", pc: "c = 右への平行移動（c が負なら左）。垂直な漸近線は x = c。", pd: "d = 上への平行移動（d が負なら下）。点 (c + 1 | d) はいつもグラフ上にある。" },
  pt: { log: "log_b(x) = logaritmo de x na base b: o expoente a que se eleva b para obter x. Exemplo: log₂(8) = 3, porque 2³ = 8.", lg: "lg = logaritmo decimal (base 10). lg(1000) = 3, porque 10³ = 1000.", ln: "ln = logaritmo natural, base e ≈ 2,718. ln(e) = 1.",
    b: "b = base: o número que é elevado a uma potência. Tem de ser positivo e ≠ 1.", x: "x = o número cujo logaritmo se procura (o valor da potência). Tem de ser positivo.",
    u: "u = um número positivo – aqui o teu número x.", v: "v = um segundo número positivo – aqui 2.", r: "r = expoente (qualquer número) – aqui 3.",
    pa: "a = fator de dilatação: deixa o gráfico mais íngreme ou mais plano; a < 0 reflete-o no eixo x.", pb: "b = base do logaritmo: b > 1 e a > 0 → crescente, 0 < b < 1 → decrescente.", pc: "c = deslocamento para a direita (esquerda se c < 0). A assíntota vertical é x = c.", pd: "d = deslocamento para cima (baixo se d < 0). O ponto (c + 1 | d) está sempre no gráfico." }
  };
  if(!window.MS_TIPP) return;
  var NB = "(?<![\\p{L}\\p{N}])", NA = "(?![\\p{L}\\p{N}])";
  function W(x){ return new RegExp(NB + "(" + x + ")" + NA, "u"); }
  var F = "#lFrage, #lErgebnis, #gesetze, #gWeg, #formel, #gErgebnis";
  MS_TIPP.auto([
    { sel: F, re: W("log"), k: "log" }, { sel: F + ", #lMerke", re: W("lg"), k: "lg" }, { sel: F + ", #lMerke", re: W("ln"), k: "ln" },
    { sel: "#tBasis", re: W("b"), k: "b" }, { sel: "#tZahl", re: W("x"), k: "x" },
    { sel: "#gesetze", re: W("u"), k: "u" }, { sel: "#gesetze", re: W("v"), k: "v" }, { sel: "#gesetze", re: W("r"), k: "r" },
    { sel: "#regler", re: /^(a) =/, k: "pa" }, { sel: "#regler", re: /^(b) =/, k: "pb" }, { sel: "#regler", re: /^(c) =/, k: "pc" }, { sel: "#regler", re: /^(d) =/, k: "pd" }
  ], function(k){ var l = document.documentElement.lang; return (TX[l] && TX[l][k]) || TX.de[k]; }, "#lbsp, #regler");
})();
