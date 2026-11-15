// Alltagsbeispiele für /binome/, 9 Sprachen. „Ausprobieren“ lädt eine eigene Aufgabe (MS_BINOM.laden).
MS_ALLTAG.einbauen({ nach: document.querySelector("header") || document.getElementById("titel"),
werte: [ null, null, null, { typ: "quadPlus", a: "x", b: "3" }, { typ: "quadMinus", a: "x", b: "1" }, { typ: "diff", a: "x", b: "5" } ],
laden: function(w){ window.MS_BINOM.laden(w); },
daten: {
de: [
  ["Kopfrechnen: 21²", "Wie rechnet man 21² schnell im Kopf?", "1. binomische Formel: $21² = (20 + 1)² = 20² + 2 · 20 · 1 + 1² = 400 + 40 + 1 = 441$"],
  ["Kopfrechnen: 19²", "Und 19²?", "2. binomische Formel: $19² = (20 − 1)² = 400 − 40 + 1 = 361$"],
  ["Kopfrechnen: 49 · 51", "Wie rechnet man 49 · 51 im Kopf?", "3. binomische Formel: $49 · 51 = (50 − 1)(50 + 1) = 50² − 1² = 2500 − 1 = 2499$"],
  ["Beet vergrößern", "Ein quadratisches Beet hat die Seitenlänge x m. Jede Seite wird 3 m länger. Wie groß ist die neue Fläche?", "$(x + 3)² = x² + 6x + 9$\nZur alten Fläche x² kommen zwei Streifen mit je 3x und ein kleines Quadrat mit 9 m² dazu."],
  ["Teppich zuschneiden", "Ein quadratischer Teppich hat die Seitenlänge x m. Beide Seiten werden um 1 m gekürzt. Wie groß ist er dann?", "$(x − 1)² = x² − 2x + 1$\nMan schneidet zwei Streifen x ab – dabei wird das Eckquadrat (1 m²) doppelt abgezogen, deshalb + 1."],
  ["Platz umbauen", "Ein quadratischer Platz (Seite x m) wird umgebaut: eine Seite 5 m länger, die andere 5 m kürzer. Ist er jetzt größer oder kleiner?", "$(x + 5)(x − 5) = x² − 25$\nDer Platz ist immer genau 25 m² kleiner als vorher – egal wie groß x ist."]
],
en: [
  ["Mental maths: 21²", "How can you work out 21² quickly in your head?", "1st binomial formula: $21² = (20 + 1)² = 20² + 2 · 20 · 1 + 1² = 400 + 40 + 1 = 441$"],
  ["Mental maths: 19²", "And 19²?", "2nd binomial formula: $19² = (20 − 1)² = 400 − 40 + 1 = 361$"],
  ["Mental maths: 49 · 51", "How do you work out 49 · 51 in your head?", "3rd binomial formula (difference of squares): $49 · 51 = (50 − 1)(50 + 1) = 50² − 1² = 2500 − 1 = 2499$"],
  ["Bigger flower bed", "A square flower bed has sides of x m. Each side becomes 3 m longer. What is the new area?", "$(x + 3)² = x² + 6x + 9$\nTo the old area x² you add two strips of 3x each and a small square of 9 m²."],
  ["Cutting a carpet", "A square carpet has sides of x m. Both sides are cut 1 m shorter. How big is it then?", "$(x − 1)² = x² − 2x + 1$\nYou cut off two strips x – the corner square (1 m²) is taken away twice, so + 1."],
  ["Rebuilding a square", "A square plaza (side x m) is rebuilt: one side 5 m longer, the other 5 m shorter. Is it bigger or smaller now?", "$(x + 5)(x − 5) = x² − 25$\nThe plaza is always exactly 25 m² smaller than before – whatever x is."]
],
es: [
  ["Cálculo mental: 21²", "¿Cómo se calcula 21² rápido de cabeza?", "1.ª identidad notable: $21² = (20 + 1)² = 20² + 2 · 20 · 1 + 1² = 400 + 40 + 1 = 441$"],
  ["Cálculo mental: 19²", "¿Y 19²?", "2.ª identidad notable: $19² = (20 − 1)² = 400 − 40 + 1 = 361$"],
  ["Cálculo mental: 49 · 51", "¿Cómo se calcula 49 · 51 de cabeza?", "3.ª identidad notable (suma por diferencia): $49 · 51 = (50 − 1)(50 + 1) = 50² − 1² = 2500 − 1 = 2499$"],
  ["Ampliar un bancal", "Un bancal cuadrado mide x m de lado. Cada lado crece 3 m. ¿Qué área tiene ahora?", "$(x + 3)² = x² + 6x + 9$\nAl área x² se añaden dos franjas de 3x y un cuadradito de 9 m²."],
  ["Recortar una alfombra", "Una alfombra cuadrada mide x m de lado. Se recortan 1 m los dos lados. ¿Qué tamaño tiene?", "$(x − 1)² = x² − 2x + 1$\nSe quitan dos franjas x; el cuadradito de la esquina (1 m²) se resta dos veces, por eso + 1."],
  ["Reformar una plaza", "Una plaza cuadrada (lado x m) se reforma: un lado 5 m más largo y el otro 5 m más corto. ¿Es ahora mayor o menor?", "$(x + 5)(x − 5) = x² − 25$\nLa plaza es siempre exactamente 25 m² más pequeña, sea cual sea x."]
],
zh: [
  ["口算：21²", "怎样快速口算 21²？", "完全平方和公式：$21² = (20 + 1)² = 20² + 2 · 20 · 1 + 1² = 400 + 40 + 1 = 441$"],
  ["口算：19²", "那 19² 呢？", "完全平方差公式：$19² = (20 − 1)² = 400 − 40 + 1 = 361$"],
  ["口算：49 · 51", "怎样口算 49 · 51？", "平方差公式：$49 · 51 = (50 − 1)(50 + 1) = 50² − 1² = 2500 − 1 = 2499$"],
  ["扩大花坛", "一个正方形花坛边长 x m，每条边加长 3 m。新面积是多少？", "$(x + 3)² = x² + 6x + 9$\n原面积 x² 加上两条各 3x 的长条和一个 9 m² 的小正方形。"],
  ["剪地毯", "一块正方形地毯边长 x m，两边各剪短 1 m。现在多大？", "$(x − 1)² = x² − 2x + 1$\n剪掉两条长 x 的条——角上的小正方形（1 m²）被减了两次，所以 + 1。"],
  ["改建广场", "一个正方形广场（边长 x m）改建：一边加长 5 m，另一边缩短 5 m。现在变大还是变小？", "$(x + 5)(x − 5) = x² − 25$\n无论 x 多大，广场总是正好小了 25 m²。"]
],
fr: [
  ["Calcul mental : 21²", "Comment calculer vite 21² de tête ?", "1ʳᵉ identité remarquable : $21² = (20 + 1)² = 20² + 2 · 20 · 1 + 1² = 400 + 40 + 1 = 441$"],
  ["Calcul mental : 19²", "Et 19² ?", "2ᵉ identité remarquable : $19² = (20 − 1)² = 400 − 40 + 1 = 361$"],
  ["Calcul mental : 49 · 51", "Comment calculer 49 · 51 de tête ?", "3ᵉ identité remarquable : $49 · 51 = (50 − 1)(50 + 1) = 50² − 1² = 2500 − 1 = 2499$"],
  ["Agrandir un massif", "Un massif carré a des côtés de x m. Chaque côté s’allonge de 3 m. Quelle est la nouvelle aire ?", "$(x + 3)² = x² + 6x + 9$\nÀ l’ancienne aire x² s’ajoutent deux bandes de 3x et un petit carré de 9 m²."],
  ["Recouper un tapis", "Un tapis carré a des côtés de x m. On raccourcit les deux côtés de 1 m. Quelle est sa taille ?", "$(x − 1)² = x² − 2x + 1$\nOn enlève deux bandes x ; le carré du coin (1 m²) est enlevé deux fois, d’où + 1."],
  ["Réaménager une place", "Une place carrée (côté x m) est réaménagée : un côté 5 m plus long, l’autre 5 m plus court. Est-elle plus grande ou plus petite ?", "$(x + 5)(x − 5) = x² − 25$\nLa place est toujours exactement 25 m² plus petite, quel que soit x."]
],
ru: [
  ["Устный счёт: 21²", "Как быстро посчитать 21² в уме?", "Квадрат суммы: $21² = (20 + 1)² = 20² + 2 · 20 · 1 + 1² = 400 + 40 + 1 = 441$"],
  ["Устный счёт: 19²", "А 19²?", "Квадрат разности: $19² = (20 − 1)² = 400 − 40 + 1 = 361$"],
  ["Устный счёт: 49 · 51", "Как посчитать 49 · 51 в уме?", "Разность квадратов: $49 · 51 = (50 − 1)(50 + 1) = 50² − 1² = 2500 − 1 = 2499$"],
  ["Увеличиваем грядку", "Квадратная грядка со стороной x м. Каждую сторону удлиняют на 3 м. Какова новая площадь?", "$(x + 3)² = x² + 6x + 9$\nК старой площади x² добавляются две полосы по 3x и маленький квадрат 9 м²."],
  ["Обрезаем ковёр", "Квадратный ковёр со стороной x м. Обе стороны укорачивают на 1 м. Какой он теперь?", "$(x − 1)² = x² − 2x + 1$\nОтрезаем две полосы по x – угловой квадрат (1 м²) вычли дважды, поэтому + 1."],
  ["Перестройка площади", "Квадратную площадь (сторона x м) перестраивают: одна сторона на 5 м длиннее, другая на 5 м короче. Она стала больше или меньше?", "$(x + 5)(x − 5) = x² − 25$\nПлощадь всегда ровно на 25 м² меньше – при любом x."]
],
ar: [
  ["حساب ذهني: 21²", "كيف تحسب 21² بسرعة في ذهنك؟", "مربع مجموع: $21² = (20 + 1)² = 20² + 2 · 20 · 1 + 1² = 400 + 40 + 1 = 441$"],
  ["حساب ذهني: 19²", "و19²؟", "مربع فرق: $19² = (20 − 1)² = 400 − 40 + 1 = 361$"],
  ["حساب ذهني: 49 · 51", "كيف تحسب 49 · 51 في ذهنك؟", "فرق مربعين: $49 · 51 = (50 − 1)(50 + 1) = 50² − 1² = 2500 − 1 = 2499$"],
  ["توسيع حوض", "حوض مربع طول ضلعه x m. يزداد كل ضلع 3 m. ما المساحة الجديدة؟", "$(x + 3)² = x² + 6x + 9$\nإلى المساحة القديمة x² يُضاف شريطان مساحة كل منهما 3x ومربع صغير مساحته 9 m²."],
  ["قص سجادة", "سجادة مربعة طول ضلعها x m. يُقص كل من الضلعين 1 m. ما مساحتها الآن؟", "$(x − 1)² = x² − 2x + 1$\nنقص شريطين طولهما x – فيُطرح مربع الزاوية (1 m²) مرتين، لذلك + 1."],
  ["إعادة بناء ساحة", "ساحة مربعة (ضلعها x m) يُعاد بناؤها: ضلع أطول بـ 5 m والآخر أقصر بـ 5 m. هل أصبحت أكبر أم أصغر؟", "$(x + 5)(x − 5) = x² − 25$\nتصبح الساحة دائمًا أصغر بـ 25 m² تمامًا – مهما كانت x."]
],
ja: [
  ["暗算：21²", "21² をすばやく暗算するには？", "乗法公式（和の平方）：$21² = (20 + 1)² = 20² + 2 · 20 · 1 + 1² = 400 + 40 + 1 = 441$"],
  ["暗算：19²", "では 19² は？", "乗法公式（差の平方）：$19² = (20 − 1)² = 400 − 40 + 1 = 361$"],
  ["暗算：49 · 51", "49 · 51 を暗算するには？", "乗法公式（和と差の積）：$49 · 51 = (50 − 1)(50 + 1) = 50² − 1² = 2500 − 1 = 2499$"],
  ["花だんを広げる", "1 辺 x m の正方形の花だん。各辺を 3 m 長くする。新しい面積は？", "$(x + 3)² = x² + 6x + 9$\nもとの x² に、3x の帯 2 本と 9 m² の小さな正方形が加わる。"],
  ["じゅうたんを切る", "1 辺 x m の正方形のじゅうたん。2 辺とも 1 m 短くする。面積は？", "$(x − 1)² = x² − 2x + 1$\n長さ x の帯を 2 本切ると、角の正方形（1 m²）を 2 回引いたことになるので + 1。"],
  ["広場の作り直し", "1 辺 x m の正方形の広場を、1 辺は 5 m 長く、もう 1 辺は 5 m 短くする。広くなる？せまくなる？", "$(x + 5)(x − 5) = x² − 25$\nx がいくつでも、いつもちょうど 25 m² せまくなる。"]
],
pt: [
  ["Cálculo mental: 21²", "Como calcular 21² rapidamente de cabeça?", "Quadrado da soma: $21² = (20 + 1)² = 20² + 2 · 20 · 1 + 1² = 400 + 40 + 1 = 441$"],
  ["Cálculo mental: 19²", "E 19²?", "Quadrado da diferença: $19² = (20 − 1)² = 400 − 40 + 1 = 361$"],
  ["Cálculo mental: 49 · 51", "Como calcular 49 · 51 de cabeça?", "Produto da soma pela diferença: $49 · 51 = (50 − 1)(50 + 1) = 50² − 1² = 2500 − 1 = 2499$"],
  ["Aumentar um canteiro", "Um canteiro quadrado tem lado x m. Cada lado fica 3 m maior. Qual é a nova área?", "$(x + 3)² = x² + 6x + 9$\nÀ área antiga x² juntam-se duas faixas de 3x e um quadradinho de 9 m²."],
  ["Cortar um tapete", "Um tapete quadrado tem lado x m. Os dois lados são encurtados 1 m. Qual é o tamanho agora?", "$(x − 1)² = x² − 2x + 1$\nCortam-se duas faixas x – o quadradinho do canto (1 m²) é tirado duas vezes, por isso + 1."],
  ["Reformar uma praça", "Uma praça quadrada (lado x m) é reformada: um lado fica 5 m maior e o outro 5 m menor. Ficou maior ou menor?", "$(x + 5)(x − 5) = x² − 25$\nA praça fica sempre exatamente 25 m² menor, seja qual for x."]
]
}});
