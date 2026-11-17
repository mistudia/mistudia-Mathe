// /binomial/erklaer.js – Reiter „Erklärung“ (9 Sprachen): Worum geht es, alle Buchstaben,
// Voraussetzungen und ein Alltagsbeispiel Schritt für Schritt (Pfade, Pfadwahrscheinlichkeit, Formel).
(function(){
  "use strict";
  // Alltagsbeispiele: n, p, k (Start), p und q als Text (exakt), ob „Treffer“ etwas Schlechtes ist
  var FAELLE = {
    elfmeter: { n: 5, p: 0.8, k: 4 },
    mc: { n: 10, p: 0.25, k: 3 },
    samen: { n: 6, p: 0.9, k: 5 },
    wuerfel: { n: 4, p: 1 / 6, k: 2, pT: "1/6", qT: "5/6" },
    akku: { n: 20, p: 0.05, k: 1 }
  };
  var EK = {
    de: { tab: "Erklärung",
      h1: "Worum geht es?", intro: "Ein Zufallsversuch hat nur zwei mögliche Ausgänge: <b>Treffer</b> oder <b>Niete</b>. Er wird mehrmals gleich wiederholt, z. B. 5 Elfmeter, 10 geratene Testfragen, 6 Samen. Die Binomialverteilung beantwortet: <b>Wie wahrscheinlich sind genau k Treffer?</b> „Treffer“ heißt nur „das, was gezählt wird“ – das kann auch etwas Schlechtes sein, z. B. ein defektes Teil.",
      h2: "Die Buchstaben", bspSpalte: "im Beispiel unten",
      zeichen: [
        ["n", "Anzahl der Versuche (wie oft wiederholt wird)"],
        ["k", "Anzahl der Treffer, nach der gefragt wird (0, 1, 2, … bis n)"],
        ["p", "Trefferwahrscheinlichkeit bei einem einzelnen Versuch"],
        ["q = 1 − p", "Nietenwahrscheinlichkeit bei einem einzelnen Versuch"],
        ["X", "Zufallsgröße: zählt, wie viele Treffer es am Ende wirklich gibt"],
        ["P(X = k)", "Wahrscheinlichkeit für genau k Treffer"],
        ["(n über k)", "Binomialkoeffizient: Anzahl der Pfade im Baumdiagramm mit genau k Treffern (Taschenrechner: nCr)"],
        ["X ~ B(n; p)", "„X ist binomialverteilt mit den Werten n und p“"],
        ["μ = n · p", "Erwartungswert: so viele Treffer gibt es im Mittel"],
        ["σ = √(n · p · q)", "Standardabweichung: so weit streuen die Ergebnisse typischerweise um μ"],
        ["P(X ≤ k)", "kumuliert: höchstens k Treffer (alle Balken von 0 bis k zusammen)"]
      ],
      h3: "Wann ist etwas binomialverteilt?",
      bed: ["Jeder Versuch hat genau zwei Ausgänge (Treffer / Niete).", "Die Trefferwahrscheinlichkeit p ist bei jedem Versuch gleich.", "Die Versuche beeinflussen sich nicht (unabhängig).", "Die Anzahl n der Versuche steht vorher fest."],
      gegen: "Gegenbeispiel: Aus einer Tüte mit 3 roten und 2 grünen Gummibärchen werden 3 gegessen (ohne Zurücklegen). Nach jedem Griff ändert sich p – das ist <b>nicht</b> binomialverteilt.",
      h4: "Beispiel aus dem Alltag – Schritt für Schritt", wahl: "Beispiel:", kL: "Treffer k =",
      f: {
        elfmeter: ["Elfmeter", "Eine Spielerin verwandelt einen Elfmeter mit 80 % Wahrscheinlichkeit. Sie schießt 5 Elfmeter.", "Tor", "kein Tor"],
        mc: ["Raten beim Test", "Ein Test hat 10 Fragen mit je 4 Antworten, genau eine ist richtig. Du rätst bei allen.", "richtig geraten", "falsch"],
        samen: ["Samen säen", "Auf der Samentüte steht „Keimrate 90 %“. Du säst 6 Samen.", "Samen keimt", "keimt nicht"],
        wuerfel: ["Würfeln", "Du würfelst 4-mal. Gezählt werden die Sechsen.", "Sechs", "keine Sechs"],
        akku: ["Defekte Akkus", "5 % der Akkus einer Lieferung sind defekt. Du prüfst 20 Akkus. Gezählt werden die defekten – hier ist der „Treffer“ also etwas Schlechtes.", "defekt", "in Ordnung"]
      },
      s1: "1. Was ist hier n, p und k?", s1t: "n = {n} Versuche, p = {p} (Treffer = {t}), q = 1 − p = {q}, gefragt: genau k = {k} Treffer.",
      s2: "2. Wie viele Pfade haben genau {k} Treffer?", s2t: "(n über k) = ({n} über {k}) = {c} Pfade.", alle: "Hier sind alle {c} Pfade (✓ = {t}, ✗ = {nt}):", zuviel: "Das sind zu viele zum Aufschreiben – ein Pfad sieht z. B. so aus:",
      s3: "3. Wie wahrscheinlich ist ein einzelner Pfad?", s3t: "Jeder dieser Pfade hat {k}-mal ✓ (je p = {p}) und {nk}-mal ✗ (je q = {q}). Pfadregel – alles malnehmen:",
      s4: "4. Alle Pfade zusammen (Summenregel)", s4t: "Alle {c} Pfade sind gleich wahrscheinlich, also:",
      s5: "Und „mindestens ein Treffer“?", s5t: "Am schnellsten über das Gegenereignis „kein Treffer“:",
      zurVert: "Im Reiter „Verteilung“ siehst du alle Werte als Balken." },
    en: { tab: "Explanation",
      h1: "What is it about?", intro: "A random trial has only two possible results: <b>success</b> or <b>failure</b>. It is repeated several times in the same way, e.g. 5 penalties, 10 guessed test questions, 6 seeds. The binomial distribution answers: <b>how likely are exactly k successes?</b> “Success” only means “the thing being counted” – it can also be something bad, e.g. a faulty part.",
      h2: "The letters", bspSpalte: "in the example below",
      zeichen: [
        ["n", "number of trials (how often it is repeated)"],
        ["k", "number of successes you ask about (0, 1, 2, … up to n)"],
        ["p", "probability of success in one single trial"],
        ["q = 1 − p", "probability of failure in one single trial"],
        ["X", "random variable: counts how many successes there really are in the end"],
        ["P(X = k)", "probability of exactly k successes"],
        ["(n choose k)", "binomial coefficient: number of paths in the tree diagram with exactly k successes (calculator: nCr)"],
        ["X ~ B(n; p)", "“X is binomially distributed with n and p”"],
        ["μ = n · p", "expected value: the average number of successes"],
        ["σ = √(n · p · q)", "standard deviation: how far the results typically spread around μ"],
        ["P(X ≤ k)", "cumulative: at most k successes (all bars from 0 to k together)"]
      ],
      h3: "When is something binomially distributed?",
      bed: ["Each trial has exactly two results (success / failure).", "The probability of success p is the same in every trial.", "The trials don’t influence each other (independent).", "The number of trials n is fixed in advance."],
      gegen: "Counter-example: from a bag with 3 red and 2 green jelly bears, 3 are eaten (without replacement). After every grab p changes – that is <b>not</b> binomially distributed.",
      h4: "Everyday example – step by step", wahl: "Example:", kL: "successes k =",
      f: {
        elfmeter: ["Penalties", "A player scores a penalty with a probability of 80%. She takes 5 penalties.", "goal", "no goal"],
        mc: ["Guessing in a test", "A test has 10 questions with 4 answers each; exactly one is right. You guess all of them.", "guessed right", "wrong"],
        samen: ["Sowing seeds", "The seed packet says “germination rate 90%”. You sow 6 seeds.", "seed sprouts", "doesn’t sprout"],
        wuerfel: ["Rolling a die", "You roll a die 4 times. The sixes are counted.", "six", "no six"],
        akku: ["Faulty batteries", "5% of the batteries in a delivery are faulty. You test 20 batteries. The faulty ones are counted – so here a “success” is something bad.", "faulty", "OK"]
      },
      s1: "1. What are n, p and k here?", s1t: "n = {n} trials, p = {p} (success = {t}), q = 1 − p = {q}, question: exactly k = {k} successes.",
      s2: "2. How many paths have exactly {k} successes?", s2t: "(n choose k) = ({n} choose {k}) = {c} paths.", alle: "Here are all {c} paths (✓ = {t}, ✗ = {nt}):", zuviel: "That’s too many to write down – one path looks like this:",
      s3: "3. How likely is one single path?", s3t: "Each of these paths has {k} × ✓ (each p = {p}) and {nk} × ✗ (each q = {q}). Path rule – multiply everything:",
      s4: "4. All paths together (sum rule)", s4t: "All {c} paths are equally likely, so:",
      s5: "And “at least one success”?", s5t: "Quickest via the complementary event “no success”:",
      zurVert: "In the “Distribution” tab you see all values as bars." },
    es: { tab: "Explicación",
      h1: "¿De qué se trata?", intro: "Un experimento aleatorio tiene solo dos resultados posibles: <b>éxito</b> o <b>fracaso</b>. Se repite varias veces igual, p. ej. 5 penaltis, 10 preguntas adivinadas, 6 semillas. La distribución binomial responde: <b>¿qué probabilidad hay de exactamente k éxitos?</b> «Éxito» solo significa «lo que se cuenta»; también puede ser algo malo, p. ej. una pieza defectuosa.",
      h2: "Las letras", bspSpalte: "en el ejemplo de abajo",
      zeichen: [
        ["n", "número de pruebas (cuántas veces se repite)"],
        ["k", "número de éxitos por el que se pregunta (0, 1, 2, … hasta n)"],
        ["p", "probabilidad de éxito en una sola prueba"],
        ["q = 1 − p", "probabilidad de fracaso en una sola prueba"],
        ["X", "variable aleatoria: cuenta cuántos éxitos hay realmente al final"],
        ["P(X = k)", "probabilidad de exactamente k éxitos"],
        ["(n sobre k)", "número combinatorio: cantidad de caminos del diagrama de árbol con exactamente k éxitos (calculadora: nCr)"],
        ["X ~ B(n; p)", "«X sigue una distribución binomial con n y p»"],
        ["μ = n · p", "esperanza: número medio de éxitos"],
        ["σ = √(n · p · q)", "desviación típica: cuánto se alejan normalmente los resultados de μ"],
        ["P(X ≤ k)", "acumulada: como mucho k éxitos (todas las barras de 0 a k juntas)"]
      ],
      h3: "¿Cuándo es algo binomial?",
      bed: ["Cada prueba tiene exactamente dos resultados (éxito / fracaso).", "La probabilidad de éxito p es igual en cada prueba.", "Las pruebas no se influyen (son independientes).", "El número de pruebas n está fijado de antemano."],
      gegen: "Contraejemplo: de una bolsa con 3 gominolas rojas y 2 verdes se comen 3 (sin reemplazamiento). Tras cada una cambia p: eso <b>no</b> es binomial.",
      h4: "Ejemplo de la vida real, paso a paso", wahl: "Ejemplo:", kL: "éxitos k =",
      f: {
        elfmeter: ["Penaltis", "Una jugadora marca un penalti con un 80 % de probabilidad. Tira 5 penaltis.", "gol", "fallo"],
        mc: ["Adivinar en un examen", "Un examen tiene 10 preguntas con 4 respuestas, solo una es correcta. Adivinas todas.", "acierto", "error"],
        samen: ["Sembrar semillas", "En el sobre pone «germinación 90 %». Siembras 6 semillas.", "germina", "no germina"],
        wuerfel: ["Lanzar un dado", "Lanzas un dado 4 veces. Se cuentan los seises.", "seis", "no es seis"],
        akku: ["Baterías defectuosas", "El 5 % de las baterías de un envío es defectuoso. Revisas 20. Se cuentan las defectuosas: aquí el «éxito» es algo malo.", "defectuosa", "bien"]
      },
      s1: "1. ¿Qué son aquí n, p y k?", s1t: "n = {n} pruebas, p = {p} (éxito = {t}), q = 1 − p = {q}; se pregunta por exactamente k = {k} éxitos.",
      s2: "2. ¿Cuántos caminos tienen exactamente {k} éxitos?", s2t: "(n sobre k) = ({n} sobre {k}) = {c} caminos.", alle: "Aquí están los {c} caminos (✓ = {t}, ✗ = {nt}):", zuviel: "Son demasiados para escribirlos; un camino es, por ejemplo:",
      s3: "3. ¿Qué probabilidad tiene un solo camino?", s3t: "Cada camino tiene {k} veces ✓ (cada una p = {p}) y {nk} veces ✗ (cada una q = {q}). Regla del producto:",
      s4: "4. Todos los caminos juntos (regla de la suma)", s4t: "Los {c} caminos son igual de probables, así que:",
      s5: "¿Y «al menos un éxito»?", s5t: "Lo más rápido es el suceso contrario «ningún éxito»:",
      zurVert: "En la pestaña «Distribución» ves todos los valores como barras." },
    zh: { tab: "讲解",
      h1: "讲的是什么？", intro: "一次随机试验只有两种结果：<b>成功</b>或<b>失败</b>。它以同样的方式重复多次，例如罚 5 个点球、猜 10 道题、种 6 粒种子。二项分布回答的问题是：<b>恰好 k 次成功的概率有多大？</b>“成功”只表示“被计数的那种结果”，也可以是坏事，例如次品。",
      h2: "这些字母", bspSpalte: "下面例子中的值",
      zeichen: [
        ["n", "试验次数（重复多少次）"],
        ["k", "所问的成功次数（0, 1, 2, … 到 n）"],
        ["p", "一次试验中成功的概率"],
        ["q = 1 − p", "一次试验中失败的概率"],
        ["X", "随机变量：数最后实际成功了几次"],
        ["P(X = k)", "恰好 k 次成功的概率"],
        ["C(n, k)", "组合数：树状图中恰好 k 次成功的路径条数（计算器：nCr）"],
        ["X ~ B(n; p)", "“X 服从参数为 n 和 p 的二项分布”"],
        ["μ = n · p", "期望：平均成功次数"],
        ["σ = √(n · p · q)", "标准差：结果通常偏离 μ 多远"],
        ["P(X ≤ k)", "累积概率：最多 k 次成功（0 到 k 的柱子加起来）"]
      ],
      h3: "什么情况是二项分布？",
      bed: ["每次试验恰好有两种结果（成功 / 失败）。", "每次试验成功的概率 p 都相同。", "各次试验互不影响（独立）。", "试验次数 n 事先确定。"],
      gegen: "反例：袋子里有 3 颗红色和 2 颗绿色软糖，吃掉 3 颗（不放回）。每拿一次 p 都会变——这<b>不是</b>二项分布。",
      h4: "生活中的例子——一步一步", wahl: "例子：", kL: "成功次数 k =",
      f: {
        elfmeter: ["罚点球", "一名球员罚点球的命中率是 80 %。她罚 5 个点球。", "进球", "没进"],
        mc: ["考试瞎猜", "考试有 10 道题，每题 4 个选项，只有一个正确。你全部瞎猜。", "猜对", "猜错"],
        samen: ["播种", "种子袋上写着“发芽率 90 %”。你种 6 粒种子。", "发芽", "不发芽"],
        wuerfel: ["掷骰子", "你掷 4 次骰子，数出现 6 的次数。", "6 点", "不是 6"],
        akku: ["次品电池", "一批电池中 5 % 是次品。你检查 20 个，数次品——这里的“成功”是坏事。", "次品", "合格"]
      },
      s1: "1. 这里的 n、p、k 是什么？", s1t: "n = {n} 次试验，p = {p}（成功 = {t}），q = 1 − p = {q}，问：恰好 k = {k} 次成功。",
      s2: "2. 有几条路径恰好有 {k} 次成功？", s2t: "C(n, k) = C({n}, {k}) = {c} 条路径。", alle: "这里是全部 {c} 条路径（✓ = {t}，✗ = {nt}）：", zuviel: "太多了写不下——其中一条路径是这样的：",
      s3: "3. 一条路径的概率是多少？", s3t: "每条路径有 {k} 个 ✓（每个 p = {p}）和 {nk} 个 ✗（每个 q = {q}）。乘法法则——全部相乘：",
      s4: "4. 所有路径加起来（加法法则）", s4t: "{c} 条路径的概率都一样，所以：",
      s5: "那“至少一次成功”呢？", s5t: "最快的方法是用对立事件“一次也没成功”：",
      zurVert: "在“分布”页可以看到所有值的柱状图。" },
    fr: { tab: "Explication",
      h1: "De quoi s’agit-il ?", intro: "Une expérience aléatoire n’a que deux issues possibles : <b>succès</b> ou <b>échec</b>. On la répète plusieurs fois de la même façon, p. ex. 5 penaltys, 10 questions devinées, 6 graines. La loi binomiale répond à la question : <b>quelle est la probabilité d’avoir exactement k succès ?</b> « Succès » veut seulement dire « ce que l’on compte » – cela peut aussi être quelque chose de mauvais, p. ex. une pièce défectueuse.",
      h2: "Les lettres", bspSpalte: "dans l’exemple ci-dessous",
      zeichen: [
        ["n", "nombre de répétitions (épreuves)"],
        ["k", "nombre de succès demandé (0, 1, 2, … jusqu’à n)"],
        ["p", "probabilité de succès lors d’une seule épreuve"],
        ["q = 1 − p", "probabilité d’échec lors d’une seule épreuve"],
        ["X", "variable aléatoire : compte combien de succès il y a vraiment à la fin"],
        ["P(X = k)", "probabilité d’exactement k succès"],
        ["(k parmi n)", "coefficient binomial : nombre de chemins de l’arbre avec exactement k succès (calculatrice : nCr)"],
        ["X ~ B(n ; p)", "« X suit la loi binomiale de paramètres n et p »"],
        ["μ = n · p", "espérance : nombre moyen de succès"],
        ["σ = √(n · p · q)", "écart type : à quelle distance de μ se trouvent typiquement les résultats"],
        ["P(X ≤ k)", "cumulée : au plus k succès (toutes les barres de 0 à k ensemble)"]
      ],
      h3: "Quand une situation suit-elle une loi binomiale ?",
      bed: ["Chaque épreuve a exactement deux issues (succès / échec).", "La probabilité de succès p est la même à chaque épreuve.", "Les épreuves ne s’influencent pas (indépendantes).", "Le nombre d’épreuves n est fixé à l’avance."],
      gegen: "Contre-exemple : d’un sachet avec 3 oursons rouges et 2 verts, on en mange 3 (sans remise). Après chaque tirage p change – ce n’est <b>pas</b> une loi binomiale.",
      h4: "Exemple de la vie courante, étape par étape", wahl: "Exemple :", kL: "succès k =",
      f: {
        elfmeter: ["Penaltys", "Une joueuse marque un penalty avec une probabilité de 80 %. Elle tire 5 penaltys.", "but", "raté"],
        mc: ["Deviner à un QCM", "Un QCM a 10 questions à 4 réponses, une seule est juste. Tu devines tout.", "bonne réponse", "fausse"],
        samen: ["Semer des graines", "Sur le sachet : « taux de germination 90 % ». Tu sèmes 6 graines.", "la graine germe", "ne germe pas"],
        wuerfel: ["Lancer un dé", "Tu lances un dé 4 fois. On compte les six.", "six", "pas six"],
        akku: ["Batteries défectueuses", "5 % des batteries d’une livraison sont défectueuses. Tu en testes 20. On compte les défectueuses – ici le « succès » est donc quelque chose de mauvais.", "défectueuse", "bonne"]
      },
      s1: "1. Que valent n, p et k ici ?", s1t: "n = {n} épreuves, p = {p} (succès = {t}), q = 1 − p = {q} ; question : exactement k = {k} succès.",
      s2: "2. Combien de chemins ont exactement {k} succès ?", s2t: "(k parmi n) = ({k} parmi {n}) = {c} chemins.", alle: "Voici les {c} chemins (✓ = {t}, ✗ = {nt}) :", zuviel: "C’est trop pour les écrire tous – un chemin ressemble par exemple à ceci :",
      s3: "3. Quelle est la probabilité d’un seul chemin ?", s3t: "Chaque chemin a {k} fois ✓ (chacun p = {p}) et {nk} fois ✗ (chacun q = {q}). Règle du produit – on multiplie tout :",
      s4: "4. Tous les chemins ensemble (règle de la somme)", s4t: "Les {c} chemins ont la même probabilité, donc :",
      s5: "Et « au moins un succès » ?", s5t: "Le plus rapide : l’événement contraire « aucun succès » :",
      zurVert: "Dans l’onglet « Loi », tu vois toutes les valeurs sous forme de barres." },
    ru: { tab: "Объяснение",
      h1: "О чём речь?", intro: "У случайного опыта только два исхода: <b>успех</b> или <b>неудача</b>. Его повторяют несколько раз одинаково, например 5 пенальти, 10 угаданных вопросов, 6 семян. Биномиальное распределение отвечает на вопрос: <b>какова вероятность ровно k успехов?</b> «Успех» значит только «то, что считаем», – это может быть и что-то плохое, например бракованная деталь.",
      h2: "Буквы", bspSpalte: "в примере ниже",
      zeichen: [
        ["n", "число испытаний (сколько раз повторяют)"],
        ["k", "число успехов, о котором спрашивают (0, 1, 2, … до n)"],
        ["p", "вероятность успеха в одном испытании"],
        ["q = 1 − p", "вероятность неудачи в одном испытании"],
        ["X", "случайная величина: считает, сколько успехов получилось на самом деле"],
        ["P(X = k)", "вероятность ровно k успехов"],
        ["C(n, k)", "биномиальный коэффициент: число путей в дереве ровно с k успехами (калькулятор: nCr)"],
        ["X ~ B(n; p)", "«X распределена по биномиальному закону с n и p»"],
        ["μ = n · p", "математическое ожидание: среднее число успехов"],
        ["σ = √(n · p · q)", "стандартное отклонение: насколько обычно результаты отклоняются от μ"],
        ["P(X ≤ k)", "накопленная: не больше k успехов (все столбцы от 0 до k вместе)"]
      ],
      h3: "Когда распределение биномиальное?",
      bed: ["У каждого испытания ровно два исхода (успех / неудача).", "Вероятность успеха p в каждом испытании одинакова.", "Испытания не влияют друг на друга (независимы).", "Число испытаний n известно заранее."],
      gegen: "Контрпример: из пакета с 3 красными и 2 зелёными мармеладками съедают 3 (без возвращения). После каждой p меняется – это <b>не</b> биномиальное распределение.",
      h4: "Пример из жизни – шаг за шагом", wahl: "Пример:", kL: "успехов k =",
      f: {
        elfmeter: ["Пенальти", "Футболистка забивает пенальти с вероятностью 80 %. Она бьёт 5 пенальти.", "гол", "мимо"],
        mc: ["Угадывание на тесте", "В тесте 10 вопросов по 4 ответа, верный только один. Ты угадываешь все.", "угадал", "ошибка"],
        samen: ["Посев семян", "На пакетике написано «всхожесть 90 %». Ты сеешь 6 семян.", "семя взошло", "не взошло"],
        wuerfel: ["Бросаем кубик", "Ты бросаешь кубик 4 раза. Считаем шестёрки.", "шестёрка", "не шестёрка"],
        akku: ["Бракованные аккумуляторы", "5 % аккумуляторов в партии бракованные. Ты проверяешь 20. Считаем бракованные – здесь «успех» означает что-то плохое.", "брак", "исправен"]
      },
      s1: "1. Что здесь n, p и k?", s1t: "n = {n} испытаний, p = {p} (успех = {t}), q = 1 − p = {q}; вопрос: ровно k = {k} успехов.",
      s2: "2. Сколько путей имеют ровно {k} успехов?", s2t: "C(n, k) = C({n}, {k}) = {c} путей.", alle: "Вот все {c} путей (✓ = {t}, ✗ = {nt}):", zuviel: "Их слишком много, чтобы выписать все, – один путь выглядит так:",
      s3: "3. Какова вероятность одного пути?", s3t: "В каждом пути {k} раз ✓ (каждый p = {p}) и {nk} раз ✗ (каждый q = {q}). Правило умножения:",
      s4: "4. Все пути вместе (правило сложения)", s4t: "Все {c} путей одинаково вероятны, поэтому:",
      s5: "А «хотя бы один успех»?", s5t: "Быстрее всего через противоположное событие «ни одного успеха»:",
      zurVert: "На вкладке «Распределение» все значения видны в виде столбцов." },
    ar: { tab: "الشرح",
      h1: "ما الموضوع؟", intro: "لتجربة عشوائية نتيجتان فقط: <b>نجاح</b> أو <b>إخفاق</b>. تُكرر عدة مرات بالطريقة نفسها، مثل 5 ركلات جزاء أو 10 أسئلة بالتخمين أو 6 بذور. يجيب التوزيع ذو الحدين عن السؤال: <b>ما احتمال الحصول على k نجاحات بالضبط؟</b> «النجاح» يعني فقط «ما نعدّه»، وقد يكون شيئًا سيئًا مثل قطعة معيبة.",
      h2: "الحروف", bspSpalte: "في المثال أدناه",
      zeichen: [
        ["n", "عدد المحاولات (كم مرة تُكرر التجربة)"],
        ["k", "عدد النجاحات المسؤول عنه (0، 1، 2، … حتى n)"],
        ["p", "احتمال النجاح في محاولة واحدة"],
        ["q = 1 − p", "احتمال الإخفاق في محاولة واحدة"],
        ["X", "متغير عشوائي: يعدّ كم نجاحًا حدث فعلًا في النهاية"],
        ["P(X = k)", "احتمال k نجاحات بالضبط"],
        ["C(n, k)", "معامل ذو الحدين: عدد المسارات في المخطط الشجري التي فيها k نجاحات بالضبط (الآلة الحاسبة: nCr)"],
        ["X ~ B(n; p)", "«X يتبع التوزيع ذا الحدين بالقيمتين n و p»"],
        ["μ = n · p", "القيمة المتوقعة: متوسط عدد النجاحات"],
        ["σ = √(n · p · q)", "الانحراف المعياري: كم تبتعد النتائج عادة عن μ"],
        ["P(X ≤ k)", "تراكمي: على الأكثر k نجاحات (كل الأعمدة من 0 إلى k معًا)"]
      ],
      h3: "متى يكون التوزيع ذا حدين؟",
      bed: ["لكل محاولة نتيجتان بالضبط (نجاح / إخفاق).", "احتمال النجاح p نفسه في كل محاولة.", "المحاولات لا تؤثر في بعضها (مستقلة).", "عدد المحاولات n معروف مسبقًا."],
      gegen: "مثال مضاد: من كيس فيه 3 حلويات حمراء و2 خضراء تؤكل 3 (دون إرجاع). بعد كل سحبة يتغير p – هذا <b>ليس</b> توزيعًا ذا حدين.",
      h4: "مثال من الحياة اليومية خطوة خطوة", wahl: "المثال:", kL: "النجاحات k =",
      f: {
        elfmeter: ["ركلات الجزاء", "لاعبة تسجل ركلة الجزاء باحتمال 80 %. تسدد 5 ركلات.", "هدف", "لا هدف"],
        mc: ["التخمين في اختبار", "في اختبار 10 أسئلة لكل منها 4 إجابات، واحدة فقط صحيحة. أنت تخمّن في كل الأسئلة.", "تخمين صحيح", "خطأ"],
        samen: ["زراعة البذور", "على كيس البذور: «نسبة الإنبات 90 %». تزرع 6 بذور.", "البذرة تنبت", "لا تنبت"],
        wuerfel: ["رمي النرد", "ترمي حجر النرد 4 مرات. نعدّ الستات.", "ستة", "ليست ستة"],
        akku: ["بطاريات معيبة", "5 % من بطاريات شحنة معيبة. تفحص 20 بطارية. نعدّ المعيبة – هنا «النجاح» شيء سيئ.", "معيبة", "سليمة"]
      },
      s1: "1. ما n و p و k هنا؟", s1t: "n = {n} محاولات، p = {p} (النجاح = {t})، q = 1 − p = {q}، والسؤال: k = {k} نجاحات بالضبط.",
      s2: "2. كم مسارًا فيه {k} نجاحات بالضبط؟", s2t: "C(n, k) = C({n}, {k}) = {c} مسارات.", alle: "هذه كل المسارات وعددها {c} (✓ = {t}، ✗ = {nt}):", zuviel: "عددها كبير جدًا لكتابتها كلها – مسار واحد يبدو هكذا:",
      s3: "3. ما احتمال مسار واحد؟", s3t: "في كل مسار {k} مرات ✓ (كل منها p = {p}) و{nk} مرات ✗ (كل منها q = {q}). قاعدة الضرب:",
      s4: "4. كل المسارات معًا (قاعدة الجمع)", s4t: "كل المسارات الـ {c} متساوية الاحتمال، إذن:",
      s5: "وماذا عن «نجاح واحد على الأقل»؟", s5t: "الأسرع عبر الحدث المتمم «لا نجاح»:",
      zurVert: "في تبويب «التوزيع» ترى كل القيم كأعمدة." },
    ja: { tab: "説明",
      h1: "どんな話？", intro: "結果が<b>成功</b>か<b>失敗</b>の 2 つしかない試行を、同じやり方で何回かくり返す（例：PK を 5 本、テストを 10 問あてずっぽう、種を 6 つまく）。二項分布が答えるのは<b>「ちょうど k 回成功する確率は？」</b>ということ。「成功」は「数えるもの」という意味だけで、不良品のように悪いことでもかまわない。",
      h2: "文字の意味", bspSpalte: "下の例での値",
      zeichen: [
        ["n", "試行の回数（何回くり返すか）"],
        ["k", "たずねている成功の回数（0, 1, 2, … n まで）"],
        ["p", "1 回の試行で成功する確率"],
        ["q = 1 − p", "1 回の試行で失敗する確率"],
        ["X", "確率変数：最後に実際に何回成功したかを数える"],
        ["P(X = k)", "ちょうど k 回成功する確率"],
        ["nCk", "二項係数：樹形図でちょうど k 回成功する道すじの数（電卓：nCr）"],
        ["X ~ B(n; p)", "「X は n と p の二項分布に従う」"],
        ["μ = n · p", "期待値：平均の成功回数"],
        ["σ = √(n · p · q)", "標準偏差：結果がふつう μ からどれくらいちらばるか"],
        ["P(X ≤ k)", "累積：成功が k 回以下（0 から k までの棒を全部たす）"]
      ],
      h3: "二項分布になるのはどんなとき？",
      bed: ["どの試行も結果は 2 つだけ（成功 / 失敗）。", "成功の確率 p はどの試行でも同じ。", "試行どうしは影響しあわない（独立）。", "試行の回数 n は前もって決まっている。"],
      gegen: "反例：赤 3 つ、緑 2 つのグミが入った袋から 3 つ食べる（もどさない）。1 つ取るたびに p が変わるので、二項分布<b>ではない</b>。",
      h4: "身近な例――1 歩ずつ", wahl: "例：", kL: "成功 k =",
      f: {
        elfmeter: ["PK", "ある選手の PK 成功率は 80 %。PK を 5 本けります。", "ゴール", "失敗"],
        mc: ["テストであてずっぽう", "4 択の問題が 10 問。正解は 1 つだけ。全部あてずっぽうで答える。", "正解", "不正解"],
        samen: ["種まき", "種の袋に「発芽率 90 %」。種を 6 つまく。", "発芽する", "発芽しない"],
        wuerfel: ["さいころ", "さいころを 4 回投げて、6 の目の回数を数える。", "6 の目", "6 以外"],
        akku: ["不良品の電池", "入荷した電池の 5 % は不良品。20 個を調べて不良品を数える――ここでの「成功」は悪いこと。", "不良品", "良品"]
      },
      s1: "1. n、p、k はいくつ？", s1t: "n = {n} 回、p = {p}（成功 = {t}）、q = 1 − p = {q}、たずねているのはちょうど k = {k} 回の成功。",
      s2: "2. ちょうど {k} 回成功する道すじはいくつ？", s2t: "nCk = {n}C{k} = {c} 通り。", alle: "{c} 通り全部（✓ = {t}、✗ = {nt}）：", zuviel: "多すぎて書ききれない――たとえば 1 つの道すじはこう：",
      s3: "3. 1 つの道すじの確率は？", s3t: "どの道すじも ✓ が {k} 回（それぞれ p = {p}）、✗ が {nk} 回（それぞれ q = {q}）。積の法則――全部かける：",
      s4: "4. 道すじを全部たす（和の法則）", s4t: "{c} 通りの道すじはどれも同じ確率なので：",
      s5: "「少なくとも 1 回成功」は？", s5t: "余事象「1 回も成功しない」を使うのがいちばん早い：",
      zurVert: "「分布」タブでは全部の値を棒グラフで見られるよ。" },
    pt: { tab: "Explicação",
      h1: "Do que se trata?", intro: "Uma experiência aleatória tem só dois resultados possíveis: <b>sucesso</b> ou <b>insucesso</b>. Ela é repetida várias vezes da mesma forma, por ex. 5 pênaltis, 10 perguntas chutadas, 6 sementes. A distribuição binomial responde: <b>qual é a probabilidade de exatamente k sucessos?</b> «Sucesso» significa só «aquilo que se conta» – pode até ser algo ruim, por ex. uma peça com defeito.",
      h2: "As letras", bspSpalte: "no exemplo abaixo",
      zeichen: [
        ["n", "número de repetições (provas)"],
        ["k", "número de sucessos perguntado (0, 1, 2, … até n)"],
        ["p", "probabilidade de sucesso numa única prova"],
        ["q = 1 − p", "probabilidade de insucesso numa única prova"],
        ["X", "variável aleatória: conta quantos sucessos há realmente no final"],
        ["P(X = k)", "probabilidade de exatamente k sucessos"],
        ["C(n, k)", "coeficiente binomial: número de caminhos do diagrama em árvore com exatamente k sucessos (calculadora: nCr)"],
        ["X ~ B(n; p)", "«X segue a distribuição binomial com n e p»"],
        ["μ = n · p", "valor esperado: número médio de sucessos"],
        ["σ = √(n · p · q)", "desvio padrão: quanto os resultados costumam se afastar de μ"],
        ["P(X ≤ k)", "acumulada: no máximo k sucessos (todas as barras de 0 a k juntas)"]
      ],
      h3: "Quando algo é binomial?",
      bed: ["Cada prova tem exatamente dois resultados (sucesso / insucesso).", "A probabilidade de sucesso p é igual em todas as provas.", "As provas não se influenciam (independentes).", "O número de provas n é fixado antes."],
      gegen: "Contraexemplo: de um saco com 3 balas de goma vermelhas e 2 verdes, comem-se 3 (sem reposição). A cada retirada p muda – isso <b>não</b> é binomial.",
      h4: "Exemplo do dia a dia – passo a passo", wahl: "Exemplo:", kL: "sucessos k =",
      f: {
        elfmeter: ["Pênaltis", "Uma jogadora converte um pênalti com 80 % de probabilidade. Ela cobra 5 pênaltis.", "gol", "erro"],
        mc: ["Chutar na prova", "Uma prova tem 10 questões com 4 alternativas, só uma certa. Você chuta todas.", "acerto", "erro"],
        samen: ["Plantar sementes", "No pacote está escrito «germinação 90 %». Você planta 6 sementes.", "germina", "não germina"],
        wuerfel: ["Jogar um dado", "Você joga um dado 4 vezes. Contam-se os seis.", "seis", "não é seis"],
        akku: ["Baterias com defeito", "5 % das baterias de uma remessa têm defeito. Você testa 20. Contam-se as defeituosas – aqui o «sucesso» é algo ruim.", "com defeito", "boa"]
      },
      s1: "1. O que são n, p e k aqui?", s1t: "n = {n} provas, p = {p} (sucesso = {t}), q = 1 − p = {q}; pergunta: exatamente k = {k} sucessos.",
      s2: "2. Quantos caminhos têm exatamente {k} sucessos?", s2t: "C(n, k) = C({n}, {k}) = {c} caminhos.", alle: "Aqui estão os {c} caminhos (✓ = {t}, ✗ = {nt}):", zuviel: "São caminhos demais para escrever – um deles é assim:",
      s3: "3. Qual é a probabilidade de um único caminho?", s3t: "Cada caminho tem {k} vezes ✓ (cada p = {p}) e {nk} vezes ✗ (cada q = {q}). Regra do produto – multiplica-se tudo:",
      s4: "4. Todos os caminhos juntos (regra da soma)", s4t: "Os {c} caminhos são igualmente prováveis, então:",
      s5: "E «pelo menos um sucesso»?", s5t: "O mais rápido é pelo acontecimento contrário «nenhum sucesso»:",
      zurVert: "No separador «Distribuição» você vê todos os valores como barras." }
  };
  function $(id){ return document.getElementById(id); }
  var L = "de"; try { L = localStorage.getItem("msMathLang") || "de"; } catch(e){}
  function E(){ return EK[L] || EK.de; }
  function tt(s, v){ for(var x in v) s = s.split("{" + x + "}").join(v[x]); return s; }
  function komma(){ return !/^(en|zh|ja|ar)$/.test(L); }
  function z(x, d){ var r = Math.round(x * Math.pow(10, d)) / Math.pow(10, d), s = String(r); if(/e/.test(s)) s = r.toFixed(d); return komma() ? s.replace(".", ",") : s; }
  function bdi(s){ return '<bdi dir="ltr">' + s + "</bdi>"; }
  function binko(n, k){ var r = 1; for(var i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); }
  // alle Folgen der Länge n mit genau k Treffern (für kleine n)
  function pfade(n, k){ var R = []; (function geh(s, t){ if(s.length === n){ if(t === k) R.push(s); return; } if(t < k) geh(s + "1", t + 1); if(s.length - t < n - k) geh(s + "0", t); })("", 0); return R; }
  function kette(s){ return '<span class="be-pfad">' + s.split("").map(function(c){ return c === "1" ? '<b class="be-t">✓</b>' : '<b class="be-n">✗</b>'; }).join("") + "</span>"; }
  function pot(b, e){ return b + "<sup>" + e + "</sup>"; }
  var fall = "elfmeter";

  var sec = document.createElement("section"); sec.id = "s_erkl";
  sec.innerHTML = '<div class="karte"><h2 id="beH1"></h2><p class="zeile" id="beIntro"></p></div>' +
    '<div class="karte"><h2 id="beH2"></h2><div class="be-tab" id="beZeichen"></div></div>' +
    '<div class="karte"><h2 id="beH3"></h2><ul class="be-liste" id="beBed"></ul><p class="zeile muted" id="beGegen"></p></div>' +
    '<div class="karte"><h2 id="beH4"></h2><div class="reihe"><label><span id="beWahlL"></span> <select id="beWahl"></select></label></div><p class="zeile" id="beStory"></p>' +
    '<div class="regler"><label><span id="beKL"></span> <input type="range" id="beK" min="0" max="5" step="1"> <b id="beKW"></b></label></div>' +
    '<ol class="be-schritte" id="beSchritte"></ol><p class="zeile muted" id="beZurVert"></p></div>';
  var erste = document.querySelector("#s_vert"); erste.parentNode.insertBefore(sec, erste);
  var css = document.createElement("style");
  css.textContent = ".be-tab{display:grid;grid-template-columns:auto 1fr auto;gap:0;border:1px solid #c9dcf2;border-radius:10px;overflow:hidden}" +
    ".be-tab>div{padding:7px 10px;border-bottom:1px solid #e3edf9;font-size:16px;line-height:1.4}.be-tab .be-sym{font-weight:800;color:var(--blue);white-space:nowrap;background:#f4f8ff}" +
    ".be-tab .be-wert{color:#b45309;font-weight:700;white-space:nowrap;text-align:end}.be-tab .be-kopf{font-size:13px;color:var(--muted);background:#f8fafc;font-weight:700}" +
    ".be-liste{margin:6px 0;padding-inline-start:22px;font-size:17px;line-height:1.55}.be-liste li::marker{color:var(--gut)}" +
    ".be-schritte{list-style:none;padding:0;margin:10px 0}.be-schritte>li{border-inline-start:4px solid var(--blue);padding:6px 12px;margin:10px 0;background:#f8fbff;border-radius:0 10px 10px 0}" +
    ".be-schritte h3{margin:0 0 4px;font-size:17px;color:var(--blue)}.be-schritte p{margin:4px 0;font-size:16.5px;line-height:1.55}" +
    ".be-formel{font-size:19px;font-weight:700;color:#1e3a8a}.be-pfade{display:flex;flex-wrap:wrap;gap:6px 10px;margin:6px 0}" +
    ".be-pfad{display:inline-flex;gap:2px;padding:3px 5px;border:1px solid #c9dcf2;border-radius:8px;background:#fff}" +
    ".be-pfad b{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:5px;font-size:15px;color:#fff}" +
    ".be-t{background:#16a34a}.be-n{background:#dc2626}" +
    "@media (max-width:560px){.be-tab{grid-template-columns:minmax(0,40%) minmax(0,1fr)}.be-tab .be-sym,.be-tab .be-wert{white-space:normal;overflow-wrap:anywhere}.be-tab>div{overflow-wrap:anywhere;hyphens:auto;-webkit-hyphens:auto}.be-tab .be-kopf{display:none}.be-tab .be-wert{grid-column:2;text-align:start;padding-top:0}.be-tab .be-wert::before{content:attr(data-l) ': ';font-weight:400;color:var(--muted);font-size:14px}}";
  document.head.appendChild(css);

  function schritte(){
    var F = FAELLE[fall], T = E().f[fall], n = F.n, p = F.p, q = 1 - p, k = Number($("beK").value);
    var pT = F.pT || z(p, 2), qT = F.qT || z(q, 2), c = binko(n, k), einzel = Math.pow(p, k) * Math.pow(q, n - k), P = c * einzel, P0 = Math.pow(q, n);
    var v = { n: n, k: k, p: pT, q: qT, c: c, t: T[2], nt: T[3], nk: n - k };
    $("beKW").textContent = k; $("beStory").textContent = T[1];
    var h = "<li><h3>" + E().s1 + "</h3><p>" + tt(E().s1t, v) + "</p></li>";
    h += "<li><h3>" + tt(E().s2, v) + "</h3><p class=\"be-formel\">" + tt(E().s2t, v) + "</p>";
    if(n <= 6){ h += "<p>" + tt(E().alle, v) + '</p><div class="be-pfade" dir="ltr">' + pfade(n, k).map(kette).join("") + "</div>"; }
    else { var bsp = "1".repeat(k) + "0".repeat(n - k); h += "<p>" + tt(E().zuviel, v) + '</p><div class="be-pfade" dir="ltr">' + kette(bsp) + "</div>"; }
    h += "</li>";
    h += "<li><h3>" + E().s3 + "</h3><p>" + tt(E().s3t, v) + '</p><p class="be-formel">' + bdi(pot(pT, k) + " · " + pot(qT, n - k) + " ≈ " + z(einzel, 6)) + "</p></li>";
    h += "<li><h3>" + E().s4 + "</h3><p>" + tt(E().s4t, v) + '</p><p class="be-formel">' + bdi("P(X = " + k + ") = " + c + " · " + pot(pT, k) + " · " + pot(qT, n - k) + " ≈ " + z(P, 4) + " ≈ " + z(P * 100, 2) + " %") + "</p></li>";
    h += "<li><h3>" + E().s5 + "</h3><p>" + E().s5t + '</p><p class="be-formel">' + bdi("P(X ≥ 1) = 1 − P(X = 0) = 1 − " + pot(qT, n) + " ≈ " + z(1 - P0, 4) + " ≈ " + z((1 - P0) * 100, 2) + " %") + "</p></li>";
    $("beSchritte").innerHTML = h;
    // Tabelle der Buchstaben mit Werten aus dem Beispiel
    var mu = n * p, s = Math.sqrt(n * p * q), kum = 0; for(var i = 0; i <= k; i++) kum += binko(n, i) * Math.pow(p, i) * Math.pow(q, n - i);
    var werte = [String(n), String(k), pT, qT, "0 … " + n, z(P, 4), String(c), "B(" + n + "; " + pT + ")", z(mu, 2), z(s, 2), z(kum, 4)];
    $("beZeichen").innerHTML = '<div class="be-kopf"></div><div class="be-kopf"></div><div class="be-kopf">' + E().bspSpalte + "</div>" +
      E().zeichen.map(function(r, i){ return '<div class="be-sym">' + bdi(r[0]) + "</div><div>" + r[1] + '</div><div class="be-wert" data-l="' + E().bspSpalte + '">' + bdi(werte[i]) + "</div>"; }).join("");
  }
  function texte(){
    var e = E();
    $("beH1").textContent = e.h1; $("beIntro").innerHTML = e.intro; $("beH2").textContent = e.h2; $("beH3").textContent = e.h3;
    $("beBed").innerHTML = e.bed.map(function(b){ return "<li>" + b + "</li>"; }).join(""); $("beGegen").innerHTML = e.gegen;
    $("beH4").textContent = e.h4; $("beWahlL").textContent = e.wahl; $("beKL").textContent = e.kL; $("beZurVert").textContent = e.zurVert;
    $("beWahl").innerHTML = Object.keys(FAELLE).map(function(k){ return '<option value="' + k + '">' + e.f[k][0] + "</option>"; }).join(""); $("beWahl").value = fall;
    schritte();
  }
  function setzeFall(f){ fall = f; var F = FAELLE[f]; $("beK").max = F.n; $("beK").value = F.k; schritte(); }
  $("beWahl").addEventListener("change", function(){ setzeFall($("beWahl").value); });
  $("beK").addEventListener("input", schritte);
  window.MS_BIN_ERKL = { sprache: function(l){ if(EK[l]){ L = l; texte(); } }, tab: function(){ return E().tab; } };
  setzeFall(fall); texte();
})();
