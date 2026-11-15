// wahrscheinlichkeit/sach.js – Reiter „Sachaufgaben“
// 13 Textaufgaben (Socken, Prüfungsfragen, zwei Würfel, Buchstabenkarten, Geburtsmonate, Münze,
// Paare, Fahrkartenkontrolle, Anstellen, Stifte, Farbfolge, Spiel wählen, Glücksrad).
// Jede Aufgabe hat zufällige Zahlen („Neue Zahlen“), 1–3 Teilfragen mit Eingabe (Bruch, Dezimalzahl,
// Prozent), Tipp und Lösungsweg Schritt für Schritt. Texte in 9 Sprachen (SA), Sprache über
// MS_WK_SACH.sprache(l); der Reitername steht in WT[l].tab_sach.
(function(){
  "use strict";
  // ---------- Texte ----------
  // L: Bezeichnungen der Rechenschritte; A: Aufgaben [Titel, Situation, Frage1, Frage2, (Frage3)]
  var SA = {
  de: { tab: "Sachaufgaben", intro: "Textaufgaben wie in der Schule. Wähle eine Aufgabe, rechne und trage das Ergebnis als Bruch, Dezimalzahl oder Prozent ein.", neu: "Neue Zahlen", pruefen: "Prüfen", tipp: "Tipp", weg: "Lösungsweg", richtig: "Richtig!", falsch: "Noch nicht. Schau dir den Tipp an.", loesung: "Lösung:", ein: "z. B. 3/8", aufgabe: "Aufgabe",
    rot: "rot", blau: "blau", grau: "grau", rotK: "r", blauK: "b", grauK: "g", frau: "Frau", mann: "Mann",
    L: { laplace: "Laplace: P = günstige : mögliche Ergebnisse", pfad: "Pfadregel: entlang des Pfades multiplizieren", summe: "Summenregel: passende Pfade addieren", gegen: "Gegenereignis: P(mindestens einer) = 1 − P(keiner)", ohne: "Ohne Zurücklegen: bei jedem Zug ist einer weniger da", zaehl: "Günstige Ergebnisse abzählen", produkt: "Zählprinzip: Möglichkeiten multiplizieren", block: "Trick: die Gruppe als einen Block betrachten", vergleich: "Vergleich" },
    T: { socken: "Zeichne einen Baum nur nach Farben. Auf der 2. Stufe ist eine Socke weniger in der Schublade.", pruef: "Bei „mindestens eine“ ist das Gegenereignis „keine von beiden“ viel einfacher.", wuerfel: "Es gibt 6 · 6 = 36 gleich wahrscheinliche Paare. Zähle für jede passende Summe, wie viele Paare sie ergeben.", buch: "Zwei Karten ohne Zurücklegen: n · (n − 1) mögliche Paare. Bei „mindestens ein“ hilft das Gegenereignis.", geb: "Die erste Person darf jeden Monat haben, die zweite nur noch 11 von 12, die dritte 10 von 12 …", muenze: "Erst Kopf beim k-ten Wurf heißt: vorher nur Zahl, dann Kopf.", paare: "Für ein Ehepaar ist die erste Person egal – die zweite muss genau ihr Partner sein.", kontrolle: "Rechne zuerst die Wahrscheinlichkeit aus, dass KEIN Schwarzfahrer kontrolliert wird.", anstellen: "Fasse die Mädchen zu einem Block zusammen: Der Block und die Jungen werden angeordnet, dann die Mädchen im Block.", stifte: "Es gibt n! Reihenfolgen, nur eine ist die richtige. Rot und Blau nebeneinander: als Block betrachten (2 Reihenfolgen im Block).", folge: "Mit Zurücklegen bleiben die Brüche gleich, ohne Zurücklegen werden Zähler und Nenner kleiner.", spiel: "Bei Spiel B: Gewinn, wenn mindestens eine rote Kugel – also 1 − P(keine rote).", rad: "Nie gewinnen heißt: jedes Mal Niete. Mindestens einmal gewinnen ist das Gegenereignis." },
    A: {
      socken: ["Socken", "In einer Schublade liegen {g} graue, {b} blaue und {r} rote Socken. Im Dunkeln nimmt Lea zwei Socken heraus.", "Wie groß ist die Wahrscheinlichkeit, dass beide Socken dieselbe Farbe haben?", "Wie groß ist die Wahrscheinlichkeit, dass die Socken verschiedene Farben haben?"],
      pruef: ["Prüfungsfragen", "Für eine mündliche Prüfung gibt es {n} Fragen. Ben hat sich auf {k} davon vorbereitet. Die Prüferin zieht zufällig.", "Sie zieht eine Frage. Wie groß ist die Wahrscheinlichkeit, dass Ben sie vorbereitet hat?", "Sie zieht zwei verschiedene Fragen und Ben darf eine aussuchen. Wie groß ist die Wahrscheinlichkeit, dass mindestens eine vorbereitet ist?"],
      wuerfel: ["Zwei Würfel", "Zwei Würfel werden gleichzeitig geworfen und die Augenzahlen addiert.", "Wie groß ist die Wahrscheinlichkeit, dass die Augensumme durch {m} teilbar ist?", "Wie groß ist die Wahrscheinlichkeit, dass die Augensumme größer als {s} ist?"],
      buch: ["Buchstabenkarten", "Auf {n} Karten steht je ein Buchstabe: {w}. Die Karten liegen verdeckt; man zieht zwei Karten ohne Zurücklegen.", "Wie groß ist die Wahrscheinlichkeit, dass beide Karten denselben Buchstaben zeigen?", "Wie groß ist die Wahrscheinlichkeit, dass mindestens ein {L} dabei ist?"],
      geb: ["Geburtsmonate", "{p} Personen treffen sich. Nimm an, dass jeder Monat für jeden Geburtstag gleich wahrscheinlich ist.", "Wie groß ist die Wahrscheinlichkeit, dass alle in verschiedenen Monaten Geburtstag haben?", "Wie groß ist die Wahrscheinlichkeit, dass mindestens zwei im selben Monat Geburtstag haben?"],
      muenze: ["Münzwurf", "Eine faire Münze wird mehrmals geworfen.", "Wie groß ist die Wahrscheinlichkeit, dass erst beim {k}. Wurf zum ersten Mal Kopf fällt?", "Die Münze wird {n}-mal geworfen. Wie groß ist die Wahrscheinlichkeit für mindestens einmal Kopf?"],
      paare: ["Ehepaare", "Bei einem Fest sind {m} Ehepaare (je eine Frau und ein Mann). Zwei der {n} Personen werden zufällig für ein Spiel ausgelost.", "Wie groß ist die Wahrscheinlichkeit, dass zwei Frauen ausgelost werden?", "Wie groß ist die Wahrscheinlichkeit, dass eine Frau und ein Mann ausgelost werden?", "Wie groß ist die Wahrscheinlichkeit, dass ein Ehepaar ausgelost wird?"],
      kontrolle: ["Fahrkartenkontrolle", "In einem Bus sitzen {n} Fahrgäste, {s} davon ohne Fahrkarte. Der Kontrolleur prüft {c} zufällig ausgewählte Fahrgäste.", "Wie groß ist die Wahrscheinlichkeit, dass mindestens ein Schwarzfahrer erwischt wird?", "Tom ist einer der Fahrgäste. Wie groß ist die Wahrscheinlichkeit, dass er kontrolliert wird?"],
      anstellen: ["Anstellen", "{b} Jungen und {g} Mädchen stellen sich in zufälliger Reihenfolge an der Kasse an.", "Wie groß ist die Wahrscheinlichkeit, dass alle Mädchen direkt hintereinander stehen?", "Wie groß ist die Wahrscheinlichkeit, dass ein bestimmtes Kind ganz vorne steht?"],
      stifte: ["Stifte", "Mia hat {n} verschiedenfarbige Stifte, darunter einen roten und einen blauen. Ihr kleiner Bruder legt sie zufällig in eine Reihe.", "Wie groß ist die Wahrscheinlichkeit, dass sie genau in Mias Lieblingsreihenfolge liegen?", "Wie groß ist die Wahrscheinlichkeit, dass der rote und der blaue Stift nebeneinander liegen?"],
      folge: ["Farbfolge", "In einer Urne liegen {r} rote und {b} blaue Kugeln. Es werden nacheinander drei Kugeln gezogen.", "Mit Zurücklegen: Wie groß ist die Wahrscheinlichkeit für die Reihenfolge {f}?", "Ohne Zurücklegen: Wie groß ist die Wahrscheinlichkeit für die Reihenfolge {f}?"],
      spiel: ["Welches Spiel?", "Spiel A: Aus einer Urne mit {a} roten und {a2} blauen Kugeln wird eine gezogen – rot gewinnt. Spiel B: Aus zwei Urnen mit je {c} roten und {c2} blauen Kugeln wird je eine gezogen – mindestens eine rote gewinnt.", "Wie groß ist die Gewinnwahrscheinlichkeit bei Spiel A?", "Wie groß ist die Gewinnwahrscheinlichkeit bei Spiel B?"],
      rad: ["Glücksrad", "Ein Glücksrad hat 8 gleich große Felder, {k} davon sind Gewinnfelder. Es wird {n}-mal gedreht.", "Wie groß ist die Wahrscheinlichkeit, nie zu gewinnen?", "Wie groß ist die Wahrscheinlichkeit, mindestens einmal zu gewinnen?"]
    } },
  en: { tab: "Word problems", intro: "Word problems like at school. Choose a problem, calculate and enter the result as a fraction, decimal or percentage.", neu: "New numbers", pruefen: "Check", tipp: "Hint", weg: "Solution steps", richtig: "Correct!", falsch: "Not yet. Have a look at the hint.", loesung: "Solution:", ein: "e.g. 3/8", aufgabe: "Problem",
    rot: "red", blau: "blue", grau: "grey", rotK: "r", blauK: "b", grauK: "g", frau: "woman", mann: "man",
    L: { laplace: "Laplace: P = favourable : possible outcomes", pfad: "Product rule: multiply along the path", summe: "Sum rule: add the matching paths", gegen: "Complement: P(at least one) = 1 − P(none)", ohne: "Without replacement: one fewer for every draw", zaehl: "Count the favourable outcomes", produkt: "Counting principle: multiply the options", block: "Trick: treat the group as one block", vergleich: "Comparison" },
    T: { socken: "Draw a tree by colour only. At the 2nd stage there is one sock fewer in the drawer.", pruef: "For “at least one”, the complement “neither of them” is much easier.", wuerfel: "There are 6 · 6 = 36 equally likely pairs. For each matching sum, count how many pairs give it.", buch: "Two cards without replacement: n · (n − 1) possible pairs. For “at least one”, use the complement.", geb: "The first person may have any month, the second only 11 of 12, the third 10 of 12 …", muenze: "First heads on the k-th toss means: only tails before, then heads.", paare: "For a married couple the first person doesn’t matter – the second must be exactly their partner.", kontrolle: "First work out the probability that NO fare dodger is checked.", anstellen: "Treat the girls as one block: arrange the block and the boys, then the girls inside the block.", stifte: "There are n! orders, only one is right. Red and blue next to each other: treat them as a block (2 orders inside).", folge: "With replacement the fractions stay the same; without replacement numerator and denominator get smaller.", spiel: "Game B: you win with at least one red ball – so 1 − P(no red).", rad: "Never winning means losing every time. Winning at least once is the complement." },
    A: {
      socken: ["Socks", "A drawer contains {g} grey, {b} blue and {r} red socks. In the dark, Lea takes out two socks.", "What is the probability that both socks have the same colour?", "What is the probability that the socks have different colours?"],
      pruef: ["Exam questions", "There are {n} questions for an oral exam. Ben has prepared {k} of them. The examiner picks at random.", "She picks one question. What is the probability that Ben has prepared it?", "She picks two different questions and Ben may choose one. What is the probability that at least one is prepared?"],
      wuerfel: ["Two dice", "Two dice are rolled at the same time and the numbers are added.", "What is the probability that the sum is divisible by {m}?", "What is the probability that the sum is greater than {s}?"],
      buch: ["Letter cards", "{n} cards each show one letter: {w}. The cards lie face down; two cards are drawn without replacement.", "What is the probability that both cards show the same letter?", "What is the probability that at least one {L} is drawn?"],
      geb: ["Birthday months", "{p} people meet. Assume every month is equally likely for each birthday.", "What is the probability that all have their birthdays in different months?", "What is the probability that at least two have their birthdays in the same month?"],
      muenze: ["Coin toss", "A fair coin is tossed several times.", "What is the probability that heads appears for the first time on toss number {k}?", "The coin is tossed {n} times. What is the probability of at least one heads?"],
      paare: ["Married couples", "At a party there are {m} married couples (one woman and one man each). Two of the {n} people are drawn at random for a game.", "What is the probability that two women are drawn?", "What is the probability that one woman and one man are drawn?", "What is the probability that a married couple is drawn?"],
      kontrolle: ["Ticket inspection", "There are {n} passengers on a bus, {s} of them without a ticket. The inspector checks {c} randomly chosen passengers.", "What is the probability that at least one fare dodger is caught?", "Tom is one of the passengers. What is the probability that he is checked?"],
      anstellen: ["Queueing", "{b} boys and {g} girls queue at the checkout in random order.", "What is the probability that all girls stand directly one after another?", "What is the probability that a particular child is at the very front?"],
      stifte: ["Pens", "Mia has {n} pens of different colours, including a red and a blue one. Her little brother puts them in a row at random.", "What is the probability that they are exactly in Mia’s favourite order?", "What is the probability that the red and the blue pen lie next to each other?"],
      folge: ["Colour sequence", "An urn contains {r} red and {b} blue balls. Three balls are drawn one after another.", "With replacement: what is the probability of the order {f}?", "Without replacement: what is the probability of the order {f}?"],
      spiel: ["Which game?", "Game A: one ball is drawn from an urn with {a} red and {a2} blue balls – red wins. Game B: one ball each is drawn from two urns with {c} red and {c2} blue balls each – at least one red wins.", "What is the probability of winning game A?", "What is the probability of winning game B?"],
      rad: ["Spinner", "A spinner has 8 equal sections, {k} of them are winning sections. It is spun {n} times.", "What is the probability of never winning?", "What is the probability of winning at least once?"]
    } },
  es: { tab: "Problemas", intro: "Problemas de texto como en clase. Elige uno, calcula y escribe el resultado como fracción, decimal o porcentaje.", neu: "Nuevos números", pruefen: "Comprobar", tipp: "Pista", weg: "Solución paso a paso", richtig: "¡Correcto!", falsch: "Todavía no. Mira la pista.", loesung: "Solución:", ein: "p. ej. 3/8", aufgabe: "Problema",
    rot: "roja", blau: "azul", grau: "gris", rotK: "r", blauK: "a", grauK: "g", frau: "mujer", mann: "hombre",
    L: { laplace: "Laplace: P = casos favorables : casos posibles", pfad: "Regla del producto: multiplicar a lo largo del camino", summe: "Regla de la suma: sumar los caminos que sirven", gegen: "Suceso contrario: P(al menos uno) = 1 − P(ninguno)", ohne: "Sin reemplazamiento: en cada extracción hay uno menos", zaehl: "Contar los casos favorables", produkt: "Principio de multiplicación: multiplicar las posibilidades", block: "Truco: considerar el grupo como un bloque", vergleich: "Comparación" },
    T: { socken: "Dibuja un árbol solo por colores. En la 2.ª etapa hay un calcetín menos en el cajón.", pruef: "Para «al menos una», el suceso contrario «ninguna de las dos» es mucho más fácil.", wuerfel: "Hay 6 · 6 = 36 parejas igual de probables. Para cada suma que sirve, cuenta cuántas parejas la dan.", buch: "Dos cartas sin reemplazamiento: n · (n − 1) parejas posibles. Para «al menos una», usa el suceso contrario.", geb: "La primera persona puede tener cualquier mes, la segunda solo 11 de 12, la tercera 10 de 12…", muenze: "Primera cara en el lanzamiento k significa: antes solo cruz y luego cara.", paare: "Para un matrimonio la primera persona da igual: la segunda tiene que ser justo su pareja.", kontrolle: "Calcula primero la probabilidad de que NO se revise a ningún viajero sin billete.", anstellen: "Junta a las chicas en un bloque: se ordenan el bloque y los chicos, y luego las chicas dentro del bloque.", stifte: "Hay n! órdenes y solo uno es el correcto. Rojo y azul juntos: considéralos un bloque (2 órdenes dentro).", folge: "Con reemplazamiento las fracciones no cambian; sin reemplazamiento numerador y denominador disminuyen.", spiel: "Juego B: se gana con al menos una bola roja, o sea 1 − P(ninguna roja).", rad: "No ganar nunca significa perder cada vez. Ganar al menos una vez es el suceso contrario." },
    A: {
      socken: ["Calcetines", "En un cajón hay {g} calcetines grises, {b} azules y {r} rojos. A oscuras, Lea saca dos calcetines.", "¿Cuál es la probabilidad de que los dos calcetines sean del mismo color?", "¿Cuál es la probabilidad de que los calcetines sean de colores distintos?"],
      pruef: ["Preguntas de examen", "Para un examen oral hay {n} preguntas. Ben ha preparado {k}. La examinadora elige al azar.", "Elige una pregunta. ¿Cuál es la probabilidad de que Ben la haya preparado?", "Elige dos preguntas distintas y Ben puede escoger una. ¿Cuál es la probabilidad de que al menos una esté preparada?"],
      wuerfel: ["Dos dados", "Se lanzan dos dados a la vez y se suman los puntos.", "¿Cuál es la probabilidad de que la suma sea divisible por {m}?", "¿Cuál es la probabilidad de que la suma sea mayor que {s}?"],
      buch: ["Cartas con letras", "En {n} cartas hay una letra en cada una: {w}. Las cartas están boca abajo; se sacan dos sin reemplazamiento.", "¿Cuál es la probabilidad de que las dos cartas tengan la misma letra?", "¿Cuál es la probabilidad de sacar al menos una {L}?"],
      geb: ["Meses de cumpleaños", "Se reúnen {p} personas. Supón que cada mes es igual de probable para cada cumpleaños.", "¿Cuál es la probabilidad de que todas cumplan años en meses distintos?", "¿Cuál es la probabilidad de que al menos dos cumplan años el mismo mes?"],
      muenze: ["Lanzar una moneda", "Se lanza varias veces una moneda equilibrada.", "¿Cuál es la probabilidad de que salga cara por primera vez en el lanzamiento número {k}?", "Se lanza la moneda {n} veces. ¿Cuál es la probabilidad de sacar al menos una cara?"],
      paare: ["Matrimonios", "En una fiesta hay {m} matrimonios (una mujer y un hombre cada uno). Se sortean dos de las {n} personas para un juego.", "¿Cuál es la probabilidad de que salgan dos mujeres?", "¿Cuál es la probabilidad de que salgan una mujer y un hombre?", "¿Cuál es la probabilidad de que salga un matrimonio?"],
      kontrolle: ["Revisión de billetes", "En un autobús van {n} viajeros, {s} de ellos sin billete. El revisor controla a {c} viajeros elegidos al azar.", "¿Cuál es la probabilidad de pillar al menos a un viajero sin billete?", "Tom es uno de los viajeros. ¿Cuál es la probabilidad de que lo revisen?"],
      anstellen: ["Hacer cola", "{b} chicos y {g} chicas hacen cola en la caja en orden aleatorio.", "¿Cuál es la probabilidad de que todas las chicas estén seguidas?", "¿Cuál es la probabilidad de que un niño concreto esté el primero?"],
      stifte: ["Lápices", "Mia tiene {n} lápices de colores distintos, entre ellos uno rojo y uno azul. Su hermano pequeño los pone en fila al azar.", "¿Cuál es la probabilidad de que queden justo en el orden favorito de Mia?", "¿Cuál es la probabilidad de que el lápiz rojo y el azul queden juntos?"],
      folge: ["Secuencia de colores", "En una urna hay {r} bolas rojas y {b} azules. Se sacan tres bolas una tras otra.", "Con reemplazamiento: ¿cuál es la probabilidad del orden {f}?", "Sin reemplazamiento: ¿cuál es la probabilidad del orden {f}?"],
      spiel: ["¿Qué juego?", "Juego A: se saca una bola de una urna con {a} rojas y {a2} azules; gana la roja. Juego B: se saca una bola de cada una de dos urnas con {c} rojas y {c2} azules cada una; gana si sale al menos una roja.", "¿Cuál es la probabilidad de ganar el juego A?", "¿Cuál es la probabilidad de ganar el juego B?"],
      rad: ["Ruleta", "Una ruleta tiene 8 casillas iguales, {k} de ellas premiadas. Se gira {n} veces.", "¿Cuál es la probabilidad de no ganar nunca?", "¿Cuál es la probabilidad de ganar al menos una vez?"]
    } },
  zh: { tab: "应用题", intro: "像课堂上一样的文字题。选一道题，计算后把结果写成分数、小数或百分数。", neu: "换一组数", pruefen: "检查", tipp: "提示", weg: "解题步骤", richtig: "正确！", falsch: "还不对，看看提示吧。", loesung: "答案：", ein: "例如 3/8", aufgabe: "题目",
    rot: "红", blau: "蓝", grau: "灰", rotK: "红", blauK: "蓝", grauK: "灰", frau: "女", mann: "男",
    L: { laplace: "古典概型：P = 有利结果数 : 所有结果数", pfad: "乘法法则：沿路径相乘", summe: "加法法则：把符合的路径相加", gegen: "对立事件：P(至少一个) = 1 − P(一个也没有)", ohne: "不放回：每抽一次就少一个", zaehl: "数出有利结果", produkt: "计数原理：把可能数相乘", block: "技巧：把这一组看作一个整体", vergleich: "比较" },
    T: { socken: "只按颜色画树状图。第二步抽屉里少了一只袜子。", pruef: "“至少一道”时，对立事件“两道都没有”要简单得多。", wuerfel: "共有 6 · 6 = 36 个等可能的数对。对每个符合的和，数出有几个数对。", buch: "不放回抽两张：共 n · (n − 1) 种。“至少一个”用对立事件。", geb: "第一个人可以是任何月份，第二个人只剩 12 个中的 11 个，第三个人 10 个……", muenze: "第 k 次才第一次出现正面：之前都是反面，然后是正面。", paare: "抽到一对夫妻：第一个人随意，第二个人必须正好是他的配偶。", kontrolle: "先算出一个逃票者也没被检查到的概率。", anstellen: "把女孩看作一个整体：先排这个整体和男孩，再排整体内部的女孩。", stifte: "共有 n! 种顺序，只有一种是对的。红蓝相邻：看作一个整体（内部 2 种顺序）。", folge: "放回时分数不变；不放回时分子和分母都变小。", spiel: "游戏 B：至少一个红球就赢，即 1 − P(没有红球)。", rad: "从不赢就是每次都没中。至少赢一次是它的对立事件。" },
    A: {
      socken: ["袜子", "抽屉里有 {g} 只灰袜子、{b} 只蓝袜子和 {r} 只红袜子。莉娅在黑暗中拿出两只。", "两只袜子颜色相同的概率是多少？", "两只袜子颜色不同的概率是多少？"],
      pruef: ["考试题", "口试共有 {n} 道题，本准备了其中 {k} 道。考官随机抽题。", "她抽一道题。本准备过这道题的概率是多少？", "她抽两道不同的题，本可以选一道。至少有一道准备过的概率是多少？"],
      wuerfel: ["两个骰子", "同时掷两个骰子，把点数相加。", "点数和能被 {m} 整除的概率是多少？", "点数和大于 {s} 的概率是多少？"],
      buch: ["字母卡片", "{n} 张卡片上各写一个字母：{w}。卡片背面朝上，不放回地抽两张。", "两张卡片字母相同的概率是多少？", "至少抽到一个 {L} 的概率是多少？"],
      geb: ["生日月份", "{p} 个人见面。假设每个人的生日落在每个月的可能性相同。", "所有人生日都在不同月份的概率是多少？", "至少两个人生日在同一个月的概率是多少？"],
      muenze: ["掷硬币", "把一枚均匀的硬币掷多次。", "第 {k} 次才第一次出现正面的概率是多少？", "硬币掷 {n} 次。至少出现一次正面的概率是多少？"],
      paare: ["夫妻", "聚会上有 {m} 对夫妻（每对一男一女）。从 {n} 人中随机抽两人做游戏。", "抽到两位女士的概率是多少？", "抽到一男一女的概率是多少？", "抽到一对夫妻的概率是多少？"],
      kontrolle: ["查票", "公交车上有 {n} 名乘客，其中 {s} 人没买票。查票员随机检查 {c} 名乘客。", "至少查到一名逃票者的概率是多少？", "汤姆是乘客之一。他被检查的概率是多少？"],
      anstellen: ["排队", "{b} 个男孩和 {g} 个女孩随机地在收银台排队。", "所有女孩紧挨着排在一起的概率是多少？", "某个特定的孩子排在最前面的概率是多少？"],
      stifte: ["彩笔", "米娅有 {n} 支颜色不同的笔，其中有一支红的和一支蓝的。她的弟弟随机把它们排成一排。", "正好排成米娅最喜欢的顺序的概率是多少？", "红笔和蓝笔挨在一起的概率是多少？"],
      folge: ["颜色顺序", "袋中有 {r} 个红球和 {b} 个蓝球。依次抽出三个球。", "放回：顺序为 {f} 的概率是多少？", "不放回：顺序为 {f} 的概率是多少？"],
      spiel: ["选哪个游戏？", "游戏 A：从有 {a} 个红球和 {a2} 个蓝球的袋中抽一个，红球赢。游戏 B：从两个各有 {c} 个红球和 {c2} 个蓝球的袋中各抽一个，至少一个红球就赢。", "游戏 A 获胜的概率是多少？", "游戏 B 获胜的概率是多少？"],
      rad: ["转盘", "转盘有 8 个同样大的格子，其中 {k} 个是中奖格。转 {n} 次。", "一次也不中奖的概率是多少？", "至少中奖一次的概率是多少？"]
    } },
  fr: { tab: "Problèmes", intro: "Des problèmes comme en classe. Choisis un problème, calcule et saisis le résultat sous forme de fraction, de nombre décimal ou de pourcentage.", neu: "Nouveaux nombres", pruefen: "Vérifier", tipp: "Indice", weg: "Solution détaillée", richtig: "Juste !", falsch: "Pas encore. Regarde l’indice.", loesung: "Solution :", ein: "p. ex. 3/8", aufgabe: "Problème",
    rot: "rouge", blau: "bleu", grau: "gris", rotK: "r", blauK: "b", grauK: "g", frau: "femme", mann: "homme",
    L: { laplace: "Laplace : P = cas favorables : cas possibles", pfad: "Règle du produit : multiplier le long du chemin", summe: "Règle de la somme : additionner les chemins qui conviennent", gegen: "Événement contraire : P(au moins un) = 1 − P(aucun)", ohne: "Sans remise : à chaque tirage, il y en a un de moins", zaehl: "Compter les cas favorables", produkt: "Principe multiplicatif : multiplier les possibilités", block: "Astuce : considérer le groupe comme un bloc", vergleich: "Comparaison" },
    T: { socken: "Dessine un arbre seulement selon les couleurs. Au 2e niveau, il y a une chaussette de moins dans le tiroir.", pruef: "Pour « au moins une », l’événement contraire « aucune des deux » est bien plus simple.", wuerfel: "Il y a 6 · 6 = 36 couples équiprobables. Pour chaque somme qui convient, compte combien de couples la donnent.", buch: "Deux cartes sans remise : n · (n − 1) couples possibles. Pour « au moins un », utilise l’événement contraire.", geb: "La première personne peut avoir n’importe quel mois, la deuxième seulement 11 sur 12, la troisième 10 sur 12…", muenze: "Premier pile au k-ième lancer signifie : seulement face avant, puis pile.", paare: "Pour un couple marié, la première personne est indifférente – la deuxième doit être exactement son conjoint.", kontrolle: "Calcule d’abord la probabilité qu’AUCUN fraudeur ne soit contrôlé.", anstellen: "Regroupe les filles en un bloc : on range le bloc et les garçons, puis les filles dans le bloc.", stifte: "Il y a n! ordres, un seul est le bon. Rouge et bleu côte à côte : considère-les comme un bloc (2 ordres dans le bloc).", folge: "Avec remise, les fractions restent les mêmes ; sans remise, numérateur et dénominateur diminuent.", spiel: "Jeu B : on gagne avec au moins une boule rouge, donc 1 − P(aucune rouge).", rad: "Ne jamais gagner signifie perdre à chaque fois. Gagner au moins une fois est l’événement contraire." },
    A: {
      socken: ["Chaussettes", "Dans un tiroir, il y a {g} chaussettes grises, {b} bleues et {r} rouges. Dans le noir, Léa en prend deux.", "Quelle est la probabilité que les deux chaussettes soient de la même couleur ?", "Quelle est la probabilité que les chaussettes soient de couleurs différentes ?"],
      pruef: ["Questions d’examen", "Pour un oral, il y a {n} questions. Ben en a préparé {k}. L’examinatrice tire au hasard.", "Elle tire une question. Quelle est la probabilité que Ben l’ait préparée ?", "Elle tire deux questions différentes et Ben peut en choisir une. Quelle est la probabilité qu’au moins une soit préparée ?"],
      wuerfel: ["Deux dés", "On lance deux dés en même temps et on additionne les points.", "Quelle est la probabilité que la somme soit divisible par {m} ?", "Quelle est la probabilité que la somme soit supérieure à {s} ?"],
      buch: ["Cartes lettres", "Sur {n} cartes, il y a une lettre chacune : {w}. Les cartes sont retournées ; on en tire deux sans remise.", "Quelle est la probabilité que les deux cartes portent la même lettre ?", "Quelle est la probabilité de tirer au moins un {L} ?"],
      geb: ["Mois d’anniversaire", "{p} personnes se rencontrent. On suppose que chaque mois est également probable pour chaque anniversaire.", "Quelle est la probabilité que tous aient leur anniversaire des mois différents ?", "Quelle est la probabilité qu’au moins deux aient leur anniversaire le même mois ?"],
      muenze: ["Pile ou face", "On lance plusieurs fois une pièce équilibrée.", "Quelle est la probabilité d’obtenir pile pour la première fois au {k}e lancer ?", "On lance la pièce {n} fois. Quelle est la probabilité d’obtenir au moins une fois pile ?"],
      paare: ["Couples mariés", "À une fête, il y a {m} couples mariés (une femme et un homme chacun). On tire au sort deux des {n} personnes pour un jeu.", "Quelle est la probabilité de tirer deux femmes ?", "Quelle est la probabilité de tirer une femme et un homme ?", "Quelle est la probabilité de tirer un couple marié ?"],
      kontrolle: ["Contrôle des billets", "Dans un bus, il y a {n} passagers, dont {s} sans billet. Le contrôleur vérifie {c} passagers choisis au hasard.", "Quelle est la probabilité d’attraper au moins un fraudeur ?", "Tom est l’un des passagers. Quelle est la probabilité qu’il soit contrôlé ?"],
      anstellen: ["Faire la queue", "{b} garçons et {g} filles font la queue à la caisse dans un ordre aléatoire.", "Quelle est la probabilité que toutes les filles soient les unes derrière les autres ?", "Quelle est la probabilité qu’un enfant précis soit tout devant ?"],
      stifte: ["Crayons", "Mia a {n} crayons de couleurs différentes, dont un rouge et un bleu. Son petit frère les aligne au hasard.", "Quelle est la probabilité qu’ils soient exactement dans l’ordre préféré de Mia ?", "Quelle est la probabilité que le crayon rouge et le bleu soient côte à côte ?"],
      folge: ["Suite de couleurs", "Une urne contient {r} boules rouges et {b} bleues. On tire trois boules l’une après l’autre.", "Avec remise : quelle est la probabilité de l’ordre {f} ?", "Sans remise : quelle est la probabilité de l’ordre {f} ?"],
      spiel: ["Quel jeu ?", "Jeu A : on tire une boule d’une urne avec {a} rouges et {a2} bleues – rouge gagne. Jeu B : on tire une boule de chacune de deux urnes avec {c} rouges et {c2} bleues – au moins une rouge gagne.", "Quelle est la probabilité de gagner au jeu A ?", "Quelle est la probabilité de gagner au jeu B ?"],
      rad: ["Roue de la fortune", "Une roue a 8 secteurs égaux, dont {k} gagnants. On la fait tourner {n} fois.", "Quelle est la probabilité de ne jamais gagner ?", "Quelle est la probabilité de gagner au moins une fois ?"]
    } },
  ru: { tab: "Текстовые задачи", intro: "Текстовые задачи как в школе. Выбери задачу, реши её и введи ответ дробью, десятичной дробью или в процентах.", neu: "Новые числа", pruefen: "Проверить", tipp: "Подсказка", weg: "Решение по шагам", richtig: "Верно!", falsch: "Пока нет. Посмотри подсказку.", loesung: "Решение:", ein: "напр. 3/8", aufgabe: "Задача",
    rot: "красный", blau: "синий", grau: "серый", rotK: "к", blauK: "с", grauK: "с̄", frau: "женщина", mann: "мужчина",
    L: { laplace: "Классическая вероятность: P = благоприятные : все исходы", pfad: "Правило умножения: умножать вдоль пути", summe: "Правило сложения: складывать подходящие пути", gegen: "Противоположное событие: P(хотя бы один) = 1 − P(ни одного)", ohne: "Без возвращения: при каждом извлечении на один меньше", zaehl: "Подсчитать благоприятные исходы", produkt: "Правило произведения: перемножить варианты", block: "Приём: считать группу одним блоком", vergleich: "Сравнение" },
    T: { socken: "Нарисуй дерево только по цветам. На 2-м шаге в ящике на один носок меньше.", pruef: "Для «хотя бы один» противоположное событие «ни одного из двух» гораздо проще.", wuerfel: "Всего 6 · 6 = 36 равновероятных пар. Для каждой подходящей суммы посчитай, сколько пар её дают.", buch: "Две карточки без возвращения: n · (n − 1) пар. Для «хотя бы одна» используй противоположное событие.", geb: "У первого человека может быть любой месяц, у второго — только 11 из 12, у третьего — 10 из 12…", muenze: "Первый орёл на k-м броске: до этого только решки, потом орёл.", paare: "Для супружеской пары первый человек любой, а второй должен быть именно его супругом.", kontrolle: "Сначала найди вероятность того, что НИ одного безбилетника не проверят.", anstellen: "Объедини девочек в блок: сначала расставь блок и мальчиков, потом девочек внутри блока.", stifte: "Всего n! порядков, верный только один. Красный и синий рядом: считай их блоком (2 порядка внутри).", folge: "С возвращением дроби не меняются; без возвращения числитель и знаменатель уменьшаются.", spiel: "Игра B: выигрыш, если хотя бы один красный шар, то есть 1 − P(ни одного красного).", rad: "Ни разу не выиграть — значит каждый раз проиграть. Выиграть хотя бы раз — противоположное событие." },
    A: {
      socken: ["Носки", "В ящике лежат {g} серых, {b} синих и {r} красных носков. В темноте Лея достаёт два носка.", "Какова вероятность, что оба носка одного цвета?", "Какова вероятность, что носки разного цвета?"],
      pruef: ["Экзаменационные вопросы", "На устном экзамене {n} вопросов. Бен подготовил {k} из них. Экзаменатор выбирает случайно.", "Она выбирает один вопрос. Какова вероятность, что Бен его подготовил?", "Она выбирает два разных вопроса, и Бен может выбрать один. Какова вероятность, что хотя бы один подготовлен?"],
      wuerfel: ["Два кубика", "Бросают одновременно два кубика и складывают очки.", "Какова вероятность, что сумма делится на {m}?", "Какова вероятность, что сумма больше {s}?"],
      buch: ["Карточки с буквами", "На {n} карточках по одной букве: {w}. Карточки лежат рубашкой вверх; вытягивают две без возвращения.", "Какова вероятность, что на обеих карточках одна и та же буква?", "Какова вероятность вытянуть хотя бы одну букву {L}?"],
      geb: ["Месяцы рождения", "Встречаются {p} человек. Считай, что каждый месяц одинаково вероятен для каждого дня рождения.", "Какова вероятность, что у всех дни рождения в разные месяцы?", "Какова вероятность, что хотя бы у двоих день рождения в одном месяце?"],
      muenze: ["Бросание монеты", "Правильную монету бросают несколько раз.", "Какова вероятность, что орёл впервые выпадет на {k}-м броске?", "Монету бросают {n} раз. Какова вероятность хотя бы одного орла?"],
      paare: ["Супружеские пары", "На празднике {m} супружеских пар (в каждой женщина и мужчина). Для игры случайно выбирают двоих из {n} человек.", "Какова вероятность, что выберут двух женщин?", "Какова вероятность, что выберут женщину и мужчину?", "Какова вероятность, что выберут супружескую пару?"],
      kontrolle: ["Проверка билетов", "В автобусе {n} пассажиров, {s} из них без билета. Контролёр проверяет {c} случайно выбранных пассажиров.", "Какова вероятность поймать хотя бы одного безбилетника?", "Том — один из пассажиров. Какова вероятность, что его проверят?"],
      anstellen: ["Очередь", "{b} мальчика и {g} девочки встают в очередь в кассу в случайном порядке.", "Какова вероятность, что все девочки стоят подряд?", "Какова вероятность, что определённый ребёнок стоит первым?"],
      stifte: ["Карандаши", "У Мии {n} карандашей разных цветов, среди них красный и синий. Младший брат кладёт их в ряд случайным образом.", "Какова вероятность, что они лежат точно в любимом порядке Мии?", "Какова вероятность, что красный и синий карандаши лежат рядом?"],
      folge: ["Последовательность цветов", "В урне {r} красных и {b} синих шаров. Один за другим вынимают три шара.", "С возвращением: какова вероятность порядка {f}?", "Без возвращения: какова вероятность порядка {f}?"],
      spiel: ["Какая игра?", "Игра A: из урны с {a} красными и {a2} синими шарами вынимают один — красный выигрывает. Игра B: из двух урн, в каждой {c} красных и {c2} синих, вынимают по одному — выигрыш, если хотя бы один красный.", "Какова вероятность выигрыша в игре A?", "Какова вероятность выигрыша в игре B?"],
      rad: ["Колесо удачи", "У колеса 8 одинаковых секторов, {k} из них выигрышные. Его вращают {n} раз.", "Какова вероятность ни разу не выиграть?", "Какова вероятность выиграть хотя бы один раз?"]
    } },
  ar: { tab: "مسائل كلامية", intro: "مسائل كلامية كما في المدرسة. اختر مسألة واحسب، ثم اكتب النتيجة كسرًا أو عددًا عشريًا أو نسبة مئوية.", neu: "أعداد جديدة", pruefen: "تحقّق", tipp: "تلميح", weg: "خطوات الحل", richtig: "صحيح!", falsch: "ليس بعد. انظر إلى التلميح.", loesung: "الحل:", ein: "مثل 3/8", aufgabe: "مسألة",
    rot: "أحمر", blau: "أزرق", grau: "رمادي", rotK: "ح", blauK: "ز", grauK: "ر", frau: "امرأة", mann: "رجل",
    L: { laplace: "لابلاس: P = النتائج المواتية : النتائج الممكنة", pfad: "قاعدة الضرب: نضرب على طول المسار", summe: "قاعدة الجمع: نجمع المسارات المناسبة", gegen: "الحدث المتمم: P(واحد على الأقل) = 1 − P(لا شيء)", ohne: "دون إرجاع: في كل سحب يقل العدد واحدًا", zaehl: "عدّ النتائج المواتية", produkt: "مبدأ العدّ: نضرب الإمكانات", block: "حيلة: نعتبر المجموعة كتلة واحدة", vergleich: "مقارنة" },
    T: { socken: "ارسم شجرة حسب الألوان فقط. في المرحلة الثانية يقل عدد الجوارب في الدرج واحدًا.", pruef: "في «واحد على الأقل» يكون الحدث المتمم «لا أحد منهما» أسهل بكثير.", wuerfel: "هناك 6 · 6 = 36 زوجًا متساوي الاحتمال. لكل مجموع مناسب، عدّ الأزواج التي تعطيه.", buch: "بطاقتان دون إرجاع: n · (n − 1) زوجًا ممكنًا. في «واحد على الأقل» استخدم الحدث المتمم.", geb: "الشخص الأول يمكن أن يكون في أي شهر، والثاني في 11 من 12 فقط، والثالث في 10 من 12 …", muenze: "أول صورة في الرمية k تعني: قبلها كتابة فقط، ثم صورة.", paare: "لزوجين: الشخص الأول لا يهم، والثاني يجب أن يكون شريكه تمامًا.", kontrolle: "احسب أولًا احتمال ألا يُفحص أي راكب بلا تذكرة.", anstellen: "اجمع البنات في كتلة: رتّب الكتلة والأولاد، ثم البنات داخل الكتلة.", stifte: "هناك n! ترتيبًا، واحد فقط هو الصحيح. الأحمر والأزرق متجاوران: اعتبرهما كتلة (ترتيبان داخلها).", folge: "مع الإرجاع تبقى الكسور كما هي، ودون إرجاع يصغر البسط والمقام.", spiel: "اللعبة B: الفوز بكرة حمراء واحدة على الأقل، أي 1 − P(لا حمراء).", rad: "عدم الفوز أبدًا يعني الخسارة في كل مرة. الفوز مرة على الأقل هو الحدث المتمم." },
    A: {
      socken: ["جوارب", "في درج {g} جوارب رمادية و{b} زرقاء و{r} حمراء. في الظلام تُخرج ليا جوربين.", "ما احتمال أن يكون للجوربين اللون نفسه؟", "ما احتمال أن يكون للجوربين لونان مختلفان؟"],
      pruef: ["أسئلة الامتحان", "في امتحان شفهي {n} أسئلة. حضّر بن {k} منها. تسحب الممتحنة عشوائيًا.", "تسحب سؤالًا واحدًا. ما احتمال أن يكون بن قد حضّره؟", "تسحب سؤالين مختلفين ويختار بن أحدهما. ما احتمال أن يكون واحد على الأقل محضّرًا؟"],
      wuerfel: ["حجرا نرد", "يُرمى حجرا نرد معًا وتُجمع النقاط.", "ما احتمال أن يقبل المجموع القسمة على {m}؟", "ما احتمال أن يكون المجموع أكبر من {s}؟"],
      buch: ["بطاقات الحروف", "على {n} بطاقات حرف واحد على كل منها: {w}. البطاقات مقلوبة؛ تُسحب بطاقتان دون إرجاع.", "ما احتمال أن تحمل البطاقتان الحرف نفسه؟", "ما احتمال سحب {L} واحد على الأقل؟"],
      geb: ["أشهر الميلاد", "يلتقي {p} أشخاص. افترض أن كل شهر متساوي الاحتمال لكل عيد ميلاد.", "ما احتمال أن تكون أعياد ميلاد الجميع في أشهر مختلفة؟", "ما احتمال أن يكون لشخصين على الأقل عيد ميلاد في الشهر نفسه؟"],
      muenze: ["رمي قطعة نقد", "تُرمى قطعة نقد عادلة عدة مرات.", "ما احتمال ظهور الصورة لأول مرة في الرمية رقم {k}؟", "تُرمى القطعة {n} مرات. ما احتمال ظهور الصورة مرة واحدة على الأقل؟"],
      paare: ["أزواج", "في حفلة {m} أزواج (امرأة ورجل في كل زوج). يُسحب شخصان من {n} أشخاص عشوائيًا للعبة.", "ما احتمال سحب امرأتين؟", "ما احتمال سحب امرأة ورجل؟", "ما احتمال سحب زوجين متزوجين؟"],
      kontrolle: ["فحص التذاكر", "في حافلة {n} راكبًا، {s} منهم بلا تذكرة. يفحص المراقب {c} ركاب مختارين عشوائيًا.", "ما احتمال ضبط راكب بلا تذكرة واحد على الأقل؟", "توم أحد الركاب. ما احتمال أن يُفحص؟"],
      anstellen: ["الوقوف في الطابور", "يقف {b} أولاد و{g} بنات في طابور الصندوق بترتيب عشوائي.", "ما احتمال أن تقف كل البنات متتاليات؟", "ما احتمال أن يقف طفل معيّن في المقدمة تمامًا؟"],
      stifte: ["أقلام", "لدى ميا {n} أقلام بألوان مختلفة، منها قلم أحمر وقلم أزرق. يضعها أخوها الصغير في صف عشوائيًا.", "ما احتمال أن تكون بالترتيب المفضّل لميا تمامًا؟", "ما احتمال أن يكون القلمان الأحمر والأزرق متجاورين؟"],
      folge: ["تتابع الألوان", "في جرّة {r} كرات حمراء و{b} زرقاء. تُسحب ثلاث كرات واحدة بعد الأخرى.", "مع الإرجاع: ما احتمال الترتيب {f}؟", "دون إرجاع: ما احتمال الترتيب {f}؟"],
      spiel: ["أي لعبة؟", "اللعبة A: تُسحب كرة من جرّة فيها {a} حمراء و{a2} زرقاء – الحمراء تفوز. اللعبة B: تُسحب كرة من كل من جرّتين في كل منهما {c} حمراء و{c2} زرقاء – تفوز إذا ظهرت حمراء واحدة على الأقل.", "ما احتمال الفوز في اللعبة A؟", "ما احتمال الفوز في اللعبة B؟"],
      rad: ["عجلة الحظ", "لعجلة 8 قطاعات متساوية، {k} منها رابحة. تُدار {n} مرات.", "ما احتمال عدم الفوز أبدًا؟", "ما احتمال الفوز مرة واحدة على الأقل؟"]
    } },
  ja: { tab: "文章題", intro: "学校で出るような文章題です。問題を選んで計算し、答えを分数・小数・百分率で入力しましょう。", neu: "数を変える", pruefen: "確かめる", tipp: "ヒント", weg: "解き方", richtig: "正解！", falsch: "まだです。ヒントを見てみよう。", loesung: "答え：", ein: "例 3/8", aufgabe: "問題",
    rot: "赤", blau: "青", grau: "灰", rotK: "赤", blauK: "青", grauK: "灰", frau: "女性", mann: "男性",
    L: { laplace: "ラプラス：P = 有利な場合の数 ÷ すべての場合の数", pfad: "積の法則：枝に沿ってかける", summe: "和の法則：当てはまる枝をたす", gegen: "余事象：P(少なくとも1つ) = 1 − P(1つもない)", ohne: "戻さない：引くたびに1つ減る", zaehl: "有利な場合を数える", produkt: "積の法則：場合の数をかける", block: "コツ：グループを1つのかたまりと考える", vergleich: "比べる" },
    T: { socken: "色だけで樹形図をかこう。2回目は引き出しの靴下が1つ少ない。", pruef: "「少なくとも1つ」は余事象「どちらもない」で考えるとずっと簡単。", wuerfel: "同様に確からしい組は 6 · 6 = 36 通り。当てはまる和ごとに組の数を数えよう。", buch: "戻さずに2枚：n · (n − 1) 通り。「少なくとも1つ」は余事象を使おう。", geb: "1人目はどの月でもよい。2人目は12のうち11、3人目は12のうち10 …", muenze: "k回目に初めて表：それまではすべて裏、そのあと表。", paare: "夫婦になるには、1人目はだれでもよく、2人目がちょうどその配偶者であればよい。", kontrolle: "まず、無賃乗車の人が1人も調べられない確率を求めよう。", anstellen: "女の子をひとかたまりにする：かたまりと男の子を並べ、次にかたまりの中の女の子を並べる。", stifte: "並べ方は n! 通りで、正しいのは1つだけ。赤と青が隣り合う：1つのかたまりと考える（中の並べ方は2通り）。", folge: "戻す場合は分数が変わらない。戻さない場合は分子も分母も小さくなる。", spiel: "ゲームB：少なくとも1つ赤なら勝ち。つまり 1 − P(赤が1つもない)。", rad: "一度も当たらない＝毎回はずれ。少なくとも1回当たるはその余事象。" },
    A: {
      socken: ["靴下", "引き出しに灰色の靴下が {g} 足、青が {b} 足、赤が {r} 足入っています。暗い中でレアが2足取り出します。", "2足が同じ色である確率はいくらですか。", "2足が違う色である確率はいくらですか。"],
      pruef: ["試験の問題", "口頭試験の問題は {n} 問あり、ベンはそのうち {k} 問を準備しました。試験官は無作為に選びます。", "1問選びます。ベンが準備した問題である確率はいくらですか。", "違う2問を選び、ベンが1問を選べます。少なくとも1問が準備済みである確率はいくらですか。"],
      wuerfel: ["2つのさいころ", "2つのさいころを同時に投げ、目の数をたします。", "目の和が {m} で割り切れる確率はいくらですか。", "目の和が {s} より大きい確率はいくらですか。"],
      buch: ["文字カード", "{n} 枚のカードに1文字ずつ書いてあります：{w}。カードは裏向きで、戻さずに2枚引きます。", "2枚が同じ文字である確率はいくらですか。", "少なくとも1枚 {L} を引く確率はいくらですか。"],
      geb: ["誕生月", "{p} 人が集まります。どの月も誕生月として同じ確率だとします。", "全員の誕生月が違う確率はいくらですか。", "少なくとも2人の誕生月が同じである確率はいくらですか。"],
      muenze: ["コイン投げ", "正しいコインを何回か投げます。", "{k} 回目に初めて表が出る確率はいくらですか。", "コインを {n} 回投げます。少なくとも1回表が出る確率はいくらですか。"],
      paare: ["夫婦", "パーティーに {m} 組の夫婦（女性1人と男性1人）がいます。{n} 人の中からゲームのために2人をくじで選びます。", "女性が2人選ばれる確率はいくらですか。", "女性1人と男性1人が選ばれる確率はいくらですか。", "夫婦が選ばれる確率はいくらですか。"],
      kontrolle: ["検札", "バスに乗客が {n} 人いて、そのうち {s} 人が切符を持っていません。検札係は無作為に {c} 人を調べます。", "少なくとも1人の無賃乗車が見つかる確率はいくらですか。", "トムは乗客の1人です。トムが調べられる確率はいくらですか。"],
      anstellen: ["列に並ぶ", "男の子 {b} 人と女の子 {g} 人が、レジに無作為な順番で並びます。", "女の子全員が続けて並ぶ確率はいくらですか。", "ある特定の子がいちばん前に並ぶ確率はいくらですか。"],
      stifte: ["色えんぴつ", "ミアは色の違うえんぴつを {n} 本持っていて、その中に赤と青が1本ずつあります。弟がそれを無作為に1列に並べます。", "ちょうどミアのお気に入りの順番になる確率はいくらですか。", "赤と青のえんぴつが隣り合う確率はいくらですか。"],
      folge: ["色の順番", "箱に赤玉が {r} 個、青玉が {b} 個入っています。1個ずつ3個取り出します。", "戻す場合：{f} の順になる確率はいくらですか。", "戻さない場合：{f} の順になる確率はいくらですか。"],
      spiel: ["どちらのゲーム？", "ゲームA：赤 {a} 個、青 {a2} 個の箱から1個取り出し、赤なら勝ち。ゲームB：赤 {c} 個、青 {c2} 個ずつ入った2つの箱からそれぞれ1個取り出し、少なくとも1個赤なら勝ち。", "ゲームAで勝つ確率はいくらですか。", "ゲームBで勝つ確率はいくらですか。"],
      rad: ["ルーレット", "ルーレットは8つの同じ大きさの区画に分かれ、そのうち {k} つが当たりです。{n} 回回します。", "一度も当たらない確率はいくらですか。", "少なくとも1回当たる確率はいくらですか。"]
    } },
  pt: { tab: "Problemas", intro: "Problemas de texto como na escola. Escolha um problema, calcule e digite o resultado como fração, decimal ou porcentagem.", neu: "Novos números", pruefen: "Verificar", tipp: "Dica", weg: "Solução passo a passo", richtig: "Certo!", falsch: "Ainda não. Veja a dica.", loesung: "Solução:", ein: "ex.: 3/8", aufgabe: "Problema",
    rot: "vermelha", blau: "azul", grau: "cinza", rotK: "v", blauK: "a", grauK: "c", frau: "mulher", mann: "homem",
    L: { laplace: "Laplace: P = casos favoráveis : casos possíveis", pfad: "Regra do produto: multiplicar ao longo do caminho", summe: "Regra da soma: somar os caminhos que servem", gegen: "Evento complementar: P(pelo menos um) = 1 − P(nenhum)", ohne: "Sem reposição: a cada retirada há um a menos", zaehl: "Contar os casos favoráveis", produkt: "Princípio multiplicativo: multiplicar as possibilidades", block: "Truque: considerar o grupo como um bloco", vergleich: "Comparação" },
    T: { socken: "Desenhe uma árvore só por cores. Na 2.ª etapa há uma meia a menos na gaveta.", pruef: "Para “pelo menos uma”, o complementar “nenhuma das duas” é bem mais fácil.", wuerfel: "Há 6 · 6 = 36 pares igualmente prováveis. Para cada soma que serve, conte quantos pares a dão.", buch: "Duas cartas sem reposição: n · (n − 1) pares possíveis. Para “pelo menos um”, use o complementar.", geb: "A primeira pessoa pode ter qualquer mês, a segunda só 11 de 12, a terceira 10 de 12…", muenze: "Primeira cara no k-ésimo lançamento significa: antes só coroa, depois cara.", paare: "Para um casal, a primeira pessoa tanto faz – a segunda precisa ser exatamente o cônjuge.", kontrolle: "Calcule primeiro a probabilidade de NENHUM passageiro sem bilhete ser fiscalizado.", anstellen: "Junte as meninas num bloco: organize o bloco e os meninos, depois as meninas dentro do bloco.", stifte: "Há n! ordens e só uma é a certa. Vermelho e azul lado a lado: considere-os um bloco (2 ordens dentro).", folge: "Com reposição as frações não mudam; sem reposição numerador e denominador diminuem.", spiel: "Jogo B: ganha-se com pelo menos uma bola vermelha, ou seja 1 − P(nenhuma vermelha).", rad: "Nunca ganhar significa perder todas as vezes. Ganhar pelo menos uma vez é o complementar." },
    A: {
      socken: ["Meias", "Numa gaveta há {g} meias cinza, {b} azuis e {r} vermelhas. No escuro, Lea tira duas meias.", "Qual é a probabilidade de as duas meias terem a mesma cor?", "Qual é a probabilidade de as meias terem cores diferentes?"],
      pruef: ["Perguntas de prova", "Numa prova oral há {n} perguntas. Ben preparou {k} delas. A examinadora sorteia.", "Ela sorteia uma pergunta. Qual é a probabilidade de Ben tê-la preparado?", "Ela sorteia duas perguntas diferentes e Ben pode escolher uma. Qual é a probabilidade de pelo menos uma estar preparada?"],
      wuerfel: ["Dois dados", "Dois dados são lançados ao mesmo tempo e os pontos são somados.", "Qual é a probabilidade de a soma ser divisível por {m}?", "Qual é a probabilidade de a soma ser maior que {s}?"],
      buch: ["Cartas com letras", "Em {n} cartas há uma letra em cada: {w}. As cartas estão viradas; tiram-se duas sem reposição.", "Qual é a probabilidade de as duas cartas terem a mesma letra?", "Qual é a probabilidade de sair pelo menos um {L}?"],
      geb: ["Meses de aniversário", "{p} pessoas se encontram. Suponha que todo mês é igualmente provável para cada aniversário.", "Qual é a probabilidade de todos fazerem aniversário em meses diferentes?", "Qual é a probabilidade de pelo menos dois fazerem aniversário no mesmo mês?"],
      muenze: ["Lançar moeda", "Uma moeda honesta é lançada várias vezes.", "Qual é a probabilidade de sair cara pela primeira vez no {k}.º lançamento?", "A moeda é lançada {n} vezes. Qual é a probabilidade de pelo menos uma cara?"],
      paare: ["Casais", "Numa festa há {m} casais (uma mulher e um homem cada). Duas das {n} pessoas são sorteadas para um jogo.", "Qual é a probabilidade de serem sorteadas duas mulheres?", "Qual é a probabilidade de serem sorteados uma mulher e um homem?", "Qual é a probabilidade de ser sorteado um casal?"],
      kontrolle: ["Fiscalização de bilhetes", "Num ônibus há {n} passageiros, {s} deles sem bilhete. O fiscal verifica {c} passageiros escolhidos ao acaso.", "Qual é a probabilidade de pegar pelo menos um passageiro sem bilhete?", "Tom é um dos passageiros. Qual é a probabilidade de ele ser fiscalizado?"],
      anstellen: ["Fila", "{b} meninos e {g} meninas entram na fila do caixa em ordem aleatória.", "Qual é a probabilidade de todas as meninas ficarem uma atrás da outra?", "Qual é a probabilidade de uma criança específica ficar logo na frente?"],
      stifte: ["Lápis", "Mia tem {n} lápis de cores diferentes, entre eles um vermelho e um azul. O irmãozinho os coloca em fila ao acaso.", "Qual é a probabilidade de ficarem exatamente na ordem favorita de Mia?", "Qual é a probabilidade de o lápis vermelho e o azul ficarem lado a lado?"],
      folge: ["Sequência de cores", "Numa urna há {r} bolas vermelhas e {b} azuis. Tiram-se três bolas, uma após a outra.", "Com reposição: qual é a probabilidade da ordem {f}?", "Sem reposição: qual é a probabilidade da ordem {f}?"],
      spiel: ["Qual jogo?", "Jogo A: tira-se uma bola de uma urna com {a} vermelhas e {a2} azuis – vermelha ganha. Jogo B: tira-se uma bola de cada uma de duas urnas com {c} vermelhas e {c2} azuis – ganha com pelo menos uma vermelha.", "Qual é a probabilidade de ganhar o jogo A?", "Qual é a probabilidade de ganhar o jogo B?"],
      rad: ["Roleta", "Uma roleta tem 8 setores iguais, {k} deles premiados. Ela é girada {n} vezes.", "Qual é a probabilidade de nunca ganhar?", "Qual é a probabilidade de ganhar pelo menos uma vez?"]
    } }
  };
  // Reitername für app.js
  if(window.WT) for(var l0 in SA) if(WT[l0]) WT[l0].tab_sach = SA[l0].tab;

  var lang = "de"; try { lang = localStorage.getItem("msMathLang") || "de"; } catch(e){}
  if(!SA[lang]) lang = "de";
  function S(){ return SA[lang] || SA.de; }
  function $(id){ return document.getElementById(id); }
  function esc(s){ return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function fuell(s, v){ for(var k in v) s = s.split("{" + k + "}").join(v[k]); return s; }
  function zuf(a, b){ return a + Math.floor(Math.random() * (b - a + 1)); }
  function wahl(L){ return L[Math.floor(Math.random() * L.length)]; }
  function ggT(a, b){ a = Math.abs(a); b = Math.abs(b); while(b){ var r = a % b; a = b; b = r; } return a || 1; }
  function fak(n){ var r = 1; for(var i = 2; i <= n; i++) r *= i; return r; }
  function komma(){ return !/^(en|zh|ja|ar)$/.test(lang); }

  // ---------- Brüche ----------
  function F(z, n){ if(n < 0){ z = -z; n = -n; } var g = ggT(z, n); return { z: z / g, n: n / g }; }
  function mal(a, b){ return F(a.z * b.z, a.n * b.n); }
  function plus(a, b){ return F(a.z * b.n + b.z * a.n, a.n * b.n); }
  function eins_minus(a){ return F(a.n - a.z, a.n); }
  function wert(a){ return a.z / a.n; }
  function bt(a){ return a.n === 1 ? String(a.z) : a.z + "/" + a.n; }
  function dez(v, d){ var s = v.toFixed(d).replace(/0+$/, "").replace(/\.$/, ""); return komma() ? s.replace(".", ",") : s; }
  function voll(a){ // „3/8 = 0,375 = 37,5 %“
    var v = wert(a), p = v * 100, pd = p >= 1 ? 2 : p >= 0.01 ? 4 : 6;
    var s = bt(a); if(a.n !== 1) s += " ≈ " + dez(v, v >= 0.001 ? 4 : 8);
    return s + " ≈ " + dez(p, pd) + " %";
  }
  function b(z, n){ return z + "/" + n; } // ungekürzt anzeigen

  // ---------- Aufgaben: erzeugen + lösen ----------
  // jede Funktion liefert { v: {Platzhalter}, f: [ {l: Bruch, w: [[Schritt, Formel], …]} ] }
  var A = {
    socken: function(){
      var g = zuf(3, 7), bl = zuf(2, 5), r = zuf(2, 5), n = g + bl + r, s = S(), k = function(x){ return s[x + "K"] + "\u200E"; };
      var pg = F(g * (g - 1), n * (n - 1)), pb = F(bl * (bl - 1), n * (n - 1)), pr = F(r * (r - 1), n * (n - 1)), p = plus(plus(pg, pb), pr);
      return { v: { g: g, b: bl, r: r }, f: [
        { l: p, w: [["ohne", "n = " + g + " + " + bl + " + " + r + " = " + n],
          ["pfad", "P(" + k("grau") + ", " + k("grau") + ") = " + b(g, n) + " · " + b(g - 1, n - 1) + " = " + b(g * (g - 1), n * (n - 1))],
          ["pfad", "P(" + k("blau") + ", " + k("blau") + ") = " + b(bl, n) + " · " + b(bl - 1, n - 1) + " = " + b(bl * (bl - 1), n * (n - 1))],
          ["pfad", "P(" + k("rot") + ", " + k("rot") + ") = " + b(r, n) + " · " + b(r - 1, n - 1) + " = " + b(r * (r - 1), n * (n - 1))],
          ["summe", "P = " + b(g * (g - 1) + bl * (bl - 1) + r * (r - 1), n * (n - 1)) + " = " + voll(p)]] },
        { l: eins_minus(p), w: [["gegen", "P = 1 − " + bt(p) + " = " + voll(eins_minus(p))]] }] };
    },
    pruef: function(){
      var n = zuf(6, 12), k = zuf(1, n - 2), m = n - k, p1 = F(k, n), keine = F(m * (m - 1), n * (n - 1));
      return { v: { n: n, k: k }, f: [
        { l: p1, w: [["laplace", "P = " + b(k, n) + " = " + voll(p1)]] },
        { l: eins_minus(keine), w: [["pfad", "P(keine) = " + b(m, n) + " · " + b(m - 1, n - 1) + " = " + b(m * (m - 1), n * (n - 1))], ["gegen", "P = 1 − " + bt(keine) + " = " + voll(eins_minus(keine))]] }] };
    },
    wuerfel: function(){
      var m = wahl([3, 4, 5]), sg = zuf(6, 9), cnt = {}, z1 = 0, z2 = 0;
      for(var a = 1; a <= 6; a++) for(var c = 1; c <= 6; c++){ var su = a + c; cnt[su] = (cnt[su] || 0) + 1; if(su % m === 0) z1++; if(su > sg) z2++; }
      var liste = function(test){ var L = []; for(var s2 = 2; s2 <= 12; s2++) if(test(s2)) L.push(s2 + ": " + cnt[s2]); return L.join(" · "); };
      return { v: { m: m, s: sg }, f: [
        { l: F(z1, 36), w: [["produkt", "6 · 6 = 36"], ["zaehl", liste(function(s2){ return s2 % m === 0; }) + "  →  " + z1], ["laplace", "P = " + b(z1, 36) + " = " + voll(F(z1, 36))]] },
        { l: F(z2, 36), w: [["produkt", "6 · 6 = 36"], ["zaehl", liste(function(s2){ return s2 > sg; }) + "  →  " + z2], ["laplace", "P = " + b(z2, 36) + " = " + voll(F(z2, 36))]] }] };
    },
    buch: function(){
      var W = wahl([["A", "N", "A", "N", "A", "S"], ["L", "A", "S", "S", "O"], ["K", "A", "K", "A", "O"], ["O", "T", "T", "O"], ["R", "A", "D", "A", "R"], ["M", "A", "M", "A"]]);
      var n = W.length, z = {}, gleich = 0; W.forEach(function(x){ z[x] = (z[x] || 0) + 1; });
      var teile = []; Object.keys(z).forEach(function(x){ if(z[x] > 1){ gleich += z[x] * (z[x] - 1); teile.push(x + x + ": " + b(z[x], n) + " · " + b(z[x] - 1, n - 1)); } });
      var Lb = wahl(Object.keys(z).filter(function(x){ return z[x] < n - 1; })), a = z[Lb], kein = F((n - a) * (n - a - 1), n * (n - 1)), pg = F(gleich, n * (n - 1));
      return { v: { n: n, w: W.join(", "), L: Lb }, f: [
        { l: pg, w: [["ohne", n + " · " + (n - 1) + " = " + n * (n - 1)], ["summe", teile.join("  +  ")], ["summe", "P = " + b(gleich, n * (n - 1)) + " = " + voll(pg)]] },
        { l: eins_minus(kein), w: [["pfad", "P(" + Lb + "\u0305, " + Lb + "\u0305) = " + b(n - a, n) + " · " + b(n - a - 1, n - 1) + " = " + b((n - a) * (n - a - 1), n * (n - 1))], ["gegen", "P = 1 − " + bt(kein) + " = " + voll(eins_minus(kein))]] }] };
    },
    geb: function(){
      var p = zuf(2, 6), z = 1, f = [], nn = Math.pow(12, p);
      for(var i = 0; i < p; i++){ z *= 12 - i; f.push(b(12 - i, 12)); }
      var P = F(z, nn);
      return { v: { p: p }, f: [
        { l: P, w: [["pfad", f.join(" · ") + " = " + b(z, nn) + " = " + voll(P)]] },
        { l: eins_minus(P), w: [["gegen", "P = 1 − " + bt(P) + " = " + voll(eins_minus(P))]] }] };
    },
    muenze: function(){
      var k = zuf(2, 6), n = zuf(3, 8), p1 = F(1, Math.pow(2, k)), kein = F(1, Math.pow(2, n));
      return { v: { k: k, n: n }, f: [
        { l: p1, w: [["pfad", "(1/2)^" + (k - 1) + " · 1/2 = (1/2)^" + k + " = " + voll(p1)]] },
        { l: eins_minus(kein), w: [["pfad", "(1/2)^" + n + " = " + bt(kein)], ["gegen", "P = 1 − " + bt(kein) + " = " + voll(eins_minus(kein))]] }] };
    },
    paare: function(){
      var m = zuf(3, 7), n = 2 * m, ff = F(m * (m - 1), n * (n - 1)), fm = F(2 * m * m, n * (n - 1)), pa = F(1, n - 1), s0 = S(), s = { frau: s0.frau + "\u200E", mann: s0.mann + "\u200E" };
      return { v: { m: m, n: n }, f: [
        { l: ff, w: [["pfad", "P(" + s.frau + ", " + s.frau + ") = " + b(m, n) + " · " + b(m - 1, n - 1) + " = " + voll(ff)]] },
        { l: fm, w: [["summe", "P(" + s.frau + ", " + s.mann + ") + P(" + s.mann + ", " + s.frau + ") = 2 · " + b(m, n) + " · " + b(m, n - 1) + " = " + voll(fm)]] },
        { l: pa, w: [["pfad", b(n, n) + " · " + b(1, n - 1) + " = " + voll(pa)]] }] };
    },
    kontrolle: function(){
      var n = zuf(15, 30), s = zuf(1, 3), c = zuf(2, 4), z = 1, nn = 1, f = [];
      for(var i = 0; i < c; i++){ z *= n - s - i; nn *= n - i; f.push(b(n - s - i, n - i)); }
      var kein = F(z, nn);
      return { v: { n: n, s: s, c: c }, f: [
        { l: eins_minus(kein), w: [["ohne", f.join(" · ") + " = " + voll(kein)], ["gegen", "P = 1 − " + bt(kein) + " = " + voll(eins_minus(kein))]] },
        { l: F(c, n), w: [["laplace", "P = " + b(c, n) + " = " + voll(F(c, n))]] }] };
    },
    anstellen: function(){
      var bj = zuf(2, 4), g = zuf(2, 3), n = bj + g, gu = fak(bj + 1) * fak(g), al = fak(n), P = F(gu, al);
      return { v: { b: bj, g: g }, f: [
        { l: P, w: [["produkt", n + "! = " + al], ["block", "(" + bj + " + 1)! · " + g + "! = " + fak(bj + 1) + " · " + fak(g) + " = " + gu], ["laplace", "P = " + b(gu, al) + " = " + voll(P)]] },
        { l: F(1, n), w: [["laplace", "P = " + b(fak(n - 1), al) + " = " + voll(F(1, n))]] }] };
    },
    stifte: function(){
      var n = zuf(4, 8), al = fak(n), P2 = F(2 * fak(n - 1), al);
      return { v: { n: n }, f: [
        { l: F(1, al), w: [["produkt", n + "! = " + al], ["laplace", "P = 1/" + al + " = " + voll(F(1, al))]] },
        { l: P2, w: [["block", "2 · (" + n + " − 1)! = 2 · " + fak(n - 1) + " = " + 2 * fak(n - 1)], ["laplace", "P = " + b(2 * fak(n - 1), al) + " = " + voll(P2)]] }] };
    },
    folge: function(){
      var r = zuf(3, 8), bl = zuf(3, 8), n = r + bl, s = S(), M = wahl([["r", "b", "r"], ["b", "r", "b"], ["r", "r", "b"], ["b", "b", "r"], ["r", "b", "b"]]);
      var mit = F(1, 1), ohne = F(1, 1), fm = [], fo = [], R = r, Bl = bl, N = n;
      M.forEach(function(x){ var a = x === "r" ? r : bl; mit = mal(mit, F(a, n)); fm.push(b(a, n)); var c = x === "r" ? R : Bl; ohne = mal(ohne, F(c, N)); fo.push(b(c, N)); if(x === "r") R--; else Bl--; N--; });
      var fTxt = M.map(function(x){ return x === "r" ? s.rot : s.blau; }).join(" – ");
      return { v: { r: r, b: bl, f: fTxt }, f: [
        { l: mit, w: [["pfad", fm.join(" · ") + " = " + voll(mit)]] },
        { l: ohne, w: [["ohne", fo.join(" · ")], ["pfad", voll(ohne)]] }] };
    },
    spiel: function(){
      var a = zuf(2, 5), a2 = zuf(2, 6), c = zuf(1, 3), c2 = zuf(2, 6), pA = F(a, a + a2), kein = F(c2 * c2, (c + c2) * (c + c2)), pB = eins_minus(kein), s = S();
      var bes = wert(pA) > wert(pB) ? "A" : wert(pA) < wert(pB) ? "B" : "A = B";
      return { v: { a: a, a2: a2, c: c, c2: c2 }, f: [
        { l: pA, w: [["laplace", "P(A) = " + b(a, a + a2) + " = " + voll(pA)]] },
        { l: pB, w: [["pfad", "P(" + s.blauK + "\u200E, " + s.blauK + "\u200E) = " + b(c2, c + c2) + " · " + b(c2, c + c2) + " = " + bt(kein)], ["gegen", "P(B) = 1 − " + bt(kein) + " = " + voll(pB)], ["vergleich", dez(wert(pA) * 100, 1) + " %  ↔  " + dez(wert(pB) * 100, 1) + " %  →  " + bes]] }] };
    },
    rad: function(){
      var k = zuf(1, 4), n = zuf(2, 6), q = F(8 - k, 8), nie = F(Math.pow(q.z, n), Math.pow(q.n, n));
      return { v: { k: k, n: n }, f: [
        { l: nie, w: [["pfad", "(" + bt(q) + ")^" + n + " = " + voll(nie)]] },
        { l: eins_minus(nie), w: [["gegen", "P = 1 − " + bt(nie) + " = " + voll(eins_minus(nie))]] }] };
    }
  };
  var REIHE = ["socken", "pruef", "wuerfel", "buch", "geb", "muenze", "paare", "kontrolle", "anstellen", "stifte", "folge", "spiel", "rad"];
  var akt = "socken", inst = null, seed = 1, zust = [];

  // Zufall mit Startwert: dieselben Zahlen nach einem Sprachwechsel
  var rnd = Math.random;
  function mitSeed(sd, fn){ var x = sd; Math.random = function(){ x = (x * 16807) % 2147483647; return (x - 1) / 2147483646; }; try { return fn(); } finally { Math.random = rnd; } }
  function erzeuge(){ inst = mitSeed(seed, A[akt]); }

  // ---------- Eingabe prüfen ----------
  function lies(s){
    s = String(s).trim().replace(/\s+/g, "").replace(/[−–]/g, "-");
    var pr = /%$/.test(s); if(pr) s = s.slice(0, -1);
    s = s.replace(",", ".");
    var m = s.match(/^(\d+)\/(\d+)$/), v, d = null;
    if(m){ if(!+m[2]) return null; v = +m[1] / +m[2]; }
    else if(/^\d*\.?\d+$/.test(s) || /^\d+\.$/.test(s)){ v = +s; d = (s.split(".")[1] || "").length; }
    else return null;
    if(pr){ v /= 100; if(d != null) d += 2; }
    return { v: v, d: d };
  }
  function stimmt(e, l){
    var x = wert(l); if(!e) return false;
    if(Math.abs(e.v - x) < 1e-9) return true;
    if(e.d == null) return false;                 // Bruch: muss genau stimmen
    if(e.v === 0) return false;
    var f = Math.pow(10, e.d);                   // gerundete Eingabe: passt sie zur gerundeten Lösung?
    return Math.abs(Math.round(x * f) - Math.round(e.v * f)) <= (e.d >= 3 ? 1 : 0) && e.d >= 2;
  }

  // ---------- Anzeige ----------
  function zeigen(){
    var box = $("sach"); if(!box) return;
    var s = S(); if(!inst) erzeuge();
    var T = s.A[akt], h = '<p class="zeile">' + esc(s.intro) + '</p><div class="sa-wahl" id="saWahl">' +
      REIHE.map(function(k, i){ return '<button type="button" data-a="' + k + '" aria-pressed="' + (k === akt) + '"><b>' + (i + 1) + "</b> " + esc(s.A[k][0]) + "</button>"; }).join("") + "</div>";
    h += '<div class="sa-auf"><h3>' + esc(s.aufgabe) + " " + (REIHE.indexOf(akt) + 1) + ": " + esc(T[0]) + '</h3><p class="zeile">' + esc(fuell(T[1], inst.v)) + "</p>";
    inst.f.forEach(function(q, i){
      var z = zust[i] || {};
      h += '<div class="sa-frage"><p class="zeile"><b>' + String.fromCharCode(97 + i) + ")</b> " + esc(fuell(T[2 + i], inst.v)) + "</p>" +
        '<div class="sa-ein"><input class="zahl sa-inp" data-i="' + i + '" inputmode="text" autocomplete="off" placeholder="' + esc(s.ein) + '" value="' + esc(z.e || "") + '"> <button type="button" class="knopf sa-pr" data-i="' + i + '">' + esc(s.pruefen) + "</button>" +
        ' <span class="meldung sa-m ' + (z.ok === true ? "gut" : z.ok === false ? "schlecht" : "") + '">' + (z.ok === true ? esc(s.richtig) : z.ok === false ? esc(s.falsch) : "") + "</span></div>" +
        '<details class="sa-tipp"' + (z.ok === false ? " open" : "") + "><summary>" + esc(s.tipp) + "</summary><p>" + esc(s.T[akt]) + "</p></details>" +
        '<details class="sa-weg"' + (z.ok === true ? " open" : "") + "><summary>" + esc(s.weg) + '</summary><ol class="lauf">' +
        q.w.map(function(w){ return "<li><span class=\"sa-l\">" + esc(s.L[w[0]] || "") + '</span><br><bdi dir="ltr">' + esc(w[1]) + "</bdi></li>"; }).join("") +
        '</ol><p class="sa-erg"><b>' + esc(s.loesung) + '</b> <bdi dir="ltr">' + esc(voll(q.l)) + "</bdi></p></details></div>";
    });
    h += '<p><button type="button" class="knopf hell" id="saNeu">↻ ' + esc(s.neu) + "</button></p></div>";
    box.innerHTML = h;
    box.querySelectorAll("#saWahl button").forEach(function(btn){ btn.addEventListener("click", function(){ akt = btn.dataset.a; seed = 1 + Math.floor(rnd() * 2147483645); inst = null; zust = []; zeigen(); }); });
    $("saNeu").addEventListener("click", function(){ seed = 1 + Math.floor(rnd() * 2147483645); inst = null; zust = []; zeigen(); });
    function pruefe(i){
      var inp = box.querySelector('.sa-inp[data-i="' + i + '"]'), e = lies(inp.value);
      zust[i] = { e: inp.value, ok: stimmt(e, inst.f[i].l) }; zeigen();
      var n = box.querySelector('.sa-inp[data-i="' + (zust[i].ok ? i + 1 : i) + '"]'); if(n) n.focus();
    }
    box.querySelectorAll(".sa-pr").forEach(function(btn){ btn.addEventListener("click", function(){ pruefe(+btn.dataset.i); }); });
    box.querySelectorAll(".sa-inp").forEach(function(inp){
      inp.addEventListener("keydown", function(e){ if(e.key === "Enter"){ e.preventDefault(); pruefe(+inp.dataset.i); } });
      inp.addEventListener("input", function(){ var i = +inp.dataset.i; zust[i] = { e: inp.value }; });
    });
  }
  var css = document.createElement("style");
  css.textContent =
    ".sa-wahl{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0 12px}" +
    ".sa-wahl button{font:600 14px system-ui,sans-serif;padding:6px 11px;border-radius:999px;border:2px solid #b0b0b8;background:#ffffff;color:#1a2233;cursor:pointer}" +
    ".sa-wahl button b{color:#1565c0}.sa-wahl button[aria-pressed=\"true\"]{background:#1565c0;border-color:#1565c0;color:#ffffff}.sa-wahl button[aria-pressed=\"true\"] b{color:#ffffff}" +
    ".sa-auf{border:2px solid #c9dcf2;border-radius:12px;padding:10px 12px;background:#fbfdff}.sa-auf h3{margin:0 0 4px;color:#1565c0;font-size:18px}" +
    ".sa-frage{border-top:1px solid #dbe5f3;padding-top:8px;margin-top:8px}" +
    ".sa-ein{display:flex;flex-wrap:wrap;align-items:center;gap:8px}.sa-inp{width:150px !important}" +
    ".sa-m{margin:0 !important}" +
    ".sa-tipp,.sa-weg{margin:6px 0}.sa-tipp summary,.sa-weg summary{cursor:pointer;font-weight:700;color:#1565c0;font-size:15px;padding:4px 0}" +
    ".sa-tipp p{background:#fff8e1;border-inline-start:4px solid #f59e0b;padding:6px 10px;border-radius:8px;margin:4px 0;font-size:15.5px;line-height:1.45;color:#1a2233}" +
    ".sa-weg .lauf{font-size:16.5px;line-height:1.5}.sa-weg .lauf li{margin:4px 0}.sa-l{color:#4f5b6e;font-size:14px}" +
    ".sa-erg{background:#effaf2;border-radius:8px;padding:6px 10px;margin:4px 0;font-size:16.5px;color:#1a2233}";
  document.head.appendChild(css);
  window.MS_WK_SACH = { sprache: function(l){ if(SA[l]) lang = l; inst = null; zeigen(); }, zeigen: zeigen };
})();
