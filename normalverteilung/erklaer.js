// /normalverteilung/erklaer.js – Reiter „Erklärung“ (9 Sprachen): Worum geht es, alle Buchstaben,
// σ-Regeln und Alltagsbeispiele Schritt für Schritt (Standardisieren, Φ ablesen, Ergebnis) mit Bild.
(function(){
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  // art: h = höchstens x, m = mindestens x, z = zwischen μ − d und μ + d
  var FAELLE = {
    koerper: { mu: 170, s: 8, art: "h", w: 180, min: 146, max: 194, step: 1 },
    schoko: { mu: 100, s: 2, art: "h", w: 97, min: 94, max: 106, step: 0.5 },
    schulweg: { mu: 20, s: 4, art: "m", w: 25, min: 10, max: 32, step: 1 },
    iq: { mu: 100, s: 15, art: "z", w: 15, min: 1, max: 45, step: 1 },
    lampe: { mu: 1000, s: 80, art: "m", w: 1100, min: 780, max: 1240, step: 10 }
  };
  var EK = {
    de: { tab: "Erklärung",
      h1: "Worum geht es?", intro: "Viele Größen im Alltag – Körpergröße, Gewicht einer Packung, Dauer des Schulwegs – schwanken zufällig um einen Mittelwert: Die meisten Werte liegen nah daran, sehr große oder sehr kleine Werte sind selten. Trägt man das auf, entsteht eine <b>Glockenkurve</b>. Wichtig: Wahrscheinlichkeiten sind hier <b>Flächen unter der Kurve</b>. Die ganze Fläche ist 1 (= 100 %). Die Wahrscheinlichkeit für einen ganz genauen Wert (z. B. exakt 170,000… cm) ist 0 – man fragt immer nach Bereichen.",
      h2: "Die Buchstaben", bspSpalte: "im Beispiel unten",
      zeichen: [
        ["X", "Zufallsgröße, z. B. die Körpergröße einer zufällig gewählten Person"],
        ["μ", "Erwartungswert (griechisch „my“): die Mitte der Glocke, der Mittelwert"],
        ["σ", "Standardabweichung (griechisch „sigma“): wie breit die Glocke ist – je größer σ, desto flacher und breiter"],
        ["σ²", "Varianz (σ mal σ)"],
        ["X ~ N(μ; σ²)", "„X ist normalverteilt mit Mittelwert μ und Standardabweichung σ“"],
        ["φ", "Dichtefunktion (kleines Phi): die Glockenkurve selbst; ihre Höhe ist keine Wahrscheinlichkeit"],
        ["z = (x − μ) : σ", "Standardisieren: wie viele Standardabweichungen x vom Mittelwert entfernt ist"],
        ["Φ(z)", "großes Phi: Fläche links von z bei der Standardnormalverteilung (μ = 0, σ = 1) – Tabelle oder Taschenrechner (normalcdf)"],
        ["P(X ≤ x)", "Wahrscheinlichkeit für höchstens x = Fläche links von x = Φ(z)"],
        ["μ ± σ", "Wendepunkte der Glocke: dort ändert die Kurve ihre Krümmung"]
      ],
      h3: "Die σ-Regeln (zum Merken)", regeln: ["Etwa 68,3 % aller Werte liegen zwischen μ − σ und μ + σ.", "Etwa 95,4 % liegen zwischen μ − 2σ und μ + 2σ.", "Etwa 99,7 % liegen zwischen μ − 3σ und μ + 3σ."], regelT: "Werte, die mehr als 3σ vom Mittelwert entfernt sind, kommen also fast nie vor.",
      h4: "Beispiel aus dem Alltag – Schritt für Schritt", wahl: "Beispiel:", wL: "Wert x =", dL: "Abstand d =",
      f: {
        koerper: ["Körpergröße", "Die Körpergröße erwachsener Frauen ist etwa normalverteilt mit μ = 170 cm und σ = 8 cm. Welcher Anteil ist höchstens {x} cm groß?", "Etwa {P} der Frauen sind höchstens {x} cm groß.", "cm"],
        schoko: ["Schokoladentafeln", "Eine Maschine füllt Tafeln mit μ = 100 g und σ = 2 g. Welcher Anteil wiegt weniger als {x} g (zu leicht)?", "Etwa {P} der Tafeln wiegen weniger als {x} g.", "g"],
        schulweg: ["Zu spät zur Schule?", "Dein Schulweg dauert im Mittel μ = 20 min mit σ = 4 min. Du hast {x} min Zeit. Wie wahrscheinlich brauchst du länger?", "Mit etwa {P} Wahrscheinlichkeit brauchst du länger als {x} min.", "min"],
        iq: ["Intelligenztest", "IQ-Werte sind normalverteilt mit μ = 100 und σ = 15. Welcher Anteil hat einen IQ zwischen {a} und {b}?", "Etwa {P} der Menschen haben einen IQ zwischen {a} und {b}.", ""],
        lampe: ["Lebensdauer einer Lampe", "Eine Lampe hält im Mittel μ = 1000 h mit σ = 80 h. Wie wahrscheinlich hält sie mindestens {x} h?", "Etwa {P} der Lampen halten mindestens {x} h.", "h"]
      },
      s1: "1. Was ist gegeben, was ist gefragt?", s2: "2. Standardisieren", s2t: "{x} liegt {z} Standardabweichungen {r} dem Mittelwert.", ueber: "über", unter: "unter", gleich: "genau auf",
      s3: "3. Fläche bestimmen", s3h: "Gefragt ist die Fläche links von x:", s3m: "Gefragt ist die Fläche rechts von x – also 1 minus die Fläche links:", s3z: "Gefragt ist die Fläche zwischen a und b – große Fläche links von b minus kleine Fläche links von a:",
      s4: "4. Ergebnis", bild: "Die gefärbte Fläche ist die gesuchte Wahrscheinlichkeit.", zurGlocke: "Im Reiter „Glockenkurve“ kannst du μ, σ und die Grenzen frei wählen." },
    en: { tab: "Explanation",
      h1: "What is it about?", intro: "Many everyday quantities – height, the weight of a packet, the time it takes to get to school – vary randomly around an average: most values are close to it, very large or very small values are rare. Plotted, this gives a <b>bell curve</b>. Important: here probabilities are <b>areas under the curve</b>. The whole area is 1 (= 100%). The probability of one exact value (e.g. exactly 170.000… cm) is 0 – you always ask about ranges.",
      h2: "The letters", bspSpalte: "in the example below",
      zeichen: [
        ["X", "random variable, e.g. the height of a randomly chosen person"],
        ["μ", "expected value (Greek “mu”): the middle of the bell, the mean"],
        ["σ", "standard deviation (Greek “sigma”): how wide the bell is – the larger σ, the flatter and wider"],
        ["σ²", "variance (σ times σ)"],
        ["X ~ N(μ; σ²)", "“X is normally distributed with mean μ and standard deviation σ”"],
        ["φ", "density function (small phi): the bell curve itself; its height is not a probability"],
        ["z = (x − μ) : σ", "standardising: how many standard deviations x is away from the mean"],
        ["Φ(z)", "capital Phi: area to the left of z for the standard normal distribution (μ = 0, σ = 1) – table or calculator (normalcdf)"],
        ["P(X ≤ x)", "probability of at most x = area to the left of x = Φ(z)"],
        ["μ ± σ", "points of inflection of the bell: there the curve changes its bending"]
      ],
      h3: "The σ rules (to remember)", regeln: ["About 68.3% of all values lie between μ − σ and μ + σ.", "About 95.4% lie between μ − 2σ and μ + 2σ.", "About 99.7% lie between μ − 3σ and μ + 3σ."], regelT: "So values more than 3σ away from the mean hardly ever occur.",
      h4: "Everyday example – step by step", wahl: "Example:", wL: "value x =", dL: "distance d =",
      f: {
        koerper: ["Height", "The height of adult women is roughly normally distributed with μ = 170 cm and σ = 8 cm. What proportion is at most {x} cm tall?", "About {P} of women are at most {x} cm tall.", "cm"],
        schoko: ["Chocolate bars", "A machine fills bars with μ = 100 g and σ = 2 g. What proportion weighs less than {x} g (too light)?", "About {P} of the bars weigh less than {x} g.", "g"],
        schulweg: ["Late for school?", "Your way to school takes μ = 20 min on average with σ = 4 min. You have {x} min. How likely is it to take longer?", "With a probability of about {P} you need longer than {x} min.", "min"],
        iq: ["IQ test", "IQ scores are normally distributed with μ = 100 and σ = 15. What proportion has an IQ between {a} and {b}?", "About {P} of people have an IQ between {a} and {b}.", ""],
        lampe: ["Life of a lamp", "A lamp lasts μ = 1000 h on average with σ = 80 h. How likely does it last at least {x} h?", "About {P} of the lamps last at least {x} h.", "h"]
      },
      s1: "1. What is given, what is asked?", s2: "2. Standardise", s2t: "{x} is {z} standard deviations {r} the mean.", ueber: "above", unter: "below", gleich: "exactly at",
      s3: "3. Find the area", s3h: "We need the area to the left of x:", s3m: "We need the area to the right of x – so 1 minus the area to the left:", s3z: "We need the area between a and b – big area left of b minus small area left of a:",
      s4: "4. Result", bild: "The coloured area is the probability we want.", zurGlocke: "In the “Bell curve” tab you can choose μ, σ and the limits freely." },
    es: { tab: "Explicación",
      h1: "¿De qué se trata?", intro: "Muchas magnitudes cotidianas – la estatura, el peso de un paquete, lo que se tarda en llegar al colegio – varían al azar alrededor de una media: la mayoría de los valores están cerca de ella y los muy grandes o muy pequeños son raros. Al dibujarlo sale una <b>campana</b>. Importante: aquí las probabilidades son <b>áreas bajo la curva</b>. El área total es 1 (= 100 %). La probabilidad de un valor exacto (p. ej. exactamente 170,000… cm) es 0: siempre se pregunta por intervalos.",
      h2: "Las letras", bspSpalte: "en el ejemplo de abajo",
      zeichen: [
        ["X", "variable aleatoria, p. ej. la estatura de una persona elegida al azar"],
        ["μ", "esperanza (griego «mi»): el centro de la campana, la media"],
        ["σ", "desviación típica (griego «sigma»): lo ancha que es la campana; cuanto mayor σ, más plana y ancha"],
        ["σ²", "varianza (σ por σ)"],
        ["X ~ N(μ; σ²)", "«X sigue una distribución normal con media μ y desviación típica σ»"],
        ["φ", "función de densidad (phi minúscula): la propia campana; su altura no es una probabilidad"],
        ["z = (x − μ) : σ", "tipificar: a cuántas desviaciones típicas está x de la media"],
        ["Φ(z)", "Phi mayúscula: área a la izquierda de z en la normal estándar (μ = 0, σ = 1); tabla o calculadora (normalcdf)"],
        ["P(X ≤ x)", "probabilidad de como mucho x = área a la izquierda de x = Φ(z)"],
        ["μ ± σ", "puntos de inflexión de la campana: ahí la curva cambia de curvatura"]
      ],
      h3: "Las reglas de σ (para recordar)", regeln: ["Aproximadamente el 68,3 % de los valores está entre μ − σ y μ + σ.", "Aproximadamente el 95,4 % está entre μ − 2σ y μ + 2σ.", "Aproximadamente el 99,7 % está entre μ − 3σ y μ + 3σ."], regelT: "Los valores a más de 3σ de la media casi nunca aparecen.",
      h4: "Ejemplo de la vida real, paso a paso", wahl: "Ejemplo:", wL: "valor x =", dL: "distancia d =",
      f: {
        koerper: ["Estatura", "La estatura de las mujeres adultas es aproximadamente normal con μ = 170 cm y σ = 8 cm. ¿Qué proporción mide como mucho {x} cm?", "Aproximadamente el {P} de las mujeres mide como mucho {x} cm.", "cm"],
        schoko: ["Tabletas de chocolate", "Una máquina llena tabletas con μ = 100 g y σ = 2 g. ¿Qué proporción pesa menos de {x} g (demasiado ligera)?", "Aproximadamente el {P} de las tabletas pesa menos de {x} g.", "g"],
        schulweg: ["¿Llegas tarde?", "Tu camino al colegio dura de media μ = 20 min con σ = 4 min. Tienes {x} min. ¿Qué probabilidad hay de tardar más?", "Con una probabilidad de aproximadamente el {P} tardas más de {x} min.", "min"],
        iq: ["Test de inteligencia", "El CI sigue una normal con μ = 100 y σ = 15. ¿Qué proporción tiene un CI entre {a} y {b}?", "Aproximadamente el {P} de las personas tiene un CI entre {a} y {b}.", ""],
        lampe: ["Duración de una bombilla", "Una bombilla dura de media μ = 1000 h con σ = 80 h. ¿Qué probabilidad hay de que dure al menos {x} h?", "Aproximadamente el {P} de las bombillas dura al menos {x} h.", "h"]
      },
      s1: "1. ¿Qué se da y qué se pregunta?", s2: "2. Tipificar", s2t: "{x} está {z} desviaciones típicas {r} la media.", ueber: "por encima de", unter: "por debajo de", gleich: "justo en",
      s3: "3. Calcular el área", s3h: "Buscamos el área a la izquierda de x:", s3m: "Buscamos el área a la derecha de x, es decir, 1 menos el área de la izquierda:", s3z: "Buscamos el área entre a y b: área grande a la izquierda de b menos área pequeña a la izquierda de a:",
      s4: "4. Resultado", bild: "El área coloreada es la probabilidad buscada.", zurGlocke: "En la pestaña «Campana» puedes elegir libremente μ, σ y los límites." },
    zh: { tab: "讲解",
      h1: "讲的是什么？", intro: "生活中很多量——身高、一包东西的重量、上学路上的时间——都在平均值附近随机波动：大多数数值离平均值很近，特别大或特别小的很少。画出来就是一条<b>钟形曲线</b>。重要的是：这里的概率是<b>曲线下的面积</b>，总面积是 1（= 100 %）。某一个精确值（例如正好 170.000… cm）的概率是 0——所以总是问一个范围。",
      h2: "这些字母", bspSpalte: "下面例子中的值",
      zeichen: [
        ["X", "随机变量，例如随机选一个人的身高"],
        ["μ", "期望（希腊字母“缪”）：钟形的中心，即平均值"],
        ["σ", "标准差（希腊字母“西格玛”）：钟形有多宽——σ 越大，曲线越平越宽"],
        ["σ²", "方差（σ 乘 σ）"],
        ["X ~ N(μ; σ²)", "“X 服从均值为 μ、标准差为 σ 的正态分布”"],
        ["φ", "密度函数（小写 phi）：就是钟形曲线本身；它的高度不是概率"],
        ["z = (x − μ) : σ", "标准化：x 离平均值有几个标准差"],
        ["Φ(z)", "大写 Phi：标准正态分布（μ = 0，σ = 1）中 z 左边的面积——查表或用计算器（normalcdf）"],
        ["P(X ≤ x)", "最多为 x 的概率 = x 左边的面积 = Φ(z)"],
        ["μ ± σ", "钟形曲线的拐点：曲线在这里改变弯曲方向"]
      ],
      h3: "σ 法则（要记住）", regeln: ["约 68.3 % 的数值在 μ − σ 和 μ + σ 之间。", "约 95.4 % 在 μ − 2σ 和 μ + 2σ 之间。", "约 99.7 % 在 μ − 3σ 和 μ + 3σ 之间。"], regelT: "所以离平均值超过 3σ 的数值几乎不会出现。",
      h4: "生活中的例子——一步一步", wahl: "例子：", wL: "数值 x =", dL: "距离 d =",
      f: {
        koerper: ["身高", "成年女性的身高近似服从 μ = 170 cm、σ = 8 cm 的正态分布。身高最多 {x} cm 的占多少？", "约 {P} 的女性身高最多 {x} cm。", "cm"],
        schoko: ["巧克力板", "机器灌装巧克力板，μ = 100 g，σ = 2 g。重量不足 {x} g（太轻）的占多少？", "约 {P} 的巧克力板不足 {x} g。", "g"],
        schulweg: ["上学会迟到吗？", "你上学平均要 μ = 20 分钟，σ = 4 分钟。你有 {x} 分钟。用时更长的概率是多少？", "约有 {P} 的概率你要用超过 {x} 分钟。", "min"],
        iq: ["智力测验", "智商服从 μ = 100、σ = 15 的正态分布。智商在 {a} 到 {b} 之间的占多少？", "约 {P} 的人智商在 {a} 到 {b} 之间。", ""],
        lampe: ["灯泡寿命", "灯泡平均寿命 μ = 1000 小时，σ = 80 小时。至少用 {x} 小时的概率是多少？", "约 {P} 的灯泡至少能用 {x} 小时。", "h"]
      },
      s1: "1. 已知什么？问什么？", s2: "2. 标准化", s2t: "{x} 在平均值{r} {z} 个标准差处。", ueber: "上方", unter: "下方", gleich: "正好",
      s3: "3. 求面积", s3h: "要求 x 左边的面积：", s3m: "要求 x 右边的面积——即 1 减去左边的面积：", s3z: "要求 a 和 b 之间的面积——b 左边的大面积减去 a 左边的小面积：",
      s4: "4. 结果", bild: "涂色部分就是所求的概率。", zurGlocke: "在“钟形曲线”页可以自由选择 μ、σ 和界限。" },
    fr: { tab: "Explication",
      h1: "De quoi s’agit-il ?", intro: "Beaucoup de grandeurs de la vie courante – la taille, la masse d’un paquet, la durée du trajet vers l’école – varient au hasard autour d’une moyenne : la plupart des valeurs en sont proches, les très grandes ou très petites sont rares. En dessinant, on obtient une <b>courbe en cloche</b>. Important : ici, les probabilités sont des <b>aires sous la courbe</b>. L’aire totale vaut 1 (= 100 %). La probabilité d’une valeur exacte (p. ex. exactement 170,000… cm) est 0 : on demande toujours un intervalle.",
      h2: "Les lettres", bspSpalte: "dans l’exemple ci-dessous",
      zeichen: [
        ["X", "variable aléatoire, p. ex. la taille d’une personne choisie au hasard"],
        ["μ", "espérance (grec « mu ») : le milieu de la cloche, la moyenne"],
        ["σ", "écart type (grec « sigma ») : la largeur de la cloche – plus σ est grand, plus elle est plate et large"],
        ["σ²", "variance (σ fois σ)"],
        ["X ~ N(μ ; σ²)", "« X suit la loi normale de moyenne μ et d’écart type σ »"],
        ["φ", "fonction de densité (petit phi) : la cloche elle-même ; sa hauteur n’est pas une probabilité"],
        ["z = (x − μ) : σ", "centrer-réduire : à combien d’écarts types x se trouve de la moyenne"],
        ["Φ(z)", "grand Phi : aire à gauche de z pour la loi normale centrée réduite (μ = 0, σ = 1) – table ou calculatrice (normalcdf)"],
        ["P(X ≤ x)", "probabilité d’au plus x = aire à gauche de x = Φ(z)"],
        ["μ ± σ", "points d’inflexion de la cloche : la courbe y change de courbure"]
      ],
      h3: "Les règles des σ (à retenir)", regeln: ["Environ 68,3 % des valeurs sont entre μ − σ et μ + σ.", "Environ 95,4 % sont entre μ − 2σ et μ + 2σ.", "Environ 99,7 % sont entre μ − 3σ et μ + 3σ."], regelT: "Les valeurs à plus de 3σ de la moyenne n’apparaissent donc presque jamais.",
      h4: "Exemple de la vie courante, étape par étape", wahl: "Exemple :", wL: "valeur x =", dL: "écart d =",
      f: {
        koerper: ["Taille", "La taille des femmes adultes suit à peu près une loi normale avec μ = 170 cm et σ = 8 cm. Quelle proportion mesure au plus {x} cm ?", "Environ {P} des femmes mesurent au plus {x} cm.", "cm"],
        schoko: ["Tablettes de chocolat", "Une machine remplit des tablettes avec μ = 100 g et σ = 2 g. Quelle proportion pèse moins de {x} g (trop légère) ?", "Environ {P} des tablettes pèsent moins de {x} g.", "g"],
        schulweg: ["En retard à l’école ?", "Ton trajet dure en moyenne μ = 20 min avec σ = 4 min. Tu as {x} min. Quelle est la probabilité de mettre plus longtemps ?", "Avec une probabilité d’environ {P}, tu mets plus de {x} min.", "min"],
        iq: ["Test de QI", "Les scores de QI suivent une loi normale avec μ = 100 et σ = 15. Quelle proportion a un QI entre {a} et {b} ?", "Environ {P} des personnes ont un QI entre {a} et {b}.", ""],
        lampe: ["Durée de vie d’une lampe", "Une lampe dure en moyenne μ = 1000 h avec σ = 80 h. Quelle est la probabilité qu’elle dure au moins {x} h ?", "Environ {P} des lampes durent au moins {x} h.", "h"]
      },
      s1: "1. Que sait-on, que cherche-t-on ?", s2: "2. Centrer et réduire", s2t: "{x} se trouve à {z} écarts types {r} la moyenne.", ueber: "au-dessus de", unter: "en dessous de", gleich: "exactement sur",
      s3: "3. Trouver l’aire", s3h: "On cherche l’aire à gauche de x :", s3m: "On cherche l’aire à droite de x, donc 1 moins l’aire à gauche :", s3z: "On cherche l’aire entre a et b : grande aire à gauche de b moins petite aire à gauche de a :",
      s4: "4. Résultat", bild: "L’aire coloriée est la probabilité cherchée.", zurGlocke: "Dans l’onglet « Courbe en cloche », tu peux choisir librement μ, σ et les bornes." },
    ru: { tab: "Объяснение",
      h1: "О чём речь?", intro: "Многие величины в жизни – рост, масса упаковки, время дороги в школу – случайно колеблются около среднего: большинство значений рядом с ним, очень большие и очень маленькие встречаются редко. Если это нарисовать, получится <b>колоколообразная кривая</b>. Важно: вероятности здесь – это <b>площади под кривой</b>. Вся площадь равна 1 (= 100 %). Вероятность одного точного значения (например, ровно 170,000… см) равна 0 – всегда спрашивают про промежуток.",
      h2: "Буквы", bspSpalte: "в примере ниже",
      zeichen: [
        ["X", "случайная величина, например рост случайно выбранного человека"],
        ["μ", "математическое ожидание (греч. «мю»): середина колокола, среднее"],
        ["σ", "стандартное отклонение (греч. «сигма»): ширина колокола – чем больше σ, тем он площе и шире"],
        ["σ²", "дисперсия (σ умножить на σ)"],
        ["X ~ N(μ; σ²)", "«X распределена нормально со средним μ и стандартным отклонением σ»"],
        ["φ", "плотность (малая фи): сама кривая-колокол; её высота – не вероятность"],
        ["z = (x − μ) : σ", "стандартизация: на сколько стандартных отклонений x отстоит от среднего"],
        ["Φ(z)", "большая Фи: площадь слева от z у стандартного нормального распределения (μ = 0, σ = 1) – таблица или калькулятор (normalcdf)"],
        ["P(X ≤ x)", "вероятность не больше x = площадь слева от x = Φ(z)"],
        ["μ ± σ", "точки перегиба колокола: там кривая меняет изгиб"]
      ],
      h3: "Правила σ (запомнить)", regeln: ["Около 68,3 % всех значений лежат между μ − σ и μ + σ.", "Около 95,4 % – между μ − 2σ и μ + 2σ.", "Около 99,7 % – между μ − 3σ и μ + 3σ."], regelT: "Значения дальше 3σ от среднего почти не встречаются.",
      h4: "Пример из жизни – шаг за шагом", wahl: "Пример:", wL: "значение x =", dL: "отступ d =",
      f: {
        koerper: ["Рост", "Рост взрослых женщин примерно нормально распределён с μ = 170 см и σ = 8 см. Какая доля ростом не выше {x} см?", "Около {P} женщин ростом не выше {x} см.", "см"],
        schoko: ["Шоколадки", "Машина фасует шоколадки с μ = 100 г и σ = 2 г. Какая доля весит меньше {x} г (слишком лёгкие)?", "Около {P} шоколадок весят меньше {x} г.", "г"],
        schulweg: ["Опоздаешь в школу?", "Дорога в школу в среднем занимает μ = 20 мин, σ = 4 мин. У тебя {x} мин. Какова вероятность потратить больше?", "С вероятностью около {P} ты потратишь больше {x} мин.", "мин"],
        iq: ["Тест на IQ", "IQ распределён нормально с μ = 100 и σ = 15. Какая доля людей имеет IQ от {a} до {b}?", "Около {P} людей имеют IQ от {a} до {b}.", ""],
        lampe: ["Срок службы лампы", "Лампа служит в среднем μ = 1000 ч, σ = 80 ч. Какова вероятность, что она прослужит не меньше {x} ч?", "Около {P} ламп служат не меньше {x} ч.", "ч"]
      },
      s1: "1. Что дано, что спрашивается?", s2: "2. Стандартизация", s2t: "{x} лежит на {z} стандартных отклонений {r} среднего.", ueber: "выше", unter: "ниже", gleich: "ровно на уровне",
      s3: "3. Находим площадь", s3h: "Нужна площадь слева от x:", s3m: "Нужна площадь справа от x – то есть 1 минус площадь слева:", s3z: "Нужна площадь между a и b – большая площадь слева от b минус маленькая слева от a:",
      s4: "4. Результат", bild: "Закрашенная площадь – искомая вероятность.", zurGlocke: "На вкладке «Колокол» можно свободно выбрать μ, σ и границы." },
    ar: { tab: "الشرح",
      h1: "ما الموضوع؟", intro: "كثير من الكميات في الحياة – الطول، ووزن عبوة، ومدة الطريق إلى المدرسة – تتغير عشوائيًا حول متوسط: معظم القيم قريبة منه، والقيم الكبيرة جدًا أو الصغيرة جدًا نادرة. عند رسمها يظهر <b>منحنى جرسي</b>. مهم: الاحتمالات هنا هي <b>مساحات تحت المنحنى</b>. المساحة كلها تساوي 1 (= 100 %). احتمال قيمة واحدة بالضبط (مثل 170,000… cm تمامًا) يساوي 0 – لذلك نسأل دائمًا عن مجال.",
      h2: "الحروف", bspSpalte: "في المثال أدناه",
      zeichen: [
        ["X", "متغير عشوائي، مثل طول شخص يُختار عشوائيًا"],
        ["μ", "القيمة المتوقعة (الحرف اليوناني «مو»): منتصف الجرس، أي المتوسط"],
        ["σ", "الانحراف المعياري (الحرف اليوناني «سيغما»): عرض الجرس – كلما كبر σ صار أعرض وأكثر انبساطًا"],
        ["σ²", "التباين (σ مضروبًا في σ)"],
        ["X ~ N(μ; σ²)", "«X يتبع التوزيع الطبيعي بمتوسط μ وانحراف معياري σ»"],
        ["φ", "دالة الكثافة (فاي الصغيرة): منحنى الجرس نفسه؛ ارتفاعه ليس احتمالًا"],
        ["z = (x − μ) : σ", "التوحيد المعياري: كم انحرافًا معياريًا تبعد x عن المتوسط"],
        ["Φ(z)", "فاي الكبيرة: المساحة على يسار z في التوزيع الطبيعي المعياري (μ = 0، σ = 1) – من الجدول أو الآلة الحاسبة (normalcdf)"],
        ["P(X ≤ x)", "احتمال x على الأكثر = المساحة على يسار x = Φ(z)"],
        ["μ ± σ", "نقطتا الانعطاف في الجرس: هناك يغيّر المنحنى تقوّسه"]
      ],
      h3: "قواعد σ (للحفظ)", regeln: ["نحو 68.3 % من القيم بين μ − σ و μ + σ.", "نحو 95.4 % بين μ − 2σ و μ + 2σ.", "نحو 99.7 % بين μ − 3σ و μ + 3σ."], regelT: "القيم التي تبعد أكثر من 3σ عن المتوسط نادرة جدًا.",
      h4: "مثال من الحياة اليومية خطوة خطوة", wahl: "المثال:", wL: "القيمة x =", dL: "المسافة d =",
      f: {
        koerper: ["الطول", "طول النساء البالغات يتبع تقريبًا توزيعًا طبيعيًا بـ μ = 170 cm و σ = 8 cm. ما نسبة من طولهن {x} cm على الأكثر؟", "نحو {P} من النساء طولهن {x} cm على الأكثر.", "cm"],
        schoko: ["ألواح الشوكولاتة", "آلة تملأ ألواحًا بـ μ = 100 g و σ = 2 g. ما نسبة الألواح التي تزن أقل من {x} g (خفيفة جدًا)؟", "نحو {P} من الألواح تزن أقل من {x} g.", "g"],
        schulweg: ["هل تتأخر عن المدرسة؟", "يستغرق طريقك إلى المدرسة في المتوسط μ = 20 min مع σ = 4 min. لديك {x} min. ما احتمال أن تحتاج وقتًا أطول؟", "باحتمال نحو {P} تحتاج أكثر من {x} min.", "min"],
        iq: ["اختبار الذكاء", "درجات الذكاء تتبع توزيعًا طبيعيًا بـ μ = 100 و σ = 15. ما نسبة من لديهم درجة بين {a} و {b}؟", "نحو {P} من الناس درجتهم بين {a} و {b}.", ""],
        lampe: ["عمر مصباح", "يعمل مصباح في المتوسط μ = 1000 h مع σ = 80 h. ما احتمال أن يعمل {x} h على الأقل؟", "نحو {P} من المصابيح تعمل {x} h على الأقل.", "h"]
      },
      s1: "1. ما المعطى وما المطلوب؟", s2: "2. التوحيد المعياري", s2t: "تقع {x} على بعد {z} انحراف معياري {r} المتوسط.", ueber: "فوق", unter: "تحت", gleich: "عند",
      s3: "3. إيجاد المساحة", s3h: "المطلوب المساحة على يسار x:", s3m: "المطلوب المساحة على يمين x – أي 1 ناقص المساحة على اليسار:", s3z: "المطلوب المساحة بين a و b – المساحة الكبيرة يسار b ناقص الصغيرة يسار a:",
      s4: "4. النتيجة", bild: "المساحة الملوّنة هي الاحتمال المطلوب.", zurGlocke: "في تبويب «منحنى الجرس» يمكنك اختيار μ و σ والحدود بحرية." },
    ja: { tab: "説明",
      h1: "どんな話？", intro: "身長、袋の重さ、通学時間など、身の回りの多くの量は平均のまわりでばらつく。ほとんどの値は平均に近く、とても大きい値や小さい値はめったにない。グラフにすると<b>つりがね形の曲線</b>になる。大切なのは、ここでは確率が<b>曲線の下の面積</b>だということ。全体の面積は 1（= 100 %）。ぴったり 1 つの値（たとえばちょうど 170.000… cm）の確率は 0 なので、いつも範囲でたずねる。",
      h2: "文字の意味", bspSpalte: "下の例での値",
      zeichen: [
        ["X", "確率変数。たとえば、でたらめに選んだ人の身長"],
        ["μ", "期待値（ギリシャ文字「ミュー」）：つりがねの真ん中、平均"],
        ["σ", "標準偏差（ギリシャ文字「シグマ」）：つりがねの幅――σ が大きいほど平らで広い"],
        ["σ²", "分散（σ × σ）"],
        ["X ~ N(μ; σ²)", "「X は平均 μ、標準偏差 σ の正規分布に従う」"],
        ["φ", "確率密度関数（小文字のファイ）：つりがねの曲線そのもの。高さは確率ではない"],
        ["z = (x − μ) : σ", "標準化：x が平均から標準偏差いくつ分はなれているか"],
        ["Φ(z)", "大文字のファイ：標準正規分布（μ = 0、σ = 1）で z より左の面積――表か電卓（normalcdf）で求める"],
        ["P(X ≤ x)", "x 以下になる確率 = x より左の面積 = Φ(z)"],
        ["μ ± σ", "つりがねの変曲点：ここで曲線の曲がり方が変わる"]
      ],
      h3: "σ のきまり（おぼえよう）", regeln: ["値の約 68.3 % が μ − σ から μ + σ の間にある。", "約 95.4 % が μ − 2σ から μ + 2σ の間にある。", "約 99.7 % が μ − 3σ から μ + 3σ の間にある。"], regelT: "平均から 3σ より遠い値はほとんど出てこない。",
      h4: "身近な例――1 歩ずつ", wahl: "例：", wL: "値 x =", dL: "はば d =",
      f: {
        koerper: ["身長", "大人の女性の身長はおよそ μ = 170 cm、σ = 8 cm の正規分布。身長が {x} cm 以下の人の割合は？", "約 {P} の女性の身長が {x} cm 以下。", "cm"],
        schoko: ["板チョコ", "機械が μ = 100 g、σ = 2 g で板チョコをつめる。{x} g より軽い（軽すぎる）ものの割合は？", "約 {P} の板チョコが {x} g より軽い。", "g"],
        schulweg: ["学校におくれる？", "通学時間は平均 μ = 20 分、σ = 4 分。使える時間は {x} 分。それより長くかかる確率は？", "約 {P} の確率で {x} 分より長くかかる。", "min"],
        iq: ["知能検査", "IQ は μ = 100、σ = 15 の正規分布。IQ が {a} から {b} の人の割合は？", "約 {P} の人の IQ が {a} から {b} の間。", ""],
        lampe: ["電球の寿命", "電球の寿命は平均 μ = 1000 時間、σ = 80 時間。{x} 時間以上もつ確率は？", "約 {P} の電球が {x} 時間以上もつ。", "h"]
      },
      s1: "1. わかっていること、たずねられていることは？", s2: "2. 標準化する", s2t: "{x} は平均より標準偏差 {z} 個分{r}。", ueber: "大きい", unter: "小さい", gleich: "の位置",
      s3: "3. 面積を求める", s3h: "x より左の面積を求める：", s3m: "x より右の面積を求める――つまり 1 から左の面積を引く：", s3z: "a と b の間の面積を求める――b より左の大きい面積から a より左の小さい面積を引く：",
      s4: "4. 答え", bild: "色のついた面積が求める確率。", zurGlocke: "「つりがね曲線」タブでは μ、σ、範囲を自由に選べるよ。" },
    pt: { tab: "Explicação",
      h1: "Do que se trata?", intro: "Muitas grandezas do dia a dia – altura, peso de um pacote, tempo do caminho para a escola – variam ao acaso em torno de uma média: a maioria dos valores fica perto dela, valores muito grandes ou muito pequenos são raros. Desenhando, aparece uma <b>curva em sino</b>. Importante: aqui as probabilidades são <b>áreas sob a curva</b>. A área toda é 1 (= 100 %). A probabilidade de um valor exato (por ex. exatamente 170,000… cm) é 0 – pergunta-se sempre por intervalos.",
      h2: "As letras", bspSpalte: "no exemplo abaixo",
      zeichen: [
        ["X", "variável aleatória, por ex. a altura de uma pessoa escolhida ao acaso"],
        ["μ", "valor esperado (grego «mi»): o meio do sino, a média"],
        ["σ", "desvio padrão (grego «sigma»): a largura do sino – quanto maior σ, mais achatado e largo"],
        ["σ²", "variância (σ vezes σ)"],
        ["X ~ N(μ; σ²)", "«X segue a distribuição normal com média μ e desvio padrão σ»"],
        ["φ", "função densidade (phi minúsculo): a própria curva em sino; a altura não é uma probabilidade"],
        ["z = (x − μ) : σ", "padronizar: a quantos desvios padrão x está da média"],
        ["Φ(z)", "Phi maiúsculo: área à esquerda de z na normal padrão (μ = 0, σ = 1) – tabela ou calculadora (normalcdf)"],
        ["P(X ≤ x)", "probabilidade de no máximo x = área à esquerda de x = Φ(z)"],
        ["μ ± σ", "pontos de inflexão do sino: ali a curva muda de curvatura"]
      ],
      h3: "As regras de σ (para lembrar)", regeln: ["Cerca de 68,3 % dos valores estão entre μ − σ e μ + σ.", "Cerca de 95,4 % estão entre μ − 2σ e μ + 2σ.", "Cerca de 99,7 % estão entre μ − 3σ e μ + 3σ."], regelT: "Valores a mais de 3σ da média quase nunca aparecem.",
      h4: "Exemplo do dia a dia – passo a passo", wahl: "Exemplo:", wL: "valor x =", dL: "distância d =",
      f: {
        koerper: ["Altura", "A altura de mulheres adultas é aproximadamente normal com μ = 170 cm e σ = 8 cm. Que proporção mede no máximo {x} cm?", "Cerca de {P} das mulheres medem no máximo {x} cm.", "cm"],
        schoko: ["Barras de chocolate", "Uma máquina enche barras com μ = 100 g e σ = 2 g. Que proporção pesa menos de {x} g (leve demais)?", "Cerca de {P} das barras pesam menos de {x} g.", "g"],
        schulweg: ["Atrasado para a escola?", "Seu caminho para a escola leva em média μ = 20 min com σ = 4 min. Você tem {x} min. Qual é a probabilidade de demorar mais?", "Com probabilidade de cerca de {P} você demora mais de {x} min.", "min"],
        iq: ["Teste de QI", "O QI é normal com μ = 100 e σ = 15. Que proporção tem QI entre {a} e {b}?", "Cerca de {P} das pessoas têm QI entre {a} e {b}.", ""],
        lampe: ["Vida útil de uma lâmpada", "Uma lâmpada dura em média μ = 1000 h com σ = 80 h. Qual é a probabilidade de durar pelo menos {x} h?", "Cerca de {P} das lâmpadas duram pelo menos {x} h.", "h"]
      },
      s1: "1. O que é dado, o que se pergunta?", s2: "2. Padronizar", s2t: "{x} está {z} desvios padrão {r} a média.", ueber: "acima de", unter: "abaixo de", gleich: "exatamente em",
      s3: "3. Encontrar a área", s3h: "Procura-se a área à esquerda de x:", s3m: "Procura-se a área à direita de x – ou seja, 1 menos a área à esquerda:", s3z: "Procura-se a área entre a e b – área grande à esquerda de b menos área pequena à esquerda de a:",
      s4: "4. Resultado", bild: "A área colorida é a probabilidade procurada.", zurGlocke: "No separador «Curva em sino» você escolhe μ, σ e os limites livremente." }
  };
  function $(id){ return document.getElementById(id); }
  var L = "de"; try { L = localStorage.getItem("msMathLang") || "de"; } catch(e){}
  function E(){ return EK[L] || EK.de; }
  function tt(s, v){ for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  function komma(){ return !/^(en|zh|ja|ar)$/.test(L); }
  function z(x, d){ var r = Math.round(x * Math.pow(10, d)) / Math.pow(10, d), s = String(r); if(/e/.test(s)) s = r.toFixed(d); s = s.replace("-", "−"); return komma() ? s.replace(".", ",") : s; }
  function bdi(s){ return '<bdi dir="ltr">' + s + "</bdi>"; }
  function erfc(x){ var q = Math.abs(x), t = 1 / (1 + 0.5 * q); var r = t * Math.exp(-q * q - 1.26551223 + t * (1.00002368 + t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 + t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * 0.17087277))))))))); return x >= 0 ? r : 2 - r; }
  function Phi(v){ return 0.5 * erfc(-v / Math.SQRT2); }
  function el(n, a){ var e = document.createElementNS(NS, n); for(var k in a) e.setAttribute(k, a[k]); return e; }
  var fall = "koerper";

  var sec = document.createElement("section"); sec.id = "s_erkl";
  sec.innerHTML = '<div class="karte"><h2 id="neH1"></h2><p class="zeile" id="neIntro"></p></div>' +
    '<div class="karte"><h2 id="neH2"></h2><div class="ne-tab" id="neZeichen"></div></div>' +
    '<div class="karte"><h2 id="neH3"></h2><ul class="ne-liste" id="neRegeln"></ul><p class="zeile muted" id="neRegelT"></p></div>' +
    '<div class="karte"><h2 id="neH4"></h2><div class="reihe"><label><span id="neWahlL"></span> <select id="neWahl"></select></label></div><p class="zeile" id="neStory"></p>' +
    '<div class="regler"><label><span id="neWL"></span> <input type="range" id="neW"> <b id="neWW" dir="ltr"></b></label></div>' +
    '<svg id="neBild" viewBox="0 0 600 230"></svg><p class="zeile muted" id="neBildT"></p>' +
    '<ol class="ne-schritte" id="neSchritte"></ol><p class="zeile muted" id="neZurGlocke"></p></div>';
  var erste = $("s_glocke"); erste.parentNode.insertBefore(sec, erste);
  var css = document.createElement("style");
  css.textContent = ".ne-tab{display:grid;grid-template-columns:auto 1fr auto;border:1px solid #c9dcf2;border-radius:10px;overflow:hidden}" +
    ".ne-tab>div{padding:7px 10px;border-bottom:1px solid #e3edf9;font-size:16px;line-height:1.4}.ne-tab .ne-sym{font-weight:800;color:var(--blue);white-space:nowrap;background:#f4f8ff}" +
    ".ne-tab .ne-wert{color:#9d174d;font-weight:700;white-space:nowrap;text-align:end}.ne-tab .ne-kopf{font-size:13px;color:var(--muted);background:#f8fafc;font-weight:700}" +
    ".ne-liste{margin:6px 0;padding-inline-start:22px;font-size:17px;line-height:1.55}" +
    ".ne-schritte{list-style:none;padding:0;margin:10px 0}.ne-schritte>li{border-inline-start:4px solid var(--blue);padding:6px 12px;margin:10px 0;background:#f8fbff;border-radius:0 10px 10px 0}" +
    ".ne-schritte h3{margin:0 0 4px;font-size:17px;color:var(--blue)}.ne-schritte p{margin:4px 0;font-size:16.5px;line-height:1.55}.ne-formel{font-size:19px;font-weight:700;color:#1e3a8a}" +
    "#neBild{width:100%;height:auto;display:block;margin-top:6px}" +
    "@media (max-width:560px){.ne-tab{grid-template-columns:minmax(0,40%) minmax(0,1fr)}.ne-tab .ne-sym,.ne-tab .ne-wert{white-space:normal;overflow-wrap:anywhere}.ne-tab>div{overflow-wrap:anywhere;hyphens:auto;-webkit-hyphens:auto}.ne-tab .ne-kopf{display:none}.ne-tab .ne-wert{grid-column:2;text-align:start;padding-top:0}.ne-tab .ne-wert::before{content:attr(data-l) ': ';font-weight:400;color:var(--muted);font-size:14px}}";
  document.head.appendChild(css);

  function bild(F, a, b){
    var sv = $("neBild"); while(sv.lastChild) sv.removeChild(sv.lastChild);
    var x0 = 30, B = 540, yb = 185, H = 150, lo = F.mu - 4 * F.s, hi = F.mu + 4 * F.s;
    var X = function(v){ return x0 + (v - lo) / (hi - lo) * B; }, Y = function(v){ return yb - Math.exp(-0.5 * Math.pow((v - F.mu) / F.s, 2)) * H; };
    var pfad = function(u, w){ var d = "M" + X(u).toFixed(1) + " " + yb; for(var i = 0; i <= 120; i++){ var v = u + (w - u) * i / 120; d += " L" + X(v).toFixed(1) + " " + Y(v).toFixed(1); } return d + " L" + X(w).toFixed(1) + " " + yb + " Z"; };
    sv.appendChild(el("path", { d: pfad(Math.max(lo, a), Math.min(hi, b)), fill: "#f9a8d4", stroke: "none" }));
    var kurve = ""; for(var i = 0; i <= 200; i++){ var v = lo + (hi - lo) * i / 200; kurve += (i ? " L" : "M") + X(v).toFixed(1) + " " + Y(v).toFixed(1); }
    sv.appendChild(el("path", { d: kurve, fill: "none", stroke: "#9d174d", "stroke-width": 3 }));
    sv.appendChild(el("line", { x1: x0, y1: yb, x2: x0 + B, y2: yb, stroke: "#334155", "stroke-width": 1.5 }));
    for(var k = -3; k <= 3; k++){ var xv = X(F.mu + k * F.s); sv.appendChild(el("line", { x1: xv, y1: yb, x2: xv, y2: yb + 6, stroke: "#334155" }));
      var tx = el("text", { x: xv, y: yb + 22, "text-anchor": "middle", "font-size": 14, fill: "#475569", "font-family": "Arial,sans-serif" }); tx.textContent = z(F.mu + k * F.s, 1); sv.appendChild(tx);
      var tz = el("text", { x: xv, y: yb + 40, "text-anchor": "middle", "font-size": 12, fill: "#94a3b8", "font-family": "Arial,sans-serif" }); tz.textContent = k === 0 ? "μ" : (k > 0 ? "μ+" + k + "σ" : "μ−" + (-k) + "σ"); sv.appendChild(tz); }
    [a, b].forEach(function(g){ if(g > lo && g < hi){ sv.appendChild(el("line", { x1: X(g), y1: Y(g) - 8, x2: X(g), y2: yb, stroke: "#be185d", "stroke-width": 2.5 })); } });
  }
  function schritte(){
    var F = FAELLE[fall], T = E().f[fall], w = Number($("neW").value), ein = T[3] ? " " + T[3] : "";
    var a, b, P, h, v = {};
    if(F.art === "z"){ a = F.mu - w; b = F.mu + w; v = { a: z(a, 1), b: z(b, 1) }; $("neWW").textContent = "± " + z(w, 1); }
    else { if(F.art === "h"){ a = -Infinity; b = w; } else { a = w; b = Infinity; } v = { x: z(w, 1) }; $("neWW").textContent = z(w, 1) + ein; }
    $("neStory").textContent = tt(T[1], v);
    bild(F, a, b);
    var muS = z(F.mu, 1) + ein, sS = z(F.s, 1) + ein;
    h = "<li><h3>" + E().s1 + "</h3><p class=\"ne-formel\">" + bdi("μ = " + muS + ", σ = " + sS) + "</p><p class=\"ne-formel\">" + bdi(F.art === "h" ? "P(X ≤ " + z(w, 1) + ") = ?" : F.art === "m" ? "P(X ≥ " + z(w, 1) + ") = ?" : "P(" + z(a, 1) + " ≤ X ≤ " + z(b, 1) + ") = ?") + "</p></li>";
    var zs = function(x){ return (x - F.mu) / F.s; };
    var zeile = function(x){ var zz = zs(x); return "<p class=\"ne-formel\">" + bdi("z = (" + z(x, 1) + " − " + z(F.mu, 1) + ") : " + z(F.s, 1) + " = " + z(zz, 2)) + "</p><p>" + tt(E().s2t, { x: z(x, 1) + ein, z: z(Math.abs(zz), 2), r: zz > 1e-9 ? E().ueber : zz < -1e-9 ? E().unter : E().gleich }) + "</p>"; };
    h += "<li><h3>" + E().s2 + "</h3>" + (F.art === "z" ? zeile(a) + zeile(b) : zeile(w)) + "</li>";
    if(F.art === "h"){ P = Phi(zs(w)); h += "<li><h3>" + E().s3 + "</h3><p>" + E().s3h + "</p><p class=\"ne-formel\">" + bdi("P(X ≤ " + z(w, 1) + ") = Φ(" + z(zs(w), 2) + ") ≈ " + z(P, 4)) + "</p></li>"; }
    else if(F.art === "m"){ P = 1 - Phi(zs(w)); h += "<li><h3>" + E().s3 + "</h3><p>" + E().s3m + "</p><p class=\"ne-formel\">" + bdi("P(X ≥ " + z(w, 1) + ") = 1 − Φ(" + z(zs(w), 2) + ") ≈ 1 − " + z(Phi(zs(w)), 4) + " ≈ " + z(P, 4)) + "</p></li>"; }
    else { P = Phi(zs(b)) - Phi(zs(a)); h += "<li><h3>" + E().s3 + "</h3><p>" + E().s3z + "</p><p class=\"ne-formel\">" + bdi("Φ(" + z(zs(b), 2) + ") − Φ(" + z(zs(a), 2) + ") ≈ " + z(Phi(zs(b)), 4) + " − " + z(Phi(zs(a)), 4) + " ≈ " + z(P, 4)) + "</p></li>"; }
    v.P = z(P * 100, 1) + " %";
    h += "<li><h3>" + E().s4 + "</h3><p class=\"ne-formel\">" + tt(T[2], v) + "</p></li>";
    $("neSchritte").innerHTML = h;
    // Buchstaben-Tabelle mit Werten aus dem Beispiel
    var xw = F.art === "z" ? b : w, zz2 = zs(xw);
    var werte = [T[0], muS, sS, z(F.s * F.s, 1), "N(" + z(F.mu, 1) + "; " + z(F.s * F.s, 1) + ")", "", "z = " + z(zz2, 2), "Φ(" + z(zz2, 2) + ") ≈ " + z(Phi(zz2), 4), "P(X ≤ " + z(xw, 1) + ") ≈ " + z(Phi(zz2), 4), z(F.mu - F.s, 1) + " / " + z(F.mu + F.s, 1)];
    $("neZeichen").innerHTML = '<div class="ne-kopf"></div><div class="ne-kopf"></div><div class="ne-kopf">' + E().bspSpalte + "</div>" +
      E().zeichen.map(function(r, i){ return '<div class="ne-sym">' + bdi(r[0]) + "</div><div>" + r[1] + '</div><div class="ne-wert" data-l="' + (werte[i] ? E().bspSpalte : "") + '">' + bdi(werte[i]) + "</div>"; }).join("");
  }
  function texte(){
    var e = E();
    $("neH1").textContent = e.h1; $("neIntro").innerHTML = e.intro; $("neH2").textContent = e.h2; $("neH3").textContent = e.h3;
    $("neRegeln").innerHTML = e.regeln.map(function(r){ return "<li>" + r + "</li>"; }).join(""); $("neRegelT").textContent = e.regelT;
    $("neH4").textContent = e.h4; $("neWahlL").textContent = e.wahl; $("neBildT").textContent = e.bild; $("neZurGlocke").textContent = e.zurGlocke;
    $("neWL").textContent = FAELLE[fall].art === "z" ? e.dL : e.wL;
    $("neWahl").innerHTML = Object.keys(FAELLE).map(function(k){ return '<option value="' + k + '">' + e.f[k][0] + "</option>"; }).join(""); $("neWahl").value = fall;
    schritte();
  }
  function setzeFall(f){ fall = f; var F = FAELLE[f], r = $("neW"); r.min = F.min; r.max = F.max; r.step = F.step; r.value = F.w; $("neWL").textContent = F.art === "z" ? E().dL : E().wL; schritte(); }
  $("neWahl").addEventListener("change", function(){ setzeFall($("neWahl").value); });
  $("neW").addEventListener("input", schritte);
  window.MS_NV_ERKL = { sprache: function(l){ if(EK[l]){ L = l; texte(); } } };
  setzeFall(fall); texte();
})();
