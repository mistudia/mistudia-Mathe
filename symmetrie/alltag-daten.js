// Alltagsbeispiele für /symmetrie/, 9 Sprachen. „Ausprobieren“: MS_SYM.laden({fig, dreh} | {funk, eigen}).
MS_ALLTAG.einbauen({ nach: document.querySelector(".tabs"),
werte: [
  { fig: "bA", dreh: 0 },
  { fig: "dreieckGS", dreh: 120 },
  { fig: "bZ", dreh: 180 },
  { fig: "sechseck", dreh: 60 },
  { funk: "eigen", eigen: "-0.25x^2 + 4" }
],
laden: function(w){ window.MS_SYM.laden(w); },
daten: {
de: [
  ["Schrift auf dem Krankenwagen", "Vorne auf Krankenwagen steht „AMBULANZ“ spiegelverkehrt. Warum? Und welche Buchstaben sehen gespiegelt gleich aus?", "Im Rückspiegel eines Autos wird die Schrift noch einmal gespiegelt – dann ist sie richtig lesbar.\nA, M, U, H, T, X haben eine senkrechte Spiegelachse und bleiben gleich. N und Z sind nicht achsensymmetrisch (nur punktsymmetrisch)."],
  ["Windrad", "Ein Windrad hat drei Flügel. Um welchen Winkel muss es sich drehen, damit es wieder genauso aussieht?", "$360° : 3 = 120°$. Das Windrad ist drehsymmetrisch mit dem Drehwinkel 120° (wie ein gleichseitiges Dreieck)."],
  ["Spielkarten", "Bube, Dame und König sind auf Spielkarten oben und unten abgebildet. Was hat das mit Symmetrie zu tun?", "Die Karte sieht nach einer halben Drehung (180°) gleich aus – sie ist punktsymmetrisch. So kann man sie von beiden Seiten lesen. Genauso der Buchstabe Z."],
  ["Bienenwabe und Schneeflocke", "Bienenwaben und Schneeflocken sind sechseckig. Wie viele Symmetrieachsen hat ein regelmäßiges Sechseck, und um welchen Winkel kann man es drehen?", "6 Symmetrieachsen. Drehwinkel $360° : 6 = 60°$ (und alle Vielfachen: 120°, 180°, …). Wegen 180° ist es auch punktsymmetrisch."],
  ["Brückenbogen", "Ein Brückenbogen hat die Form $f(x) = −0,25x² + 4$ (x in m, x = 0 in der Mitte). Warum ist er links und rechts gleich?", "In $f(x) = −0,25x² + 4$ kommen nur gerade Hochzahlen vor ($x²$ und $x⁰$). Dann gilt $f(−x) = f(x)$: Der Graph ist achsensymmetrisch zur y-Achse.\nAuf beiden Seiten ist der Bogen bei $x = ±4$ wieder am Boden: $f(4) = −4 + 4 = 0$."]
],
en: [
  ["Lettering on an ambulance", "On the front of ambulances the word “AMBULANCE” is written in mirror writing. Why? And which letters look the same in a mirror?", "In a car’s rear-view mirror the writing is mirrored once more – then it reads correctly.\nA, M, U, H, T, X have a vertical line of symmetry and stay the same. N and Z have no line of symmetry (only point symmetry)."],
  ["Wind turbine", "A wind turbine has three blades. Through what angle must it turn to look exactly the same again?", "$360° : 3 = 120°$. The wind turbine has rotational symmetry with an angle of 120° (like an equilateral triangle)."],
  ["Playing cards", "Jack, queen and king are shown at the top and bottom of playing cards. What has that got to do with symmetry?", "The card looks the same after a half turn (180°) – it has point symmetry. So you can read it from both ends. The letter Z works the same way."],
  ["Honeycomb and snowflake", "Honeycombs and snowflakes are hexagonal. How many lines of symmetry does a regular hexagon have, and through which angle can you turn it?", "6 lines of symmetry. Angle of rotation $360° : 6 = 60°$ (and all multiples: 120°, 180°, …). Because of 180° it also has point symmetry."],
  ["Bridge arch", "A bridge arch has the shape $f(x) = −0.25x² + 4$ (x in m, x = 0 in the middle). Why is it the same on the left and right?", "$f(x) = −0.25x² + 4$ only has even powers ($x²$ and $x⁰$). Then $f(−x) = f(x)$: the graph is symmetric about the y-axis.\nOn both sides the arch reaches the ground at $x = ±4$: $f(4) = −4 + 4 = 0$."]
],
es: [
  ["Rótulo de la ambulancia", "En la parte delantera de las ambulancias la palabra «AMBULANCIA» está escrita al revés, como en un espejo. ¿Por qué? ¿Qué letras se ven igual en el espejo?", "En el retrovisor de un coche el texto se refleja otra vez, y entonces se lee bien.\nA, M, U, H, T, X tienen un eje de simetría vertical y no cambian. N y Z no tienen eje de simetría (solo simetría central)."],
  ["Aerogenerador", "Un aerogenerador tiene tres palas. ¿Cuánto tiene que girar para verse exactamente igual?", "$360° : 3 = 120°$. Tiene simetría de rotación de 120° (como un triángulo equilátero)."],
  ["Cartas de la baraja", "La sota, el caballo y el rey aparecen arriba y abajo en muchas cartas. ¿Qué tiene eso que ver con la simetría?", "La carta se ve igual tras media vuelta (180°): tiene simetría central. Así se puede leer desde los dos lados. Igual que la letra Z."],
  ["Panal y copo de nieve", "Los panales y los copos de nieve son hexagonales. ¿Cuántos ejes de simetría tiene un hexágono regular y cuánto se puede girar?", "6 ejes de simetría. Ángulo de giro $360° : 6 = 60°$ (y sus múltiplos: 120°, 180°, …). Por los 180° también tiene simetría central."],
  ["Arco de un puente", "Un arco de puente tiene la forma $f(x) = −0,25x² + 4$ (x en m, x = 0 en el centro). ¿Por qué es igual a izquierda y derecha?", "En $f(x) = −0,25x² + 4$ solo hay exponentes pares ($x²$ y $x⁰$). Entonces $f(−x) = f(x)$: la gráfica es simétrica respecto al eje y.\nA ambos lados el arco llega al suelo en $x = ±4$: $f(4) = −4 + 4 = 0$."]
],
zh: [
  ["救护车上的字", "有些国家救护车车头上的字是左右反着写的。为什么？哪些字母在镜子里看起来一样？", "在前车的后视镜里，字又被镜像一次——这样就能正着读了。\nA、M、U、H、T、X 有竖直的对称轴，镜像后不变。N 和 Z 不是轴对称的（只是中心对称）。"],
  ["风力发电机", "风力发电机有三片叶片。它至少要转多少度才能看起来和原来一样？", "$360° : 3 = 120°$。风车是旋转对称的，旋转角是 120°（和等边三角形一样）。"],
  ["扑克牌", "扑克牌上的 J、Q、K 上下各画了一次。这和对称有什么关系？", "牌转半圈（180°）后看起来一样——它是中心对称的，所以从两头都能看。字母 Z 也是这样。"],
  ["蜂巢和雪花", "蜂巢和雪花都是六边形。正六边形有几条对称轴？可以旋转多少度？", "6 条对称轴。旋转角 $360° : 6 = 60°$（以及它的倍数：120°、180°……）。因为有 180°，它也是中心对称的。"],
  ["拱桥", "一座拱桥的形状是 $f(x) = −0.25x² + 4$（x 单位为 m，x = 0 在中间）。为什么左右一样？", "$f(x) = −0.25x² + 4$ 中只有偶数次幂（$x²$ 和 $x⁰$）。所以 $f(−x) = f(x)$：图像关于 y 轴对称。\n两边在 $x = ±4$ 处落地：$f(4) = −4 + 4 = 0$。"]
],
fr: [
  ["Inscription sur l’ambulance", "À l’avant des ambulances, le mot « AMBULANCE » est écrit à l’envers, comme dans un miroir. Pourquoi ? Et quelles lettres restent identiques dans un miroir ?", "Dans le rétroviseur d’une voiture, l’écriture est encore une fois reflétée : elle devient lisible.\nA, M, U, H, T, X ont un axe de symétrie vertical et restent identiques. N et Z n’ont pas d’axe de symétrie (seulement un centre de symétrie)."],
  ["Éolienne", "Une éolienne a trois pales. De quel angle doit-elle tourner pour avoir exactement le même aspect ?", "$360° : 3 = 120°$. L’éolienne a une symétrie de rotation d’angle 120° (comme un triangle équilatéral)."],
  ["Cartes à jouer", "Le valet, la dame et le roi sont dessinés en haut et en bas des cartes. Quel rapport avec la symétrie ?", "La carte est identique après un demi-tour (180°) : elle a un centre de symétrie. On peut donc la lire des deux côtés. Comme la lettre Z."],
  ["Alvéole et flocon de neige", "Les alvéoles des abeilles et les flocons de neige sont hexagonaux. Combien d’axes de symétrie a un hexagone régulier, et de quel angle peut-on le tourner ?", "6 axes de symétrie. Angle de rotation $360° : 6 = 60°$ (et ses multiples : 120°, 180°, …). Grâce aux 180°, il a aussi un centre de symétrie."],
  ["Arche de pont", "Une arche de pont a la forme $f(x) = −0,25x² + 4$ (x en m, x = 0 au milieu). Pourquoi est-elle identique à gauche et à droite ?", "Dans $f(x) = −0,25x² + 4$ il n’y a que des puissances paires ($x²$ et $x⁰$). Donc $f(−x) = f(x)$ : la courbe est symétrique par rapport à l’axe des ordonnées.\nDes deux côtés l’arche touche le sol en $x = ±4$ : $f(4) = −4 + 4 = 0$."]
],
ru: [
  ["Надпись на скорой помощи", "Спереди на машинах скорой помощи надпись часто написана зеркально. Почему? И какие буквы в зеркале выглядят так же?", "В зеркале заднего вида надпись отражается ещё раз – и читается правильно.\nA, M, U, H, T, X (и русские А, М, Н, Т, Х) имеют вертикальную ось симметрии и не меняются. N и Z не имеют оси симметрии (только центр симметрии)."],
  ["Ветряк", "У ветряка три лопасти. На какой угол его нужно повернуть, чтобы он выглядел точно так же?", "$360° : 3 = 120°$. Ветряк обладает поворотной симметрией с углом 120° (как равносторонний треугольник)."],
  ["Игральные карты", "Валет, дама и король нарисованы на картах сверху и снизу. При чём тут симметрия?", "После поворота на пол-оборота (180°) карта выглядит так же – у неё есть центр симметрии. Поэтому её можно смотреть с обеих сторон. Так же устроена буква Z."],
  ["Пчелиные соты и снежинка", "Соты и снежинки шестиугольные. Сколько осей симметрии у правильного шестиугольника и на какой угол его можно повернуть?", "6 осей симметрии. Угол поворота $360° : 6 = 60°$ (и кратные: 120°, 180°, …). Из-за 180° у него есть и центр симметрии."],
  ["Арка моста", "Арка моста имеет форму $f(x) = −0,25x² + 4$ (x в м, x = 0 посередине). Почему слева и справа она одинакова?", "В $f(x) = −0,25x² + 4$ есть только чётные степени ($x²$ и $x⁰$). Тогда $f(−x) = f(x)$: график симметричен относительно оси y.\nС обеих сторон арка касается земли при $x = ±4$: $f(4) = −4 + 4 = 0$."]
],
ar: [
  ["الكتابة على سيارة الإسعاف", "في بعض البلدان تُكتب كلمة «AMBULANCE» على مقدمة سيارة الإسعاف معكوسة كما في المرآة. لماذا؟ وأي الحروف تبدو كما هي في المرآة؟", "في مرآة السيارة الخلفية تنعكس الكتابة مرة أخرى فتصبح مقروءة بشكل صحيح.\nللحروف A وM وU وH وT وX محور تماثل رأسي فلا تتغير. أما N وZ فليس لهما محور تماثل (لهما مركز تماثل فقط)."],
  ["توربين الرياح", "لتوربين الرياح ثلاث شفرات. بأي زاوية يجب أن يدور ليبدو تمامًا كما كان؟", "$360° : 3 = 120°$. للتوربين تماثل دوراني بزاوية 120° (مثل المثلث متساوي الأضلاع)."],
  ["أوراق اللعب", "يُرسم الولد والملكة والملك في أعلى ورقة اللعب وأسفلها. ما علاقة ذلك بالتماثل؟", "تبدو الورقة كما هي بعد نصف دورة (180°) – لها مركز تماثل، لذلك تُقرأ من الجهتين. وكذلك الحرف Z."],
  ["خلية النحل وندفة الثلج", "خلايا النحل وندفات الثلج سداسية. كم محور تماثل للسداسي المنتظم، وبأي زاوية يمكن تدويره؟", "6 محاور تماثل. زاوية الدوران $360° : 6 = 60°$ (ومضاعفاتها: 120°، 180°، …). وبسبب 180° له مركز تماثل أيضًا."],
  ["قوس جسر", "شكل قوس جسر هو $f(x) = −0.25x² + 4$ (x بالمتر، و x = 0 في المنتصف). لماذا هو متماثل يمينًا ويسارًا؟", "في $f(x) = −0.25x² + 4$ لا توجد إلا قوى زوجية ($x²$ و$x⁰$). إذن $f(−x) = f(x)$: المنحنى متماثل حول محور y.\nيلمس القوس الأرض من الجهتين عند $x = ±4$: $f(4) = −4 + 4 = 0$."]
],
ja: [
  ["救急車の文字", "国によっては、救急車の前に「AMBULANCE」と鏡文字で書いてある。なぜ？鏡に映しても同じに見える文字は？", "前の車のバックミラーで文字がもう一度反転して、正しく読めるようになる。\nA, M, U, H, T, X はたての対称の軸があるので変わらない。N と Z は線対称ではない（点対称だけ）。"],
  ["風車", "羽根が 3 枚の風車。何度回すと元とまったく同じに見える？", "$360° : 3 = 120°$。風車は 120° の回転対称（正三角形と同じ）。"],
  ["トランプ", "トランプの J、Q、K は上下に 2 回描かれている。対称とどんな関係がある？", "半回転（180°）しても同じに見える――点対称。だからどちら向きでも見られる。アルファベットの Z も同じ。"],
  ["ハチの巣と雪の結晶", "ハチの巣や雪の結晶は六角形。正六角形の対称の軸は何本？何度回せる？", "対称の軸は 6 本。回転の角は $360° : 6 = 60°$（とその倍数 120°、180° …）。180° でも重なるので点対称でもある。"],
  ["橋のアーチ", "橋のアーチの形は $f(x) = −0.25x² + 4$（x の単位は m、x = 0 が真ん中）。なぜ左右が同じ？", "$f(x) = −0.25x² + 4$ には偶数乗（$x²$ と $x⁰$）しかない。だから $f(−x) = f(x)$：グラフは y 軸について対称。\n両側で $x = ±4$ のとき地面に着く：$f(4) = −4 + 4 = 0$。"]
],
pt: [
  ["Letreiro da ambulância", "Na frente das ambulâncias a palavra «AMBULÂNCIA» está escrita ao contrário, como num espelho. Porquê? E que letras ficam iguais no espelho?", "No retrovisor de um carro o texto é refletido mais uma vez – e fica legível.\nA, M, U, H, T, X têm um eixo de simetria vertical e não mudam. N e Z não têm eixo de simetria (só simetria central)."],
  ["Aerogerador", "Um aerogerador tem três pás. Quanto tem de rodar para ficar exatamente igual?", "$360° : 3 = 120°$. Tem simetria de rotação de 120° (como um triângulo equilátero)."],
  ["Cartas de jogar", "O valete, a dama e o rei aparecem em cima e em baixo nas cartas. O que tem isso a ver com simetria?", "A carta fica igual depois de meia volta (180°): tem simetria central. Por isso lê-se dos dois lados. Tal como a letra Z."],
  ["Favo de mel e floco de neve", "Os favos de mel e os flocos de neve são hexagonais. Quantos eixos de simetria tem um hexágono regular e de quanto se pode rodar?", "6 eixos de simetria. Ângulo de rotação $360° : 6 = 60°$ (e os múltiplos: 120°, 180°, …). Por causa dos 180° também tem simetria central."],
  ["Arco de uma ponte", "O arco de uma ponte tem a forma $f(x) = −0,25x² + 4$ (x em m, x = 0 no meio). Porque é igual à esquerda e à direita?", "Em $f(x) = −0,25x² + 4$ só há expoentes pares ($x²$ e $x⁰$). Então $f(−x) = f(x)$: o gráfico é simétrico em relação ao eixo y.\nDos dois lados o arco toca o chão em $x = ±4$: $f(4) = −4 + 4 = 0$."]
]
}});
