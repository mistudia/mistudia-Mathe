// Erklär-Blasen für die Integral-Kachel (9 Sprachen) – nutzt MS_TIPP.auto aus /symbol-tipp.js.
(function(){
  "use strict";
  var TX = {
  de: { a: "a = untere Grenze: Ab hier wird die Fläche gemessen.", b: "b = obere Grenze: Bis hier wird die Fläche gemessen.", n: "n = Anzahl der Streifen (Rechtecke). Je mehr Streifen, desto genauer.",
    dx: "Δx = Breite eines Streifens: (b − a) : n.", F: "F(x) = Stammfunktion von f: Leitet man F ab, erhält man f, also F′(x) = f(x).", C: "C = beliebige Konstante: Beim Ableiten fällt sie weg, deshalb gibt es unendlich viele Stammfunktionen.",
    Fs: "F′(x) = Ableitung der Stammfunktion – sie muss wieder f(x) ergeben (Probe).", int: "∫ = Integralzeichen (ein langgezogenes S für „Summe“). Unten steht die untere Grenze a, oben die obere Grenze b.", d: "dx: zeigt, dass nach x integriert wird – die Streifen sind „unendlich schmal“ in x-Richtung.",
    A: "A = Flächeninhalt: immer positiv. Teile unter der x-Achse werden mit Betrag gezählt.", I: "I = Teilintegral zwischen zwei Nullstellen (bzw. Grenzen). Es kann negativ sein, wenn die Fläche unter der x-Achse liegt.", eck: "[F(x)] von a bis b bedeutet F(b) − F(a)." },
  en: { a: "a = lower limit: the area is measured from here.", b: "b = upper limit: the area is measured up to here.", n: "n = number of strips (rectangles). The more strips, the more accurate.",
    dx: "Δx = width of one strip: (b − a) : n.", F: "F(x) = antiderivative of f: if you differentiate F, you get f, i.e. F′(x) = f(x).", C: "C = any constant: it disappears when differentiating, so there are infinitely many antiderivatives.",
    Fs: "F′(x) = derivative of the antiderivative – it must give f(x) again (check).", int: "∫ = integral sign (a stretched S for “sum”). The lower limit a is at the bottom, the upper limit b at the top.", d: "dx shows that we integrate with respect to x – the strips are “infinitely thin” in x-direction.",
    A: "A = area: always positive. Parts below the x-axis are counted with their absolute value.", I: "I = partial integral between two zeros (or limits). It can be negative if the area lies below the x-axis.", eck: "[F(x)] from a to b means F(b) − F(a)." },
  es: { a: "a = límite inferior: desde aquí se mide el área.", b: "b = límite superior: hasta aquí se mide el área.", n: "n = número de franjas (rectángulos). Cuantas más franjas, más exacto.",
    dx: "Δx = anchura de una franja: (b − a) : n.", F: "F(x) = primitiva de f: al derivar F se obtiene f, es decir F′(x) = f(x).", C: "C = constante cualquiera: al derivar desaparece, por eso hay infinitas primitivas.",
    Fs: "F′(x) = derivada de la primitiva: debe dar otra vez f(x) (comprobación).", int: "∫ = signo de integral (una S alargada de «suma»). Abajo el límite inferior a, arriba el superior b.", d: "dx indica que se integra respecto de x: las franjas son «infinitamente estrechas» en dirección x.",
    A: "A = área: siempre positiva. Las partes bajo el eje x se cuentan en valor absoluto.", I: "I = integral parcial entre dos ceros (o límites). Puede ser negativa si el área está bajo el eje x.", eck: "[F(x)] de a a b significa F(b) − F(a)." },
  zh: { a: "a = 下限：从这里开始量面积。", b: "b = 上限：量到这里为止。", n: "n = 小条（矩形）的个数。越多越精确。",
    dx: "Δx = 每个小条的宽度：(b − a) : n。", F: "F(x) = f 的原函数：对 F 求导得到 f，即 F′(x) = f(x)。", C: "C = 任意常数：求导时消失，所以原函数有无穷多个。",
    Fs: "F′(x) = 原函数的导数——必须又等于 f(x)（检验）。", int: "∫ = 积分号（拉长的 S，代表“求和”）。下面是下限 a，上面是上限 b。", d: "dx 表示对 x 积分——小条在 x 方向“无限窄”。",
    A: "A = 面积：总是正的。x 轴下方的部分取绝对值。", I: "I = 两个零点（或界限）之间的部分积分。面积在 x 轴下方时它可以是负的。", eck: "[F(x)] 从 a 到 b 表示 F(b) − F(a)。" },
  fr: { a: "a = borne inférieure : l’aire est mesurée à partir d’ici.", b: "b = borne supérieure : l’aire est mesurée jusqu’ici.", n: "n = nombre de bandes (rectangles). Plus il y en a, plus c’est précis.",
    dx: "Δx = largeur d’une bande : (b − a) : n.", F: "F(x) = primitive de f : en dérivant F, on obtient f, donc F′(x) = f(x).", C: "C = constante quelconque : elle disparaît en dérivant, il y a donc une infinité de primitives.",
    Fs: "F′(x) = dérivée de la primitive – elle doit redonner f(x) (vérification).", int: "∫ = signe intégrale (un S allongé pour « somme »). En bas la borne inférieure a, en haut la borne supérieure b.", d: "dx indique que l’on intègre par rapport à x – les bandes sont « infiniment fines » dans la direction x.",
    A: "A = aire : toujours positive. Les parties sous l’axe des x comptent en valeur absolue.", I: "I = intégrale partielle entre deux zéros (ou bornes). Elle peut être négative si l’aire est sous l’axe des x.", eck: "[F(x)] de a à b signifie F(b) − F(a)." },
  ru: { a: "a = нижний предел: отсюда измеряют площадь.", b: "b = верхний предел: до сюда измеряют площадь.", n: "n = число полосок (прямоугольников). Чем больше, тем точнее.",
    dx: "Δx = ширина одной полоски: (b − a) : n.", F: "F(x) = первообразная f: если продифференцировать F, получится f, т. е. F′(x) = f(x).", C: "C = любая постоянная: при дифференцировании она исчезает, поэтому первообразных бесконечно много.",
    Fs: "F′(x) = производная первообразной – она должна снова дать f(x) (проверка).", int: "∫ = знак интеграла (вытянутая S от «сумма»). Внизу нижний предел a, вверху верхний b.", d: "dx показывает, что интегрируют по x – полоски «бесконечно узкие» по x.",
    A: "A = площадь: всегда положительна. Части под осью x берут по модулю.", I: "I = частичный интеграл между двумя нулями (или пределами). Он может быть отрицательным, если площадь под осью x.", eck: "[F(x)] от a до b означает F(b) − F(a)." },
  ar: { a: "a = الحد الأدنى: من هنا تُقاس المساحة.", b: "b = الحد الأعلى: إلى هنا تُقاس المساحة.", n: "n = عدد الشرائح (المستطيلات). كلما زاد العدد زادت الدقة.",
    dx: "Δx = عرض الشريحة الواحدة: (b − a) : n.", F: "F(x) = دالة أصلية لـ f: باشتقاق F نحصل على f، أي F′(x) = f(x).", C: "C = ثابت اختياري: يختفي عند الاشتقاق، لذلك توجد دوال أصلية لا نهائية.",
    Fs: "F′(x) = مشتقة الدالة الأصلية – يجب أن تعطي f(x) من جديد (تحقق).", int: "∫ = رمز التكامل (حرف S ممدود بمعنى «مجموع»). في الأسفل الحد الأدنى a وفي الأعلى الحد الأعلى b.", d: "dx يبين أن التكامل بالنسبة إلى x – الشرائح «رفيعة بلا حدود» في اتجاه x.",
    A: "A = المساحة: موجبة دائمًا. الأجزاء تحت محور x تُحسب بقيمتها المطلقة.", I: "I = تكامل جزئي بين صفرين (أو حدين). قد يكون سالبًا إذا كانت المساحة تحت محور x.", eck: "[F(x)] من a إلى b تعني F(b) − F(a)." },
  ja: { a: "a = 下端：ここから面積を測る。", b: "b = 上端：ここまで面積を測る。", n: "n = 細長い長方形の数。多いほど正確になる。",
    dx: "Δx = 長方形 1 本の幅：(b − a) : n。", F: "F(x) = f の原始関数：F を微分すると f になる。F′(x) = f(x)。", C: "C = 積分定数：微分すると消えるので、原始関数は無数にある。",
    Fs: "F′(x) = 原始関数の導関数――もう一度 f(x) になればよい（確かめ）。", int: "∫ = 積分記号（「和」の S をのばした形）。下が下端 a、上が上端 b。", d: "dx は x について積分することを表す――長方形の幅が「限りなく細い」。",
    A: "A = 面積：いつも正。x 軸より下の部分は絶対値で数える。", I: "I = 2 つの零点（または端）の間の部分積分。x 軸より下なら負になることもある。", eck: "a から b までの [F(x)] は F(b) − F(a) のこと。" },
  pt: { a: "a = limite inferior: a área é medida a partir daqui.", b: "b = limite superior: a área é medida até aqui.", n: "n = número de faixas (retângulos). Quanto mais faixas, mais exato.",
    dx: "Δx = largura de uma faixa: (b − a) : n.", F: "F(x) = primitiva (antiderivada) de f: derivando F obtém-se f, ou seja F′(x) = f(x).", C: "C = constante qualquer: desaparece ao derivar, por isso há infinitas primitivas.",
    Fs: "F′(x) = derivada da primitiva – tem de dar outra vez f(x) (verificação).", int: "∫ = sinal de integral (um S alongado de «soma»). Em baixo o limite inferior a, em cima o superior b.", d: "dx indica que se integra em relação a x – as faixas são «infinitamente estreitas» na direção x.",
    A: "A = área: sempre positiva. As partes abaixo do eixo x contam em valor absoluto.", I: "I = integral parcial entre dois zeros (ou limites). Pode ser negativa se a área estiver abaixo do eixo x.", eck: "[F(x)] de a a b significa F(b) − F(a)." }
  };
  if(!window.MS_TIPP) return;
  var NB = "(?<![\\p{L}\\p{N}])", NA = "(?![\\p{L}\\p{N}])";
  function W(x){ return new RegExp(NB + "(" + x + ")" + NA, "u"); }
  var R = "#sF, #sSchritte, #sBestimmt, #fSchritte, #fErg, #uLauf";
  MS_TIPP.auto([
    { sel: "#tVon", re: /(a)\s*=/, k: "a" }, { sel: "#tBis", re: /(b)\s*=/, k: "b" }, { sel: "#tStreifen", re: W("n"), k: "n" },
    { sel: "#rWerte, #rErkl", re: /Δx/, k: "dx" },
    { sel: "#sF", re: /F\(x\)/, k: "F" }, { sel: "#sF", re: /\+ (C)/, k: "C" },
    { sel: "#sSchritte, #sErkl", re: /F′\(x\)/, k: "Fs" },
    { sel: R, re: /∫/, k: "int" }, { sel: R, re: W("dx"), k: "d" },
    { sel: "#fErg", re: W("A"), k: "A" }, { sel: "#fSchritte, #fErg", re: /I[₀-₉]+/, k: "I" }
  ], function(k){ var l = document.documentElement.lang; return (TX[l] && TX[l][k]) || TX.de[k]; }, "#eingabe > .reihe:has(#tVon)");
})();
