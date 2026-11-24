// Alltagsbeispiele für /dreieck/, 9 Sprachen. Baustein: /alltag.js
MS_ALLTAG.einbauen({ nach: document.querySelector(".tabs") || document.getElementById("titel"), daten: {
de: [
  ["Dachgiebel", "Ein Giebel ist unten 8 m breit, die beiden Dachseiten sind je 5 m lang. Konstruiere ihn – wie hoch ist er?", "Drei Seiten bekannt: SSS (8 m, 5 m, 5 m).\nHöhe aus der Zeichnung: 3 m (Probe: $√(5² − 4²) = 3$)."],
  ["Fluss vermessen", "Zwei Punkte am Ufer liegen 50 m auseinander. Von dort sieht man einen Baum am anderen Ufer unter 60° und 70°. Wie breit ist der Fluss? Konstruiere das Dreieck maßstäblich.", "Eine Seite mit den zwei anliegenden Winkeln: WSW.\nDritter Winkel: $180° − 60° − 70° = 50°$\nMaßstäblich zeichnen (1 cm ≙ 10 m) und die Breite messen.\n$h ≈ 53 m$"],
  ["Zelt", "Zwei 2 m lange Zeltstangen stehen oben im Winkel von 50° zueinander. Wie breit ist das Zelt unten?", "Zwei Seiten und der Winkel dazwischen: SWS.\nIn der Zeichnung misst du etwa 1,69 m."],
  ["Verkehrsschild", "Ein Warnschild ist ein gleichseitiges Dreieck. Wie groß ist jeder Winkel?", "Winkelsumme $180°$, drei gleiche Winkel:\n$180° : 3 = 60°$"]
],
en: [
  ["Roof gable", "A gable is 8 m wide at the bottom and both roof sides are 5 m long. Construct it – how high is it?", "Three sides known: SSS (8 m, 5 m, 5 m).\nHeight from the drawing: 3 m (check: $√(5² − 4²) = 3$)."],
  ["Measuring a river", "Two points on the bank are 50 m apart. From there a tree on the other bank is seen at 60° and 70°. How wide is the river? Construct the triangle to scale.", "One side with the two angles at its ends: ASA.\nThird angle: $180° − 60° − 70° = 50°$\nDraw to scale (1 cm ≙ 10 m) and measure the width.\n$h ≈ 53 m$"],
  ["Tent", "Two 2 m tent poles meet at the top at an angle of 50°. How wide is the tent at the bottom?", "Two sides and the angle between them: SAS.\nIn the drawing you measure about 1.69 m."],
  ["Road sign", "A warning sign is an equilateral triangle. How big is each angle?", "Angle sum $180°$, three equal angles:\n$180° : 3 = 60°$"]
],
es: [
  ["Frontón del tejado", "Un frontón mide 8 m de ancho abajo y los dos lados del tejado 5 m cada uno. Constrúyelo: ¿qué altura tiene?", "Se conocen los tres lados: LLL (8 m, 5 m, 5 m).\nAltura en el dibujo: 3 m (comprobación: $√(5² − 4²) = 3$)."],
  ["Medir un río", "Dos puntos de la orilla están a 50 m. Desde ellos se ve un árbol en la otra orilla con ángulos de 60° y 70°. ¿Qué ancho tiene el río? Construye el triángulo a escala.", "Un lado y sus dos ángulos: ALA.\nTercer ángulo: $180° − 60° − 70° = 50°$\nDibuja a escala (1 cm ≙ 10 m) y mide la anchura.\n$h ≈ 53 m$"],
  ["Tienda de campaña", "Dos palos de 2 m se juntan arriba con un ángulo de 50°. ¿Qué anchura tiene la tienda abajo?", "Dos lados y el ángulo entre ellos: LAL.\nEn el dibujo mides unos 1,69 m."],
  ["Señal de tráfico", "Una señal de peligro es un triángulo equilátero. ¿Cuánto mide cada ángulo?", "Suma de ángulos $180°$, tres ángulos iguales:\n$180° : 3 = 60°$"]
],
zh: [
  ["屋顶山墙", "山墙底边宽 8 米，两条屋顶边各长 5 米。画出来——它有多高？", "已知三边：边边边（8 m、5 m、5 m）。\n图上量得高 3 米（验算：$√(5² − 4²) = 3$）。"],
  ["测河宽", "岸边两点相距 50 米，从这两点看对岸的一棵树，角度分别是 60° 和 70°。 河有多宽？按比例作出三角形。", "一边及两端的角：角边角。\n第三个角：$180° − 60° − 70° = 50°$\n按比例画图（1 cm ≙ 10 m）再量出河宽。\n$h ≈ 53 m$"],
  ["帐篷", "两根 2 米长的帐篷杆在顶部夹角 50°。帐篷底部有多宽？", "两边及夹角：边角边。\n图上量得约 1.69 米。"],
  ["交通标志", "警告标志是等边三角形。每个角多大？", "内角和 $180°$，三个角相等：\n$180° : 3 = 60°$"]
],
fr: [
  ["Pignon de toit", "Un pignon mesure 8 m de large en bas et les deux pentes du toit 5 m chacune. Construis-le : quelle est sa hauteur ?", "Trois côtés connus : CCC (8 m, 5 m, 5 m).\nHauteur mesurée : 3 m (vérification : $√(5² − 4²) = 3$)."],
  ["Mesurer une rivière", "Deux points de la rive sont à 50 m l’un de l’autre. De là, on voit un arbre sur l’autre rive sous 60° et 70°. Quelle est la largeur de la rivière ? Construis le triangle à l’échelle.", "Un côté et ses deux angles : ACA.\nTroisième angle : $180° − 60° − 70° = 50°$\nDessine à l’échelle (1 cm ≙ 10 m) et mesure la largeur.\n$h ≈ 53 m$"],
  ["Tente", "Deux mâts de 2 m se rejoignent en haut avec un angle de 50°. Quelle est la largeur de la tente en bas ?", "Deux côtés et l’angle compris : CAC.\nSur le dessin tu mesures environ 1,69 m."],
  ["Panneau routier", "Un panneau de danger est un triangle équilatéral. Combien mesure chaque angle ?", "Somme des angles $180°$, trois angles égaux :\n$180° : 3 = 60°$"]
],
ru: [
  ["Фронтон крыши", "Фронтон внизу шириной 8 м, обе стороны крыши по 5 м. Построй его – какова высота?", "Известны три стороны: ССС (8 м, 5 м, 5 м).\nВысота по чертежу: 3 м (проверка: $√(5² − 4²) = 3$)."],
  ["Измеряем реку", "Две точки на берегу в 50 м друг от друга. Из них дерево на другом берегу видно под углами 60° и 70°. Какова ширина реки? Построй треугольник в масштабе.", "Сторона и два прилежащих угла: УСУ.\nТретий угол: $180° − 60° − 70° = 50°$\nНачерти в масштабе (1 см ≙ 10 м) и измерь ширину.\n$h ≈ 53 m$"],
  ["Палатка", "Две стойки палатки по 2 м сходятся наверху под углом 50°. Какова ширина палатки внизу?", "Две стороны и угол между ними: СУС.\nНа чертеже получается около 1,69 м."],
  ["Дорожный знак", "Предупреждающий знак – равносторонний треугольник. Чему равен каждый угол?", "Сумма углов $180°$, три равных угла:\n$180° : 3 = 60°$"]
],
ar: [
  ["جملون السقف", "عرض الجملون من الأسفل 8 م وطول كل من جانبي السقف 5 م. ارسمه – كم ارتفاعه؟", "الأضلاع الثلاثة معلومة (8 م، 5 م، 5 م).\nالارتفاع من الرسم: 3 م (للتحقق: $√(5² − 4²) = 3$)."],
  ["قياس عرض نهر", "نقطتان على الضفة بينهما 50 م. منهما تُرى شجرة على الضفة الأخرى بزاويتين 60° و 70°. ما عرض النهر؟ ارسم المثلث بمقياس رسم.", "ضلع وزاويتاه: زاوية – ضلع – زاوية.\nالزاوية الثالثة: $180° − 60° − 70° = 50°$\nارسم بمقياس (1 cm ≙ 10 m) وقِس العرض.\n$h ≈ 53 m$"],
  ["خيمة", "عمودان طول كل منهما 2 م يلتقيان في الأعلى بزاوية 50°. كم عرض الخيمة من الأسفل؟", "ضلعان والزاوية بينهما.\nتقيس في الرسم نحو 1.69 م."],
  ["إشارة مرور", "إشارة التحذير مثلث متساوي الأضلاع. كم قياس كل زاوية؟", "مجموع الزوايا $180°$ وثلاث زوايا متساوية:\n$180° : 3 = 60°$"]
],
ja: [
  ["屋根の妻", "妻の底辺は 8 m、屋根の 2 辺は 5 m ずつ。作図すると高さは？", "3 辺がわかる（8 m、5 m、5 m）。\n図から高さ 3 m（確かめ：$√(5² − 4²) = 3$）。"],
  ["川はばをはかる", "岸の 2 点は 50 m はなれている。そこから対岸の木が 60° と 70° に見える。 川の幅は？三角形を縮図でかこう。", "1 辺とその両はしの角がわかる。\n3 つ目の角：$180° − 60° − 70° = 50°$\n縮図（1 cm ≙ 10 m）をかいて川はばをはかる。\n$h ≈ 53 m$"],
  ["テント", "2 m のポール 2 本が上で 50° の角をつくる。テントの下のはばは？", "2 辺とその間の角がわかる。\n図ではおよそ 1.69 m。"],
  ["道路標識", "警戒標識は正三角形。1 つの角は何度？", "内角の和は $180°$、3 つとも等しい：\n$180° : 3 = 60°$"]
],
pt: [
  ["Empena do telhado", "Uma empena tem 8 m de largura embaixo e os dois lados do telhado 5 m cada. Construa-a: qual a altura?", "Três lados conhecidos: LLL (8 m, 5 m, 5 m).\nAltura no desenho: 3 m (verificação: $√(5² − 4²) = 3$)."],
  ["Medir um rio", "Dois pontos da margem estão a 50 m um do outro. Deles se vê uma árvore na outra margem sob 60° e 70°. Qual é a largura do rio? Construa o triângulo em escala.", "Um lado e os dois ângulos adjacentes: ALA.\nTerceiro ângulo: $180° − 60° − 70° = 50°$\nDesenhe em escala (1 cm ≙ 10 m) e meça a largura.\n$h ≈ 53 m$"],
  ["Barraca", "Duas varetas de 2 m se encontram no alto com ângulo de 50°. Qual a largura da barraca embaixo?", "Dois lados e o ângulo entre eles: LAL.\nNo desenho você mede cerca de 1,69 m."],
  ["Placa de trânsito", "Uma placa de advertência é um triângulo equilátero. Quanto mede cada ângulo?", "Soma dos ângulos $180°$, três ângulos iguais:\n$180° : 3 = 60°$"]
]
}});
