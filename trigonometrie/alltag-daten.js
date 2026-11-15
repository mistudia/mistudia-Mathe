// Alltagsbeispiele für /trigonometrie/, 9 Sprachen. „Ausprobieren“ lädt den Rechner (MS_TRIG.laden).
// Bezeichnungen wie im Rechner: a = Gegenkathete von α, b = Ankathete, c = Hypotenuse.
MS_ALLTAG.einbauen({ nach: document.querySelector(".tabs"),
werte: [
  { fall: "ac", einheit: "m", v: { al: 75, c: 6 } },
  { fall: "xc", einheit: "m", v: { a: 0.5, c: 8 } },
  { fall: "ab", einheit: "m", v: { al: 35, b: 20 } },
  { fall: "xy", einheit: "m", v: { a: 3, b: 5 } },
  { fall: "ac", einheit: "km", v: { al: 12, c: 10 } }
],
laden: function(w){ window.MS_TRIG.laden(w); },
daten: {
de: [
  ["Leiter anlehnen", "Eine 6 m lange Leiter soll aus Sicherheitsgründen mit 75° zum Boden stehen. Wie hoch reicht sie, und wie weit steht der Fuß von der Wand weg?", "Höhe = Gegenkathete: $a = 6 m · sin 75° ≈ 5,80 m$\nAbstand = Ankathete: $b = 6 m · cos 75° ≈ 1,55 m$"],
  ["Rollstuhlrampe", "Eine 8 m lange Rampe überwindet 0,5 m Höhe. Wie steil ist sie?", "$sin α = 0,5 : 8 = 0,0625$ ⇒ $α ≈ 3,6°$\nWaagerechte Länge: $b = √(8² − 0,5²) ≈ 7,98 m$"],
  ["Baumhöhe messen", "Du stehst 20 m vom Baum entfernt und siehst die Spitze unter 35°. Deine Augen sind 1,6 m über dem Boden. Wie hoch ist der Baum?", "$tan 35° = a : 20 m$ ⇒ $a = 20 m · tan 35° ≈ 14,0 m$\nBaumhöhe $≈ 14,0 m + 1,6 m = 15,6 m$"],
  ["Dachneigung", "Ein Satteldach ist 3 m hoch, das Haus 10 m breit (also 5 m bis zur Mitte). Wie steil ist das Dach, wie lang ein Dachbalken?", "$tan α = 3 : 5 = 0,6$ ⇒ $α ≈ 31,0°$\nBalken: $c = √(3² + 5²) = √34 ≈ 5,83 m$"],
  ["Startendes Flugzeug", "Ein Flugzeug steigt unter 12° auf. Wie hoch ist es nach 10 km Flugstrecke?", "$a = 10 km · sin 12° ≈ 2,08 km$ (also etwa 2080 m)\nÜber dem Boden zurückgelegt: $b = 10 km · cos 12° ≈ 9,78 km$"]
],
en: [
  ["Leaning a ladder", "For safety, a 6 m ladder should stand at 75° to the ground. How high does it reach, and how far is its foot from the wall?", "Height = opposite side: $a = 6 m · sin 75° ≈ 5.80 m$\nDistance = adjacent side: $b = 6 m · cos 75° ≈ 1.55 m$"],
  ["Wheelchair ramp", "An 8 m long ramp rises 0.5 m. How steep is it?", "$sin α = 0.5 : 8 = 0.0625$ ⇒ $α ≈ 3.6°$\nHorizontal length: $b = √(8² − 0.5²) ≈ 7.98 m$"],
  ["Measuring a tree", "You stand 20 m from a tree and see the top at an angle of 35°. Your eyes are 1.6 m above the ground. How tall is the tree?", "$tan 35° = a : 20 m$ ⇒ $a = 20 m · tan 35° ≈ 14.0 m$\nTree height $≈ 14.0 m + 1.6 m = 15.6 m$"],
  ["Roof pitch", "A gable roof is 3 m high and the house is 10 m wide (5 m to the middle). How steep is the roof, how long is a rafter?", "$tan α = 3 : 5 = 0.6$ ⇒ $α ≈ 31.0°$\nRafter: $c = √(3² + 5²) = √34 ≈ 5.83 m$"],
  ["Plane taking off", "A plane climbs at 12°. How high is it after flying 10 km?", "$a = 10 km · sin 12° ≈ 2.08 km$ (about 2080 m)\nDistance over the ground: $b = 10 km · cos 12° ≈ 9.78 km$"]
],
es: [
  ["Apoyar una escalera", "Por seguridad, una escalera de 6 m debe formar 75° con el suelo. ¿Hasta qué altura llega y a qué distancia de la pared queda el pie?", "Altura = cateto opuesto: $a = 6 m · sen 75° ≈ 5,80 m$\nDistancia = cateto contiguo: $b = 6 m · cos 75° ≈ 1,55 m$"],
  ["Rampa para silla de ruedas", "Una rampa de 8 m de largo sube 0,5 m. ¿Qué inclinación tiene?", "$sen α = 0,5 : 8 = 0,0625$ ⇒ $α ≈ 3,6°$\nLongitud horizontal: $b = √(8² − 0,5²) ≈ 7,98 m$"],
  ["Medir un árbol", "Estás a 20 m de un árbol y ves la copa con un ángulo de 35°. Tus ojos están a 1,6 m del suelo. ¿Qué altura tiene el árbol?", "$tg 35° = a : 20 m$ ⇒ $a = 20 m · tg 35° ≈ 14,0 m$\nAltura del árbol $≈ 14,0 m + 1,6 m = 15,6 m$"],
  ["Inclinación del tejado", "Un tejado a dos aguas mide 3 m de alto y la casa 10 m de ancho (5 m hasta el centro). ¿Qué inclinación tiene y cuánto mide una viga?", "$tg α = 3 : 5 = 0,6$ ⇒ $α ≈ 31,0°$\nViga: $c = √(3² + 5²) = √34 ≈ 5,83 m$"],
  ["Avión despegando", "Un avión sube con un ángulo de 12°. ¿A qué altura está tras recorrer 10 km?", "$a = 10 km · sen 12° ≈ 2,08 km$ (unos 2080 m)\nDistancia sobre el suelo: $b = 10 km · cos 12° ≈ 9,78 km$"]
],
zh: [
  ["靠梯子", "为了安全，一把 6 m 长的梯子与地面应成 75°。它能够到多高？梯脚离墙多远？", "高度 = 对边：$a = 6 m · sin 75° ≈ 5.80 m$\n距离 = 邻边：$b = 6 m · cos 75° ≈ 1.55 m$"],
  ["轮椅坡道", "一条 8 m 长的坡道升高 0.5 m。坡度角是多少？", "$sin α = 0.5 : 8 = 0.0625$ ⇒ $α ≈ 3.6°$\n水平长度：$b = √(8² − 0.5²) ≈ 7.98 m$"],
  ["测树高", "你站在离树 20 m 处，看树顶的仰角是 35°。你的眼睛离地 1.6 m。树有多高？", "$tan 35° = a : 20 m$ ⇒ $a = 20 m · tan 35° ≈ 14.0 m$\n树高 $≈ 14.0 m + 1.6 m = 15.6 m$"],
  ["屋顶坡度", "一个人字形屋顶高 3 m，房子宽 10 m（到中间 5 m）。屋顶有多陡？一根椽子多长？", "$tan α = 3 : 5 = 0.6$ ⇒ $α ≈ 31.0°$\n椽子：$c = √(3² + 5²) = √34 ≈ 5.83 m$"],
  ["飞机起飞", "飞机以 12° 的角度爬升。飞行 10 km 后有多高？", "$a = 10 km · sin 12° ≈ 2.08 km$（约 2080 m）\n在地面上方前进的距离：$b = 10 km · cos 12° ≈ 9.78 km$"]
],
fr: [
  ["Poser une échelle", "Par sécurité, une échelle de 6 m doit faire un angle de 75° avec le sol. Jusqu’à quelle hauteur monte-t-elle et à quelle distance du mur est son pied ?", "Hauteur = côté opposé : $a = 6 m · sin 75° ≈ 5,80 m$\nDistance = côté adjacent : $b = 6 m · cos 75° ≈ 1,55 m$"],
  ["Rampe pour fauteuil roulant", "Une rampe de 8 m de long monte de 0,5 m. Quelle est sa pente ?", "$sin α = 0,5 : 8 = 0,0625$ ⇒ $α ≈ 3,6°$\nLongueur horizontale : $b = √(8² − 0,5²) ≈ 7,98 m$"],
  ["Mesurer un arbre", "Tu es à 20 m d’un arbre et tu vois sa cime sous un angle de 35°. Tes yeux sont à 1,6 m du sol. Quelle est la hauteur de l’arbre ?", "$tan 35° = a : 20 m$ ⇒ $a = 20 m · tan 35° ≈ 14,0 m$\nHauteur de l’arbre $≈ 14,0 m + 1,6 m = 15,6 m$"],
  ["Pente du toit", "Un toit à deux pans fait 3 m de haut, la maison 10 m de large (5 m jusqu’au milieu). Quelle est la pente du toit, quelle est la longueur d’un chevron ?", "$tan α = 3 : 5 = 0,6$ ⇒ $α ≈ 31,0°$\nChevron : $c = √(3² + 5²) = √34 ≈ 5,83 m$"],
  ["Avion au décollage", "Un avion monte sous un angle de 12°. À quelle altitude est-il après 10 km de vol ?", "$a = 10 km · sin 12° ≈ 2,08 km$ (environ 2080 m)\nDistance parcourue au sol : $b = 10 km · cos 12° ≈ 9,78 km$"]
],
ru: [
  ["Приставная лестница", "По правилам безопасности лестница длиной 6 м должна стоять под углом 75° к земле. На какую высоту она достанет и на каком расстоянии от стены её основание?", "Высота = противолежащий катет: $a = 6 м · sin 75° ≈ 5,80 м$\nРасстояние = прилежащий катет: $b = 6 м · cos 75° ≈ 1,55 м$"],
  ["Пандус", "Пандус длиной 8 м поднимается на 0,5 м. Какой у него угол наклона?", "$sin α = 0,5 : 8 = 0,0625$ ⇒ $α ≈ 3,6°$\nГоризонтальная длина: $b = √(8² − 0,5²) ≈ 7,98 м$"],
  ["Высота дерева", "Ты стоишь в 20 м от дерева и видишь верхушку под углом 35°. Твои глаза на высоте 1,6 м. Какова высота дерева?", "$tg 35° = a : 20 м$ ⇒ $a = 20 м · tg 35° ≈ 14,0 м$\nВысота дерева $≈ 14,0 м + 1,6 м = 15,6 м$"],
  ["Наклон крыши", "Двускатная крыша высотой 3 м, дом шириной 10 м (до середины 5 м). Каков наклон крыши и длина стропила?", "$tg α = 3 : 5 = 0,6$ ⇒ $α ≈ 31,0°$\nСтропило: $c = √(3² + 5²) = √34 ≈ 5,83 м$"],
  ["Взлёт самолёта", "Самолёт набирает высоту под углом 12°. На какой он высоте, пролетев 10 км?", "$a = 10 км · sin 12° ≈ 2,08 км$ (около 2080 м)\nРасстояние над землёй: $b = 10 км · cos 12° ≈ 9,78 км$"]
],
ar: [
  ["إسناد سلّم", "للسلامة يجب أن يصنع سلّم طوله 6 m زاوية 75° مع الأرض. إلى أي ارتفاع يصل، وكم يبعد أسفله عن الجدار؟", "الارتفاع = الضلع المقابل: $a = 6 m · sin 75° ≈ 5.80 m$\nالمسافة = الضلع المجاور: $b = 6 m · cos 75° ≈ 1.55 m$"],
  ["منحدر الكرسي المتحرك", "منحدر طوله 8 m يرتفع 0.5 m. ما زاوية ميله؟", "$sin α = 0.5 : 8 = 0.0625$ ⇒ $α ≈ 3.6°$\nالطول الأفقي: $b = √(8² − 0.5²) ≈ 7.98 m$"],
  ["قياس ارتفاع شجرة", "تقف على بعد 20 m من شجرة وترى قمتها بزاوية 35°. عيناك على ارتفاع 1.6 m. ما ارتفاع الشجرة؟", "$tan 35° = a : 20 m$ ⇒ $a = 20 m · tan 35° ≈ 14.0 m$\nارتفاع الشجرة $≈ 14.0 m + 1.6 m = 15.6 m$"],
  ["ميل السقف", "سقف جملوني ارتفاعه 3 m وعرض البيت 10 m (5 m حتى المنتصف). ما ميل السقف وما طول العارضة؟", "$tan α = 3 : 5 = 0.6$ ⇒ $α ≈ 31.0°$\nالعارضة: $c = √(3² + 5²) = √34 ≈ 5.83 m$"],
  ["طائرة تقلع", "تصعد طائرة بزاوية 12°. ما ارتفاعها بعد أن تطير 10 km؟", "$a = 10 km · sin 12° ≈ 2.08 km$ (نحو 2080 m)\nالمسافة فوق الأرض: $b = 10 km · cos 12° ≈ 9.78 km$"]
],
ja: [
  ["はしごを立てかける", "安全のため、長さ 6 m のはしごは地面と 75° になるように立てる。どの高さまで届く？はしごの足はかべから何 m はなれる？", "高さ = 対辺：$a = 6 m · sin 75° ≈ 5.80 m$\nきょり = 隣辺：$b = 6 m · cos 75° ≈ 1.55 m$"],
  ["車いす用スロープ", "長さ 8 m のスロープで 0.5 m 上がる。傾きの角度は？", "$sin α = 0.5 : 8 = 0.0625$ ⇒ $α ≈ 3.6°$\n水平の長さ：$b = √(8² − 0.5²) ≈ 7.98 m$"],
  ["木の高さをはかる", "木から 20 m はなれた所で、てっぺんを 35° の角度で見上げた。目の高さは 1.6 m。木の高さは？", "$tan 35° = a : 20 m$ ⇒ $a = 20 m · tan 35° ≈ 14.0 m$\n木の高さ $≈ 14.0 m + 1.6 m = 15.6 m$"],
  ["屋根の傾き", "切妻屋根の高さは 3 m、家の幅は 10 m（真ん中まで 5 m）。屋根の傾きと、たる木の長さは？", "$tan α = 3 : 5 = 0.6$ ⇒ $α ≈ 31.0°$\nたる木：$c = √(3² + 5²) = √34 ≈ 5.83 m$"],
  ["飛行機の離陸", "飛行機が 12° の角度で上昇する。10 km 飛んだとき、高さは？", "$a = 10 km · sin 12° ≈ 2.08 km$（約 2080 m）\n地上で進んだきょり：$b = 10 km · cos 12° ≈ 9.78 km$"]
],
pt: [
  ["Encostar uma escada", "Por segurança, uma escada de 6 m deve fazer 75° com o chão. Até que altura chega e a que distância da parede fica o pé?", "Altura = cateto oposto: $a = 6 m · sen 75° ≈ 5,80 m$\nDistância = cateto adjacente: $b = 6 m · cos 75° ≈ 1,55 m$"],
  ["Rampa para cadeira de rodas", "Uma rampa de 8 m sobe 0,5 m. Qual é a inclinação?", "$sen α = 0,5 : 8 = 0,0625$ ⇒ $α ≈ 3,6°$\nComprimento horizontal: $b = √(8² − 0,5²) ≈ 7,98 m$"],
  ["Medir uma árvore", "Estás a 20 m de uma árvore e vês o topo sob um ângulo de 35°. Os teus olhos estão a 1,6 m do chão. Qual é a altura da árvore?", "$tg 35° = a : 20 m$ ⇒ $a = 20 m · tg 35° ≈ 14,0 m$\nAltura da árvore $≈ 14,0 m + 1,6 m = 15,6 m$"],
  ["Inclinação do telhado", "Um telhado de duas águas tem 3 m de altura e a casa 10 m de largura (5 m até ao meio). Qual é a inclinação e o comprimento de uma viga?", "$tg α = 3 : 5 = 0,6$ ⇒ $α ≈ 31,0°$\nViga: $c = √(3² + 5²) = √34 ≈ 5,83 m$"],
  ["Avião a descolar", "Um avião sobe com um ângulo de 12°. A que altura está depois de voar 10 km?", "$a = 10 km · sen 12° ≈ 2,08 km$ (cerca de 2080 m)\nDistância sobre o solo: $b = 10 km · cos 12° ≈ 9,78 km$"]
]
}});
