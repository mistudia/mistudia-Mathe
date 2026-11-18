// ============================================================
// beruehmt/texte5.js – Vierfarbensatz: Ring-Erklärung, Beispiele, Nachbarschaftsnetz, Beweisweg (9 Sprachen), wird in BA gemischt
// ============================================================
var BA5 = {
  de: {
    f_netz: "Nachbarschaftsnetz",
    f_ring_h: "Ring aus 3, 4 oder 5 Nachbarn",
    f_ring_anl: "Ein Land in der Mitte, rundherum ein Ring aus Nachbarländern. Tippe ein Feld mehrmals an, um seine Farbe zu wechseln. Wie viele Farben brauchst du?",
    f_ring_n: "Länder im Ring:",
    f_ring_g: "Ring aus {n} Ländern – eine gerade Zahl: Die Ringländer wechseln sich mit 2 Farben ab (A, B, A, B …), und das geht rundherum genau auf. Die Mitte berührt alle Ringländer und bekommt eine 3. Farbe. Also reichen hier 3 Farben. Aber Vorsicht: Andere Stellen einer Karte können trotzdem 4 Farben brauchen.",
    f_ring_u: "Ring aus {n} Ländern – eine ungerade Zahl: Wechselt man mit 2 Farben ab (A, B, A, B, A …), stoßen am Ende zwei gleiche Farben zusammen. Der Ring allein braucht also schon 3 Farben. Die Mitte berührt alle Ringländer und braucht eine 4. Farbe. Darum reichen 3 Farben nicht immer.",
    f_bsp: "Echte Beispiele (Zahl = Nachbarn im Ring):",
    f_bsp_info: "{c} ist ringsum von {n} Nachbarn umgeben: {l}.",
    f_hier3: "Gerade Zahl – für dieses Stück reichen 3 Farben.",
    f_hier4: "Ungerade Zahl – hier braucht man 4 Farben.",
    f_bew_h: "Wie wurde bewiesen, dass 4 Farben immer reichen?",
    f_bew: [
      "Aus der Karte wird ein Netz: Jedes Land wird ein Punkt, Nachbarländer werden durch eine Linie verbunden (Knopf „Nachbarschaftsnetz“). Länder, die sich nur in einem Punkt berühren – wie Utah und New Mexico in den USA –, bekommen keine Linie. Solch ein Netz lässt sich immer ohne Kreuzungen zeichnen.",
      "Mit der Formel von Euler (Ecken − Kanten + Flächen = 2) zeigt man: In jedem solchen Netz gibt es mindestens ein Land mit höchstens 5 Nachbarn.",
      "Daraus folgt leicht, dass 6 Farben immer reichen: Nimm dieses Land weg, färbe den Rest und setze es wieder ein. Seine höchstens 5 Nachbarn belegen höchstens 5 Farben – die 6. ist noch frei.",
      "1879 glaubte Alfred Kempe, so auch 4 Farben bewiesen zu haben. Sein Trick: In einer Kette aus zwei abwechselnden Farben tauscht man die beiden Farben (Kempe-Kette). 1890 fand Percy Heawood einen Fehler in Kempes Beweis – mit Kempes Trick bewies er aber, dass 5 Farben immer reichen.",
      "1976 schafften es Kenneth Appel und Wolfgang Haken: Sie fanden eine Liste von 1936 kleinen Kartenstücken, von denen in jeder Karte mindestens eines vorkommen muss. Für jedes Stück prüfte der Computer: Bräuchte eine Karte mit diesem Stück 5 Farben, dann gäbe es auch eine kleinere Karte, die 5 Farben braucht. Eine kleinste solche Karte kann es also nicht geben – darum reichen 4 Farben immer. Der Computer rechnete dafür etwa 1200 Stunden.",
      "1996 verkürzten Robertson, Sanders, Seymour und Thomas den Beweis auf 633 Kartenstücke. 2005 ließ Georges Gonthier den ganzen Beweis von einem Prüfprogramm für Beweise (Coq) Schritt für Schritt kontrollieren."
    ]
  },
  en: {
    f_netz: "Neighbour network",
    f_ring_h: "A ring of 3, 4 or 5 neighbours",
    f_ring_anl: "One country in the middle, surrounded by a ring of neighbouring countries. Tap a field several times to change its colour. How many colours do you need?",
    f_ring_n: "Countries in the ring:",
    f_ring_g: "A ring of {n} countries – an even number: the ring countries alternate between 2 colours (A, B, A, B …), and this works out exactly all the way round. The middle touches every ring country and gets a 3rd colour. So 3 colours are enough here. But careful: other parts of a map may still need 4 colours.",
    f_ring_u: "A ring of {n} countries – an odd number: if you alternate 2 colours (A, B, A, B, A …), two equal colours meet at the end. So the ring alone already needs 3 colours. The middle touches every ring country and needs a 4th colour. That is why 3 colours are not always enough.",
    f_bsp: "Real examples (number = neighbours in the ring):",
    f_bsp_info: "{c} is surrounded by a ring of {n} neighbours: {l}.",
    f_hier3: "Even number – 3 colours are enough for this part.",
    f_hier4: "Odd number – 4 colours are needed here.",
    f_bew_h: "How was it proved that 4 colours are always enough?",
    f_bew: [
      "The map becomes a network: every country becomes a dot, and neighbouring countries are joined by a line (button “Neighbour network”). Countries that touch at only one point – like Utah and New Mexico in the USA – get no line. Such a network can always be drawn without crossings.",
      "Using Euler’s formula (corners − edges + faces = 2) one shows: in every such network there is at least one country with at most 5 neighbours.",
      "From this it easily follows that 6 colours are always enough: remove that country, colour the rest and put it back. Its at most 5 neighbours use at most 5 colours – the 6th is still free.",
      "In 1879 Alfred Kempe believed he had proved 4 colours this way. His trick: in a chain of two alternating colours you swap the two colours (a Kempe chain). In 1890 Percy Heawood found a mistake in Kempe’s proof – but with Kempe’s trick he proved that 5 colours are always enough.",
      "In 1976 Kenneth Appel and Wolfgang Haken succeeded: they found a list of 1936 small map pieces, at least one of which must appear in every map. For each piece the computer checked: if a map with this piece needed 5 colours, there would also be a smaller map needing 5 colours. So a smallest such map cannot exist – and therefore 4 colours are always enough. The computer worked on this for about 1200 hours.",
      "In 1996 Robertson, Sanders, Seymour and Thomas shortened the proof to 633 map pieces. In 2005 Georges Gonthier had the whole proof checked step by step by a proof-checking program (Coq)."
    ]
  },
  es: {
    f_netz: "Red de vecinos",
    f_ring_h: "Un anillo de 3, 4 o 5 vecinos",
    f_ring_anl: "Un país en el centro y, alrededor, un anillo de países vecinos. Toca una casilla varias veces para cambiar su color. ¿Cuántos colores necesitas?",
    f_ring_n: "Países en el anillo:",
    f_ring_g: "Anillo de {n} países, un número par: los países del anillo alternan 2 colores (A, B, A, B…) y la vuelta cierra justo. El centro toca a todos los países del anillo y recibe un 3.er color. Aquí bastan 3 colores. Pero cuidado: otras partes de un mapa pueden necesitar igualmente 4 colores.",
    f_ring_u: "Anillo de {n} países, un número impar: si alternas 2 colores (A, B, A, B, A…), al final se juntan dos colores iguales. El anillo solo ya necesita 3 colores. El centro toca a todos los países del anillo y necesita un 4.º color. Por eso 3 colores no siempre bastan.",
    f_bsp: "Ejemplos reales (número = vecinos en el anillo):",
    f_bsp_info: "{c} está rodeado por un anillo de {n} vecinos: {l}.",
    f_hier3: "Número par: para esta parte bastan 3 colores.",
    f_hier4: "Número impar: aquí hacen falta 4 colores.",
    f_bew_h: "¿Cómo se demostró que 4 colores siempre bastan?",
    f_bew: [
      "El mapa se convierte en una red: cada país es un punto y los países vecinos se unen con una línea (botón «Red de vecinos»). Los países que solo se tocan en un punto, como Utah y Nuevo México en EE. UU., no reciben línea. Una red así siempre se puede dibujar sin cruces.",
      "Con la fórmula de Euler (vértices − aristas + caras = 2) se demuestra que en toda red así hay al menos un país con 5 vecinos como máximo.",
      "De ahí se deduce fácilmente que 6 colores siempre bastan: quita ese país, colorea el resto y vuelve a ponerlo. Sus 5 vecinos como máximo ocupan 5 colores como máximo, así que el 6.º queda libre.",
      "En 1879 Alfred Kempe creyó haber demostrado así también los 4 colores. Su truco: en una cadena de dos colores alternos se intercambian los dos colores (cadena de Kempe). En 1890 Percy Heawood encontró un error en la demostración de Kempe, pero con su truco demostró que 5 colores siempre bastan.",
      "En 1976 lo lograron Kenneth Appel y Wolfgang Haken: encontraron una lista de 1936 pequeños trozos de mapa de los que al menos uno aparece en todo mapa. Para cada trozo, el ordenador comprobó: si un mapa con ese trozo necesitara 5 colores, también habría un mapa más pequeño que necesitaría 5 colores. Por tanto no puede existir un mapa así que sea el más pequeño, y 4 colores siempre bastan. El ordenador calculó durante unas 1200 horas.",
      "En 1996 Robertson, Sanders, Seymour y Thomas redujeron la demostración a 633 trozos de mapa. En 2005 Georges Gonthier hizo comprobar paso a paso toda la demostración con un programa verificador de demostraciones (Coq)."
    ]
  },
  zh: {
    f_netz: "邻接网络",
    f_ring_h: "由 3、4 或 5 个邻国组成的环",
    f_ring_anl: "中间有一个国家，周围是一圈邻国。多次点击一个区域可以换颜色。你需要几种颜色？",
    f_ring_n: "环上的国家数：",
    f_ring_g: "由 {n} 个国家组成的环——偶数：环上的国家用 2 种颜色交替（A、B、A、B……），绕一圈正好对上。中间的国家与环上每个国家都相邻，所以用第 3 种颜色。这里 3 种颜色就够了。但要注意：地图的其他地方仍可能需要 4 种颜色。",
    f_ring_u: "由 {n} 个国家组成的环——奇数：如果用 2 种颜色交替（A、B、A、B、A……），最后会有两个相同颜色碰在一起。所以光是这个环就需要 3 种颜色。中间的国家与环上每个国家都相邻，需要第 4 种颜色。这就是为什么 3 种颜色不总是够。",
    f_bsp: "真实例子（数字 = 环上的邻居数）：",
    f_bsp_info: "{c} 被 {n} 个邻居围成一圈：{l}。",
    f_hier3: "偶数——这一部分用 3 种颜色就够了。",
    f_hier4: "奇数——这里需要 4 种颜色。",
    f_bew_h: "人们是怎样证明 4 种颜色总是够的？",
    f_bew: [
      "把地图变成一张网：每个国家变成一个点，相邻的国家用一条线连起来（按钮“邻接网络”）。只在一个点相碰的国家——比如美国的犹他州和新墨西哥州——不连线。这样的网总能画成没有交叉的样子。",
      "用欧拉公式（顶点数 − 边数 + 面数 = 2）可以证明：每张这样的网中，至少有一个国家最多只有 5 个邻居。",
      "由此很容易得出 6 种颜色总是够的：先拿掉这个国家，给其余部分上色，再把它放回去。它最多 5 个邻居最多占用 5 种颜色——第 6 种还空着。",
      "1879 年，阿尔弗雷德·肯普以为用这种方法也证明了 4 色。他的技巧是：在由两种颜色交替组成的链上，把这两种颜色互换（肯普链）。1890 年，珀西·希伍德发现了肯普证明中的错误——但他用肯普的技巧证明了 5 种颜色总是够的。",
      "1976 年，肯尼斯·阿佩尔和沃尔夫冈·哈肯成功了：他们找到一份包含 1936 个小地图片段的清单，每张地图中至少会出现其中一个。对每个片段，计算机都检查了：如果含有这个片段的地图需要 5 种颜色，那么就会有一张更小的地图也需要 5 种颜色。所以不可能存在“最小的”这样的地图——因此 4 种颜色总是够的。计算机为此计算了大约 1200 小时。",
      "1996 年，罗伯逊、桑德斯、西摩和托马斯把证明缩短到 633 个片段。2005 年，乔治·贡蒂尔让一个证明检查程序（Coq）一步一步地检查了整个证明。"
    ]
  },
  fr: {
    f_netz: "Réseau des voisins",
    f_ring_h: "Un anneau de 3, 4 ou 5 voisins",
    f_ring_anl: "Un pays au milieu, entouré d’un anneau de pays voisins. Touche une case plusieurs fois pour changer sa couleur. De combien de couleurs as-tu besoin ?",
    f_ring_n: "Pays dans l’anneau :",
    f_ring_g: "Un anneau de {n} pays – un nombre pair : les pays de l’anneau alternent 2 couleurs (A, B, A, B …) et le tour se referme juste. Le milieu touche tous les pays de l’anneau et reçoit une 3e couleur. Ici, 3 couleurs suffisent. Mais attention : d’autres endroits d’une carte peuvent quand même demander 4 couleurs.",
    f_ring_u: "Un anneau de {n} pays – un nombre impair : si l’on alterne 2 couleurs (A, B, A, B, A …), deux couleurs identiques se touchent à la fin. L’anneau seul demande donc déjà 3 couleurs. Le milieu touche tous les pays de l’anneau et demande une 4e couleur. Voilà pourquoi 3 couleurs ne suffisent pas toujours.",
    f_bsp: "Vrais exemples (nombre = voisins dans l’anneau) :",
    f_bsp_info: "{c} est entouré d’un anneau de {n} voisins : {l}.",
    f_hier3: "Nombre pair – pour ce morceau, 3 couleurs suffisent.",
    f_hier4: "Nombre impair – ici, il faut 4 couleurs.",
    f_bew_h: "Comment a-t-on prouvé que 4 couleurs suffisent toujours ?",
    f_bew: [
      "La carte devient un réseau : chaque pays devient un point, et deux pays voisins sont reliés par un trait (bouton « Réseau des voisins »). Les pays qui ne se touchent qu’en un point – comme l’Utah et le Nouveau-Mexique aux États-Unis – ne reçoivent pas de trait. Un tel réseau peut toujours se dessiner sans croisements.",
      "Avec la formule d’Euler (sommets − arêtes + faces = 2), on montre que dans tout réseau de ce type, il existe au moins un pays qui a au plus 5 voisins.",
      "On en déduit facilement que 6 couleurs suffisent toujours : on retire ce pays, on colorie le reste et on le remet. Ses 5 voisins au plus occupent 5 couleurs au plus – la 6e reste libre.",
      "En 1879, Alfred Kempe crut avoir prouvé ainsi les 4 couleurs. Son astuce : dans une chaîne de deux couleurs alternées, on échange les deux couleurs (chaîne de Kempe). En 1890, Percy Heawood trouva une erreur dans la preuve de Kempe – mais grâce à l’astuce de Kempe, il prouva que 5 couleurs suffisent toujours.",
      "En 1976, Kenneth Appel et Wolfgang Haken y parvinrent : ils trouvèrent une liste de 1936 petits morceaux de carte dont au moins un apparaît dans toute carte. Pour chaque morceau, l’ordinateur vérifia : si une carte contenant ce morceau demandait 5 couleurs, il existerait aussi une carte plus petite demandant 5 couleurs. Une plus petite carte de ce genre ne peut donc pas exister – et 4 couleurs suffisent toujours. L’ordinateur calcula pendant environ 1200 heures.",
      "En 1996, Robertson, Sanders, Seymour et Thomas réduisirent la preuve à 633 morceaux de carte. En 2005, Georges Gonthier fit vérifier toute la preuve pas à pas par un logiciel de vérification de preuves (Coq)."
    ]
  },
  ru: {
    f_netz: "Сеть соседей",
    f_ring_h: "Кольцо из 3, 4 или 5 соседей",
    f_ring_anl: "Одна страна в середине, вокруг неё кольцо из соседних стран. Нажимай на поле несколько раз, чтобы сменить его цвет. Сколько цветов тебе нужно?",
    f_ring_n: "Стран в кольце:",
    f_ring_g: "Кольцо из {n} стран – чётное число: страны кольца чередуют 2 цвета (A, B, A, B …), и по кругу всё точно сходится. Середина касается всех стран кольца и получает 3-й цвет. Здесь хватает 3 цветов. Но осторожно: в других местах карты всё равно может понадобиться 4 цвета.",
    f_ring_u: "Кольцо из {n} стран – нечётное число: если чередовать 2 цвета (A, B, A, B, A …), в конце встретятся два одинаковых цвета. Значит, одному кольцу уже нужно 3 цвета. Середина касается всех стран кольца, и ей нужен 4-й цвет. Поэтому трёх цветов хватает не всегда.",
    f_bsp: "Настоящие примеры (число = соседи в кольце):",
    f_bsp_info: "{c} окружена кольцом из {n} соседей: {l}.",
    f_hier3: "Чётное число – для этого участка хватает 3 цветов.",
    f_hier4: "Нечётное число – здесь нужно 4 цвета.",
    f_bew_h: "Как доказали, что 4 цветов всегда хватает?",
    f_bew: [
      "Карта превращается в сеть: каждая страна становится точкой, соседние страны соединяются линией (кнопка «Сеть соседей»). Страны, которые касаются лишь в одной точке – как Юта и Нью-Мексико в США, – линии не получают. Такую сеть всегда можно нарисовать без пересечений.",
      "С помощью формулы Эйлера (вершины − рёбра + грани = 2) доказывают: в каждой такой сети есть хотя бы одна страна, у которой не больше 5 соседей.",
      "Отсюда легко следует, что 6 цветов хватает всегда: убери эту страну, раскрась остальное и верни её на место. Её не больше 5 соседей занимают не больше 5 цветов – 6-й остаётся свободным.",
      "В 1879 году Альфред Кемпе решил, что так же доказал и 4 цвета. Его приём: в цепочке из двух чередующихся цветов эти два цвета меняют местами (цепь Кемпе). В 1890 году Перси Хивуд нашёл ошибку в доказательстве Кемпе – но с помощью приёма Кемпе доказал, что 5 цветов хватает всегда.",
      "В 1976 году это удалось Кеннету Аппелю и Вольфгангу Хакену: они нашли список из 1936 небольших кусочков карты, хотя бы один из которых обязательно есть в любой карте. Для каждого кусочка компьютер проверил: если бы карте с этим кусочком нужно было 5 цветов, то нашлась бы и карта поменьше, которой тоже нужно 5 цветов. Значит, самой маленькой такой карты быть не может – и 4 цветов хватает всегда. Компьютер считал около 1200 часов.",
      "В 1996 году Робертсон, Сандерс, Сеймур и Томас сократили доказательство до 633 кусочков. В 2005 году Жорж Гонтье дал проверить всё доказательство шаг за шагом программе для проверки доказательств (Coq)."
    ]
  },
  ar: {
    f_netz: "شبكة الجيران",
    f_ring_h: "حلقة من 3 أو 4 أو 5 جيران",
    f_ring_anl: "بلد في الوسط، وحوله حلقة من البلدان المجاورة. اضغط على خانة عدة مرات لتغيير لونها. كم لونًا تحتاج؟",
    f_ring_n: "عدد بلدان الحلقة:",
    f_ring_g: "حلقة من {n} بلدان – عدد زوجي: تتناوب بلدان الحلقة بين لونين (A، B، A، B …) فتنغلق الدورة تمامًا. يلامس الوسط كل بلدان الحلقة فيأخذ لونًا ثالثًا. إذن تكفي هنا 3 ألوان. لكن انتبه: قد تحتاج أماكن أخرى من الخريطة إلى 4 ألوان مع ذلك.",
    f_ring_u: "حلقة من {n} بلدان – عدد فردي: إذا تناوبت بين لونين (A، B، A، B، A …) يلتقي في النهاية لونان متماثلان. فالحلقة وحدها تحتاج إلى 3 ألوان. ويلامس الوسط كل بلدان الحلقة فيحتاج إلى لون رابع. لهذا لا تكفي 3 ألوان دائمًا.",
    f_bsp: "أمثلة حقيقية (الرقم = عدد الجيران في الحلقة):",
    f_bsp_info: "تحيط بـ{c} حلقة من {n} جيران: {l}.",
    f_hier3: "عدد زوجي – تكفي 3 ألوان لهذا الجزء.",
    f_hier4: "عدد فردي – نحتاج هنا إلى 4 ألوان.",
    f_bew_h: "كيف أُثبت أن 4 ألوان تكفي دائمًا؟",
    f_bew: [
      "تتحول الخريطة إلى شبكة: يصبح كل بلد نقطة، ويُوصل كل بلدين متجاورين بخط (زر «شبكة الجيران»). البلدان التي تتلامس في نقطة واحدة فقط – مثل يوتا ونيومكسيكو في الولايات المتحدة – لا يُرسم بينها خط. ويمكن دائمًا رسم مثل هذه الشبكة دون تقاطعات.",
      "باستخدام صيغة أويلر (الرؤوس − الأضلاع + الوجوه = 2) يُبرهن أن في كل شبكة كهذه بلدًا واحدًا على الأقل له 5 جيران على الأكثر.",
      "ومن هنا يسهل استنتاج أن 6 ألوان تكفي دائمًا: احذف هذا البلد، ولوّن الباقي، ثم أعده. جيرانه الخمسة على الأكثر يشغلون 5 ألوان على الأكثر – ويبقى السادس حرًّا.",
      "في عام 1879 ظن ألفريد كيمب أنه أثبت بهذه الطريقة الألوان الأربعة أيضًا. حيلته: في سلسلة من لونين متناوبين يُبدَّل اللونان (سلسلة كيمب). وفي عام 1890 وجد بيرسي هيوود خطأً في برهان كيمب – لكنه أثبت بحيلة كيمب أن 5 ألوان تكفي دائمًا.",
      "في عام 1976 نجح كينيث أبيل وفولفغانغ هاكن: وجدا قائمة من 1936 قطعة صغيرة من الخرائط، لا بد أن تظهر واحدة منها على الأقل في كل خريطة. ولكل قطعة تحقق الحاسوب: لو احتاجت خريطة فيها هذه القطعة إلى 5 ألوان، لوُجدت أيضًا خريطة أصغر تحتاج إلى 5 ألوان. إذن لا يمكن أن توجد أصغر خريطة من هذا النوع – ولذلك تكفي 4 ألوان دائمًا. وقد حسب الحاسوب نحو 1200 ساعة.",
      "في عام 1996 اختصر روبرتسون وساندرز وسيمور وتوماس البرهان إلى 633 قطعة. وفي عام 2005 جعل جورج غونتييه برنامجًا لفحص البراهين (Coq) يتحقق من البرهان كله خطوة خطوة."
    ]
  },
  ja: {
    f_netz: "となりのネットワーク",
    f_ring_h: "3・4・5 か国の輪",
    f_ring_anl: "まん中に国が 1 つ、そのまわりをとなりの国の輪がかこんでいます。マスを何回かタップすると色が変わります。何色必要かな？",
    f_ring_n: "輪の国の数：",
    f_ring_g: "{n} か国の輪――偶数：輪の国は 2 色を交互に使えば（A、B、A、B …）、ぐるっと一周でぴったり合います。まん中は輪のすべての国ととなり合うので 3 色目を使います。ここは 3 色で足ります。でも注意：地図のほかの場所では、それでも 4 色が必要になることがあります。",
    f_ring_u: "{n} か国の輪――奇数：2 色を交互に使うと（A、B、A、B、A …）、最後に同じ色がとなり合ってしまいます。だから輪だけでもう 3 色必要です。まん中は輪のすべての国ととなり合うので 4 色目が必要です。だから 3 色ではいつも足りるとはかぎりません。",
    f_bsp: "本物の例（数 = 輪のとなりの数）：",
    f_bsp_info: "{c} は {n} のとなりの輪にかこまれています：{l}。",
    f_hier3: "偶数――この部分は 3 色で足ります。",
    f_hier4: "奇数――ここは 4 色必要です。",
    f_bew_h: "4 色でいつも足りることは、どうやって証明されたの？",
    f_bew: [
      "地図をネットワークにします。国を 1 つの点にし、となりの国どうしを線で結びます（ボタン「となりのネットワーク」）。1 点でしかふれていない国――アメリカのユタ州とニューメキシコ州のように――は線で結びません。このネットワークは、いつも線が交わらないようにかけます。",
      "オイラーの公式（頂点の数 − 辺の数 + 面の数 = 2）を使うと、このようなネットワークにはかならず、となりが 5 つ以下の国が少なくとも 1 つあることがわかります。",
      "ここから、6 色ならいつも足りることがかんたんにわかります。その国をいったん取りのぞき、残りをぬってから元にもどします。となりは 5 つ以下なので使われている色は 5 色以下――6 色目があいています。",
      "1879 年、アルフレッド・ケンプはこの方法で 4 色も証明できたと考えました。かれの工夫は、2 色が交互にならんだくさりで 2 つの色を入れかえること（ケンプ鎖）です。1890 年、パーシー・ヒーウッドがケンプの証明にまちがいを見つけました――でもケンプの工夫を使って、5 色ならいつも足りることを証明しました。",
      "1976 年、ケネス・アッペルとヴォルフガング・ハーケンが成功しました。どんな地図にも少なくとも 1 つはふくまれる、1936 個の小さな地図の部品のリストを見つけたのです。部品ごとにコンピューターが調べました：この部品をふくむ地図に 5 色が必要なら、5 色が必要なもっと小さな地図もあるはずだ、と。だから「いちばん小さい」そんな地図は存在できません――つまり 4 色でいつも足ります。コンピューターは約 1200 時間計算しました。",
      "1996 年、ロバートソン、サンダース、シーモア、トーマスが証明を 633 個の部品にまでちぢめました。2005 年には、ジョルジュ・ゴンティエが証明全体を、証明をチェックするプログラム（Coq）に一歩ずつ確かめさせました。"
    ]
  },
  pt: {
    f_netz: "Rede de vizinhos",
    f_ring_h: "Um anel de 3, 4 ou 5 vizinhos",
    f_ring_anl: "Um país no meio e, à volta, um anel de países vizinhos. Toque várias vezes numa casa para mudar a cor. De quantas cores precisa?",
    f_ring_n: "Países no anel:",
    f_ring_g: "Anel de {n} países – um número par: os países do anel alternam 2 cores (A, B, A, B …) e a volta fecha certinha. O meio toca em todos os países do anel e recebe uma 3.ª cor. Aqui bastam 3 cores. Mas atenção: outras partes de um mapa podem mesmo assim precisar de 4 cores.",
    f_ring_u: "Anel de {n} países – um número ímpar: se alternar 2 cores (A, B, A, B, A …), no fim encontram-se duas cores iguais. O anel sozinho já precisa de 3 cores. O meio toca em todos os países do anel e precisa de uma 4.ª cor. Por isso 3 cores nem sempre bastam.",
    f_bsp: "Exemplos reais (número = vizinhos no anel):",
    f_bsp_info: "{c} está rodeado por um anel de {n} vizinhos: {l}.",
    f_hier3: "Número par – para esta parte bastam 3 cores.",
    f_hier4: "Número ímpar – aqui são precisas 4 cores.",
    f_bew_h: "Como se provou que 4 cores bastam sempre?",
    f_bew: [
      "O mapa transforma-se numa rede: cada país passa a ser um ponto e os países vizinhos são ligados por uma linha (botão «Rede de vizinhos»). Países que só se tocam num ponto – como o Utah e o Novo México, nos EUA – não recebem linha. Uma rede assim pode sempre ser desenhada sem cruzamentos.",
      "Com a fórmula de Euler (vértices − arestas + faces = 2) mostra-se que em qualquer rede assim há pelo menos um país com no máximo 5 vizinhos.",
      "Daí conclui-se facilmente que 6 cores bastam sempre: retire esse país, pinte o resto e volte a colocá-lo. Os seus no máximo 5 vizinhos ocupam no máximo 5 cores – a 6.ª fica livre.",
      "Em 1879, Alfred Kempe julgou ter provado assim também as 4 cores. O truque dele: numa cadeia de duas cores alternadas trocam-se as duas cores (cadeia de Kempe). Em 1890, Percy Heawood encontrou um erro na prova de Kempe – mas, com o truque de Kempe, provou que 5 cores bastam sempre.",
      "Em 1976, Kenneth Appel e Wolfgang Haken conseguiram: encontraram uma lista de 1936 pequenos pedaços de mapa, dos quais pelo menos um aparece em qualquer mapa. Para cada pedaço, o computador verificou: se um mapa com esse pedaço precisasse de 5 cores, haveria também um mapa mais pequeno que precisaria de 5 cores. Portanto não pode existir um mapa desses que seja o mais pequeno – e 4 cores bastam sempre. O computador calculou durante cerca de 1200 horas.",
      "Em 1996, Robertson, Sanders, Seymour e Thomas reduziram a prova a 633 pedaços de mapa. Em 2005, Georges Gonthier pôs um programa de verificação de provas (Coq) a controlar toda a prova passo a passo."
    ]
  }
};
for(var _l5 in BA5) if(BA[_l5]) for(var _k5 in BA5[_l5]) BA[_l5][_k5] = BA5[_l5][_k5];
