// Alltagsbeispiele für /graphen/, 9 Sprachen. Baustein: /alltag.js, Zeichnungen: /alltag-bilder.js (graphen)
MS_ALLTAG.einbauen({ nach: document.querySelector(".tabs") || document.querySelector(".oben") || document.getElementById("titel"), daten: {
de: [
  ["Handytarif", "Der Graph zeigt die Kosten eines Handytarifs: 0 Minuten kosten 5 €, 100 Minuten kosten 15 €. Wie lautet die Gleichung?", "$m = (15 − 5) : 100$\n$m = 0,1$\n$t = 5$\n$f(x) = 0,1x + 5$"],
  ["Brückenbogen", "Ein Brückenbogen ist 40 m breit und in der Mitte 8 m hoch. Lege die Mitte auf die y-Achse.", "$S(0 | 8)$\n$f(x) = a·x² + 8$\n$0 = a·20² + 8$\n$0 = 400a + 8$\n$a = −0,02$\n$f(x) = −0,02x² + 8$"],
  ["Ballwurf", "Ein Ball wird in 2 m Höhe abgeworfen und erreicht nach 3 m waagerechter Strecke seine größte Höhe von 5 m.", "$S(3 | 5)$\n$f(x) = a·(x − 3)² + 5$\n$2 = a·(0 − 3)² + 5$\n$2 = 9a + 5$\n$a = −1/3$\n$f(x) = −1/3·(x − 3)² + 5$"],
  ["Achterbahn", "Ein Achterbahnstück startet bei x = 0 am Boden, berührt bei x = 4 wieder den Boden und ist bei x = 2 genau 8 m hoch (Polynom 3. Grades).", "$f(x) = a·x·(x − 4)²$\n$8 = a·2·(2 − 4)²$\n$8 = 8a$\n$a = 1$\n$f(x) = x·(x − 4)²$"]
],
en: [
  ["Phone plan", "The graph shows the cost of a phone plan: 0 minutes cost €5, 100 minutes cost €15. What is the equation?", "$m = (15 − 5) : 100$\n$m = 0.1$\n$t = 5$\n$f(x) = 0.1x + 5$"],
  ["Bridge arch", "A bridge arch is 40 m wide and 8 m high in the middle. Put the middle on the y-axis.", "$S(0 | 8)$\n$f(x) = a·x² + 8$\n$0 = a·20² + 8$\n$0 = 400a + 8$\n$a = −0.02$\n$f(x) = −0.02x² + 8$"],
  ["Throwing a ball", "A ball is thrown from a height of 2 m and reaches its highest point of 5 m after 3 m horizontally.", "$S(3 | 5)$\n$f(x) = a·(x − 3)² + 5$\n$2 = a·(0 − 3)² + 5$\n$2 = 9a + 5$\n$a = −1/3$\n$f(x) = −1/3·(x − 3)² + 5$"],
  ["Roller coaster", "A piece of roller coaster starts on the ground at x = 0, touches the ground again at x = 4 and is exactly 8 m high at x = 2 (cubic polynomial).", "$f(x) = a·x·(x − 4)²$\n$8 = a·2·(2 − 4)²$\n$8 = 8a$\n$a = 1$\n$f(x) = x·(x − 4)²$"]
],
es: [
  ["Tarifa de móvil", "La gráfica muestra el coste de una tarifa: 0 minutos cuestan 5 €, 100 minutos cuestan 15 €. ¿Cuál es la ecuación?", "$m = (15 − 5) : 100$\n$m = 0,1$\n$t = 5$\n$f(x) = 0,1x + 5$"],
  ["Arco de puente", "Un arco de puente mide 40 m de ancho y 8 m de alto en el centro. Pon el centro en el eje y.", "$S(0 | 8)$\n$f(x) = a·x² + 8$\n$0 = a·20² + 8$\n$0 = 400a + 8$\n$a = −0,02$\n$f(x) = −0,02x² + 8$"],
  ["Lanzamiento de balón", "Un balón se lanza desde 2 m de altura y alcanza su altura máxima de 5 m tras 3 m de recorrido horizontal.", "$S(3 | 5)$\n$f(x) = a·(x − 3)² + 5$\n$2 = a·(0 − 3)² + 5$\n$2 = 9a + 5$\n$a = −1/3$\n$f(x) = −1/3·(x − 3)² + 5$"],
  ["Montaña rusa", "Un tramo de montaña rusa empieza en el suelo en x = 0, vuelve a tocar el suelo en x = 4 y en x = 2 está a 8 m de altura (polinomio de grado 3).", "$f(x) = a·x·(x − 4)²$\n$8 = a·2·(2 − 4)²$\n$8 = 8a$\n$a = 1$\n$f(x) = x·(x − 4)²$"]
],
zh: [
  ["手机套餐", "图像表示手机套餐的费用：0 分钟 5 €，100 分钟 15 €。解析式是什么？", "$m = (15 − 5) : 100$\n$m = 0.1$\n$t = 5$\n$f(x) = 0.1x + 5$"],
  ["桥拱", "桥拱宽 40 m，中间高 8 m。把中点放在 y 轴上。", "$S(0 | 8)$\n$f(x) = a·x² + 8$\n$0 = a·20² + 8$\n$0 = 400a + 8$\n$a = −0.02$\n$f(x) = −0.02x² + 8$"],
  ["抛球", "球从 2 m 高处抛出，水平前进 3 m 时达到最高点 5 m。", "$S(3 | 5)$\n$f(x) = a·(x − 3)² + 5$\n$2 = a·(0 − 3)² + 5$\n$2 = 9a + 5$\n$a = −1/3$\n$f(x) = −1/3·(x − 3)² + 5$"],
  ["过山车", "一段过山车在 x = 0 处从地面出发，在 x = 4 处再次接触地面，在 x = 2 处高 8 m（三次多项式）。", "$f(x) = a·x·(x − 4)²$\n$8 = a·2·(2 − 4)²$\n$8 = 8a$\n$a = 1$\n$f(x) = x·(x − 4)²$"]
],
fr: [
  ["Forfait mobile", "La courbe montre le coût d’un forfait : 0 minute coûte 5 €, 100 minutes coûtent 15 €. Quelle est l’équation ?", "$m = (15 − 5) : 100$\n$m = 0,1$\n$t = 5$\n$f(x) = 0,1x + 5$"],
  ["Arche de pont", "Une arche de pont mesure 40 m de large et 8 m de haut au milieu. Place le milieu sur l’axe des y.", "$S(0 | 8)$\n$f(x) = a·x² + 8$\n$0 = a·20² + 8$\n$0 = 400a + 8$\n$a = −0,02$\n$f(x) = −0,02x² + 8$"],
  ["Lancer de balle", "Une balle est lancée à 2 m de haut et atteint sa hauteur maximale de 5 m après 3 m à l’horizontale.", "$S(3 | 5)$\n$f(x) = a·(x − 3)² + 5$\n$2 = a·(0 − 3)² + 5$\n$2 = 9a + 5$\n$a = −1/3$\n$f(x) = −1/3·(x − 3)² + 5$"],
  ["Montagnes russes", "Un tronçon de montagnes russes part du sol en x = 0, touche à nouveau le sol en x = 4 et se trouve à 8 m de haut en x = 2 (polynôme de degré 3).", "$f(x) = a·x·(x − 4)²$\n$8 = a·2·(2 − 4)²$\n$8 = 8a$\n$a = 1$\n$f(x) = x·(x − 4)²$"]
],
ru: [
  ["Тариф", "График показывает стоимость тарифа: 0 минут – 5 €, 100 минут – 15 €. Каково уравнение?", "$m = (15 − 5) : 100$\n$m = 0,1$\n$t = 5$\n$f(x) = 0,1x + 5$"],
  ["Арка моста", "Арка моста шириной 40 м и высотой 8 м в середине. Помести середину на ось y.", "$S(0 | 8)$\n$f(x) = a·x² + 8$\n$0 = a·20² + 8$\n$0 = 400a + 8$\n$a = −0,02$\n$f(x) = −0,02x² + 8$"],
  ["Бросок мяча", "Мяч бросают с высоты 2 м, через 3 м по горизонтали он достигает наибольшей высоты 5 м.", "$S(3 | 5)$\n$f(x) = a·(x − 3)² + 5$\n$2 = a·(0 − 3)² + 5$\n$2 = 9a + 5$\n$a = −1/3$\n$f(x) = −1/3·(x − 3)² + 5$"],
  ["Американские горки", "Участок горок начинается на земле при x = 0, снова касается земли при x = 4 и при x = 2 находится на высоте 8 м (многочлен 3-й степени).", "$f(x) = a·x·(x − 4)²$\n$8 = a·2·(2 − 4)²$\n$8 = 8a$\n$a = 1$\n$f(x) = x·(x − 4)²$"]
],
ar: [
  ["باقة الهاتف", "يبين المنحنى تكلفة باقة هاتف: 0 دقيقة تكلف 5 € و100 دقيقة تكلف 15 €. ما المعادلة؟", "$m = (15 − 5) : 100$\n$m = 0.1$\n$t = 5$\n$f(x) = 0.1x + 5$"],
  ["قوس جسر", "قوس جسر عرضه 40 m وارتفاعه في الوسط 8 m. ضع المنتصف على المحور y.", "$S(0 | 8)$\n$f(x) = a·x² + 8$\n$0 = a·20² + 8$\n$0 = 400a + 8$\n$a = −0.02$\n$f(x) = −0.02x² + 8$"],
  ["رمي كرة", "تُرمى كرة من ارتفاع 2 m وتبلغ أقصى ارتفاع 5 m بعد مسافة أفقية 3 m.", "$S(3 | 5)$\n$f(x) = a·(x − 3)² + 5$\n$2 = a·(0 − 3)² + 5$\n$2 = 9a + 5$\n$a = −1/3$\n$f(x) = −1/3·(x − 3)² + 5$"],
  ["قطار الملاهي", "جزء من قطار الملاهي يبدأ على الأرض عند x = 0 ويلمس الأرض مجددًا عند x = 4 وارتفاعه عند x = 2 يساوي 8 m (كثير حدود من الدرجة 3).", "$f(x) = a·x·(x − 4)²$\n$8 = a·2·(2 − 4)²$\n$8 = 8a$\n$a = 1$\n$f(x) = x·(x − 4)²$"]
],
ja: [
  ["スマホ料金", "グラフはスマホ料金を表す：0 分で 5 €、100 分で 15 €。式は？", "$m = (15 − 5) : 100$\n$m = 0.1$\n$t = 5$\n$f(x) = 0.1x + 5$"],
  ["橋のアーチ", "橋のアーチは幅 40 m、中央の高さ 8 m。中央を y 軸におく。", "$S(0 | 8)$\n$f(x) = a·x² + 8$\n$0 = a·20² + 8$\n$0 = 400a + 8$\n$a = −0.02$\n$f(x) = −0.02x² + 8$"],
  ["ボール投げ", "ボールを高さ 2 m から投げると、水平に 3 m 進んだところで最高 5 m になる。", "$S(3 | 5)$\n$f(x) = a·(x − 3)² + 5$\n$2 = a·(0 − 3)² + 5$\n$2 = 9a + 5$\n$a = −1/3$\n$f(x) = −1/3·(x − 3)² + 5$"],
  ["ジェットコースター", "コースの一部は x = 0 で地面から始まり、x = 4 で再び地面に接し、x = 2 で高さ 8 m（3 次式）。", "$f(x) = a·x·(x − 4)²$\n$8 = a·2·(2 − 4)²$\n$8 = 8a$\n$a = 1$\n$f(x) = x·(x − 4)²$"]
],
pt: [
  ["Plano de celular", "O gráfico mostra o custo de um plano: 0 minutos custam 5 €, 100 minutos custam 15 €. Qual é a equação?", "$m = (15 − 5) : 100$\n$m = 0,1$\n$t = 5$\n$f(x) = 0,1x + 5$"],
  ["Arco de ponte", "Um arco de ponte tem 40 m de largura e 8 m de altura no meio. Coloque o meio no eixo y.", "$S(0 | 8)$\n$f(x) = a·x² + 8$\n$0 = a·20² + 8$\n$0 = 400a + 8$\n$a = −0,02$\n$f(x) = −0,02x² + 8$"],
  ["Lançamento de bola", "Uma bola é lançada a 2 m de altura e atinge a altura máxima de 5 m após 3 m na horizontal.", "$S(3 | 5)$\n$f(x) = a·(x − 3)² + 5$\n$2 = a·(0 − 3)² + 5$\n$2 = 9a + 5$\n$a = −1/3$\n$f(x) = −1/3·(x − 3)² + 5$"],
  ["Montanha-russa", "Um trecho de montanha-russa começa no chão em x = 0, toca o chão de novo em x = 4 e está a 8 m de altura em x = 2 (polinômio de grau 3).", "$f(x) = a·x·(x − 4)²$\n$8 = a·2·(2 − 4)²$\n$8 = 8a$\n$a = 1$\n$f(x) = x·(x − 4)²$"]
]
} });
